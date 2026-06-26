/**
 * Phenome Registry Evidence Hierarchy — audit helpers (v4).
 *
 * Evidence Confidence reflects strength of evidence for the Biology → Phenome relationship
 * on the row (not intervention RCT count alone).
 *
 * Biology → Phenome Confidence (`confidence`) is NOT capped by reference data_level.
 * Assign confidence using the functional dependency heuristic (schema Principle 3a)
 * before reviewing refs for evidence_confidence.
 * Evidence Level (`evidence_level`) is audited separately against the reference profile.
 *
 * @see system/phenome-relationship-schema.md#phenome-registry-evidence-hierarchy
 */

import {
  getReferenceDataLevel,
  normalizeReferenceDataLevel,
} from "./reference-data-levels.mjs";

export const INFERENTIAL_DATA_LEVELS = new Set([
  "Animal Data",
  "Preclinical",
  "Mechanistic",
  "Theoretical",
  "Cellular / Molecular",
]);

export const HUMAN_MEASURED_LEVELS = new Set(["Human Outcome", "Human Study"]);

export const INFERENTIAL_RATIONALE_RE =
  /framework translation|inferential|inferred from|without direct|without claiming|biological plausibility|may (support|modulate|intersect)|does not (measure|assess|report)/i;

export const UPSTREAM_PM_KEYWORDS =
  /\b(substrate|precursor|transport|availability|incorporation|delivery|cofactor|membrane integration|lat1|amino-acid pool|one-carbon|biosynthesis capacity|preservation|metabolism)\b/i;

const CONFIDENCE_RANK = {
  low: 1,
  "low-medium": 1.5,
  medium: 2,
  high: 3,
};

const RANK_TO_CONFIDENCE = {
  1: "low",
  1.5: "low-medium",
  2: "medium",
  3: "high",
};

export function confidenceRank(value) {
  return CONFIDENCE_RANK[String(value || "").trim()] ?? 0;
}

export function confidenceFromRank(rank) {
  return RANK_TO_CONFIDENCE[rank] ?? "low";
}

export function minConfidence(a, b) {
  const ra = confidenceRank(a);
  const rb = confidenceRank(b);
  if (!ra) return b;
  if (!rb) return a;
  return confidenceFromRank(Math.min(ra, rb));
}

export function resolveRefDataLevel(ref) {
  return (
    normalizeReferenceDataLevel(ref?.data_level) ||
    getReferenceDataLevel(ref?.citation_key) ||
    null
  );
}

export function classifyReferenceEvidence(references = []) {
  const levels = (references || [])
    .map(resolveRefDataLevel)
    .filter(Boolean);

  const hasHumanOutcome = levels.some((l) => l === "Human Outcome");
  const hasHumanStudy = levels.some((l) => l === "Human Study");
  const hasHumanMechanistic = levels.some((l) => l === "Human Mechanistic");
  const hasHumanData = levels.some((l) =>
    HUMAN_MEASURED_LEVELS.has(l) || l === "Human Mechanistic",
  );
  const inferentialOnly =
    levels.length > 0 &&
    levels.every(
      (l) => INFERENTIAL_DATA_LEVELS.has(l) || l === "Mixed",
    );
  const unknownLevels = (references || []).length - levels.length;

  return {
    levels,
    hasHumanOutcome,
    hasHumanStudy,
    hasHumanMechanistic,
    hasHumanData,
    inferentialOnly,
    unknownLevels,
    refCount: references?.length ?? 0,
  };
}

const EVIDENCE_LEVEL_RANK = {
  mechanistic: 1,
  observational: 2,
  intervention: 3,
  clinical: 4,
};

/**
 * Suggested evidence_level from attached reference data_level profile.
 * Does not constrain Biology → Phenome Confidence.
 */
export function suggestedEvidenceLevel(classification) {
  const { hasHumanOutcome, hasHumanStudy, refCount } = classification;

  if (refCount === 0) return "mechanistic";
  if (hasHumanOutcome) return "clinical";
  if (hasHumanStudy) return "intervention";
  // Human Mechanistic / pathway refs alone do not justify observational — that level
  // requires Phase 3 assignment when citations measure biomarker–phenome links in ADHD cohorts.
  return "mechanistic";
}

/**
 * Evidence Confidence — strength of evidence in attached Key References (v3 hierarchy).
 * Scored separately from Biology → Phenome Confidence (`confidence`).
 */
export function suggestedEvidenceConfidence(classification) {
  const { hasHumanOutcome, hasHumanStudy, hasHumanMechanistic, inferentialOnly, refCount } =
    classification;

  if (refCount === 0) return "low";

  if (hasHumanOutcome) {
    return refCount >= 2 ? "medium" : "low-medium";
  }
  if (hasHumanStudy) return "low-medium";
  if (hasHumanMechanistic && !inferentialOnly) return "low-medium";
  if (inferentialOnly) {
    return refCount >= 2 ? "low-medium" : "low";
  }
  if (classification.unknownLevels > 0) return "low-medium";
  return "low";
}

/** @deprecated — use suggestedEvidenceConfidence */
export const suggestedResearchConfidence = suggestedEvidenceConfidence;

