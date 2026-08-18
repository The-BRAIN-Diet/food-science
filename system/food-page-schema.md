# Food Page Schema (Canonical)

Consolidated schema for BRAIN Diet food pages. **Worked example:** `docs/foods/dark-chocolate.md`.  
**Front matter shapes:** `system/food-page-frontmatter-shapes.md`. **Nutrition fields:** `system/food-nutrition-schema.md`.  
**Three Sources of Truth (page layers) and EAA / content-boundary rules:** `system/food-page-model.md`. **Composition and provenance classes:** `system/food-nutrition-schema.md`.

Validation: `npm run nutrition:validate` (baseline) · `npm run nutrition:validate -- --canonical` (canonical structure gate for migration batches).

Letter-audit **editorial** records (role, evidence type, depth): `system/food-page-letter-audit-schema.md`. That schema does not change reference rendering and does not start a letter batch.

---

## Food-page purpose

A food page explains what is **distinctive** about that food without repeating generic nutrient biology.

A food may be included because it is:

- nutritionally or chemically distinctive;
- representative of a food group or dietary pattern;
- interesting through its matrix, formulation, or preparation;
- useful in BRAIN Diet recipes.

**Recipe usefulness is sufficient.** Do not manufacture biological importance. It is acceptable to describe a food neutrally as a meal base, binder, or culinary-support ingredient with limited distinctive nutritional identity.

---

## Design principle

Food pages use the canonical **Three Sources of Truth** from `system/food-page-model.md`. These are the **rendered** layers:

1. **Overview** — editorial identity narrative (intrinsic identity constituents only). Key Nutritional Highlights is a summary attached to Overview, not a fourth source of truth. Headline identity compounds must resolve to a rendered table row or enter an explicit research-queue state. Numerical Highlights must match rendered-table rounding.
2. **Database nutrition table** — the **rendered** composition table from at least one valid representation: populated `nutrition_per_100g` (standard database composition); `nutrition_authorised_specifications` (variable or formulated specialist products); and/or supported qualitative `nutrition_supplementary_sources`. An empty `nutrition_per_100g: {}` is implementation compatibility only and is not the compositional source. Hidden/internal records do not count as table admission. Rendered headings: **Core nutrients**, **Key vitamins and minerals**, **Bioactive compounds**, plus specialist specification tables when used.
3. **Substances list** — ontology cards via `<FoodSubstancesFromTable />` that mirror the validated, meaningful union. Every **rendered** card must resolve to a corresponding **rendered** quantitative or explicit qualitative table row. Not every table row requires a card.

Composition/provenance classes and Intrinsic / Mechanism / Strategy remain separate models and must not be called the Three Sources of Truth.

Mechanism outcomes (e.g. SCFAs from fibre fermentation) belong in prose as outcomes, never as food substances or tags. Pairing compounds, microbial outcomes, and downstream metabolites must not be represented as intrinsic food content. That placement rule is the separate **Intrinsic / Mechanism / Strategy** content-boundary model; it does not replace the Three Sources of Truth and does not by itself admit an entity to the Substances list.

Do not yet formalise a Food BRS Matrix. Mechanistic content must not be deleted before that destination is defined.

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

Editorial register, length and what must not appear in Overview prose are defined in the **Overview editorial standard** in `system/food-page-model.md`. Almonds is the calibration example. Length follows recommended page depth (`short` / `standard` / `extended` in `system/food-page-letter-audit-schema.md`), which still governs how much distinctive story a page may carry; it does not authorise dumping tables or trial reports into Overview.

- Mention macros or micronutrients when they **materially characterise** the food, using values consistent with the rendered table. Do not repeat their general biology.
- Prioritise: characteristic substances and chemical forms; distinctive composition; direct matrix effects; preparation or processing; formulation variability; antinutrients and bioavailability; practical dietary or culinary role.
- Headline identity compounds still follow Overview → rendered table → editorial Substance admission. Not every chemical noun is an identity constituent.
- Do not manufacture biological importance. Culinary-support foods may be described as a meal base, binder, or culinary-support ingredient.
- General substance biology belongs on Substance pages and, where relevant, the future Food BRS Matrix.
- Inline numeric citations `[1]`, `[2]` when claims need evidence. Synthesise studies; do not narrate them one by one.
- **Must not:** nutrient table dumps; invented quantities; values copied from a substitute food; downstream metabolites as if present in the food; presenting supplement, substance-class, or neighbouring-food evidence as direct evidence for the food.
- Detailed sourcing, pairing how-to, and recipe method remain in Food Context / Recipes. Overview may name a distinctive matrix or culinary role without becoming a recipe.

