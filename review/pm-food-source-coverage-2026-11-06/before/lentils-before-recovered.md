---
id: lentils
title: Lentils
sidebar_label: Lentils
description: 'Folate-rich legume with plant protein, fibre and non-haem iron'
eaa_profile_applicable: true
tags:
  - Food
  - Lentils
  - Vegan
  - Vegetarian
  - Vitamin B9
  - Iron
  - Zinc
  - Cysteine
list_image: /img/foods/lentils/lentils_thumb.webp
amino_acid_strengths: 'Lysine, relative to grains.'
limiting_amino_acids: >-
  Combined methionine plus cysteine is the lowest ratio to the 1991 FAO pattern
  in the cited cooked-lentil assay. That score is separate from cystine per
  serving.
complementary_pairings: >-
  Grains such as rice, oats or barley across the day. Eating them in the same
  meal is optional.
public_display:
  cystine_mg: internal-only
nutrition_per_100g:
  beta_carotene_ug: 23
  vitamin_b3_mg: 2.605
  vitamin_b5_mg: 2.14
  vitamin_b6_mg: 0.54
  choline_mg: 96.4
  sugar_g: 2.03
  vitamin_e_mg: 0.49
  fat_g: 1.06
  vitamin_a_rae_ug: 2
  sodium_mg: 6
  vitamin_b1_mg: 0.873
  vitamin_b2_mg: 0.211
  folate_ug: 479
  copper_mg: 0.754
  manganese_mg: 1.393
  fibre_g: 10.7
  iron_mg: 6.51
  magnesium_mg: 47
  phosphorus_mg: 281
  protein_g: 24.63
  vitamin_c_mg: 4.5
  sat_fat_g: 0.154
  linoleic_g: 0.414
  carbs_g: 63.35
  kcal: 352
  calcium_mg: 35
  potassium_mg: 677
  zinc_mg: 3.27
  cystine_mg: 322
  selenium_ug: 0.1
  vitamin_k_ug: 5
  pufa_18_3_unresolved_mg: 112
nutrition_source:
  database: USDA FoodData Central
  food_name: 'Lentils, raw'
  fdc_id: 172420
  retrieval_method: SR Legacy bulk (April 2018)
  basis: per 100 g edible portion
  last_checked: '2026-08-15'
nutrition_supplementary_sources:
  - key: cystine_cooked_mg
    label: 'Cystine (cooked, boiled)'
    value: 118
    unit: mg
    public_display: internal-only
    notes: >-
      Per 100 g of boiled mature lentils. A separate preparation from the
      dry-seed cystine row.
    source_note: >-
      USDA FoodData Central, Lentils, mature seeds, cooked, boiled, without
      salt, FDC 172421. Nutrient name Cystine, 0.118 g per 100 g. Household cup
      198 g, about 234 mg cystine. Different food from the dry seed, FDC 172420,
      which has a 192 g cup and about 618 mg cystine.
    public_note: >-
      FDC 1724 supports this source-specific measurement. See technical
      provenance for food form and measurement details.
    source_group: >-
      FDC 1724 supports this source-specific measurement. See technical
      provenance for food form and measurement details.
substance_relationships:
  - substance: Cysteine
    relationship: contains
    description: >-
      Cystine 322 mg per 100 g of Lentils, raw (FDC 172420). Cooked boiled lentils are a separate
      food (FDC 172421, 118 mg per 100 g). Composition only; not a glutathione-synthesis result.
  - substance: Iron
    relationship: contains
    description: USDA FoodData Central reports iron in Lentils, raw.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: lentils|Iron
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Lentils, raw
    source_url: https://fdc.nal.usda.gov/food-details/172420/nutrients
    presence_status: presence_and_amount_supported
  - substance: Zinc
    relationship: contains
    description: USDA FoodData Central reports zinc in Lentils, raw.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: lentils|Zinc
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Lentils, raw
    source_url: https://fdc.nal.usda.gov/food-details/172420/nutrients
    presence_status: presence_and_amount_supported
  - substance: Vitamin B9
    relationship: contains
    description: USDA FoodData Central reports folate in Lentils, raw.  The recorded analyte is folate.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: lentils|Vitamin B9
    evidence_source: USDA SR Legacy April 2018
    evidence_material: Lentils, raw
    source_url: https://fdc.nal.usda.gov/food-details/172420/nutrients
    presence_status: presence_and_amount_supported
  - substance: Cysteine
    substance_id: cysteine
    relationship: contains
    evidence_status: supported
    evidence_material: Cooked Canadian whole green and split red lentils; separate dry-matter assay
    preparation_state: cooked
    source_url: https://doi.org/10.1002/fsn3.473
    citation_keys:
      - nosworthy_cooked_pulses_2017
    evidence_source: >-
      Performic-acid oxidation quantified cysteine separately in cooked lentils; the existing
      canonical food reference documents the assay and dry-matter basis.
    material_limitations: >-
      Qualitative occurrence only in this projection. The dry-matter result is not an as-eaten
      cysteine amount and is not substituted for USDA cystine.
    food_delivery_notes: >-
      Cysteine assay on separate dry-matter samples; no as-eaten amount or conversion from cystine
      is inferred.
    chemical_form: protein cysteine measured after oxidation
