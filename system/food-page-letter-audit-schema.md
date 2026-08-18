# Food-page letter-audit schema

Editorial record schema for the letter-by-letter food audit. This is **not** a presentation change and **not** a Script B payload.

Do **not** bulk-rewrite pages from this schema. Do **not** begin the next letter batch from a schema update. Do **not** change reference rendering, numbering, annotations, or bibliography UX.

Canonical structural checks remain in `system/food-page-schema.md`. Composition reconciliation states remain in `system/food-page-model.md`. Citation-key join rules remain exact-key / bounded BibTeX.

---

## Separate checks

| Check | What it answers | Must not be collapsed into |
|-------|-----------------|----------------------------|
| **Citation correctness** | Does `[n]` resolve to the exact, bounded BibTeX entry for that key? | Scientific relevance |
| **Citation relevance** | Does that correctly joined paper evidence *this food*? | Join/parser success |
| **Script B** | Evidence-verification decision for an Overview compound (`verified` / `unsupported` / `ambiguous` / `requires-review`) | Letter-audit enums |
| **Reconciliation state** | Remaining Overview → table → ontology work | Script B; editorial role/depth |
| **Editorial record** | Why the food is in the encyclopaedia, how deep the page should be, and what the references actually are | Mechanical canonical validation |

Feed `scripts/data/food-citation-relevance-queue.json` into relevance / evidence-type fields. Do not treat a class 4–6 relevance flag as a bibliography-join error.

---

## Food-page purpose (audit stance)

A food page explains what is **distinctive** about that food without repeating generic nutrient biology.

A food may be included because it is:

- nutritionally or chemically distinctive;
- representative of a food group or dietary pattern;
- interesting through its matrix, formulation, or preparation;
- useful in BRAIN Diet recipes.

**Recipe usefulness is sufficient.** Do not manufacture biological importance. It is acceptable to describe a food neutrally as a meal base, binder, or culinary-support ingredient with limited distinctive nutritional identity.

---

## Record (one per food)

Every editorial audit record uses these fields. Unfilled fields stay `null` / `[]` until a human letter pass writes them. Schema updates must not pre-fill the next letter batch.

| Field | Type | Values / meaning |
|-------|------|------------------|
| `slug` | string | Food page slug |
| `title` | string | Displayed food name |
| `letter` | string | Title first letter |
| `role` | enum | `distinctive` / `matrix-preparation` / `dietary-pattern` / `culinary-support` / `review-inclusion` |
| `meaningful_reference_count` | integer | Count of **relevant** references (quality floor is two). Not the raw `[n]` count if some are generic context, recipe-context, or mismatched |
| `evidence_types` | enum[] | One or more of: `direct-food` / `characteristic-substance` / `preparation` / `composition` / `generic-context` / `recipe-context` / `mismatched` |
| `distinctive_story_or_inclusion_reason` | string | Distinctive story **or** honest reason for inclusion (including culinary-support) |
| `missing_research` | string[] | Food-specific gaps still needed |
| `destined_for_substance_or_brs_matrix` | string[] | Material that belongs on a Substance page or the future Food BRS Matrix. Record the destination; **do not delete** mechanistic prose until that destination exists |
| `recommended_depth` | enum | `short` / `standard` / `extended` |
| `citation_correctness` | enum | `exact-key` / `needs-join-repair` — separate from relevance |
| `filled` | boolean | `false` until a letter pass writes the record |

### Role

| Value | Use when |
|-------|----------|
| `distinctive` | Nutritionally or chemically distinctive identity |
| `matrix-preparation` | The interesting fact is matrix, formulation, or preparation |
| `dietary-pattern` | Included as representative of a food group or dietary pattern |
| `culinary-support` | Useful in recipes; limited distinctive nutritional identity |
| `review-inclusion` | Kept for encyclopaedic coverage / review, not because a biological story was found |

### Evidence type

| Value | Meaning |
|-------|---------|
| `direct-food` | Direct food or formulation analysis, or human evidence involving the food |
| `characteristic-substance` | Evidence about a characteristic substance or matrix **confirmed in that food** |
| `preparation` | Food-specific preparation or processing evidence |
| `composition` | Ordinary nutrient content from the composition database / rendered table (does **not** count toward the two-reference floor) |
| `generic-context` | Generic mechanism, supplement, or substance-class paper, labelled as context if kept |
| `recipe-context` | Cited because a recipe or pairing uses another ingredient |
| `mismatched` | Neighbouring-food, wrong-claim, or otherwise irrelevant paper |

Map from the read-only citation relevance queue (do not retag join errors):

| Queue class | Evidence type |
|-------------|---------------|
| 1 direct food evidence | `direct-food` |
| 2 direct constituent evidence | `characteristic-substance` |
| 3 preparation or food-matrix | `preparation` |
| 4 generic mechanism only | `generic-context` |
| 5 recipe-context citation | `recipe-context` |
| 6 irrelevant or mismatched | `mismatched` |

### Recommended depth

| Value | Use when |
|-------|----------|
| `short` | Culinary-support or compositionally ordinary food |
| `standard` | Meaningful food-group, substance, or preparation story |
| `extended` | Several distinctive, well-supported properties |

Examples **guide research**; they do not pre-authorise claims or Substance cards:

- White pasta, white rice, refined bread, and recipe starches may remain **short** culinary-support pages.
- Cucumber and lettuce need no invented neurological narrative.
- Potatoes, onions, garlic, tomatoes, herbs, cocoa, tea, coffee, and fermented foods may justify **standard** or **extended** depth where food-specific composition or preparation evidence supports it.

---

## Guardrails for letter passes

- Preserve Overview → rendered table → editorial Substance admission. Overview register follows the Overview editorial standard in `system/food-page-model.md`; do not restate that rule here.
- Ordinary or trace presence does not automatically justify a card.
- Do not create Substance pages during the audit.
- Do not remove mechanisms until their destination is recorded in `destined_for_substance_or_brs_matrix`.
- Keep simple foods simple.
- Flag weak evidence rather than padding references to meet the floor.
- Minimum two **relevant** references is a quality floor, not a reason to lengthen the page or to invent biology.
- Generic mechanism papers cannot satisfy the minimum unless explicitly labelled as context and genuinely needed.
- Never present supplement, substance-class, or neighbouring-food evidence as direct evidence for the food.
- Composition databases establish ordinary nutrient content. Fibre, protein, fat, carbohydrate, vitamin, and mineral quantities shown in the table do not require separate papers.
- Do not replace the Author (Year) and linked-title bibliographic core; food pages may append a finding.
- Do not begin the next letter batch from a schema-only change.

---

## Runtime

- Schema dump: `node scripts/food-page-letter-audit.mjs --schema`
- Filled records (when a letter pass exists): `scripts/data/food-editorial-audit-records.json`
- Until a letter pass writes records, that file stays empty (`records: []`).
- Canonical validation (`npm run food:audit:today`) does **not** require filled editorial records and does **not** fail pages for recommended depth.
