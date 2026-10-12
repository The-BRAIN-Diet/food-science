---
id: mct-oil
fcir_cases:
  - FCIR-012
title: MCT Oil
sidebar_label: MCT Oil
description: Concentrated medium-chain triglycerides for brain energy
tags:
  - Food
  - MCT Oil
  - MCT
  - Caprylic Triglyceride
  - Capric Triglyceride
  - Vegan
  - Vegetarian
list_image: /img/foods/mct-oil/mct-oil_thumb.webp
nutrition_per_100g:
  kcal: 833
  fat_g: 100
  sat_fat_g: 100
nutrition_source:
  database: USDA FoodData Central (Branded) — manufacturer specification
  food_name: >-
    MCT Premium C8 & C10 100% Pure Oil; declared ingredient "MCT oil (60% C8,
    40% C10)"
  fdc_id: 2543941
  retrieval_method: API
  basis: per 100 g product
  last_checked: '2026-08-18'
  selection_reason: >-
    MCT oil is a formulated product defined by its specification rather than by
    an agricultural commodity, so a manufacturer declaration for a
    single-ingredient product outranks any general composition database — and no
    general database holds it. The values are chemically constrained by what the
    product is: a pure triglyceride oil is entirely fat, and both C8:0 and C10:0
    are fully saturated, so a saturated fat approaching the total fat is
    expected rather than surprising. The Australia New Zealand Food Standards
    Code defines medium chain triglycerides as "triacylglycerols that contain
    predominantly the saturated fatty acids designated by 8:0 and 10:0", which
    corroborates the fatty acid class independently of any one brand.
  limitations: >-
    Label-derived values from one product, subject to US rounding rules. Energy
    of 833 kcal per 100 g reflects the lower yield of medium-chain fatty acids,
    about 8.3 kcal/g, rather than the 9 kcal/g of long-chain fat; a second
    product (FDC 2426574) declares 867 kcal, so treat the figure as approximate.
    The C8:C10 ratio is specific to this formulation and varies between brands.
    Records with a millilitre serving size can be converted to a per-100 g basis
    on an assumed density of 1.0, which overstates an oil by around 7 per cent;
    the values here are the internally consistent set for a pure oil by mass.
    Individual C6, C8 and C10 quantities are not declared.
  previously_withdrawn: >-
    USDA FDC 748278, 'Oil, canola', withdrawn 2026-08-18. Canola is a long-chain
    seed oil, and its saturated fat of 6.61 g and ALA of 7450 mg had been
    published here. Nothing from that record survives.
main_image: /img/foods/mct-oil/mct-oil_medium.webp
legacy_list_image: /img/foods/mct-oil/mct-oil_thumb.webp
legacy_main_image: /img/foods/mct-oil/mct-oil_medium.webp
nutrition_supplementary_sources:
  - key: mct_qual
    label: MCT
    status: Present — quantity not established
    amount_display: Present — quantity not established
    source_note: >-
      MCT oil is defined by its medium-chain triglyceride content, so presence
      follows from the product identity, and the Australia New Zealand Food
      Standards Code defines the class as triacylglycerols containing
      predominantly the saturated fatty acids 8:0 and 10:0. The adopted
      specification (FDC 2543941) declares 60 per cent C8 and 40 per cent C10,
      but that ratio is particular to one formulation and C6 is not quantified
      at all, so no per-chain quantity is published for MCT oil in general.
    public_note: >-
      MCT oil consists of medium-chain triglycerides; C8/C10 proportions vary
      with the formulation.
    source_group: mct-product-definition
    source_url: https://fdc.nal.usda.gov/food-details/2543941/nutrients
    source_reference: '#food-source-3'
