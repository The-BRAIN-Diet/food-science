---
id: oats
title: Oats
sidebar_label: Oats
description: 'Beta-glucans, B vitamins, and minerals for gut and neurotransmitter support'
tags:
  - Food
  - Oats
  - Vegan
  - Vegetarian
  - Iron
  - Magnesium
  - Zinc
  - Copper
  - Selenium
  - Folate
  - Beta-glucan
list_image: /img/foods/oats/oats_thumb.webp
amino_acid_strengths: 'Methionine-rich relative to legumes; good source of magnesium, iron, selenium, and folate.'
limiting_amino_acids: Lower in lysine (typical of grains).
complementary_pairings: 'Lentils, beans, or other legumes to complete essential amino acid profile.'
nutrition_per_100g:
  kcal: 378.866123
  protein_g: 13.49645
  fat_g: 5.89
  sat_fat_g: 1.02
  carbs_g: 68.65755
  sugar_g: 0.99
  fibre_g: 10.42
  calcium_mg: 45.53
  iron_mg: 4.339
  magnesium_mg: 126.3
  potassium_mg: 350.1
  zinc_mg: 2.744
  copper_mg: 0.4
  selenium_ug: 25.35
  vitamin_b6_mg: 0.1346
  folate_ug: 32.03
  choline_mg: 40.4
  vitamin_e_mg: 0.42
  vitamin_k_ug: 2.5
  ala_mg: 1400
  epa_mg: 0
  dha_mg: 0
  omega3_mg: 1400
nutrition_source:
  database: USDA FoodData Central
  food_name: 'Oats, whole grain, rolled, old fashioned'
  fdc_id: 2346396
  retrieval_method: API
  basis: per 100 g edible portion
  last_checked: '2026-03-22'
  note: 'Fibre, copper, and total dietary fibre (AOAC) align with Foundation FDC 2346396. Saturated fat, sugars, choline, vitamin E/K, and ALA are complementary SR-style grain values where the Foundation record omits those rows; re-harvest from a single FDC record when convenient.'
nutrition_supplementary_sources:
  - key: beta_glucan_g
    label: Beta-glucan
    value: 7.52
    unit: g
    notes: Soluble cereal β-glucan; primary oat fibre fraction linked to lipid and glycaemic endpoints.
    source_note: 'USDA FoodData Central Foundation food FDC 2346396 (footnote: beta-glucan values corrected in 10/2024 update). Varies by oat type (groats vs rolled vs instant) and processing.'
nutrition_functional_metrics:
  - key: total_oat_phenolics_proxy
    label: Total phenolics (grain matrix)
    amount_display: Varies by cultivar and processing
    notes: Avenanthramides and other oat phenolics are not standard USDA panel rows; qualitative only here.
main_image: /img/foods/oats/oats_medium.webp
legacy_list_image: /img/foods/oats/oats_thumb.webp
legacy_main_image: /img/foods/oats/oats_medium.webp
---

import NutritionTable from "@site/src/components/NutritionTable";

## Overview

Oats provide beta-glucan fibre (prebiotic), B vitamins, and minerals that support gut health, serotonin synthesis, and stable glucose release. Key contributions include **magnesium**, **iron**, **selenium**, and **folate**. Beta-glucans support gut microbiome health.

## Key Nutritional Highlights

- Concentrated source of beta-glucan, the soluble oat fibre most linked to glycaemic and lipid benefits.
- Strong micronutrient profile for a grain, including magnesium, iron, selenium, and folate.
- Naturally gluten-free as a grain, though cross-contamination risk depends on sourcing/processing.
- Oat protein remains lysine-limited, so amino-acid balance improves when paired with legumes.

## Food Context

### Synergies

- Pair with tryptophan-rich proteins for serotonin synthesis; pair tryptophan-rich proteins with moderate carbs to increase Trp:LNAA ratio
- Best consumed in evening for calming effect; timing midday or evening for calming effect
- Part of grain-legume complementarity strategy; grains (typically lysine-limited) and legumes (methionine/cysteine-limited) complete each other's profiles when paired
- Tryptophan + complex carbohydrates aid serotonin conversion to melatonin; examples include pumpkin seeds + oats

### Preparation

- Soak overnight to reduce phytates and improve mineral bioavailability

### Essential Amino Acid Profile

Oats provide meaningful plant protein but are not a complete protein.

Limiting amino acids:

- Lysine (typical of grains)

Protein pairing strategy:

Oats are relatively higher in methionine than many legumes but lower in lysine. Combining oats with lentils, beans, or other legumes helps create a more balanced essential amino acid profile.

## Recipes

<FoodRecipes tag="Oats" />

<NutritionTable details={frontMatter} />

## Substances

<FoodSubstancesFromTable details={frontMatter} />

## References

[1] Protein quality evaluation framework (DIAAS) [FAO 2013](/docs/papers/BRAIN-Diet-References#fao_diaas_2013)

[2] Plant-protein adequacy, limiting amino acids, and practical complementarity [Mariotti & Gardner 2019](/docs/papers/BRAIN-Diet-References#mariotti_dietary_2019)

[3] Oat bran lipid/phospholipid response study [Sean Davies et al. 2018](/docs/papers/BRAIN-Diet-References#sean_davies_oatmeal_2018)
