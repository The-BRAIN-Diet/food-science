# Functional Properties Ontology Schema

## Purpose

The Functional Properties layer models physiologically meaningful food behaviours that are not adequately captured by nutrients, substances, or static composition tables.

This layer exists to prevent direct food -> mechanism explosion. Foods are tagged once with reusable functional properties. Primary Mechanisms (PMs), Functional Mechanisms (FMs), and BRS pages then read those properties through a central registry.

## Core Principle

The ontology should not manually map every food to every BRS mechanism.

Instead:

Food  
-> Nutrients / Substances  
-> Functional Properties  
-> Primary Mechanisms (PMs)  
-> Functional Mechanisms (FMs)  
-> Biological Regulatory Systems (BRS)  
-> Functional Outcomes

Functional Properties are the bridge between food pages and biological mechanisms.

## 1. Definitions

### 1.1 Substance

A substance is an intrinsic molecular or nutritional constituent of a food that can usually be named as a compound, nutrient, or compound class.

Examples:
- magnesium
- potassium
- vitamin C
- DHA
- EPA
- starch
- chlorogenic acid
- quercetin
- beta-glucan
- oleocanthal

Substances belong in nutrition tables, substance lists, or compound sections.

### 1.2 Functional Property

A Functional Property is a physiologically meaningful characteristic of a food, matrix, preparation state, or processing state.

It may arise from:
- food structure
- fibre behaviour
- starch structure
- preparation method
- processing level
- compound class presence
- matrix effects
- oxidation susceptibility
- fermentation
- digestion kinetics
- antinutrient behaviour
- tolerance burden

Functional Properties may be positive, negative, or conditional.

Examples:
- soluble_viscous_fibre
- resistant_starch_potential
- intact_food_matrix
- slow_glucose_release
- high_glycaemic_volatility_potential
- phytate_content
- lipid_oxidation_prone
- AGE_generation_potential
- polyphenol_rich
- fermentation_derived_peptides

### 1.3 Preparation Effect

A Preparation Effect modifies Functional Properties based on cooking, cooling, fermenting, sprouting, soaking, grinding, frying, reheating, or other state changes.

Example:

Cooked and cooled potatoes increase resistant starch potential through starch retrogradation.

### 1.4 Relationship to Nutrients, Substances, and Bioactive Compounds

The Functional Properties layer must not duplicate the food page Nutrition Table, Substances list, or Bioactive Compounds section.

The distinction is:

Nutrients / Substances / Bioactive Compounds = what the food contains.

Functional Properties = what the food or food-state does physiologically because of its composition, matrix, structure, preparation, or processing.

#### 1.4.1 Nutrients

Nutrients are established nutritional constituents usually represented quantitatively.

Examples:
- protein
- fibre
- magnesium
- potassium
- vitamin C
- folate
- vitamin E
- omega-3 fatty acids

These belong in the Nutrition Table.

#### 1.4.2 Substances

Substances are named intrinsic compounds or compound families present in the food. They may be nutrients, bioactives, or other chemically identifiable constituents.

Examples:
- DHA
- EPA
- oleic acid
- starch
- beta-glucan
- chlorogenic acid
- quercetin
- hydroxytyrosol
- oleuropein
- oleocanthal

These belong in the Substances or Bioactive Compounds sections.

#### 1.4.3 Bioactive Compounds

Bioactive Compounds are a subset of substances with plausible biological activity beyond basic nutrition.

Examples from extra-virgin olive oil:
- hydroxytyrosol
- oleuropein
- oleocanthal
- oleacein
- tyrosol
- squalene
- tocopherols
- oleic acid

These should remain named as compounds. They should not be converted into Functional Properties.

#### 1.4.4 Functional Properties

Functional Properties sit one level higher than substances. They may be caused by substances, but they are not themselves the same as substances.

Examples from extra-virgin olive oil:
- polyphenol_rich
- high_monounsaturated_fat_matrix
- lipid_oxidation_protective_matrix
- low_temperature_use_preferred
- lipid_oxidation_prone_when_overheated
- anti_inflammatory_lipid_matrix