substance_relationships:
  - substance: MCT
    relationship: contains
    description: >-
      MCT oil consists of medium-chain triglycerides; C8/C10 proportions vary
      with the formulation.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: mct-oil|MCT
    evidence_source: Adopted manufacturer declaration FDC 2543941
    evidence_material: Single-ingredient C8/C10 MCT oil specification
    source_url: https://fdc.nal.usda.gov/food-details/2543941/nutrients
    presence_status: presence_supported_amount_unavailable
    source_reference: '#food-source-3'
  - substance: Caprylic Triglyceride
    relationship: contains
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: mct-oil|Caprylic Triglyceride
    presence_status: product_or_preparation_dependent
    evidence_source: >-
      Kosarac et al. (2021), Frontiers in Chemistry 9:756745, unheated MCT oil,
      Table 1; ABITEC CAPTEX product identity
    evidence_material: >-
      unheated commercial St. Francis Herb Farm C8/C10 MCT oil from a
      health-food store; formulation-dependent
    source_url: >-
      https://science-ouverte.canada.ca/server/api/core/bitstreams/e8cf968d-6a5c-4bb0-8f3b-a00c2a666b6f/content
    description: >-
      Identified in a studied commercial C8/C10 MCT oil; content depends on the
      formulation and a separate amount is unavailable.
    previous_review_reason: >-
      Fatty-acid C6/C8/C10 fractions do not identify the named homogeneous
      triacylglycerol molecule. Molecular-species or relevant product evidence
      is required.
    source_reference: '#food-source-4'
  - substance: Capric Triglyceride
    relationship: contains
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: mct-oil|Capric Triglyceride
    presence_status: product_or_preparation_dependent
    evidence_source: >-
      Kosarac et al. (2021), Frontiers in Chemistry 9:756745, unheated MCT oil,
      Table 1; ABITEC CAPTEX product identity
    evidence_material: >-
      unheated commercial St. Francis Herb Farm C8/C10 MCT oil from a
      health-food store; formulation-dependent
    source_url: >-
      https://science-ouverte.canada.ca/server/api/core/bitstreams/e8cf968d-6a5c-4bb0-8f3b-a00c2a666b6f/content
    description: >-
      Identified in a studied commercial C8/C10 MCT oil; content depends on the
      formulation and a separate amount is unavailable.
    previous_review_reason: >-
      Fatty-acid C6/C8/C10 fractions do not identify the named homogeneous
      triacylglycerol molecule. Molecular-species or relevant product evidence
      is required.
    source_reference: '#food-source-4'
substance_review_candidates:
  - Caproic Triglyceride
---
## Overview

MCT oil is a concentrated triglyceride product usually made with caprylic (C8) and capric (C10) fatty acids. Formulations vary. Fatty-acid proportions do not identify every individual triglyceride molecule.

MCT oil differs in composition from ordinary coconut oil.

## Food Context

### Synergies

- Part of brain energy strategy

### Preparation

- Use in smoothies or small portions
- Start with small amounts
- Supports ketone production

## Recipes

<FoodRecipes tag="MCT Oil" />

<NutritionTable details={frontMatter} />

## Substances

<FoodSubstancesFromTable details={frontMatter} />

## References

[1] Medium-chain triglycerides are rapidly oxidised and studied in ketogenic and metabolic contexts. Crosby et al. 2021. [Ketogenic Diets and Chronic Disease: Weighing the Benefits Against the Risks](/docs/papers/BRAIN-Diet-References#crosby_ketogenic_2021)

[2] Ketogenic substrates including MCTs influence brain energy metabolism in clinical research. Popiolek-Kalisz et al. 2024. [Ketogenic diet and cardiovascular risk – state of the art review](/docs/papers/BRAIN-Diet-References#popiolek-kalisz_ketogenic_2024)

<span id="food-source-3" />

[3] [Adopted manufacturer declaration FDC 2543941](https://fdc.nal.usda.gov/food-details/2543941/nutrients)

<span id="food-source-4" />

[4] [Kosarac et al. (2021), Frontiers in Chemistry 9:756745, unheated MCT oil, Table 1; ABITEC CAPTEX product identity](/docs/papers/BRAIN-Diet-References#food_composition_a1823fa6055f)
