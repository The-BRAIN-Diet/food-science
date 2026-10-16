/**
 * Display contract for Synthesised Evidence Confidence.
 *
 * The component renders a score that evidence governance has already decided.
 * It does not add D, B, P or R, and it does not turn a legacy four-level word
 * into an eight-level number.
 *
 * SEC = D + B + P + R, each factor 0–2, raw total 0–8.
 * A raw zero or any missing assessment stays outside the scale.
 */

export const SEC_DISPLAY_LEVELS = [
  {score: 1, label: "Extremely Low", family: "red"},
  {score: 2, label: "Very Low", family: "red"},
  {score: 3, label: "Low", family: "yellow"},
  {score: 4, label: "Low–Moderate", family: "yellow"},
  {score: 5, label: "Moderate", family: "orange"},
  {score: 6, label: "Moderate–High", family: "orange"},
  {score: 7, label: "High", family: "green"},
  {score: 8, label: "Very High", family: "green"},
]

export const LEGACY_CONFIDENCE_LEVELS = ["very-low", "low", "moderate", "high"]

const LEGACY_LEVEL_CONFIG = {
  "very-low": {activeSegments: 1, label: "Very low", family: "red"},
  low: {activeSegments: 2, label: "Low", family: "yellow"},
  moderate: {activeSegments: 3, label: "Moderate", family: "orange"},
  high: {activeSegments: 4, label: "High", family: "green"},
}

const FAMILY_CLASS = {
  red: "levelVeryLow",
  yellow: "levelLow",
  orange: "levelModerate",
  green: "levelHigh",
}

export function secLevelForScore(score) {
  return SEC_DISPLAY_LEVELS.find((level) => level.score === score) ?? null
}

/** Integers 1–8 only. Zero, fractions, and anything else are not a level. */
export function parseSecScore(value) {
  if (typeof value === "boolean" || value === null || value === undefined || value === "") return null
  const numeric = typeof value === "number" ? value : Number(value)
  if (!Number.isInteger(numeric) || numeric < 1 || numeric > 8) return null
  return numeric
}

function notScored(source) {
  return {
    mode: "unscored",
    source,
    score: null,
    activeSegments: 0,
    totalSegments: 8,
    grouped: true,
    label: "Not scored",
    readout: "Not scored",
    family: null,
    familyClass: null,
  }
}

function scored(score, source) {
  const level = secLevelForScore(score)
  return {
    mode: "sec",
    source,
    score,
    activeSegments: score,
    totalSegments: 8,
    grouped: true,
    label: level.label,
    readout: `${score}/8 · ${level.label}`,
    family: level.family,
    familyClass: FAMILY_CLASS[level.family],
  }
}

function legacy(level) {
  const config = LEGACY_LEVEL_CONFIG[level]
  return {
    mode: "legacy",
    source: "legacy-level",
    score: null,
    activeSegments: config.activeSegments,
    totalSegments: 4,
    grouped: false,
    label: config.label,
    readout: config.label,
    family: config.family,
    familyClass: FAMILY_CLASS[config.family],
  }
}

/**
 * `adjustedScore` is an adjudicated cap or downgrade. When the caller supplies
 * it, including 0 or null, the raw `score` is not used.
 * A legacy `level` is rendered on the old four-block scale and is never given
 * an SEC number.
 */
export function resolveEvidenceConfidence({score, adjustedScore, level} = {}) {
  if (adjustedScore !== undefined) {
    const adjusted = parseSecScore(adjustedScore)
    return adjusted ? scored(adjusted, "adjusted") : notScored("adjusted")
  }
  if (score !== undefined) {
    const parsed = parseSecScore(score)
    return parsed ? scored(parsed, "raw") : notScored("raw")
  }
  if (level !== undefined && level !== null && LEGACY_LEVEL_CONFIG[level]) {
    return legacy(level)
  }
  return notScored("missing")
}

export function evidenceConfidenceAccessibleLabel(state, srPrefix = "Evidence confidence") {
  if (state.mode === "sec") {
    return `${srPrefix}: ${state.score} of 8, ${state.label}`
  }
  if (state.mode === "legacy") {
    return `${srPrefix}: ${state.label}, level ${state.activeSegments} of 4`
  }
  return `${srPrefix}: Not scored`
}
