---
id: walnuts
fcir_cases:
  - FCIR-004
title: Walnuts
sidebar_label: Walnuts
description: 'ALA omega-3, polyphenols, and ellagitannins for urolithin A production'
tags:
  - Food
  - Walnuts
  - Vegan
  - Vegetarian
  - ALA
  - Linoleic Acid
  - Magnesium
  - Manganese
  - Copper
  - Phosphorus
  - Polyphenol
list_image: /img/foods/walnuts/walnuts_thumb.webp
nutrition_per_100g:
  calcium_mg: 98
  vitamin_e_mg: 0.7
  linoleic_g: 38.093
  choline_mg: 39.2
  carbs_g: 13.71
  kcal: 654
  sat_fat_g: 6.126
  sugar_g: 2.61
  lutein_zeaxanthin_ug: 9
  selenium_ug: 4.9
  vitamin_b3_mg: 1.125
  vitamin_k_ug: 2.7
  vitamin_a_rae_ug: 1
  beta_carotene_ug: 12
  protein_g: 15.23
  fibre_g: 6.7
  iron_mg: 2.91
  magnesium_mg: 158
  phosphorus_mg: 346
  sodium_mg: 2
  copper_mg: 1.586
  manganese_mg: 3.414
  vitamin_c_mg: 1.3
  vitamin_b1_mg: 0.341
  vitamin_b2_mg: 0.15
  folate_ug: 98
  vitamin_b5_mg: 0.57
  vitamin_b6_mg: 0.537
  potassium_mg: 441
  zinc_mg: 3.09
  fat_g: 65.21
  ala_mg: 9080
  omega3_mg: 9080
omega3_components:
  - nutrient: ala_mg
    identity: '18:3 n-3 (ALA; USDA 1270 interpreted)'
    amount_mg: 9080
public_display:
  ala_mg: internal-only
nutrition_source:
  database: USDA FoodData Central
  food_name: 'Nuts, walnuts, english'
  fdc_id: 170187
  retrieval_method: SR Legacy bulk (April 2018)
  basis: per 100 g edible portion
  last_checked: '2026-08-15'
  limitations: 'Unqualified 18:3 on this record is documented in FCIR-004.'
nutrition_supplementary_sources:
  - key: ala_interpreted
    label: 'Alpha-linolenic acid (ALA; 18:3 n-3)'
    value: 9.08
    unit: g
    notes: 'USDA 18:3 quantity; isomer from walnut-specific literature'
    public_display: table
    exclude_from_recipe_sum: true
    fcir_case: FCIR-004
    source_note: This value uses a documented composition interpretation. See FCIR-004.
    public_note: This value uses a documented composition interpretation.
    source_group: This value uses a documented composition interpretation.
  - key: walnut_polyphenols_proxy
    label: Ellagitannins / total polyphenols
    amount_display: High among tree nuts (varies by batch)
    notes: >-
      Ellagitannins feed gut-derived urolithins (e.g. urolithin A) in
      responders; assays differ (GAE/TEAC).
    source_note: >-
      Qualitative ranking with high batch/cultivar variance; not a USDA standard
      nutrient row. Use for framework context, not precise comparison across
      studies.
    status: Present — quantity not established
    public_note: >-
      Qualitative ranking with high batch/cultivar variance; not a USDA standard
      nutrient row.
    source_group: >-
      Qualitative ranking with high batch/cultivar variance; not a USDA standard
      nutrient row.
nutrition_functional_metrics:
  - key: total_polyphenols_walnut
    label: Total polyphenols (Folin proxy)
    score: High
    notes: >-
      Walnuts consistently rank high in nut polyphenol surveys; matrix effects
      apply.
