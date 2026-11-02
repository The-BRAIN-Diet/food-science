# Emergency presentation repair — 2 November 2026

## Outcome

130 affected canonical pages before removal; zero technical Dietary pathways panels after removal. Not deployed. No commit or push.

| Type | Before | After |
|---|---:|---:|
| Recipes | 15 | 0 |
| Foods | 27 | 0 |
| Substances | 22 | 0 |
| PMs | 64 | 0 |
| KCs | 2 | 0 |

79 pages had Composition, conversion & PM evidence; 51 PMs had Traceability status. Exact source files, routes, IDs, panel types, insertion sources, origins and removal decisions are in affected-pages.json. Counts reconstruct the pre-recipe-fix renderer using current scientific records; they are not a historical crawl or a live-deployment count.

## Cause and baseline

Commit c582b85c added DietaryPathways to the shared DocItem/Content footer. Recipe tags and matching food identities projected internal pathway rows without recipe-specific assessment. The parent commit has no global injection. Restore that aspect of the pre-injection presentation; do not revert later scientific work or independently approved page features.

129 pages received global output. Butyrate had an embedded DietaryPathways call. Three other authored DietaryOriginProjection calls currently resolve no pathway and produced no panel. All compatibility calls now render no technical panel. The user's explicit instruction to remove the panel everywhere governs the butyrate removal; its call, surrounding prose and scientific evidence remain. No unresolved removal decision remains for these two panel types. This does not certify every other legacy section as approved.

## Preservation

Only global injection and the technical panel implementation were removed. No canonical document, ontology edge, admission, source reference, food record or SEC snapshot was edited for this emergency repair. Existing concurrent scientific changes remain untouched. The data index and traversal remain operational and tested. No substitute public block was introduced.

## Validation

- 8 targeted pathway tests pass: full 64-PM inventory, composition edges, B6 routes, missing-evidence rejection, cycle bounds, all 129 affected automatic routes plus four embedded call sites, MDX compilation and recipe regression.
- 4 change-control tests pass: unchanged baseline, unauthorised additions/deletions/changes, missing/stale approvals, complete exact-hash approval.
- Prebuild presentation gate passes over 691 protected files.
- The older SEC baseline-comparison test was not run in this focused suite: it compares an earlier registry against concurrent authorised SEC work and is unrelated to this presentation repair. No claim of a clean full suite or production build.
- Actual localhost Neuroeshot page preserves Overview, Ingredients, Method, Nutrition, Extra Guidance, Brain Health Notes and existing foods disclosure; technical panel absent.
- Actual localhost almonds, Cross-BRS circadian PM1, BRS2-KC2 and butyrate pages checked; technical panels absent. See browser-checks.json.

## Change control

system/presentation-change-control.md records the user's hard rule and proposal fields. AGENTS.md, Stage 2A, Stage 2B and PM schema link to it. npm prebuild now runs presentation:check. Source/structure fingerprints detect new renderer blocks, components, markup, tables, headings and exposed PM technical identifiers. Changes require exact-result hashes and approval records with proposal, contract, representative example, scope and explicit author approval/source. No automatic approval or rebaseline command is provided.

The baseline is containment, not retrospective approval. Local validation cannot authenticate a human or stop deliberate edits to its own code. Baseline/approval/gate edits require review; repository branch protection/CI permission settings have not been changed. Runtime data changes outside the protected structure remain a coverage limitation, so browser review is still required.
