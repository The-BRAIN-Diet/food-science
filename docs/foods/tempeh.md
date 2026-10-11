---
id: tempeh
fcir_cases:
  - FCIR-018
title: Tempeh
sidebar_label: Tempeh
description: Fermented soy providing probiotics and enhanced nutrient bioavailability
tags:
  - Food
  - Tempeh
  - Vegan
  - Vegetarian
  - Linoleic Acid
  - Iron
  - Calcium
  - Magnesium
  - Phosphorus
  - Manganese
  - Copper
  - Choline
  - Genistein
  - Tyrosine
  - Spermidine
list_image: /img/foods/tempeh/tempeh_thumb.webp
nutrition_per_100g:
  vitamin_b12_ug: 0.08
  protein_g: 20.29
  sat_fat_g: 2.539
  carbs_g: 7.64
  kcal: 192
  linoleic_g: 4.052
  iron_mg: 2.7
  magnesium_mg: 81
  phosphorus_mg: 266
  sodium_mg: 9
  copper_mg: 0.56
  manganese_mg: 1.3
  vitamin_b1_mg: 0.078
  vitamin_b2_mg: 0.358
  folate_ug: 24
  calcium_mg: 111
  potassium_mg: 412
  zinc_mg: 1.14
  vitamin_b3_mg: 2.64
  vitamin_b5_mg: 0.278
  vitamin_b6_mg: 0.215
  fat_g: 10.8
  tyrosine_g: 0.664
  ala_mg: 248
  omega3_mg: 248
omega3_components:
  - nutrient: ala_mg
    identity: 18:3 n-3 (ALA; USDA 1270 interpreted)
    amount_mg: 248
public_display:
  ala_mg: internal-only
nutrition_source:
  database: USDA FoodData Central
  food_name: Tempeh
  fdc_id: 174272
  retrieval_method: SR Legacy bulk (April 2018)
  basis: per 100 g edible portion
  last_checked: '2026-08-15'
  limitations: Unqualified 18:3 on this record is documented in FCIR-018.
amino_acid_strengths: Relatively complete plant protein; good lysine and leucine.
complementary_pairings: Grains or other legumes for variety and balance.
main_image: /img/foods/tempeh/tempeh_medium.webp
legacy_list_image: /img/foods/tempeh/tempeh_thumb.webp
legacy_main_image: /img/foods/tempeh/tempeh_medium.webp
nutrition_supplementary_sources:
  - key: ala_interpreted
    label: Alpha-linolenic acid (ALA; 18:3 n-3)
    value: 0.248
    unit: g
    notes: USDA 18:3 quantity; isomer from USDA soybean oil nutrient 1404
    public_display: table
    exclude_from_recipe_sum: true
    fcir_case: FCIR-018
    source_note: This value uses a documented composition interpretation. See FCIR-018.
    public_note: This value uses a documented composition interpretation.
    source_group: This value uses a documented composition interpretation.
  - key: genistein_qual
    label: Genistein
    status: Present — quantity not established
    amount_display: Present
    source_note: >-
      NTP-CERHR Expert Panel Report on Genistein (2006). Food table separately
      lists positive genistein for green soybeans, mature soybeans, tempeh and
      tofu; totals are aglycone equivalents, not amounts of free genistein.
    public_note: >-
      Contains genistein-related isoflavones, including glycosides; proportions
      vary with processing.
    source_group: soy-genistein
    public_display: internal-only
    omit_substance_card: false
    evidence_status: supported
    presence_status: presence_supported_amount_unavailable
    source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC2020434/
    notes: soybeans and the named soy foods
    source_reference: '#food-source-3'
  - key: choline_qual
    label: Choline
    status: Present — quantity not established
    amount_display: Present
    source_note: >-
      Plant-based nutrition for healthcare professionals (2017), Table 2. Table
      2 includes soy foods as choline sources and explicitly defines soy foods
      as tempeh and tofu. Qualitative category support is proportionate for
      soybean tempeh; no tofu amount transferred.
    public_note: >-
      Choline is documented in soy foods, including tempeh; a separate tempeh
      amount is unavailable.
    source_group: tempeh-choline
    public_display: internal-only
    omit_substance_card: false
    evidence_status: supported
    presence_status: presence_supported_amount_unavailable
    source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC5466942/
    notes: soy tempeh
    source_reference: '#food-source-4'
  - key: spermidine_qual
    label: Spermidine
    status: Present — quantity not established
    amount_display: Present — quantity not established
    notes: Measured food occurrence; content varies by sample and preparation.
    source_note: >-
      Muñoz-Esparza et al. (2021), §3.1 and Figures 3–5: Tempeh is identified as
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
      Analytical food evidence identifies spermidine in tempeh; concentration
      varies with the sample and preparation.
    citation_keys:
      - munoz_esparza_food_polyamines_2021
  - substance: Tyrosine
    relationship: contains
    description: USDA FoodData Central reports tyrosine in Tempeh.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: tempeh|Tyrosine
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Tempeh
    source_url: https://fdc.nal.usda.gov/food-details/174272/nutrients
    presence_status: presence_supported_amount_unavailable
    source_reference: '#food-source-6'
  - substance: Linoleic Acid
    relationship: contains
    description: USDA FoodData Central reports linoleic acid in Tempeh.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: tempeh|Linoleic Acid
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Tempeh
    source_url: https://fdc.nal.usda.gov/food-details/174272/nutrients
    presence_status: presence_and_amount_supported
    source_reference: '#food-source-6'
  - substance: Calcium
    relationship: contains
    description: USDA FoodData Central reports calcium in Tempeh.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: tempeh|Calcium
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Tempeh
    source_url: https://fdc.nal.usda.gov/food-details/174272/nutrients
    presence_status: presence_and_amount_supported
    source_reference: '#food-source-6'
  - substance: Magnesium
    relationship: contains
    description: USDA FoodData Central reports magnesium in Tempeh.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: tempeh|Magnesium
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Tempeh
    source_url: https://fdc.nal.usda.gov/food-details/174272/nutrients
    presence_status: presence_and_amount_supported
    source_reference: '#food-source-6'
  - substance: Phosphorus
    relationship: contains
    description: USDA FoodData Central reports phosphorus in Tempeh.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: tempeh|Phosphorus
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Tempeh
    source_url: https://fdc.nal.usda.gov/food-details/174272/nutrients
    presence_status: presence_and_amount_supported
    source_reference: '#food-source-6'
  - substance: Copper
    relationship: contains
    description: USDA FoodData Central reports copper in Tempeh.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: tempeh|Copper
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Tempeh
    source_url: https://fdc.nal.usda.gov/food-details/174272/nutrients
    presence_status: presence_and_amount_supported
    source_reference: '#food-source-6'
  - substance: Iron
    relationship: contains
    description: USDA FoodData Central reports iron in Tempeh.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: tempeh|Iron
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Tempeh
    source_url: https://fdc.nal.usda.gov/food-details/174272/nutrients
    presence_status: presence_and_amount_supported
    source_reference: '#food-source-6'
  - substance: Manganese
    relationship: contains
    description: USDA FoodData Central reports manganese in Tempeh.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: tempeh|Manganese
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Tempeh
    source_url: https://fdc.nal.usda.gov/food-details/174272/nutrients
    presence_status: presence_and_amount_supported
    source_reference: '#food-source-6'
  - substance: Genistein
    relationship: contains
    description: >-
      Contains genistein-related isoflavones, including glycosides; proportions
      vary with processing.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: tempeh|Genistein
    presence_status: presence_supported_amount_unavailable
    evidence_source: NTP-CERHR Expert Panel Report on Genistein (2006)
    evidence_material: soybeans and the named soy foods
    source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC2020434/
    source_reference: '#food-source-3'
  - substance: Choline
    relationship: contains
    description: >-
      Choline is documented in soy foods, including tempeh; a separate tempeh
      amount is unavailable.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: tempeh|Choline
    presence_status: presence_supported_amount_unavailable
    evidence_source: Plant-based nutrition for healthcare professionals (2017), Table 2
    evidence_material: soy tempeh
    source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC5466942/
    source_reference: '#food-source-4'