These are functional interpretations of the food matrix, not compound entries.

#### 1.4.5 Cross-over Rule

Some compounds can justify a Functional Property, but they should not be duplicated as properties.

Example:
- hydroxytyrosol = bioactive compound / substance
- oleocanthal = bioactive compound / substance
- oleic acid = nutrient/substance

- polyphenol_rich = functional property
- anti_inflammatory_lipid_matrix = functional property
- lipid_oxidation_protective_matrix = functional property

So the relation is:

Bioactive compounds provide evidence for Functional Properties.  
Functional Properties map those compounds into PM/BRS relevance.

#### 1.4.6 Practical Rule

Do not create a Functional Property if the entry is simply a named molecule.

Use Functional Properties only when describing:
- matrix behaviour
- preparation-dependent behaviour
- physiological tendency
- compound-class signature
- digestion kinetics
- oxidation risk/protection
- antinutrient trade-off
- glycaemic behaviour
- fermentation behaviour
- satiety behaviour
- tolerance burden

Correct:

```yaml
substances:
  - hydroxytyrosol
  - oleocanthal
  - oleuropein
  - oleic_acid

functional_properties:
  - id: polyphenol_rich
  - id: high_monounsaturated_fat_matrix
  - id: lipid_oxidation_protective_matrix
  - id: lipid_oxidation_prone_when_overheated
```

Incorrect:

```yaml
functional_properties:
  - id: hydroxytyrosol
  - id: oleocanthal
  - id: oleuropein
```

## 2. Why This Layer Is Needed

Nutrition databases are incomplete and static. They often fail to capture:
- polyphenol diversity
- cultivar variation
- food matrix behaviour
- resistant starch generation
- starch gelatinisation and retrogradation
- fibre viscosity
- lipid oxidation
- Maillard products and AGE formation
- fermentation-derived compounds
- antinutrient trade-offs
- effects of processing and food structure

The Functional Properties layer allows the system to model likely physiological behaviour even where exact compound quantification is unavailable.

This prevents the ontology from becoming chemically reductionist.

## 3. Data Model

### 3.0 Potential vs Realised Functional State

The schema must distinguish between a food's functional property potential and a recipe's realised functional state.

This is essential because many properties are not fixed. They depend on preparation, cooking, cooling, fermentation, oxidation control, soaking, sprouting, grinding, food sequencing, and co-ingestion.

Examples:

Potato as a food -> resistant_starch_potential  
Cooked-and-cooled potato salad -> resistant_starch_realised / increased_resistant_starch  
Hot mashed potato -> high_glycaemic_volatility_potential realised / increased_rapid_digestibility

Olive oil as a food -> lipid_oxidation_prone only under high-heat or poor storage contexts  
Low-temperature dressing use -> oxidation_avoided / reduced_lipid_oxidation  
Repeated high-heat frying -> increased_lipid_oxidation

Legumes as foods -> phytate_content  
Soaked, sprouted, or fermented legumes -> reduced_phytate_burden  
Unsoaked high-phytate meal with low mineral diversity -> phytate_mineral_binding_risk realised

Therefore the ontology needs two related layers:

Food-level Functional Properties = possible, inherent, or conditional properties of an ingredient.

Recipe-level Functional States = the realised direction and strength of those properties after preparation and meal context.

Food pages should mainly describe potential. Recipe pages should describe actualised state.

### 3.1 Functional Property Registry

Create a central registry:

`src/data/functionalProperties.ts`

Each Functional Property should define the property potential and how it may become a realised state.

