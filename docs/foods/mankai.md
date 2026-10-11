---
id: mankai
title: Mankai (Duckweed)
sidebar_label: Mankai
description: Functional plant food with iron and B12 for vegan nutrient gaps
tags:
  - Food
  - Mankai
  - Vegan
  - Vegetarian
  - Iron
  - ALA
list_image: /img/foods/mankai/mankai_thumb.webp
nutrition_per_100g: {}
nutrition_source:
  database: USDA FoodData Central
  status: no_match
  slug: mankai
  note: >-
    No USDA match; add query to scripts/usda-map.json or run with USDA_API_KEY
    for fetch.
main_image: /img/foods/mankai/mankai_medium.webp
main_image_source:
  url: >-
    https://www.backyardboss.net/look-closely-to-see-worlds-smallest-flower-wolffia-globosa/
  label: Backyard Boss
legacy_list_image: /img/foods/mankai/mankai_thumb.webp
legacy_main_image: /img/foods/mankai/mankai_medium.webp
nutrition_supplementary_sources:
  - key: iron_qual
    label: Iron
    status: Present — quantity not established
    amount_display: Present
    source_note: >-
      The Metabolomic-Gut-Clinical Axis of Mankai Plant-Derived Dietary
      Polyphenols (2021). Trial describes cultivated Wolffia globosa Mankai as
      an iron-containing food; dry matter/shake intake percentages not converted
      into fresh composition.
    public_display: table
    omit_substance_card: false
    evidence_status: supported
    presence_status: presence_supported_amount_unavailable
    source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC8229908/
    source_group: mankai-iron
    public_note: Reported in cultivated Wolffia globosa Mankai.
    notes: cultivated Wolffia globosa Mankai
    source_reference: '#food-source-2'
  - key: ala_qual
    label: ALA
    status: Present — quantity not established
    amount_display: Present
    source_note: >-
      Freshwater Macrophytes: A Potential Source of Minerals and Fatty Acids
      (2022). Individual C18:3n-3 ALA is identified in Wolffia globosa; no
      unspecified 18:3 inference.
    public_display: table
    omit_substance_card: false
    evidence_status: supported
    presence_status: presence_supported_amount_unavailable
    source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC9036174/
    source_group: mankai-ala
    public_note: Contains alpha-linolenic acid; content varies with cultivation.
    notes: Wolffia globosa biomass
    source_reference: '#food-source-3'
substance_relationships:
  - substance: Iron
    relationship: contains
    description: Reported in cultivated Wolffia globosa Mankai.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: mankai|Iron
    presence_status: presence_supported_amount_unavailable
    evidence_source: >-
      The Metabolomic-Gut-Clinical Axis of Mankai Plant-Derived Dietary
      Polyphenols (2021)
    evidence_material: cultivated Wolffia globosa Mankai
    source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC8229908/
    source_reference: '#food-source-2'
  - substance: ALA
    relationship: contains
    description: Contains alpha-linolenic acid; content varies with cultivation.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: mankai|ALA
    presence_status: presence_supported_amount_unavailable
    evidence_source: >-
      Freshwater Macrophytes: A Potential Source of Minerals and Fatty Acids
      (2022)
    evidence_material: Wolffia globosa biomass
    source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC9036174/
    source_reference: '#food-source-3'
substance_review_candidates: []
---
## Overview

Mankai (Wolffia globosa, duckweed) is a functional plant food providing bioavailable iron and true vitamin B12, helping close vegan nutrient gaps.

Within the BRAIN Diet framework, precision sourcing of functional plant foods such as Mankai duckweed (iron, B12) helps narrow vegan nutrient gaps [1].

## Key Nutritional Highlights

- Precision sourcing of functional plant foods such as Mankai duckweed (iron, B12) helps narrow vegan nutrient gaps.

## Food Context

### Synergies

- Part of functional food strategy

### Preparation

- Can be consumed as powder, smoothie addition, or whole
- Important for vegan/vegetarian B12 and iron intake
- Supports nutrient density goals

## Recipes

<FoodRecipes tag="Mankai" />

<NutritionTable details={frontMatter} />

## Substances

<FoodSubstances details={frontMatter} />

## References

[1] Vitamin B₁₂ (also present in Wolffia globosa). Kaplan & Zelicha 2019. [Protein bioavailability of Wolffia globosa duckweed, a novel aquatic plant – A randomized controlled trial](/docs/papers/BRAIN-Diet-References#kaplan_protein_2019)

<span id="food-source-2" />

[2] [The Metabolomic-Gut-Clinical Axis of Mankai Plant-Derived Dietary Polyphenols (2021)](/docs/papers/BRAIN-Diet-References#food_composition_c59c415b3a36)

<span id="food-source-3" />

[3] [Freshwater Macrophytes: A Potential Source of Minerals and Fatty Acids (2022)](/docs/papers/BRAIN-Diet-References#food_composition_144b48850b91)
