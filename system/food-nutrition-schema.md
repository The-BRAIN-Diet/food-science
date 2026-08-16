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

- **fibre_g** – g total dietary fibre per 100 g  
- **sugar_g** – g total sugars per 100 g (when reported by the primary record)

- **iron_mg** – mg iron per 100 g  
- **zinc_mg** – mg zinc per 100 g  
- **magnesium_mg** – mg magnesium per 100 g  
- **phosphorus_mg** – mg phosphorus per 100 g  
- **manganese_mg** – mg manganese per 100 g  
- **selenium_ug** – µg selenium per 100 g  
- **calcium_mg** – mg calcium per 100 g  
- **potassium_mg** – mg potassium per 100 g  
- **copper_mg** – mg copper per 100 g  

- **choline_mg** – mg choline per 100 g  
- **folate_ug** – µg folate (total) per 100 g  
- **vitamin_b12_ug** – µg vitamin B12 per 100 g  
- **vitamin_b6_mg** – mg vitamin B6 per 100 g  
- **vitamin_b2_mg** – mg riboflavin (vitamin B2) per 100 g  
- **vitamin_e_mg** – mg vitamin E as α-tocopherol per 100 g  
- **vitamin_k_ug** – µg vitamin K (phylloquinone) per 100 g  

- **linoleic_g** – g linoleic acid (18:2 n-6 cis,cis) per 100 g  
- **ala_mg** – mg ALA per 100 g  
- **epa_mg** – mg EPA per 100 g  
- **dha_mg** – mg DHA per 100 g  
- **omega3_mg** – mg total long‑chain + ALA omega‑3 per 100 g (aggregate; not a substance card)

These fields form the **primary compositional panel** stored in `nutrition_per_100g`. Do **not** invent a value because a substance page, Overview sentence, or related food mentions the compound. Future schema extensions MUST be documented here before use.

---

## Composition and provenance classes

These classes describe **how a composition value is sourced and how strongly it may be claimed**. They operate **within and across** the canonical page layers defined in `system/food-page-model.md` (Overview, Database nutrition table, Substances list). They **do not replace** those layers and **must not** be labelled the “Three Sources of Truth.”

Keep the classes distinct. Do not convert ontology presence into invented composition values, do not copy values from a related food, and do not treat a table row as a BRS mapping.

| Class | What it is | Where it operates | Required fields |
|-------|------------|-------------------|-----------------|
| **1. Standard compositional** | Conventional energy, macronutrients, vitamins, minerals, and fatty acids with quantitative values from USDA FoodData Central or another named authoritative composition database. | Database nutrition table: `nutrition_per_100g` + `nutrition_source` | value, unit (from key), basis, named source |
| **2. Extended analytical** | BRAIN-relevant amino acids, individual fatty acids, nutrient forms, fibres, polyphenols, and other bioactives supported by analytical food-composition data or **food-specific** literature for compounds USDA does not capture. | Database nutrition table: individual fatty-acid keys in `nutrition_per_100g`, plus `nutrition_supplementary_sources` | Quantitative: value, unit, source. Qualitative: explicit status (canonical: `Present — quantity not established`) and `source_note` |
| **3. Ontology admission** | Whether a verified table compound is also admitted to the Substances list and, if needed, a canonical substance page. | Substances list + canonical substance pages | Card only after a supported table row. Must **not** invent a number. Not a BRS mapping. Not every table row is admitted. |

**Reconciliation (directional):**

- Every Substances card must resolve to a supported nutrition-table row.
- Not every nutrition-table row requires a Substances card.
- Mere database detection, especially at trace levels, does not automatically justify ontology inclusion.
- Every headline Overview compound must resolve to a supported table row or be flagged for verification.
- Unsupported Overview compounds must be removed or qualified; they must not generate cards or canonical pages.
- Values must never be copied from a related food.

**Worked example:** `docs/foods/almonds.md` (USDA SR Legacy FDC 170567). Fetch prefers the **richest mapped panel** among Foundation / SR Legacy / Branded candidates (`scripts/lib/usda-nutrient-extract.mjs`), so an abbreviated branded or Foundation hit cannot drop magnesium, phosphorus, manganese, copper, riboflavin, vitamin E, or linoleic acid when a fuller USDA record supplies them.

**Build-time check:** `npm run nutrition:validate` runs `scripts/lib/food-truth-reconciliation.mjs` across all food pages. Post-apply layer reporting: `npm run nutrition:reconcile-layers`.

