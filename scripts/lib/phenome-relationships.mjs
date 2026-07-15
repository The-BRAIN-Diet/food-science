/**
 * Phenome relationship constants, validation, and section rendering.
 * @see system/phenome-relationship-schema.md
 */

import {
  classifyReferenceEvidence,
  suggestedEvidenceConfidence,
} from "./phenome-evidence-hierarchy.mjs";
import { toReferenceLabel, topicFromBibKey } from "./brs-citation-migration.mjs";
import {
  normalizeReferenceDataLevel,
  phenomeRefToBibItem,
  REFERENCE_DATA_LEVELS,
} from "./reference-data-levels.mjs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderHubCollapsible } from "./hub-collapsible.mjs";
import {
  loadPhenomeRegistry,
  phenomeDetailUrlForName,
} from "./phenome-registry.mjs";

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

/** @type {ReturnType<typeof loadPhenomeRegistry> | null} */
let phenomeRegistryCache = null;

function getPhenomeRegistry() {
  if (!phenomeRegistryCache) {
    phenomeRegistryCache = loadPhenomeRegistry(PROJECT_ROOT);
  }
  return phenomeRegistryCache;
}

function phenomeCollapsibleOptions(phenomeName) {
  const openHref = phenomeDetailUrlForName(phenomeName, getPhenomeRegistry());
  return openHref ? { openHref, openLabel: "Open Page →" } : {};
}

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

export const PHENOME_BIOLOGY_CONFIDENCE_LABEL = "Biology → Phenome Confidence";

export const PHENOME_EVIDENCE_LEVEL_LABEL = "Evidence Level";

export const PHENOME_EVIDENCE_CONFIDENCE_LABEL = "Evidence Confidence";

const PHENOME_SCORING_KEY_PANEL_BODY = `<div class="phenome-scoring-key">
<p class="phenome-scoring-key-intro">
These are <strong>three independent scores</strong>. They are not combined or averaged.
A phenome can have <strong>Medium</strong> registry evidence while individual mechanism
rows show different Biology → Phenome and Evidence scores.
</p>
<div class="phenome-scoring-key-section">
<p class="phenome-scoring-key-heading">
<strong>1. Phenome Evidence Confidence</strong> (Phenome Registry only)
</p>
<p class="phenome-scoring-key-body">
<strong>Question:</strong> How convincing is the foundational evidence that this
phenome is a valid, well-defined functional construct — and that diet-relevant
biology can plausibly connect to it?
</p>
<p class="phenome-scoring-key-body">
<strong>Not</strong> a roll-up of Biology → Phenome Confidence or Evidence
Confidence from Primary Mechanism page rows. Those are scored per mechanism; this
score is assigned once per phenome at registry level.
</p>
<p class="phenome-scoring-key-body">
<strong>Derived from</strong> foundational landmark evidence organised in up to
three layers: construct validation, biology→phenome linkage, and nutrition→biology
modulation. Each layer may include one or many landmark papers depending on registry
review.
</p>
</div>
<div class="phenome-scoring-key-section">
<p class="phenome-scoring-key-heading">
<strong>2. Biology → Phenome Confidence</strong> (Primary Mechanism page §3 rows)
</p>
<p class="phenome-scoring-key-body">
<strong>Question:</strong> If this PM/FM biology were substantially impaired in
isolation, how directly would that phenome be expected to suffer — within BRAIN
architecture?
</p>
<p class="phenome-scoring-key-body">
<strong>How it is derived:</strong> Reviewers read the PM/FM <em>definition and
biological function first</em> — initially <em>ignoring</em> attached references and
whether dietary intervention studies exist. References are reviewed only when scoring
Evidence Confidence (below).
</p>
<p class="phenome-scoring-key-body">
<strong>Score levels</strong> (the value shown on each row as <em>Biology → Phenome Confidence</em>):
</p>
<ul class="phenome-scoring-key-sublist">
<li><strong>High</strong> — primary biological determinant (e.g. noradrenergic signalling → attention; GABA synthesis → calming tone)</li>
<li><strong>Medium</strong> — major contributory determinant, not the sole driver</li>
<li><strong>Low–Medium</strong> — established but indirect, modulatory, or one integrative step removed</li>
<li><strong>Low</strong> — distal, conditional, or weak biological coupling</li>
</ul>
<p class="phenome-scoring-key-body">
<strong>“Not dietary treatment efficacy”</strong> means this score does not ask
whether a diet or supplement <em>treats</em> the phenome. It asks whether the
<em>biology itself</em> is architecturally relevant. Limited dietary RCT evidence
belongs in Evidence Confidence, not here.
</p>
</div>
<div class="phenome-scoring-key-section">
<p class="phenome-scoring-key-heading">
<strong>3. Evidence Confidence</strong> (Primary Mechanism page §3 rows)
</p>
<p class="phenome-scoring-key-body">
<strong>Question:</strong> How convincing are the <strong>attached Key References</strong>
on that specific row that this biology actually relates to this phenome?
</p>
<p class="phenome-scoring-key-body">
<strong>How it is derived:</strong> Assigned <em>after</em> Biology → Phenome
Confidence, by reviewing only the references on that PM/FM row. Judges whether refs
support the <em>relationship</em> — not just mechanism or phenome in isolation.
</p>
<ul class="phenome-scoring-key-sublist">
<li><strong>High</strong> — strong convergent human evidence directly linking mechanism biology to phenome variation</li>
<li><strong>Medium</strong> — multiple human lines supporting the relationship; may include one bridge study with an inferential step</li>
<li><strong>Low–Medium</strong> — convergent translational stack without direct mechanism↔phenome measurement on the row</li>
<li><strong>Low</strong> — mechanistic or preclinical only; mechanism and phenome supported separately but not bridged</li>
</ul>
<p class="phenome-scoring-key-body">
Often equal to or <em>lower than</em> Biology → Phenome Confidence. Can occasionally
be higher when outcome evidence is stronger than the mechanism's contributory role.
</p>
</div>
</div>`;