```ts
export type FunctionalPropertyPolarity =
  | 'positive'
  | 'negative'
  | 'conditional'
  | 'mixed';

export type FunctionalPropertyType =
  | 'matrix'
  | 'structure'
  | 'fibre'
  | 'starch'
  | 'processing'
  | 'preparation'
  | 'compound_class'
  | 'fermentation'
  | 'antinutrient'
  | 'tolerance'
  | 'oxidation'
  | 'glycaemic'
  | 'satiety'
  | 'mineral'
  | 'lipid'
  | 'protein';

export type EvidenceLevel =
  | 'human_intervention'
  | 'human_observational'
  | 'mechanistic'
  | 'composition_based'
  | 'inferred';

export type FunctionalStateDirection =
  | 'increased'
  | 'reduced'
  | 'avoided'
  | 'preserved'
  | 'activated'
  | 'deactivated'
  | 'unchanged'
  | 'unknown';

export interface FunctionalPropertyBRSLink {
  brs: 'BRS1' | 'BRS2' | 'BRS3' | 'BRS4' | 'BRS5' | 'BRS6';
  pm?: string;
  fm?: string;
  direction: 'supports' | 'reduces' | 'increases_risk' | 'conditional';
  strength: 1 | 2 | 3;
  effect: string;
}

export interface FunctionalPropertyStateRule {
  trigger: string;
  state_direction: FunctionalStateDirection;
  realised_state_id: string;
  effect_note: string;
}

export interface FunctionalProperty {
  id: string;
  label: string;
  definition: string;
  polarity: FunctionalPropertyPolarity;
  type: FunctionalPropertyType;
  brs_links: FunctionalPropertyBRSLink[];
  possible_states?: string[];
  state_rules?: FunctionalPropertyStateRule[];
  modifiers?: string[];
  related_substances?: string[];
  related_food_states?: string[];
  evidence_level: EvidenceLevel;
  notes?: string;
}
```

### 3.2 Functional State Registry

Create a second optional registry for realised recipe-level states:

`src/data/functionalStates.ts`

Functional States represent what actually happened in a recipe or prepared meal.

```ts
export interface FunctionalState {
  id: string;
  label: string;
  parent_property_id: string;
  state_direction: FunctionalStateDirection;
  definition: string;
  brs_links?: FunctionalPropertyBRSLink[];
  evidence_level: EvidenceLevel;
  notes?: string;
}
```

Examples:
- increased_resistant_starch
- reduced_phytate_burden
- increased_lipid_oxidation
- reduced_lipid_oxidation
- oxidation_avoided
- preserved_polyphenol_matrix
- increased_AGE_generation
- reduced_rapid_digestibility

Functional States should not replace Functional Properties. They describe whether a property has been increased, reduced, avoided, preserved, or actualised in a specific recipe context.

## 4. Food Page Front Matter

Food pages should allow a `functional_properties` field.
At food level, these properties usually describe potential, not guaranteed physiological state.

Example:

```yaml
functional_properties:
  - id: resistant_starch_potential
    polarity: conditional
    confidence: medium
    status: potential
    note: "Relevant to potatoes because cooked-and-cooled states can increase resistant starch through starch retrogradation."
    preparation_dependent: true

  - id: high_glycaemic_volatility_potential
    polarity: conditional
    confidence: medium
    status: potential
    note: "More relevant when mashed, fried, or eaten without fibre/protein/fat buffering."
    preparation_dependent: true

  - id: potassium_rich
    polarity: positive
    confidence: high
    status: inherent
```

Recommended food-level statuses:
- inherent = present as a stable feature of the food
- potential = may be expressed depending on preparation or meal context
- conditional = depends strongly on dose, matrix, preparation, or individual tolerance
- unknown = plausible but not sufficiently characterised

Food pages should not manually define BRS mappings. BRS mappings come from the Functional Property registry.

### 4.1 Recipe Page Front Matter

Recipe pages should allow a `functional_states` field.
At recipe level, the ontology should describe the realised state produced by ingredient selection, preparation, and method.

Example:

```yaml
functional_states:
  - id: increased_resistant_starch
    parent_property_id: resistant_starch_potential
    state_direction: increased
    confidence: medium
    evidence_basis: mechanistic
    triggered_by:
      - cooked_cooled
      - starch_retrogradation
    note: "Potatoes are cooked and cooled before serving, increasing resistant starch relative to freshly cooked hot potato."

  - id: reduced_lipid_oxidation
    parent_property_id: lipid_oxidation_prone
    state_direction: reduced
    confidence: high
    evidence_basis: preparation_logic
    triggered_by:
      - low_temperature_cooking
      - olive_oil_used_as_dressing
    note: "Oil is not repeatedly heated or exposed to high-temperature frying."

  - id: reduced_phytate_burden
    parent_property_id: phytate_content
    state_direction: reduced
    confidence: medium
    evidence_basis: preparation_logic
    triggered_by:
      - soaking
      - sprouting
      - fermentation
    note: "Preparation method reduces phytate-related mineral-binding burden."
```

