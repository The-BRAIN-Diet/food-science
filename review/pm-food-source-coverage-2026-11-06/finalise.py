import json,pathlib,subprocess,datetime,hashlib
D=pathlib.Path('review/pm-food-source-coverage-2026-11-06');s=json.load(open(D/'final-coverage-summary.json'));commands=json.load(open(D/'final-command-validation.json'));integrity=json.load(open(D/'final-integrity-validation.json'));render=json.load(open(D/'render-validation.json'));browser=json.load(open(D/'browser-validation.json'));baseline=json.load(open(D/'baseline-comparison.json'))
report='''# Validation report — 6 November 2026

Status: **focused task validation PASS; broader repository validation has unchanged pre-existing failures. Not a release approval.** No commit, push or deployment.

## Passed

'''
for x in commands:report+=f"- `{x['command']}` — exit {x['exit']}; {x['duration_ms']} ms.\n"
report+=f"\n- {integrity['checks']} preservation and edge/count/provenance assertions.\n- {render['compiled_food_documents']} food documents compile as MDX; {render['source_anchors']} new source anchors resolve.\n- 239 pre-existing canonical relationship records retain their scientific/admission fields. Generated food lists, mapping status, food evidence and coverage warnings legitimately change; identity and conversion fields remain unchanged.\n- SEC compared against HEAD `521036b1d6c212e58c660f0f985e47617a71a716`: 139 immutable snapshots preserved.\n- 20 focused regression tests pass.\n- Browser: 50 baseline and 62 candidate food labels independently checked; candidate toggle, reset, source details, BRS6, keyboard Hormones and glycine selection tested.\n- Original 68-substance biological network and its system connections preserved by deep equality.\n"
report+='''
## Unchanged broad failures

`compare-baseline.mjs` runs the same current code/concurrent PM work against (a) earliest saved pre-task food documents and (b) current foods. This is a task-specific food baseline, not a GitHub main or release exception.

Mapper: 37 passed, four failed in both states: legacy meal-pattern fixture, dietary filter expected count, missing PM dietary note, and historical SOP rollup count. Two source-growth assumptions were corrected: the preparation test now checks all sources rather than only the alphabetically first ten; the B3 test compares the actual Trp inventory across PM views rather than expecting exactly three food records. Their scientific assertions remain intact.

Food-page validator: broccoli Sulforaphane, shrimp Betaine and spinach Betaine qualitative public rows lack required status/amount display. Same three identities and messages in the task baseline and current state. They are not repaired as unrelated legacy presentation work. Existing warnings are retained in full logs.

No baseline was regenerated. Thirty exact citation-anchor repair hashes were appended under the existing author-approved provenance scope. Earlier approvals remain intact. No renderer or new public component was added by this task. The new wheel is an isolated local review artifact.

## Scope limitations

Whole-repository PM validators see 65 PMs in this checkout. The two author-approved Cursor PMs are included read-only in the 67-PM audit from their recorded separate branch; neither has an eligible admitted quantitative food relationship to add. This does not merge Cursor's branch or claim its entire checkout has passed this worktree's validators.

37 eligible pairs remain below five sources: five partial and 32 without a qualified quantitative selection. Every remaining target has a source-specific research/access/form reason and next action. Scite monthly quota prevented additional Scite retrieval; no inaccessible full text was represented as verified.

No production build or production browser check was performed: this is a local data/review task and known broad failures remain. The original preview and production wheel are unchanged.

See `final-command-validation.json`, `final-integrity-validation.json`, `render-validation.json`, `browser-validation.json`, `baseline-comparison.json` and the corresponding logs for reproducible evidence.
'''
(D/'validation_report.md').write_text(report)
m=json.load(open(D/'manifest.json'));m.update(status='LOCAL PASS COMPLETE WITH DOCUMENTED EVIDENCE GAPS AND PRE-EXISTING BROAD VALIDATION FAILURES — author review pending',backfills=91,existing_observations_qualified=7,food_pages=36,coverage=s,validation={'focused_commands':commands,'integrity':integrity,'render':render,'browser':'browser-validation.json','broader_comparison':'baseline-comparison.json'},last_updated=datetime.datetime.now(datetime.timezone.utc).isoformat());json.dump(m,open(D/'manifest.json','w'),indent=2)
handoff='''# PM food-source coverage — 6 November 2026

Local research/implementation pass complete with evidence gaps. Branch `review/brs5-pm4-sec-assessment`, unchanged HEAD `521036b1d6c212e58c660f0f985e47617a71a716`. No commit/push/merge/deploy. Preserve all concurrent PM, CoQ and renderer changes: this task did not author them.

Author approved 67-PM scope (including Cursor Hormones PM7/Circadian PM3) and up to five highest comparable source-qualified concentrations per eligible PM–substance. Two Cursor PMs remain in their separate checkout; no integration performed. Do not relabel candidate selections as separately author-adjudicated or merge branches from this handoff alone.

91 new source observations and seven existing observations qualified across 36 food pages. Original records, text and quantities preserved. 151 eligible PM–substance pairs assessed: 114 have five sources, five partial, 32 unresolved. Candidate selections: 588 edges, 62 foods; baseline: 467 edges, 50 foods. Underlying biological network unchanged. Exact-PM filtering reduces qualified BRS6 to 10 foods and Hormones to five; this is a different, narrower measure than earlier ontology reach.

Local preview: http://127.0.0.1:3162/food-wheel.html . Candidate checkbox distinguishes researched selections. Original preview3160 and production unchanged. All required reports/data under `review/pm-food-source-coverage-2026-11-06/`. Read manuscript rollup, gap report, validation report and source-level CSV before further work.

Focused validations pass: 6897 integrity checks; 36 MDX compiles; 91 source anchors; 139 immutable SEC assessments; presentation, dietary, Findings, bibliography and 20 regression tests. Browser labels and selections verified. Broad checks retain four mapper failures and three food-page qualitative-row defects, identical to task-specific baseline. No release-ready claim.

Next: author review of candidate rankings, research gaps and changed composition records. Review beef mapping hold and exact vitamer/food-form source gaps separately. Do not pad to five or turn composition into clinical efficacy. No new scientific admissions or SEC changes. Do not rerun backfill scripts as routine generation; selection/report/wheel scripts are reproducible. Full provenance and dated research decisions live in `target-research-decisions.csv` and `food_composition_research_log.csv`.
'''
pathlib.Path('project-knowledge/handoffs/pm-food-source-coverage-2026-11-06.md').write_text(handoff);(D/'CURRENT-WORK.md').write_text(handoff)
p=pathlib.Path('project-knowledge/handoffs/INDEX.md');t=p.read_text();entry='\n- [PM food-source coverage and qualified wheel — 6 November 2026](pm-food-source-coverage-2026-11-06.md): 67-PM pass, local research selections, unresolved source limits and validation status.\n';
if '](pm-food-source-coverage-2026-11-06.md)' not in t:p.write_text(t+entry)
(D/'README.md').write_text('''# Local PM food-source coverage review

Start with `manuscript_food_network_rollup.md`, `food_wheel_before_after.md` and `validation_report.md`. Full source decisions: `target-research-decisions.csv`; observations: `backfill-observations.json`; selected edges and scores: named CSV files. Gap report covers every eligible target.

Preview: http://127.0.0.1:3162/food-wheel.html (local server required). The preview folder is `review/visualisations/brain-food-wheel-pm-qualified-2026-11-06/`. Research candidates require author review; the baseline label denotes the original canonical source pool, not a fabricated history of individually approved selections.

Reproduction from repository root: `node review/pm-food-source-coverage-2026-11-06/select.mjs`, `python3 review/pm-food-source-coverage-2026-11-06/report.py`, `node review/pm-food-source-coverage-2026-11-06/wheel.mjs`, `node review/visualisations/brain-food-wheel-pm-qualified-2026-11-06/build.mjs`. Do not rerun source-mutating backfill scripts. Validation scripts and command outputs are saved in this folder.

No commit, push or production deployment performed.
''')
# Preserve exact task artifact hashes for review, excluding recursive index itself.
files=list(D.glob('*.csv'))+list(D.glob('*.md'))+[D/'qualified-network.checkpoint.json'];json.dump({str(p):hashlib.sha256(p.read_bytes()).hexdigest()for p in files},open(D/'artifact-hashes.json','w'),indent=2)
print('Reports, manifest and handoff updated')
