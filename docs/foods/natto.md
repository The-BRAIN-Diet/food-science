---
id: natto
fcir_cases:
  - FCIR-018
title: Natto
sidebar_label: Natto
description: Fermented soybeans with unique Bacillus subtilis and vitamin K2
tags:
  - Food
  - Natto
  - Vegan
  - Vegetarian
  - Vitamin K2
  - Spermidine
list_image: /img/foods/natto/natto_thumb.webp
nutrition_per_100g:
  sugar_g: 4.89
  vitamin_e_mg: 0.01
  choline_mg: 57
  vitamin_k_ug: 23.1
  carbs_g: 12.68
  kcal: 211
  protein_g: 19.4
  sat_fat_g: 1.591
  fibre_g: 5.4
  iron_mg: 8.6
  magnesium_mg: 115
  phosphorus_mg: 174
  sodium_mg: 7
  copper_mg: 0.667
  manganese_mg: 1.528
  vitamin_c_mg: 13
  vitamin_b1_mg: 0.16
  vitamin_b2_mg: 0.19
  folate_ug: 8
  fat_g: 11
  calcium_mg: 217
  potassium_mg: 729
  zinc_mg: 3.03
  linoleic_g: 5.476
  vitamin_b5_mg: 0.215
  vitamin_b6_mg: 0.13
  selenium_ug: 8.8
  ala_mg: 734
  omega3_mg: 734
omega3_components:
  - nutrient: ala_mg
    identity: 18:3 n-3 (ALA; USDA 1270 interpreted)
    amount_mg: 734
public_display:
  ala_mg: internal-only
nutrition_source:
  database: USDA FoodData Central
  food_name: Natto
  fdc_id: 172443
  retrieval_method: SR Legacy bulk (April 2018)
  basis: per 100 g edible portion
  last_checked: '2026-08-15'
  limitations: Unqualified 18:3 on this record is documented in FCIR-018.
amino_acid_strengths: Relatively complete plant protein; good lysine and leucine.
complementary_pairings: Grains or other legumes for variety and balance.
main_image: /img/foods/natto/natto_medium.webp
legacy_list_image: /img/foods/natto/natto_thumb.webp
legacy_main_image: /img/foods/natto/natto_medium.webp
nutrition_supplementary_sources:
  - key: ala_interpreted
    label: Alpha-linolenic acid (ALA; 18:3 n-3)
    value: 0.734
    unit: g
    notes: USDA 18:3 quantity; isomer from USDA soybean oil nutrient 1404
    public_display: table
    exclude_from_recipe_sum: true
    fcir_case: FCIR-018
    source_note: This value uses a documented composition interpretation. See FCIR-018.
    public_note: This value uses a documented composition interpretation.
    source_group: This value uses a documented composition interpretation.
  - key: vitamin_k2_qual
    label: Vitamin K2
    status: Present — quantity not established
    amount_display: Present
    source_note: >-
      Schurgers and Vermeer (2000), Determination of phylloquinone and
      menaquinones in food. Primary abstract explicitly identifies K2 in butter,
      egg yolk, natto and cheese. No total vitamin K value used as K2.
    public_display: internal-only
    omit_substance_card: false
    evidence_status: supported
    presence_status: presence_supported_amount_unavailable
    source_url: https://pubmed.ncbi.nlm.nih.gov/11356998/
    source_group: vitamin-k2
    public_note: Contains menaquinones (vitamin K2); the amount is product-dependent.
    notes: butter, egg yolk or fermented soybean food
    source_reference: '#food-source-4'
  - key: spermidine_qual
    label: Spermidine
    status: Present — quantity not established
    amount_display: Present — quantity not established
    notes: Measured food occurrence; content varies by sample and preparation.
    source_note: >-
      Muñoz-Esparza et al. (2021), §3.1 and Figures 3–5: Natto is identified as
      a spermidine-containing food. The selected USDA panel does not quantify
      this analyte. A comparable product-specific per-100 g value is not
      established here. https://doi.org/10.3390/foods10081752
    public_note: >-
      Esparza et al. (2021) supports this qualitative constituent record. See
      technical provenance for food form and measurement details.
    source_group: >-
      Esparza et al. (2021) supports this qualitative constituent record. See
      technical provenance for food form and measurement details.
    source_url: https://doi.org/10.3390/foods10081752
    source_reference: '#food-source-5'
substance_relationships:
  - substance: Spermidine
    relationship: contains
    description: >-
      Analytical food evidence identifies spermidine in natto; concentration
      varies with the sample and preparation.
    citation_keys:
      - munoz_esparza_food_polyamines_2021
  - substance: Vitamin K2
    relationship: contains
    description: Contains menaquinones (vitamin K2); the amount is product-dependent.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: natto|Vitamin K2
    presence_status: presence_supported_amount_unavailable
    evidence_source: >-
      Schurgers and Vermeer (2000), Determination of phylloquinone and
      menaquinones in food
    evidence_material: butter, egg yolk or fermented soybean food
    source_url: https://pubmed.ncbi.nlm.nih.gov/11356998/
    source_reference: '#food-source-4'
substance_card_captions:
  Spermidine: Occurs directly in this food; a product-specific amount is not established.
substance_review_candidates: []
---
## Overview

Natto is fermented soybeans providing unique Bacillus subtilis probiotics, vitamin K2, and enhanced nutrient bioavailability.

Within the BRAIN Diet framework, natto is fermented soybeans with unique Bacillus subtilis and is part of the fermented foods strategy.

## Food Context

### Synergies

- Part of fermented foods rotation

### Sourcing

- Choose quality sources

### Preparation

- Acquired taste; can be an acquired preference
- Unique probiotic profile

### Essential Amino Acid Profile

Natto provide a relatively complete plant protein (higher in lysine than most grains). Pairing with grains or other legumes still supports dietary variety and amino acid balance.

## Recipes

<FoodRecipes tag="Natto" />

<NutritionTable details={frontMatter} />

## Substances

<FoodSubstancesFromTable details={frontMatter} />

## References

[1] Natto fermentation by Bacillus subtilis produces unique peptides and microbial metabolites. Bravo et al. 2011. [Ingestion of Lactobacillus strain regulates emotional behavior and central GABA receptor expression in a mouse via the vagus nerve](/docs/papers/BRAIN-Diet-References#bravo_ingestion_2011)

[2] Fermented soybeans retain isoflavones studied for metabolic and inflammatory pathways. Fuloria et al. 2022. [Genistein: A Potential Natural Lead Molecule for New Drug Design and Development for Treating Memory Impairment](/docs/papers/BRAIN-Diet-References#fuloria_genistein_2022)

[3] Muñoz-Esparza et al. (2021). [Occurrence of Polyamines in Foods and the Influence of Cooking Processes](/docs/papers/BRAIN-Diet-References#munoz_esparza_food_polyamines_2021). Analytical evidence for spermidine occurrence; food type and preparation affect composition.

<span id="food-source-4" />

[4] [Schurgers and Vermeer (2000), Determination of phylloquinone and menaquinones in food](/docs/papers/BRAIN-Diet-References#food_composition_a955736e9d48)

<span id="food-source-5" />

[5] [Composition evidence for Spermidine](/docs/papers/BRAIN-Diet-References#food_composition_ab43fb9a34b0)
