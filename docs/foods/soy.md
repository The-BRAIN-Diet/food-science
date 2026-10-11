---
id: soy
fcir_cases:
  - FCIR-007
title: Soy
sidebar_label: Soy
description: Complete plant protein with isoflavones (genistein) and choline
tags:
  - Food
  - Soy
  - Vegan
  - Vegetarian
  - Choline
  - Vitamin B9
  - Vitamin B6
  - Iron
  - Tryptophan
  - Tyrosine
  - Genistein
  - Quercetin
  - Spermidine
list_image: /img/foods/soy/soy_thumb.webp
nutrition_per_100g:
  vitamin_k_ug: 47
  vitamin_a_rae_ug: 1
  carbs_g: 30.16
  kcal: 446
  choline_mg: 115.9
  sugar_g: 7.33
  beta_carotene_ug: 13
  tryptophan_g: 0.591
  tyrosine_g: 1.539
  protein_g: 36.49
  sat_fat_g: 2.884
  vitamin_c_mg: 6
  vitamin_b1_mg: 0.874
  vitamin_b2_mg: 0.87
  folate_ug: 375
  fibre_g: 9.3
  iron_mg: 15.7
  magnesium_mg: 280
  phosphorus_mg: 704
  sodium_mg: 2
  copper_mg: 1.658
  manganese_mg: 2.517
  fat_g: 19.94
  linoleic_g: 9.925
  calcium_mg: 277
  potassium_mg: 1797
  zinc_mg: 4.89
  vitamin_b3_mg: 1.623
  vitamin_b5_mg: 0.793
  vitamin_b6_mg: 0.377
  vitamin_e_mg: 0.85
  selenium_ug: 17.8
  ala_mg: 1330
  omega3_mg: 1330
omega3_components:
  - nutrient: ala_mg
    identity: 18:3 n-3 (ALA; USDA 1270 interpreted)
    amount_mg: 1330
public_display:
  ala_mg: internal-only
nutrition_source:
  database: USDA FoodData Central
  food_name: Soybeans, mature seeds, raw
  fdc_id: 174270
  retrieval_method: SR Legacy bulk (April 2018)
  basis: per 100 g edible portion
  last_checked: '2026-08-15'
  limitations: Unqualified 18:3 on this record is documented in FCIR-007.
amino_acid_strengths: Relatively complete plant protein; good lysine and leucine.
complementary_pairings: Grains or other legumes for variety and balance.
main_image: /img/foods/soy/soy_large.webp
legacy_list_image: /img/foods/soy/soy_thumb.webp
legacy_main_image: /img/foods/soy/soy_large.webp
nutrition_supplementary_sources:
  - key: ala_interpreted
    label: Alpha-linolenic acid (ALA; 18:3 n-3)
    value: 1.33
    unit: g
    notes: USDA 18:3 quantity; isomer from USDA soybean oil nutrient 1404
    public_display: table
    exclude_from_recipe_sum: true
    fcir_case: FCIR-007
    source_note: This value uses a documented composition interpretation. See FCIR-007.
    public_note: This value uses a documented composition interpretation.
    source_group: This value uses a documented composition interpretation.
  - key: quercetin_qual
    label: Quercetin
    status: Present — quantity not established
    amount_display: Present
    source_note: >-
      Dynamic polyphenolic profiling of soybean seeds and leaves during
      developmental stages (2025). Primary analysis separately identifies
      quercetin in soybean seeds as well as leaves; cultivar variation does not
      negate qualitative presence.
    public_note: Quercetin is documented in soybean seeds; content varies with variety.
    source_group: soy-quercetin
    notes: soybean seeds
    public_display: internal-only
    omit_substance_card: false
    evidence_status: supported
    presence_status: presence_supported_amount_unavailable
    source_url: https://www.nature.com/articles/s41598-025-23063-2
    source_reference: '#food-source-4'
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
    source_reference: '#food-source-5'
  - key: spermidine_qual
    label: Spermidine
    status: Present — quantity not established
    amount_display: Present — quantity not established
    notes: Measured food occurrence; content varies by sample and preparation.
    source_note: >-
      Muñoz-Esparza et al. (2021), §3.1 and Figures 3–5: Soy is identified as a
      spermidine-containing food. The selected USDA panel does not quantify this
      analyte. A comparable product-specific per-100 g value is not established
      here. https://doi.org/10.3390/foods10081752
    public_note: >-
      Esparza et al. (2021) supports this qualitative constituent record. See
      technical provenance for food form and measurement details.
    source_group: >-
      Esparza et al. (2021) supports this qualitative constituent record. See
      technical provenance for food form and measurement details.
    source_url: https://doi.org/10.3390/foods10081752
    source_reference: '#food-source-6'
