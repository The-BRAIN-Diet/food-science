# PM food-source coverage — 6 November 2026

Local research/implementation pass complete with evidence gaps. Branch `review/brs5-pm4-sec-assessment`, unchanged HEAD `521036b1d6c212e58c660f0f985e47617a71a716`. No commit/push/merge/deploy. Preserve all concurrent PM, CoQ and renderer changes: this task did not author them.

Author approved 67-PM scope (including Cursor Hormones PM7/Circadian PM3) and up to five highest comparable source-qualified concentrations per eligible PM–substance. Two Cursor PMs remain in their separate checkout; no integration performed. Do not relabel candidate selections as separately author-adjudicated or merge branches from this handoff alone.

91 new source observations and seven existing observations qualified across 36 food pages. Original records, text and quantities preserved. 151 eligible PM–substance pairs assessed: 114 have five sources, five partial, 32 unresolved. Candidate selections: 588 edges, 62 foods; baseline: 467 edges, 50 foods. Underlying biological network unchanged. Exact-PM filtering reduces qualified BRS6 to 10 foods and Hormones to five; this is a different, narrower measure than earlier ontology reach.

Local preview: http://127.0.0.1:3162/food-wheel.html . Candidate checkbox distinguishes researched selections. Original preview3160 and production unchanged. All required reports/data under `review/pm-food-source-coverage-2026-11-06/`. Read manuscript rollup, gap report, validation report and source-level CSV before further work.

Focused validations pass: 6897 integrity checks; 36 MDX compiles; 91 source anchors; 139 immutable SEC assessments; presentation, dietary, Findings, bibliography and 20 regression tests. Browser labels and selections verified. Broad checks retain four mapper failures and three food-page qualitative-row defects, identical to task-specific baseline. No release-ready claim.

Next: author review of candidate rankings, research gaps and changed composition records. Review beef mapping hold and exact vitamer/food-form source gaps separately. Do not pad to five or turn composition into clinical efficacy. No new scientific admissions or SEC changes. Do not rerun backfill scripts as routine generation; selection/report/wheel scripts are reproducible. Full provenance and dated research decisions live in `target-research-decisions.csv` and `food_composition_research_log.csv`.

## Subsequent relationship-first reconciliation — 6 November 2026

Latest report: `review/pm-food-source-coverage-2026-11-06/reconciliation/FINAL-RECONCILIATION.md`. Supersedes the 37-gap disposition above: three completed (carnitine and two PC provision rankings), ten ordinary-food non-rankable under current protocol scope, 24 unresolved (two partial). Beef's two unscoped pending reviews now identify creatine_mg/coq10_mg; estimates and decisions remain held. PC choline-moiety measurements remain a local research extraction, explicitly not intact-PC mass or canonical food-page quantities. Candidate593edges; original151pair inventory unchanged; ordinary-food ranking denominator141.

Use `reconciliation/select-v2.mjs` and `reconciliation/wheel-v2.mjs` for the latest local projection, not the original selector/report scripts. The original artifacts remain historical. PM/SF/KC/SEC file hashes preserved;1,956 focused checks pass. Broad legacy failures unchanged. Browser reconnection unavailable this turn: updated data/generated artifact checked, no new UI pass claimed. No commit/push/deployment. Proposed scientific expansions require author review; none implemented.
