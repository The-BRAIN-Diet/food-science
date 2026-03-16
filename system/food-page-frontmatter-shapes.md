# Food Page Front Matter Shapes

Canonical YAML structure for BRAIN Diet food pages under the three-sources-of-truth model. See `system/food-page-model.md` for layer rules.

---

## Animal food (e.g. salmon, eggs, yogurt)

```yaml
---
id: salmon
title: Salmon
sidebar_label: Salmon
description: Oily fish rich in EPA/DHA, protein, and B vitamins
tags:
  - Food
  - Salmon
  - Omega-3 Fatty Acids
  - EPA
  - DHA
  - Vitamin B12
  - Selenium
  - Astaxanthin
list_image: /img/icons/ingredients.svg
protein_profile_note: Complete essential amino acid profile.

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

# Optional: explicit key compounds for Script B enrichment (deterministic). If absent, Script B falls back to **bold** phrases in ## Overview.
overview_key_compounds:
  - EPA
  - DHA
  - Vitamin B12
  - Selenium
  - Astaxanthin

# Optional: only when overview mentions a compound not in the primary DB
nutrition_supplementary_sources:
  - key: astaxanthin_mg
    label: Astaxanthin
    value: 3.2
    unit: mg
    source_note: "Literature estimate for farmed Atlantic salmon; carotenoid content varies by feed and species (e.g. Turujman et al., 1997; USDA does not report astaxanthin)."
---
```

**Notes for animal foods**

- **tags**: Food, food name, and substances that appear in the nutrition table (and that have substance pages / BRS relevance). Do **not** list all essential amino acids (no Tryptophan, Lysine, etc. unless mechanistically notable).
- **protein_profile_note**: Single string; e.g. `Complete essential amino acid profile.`
- **overview_key_compounds**: Optional list of compound names (e.g. EPA, DHA, Astaxanthin). Used by Script B as the deterministic enrichment trigger; if absent, Script B falls back to **bold** phrases in the Overview section.
- **nutrition_supplementary_sources**: Omit if not needed. When present, each entry must have `key`, `label`, `value`, `unit`, `source_note` (all required).

---

## Plant food (e.g. lentils, oats)

```yaml
---
id: lentils
title: Lentils
sidebar_label: Lentils
description: Legume rich in protein, fibre, folate, iron, and prebiotics
tags:
  - Food
  - Lentils
  - Vegan
  - Vegetarian
  - Iron
  - Magnesium
  - Zinc
  - Potassium
list_image: /img/icons/ingredients.svg
amino_acid_strengths: Lysine-rich relative to grains; good plant source of iron, zinc, and folate.
limiting_amino_acids: Lower in methionine and cysteine (DIAAS 65–70).
complementary_pairings: Rice, oats, barley, or other grains to complete essential amino acid profile.

nutrition_per_100g:
  kcal: 350.9
  protein_g: 23.6
  fat_g: 1.9
  carbs_g: 62.2
  iron_mg: 7.2
  zinc_mg: 3.9
  magnesium_mg: 106.7
  calcium_mg: 61.9
  potassium_mg: 948.9

nutrition_source:
  database: USDA FoodData Central
  food_name: Lentils, dry
  fdc_id: 2644283
  retrieval_method: API
  basis: per 100 g dry weight
  last_checked: 2026-03-13
---
```

**Notes for plant foods**

- **tags**: Food, food name, diet tags (Vegan/Vegetarian if applicable), and substances that appear in the nutrition table. Do **not** list every amino acid.
- **amino_acid_strengths**: Single string; e.g. lysine-rich, notable minerals.
- **limiting_amino_acids**: Single string; e.g. lower in methionine and cysteine.
- **complementary_pairings**: Single string; e.g. rice, oats, or other grains.
- **nutrition_supplementary_sources**: Same structure as animal when used.

---

## Required vs optional

| Field | Animal | Plant |
|-------|--------|--------|
| id, title, sidebar_label, description | Required | Required |
| tags | Required (Food + name + table-driven substances) | Required |
| list_image | Required | Required |
| protein_profile_note | Optional but recommended | — |
| amino_acid_strengths | — | Optional but recommended |
| limiting_amino_acids | — | Optional but recommended |
| complementary_pairings | — | Optional but recommended |
| nutrition_per_100g | Required for nutrition-layer pages | Required |
| nutrition_source | Required when nutrition_per_100g present | Required |
| overview_key_compounds | Optional (deterministic trigger for Script B; else bold phrases in Overview) | Optional |
| nutrition_supplementary_sources | Optional (when missing compound added from literature) | Optional |

---

## Page body (shared)

After the closing `---` and any MDX import:

1. **Overview** – Short paragraph; key bioactives only. Do not repeat the protein profile here if the next subsection is **Essential Amino Acid Profile** (that subsection is the single place for it).
2. **Essential Amino Acid Profile** (when required) – See EAA Handling Specification in `system/food-page-model.md`.
3. `<NutritionTable details={frontMatter} />`
4. **Recipes** – `<FoodRecipes tag="…" />`
5. **Substances** – `<FoodSubstancesFromTable details={frontMatter} />`
6. Preparation Notes, Sourcing (if needed), Biological Target Matrix, References.