Recipe pages may inherit Functional Properties from ingredients, but Functional States should be generated by preparation logic.

Recommended recipe-level directions:
- increased
- reduced
- avoided
- preserved
- activated
- deactivated
- unchanged
- unknown

This means recipes can express:
- resistant_starch_potential -> increased_resistant_starch
- lipid_oxidation_prone -> oxidation_avoided
- phytate_content -> reduced_phytate_burden
- polyphenol_rich -> preserved_polyphenol_matrix
- high_glycaemic_volatility_potential -> reduced_glycaemic_volatility

## 5. Example: Potatoes

### 5.1 Substances

Potatoes may contain:

```yaml
substances:
  - starch
  - potassium
  - vitamin_c
  - chlorogenic_acid
```

### 5.2 Functional Properties

Potatoes may express:

```yaml
functional_properties:
  - id: resistant_starch_potential
  - id: high_glycaemic_volatility_potential
  - id: potassium_rich
  - id: satiety_supportive
```

### 5.3 Preparation Effects

```yaml
preparation_effects:
  cooked_cooled:
    increases:
      - resistant_starch_potential
      - slower_glucose_release
    reduces:
      - high_glycaemic_volatility_potential

  mashed_hot:
    increases:
      - high_glycaemic_volatility_potential
    reduces:
      - intact_food_matrix

  deep_fried:
    increases:
      - lipid_oxidation_prone
      - AGE_generation_potential
      - energy_density
```

## 6. BRS6 Initial Functional Properties

Begin with BRS6 only to avoid scope explosion.

### 6.1 BRS6-FM1-PM1: Glucose Appearance Kinetics

PM1 should listen for properties affecting the **rate and temporal profile** of glucose appearance after meals—gastric emptying, digestion kinetics, meal matrix, preparation state, and sequencing—distinct from PM2 oscillatory variability and PM3 disposal.

Initial property IDs:
- soluble_viscous_fibre
- resistant_starch_potential
- intact_food_matrix
- low_gi_starch
- slow_glucose_release
- acidic_meal_component
- protein_buffering
- fat_buffering
- mixed_macronutrient_buffering
- reduced_upf_metabolic_load
- high_glycaemic_volatility_potential
- rapid_digestibility
- hyperpalatable_matrix

### 6.2 BRS6-FM1-PM2: Glycaemic Variability Regulation

PM2 should listen for properties affecting post-prandial glucose **volatility**, oscillatory exposure, spike-and-crash cycling, and meal-period stability—distinct from PM1 appearance kinetics alone and from PM3 disposal/sensitivity.

Initial property IDs:
- reduced_glycaemic_volatility
- increased_glycaemic_volatility
- mixed_macronutrient_buffering
- soluble_viscous_fibre
- reduced_upf_metabolic_load
- hyperpalatable_matrix
- rapid_digestibility
- high_glycaemic_volatility_potential
- stable_post_prandial_profile

Prefer `reduced_upf_metabolic_load` in registry and public-facing ontology text; avoid abstract `*_signal` suffixes on property IDs.

## 7. Example Registry Entries

### 7.1 Resistant Starch Potential

```ts
{
  id: 'resistant_starch_potential',
  label: 'Resistant starch potential',
  definition: 'Capacity of a food or food state to generate or provide starch fractions resistant to small-intestinal digestion, often increased by cooking and cooling starch-rich foods.',
  polarity: 'conditional',
  type: 'starch',
  brs_links: [
    {
      brs: 'BRS6',
      pm: 'PM1',
      direction: 'supports',
      strength: 2,
      effect: 'Supports slower glucose appearance and reduced glycaemic volatility.'
    },
    {
      brs: 'BRS5',
      direction: 'supports',
      strength: 2,
      effect: 'Supports microbial fermentation and SCFA production.'
    }
  ],
  modifiers: ['cooked_cooled', 'reheated', 'starch_retrogradation'],
  related_substances: ['starch'],
  related_food_states: ['cooked_cooled_potato', 'cooled_rice', 'cooled_pasta'],
  evidence_level: 'mechanistic',
  notes: 'Should not be treated as a fixed substance in all forms of the food.'
}
```

