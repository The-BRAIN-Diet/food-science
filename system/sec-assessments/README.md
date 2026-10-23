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
