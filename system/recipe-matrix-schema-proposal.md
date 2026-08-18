# Recipe Biological Target Matrix — schema proposal (editorial)

This is a proposal for review. It is **not** live. The public safeguard is suppression: `<RecipeMatrix />` renders only

> Biological Target Matrix pending canonical BRS validation.

unless the recipe sets `recipe_matrix_validated: true`. No recipe is validated in the 2026-08 integrity pass. Do not implement this schema as a bulk rewrite of the Food BRS Matrix.

## Why the current generator fails

`src/theme/RecipeMatrix/index.tsx` walks:

recipe tags → food titles → food substance tags → substance BRS tags → mechanism strings

then attaches every substance tagged `Endocannabinoid System` or `Circadian Rhythm` (`BRS_MODULATOR_TAGS`) to **every** BRS hub. Rows without a mechanism string are dropped.

That is a **tag graph**, not a meal mapping. It does not know quantity, food composition, or whether the substance–BRS link is:

- demonstrated in this food at this dose;
- a substance-level biological fact; or
- a speculative downstream pathway.

Creamed Corn on Roasted Sweet Potato is the type specimen: a starch-and-lipid plate whose only public row was `BRS-X(ECS) → Choline → Broccoli → NAPE/NAE/OEA/AEA`. Broccoli choline is 18.7 mg/100 g (~28 mg in 150 g; ~5% of the adult 550 mg reference). The row exists because broccoli is tagged `Choline`, choline is tagged `Endocannabinoid System`, and BRS-X(ECS) shares that tag. Recipe tags `Insulin Response`, `Oxidative Stress`, and `Gut Microbiome` do not match canonical hub tags (`Inflammation & Oxidative Stress`, `Gut-Brain Axis & Enteric Nervous System`, `Metabolic & Neuroendocrine Regulation`), so BRS1–BRS6 rows never survive.

## BRS-X is not a sixth core BRS

`BRS-X(ECS)` originates in `system/brs-x-schema.md`. It is a **cross-system** layer (with BRS-X Hormones, and circadian as a modulator), not a deprecated identifier and not a substitute for BRS1–BRS6. A recipe matrix that contains only a BRS-X row has not passed canonical six-BRS validation.

## Required distinctions

Every proposed row must declare which layer it is using. Do not collapse them.

| Layer | What it is | What it is not |
|---|---|---|
| Food composition | Quantitative nutrients/bioactives in the calculated recipe | A mechanism |
| Substance identity | The chemical or class actually present (choline, lutein, glucosinolate) | Proof that this meal modulates every pathway on that substance page |
| Mechanistic relevance | A BRS1–BRS6 (or explicitly scoped BRS-X) relationship that is valid at this food, dose, and form | Copying a substance `mechanisms:` string because tags overlap |
| Dietary strategy / meal-level interpretation | Editorial reading of the plate (mixed lipid phase, food structure, serving size) | An auto-generated table cell |

A nutrient’s presence does not establish that the recipe meaningfully modulates every downstream pathway associated with that nutrient.

## Proposed public columns (for review)

Validated recipes only:

1. **BRS** — canonical identifier (`BRS1`…`BRS6`; BRS-X only when the claim is explicitly cross-system and reviewed).
2. **Claim layer** — `composition` | `substance` | `mechanism` | `meal-strategy`.
3. **Evidence object** — food or named substance, with resolved grams if composition/mechanism depends on dose.
4. **Relationship** — one reviewed sentence; no auto-paste of substance-card mechanisms.
5. **Contribution** — material / minor / not established. Materiality follows the recipe nutrition rule (≥10% of the relevant nutrient total, or an editorial meal-level judgement recorded in front matter). Trace choline is not a meal mapping.

Do **not**:

- walk every food Substance card into every downstream BRS;
- treat modulator tags as a licence to attach a substance to all six systems on a recipe page;
- use legacy recipe tags (`Insulin Response`, `Gut Microbiome`, `Oxidative Stress`) as BRS identifiers;
- publish a matrix because a generator produced one row.

## Validation flag

```yaml
recipe_matrix_validated: true   # editorial only; never inferred
recipe_matrix_basis: composition-and-reviewed-mechanisms
```

Absence or `false` → pending sentence. The Foods/Substances cards may still list tagged foods; they are not a matrix.

## Out of scope for this repair

Redesigning the Food BRS Matrix, bulk-tagging foods, auto-creating Substance pages, or translating this proposal into live recipe tables.
