import json,csv,pathlib,collections,datetime
D=pathlib.Path('review/pm-food-source-coverage-2026-11-06');V=pathlib.Path('review/visualisations/brain-food-wheel-pm-qualified-2026-11-06')
q=json.load(open(D/'qualified-network.checkpoint.json'));b=json.load(open(D/'backfill-observations.json'));iv=list(csv.DictReader(open(D/'pm_substance_inventory.csv')))
# Every remaining target has a source-specific reason; no absence-of-food conclusion is inferred from inaccessible tables.
g={}
def note(ids,reason,source,action):
 for id in ids.split(','):g[id]=(reason,source,action)
note('phosphatidylcholine','USDA Choline Release 2 reports the choline moiety of phosphatidylcholine, not intact phosphatidylcholine mass. Total choline cannot substitute for PC.','https://www.ars.usda.gov/ARSUserFiles/80400525/Data/Choline/Choln02.pdf','Obtain food-specific intact PC composition or an explicitly supported form conversion; preserve presence records.')
note('uridine','Retrieved dairy studies distinguish nucleosides, nucleotides and RNA; accessible material did not verify comparable food-specific free-uridine concentrations.','https://doi.org/10.3168/jds.S0022-0302(84)81361-2','Verify original quantitative tables and preparation; do not substitute UMP or RNA.')
note('pyridoxal-5-phosphate,flavin-mononucleotide','Original vitamer-specific assay literature located; complete food-form quantitative tables not verified. Total B6/B2 is not PLP/FMN.','https://pubmed.ncbi.nlm.nih.gov/28420530/','Retrieve original food-specific tables; preserve form identity and processing.')
note('cysteine','Existing food relationships are not a verified set of comparable free-cysteine measurements. Protein hydrolysis/cystine values cannot silently become free-cysteine values.','https://doi.org/10.1002/fsn3.473','Verify assay chemical form, recovery and tested cooked food before ranking.')
note('glutamine,glutamate','Lenders uses sequence-derived food estimates; abstract ranges cannot be assigned to particular foods. Full source table unavailable in this retrieval; estimates must not be relabelled as direct measurement.','https://doi.org/10.1038/ejcn.2009.110','Recover exact estimates with methodology or original free-amino-acid assays; preserve free versus protein-bound distinction.')
note('n-acetylcysteine','Existing evidence concerns supplemental NAC. Cysteine-containing protein is not food NAC; no verified ordinary-food concentration was recovered.','https://www.rivm.nl/bibliotheek/rapporten/2024-0086.pdf','Retain supplemental relationship without inventing five foods.')
note('oligofructose,inulin,fructo-galacto-oligosaccharides','Primary Thai-food measurements concern total inulin-type fructans, including shorter chains. They do not resolve long-chain canonical inulin, commercial oligofructose or the combined FOS/GOS identity. Existing asparagus dry-matter observation lacks a matched conversion basis.','https://doi.org/10.1016/j.jfca.2010.12.001','Obtain degree-of-polymerisation/form-specific concentrations and matched food moisture where required.')
note('sulforaphane','Sprout studies use enriched extracts, dry-weight assays or glucoraphanin-rich preparations. Glucoraphanin mass is not sulforaphane yield, and food processing changes conversion.','https://pmc.ncbi.nlm.nih.gov/articles/PMC9266238/ ; https://doi.org/10.1371/journal.pone.0140963','Obtain matched edible-food sulforaphane measurements; do not infer efficacy or conversion yield.')
note('nicotinamide,nicotinic-acid','Form-specific HPLC study located; accessible abstract gives meat/fish ranges, not verified individual food values. Hydrolysed total niacin may alter chemical form.','https://doi.org/10.4327/jsnfs1949.35.121','Verify original individual food table; no midpoint or total-niacin substitution.')
note('nicotinamide-riboside','Saved original study reports commercial skim-milk concentrations in micromoles/L. Canonical generic/whole milk and per-100g denominator are not equivalent without a matched food identity and density.','https://doi.org/10.3945/jn.116.230078','Retain source-specific presence/volume data; obtain a matched canonical skim preparation and documented conversion if needed.')
note('creatine','Existing beef figure is an estimate. Original meat study identified through a secondary regulatory compilation; exact raw/cooked source tables not fully verified.','https://doi.org/10.1016/j.meatsci.2006.03.015','Retrieve original source table; do not upgrade estimated beef concentration or apply raw values to cooked meat.')
note('l-carnitine','Five new free-L-carnitine food measurements were recorded. Four are rankable: beef remains under an existing food-record hold, which was not bypassed. Three extractions are not three independently sampled foods.','https://doi.org/10.5702/massspectrometry.A0191','Resolve beef hold separately; do not substitute volume-based milk values or total/acyl-carnitine.')
note('caprylic-triglyceride','Coconut fatty-acid C8 composition does not quantify intact tricaprylin. Refined intervention oil is not equivalent to ordinary coconut food.','https://chemical.kao.com/en/products/B0001701_en/','Require intact triglyceride/form-specific food assay; retain protocol-only evidence.')
note('pectin','Four matched food observations were calculated from total pectic substances and same-study dry matter. Assay includes high/low methoxyl pectin and protopectin; it is not purified pectin equivalence.','https://doi.org/10.4081/ijas.2005.49','Additional canonical food with matched assay and moisture required for a fifth source.')
note('resistant-starch','Potato research distinguishes cultivar, boiling/baking, chilling and reheating. Comparable quantitative source tables were not verified; RS2 extract cannot stand in for whole potato.','https://pubmed.ncbi.nlm.nih.gov/27132853/','Verify original preparation-specific tables and assay; no generic resistant-starch amount.')
note('arabinan','Apple cell-wall work reports polysaccharide molar composition/localisation, not whole edible food arabinan mass.','https://doi.org/10.3389/fpls.2018.01451','Obtain food-specific absolute arabinan amount; do not convert cell-wall mol% without denominator.')
note('ellagic-acid,ellagitannins','Original research uses freeze-dried material and hydrolysis/derivative endpoints. Free ellagic acid, hydrolysable ellagitannins and total ellagic-acid equivalents are not interchangeable.','https://doi.org/10.1016/0889-1575(89)90005-7','Retrieve preparation/form-specific quantitative tables and matched moisture; preserve existing occurrence.')
note('epicatechin','USDA flavonoid data identify nonalkalised cocoa powder, whereas the canonical cacao preparation is not an exact match. Existing representative figures lack adequate preparation comparability for this ranking.','USDA Flavonoid Release 3.3, NDB19165, saved prior retrieval','Resolve cocoa/cacao processing identity and comparable original observations before ranking.')
note('glucose','Two existing food-specific glucose observations were qualified. Total carbohydrate, sugars or starch is not glucose. Additional exact-form observations were not established in the bounded source review.','Existing bananas/grapes source observations retained in qualified-network.checkpoint.json','Retrieve additional food-specific glucose assays; do not use total sugars.')
assert set(x['substance'] for x in q['candidate']['gaps'])<=set(g)
# Refresh wording that used to imply no research had taken place.
for x in q['candidate']['gaps']:x['status']='Research reviewed; '+('partial quantitative coverage' if x['selected'] else 'no eligible quantitative selection');x['reason'],x['research_source'],x['next_action']=g[x['substance']]
json.dump(q,open(D/'qualified-network.checkpoint.json','w'),indent=2)
rows=[]
for x in b['additions']:
 rows.append({'action':'new source-specific observation','food_id':x['food_id'],'substance_id':x.get('substance_id'),'value':x['value'],'unit':x['unit'],'basis':x['basis'],'source':x['source_url'],'source_reference':x['source_reference'],'preparation':x.get('preparation_state'),'qualification':x.get('source_note',x.get('limitations','')),'record':'docs/foods/'+x['food_id']+'.md'})