---

## Key Nutritional Highlights

Immediately after Overview. **3–6 bullets**, one sentence or short clause each.

Register and what must not appear are defined in the **Key Nutritional Highlights Layer** in `system/food-page-model.md`. Highlights are not a fourth Source of Truth. Almonds is the calibration example.

Purpose: fast, decision-relevant takeaways — not a repeat of the nutrition table and not a trial log. When a bullet cites a quantity, it **must** match the rendered table and its displayed rounding.

**Include when useful:**

- Distinctive bioactives or food-specific findings in plain language (with `[n]` citations).
- Relevant constraints (e.g. heavy metals, conversion limits, portion context).
- A per-100 g figure only when it is genuinely useful to interpretation (see dark-chocolate worked example).

**Do not include:**

- Generic category filler (“provides carbohydrates”, “low in saturated fat” for most plants).
- Full amino-acid lists.
- Trial doses, durations, detailed comparators, biomarker lists, or study methods (those belong in the reference annotation).
- Recipe method dumps (belong in Food Context / Preparation). Culinary-support pages may note culinary role. Preparation that *is* the food’s distinctive chemistry may be summarised in one bullet.

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

## Page depth

Use **short** / **standard** / **extended** as an editorial recommendation, not a canonical validation gate:

- **Short:** culinary-support or compositionally ordinary food (e.g. white pasta, white rice, refined bread, recipe starches; cucumber and lettuce need no invented neurological narrative).
- **Standard:** meaningful food-group, substance, or preparation story.
- **Extended:** several distinctive, well-supported properties (e.g. potatoes, onions, garlic, tomatoes, herbs, cocoa, tea, coffee, fermented foods — only where food-specific evidence supports it).

These examples guide research. They do not pre-authorise claims or Substance cards. Keep simple foods simple.

---

## References

**Bibliographic core (project-wide):** `[n] Author(s) (Year). [{Paper title}](/docs/papers/BRAIN-Diet-References#citationKey)`

**Food-page extension:** References retain the project-wide Author (Year) and linked-title core. Food pages may append a concise food-specific finding or trial highlight because study detail is normally omitted from the Overview.

Format: `[n] Author(s) (Year). [{Paper title}](/docs/papers/BRAIN-Diet-References#citationKey). Food-relevant finding or trial highlight.`

The annotation is optional. When present it may state a direct food finding, trial dose/design and principal result, analytical finding, preparation finding, or a necessary scope limitation. Do not lead with dietary advice. State what the source found; practical guidance belongs in Overview, Highlights or Preparation.

Do not: use abstracts from neighbouring BibTeX entries; describe a generic mechanism as direct food evidence; infer a food quantity from total fibre or another parent measure; make the annotation broader than the paper; retain a reference merely because it was previously present.

Join only by the exact citation key. Numbering, anchors and bibliography links stay on that key.

Unmigrated later-letter pages may still use the previous explanation-first order until that letter is rewritten. That is a migration state, not a second reference system.

**Editorial quality (rules, not presentation):**

- Minimum **two relevant** references per food page. This is a quality floor, not a reason to lengthen the page or to pad weak citations.
- Prefer, in order: (1) direct food/formulation analysis; (2) direct human evidence involving the food; (3) evidence about a characteristic substance or matrix confirmed in that food; (4) food-specific preparation evidence; (5) a high-quality food-specific review.
- Composition databases establish ordinary nutrient content. Fibre, protein, fat, carbohydrate, vitamin, and mineral quantities shown in the table do not require separate papers.
- Generic mechanism papers cannot satisfy the minimum unless they are explicitly labelled as context and genuinely needed. Never present supplement, substance-class, or neighbouring-food evidence as direct evidence for the food.
- Flag weak evidence rather than padding references.

