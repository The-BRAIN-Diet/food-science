# Reference PM Section 4 / 4.1 alignment

Local presentation-only pass, 2026-10-19. Existing isolated checkout and canonical routes; no simulation renderer, schema or shared component changes.

| PM | Headline Findings | Disposition |
|---|---|---|
| BRS2-FM1-PM2, BHMT | SF1, SF2, SF5 (3) | Existing reaction/supply paragraphs relabelled; accepted SF5 proposition projected as a matching capacity topic. |
| BRS1-FM4-PM9, GABA | SF1, SF2 (2) | Existing paragraphs relabelled; original Scientific Lesson and Mermaid source preserved. |
| BRS6-FM1-PM2, Glycaemic Variability | SF1–SF8 (8) | Accepted propositions projected as explicit Section 4 topics with source citations. Oxidative-stress inconsistency and exposure-versus-variability limits retained. |
| BRS2-FM1-PM3, SAMe | SF1, SF4, SF5 (3) | Reaction and upstream integration topics relabelled; accepted MAT2B stability proposition introduced in Section 4. |
| BRS1-FM1-PM1, Amino-Acid Availability | SF1–SF6 (6) | Already aligned; entire file unchanged. |

## Convention

- Parent heading: `4. Mechanistic Basis + Scientific Findings (SFs N)`, using the existing dynamic rendering count.
- Paragraph headings derive `SF[n]` and exact `finding_label` from canonical Finding IDs, without a second stored identifier.
- Each topic links to its evidence disclosure; each headline Finding has a return link to its topic.
- Original section and replaced paragraph anchors are retained. Phenome-only Findings and interpretive constraints retain their existing placement and are not added to headline counts.
- Return links use the existing authored-island mechanism. GABA's existing lesson island is extended with a backlink rather than overwritten or duplicated.

## Two stale narrative statements reconciled to already accepted Findings

Glycaemic summary previously said seven days of training **reduced frequency, magnitude and duration**. It now uses the existing approved SF1 statement: an uncontrolled cohort association, with high-glucose frequency/duration statistically inconclusive. SF1 itself, its score and its evidence are unchanged.

SAMe narrative previously asserted **ordered ATP-first, methionine-second binding**. It now preserves the existing approved SF1 synthesis's ATP-first versus random-binding disagreement rather than implying a settled universal order. No new scientific conclusion, citation record, score or evidence atom was introduced.

## Verification

`node --test scripts/reference-pm-mechanism-alignment.test.mjs scripts/scientific-finding-presentation.test.mjs scripts/pm1-canonical-integration.test.mjs scripts/dietary-lever-traceability.test.mjs`: **61 passed, 0 failed**.

Alignment tests compile all five actual MDX documents through the existing layout transform and verify labels, dynamic counts, unique anchors, reciprocal destinations, generated-section freshness, byte-identical front matter, original lesson preservation and an unchanged SEC registry. Client-only Mermaid/curated components are test fixtures in the alignment render; those assertions do not claim a new diagram-rendering test.

`node scripts/check-sec-assessments.mjs HEAD`: passed, **69 preserved snapshots**. No assessment version or score changed.

`git diff --check`: passed.

The initial alignment test harness needed its existing client-component fixtures supplied; no production component was changed to resolve that test setup failure. Existing React `class`/`className` warnings remain out of scope.

## Changed files in this pass

Four PM MDX bodies (BHMT, GABA, Glycaemic Variability and SAMe), `scripts/align-reference-pm-mechanisms.mjs`, `scripts/reference-pm-mechanism-alignment.test.mjs`, and this review directory. `manifest.json` records source/front-matter hashes and preserved lesson content before this pass.

No canonical scientific front matter, dietary admission, food mapping, KC/SOP decision, score, bibliography, global rendering architecture or governing instruction was changed. No commit, push, PR, merge, deployment or full production build.
