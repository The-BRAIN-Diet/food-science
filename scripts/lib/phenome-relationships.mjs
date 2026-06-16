/**
 * Phenome relationship constants, validation, and section rendering.
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

/** FM §2 — concise integrated outcome context (not a PM roll-up graph). */
export const FM_OUTCOME_CONTEXT_SECTION_TITLE = "Functional Outcome Context";

/** @deprecated Use FM_OUTCOME_CONTEXT_SECTION_TITLE */
export const FM_PHENOME_SECTION_TITLE = FM_OUTCOME_CONTEXT_SECTION_TITLE;

export const FM_OUTCOME_CONTEXT_DISCLAIMER =
  "These outcomes describe translational contexts for the FM as an integrated biological capacity. They are not single-mechanism treatment claims. Confidence may increase where multiple child PMs converge on the same functional outcome.";

export const FM_OUTCOME_CONTEXT_EMPTY_MESSAGE =
  "No functional outcome context currently mapped.";

export const FM_OUTCOME_CONTEXT_MAX = 4;

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

const CONFIDENCE_DISPLAY = {
  low: "Low",
  "low-medium": "Low–Medium",
  medium: "Medium",
  high: "High",
};

function rankConfidence(value) {
  return CONFIDENCE_RANK[String(value).trim()] ?? 0;
}

