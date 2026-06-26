/**
 * BRS1 Phase 3 phenome scores (2026-06-25 re-audit).
 * @see system/phenome-relationship-schema.md#functional-dependency-heuristic-assign-before-reviewing-references
 *
 * Review stack per row:
 *   mechanism validation → phenome validation → confidence (functional dependency, refs ignored)
 *   → evidence_confidence (refs reviewed) → evidence_level (audit)
 */

/** @type {Record<string, Array<{ phenome: string, confidence: string, evidence_confidence: string, evidence_level: string }>>} */
export const BRS1_PM_PHASE3_SCORES = {
  "BRS1-FM1-PM1": [
    { phenome: "Focus / Attention Stability", confidence: "low-medium", evidence_confidence: "low-medium", evidence_level: "mechanistic" },
    { phenome: "Motivation / Drive", confidence: "low-medium", evidence_confidence: "low-medium", evidence_level: "mechanistic" },
    { phenome: "Emotional Regulation", confidence: "low", evidence_confidence: "low", evidence_level: "mechanistic" },
  ],
  "BRS1-FM1-PM2": [
    { phenome: "Focus / Attention Stability", confidence: "low-medium", evidence_confidence: "low-medium", evidence_level: "mechanistic" },
    { phenome: "Motivation / Drive", confidence: "low-medium", evidence_confidence: "low-medium", evidence_level: "mechanistic" },
    { phenome: "Emotional Regulation", confidence: "low", evidence_confidence: "low", evidence_level: "mechanistic" },
  ],
  "BRS1-FM1-PM3": [
    { phenome: "Focus / Attention Stability", confidence: "high", evidence_confidence: "low-medium", evidence_level: "mechanistic" },
    { phenome: "Motivation / Drive", confidence: "medium", evidence_confidence: "low-medium", evidence_level: "mechanistic" },
  ],
  "BRS1-FM1-PM4": [
    { phenome: "Emotional Regulation", confidence: "high", evidence_confidence: "low-medium", evidence_level: "mechanistic" },
    { phenome: "Stress Resilience", confidence: "low-medium", evidence_confidence: "low-medium", evidence_level: "mechanistic" },
    { phenome: "Sleep / Calming Tone", confidence: "medium", evidence_confidence: "low", evidence_level: "mechanistic" },
    { phenome: "Reward Regulation", confidence: "low", evidence_confidence: "low", evidence_level: "mechanistic" },
  ],
  "BRS1-FM2-PM5": [
    { phenome: "Focus / Attention Stability", confidence: "low-medium", evidence_confidence: "low-medium", evidence_level: "mechanistic" },
    { phenome: "Cognitive Clarity", confidence: "medium", evidence_confidence: "low", evidence_level: "mechanistic" },
  ],
  "BRS1-FM3-PM6": [
    { phenome: "Focus / Attention Stability", confidence: "low-medium", evidence_confidence: "low-medium", evidence_level: "mechanistic" },
    { phenome: "Cognitive Clarity", confidence: "low-medium", evidence_confidence: "low-medium", evidence_level: "mechanistic" },
    { phenome: "Emotional Regulation", confidence: "medium", evidence_confidence: "medium", evidence_level: "observational" },
  ],
  "BRS1-FM4-PM7": [
    { phenome: "Focus / Attention Stability", confidence: "high", evidence_confidence: "low-medium", evidence_level: "observational" },
    { phenome: "Emotional Regulation", confidence: "medium", evidence_confidence: "low", evidence_level: "mechanistic" },
    { phenome: "Stress Reactivity", confidence: "low-medium", evidence_confidence: "low", evidence_level: "mechanistic" },
  ],
  "BRS1-FM4-PM8": [
    { phenome: "Emotional Regulation", confidence: "medium", evidence_confidence: "medium", evidence_level: "intervention" },
    { phenome: "Sleep / Calming Tone", confidence: "high", evidence_confidence: "low", evidence_level: "mechanistic" },
  ],
  "BRS1-FM4-PM9": [
    { phenome: "Focus / Attention Stability", confidence: "low-medium", evidence_confidence: "low-medium", evidence_level: "mechanistic" },
    { phenome: "Cognitive Clarity", confidence: "low", evidence_confidence: "low", evidence_level: "mechanistic" },
  ],
  "BRS1-FM4-PM10": [
    { phenome: "Stress Reactivity", confidence: "low", evidence_confidence: "low", evidence_level: "mechanistic" },
    { phenome: "Recovery Capacity", confidence: "low", evidence_confidence: "low", evidence_level: "mechanistic" },
  ],
};

/** Multi-PM FMs only; 1:1 FMs (FM2, FM3) are derived from child PM scores. */
export const BRS1_FM_PHASE3_SCORES = {
  "BRS1(FM1)": [
    { phenome: "Focus / Attention Stability", confidence: "high", evidence_confidence: "low-medium" },
    { phenome: "Emotional Regulation", confidence: "high", evidence_confidence: "low-medium" },
    { phenome: "Motivation / Drive", confidence: "medium", evidence_confidence: "medium" },
  ],
  "BRS1(FM4)": [
    { phenome: "Focus / Attention Stability", confidence: "high", evidence_confidence: "low-medium" },
    { phenome: "Emotional Regulation", confidence: "high", evidence_confidence: "medium" },
    { phenome: "Stress Reactivity", confidence: "low", evidence_confidence: "low" },
  ],
};

/** Single-PM FM → child PM id (scores copied from PM). */
export const BRS1_SINGLE_PM_FM = {
  "BRS1(FM2)": "BRS1-FM2-PM5",
  "BRS1(FM3)": "BRS1-FM3-PM6",
};
