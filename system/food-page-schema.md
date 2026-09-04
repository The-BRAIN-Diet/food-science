# Food Page Schema (Canonical)

Consolidated schema for BRAIN Diet food pages. **Worked example:** `docs/foods/dark-chocolate.md`.  
**Front matter shapes:** `system/food-page-frontmatter-shapes.md`. **Nutrition fields:** `system/food-nutrition-schema.md`.  
**Three Sources of Truth (page layers) and EAA / content-boundary rules:** `system/food-page-model.md`. **Composition and provenance classes, nutrient identity, omega-3 rules and exact-food source matching:** `system/food-nutrition-schema.md`. **Source search and fallback source classes:** `system/nutrition-workflow.md`.

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

1. **Overview** — editorial identity narrative (intrinsic identity constituents only). **Other Nutritional Highlights** is an optional residual section, not a fourth Source of Truth and not a second Overview. Headline identity compounds must resolve to a rendered table row or enter an explicit research-queue state. Numerical statements in Overview or Other Nutritional Highlights must match rendered-table rounding.
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
| 2 | Other Nutritional Highlights | `## Other Nutritional Highlights` | No — omit when nothing additional |
| 3 | Food Context | `## Food Context` | Yes (canonical) |
| 4 | Recipes | `## Recipes` + `<FoodRecipes />` | Yes (canonical) |
| 5 | Nutrition | `<NutritionTable details={frontMatter} />` | When nutrition layer present |
| 6 | Substances | `## Substances` + `<FoodSubstancesFromTable />` | When nutrition layer present |
| 7 | References | `## References` | Yes (canonical) |

The canonical Highlights heading is **Other Nutritional Highlights**. The superseded headings `Key Nutritional Highlights` and `Nutritional Highlights` must not be used as the canonical heading. Existing food pages may still carry a superseded heading until that letter is rewritten; that is a migration state, not a second section.

When Other Nutritional Highlights is present, it sits immediately after Overview and before Food Context. There is no minimum bullet count.

**Food Context** uses only subsections with meaningful, food-specific content. Standard subsections (include when relevant): `### Sourcing`, `### Synergies`, `### Preparation`. Additional food-specific subsections are allowed (e.g. `### Ripeness`) when evidence-backed.

**Essential Amino Acid Profile** — when required (protein ≥ 5 g/100 g or protein-source slug), place as `### Essential Amino Acid Profile` **inside Food Context** (before Recipes). See EAA rules in `food-page-model.md`.

---

## Section editorial responsibilities

This is the canonical home for food-page editorial structure: what each section is for, and how duplication is prevented. `system/food-page-model.md` keeps the Three Sources of Truth, the Overview editorial standard (Almonds calibration), EAA logic, and directional reconciliation. Cursor rules, the letter-audit schema, workflow notes, and build architecture **link here** rather than restating these responsibilities.

### Core non-duplication rule

Every substantive detail must have **one primary home** on the page.

The only permitted overlap is the Overview: because it must function as an overview, it may briefly name or synthesise the food’s defining characteristics even when their detailed treatment appears later.

This must be summary-to-detail progression:

- the Overview may name the defining point;
- one later section may explain it;
- other sections must not repeat it again.

Do not repeat the same claim, qualification, comparison, recommendation or reference annotation across multiple detailed sections.

Overview-level synthesis is not considered improper duplication, but detailed repetition is.

### Public editorial prose versus composition administration

This is the canonical home for the public/internal split. Cursor rules, the letter-audit schema, the page model, and workflow notes **link here**; they must not restate the phrase list or the disposition table.

USDA FoodData Central, SR Legacy, and other composition databases establish or support composition **internally**. Their omissions are not food characteristics. They must not be presented as Nutritional Highlights, Overview content, Food Context, or preparation advice.

Public food prose describes the food. It does not explain the limitations of a composition database, a reconciliation pass, or a registry.

**Public page** (Overview, Other Nutritional Highlights, Food Context including Sourcing, Synergies and Preparation, Essential Amino Acid Profile, and other reader-facing explanatory prose):

- what characterises the food;
- supported nutritional identity;
- meaningful variation;
- practical food selection;
- preparation;
- meal use;
- appropriately qualified evidence.

**Internal data and audit layers** (structured `nutrition_source` fields, table `source_note`s that document a displayed value, bibliography titles, specialist queues, editorial records, FCIR, and other audit files):

- which database was searched;
- absent fields;
- unresolved quantities;
- candidate records;
- rejected records;
- source mismatch;
- reconciliation state;
- ontology status;
- decisions requiring later research.

A missing database quantity is handled internally. It is not turned into a public bullet.

Do not write any of the following into public editorial prose (this list is illustrative, not a permission to hide the same idea in other words):

- USDA, FoodData Central, FDC, SR Legacy;
- database, database record, source record, panel, as commentary on coverage;
- USDA does not quantify / not quantified by USDA;
- quantity is not established / comparable quantity is not established / not reported;
- unavailable in the record / absent from the database / composition database does not capture;
- retained qualitatively / public row / internal-only / supplementary row;
- research queue / ontology admission / reconciliation / provenance limitation.

**Disposition of each database-limitation sentence** — choose one; do not leave the sentence in public prose:

1. **Supported food fact** — rewrite as a clear food fact without discussing the database.
2. **Useful but unresolved claim** — record it once in the appropriate internal research queue, with the exact missing evidence and next action. Remove it from public prose until it can be communicated usefully.
3. **Already represented elsewhere** — delete the duplicate.
4. **Not important to readers** — delete it. Do not create a registry item merely because a database lacks a value.

