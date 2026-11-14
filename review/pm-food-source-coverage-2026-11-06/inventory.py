"""Read existing mapper snapshots; never change scientific admissions."""
import csv,json,pathlib,hashlib,subprocess
D=pathlib.Path(__file__).parent
scopes=[json.loads(p.read_text()) for p in sorted(D.glob('*.snapshot.json'))]
cursor=json.loads((D/'cursor-brsx-source.json').read_text())
known={p['pm_id'] for s in scopes for p in s['coverage']}
new={p['pm_id'] for p in cursor['coverage']} - known
assert new=={'BRS-X(Circadian-FM1-PM3)','BRS-X(Hormones-PM7)'}
scopes.append({**cursor,'coverage':[p for p in cursor['coverage'] if p['pm_id'] in new],'relationships':[r for r in cursor['relationships'] if r['pm'] in new]})
def cell(x): return json.dumps(x,ensure_ascii=False) if isinstance(x,(dict,list)) else x
rows=[]; pms={}
for s in scopes:
 for pm in s['coverage']: pms[pm['pm_id']]={**pm,'brs':s['scope']}
 for r in s['relationships']:
  foods=[f for f in s['food_sources'] if f['substance_id']==r.get('substance_id')]
  quantified={f['food_id'] for f in foods if any(o.get('verified') for o in f['observations'])}
  rankable={f['food_id'] for f in foods if any(o.get('verified') and o.get('rank_eligible') for o in f['observations'])}
  selected=next((v.get('selected',{}) for v in s['views'] if v['id']==r['id']),{})
  eligible=r.get('dietary_input') is True and bool(r.get('substance_id'))
  rows.append(dict(pm_id=r['pm'],brs=r['brs'],relationship_id=r['id'],substance_id=r.get('substance_id'),input=r['input'],biological_role=r.get('biological_role'),input_type=r.get('input_type'),classification=r.get('relationship_type'),dietary_input=r.get('dietary_input'),admission=r.get('scientific_admission',r.get('scientific_assessment',{}).get('status','historical/unresolved')),evidence=r.get('evidence'),limitations=r.get('limitation'),source_record=r.get('source_record'),food_ids=sorted({f['food_id'] for f in foods}),quantified_food_count=len(quantified),rankable_food_count=len(rankable),historical_display_foods=[f['food_id'] for f in selected.get('sources',[])],historical_selection_rule=selected.get('qualification'),top_five_approval='Author approved highest supported values selection rule 2026-11-06; individual selections pending computation',eligible_for_food_research=eligible,coverage_status='ineligible or unresolved dietary relationship' if not eligible else 'fewer than five comparable sources' if len(rankable)<5 else 'source appraisal and selection required'))
with (D/'pm_substance_inventory.csv').open('w') as f:
 w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows({k:cell(v) for k,v in r.items()} for r in rows)
(D/'pm_inventory.json').write_text(json.dumps(list(pms.values()),indent=2))
summary={'branch':subprocess.check_output(['git','branch','--show-current'],text=True).strip(),'head':subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip(),'pm_count':len(pms),'relationship_rows':len(rows),'dietary_yes_rows':sum(r['dietary_input'] is True for r in rows),'resolved_eligible_pairs':len({(r['pm_id'],r['substance_id']) for r in rows if r['eligible_for_food_research']}),'source_snapshot_sha256':{p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in D.glob('*.snapshot.json')},'status':'Inventory checkpoint; research, selections, ontology backfills and rebuild not complete','scope_decision':'Author approved inclusion of Circadian PM3 and Hormones PM7; source worktrees remain separate','selection_decision':'Author approved promoting five highest supported food composition values per eligible substance; preparation, analyte and denominator qualification retained'}
(D/'manifest.json').write_text(json.dumps(summary,indent=2))
gaps={}
for r in rows:
 if r['eligible_for_food_research'] and r['rankable_food_count']<5:gaps.setdefault(r['substance_id'],[]).append(r)
lines=['# Food-source research queue','', 'Inventory checkpoint. These are research tasks, not completed negative findings. Generated displays are retained as provenance, not relabelled as approved top-five selections.','','| Substance | PMs | Existing foods | Rankable foods |','|---|---|---:|---:|']
for sub,rs in sorted(gaps.items()):lines.append(f"| {sub} | {', '.join(sorted({r['pm_id'] for r in rs}))} | {len(rs[0]['food_ids'])} | {rs[0]['rankable_food_count']} |")
(D/'pm_food_vocabulary_gap_report.md').write_text('\n'.join(lines)+'\n')
print(json.dumps({k:v for k,v in summary.items() if k!='source_snapshot_sha256'},indent=2))