**Join rule:** Every food-page annotation is joined to BibTeX **only by the exact citation key** in `/docs/papers/BRAIN-Diet-References#key`. Resolution must not use array position, neighbouring entries, or fallback order. If that key has no `abstract`, use a restrained title-derived placeholder or an accurate same-page citation sentence **without changing the bibliographic core**. It must **never** borrow another entry’s abstract. Missing abstracts produce no invented abstract-derived summary.

**Citation correctness and citation relevance are separate checks.** A correctly joined key can still be scientifically irrelevant (`system/food-page-letter-audit-schema.md`).

**Worked example (Almonds calibration):**

```markdown
[1] Jung et al. (2018). [The effect of almonds on vitamin E status and cardiovascular risk factors in Korean adults: a randomized clinical trial](/docs/papers/BRAIN-Diet-References#jung_almonds_vitamin_e_2018). Randomized trial in overweight/obese Korean adults: 56 g almonds/day increased plasma α-tocopherol and lowered total, LDL and non-HDL cholesterol versus an isocaloric cookie.
```

Invalid forms: bullet prefixes (`- [1] …`), author/year inside the link only, duplicated beef-style text, stub links without a paper title, or leading dietary advice in the annotation.

---

## Front matter (summary)

Required for all food pages: `id`, `title`, `sidebar_label`, `description`, `tags` (includes `Food` + food name), `list_image`. The `description` field is the Foods Index identity line; see **Food-index descriptions** in `system/food-page-model.md`.

Nutrition layer (when present): at least one valid compositional representation — populated `nutrition_per_100g` + `nutrition_source`; **or** `nutrition_authorised_specifications`; **or** supported qualitative `nutrition_supplementary_sources`. Optional: `nutrition_functional_metrics`, `substance_card_captions`, `protein_profile_note`, `amino_acid_strengths`, `limiting_amino_acids`, `complementary_pairings`. An empty `nutrition_per_100g: {}` may exist for component compatibility; it is not the compositional source. Internal keys may be stored without public display.

See `system/food-page-frontmatter-shapes.md` for full YAML examples.

---

## Validation modes

| Command | Checks |
|---------|--------|
| `npm run nutrition:validate` | EAA when required; no downstream-metabolite tags; directional layer reconciliation (Substances cards missing **rendered** table rows; unsupported quantitative values; qualitative rows lacking source; Overview identity headlines flagged for verification) |
| `npm run nutrition:validate -- --canonical` | Baseline + canonical section order, KNH, components, bibliography-linked references |
| `npm run nutrition:validate -- --canonical --slug almonds` | Canonical checks for one page only |
| `npm run nutrition:reconcile-layers` | Post-apply **report only**: cards without rows, Overview compounds without rows, verified table compounds that may need cards, synonym/canonical-ID notes, **proposed** missing substance pages, unpromoted trace rows. Does not create Substance pages. |
| `node scripts/audit-food-page-layers.mjs --letters A` | Letter-scope audit. A supported qualitative row is **not** an Overview → table gap; remaining work uses precise research-queue states. |
| `node scripts/food-page-letter-audit.mjs --schema` | Print editorial record schema (role, evidence type, depth). Does not rewrite pages or start a letter batch. |
| `npm run test:food-truth-levels` | USDA extract ranking + almonds table-backed substance fixtures + three-model documentation tests + A-food calibration fixtures + BibTeX key-join regression |

Canonical mode is intended for **migration batches** (e.g. letter A). Full corpus canonical compliance is incremental; baseline mode stays green for unrelated edits.

---

## Related files

| File | Role |
|------|------|
| `docs/foods/.cursor/rules/Foods-Pages.mdc` | Authoring rules for agents |
| `system/food-page-letter-audit-schema.md` | Letter-audit editorial records (role, evidence type, depth). Does not change reference rendering. |
| `scripts/lib/food-page-validation.mjs` | EAA and downstream-metabolite validation |
| `scripts/lib/food-truth-reconciliation.mjs` | Directional page-layer reconciliation (cards → table rows; not every table row → card) |
| `scripts/lib/usda-nutrient-extract.mjs` | USDA extract + richest-panel ranking |
| `scripts/repair-food-pages.mjs` | EAA insert, tag cleanup, substances component |
| `cue/brain/` | Mechanism schemas only (no food CUE yet) |

Future: optional `cue/brain/food.cue` for front-matter typing; body structure remains JS-validated.
