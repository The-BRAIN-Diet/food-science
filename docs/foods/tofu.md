---
id: tofu
fcir_cases:
  - FCIR-018
title: Tofu
sidebar_label: Tofu
description: Soy-based protein source with isoflavones and choline
tags:
  - Food
  - Tofu
  - Vegan
  - Vegetarian
  - Linoleic Acid
  - Choline
  - Iron
  - Calcium
  - Magnesium
  - Phosphorus
  - Manganese
  - Copper
  - Selenium
  - Genistein
  - Tyrosine
list_image: /img/foods/tofu/tofu_thumb.webp
nutrition_per_100g:
  iron_mg: 2.66
  fibre_g: 2.3
  carbs_g: 2.78
  kcal: 144
  protein_g: 17.27
  tyrosine_g: 0.701
  magnesium_mg: 58
  phosphorus_mg: 190
  vitamin_c_mg: 0.2
  vitamin_b1_mg: 0.158
  vitamin_b2_mg: 0.102
  folate_ug: 29
  sat_fat_g: 1.261
  sodium_mg: 14
  copper_mg: 0.378
  manganese_mg: 1.181
  calcium_mg: 683
  fat_g: 8.72
  potassium_mg: 237
  zinc_mg: 1.57
  vitamin_b3_mg: 0.381
  vitamin_b5_mg: 0.133
  vitamin_b6_mg: 0.092
  linoleic_g: 4.339
  selenium_ug: 17.4
  ala_mg: 582
  omega3_mg: 582
omega3_components:
  - nutrient: ala_mg
    identity: 18:3 n-3 (ALA; USDA 1270 interpreted)
    amount_mg: 582
public_display:
  ala_mg: internal-only
nutrition_source:
  database: USDA FoodData Central
  food_name: Tofu, raw, firm, prepared with calcium sulfate
  fdc_id: 172475
  retrieval_method: SR Legacy bulk (April 2018)
  basis: per 100 g edible portion
  last_checked: '2026-08-15'
  limitations: Unqualified 18:3 on this record is documented in FCIR-018.
main_image: /img/foods/tofu/tofu_medium.webp
legacy_list_image: /img/foods/tofu/tofu_thumb.webp
legacy_main_image: /img/foods/tofu/tofu_medium.webp
nutrition_supplementary_sources:
  - key: ala_interpreted
    label: Alpha-linolenic acid (ALA; 18:3 n-3)
    value: 0.582
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
      USDA Database for the Choline Content of Common Foods, Release 2 (2008).
      Table separately measures choline metabolites in tofu prepared with
      calcium sulfate/nigari; PC column is expressed as choline moiety, not PC
      mass.
    public_note: >-
      Choline is documented in tofu; a preparation-matched amount is
      unavailable.
    source_group: tofu-choline
    public_display: internal-only
    omit_substance_card: false
    evidence_status: supported
    presence_status: presence_supported_amount_unavailable
    source_url: https://www.ars.usda.gov/ARSUserFiles/80400535/Data/Choline/Choln02.pdf
    notes: firm tofu
    source_reference: '#food-source-4'
