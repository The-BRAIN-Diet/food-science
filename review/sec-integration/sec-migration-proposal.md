# SEC Canonical Integration Proposal — Approval Required

## Observed Compatibility Boundary

- `scripts/lib/scientific-findings.mjs:213–219` only accepts
  `synthesised_evidence_confidence: not-yet-scored`; canonical tests enforce this.
- `src/components/ScientificFinding.tsx` accepts a display string, not a durable
  factor/status/versioned assessment contract. The isolated wrappers currently
  project assessment records without changing that canonical storage.
- `src/components/SecCalibrationPreview/assessmentAudit.mjs` already checks
  four states, factor completion, totals and qualified human-review provenance.
  This is preview logic, not production validation. Its integer checks are not
  evidence adjudication and require rubric-compatible cap and D0 integration tests.
- `ReviewCorrections/DocUtilityBar.tsx` uses authoritative public records for
  correction/review data and routes isolated preview URLs to Evidence & Audit.
  Do not globally relabel or infer canonical review completion from numerical SEC.

## Smallest Backward-Compatible Route

1. Keep the existing canonical confidence field and its legacy value unchanged.
   Do not encode status, totals or JSON into its string.
2. Propose one optional **relationship reference**, `sec_assessment_ref`, on a
   Finding pointing to the existing versioned audit-record shape. This is not a
   dietary evidence atom and is not implemented in these canonical records.
3. Reuse the sidecar shape already exercised by the pilots: PM/Finding identity,
   exact proposition, record ID/version/date/process, assessment state, factors/
   factor verification states, raw/adjusted totals, caps, evidence roles, source
   identities/access limitations, history and optional qualified human review.
   Pin a record version; do not silently follow an updated mutable score.
4. Missing reference preserves current Not scored behaviour. A conditional record
   displays its explicitly qualified estimate; unresolved essential factors cannot
   become a provisional record. A valid complete Codex assessment needs no human
   approval. Human-reviewed state requires recorded qualified review of that version.
5. Add reference-resolution checks without changing B/D, dietary admission,
   Direct/Derived, KC, SOP/lifestyle or food-composition logic. Enforce unique
   PM+Finding+version, exact proposition match and no orphan/cross-PM references.
   Never make an evidence-quality decision from structural validation.
6. Reuse the eight-segment indicator and standard audit disclosures. Require
   explicit adjusted-total validation against D1/B0/P0 caps and the D0 no-ordinal
   gate. Distinguish assessed zero from missing assessment. No PM-wide average.
7. Keep evidence-review and correction statuses sourced independently. A numerical
   assessment cannot alter them. Preserve submission/register functionality.

## Proposed Compatibility Checks Before Approval to Implement

- Legacy pages without the optional reference remain byte-equivalent in behaviour.
- Four states, conditional/unresolved-factor rejection, human review provenance,
  stale/unknown/conflicting references, changed proposition and version history.
- Raw sums, all existing ceilings, most restrictive cap, D0, assessed zero, null.
- Same substance in multiple PMs does not share an assessment automatically.
- Food composition, dietary roll-up, existing KC/SOP decisions and six atoms unchanged.
- Curated facts remain provenance, not a way to manufacture Replication credit.
- Existing audit anchors and SF links survive version advancement with old records
  retained. No canonical score enters production until this migration is reviewed.

## Integration Order

Approve scientific drafts and proposed intervention identities; approve the
storage/reference and validator contract; implement focused compatibility tests;
integrate three PMs only; verify routes/citations/food and correction behaviour;
then explicitly authorise release. No bulk migration is part of this proposal.