main_image: /img/foods/lentils/lentils_medium.webp
legacy_list_image: /img/foods/lentils/lentils_thumb.webp
legacy_main_image: /img/foods/lentils/lentils_medium.webp
substance_review_candidates: []
nutrition_amino_acid_profiles:
  - id: usda-sr-172421
    material: Lentils, mature seeds, cooked, boiled, without salt
    preparation: cooked
    food_group: plant
    basis: per 100 g edible portion
    unit: g
    source:
      database: USDA FoodData Central SR Legacy, April 2018
      fdc_id: 172421
      source_url: https://fdc.nal.usda.gov/food-details/172421/nutrients
      download_url: https://fdc.nal.usda.gov/fdc-datasets/FoodData_Central_sr_legacy_food_csv_2018-04.zip
      download_sha256: b80817294b8850530aaedf2e515c02593b1824f763a0ff356e5c2081643e6fd0
    protein_g: 9.02
    protein_source_row_id: "1693807"
    amino_acids:
      histidine:
        value: 0.254
        source_row_id: "1693848"
        nutrient_id: "1221"
        data_points: 0
        derivation_id: null
      isoleucine:
        value: 0.39
        source_row_id: "1693842"
        nutrient_id: "1212"
        data_points: 0
        derivation_id: null
      leucine:
        value: 0.654
        source_row_id: "1693843"
        nutrient_id: "1213"
        data_points: 0
        derivation_id: null
      lysine:
        value: 0.63
        source_row_id: "1693844"
        nutrient_id: "1214"
        data_points: 0
        derivation_id: null
      methionine:
        value: 0.077
        source_row_id: "1693823"
        nutrient_id: "1215"
        data_points: 0
        derivation_id: null
      phenylalanine:
        value: 0.445
        source_row_id: "1693824"
        nutrient_id: "1217"
        data_points: 0
        derivation_id: null
      threonine:
        value: 0.323
        source_row_id: "1693822"
        nutrient_id: "1211"
        data_points: 0
        derivation_id: null
      tryptophan:
        value: 0.081
        source_row_id: "1693821"
        nutrient_id: "1210"
        data_points: 0
        derivation_id: null
      valine:
        value: 0.448
        source_row_id: "1693846"
        nutrient_id: "1219"
        data_points: 0
        derivation_id: null
    portion:
      label: 0.5 cup
      source_row_id: "90596"
      source_grams: 198
      multiplier: 0.5
    limitations: >-
      USDA database composition, including source-specific analytical or calculated values. No
      amino-acid-specific digestibility correction; illustrative USDA household portion, not an
      intake recommendation. Missing values are not treated as zero.
    protein_quality:
      citation_keys:
        - nosworthy_cooked_pulses_2017
      summary: >-
        Cooked-pulse protein-quality evidence uses rat digestibility and separate dry-matter
        samples; it is not a human ileal correction of this as-eaten database profile.
---
## Overview

Lentils provide plant protein, fibre, folate and non-haem iron, with very little fat. They are a versatile base for soups, salads and stews, and a useful part of meals containing little or no meat.

Whole brown, green and black lentils retain their seed coat and generally hold their shape when cooked. Split red and yellow lentils are usually dehulled, cook faster and soften readily, making them well suited to soups and dahls.

## Other Nutritional Highlights

- **Folate:** Lentils contribute to dietary folate intake, supporting normal one-carbon metabolism.
- **Plant protein and fibre:** They contribute both within a varied dietary pattern.
- **Non-haem iron:** Lentils supply iron, although phytate affects its absorption. Including vitamin C–rich foods in the meal can help improve non-haem iron absorption [3].

## Advanced Nutrition

### Amino acids

Lentils supply cystine, which contributes to cysteine availability. Representative composition values are **118 mg per 100 g of boiled lentils**, or approximately **234 mg in a 198 g cooked cup**. Dry lentils contain approximately **322 mg per 100 g**; this is an ingredient-weight comparison, not a cooked serving.

Food-composition values are representative, not fixed. Variety, preparation and source can change the amount.

### Protein quality

In the studied cooked whole green and split red lentils, **methionine plus cysteine** had the lowest amino-acid score relative to the 1991 reference requirement pattern. “Limiting” describes that relative balance; it does not mean lentils lack these amino acids or make no useful contribution [1].

The study measured protein digestibility in rats, so its digestibility-adjusted scores are not direct measurements of adult-human dietary adequacy. A varied diet can provide complementary amino-acid profiles without requiring lentils and grains to be eaten in the same meal [1,2].

## Food Context

### Sourcing

