# PM8 historical test reconciliation — PR246

Base: `812c990e47aced1831ba5d608877ec54263833a1`. Tests and review evidence only; no scientific, renderer, generated-data, ranking or QC configuration changes.

Authority: `system/pm-evidence-tabs-contract.md`, “PM8 accepted-output reconstruction — superseding owner decision, 15 November 2026”, plus subsequent reference and SF renumbering decisions; `review/pm8-accepted-reconstruction-2026-11-15/report.md`. These explicitly supersede whole-frontmatter invariance and the twelve-Finding / investigation pilot. The preserved before-record supplies accepted scientific comparisons, not a newly generated fixture.

Original test sources are retained byte-for-byte as `.historical` files in this directory; the original 18-failure log remains unchanged in the parent directory. Historical assertions are not evidence of current scientific clearance.

| Previously failing check | Approved disposition |
|---|---|
| all pre-existing canonical fields are unchanged, including admissions, scores and hypotheses | Compare accepted scientific records against the preserved pre-pilot baseline; require hypothesis retirement, preserving archived Unestablished status. |
| twelve labels resolve explicit existing identities; no invented SOP numbers | Expect seven SF1–SF7 labels and retained canonical IDs; retain PM-only opt-in and invalid-target protection. |
| many-to-many explicit dietary admissions stay distinct from hypothesis association | Check retained urolithin dietary links without recreating retired hypothesis edges; flaxseed remains an SOP. |
| investigations retain all gaps and explicit unresolved assessments without fabricating active work | Require no active investigations/gaps/adjudications and verify archived investigations exist. |
| older grouped history is retained with exact candidate-specific successors | Check grouped decisions and exact successors in archive; forbid active history array. |
| missing identities and active actions fail validation | Test invalid association IDs on current records and missing next actions on archived investigations. |
| existing Investigations renderer exposes both groups and canonical evidence links | Exercise legacy investigation renderer against the archived pilot with its evidence links. |
| PM-only SF generation stays deterministic and retains twelve independent findings | Require seven deterministic current Finding disclosures. |
| PM scope explanations remain inside mechanism disclosure; output explanations and findings outside | Check retained scope/output anchors and absence of duplicated practice appraisals. |
| Finding renderer keeps original appraisal and exposes exact PM8 association label | Render F20 by canonical ID, SF5-SOP2 label and current canonical reference anchors. |
| full rerun preserves mission, identity, Principles, prior propositions and unrelated pages | Compare retained mission, Principles, relationships and propositions against approved reconstruction archive; obsolete unrelated-page hash contract preserved in historical source. |
| main mechanism and Section 4 Findings retained without duplicating evidence tabs | Expect seven Findings, two Principles, retained F13 anchor and no active hypothesis. |
| gaps are missing evidence links; authoritative active issues are not copied into gap list | Require absent active gaps, retain archive; absence is not scientific closure. |
| every pilot gap resolves its canonical Findings, bibliography and optional issue | Validate archived gap citations against archived Findings. |
| legacy non-opt-in shared tab order, URL-state selection and PM8-only opt-in | Exercise legacy tabs on archived gap-bearing records, preserving URL-state and non-opt-in checks. |
| legacy non-opt-in gap component retains blue flask, three records and exact destination links | Exercise legacy gap renderer on archived records, retaining exact evidence links and limitations. |
| pilot gap validator fails closed on missing evidence and unresolved references | Keep missing-evidence/reference negative tests on archived records. |
| owner removal policy prevents regeneration and retains unresolved evidence propositions only | Require removed queues/hypotheses absent from current frontmatter/body and retained in archive. |

## Additional metadata-only mismatch found during verification

Two protected-hash tests expected the exported BRS6 mapping timestamp `1794723742000`; PR246 kept main's `1794678169214.678` and preserved the exact diff in `mapping-metadata.patch.gz` to respect the commit size safeguard. The shared test helper requires the exact main timestamp, substitutes only the documented export timestamp in memory, then verifies the original full SHA256. Original pins, canonical bytes and all mapping content remain untouched; arbitrary timestamp or content changes fail. All other protected files retain exact byte-hash checks. This corrects the earlier 35/35 claim's applicability: that run preceded timestamp archiving; the final combined run below validates the pushed representation.

## Verification

- Reconciled historical suites: 20/20 PASS (18 obsolete expectations reconciled; two already-passing checks retained).
- Combined affected/protection suites: 55/55 PASS, no skipped tests. See `tests.txt`.
- Ranked viewer equivalence: 984 connections, unchanged.
- Retained Findings/appraisals/quantities/limitations/admissions, SEC and hypotheses isolation verified by reconstruction tests. Current associations cannot create retired hypothesis targets. Archived questions remain unresolved; no closure inferred.
- No active scientific records, generated mappings, ranked outputs, QC code/state or archived QC inputs changed in this repair.
- No production build or browser run: no runtime changes. No merge/deployment. QC remains suspended; this is not global QC PASS or release clearance.

Historical source SHA256 pm8-association-pilot.test.mjs: `52a6c06feb1fd20a1ef278a86afa7c89afcaa97eccbfc97c6d50392b7d84dc4c`.

Historical source SHA256 pm8-evidence-tabs.test.mjs: `373bb9e05aaea09399394f8824d49a60111c0a0cf024a3648b99da2a843f0291`.