/** @deprecated v3 — use suggestedEvidenceConfidence for reference-profile caps. */
export function maxAllowedConfidence(classification) {
  return suggestedEvidenceConfidence(classification);
}

function evidenceLevelRank(value) {
  return EVIDENCE_LEVEL_RANK[String(value || "").trim()] ?? 0;
}

export function auditPhenomeMapping({
  targetPhenome,
  confidence,
  evidenceConfidence = "",
  evidenceLevel = "",
  rationale = "",
  confidenceDisparityNote = "",
  references = [],
  contextLabel = "",
  upstreamStructural = false,
}) {
  const classification = classifyReferenceEvidence(references);
  const suggestedLevel = suggestedEvidenceLevel(classification);
  const suggestedEvidence = suggestedEvidenceConfidence(classification);
  const flags = [];

  const currentLevelRank = evidenceLevelRank(evidenceLevel);
  const suggestedLevelRank = evidenceLevelRank(suggestedLevel);

  if (
    currentLevelRank > 0 &&
    suggestedLevelRank > 0 &&
    currentLevelRank > suggestedLevelRank + 1
  ) {
    flags.push({
      code: "evidence_level_overstated",
      severity: "warn",
      message: `Evidence level "${evidenceLevel}" may exceed reference profile (suggested "${suggestedLevel}")`,
      suggestedEvidenceLevel: suggestedLevel,
    });
  }

  if (
    evidenceLevel &&
    currentLevelRank > 0 &&
    suggestedLevelRank > currentLevelRank + 1
  ) {
    flags.push({
      code: "evidence_level_understated",
      severity: "info",
      message: `Evidence level "${evidenceLevel}" may understate reference profile (suggested "${suggestedLevel}")`,
      suggestedEvidenceLevel: suggestedLevel,
    });
  }

  const confRank = confidenceRank(confidence);
  const evidenceConfRank = confidenceRank(evidenceConfidence || suggestedEvidence);
  const suggestedEvidenceConfRank = confidenceRank(suggestedEvidence);
  const isInferentialMapping = confRank <= confidenceRank("low-medium");

  if (evidenceConfRank > suggestedEvidenceConfRank) {
    flags.push({
      code: "evidence_confidence_exceeds_profile",
      severity: "warn",
      message: `Evidence Confidence "${evidenceConfidence || "?"}" exceeds reference-profile max "${suggestedEvidence}"`,
      suggestedEvidenceConfidence: suggestedEvidence,
    });
  }

  if (confRank > 0 && evidenceConfRank > 0 && confRank < evidenceConfRank) {
    flags.push({
      code: "evidence_confidence_above_biology",
      severity: "warn",
      message:
        "Evidence Confidence exceeds Biology → Phenome Confidence — valid when dimensions diverge (e.g. strong outcome evidence for a contributory pathway); document with confidence_disparity_note",
    });
    const note = String(confidenceDisparityNote || "").trim();
    if (!note) {
      flags.push({
        code: "missing_confidence_disparity_note",
        severity: "warn",
        message:
          "Add confidence_disparity_note when Evidence Confidence exceeds Biology → Phenome Confidence",
      });
    }
  }

  if (
    classification.inferentialOnly &&
    isInferentialMapping &&
    !INFERENTIAL_RATIONALE_RE.test(rationale)
  ) {
    flags.push({
      code: "missing_inferential_marker",
      severity: "warn",
      message:
        "Inferential reference profile with conservative biology confidence — rationale/synthesis should identify framework translation",
    });
  }

  if (upstreamStructural && confRank >= confidenceRank("high")) {
    flags.push({
      code: "upstream_structural_high_confidence",
      severity: "warn",
      message:
        "Upstream structural PM with high Biology → Phenome Confidence — confirm Principle 4 scrutiny in Phase 3",
    });
  }

  if (classification.refCount === 0) {
    flags.push({
      code: "missing_references",
      severity: "warn",
      message: "No references attached to phenome mapping",
    });
  }

  if (classification.unknownLevels > 0) {
    flags.push({
      code: "unknown_data_level",
      severity: "info",
      message: `${classification.unknownLevels} reference(s) lack data_level (not in curated map)`,
    });
  }

  if (!classification.hasHumanData && classification.inferentialOnly) {
    flags.push({
      code: "no_human_evidence_in_refs",
      severity: "info",
      message:
        "Reference profile is mechanistic/preclinical only — may still support high biology confidence when pathway relevance is established",
    });
  }

  return {
    contextLabel,
    targetPhenome,
    confidence,
    evidenceConfidence: evidenceConfidence || suggestedEvidence,
    evidenceLevel,
    suggestedEvidenceLevel: suggestedLevel,
    suggestedEvidenceConfidence: suggestedEvidence,
    classification,
    flags,
    needsFix: flags.some(
      (f) => f.suggestedEvidenceLevel || f.suggestedEvidenceConfidence,
    ),
  };
}

export function isUpstreamStructuralPm({ title = "", summary = "", pmId = "" }) {
  const blob = `${title} ${summary} ${pmId}`;
  return UPSTREAM_PM_KEYWORDS.test(blob);
}
