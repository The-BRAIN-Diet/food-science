import csv,json,hashlib,re,datetime,urllib.request
from pathlib import Path
root=Path(__file__).resolve().parent
html=(root/'deployed.html').read_text()
data=json.loads(html.split('<script>const DATA=')[1].split(';const $=')[0])
metadata=json.loads((root/'deployment_metadata.json').read_text())
assert hashlib.sha256((root/'deployed.html').read_bytes()).hexdigest()==metadata['html_sha256'], 'Frozen HTML hash mismatch'
(root/'network.json').write_text(json.dumps({'metadata':metadata,'data':data},indent=2))
(root/'deployment_metadata.json').write_text(json.dumps(metadata,indent=2))
def writecsv(name,rows):
 keys=list(dict.fromkeys(k for r in rows for k in r))
 with (root/name).open('w',newline='') as f:
  w=csv.DictWriter(f,fieldnames=keys);w.writeheader()
  for r in rows:w.writerow({k:json.dumps(v,ensure_ascii=False) if isinstance(v,(list,dict)) else v for k,v in r.items()})
foods=[]
for f in data['foods']:
 foods.append({**f,'displayed_label':f['title']+' · '+str(f['targets']),'font_size_svg_units':22 if f['targets']>=8 else 20 if f['targets']>=5 else 18 if f['targets']>=3 else 16})
writecsv('foods.csv',foods)
writecsv('food_substance_edges.csv',data['foodPairs'])
writecsv('substance_brs_edges.csv',[{**e,'pm_ids':sorted(set(r['pm'] for r in e['records']))} for e in data['network']['connections']])
rows=[]
for r in data['network']['interventions']:
 common={k:v for k,v in r.items() if k not in ['identities','composition']}
 for ident in r['identities']:rows.append({**common,'edge_kind':'named_identity','target_id':ident.get('id'),'target_kind':ident.get('kind'),'target_record':ident,'identities':r['identities'],'composition':r['composition']})
 for comp in r['composition']:rows.append({**common,'edge_kind':'composition','target_record':comp,'identities':r['identities'],'composition':r['composition']})
 if not r['identities'] and not r['composition']:rows.append({**common,'edge_kind':'no_molecular_mapping','target_id':'','target_kind':'','target_record':{},'identities':[],'composition':[]})
writecsv('intervention_edges.csv',rows)
writecsv('substances.csv',data['network']['inventory'])
worked=[]
for fid in ['beef','bananas','salmon-roe','oysters','broccoli-sprouts']:
 f=next(f for f in foods if f['id']==fid);ps=[p for p in data['foodPairs'] if p['food']==fid and p['existing']];direct=sorted(p['substance'] for p in ps if p['type']!='derived');derived=sorted(p['substance'] for p in ps if p['type']=='derived');props=sorted(p['substance'] for p in data['foodPairs'] if p['food']==fid and not p['existing']);brs6=set(e['substance'] for e in data['network']['connections'] if e['brs']=='BRS6');local=sorted(set(direct+derived)&brs6)
 assert len(set(direct+derived))==f['targets'];assert len(direct)==f['direct_targets'];assert len(derived)==f['derived_targets']
 worked.append({'food':fid,'label_count':f['targets'],'direct':direct,'derived':derived,'proposed_only':props,'brs6_targets':local,'whole_network_brs_reach':f['brs_reach'],'font_size':f['font_size_svg_units']})
