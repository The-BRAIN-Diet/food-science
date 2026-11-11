/** Qualitative occurrence is separate from quantitative ranking and admission. */
const hidden = new Set(['internal-only', 'excluded-error', 'substance-only']);
export function documentedSourcesForRelationships(data, pm, relationships, ranked = [], snapshot = {targets:[]}) {
 const rankedPairs = new Set(ranked.map(s => `${s.food_id}|${s.substance_id}`));
 const selected = new Map();
 const measuredIds = new Set(['5-methyltetrahydrofolate','ellagic-acid','inulin','resistant-starch']);
 for (const r of relationships) {
  const blocked = r.projection_status === 'blocked';
  if ((blocked && !r.documented_occurrence?.food_ids?.length) || r.network_activation === 'held' || r.pm !== pm || r.dietary_input !== true || (r.scientific_admission && r.scientific_admission !== 'admitted') || !r.substance_id) continue;
  // Respect an explicit target reconciliation; never repopulate a blocked join globally.
  const candidates = Object.hasOwn(r, 'food_targets') ? r.food_targets : data.food_sources.filter(s => s.substance_id === r.substance_id);
  for (const target of candidates || []) {
   const canonical = data.food_sources.find(s => s.id === target.id);
   const s = canonical ? {...canonical, ...target, presence_records:canonical.presence_records} : target;
   if (blocked) {
    if (!r.documented_occurrence.food_ids.includes(s.food_id) || s.observations?.length) continue;
    s.preparation = [s.preparation, r.documented_occurrence.limitation].filter(Boolean).join(' — ');
   }
   if (r.id === 'BRS5-FM2-PM4::PM4-DIT-2') {
    if (!['lemon','oranges'].includes(s.food_id)) continue;
    s.preparation += ' — citrus tissue pectin provision only; not equivalent to the purified experimental preparation. No efficacy or dose transfer.';
   }
   // Author-approved PM4 identity repair: preparation-qualified RS2/RS3 provision only.
   // Total-RS legume assays do not resolve subtype. Do not inherit generic sources.
   if (r.id === 'BRS5-FM2-PM4::PM4-DIT-3') {
    if (!['bananas','potatoes'].includes(s.food_id)) continue;
    const context=[s.material,s.preparation].join(' ');
    if (s.food_id==='bananas'&&!/green|unripe/i.test(context) || s.food_id==='potatoes'&&!/chill|cool/i.test(context)) continue;
    s.preparation += s.food_id==='bananas'
     ? ' — native granular RS2 context; published range is total resistant starch across ripening, not isolated RS2 quantity.'
     : ' — cooked-and-chilled RS3 provision context only; published range spans hot/chilled/reheated total-RS assays, not an isolated RS3 or chilled-only quantity.';
   }
   if (s.substance_id !== r.substance_id || rankedPairs.has(`${s.food_id}|${s.substance_id}`) ||
       s.mapping_status && s.mapping_status !== 'verified' && !(measuredIds.has(s.substance_id) && s.mapping_status === 'research-supported-provisional' && s.observations?.length) || s.ranking_hold || s.publication_hold) continue;
   if ((s.observations || []).length) {
    const target = snapshot.targets.find(t=>t.pm_id===pm&&t.substance_id===r.substance_id&&t.relationship_ids?.includes(r.id));
    if (!target || target.hold) continue;
    const qualified = s.observations.filter(o => ['sequence-derived estimate', 'measured'].includes(o.measurement_kind) &&
     o.verified && o.public_display === 'table' && o.rank_eligible === false && o.source_url &&
     o.unranked_reason && o.basis && o.unit && Number.isFinite(o.value) && !o.ranking_hold && !o.publication_hold);
    for (const o of qualified) {
     const key = o.record + '|' + s.food_id;
     const previous = selected.get(key);
     selected.set(key, {...s, observations:[o], presence_records:[], documented_unranked:true,
      measurement_kind:o.measurement_kind === 'measured' ? 'measured' : 'estimated', relationship_ids:[...new Set([...(previous?.relationship_ids || []), r.id])]});
    }
    if (!measuredIds.has(s.substance_id)) continue;
    const observations=s.observations.filter(o=>{
     const reason=target.excluded?.find(e=>e.record===o.record)?.reason||'';
     return o.verified&&!hidden.has(o.public_display)&&!o.ranking_hold&&!o.publication_hold&&o.source_url&&o.basis&&o.unit&&(Number.isFinite(o.value)||o.range?.length===2)&&/No authorised compatible comparison pool|Measurement range|fewer than two distinct comparable foods/i.test(reason);
    }).map(o=>({...o,unranked_reason:target.excluded.find(e=>e.record===o.record).reason}));
    for(const o of observations){const key=o.record+'|'+s.food_id;if(!selected.has(key))selected.set(key,{...s,observations:[o],presence_records:[],documented_unranked:true,measurement_kind:o.calculation?'calculated':'measured',relationship_ids:[r.id]});else selected.get(key).relationship_ids=[...new Set([...selected.get(key).relationship_ids,r.id])];}
    continue;
   }
   const records = (s.presence_records || []).filter(p => !hidden.has(p.public_display) &&
    !p.ranking_hold && !p.publication_hold && !/held|pending|unverified|unsupported|candidate|rejected/i.test(`${p.presence_status || ''} ${p.evidence_status || ''}`) &&
    ((s.substance_id === 'sulforaphane' && p.presence_status === 'product_or_preparation_dependent') || /supported|qualitative/i.test(p.presence_status || p.evidence_status || '')) &&
    p.presence_status !== 'presence_and_amount_supported' &&
    (p.source_url || p.source_reference || p.citation_keys?.length) && (p.evidence || p.source_note) &&
    !Number.isFinite(p.value) && !p.range);
   if (!records.length) continue;
   const key = JSON.stringify([s.food_id,s.substance_id,s.material,s.preparation,s.chemical_form]);
   if (!selected.has(key)) selected.set(key,{...s,observations:[],presence_records:[],documented_unranked:true,relationship_ids:[]});
   const item = selected.get(key);
   item.relationship_ids = [...new Set([...item.relationship_ids,r.id])];
   item.presence_records = [...new Map([...item.presence_records,...records].map(p=>[p.record,p])).values()];
   delete item.rank; delete item.relative_power; delete item.rank_status;
  }
 }
 // The apple food record describes the same Liu isolation study twice, once
 // under the food panel and once under the extracted plant material. Keep
 // both source contexts, including evidence entries with the same record path.
 const appleStudy = [...selected.entries()].filter(([, row]) =>
  row.food_id === 'apples' && row.substance_id === 'pectin' && !row.observations.length &&
  row.presence_records.length && row.presence_records.every(record =>
   record.source_url === 'https://doi.org/10.1016/j.ijbiomac.2023.125410'));
 if (appleStudy.length > 1) {
  const rows = appleStudy.map(([, row]) => row);
  const [firstKey, first] = appleStudy[0];
  const grouped = {...first,
   material: [...new Set(rows.map(row => row.material))].join(' / '),
   relationship_ids: [...new Set(rows.flatMap(row => row.relationship_ids))],
   presence_records: rows.flatMap(row => row.presence_records.map(record => ({
    ...record, source_id: row.id, material: row.material,
    preparation: row.preparation, chemical_form: row.chemical_form
   })))
  };
  for (const [key] of appleStudy) selected.delete(key);
  selected.set(firstKey, grouped);
 }
 return [...selected.values()].sort((a,b)=>a.food_title.localeCompare(b.food_title)||a.id.localeCompare(b.id));
}
/** Canonical food identity only: analytical prose may mention eggs in a plant food. */
export function isCanonicalAnimalSource(source) {
 if (source.food_group) return source.food_group === 'animal';
 const identity = String(source.food_id || '').toLowerCase().replace(/-/g,' ');
 return /\b(anchovies|beef|butter|cheese|chicken|clams?|cockles?|cod|crab|duck|eggs?|fish|lamb|liver|kidney|mackerel|meat|milk|mussels?|oysters?|pork|poultry|salmon|sardines?|scallops?|seafood|shellfish|shrimp|trout|tuna|turkey|whey|yolks?|yogurt|kefir)\b/.test(identity);
}