substance_relationships:
  - substance: Spermidine
    relationship: contains
    description: >-
      Analytical food evidence identifies spermidine in soy; concentration
      varies with the sample and preparation.
    citation_keys:
      - munoz_esparza_food_polyamines_2021
  - substance: Choline
    relationship: contains
    description: USDA FoodData Central reports choline in Soybeans, mature seeds, raw.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: soy|Choline
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Soybeans, mature seeds, raw
    source_url: https://fdc.nal.usda.gov/food-details/174270/nutrients
    presence_status: presence_and_amount_supported
    source_reference: '#food-source-7'
  - substance: Tyrosine
    relationship: contains
    description: USDA FoodData Central reports tyrosine in Soybeans, mature seeds, raw.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: soy|Tyrosine
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Soybeans, mature seeds, raw
    source_url: https://fdc.nal.usda.gov/food-details/174270/nutrients
    presence_status: presence_supported_amount_unavailable
    source_reference: '#food-source-7'
  - substance: Tryptophan
    relationship: contains
    description: USDA FoodData Central reports tryptophan in Soybeans, mature seeds, raw.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: soy|Tryptophan
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Soybeans, mature seeds, raw
    source_url: https://fdc.nal.usda.gov/food-details/174270/nutrients
    presence_status: presence_supported_amount_unavailable
    source_reference: '#food-source-7'
  - substance: Iron
    relationship: contains
    description: USDA FoodData Central reports iron in Soybeans, mature seeds, raw.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: soy|Iron
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Soybeans, mature seeds, raw
    source_url: https://fdc.nal.usda.gov/food-details/174270/nutrients
    presence_status: presence_and_amount_supported
    source_reference: '#food-source-7'
  - substance: Vitamin B6
    relationship: contains
    description: USDA FoodData Central reports vitamin B6 in Soybeans, mature seeds, raw.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: soy|Vitamin B6
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Soybeans, mature seeds, raw
    source_url: https://fdc.nal.usda.gov/food-details/174270/nutrients
    presence_status: presence_and_amount_supported
    source_reference: '#food-source-7'
  - substance: Vitamin B9
    relationship: contains
    description: >-
      USDA FoodData Central reports folate in Soybeans, mature seeds, raw.  The
      recorded analyte is folate.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: soy|Vitamin B9
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Soybeans, mature seeds, raw
    source_url: https://fdc.nal.usda.gov/food-details/174270/nutrients
    presence_status: presence_and_amount_supported
    source_reference: '#food-source-7'
  - substance: Quercetin
    relationship: contains
    description: Quercetin is documented in soybean seeds; content varies with variety.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: soy|Quercetin
    presence_status: presence_supported_amount_unavailable
    evidence_source: >-
      Dynamic polyphenolic profiling of soybean seeds and leaves during
      developmental stages (2025)
    evidence_material: soybean seeds
    source_url: https://www.nature.com/articles/s41598-025-23063-2
    source_reference: '#food-source-4'
  - substance: Genistein
    relationship: contains
    description: >-
      Contains genistein-related isoflavones, including glycosides; proportions
      vary with processing.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: soy|Genistein
    presence_status: presence_supported_amount_unavailable
    evidence_source: NTP-CERHR Expert Panel Report on Genistein (2006)
    evidence_material: soybeans and the named soy foods
    source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC2020434/
    source_reference: '#food-source-5'