### 7.2 Phytate Content

```ts
{
  id: 'phytate_content',
  label: 'Phytate content',
  definition: 'Presence of phytic acid/phytate compounds that may bind minerals while also contributing antioxidant and potentially glycaemic-modulating effects.',
  polarity: 'mixed',
  type: 'antinutrient',
  brs_links: [
    {
      brs: 'BRS2',
      direction: 'conditional',
      strength: 1,
      effect: 'May reduce mineral bioavailability relevant to methylation and enzymatic cofactor sufficiency in poorly balanced diets.'
    },
    {
      brs: 'BRS3',
      direction: 'supports',
      strength: 1,
      effect: 'May contribute antioxidant and metal-chelating effects in context.'
    },
    {
      brs: 'BRS6',
      pm: 'PM1',
      direction: 'supports',
      strength: 1,
      effect: 'May contribute to slower starch digestion and glycaemic modulation in whole plant matrices.'
    }
  ],
  modifiers: ['soaking', 'sprouting', 'fermentation', 'sourdough_fermentation', 'vitamin_c_coingestion'],
  related_substances: ['phytic_acid', 'inositol_hexaphosphate'],
  evidence_level: 'mechanistic',
  notes: 'Do not classify simply as negative. Effects are context-, dose-, and preparation-dependent.'
}
```

### 7.3 Polyphenol Rich

```ts
{
  id: 'polyphenol_rich',
  label: 'Polyphenol-rich',
  definition: 'Food is meaningfully associated with polyphenol content or polyphenol-driven biological activity, even when exact compound quantification is incomplete.',
  polarity: 'positive',
  type: 'compound_class',
  brs_links: [
    {
      brs: 'BRS3',
      direction: 'supports',
      strength: 2,
      effect: 'Supports redox and inflammatory modulation through polyphenol-associated signalling.'
    },
    {
      brs: 'BRS6',
      pm: 'PM2',
      direction: 'supports',
      strength: 1,
      effect: 'May support insulin sensitivity and vascular-metabolic signalling depending on food matrix and dose.'
    },
    {
      brs: 'BRS5',
      direction: 'supports',
      strength: 1,
      effect: 'May support microbiome-mediated metabolite production and microbial ecology.'
    }
  ],
  related_substances: ['flavonoids', 'phenolic_acids', 'anthocyanins', 'flavanols'],
  evidence_level: 'composition_based',
  notes: 'Used when a food has strong literature support for polyphenol relevance but incomplete quantified compound breakdown.'
}
```

## 8. Polarity Rules

### Positive

Use when the property usually supports one or more BRS mechanisms.

Examples:
- omega3_source
- magnesium_source
- polyphenol_rich
- soluble_viscous_fibre

### Negative

Use when the property usually increases burden or risk within the BRS framework.

Examples:
- lipid_oxidation_prone
- AGE_generation_potential
- high_glycaemic_volatility_potential
- hyperpalatable_matrix

### Conditional

Use when the property depends strongly on preparation, dose, matrix, or user context.

Examples:
- resistant_starch_potential
- histamine_load
- FODMAP_density
- high_starch_density

### Mixed

Use when the property has both plausible beneficial and adverse effects.

Examples:
- phytate_content
- oxalate_content
- lectin_content
- iodine_density
- copper_density

## 9. Scoring Guidance

Functional Properties should not automatically create a final recipe score on their own. They should contribute to PM-level evidence signals.

Recommended interpretation:

Food property tag -> PM relevance signal -> FM support estimate -> BRS impact score

Strength scale:
- 1 = weak / supportive / context-dependent
- 2 = moderate / relevant / plausible human significance
- 3 = strong / central / consistently meaningful

