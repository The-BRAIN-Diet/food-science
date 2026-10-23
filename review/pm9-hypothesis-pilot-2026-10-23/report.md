# Scientific Hypotheses — PM9 pilot

**PASS WITH LIMITATIONS.** Implemented `PM9-H1` / **SH1 — Glucose Appearance and Mitochondrial Biogenesis**, status **Unestablished**. Proposed biological direction: **BRS6-FM1-PM1 → BRS4-FM4-PM9**.

## Minimal extension

An optional `scientific_hypotheses` array records stable IDs, titles, testable propositions, source/target direction where applicable, rationale, role-separated Finding links, study-identified source evidence, limitations, competing explanations, required tests, status and dated provenance. Previously published connections additionally retain their original page, linked PM, href, source commit, original statement and prior review explanation.

Allowed statuses are Unestablished, Under Review, Supported and Rejected. No SEC/CC fields or inherited scores. Supported status never automatically becomes an approved relationship. The complete minimal contract is copied as `schema.md`; the exact pilot record is `hypothesis-record.json`.

## Evidence interpretation

The carbohydrate–whey exercise study is contextual evidence: altered acute PGC-1alpha mRNA did not establish glucose-appearance mediation or mitochondrial formation. No new SF was created. Existing PM9-F1 (exercise/mitochondrial-marker context) and BRS6-FM1-PM1 / PM1-F4 (glucose-appearance measurement context, including a null endpoint) are linked as **contextual** Findings. Neither is labelled direct support or contradiction of the hypothesised causal chain. No independent-evidence count or score is derived from these links.

Required evidence must measure glucose-appearance kinetics, assess appropriate signalling and longitudinal formation/content endpoints, and address exercise, insulin, glycogen, protein and energy availability. Brain and ADHD claims require separate direct evidence.

## Relationship disposition and ownership

The hypothesis is held on the target PM9 page. The historical outward reference **PM9 → glucose appearance** is preserved separately from the hypothesised biological direction **glucose appearance → PM9**. The old cross-system bullet is removed from the active relationship list; its original and later review wording remain in the historical records. The overview assertion is qualified and points to SH1.

No source-PM edit or reciprocal approved edge was added. Historical hrefs marked hypothesis-only are blocked in cross-BRS graph extraction and automatic connection population, including for a Supported hypothesis.

## Numbering and compatibility

An **unnumbered Scientific Hypotheses** heading appears immediately before **§4.1 Scientific Findings**. This avoids inventing §4.0 or renumbering Findings, anchors or counts. The native compact disclosure has an always-visible Unestablished badge and a distinct dashed border. PMs without hypotheses render no empty section.

The PM9 page historically uses **§5.2** for connection navigation, while the existing canonical cross-BRS graph extractor reads **§6.2**. That graph therefore did not previously extract this legacy PM9 edge. The pilot does not migrate numbering or broaden other PM extraction; explicit metadata filtering prevents the relationship entering the graph if normalized or repopulated later. A synthetic §6.2 regression confirms this safeguard, including for Supported status. Future scientific approval would require a separate explicit relationship decision.

## Validation

- **228/228** focused tests passed: ten pilot tests plus 218 existing enrichment/roll-up/governance/preservation checks.
- Full PM9 MDX compiled with the existing Docusaurus processor and layout plugin. Its existing Finding projection, IDs, anchors and count remain unchanged.
- Scientific Findings check: **62 PMs, zero problems**. Scientific Hypotheses check: **zero problems**.
- SEC registry/history: **69 valid snapshots**. Existing score records unchanged.
- All pre-existing PM9 structured scientific fields are identical; all other canonical PM source hashes are identical.
- Approved manuscript datasets and all six shards are byte-identical to the preceding exported roll-up. The hypothesis appears in no admitted input or food record.
- Browser checked the real hypothesis component in a focused rendered PM9 example: compact status, expansion, correct direction and position before §4.1. This is a focused example, not a full routed production-page browser test.
- Whole-repository mechanism validation retains existing failures; no new issue introduced. No full production build attempted.

## L-carnitine check

The canonical `l-carnitine` record and page already exist in this checkout and exactly match the approved record at `d3570391`. No retrieval, duplicate substance, canonical food edge or overwrite was performed.

Work remains isolated on `codex/deferred-stage2ab-enrichment`. Previous uncommitted roll-up work is retained. No commit, push, merge, new dietary admission, scientific reassessment or repository-wide hypothesis migration was performed.