Do not expand the FCIR or another registry for routine missing nutrient quantities. FCIR is for genuine identity or interpretation problems, not every absent database field.

**Quantitative gaps:** do not automatically write “quantity not established” on the public page. Find an appropriate food-specific source where the quantity materially matters; retain a supported qualitative identity only when that identity itself is useful to readers; otherwise omit the public claim; keep the unresolved quantitative task internally. Do not invent a value, borrow from a related food, or imply absence from a missing field.

This rule does **not** remove legitimate source attribution from underlying data, front matter, source notes, bibliography titles, or internal audit files. Do not alter a correct numerical value merely because its source is USDA.

---

## Overview

The Overview should give the reader a concise picture of:

- what the food is;
- what genuinely distinguishes it, if anything;
- why it is included in a BRAIN-aligned dietary pattern;
- the most important practical interpretation.

It may briefly name a small number of defining nutrients, substances, food-matrix properties or processing distinctions.

It must not become:

- a nutrient-table transcription;
- a list of all benefits;
- a trial summary;
- a preparation checklist;
- a sourcing guide;
- an amino-acid analysis;
- a generic biological-mechanism narrative.

Plain-language register, length and the Almonds calibration remain in the **Overview editorial standard** in `system/food-page-model.md`. Length follows recommended page depth (`short` / `standard` / `extended` in `system/food-page-letter-audit-schema.md`); depth does not authorise dumping tables or trial reports into Overview.

- Headline identity compounds still follow Overview → rendered table → editorial Substance admission. Not every chemical noun is an identity constituent.
- Do not manufacture biological importance. Culinary-support foods may be described as a meal base, binder, or culinary-support ingredient.
- General substance biology belongs on Substance pages and, where relevant, the future Food BRS Matrix.
- Inline numeric citations `[1]`, `[2]` when claims need evidence. Synthesise studies; do not narrate them one by one.
- **Must not:** invented quantities; values copied from a substitute food; downstream metabolites as if present in the food; presenting supplement, substance-class, or neighbouring-food evidence as direct evidence for the food; composition-administration language (see **Public editorial prose versus composition administration**).

---

## Nutrition tables

The canonical home for:

- quantitative composition;
- units and per-100 g values;
- macronutrients;
- vitamins and minerals;
- publicly admitted bioactive compounds;
- composition provenance and source notes.

Do not restate ordinary table rows in Other Nutritional Highlights.

---

## Other Nutritional Highlights

**Other** means nutritional information that:

1. is useful to understanding the food;
2. is not already adequately communicated by the nutrition tables;
3. does not belong in Sourcing, Synergies, Preparation, the Essential Amino Acid Profile, Substance cards or References.

It is an **optional residual section** — not a second Overview, a prose version of the nutrition table, a nutrition-table caption, or a dumping ground for material removed elsewhere. It is not a fourth Source of Truth.

Omit the section when it has nothing additional to contribute. Do not require a minimum number of bullets. Do not invent bullets to fill a template.

Use only for additional nutritional interpretation that has no better home elsewhere, for example:

- a meaningful bioavailability distinction not evident from the table;
- a nutritionally important limitation or absence that characterises the food (not a missing database field);
- concise interpretation needed to prevent a table value being misunderstood.

Do not include:

- ordinary nutrient quantities, or a second list of the food’s defining nutrients;
- typical portion, serving weight, or 100 g table-interpretation notes (“table basis”, “typical portions are one medium fruit”, “not 100 g”);
- composition-administration language; see **Public editorial prose versus composition administration** above;
- sourcing or product-selection advice;
- food pairings;
- cooking instructions;
- protein completeness or limiting amino acids;
- generic biological mechanisms;
- trial protocols or numerical outcomes;
- material already explained in another detailed section.

When a bullet cites a quantity, it **must** match the rendered table and its displayed rounding. Those figures still belong in the table; do not add a bullet whose only job is to interpret the table.

Existing pages that still use `## Key Nutritional Highlights` are a migration state. Do not treat that heading as canonical, and do not bulk-rewrite those pages from this schema update.

---

## Food Context

Practical framework. Quality over completeness — omit empty subsections.

### Sourcing

The sole detailed home for:

- product and ingredient selection;
- minimally processed versus processed forms;
- cultivar, species, cut, edible part or formulation;
- production-system distinctions;
- purchasing considerations.

### Synergies

The sole detailed home for:

- meal pairings;
- complementary foods;
- effects of one meal component on another;
- food combinations affecting absorption, stability or dietary balance.

### Preparation

The sole detailed home for:

- cooking and handling;
- temperature and processing effects;
- soaking, fermenting, cooling, crushing or blending;
- reduction or formation of preparation-related compounds.

Dietary-pattern or frequency advice is not Preparation.

---

## Essential Amino Acid Profile

When required, this is the sole detailed home for:

- complete or incomplete protein;
- limiting amino acids;
- digestibility and protein quality;
- complementary protein pairing.

Do not repeat these points in Other Nutritional Highlights.

---

## Substance cards

The canonical navigational representation of editorially admitted food substances. Their presence does not require the Overview or Other Nutritional Highlights to enumerate every card.

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

The annotation is optional. When present it may state a direct food finding, trial dose/design and principal result, analytical finding, preparation finding, or a necessary scope limitation. Do not lead with dietary advice. State what the source found; practical guidance belongs in Overview, Food Context, or Other Nutritional Highlights when that is the residual home. Study design, dose, duration, comparators, numerical outcomes and evidential limitations belong here, not in Overview or Other Nutritional Highlights.

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
| `npm run nutrition:validate -- --canonical` | Baseline + canonical section order, optional Other Nutritional Highlights, components, bibliography-linked references |
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