Confidence scale for food page assignment:
- low = plausible but weakly evidenced or highly context-dependent
- medium = reasonable evidence or strong composition logic
- high = clear composition or well-established property

## 10. Implementation Notes

### 10.1 Avoid Direct Food-to-BRS Mapping

Do not add this to food pages:

```yaml
brs_links:
  - BRS6
```

Instead, add:

```yaml
functional_properties:
  - id: soluble_viscous_fibre
```

The registry handles BRS alignment.

### 10.2 Keep Functional Properties Controlled

Do not allow unlimited free-text properties.

All property IDs must exist in:

`src/data/functionalProperties.ts`

### 10.3 Allow Notes but Not New Logic in Food Pages

Food pages may include contextual notes:

```yaml
note: "More relevant when cooked and cooled."
```

But they should not define mechanism logic locally.

### 10.4 Start Narrow

Only implement BRS6 properties first.
Once stable, extend to:
- BRS3: inflammation and oxidative stress
- BRS5: gut-brain axis and ENS
- BRS4: mitochondrial function and bioenergetics
- BRS2: methylation and one-carbon metabolism
- BRS1: neurotransmitter regulation

## 11. Cursor Instruction

Create a Functional Properties ontology layer for The BRAIN Diet site.

Add a new registry at `src/data/functionalProperties.ts`. This registry should define reusable food-state and matrix properties that sit between substances and biological mechanisms.

Functional Properties are not the same as substances. They include preparation-dependent behaviours, food matrix effects, glycaemic behaviours, antinutrient effects, oxidation susceptibility, fibre behaviour, starch retrogradation, fermentation effects, and compound-class signals where exact quantification is incomplete.

Each Functional Property should include:
- id
- label
- definition
- polarity
- type
- brs_links
- modifiers
- related_substances
- related_food_states
- evidence_level
- notes

Update the food page schema to allow a `functional_properties` front matter field. Food pages should only list property IDs, confidence, notes, and whether the property is preparation-dependent. They should not manually define BRS links.

Begin with BRS6 only. Add initial properties for BRS6-FM1-PM1 Glucose Appearance Kinetics, BRS6-FM1-PM2 Glycaemic Variability Regulation, and BRS6-FM1-PM3 insulin sensitivity / disposal narratives as needed.

Ensure resistant starch is modelled as a functional property, not a fixed substance. Potatoes should have `resistant_starch_potential` as a preparation-dependent property, especially relevant to cooked-and-cooled states.

## 12. Public Display and BRS Page Relationship

### 12.1 BRS Pages Should Be Public

BRS pages are public educational anchors. They explain the major Biological Regulatory Systems and how diet, preparation, and food matrices can influence them.

Public BRS pages should include:

BRS overview  
-> Functional Mechanisms (FMs)  
-> Primary Mechanisms (PMs)  
-> example dietary levers  
-> example foods / recipe-state effects

Example:

BRS6 - Metabolic & Neuroendocrine Stress  
FM1 - Metabolic Stability & Cognitive Energy Availability  
PM1 - Glucose Appearance Kinetics  
PM2 - Glycaemic Variability Regulation  
PM3 - Insulin Sensitivity & Glucose Disposal (extended mechanistic page)

### 12.2 Functional Properties Are Internal, But Their Meaning Should Be Publicly Translated

Functional Property and Functional State IDs should remain mostly internal ontology terms.
Public pages should display human-readable interpretations rather than raw IDs.

Internal:
- resistant_starch_potential
- increased_resistant_starch
- oxidation_avoided
- acidic_meal_component

Public-facing translation:
- Cooling potatoes increases resistant starch formation.
- Using olive oil as a dressing avoids high-heat lipid oxidation.
- Acidic ingredients may support slower glucose appearance.

### 12.3 Recipe Pages Should Tie Functional Matrix Notes Back to BRS

Recipe pages should include a public-facing section such as:
- Functional Matrix Notes
- Food-State & BRS Notes

This section should explain the realised functional states produced by ingredient choice and preparation.

Example:

Functional Matrix Notes
- Cooked-and-cooled potatoes increase resistant starch formation.
- Olive oil used as a dressing avoids high-heat lipid oxidation.
- Vinegar/acidity supports slower glucose appearance.

