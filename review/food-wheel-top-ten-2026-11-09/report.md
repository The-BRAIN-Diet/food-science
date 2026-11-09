# Food Wheel top-ten experiment — 9 November 2026

Author-approved local implementation, draft PR and Netlify preview only. No production approval. Branch `experiment/food-wheel-top-ten-2026-11-09`, based on GitHub main `2efc9c82b42128d81e1039d7244651b591c3e11d`. No scientific records, admissions, composition, PM dropdowns, recipes, BRS Matrix, global renderer or deep-linking work included.

## Comparison reported before implementation

|Metric|Top five|Top ten|
|---|---:|---:|
|Unique foods|64|78|
|Food–substance–PM connections|586|985|
|Covered targets|119/151|119/151|
|Distinct PMs|41|41|
|Ranked substances|33|33|
|Connected systems|8|8|

Systems are BRS1–6, ECS and Hormones. No invented Circadian food paths. No old selections removed. Every original edge, rank, quantity, power and admission identifier is preserved. All 33 represented substances have one qualifying comparison pool; no cross-pool ranking change is needed. See `comparison.json` for per-system counts and added-food coverage.

New foods: turkey, lupins, clams, edamame, mushrooms, sauerkraut, shrimp, scallops, oranges, lemon, broccoli sprouts, spelt, dandelion greens and avocado oil. Turkey adds four substances across four systems; lupins adds three substances across six systems. Connectivity is not benefit, serving adequacy or nutrient density.

Known source-identity ambiguity: `lupins` and `lupin-beans` remain separate canonical identities with overlapping quantities. No scientific merge is authorised; apparent coverage is provisional pending source review. Broccoli sprouts enters via vitamin C, not sulforaphane. Several new foods qualify only for sodium; this is not a sodium-intake recommendation. Salmon roe remains first/100% for DHA and EPA; total connections rise from 17 to 25 through additional already documented substances. Trout roe remains unranked without quantities.

## Reproducibility and authority

`canonical-inputs.json.gz` is a deterministic frozen extraction of the same canonical working-tree records used for the reviewed five-food snapshot, not a parallel research dataset. It includes canonical observation identifiers, original units, source URLs, qualifications and the 174 source-file hashes. Those hashes were checked unchanged at analysis time. The source working-tree snapshot is based on `521036b1d6c212e58c660f0f985e47617a71a716`; it may differ from published food pages, as already disclosed by the existing wheel. This PR does not import those pending scientific files.

Run `node scripts/build-food-wheel-top-ten.mjs` to reproduce the baseline and regenerate the ten-food wheel. The frozen SVG supplies the existing substance/system geometry. Rendering logic was extracted from the existing builder without changing positions, styles or interaction code. Historical `canonicalNetworks.topFive` envelope name is retained for runtime compatibility; `selection_policy.maximum` is now 10. No additional bands or thresholds.

The selector accepts an explicit cap for comparison; its default is ten. Shared Relative Source Power implementation is unchanged. Minimum two compatible foods, threshold ≥10%, chemical forms, denominators, range exclusions, conflicting observations, deterministic ties and food deduplication are unchanged.

## Validation

- Focused publication/selection suite: 9/9 passed, including exact top-five preservation, canonical observations, roe, comparability, 10% boundary, cap and ties.
- Presentation check: passed (691 protected files). Approval scope is this experiment, not production.
- Production build and browser review: pending; completion recorded below.

## Scope superseded by PM/Wheel reconciliation request

The author subsequently required auditing both PM and Wheel food selections before proceeding, shared deterministic selection, joint generation and consistency tests. The wheel-only implementation remains local/uncommitted; no PR or push has occurred.

Read-only audit of the clean main-based checkout:

- PM renderer `src/lib/pmInputFoodDisclosure.ts` selects five ordinary rows separately in plant and animal groups, retains additional analytical observations, may display presence-only rows, and does not use Relative Source Power. Its constituent-amino-acid branch already caps at ten.
- `src/data/inputSubstanceFoodSelection.mjs::selectQuantified` is another review-index selector: default ten, no 10% threshold, alphabetical when comparison groups differ. It is not the Wheel selector.
- `projectFoodTargets` joins existing admitted/historical dietary relationships to canonical foods and explicitly marked provisional research targets. Those mappings must not be promoted merely to unify ranks.
- Wheel uses `selectFoodWheelSources`, across plant/animal sources together, minimum two compatible foods, provisional ≥10%, and a global deduplicated cap. Underlying power arithmetic is shared only with the related-substance calculator, not PM dropdowns.
- Forty-one canonical food files differ between main and the wheel's reviewed working-tree snapshot. These include substantive supplementary composition observations. Same existing 119 target identities using clean-checkout sources/mapper: top5 51 foods/466 connections/98 targets; top10 60/777/98. Frozen wheel source result remains 64/586/119 → 78/985/119.
- All existing Wheel target relationship IDs resolve on main; no missing dietary admission identifiers were found.
- Read-only simulation of the actual PM selection function on freshly generated main mappings: 110/119 target food sets differ from existing top5 Wheel sets; nine agree. This is a source/selector audit, not a claim to have browser-verified 119 deployed pages. See `pm-selection-audit.json` and `pm-source-audit.json`.

