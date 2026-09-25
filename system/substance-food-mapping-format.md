# Substance → Food Mapping Format (PM, SM)

Canonical public format for substrate/substance linkage to foods on:

| Page kind | Section |
|---|---|
| PM | `## N. Levers` → **N.1 Dietary Requirements** → **N.1.1 Direct and/or Derived Dietary Requirements** (legacy pages may still use Dietary Levers / Direct Dietary Levers) |
| SM | `## N. Dietary Levers` — inside `<details><summary><strong>Diet</strong></summary>` |

KC pages use `### 2. Shared Biological Pool` with the same `Resource ← food examples` bullet convention.

FM pages do **not** carry Dietary Levers — interventions belong on constituent PM pages.

## Direction (required)

**Substance first, then 2–3 representative food examples** — not food → substance.

```text
- Choline ← eggs, liver
- Folate ← leafy greens, legumes, liver
- B12 ← dairy, seafood, liver
- Betaine ← beetroot, spinach
```

Use the Unicode arrow **`←`** (U+2190) between substance and foods.

## Rules

1. **One substance per bullet** — split combined legacy lines (`eggs/liver → choline,B12`) into separate bullets so each substance has its own food list.
2. **2–3 food examples** per substance when possible; omit weak fourth duplicates unless needed for clarity.
3. **Repeat foods across substances** when the same food supplies multiple substrates (e.g. liver under Choline, Folate, and B12).
4. **Prefer substance links** to `/docs/substances/…` when a substance page exists; foods stay plain text (no requirement for food pages).
5. **No nested “Food sources (examples)”** collapsible under Dietary Levers — merge into the single Diet `<details>` list using this format.
6. **Narrative dietary levers** (meal patterns, glycaemic structure, timing) may remain prose bullets without `←` when they describe mechanisms rather than substrate→food mapping.

## Deprecated (do not use)

- `food → substance` (legacy)
- `food, food → substance A, substance B` on one line
- Separate `Food sources (examples)` `<details>` blocks under Dietary Levers
- Comma-joined substances on the right of a single food-first line (`eggs/liver → choline,B12`)

## Validation

- JS: `scripts/lib/mechanism-page-validation.mjs` (`validateSubstanceFoodMappingSections`)
- CUE: `cue/brain/common.cue` (`#SubstanceFoodBullet`, `#LegacyFoodToSubstanceArrow`)
- Run: `npm run mechanisms:validate`

## Generator

`scripts/lib/brs-spreadsheet-generate.mjs` and `scripts/lib/substance-food-mapping.mjs` emit this format from intervention rows.
