/**
 * Canonical Phenome Registry — load, match, and validate.
 * @see src/data/phenome-registry.json
 * @see system/phenome-relationship-schema.md
 */

import fs from "node:fs";
import path from "node:path";

const DEFAULT_REGISTRY_PATH = "src/data/phenome-registry.json";

/**
 * @param {string} [rootDir]
 * @param {string} [registryPath]
 */
export function loadPhenomeRegistry(rootDir = process.cwd(), registryPath) {
  const target = path.join(rootDir, registryPath || DEFAULT_REGISTRY_PATH);
  if (!fs.existsSync(target)) {
    throw new Error(`Missing phenome registry: ${target}`);
  }
  const data = JSON.parse(fs.readFileSync(target, "utf8"));
  if (!Array.isArray(data.phenomes)) {
    throw new Error("phenome-registry.json: phenomes must be an array");
  }
  return data;
}

/**
 * @param {{ phenomes: Array<{ id: string, name: string }> }} registry
 */
export function buildRegistryNameIndex(registry) {
  /** @type {Map<string, { id: string, name: string }>} */
  const byName = new Map();
  /** @type {Map<string, { id: string, name: string }>} */
  const byId = new Map();

  for (const entry of registry.phenomes) {
    const name = String(entry.name || "").trim();
    const id = String(entry.id || "").trim();
    if (!name || !id) continue;
    byName.set(name, entry);
    byId.set(id, entry);
  }
  return { byName, byId };
}

/**
 * @param {Array<Record<string, unknown>>} relationships
 * @param {{ phenomes: Array<{ id: string, name: string }> }} registry
 */
export function enrichRelationshipsWithPhenomeIds(relationships, registry) {
  const { byName } = buildRegistryNameIndex(registry);
  return relationships.map((row) => {
    const label = String(row.targetPhenome || "").trim();
    const match = label ? byName.get(label) : undefined;
    return {
      ...row,
      targetPhenomeId: match?.id ?? null,
    };
  });
}

/**
 * @param {Array<{ targetPhenome?: string, targetPhenomeId?: string | null }>} relationships
 * @param {{ phenomes: Array<{ id: string, name: string, status?: string }> }} registry
 */
export function buildPhenomeRegistryDiagnostics(relationships, registry) {
  const { byName, byId } = buildRegistryNameIndex(registry);
  const connectedIds = new Set(
    relationships.filter((r) => r.targetPhenomeId).map((r) => r.targetPhenomeId),
  );
  const connectedLabels = new Set(
    relationships.map((r) => String(r.targetPhenome || "").trim()).filter(Boolean),
  );

  /** @type {string[]} */
  const unmappedPhenomeLabels = [];
  /** @type {Array<{ sourceNode: string, targetPhenome: string }>} */
  const edgesWithNullPhenomeId = [];
  let edgesMissingTargetPhenome = 0;

  for (const row of relationships) {
    const label = String(row.targetPhenome || "").trim();
    if (!label) {
      edgesMissingTargetPhenome += 1;
      continue;
    }
    if (!byName.has(label)) {
      if (!unmappedPhenomeLabels.includes(label)) unmappedPhenomeLabels.push(label);
    }
    if (row.targetPhenomeId == null) {
      edgesWithNullPhenomeId.push({
        sourceNode: String(row.sourceNode || ""),
        targetPhenome: label,
      });
    }
  }
  unmappedPhenomeLabels.sort();

  /** @type {string[]} */
  const duplicateRegistryNames = [];
  const seenNames = new Map();
  for (const entry of registry.phenomes) {
    const name = String(entry.name || "").trim();
    if (!name) continue;
    const lower = name.toLowerCase();
    if (seenNames.has(lower)) {
      duplicateRegistryNames.push(name);
    } else {
      seenNames.set(lower, entry.id);
    }
  }

  /** @type {Array<{ id: string, name: string }>} */
  const orphanRegistryPhenomes = registry.phenomes
    .filter((p) => (p.status || "active") === "active")
    .filter((p) => !connectedIds.has(p.id))
    .map((p) => ({ id: p.id, name: p.name }))
    .sort((a, b) => a.id.localeCompare(b.id));

  /** Labels in edges not in registry (alias for unmapped) */
  const labelsInEdgesNotInRegistry = [...connectedLabels].filter((l) => !byName.has(l)).sort();

  return {
    registryPhenomeCount: registry.phenomes.length,
    relationshipEdgeCount: relationships.length,
    mappedEdgeCount: relationships.filter((r) => r.targetPhenomeId).length,
    unmappedPhenomeLabels,
    labelsInEdgesNotInRegistry,
    edgesMissingTargetPhenome,
    edgesWithNullPhenomeId,
    duplicateRegistryNames,
    orphanRegistryPhenomes,
    reviewFlags: registry.reviewFlags || [],
  };
}

/**
 * @param {string} [rootDir]
 * @returns {{ ok: boolean, issues: Array<{ code: string, message: string }>, diagnostics: ReturnType<typeof buildPhenomeRegistryDiagnostics> }}
 */
export function validatePhenomeRegistry(rootDir = process.cwd()) {
  const registry = loadPhenomeRegistry(rootDir);
  const indexPath = path.join(rootDir, "src/data/phenome-relationships.generated.json");
  /** @type {Array<Record<string, unknown>>} */
  let relationships = [];
  if (fs.existsSync(indexPath)) {
    const index = JSON.parse(fs.readFileSync(indexPath, "utf8"));
    relationships = Array.isArray(index.relationships) ? index.relationships : [];
  }

  const enriched = enrichRelationshipsWithPhenomeIds(relationships, registry);
  const diagnostics = buildPhenomeRegistryDiagnostics(enriched, registry);
  /** @type {Array<{ code: string, message: string }>} */
  const issues = [];

  for (const entry of registry.phenomes) {
    for (const field of ["id", "name", "slug", "description", "publicSummary", "status"]) {
      const v = entry[field];
      if (v === undefined || v === null || String(v).trim() === "") {
        issues.push({
          code: "registry_missing_field",
          message: `${entry.id || entry.name || "unknown"}: missing required field ${field}`,
        });
      }
    }
    if (!Array.isArray(entry.primaryDomains) || entry.primaryDomains.length === 0) {
      issues.push({
        code: "registry_missing_primary_domains",
        message: `${entry.id || entry.name}: primaryDomains must be a non-empty array`,
      });
    }
  }

  if (diagnostics.duplicateRegistryNames.length > 0) {
    issues.push({
      code: "registry_duplicate_names",
      message: `Duplicate registry phenome names: ${diagnostics.duplicateRegistryNames.join(", ")}`,
    });
  }

  if (diagnostics.edgesMissingTargetPhenome > 0) {
    issues.push({
      code: "edge_missing_target_phenome",
      message: `${diagnostics.edgesMissingTargetPhenome} relationship edge(s) missing targetPhenome`,
    });
  }

  for (const label of diagnostics.unmappedPhenomeLabels) {
    issues.push({
      code: "unmapped_phenome_label",
      message: `Relationship label not in registry (add registry entry or fix PM front matter): "${label}"`,
    });
  }

  /** @type {Array<{ code: string, message: string }>} */
  const warnings = [];
  for (const orphan of diagnostics.orphanRegistryPhenomes) {
    warnings.push({
      code: "orphan_registry_phenome",
      message: `Registered phenome has no connected mechanisms: ${orphan.id} — ${orphan.name}`,
    });
  }

  return { ok: issues.length === 0, issues, warnings, diagnostics };
}