/** Static hub collapsible — MDX does not reliably render the React PhenomeScoringKey component. */
export function renderPhenomeScoringKeyHub() {
  return renderHubCollapsible("How confidence scores differ", PHENOME_SCORING_KEY_PANEL_BODY).replace(
    '<div class="brs-fm-hub-item"',
    '<div class="brs-fm-hub-item phenome-scoring-key-hub"',
  );
}

export const PHENOME_SCORING_KEY_MARKUP = `${renderPhenomeScoringKeyHub()}\n`;

export const PHENOME_DISCLAIMER =
  "These mappings are translational relationships, not single-mechanism outcome claims. Phenomes are emergent functional patterns supported by multiple interacting PMs across the BRAIN Framework. Biology → Phenome Confidence reflects how directly this mechanism's biology would be expected to affect the phenome within BRAIN architecture — not dietary treatment efficacy. Evidence Confidence (below Key References) reflects how convincing the attached evidence is for the Biology → Phenome relationship on that row.";

export const PHENOME_EMPTY_MESSAGE =
  "No direct functional outcome relationship currently mapped.";

export const PRIMARY_BIOLOGICAL_EFFECTS_SECTION_TITLE = "Primary Biological Effects";

export const PHENOME_CONNECTIONS_SECTION_TITLE = "Phenome Connections";

/** PM §3 — translational phenome mappings. */
export const PM_PHENOME_SECTION_TITLE = PHENOME_CONNECTIONS_SECTION_TITLE;

/** FM §3 — concise integrated outcome context (not a PM roll-up graph). */
export const FM_PHENOME_CONNECTIONS_SECTION_TITLE = PHENOME_CONNECTIONS_SECTION_TITLE;

/** @deprecated Use FM_PHENOME_CONNECTIONS_SECTION_TITLE */
export const FM_OUTCOME_CONTEXT_SECTION_TITLE = FM_PHENOME_CONNECTIONS_SECTION_TITLE;

/** @deprecated Use FM_PHENOME_CONNECTIONS_SECTION_TITLE */
export const FM_PHENOME_SECTION_TITLE = FM_PHENOME_CONNECTIONS_SECTION_TITLE;