function extractFmOutcomeContextSection(content) {
  const fmTitle = FM_OUTCOME_CONTEXT_SECTION_TITLE;
  const fmHeading = new RegExp(
    `^##\\s+2\\.\\s+${fmTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*$`,
    "m",
  );
  const match = content.match(fmHeading);
  if (!match || match.index === undefined) return null;
  const start = match.index;
  const after = content.slice(start);
  const nextSection = after.slice(1).search(/^## \d+\. /m);
  return nextSection === -1 ? after : after.slice(0, 1 + nextSection);
}

function confidenceFromRank(rank) {
  return CONFIDENCE_BY_RANK[rank] ?? "low";
}

export function formatOutcomeConfidence(confidence) {
  const key = String(confidence || "").trim();
  return CONFIDENCE_DISPLAY[key] ?? key;
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

export function validateFunctionalOutcomeContextRow(row, issues, { entityLabel, index }) {
  const prefix = `${entityLabel}: functional_outcome_context[${index}]`;
  if (!row || typeof row !== "object") {
    issues.push({ code: "invalid_fm_outcome_row", message: `${prefix} must be an object` });
    return;
  }
  if (!row.outcome_name || String(row.outcome_name).trim() === "") {
    issues.push({ code: "missing_fm_outcome_name", message: `${prefix} requires outcome_name` });
  }
  if (!PHENOME_CONFIDENCE_VALUES.has(String(row.confidence || "").trim())) {
    issues.push({
      code: "invalid_fm_outcome_confidence",
      message: `${prefix} confidence must be low | low-medium | medium | high`,
    });
  }
  if (!row.synthesis || String(row.synthesis).trim() === "") {
    issues.push({ code: "missing_fm_outcome_synthesis", message: `${prefix} requires synthesis` });
  }
  if (row.references !== undefined && !Array.isArray(row.references)) {
    issues.push({
      code: "invalid_fm_outcome_references",
      message: `${prefix} references must be an array`,
    });
  }
}

export function validateFmOutcomeContextFrontMatter(data, issues, { entityLabel }) {
  const rows = data.functional_outcome_context;
  if (rows === undefined) return;
  if (!Array.isArray(rows)) {
    issues.push({
      code: "invalid_functional_outcome_context",
      message: `${entityLabel}: functional_outcome_context must be an array`,
    });
    return;
  }
  if (rows.length > FM_OUTCOME_CONTEXT_MAX) {
    issues.push({
      code: "fm_outcome_context_too_many",
      message: `${entityLabel}: functional_outcome_context must have at most ${FM_OUTCOME_CONTEXT_MAX} outcomes`,
    });
  }
  for (const [i, row] of rows.entries()) {
    validateFunctionalOutcomeContextRow(row, issues, { entityLabel, index: i });
  }
  if (data.connected_phenomes !== undefined) {
    issues.push({
      code: "deprecated_connected_phenomes",
      message: `${entityLabel}: remove connected_phenomes — use functional_outcome_context on FM pages (full graph roll-up belongs on future phenome pages)`,
    });
  }
}

/** @deprecated Use validateFmOutcomeContextFrontMatter */
export function validateFmPhenomeFrontMatter(data, issues, ctx) {
  validateFmOutcomeContextFrontMatter(data, issues, ctx);
}

/**
 * When an FM has exactly one child PM, §2 outcome names and confidence must align
 * with that PM's phenome_relationships (Single-PM FM 1:1 rule).
 * @see system/phenome-relationship-schema.md
 */
export function validateSinglePmFmOutcomeAlignment(fmData, childPmData, issues, { entityLabel, childPmId }) {
  const pms = fmData?.mechanisms_covered;
  if (!Array.isArray(pms) || pms.length !== 1) return;

  const pmRels = Array.isArray(childPmData?.phenome_relationships)
    ? childPmData.phenome_relationships
    : [];
  const fmOutcomes = Array.isArray(fmData?.functional_outcome_context)
    ? fmData.functional_outcome_context
    : [];

  const pmMapped = pmRels.length > 0;
  const fmMapped = fmOutcomes.length > 0;

  if (!pmMapped && !fmMapped) return;

  if (pmMapped && !fmMapped) {
    issues.push({
      code: "single_pm_fm_outcome_missing",
      message: `${entityLabel}: functional_outcome_context is required when sole child PM ${childPmId} has phenome_relationships (Single-PM FM 1:1 rule)`,
    });
    return;
  }

  if (!pmMapped && fmMapped) {
    issues.push({
      code: "single_pm_fm_outcome_orphan",
      message: `${entityLabel}: remove functional_outcome_context or add phenome_relationships on sole child PM ${childPmId} (Single-PM FM 1:1 rule)`,
    });
    return;
  }

  const pmByPhenome = new Map(
    pmRels.map((rel) => [String(rel.target_phenome || "").trim(), rel]),
  );
  const fmByOutcome = new Map(
    fmOutcomes.map((row) => [String(row.outcome_name || "").trim(), row]),
  );

  if (pmByPhenome.size !== fmByOutcome.size) {
    issues.push({
      code: "single_pm_fm_phenome_count_mismatch",
      message: `${entityLabel}: functional_outcome_context must include the same phenome count as sole child PM ${childPmId} (${pmByPhenome.size} expected, ${fmByOutcome.size} found)`,
    });
  }

  for (const [phenome, pmRel] of pmByPhenome) {
    if (!phenome) continue;
    const fmRow = fmByOutcome.get(phenome);
    if (!fmRow) {
      issues.push({
        code: "single_pm_fm_phenome_missing",
        message: `${entityLabel}: functional_outcome_context must include "${phenome}" to match sole child PM ${childPmId} (Single-PM FM 1:1 rule)`,
      });
      continue;
    }
    if (fmRow.confidence !== pmRel.confidence) {
      issues.push({
        code: "single_pm_fm_confidence_mismatch",
        message: `${entityLabel}: "${phenome}" confidence must be "${pmRel.confidence}" to match sole child PM ${childPmId} (found "${fmRow.confidence}")`,
      });
    }
  }

  for (const [outcomeName] of fmByOutcome) {
    if (!outcomeName) continue;
    if (!pmByPhenome.has(outcomeName)) {
      issues.push({
        code: "single_pm_fm_phenome_extra",
        message: `${entityLabel}: remove FM-only outcome "${outcomeName}" — sole child PM ${childPmId} does not map this phenome (Single-PM FM 1:1 rule)`,
      });
    }
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
 * Aggregate child PM phenome_relationships for future phenome graph pages.
 * Not rendered on FM pages.
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

export function renderFmOutcomeContextSectionBody(outcomes = []) {
  const lines = [`## 2. ${FM_OUTCOME_CONTEXT_SECTION_TITLE}`, "", FM_OUTCOME_CONTEXT_DISCLAIMER, ""];
  if (!outcomes.length) {
    lines.push(FM_OUTCOME_CONTEXT_EMPTY_MESSAGE);
    return lines.join("\n");
  }

  for (const row of outcomes) {
    const target = row.outcome_name;
    lines.push("<details>");
    lines.push(`<summary><strong>${target}</strong></summary>`);
    lines.push("");
    lines.push(`- **Confidence:** ${row.confidence}`);
    lines.push(`- **Synthesis:** ${String(row.synthesis).trim()}`);
    if (Array.isArray(row.references) && row.references.length > 0) {
      lines.push("- **Key References:**");
      lines.push("  <ul>");
      for (const ref of row.references) {
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

/** @deprecated Use renderFmOutcomeContextSectionBody */
export function renderFmPhenomeSectionBody(outcomes = []) {
  return renderFmOutcomeContextSectionBody(outcomes);
}

export function validatePhenomeSectionBody(content, issues, { entityLabel, kind }) {
  if (kind === "pm") {
    const heading = new RegExp(
      `^##\\s+3\\.\\s+${PM_PHENOME_SECTION_TITLE.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*$`,
      "m",
    );
    if (!heading.test(content)) {
      issues.push({
        code: "missing_phenome_section",
        message: `${entityLabel}: published body must include "## 3. ${PM_PHENOME_SECTION_TITLE}" after Functional Role`,
      });
      return;
    }
    if (!content.includes(PHENOME_DISCLAIMER)) {
      issues.push({
        code: "missing_phenome_disclaimer",
        message: `${entityLabel}: §3 must include the canonical phenome disclaimer`,
      });
    }
    return;
  }

  const fmTitle = FM_OUTCOME_CONTEXT_SECTION_TITLE;
  const fmHeading = new RegExp(
    `^##\\s+2\\.\\s+${fmTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*$`,
    "m",
  );
  if (!fmHeading.test(content)) {
    issues.push({
      code: "missing_fm_outcome_context_section",
      message: `${entityLabel}: published body must include "## 2. ${fmTitle}" after Definition`,
    });
    return;
  }
  if (!content.includes(FM_OUTCOME_CONTEXT_DISCLAIMER)) {
    issues.push({
      code: "missing_fm_outcome_context_disclaimer",
      message: `${entityLabel}: §2 must include the FM functional outcome context disclaimer`,
    });
  }
  const fmSection = extractFmOutcomeContextSection(content);
  if (fmSection && fmSection.includes("<details>") === false && !fmSection.includes(FM_OUTCOME_CONTEXT_EMPTY_MESSAGE)) {
    issues.push({
      code: "fm_outcome_context_dropdowns",
      message: `${entityLabel}: FM §2 outcomes must use <details> dropdowns (see renderFmOutcomeContextSectionBody)`,
    });
  }
  if (fmSection && /^###\s+/m.test(fmSection)) {
    issues.push({
      code: "fm_outcome_context_heading_blocks",
      message: `${entityLabel}: FM §2 must not use ### outcome headings — use <details> dropdowns`,
    });
  }
  if (/\|\s*Phenome\s*\|\s*Connected PMs\s*\|/m.test(content)) {
    issues.push({
      code: "fm_phenome_rollup_table",
      message: `${entityLabel}: FM §2 must not include PM phenome roll-up tables`,
    });
  }
  if (/contributing PMs/i.test(content)) {
    issues.push({
      code: "fm_phenome_pm_list",
      message: `${entityLabel}: FM §2 must not list contributing child PMs`,
    });
  }
}
