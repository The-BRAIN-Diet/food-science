export type BRSId = "BRS1" | "BRS2" | "BRS3" | "BRS4" | "BRS5" | "BRS6"

export type FunctionalPropertyPolarity = "positive" | "negative" | "conditional" | "mixed"

export type FunctionalPropertyType =
  | "matrix"
  | "structure"
  | "fibre"
  | "starch"
  | "processing"
  | "preparation"
  | "compound_class"
  | "fermentation"
  | "antinutrient"
  | "tolerance"
  | "oxidation"
  | "glycaemic"
  | "satiety"
  | "mineral"
  | "lipid"
  | "protein"

export type EvidenceLevel = "human_intervention" | "human_observational" | "mechanistic" | "composition_based" | "inferred"

export interface FunctionalPropertyBRSLink {
  brs: BRSId
  pm?: string
  fm?: string
  direction: "supports" | "reduces" | "increases_risk" | "conditional"
  strength: 1 | 2 | 3
  effect: string
}

export interface FunctionalPropertyStateRule {
  trigger: string
  state_direction: "increased" | "reduced" | "avoided" | "preserved" | "activated" | "deactivated" | "unchanged" | "unknown"
  realised_state_id: string
  effect_note: string
}

export interface FunctionalProperty {
  id: string
  label: string
  definition: string
  polarity: FunctionalPropertyPolarity
  type: FunctionalPropertyType
  brs_links: FunctionalPropertyBRSLink[]
  possible_states?: string[]
  state_rules?: FunctionalPropertyStateRule[]
  modifiers?: string[]
  related_substances?: string[]
  related_food_states?: string[]
  evidence_level: EvidenceLevel
  notes?: string
}

