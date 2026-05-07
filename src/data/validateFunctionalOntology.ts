import { functionalProperties, type BRSId } from "./functionalProperties"
import { functionalStates } from "./functionalStates"
import { brsScoringRules } from "./scoring/brsScoringRules"

export interface FunctionalOntologyValidationInput {
  foodFunctionalPropertyIds?: string[]
  recipeFunctionalStateIds?: string[]
}

export interface FunctionalOntologyValidationResult {
  ok: boolean
  errors: string[]
}

const VALID_BRS_IDS: readonly BRSId[] = ["BRS1", "BRS2", "BRS3", "BRS4", "BRS5", "BRS6"] as const
const ALLOWED_SCORING_INPUT_TYPES = [
  "functional_state",
  "functional_property_potential",
  "substance_signal",
  "nutrient_signal",
  "preparation_transformation",
] as const

const DENYLIST_NAMED_SUBSTANCES = new Set(
  [
    "quercetin",
    "chlorogenic_acid",
    "resveratrol",
    "curcumin",
    "hydroxytyrosol",
    "oleocanthal",
    "oleuropein",
    "tyrosol",
    "DHA",
    "EPA",
    "oleic_acid",
    "magnesium",
    "potassium",
    "vitamin_c",
    "folate",
  ].map((v) => v.toLowerCase()),
)

function findDuplicates(ids: string[]): string[] {
  const counts = new Map<string, number>()
  for (const id of ids) counts.set(id, (counts.get(id) || 0) + 1)
  return [...counts.entries()].filter(([, count]) => count > 1).map(([id]) => id)
}

function isValidBrsId(brs: string): brs is BRSId {
  return (VALID_BRS_IDS as readonly string[]).includes(brs)
}

function isAllowedScoringInputType(value: string): value is (typeof ALLOWED_SCORING_INPUT_TYPES)[number] {
  return (ALLOWED_SCORING_INPUT_TYPES as readonly string[]).includes(value)
}

function isDeniedNamedSubstanceId(value: string): boolean {
  return DENYLIST_NAMED_SUBSTANCES.has(value.toLowerCase())
}

export function validateFunctionalOntology(input: FunctionalOntologyValidationInput = {}): FunctionalOntologyValidationResult {
  const errors: string[] = []

  const propertyIds = functionalProperties.map((p) => p.id)
  const stateIds = functionalStates.map((s) => s.id)
  const scoringRuleIds = brsScoringRules.map((r) => r.id)

  const propertyIdSet = new Set(propertyIds)
  const stateIdSet = new Set(stateIds)

  // No duplicate IDs in each registry.
  for (const dup of findDuplicates(propertyIds)) errors.push(`Duplicate FunctionalProperty id: ${dup}`)
  for (const dup of findDuplicates(stateIds)) errors.push(`Duplicate FunctionalState id: ${dup}`)
  for (const dup of findDuplicates(scoringRuleIds)) errors.push(`Duplicate BRSScoringRule id: ${dup}`)

  // BRS IDs must be valid in property links.
  for (const property of functionalProperties) {
    if (isDeniedNamedSubstanceId(property.id)) {
      errors.push(`Named substance '${property.id}' must not be used as a Functional Property. Use substances/nutrients instead.`)
    }

    for (const link of property.brs_links) {
      if (!isValidBrsId(link.brs)) {
        errors.push(`Invalid BRS id "${link.brs}" in functional property "${property.id}"`)
      }
    }

    // Property-declared states should exist in FunctionalState registry.
    for (const stateId of property.possible_states ?? []) {
      if (!stateIdSet.has(stateId)) {
        errors.push(`Functional property "${property.id}" references unknown possible state "${stateId}"`)
      }
    }

    // Property state rules should target known state IDs.
    for (const rule of property.state_rules ?? []) {
      if (!stateIdSet.has(rule.realised_state_id)) {
        errors.push(`Functional property "${property.id}" state_rule references unknown realised_state_id "${rule.realised_state_id}"`)
      }
    }
  }

  // Functional states must reference valid parent properties + valid BRS links.
  for (const state of functionalStates) {
    if (!propertyIdSet.has(state.parent_property_id)) {
      errors.push(`Functional state "${state.id}" references unknown parent property "${state.parent_property_id}"`)
    }
    for (const link of state.brs_links ?? []) {
      if (!isValidBrsId(link.brs)) {
        errors.push(`Invalid BRS id "${link.brs}" in functional state "${state.id}"`)
      }
    }
  }

  // Scoring rules must reference valid BRS IDs and valid state/property IDs.
  for (const rule of brsScoringRules) {
    if (!isValidBrsId(rule.brs)) {
      errors.push(`Invalid BRS id "${rule.brs}" in scoring rule "${rule.id}"`)
    }

    if (!isAllowedScoringInputType(rule.input_type)) {
      errors.push(
        `Scoring rule "${rule.id}" has invalid input_type "${String(rule.input_type)}". Allowed: ${ALLOWED_SCORING_INPUT_TYPES.join(
          ", ",
        )}`,
      )
      continue
    }

    if (rule.input_type === "functional_state" && !stateIdSet.has(rule.input_id)) {
      errors.push(`Scoring rule "${rule.id}" references unknown functional state "${rule.input_id}"`)
    }

    if (rule.input_type === "functional_property_potential" && !propertyIdSet.has(rule.input_id)) {
      errors.push(`Scoring rule "${rule.id}" references unknown functional property "${rule.input_id}"`)
    }

    // Boundary rule:
    // - substance_signal and nutrient_signal are valid scoring inputs
    // - they are intentionally not resolved against functional property/state registries
  }

  // Optional cross-checks for food/recipe IDs supplied by callers.
  for (const propertyId of input.foodFunctionalPropertyIds ?? []) {
    if (isDeniedNamedSubstanceId(propertyId)) {
      errors.push(`Named substance '${propertyId}' must not be used as a Functional Property. Use substances/nutrients instead.`)
      continue
    }
    if (!propertyIdSet.has(propertyId)) {
      errors.push(`Food references unknown functional property id "${propertyId}"`)
    }
  }

  for (const stateId of input.recipeFunctionalStateIds ?? []) {
    if (!stateIdSet.has(stateId)) {
      errors.push(`Recipe references unknown functional state id "${stateId}"`)
    }
  }

  return {
    ok: errors.length === 0,
    errors,
  }
}