substance_card_captions:
  Spermidine: Occurs directly in this food; a product-specific amount is not established.
substance_review_candidates: []
---
## Overview

Soy provides **complete plant protein**, **isoflavones** (especially genistein), and **choline**, supporting neurotransmitter synthesis and membrane phospholipid pathways. Defatted soy flour and soy protein concentrates score highly on protein-quality metrics, though methionine remains relatively limiting and grain pairing improves amino-acid balance.

Within the BRAIN Diet framework, soy is a core plant-protein anchor for vegan and plant-forward patterns. Genistein and related isoflavones are studied for metabolic and neuroinflammatory modulation [1], while soy's protein density supports essential amino-acid intake within legume–grain complementary pairings [2].

## Key Nutritional Highlights

- **Genistein** and related soy isoflavones are studied for neuroinflammatory and metabolic pathways [1].
- High **plant-protein** density with favourable digestibility for a legume; pair with grains for methionine balance [2].
- Provides **choline**, tryptophan, tyrosine, and B vitamins relevant to neurotransmitter synthesis.
- Fermented forms (tempeh, miso, natto) add fermentation-derived benefits beyond raw soy ingredients.

## Food Context

### Synergies

- Pair with grains for complete amino acid profile; grain-legume complementarity improves essential amino-acid coverage
- Part of diverse plant protein strategy

### Preparation

- Fermented forms (tempeh, miso, natto) may have additional benefits including probiotics and improved digestibility
- Supports choline and neurotransmitter synthesis
- Vegans should ensure adequate choline intake (e.g., soy or sunflower lecithin, soy foods, quinoa, broccoli) to support phosphatidylcholine synthesis

### Essential Amino Acid Profile

Soy provide a relatively complete plant protein (higher in lysine than most grains). Pairing with grains or other legumes still supports dietary variety and amino acid balance.

## Recipes

<FoodRecipes tag="Soy" />

<NutritionTable details={frontMatter} />

## Substances

<FoodSubstancesFromTable details={frontMatter} />

## References

[1] Genistein and related soy isoflavones are studied for neuroinflammatory and metabolic pathways. Fuloria et al. 2022. [Genistein: A Potential Natural Lead Molecule for New Drug Design and Development for Treating Memory Impairment](/docs/papers/BRAIN-Diet-References#fuloria_genistein_2022)

[2] Soy provides highly digestible plant protein; legume–grain pairing improves essential amino-acid balance. FAO 2013. [Dietary Protein Quality Evaluation in Human Nutrition: Report of an FAO Expert Consultation](/docs/papers/BRAIN-Diet-References#fao_diaas_2013)

[3] Muñoz-Esparza et al. (2021). [Occurrence of Polyamines in Foods and the Influence of Cooking Processes](/docs/papers/BRAIN-Diet-References#munoz_esparza_food_polyamines_2021). Analytical evidence for spermidine occurrence; food type and preparation affect composition.

<span id="food-source-4" />

[4] [Dynamic polyphenolic profiling of soybean seeds and leaves during developmental stages (2025)](/docs/papers/BRAIN-Diet-References#food_composition_d8e99613b6a5)

<span id="food-source-5" />

[5] [NTP-CERHR Expert Panel Report on Genistein (2006)](/docs/papers/BRAIN-Diet-References#food_composition_16903d08234b)

<span id="food-source-6" />

[6] [Composition evidence for Spermidine](/docs/papers/BRAIN-Diet-References#food_composition_ab43fb9a34b0)

<span id="food-source-7" />

[7] [USDA SR Legacy April 2018](/docs/papers/BRAIN-Diet-References#food_composition_2a4e46331446)
