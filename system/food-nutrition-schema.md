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
- **sugar_g** – g total sugars per 100 g (when reported by the primary record)  
- **copper_mg** – mg copper per 100 g  

These fields form the **minimum standard panel**; future schema extensions (e.g. additional polyphenol keys) MUST be documented here before use.

---

## Rendering groups (`NutritionTable`)

The UI splits `nutrition_per_100g` into **sub-tables** for readability:

1. **Core nutrition** — energy, protein, fat (total + saturated), carbohydrates, sugars, fibre.  
2. **Key micronutrients** — minerals and vitamins (iron through vitamin K, including copper when present).  
3. **Bioactive compounds** — (a) omega‑3 fatty acids **ALA, EPA, DHA** from `nutrition_per_100g` when present; (b) **`nutrition_supplementary_sources`** (polyphenols, cocoa methylxanthines, literature-only analytes, etc.). Uses columns *Compound / class · Amount · Notes*; values marked `*` are explained in **Source notes** below the block.  
4. **Optional functional metrics** — optional front matter `nutrition_functional_metrics` (e.g. total polyphenol proxies, antioxidant capacity) when a defensible, cited value or qualitative label exists.

---

## Supplementary sources (asterisked values)

When the **overview** mentions a key compound that is not in the primary database (e.g. USDA), add it via **supplementary sources** so the substances list and table stay aligned. See `system/food-page-model.md` (Missing Compound Rule).

Optional front matter block. Each entry **must** include `key`, `label`, `source_note`, plus **either** a numeric `value` with `unit` **or** a qualitative `amount_display` string (e.g. `Varies by product`).

```yaml
nutrition_supplementary_sources:
  - key: astaxanthin_mg
    label: Astaxanthin
    value: 3.2
    unit: mg
    notes: "Carotenoid; content varies by feed and species."   # optional — short “Notes” column in Bioactive table
    source_note: "Literature estimate for farmed Atlantic salmon; … (USDA does not report astaxanthin)."
  - key: epicatechin_qual
    label: Epicatechin
    amount_display: "Varies by product"
    notes: "Usually the dominant monomeric cocoa flavanol."
    source_note: "Qualitative presence; quantitative values only when cited."
```

**Strict structure:**

| Field        | Type   | Required | Rules |
|-------------|--------|----------|--------|
| `key`       | string | Yes      | Snake_case; unique within the page; used for sorting and substances mapping. |
| `label`     | string | Yes      | Display name in the table and in Source notes. |
| `value`     | number | If no `amount_display` | Per 100 g; paired with `unit`. |
| `unit`      | string | If `value` is set | e.g. `mg`, `µg`, `g`. |
| `amount_display` | string | If no numeric `value` | Shown in the Amount column instead of `value` + `unit`. |
| `notes`     | string | No       | Short text for the Bioactive **Notes** column. |
| `source_note`| string | Yes      | Full attribution; listed in **Source notes (bioactive / supplementary)** below the tables. |

**Rendering:** Bioactive sub-table shows compound, amount (with `*` for traceable supplementary rows), and optional `notes`. A disclaimer paragraph appears when bioactive or functional sections are present.

---

## Optional functional metrics

Use for **category-level** or **assay-dependent** metrics (total polyphenols, ORAC, etc.) when appropriate:

```yaml
nutrition_functional_metrics:
  - key: total_polyphenols_proxy
    label: Total polyphenols (Folin proxy)
    amount_display: "Varies by product"
    notes: "Strongly influenced by cocoa percentage and processing."
```

| Field | Type | Required | Rules |
|-------|------|----------|--------|
| `key` | string | Yes | Unique per page. |
| `label` | string | Yes | Row label. |
| `value` / `unit` | number + string | If no `amount_display` | Same as supplementary. |
| `amount_display` | string | If no numeric value | Qualitative or labelled amount. |
| `notes` | string | No | Notes column. |

Any compound in `nutrition_supplementary_sources` must still appear in the **substances list** (table-driven list) when it is a named analyte.

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

