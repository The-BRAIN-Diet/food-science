# Food page build architecture (current implementation)

Factual trace of how a food page is built from source to rendered output, using **docs/foods/beef.md** as the concrete example. No redesign—current system only.

---

## 1. Source content

### 1.1 Markdown body (handwritten or script-inserted)

- **Location:** Everything after the first `---` in `docs/foods/beef.md` until end of file.
- **Content:** Headings (`## Overview`, `### Essential Amino Acid Profile`, `## Recipes`, etc.), paragraphs, bullet lists, and JSX component invocations.
- **Scope:** In MDX, the doc’s front matter is exposed as `frontMatter` in the body; no separate “template” file wraps the body. The body is the single source for section order and prose.

**Beef.md body (conceptually):**

- `## Overview` + one paragraph → **handwritten** (or edited by a human).
- `### Essential Amino Acid Profile` + one paragraph → **inserted by script** `repair-food-pages.mjs` (batch repair) when the page met the EAA rule and was missing the section; template chosen by slug category (beef → animal).
- `<NutritionTable details={frontMatter} />` → **inserted by one-time script** `scripts/add-nutrition-table-block.js` (before the repair run, so beef already had it; repair does not add/remove this).
- `## Recipes` + `<FoodRecipes tag="Beef" />` → **handwritten** (heading + component usage).
- `## Substances` + `<FoodSubstancesFromTable details={frontMatter} />` → **handwritten** (heading); component choice was later switched from `FoodSubstances` to `FoodSubstancesFromTable` by **repair-food-pages.mjs** when the page had `nutrition_per_100g` populated.
- `## Food Context` + optional `### Sourcing`, `### Synergies`, `### Serving` + content → **handwritten** (structure from migration).
- `## Biological Target Matrix` + `<FoodMatrix tag="Beef" />` → **handwritten**.
- `## References` + bullet list → **handwritten**.

So: **body** = human-written sections + human-written component tags + script-inserted EAA block + one-time-inserted NutritionTable block; repair can replace `FoodSubstances` with `FoodSubstancesFromTable` in the body.

### 1.2 Front matter

- **Location:** Between the first `---` and second `---` in `docs/foods/beef.md`.
- **Source:** Mix of:
  - **Handwritten:** `id`, `title`, `sidebar_label`, `description`, `tags`, `list_image`, and any human-only fields.
  - **Pipeline (Script C):** `nutrition_per_100g`, `nutrition_source`, `nutrition_supplementary_sources`, `protein_profile_note`, `amino_acid_strengths`, `limiting_amino_acids`, `complementary_pairings` are **written by** `scripts/update-food-page-frontmatter.mjs` from the payload JSON. Script C **only** merges these keys from payload into front matter; it does not touch the body.
- **Payload origin:** Payload JSON in `scripts/out/beef.json` is produced by:
  - **Script A** (`fetch-usda-nutrition.mjs`): when `USDA_API_KEY` is set, fetches USDA and writes/updates payload; when not set, builds payload from existing front matter. Script A does **not** write the .md file.
  - **Script B** (`enrich-nutrition-from-overview.mjs`): reads page + payload, can add `nutrition_supplementary_sources` entries; writes payload only, not the .md file.

So: **front matter** = human fields + nutrition-related fields that are **only** updated by Script C from the payload (which Script A and Script B build).

### 1.3 Shared templates, MDX components, rules

- **No single “food page template” file:** Section order and headings live in each .md file’s body. There is no layout that injects sections by name.
- **MDX components:** Provided globally by the theme so any .md can use them without a local import. Registration: `src/theme/MDXComponents/index.js` (spreads `@theme-original/MDXComponents` and adds `NutritionTable`, `FoodRecipes`, `FoodSubstancesFromTable`, `FoodMatrix`, etc.). So `<NutritionTable details={frontMatter} />` works because `NutritionTable` is in that map; `frontMatter` is the doc’s front matter exposed by the MDX/doc plugin.
- **Rules/specs:** Writing and structure rules are defined in:
  - `system/food-page-model.md`
  - `docs/foods/.cursor/rules/Foods-Pages.mdc`
  - (Reference) `system/food-nutrition-schema.md`

These influence **how** content is written or repaired; they do not generate the page HTML by themselves.

---

## 2. Section rendering (per visible section)

