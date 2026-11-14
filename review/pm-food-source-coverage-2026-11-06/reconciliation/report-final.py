import pathlib,json,collections,csv,shutil,datetime
D=pathlib.Path('review/pm-food-source-coverage-2026-11-06');R=D/'reconciliation';V=pathlib.Path('review/visualisations/brain-food-wheel-pm-qualified-2026-11-06');rows=json.load(open(R/'target-reconciliation.json'));q=json.load(open(R/'qualified-network.checkpoint.json'));validation=json.load(open(R/'validation.json'))
text='''# Final relationship-first food-source reconciliation — 6 November 2026

Scope: all 37 previously incomplete PM–substance targets. Original canonical roles, limitations, identifiers and classifications were read from current records; their exact text is preserved in `target-reconciliation.json` and CSV. Existing 114 complete targets were not scientifically reassessed. No PM mission, dietary admission, KC, Finding or SEC was edited.

## Disposition

- **3 completed local source rankings:** L-carnitine in BRS4-FM3-PM6 and phosphatidylcholine provision in BRS1-FM2-PM6 / BRS2-FM3-PM7.
- **10 legitimately non-rankable as ordinary-food optimisation lists under the current recorded relationship.** This is a ranking disposition, not withdrawal of an admission or denial that related substances occur in foods.
- **24 unresolved research/mapping targets:** two have four qualified foods; 22 have no comparable selection. Their earlier evidence and explicit limitations remain available.

Overall: 151 admitted/eligible pairs remain in the inventory. Ten are excluded from the ordinary-food ranking denominator, leaving 141 rank-eligible pairs. 117/141 (83.0%) have five selected foods; 119/141 (84.4%) have at least one. These are local source-ranking measures, not scientific confidence, clinical benefit or independently author-approved food selections. Candidate network has 593 edges. The earlier 37-gap report is retained as history, not the latest disposition.

## Completed corrections

**Beef/carnitine:** Two beef review records had no `nutrient_key`; the mapper treated each pending review as a hold on every supplementary amount. Added `creatine_mg` and `coq10_mg` respectively. Titles, decisions, original estimates, quantities, sources and authored page text are unchanged. Creatine/CoQ10 estimates remain withheld. Independent L-carnitine and amino-acid source rows are no longer incorrectly blocked. Carnitine ranking: beef 45.58, pork 12.76, chicken 3.83, cheddar 0.32 and miso 0.22 mg/100g, within the source-specific free-L-carnitine study group. Repeated-extraction uncertainty is not population variance; raw/study preparations do not imply cooked-food equivalence.

**Phosphatidylcholine:** Both PM records explicitly concern PC as a choline-provision route. USDA Release 2 measures choline moiety attributable to PC. This is an appropriate comparator for that relationship, provided its unit is retained. No intact-PC molecular mass, total-choline substitution or absorption efficiency was calculated. The extracted seven-food comparison produces five foods: raw egg yolk 630; fried whole egg 250; braised beef liver 250; grilled specified beef steak 87; canned mixed-species shrimp 67 — all **mg choline moiety from phosphatidylcholine per100g food**. The two 250 values are tied. Soy65 and canned pink salmon52 remain in source extraction. These are highest within the verified seven-food pool, not an exhaustive worldwide top-five claim. Original USDA food codes, samples, preparation and table pages are in `pc-source-observations.json`.

PC observations are **local research extraction/candidate ranking records**, not new quantities silently inserted into canonical food pages. No new identity or scientific admission was created. Author review may decide whether to carry this exact analytical basis into canonical composition presentation.

Original source: https://www.ars.usda.gov/ARSUserFiles/80400525/Data/Choline/Choln02.pdf (methods pp4–6 and food tables). The total-choline confidence code is not assigned to individual PC observations.

## Ranking corrections and preserved limitations

The previous general-food pectin entries were not an adequate match to PM4's specifically named citrus pectin. Four PM4 edges are removed from the candidate qualified projection; food measurements and the PM admission remain untouched. The two glucose-food observations also remain as composition evidence, but are no longer scored as an optimisation list for a mouse sensory-stimulus relationship. NAC, the defined FOS/GOS mixture, oligofructose protocols, pea-fibre arabinan, tricaprylin and the insulin-sensitivity RS protocol retain their exact experimental scope without demanding five ordinary-food equivalents.

The cysteine/glutamate/glutamine review must not impose a free-only food requirement that their canonical roles do not contain. This interpretation is corrected, but cystine, acid-hydrolysed Glx and protein-sequence estimates are not silently converted or relabelled. Their comparable measurements remain unresolved. Milk NR may be retained in original volume units: arbitrary per100g conversion is not required to retain evidence, but source-specific skim milk must not become generic whole milk.

## Proposed scientific changes — not implemented

1. If broader ordinary-food provision is wanted for pea-fibre arabinan, citrus pectin, FOS/GOS, oligofructose or protocol-specific resistant starch, adjudicate that proposition separately. This reconciliation does not broaden the existing admission.
2. Clarify the existing upstream vitamin-food relationship for active PLP/FMN if desired. Do not use total B6/B2 as measured active-cofactor amounts or change the canonical chemical identity in this task.
3. FOS/GOS PM5 already says its Capacity admission requires review. That existing concern remains pending; this task neither resolves nor withdraws it.
4. Any cystine-to-cysteine precursor mapping must retain its own supported relationship rather than renaming its measured analyte. No new precursor admission was made.

## Validation and limits

1,956 focused assertions pass: scientific/SEC file hashes unchanged, all37 dispositions present, only the two intended beef review keys changed, held estimates remain held, original PC units preserved, no duplicate or over-five selections, and non-rankable targets excluded from the local qualified score. Presentation and dietary-governance checks pass; SEC history remains valid at139 snapshots. The four mapper failures and three qualitative food-page failures are identical to the recorded pre-task baseline. No production build or deployment.

The local wheel was regenerated from the reconciled candidate data, preserving the underlying68-substance biological network. Browser reconnection was unavailable in this turn, so no new browser-interaction pass or screenshot is claimed. Prior browser tests cover the unchanged renderer; current validation covers the revised data and generated artifact.

## All37 decisions

| PM | Substance | Disposition | Reason and next action |
|---|---|---|---|
'''
for r in rows:text+=f"| {r['pm_id']} | {r['substance_id']} | {r['disposition']} | {r['reason']} {r['next_action']} |\n"
(R/'FINAL-RECONCILIATION.md').write_text(text)
# Preserve earlier preview reports, then point the review UI at the latest reconciliation.
for name in ['GAP-LEDGER.md','TOP-FOODS.md']:
 if not(V/(name+'.before-reconciliation')).exists():shutil.copyfile(V/name,V/(name+'.before-reconciliation'))
