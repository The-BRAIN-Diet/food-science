# Finding presentation and section governance

Date: 2026-10-19. Isolated local canonical checkout only. No commit, push, merge or deployment.

## Existing rules and gaps

Stage 2A already required descriptive `finding_label` values and stable canonical identities; the renderer previously showed the label without a local SF identifier. Section generation already selected headline mechanistic Findings and kept interpretive constraints separate, but did not produce a dynamic count. Exact intervention relationships already existed through `description_finding_id` and `evidence_source.finding_ids`.

## Changes

- `src/lib/scientificFindingPresentation.mjs`: derive local SF labels; resolve exact currently selected SOP/lifestyle relationships without keyword matching or new admissions.
- `src/components/ScientificFinding.tsx`: reuse the derived title and resolve intervention links from the current canonical document context, not duplicated generated payloads.
- `src/plugin/pm-lever-layout/index.cjs`: extend the existing canonical MDX transform to count actual Finding components in the section and retain the pre-count anchor; shorten reader-facing canonical Finding references while preserving URLs, inline technical code and structured metadata.
- `src/components/SecCalibrationPreview/EvidenceAudit.tsx`: use the same short identifier and canonical label in the expanded audit return link. Collapsed audit titles already resolved from canonical labels through `CanonicalSecAudit`.
- `src/lib/dietaryLeverDisclosure.ts` and `scripts/lib/dietary-lever-disclosure.mjs`: supporting-mechanism links reuse the same derived reader title.
- Canonical PM1 MDX: presentation labels for F1 and F5 shortened to “Dietary protein and amino-acid availability” and “Food texture and amino-acid appearance”; regenerated its owned Findings section only. Propositions, IDs, evidence, SEC references and scores are unchanged.
- `system/scientific-finding-schema.md`: Stage 2A descriptive-label rule and cross-reference.
- `system/primary-mechanism-schema.md`: shared SF identity, dynamic count and exact intervention-link rule.
- `system/dietary-input-traceability-contract.md`: Stage 2B label verification and stale-link reconciliation; mirrored documented resolver refreshed.
- `scripts/sync-pm1-finding-presentation.mjs`: bounded presentation projection.
- Tests: new `scripts/scientific-finding-presentation.test.mjs`; updated `scripts/sec-assessment-integration.test.mjs`, `scripts/pm1-reassessment.test.mjs` and the two affected title expectations in `scripts/pm-dietary-reference-example.test.mjs`.

No stylesheet, global MDX override, scoring rubric, assessment registry, canonical intervention admission or food mapping changed in this execution. The existing section generator was preserved; reverse links are resolved at render time to avoid stale copies and unrelated bulk regeneration.

## Behaviour

PM1 renders `4.1 Scientific Findings (6)` at the existing `#41-scientific-findings` anchor. Tests compile and render collections of one, two and six Findings, exclude interpretive constraints and separate provenance markup, and verify the count follows the rendered collection. Existing biochemical propositions that remain actual Scientific Finding records are counted; this task does not silently reclassify them.

The selected PM2 interval-walking protocol resolves from PM2-F7 and displays as a Lifestyle Lever. Retired fish-before-rice is not revived. PM1-F5 has no selected SOP: its unresolved proposed intervention remains in the assessment history/limitation, not an admitted “Supports SOP” label.

## Verification

Focused suites: scientific-finding-presentation, pm1-canonical-integration, pm1-reassessment, sec-assessment-integration, dietary-lever-traceability and pm-lever-layout.

SEC publication gate: `node scripts/check-sec-assessments.mjs HEAD` passes with 61 immutable snapshots. `git diff --check` passes.

Live canonical PM1 on port 3005: visible short SF titles and dynamic count verified. Parent dietary group, nested 1.1.1 and Tryptophan six-atom disclosure passed real click/open/close tests. SF1 disclosure opens and closes. SF5 links to its exact version-2 audit anchor, displays the same title, and opens/closes by click and Enter. Existing blue disclosure styling reused. Screenshot: `sf-audit-labels.png`.

The final small return-link text-normalisation extension is covered by compiled-output tests; the screenshot captures the main Finding/audit-label implementation, not every return-link variation.

## Remaining issues, not silently repaired

- Broader `scientific-findings.test.mjs` exposes the preserved PM1 Focus / Attention Stability relationship's missing Finding-ID reference. This task does not invent the scientific link.
- The older `pm-dietary-reference-example.test.mjs` has two existing failures: documented Markdown differs from its canonical example, and reversed-bibliography expectations use obsolete positions. Its changed-title checks pass; scientific and numbering assertions were not weakened.
- Browser logs report inherited invalid nested paragraph markup in the phenome scoring-key section and `class`/`className` warnings. These are separate from this label/count task.
- Watchpack still reports EMFILE and navigation can initially show a loading page. No system limits, permissions or shared cache settings were changed.
- The preceding EAA-pool membership/composition proposal remains unimplemented and requires its own review.