| Section | What creates it | Type |
|--------|------------------|------|
| **Overview** | Markdown body: `## Overview` + paragraph. Rendered as MDX (heading + paragraph). | Handwritten in the page. |
| **Essential Amino Acid Profile** | Markdown body: `### Essential Amino Acid Profile` + paragraph. For beef this text was **inserted by** `repair-food-pages.mjs` (animal template). | Inserted by script (repair); content is template + slug category. |
| **Nutritional Table (per 100 g)** | Body contains `<NutritionTable details={frontMatter} />`. **Component:** `src/components/NutritionTable.tsx`. Reads `details.nutrition_per_100g`, `details.nutrition_source`, `details.nutrition_supplementary_sources`; uses `src/data/nutritionTableMapping.ts` for order and labels; renders table + provenance. If no nutrition data, returns `null`. | Rendered by component from front matter; block placement in body by one-time script (and/or handwritten). |
| **Recipes** | Body: `## Recipes` + `<FoodRecipes tag="Beef" />`. **Component:** `src/theme/FoodRecipes/index.tsx`. Uses plugin data `category-listing`; finds docs tagged with the given tag (e.g. "Beef"); renders list. | Handwritten heading + component; component renders from tag index. |
| **Substances** | Body: `## Substances` + `<FoodSubstancesFromTable details={frontMatter} />`. **Component:** `src/theme/FoodSubstancesFromTable/index.tsx`. Builds list from `details.nutrition_per_100g` (and supplementary) using same order/labels as NutritionTable; only includes keys with value > 0; resolves each label to a substance doc via category-listing (title/sidebar_label/tags); renders link + description or plain label. | Rendered by component from front matter (table-driven); heading + component usage in body handwritten (or repair swapped component name). |
| **Food Context** | Body: `## Food Context` + optional `### Sourcing`, `### Synergies`, `### Serving` + content. (Formerly "Preparation Notes"; moved to follow Overview.) | Handwritten in the page; structure applied by migration script. |
| **Biological Target Matrix** | Body: `## Biological Target Matrix` + `<FoodMatrix tag="Beef" />`. **Component:** `src/theme/FoodMatrix/index.tsx`. Uses tag to find food’s substance tags, then builds Food → Substances → Biological Targets → Therapeutic Areas table from plugin data. | Handwritten heading + component; component renders from tags and plugin data. |
| **References** | Body: `## References` + bullet list. | Handwritten in the page. |

So: **Overview, Food Context, References** = handwritten. **EAA** = script-inserted (repair). **Nutrition table** = component from front matter. **Substances** = component from front matter (table-driven). **Recipes** and **Biological Target Matrix** = components from tag/doc index.

---

## 3. Pipeline influence (scripts that can modify a food page)

| Script | npm command | Modifies .md? | What it modifies |
|--------|--------------|---------------|------------------|
| **fetch-usda-nutrition.mjs** | `nutrition:fetch` | **No** | Writes/updates **payload JSON** in `scripts/out/<slug>.json` only. With API key: USDA fetch → payload. Without: payload from existing front matter. Does not touch `docs/foods/*.md`. |
| **enrich-nutrition-from-overview.mjs** | `nutrition:enrich` | **No** | Reads page + payload; may add `nutrition_supplementary_sources` to **payload**; writes payload only. Does not touch front matter or body. |
| **update-food-page-frontmatter.mjs** | `nutrition:apply` | **Yes** | **Front matter only.** Reads payload, merges `NUTRITION_KEYS` (nutrition_per_100g, nutrition_source, nutrition_supplementary_sources, protein_profile_note, amino_acid_strengths, limiting_amino_acids, complementary_pairings) into the page’s front matter; **preserves body and all other front matter**. Does not insert/remove sections or change tags by name. |
| **repair-food-pages.mjs** | `nutrition:repair` | **Yes** | **Body + front matter.** (1) **Tags:** Removes downstream-metabolite tags (e.g. SCFAs, Butyrate) from front matter. (2) **Body:** If EAA required and missing, inserts `### Essential Amino Acid Profile` + template text before `<NutritionTable` or `## Recipes`, and merges in EAA-related front matter (e.g. protein_profile_note for animal). (3) **Body:** Replaces `<FoodSubstances details={frontMatter} />` with `<FoodSubstancesFromTable details={frontMatter} />` when page has nutrition data. Does not run fetch/enrich/apply. |
| **validate-food-pages.mjs** | `nutrition:validate` | **No** | Read-only. Runs checks (EAA required when protein ≥5 g/100 g or slug in protein-source list; no downstream metabolite tags); exits 1 if failures. Does not change any file. |

