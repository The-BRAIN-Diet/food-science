# CoQ Principle provenance correction — 5 November 2026

Local-only work on review/brs5-pm4-sec-assessment, HEAD521036b1; no commit/push/deployment. Existing release handoff edits, training drafts and build outputs preserved.

## Cause and correction

PM10-SP1 had an unversioned Reactome link and a review citation but no `provenance_kind`. The audit renderer correctly rejected this as a new curated Principle. SEC validation checked assessments/history only; Findings validation checked Findings/freshness only. Neither invoked the renderer's existing Principle validation. CoQ tests checked Findings and preserved records but did not exercise this provenance failure. Passing those gates therefore missed a real presentation warning.

Verified original Reactome human pathway R-HSA-2142789, DOI10.3180/R-HSA-2142789.5: https://reactome.org/content/detail/R-HSA-2142789. It identifies Homo sapiens, stable pathway version5, and the CoQ production/compartmental relationships. Version here means pathway stable-identifier version, not an invented database release. The existing limitations remain unchanged.

Set `provenance_kind: curated-biochemical` and supplied database/accession/version/access date on the Reactome source. Guerra & Pagliarini2023 remains in canonical reference[1], the PM overview and source history (`before.mdx`); it was not mislabelled as curated database provenance. All scientific text, six Findings, admissions and page body remain exactly unchanged. SEC registry SHA-256 is unchanged (`preservation.json`).

## Prevention

Both `check-sec-assessments.mjs` (already mandatory in prebuild) and `checkScientificFindings` now call the same `scientificPrincipleErrors` as the renderer. The Findings gate checks Principles before skipping a PM without Findings. No renderer changes, new presentation or relaxed governance.

Regression fixture executes the actual SEC command in an isolated temporary repository and the Findings gate with no Findings. Missing classification, version, accession, empty sources and forbidden numerical scoring each fail; valid provenance passes. Science/body/SEC-byte preservation is asserted separately. The temporary fixture never edits canonical records.

Validation and localhost confirmation recorded below after completion.

## Results

20/20 focused CoQ/provenance/canonical-SEC tests pass. SEC139/history passes against github/main; Findings65/0, dietary65/0, bibliography1035 cited keys and presentation691 protected files pass. Localhost audit tab shows PM10-SP1 without the classification warning; expanded source displays R-HSA-2142789.5 and access date. No new numerical score appears. No full production build or publication performed; the actual prebuild SEC gate was exercised in positive and negative regression cases. Existing localhost preserved.