for x in b['qualified']:
 a=x['after'];rows.append({'action':'qualified existing observation; quantity preserved','food_id':x['food_id'],'substance_id':a.get('substance_id'),'value':a.get('value'),'unit':a.get('unit'),'basis':a.get('basis'),'source':a.get('source_url'),'source_reference':a.get('source_reference'),'preparation':a.get('preparation_state'),'qualification':a.get('source_note',a.get('limitations','')),'record':'docs/foods/'+x['food_id']+'.md'})
for sid,(reason,source,action) in g.items():rows.append({'action':'research limitation / partial or unresolved','food_id':'','substance_id':sid,'value':'','unit':'','basis':'','source':source,'source_reference':'','preparation':'','qualification':reason+' Next: '+action,'record':''})
with open(D/'food_composition_research_log.csv','w')as f:
 w=csv.DictWriter(f,fieldnames=rows[0].keys());w.writeheader();w.writerows(rows)
allpairs={r['pm_id']+'|'+r['substance_id']:r for r in iv if r['eligible_for_food_research'].lower() in ('true','yes') and r['substance_id']}
# Actual eligible pairs are sourced from the canonical snapshot rather than CSV boolean spelling.
allpairs={r['pm']+'|'+r['substance_id']:r for p in D.glob('BRS*.snapshot.json') for r in json.load(open(p))['relationships'] if r.get('dietary_input') is True and r.get('substance_id')}
assert len(allpairs)==151
coverage=[]
for key,r in sorted(allpairs.items()):
 es=[e for e in q['candidate']['selections'] if e['pm_id']+'|'+e['substance_id']==key];before=[e for e in q['approved']['selections'] if e['pm_id']+'|'+e['substance_id']==key];sid=r['substance_id'];reason,source,action=g.get(sid,('Existing and recovered composition observations reviewed; five highest qualified foods within the comparable recorded pool selected.','; '.join(sorted(set(s for e in es for s in e['sources'] if s.startswith('http')))),'No additional source gap within current recorded pool; not a worldwide exhaustive ranking.'))
 coverage.append({'pm_id':r['pm'],'substance_id':sid,'before':len(before),'after':len(es),'status':'complete top five' if len(es)==5 else 'partial' if es else 'unresolved','reason':reason,'source':source,'next_action':action})
