---
id: green-tea
title: Green Tea
sidebar_label: Green Tea
description: >-
  Source of EGCG, L-theanine, and polyphenols for cognitive and metabolic
  support
tags:
  - Food
  - Green Tea
  - Vegan
  - Vegetarian
  - Manganese
  - Potassium
  - EGCG
  - L-Theanine
  - Polyphenol
list_image: /img/foods/green-tea/green-tea_thumb.webp
nutrition_per_100g:
  kcal: 1
  potassium_mg: 8
  zinc_mg: 0.01
  vitamin_b3_mg: 0.03
  vitamin_b6_mg: 0.005
  protein_g: 0.22
  iron_mg: 0.02
  magnesium_mg: 1
  sodium_mg: 1
  copper_mg: 0.004
  manganese_mg: 0.184
  vitamin_b1_mg: 0.007
  vitamin_b2_mg: 0.058
nutrition_source:
  database: USDA FoodData Central
  food_name: Beverages, tea, green, brewed, regular
  fdc_id: 171917
  retrieval_method: SR Legacy bulk (April 2018)
  basis: per 100 g edible portion
  last_checked: '2026-08-15'
nutrition_supplementary_sources:
  - key: egcg_mg
    label: EGCG
    notes: >-
      Dominant catechin in many green teas; very sensitive to leaf dose, time,
      and temperature.
    source_note: >-
      Order-of-magnitude for a typical brewed green tea beverage scaled to per
      100 g liquid; cup strength and cultivar dominate variance (USDA brew
      panels are not a full polyphenol spec).
    status: Present — quantity not established
    public_display: table
    omit_substance_card: false
    evidence_status: supported
    presence_status: presence_supported_amount_unavailable
    amount_display: 30 mg (estimate)
    source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC7009618/
    source_group: estimate-egcg_mg
    public_note: >-
      Order-of-magnitude for a typical brewed green tea beverage scaled to per
      100 g liquid; cup strength and cultivar dominate variance (USDA brew
      panels are not a full polyphenol spec).
    value: 30
    unit: mg
    quantity_citation_pending: true
    source_reference: '#food-source-4'
  - key: l_theanine_mg
    label: L-Theanine
    notes: Tea-specific amino acid; often co-discussed with catechins for calm focus.
    source_note: Approximate per 100 g brewed beverage; shade-grown teas can be higher.
    status: Present — quantity not established
    public_display: table
    omit_substance_card: false
    evidence_status: supported
    presence_status: presence_supported_amount_unavailable
    amount_display: 6 mg (estimate)
    source_url: https://pubmed.ncbi.nlm.nih.gov/35445053/
    source_group: estimate-l_theanine_mg
    public_note: Approximate per 100 g brewed beverage; shade-grown teas can be higher.
    value: 6
    unit: mg
    quantity_citation_pending: true
    source_reference: '#food-source-5'
nutrition_functional_metrics:
  - key: total_green_tea_catechins_mg
    label: Total catechins (brewed proxy)
    amount_display: Varies by product
    notes: Pool includes EGCG, EGC, ECG, and EC; brewing dominates extraction.
main_image: /img/foods/green-tea/green-tea_medium.webp
legacy_list_image: /img/foods/green-tea/green-tea_thumb.webp
legacy_main_image: /img/foods/green-tea/green-tea_medium.webp
substance_relationships:
  - substance: Potassium
    relationship: contains
    description: >-
      USDA FoodData Central reports potassium in Beverages, tea, green, brewed,
      regular.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: green-tea|Potassium
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Beverages, tea, green, brewed, regular
    source_url: https://fdc.nal.usda.gov/food-details/171917/nutrients
    presence_status: presence_and_amount_supported
    source_reference: '#food-source-6'
  - substance: Manganese
    relationship: contains
    description: >-
      USDA FoodData Central reports manganese in Beverages, tea, green, brewed,
      regular.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: green-tea|Manganese
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Beverages, tea, green, brewed, regular
    source_url: https://fdc.nal.usda.gov/food-details/171917/nutrients
    presence_status: presence_and_amount_supported
    source_reference: '#food-source-6'
  - substance: EGCG
    relationship: contains
    description: Reported in green tea infusions.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: green-tea|EGCG
    presence_status: presence_supported_amount_unavailable
    evidence_source: EFSA (2018), Scientific opinion on green tea catechins
    evidence_material: green tea infusions
    source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC7009618/
    source_reference: '#food-source-4'
  - substance: L-Theanine
    relationship: contains
    description: >-
      L-theanine occurs in green tea; content varies with the leaves and
      brewing.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: green-tea|L-Theanine
    presence_status: presence_supported_amount_unavailable
    evidence_source: 'Li et al. (2022), L-Theanine: A Unique Functional Amino Acid in Tea'
    evidence_material: Camellia sinensis tea
    source_url: https://pubmed.ncbi.nlm.nih.gov/35445053/
    source_reference: '#food-source-5'
