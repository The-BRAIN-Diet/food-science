# SEC assessment completeness — local implementation, 2 November 2026

## Root cause and correction

The SEC sidecar supported unresolved null factors without requiring a tracked appraisal task. It therefore conflated missing appraisal with unassessability in the public “Not scored” label. Scientific Evidence Gaps were independently linked to Findings, but there was no run-level completeness reconciliation. Existing scores and caps were not the defect.

The smallest extension stores `assessmentGaps` in the existing immutable SEC assessment, with a `completenessVersion: 1` marker. No parallel scoring register or new numerical dimension is introduced. Existing snapshots stay readable; strict Stage 2A/2B reconciliation flags unmigrated legacy records rather than silently treating them as complete. Read `system/sec-assessments/README.md` for the field contract and permitted states.

Assessment gaps are displayed as canonical disclosures within the affected SEC assessment in Evidence & Audit. The main Finding shows Pending appraisal, or Evidence Un-assessable only following an explicit supported determination. Scientific Evidence Gaps retain their existing tab and records. No Open Issue or scientific Evidence Gap was created by this work.

## SF3 worked example

PM4-F3's canonical D=2 and R=1 remain unchanged and provisional; B and P remain null. Version 2 adds:

| Assessment gap | Work remaining | State |
|---|---|---|
| PM4-F3-ASSESSMENT-B-1 | Verify original donor-rescue methods, controls, inoculum handling and donor-specific confounders | Pending appraisal |
| PM4-F3-ASSESSMENT-P-1 | Verify replicate independence and extract uncertainty around the donor-rescue effect | Pending appraisal |

Both link to Ze et al., DOI 10.1038/ismej.2012.4. Attempts are explicitly attributed to the previous appraisal; no fresh failed retrieval is claimed. The correction distinguishes existence of a full-text location from completed extraction/inspection. Version 1's contradictory accessibility sentence remains immutable historical evidence; version 2 clarifies it. Neither gap has been adjudicated unassessable. Resolving either requires a new versioned appraisal, not a silent factor update.

## Before/after PM4 reconciliation

| Measure | Before | After |
|---|---:|---:|
| Eligible Findings | 4 | 4 |
| Completed numerical assessments | 3 | 3 |
| Pending Findings | 1 | 1 |
| Unassessable Findings | 0 | 0 |
| Scored dimensions | 14 | 14 |
| Pending dimensions with tracked tasks | 0 | 2 |
| Unexplained missing dimensions | 2 | 0 |
| Scientific Evidence Gaps | 2 | 2 |
| Structurally complete under new contract | No | Yes |
| Scientifically appraised | No | No |

Both existing scientific gaps are unchanged. One links to two Findings; the plant-variety gap links to SF2. No additional unresolved scientific proposition was established by this appraisal-tracking change. Review-required metadata is absent on both gaps, reported as unknown rather than assumed clear.

## Framework coverage (read-only)

64 canonical PMs, including Cross-BRS, were included; an old BRS6 PM5 redirect without a canonical PM ID was excluded. There are 300 eligible active Findings after excluding explicit Principle/historical/context classifications: 26 completed pinned assessments, 274 pending (30 pinned partial/conditional assessments and 244 explicitly marked legacy `not-yet-scored`), 0 explicitly unassessable and 0 without a recorded status. The 244 legacy pending records lack dimension/task integration; they must not be counted as missing statuses or assumed never researched. They require reconciliation before new scientific approval.

Before this extension the same framework inventory had 0 tracked pending dimensions and 1,075 unexplained missing dimensions under the strict contract; Finding counts and scientific Evidence Gap counts were identical.

Of 1,200 applicable dimensions, 125 have numerical judgements, 2 have tracked pending tasks and 1,073 are unexplained under strict reconciliation. There are 34 scientific Evidence Gaps, all linked to Findings, eight linked to multiple Findings; all 34 lack explicit review-required metadata. The report cannot conclude that none need review. Framework-wide strict completeness does not pass and is not claimed complete. Full rows and diagnostics are in `framework-coverage.json`.

## Validation and limits

- 43 focused tests passed: completeness scenarios, real PM4 SF1–SF4, representative PMs across BRS1–BRS6, versioned SEC integration and canonical rendering.
- PM4 `--check --base github/main` passes; `--require-appraised --base github/main` exits 1 as required while B/P remain pending.
- Scientific Finding consistency: 64 PMs, zero problems. Dietary admission validation: 64 PMs, zero issues.
- SEC registry: 103 valid snapshots. All 102 snapshots present before this change are unchanged (including the original 98); only SF3 version 2 was added.
- Browser: real PM4 SF3 version-2 audit opens; Pending appraisal and both canonical Assessment gap disclosures render; controls gap expands to the source, prior attempts, action and history.
- Automatic checks validate references/states, reject score-only gap provenance and flag removal of prior gap IDs. They cannot judge the scientific adequacy of prose or discover an unrecorded motivation. Scientific adjudication remains necessary.
- No current rubric factor permits Not applicable; the implementation does not invent such an exemption.
- Production build passed with the 4 GiB Node heap and existing minifier configuration, writing to `/tmp/brain-sec-completeness-build` while localhost remained available. Server/client compilation and 1,176 HTML pages completed; tag, Browserslist and broken-anchor warnings remain.
- No new scientific approval was recorded. Qualified human review and the outstanding B/P appraisal remain required; unrelated legacy assessments were not automatically migrated.

## Changes in this work item

- `src/lib/secCompleteness.mjs`: strict task/state and run-level reconciliation.
- `src/lib/secAssessments.mjs`: backward-compatible status validation and reader labels.
- `src/components/SecCalibrationPreview/EvidenceAudit.tsx`: canonical Assessment gap disclosures.
- `scripts/check-sec-completeness.mjs`: report, structural and appraisal gates.
- `scripts/sec-completeness.test.mjs`: required regression cases and representative framework checks.
- `scripts/sec-assessment-integration.test.mjs`: load the real shared disclosure in rendering tests.
- `system/sec-assessments/registry.json`: append SF3 version 2; PM4 MDX pins and regenerates that version.
- `system/sec-assessments/README.md`, `system/scientific-finding-schema.md` (Stage 2A), `system/dietary-input-traceability-contract.md` (Stage 2B), `system/pm-evidence-tabs-contract.md`: authoritative instruction updates.
- This report and its two JSON coverage files.

Earlier uncommitted PM4 scoring, plant-variety research and Section 4 restoration remain intact and are not described as newly performed here. No commit, push, merge or deployment.