substance_card_captions:
  Spermidine: Occurs directly in this food; a product-specific amount is not established.
substance_review_candidates: []
---
## Overview

Tempeh is fermented soy providing live probiotics, enhanced nutrient bioavailability, and isoflavones, supporting gut health and neurotransmitter synthesis. Fermented Foods: Sauerkraut, kimchi, kefir, miso, kombucha, tempeh provide live microbes + postbiotic peptides; improved SCFA pools; vagal signaling.

Within the BRAIN Diet framework, tempeh: Fermented soybeans, high in protein and probiotics. Fermentation improves digestibility and nutrient bioavailability [1].

## Key Nutritional Highlights

- Fermentation improves digestibility and nutrient bioavailability.

## Food Context

### Synergies

- Part of fermented foods rotation; fermented foods provide live microbes + postbiotic peptides; improved SCFA pools; vagal signaling
- Supports gut microbiome diversity; dietary diversity (≥30 plant foods per week) supports microbial richness and resilience

### Preparation

- Fermentation improves digestibility and nutrient bioavailability; lactic acid bacteria acidify the medium, activating microbial and endogenous phytases, while also increasing B-vitamin levels
- Can be cooked various ways; gentle cooking preserves probiotics

### Essential Amino Acid Profile

Tempeh provide a relatively complete plant protein (higher in lysine than most grains). Pairing with grains or other legumes still supports dietary variety and amino acid balance.

## Recipes

<FoodRecipes tag="Tempeh" />

<NutritionTable details={frontMatter} />

## Substances

<FoodSubstancesFromTable details={frontMatter} />

## References

[1] Part of fermented foods strategy; fermentation goes further: lactic acid bacteria acidify the medium, activating microbial and endogenous phytases, while also increasing B-vitamin levels. LeBlanc & Laiño 2011. [B-Group vitamin production by lactic acid bacteria - current knowledge and potential applications: Vitamin production by LAB](/docs/papers/BRAIN-Diet-References#leblanc_b-group_2011)

[2] Muñoz-Esparza et al. (2021). [Occurrence of Polyamines in Foods and the Influence of Cooking Processes](/docs/papers/BRAIN-Diet-References#munoz_esparza_food_polyamines_2021). Analytical evidence for spermidine occurrence; food type and preparation affect composition.

<span id="food-source-3" />

[3] [NTP-CERHR Expert Panel Report on Genistein (2006)](/docs/papers/BRAIN-Diet-References#food_composition_16903d08234b)

<span id="food-source-4" />

[4] [Plant-based nutrition for healthcare professionals (2017), Table 2](/docs/papers/BRAIN-Diet-References#food_composition_ef7ae3829e4e)

<span id="food-source-5" />

[5] [Composition evidence for Spermidine](/docs/papers/BRAIN-Diet-References#food_composition_ab43fb9a34b0)

<span id="food-source-6" />

[6] [USDA SR Legacy April 2018](/docs/papers/BRAIN-Diet-References#food_composition_9bbd11a10584)