substance_review_candidates: []
nutrition_value_reviews:
  - title: 'EGCG amount: citation attachment pending'
    section: Bioactive compounds
    correction_status: pending
    description: >-
      Retained researched estimate: 30 mg per 100 g. Original note:
      Order-of-magnitude for a typical brewed green tea beverage scaled to per
      100 g liquid; cup strength and cultivar dominate variance (USDA brew
      panels are not a full polyphenol spec).
    decision: >-
      Retain the estimate while attaching its quantitative source and verifying
      preparation and denominator. Presence citations do not independently
      verify this amount.
  - title: 'L-Theanine amount: citation attachment pending'
    section: Bioactive compounds
    correction_status: pending
    description: >-
      Retained researched estimate: 6 mg per 100 g. Original note: Approximate
      per 100 g brewed beverage; shade-grown teas can be higher.
    decision: >-
      Retain the estimate while attaching its quantitative source and verifying
      preparation and denominator. Presence citations do not independently
      verify this amount.
  - title: '1993 manganese infusion protocol: full-text verification pending'
    section: Manganese supplementary note
    correction_status: pending
    description: >-
      Publisher abstract verifies 1.75–6.67 micrograms/mL manganese in green-tea
      infusions (0.175–0.667 mg/100 mL). Sample count, leaf-to-water ratio,
      exact brewing times/temperatures and which protocols define the endpoints
      remain unverified.
    decision: >-
      Keep the reported range study-specific. Do not assign an exact brewing
      recipe or substitute this range for the USDA baseline.
manganese_study_evidence:
  usda:
    fdc_id: 171917
    food_name: Beverages, tea, green, brewed, regular
    manganese_mg_per_100g: 0.184
    data_points: 12
    record_min_mg_per_100g: 0.169
    record_max_mg_per_100g: 0.216
    reference_basis: AI
    reference_mg: 2.3
    percent_unrounded: 8
  klepacka_2022:
    citation_key: klepacka_tea_infusions_2022
    original_unit: micrograms per 100 mL brewed infusion
    tea_material: >-
      One green-tea material from Yunnan; three tea types in the study, not
      three independent green-tea products
    leaf_g: 2
    water_ml: 100
    water: >-
      boiling deionized water at addition; covered steep, no constant brewing
      temperature documented
    brewing_minutes:
      - 6
      - 10
      - 20
      - 30
    assays: >-
      triplicate; table reports n=3 samples per condition; not a broad product
      survey
    method: flame atomic absorption spectrometry, manganese at 279.5 nm
    table_1:
      - minutes: 6
        mean_ug_per_100ml: 370.8
        sd_ug_per_100ml: 0.03
        mg_per_100ml: 0.3708
        percent_ai_unrounded: 16.121739130434783
      - minutes: 10
        mean_ug_per_100ml: 470.1
        sd_ug_per_100ml: 2.16
        mg_per_100ml: 0.4701
        percent_ai_unrounded: 20.43913043478261
      - minutes: 20
        mean_ug_per_100ml: 560.2
        sd_ug_per_100ml: 2.46
        mg_per_100ml: 0.5602
        percent_ai_unrounded: 24.35652173913044
      - minutes: 30
        mean_ug_per_100ml: 539.1
        sd_ug_per_100ml: 3.19
        mg_per_100ml: 0.5391
        percent_ai_unrounded: 23.439130434782612
    range_definition: min/max of four reported brewing-time means, not individual sample extrema
    range_mg_per_100ml:
      - 0.3708
      - 0.5602
    percent_ai_unrounded:
      - 16.121739130434783
      - 24.35652173913044
  matsushima_1993:
    citation_key: matsushima_tea_manganese_1993
    verification: >-
      Publisher primary abstract verified; full text could not be accessed
      during this bounded check
    original_range_ug_per_ml:
      - 1.75
      - 6.67
    range_mg_per_100ml:
      - 0.175
      - 0.667
    conversion: micrograms/mL × 100 mL ÷ 1000 = mg/100 mL
    material: >-
      green-tea brewed infusions, distinct from reported green-tea leaf content
      of 670 micrograms/g
    method: flameless atomic absorption spectrophotometry, as reported in abstract
    sample_number: null
    leaf_water_ratio: null
    brewing_time_minutes: null
    temperature_c: null
    protocol_status: >-
      Unverified: abstract gives varied standardized conditions,
      elevated-temperature and repeated-infusion experiments, but not the exact
      protocols/sample numbers
    percent_ai_unrounded:
      - 7.608695652173914
      - 29.000000000000004
  comparison: >-
    No volume-to-mass conversion applied. Study values retain per-100-mL basis;
    USDA retains per-100-g basis. No universal merged range.
  excluded: >-
    FoodStruct sweetened ready-to-drink ginseng/honey tea and its
    serving-specific 16% are not used.
---
## Overview