substance_relationships:
  - substance: Tyrosine
    relationship: contains
    description: USDA FoodData Central reports tyrosine in Tofu, raw, firm, prepared with calcium sulfate.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: tofu|Tyrosine
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Tofu, raw, firm, prepared with calcium sulfate
    source_url: https://fdc.nal.usda.gov/food-details/172475/nutrients
    presence_status: presence_supported_amount_unavailable
    source_reference: '#food-source-5'
  - substance: Linoleic Acid
    relationship: contains
    description: USDA FoodData Central reports linoleic acid in Tofu, raw, firm, prepared with calcium sulfate.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: tofu|Linoleic Acid
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Tofu, raw, firm, prepared with calcium sulfate
    source_url: https://fdc.nal.usda.gov/food-details/172475/nutrients
    presence_status: presence_and_amount_supported
    source_reference: '#food-source-5'
  - substance: Calcium
    relationship: contains
    description: USDA FoodData Central reports calcium in Tofu, raw, firm, prepared with calcium sulfate.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: tofu|Calcium
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Tofu, raw, firm, prepared with calcium sulfate
    source_url: https://fdc.nal.usda.gov/food-details/172475/nutrients
    presence_status: presence_and_amount_supported
    source_reference: '#food-source-5'
  - substance: Magnesium
    relationship: contains
    description: USDA FoodData Central reports magnesium in Tofu, raw, firm, prepared with calcium sulfate.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: tofu|Magnesium
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Tofu, raw, firm, prepared with calcium sulfate
    source_url: https://fdc.nal.usda.gov/food-details/172475/nutrients
    presence_status: presence_and_amount_supported
    source_reference: '#food-source-5'
  - substance: Phosphorus
    relationship: contains
    description: USDA FoodData Central reports phosphorus in Tofu, raw, firm, prepared with calcium sulfate.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: tofu|Phosphorus
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Tofu, raw, firm, prepared with calcium sulfate
    source_url: https://fdc.nal.usda.gov/food-details/172475/nutrients
    presence_status: presence_and_amount_supported
    source_reference: '#food-source-5'
  - substance: Copper
    relationship: contains
    description: USDA FoodData Central reports copper in Tofu, raw, firm, prepared with calcium sulfate.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: tofu|Copper
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Tofu, raw, firm, prepared with calcium sulfate
    source_url: https://fdc.nal.usda.gov/food-details/172475/nutrients
    presence_status: presence_and_amount_supported
    source_reference: '#food-source-5'
  - substance: Iron
    relationship: contains
    description: USDA FoodData Central reports iron in Tofu, raw, firm, prepared with calcium sulfate.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: tofu|Iron
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Tofu, raw, firm, prepared with calcium sulfate
    source_url: https://fdc.nal.usda.gov/food-details/172475/nutrients
    presence_status: presence_and_amount_supported
    source_reference: '#food-source-5'
  - substance: Manganese
    relationship: contains
    description: USDA FoodData Central reports manganese in Tofu, raw, firm, prepared with calcium sulfate.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: tofu|Manganese
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Tofu, raw, firm, prepared with calcium sulfate
    source_url: https://fdc.nal.usda.gov/food-details/172475/nutrients
    presence_status: presence_and_amount_supported
    source_reference: '#food-source-5'
  - substance: Selenium
    relationship: contains
    description: USDA FoodData Central reports selenium in Tofu, raw, firm, prepared with calcium sulfate.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: tofu|Selenium
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Tofu, raw, firm, prepared with calcium sulfate
    source_url: https://fdc.nal.usda.gov/food-details/172475/nutrients
    presence_status: presence_and_amount_supported
    source_reference: '#food-source-5'
  - substance: Genistein
    relationship: contains
    description: >-
      Contains genistein-related isoflavones, including glycosides; proportions vary with
      processing.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: tofu|Genistein
    presence_status: presence_supported_amount_unavailable
    evidence_source: NTP-CERHR Expert Panel Report on Genistein (2006)
    evidence_material: soybeans and the named soy foods
    source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC2020434/
    source_reference: '#food-source-3'
  - substance: Choline
    relationship: contains
    description: Choline is documented in tofu; a preparation-matched amount is unavailable.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: tofu|Choline
    presence_status: presence_supported_amount_unavailable
    evidence_source: USDA Database for the Choline Content of Common Foods, Release 2 (2008)
    evidence_material: firm tofu
    source_url: https://www.ars.usda.gov/ARSUserFiles/80400535/Data/Choline/Choln02.pdf
    source_reference: '#food-source-4'
  - substance: Glutamine
    substance_id: glutamine
    relationship: contains
    evidence_status: supported
    evidence_material: Soy protein in tofu
    preparation_state: form not known
    source_url: https://doi.org/10.1038/ejcn.2009.110
    citation_keys:
      - lenders_amino_acid_sequencing_2009
    evidence_source: 'Lenders et al. (2009), Table 1: protein-sequence-based occurrence.'
    material_limitations: Protein-bound residues; no free-amino-acid dose or hydrolysed Glx amount inferred.
    food_delivery_notes: Protein-bound residues; no free-amino-acid dose or hydrolysed Glx amount inferred.
    chemical_form: protein-bound glutamine residues
  - substance: Glutamate
    substance_id: glutamate
    relationship: contains
    evidence_status: supported
    evidence_material: Soy protein in tofu
    preparation_state: form not known
    source_url: https://doi.org/10.1038/ejcn.2009.110
    citation_keys:
      - lenders_amino_acid_sequencing_2009
    evidence_source: 'Lenders et al. (2009), Table 1: protein-sequence-based occurrence.'
    material_limitations: Protein-bound residues; no free-amino-acid dose or hydrolysed Glx amount inferred.
    food_delivery_notes: Protein-bound residues; no free-amino-acid dose or hydrolysed Glx amount inferred.
    chemical_form: protein-bound glutamate residues
