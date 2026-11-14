# Qualified Food Wheel evidence ledger — local reconciliation

Branch: audit/dietary-connectivity-2026-11-09. Starting HEAD: af13bec1. Local only; no commit, push or deployment.

Author authority: “Implement approved Food Wheel evidence-ledger reconciliation”, this conversation, 9 November 2026.

## Before / after

|Written ledger relationship|Before|After|
|---|---:|---:|
|Apples → pectin → eligible PM/KC|0|2|
|Measured RS → four foods → eligible PM/KC|0|8|
|Exact experimental child → PM|0|5|

Parent records apply to BRS5-FM1-PM1 (KC/resource supply) and BRS5-FM2-PM5. Citrus pectin PM4, studied apple-pectin child food projection and protocol-specific exclusions remain. Resistant-starch measurements retain their original ranges, denominators and preparations; total RS is not silently reclassified as RS2.

Ten existing food-page Bifidobacterium growth-support statements are transcribed separately with source lines. These are not ten occurrence claims, new scientific endorsements or strain-specific food connections.

Five exact experimental permissions are relationship-specific and limited to the written PM-network evidence surface. Conservative canonical food-projection holds remain; no registry, canonical PM, dietary admission, SEC, Finding or food-composition record was changed for this work. Existing identity-resolution tests continue to pass. Child identities retain source-specific limitations and null outcomes, including JB-1's healthy-human null. No parent food observations inherit.

The ledger is built from fresh canonical PM extraction, the substance registry and the shared documented-source eligibility helper, not the embedded wheel inventory. It includes the complete canonical evidence records as expandable details and JSON. The wheel links to it. Two stale KC/resource record scopes in embedded network metadata are corrected; selector data and existing graph coordinates are not regenerated. The top-ten generator invokes the ledger generator for future builds.

## Validation

- 11 focused ledger/identity/recipe tests pass.
- Deterministic regeneration passes.
- Presentation check: 691 protected files, no unapproved structural changes.
- SEC: 140 snapshots, immutable history and references valid against github/main ca3183b1bdeb32a0d552d63219ceac5022111225.
- Before/after equality tests preserve foodPairs, foods, selection_policy and canonicalNetworks in full, plus recipe network and substance registry hashes.
- Broader tests: 20 pass, 3 fail. Existing publication tests expect 98 snapshot targets while the local ranked snapshot has 112; the frozen wheel snapshot ID differs from the current generated ranked snapshot; the approved-food hash fixture also differs. This task leaves those ranking/snapshot inputs unchanged, rather than regenerate ribbons outside scope.
- Dietary governance reports one BRS5-FM2-PM6 / PM6-DIT-2 missing food-target research record. This task does not modify that PM or its evidence.
- Production build result recorded separately below when complete. Direct Docusaurus CLI used with isolated generated and output directories to avoid npm prebuild's framework-wide mapping regeneration. Presentation, dietary and SEC checks run explicitly above; failed dietary check is not waived.

## Files

- scripts/build-food-wheel-evidence-ledger.mjs
- scripts/food-wheel-evidence-ledger.test.mjs
- scripts/build-food-wheel-top-ten.mjs (ledger generation hook)
- system/food-wheel-evidence-publication.json (scoped author permissions)
- system/input-substance-food-mapping.md (approved surface and restrictions)
- static/explore/food-wheel/index.html (ledger link and KC scope metadata)
- static/explore/food-wheel/evidence-ledger.html and .json
- This report, invariance baseline and validation logs.

No browser visual verification claimed. The HTML file is a standalone inspection artefact; JSON retains detailed provenance and qualifications. No production/publication action is authorised by these outputs.

### Production build result

FAILED, exit 134: Node/V8 heap out of memory during compilation. See `production-build.log`. No successful production build or browser verification is claimed. Isolated generated directory `.docusaurus-ledger-validation` used; localhost preview directories were not replaced. No automatic high-memory retry was attempted with approximately 6.3 GiB free disk remaining. The standalone source inspection artefact remains available at `static/explore/food-wheel/evidence-ledger.html`.