BRS Links
- BRS6 - Metabolic & Neuroendocrine Stress: supports glycaemic stability and reduced metabolic volatility.
- BRS5 - Gut-Brain Axis: supports fermentable substrate availability.
- BRS3 - Inflammation & Oxidative Stress: reduces avoidable lipid oxidation burden.

### 12.4 Progressive Disclosure Model

The system should use progressive disclosure:

Recipe page  
-> readable Functional Matrix Notes  
-> BRS support summary  
-> BRS page  
-> PM/FM explanation  
-> internal ontology registry

This allows general readers to understand the practical meaning while allowing students, clinicians, contributors, and researchers to follow the mechanism chain.

### 12.5 Display Rule

Do not display raw Functional Property IDs as the primary public language.

Correct public display:

Cooling increases resistant starch formation, supporting BRS6 glycaemic stability and BRS5 fermentable substrate support.

Incorrect public display:

`functional_states: increased_resistant_starch -> BRS6_PM1`

The raw ontology IDs should remain available for data, scoring, validation, and possible developer/debug views, but not as the main user-facing copy.

## 13. Open Questions

- Should Functional Properties be displayed publicly on food pages or used only for internal scoring?
- Should recipe pages inherit Functional Properties from ingredients automatically?
- Should preparation methods modify Functional Properties at recipe level?
- Should Functional Properties be used in search/filter UI later?
- Should the registry eventually support contraindications or user-specific tolerance flags?

Current Answers:
- Functional Properties should be internal ontology terms, but translated publicly into readable Functional Matrix Notes.
- Recipe pages should inherit Functional Properties from ingredients automatically as candidate potentials.
- Preparation methods should modify Functional Properties into realised Functional States at recipe level.
- Functional Properties should eventually support search/filter UI, but only after the ontology is stable.
- Contraindications and tolerance flags should eventually be supported, but in a separate user-specific interpretation layer, not in core food truth.

## 14. Scoring Implementation Plan

The Functional Properties layer becomes scoreable only when the ontology connects food-level potentials, preparation-level transformations, realised recipe states, and BRS scoring rules.

### 14.1 Required Implementation Steps

Step 1 - Add Functional Property Potentials to Food Pages

Food pages must capture reusable functional property potentials in front matter.

Example:

```yaml
functional_property_potentials:
  - id: resistant_starch_potential
    status: potential
    confidence: medium
    preparation_dependent: true
    note: "Relevant when potatoes are cooked and cooled."

  - id: high_glycaemic_volatility_potential
    status: conditional
    confidence: medium
    preparation_dependent: true
    note: "More relevant when mashed, fried, or eaten without buffering foods."
```

This layer belongs at food level, not substance level.

Step 2 - Connect Food Potentials to the Functional Property Registry

Every `functional_property_potentials[].id` must resolve to a canonical entry in:

`src/data/functionalProperties.ts`

The registry defines:
- id
- label
- definition
- polarity
- type
- possible states
- state rules
- BRS/PM/FM links
- evidence level
- modifiers
- related substances
- notes

Food pages should not define BRS logic locally. They only reference property IDs.

Step 3 - Create the Scoring Schema

Create a scoring schema that converts realised recipe states into BRS support scores.

Recommended file:

`src/data/scoring/brsScoringRules.ts`

Example structure:

```ts
export interface BRSScoringRule {
  id: string;
  input_type: 'functional_property_potential' | 'functional_state' | 'substance_signal' | 'nutrient_signal';
  input_id: string;
  brs: 'BRS1' | 'BRS2' | 'BRS3' | 'BRS4' | 'BRS5' | 'BRS6';
  pm?: string;
  fm?: string;
  direction: 'supports' | 'burdens' | 'conditional';
  points: 1 | 2 | 3;
  confidence: 'low' | 'medium' | 'high';
  public_summary: string;
}
```

Functional states should generally be more scoreable than potentials.

Example:

