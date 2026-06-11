/**
 * Phenome relationship constants, validation, and FM roll-up aggregation.
 * @see system/phenome-relationship-schema.md
 */

export const PHENOME_RELATIONSHIP_TYPES = new Set([
  "supports",
  "disrupts",
  "modulates",
  "indirect",
]);

export const PHENOME_CONFIDENCE_VALUES = new Set([
  "low",
  "low-medium",
  "medium",
  "high",
]);

export const PHENOME_EVIDENCE_LEVELS = new Set([
  "mechanistic",
  "observational",
  "intervention",
  "clinical",
]);

export const PHENOME_DISCLAIMER =
  "These mappings are translational relationships, not single-mechanism outcome claims. Phenomes are emergent functional patterns supported by multiple interacting PMs across the BRAIN Framework.";

export const PHENOME_EMPTY_MESSAGE =
  "No direct functional outcome relationship currently mapped.";

export const PM_PHENOME_SECTION_TITLE = "Target Functional Outcome / Phenome";
export const FM_PHENOME_SECTION_TITLE = "Connected Phenomes / Functional Outcomes";

const RELATIONSHIP_STRENGTH = {
  supports: 4,
  modulates: 3,
  indirect: 2,
  disrupts: 1,
};

const EVIDENCE_RANK = {
  mechanistic: 1,
  observational: 2,
  intervention: 3,
  clinical: 4,
};

const CONFIDENCE_RANK = {
  low: 1,
  "low-medium": 1.5,
  medium: 2,
  high: 3,
};

const CONFIDENCE_BY_RANK = {
  1: "low",
  1.5: "low-medium",
  2: "medium",
  3: "high",
};

function rankConfidence(value) {
  return CONFIDENCE_RANK[String(value).trim()] ?? 0;
}

function confidenceFromRank(rank) {
  return CONFIDENCE_BY_RANK[rank] ?? "low";
}

export function validatePhenomeRelationshipRow(row, issues, { entityLabel, index }) {
  const prefix = `${entityLabel}: phenome_relationships[${index}]`;
  if (!row || typeof row !== "object") {
    issues.push({ code: "invalid_phenome_row", message: `${prefix} must be an object` });
    return;
  }
  if (!row.target_phenome || String(row.target_phenome).trim() === "") {
    issues.push({ code: "missing_target_phenome", message: `${prefix} requires target_phenome` });
  }
  if (!PHENOME_RELATIONSHIP_TYPES.has(String(row.relationship_type || "").trim())) {
    issues.push({
      code: "invalid_relationship_type",
      message: `${prefix} relationship_type must be supports | disrupts | modulates | indirect`,
    });
  }
  if (!PHENOME_CONFIDENCE_VALUES.has(String(row.confidence || "").trim())) {
    issues.push({
      code: "invalid_phenome_confidence",
      message: `${prefix} confidence must be low | low-medium | medium | high`,
    });
  }
  if (!PHENOME_EVIDENCE_LEVELS.has(String(row.evidence_level || "").trim())) {
    issues.push({
      code: "invalid_evidence_level",
      message: `${prefix} evidence_level must be mechanistic | observational | intervention | clinical`,
    });
  }
  if (!row.rationale || String(row.rationale).trim() === "") {
    issues.push({ code: "missing_phenome_rationale", message: `${prefix} requires rationale` });
  }
  if (row.references !== undefined && !Array.isArray(row.references)) {
    issues.push({ code: "invalid_phenome_references", message: `${prefix} references must be an array` });
  }
}

export function validatePmPhenomeFrontMatter(data, issues, { entityLabel }) {
  const rows = data.phenome_relationships;
  if (rows === undefined) return;
  if (!Array.isArray(rows)) {
    issues.push({
      code: "invalid_phenome_relationships",
      message: `${entityLabel}: phenome_relationships must be an array`,
    });
    return;
  }
  for (const [i, row] of rows.entries()) {
    validatePhenomeRelationshipRow(row, issues, { entityLabel, index: i });
  }
}

export function validateConnectedPhenomeRow(row, issues, { entityLabel, index }) {
  const prefix = `${entityLabel}: connected_phenomes[${index}]`;
  if (!row?.target_phenome) {
    issues.push({ code: "missing_fm_target_phenome", message: `${prefix} requires target_phenome` });
  }
  if (row?.overall_confidence && !PHENOME_CONFIDENCE_VALUES.has(String(row.overall_confidence).trim())) {
    issues.push({ code: "invalid_fm_overall_confidence", message: `${prefix} invalid overall_confidence` });
  }
}

export function validateFmPhenomeFrontMatter(data, issues, { entityLabel }) {
  const rows = data.connected_phenomes;
  if (rows === undefined) return;
  if (!Array.isArray(rows)) {
    issues.push({
      code: "invalid_connected_phenomes",
      message: `${entityLabel}: connected_phenomes must be an array`,
    });
    return;
  }
  for (const [i, row] of rows.entries()) {
    validateConnectedPhenomeRow(row, issues, { entityLabel, index: i });
  }
}

function pickStrongestRelationship(types) {
  return types.reduce((best, t) => {
    const rank = RELATIONSHIP_STRENGTH[t] ?? 0;
    return rank > (RELATIONSHIP_STRENGTH[best] ?? 0) ? t : best;
  }, types[0]);
}

function pickHighestEvidence(levels) {
  return levels.reduce((best, l) => {
    const rank = EVIDENCE_RANK[l] ?? 0;
    return rank > (EVIDENCE_RANK[best] ?? 0) ? l : best;
  }, levels[0]);
}