export const FM_OUTCOME_CONTEXT_DISCLAIMER =
  "These outcomes describe translational contexts for the FM as an integrated biological capacity. They are not single-mechanism treatment claims. Biology → Phenome Confidence reflects biological relevance to each outcome — not proof that diet or lifestyle alone will improve it. Evidence Confidence (below Key References) reflects how convincing the attached evidence is for the Biology → Phenome relationship on that row. FM confidence uplift: FM confidence may exceed that of any individual child PM only where multiple PMs converge on the same phenome and the integrated FM biology provides additional biological rationale (biological uplift) beyond the individual mechanisms.";

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
  const fmTitle = FM_PHENOME_CONNECTIONS_SECTION_TITLE;
  const fmHeading = new RegExp(
    `^##\\s+3\\.\\s+${fmTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*$`,
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

export function resolveEvidenceConfidence(row, references = []) {
  const key = String(row?.evidence_confidence || row?.research_confidence || "").trim();
  if (PHENOME_CONFIDENCE_VALUES.has(key)) return key;
  return suggestedEvidenceConfidence(classifyReferenceEvidence(references));
}

/** @deprecated Use resolveEvidenceConfidence */
export const resolveResearchConfidence = resolveEvidenceConfidence;

export function backfillEvidenceConfidenceOnData(data, kind) {
  let changed = false;

  if (
    (kind === "pm" || kind === "sm") &&
    Array.isArray(data.phenome_relationships)
  ) {
    data.phenome_relationships = data.phenome_relationships.map((row) => {
      const refs = row.references || [];
      const next = resolveEvidenceConfidence(row, refs);
      const { research_confidence: _legacy, ...rest } = row;
      if (rest.evidence_confidence === next) return rest;
      changed = true;
      return { ...rest, evidence_confidence: next };
    });
  }

  if (kind === "fm" && Array.isArray(data.functional_outcome_context)) {
    data.functional_outcome_context = data.functional_outcome_context.map((row) => {
      const refs = row.references || [];
      const next = resolveEvidenceConfidence(row, refs);
      const { research_confidence: _legacy, ...rest } = row;
      if (rest.evidence_confidence === next) return rest;
      changed = true;
      return { ...rest, evidence_confidence: next };
    });
  }

  return changed;
}

/** @deprecated Use backfillEvidenceConfidenceOnData */
export const backfillResearchConfidenceOnData = backfillEvidenceConfidenceOnData;

export function formatOutcomeConfidence(confidence) {
  const key = String(confidence || "").trim();
  return CONFIDENCE_DISPLAY[key] ?? key;
}

function renderEvidenceConfidenceLine(row, references = []) {
  return `- **${PHENOME_EVIDENCE_CONFIDENCE_LABEL}:** ${formatOutcomeConfidence(resolveEvidenceConfidence(row, references))}`;
}

function validatePhenomeReference(ref, issues, { entityLabel, index, refIndex }) {
  const prefix = `${entityLabel}: references[${refIndex}] in phenome_relationships[${index}]`;
  if (!ref || typeof ref !== "object") {
    issues.push({ code: "invalid_phenome_reference", message: `${prefix} must be an object` });
    return;
  }
  if (ref.data_level !== undefined && ref.data_level !== null && String(ref.data_level).trim() !== "") {
    if (!normalizeReferenceDataLevel(ref.data_level)) {
      issues.push({
        code: "invalid_reference_data_level",
        message: `${prefix} data_level must be one of: ${[...REFERENCE_DATA_LEVELS].join(", ")}`,
      });
    }
  }
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
  if (!PHENOME_CONFIDENCE_VALUES.has(String(row.evidence_confidence || "").trim())) {
    issues.push({
      code: "invalid_evidence_confidence",
      message: `${prefix} evidence_confidence must be low | low-medium | medium | high`,
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
  } else if (Array.isArray(row.references)) {
    for (const [ri, ref] of row.references.entries()) {
      validatePhenomeReference(ref, issues, { entityLabel, index, refIndex: ri });
    }
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
  if (!PHENOME_CONFIDENCE_VALUES.has(String(row.evidence_confidence || "").trim())) {
    issues.push({
      code: "invalid_fm_evidence_confidence",
      message: `${prefix} evidence_confidence must be low | low-medium | medium | high`,
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
  } else if (Array.isArray(row.references)) {
    for (const [ri, ref] of row.references.entries()) {
      validatePhenomeReference(ref, issues, { entityLabel, index, refIndex: ri });
    }
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
    if (fmRow.evidence_confidence !== pmRel.evidence_confidence) {
      issues.push({
        code: "single_pm_fm_evidence_confidence_mismatch",
        message: `${entityLabel}: "${phenome}" evidence_confidence must be "${pmRel.evidence_confidence}" to match sole child PM ${childPmId} (found "${fmRow.evidence_confidence}")`,
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

function renderPhenomeReferencesBlock(references) {
  const items = references.map(phenomeRefToBibItem);
  const serialized = JSON.stringify(items).replace(/</g, "\\u003c");
  return ["- **Key References:**", "", `<PhenomeBibLinks items={${serialized}} />`];
}

/**
 * SM-PHEN §2 — one registry phenome interpretation lens (not PM roll-up).
 * @see system/phenome-relationship-schema.md#sm-phen--2-phenome-connections
 */
export function renderSmPhenPhenomeSectionBody(data, { sectionNum = 2 } = {}) {
  const ip = data.interpreted_phenome;
  const lens = String(data.interpretation_lens || "").trim();
  const hostBrs = String(data.parent_brs || "").trim();

  const lines = [`## ${sectionNum}. ${PM_PHENOME_SECTION_TITLE}`, "", PHENOME_DISCLAIMER, "", PHENOME_SCORING_KEY_MARKUP];

  if (!ip?.id || !ip?.name || !ip.confidence) {
    lines.push(PHENOME_EMPTY_MESSAGE);
    return lines.join("\n");
  }

  const registryId = String(ip.id).toLowerCase();
  lines.push(
    `**Registry phenome:** [${ip.id} — ${ip.name}](/docs/phenomes/#${registryId}) — see Phenome Registry for the canonical definition.`,
    "",
    `This page is one **${hostBrs || "host BRS"} interpretation lens** on that phenome (${lens || "connected host biology"}). Other BRS-hosted \`SM-PHEN\` pages may interpret the same registry phenome from different biology without duplicating PM content here.`,
    "",
  );

  const type = ip.relationship_type || "modulates";
  const panelLines = [
    `- **${PHENOME_BIOLOGY_CONFIDENCE_LABEL}:** ${formatOutcomeConfidence(ip.confidence)}`,
    `- **Rationale:** ${String(ip.rationale || "").trim()}`,
  ];
  if (Array.isArray(ip.references) && ip.references.length > 0) {
    panelLines.push(...renderPhenomeReferencesBlock(ip.references));
  }
  panelLines.push(renderEvidenceConfidenceLine(ip, ip.references || []));
  const summary = `${ip.name} — ${type}${hostBrs ? ` (${hostBrs} lens)` : ""}`;
  lines.push(
    renderHubCollapsible(summary, panelLines.join("\n"), phenomeCollapsibleOptions(ip.name)),
  );
  lines.push("");

  return lines.join("\n").trimEnd();
}

export function renderPmPhenomeSectionBody(relationships = [], { sectionNum = 3 } = {}) {
  const lines = [`## ${sectionNum}. ${PM_PHENOME_SECTION_TITLE}`, "", PHENOME_DISCLAIMER, "", PHENOME_SCORING_KEY_MARKUP];
  if (!relationships.length) {
    lines.push(PHENOME_EMPTY_MESSAGE);
    return lines.join("\n");
  }

  for (const rel of relationships) {
    const target = rel.target_phenome;
    const type = rel.relationship_type;
    const panelLines = [
      `- **${PHENOME_BIOLOGY_CONFIDENCE_LABEL}:** ${formatOutcomeConfidence(rel.confidence)}`,
      `- **Rationale:** ${rel.rationale}`,
    ];
    if (Array.isArray(rel.references) && rel.references.length > 0) {
      panelLines.push(...renderPhenomeReferencesBlock(rel.references));
    }
    panelLines.push(renderEvidenceConfidenceLine(rel, rel.references || []));
    lines.push(
      renderHubCollapsible(
        `${target} — ${type}`,
        panelLines.join("\n"),
        phenomeCollapsibleOptions(target),
      ),
    );
    lines.push("");
  }

  return lines.join("\n").trimEnd();
}

export function renderFmOutcomeContextSectionBody(outcomes = [], { sectionNum = 3 } = {}) {
  const lines = [
    `## ${sectionNum}. ${FM_PHENOME_CONNECTIONS_SECTION_TITLE}`,
    "",
    FM_OUTCOME_CONTEXT_DISCLAIMER,
    "",
    PHENOME_SCORING_KEY_MARKUP,
  ];
  if (!outcomes.length) {
    lines.push(FM_OUTCOME_CONTEXT_EMPTY_MESSAGE);
    return lines.join("\n");
  }

  for (const row of outcomes) {
    const target = row.outcome_name;
    const panelLines = [
      `- **${PHENOME_BIOLOGY_CONFIDENCE_LABEL}:** ${formatOutcomeConfidence(row.confidence)}`,
      `- **Synthesis:** ${String(row.synthesis).trim()}`,
    ];
    if (Array.isArray(row.references) && row.references.length > 0) {
      panelLines.push(...renderPhenomeReferencesBlock(row.references));
    }
    panelLines.push(renderEvidenceConfidenceLine(row, row.references || []));
    lines.push(
      renderHubCollapsible(target, panelLines.join("\n"), phenomeCollapsibleOptions(target)),
    );
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
        message: `${entityLabel}: published body must include "## 3. ${PM_PHENOME_SECTION_TITLE}" after Primary Biological Effects`,
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

  if (kind === "sm") {
    const usesPmCanonicalOrder = /^##\s+4\.\s+Levers\s*$/m.test(content);
    const phenomeLevel = usesPmCanonicalOrder ? 3 : 2;
    const heading = new RegExp(
      `^##\\s+${phenomeLevel}\\.\\s+${PM_PHENOME_SECTION_TITLE.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*$`,
      "m",
    );
    if (!heading.test(content)) {
      issues.push({
        code: "missing_phenome_section",
        message: `${entityLabel}: published body must include "## ${phenomeLevel}. ${PM_PHENOME_SECTION_TITLE}"${
          usesPmCanonicalOrder ? " after Primary Biological Effects" : " after Definition"
        }`,
      });
      return;
    }
    if (!content.includes(PHENOME_DISCLAIMER)) {
      issues.push({
        code: "missing_phenome_disclaimer",
        message: `${entityLabel}: §${phenomeLevel} must include the canonical phenome disclaimer`,
      });
    }
    return;
  }

  const fmTitle = FM_PHENOME_CONNECTIONS_SECTION_TITLE;
  const fmHeading = new RegExp(
    `^##\\s+3\\.\\s+${fmTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*$`,
    "m",
  );
  if (!fmHeading.test(content)) {
    issues.push({
      code: "missing_fm_outcome_context_section",
      message: `${entityLabel}: published body must include "## 3. ${fmTitle}" after Primary Biological Effects`,
    });
    return;
  }
  if (!content.includes(FM_OUTCOME_CONTEXT_DISCLAIMER)) {
    issues.push({
      code: "missing_fm_outcome_context_disclaimer",
      message: `${entityLabel}: §3 must include the FM phenome connections disclaimer`,
    });
  }
  const fmSection = extractFmOutcomeContextSection(content);
  if (
    fmSection &&
    !/data-brs-fm-hub/.test(fmSection) &&
    fmSection.includes("<details>") === false &&
    !fmSection.includes(FM_OUTCOME_CONTEXT_EMPTY_MESSAGE)
  ) {
    issues.push({
      code: "fm_outcome_context_dropdowns",
      message: `${entityLabel}: FM §3 outcomes must use hub collapsible dropdowns (see renderFmOutcomeContextSectionBody)`,
    });
  }
  if (fmSection && /^###\s+/m.test(fmSection)) {
    issues.push({
      code: "fm_outcome_context_heading_blocks",
      message: `${entityLabel}: FM §3 must not use ### outcome headings — use hub collapsible dropdowns`,
    });
  }
  if (/\|\s*Phenome\s*\|\s*Connected PMs\s*\|/m.test(content)) {
    issues.push({
      code: "fm_phenome_rollup_table",
      message: `${entityLabel}: FM §3 must not include PM phenome roll-up tables`,
    });
  }
  if (/contributing PMs/i.test(content)) {
    issues.push({
      code: "fm_phenome_pm_list",
      message: `${entityLabel}: FM §3 must not list contributing child PMs`,
    });
  }
}

const PHENOME_CITATION_KEY_CAPTURE = /BRAIN-Diet-References#([a-z0-9_-]+)/i;

function citationKeyFromReference(ref) {
  if (!ref) return null;
  if (typeof ref === "object") {
    if (ref.citation_key) return String(ref.citation_key).trim();
    if (ref.href) {
      const m = String(ref.href).match(PHENOME_CITATION_KEY_CAPTURE);
      return m?.[1] || null;
    }
  }
  if (typeof ref === "string") {
    const m = ref.match(PHENOME_CITATION_KEY_CAPTURE);
    return m?.[1] || null;
  }
  return null;
}

function fullLabelFromReference(ref, citationKey) {
  if (typeof ref === "object" && String(ref.label || "").includes(" — ")) {
    return String(ref.label).trim();
  }
  if (typeof ref === "string") {
    const m = ref.match(/\[([^\]]+)\]/);
    if (m?.[1]?.includes(" — ")) return m[1].trim();
    if (m?.[1]) {
      const yearM = m[1].match(/\((\d{4})\)/);
      const author = m[1].replace(/\s*\(\d{4}\)\s*$/, "").trim();
      return toReferenceLabel(author, yearM?.[1] || "", topicFromBibKey(citationKey));
    }
  }
  if (typeof ref === "object" && ref.label) {
    const yearM = String(ref.label).match(/\((\d{4})\)/);
    const author = String(ref.label)
      .replace(/\s*\(\d{4}\)\s*$/, "")
      .trim();
    return toReferenceLabel(author, yearM?.[1] || "", topicFromBibKey(citationKey));
  }
  return toReferenceLabel("Reference", "", topicFromBibKey(citationKey));
}

function collectPhenomeReferenceEntries(data, kind) {
  const byKey = new Map();

  function absorbRef(ref) {
    const citationKey = citationKeyFromReference(ref);
    if (!citationKey || byKey.has(citationKey)) return;
    const href = `/docs/papers/BRAIN-Diet-References#${citationKey}`;
    const label = fullLabelFromReference(ref, citationKey);
    byKey.set(citationKey, { citationKey, label, href });
  }

  if (kind === "sm" && data.interpreted_phenome?.references) {
    for (const ref of data.interpreted_phenome.references) absorbRef(ref);
    return byKey;
  }

  const rows =
    kind === "fm" ? data.functional_outcome_context || [] : data.phenome_relationships || [];
  for (const row of rows) {
    for (const ref of row.references || []) absorbRef(ref);
  }
  return byKey;
}

function findPageReferencesSection(content) {
  const start = content.search(/^## \d+\. References\s*$/m);
  if (start === -1) return null;
  const slice = content.slice(start);
  const headingEnd = slice.indexOf("\n");
  if (headingEnd === -1) return null;
  const heading = slice.slice(0, headingEnd + 1);
  const body = slice.slice(headingEnd + 1);
  const full = heading + body;
  const match = [full, heading, body];
  match.index = start;
  return match;
}

/**
 * Merge phenome_relationships / functional_outcome_context references into page
 * front matter and ## N. References body section (deduped by citation_key).
 */
export function mergePageReferencesWithPhenome(data, content, kind) {
  const phenomeByKey = collectPhenomeReferenceEntries(data, kind);
  if (!phenomeByKey.size) return { data, content, changed: false };

  const entriesByKey = new Map();
  const orderedKeys = [];

  function absorb(ref) {
    const citationKey = citationKeyFromReference(ref);
    if (!citationKey || entriesByKey.has(citationKey)) return false;
    const href = `/docs/papers/BRAIN-Diet-References#${citationKey}`;
    const label = fullLabelFromReference(ref, citationKey);
    entriesByKey.set(citationKey, { citationKey, label, href });
    orderedKeys.push(citationKey);
    return true;
  }

  const refsMatch = findPageReferencesSection(content);
  if (refsMatch) {
    const bodyRefRe =
      /\[([^\]]+)\]\(\/docs\/papers\/BRAIN-Diet-References#([a-z0-9_-]+)\)/gi;
    for (const m of refsMatch[2].matchAll(bodyRefRe)) {
      absorb({ label: m[1], citation_key: m[2] });
    }
  }

  for (const ref of data.references || []) {
    absorb(ref);
  }

  for (const entry of phenomeByKey.values()) {
    absorb(entry);
  }

  const newFmRefs = orderedKeys.map((key) => {
    const { label, href } = entriesByKey.get(key);
    return `[${label}](${href})`;
  });

  const fmChanged =
    JSON.stringify(newFmRefs) !== JSON.stringify(data.references || []);

  let newContent = content;
  let bodyChanged = false;
  if (refsMatch) {
    const heading = refsMatch[1];
    const newBullets = orderedKeys.map((key) => {
      const { label, href } = entriesByKey.get(key);
      return `- [${label}](${href})`;
    });
    const rebuilt = `${heading}${newBullets.join("\n")}\n`;
    if (rebuilt !== refsMatch[0]) {
      newContent =
        content.slice(0, refsMatch.index) +
        rebuilt +
        content.slice(refsMatch.index + refsMatch[0].length);
      bodyChanged = true;
    }
  }

  const newData = fmChanged ? { ...data, references: newFmRefs } : data;
  return {
    data: newData,
    content: newContent,
    changed: fmChanged || bodyChanged,
  };
}
