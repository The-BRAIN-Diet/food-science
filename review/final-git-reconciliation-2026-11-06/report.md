# Final Git reconciliation and Cursor handover — 6 November 2026

## Scope and remote state

Inspected publication worktree, original scientific worktree and Cursor/localhost checkout. Fetched `github` and local `origin` in the shared Codex repository, and GitHub `origin` in Cursor. No pull, merge, reset, stash, stage, commit or push performed.

| Checkout | Branch / HEAD | Upstream comparison after fetch |
|---|---|---|
| Publication | release/food-wheel-2026-11-06 / 40a94f2b | Tracks github/main: 0 ahead, 1 behind. Only the merge commit is ahead; tree identical. github/release/food-wheel-2026-11-06 equals HEAD. |
| Scientific | review/brs5-pm4-sec-assessment / 521036b1 | Equals github/review/brs5-pm4-sec-assessment: 0 ahead/behind. Dirty files are not on remote. Main additionally contains the wheel release. |
| Cursor / localhost | review/brs-x-hormones-pm7-circadian-pm3-2026-11-06 / 54bb05bb | Equals origin branch: 0 ahead/behind. Separately pushed BRS-X work is not merged into main. Dirty files are not on remote. |

All three active branches have **no committed-but-unpushed changes**. Cursor's repository also retains two historical commits absent from every fetched remote: 1dde10ad (preview-dietary-requirements-demos) and 5515585a (unpublish-therapeutic-areas). They are unrelated to this release; preserve, do not publish incidentally.

Fetch advanced remote main from a00d6b0d to b4d8f127. Wheel release is already live via PR #234. Publication branch's upstream remains main because it was created from main; push did not change tracking. This is not a missing push. No upstream configuration changed here.

## Local work before this task

Publication: one modified tracked handoff, 131 untracked files (47 partial build outputs, 84 non-build files). Non-build files include the inspection ZIP, original export folder, two separately extracted copies and post-release verification/screenshot. Leave duplicate folders untouched; do not commit all copies.

Scientific: 40 modified tracked files, 3,033 untracked files (2,942 build outputs; 91 non-build). Local implementation includes:

- CoQ10 food/source reconciliation across five modified food pages; substance-page composition/navigation and bounded ADHD clinical content; PM10 Principle provenance and clinical summary; PM1 CoQ link and BRS4 hub PM10 navigation.
- Clinical SEC remains pending in the actual local records; no completed score should be inferred. CoQ dietary-gate review exists separately. Read both review reports before further adjudication.
- SOP/Lifestyle food/substance metadata across PMs, generator, two renderer changes, three untracked mapping modules, tests and governance. These are not included merely because the static wheel was published.
- Scientific-Principle validation additions in Findings/SEC checks, regression test and provenance review.
- Four local training drafts/notes. Keep local under INTERNAL-DOCS; not manuscript release content.
- All three original visualisation source directories: generators, extractors, data snapshots, research records and tests remain untracked. Published static HTML/SVG exist on main, but these reproducibility sources are not yet in GitHub.

Cursor: 32 modified tracked files, 2,992 untracked files (2,984 build outputs; eight non-build). Includes overlapping intervention mappings and renderers, vinegar/acetic-acid ontology, bibliography/tags/registry changes and a recipe edit. Treat concurrent ownership separately; do not copy either complete checkout over the other.

No modified manuscript files were found in the scoped tracked/untracked inventories. Review/paper evidence artifacts remain local; this is not a claim that every historical worktree has been audited for manuscript work.

## Diff review and preservation

Exact file lists, hashes, branch reports and full tracked patches are supplied alongside this report. Non-generated code/scientific diffs inspected by scope. The large generated rollup was reviewed structurally: strategies unchanged; 49 relationship identities retained, 13 enriched with identity mappings; gaps 49→37 (12 removed mapping gaps); added intervention_mapping. These gap removals are implementation changes requiring scientific/governance validation before release, not evidence that all scientific uncertainty is resolved. Fourteen new scientific-checkout approval records append to the old list without removing prior records. Main separately has three wheel publication approvals; preserve both sets during integration, never choose one whole file.

No existing scientific files or decisions were edited in this handover. Preservation hashes are checked separately. This is a Git/scope review, not renewed scientific adjudication or a passing release-validation claim. No production build run.

## Documentation proposed now

- AGENTS.md: short Food Wheel/Cursor safety and orientation rules.
- PROJECT-CONTEXT.md: published methodology, exact BRS6/Hormones diagnosis, proposed-only refinements, unresolved source/ranking/clinical questions and checkout boundaries.
- PROJECT_CONTEXT.md: compatibility pointer requested by author; existing hyphenated document remains the maintained authority.
- This report, exact inventory and preservation check.

BRS6: 78 magnesium sources + cockles + trout roe = 80; seven targets, 129 food edges. Hormones: 81 zinc sources through one PM5 target, with admitted receptor dependency and candidate testosterone-response evidence kept distinct. Shortlist views (28/10 foods), ranking changes, dose filters and claim-level UI refinements are **proposals only**, not implemented or approved for production.

## Recommended commit/push sequence — pending approval

1. Documentation-only handover: AGENTS.md, PROJECT-CONTEXT.md, PROJECT_CONTEXT.md, publication handoff, report/file inventory/preservation result and production-verification.json. Decide whether to retain one inspection ZIP or one extracted export; do not add duplicate extracts or build outputs. Full patch/hash inventories are local review artifacts unless explicitly selected.
2. Reproducibility-only wheel batch from the scientific worktree: reviewed visualisation generators, extraction code, frozen source/research records and tests, preserving original baseline. Exclude redundant screenshots/binaries unless needed. Confirm no credentials/local private paths before publishing source snapshots. Static production wheel does not need republishing merely to preserve its generators.
3. Separate coherent scientific implementation batches: (a) CoQ/provenance repairs and tests; (b) intervention food/substance mapping, generated output, renderers, tests and contracts. Preserve linked approvals and immutable SEC. Revalidate before any push/merge/deploy.
4. Coordinate Cursor's acetic-acid/recipe work and already pushed BRS-X branch separately. Main integration overlaps presentation approvals and several scientific files. Do not pull blindly into the dirty checkout.

Wait for author approval on the documentation commit set first. Nothing is staged or published by this reconciliation.