substance_review_candidates: []
nutrition_amino_acid_profiles:
  - id: usda-sr-172475
    material: Tofu, raw, firm, prepared with calcium sulfate
    preparation: firm, calcium-set
    food_group: plant
    basis: per 100 g edible portion
    unit: g
    source:
      database: USDA FoodData Central SR Legacy, April 2018
      fdc_id: 172475
      source_url: https://fdc.nal.usda.gov/food-details/172475/nutrients
      download_url: https://fdc.nal.usda.gov/fdc-datasets/FoodData_Central_sr_legacy_food_csv_2018-04.zip
      download_sha256: b80817294b8850530aaedf2e515c02593b1824f763a0ff356e5c2081643e6fd0
    protein_g: 17.27
    protein_source_row_id: "1698062"
    amino_acids:
      histidine:
        value: 0.431
        source_row_id: "1698058"
        nutrient_id: "1221"
        data_points: 0
        derivation_id: "51"
      isoleucine:
        value: 0.849
        source_row_id: "1698052"
        nutrient_id: "1212"
        data_points: 0
        derivation_id: "51"
      leucine:
        value: 1.392
        source_row_id: "1698053"
        nutrient_id: "1213"
        data_points: 0
        derivation_id: "51"
      lysine:
        value: 0.883
        source_row_id: "1698054"
        nutrient_id: "1214"
        data_points: 0
        derivation_id: "51"
      methionine:
        value: 0.211
        source_row_id: "1698065"
        nutrient_id: "1215"
        data_points: 0
        derivation_id: "51"
      phenylalanine:
        value: 0.835
        source_row_id: "1698066"
        nutrient_id: "1217"
        data_points: 0
        derivation_id: "51"
      threonine:
        value: 0.785
        source_row_id: "1698064"
        nutrient_id: "1211"
        data_points: 0
        derivation_id: "51"
      tryptophan:
        value: 0.235
        source_row_id: "1698063"
        nutrient_id: "1210"
        data_points: 0
        derivation_id: "51"
      valine:
        value: 0.87
        source_row_id: "1698056"
        nutrient_id: "1219"
        data_points: 0
        derivation_id: "51"
    portion:
      label: 0.5 cup
      source_row_id: "90683"
      source_grams: 126
      multiplier: 1
    limitations: >-
      USDA database composition, including source-specific analytical or calculated values. No
      amino-acid-specific digestibility correction; illustrative USDA household portion, not an
      intake recommendation. Missing values are not treated as zero.
---
## Overview

Tofu is a soy-based food providing complete plant protein, isoflavones (genistein), and choline, supporting neurotransmitter synthesis and neuroprotection. Tofu is listed as a source for iron, choline, tryptophan, and tyrosine.

Within the BRAIN Diet framework, high-tyrosine protein (eggs, tofu, turkey) for morning meals to support dopamine synthesis. Tofu is often calcium-fortified, making it valuable for plant-based diets.

## Food Context

### Synergies

- Pair with grains for complete amino acid profile; grain-legume complementarity improves essential amino-acid coverage
- Part of diverse plant protein strategy
- High-tyrosine protein (eggs, tofu, turkey) for morning meals to support dopamine synthesis

### Sourcing

- Choose calcium-fortified varieties when possible for bone health and calcium support

### Preparation

- Can be prepared various ways (baked, fried, steamed); gentle cooking preserves nutrients

### Essential Amino Acid Profile

This food provides a complete essential amino acid profile typical of soy.

Notable amino acids:

- Leucine
- Lysine

## Recipes

<FoodRecipes tag="Tofu" />

<NutritionTable details={frontMatter} />

## Substances

<FoodSubstancesFromTable details={frontMatter} />

## References

[1] Tofu supplies soy isoflavones such as genistein studied for neuroinflammatory and metabolic pathways. Fuloria et al. 2022. [Genistein: A Potential Natural Lead Molecule for New Drug Design and Development for Treating Memory Impairment](/docs/papers/BRAIN-Diet-References#fuloria_genistein_2022)

[2] Hallberg et al. (1989). [Iron absorption in man: ascorbic acid and dose-dependent inhibition by phytate](/docs/papers/BRAIN-Diet-References#hallberg_iron_1989). Human mixed-meal iron-absorption series: phytate inhibits non-haem iron absorption; ascorbic acid can counteract that inhibition. Mixed-meal evidence, not a trial of this food.

<span id="food-source-3" />

[3] [NTP-CERHR Expert Panel Report on Genistein (2006)](/docs/papers/BRAIN-Diet-References#food_composition_16903d08234b)

<span id="food-source-4" />

[4] [USDA Database for the Choline Content of Common Foods, Release 2 (2008)](https://www.ars.usda.gov/ARSUserFiles/80400535/Data/Choline/Choln02.pdf)

<span id="food-source-5" />

[5] [USDA SR Legacy April 2018](https://fdc.nal.usda.gov/food-details/172475/nutrients)