limiting_amino_acids: Lysine (typical of nuts and seeds).
complementary_pairings: Legumes or grains for complete essential amino acid profile.
main_image: /img/foods/walnuts/walnuts_medium.webp
legacy_list_image: /img/foods/walnuts/walnuts_thumb.webp
legacy_main_image: /img/foods/walnuts/walnuts_medium.webp
substance_relationships:
  - substance: ALA
    relationship: contains
    description: >-
      Alpha-linolenic acid is supported by the food-specific isomer evidence in
      the composition notes. The quantity uses the documented composition
      interpretation.
    requires_supplementary_key: ala_interpreted
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: walnuts|ALA
    evidence_source: FCIR-004
    evidence_material: Walnut kernels
    source_url: >-
      /docs/dietary-foundations/nutrient-effects/food-composition-interpretation-register
    presence_status: presence_and_amount_supported
  - substance: Linoleic Acid
    relationship: contains
    description: 'USDA FoodData Central reports linoleic acid in Nuts, walnuts, english.'
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: walnuts|Linoleic Acid
    evidence_source: USDA SR Legacy April 2018
    evidence_material: 'Nuts, walnuts, english'
    source_url: 'https://fdc.nal.usda.gov/food-details/170187/nutrients'
    presence_status: presence_and_amount_supported
  - substance: Magnesium
    relationship: contains
    description: 'USDA FoodData Central reports magnesium in Nuts, walnuts, english.'
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: walnuts|Magnesium
    evidence_source: USDA SR Legacy April 2018
    evidence_material: 'Nuts, walnuts, english'
    source_url: 'https://fdc.nal.usda.gov/food-details/170187/nutrients'
    presence_status: presence_and_amount_supported
  - substance: Phosphorus
    relationship: contains
    description: 'USDA FoodData Central reports phosphorus in Nuts, walnuts, english.'
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: walnuts|Phosphorus
    evidence_source: USDA SR Legacy April 2018
    evidence_material: 'Nuts, walnuts, english'
    source_url: 'https://fdc.nal.usda.gov/food-details/170187/nutrients'
    presence_status: presence_and_amount_supported
  - substance: Copper
    relationship: contains
    description: 'USDA FoodData Central reports copper in Nuts, walnuts, english.'
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: walnuts|Copper
    evidence_source: USDA SR Legacy April 2018
    evidence_material: 'Nuts, walnuts, english'
    source_url: 'https://fdc.nal.usda.gov/food-details/170187/nutrients'
    presence_status: presence_and_amount_supported
  - substance: Manganese
    relationship: contains
    description: 'USDA FoodData Central reports manganese in Nuts, walnuts, english.'
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: walnuts|Manganese
    evidence_source: USDA SR Legacy April 2018
    evidence_material: 'Nuts, walnuts, english'
    source_url: 'https://fdc.nal.usda.gov/food-details/170187/nutrients'
    presence_status: presence_and_amount_supported
substance_review_candidates: []
---
## Overview

Walnuts provide ALA, polyphenols and ellagitannins. In DIRECT-PLUS, both Mediterranean groups received 28 g/day walnuts; the green-Mediterranean group also received green tea and Mankai and reduced red/processed meat. Its greater visceral-fat reduction supports the combined pattern, while the walnut-intake and urinary urolithin A associations do not establish walnut-specific causality [1].

A separate six-month trial of 56 g/day walnuts found no significant visceral-fat benefit [2]. Walnuts remain a food candidate for further testing, with the package-level and individual-food evidence distinguished in [BRS6-PM8](/docs/biological-targets/brs6/fm4/brs6-fm4-pm8-metabolic-inflammation-and-adipose-stress-signalling#pm8-f4).

## Key Nutritional Highlights

- Walnuts were included in both Mediterranean groups in DIRECT-PLUS; the trial does not isolate their contribution to the green pattern’s greater visceral-fat loss [1].

## Food Context

### Synergies

- Pair with other omega-3 sources for optimal DHA status (conversion from ALA is limited)
- Higher polyphenol intake and microbial diversity increase urolithin A production from ellagitannins

### Sourcing

- Prefer fresh, well-sealed walnuts (or vacuum-packed) to reduce oxidation; rancidity risk increases with heat, light, and long storage.

### Preparation

- Best consumed raw to preserve omega-3s and prevent oxidation
- Soaking may improve digestibility and reduce antinutrients

### Essential Amino Acid Profile

Walnuts provide plant protein but are not a complete protein; lysine is typically limiting for nuts and seeds.

Protein pairing strategy:

Pair with legumes or grains to complete essential amino acid coverage.

## Recipes

<FoodRecipes tag="Walnuts" />

<NutritionTable details={frontMatter} />

## Substances

<FoodSubstancesFromTable details={frontMatter} />

## References

[1] Zelicha et al. (2022). [The effect of high-polyphenol Mediterranean diet on visceral adiposity: the DIRECT PLUS randomized controlled trial](/docs/papers/BRAIN-Diet-References#zelicha_effect_2022). Combined-pattern evidence; walnuts were shared by both MED groups.

[2] Njike et al. (2015). [Walnut ingestion in adults at risk for diabetes: effects on body composition, diet quality, and cardiac risk measures](/docs/papers/BRAIN-Diet-References#njike_walnut_body_composition_2015). No significant visceral-fat benefit in this trial.