**One-time / ad hoc:**

- **add-nutrition-table-block.js** – Not in npm pipeline. Was run once to insert `\n\n<NutritionTable details={frontMatter} />\n\n` before the second `## ` in every food page that didn’t already have it. Can be run again if new pages are added; it does not run as part of `nutrition:*`.

**Summary:**

- **Front matter (nutrition keys):** Set/updated only by **nutrition:apply** (Script C) from payload.
- **Payload:** Built by **nutrition:fetch** (Script A) and **nutrition:enrich** (Script B); scripts do not write .md.
- **Body (section insertion, component swap):** Modified by **nutrition:repair** (and historically by add-nutrition-table-block.js).
- **Tags:** Modified by **nutrition:repair** (removal of downstream metabolite tags only).
- **Section order:** Not defined by any script; order is whatever is in the .md body (and repair only inserts EAA in one place).

---

## 4. Rendering stack

- **Doc loading:** `@docusaurus/plugin-content-docs` loads `docs/**/*.md` (including `docs/foods/beef.md`). Each .md is compiled as **MDX**; front matter is parsed and exposed as `frontMatter` in the MDX scope.
- **Theme MDX components:** `src/theme/MDXComponents/index.js` exports the component map used for all MDX docs. Food-relevant entries include:
  - `NutritionTable` → `../../components/NutritionTable` (from `src/components/NutritionTable.tsx`)
  - `FoodSubstancesFromTable` → `../FoodSubstancesFromTable`
  - `FoodRecipes` → `../FoodRecipes`
  - `FoodMatrix` → `../FoodMatrix`
  - `FoodSubstances` → `../FoodSubstances`
  (and others). So `<NutritionTable details={frontMatter} />` in the body resolves to that component with the doc’s front matter.
- **Nutrition table:** `NutritionTable` uses `src/data/nutritionTableMapping.ts` (`NUTRIENT_ORDER`, `NUTRIENT_LABELS`) and optional `system/nutrient-reference-values.md`-aligned RDA values in code; renders a single `<section>` with heading “Nutritional Table (per 100 g)”, table, and provenance.
- **Substances list:** `FoodSubstancesFromTable` uses the same mapping to build the list from `details.nutrition_per_100g` (and supplementary), filters to value > 0, resolves labels to docs via `usePluginData("category-listing")`, renders either linked substance cards or plain labels.
- **Recipes / Matrix:** `FoodRecipes` and `FoodMatrix` use `usePluginData("category-listing")` (tag → docs map); they do not read nutrition_per_100g.
- **Layout:** Default Docusaurus doc layout wraps the MDX content; there is no custom “food” layout that injects sections. The only “wrapper” is the theme’s MDXComponents providing the components used in the body.

So: **one layout for all docs**; food pages are just MDX docs that use these components and a conventional section order in the body.

---

## 5. Rules / specs (exact files)

- **system/food-page-model.md** – Canonical model: three sources of truth (Overview, database table, substances list), three truth-layer boundaries (intrinsic / mechanism / strategy), required EAA section rule, missing-compound rule, EAA handling spec, implementation checklist. Referenced by repair and validation logic.
- **docs/foods/.cursor/rules/Foods-Pages.mdc** – Cursor rule for `docs/foods/*.md`: tagging (Food + food name; only intrinsic compounds; no downstream metabolites), three truth layers, required EAA section, page structure (order, components), validation/repair commands. Defines section order and component usage.
- **system/food-nutrition-schema.md** – (If present) Schema for nutrition fields; referenced from Foods-Pages.mdc.
- **scripts/lib/food-page-validation.mjs** – Implements validation rules (EAA required when protein ≥5 g or slug in list; no downstream metabolite tags); used by `validate-food-pages.mjs` and `repair-food-pages.mjs`.
- **scripts/repair-food-pages.mjs** – Encodes EAA templates by slug category (animal/grain/legume/nut_seed/soy/other_plant), insert position (before `<NutritionTable` or `## Recipes`), and tag removal set; no separate “section order” config—order comes from the body.

These files define **writing** and **structure** rules and **automatic repairs**; they do not render the page. Section order in practice is defined by the order of headings and components in the .md body and by the Foods-Pages.mdc “Page structure” list.

---

## 6. Section order (definitive current order)

