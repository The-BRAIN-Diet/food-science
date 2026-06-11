/**
 * Build phenome relationship index from PM MDX front matter.
 * PM `phenome_relationships` is the sole source of truth.
 * @see system/phenome-relationship-schema.md
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { listMechanismMdxFiles } from "./mechanism-page-validation.mjs";
import { aggregateFmConnectedPhenomes } from "./phenome-relationships.mjs";

const DOCS_BIO_TARGETS = "docs/biological-targets";

/**
 * @param {string} filePath absolute path to PM MDX
 * @param {string} rootDir project root
 */
export function pmDocPathFromFile(filePath, rootDir) {
  const rel = path
    .relative(path.join(rootDir, DOCS_BIO_TARGETS), filePath)
    .replace(/\\/g, "/")
    .replace(/\.mdx?$/, "");
  return `/docs/biological-targets/${rel}`;
}

/**
 * @param {object} ref
 */
function normalizeReference(ref) {
  if (!ref || typeof ref !== "object") return ref;
  const citationKey = ref.citation_key || ref.citationKey;
  return {
    index: ref.index,
    label: ref.label,
    citationKey,
    href: ref.href || (citationKey ? `/docs/papers/BRAIN-Diet-References#${citationKey}` : undefined),
  };
}

/**
 * @param {string} rootDir
 */
export function collectPmPhenomeRelationships(rootDir = process.cwd()) {
  const records = [];

  for (const filePath of listMechanismMdxFiles(rootDir, "pm")) {
    const { data } = matter(fs.readFileSync(filePath, "utf8"));
    const rels = data.phenome_relationships;
    if (!Array.isArray(rels) || rels.length === 0) continue;

    const sourceNode = data.pm_id;
    if (!sourceNode) continue;

    const sourceTitle = data.title || sourceNode;
    const sourcePath = pmDocPathFromFile(filePath, rootDir);
    const parentFM = data.parent_fm || data.parentFM || null;
    const parentBRS = data.parent_brs || data.parentBRS || null;

    for (const rel of rels) {
      if (!rel?.target_phenome) continue;
      records.push({
        sourceNode,
        sourceTitle,
        sourcePath,
        parentFM,
        parentBRS,
        targetPhenome: String(rel.target_phenome).trim(),
        relationshipType: rel.relationship_type,
        confidence: rel.confidence,
        evidenceLevel: rel.evidence_level,
        rationale: rel.rationale,
        references: Array.isArray(rel.references) ? rel.references.map(normalizeReference) : [],
      });
    }
  }

  records.sort((a, b) => {
    const phenome = a.targetPhenome.localeCompare(b.targetPhenome);
    if (phenome !== 0) return phenome;
    const fm = String(a.parentFM || "").localeCompare(String(b.parentFM || ""));
    if (fm !== 0) return fm;
    return a.sourceNode.localeCompare(b.sourceNode);
  });

  return records;
}

/**
 * @param {ReturnType<typeof collectPmPhenomeRelationships>} relationships
 */
export function indexRelationshipsByPhenome(relationships) {
  /** @type {Record<string, string[]>} */
  const byPhenome = {};
  for (const row of relationships) {
    if (!byPhenome[row.targetPhenome]) byPhenome[row.targetPhenome] = [];
    if (!byPhenome[row.targetPhenome].includes(row.sourceNode)) {
      byPhenome[row.targetPhenome].push(row.sourceNode);
    }
  }
  for (const key of Object.keys(byPhenome)) {
    byPhenome[key].sort();
  }
  return byPhenome;
}

/**
 * @param {ReturnType<typeof collectPmPhenomeRelationships>} relationships
 */
export function indexRelationshipsByFm(relationships) {
  /** @type {Record<string, typeof relationships>} */
  const byFm = {};
  for (const row of relationships) {
    const fm = row.parentFM || "_unassigned";
    if (!byFm[fm]) byFm[fm] = [];
    byFm[fm].push(row);
  }
  return byFm;
}

/**
 * Connected phenome roll-ups per FM — for phenome graph pages, not FM MDX §2.
 * @param {ReturnType<typeof collectPmPhenomeRelationships>} relationships
 */