function rollupConfidence(rows) {
  const maxRank = Math.max(...rows.map((r) => rankConfidence(r.confidence)));
  const supportiveCount = rows.filter((r) =>
    ["supports", "modulates"].includes(r.relationship_type),
  ).length;
  let rank = maxRank;
  if (supportiveCount >= 2 && rank < 3) {
    rank = rank === 1 ? 1.5 : rank === 1.5 ? 2 : 3;
  }
  return confidenceFromRank(rank);
}

/**
 * Aggregate child PM phenome_relationships into FM connected_phenomes rows.
 * @param {Array<{ pm_id: string, pm_name?: string, pm_href?: string, phenome_relationships?: Array }>} childPms
 */
export function aggregateFmConnectedPhenomes(childPms) {
  const byPhenome = new Map();

  for (const pm of childPms) {
    const rels = pm.phenome_relationships;
    if (!Array.isArray(rels) || rels.length === 0) continue;
    for (const rel of rels) {
      const key = String(rel.target_phenome || "").trim();
      if (!key) continue;
      if (!byPhenome.has(key)) byPhenome.set(key, []);
      byPhenome.get(key).push({
        ...rel,
        pm_id: pm.pm_id,
        pm_name: pm.pm_name,
        pm_href: pm.pm_href,
      });
    }
  }

  const out = [];
  for (const [target_phenome, rows] of byPhenome.entries()) {
    const types = rows.map((r) => r.relationship_type);
    const levels = rows.map((r) => r.evidence_level);
    out.push({
      target_phenome,
      connected_pm_count: rows.length,
      strongest_relationship_type: pickStrongestRelationship(types),
      highest_evidence_level: pickHighestEvidence(levels),
      overall_confidence: rollupConfidence(rows),
      evidence_summary: rows.map((r) => r.rationale).filter(Boolean).join(" "),
      contributing_pms: rows.map((r) => ({
        id: r.pm_id,
        name: r.pm_name || r.pm_id,
        href: r.pm_href || "",
        relationship_type: r.relationship_type,
        confidence: r.confidence,
        evidence_level: r.evidence_level,
      })),
    });
  }

  return out.sort((a, b) => a.target_phenome.localeCompare(b.target_phenome));
}

export function renderPmPhenomeSectionBody(relationships = []) {
  const lines = [`## 2. ${PM_PHENOME_SECTION_TITLE}`, "", PHENOME_DISCLAIMER, ""];
  if (!relationships.length) {
    lines.push(PHENOME_EMPTY_MESSAGE);
    return lines.join("\n");
  }

  for (const rel of relationships) {
    const target = rel.target_phenome;
    const type = rel.relationship_type;
    lines.push("<details>");
    lines.push(`<summary><strong>${target} — ${type}</strong></summary>`);
    lines.push("");
    lines.push(`- **Confidence:** ${rel.confidence}`);
    lines.push(`- **Evidence Level:** ${rel.evidence_level}`);
    lines.push(`- **Rationale:** ${rel.rationale}`);
    if (Array.isArray(rel.references) && rel.references.length > 0) {
      lines.push("- **Key References:**");
      // HTML anchors — markdown links inside <details> are not reliably parsed by MDX.
      lines.push("  <ul>");
      for (const ref of rel.references) {
        const href = ref.href || `/docs/papers/BRAIN-Diet-References#${ref.citation_key}`;
        const label = ref.label || ref.citation_key;
        lines.push(`    <li><a href="${href}">${label}</a></li>`);
      }
      lines.push("  </ul>");
    }
    lines.push("");
    lines.push("</details>");
    lines.push("");
  }

  return lines.join("\n").trimEnd();
}

export function renderFmPhenomeSectionBody(connectedPhenomes = []) {
  const lines = [`## 2. ${FM_PHENOME_SECTION_TITLE}`, "", PHENOME_DISCLAIMER, ""];
  if (!connectedPhenomes.length) {
    lines.push(PHENOME_EMPTY_MESSAGE);
    return lines.join("\n");
  }

  lines.push(
    "| Phenome | Connected PMs | Strongest Relationship | Highest Evidence Level | Overall Confidence | Evidence Summary |",
  );
  lines.push("|---|---:|---|---|---|---|");
  for (const row of connectedPhenomes) {
    lines.push(
      `| ${row.target_phenome} | ${row.connected_pm_count ?? row.contributing_pms?.length ?? 0} | ${row.strongest_relationship_type} | ${row.highest_evidence_level} | ${row.overall_confidence} | ${row.evidence_summary} |`,
    );
  }
  lines.push("");

  for (const row of connectedPhenomes) {
    const pms = row.contributing_pms;
    if (!Array.isArray(pms) || pms.length === 0) continue;
    lines.push("<details>");
    lines.push(`<summary><strong>${row.target_phenome} — contributing PMs</strong></summary>`);
    lines.push("");
    for (const pm of pms) {
      const link = pm.href ? `[${pm.id} — ${pm.name}](${pm.href})` : `${pm.id} — ${pm.name}`;
      lines.push(`- ${link} (${pm.relationship_type}; ${pm.confidence}; ${pm.evidence_level})`);
    }
    lines.push("");
    lines.push("</details>");
    lines.push("");
  }

  return lines.join("\n").trimEnd();
}

export function validatePhenomeSectionBody(content, issues, { entityLabel, kind }) {
  const title = kind === "fm" ? FM_PHENOME_SECTION_TITLE : PM_PHENOME_SECTION_TITLE;
  const heading = new RegExp(`^##\\s+2\\.\\s+${title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*$`, "m");
  if (!heading.test(content)) {
    issues.push({
      code: "missing_phenome_section",
      message: `${entityLabel}: published body must include "## 2. ${title}" after Definition`,
    });
    return;
  }
  if (!content.includes(PHENOME_DISCLAIMER)) {
    issues.push({
      code: "missing_phenome_disclaimer",
      message: `${entityLabel}: §2 must include the canonical phenome disclaimer`,
    });
  }
}