Required implementation: one source snapshot, one shared selector applied before plant/animal grouping, identical deterministic target selection for both consumers, retained source qualifications, no manual PM edits, and tests comparing emitted edge identities/quantities/power against PM output. Existing non-ranked contextual/cofactor/related-source displays need explicit separation from ranked admitted dietary targets.

Pending author response: permission to include the existing 41 food-record changes after scoped diff/validation review, or hold combined integration for a separate canonical-record PR. Do not silently downgrade the Wheel to the older main composition set or import pending food data without review. The first wheel-only production compilation was stopped after the scope changed; it is not a completed build gate for the combined change. Clean checkout generated mapping assets must be produced before the next build.

## 41-record-file reconciliation completed — 9 November 2026

The author requested report-only reconciliation before shared implementation. See [complete reconciliation](reconciliation/RECONCILIATION.md), [105 structured changes](reconciliation/records.json) and [shared-selector proposal](reconciliation/SHARED-SELECTOR-PROPOSAL.md). Original author instruction confirms local backfill authority; individual publication/review status remains distinct. 91 added observations, seven ranking metadata updates, five CoQ10 provenance/occurrence changes and two scoped beef review holds. Existing numeric values are unchanged. Two bibliography keys are missing on main. Historical pectin/glucose target-ranking disagreement affects six current edges across two targets and requires explicit reconciliation. No additional implementation, canonical changes, commit or push in this audit. Source hash and anchor validations passed; combined build/preview remains pending review.

## Latest handoff — shared-reference attribution, 9 November 2026

Local-only on `experiment/food-wheel-top-ten-2026-11-09`, base `2efc9c82`. See [attribution reconciliation](SHARED-REFERENCE-FOOD-IDENTITIES.md) and [exact ranking impact](shared-reference-attribution-impact.json). All four oil/cocoa identities retained. FDC 169593 attributed once to cocoa with unsweetened-powder scope; explicit dry-powder extraction repaired. FDC 171413 remains held because the exact-food contract does not permit the proposed EVOO proxy; the report names the narrow exception requiring author approval. No phenolic/CoQ10 quantities or admissions changed. Generated PM/Wheel selection: 64 foods, 800 connections, 98/151 targets. Eleven focused tests pass; full combined build/browser/PR preview gates remain pending. No publication performed. Do not describe this as the earlier 64/586/119 release snapshot.

## 78/985/119 → 64/800/98 reconciliation — 9 November 2026

[Full target-level reconciliation](TOP-TEN-COVERAGE-RECONCILIATION.md) and [complete edge ledger](top-ten-reconciliation.json) reproduce the old experiment exactly, then identify all 21 lost targets: 19 unpublished composition/eligibility-metadata dependencies and 2 retained target-specific non-rankable restrictions. No admission IDs changed; no unexplained removed edges. Net change is 219 removals and 34 additions; 15 foods leave ranked output and cocoa enters. Do not describe this as missing foods or withdrawal of dietary admissions.

Shared generation completed with cocoa attribution and generic-olive-oil hold intact. Release validation found four mapper-test failures and three food status failures identical to the exact main baseline; [baseline validation](release-validation-baseline.json) records identities, not just counts. New ESM test-harness imports and retired-lupin validation were repaired without weakening assertions. Lupin Beans was removed from the surviving record's substance tags (the identity alias remains) to avoid a spurious substance card. Dietary governance (67 PMs), SEC history (140 snapshots), Findings (67 PMs), bibliography (1,036 citations), presentation and the 11-test ranked-selection suite pass. Composition/recipe regression suite: 68/68 passed. Combined mapper/renderer/selection suite: 88/92, the four unchanged baseline failures remain. No PR or publication until failed gates are resolved. Production build is being verified separately with the documented 4-GiB heap; final result recorded in the release-check report.