```ts
{
  id: 'score_increased_resistant_starch_brs6',
  input_type: 'functional_state',
  input_id: 'increased_resistant_starch',
  brs: 'BRS6',
  pm: 'PM1',
  fm: 'FM1',
  direction: 'supports',
  points: 2,
  confidence: 'medium',
  public_summary: 'Supports steadier glucose handling and reduced metabolic volatility.'
}
```

Step 4 - Connect Substances and Existing BRS Matrix Signals Back to Scoring

Substances and nutrients should remain valid scoring inputs, but they should enter as `substance_signal` or `nutrient_signal`, not as Functional Properties.

Example:

```ts
{
  id: 'score_magnesium_brs6_pm2',
  input_type: 'nutrient_signal',
  input_id: 'magnesium_source',
  brs: 'BRS6',
  pm: 'PM2',
  direction: 'supports',
  points: 1,
  confidence: 'medium',
  public_summary: 'Supports insulin sensitivity and glucose disposal capacity.'
}
```

Existing BRS matrix connections should be migrated into the scoring layer where possible.

The system should therefore accept scoring evidence from:
- nutrients
- substances
- functional property potentials
- realised functional states
- preparation transformations

But final recipe scoring should prioritise realised functional states when available.

Step 5 - Connect Recipe Pages to the New Public BRS Support Table

Recipe pages should display a table with:

Functional Matrix Notes | BRS Links | BRS Support Summary | Score

Example:

Functional Matrix Notes: Cooling potatoes increases resistant starch formation and slows glucose release.  
BRS Links: BRS6, BRS5  
BRS Support Summary: Supports steadier metabolic energy availability and fermentable substrate support.  
Score: BRS6: 2 / BRS5: 1

Functional Matrix Notes: Olive oil used without high-heat frying helps avoid excessive lipid oxidation.  
BRS Links: BRS3  
BRS Support Summary: Helps reduce avoidable oxidative burden during cooking.  
Score: BRS3: 2

The public table should not display PM/FM by default. PM/FM remain part of the internal linkage and BRS page drill-down.

## 15. Recipe Scoring Flow

The intended scoring flow is:

Ingredient list  
-> inherit food-level functional property potentials  
-> apply preparation transformations  
-> generate realised functional states  
-> apply scoring rules  
-> aggregate by BRS  
-> render public BRS support table

### 15.1 Example: Potato Salad

```yaml
recipe: cooled_potato_salad

ingredients:
  - potato
  - extra_virgin_olive_oil
  - vinegar

inherited_potentials:
  potato:
    - resistant_starch_potential
    - high_glycaemic_volatility_potential
  extra_virgin_olive_oil:
    - polyphenol_rich
    - lipid_oxidation_protective_matrix
    - lipid_oxidation_prone_when_overheated
  vinegar:
    - acidic_meal_component

preparation_transformations:
  - cooked_cooled
  - dressing_use
  - no_high_heat_frying

realised_functional_states:
  - increased_resistant_starch
  - reduced_glycaemic_volatility
  - oxidation_avoided
  - preserved_polyphenol_matrix
  - acidic_glucose_modulation

brs_score_outputs:
  BRS6:
    score: 3
    summary: "Supports glycaemic stability and steadier metabolic energy availability."
  BRS5:
    score: 2
    summary: "Supports fermentable substrate availability for microbial metabolism."
  BRS3:
    score: 2
    summary: "Reduces avoidable lipid oxidation and preserves protective polyphenol signals."
```

## 16. Public vs Internal Scoring

Internal Scoring Truth  
The scoring engine reads structured objects:
- functional_states
- nutrient_signals
- substance_signals
- scoring_rules

Public Display  
The user sees translated outputs:
- Functional Matrix Notes
- BRS Links
- BRS Support Summary
- Score

Raw ontology IDs should not be the primary public language.

## 17. Working Decision

For the first implementation phase:
- Add `functional_property_potentials` to food pages.
- Create the Functional Property registry.
- Create the Functional State registry.
- Create BRS scoring rules.
- Pilot with BRS6 using potatoes, lentils, EVOO, vinegar, oats, and legumes.
- Update recipe pages to inherit potentials and show the public BRS support table.
- Keep PM/FM internal unless users click through to BRS pages.
