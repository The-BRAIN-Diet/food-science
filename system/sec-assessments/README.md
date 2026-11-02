# Versioned SEC sidecars

This optional integration preserves the existing
`synthesised_evidence_confidence` field and legacy pages. The three scientific
drafts were explicitly approved for local canonical integration on 2026-10-18.
The registry now retains 49 snapshots, including 22 pinned current assessments
and all earlier pilot versions. Original PM sources and the approval/identity
manifest are retained under `history/` and `integration-history.json`.

## Reference and snapshot

A Finding may supply `sec_assessment_ref: {id, version, sha256}`. The exact
snapshot lives in `registry.json` as `{sha256, record}`. This is a sidecar
collection, not a mutable latest-score lookup. IDs cannot change PM/Finding
ownership. Versions are positive integers; references must match the exact
Finding statement, PM and Finding ID. No whitespace or identity guessing occurs.

SHA-256 covers UTF-8 canonical JSON: recursively sorted object keys, original
array order, finite JSON values only. Node validates the actual digest; the
browser resolves only the pinned bundled snapshot. Publication must run
`node scripts/check-sec-assessments.mjs <published-base-ref>` (or set
`SEC_BASE_REF`). For a nonempty registry the explicit baseline is required.
The prebuild and predeploy gates run this check. Published snapshots cannot be
edited, deleted or backfilled; a correction adds a higher version and updates
the explicit pointer. Retain every earlier snapshot and scientific history.

## Assessment integrity

- `not-scored`: incomplete formal assessment, null totals; factor states
  distinguish established and unresolved judgements.
- `conditional`: separate estimated factors/totals; conditional formal factors
  and formal totals remain null. Reader label: Conditional estimate.
- `codex-provisional`: all factors established, identified assessment process,
  evidence roles, appraisal, limitations and history; no human approval required.
  Reader label: Provisionally assessed.
- `scientifically-reviewed`: additionally requires recorded qualified human
  acceptance of this exact version. Reader label: Scientifically reviewed.

Factors remain integers 0-2, never inferred from study count. Raw sum and adjusted
total must agree with existing ceilings: Directness 1 caps at 5, Bias Protection
0 at 2, Precision 0 at 4; use the most restrictive ceiling. Directness 0 has no
ordinal confidence. An assessed raw zero is explicitly distinguished from an
unperformed assessment; neither is displayed as a fabricated ordinal level.

Scientific adjudication is not automated by these structural checks. Evidence
review and correction status continue to come from their independent records.
Existing indicators, legend and collapsed audit disclosures are reused only for
referenced Findings. One current assessment appears per Finding; earlier versions
remain anchored inside its expanded history. Future versions never appear merely
because they exist. SEC does not change dietary atoms, ontology, KCs or food
composition. The separately approved PM2 intervention selections are recorded in
the integration manifest and projected through the existing food-strategy roll-up.

Initial scope is GABA PM9, Glycaemic Variability PM2 and SAMe PM3 only.

Verification: `npm run test:sec-integration` and
`node scripts/check-sec-assessments.mjs <published-base-ref>`.

## PM4 appraisal — 2 November 2026

BRS5-FM2-PM4 is explicitly integrated using the same pinned sidecar contract.
SF1, SF2 and SF4 receive provisional assessments; SF3 retains an incomplete
assessment with unresolved bias/precision rather than an invented total.
Evidence, DOI retrieval status and factor rationales are stored in the four
`brs5-pm4-f*-assessment` version-1 records. Regression coverage is in
`scripts/brs5-pm4-sec.test.mjs`.

| Finding | D/B/P/R | SEC | Status |
|---|---|---|---|
| PM4-F1: competition and glycan processing | 2/1/1/0 | 4/8 | Provisionally assessed |
| PM4-F2: processing potential versus immune outcomes | 2/1/1/0 | 4/8 | Provisionally assessed |
| PM4-F3: resistant-starch specialists | 2/unresolved/unresolved/1 | No total | Not scored |
| PM4-F4: inulin machinery and competition | 2/1/1/1 | 5/8 | Provisionally assessed |

Primary text was recovered via NCBI BioC for Patnode, Sonnenburg, Wastyk,
Rakoff-Nahoum and Crost. Two Scite read-fulltext calls (Sonnenburg and Ze)
returned abstracts only; neither supplied full methods or unique scoring evidence.
The original Ze donor-rescue methods and uncertainty remain the SF3 blocker.
Newer preprints were screened as qualified context, not silently counted as
peer-reviewed replications. No absent retrieval was scored zero.

