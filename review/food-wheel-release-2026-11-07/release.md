# Scoped Food Wheel release — 7 November 2026

Authorisation: “Prepare and publish the validated Food Wheel update.” Only the reviewed Food Wheel, its selection implementation/tests and related documentation are included. No broader scientific release.

## Scope and preservation

Release branch: `release/food-wheel-canonical-2026-11-07`, based on GitHub main `b4d8f127854ae165e2bcd675a3b475044d63b984`. Reuses the publication worktree, preserving its unrelated documentation and untracked files. Source scientific branch `review/brs5-pm4-sec-assessment` remains at `521036b1d6c212e58c660f0f985e47617a71a716`, with zero commits ahead of its upstream. Its extensive dirty scientific, ontology, manuscript/training and review work is excluded. No reset, stash or bulk staging.

Included: existing `/explore/food-wheel/` HTML/SVG and evidence tables; the scope page; standalone Power selector; publication generator and focused tests; presentation contract and three appended approval records; this release evidence. Existing approval records are preserved and no baseline regenerated.

Excluded: all `docs/`, `src/`, registries, shared food/PM/recipe renderers, BRS Matrix, scientific records, SEC history, bibliography, manuscript work, generated build output, unrelated AGENTS/context edits and uncommitted scientific-source changes. The standalone selector is not imported by shared renderers. Production builds only copy the reviewed static snapshot; they do not recalculate food quantities or consume the scientific worktree.

## Canonical source model

The approved snapshot was extracted exclusively from canonical BRAIN structured food records. All 174 source-document hashes match the validated source checkout. Forty-one source documents differ from current GitHub main; they are not included as canonical-page changes in this narrowly scoped release. This preserves the existing publication model: a frozen, reviewed working-tree snapshot with provenance, expressly distinguished from currently published food/PM pages on the existing scope page. No independent food-composition research dataset replaces canonical records.

The published data retain original measured values, units, bases, material/preparation, source references and limitations. Private machine paths and the internal raw-record dump are removed, consistent with the existing publication contract; selected evidence disclosures remain. No clinical inference or dietary admission follows from diagram inclusion.

## Expected result

64 selected foods; 586 unique food–substance–PM edges; 119 covered targets of 151; 32 uncovered targets across 22 substances. Salmon roe is visible with 17 qualified connections and ranks first for DHA 2,000 mg/100 g and EPA 1,600 mg/100 g, each 100% Relative Source Power. Trout roe remains presence-only and unranked.

Ordinary edible preparations compete on compatible chemical substance/units/bases. Dry-weight, incompatible forms and unsupported conversions remain excluded. Reuses existing Relative Source Power, provisional ≥10%, minimum two comparable foods, maximum five; no padding. Dietary-row metadata and limitations join their actual canonical dietary record rather than an unrelated cached intervention row.

## Validation checkpoints

- Seven scoped publication tests pass, including exact counts, canonical observation preservation, roe, threshold, comparison boundaries, deduplication/cap and public-file hygiene.
- The scientific checkout's 21 focused reconciliation tests passed before publication preparation.
- Presentation gate passes: 691 protected files; three explicit author-authorised asset hashes appended.
- Four mapper tests fail identically in the prior scientific baseline, scientific recheck and untouched GitHub-main publication mapper: meal-pattern fixture, sixth-field fixture, rollout decisions fixture, food-strategy rollup fixture. 37/41 pass. No mapper/test changes included. The static wheel does not call this mapper at runtime, and prebuild dietary/SEC gates remain mandatory. These are disclosed legacy failures, not suppressed tests.
- Production build and browser/deployment results are recorded below as completed. No build-setting changes; Node 20.11.0, heap 4096 MiB, TERSER_PARALLEL=1, DOCUSAURUS_NO_PERSISTENT_CACHE=1, existing SEC_BASE_REF.

Supporting files: source-provenance.json, focused-tests.log, presentation.log. Full excluded source-worktree inventory and build logs are local review artifacts, not publication data.