with open(D/'target-research-decisions.csv','w')as f:w=csv.DictWriter(f,fieldnames=coverage[0].keys());w.writeheader();w.writerows(coverage)
md='# Full eligible-target research reconciliation\n\n67 PMs inventoried; 151 eligible PM–substance pairs each assessed. Complete means five qualified sources within the recorded comparable pool, not an exhaustive worldwide food ranking. Scite quota was exhausted; saved primary retrievals, official food-composition records and accessible original sources were reused. Abstract-only or unavailable tables were not promoted to verified quantitative evidence.\n\n'
md+='| PM | Substance | Before → after | Status | Evidence boundary / next work |\n|---|---|---:|---|---|\n'
for r in coverage:md+=f"| {r['pm_id']} | {r['substance_id']} | {r['before']} → {r['after']} | {r['status']} | {r['reason']} {r['next_action']} |\n"
(D/'pm_food_vocabulary_gap_report.md').write_text(md);(V/'GAP-LEDGER.md').write_text(md)
count=collections.Counter(r['status']for r in coverage);baseline_full=sum(1 for r in coverage if r['before']==5);baseline_any=sum(1 for r in coverage if r['before']);candidate_any=sum(1 for r in coverage if r['after'])
summary={'pms':67,'eligible_pairs':151,'eligible_substances':len(set(r['substance_id']for r in coverage)),'pms_with_eligible_inputs':len(set(r['pm_id']for r in coverage)),'baseline_full_five':baseline_full,'baseline_any_quantitative':baseline_any,'candidate_full_five':count['complete top five'],'candidate_partial':count['partial'],'candidate_unresolved':count['unresolved'],'candidate_any_quantitative':candidate_any,'baseline_edges':len(q['approved']['selections']),'candidate_edges':len(q['candidate']['selections']),'new_observations':91,'qualified_existing':7}
json.dump(summary,open(D/'final-coverage-summary.json','w'),indent=2)
old=json.load(open('review/visualisations/brain-food-wheel-2026-11-06/food-network.json'))
def table(network,n=20):
 s='| Food | Substance–PM score | Substances | PMs | BRS reach |\n|---|---:|---:|---:|---:|\n'
 for r in [a for a in q['aggregation'] if a['network']==network][:n]:s+=f"| {r['food_id']} | {r['score']} | {r['substances']} | {r['pms']} | {r['brs_reach']} |\n"
 return s
