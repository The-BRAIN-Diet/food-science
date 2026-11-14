export function prepare(data, threshold=25, expanded=false, system='') {
 const pmMap=new Map(data.pms.map(p=>[p.id,p]));
 const excluded=new Set(data.shortlist_exclusions.map(x=>x.id));
 const permitted=new Set(data.relationships.filter(r=>r.projection_status!=='blocked'&&r.network_activation!=='held'&&(!r.scientific_admission||r.scientific_admission==='admitted')).map(r=>r.id));
 const available=data.records.filter(r=>!excluded.has(r.food)&&(!system||pmMap.get(r.pm)?.group===system)&&!r.publication_hold&&!r.ranking_hold&&(!r.relationship_ids?.length||r.relationship_ids.some(id=>permitted.has(id))));
 const ranked=available.filter(r=>r.layer==='Ranked'&&Number.isFinite(r.relative_power)&&r.relative_power>=threshold);
 const represented=new Set(ranked.map(r=>r.substance));
 // Below-threshold and cap-excluded points cannot be promoted into starred sources.
 const supporting=available.filter(r=>r.layer!=='Ranked'&&!represented.has(r.substance));
 // Credit the shared powder occurrence once while retaining both food-page records.
 const powderEvidence = r => JSON.stringify([r.pm, r.material, r.preparation,
  r.presence_records.map(p => [p.source_url, p.presence_status, p.limitations])]);
 const isPowderOccurrence = r => r.substance === 'epicatechin' && !r.observations?.length
  && r.presence_records?.length && r.presence_records.every(p => p.source_url);
 const cocoaEvidence = new Map(supporting.filter(r => r.food === 'cocoa' && isPowderOccurrence(r)).map(r => [powderEvidence(r), r]));
 const sharedPowder = r => r.food === 'cacao-powder' && isPowderOccurrence(r) && cocoaEvidence.has(powderEvidence(r));
 const displaySupporting = supporting.map(r => sharedPowder(r) ? {...cocoaEvidence.get(powderEvidence(r)), originalEvidence:r} : r);
 const priority=r=>r.layer.startsWith('Related')?3:r.observations?.length?0:r.presence_records?.some(p=>p.presence_status==='product_or_preparation_dependent')?1:2;
 const stars=[];
 for(const sub of new Set(supporting.map(r=>r.substance))){const rows=displaySupporting.filter(r=>r.substance===sub);const ids=[...new Set(rows.map(r=>r.food))].sort((a,b)=>Math.min(...rows.filter(r=>r.food===a).map(priority))-Math.min(...rows.filter(r=>r.food===b).map(priority))||a.localeCompare(b));for(const id of ids.slice(0,expanded?undefined:2))stars.push(...rows.filter(r=>r.food===id));}
 const records=[...ranked.map(r=>({...r,star:false})),...stars.map(r=>({...r,star:true}))];
 const grouped=new Map();
 for(const r of records){const key=[r.food,r.pm,r.substance].join('|');if(!grouped.has(key))grouped.set(key,{...r,evidence_records:[]});grouped.get(key).evidence_records.push(r.originalEvidence||r);}
 const triples=[...grouped.values()];
 const essential=new Set(data.substances.filter(s=>s.tags.includes('essential-amino-acid')).map(s=>s.id));
 const aggregate=data.substances.filter(s=>/indispensable amino|essential amino acids/i.test(s.name)).map(s=>s.id);
 const foods=data.foods.filter(f=>triples.some(r=>r.food===f.id)).map(f=>{const rs=triples.filter(r=>r.food===f.id);const targets=[...new Set(rs.map(r=>r.substance))];const count=targets.filter(s=>!aggregate.includes(s)||!targets.some(t=>essential.has(t))).length;const direct=new Set(rs.filter(r=>!r.layer.startsWith('Related')).map(r=>r.substance));const related=new Set(rs.filter(r=>r.layer.startsWith('Related')&&!direct.has(r.substance)).map(r=>r.substance));return {...f,records:rs,targets,count,directCount:[...direct].filter(s=>!aggregate.includes(s)||![...direct].some(t=>essential.has(t))).length,relatedCount:related.size};}).sort((a,b)=>(a.group==='animal')-(b.group==='animal')||b.count-a.count||a.title.localeCompare(b.title));
 const allTargets=new Set(available.map(r=>r.substance));
 const reached=new Set(triples.map(r=>r.substance));
 const missing=[...new Set(data.relationships.filter(r=>permitted.has(r.id)&&(!system||pmMap.get(r.pm)?.group===system)).map(r=>r.substance_id).filter(Boolean))].filter(id=>!reached.has(id)).map(id=>({id,reason:allTargets.has(id)?'Below selected RSP threshold; no eligible starred fallback':'Food source not established in this eligible projection'}));
 return {foods,records:triples,missing,counts:{foods:foods.length,rankedSubstances:represented.size,starredSubstances:new Set(stars.map(r=>r.substance)).size,substances:reached.size,targets:new Set(triples.map(r=>r.pm+'|'+r.substance)).size,triples:triples.length},hiddenSupporting:Math.max(0,new Set(displaySupporting.map(r=>r.food+'|'+r.substance)).size-new Set(stars.map(r=>r.food+'|'+r.substance)).size)};
}
export function servingContribution(record, grams){const o=record.observations?.[0];if(record.star||!o||!Number.isFinite(o.value)||!Number.isFinite(grams)||grams<=0||!/per 100 g edible portion|per 100 g fresh weight/i.test(o.basis||''))return null;return {value:o.value*grams/100,unit:o.unit,grams,material:o.material||record.material,basis:o.basis};}
