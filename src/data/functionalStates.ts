import type { EvidenceLevel, FunctionalPropertyBRSLink } from "./functionalProperties"

export type FunctionalStateDirection = "increased" | "reduced" | "avoided" | "preserved" | "activated" | "deactivated" | "unchanged" | "unknown"

export interface FunctionalState {
  id: string
  label: string
  parent_property_id: string
  state_direction: FunctionalStateDirection
  definition: string
  brs_links?: FunctionalPropertyBRSLink[]
  evidence_level: EvidenceLevel
  notes?: string
}

export const functionalStates: FunctionalState[] = [
  {
    id: "increased_resistant_starch",
    label: "Increased resistant starch",
    parent_property_id: "resistant_starch_potential",
    state_direction: "increased",
    definition: "Resistant starch expression has increased in the prepared meal state.",
    brs_links: [
      { brs: "BRS6", pm: "PM1", direction: "supports", strength: 2, effect: "Supports lower glycaemic volatility." },
      { brs: "BRS5", direction: "supports", strength: 1, effect: "Supports fermentable substrate availability." },
    ],
    evidence_level: "mechanistic",
  },
  {
    id: "reduced_resistant_starch",
    label: "Reduced resistant starch",
    parent_property_id: "resistant_starch_potential",
    state_direction: "reduced",
    definition: "Resistant starch expression is reduced in current preparation context.",
    brs_links: [{ brs: "BRS6", pm: "PM1", direction: "conditional", strength: 1, effect: "May reduce glycaemic buffering benefit." }],
    evidence_level: "mechanistic",
  },
  {
    id: "reduced_glycaemic_volatility",
    label: "Reduced glycaemic volatility",
    parent_property_id: "high_glycaemic_volatility_potential",
    state_direction: "reduced",
    definition: "Meal context expresses lower glycaemic excursion variability.",
    brs_links: [{ brs: "BRS6", pm: "PM1", direction: "supports", strength: 2, effect: "Supports steadier metabolic energy handling." }],
    evidence_level: "human_intervention",
  },
  {
    id: "increased_glycaemic_volatility",
    label: "Increased glycaemic volatility",
    parent_property_id: "high_glycaemic_volatility_potential",
    state_direction: "increased",
    definition: "Meal context expresses greater glycaemic excursion variability.",
    brs_links: [{ brs: "BRS6", pm: "PM1", direction: "increases_risk", strength: 2, effect: "Increases metabolic volatility burden." }],
    evidence_level: "human_intervention",
  },
  {
    id: "reduced_rapid_digestibility",
    label: "Reduced rapid digestibility",
    parent_property_id: "rapid_digestibility",
    state_direction: "reduced",
    definition: "Preparation or matrix features reduce rapid digestibility characteristics.",
    brs_links: [{ brs: "BRS6", pm: "PM1", direction: "supports", strength: 1, effect: "Supports slower substrate appearance." }],
    evidence_level: "mechanistic",
  },
  {
    id: "increased_rapid_digestibility",
    label: "Increased rapid digestibility",
    parent_property_id: "rapid_digestibility",
    state_direction: "increased",
    definition: "Preparation or processing has increased rapid digestibility characteristics.",
    brs_links: [{ brs: "BRS6", pm: "PM1", direction: "increases_risk", strength: 2, effect: "Increases excursion burden risk." }],
    evidence_level: "mechanistic",
  },
  {
    id: "oxidation_avoided",
    label: "Oxidation avoided",
    parent_property_id: "lipid_oxidation_prone",
    state_direction: "avoided",
    definition: "Preparation context avoided avoidable lipid oxidation burden.",
    brs_links: [{ brs: "BRS3", direction: "supports", strength: 1, effect: "Supports reduced oxidative burden." }],
    evidence_level: "mechanistic",
  },
  {
    id: "reduced_lipid_oxidation",
    label: "Reduced lipid oxidation",
    parent_property_id: "lipid_oxidation_prone",
    state_direction: "reduced",
    definition: "Lipid oxidation tendency is reduced in current preparation context.",
    brs_links: [{ brs: "BRS3", direction: "supports", strength: 1, effect: "Supports lower oxidation burden." }],
    evidence_level: "mechanistic",
  },
  {
    id: "increased_lipid_oxidation",
    label: "Increased lipid oxidation",
    parent_property_id: "lipid_oxidation_prone",
    state_direction: "increased",
    definition: "Lipid oxidation tendency has increased in current preparation context.",
    brs_links: [{ brs: "BRS3", direction: "increases_risk", strength: 2, effect: "Increases oxidative burden." }],
    evidence_level: "mechanistic",
  },
  {
    id: "preserved_polyphenol_matrix",
    label: "Preserved polyphenol matrix",
    parent_property_id: "polyphenol_rich",
    state_direction: "preserved",
    definition: "Preparation context preserved polyphenol-relevant matrix characteristics.",
    brs_links: [{ brs: "BRS3", direction: "supports", strength: 1, effect: "Supports preservation of protective polyphenol signal." }],
    evidence_level: "composition_based",
  },
  {
    id: "reduced_phytate_burden",
    label: "Reduced phytate burden",
    parent_property_id: "phytate_content",
    state_direction: "reduced",
    definition: "Preparation context reduced phytate-related mineral interaction burden.",
    brs_links: [{ brs: "BRS2", direction: "supports", strength: 1, effect: "Supports improved mineral bioavailability context." }],
    evidence_level: "mechanistic",
  },
  {
    id: "increased_phytate_mineral_binding_risk",
    label: "Increased phytate mineral binding risk",
    parent_property_id: "phytate_content",
    state_direction: "increased",
    definition: "Meal context increases phytate-related mineral binding burden risk.",
    brs_links: [{ brs: "BRS2", direction: "increases_risk", strength: 1, effect: "May reduce mineral bioavailability in context." }],
    evidence_level: "mechanistic",
  },
  {
    id: "increased_AGE_generation",
    label: "Increased AGE generation",
    parent_property_id: "AGE_generation_potential",
    state_direction: "increased",
    definition: "Preparation context increased advanced glycation end-product generation tendency.",
    brs_links: [{ brs: "BRS3", direction: "increases_risk", strength: 2, effect: "Increases glycoxidative burden." }],
    evidence_level: "mechanistic",
  },
  {
    id: "reduced_AGE_generation",
    label: "Reduced AGE generation",
    parent_property_id: "AGE_generation_potential",
    state_direction: "reduced",
    definition: "Preparation context reduced advanced glycation end-product generation tendency.",
    brs_links: [{ brs: "BRS3", direction: "supports", strength: 1, effect: "Supports lower glycoxidative burden." }],
    evidence_level: "mechanistic",
  },
  {
    id: "acidic_glucose_modulation",
    label: "Acidic glucose modulation",
    parent_property_id: "acidic_meal_component",
    state_direction: "activated",
    definition: "Meal acidity effect is realised in a way that may moderate glucose appearance.",
    brs_links: [{ brs: "BRS6", pm: "PM1", direction: "supports", strength: 1, effect: "Supports modest lowering of glycaemic volatility." }],
    evidence_level: "human_intervention",
  },
  {
    id: "mixed_macronutrient_buffering_realised",
    label: "Mixed macronutrient buffering realised",
    parent_property_id: "mixed_macronutrient_buffering",
    state_direction: "activated",
    definition: "Combined macronutrient buffering has been realised in the meal state.",
    brs_links: [{ brs: "BRS6", pm: "PM1", direction: "supports", strength: 2, effect: "Supports reduced post-prandial volatility." }],
    evidence_level: "human_observational",
  },
]