(root/'worked_counts.json').write_text(json.dumps(worked,indent=2))
rules='''# Counting rules — actual deployed implementation

These rules describe the deployed snapshot, not a proposed correction. Source: deployed.html embedded DATA and JavaScript runtime.

## Counts and deduplication

* Food label N = number of distinct substance IDs in existing foodPairs for that canonical food. Proposed-only pairs are excluded. Direct means any non-derived pair (quantified or presence-only), not clinical directness. Derived-only pairs count once each. If a pair also has direct evidence it is classified direct, while its derivation records remain available.
* Labels do not change when selecting a BRS or enabling proposals. Collective pools (e.g. indispensable amino acids, SCFAs) coexist with individual constituents; they are different ontology identities and may both count. N is not independent biochemical functions, nutrient density or efficacy.
* Identity aliases and repeated PM/source references do not multiply food–substance pairs. Deduplication is by canonical IDs; this export does not independently adjudicate whether ontology identities should be merged. Presence-only pairs count equally to quantified pairs. Duplicate evidence records remain in provenance arrays.
* Default header: 90 food objects, 68 inventory records with inclusion=included, and 121 substance–system connection objects. Inventory includes 76 total records, of which eight are not displayed. 121 is not the food-edge count. Default food ribbons: 1,750 existing pairs; enabling proposed-only adds 18, reaching 1,768. There are 21 proposal records, including proposals improving existing pairs.
* Selected food header: one food, distinct eligible substances attached to it, unique systems reached through those substances. Selected substance: one target, its eligible foods, its unique systems. Selected system: all distinct targets in that system, all foods attached to any such target, and one selected system. A target can count despite no food source. No dosage or admission-strength filter applies.
* System detail count for a food = number of that food's eligible pairs whose target belongs to the selected system. This is smaller than or equal to the persistent whole-network food-label count. One substance mentioned by several PMs in the same system counts once. Admission/contextual status belongs to the substance–system relation and underlying records, not automatically to the food composition edge.
* Proposal toggle includes non-existing pairs in selection logic. Fixed label counts and default header totals do not change. Proposed improvements to an existing pair remain in its detail disclosure even when proposed-only edges are disabled. The source shortlist may also contain proposed entries; it is not itself filtered by the toggle.

## Rendering and selection

Font size in SVG units: 1–2 targets = 16; 3–4 = 18; 5–7 = 20; 8+ = 22. Screen size also depends on responsive SVG scaling and zoom. No quantity-dependent font scaling.

All food/substance nodes remain rendered. Unselected nodes fade to opacity .15; they are not removed. Unselected substance–system links fade to .035; selected links use style opacity 1, multiplied by their underlying fill opacity. System arcs are not dimmed by selection. Food links outside the selected route are hidden (display:none), unless Show all food connections is enabled. All-connections food fill opacity is .12; focused is .42.

Selection first disables Show all. A system selects its target set and follows every eligible food pair, including contextual and derived relationships. This explains broad views: BRS6 has 80 foods/7 targets (magnesium alone has 78); Hormones has 81 foods/1 target. The UI does not default to its top-ten shortlists. No direct food–BRS ribbon is drawn.

Reset returns to all connections but replaces the original explanatory panel with a shorter paragraph. Enabling Show all similarly clears focus and changes panel text. Thus no-selection panel content can differ by interaction history. Unchecking Show all with no selection hides food ribbons while the overview header still reports inventory totals.

## Worked examples
'''
for w in worked:
 rules+=f"\n### {w['food']}\nLabel {w['label_count']} = {len(w['direct'])} direct + {len(w['derived'])} derived. Proposed-only additional targets: {len(w['proposed_only'])}. BRS6-specific count: {len(w['brs6_targets'])}. Whole-network system reach: {w['whole_network_brs_reach']}. Font: {w['font_size']} SVG units.\n\nDirect IDs: {', '.join(w['direct'])}.\n\nDerived IDs: {', '.join(w['derived']) or 'none'}.\n\nProposed-only IDs: {', '.join(w['proposed_only']) or 'none'}.\n\nBRS6 IDs: {', '.join(w['brs6_targets']) or 'none'}.\n"
(root/'counting_rules.md').write_text(rules)
# Validate actual browser captures against the independent selection equations.
shots=json.loads((root/'selection_snapshots.json').read_text());results=[]
for shot in shots:
 for e in shot['food_edges']:assert any(p['food']==e['food'] and p['substance']==e['substance'] for p in data['foodPairs'])
 shot['highlighted_food_ids']=[f['id'] for f in shot['foods'] if float(f['opacity'])==1]
 shot['highlighted_substance_ids']=[f['id'] for f in shot['substances'] if float(f['opacity'])==1]
 shot['highlighted_substance_system_edges']=[e for e in shot['substance_system_edges'] if float(e['opacity'])==1]
 shot['rendering_note']='All listed nodes remain visible; opacity distinguishes focus. Food edges list only displayed ribbons. Detail text includes collapsed disclosure content; HTML preserves details elements.'
 shot['screenshot']='screenshots/'+shot['name']+'.png'
 if shot['name']=='brs-x-hormones':shot['interaction_observation']='Attempted pointer click did not activate Hormones; selected remained BRS6. See brs-x-hormones-keyboard for correct selection.'
 results.append({'name':shot['name'],'selected':shot['selected'],'food_ribbons':len(shot['food_edges']),'highlighted_foods':len(shot['highlighted_food_ids']),'header':shot['header']})
(root/'selection_snapshots.json').write_text(json.dumps(shots,indent=2))
(root/'validation.json').write_text(json.dumps({'counts':data['counts'],'worked_counts_verified':True,'browser_states':results,'all_browser_food_edges_exist_in_deployed_data':True},indent=2))
print(json.dumps(results,indent=2))