Green tea provides **catechins** (especially EGCG), **L-theanine**, and other polyphenols in a low-calorie brewed beverage. These intrinsic compounds support antioxidant defenses and are widely studied for cognitive and metabolic relevance, alongside small amounts of **manganese**, **fluoride**, and **potassium** from the leaf and brew matrix.

Within the BRAIN Diet framework, green tea is best used as a **polyphenol beverage** rather than a calorie or protein source. In Green Mediterranean Diet trials, added green-tea polyphenols contributed to greater visceral adiposity reduction than a standard Mediterranean diet alone [1], and the same trial programme linked the green-Mediterranean pattern to attenuated brain atrophy with glycemic control as part of the neuroprotective signal

## Key Nutritional Highlights

- **EGCG** and related catechins dominate the polyphenol profile; brew strength, leaf dose, and steep time strongly affect extraction.
- Green-tea polyphenols in the Green Mediterranean Diet were associated with greater visceral adiposity reduction than standard Mediterranean diet alone [1].
- Brain MRI follow-up in DIRECT PLUS linked the green-Mediterranean pattern to attenuated brain atrophy, with glycemic control contributing to the neuroprotective signal [2].
- **L-theanine** is a tea-specific amino acid often discussed alongside catechins for calm, non-sedating focus.
- Can reduce non-heme iron absorption when taken with meals; spacing from iron-rich meals or adding vitamin C may help.

## Food Context

### Synergies

- Can reduce non-heme iron absorption if taken with meals; space ≥1 hour from iron-rich meals or add lemon (vitamin C) to mitigate this.

### Preparation

- Steep at lower temperatures (roughly 70–80 °C) to preserve catechins and limit bitter tannin extraction.
- Unsweetened brews fit best within polyphenol-forward dietary patterns; cup strength varies widely by leaf type and steep time.
- Adding milk to black tea did not impair catechin bioavailability in a 12-person crossover; green-tea catechins were also rapidly absorbed. This trial did not test milk with green tea [3].

## Recipes

<FoodRecipes tag="Green Tea" />

<NutritionTable details={frontMatter} />

**Manganese varies with tea and brewing conditions.** In a 2022 study, green tea brewed with 2 g leaves per 100 ml boiling water for 6–30 minutes had brewing-time means of **0.3708–0.5602 mg/100 ml** (16.1–24.4% of the site’s adult Adequate Intake) [7]. A 1993 study reported **0.175–0.667 mg/100 ml** in green-tea infusions under varied infusion conditions (7.6–29.0%) [8]. These are separate study results, not a universal range. Their basis is 100 ml of brewed liquid; the USDA table retains its 100 g basis.

## Substances

<FoodSubstancesFromTable details={frontMatter} />

## References

[1] In Green Mediterranean Diet trials, added green-tea polyphenols contributed to greater visceral adiposity reduction than a standard Mediterranean diet alone. Zelicha et al. 2022. [The effect of high-polyphenol Mediterranean diet on visceral adiposity: the DIRECT PLUS randomized controlled trial](/docs/papers/BRAIN-Diet-References#zelicha_effect_2022)

[2] Brain MRI follow-up in DIRECT PLUS linked the green-Mediterranean pattern to attenuated brain atrophy, with glycemic control contributing to the neuroprotective signal. Pachter et al. 2024. [Glycemic control contributes to the neuroprotective effects of Mediterranean and green-Mediterranean diets on brain age: the DIRECT PLUS brain-magnetic resonance imaging randomized controlled trial](/docs/papers/BRAIN-Diet-References#pachter_glycemic_2024)

[3] Randomised crossover (n = 12): green-tea and black-tea catechins rose rapidly in blood; adding 100 ml semi-skimmed milk to 600 ml black tea did not significantly change catechin AUC versus black tea alone. Milk was not tested with green tea. van het Hof et al. 1998. [Bioavailability of catechins from tea: the effect of milk](/docs/papers/BRAIN-Diet-References#van_het_hof_catechins_milk_1998)

<span id="food-source-4" />

[4] [EFSA (2018), Scientific opinion on green tea catechins](/docs/papers/BRAIN-Diet-References#food_composition_d8291992bb52)

<span id="food-source-5" />

[5] [Li et al. (2022), L-Theanine: A Unique Functional Amino Acid in Tea](/docs/papers/BRAIN-Diet-References#food_composition_75ad4b4a0b2b)

<span id="food-source-6" />

[6] [USDA SR Legacy April 2018](https://fdc.nal.usda.gov/food-details/171917/nutrients)

[7] Klepacka (2022). [Tea Infusions as a Source of Phenolic Compounds in the Human Diet](/docs/papers/BRAIN-Diet-References#klepacka_tea_infusions_2022). Table 1 reports green-tea infusion measurements at four brewing times.

[8] Matsushima et al. (1993). [Contents of Aluminum and Manganese in Tea Leaves and Tea Infusions](/docs/papers/BRAIN-Diet-References#matsushima_tea_manganese_1993). The publisher abstract reports the green-tea infusion range.