(V/'GAP-LEDGER.md').write_text(text)
top='# Reconciled local food rankings\n\nBaseline canonical source pool and research-qualified candidate selections remain separate. These are food–substance–PM connectivity counts, not efficacy. Ten current experimental/input relationships do not justify ordinary-food optimisation rankings. See Evidence gaps for all37 dispositions.\n\n'
for n,label in [('approved','Baseline canonical sources'),('approved-plus-research','Research-qualified candidates')]:
 top+='## '+label+'\n\n| Food | Pair score | Substances | PMs | Systems |\n|---|---:|---:|---:|---:|\n'
 for a in q['aggregation']:
  if a['network']==n:top+=f"| {a['food_id']} | {a['score']} | {a['substances']} | {a['pms']} | {a['brs_reach']} |\n"
(V/'TOP-FOODS.md').write_text(top);shutil.copyfile(R/'pm_substance_top_five_sources.csv',V/'pm_substance_top_five_sources.csv')
manifest={'date':datetime.datetime.now(datetime.timezone.utc).isoformat(),'status':'Reconciled locally; author review pending; no commit/push/deploy','original_incomplete_targets':37,'completed':3,'non_rankable_ordinary_food_targets':10,'unresolved':24,'unresolved_partial':2,'unresolved_no_selection':22,'candidate_edges':593,'scope_preserved':151,'ordinary_food_ranking_denominator':141,'canonical_edits':['docs/foods/beef.md: nutrient_key on two pre-existing pending amount reviews only'],'local_extraction':'pc-source-observations.json','scientific_changes':[],'validation':'validation.json','report':'FINAL-RECONCILIATION.md','browser_validation':'not rerun: browser reconnection unavailable'}
json.dump(manifest,open(R/'manifest.json','w'),indent=2)
p=pathlib.Path('project-knowledge/handoffs/pm-food-source-coverage-2026-11-06.md');p.write_text(p.read_text()+'''\n## Subsequent relationship-first reconciliation — 6 November 2026\n\nLatest report: `review/pm-food-source-coverage-2026-11-06/reconciliation/FINAL-RECONCILIATION.md`. Supersedes the 37-gap disposition above: three completed (carnitine and two PC provision rankings), ten ordinary-food non-rankable under current protocol scope, 24 unresolved (two partial). Beef's two unscoped pending reviews now identify creatine_mg/coq10_mg; estimates and decisions remain held. PC choline-moiety measurements remain a local research extraction, explicitly not intact-PC mass or canonical food-page quantities. Candidate593edges; original151pair inventory unchanged; ordinary-food ranking denominator141.\n\nUse `reconciliation/select-v2.mjs` and `reconciliation/wheel-v2.mjs` for the latest local projection, not the original selector/report scripts. The original artifacts remain historical. PM/SF/KC/SEC file hashes preserved;1,956 focused checks pass. Broad legacy failures unchanged. Browser reconnection unavailable this turn: updated data/generated artifact checked, no new UI pass claimed. No commit/push/deployment. Proposed scientific expansions require author review; none implemented.\n''')
print(manifest)