export function buildFmConnectedPhenomeRollups(relationships) {
  const byFm = indexRelationshipsByFm(relationships);
  /** @type {Record<string, ReturnType<typeof aggregateFmConnectedPhenomes>>} */
  const rollups = {};

  for (const [fmId, rows] of Object.entries(byFm)) {
    if (fmId === "_unassigned") continue;
    const pmMap = new Map();
    for (const row of rows) {
      if (!pmMap.has(row.sourceNode)) {
        pmMap.set(row.sourceNode, {
          pm_id: row.sourceNode,
          pm_name: row.sourceTitle,
          pm_href: row.sourcePath,
          phenome_relationships: [],
        });
      }
      pmMap.get(row.sourceNode).phenome_relationships.push({
        target_phenome: row.targetPhenome,
        relationship_type: row.relationshipType,
        confidence: row.confidence,
        evidence_level: row.evidenceLevel,
        rationale: row.rationale,
        references: row.references?.map((r) => ({
          index: r.index,
          label: r.label,
          citation_key: r.citationKey,
          href: r.href,
        })),
      });
    }
    rollups[fmId] = aggregateFmConnectedPhenomes([...pmMap.values()]);
  }

  return rollups;
}

/**
 * @param {string} targetPhenome
 * @param {ReturnType<typeof collectPmPhenomeRelationships>} relationships
 */
export function queryPmsForPhenome(targetPhenome, relationships) {
  const needle = String(targetPhenome).trim().toLowerCase();
  const seen = new Set();
  const out = [];
  for (const row of relationships) {
    if (row.targetPhenome.toLowerCase() !== needle) continue;
    if (seen.has(row.sourceNode)) continue;
    seen.add(row.sourceNode);
    out.push({
      sourceNode: row.sourceNode,
      sourceTitle: row.sourceTitle,
      sourcePath: row.sourcePath,
      parentFM: row.parentFM,
      relationshipType: row.relationshipType,
      confidence: row.confidence,
      evidenceLevel: row.evidenceLevel,
    });
  }
  return out.sort((a, b) => a.sourceNode.localeCompare(b.sourceNode));
}

/**
 * @param {string} rootDir
 */
export function buildPhenomeRelationshipIndex(rootDir = process.cwd()) {
  const relationships = collectPmPhenomeRelationships(rootDir);
  const pmPagesWithMappings = new Set(relationships.map((r) => r.sourceNode)).size;

  return {
    meta: {
      version: 1,
      generatedAt: new Date().toISOString(),
      source: `${DOCS_BIO_TARGETS}/**/*pm*.mdx`,
      pmPageCount: listMechanismMdxFiles(rootDir, "pm").length,
      pmPagesWithMappings,
      relationshipCount: relationships.length,
    },
    relationships,
    byPhenome: indexRelationshipsByPhenome(relationships),
    fmRollups: buildFmConnectedPhenomeRollups(relationships),
  };
}

/**
 * @param {string} [rootDir]
 * @param {string} [outPath] defaults to src/data/phenome-relationships.generated.json
 */
export function writePhenomeRelationshipIndex(rootDir = process.cwd(), outPath) {
  const target =
    outPath || path.join(rootDir, "src/data/phenome-relationships.generated.json");
  const index = buildPhenomeRelationshipIndex(rootDir);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${JSON.stringify(index, null, 2)}\n`, "utf8");
  return { outPath: target, index };
}

/**
 * @param {string} [rootDir]
 * @returns {{ ok: boolean, message?: string }}
 */
export function validatePhenomeRelationshipIndexFresh(rootDir = process.cwd()) {
  const target = path.join(rootDir, "src/data/phenome-relationships.generated.json");
  if (!fs.existsSync(target)) {
    return { ok: false, message: "missing src/data/phenome-relationships.generated.json — run npm run phenome:index" };
  }
  const onDisk = JSON.parse(fs.readFileSync(target, "utf8"));
  const fresh = buildPhenomeRelationshipIndex(rootDir);
  const stripMeta = (idx) => {
    const { meta: _a, ...rest } = idx;
    return rest;
  };
  const diskBody = JSON.stringify(stripMeta(onDisk));
  const freshBody = JSON.stringify(stripMeta(fresh));
  if (diskBody !== freshBody) {
    return {
      ok: false,
      message: "phenome-relationships.generated.json is stale — run npm run phenome:index",
    };
  }
  return { ok: true };
}
