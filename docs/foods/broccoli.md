---
id: broccoli
title: Broccoli
sidebar_label: Broccoli
description: Cruciferous vegetable rich in sulforaphane, folate, and glutathione precursors
tags:
  - Food
  - Broccoli
  - Vegan
  - Vegetarian
  - Vitamin B1
  - Vitamin B2
  - Vitamin B5
  - Vitamin B6
  - Vitamin B9
  - Vitamin C
  - Choline
  - Iron
  - Magnesium
  - Phosphorus
  - Potassium
  - Manganese
  - Zinc
  - Sulforaphane
  - Vitamin K
  - Kaempferol
list_image: /img/foods/broccoli/broccoli_thumb.webp
nutrition_per_100g:
  linoleic_g: 0.049
  sat_fat_g: 0.114
  choline_mg: 18.7
  sugar_g: 1.7
  carbs_g: 6.64
  kcal: 34
  fat_g: 0.37
  calcium_mg: 47
  potassium_mg: 316
  zinc_mg: 0.41
  selenium_ug: 2.5
  vitamin_e_mg: 0.78
  vitamin_b3_mg: 0.639
  vitamin_b5_mg: 0.573
  vitamin_b6_mg: 0.175
  protein_g: 2.82
  fibre_g: 2.6
  iron_mg: 0.73
  magnesium_mg: 21
  phosphorus_mg: 66
  sodium_mg: 33
  copper_mg: 0.049
  manganese_mg: 0.21
  vitamin_c_mg: 89.2
  vitamin_b1_mg: 0.071
  vitamin_b2_mg: 0.117
  vitamin_k_ug: 101.6
  folate_ug: 63
  vitamin_a_rae_ug: 31
  beta_carotene_ug: 361
  lutein_zeaxanthin_ug: 1403
  pufa_18_3_unresolved_mg: 63
nutrition_source:
  database: USDA FoodData Central
  food_name: Broccoli, raw
  fdc_id: 170379
  retrieval_method: SR Legacy bulk (April 2018)
  basis: per 100 g edible portion
  last_checked: '2026-08-15'