## Rendering groups (`NutritionTable`)

The UI splits `nutrition_per_100g` into **sub-tables** for readability:

1. **Core nutrients** — energy, protein, fat (total + saturated), carbohydrates, sugars, fibre.  
2. **Vitamins and minerals** — minerals and vitamins (iron through vitamin K, including phosphorus, manganese, copper, riboflavin, and vitamin E when present).  
3. **Fatty acids and extended BRAIN-relevant substances** — (a) individual fatty acids **linoleic acid, ALA, EPA, DHA** from `nutrition_per_100g` when present; (b) **`nutrition_supplementary_sources`** (polyphenols, nutrient forms, literature-only analytes, etc.). Uses columns *Compound / class · Amount · Notes*; values marked `*` are explained in **Source notes** below the block. Qualitative rows use `Present — quantity not established` when presence is evidenced but no defensible per-100 g value exists.  
4. **Optional functional metrics** — optional front matter `nutrition_functional_metrics` (e.g. total polyphenol proxies, antioxidant capacity) when a defensible, cited value or qualitative label exists.
5. **Representative authorised specifications** — for source-variable specialist products that must not use a USDA proxy (currently algal oil). Front matter `nutrition_authorised_specifications` renders Formulation · DHA · EPA · Interpretation. Values are **regulatory minima**, not measured averages, and must not be inferred from a different oil.

Do **not** invent energy, total fat, or other USDA panel values for a specialist product that has no matching food-composition record.

---

## Supplementary sources (asterisked values)

When the **Overview** mentions a headline compound that is not in the primary database (e.g. USDA), verify it and, if curated, add it via **supplementary sources**. See `system/food-page-model.md` (Missing Compound Rule). Mentions alone do not create Substances cards.

Optional front matter block. Each entry **must** include `key`, `label`, `source_note`, plus **either** a numeric `value` with `unit` **or** a qualitative `amount_display` / `status` string (canonical qualitative status: `Present — quantity not established`).

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
| `value`     | number | If no `amount_display` or `status` | Per 100 g; paired with `unit`. |
| `unit`      | string | If `value` is set | e.g. `mg`, `µg`, `g`. |
| `amount_display` | string | If no numeric `value` | Shown in the Amount column instead of `value` + `unit`. |
| `status`    | string | If no numeric `value` and no `amount_display` | Explicit qualitative status. Use `Present — quantity not established` when presence is evidenced but quantity is not. |
| `notes`     | string | No       | Short text for the extended-table **Notes** column. |
| `source_note`| string | Yes      | Full attribution; listed in **Source notes (extended / supplementary)** below the tables. Food-specific; not inferred from a related food. |

**Rendering:** The extended sub-table shows compound, amount (with `*` for traceable supplementary rows), and optional `notes`. A disclaimer paragraph appears when extended or functional sections are present.

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

Named analytes in `nutrition_supplementary_sources` are table rows. They become Substances cards only when admitted to the Substances layer; supplementary presence alone does not require a card, and a card still requires the table row.

---

## Data Rules

- **Per‑100 g basis only**  
  - All values are normalised to **per 100 g edible portion**.  
  - No per‑serving values are stored in food front matter.

- **Phase 1 data source**  
  - Source is **USDA FoodData Central** (Foundation or SR Legacy records preferred).  
  - Retrieval via `scripts/fetch-usda-nutrition.mjs`: inspect up to eight ranked candidates and keep the **richest mapped panel**, so abbreviated Foundation/branded records cannot silently drop BRAIN-relevant nutrients.  
  - `scripts/usda-map.json` may pin the search query (e.g. almonds → `Nuts, almonds`).  

- **No invented values**  
  - Values MUST come directly from a documented data source.  
  - Do **not** back‑calculate, estimate, or infer values from ontology tags, overview prose, or a related food.  
  - If a recognised substance lacks a defensible quantity, keep it as an extended qualitative row (`Present — quantity not established`) with a food-specific `source_note` — do not invent a number.

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

## Three Sources of Truth (canonical page layers)

How the nutrition block relates to the **Overview** and **Substances list** is defined in `system/food-page-model.md`. Those three layers — Overview, Database nutrition table, Substances list — are the canonical Three Sources of Truth. The composition and provenance classes above do not replace them. Every Substances card requires a matching supported table row; not every table row requires a card.

