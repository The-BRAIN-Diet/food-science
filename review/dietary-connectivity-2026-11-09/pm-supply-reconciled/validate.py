import pathlib,json,hashlib,collections
base=pathlib.Path('review/dietary-connectivity-2026-11-09');p=base/'pm-supply-reconciled';load=lambda f:json.loads(f.read_text());old=load(base/'pm-supply-inventory/pm-substance-pairs.json');new=load(p/'pm-substance-pairs.json');key=lambda x:x['pm']+'|'+x['substance_id'];oldmap={key(x):x for x in old};newmap={key(x):x for x in new};assert len(new)==len(newmap)==150;assert set(oldmap)<=set(newmap)
for k,x in oldmap.items():
 for prov in x['provenance']:assert prov in newmap[k]['provenance'],k
assert 'BRS5-FM2-PM5|fructo-galacto-oligosaccharides' not in newmap
before=load(p/'preservation-before.json');changed=[f for f,h in before.items() if hashlib.sha256(pathlib.Path(f).read_bytes()).hexdigest()!=h];allowed='docs/biological-targets/brs1/fm2/brs1-fm2-pm6-acetylcholine-synthesis-support.mdx';assert changed==[allowed],changed
text=pathlib.Path(allowed).read_text();insert='      - relationship_id: BRS1-FM2-PM6-KCI-1\n        disposition: established\n        relationship_type: conditional-constraint\n        substance_id: vitamin-b9\n        ikc_id: BRS2-KC1-KIT-1\n';assert text.count(insert)==1;original=text.replace(insert,'      - relationship_id: BRS1-FM2-PM6-KCI-1\n');assert hashlib.sha256(original.encode()).hexdigest()==before[allowed]
rank=load(pathlib.Path('src/data/rankedFoodSources.generated.json'));assert len(rank['targets'])==151
assert all(len(x['ranked'])<=10 and all(y['relative_power']>=10 for y in x['ranked']) for x in new)
kcs=load(p/'kc-relationships.json');assert len([k for k in kcs if not k['accepted']])==2
kc_pairs=[x for x in new if any(z['kind'] in ['supported-resource-supply','established-kc-constituent'] for z in x['provenance'])];basepairs={key(x) for x in new if any(z['kind']=='admitted-input' for z in x['provenance'])};solekc=[x for x in kc_pairs if key(x) not in basepairs]
summary=load(p/'summary.json');summary.update({'kc_resource_pairs':len(kc_pairs),'kc_resource_additions_beyond_explicit_admitted_inputs':len(solekc),'new_pairs':sorted(set(newmap)-set(oldmap)),'new_substances':sorted({x['substance_id'] for x in new}-{x['substance_id'] for x in old})});(p/'summary.json').write_text(json.dumps(summary,indent=2)+'\n')
issues=load(p/'mapping-issues.json');unresolved=[x for x in issues if x['kind']=='unresolved-canonical-substance'];roles=['source-class','heterogeneous-functional-class','preparation-specific-subtype','mixed-dietary-matrix','preparation-characteristic','defined-mixture','exact-microbial-strain','exact-microbial-strain','studied-preparation'];assert len(unresolved)==9
proposals=[]
for x,role in zip(unresolved,roles):
 pr=x['provenance']; proposals.append({'relationship_id':pr['relationship_id'],'label':pr['input'],'proposed_role':role,'status':'proposal-only; not canonical schema or identity registration','canonical_identity_id':None,'existing_evidence_and_limitations':pr,'preserve_projection_hold':True,'ordinary_food_equivalence':False,'new_admission':False})
(p/'identity-proposals.json').write_text(json.dumps(proposals,indent=2)+'\n')
validation={'passed':True,'unique_pairs':150,'original_145_pairs_and_provenance_preserved':True,'five_expected_additions':summary['new_pairs'],'only_canonical_change':allowed+' — exactly four approved child fields','ranked_snapshot_151_targets_unchanged':True,'sec_food_quantities_ranking_policy_holds_unchanged':True,'two_historical_kc_exclusions_retained':True,'fos_gos_unresolved_and_excluded':True,'nine_identities_proposals_only':True}
(p/'validation.json').write_text(json.dumps(validation,indent=2)+'\n');print(json.dumps(summary,indent=2))