main_image: /img/foods/broccoli/broccoli_medium.webp
legacy_list_image: /img/foods/broccoli/broccoli_thumb.webp
legacy_main_image: /img/foods/broccoli/broccoli_medium.webp
nutrition_supplementary_sources:
  - key: 5_mthf_wang_2010
    label: 5-Methyltetrahydrofolate
    substance_id: 5-methyltetrahydrofolate
    value: 101
    unit: µg
    basis: per 100 g fresh edible material
    preparation_state: raw
    evidence_material: Raw vegetable, analytical sample treated for folate extraction
    chemical_form: 5-MTHF equivalents, summed monoglutamate and polyglutamate species
    source_url: https://pubmed.ncbi.nlm.nih.gov/20888309/
    source_reference: Wang, Riedl and Schwartz (2010), Journal of Chromatography B 878(29), 2949–2958, Table 5
    original_observation:
      value: 2199
      unit: pmol/g
      basis: wet weight
      analyte: Sum of 5-MTHF Glu1–Glu8 species
    calculation:
      expression: pmol/g × 459.5 × 0.0001
      molecular_weight_g_per_mol: 459.5
      output_unit: µg/100 g as monoglutamate 5-MTHF equivalents
      rounding: nearest whole µg
    source_note: >-
      Calculated from the reported Table 5 molar sum, not directly reported
      mass concentration. Includes polyglutamate species as monoglutamate
      equivalents, not their intact molecular masses. Glu8 response was
      estimated by calibration extrapolation; this sample includes that estimated component.
      Analytical steaming was extraction treatment, not a cooked-food state.
      One study sample does not establish universal food composition; do not
      add this vitamer value to total folate as an independent nutrient supply.
  - key: sulforaphane_qual
    label: Sulforaphane
    amount_display: Preparation-dependent
    public_note: >-
      One UK broccoli lot, cooked sous vide at 100 °C for 20 minutes, formed
      1.06 µmol sulforaphane per g dry weight. Adding 1 g brown mustard powder
      raised that to 8.58 µmol/g dry weight. Twelve adults who ate 200 g
      excreted 9.8 µmol sulforaphane-NAC per g creatinine in 24 hours, and 44.7
      µmol/g creatinine with the mustard. These figures are not a sulforaphane
      amount for every 100 g of broccoli.
    source_note: >-
      Okunade et al. (2018), Molecular Nutrition & Food Research 62:1700980,
      Table 1 and the 24-hour urine result. Table 1, µmol sulforaphane per g
      dry weight: raw 2.05 ± 0.25; sous vide 100 °C for 20 minutes 1.06 ± 0.18;
      the same cooked broccoli plus 1 g brown mustard powder 8.58 ± 0.33.
      8.58 / 1.06 = 8.1, which the paper reports as an 8-fold increase. One
      results sentence prints the mustard result as 8.58 ± 0.13; the table
      figure is used here. Urine, 12 adults, 200 g of that cooked broccoli:
      9.8 ± 5.1 µmol sulforaphane-NAC per g creatinine in 24 hours without
      mustard, and 44.7 ± 33.9 with 1 g mustard. 44.7 / 9.8 = 4.6 from the
      published means. The paper's average of each person's increase is 4.7-fold,
      with individual increases from 1.7-fold to 10-fold. Sous-vide myrosinase
      loss in the same paper: 40% after 2 minutes, 90% after 6 minutes, and no
      measurable activity after 8 minutes. The study did not report a
      glucoraphanin concentration, and the dry-weight results are not converted
      to a fresh 100 g amount. Fahey et al. (1997) identifies sulforaphane as
      the myrosinase product of glucoraphanin; it is not the source of these
      figures.
    calculation:
      in_vitro_fold: 8.58 / 1.06 = 8.1, reported by the authors as 8-fold
      in_vivo_ratio_of_means: 44.7 / 9.8 = 4.6
      authors_mean_of_individual_ratios: 4.7-fold (range 1.7 to 10)
      not_a_panel_amount: >-
        Dry-weight and creatinine-normalised study results. No moisture figure
        is given, so they are not scaled to per 100 g fresh broccoli.
    source_group: broccoli-sulforaphane
    public_display: table
    omit_substance_card: false
    evidence_status: supported
    presence_status: product_or_preparation_dependent
    source_url: https://doi.org/10.1002/mnfr.201700980
    notes: UK mature broccoli after sous-vide cooking, with and without mustard myrosinase
    source_reference: '#food-source-4'
  - key: kaempferol_qual
    label: Kaempferol
    status: Present — quantity not established
    amount_display: Present — quantity not established
    source_note: >-
      Dabeek and Marra 2019 compile Phenol-Explorer and USDA flavonoid values
      showing kaempferol in Broccoli; a single defensible per-100 g value is not
      taken from the abbreviated USDA nutrient panel.
    public_note: >-
      Dabeek and Marra 2019 supports this qualitative constituent record. See
      technical provenance for food form and measurement details.
    source_group: >-
      Dabeek and Marra 2019 supports this qualitative constituent record. See
      technical provenance for food form and measurement details.
