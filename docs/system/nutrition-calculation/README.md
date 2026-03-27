# Nutrition calculation (recipe pages)

This document describes how **aggregated recipe nutrition** is computed and displayed on recipe pages via `<RecipeFoods />`, so editorial copy and the implementation stay aligned.

## Data source

- Each **food page** stores `nutrition_per_100g` (typically from **USDA FoodData Central** via the site’s curation workflow).
- Recipe totals **do not invent new chemistry**; they **combine** those per-100 g panels using the rules below.

## Two modes

| Mode | When | What gets summed |
|------|------|------------------|
| **Scaled to recipe** | Front matter includes `recipe_nutrition` with `ingredients[].food` + `grams` | For each ingredient: `(nutrient per 100 g × grams) ÷ 100`, summed across foods. |
| **100 g per linked food** | No `recipe_nutrition` | For each **tagged food** linked to a food page: the site **adds that food’s per-100 g panel once** (as if 100 g of each tagged ingredient). **Not** scaled to real portions. |

**Servings:** If `recipe_nutrition.servings` is greater than 1, **displayed** amounts in the table are **per serving** (totals are divided by `servings`).

Implementation references:

- `src/theme/RecipeFoods/index.tsx` — UI, legacy vs weighted branching, fibre/polyphenol rows.
- `src/utils/recipeNutritionWeighted.ts` — `computeWeightedNutrients`, trace thresholds.

## Table columns (recipe nutrition block)

| Column | Definition |
|--------|------------|
| **Nutrient / class** | Human-readable label (Energy, Protein, Iron, …). |
| **Foods in recipe** | Food pages that contribute to that row (hyperlinked). In weighted mode, only foods with a non-trace contribution for that nutrient; in legacy, foods whose panel includes that key. |
| **Total** | Header: **“Total (scaled to recipe)”** or **“Total (100 g per linked food)”** depending on mode. Numeric total for the row; **trace** when below reporting thresholds (weighted mode only). |
| **% RDA aggregate** | **Only for core + micronutrient keys** (see keys below). `(amount ÷ adult reference) × 100`. Most nutrients use fixed adult reference values in `RecipeFoods`; **protein is shown as a range** using a fixed g/kg/day coefficient across a body-weight range. **—** for polyphenol proxy rows. |

## Nutrient keys included in the main table

- **Core:** `kcal`, `protein_g`, `fat_g`, `sat_fat_g`, `carbs_g`, `sugar_g`, `fibre_g` (see also dedicated fibre row below).
- **Micronutrients:** `iron_mg`, `zinc_mg`, `magnesium_mg`, `selenium_ug`, `calcium_mg`, `potassium_mg`, `copper_mg`, `choline_mg`, `folate_ug`, `vitamin_b12_ug`, `vitamin_b6_mg`, `vitamin_e_mg`, `vitamin_k_ug`.

Defined in `src/data/nutritionTableMapping.ts` (`CORE_NUTRIENT_KEYS`, `MICRONUTRIENT_KEYS`).

## Fibre row

- **Weighted:** Sum of `fibre_g` contributions using the same `(per 100 g × g) / 100` rule per `recipe_nutrition` ingredient.
- **Legacy:** Sum of each linked food’s `fibre_g` per-100 g value (unscaled).
- **% RDA:** Not shown (—).

## Polyphenols (proxy) row

- Sums **mg** from food front matter **supplementary** / **functional metric** entries whose labels match an internal polyphenol-related pattern (not a full FDC polyphenol database).
- May show qualitative text when only `amount_display` is present.
- **% RDA:** Not shown (—).

## Trace

Weighted totals below absolute or %RDA floors display as **trace** (see `isTraceTotal` / `isTraceContribution` in `recipeNutritionWeighted.ts`).

## Editorial: `recipe_nutrition` (YAML)

```yaml
recipe_nutrition:
  servings: 4
  ingredients:
    - food: Extra Virgin Olive Oil   # must match food page title or tag label
      grams: 62
    - food: Rosemary
      grams: 1
```

- `grams` = **grams for the full recipe** (all servings combined), unless the team standardises otherwise—must match `RecipeFoods` / `computeWeightedNutrients` behaviour.
- `food` must resolve to a food document via title or tag label.

See also: `docs/recipes/.cursor/rules/Recipe-Pages.mdc`.

## User-facing copy

Introductory paragraphs under **Recipe nutrition** are maintained in `RecipeFoods` and should stay consistent with this document when behaviour changes.
