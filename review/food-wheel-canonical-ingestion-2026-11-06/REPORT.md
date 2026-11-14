# Canonical Food Wheel selection reconciliation — 6 November 2026

Local-only. Branch `review/brs5-pm4-sec-assessment`, HEAD `521036b1d6c212e58c660f0f985e47617a71a716`. No commit, push or deployment.

## Authority and implementation

The author's confirmed contract supersedes the earlier all-food exploratory display. Canonical food records remain the composition authority. `scripts/lib/food-wheel-power.mjs` calls the existing `relativeSourcePower` function, with its provisional 10% threshold. At least two distinct comparable foods are required; up to five foods are selected per existing admitted PM–substance target. No list padding. Canonical admission and biological-network records are unchanged.

The shared mapper supplies verified observations. Original quantities, chemical forms, material/species, preparation, units, basis, references and limitations remain in the export. Existing comparison groups are preserved, including salted/raw and edible/dry differences. Unit scaling to mg is used only for comparison; original units remain displayed. No denominator conversion is performed. Unlike the superseded exporter, preparation groups are not collapsed into a universal edible-mass group.

Each compatible group has its own denominator. Power percentages from different groups are not claims of equivalent absolute concentration. Equal-power ties use canonical food ID, then comparison-group ID for reproducibility; duplicate food identities count once. Conflicting same-food comparable observations are reported for source review, never silently replaced by the largest value. Measurement spans retain the existing unranked treatment.

The wheel HTML/SVG contains only qualified food nodes and food links. The broader substance/BRS diagram is preserved. Diagnostic JSON retains presence-only, single-source, held, incompatible and below-threshold records. No independent review-research quantities are ingested. Future recipe consumers should reuse the canonical mapper; this task does not implement recipe views or change PM dropdown presentation.

## Before/after

| Measure | Previous top-five preview (not power-qualified) | Corrected wheel |
|---|---:|---:|
| Selected foods | 65 | 57 |
| Food–substance–PM edges | 589 | 579 |
| Unique covered PM–substance targets | 119 | 119 |
| Eligible admitted targets | 151 | 151 |

The superseded all-food display had 163 connected foods and 11,284 associations; these are now diagnostic data only. Overall coverage is **119 unique targets**, not 579 targets. Thirty-two targets remain without qualifying rankings. The audit scans 174 food-directory documents, including two index/shopping pages with no food connections; these are not ranked food nodes.

## Roe

- Salmon roe: salted chum salmon (`Oncorhynchus keta`), MEXT item 10140. DHA **2,000 mg/100 g edible portion**, EPA **1,600 mg/100 g edible portion**, source and material preserved. The preparation parser now recognises `salted`. Both measurements remain unranked because their existing salted comparison groups have fewer than two comparable foods. This is a minimum-comparison limitation, not a low-content conclusion. No raw/salted comparability decision was invented.
- Trout roe: canonical documented relationships retained in the audit; no verified quantities. It has no ranked food node and borrows no salmon values.

## Changed food selections

Removed from the previous top-five preview: black-beans, brussels-sprouts, garlic, kidney-beans, lentils, miso, nori, nutritional-yeast, oregano, salmon-roe, sesame-seeds, sweet-potatoes, tahini.

Newly selected: clams, coconut-oil, edamame, sauerkraut, spelt.

These changes reflect the threshold, retained comparison groups, minimum comparison set and deterministic cap. They do not alter food composition or biological efficacy. Exact target-level reasons are in `power-selection-audit.json`; `before-after.json` records the comparison.

## Validation

- 17 tests passed: canonical quantities/relationships preserved; roe source/state retained; minimum two; exact 10% boundary; weak-source exclusion; maximum five; chemical-form/preparation separation; ranges excluded; deduplication; original records unchanged; independent review composition excluded; related-substance regressions.
- `npm run presentation:check`: passed, 691 protected files.
- Local browser: 57 foods / 579 food edges / 119 unique targets; beef selection shows six qualified target connections; reset restores totals. Screenshot: `power-wheel.png`.
- No full production build or deployment requested or performed. Scientific data deficiencies remain unresolved at source; this is not a declaration of framework-wide scientific completeness.

## Files and reproduction

Implementation: `scripts/export-food-wheel-canonical.mjs`, `scripts/lib/food-wheel-power.mjs`, `scripts/food-wheel-canonical.test.mjs`, local preview `build.mjs` and `interaction.js`. Shared mapper retains its salted-preparation correction. New contract note in `system/input-substance-food-mapping.md`; handoff updated. No PM, admission, SEC or canonical food-value changes in this correction.

Run `node scripts/export-food-wheel-canonical.mjs`, then `node review/visualisations/brain-food-wheel-pm-qualified-2026-11-06/build.mjs`. Test with `node --test scripts/food-wheel-canonical.test.mjs scripts/related-substance-associations.test.mjs` and `npm run presentation:check`.

The pre-correction implementation/data are preserved under `pre-power-contract/`. Older research and wheel artifacts remain historical, not inputs to the current composition pipeline.
