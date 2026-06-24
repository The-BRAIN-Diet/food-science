# Food Page Schema (Canonical)

Consolidated schema for BRAIN Diet food pages. **Worked example:** `docs/foods/dark-chocolate.md`.  
**Front matter shapes:** `system/food-page-frontmatter-shapes.md`. **Nutrition fields:** `system/food-nutrition-schema.md`.  
**Three truth layers and EAA rules:** `system/food-page-model.md` (still authoritative for substance/tag boundaries).

Validation: `npm run nutrition:validate` (baseline) · `npm run nutrition:validate -- --canonical` (canonical structure gate for migration batches).

---

## Design principle

Food pages use **three sources of truth** that must stay aligned:

1. **Overview + Key Nutritional Highlights** — editorial, decision-relevant context (intrinsic compounds only).
2. **Nutrition table** — quantitative layer (`nutrition_per_100g`, supplementary sources, functional metrics).
3. **Substances list** — union of editorial tags and analytical table rows via `<FoodSubstancesFromTable />`.

Mechanism outcomes (e.g. SCFAs from fibre fermentation) belong in prose as outcomes, never as food substances or tags.

---

## Body section order (canonical)

Order matches `dark-chocolate.md` — context before data, recipes before the nutrition block:

| # | Section | Heading / component | Required |
|---|---------|---------------------|----------|
| 1 | Overview | `## Overview` | Yes |
| 2 | Key Nutritional Highlights | `## Key Nutritional Highlights` | Yes (canonical) |
| 3 | Food Context | `## Food Context` | Yes (canonical) |
| 4 | Recipes | `## Recipes` + `<FoodRecipes />` | Yes (canonical) |
| 5 | Nutrition | `<NutritionTable details={frontMatter} />` | When nutrition layer present |
| 6 | Substances | `## Substances` + `<FoodSubstancesFromTable />` | When nutrition layer present |
| 7 | References | `## References` | Yes (canonical) |

**Food Context** uses only subsections with meaningful, food-specific content. Standard subsections (include when relevant):

- `### Sourcing`
- `### Synergies`
- `### Preparation`

Additional food-specific subsections are allowed (e.g. `### Ripeness`, `### Polyphenol oxidase (PPO) and smoothie pairing`) when evidence-backed.

**Essential Amino Acid Profile** — when required (protein ≥ 5 g/100 g or protein-source slug), place as `### Essential Amino Acid Profile` **inside Food Context** (before Recipes). See EAA rules in `food-page-model.md`.

---

## Overview

- **Two paragraphs**, ~90–160 words total.
- Paragraph 1: category + nutritional identity; 3–6 intrinsic compounds (no table numbers).
- Paragraph 2: strongest evidence-backed relevance + brief limitation if needed; BRAIN Framework positioning where useful.
- Inline numeric citations `[1]`, `[2]` when claims need evidence.
- **Must not:** pairing advice, sourcing, preparation, nutrient table dumps, downstream metabolites as if present in the food.

---

## Key Nutritional Highlights

Immediately after Overview. **3–6 bullets**, one sentence or short clause each.

Purpose: fast, decision-relevant summary — not a repeat of the nutrition table.

**Include when useful:**

- Distinctive bioactives or mechanistic relevance (with `[n]` citations).
- Relevant constraints (e.g. heavy metals, conversion limits, portion context).
- **Per-100 g density** — e.g. dark chocolate fibre/iron per 100 g from `nutrition_per_100g` (see worked example below).

**Do not include:**

- Generic category filler (“provides carbohydrates”, “low in saturated fat” for most plants).
- Preparation effects (belong in Food Context / Preparation).
- Full amino-acid lists.

---

## Key Nutritional Highlights — worked example (dark chocolate)

```markdown
- Fibre and iron support micronutrient density per 100 g ingredient (fibre ~10.5 g; iron ~7.9 mg).
```

This line means **per 100 g**, dark chocolate is relatively fibre- and iron-dense (values from `nutrition_per_100g` / USDA).

---

## Food Context

Practical framework: sourcing, synergies, preparation. Quality over completeness — omit empty subsections.

---

## References

- Every bullet must include a link: `/docs/papers/BRAIN-Diet-References#citationKey`.
- Citation keys must exist in `static/bibtex/BRAIN-diet.bib`.
- Plain-text-only reference bullets are invalid.
- Each bullet must state the **paper title** (not just author/year repeated). Use inline numeric citations `[1]`, `[2]` in Overview and Key Nutritional Highlights where claims need evidence.
- Verify the entry **survives deduplication** on the global references page (unique DOI/URL).

**Worked example (beef-style):**

```markdown
- [1] Avgerinos et al. 2018 – Creatine supplementation and cognitive performance [Avgerinos et al. 2018 – Creatine supplementation and cognitive performance](/docs/papers/BRAIN-Diet-References#avgerinos_creatine_2018)
```

**Worked example (claim-style, dark chocolate):**

```markdown
- [1] High-flavonoid intake induces cognitive improvements linked to changes in serum brain-derived neurotrophic factor [Neshatdoust et al. 2016](/docs/papers/BRAIN-Diet-References#neshatdoust_high-flavonoid_2016)
```

Both forms include a readable title before the bibliography link; stub forms like `- [1] FAO 2013 [FAO 2013](...)` are invalid.

---

## Front matter (summary)

Required for all food pages: `id`, `title`, `sidebar_label`, `description`, `tags` (includes `Food` + food name), `list_image`.

Nutrition layer (when populated): `nutrition_per_100g`, `nutrition_source`. Optional: `nutrition_supplementary_sources`, `nutrition_functional_metrics`, `protein_profile_note`, `amino_acid_strengths`, `limiting_amino_acids`, `complementary_pairings`.

See `system/food-page-frontmatter-shapes.md` for full YAML examples.

---

## Validation modes

| Command | Checks |
|---------|--------|
| `npm run nutrition:validate` | EAA when required; no downstream-metabolite tags |
| `npm run nutrition:validate -- --canonical` | Baseline + canonical section order, KNH, components, bibliography-linked references |
| `npm run nutrition:validate -- --canonical --slug almonds` | Canonical checks for one page only |

Canonical mode is intended for **migration batches** (e.g. letter A). Full corpus canonical compliance is incremental; baseline mode stays green for unrelated edits.

---

## Related files

| File | Role |
|------|------|
| `docs/foods/.cursor/rules/Foods-Pages.mdc` | Authoring rules for agents |
| `scripts/lib/food-page-validation.mjs` | Validation implementation |
| `scripts/repair-food-pages.mjs` | EAA insert, tag cleanup, substances component |
| `cue/brain/` | Mechanism schemas only (no food CUE yet) |

Future: optional `cue/brain/food.cue` for front-matter typing; body structure remains JS-validated.
