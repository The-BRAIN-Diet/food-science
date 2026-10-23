# PR #221 governance alignment

Resolution date: 2026-10-22 (Europe/Paris).

## Accepted baseline

Merged main commit `d453fe2aa1c0695baedabef15a70cdfc06eccf34` into the existing
`codex/sec-calibration-preview` branch. The three governance documents and
`SEC-calibration-rubric-proposal.html` are retained byte-for-byte from that main
version. No factor anchors, caps, scores, admissions or canonical PMs were changed.

## Historical material

`SEC-preview-verification.html` and the light, dark and mobile screenshots remain
byte-identical to PR head `be48b62a74c2740e0df01a3abda54921254fba8c`.
They document the original pilot and its historical 47-test/browser verification;
they are not current verification of later assessment branches or scientific policy.
Their original localhost address and pending-approval statements are historical.

## Preview wording

The introduction now identifies this branch as the original historical template
snapshot, not a copy of the latest canonical PM or the later scored pilot. The
existing synthetic 6/8 fixture remains explicitly illustrative, not assigned to SF1.
No later SF1/SF2 conditional assessment records were imported or recreated.
The four reader-facing states are explained separately from confidence, evidence
review and correction status. Codex provisional assessment does not require human
expert approval; scientifically reviewed status requires identified human review.

## Remaining boundaries

- The unchanged report still labels factor anchors and numerical caps as proposals.
  Resolving this conflict does not approve them or change their scientific authority.
- Historical canonical-storage/no-formula restrictions remain in the report and
  existing schemas. Later approved integration work is not migrated by this merge.
- The report mentions later conditional GABA estimates; this older branch contains
  only illustrative fixtures. They must not be substituted for those assessments.
- No new scientific assessment, review status or dietary admission is inferred.

## Verification

`node --test scripts/sec-calibration-preview.test.mjs scripts/evidence-confidence-indicator.test.mjs scripts/dietary-lever-traceability.test.mjs`

Result: 48 passed, 0 failed. Tests cover strict production/default/internal-build
exclusion without the explicit opt-in, neutral front matter, inventory/ontology
isolation, retained canonical content, indicator semantics and governance wording.
Governance baseline and historical-file byte comparisons passed. `git diff --check`
passed. No full build, fresh browser verification or deployment was performed.
