## BRAIN Diet Food Nutrition Schema

This document defines the **canonical nutrition data schema** for all BRAIN Diet food pages.

Nutrition data on food pages is the **single source of truth** used by downstream systems (recipes, BRS scoring, contribution levels).

---

## Block Name

All food pages MUST define a nutrition block in front matter named:

```yaml
nutrition_per_100g: {}
```

This block stores nutrient quantities **per 100 g edible portion** of the food (or per 100 g edible, drained portion where relevant).

---

## Core Nutrient Fields

All nutrients are optional and only included when there is a **meaningful, sourced value**.

Units are **fixed by field name**:

- **kcal** – `kcal` per 100 g  
- **protein_g** – grams protein per 100 g  
- **fat_g** – grams total fat per 100 g  
- **sat_fat_g** – grams saturated fat per 100 g  
- **carbs_g** – grams carbohydrate (by difference) per 100 g  

- **iron_mg** – mg iron per 100 g  
- **zinc_mg** – mg zinc per 100 g  
- **magnesium_mg** – mg magnesium per 100 g  
- **selenium_ug** – µg selenium per 100 g  
- **calcium_mg** – mg calcium per 100 g  
- **potassium_mg** – mg potassium per 100 g  

- **choline_mg** – mg choline per 100 g  
- **folate_ug** – µg folate (total) per 100 g  
- **vitamin_b12_ug** – µg vitamin B12 per 100 g  
- **vitamin_b6_mg** – mg vitamin B6 per 100 g  

- **omega3_mg** – mg total long‑chain + ALA omega‑3 per 100 g  
- **epa_mg** – mg EPA per 100 g  
- **dha_mg** – mg DHA per 100 g  

These fields form the **minimum standard panel**; future schema extensions (e.g. fibre, sugar, polyphenols) MUST be documented here before use.

---

## Supplementary sources (asterisked values)

When the **overview** mentions a key compound that is not in the primary database (e.g. USDA), add it via **supplementary sources** so the substances list and table stay aligned. See `system/food-page-model.md` (Missing Compound Rule).

Optional front matter block. **Every entry MUST include all five fields.** No extra fields. Future extensions (e.g. `source_url`) must be documented here before use.

```yaml
nutrition_supplementary_sources:
  - key: astaxanthin_mg      # required, snake_case, unique per page
    label: Astaxanthin        # required, display name in table and source notes
    value: 3.2                # required, number, per 100 g
    unit: mg                  # required, display unit (e.g. mg, µg, g)
    source_note: "Literature estimate for farmed Atlantic salmon; carotenoid content varies by feed and species (e.g. Turujman et al., 1997; USDA does not report astaxanthin)."  # required, attribution text
```

**Strict structure (future-proof):**

| Field        | Type   | Required | Rules |
|-------------|--------|----------|--------|
| `key`       | string | Yes      | Snake_case; unique within the page; used for sorting and substances mapping. |
| `label`     | string | Yes      | Display name in the table and in Source notes. |
| `value`     | number | Yes      | Numeric value per 100 g edible portion. |
| `unit`      | string | Yes      | Display unit (e.g. `mg`, `µg`, `g`). |
| `source_note`| string | Yes      | Short attribution; shown below the table and linked to the asterisk in the table row. |

**Rendering:** Table shows a row with amount and asterisk (e.g. `3.2 mg *`). Below the main provenance block, a **Source notes** section lists each entry as `* **Label:** source_note`. Any compound in `nutrition_supplementary_sources` must appear in the **substances list** (table-driven list).

---

## Data Rules

- **Per‑100 g basis only**  
  - All values are normalised to **per 100 g edible portion**.  
  - No per‑serving values are stored in food front matter.

- **Phase 1 data source**  
  - Source is **USDA FoodData Central** (Foundation or SR Legacy records preferred).  
  - Retrieval via the `scripts/fetch-usda-nutrition.mjs` helper or equivalent API calls.  

- **No invented values**  
  - Values MUST come directly from a documented data source.  
  - Do **not** back‑calculate or “estimate” missing nutrients.

- **Omit when not relevant**  
  - If a nutrient is not nutritionally relevant for the food (e.g. **fibre** and **sugar** in plain fish), **omit the field entirely** from `nutrition_per_100g`.  
  - Do **not** add explicit zeros purely for completeness.

- **Use `null` only for “exists but not provided”**  
  - If a nutrient is known to be relevant for the food class but the dataset genuinely does **not** provide a value, the field MAY be included with `null`.  
  - Example: a known omega‑3 source where the chosen record omits DHA.  
  - `null` means “nutrient exists, but no quantitative value in the current dataset”.

- **Omit when unknown**  
  - If you are unsure whether the nutrient exists in meaningful amounts, or the data source is unclear, **omit the field instead of using `null`**.

---

## Example Schema (Front Matter)

```yaml
---
id: salmon
title: Salmon
description: Oily fish rich in EPA/DHA, protein, and B vitamins
tags:
  - Food
  - Salmon
  - Omega-3 Fatty Acids
list_image: /img/icons/ingredients.svg

nutrition_per_100g:
  kcal: 203.1
  protein_g: 20.3
  fat_g: 13.1
  sat_fat_g: 2.3
  carbs_g: 0
  iron_mg: 0.3
  zinc_mg: 0.3
  magnesium_mg: 25.4
  selenium_ug: 22.8
  calcium_mg: 9.4
  potassium_mg: 378.2
  vitamin_b12_ug: 5.7
  omega3_mg: 1444
  epa_mg: 318
  dha_mg: 585

nutrition_source:
  database: USDA FoodData Central
  food_name: Fish, salmon, Atlantic, farm raised, raw
  fdc_id: 2684441
  retrieval_method: API
  basis: per 100 g edible portion
  last_checked: 2026-03-13
---
```

---

## Canonical Source for Downstream Systems

- Food‑level `nutrition_per_100g` is the **only** nutrition store used by:
  - recipe‑level nutrition calculations  
  - contribution level classification  
  - BRS and therapeutic‑area scoring
- Any future changes to nutrient values MUST be made here; other layers should consume, not redefine, this data.

---

## Three sources of truth

How the nutrition block relates to the **Overview** and **Substances list** is defined in `system/food-page-model.md`. The substances list must mirror the database table (including supplementary sources).

