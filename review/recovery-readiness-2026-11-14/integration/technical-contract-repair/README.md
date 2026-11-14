# Technical recovery checkpoint — 14 November 2026

Parent `c7cc6c593e93fd2c97893dca46737769019b47d8`; branch `recovery/20261114-release-actions`, draft PR244. This checkpoint is not global QC PASS, scientific freeze or release readiness.

## Repairs

1. **Historical/current contracts separated.** The original cross-page pin assertion is preserved verbatim in `scripts/scientific-hypotheses.historical.test.mjs`, together with the unchanged historical pin files. Its explicit historical reproduction run against today's candidate fails, as expected. Current assertions in `scientific-hypotheses.test.mjs` use the already committed per-file approval provenance:64 exact approved1841 files and five verified hypothesis additions. They verify original pin provenance, exact approved source bytes, the five hypothesis-only frontmatter deltas and unchanged remaining historical files. No expectations are generated from current working bytes. Existing synthetic causal-edge exclusion, actual hypothesis-removal counterfactual, admission/SEC, nine-hypothesis and ranked-observation invariants remain enabled.

2. **ECS PM3 deterministic link rendering.** `renderPmPhenomeSectionBody` preserves the existing Stress Resilience genistein navigation annotation, scoped to canonical PM ID `BRS-X(ECS-PM3)`. It resolves the URL from existing `src/data/substance-input-pages.json`; missing canonical URL is an explicit error. It annotates the exact existing phrase rather than stripping links or accepting arbitrary differences. Canonical frontmatter, rationale, ratings, admissions and the already-linked public PM page are untouched. Tests require exact full-section equality and reject altered rationale, rating and URL. The global Findings checker passes all67 PMs, with no checker relaxation.

## Results (separate runs)

| Run | Result | Disposition |
|---|---|---|
| Current candidate + provenance + hypothesis isolation |26/26 pass|Both requested technical repairs validated|
| Explicit historical pilot suite against current candidate |0/1 pass|Expected historical incompatibility; pins/assertion preserved, not a current-science clearance check|
| Public-QC suite |9/10 pass|Retain expected2/actual0 failure; active register/state remain absent, archived recovery inputs not activated|
| Related Findings/summary suites |31/35 pass|Four existing summary/count/section-order failures reproduced with pre-repair renderer; no new failures introduced|
| Global canonical Findings checker |PASS,67 checked,0 issues|Scoped model/freshness result, not the suspended cross-framework QC gate|

The four unchanged related-suite failures are: BRS1/BRS2 summary count17 versus18; legacy PM1 generator summary mismatch; PM1 canonical section order; PM9 canonical section order. Baseline and candidate logs are retained. No unrelated expectation repairs made.

## Preservation and preview

`verification.json` records exact byte equality against parent for manifest, ranked snapshot, package configuration, ECS PM3 page and public-QC dataset.984ranked connections,79ranked foods,112/158covered targets; selected source observations, ranks and Power Scores unchanged. No generated metadata-only differences. Original worktrees/backups unchanged; incidental historical test-render files restored after test execution.

Only the build-time renderer and test contracts change; rendered ECS PM3 output now matches the public page already present. No viewer component, source page or runtime dataset changes. Therefore no unnecessary build or Netlify refresh: existing verified runtime6f7dc761 preview remains available; it is not described as a build of this new checkpoint.

QC inputs remain archived evidence. Missing active inputs are not issue closure or scientific clearance. QC suspension remains intact. Outstanding public-QC adjudication/input activation and the four historical Findings fixtures remain separately unresolved. No merge, production deployment or freeze.