report=f'''# Food network scientific roll-up — local author review

The bounded research and local implementation pass covers **67 PMs**, including the two author-approved Cursor extensions read from their separate checkout. **{summary['pms_with_eligible_inputs']} PMs have 151 eligible PM–substance pairs ({summary['eligible_substances']} distinct substances).** No PM admission, mission, Finding or SEC was changed by this task.

## Completeness (explicit denominators)

- Research decisions: 151/151 eligible pairs (100%). This includes documented access/form limitations, not fabricated negative findings.
- Five-source completeness: baseline {baseline_full}/151 ({baseline_full/151:.1%}); candidate {count['complete top five']}/151 ({count['complete top five']/151:.1%}).
- At least one qualified quantitative source: baseline {baseline_any}/151 ({baseline_any/151:.1%}); candidate {candidate_any}/151 ({candidate_any/151:.1%}).
- Candidate partial: {count['partial']}; unresolved/no rankable source: {count['unresolved']}.
- Five-slot quantitative coverage: {len(q['candidate']['selections'])}/755 ({len(q['candidate']['selections'])/755:.1%}); 755 is 151 × five, a reporting ceiling, not an obligation to invent foods.
- Author-approved individual top-five selections: **not established**. The author approved the selection rule and researched ontology updates; “approved-source” means the pre-task canonical source pool. It does not manufacture a history of author approval for each automatically selected food.
- Presence-only records are retained in the inventory but contribute zero ranking edges. Database-derived/calculated quantities are explicitly classified; verified does not mean every value is a direct laboratory measurement.

91 source-specific observations were added and seven existing observations qualified across 36 food pages. The candidate source pool is reranked, producing 588 selected edges versus 467 baseline edges. Higher-ranked new foods can replace lower-ranked historical selections. Candidate edges are not simply unioned with baseline edges.

## Baseline source-pool ranking

'''+table('approved')+'\n## Research-qualified candidate ranking\n\n'+table('approved-plus-research')+'''
## Interpretation and method

Scores count unique (substance, receiving PM) pairs per food, not distinct molecules alone and not health effects. Foods represented in many PMs therefore receive larger counts; this reflects framework structure and source availability. The exact receiving PM owns system reach. No transitive “this substance appears somewhere in BRS6” expansion is allowed. Derived provision is counted at its admitted dietary precursor identity, not once again for every endogenous downstream molecule. BRS-X subsystems are separate in reach counts.

Selection considers only existing eligible dietary-input relationships and source-qualified positive per-100g observations with compatible chemical forms. Up to five distinct canonical foods are sorted by amount after documented mass-unit conversion. Dried edible products remain distinct preparations but may be compared per100g product; dry-matter analytical values require matched moisture. Sample ranges, estimates without adequate qualification, presence-only claims and unknown denominators are not ranked. Pectin and folate equivalents remain source-specific groups. Realistic servings and bioavailability are limitations, not invented score adjustments.

Broad coverage does not demonstrate absorbed dose, brain delivery, nutritional adequacy or ADHD efficacy. Nori, seeds and liver appear prominently because their recorded concentrated forms connect to several eligible PMs. This is not a recommendation to consume 100g of dried seaweed or liver. Safety, serving size and population needs require separate evaluation.

Reproduce: run `node review/pm-food-source-coverage-2026-11-06/select.mjs`, then this report script, `wheel.mjs`, and the local preview `build.mjs`. Backfill scripts must not be rerun as a routine generation step. They preserve source-specific histories and are not data-refresh jobs. Use `validate-final.mjs` for edge, provenance and preservation checks. Review `target-research-decisions.csv` and the full observation JSON for exact source qualifications.
'''
(D/'manuscript_food_network_rollup.md').write_text(report)
comparison='# Food Wheel before/after\n\nOriginal wheel counts distinct substance targets from broader occurrence/derived records. New counts are qualified substance–PM pairs; these are different denominators and must not be described as a nutrient increase or loss. Original local and production artifacts remain unchanged.\n\n| Food | Old target count | Baseline-source pair score | Candidate pair score |\n|---|---:|---:|---:|\n'
for id in ['beef','bananas','salmon-roe','oysters','broccoli-sprouts','nutritional-yeast','eggs','liver']:
 oldf=next((f for f in old['foods']if f['id']==id),{});a=next((a for a in q['aggregation']if a['food_id']==id and a['network']=='approved'),{});c=next((a for a in q['aggregation']if a['food_id']==id and a['network']=='approved-plus-research'),{});comparison+=f"| {id} | {oldf.get('targets',0)} | {a.get('score',0)} | {c.get('score',0)} |\n"
comparison+='\nBeef remains subject to its pre-existing mapping hold; added measurements do not override it. Foods absent from a top-five projection are not declared to lack nutrients. Presence-only links and food identity/preparation mismatches remain in the research inventory.\n\n'
for label,n in [('Baseline',q['approved']),('Candidate',q['candidate'])]:
 for system in ['BRS6','Hormones']:
  es=[e for e in n['selections']if e['brs']=='BRS6']if system=='BRS6'else[e for e in n['selections']if e['pm_id'].startswith('BRS-X(Hormones')]
  comparison+=f"- {label} {system}: {len(set(e['food_id']for e in es))} foods, {len(es)} edges, {len(set(e['pm_id']+'|'+e['substance_id']for e in es))} qualified substance–PM pairs.\n"
(D/'food_wheel_before_after.md').write_text(comparison)
changelog='# Ontology backfill changelog\n\n91 new observations; seven existing observations qualified; 36 existing food identities. No new foods, substances, PM admissions or scientific scores. Existing quantities, nutrition panels and authored text preserved.\n\n| Food | New observations | Existing qualified | Sources |\n|---|---:|---:|---|\n'
for food in sorted(set(x['food_id']for x in b['additions']+b['qualified'])):
 a=[x for x in b['additions']if x['food_id']==food];z=[x for x in b['qualified']if x['food_id']==food];changelog+=f"| {food} | {len(a)} | {len(z)} | {'; '.join(sorted(set(x['source_url']for x in a)))} |\n"
(D/'ontology_backfill_changelog.md').write_text(changelog)
(V/'TOP-FOODS.md').write_text(report+'\n## Full source selections\n\nSee `pm_substance_top_five_sources.csv` alongside this preview.\n')
import shutil
shutil.copyfile(D/'pm_substance_top_five_sources.csv',V/'pm_substance_top_five_sources.csv')
print(summary)
