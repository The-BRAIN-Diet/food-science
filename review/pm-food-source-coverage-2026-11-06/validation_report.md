# Validation report — 6 November 2026

Status: **focused task validation PASS; broader repository validation has unchanged pre-existing failures. Not a release approval.** No commit, push or deployment.

## Passed

- `node scripts/check-dietary-input-governance.mjs` — exit 0; 524 ms.
- `node scripts/sync-pm-scientific-findings.mjs --check` — exit 0; 1234 ms.
- `node scripts/check-sec-assessments.mjs` — exit 0; 638 ms.
- `node scripts/validate-bib-citation-keys.mjs` — exit 0; 395 ms.
- `node scripts/check-presentation-contract.mjs` — exit 0; 391 ms.
- `node review/pm-food-source-coverage-2026-11-06/validate-final.mjs` — exit 0; 595 ms.
- `node --test scripts/presentation-contract.test.mjs scripts/usda-nutrient-extract.test.mjs scripts/food-citation-integrity.test.mjs` — exit 0; 283 ms.

- 6897 preservation and edge/count/provenance assertions.
- 36 food documents compile as MDX; 91 new source anchors resolve.
- 239 pre-existing canonical relationship records retain their scientific/admission fields. Generated food lists, mapping status, food evidence and coverage warnings legitimately change; identity and conversion fields remain unchanged.
- SEC compared against HEAD `521036b1d6c212e58c660f0f985e47617a71a716`: 139 immutable snapshots preserved.
- 20 focused regression tests pass.
- Browser: 50 baseline and 62 candidate food labels independently checked; candidate toggle, reset, source details, BRS6, keyboard Hormones and glycine selection tested.
- Original 68-substance biological network and its system connections preserved by deep equality.

## Unchanged broad failures

`compare-baseline.mjs` runs the same current code/concurrent PM work against (a) earliest saved pre-task food documents and (b) current foods. This is a task-specific food baseline, not a GitHub main or release exception.

Mapper: 37 passed, four failed in both states: legacy meal-pattern fixture, dietary filter expected count, missing PM dietary note, and historical SOP rollup count. Two source-growth assumptions were corrected: the preparation test now checks all sources rather than only the alphabetically first ten; the B3 test compares the actual Trp inventory across PM views rather than expecting exactly three food records. Their scientific assertions remain intact.

Food-page validator: broccoli Sulforaphane, shrimp Betaine and spinach Betaine qualitative public rows lack required status/amount display. Same three identities and messages in the task baseline and current state. They are not repaired as unrelated legacy presentation work. Existing warnings are retained in full logs.

No baseline was regenerated. Thirty exact citation-anchor repair hashes were appended under the existing author-approved provenance scope. Earlier approvals remain intact. No renderer or new public component was added by this task. The new wheel is an isolated local review artifact.

## Scope limitations

Whole-repository PM validators see 65 PMs in this checkout. The two author-approved Cursor PMs are included read-only in the 67-PM audit from their recorded separate branch; neither has an eligible admitted quantitative food relationship to add. This does not merge Cursor's branch or claim its entire checkout has passed this worktree's validators.

37 eligible pairs remain below five sources: five partial and 32 without a qualified quantitative selection. Every remaining target has a source-specific research/access/form reason and next action. Scite monthly quota prevented additional Scite retrieval; no inaccessible full text was represented as verified.

No production build or production browser check was performed: this is a local data/review task and known broad failures remain. The original preview and production wheel are unchanged.

See `final-command-validation.json`, `final-integrity-validation.json`, `render-validation.json`, `browser-validation.json`, `baseline-comparison.json` and the corresponding logs for reproducible evidence.
