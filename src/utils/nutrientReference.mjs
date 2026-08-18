/**
 * Nutrient reference bases.
 *
 * A percentage is only meaningful against a stated intake target, and the kind
 * of target matters. An RDA is a level expected to meet the needs of nearly all
 * healthy adults. An Adequate Intake is an observed or approximated level used
 * where the evidence cannot support an RDA; it is not a weaker RDA and must not
 * be labelled as one. A Tolerable Upper Intake Level is a safety boundary, never
 * something to reach. Sodium has neither an RDA nor a target worth expressing as
 * a percentage, only a chronic-disease-risk-reduction level to stay under.
 *
 * Values are U.S. IOM/National Academies DRIs for adults 19–50, taking the
 * higher of the male and female value where they differ, matching
 * `system/nutrient-reference-values.md`. This is the canonical set: food pages
 * and recipe pages both read it, so a single reference population governs every
 * percentage the site publishes.
 */

/** @typedef {"rda" | "ai" | "guideline" | "none"} ReferenceBasis */

/**
 * Several upper limits apply only to supplemental or synthetic forms. Flagging a
 * whole food against those would be wrong, so applicability is recorded with the
 * number.
 */
export const NUTRIENT_REFERENCES = {
  iron_mg: {target: 18, basis: "rda", ul: 45, ul_applies_to: "total intake"},
  zinc_mg: {target: 11, basis: "rda", ul: 40, ul_applies_to: "total intake"},
  magnesium_mg: {
    target: 420,
    basis: "rda",
    ul: 350,
    ul_applies_to: "supplemental magnesium only, not food",
  },
  selenium_ug: {target: 55, basis: "rda", ul: 400, ul_applies_to: "total intake"},
  calcium_mg: {target: 1000, basis: "rda", ul: 2500, ul_applies_to: "total intake"},
  potassium_mg: {target: 3400, basis: "ai", ul: null, ul_applies_to: null},
  choline_mg: {target: 550, basis: "ai", ul: 3500, ul_applies_to: "total intake"},
  folate_ug: {
    target: 400,
    basis: "rda",
    ul: 1000,
    ul_applies_to: "synthetic folic acid only, not food folate",
  },
  vitamin_b12_ug: {target: 2.4, basis: "rda", ul: null, ul_applies_to: null},
  vitamin_b6_mg: {target: 1.3, basis: "rda", ul: 100, ul_applies_to: "total intake"},
  vitamin_e_mg: {
    target: 15,
    basis: "rda",
    ul: 1000,
    ul_applies_to: "supplemental α-tocopherol only",
  },
  vitamin_k_ug: {target: 120, basis: "ai", ul: null, ul_applies_to: null},
  copper_mg: {target: 0.9, basis: "rda", ul: 10, ul_applies_to: "total intake"},
  phosphorus_mg: {target: 700, basis: "rda", ul: 4000, ul_applies_to: "total intake"},
  manganese_mg: {target: 2.3, basis: "ai", ul: 11, ul_applies_to: "total intake"},
  vitamin_b2_mg: {target: 1.3, basis: "rda", ul: null, ul_applies_to: null},
  vitamin_b1_mg: {target: 1.2, basis: "rda", ul: null, ul_applies_to: null},
  vitamin_b3_mg: {
    target: 16,
    basis: "rda",
    ul: 35,
    ul_applies_to: "synthetic niacin only, not niacin from food",
  },
  vitamin_b5_mg: {target: 5, basis: "ai", ul: null, ul_applies_to: null},
  vitamin_c_mg: {target: 90, basis: "rda", ul: 2000, ul_applies_to: "total intake"},
  vitamin_a_rae_ug: {
    target: 900,
    basis: "rda",
    ul: 3000,
    ul_applies_to: "preformed retinol only, not provitamin A carotenoids",
  },
  vitamin_d_ug: {target: 15, basis: "rda", ul: 100, ul_applies_to: "total intake"},
  iodine_ug: {target: 150, basis: "rda", ul: 1100, ul_applies_to: "total intake"},

  /**
   * Sodium's 2019 revision replaced the UL with a chronic-disease-risk-reduction
   * level. Neither the 1500 mg AI nor the 2300 mg CDRR is something a reader
   * should aim to reach, so no percentage is offered.
   */
  sodium_mg: {
    target: null,
    basis: "guideline",
    guideline_label: "chronic disease risk reduction intake",
    guideline_value: 2300,
    ul: null,
    ul_applies_to: null,
  },
}

const BASIS_LABEL = {
  rda: "% RDA",
  ai: "% AI",
  guideline: "guideline",
  none: null,
}

export function referenceFor(key) {
  return NUTRIENT_REFERENCES[key] || null
}

/** @returns {ReferenceBasis} */
export function referenceBasis(key) {
  const ref = referenceFor(key)
  if (!ref) return "none"
  if (ref.target == null) return ref.basis === "guideline" ? "guideline" : "none"
  return ref.basis
}

/** Column/row label for a percentage, or null where no percentage may be shown. */
export function referenceBasisLabel(key) {
  return BASIS_LABEL[referenceBasis(key)] ?? null
}

/**
 * Percentage of the intake target. Null where no recognised target exists, so
 * callers show the absolute quantity rather than manufacturing a proportion.
 */
export function percentOfReference(key, amount) {
  const ref = referenceFor(key)
  if (!ref || ref.target == null) return null
  if (typeof amount !== "number" || !Number.isFinite(amount)) return null
  return (amount / ref.target) * 100
}

/**
 * A serving over an upper limit that applies to food, worth a caution. Limits
 * scoped to supplemental or synthetic forms never fire here.
 */
export function exceedsUpperLimit(key, amount) {
  const ref = referenceFor(key)
  if (!ref?.ul || typeof amount !== "number" || !Number.isFinite(amount)) return false
  if (ref.ul_applies_to && !/total intake/.test(ref.ul_applies_to)) return false
  return amount > ref.ul
}

/** Backward-compatible flat map of daily targets. */
export const ADULT_REFERENCE_INTAKE = Object.fromEntries(
  Object.entries(NUTRIENT_REFERENCES)
    .filter(([, ref]) => typeof ref.target === "number")
    .map(([key, ref]) => [key, ref.target]),
)