Validation: 26/26 focused SEC tests; 64-PM Findings check and dietary admission
gate pass. All 98 prior snapshots and the complete PM4 page content, apart from
its four explicit assessment pointers, are unchanged. The publication checker
Git-output buffer was raised to 32 MiB because the baseline registry exceeds
Node’s default 1 MiB buffer; its scientific and immutability checks are unchanged.
This scope addition changes no SEC factor, ceiling, dietary admission or PM template.

Browser verification: the actual local PM4 route on port 3145 rendered all four
Findings. Clicking Evidence & Audit and SF4’s assessment link opened the pinned
version with 5/8, all factor rationales and DOI sources. The development client
compiled successfully after the standard mapping generator; no production build
or deployment was performed. Existing PM4 Finding placement was not changed.

## Assessment completeness — approved extension, 2 November 2026

Scientific Evidence Gaps concern what research has not established. Assessment gaps concern what this framework has not adequately assessed. Do not use their acronyms in reader-facing labels. Reuse versioned SEC records; no separate score or issue register is introduced.

New or reconciled incomplete records use `completenessVersion: 1` and `assessmentGaps`. Each Assessment gap has a stable `id`, `pmId`, `findingId`, `sources` (canonical citation keys or DOIs already present in the assessment), `dimensions`, `reason`, dated `attempts` with action/outcome, `resolutionAction`, `status` and dated `history`. Optional `evidenceGapIds` must resolve on the same canonical PM and express a distinct scientific question. Status is `pending`, `unassessable` or `resolved`; unassessable requires `justification`, resolved requires `resolution` evidence. Keep separate independently actionable tasks. Reuse the ID across subsequent immutable assessment versions; resolving a task requires reassessing its affected dimensions, not automatically setting a score.

Existing `factorStates` retain `established` for scored D/B/P/R. New incomplete records distinguish `pending` and `unassessable`, each with a linked Assessment gap. The legacy `unresolved`/`conditional` states remain readable in immutable snapshots but require tracked tasks in run-level reconciliation. All four current rubric dimensions are applicable: no not-applicable exemption is currently authorised. Numeric factors remain 0–2; totals, ceilings and Directness gates are unchanged. Pending/unassessable components are null, never zero.

`not-scored` with completeness metadata displays **Pending appraisal**. `evidence-unassessable` displays **Evidence Un-assessable**, requires a documented determination after reasonable retrieval, no pending factors, and null totals. This is not a scientific rejection. Mixed pending and unassessable dimensions remain Pending appraisal until outstanding work is adjudicated. Never label retrieval work unassessable just because it is unfinished.

### Mandatory Stage 2A/2B reconciliation and approval gate

Run `node scripts/check-sec-completeness.mjs --pm <canonical-id> --check` for structural coverage and `--require-appraised` for the scientific-appraisal gate. Omit `--pm` for framework coverage. Default report mode returns the inventory without claiming it passes. Every eligible active Finding needs a valid pinned SEC status. Explicit legacy `not-yet-scored` values count as pending, separately identified as `legacyPending`; they are not falsely counted as absent status. They still fail structural completion when dimension/task records are missing. Records without a recognised status or valid reference are reported as missing status, not assumed never researched. Scientific Principles and explicitly historical/contextual records are excluded. Existing publication checks preserve old snapshots; they do not grandfather a new Stage 2A/2B run through the strict completeness gate.

Report Finding coverage, dimension coverage and scientific Evidence Gap coverage independently. Missing gap-review metadata is reported as unknown, not zero review needs. Structural completeness requires all statuses and task links; scientific appraisal requires no pending work or missing assessments. An explicit unassessable determination can complete appraisal without supplying a numeric total. Qualified human scientific approval remains a separate existing requirement; pending work blocks it.

Do not generate scientific Evidence Gaps from missing/low scores or Assessment gaps. Do not delete them when scores become complete. Reconciliation compares existing gap IDs and flags removal for separate adjudication. Provenance `created_solely_from: missing-score|low-score|assessment-gap` is invalid; validators cannot infer the scientific adequacy of prose, which remains an adjudication responsibility.

PM4 SF3 version 2 preserves D=2, R=1 and null B/P. `PM4-F3-ASSESSMENT-B-1` tracks controls/confounders; `PM4-F3-ASSESSMENT-P-1` tracks replicate independence/effect uncertainty. Both are pending. Version 1's inconsistent access wording is preserved historically and explicitly corrected in version 2: a paper location is not proof of completed extraction. No new retrieval failure or unassessable determination was invented.

For scientific approval, supply `--base <reviewed-git-ref>` with `--require-appraised` to compare prior canonical Evidence Gap IDs; the approval gate rejects omission of this preservation baseline. Structural report mode remains available without a baseline.
