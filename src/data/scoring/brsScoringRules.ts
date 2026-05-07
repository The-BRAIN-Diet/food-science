import type { BRSId } from "../functionalProperties"

export interface BRSScoringRule {
  id: string
  input_type: "functional_state" | "functional_property_potential" | "substance_signal" | "nutrient_signal" | "preparation_transformation"
  input_id: string
  brs: BRSId
  pm?: string
  fm?: string
  direction: "supports" | "burdens" | "conditional"
  points: 1 | 2 | 3
  confidence: "low" | "medium" | "high"
  public_summary: string
}

export const brsScoringRules: BRSScoringRule[] = [
  {
    id: "rule_increased_resistant_starch_brs6",
    input_type: "functional_state",
    input_id: "increased_resistant_starch",
    brs: "BRS6",
    pm: "PM1",
    fm: "FM1",
    direction: "supports",
    points: 2,
    confidence: "medium",
    public_summary: "Supports steadier glucose handling and lower metabolic volatility.",
  },
  {
    id: "rule_increased_resistant_starch_brs5",
    input_type: "functional_state",
    input_id: "increased_resistant_starch",
    brs: "BRS5",
    direction: "supports",
    points: 1,
    confidence: "medium",
    public_summary: "Supports fermentable substrate availability for gut-facing metabolic functions.",
  },
  {
    id: "rule_reduced_glycaemic_volatility_brs6",
    input_type: "functional_state",
    input_id: "reduced_glycaemic_volatility",
    brs: "BRS6",
    pm: "PM1",
    fm: "FM1",
    direction: "supports",
    points: 2,
    confidence: "high",
    public_summary: "Supports stable post-meal energy handling and reduced glycaemic excursions.",
  },
  {
    id: "rule_acidic_glucose_modulation_brs6",
    input_type: "functional_state",
    input_id: "acidic_glucose_modulation",
    brs: "BRS6",
    pm: "PM1",
    direction: "supports",
    points: 1,
    confidence: "medium",
    public_summary: "Provides a modest buffering effect on glucose appearance in mixed meals.",
  },
  {
    id: "rule_oxidation_avoided_brs3",
    input_type: "functional_state",
    input_id: "oxidation_avoided",
    brs: "BRS3",
    direction: "supports",
    points: 1,
    confidence: "medium",
    public_summary: "Reduces avoidable oxidative load from preparation choices.",
  },
  {
    id: "rule_preserved_polyphenol_matrix_brs3",
    input_type: "functional_state",
    input_id: "preserved_polyphenol_matrix",
    brs: "BRS3",
    direction: "supports",
    points: 1,
    confidence: "medium",
    public_summary: "Preserves protective polyphenol-associated matrix effects.",
  },
  {
    id: "rule_increased_lipid_oxidation_brs3",
    input_type: "functional_state",
    input_id: "increased_lipid_oxidation",
    brs: "BRS3",
    direction: "burdens",
    points: 2,
    confidence: "high",
    public_summary: "Increases oxidative stress burden through preparation-derived lipid oxidation.",
  },
  {
    id: "rule_increased_age_generation_brs3",
    input_type: "functional_state",
    input_id: "increased_AGE_generation",
    brs: "BRS3",
    direction: "burdens",
    points: 2,
    confidence: "high",
    public_summary: "Increases glycoxidative burden through elevated AGE formation.",
  },
  {
    id: "rule_increased_glycaemic_volatility_brs6",
    input_type: "functional_state",
    input_id: "increased_glycaemic_volatility",
    brs: "BRS6",
    pm: "PM1",
    direction: "burdens",
    points: 2,
    confidence: "high",
    public_summary: "Increases post-meal volatility and metabolic strain.",
  },
  {
    id: "rule_reduced_phytate_burden_brs2",
    input_type: "functional_state",
    input_id: "reduced_phytate_burden",
    brs: "BRS2",
    direction: "supports",
    points: 1,
    confidence: "medium",
    public_summary: "Supports mineral availability context relevant to one-carbon and cofactor biology.",
  },
  {
    id: "rule_increased_phytate_binding_risk_brs2",
    input_type: "functional_state",
    input_id: "increased_phytate_mineral_binding_risk",
    brs: "BRS2",
    direction: "burdens",
    points: 1,
    confidence: "medium",
    public_summary: "May increase mineral-binding burden in sensitive dietary contexts.",
  },
  {
    id: "rule_mixed_macro_buffering_brs6",
    input_type: "functional_state",
    input_id: "mixed_macronutrient_buffering_realised",
    brs: "BRS6",
    pm: "PM1",
    fm: "FM1",
    direction: "supports",
    points: 2,
    confidence: "medium",
    public_summary: "Supports reduced glycaemic volatility through mixed-meal structure.",
  },
]