substance_relationships:
  - substance: 5-Methyltetrahydrofolate
    substance_id: 5-methyltetrahydrofolate
    relationship: contains
    evidence_material: Raw vegetable, analytical sample treated for folate extraction
    preparation_state: raw
    chemical_form: Monoglutamyl and polyglutamyl 5-methyltetrahydrofolate
    source_url: https://pubmed.ncbi.nlm.nih.gov/20888309/
    evidence_source: >-
      Wang, Riedl and Schwartz (2010), Journal of Chromatography B,
      878(29):2949–2958. DOI: 10.1016/j.jchromb.2010.08.043.
      Form-specific HPLC-MS/MS analysis of store-bought vegetables.
    material_limitations: >-
      Supports form-specific 5-MTHF presence. The extraction included analytical
      steaming; this is not a cooked-food composition observation. Table 5 quantities and their conversion are recorded separately
      in nutrition_supplementary_sources. The total-folate panel is a different analyte
      and must not be used as a 5-MTHF quantity.
  - substance: Kaempferol
    relationship: contains
    citation_keys:
      - dabeek_dietary_kaempferol_2019
  - substance: Choline
    relationship: contains
    description: USDA FoodData Central reports choline in Broccoli, raw.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: broccoli|Choline
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Broccoli, raw
    source_url: https://fdc.nal.usda.gov/food-details/170379/nutrients
    presence_status: presence_and_amount_supported
    source_reference: '#food-source-3'
  - substance: Magnesium
    relationship: contains
    description: USDA FoodData Central reports magnesium in Broccoli, raw.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: broccoli|Magnesium
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Broccoli, raw
    source_url: https://fdc.nal.usda.gov/food-details/170379/nutrients
    presence_status: presence_and_amount_supported
    source_reference: '#food-source-3'
  - substance: Phosphorus
    relationship: contains
    description: USDA FoodData Central reports phosphorus in Broccoli, raw.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: broccoli|Phosphorus
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Broccoli, raw
    source_url: https://fdc.nal.usda.gov/food-details/170379/nutrients
    presence_status: presence_and_amount_supported
    source_reference: '#food-source-3'
  - substance: Potassium
    relationship: contains
    description: USDA FoodData Central reports potassium in Broccoli, raw.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: broccoli|Potassium
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Broccoli, raw
    source_url: https://fdc.nal.usda.gov/food-details/170379/nutrients
    presence_status: presence_and_amount_supported
    source_reference: '#food-source-3'
  - substance: Iron
    relationship: contains
    description: USDA FoodData Central reports iron in Broccoli, raw.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: broccoli|Iron
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Broccoli, raw
    source_url: https://fdc.nal.usda.gov/food-details/170379/nutrients
    presence_status: presence_and_amount_supported
    source_reference: '#food-source-3'
  - substance: Manganese
    relationship: contains
    description: USDA FoodData Central reports manganese in Broccoli, raw.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: broccoli|Manganese
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Broccoli, raw
    source_url: https://fdc.nal.usda.gov/food-details/170379/nutrients
    presence_status: presence_and_amount_supported
    source_reference: '#food-source-3'
  - substance: Zinc
    relationship: contains
    description: USDA FoodData Central reports zinc in Broccoli, raw.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: broccoli|Zinc
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Broccoli, raw
    source_url: https://fdc.nal.usda.gov/food-details/170379/nutrients
    presence_status: presence_and_amount_supported
    source_reference: '#food-source-3'
  - substance: Vitamin B1
    relationship: contains
    description: USDA FoodData Central reports vitamin B1 in Broccoli, raw.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: broccoli|Vitamin B1
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Broccoli, raw
    source_url: https://fdc.nal.usda.gov/food-details/170379/nutrients
    presence_status: presence_and_amount_supported
    source_reference: '#food-source-3'
  - substance: Vitamin B2
    relationship: contains
    description: USDA FoodData Central reports vitamin B2 in Broccoli, raw.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: broccoli|Vitamin B2
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Broccoli, raw
    source_url: https://fdc.nal.usda.gov/food-details/170379/nutrients
    presence_status: presence_and_amount_supported
    source_reference: '#food-source-3'
  - substance: Vitamin B5
    relationship: contains
    description: USDA FoodData Central reports vitamin B5 in Broccoli, raw.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: broccoli|Vitamin B5
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Broccoli, raw
    source_url: https://fdc.nal.usda.gov/food-details/170379/nutrients
    presence_status: presence_and_amount_supported
    source_reference: '#food-source-3'
  - substance: Vitamin B6
    relationship: contains
    description: USDA FoodData Central reports vitamin B6 in Broccoli, raw.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: broccoli|Vitamin B6
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Broccoli, raw
    source_url: https://fdc.nal.usda.gov/food-details/170379/nutrients
    presence_status: presence_and_amount_supported
    source_reference: '#food-source-3'
  - substance: Vitamin B9
    relationship: contains
    description: >-
      USDA FoodData Central reports folate in Broccoli, raw.  The recorded
      analyte is folate.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: broccoli|Vitamin B9
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Broccoli, raw
    source_url: https://fdc.nal.usda.gov/food-details/170379/nutrients
    presence_status: presence_and_amount_supported
    source_reference: '#food-source-3'
  - substance: Vitamin C
    relationship: contains
    description: USDA FoodData Central reports vitamin C in Broccoli, raw.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: broccoli|Vitamin C
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Broccoli, raw
    source_url: https://fdc.nal.usda.gov/food-details/170379/nutrients
    presence_status: presence_and_amount_supported
    source_reference: '#food-source-3'
  - substance: Vitamin K
    relationship: contains
    description: >-
      USDA FoodData Central reports vitamin K in Broccoli, raw.  This vitamin K
      record is not a vitamin K2 measurement.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: broccoli|Vitamin K
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Broccoli, raw
    source_url: https://fdc.nal.usda.gov/food-details/170379/nutrients
    presence_status: presence_and_amount_supported
    source_reference: '#food-source-3'
  - substance: Sulforaphane
    relationship: contains
    description: >-
      Sulforaphane forms from glucoraphanin when myrosinase is active. In one
      cooked-broccoli study the amount depended on preparation, and it is not
      entered as a per-100 g nutrient.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: broccoli|Sulforaphane
    presence_status: product_or_preparation_dependent
    evidence_source: >-
      Okunade, Niranjan, Ghawi, Kuhnle and Methven (2018), Molecular Nutrition
      & Food Research 62:1700980. Formation identity also rests on Fahey et al.
      (1997).
    evidence_material: >-
      UK mature broccoli, sous vide at 100 °C for 20 minutes, with and without
      1 g brown mustard powder
    source_url: https://doi.org/10.1002/mnfr.201700980
    source_reference: '#food-source-4'
