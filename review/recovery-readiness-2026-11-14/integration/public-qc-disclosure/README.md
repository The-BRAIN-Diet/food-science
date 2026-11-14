# Temporary public-QC disclosure

Author approval, 14 November 2026: implement the temporary public-QC disclosure, test and refresh draft PR244; preserve archived issues and QC suspension; no issue closure, merge or production deployment.

## Implementation

Existing shared Review & Corrections panels, the PM Evidence & Audit correction-status surface, and the existing register show the exact approved notice: “Public review-history reconciliation is incomplete. Missing review entries do not indicate scientific clearance or resolution of previously recorded issues.” A missing page history is labelled unavailable/incomplete. Empty register results say available review entries/history incomplete, not zero known issues. Available pending/open records remain visible and retain their statuses. No new tab or scientific section.

The explicit temporary presentation flag is independent of generator fallback data and remains until separately validated reconciliation. It does not activate archived inputs, close FW001/FW003 or reactivate QC. Shared presentation and Framework QC contracts record the approval; Stage 2A/2B science, PM templates and admissions do not change.

## Focused verification

- Actual React server-render tests: 7/7 pass (missing history, retained pending record, empty register, retained open register issue, and partial applied history never implying clearance).
- Current hypothesis suite: 10/10 pass.
- Three-viewer ranked equivalence: 984; manifest and ranked snapshot byte-identical to bca0a97f32acb36089833ec0d6c24c2618f22f69. Counts remain 984 connections, 79 foods, 112/158 targets.
- Existing public-QC suite: 9/10, with the original expected-two/actual-zero missing-input failure unchanged. No assertions reset or issues declared closed.
- Archived recovery JSON inputs, package/gate configuration, generator and generated public-QC dataset byte-identical; see protected-files.json.

The initial implementation checkpoint was followed by the verified deployment below; no production action is authorised. The disclosure dispositions the publication limitation, not the underlying missing-input reconciliation or scientific clearance.


The first deployed browser check found that PM pages wrap review history in a separate Evidence & Audit surface. The disclosure now also appears at its existing Correction status heading, with no duplicate notice inside the nested review-record disclosure. No SEC legend, assessment, rating, or record changed. Two additional real-render tests cover this path and partial-history statuses.

Broader existing PM audit suites: 18/27 pass, nine failures reproduced with the exact pre-change component sources from bca0a97f. This read-only comparison replaced only four component/module reads in memory (no source files or fixtures were changed). The identical failures concern existing Finding HTML/gate expectations, missing EvidenceGaps/Disclosure test dependency mocks and legacy rubric fixture expectations. They are separate from the seven passing disclosure tests and are not fixed or marked resolved here. See pm-audit-tests.log and pm-audit-baseline-tests.log.


## Final deployed verification

Tested runtime: `9402186a0e9e10ac4136d4c701ed3afd8d791f1b`. Netlify deploy `6af8cf648d79fc5d557264c5` is ready on that exact SHA, with deploy-preview success reported by GitHub; normal production build/deploy took368seconds. No build configuration or precheck was changed.

[Immutable PM4 preview](https://6af8cf648d79fc5d557264c5--food-science.netlify.app/docs/biological-targets/brs5/fm2/brs5-fm2-pm4-microbial-ecological-turnover-and-competitive-selection/?review=1). The PM Correction status area shows the exact notice and unavailable/incomplete label. Nested records open normally and do not repeat the notice. Desktop and390×844 mobile verified; viewport reset. Screenshots alongside. Existing public food-page nutrition tabs are unchanged; their review panel is not publicly exposed. No new tab or register exposure added.

Twelve route/hypothesis smoke checks pass; all nine hypotheses retain Unestablished disclosures. Three viewer datasets and Explorer navigation JS match the validated candidate and previous local production output byte-for-byte. ECS PM3 genistein link remains correct. These are data/page smoke checks, not a repeated interactive test of every wheel feature. Hypothesis isolation10/10 rerun after the PM wrapper repair; ranked equivalence984 unchanged.

The production deployment remains6af5e82e2ee5b7f0e5fd9bb9 at main f0845f3a29e078bc63f613e8baec6b889e716285. No merge or production deployment occurred. A later evidence-only commit records these results and is distinct from the tested runtime above.

Disposition: approved temporary disclosure implemented and verified. Underlying missing-input reconciliation, historical expectations and archived issue statuses remain unresolved/unchanged. QC remains suspended. This is not global QC PASS, scientific clearance, issue closure or a freeze.