export const functionalProperties: FunctionalProperty[] = [
  {
    id: "resistant_starch_potential",
    label: "Resistant starch potential",
    definition: "Capacity of a food or food state to generate starch fractions resistant to small-intestinal digestion.",
    polarity: "conditional",
    type: "starch",
    brs_links: [
      { brs: "BRS6", pm: "PM1", direction: "supports", strength: 2, effect: "Supports steadier glucose appearance and lower volatility." },
      { brs: "BRS5", direction: "supports", strength: 1, effect: "Supports fermentable substrate availability." },
    ],
    possible_states: ["increased_resistant_starch", "reduced_resistant_starch"],
    state_rules: [
      {
        trigger: "cooked_cooled",
        state_direction: "increased",
        realised_state_id: "increased_resistant_starch",
        effect_note: "Cooling after cooking can increase retrograded resistant starch fractions.",
      },
      {
        trigger: "fresh_hot_serving",
        state_direction: "reduced",
        realised_state_id: "reduced_resistant_starch",
        effect_note: "Freshly cooked hot starch generally expresses less resistant starch.",
      },
    ],
    modifiers: ["cooked_cooled", "reheated", "starch_retrogradation"],
    related_substances: ["starch"],
    related_food_states: ["cooled_starch_matrix"],
    evidence_level: "mechanistic",
  },
  {
    id: "soluble_viscous_fibre",
    label: "Soluble viscous fibre",
    definition: "Presence of fibre behaviour that increases intestinal viscosity and moderates glucose absorption kinetics.",
    polarity: "positive",
    type: "fibre",
    brs_links: [{ brs: "BRS6", pm: "PM1", direction: "supports", strength: 2, effect: "Supports slower substrate appearance." }],
    related_substances: ["soluble_fibre", "beta_glucan", "pectin"],
    evidence_level: "human_intervention",
  },
  {
    id: "intact_food_matrix",
    label: "Intact food matrix",
    definition: "Food structure remains relatively intact and less rapidly digestible than finely processed forms.",
    polarity: "positive",
    type: "matrix",
    brs_links: [{ brs: "BRS6", pm: "PM1", direction: "supports", strength: 2, effect: "Supports reduced rapid glucose appearance." }],
    related_food_states: ["whole_form", "minimally_comminuted"],
    evidence_level: "mechanistic",
  },
  {
    id: "low_gi_starch",
    label: "Low GI starch",
    definition: "Starch pattern associated with lower glycaemic index responses compared with rapidly digestible starches.",
    polarity: "positive",
    type: "glycaemic",
    brs_links: [{ brs: "BRS6", pm: "PM1", direction: "supports", strength: 2, effect: "Supports flatter post-prandial response." }],
    evidence_level: "human_intervention",
  },
  {
    id: "slow_glucose_release",
    label: "Slow glucose release",
    definition: "Digestive and matrix profile associated with slower glucose appearance in circulation.",
    polarity: "positive",
    type: "glycaemic",
    brs_links: [{ brs: "BRS6", pm: "PM1", direction: "supports", strength: 2, effect: "Supports glycaemic stability." }],
    evidence_level: "human_intervention",
  },
  {
    id: "acidic_meal_component",
    label: "Acidic meal component",
    definition: "Meal acidity context that may modulate gastric emptying and carbohydrate appearance rate.",
    polarity: "conditional",
    type: "preparation",
    brs_links: [{ brs: "BRS6", pm: "PM1", direction: "supports", strength: 1, effect: "May support slower glucose appearance in mixed meals." }],
    possible_states: ["acidic_glucose_modulation"],
    evidence_level: "human_intervention",
  },
  {
    id: "protein_buffering",
    label: "Protein buffering",
    definition: "Protein contribution in a meal context that can buffer rapid carbohydrate absorption dynamics.",
    polarity: "positive",
    type: "protein",
    brs_links: [{ brs: "BRS6", pm: "PM1", direction: "supports", strength: 1, effect: "Supports lower meal volatility through mixed-macro buffering." }],
    evidence_level: "human_observational",
  },
  {
    id: "fat_buffering",
    label: "Fat buffering",
    definition: "Fat contribution in meal context that can reduce rapid carbohydrate appearance when balanced appropriately.",
    polarity: "conditional",
    type: "lipid",
    brs_links: [{ brs: "BRS6", pm: "PM1", direction: "supports", strength: 1, effect: "May buffer rapid glucose appearance in mixed meals." }],
    evidence_level: "human_observational",
  },
  {
    id: "mixed_macronutrient_buffering",
    label: "Mixed macronutrient buffering",
    definition: "Meal-level buffering from combined protein, fat, fibre, and carbohydrate structure.",
    polarity: "positive",
    type: "matrix",
    brs_links: [{ brs: "BRS6", pm: "PM1", direction: "supports", strength: 2, effect: "Supports reduced post-prandial volatility." }],
    possible_states: ["mixed_macronutrient_buffering_realised"],
    evidence_level: "human_intervention",
  },
  {
    id: "polyphenol_rich",
    label: "Polyphenol-rich",
    definition: "Food pattern meaningfully associated with polyphenol content or activity even when full quantification is incomplete.",
    polarity: "positive",
    type: "compound_class",
    brs_links: [
      { brs: "BRS3", direction: "supports", strength: 2, effect: "Supports redox and inflammatory modulation." },
      { brs: "BRS6", pm: "PM2", direction: "supports", strength: 1, effect: "May support insulin sensitivity context." },
      { brs: "BRS5", direction: "supports", strength: 1, effect: "May support microbiome metabolite ecology." },
    ],
    possible_states: ["preserved_polyphenol_matrix"],
    evidence_level: "composition_based",
  },
  {
    id: "magnesium_source",
    label: "Magnesium source",
    definition: "Food or meal pattern that contributes meaningful magnesium signal for metabolic cofactor sufficiency.",
    polarity: "positive",
    type: "mineral",
    brs_links: [{ brs: "BRS6", pm: "PM2", direction: "supports", strength: 1, effect: "Supports glucose disposal and insulin-response pathways." }],
    related_substances: ["magnesium"],
    evidence_level: "human_observational",
  },
  {
    id: "omega3_source",
    label: "Omega-3 source",
    definition: "Food pattern contributing omega-3 fatty acids relevant to inflammatory and metabolic signalling.",
    polarity: "positive",
    type: "lipid",
    brs_links: [
      { brs: "BRS3", direction: "supports", strength: 2, effect: "Supports lower inflammatory burden in dietary patterns." },
      { brs: "BRS6", pm: "PM2", direction: "supports", strength: 1, effect: "Supports insulin-sensitivity context." },
    ],
    related_substances: ["epa", "dha", "ala"],
    evidence_level: "human_intervention",
  },
  {
    id: "fermented_food",
    label: "Fermented food",
    definition: "Food-state shaped by fermentation with potential matrix, digestibility, and metabolite effects.",
    polarity: "conditional",
    type: "fermentation",
    brs_links: [
      { brs: "BRS5", direction: "supports", strength: 1, effect: "May support microbiome-facing dietary patterns." },
      { brs: "BRS6", pm: "PM2", direction: "supports", strength: 1, effect: "May support metabolic flexibility depending on context." },
    ],
    evidence_level: "human_observational",
  },
  {
    id: "reduced_upf_metabolic_load",
    label: "Reduced UPF metabolic load",
    definition:
      "Food or meal pattern with lower ultra-processed food load and fewer hyperpalatable additives, associated with lower metabolic volatility risk and less rapid glycaemic dynamics in dietary context.",
    polarity: "positive",
    type: "processing",
    brs_links: [
      {
        brs: "BRS6",
        pm: "PM2",
        direction: "supports",
        strength: 1,
        effect: "May reduce spike-and-crash volatility and oscillatory burden from ultra-processed-heavy patterns.",
      },
      {
        brs: "BRS6",
        pm: "PM1",
        direction: "supports",
        strength: 1,
        effect: "May support less rapid glucose appearance when intake displaces rapidly digestible UPF carbohydrates.",
      },
      { brs: "BRS3", direction: "supports", strength: 1, effect: "May reduce avoidable oxidative/inflammatory burden." },
    ],
    evidence_level: "human_observational",
  },
  {
    id: "high_glycaemic_volatility_potential",
    label: "High glycaemic volatility potential",
    definition: "Meal or food-state tendency toward rapid glucose rise and fall dynamics.",
    polarity: "negative",
    type: "glycaemic",
    brs_links: [{ brs: "BRS6", pm: "PM1", direction: "increases_risk", strength: 2, effect: "Increases metabolic volatility burden." }],
    possible_states: ["increased_glycaemic_volatility", "reduced_glycaemic_volatility"],
    evidence_level: "human_intervention",
  },
  {
    id: "rapid_digestibility",
    label: "Rapid digestibility",
    definition: "Food matrix and processing profile associated with rapid digestion and substrate appearance.",
    polarity: "negative",
    type: "structure",
    brs_links: [{ brs: "BRS6", pm: "PM1", direction: "increases_risk", strength: 2, effect: "Increases risk of rapid glycaemic excursions." }],
    possible_states: ["increased_rapid_digestibility", "reduced_rapid_digestibility"],
    evidence_level: "mechanistic",
  },
  {
    id: "hyperpalatable_matrix",
    label: "Hyperpalatable matrix",
    definition: "Food matrix characteristics that can promote overconsumption and rapid reward-driven intake.",
    polarity: "negative",
    type: "matrix",
    brs_links: [
      { brs: "BRS6", direction: "increases_risk", strength: 2, effect: "Can increase volatility and intake burden." },
      { brs: "BRS3", direction: "increases_risk", strength: 1, effect: "May increase downstream oxidative/inflammatory burden via pattern effects." },
    ],
    evidence_level: "human_observational",
  },
  {
    id: "lipid_oxidation_prone",
    label: "Lipid oxidation prone",
    definition: "Food-state tendency to generate lipid oxidation products under adverse heat, oxygen, or storage conditions.",
    polarity: "negative",
    type: "oxidation",
    brs_links: [{ brs: "BRS3", direction: "increases_risk", strength: 2, effect: "Increases avoidable oxidative burden." }],
    possible_states: ["increased_lipid_oxidation", "reduced_lipid_oxidation", "oxidation_avoided"],
    evidence_level: "mechanistic",
  },
  {
    id: "lipid_oxidation_protective_matrix",
    label: "Lipid oxidation protective matrix",
    definition: "Food matrix with characteristics that help protect lipids from oxidation during reasonable use.",
    polarity: "positive",
    type: "oxidation",
    brs_links: [{ brs: "BRS3", direction: "supports", strength: 1, effect: "Supports lower oxidative burden." }],
    evidence_level: "mechanistic",
  },
  {
    id: "AGE_generation_potential",
    label: "AGE generation potential",
    definition: "Preparation and matrix tendency toward higher advanced glycation end-product formation.",
    polarity: "negative",
    type: "processing",
    brs_links: [{ brs: "BRS3", direction: "increases_risk", strength: 2, effect: "Increases oxidative/inflammatory load through AGE burden." }],
    possible_states: ["increased_AGE_generation", "reduced_AGE_generation"],
    evidence_level: "mechanistic",
  },
  {
    id: "phytate_content",
    label: "Phytate content",
    definition: "Presence of phytate compounds with mixed effects on mineral binding and broader dietary context.",
    polarity: "mixed",
    type: "antinutrient",
    brs_links: [
      { brs: "BRS2", direction: "conditional", strength: 1, effect: "Context-dependent effects on mineral bioavailability." },
      { brs: "BRS6", pm: "PM1", direction: "supports", strength: 1, effect: "May support slower starch dynamics in whole matrices." },
    ],
    possible_states: ["reduced_phytate_burden", "increased_phytate_mineral_binding_risk"],
    evidence_level: "mechanistic",
  },
  {
    id: "oxalate_content",
    label: "Oxalate content",
    definition: "Presence of oxalate compounds with context-dependent effects on mineral handling and tolerance.",
    polarity: "mixed",
    type: "antinutrient",
    brs_links: [{ brs: "BRS2", direction: "conditional", strength: 1, effect: "Conditional mineral interaction burden." }],
    evidence_level: "mechanistic",
  },
  {
    id: "histamine_load",
    label: "Histamine load",
    definition: "Food or meal-state contribution to histamine-related tolerance burden in sensitive contexts.",
    polarity: "conditional",
    type: "tolerance",
    brs_links: [{ brs: "BRS3", direction: "conditional", strength: 1, effect: "Context-dependent inflammatory symptom burden." }],
    evidence_level: "inferred",
  },
  {
    id: "FODMAP_density",
    label: "FODMAP density",
    definition: "Density of fermentable short-chain carbohydrates relevant to tolerance and gut symptom context.",
    polarity: "conditional",
    type: "tolerance",
    brs_links: [{ brs: "BRS5", direction: "conditional", strength: 1, effect: "Can support or burden gut context depending on individual tolerance." }],
    evidence_level: "human_observational",
  },
  {
    id: "satiety_supportive",
    label: "Satiety supportive",
    definition: "Food or meal matrix characteristics associated with greater satiety support.",
    polarity: "positive",
    type: "satiety",
    brs_links: [{ brs: "BRS6", direction: "supports", strength: 1, effect: "Supports steadier intake dynamics and reduced volatility drivers." }],
    evidence_level: "human_observational",
  },
  {
    id: "low_energy_density",
    label: "Low energy density",
    definition: "Food pattern with lower energy per unit mass supporting volume-driven satiety context.",
    polarity: "positive",
    type: "satiety",
    brs_links: [{ brs: "BRS6", pm: "PM2", direction: "supports", strength: 1, effect: "Supports metabolic load management in pattern context." }],
    evidence_level: "human_observational",
  },
  {
    id: "high_monounsaturated_fat_matrix",
    label: "High monounsaturated fat matrix",
    definition: "Lipid matrix dominated by monounsaturated fats in a whole-food or minimally processed pattern.",
    polarity: "positive",
    type: "lipid",
    brs_links: [
      { brs: "BRS3", direction: "supports", strength: 1, effect: "Supports lower oxidative burden relative to unstable lipid profiles." },
      { brs: "BRS6", pm: "PM2", direction: "supports", strength: 1, effect: "Supports metabolic signalling quality in diet patterns." },
    ],
    related_substances: ["oleic_acid"],
    evidence_level: "composition_based",
  },
  {
    id: "anti_inflammatory_lipid_matrix",
    label: "Anti-inflammatory lipid matrix",
    definition: "Lipid matrix pattern associated with reduced inflammatory signalling context.",
    polarity: "positive",
    type: "lipid",
    brs_links: [{ brs: "BRS3", direction: "supports", strength: 2, effect: "Supports lower inflammation-facing burden in dietary context." }],
    evidence_level: "human_observational",
  },
]