substance_review_candidates: []
---
## Overview

Broccoli is a cruciferous vegetable providing **glucoraphanin**, the precursor of [sulforaphane](/docs/substances/bioactive-compounds/organosulfur/sulforaphane), together with **folate** and **vitamin C** at low energy density. Sulforaphane forms when myrosinase meets that precursor. Heating can stop the enzyme while glucoraphanin remains [1,4].

The nutrient table does not give a sulforaphane amount per 100 g. In one UK lot, sous-vide cooking at 100 °C for 20 minutes left 1.06 µmol sulforaphane per g dry weight. The same cooked broccoli plus 1 g brown mustard powder formed 8.58 µmol/g dry weight. Twelve adults who ate 200 g excreted 9.8 µmol of the urinary metabolite per g creatinine in 24 hours, and 44.7 µmol/g creatinine when the mustard was added [4].

## Food Context

### Synergies

- Include broccoli with a varied meal rather than treating it as a sulforaphane dose.

### Preparation

- Chopping or chewing lets broccoli myrosinase meet glucoraphanin and form sulforaphane [1].
- In the Okunade sous-vide series at 100 °C, myrosinase activity fell by 40% after 2 minutes and by 90% after 6 minutes. None was measurable after 8 minutes. The feeding meal was cooked for 20 minutes [4].
- After that long cook, urinary sulforaphane-NAC was still detected. The authors read that remainder as conversion by gut microbes, and it varied between the 12 adults [4].
- Adding 1 g brown mustard powder after cooking supplied active myrosinase. In the florets, 8.58 / 1.06 = 8.1, reported as an 8-fold rise. In urine, 44.7 / 9.8 = 4.6 from the published means. The average of each person's increase was 4.7-fold, from 1.7-fold to 10-fold [4].

## Recipes

<FoodRecipes tag="Broccoli" />

<NutritionTable details={frontMatter} />

## Substances

<FoodSubstancesFromTable details={frontMatter} />

## References

[1] Houghton et al. (2016). [Sulforaphane and Other Nutrigenomic Nrf2 Activators: Can the Clinician’s Expectation Be Matched by the Reality?](/docs/papers/BRAIN-Diet-References#houghton_sulforaphane_2016). Constituent-level review of broccoli-derived sulforaphane and glucoraphanin–myrosinase conversion; not a broccoli feeding trial.

<span id="food-source-2" />

[2] [Broccoli sprouts: An exceptionally rich source of inducers (1997)](/docs/papers/BRAIN-Diet-References#food_composition_8733e3bce0a9)

<span id="food-source-3" />

[3] [USDA SR Legacy April 2018](https://fdc.nal.usda.gov/food-details/170379/nutrients)

<span id="food-source-4" />

[4] Okunade et al. (2018). [Supplementation of the diet by exogenous myrosinase via mustard seeds to increase the bioavailability of sulforaphane in healthy human subjects after the consumption of cooked broccoli](/docs/papers/BRAIN-Diet-References#okunade_sulforaphane_2018). Twelve adults ate 200 g sous-vide broccoli, with and without 1 g brown mustard powder. Sulforaphane in the florets is reported per g dry weight, and the urinary metabolite per g creatinine. Neither figure is a sulforaphane amount for every 100 g of broccoli.