As implemented in the body of a standard food page (e.g. beef.md) and as specified in Foods-Pages.mdc and `system/food-page-model.md`:

1. **Overview** (`## Overview` + prose)
2. **Food Context** (`## Food Context` + optional `### Sourcing`, `### Synergies`, `### Serving`; framework/practical context—formerly "Preparation Notes", moved up so the page is read as framework first, data second)
3. **Essential Amino Acid Profile** (`### Essential Amino Acid Profile` + prose; required when protein ≥5 g/100 g or commonly protein source—enforced by repair)
4. **Nutrition (per 100 g)** (`<NutritionTable details={frontMatter} />`)
5. **Substances** (`## Substances` + `<FoodSubstancesFromTable details={frontMatter} />` or `<FoodSubstances ... />`)
6. **Recipes** (`## Recipes` + `<FoodRecipes tag="..." />`)
7. **Biological Target Matrix** (`## Biological Target Matrix` + `<FoodMatrix tag="..." />`)
8. **References** (`## References` + list)

This order is **not** generated by a single template; it is the order of headings and JSX in the markdown body. One-time migration script `scripts/migrate-food-context-order.mjs` was used to move Preparation Notes up (as Food Context) and swap Recipes/Substances so Substances appear before Recipes.

---

## 7. Beef audit (docs/foods/beef.md)

- **From markdown body (literal text/headings):**
  - `## Overview` and the one paragraph under it (creatine, CoQ10, heme iron, DIAAS, dopamine, etc.).
  - `### Essential Amino Acid Profile` and the one sentence (“This food provides a complete…”)—this block was **inserted by repair-food-pages.mjs** using the animal template.
  - `## Substances`, `## Recipes`, `## Biological Target Matrix`, `## References` and all bullet text under Food Context and References.
  - The exact tags `<NutritionTable details={frontMatter} />`, `<FoodRecipes tag="Beef" />`, `<FoodSubstancesFromTable details={frontMatter} />`, `<FoodMatrix tag="Beef" />` (FoodSubstancesFromTable was set by repair because beef has nutrition_per_100g).

- **From USDA / front matter (data driving components):**
  - **Nutrition table:** Every row and value come from `nutrition_per_100g` and `nutrition_source` in front matter. Those front matter fields were last written by **Script C** from `scripts/out/beef.json`. The payload was produced by **Script A** (e.g. from USDA “beef” search; current beef.json may still reflect “Beef, cured, corned beef, canned” unless usda-map was used and fetch+apply re-run). So: table content = front matter = payload = Script A (USDA or existing FM) + Script B (optional supplementary) → Script C merge.
  - **Substances list:** Same source. `FoodSubstancesFromTable` reads `details.nutrition_per_100g` (and supplementary), shows only keys with value > 0, resolves labels to substance docs via category-listing. So the list is **table-driven** from front matter; no separate “substances” list in front matter.

- **Section outputs derived from table-driven logic:**
  - **Nutritional Table (per 100 g):** 100% from NutritionTable + front matter (`nutrition_per_100g`, `nutrition_source`, `nutrition_supplementary_sources`); labels/order from `nutritionTableMapping.ts`.
  - **Substances:** List of compounds and links derived from the same nutrition keys (filtered to value > 0) and resolved to substance pages; no hand-maintained list.

- **Why the beef page looks the way it does:**
  - **Overview / Preparation / References:** Written by hand; no script overwrites these.
  - **EAA:** Short generic animal blurb because repair inserted the **animal** template (beef ∈ ANIMAL_SLUGS); repair does not add notable amino acids for beef.
  - **Table:** Shows the values currently in front matter (e.g. B12 0 µg, EPA/DHA 0 if payload came from a product with those zeros); RDA % and provenance string are computed in NutritionTable from the same front matter + RDA constants.
  - **Substances:** Only nutrients with value > 0 are shown (e.g. no EPA/DHA/B12 when zero); links appear when the label matches a substance doc (e.g. “Folate” → Vitamin B9 page via “Folate” tag on that doc).
  - **Recipes:** “no recipes found” because no recipe doc is tagged “Beef” in the category-listing index.
  - **Biological Target Matrix:** Rendered by FoodMatrix from the food’s **tags** (e.g. Creatine, CoQ10, Iron, Zinc, …) and the tag→doc map; not from the nutrition table.

This is the definitive current page-build architecture for food pages as implemented in the codebase today.
