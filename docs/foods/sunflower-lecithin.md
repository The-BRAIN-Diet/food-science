---
id: sunflower-lecithin
fcir_cases:
  - FCIR-011
title: Sunflower Lecithin
sidebar_label: Sunflower Lecithin
description: Choline source alternative to soy lecithin
tags:
  - Food
  - Sunflower Lecithin
  - Vegan
  - Vegetarian
  - Choline
  - Phosphatidylcholine
list_image: /img/foods/sunflower-lecithin/sunflower-lecithin_thumb.webp
composition_status: withdrawn
composition_withdrawn:
  withdrawn_record: USDA FDC 1750349, 'Oil, sunflower'
  identity_failure: edible material and processing state
  reason: >-
    The panel was taken from a record for sunflower oil. Lecithin is the
    phospholipid fraction separated during oil refining, and the two are close
    to complementary: the oil is the triglyceride stream from which the
    phospholipids have been removed. Using the oil's panel therefore
    misdescribes precisely the component the page exists to document. The
    withdrawn values include saturated fat 8.991 g, EPA 2.375 mg and DHA 0 mg,
    all of them properties of the oil. Composition is not carried across from
    the parent seed or its oil.
  queue: system/specialist-composition-review-queue.md
  withdrawn_on: '2026-08-18'
main_image: /img/foods/sunflower-lecithin/sunflower-lecithin_medium.webp
legacy_list_image: /img/foods/sunflower-lecithin/sunflower-lecithin_thumb.webp
legacy_main_image: /img/foods/sunflower-lecithin/sunflower-lecithin_medium.webp
nutrition_supplementary_sources:
  - key: phosphatidylcholine_qual
    label: Phosphatidylcholine
    status: Present — quantity not established
    amount_display: Present
    source_note: >-
      EFSA (2017), Re-evaluation of lecithins (E 322) as a food additive. Table
      2 separately identifies phosphatidylcholine in sunflower and soybean food
      lecithins.
    public_note: >-
      Contains phosphatidylcholine; the proportion varies with the lecithin
      product.
    source_group: lecithin-pc
    public_display: table
    omit_substance_card: false
    evidence_status: supported
    presence_status: presence_supported_amount_unavailable
    source_url: https://efsa.onlinelibrary.wiley.com/doi/10.2903/j.efsa.2017.4742
    notes: food-grade soybean or sunflower lecithin
    source_reference: '#food-source-3'
  - key: choline_qual
    label: Choline
    status: Present — quantity not established
    amount_display: Present
    source_note: >-
      EFSA (2017), Re-evaluation of lecithins (E 322) as a food additive.
      Phosphatidylcholine in sunflower lecithin contains bound choline; no claim
      of free choline or equivalent mass of phosphatidylcholine.
    public_note: >-
      Provides choline bound in phosphatidylcholine; amounts depend on the
      product.
    source_group: lecithin-choline
    public_display: table
    omit_substance_card: false
    evidence_status: supported
    presence_status: presence_supported_amount_unavailable
    source_url: https://efsa.onlinelibrary.wiley.com/doi/10.2903/j.efsa.2017.4742
    notes: sunflower food lecithin
    source_reference: '#food-source-3'
substance_relationships:
  - substance: Phosphatidylcholine
    relationship: contains
    description: >-
      Contains phosphatidylcholine; the proportion varies with the lecithin
      product.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: sunflower-lecithin|Phosphatidylcholine
    presence_status: presence_supported_amount_unavailable
    evidence_source: EFSA (2017), Re-evaluation of lecithins (E 322) as a food additive
    evidence_material: food-grade soybean or sunflower lecithin
    source_url: https://efsa.onlinelibrary.wiley.com/doi/10.2903/j.efsa.2017.4742
    source_reference: '#food-source-3'
  - substance: Choline
    relationship: contains
    description: >-
      Provides choline bound in phosphatidylcholine; amounts depend on the
      product.
    recovery_origin: legacy-tag-migration
    evidence_status: supported
    recovery_audit: sunflower-lecithin|Choline
    presence_status: presence_supported_amount_unavailable
    evidence_source: EFSA (2017), Re-evaluation of lecithins (E 322) as a food additive
    evidence_material: sunflower food lecithin
    source_url: https://efsa.onlinelibrary.wiley.com/doi/10.2903/j.efsa.2017.4742
    source_reference: '#food-source-3'
substance_review_candidates: []
---
## Overview

Sunflower lecithin provides choline for phosphatidylcholine synthesis, offering a soy-free alternative for those avoiding soy.

Within the BRAIN Diet framework, vegans should ensure adequate choline intake (e.g., soy or sunflower lecithin, soy foods, quinoa, broccoli) to support phosphatidylcholine synthesis and downstream LPC-DHA transport for brain delivery.

## Food Context

### Preparation

- Available as supplement
- Soy-free alternative to soy lecithin
- Important for vegan choline intake
- Supports phospholipid-bound omega-3 strategy

## Recipes

<FoodRecipes tag="Sunflower Lecithin" />

<NutritionTable details={frontMatter} />

## Substances

<FoodSubstancesFromTable details={frontMatter} />

## References

[1] Sunflower lecithin provides phosphatidylcholine for choline intake in plant-based diets. Derbyshire & Maes 2023. [The Role of Choline in Neurodevelopmental Disorders—A Narrative Review Focusing on ASC, ADHD and Dyslexia](/docs/papers/BRAIN-Diet-References#derbyshire_role_2023)

[2] Adequate choline supports neurotransmitter synthesis and membrane integrity. Halder & Lal 2021. [Cholinergic System and Its Therapeutic Importance in Inflammation and Autoimmunity](/docs/papers/BRAIN-Diet-References#halder_cholinergic_2021)

<span id="food-source-3" />

[3] [EFSA (2017), Re-evaluation of lecithins (E 322) as a food additive](/docs/papers/BRAIN-Diet-References#food_composition_831b815cb332)