- Whole brown, green and black lentils keep the seed coat. Red and yellow lentils are often split and dehulled, and they cook to a softer texture.
- Lentil polyphenols sit mainly in the seed coat. Proanthocyanidins were characterised there, mostly as polymers. Dehulled split lentils should not be treated as the same polyphenol food as whole lentils [4].

### Synergies

- Include a vitamin C–rich food in the same meal if raising non-haem iron absorption is the aim [3].

### Preparation

- Cook lentils until soft. Cooking presoaked lentils removed trypsin-inhibitor activity and lowered phytic acid. Tannins and catechins increased, and the size of the change depended on the variety [5].
- A 9-hour soak cut α-galactosides by 45–100%. Little of that loss was found in the soak water, and cooking afterwards changed those sugars only slightly [6].
- Split lentils soften without a long soak. Soak whole lentils when the aim is fewer of these oligosaccharides [6]. The lentil processing studies did not measure iron absorption, so a soak is not evidence that more iron will be absorbed [5,6].
- Sprouting for several days is not the same as an overnight soak. After 6 days of germination, trypsin-inhibitor activity and phytic acid fell, while tannins and catechins rose [5].

### Essential Amino Acid Profile

Lentils contribute plant protein, with lysine relatively abundant compared with grains. The methionine-plus-cysteine score, and the cystine amount in a serving, are set out under Advanced Nutrition [1,2].

## Recipes

<FoodRecipes tag="Lentils" />

<NutritionTable details={frontMatter} />

## Substances

<FoodSubstancesFromTable details={frontMatter} />

## References

[1] Nosworthy et al. (2017). [Determination of the protein quality of cooked Canadian pulses](/docs/papers/BRAIN-Diet-References#nosworthy_cooked_pulses_2017). Cooked Canadian whole green and split red lentils, cooked without soaking, then analysed on a dry-matter basis. Table 3 cysteine is from performic-acid oxidation (whole green 0.26 g cysteine and 0.21 g methionine per 100 g dry matter; split red 0.22 g and 0.22 g), not the as-eaten cystine row. On the 1991 FAO pattern, methionine plus cysteine was the lowest ratio: amino-acid score 0.714, true protein digestibility 87.89% and PDCAAS 0.628 for whole green lentils; amino-acid score 0.594, true protein digestibility 90.60% and PDCAAS 0.538 for split red lentils. DIAAS used fecal protein digestibility rather than ileal amino-acid digestibility: 0.58 and 0.50. No cooked pulse in the set reached 0.75. Rat assay, not an adult-human adequacy measurement. Green-lentil PDCAAS was 0.63, against 0.51 cited for an average lentil.

[2] Mariotti and Gardner (2019). [Dietary Protein and Amino Acids in Vegetarian Diets—A Review](/docs/papers/BRAIN-Diet-References#mariotti_dietary_2019). Lysine is proportionally low in grains, and methionine plus cysteine are proportionally slightly low in legumes. The review treats “complete” and “incomplete” as misleading and finds no requirement to combine complementary proteins in the same meal when intake is varied across the day. Not a lentil digestibility trial.

[3] Hallberg et al. (1989). [Iron absorption in man: ascorbic acid and dose-dependent inhibition by phytate](/docs/papers/BRAIN-Diet-References#hallberg_iron_1989). Human iron-absorption series: phytate inhibits non-haem iron absorption in a dose-dependent way; ascorbic acid can counteract that inhibition. Mixed-meal evidence, not a lentil trial.

[4] Dueñas et al. (2003). [Proanthocyanidin Composition in the Seed Coat of Lentils (Lens culinaris L.)](/docs/papers/BRAIN-Diet-References#duenas_lentil_seed_coat_2003). Lentil polyphenols are located essentially in the seed coat. In that coat, proanthocyanidin polymers were 65–75% (mean degree of polymerization 7–9) and oligomers 20–30%. Seed-coat composition, not a feeding trial and not a retail comparison of split versus whole lentils.

[5] Vidal-Valverde et al. (1994). [Effect of processing on some antinutritional factors of lentils](/docs/papers/BRAIN-Diet-References#vidal_valverde_lentils_antinutrients_1994). Soaking lowered phytic acid without changing trypsin-inhibitor activity, and tannins and catechins rose. Cooking presoaked seeds removed trypsin-inhibitor activity and reduced phytic acid further; tannins and catechins increased. Six-day germination greatly reduced trypsin inhibitor and phytic acid. Effects varied by variety. Iron absorption was not measured.

[6] Vidal-Valverde et al. (1992). [Effect of Processing on the Soluble Carbohydrate Content of Lentils](/docs/papers/BRAIN-Diet-References#vidal_valverde_lentils_carbohydrate_1992). A 9-hour soak reduced α-galactosides by 45–100%, and only 1–10% of those losses were recovered in the soak water. Cooking the soaked lentils changed α-galactoside content only slightly.
