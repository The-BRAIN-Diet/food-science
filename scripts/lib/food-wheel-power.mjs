import { relativeSourcePower } from '../../src/data/relatedSubstanceRelationships.mjs';

// Author-confirmed 6 November 2026. Ranking is a derived display selection,
// not an admission. Reuse the existing calculation and its provisional threshold.
export function selectFoodWheelSources(sources) {
  const groups = new Map(), excluded = [], qualified = [];
  for (const source of sources) {
    if (!source.observations.length) excluded.push({food_id:source.food_id,reason:'Presence-only: no quantitative observation',source_id:source.id});
    for (const o of source.observations) {
      const factor = {g:1000,mg:1,'µg':.001,ug:.001}[o.unit];
      if (!o.verified || !o.rank_eligible || !o.comparison_group || !factor || !(o.value>0 || o.range?.[0]>0)) {
        excluded.push({food_id:source.food_id,record:o.record,reason:!o.verified?'Unverified or held canonical quantity':o.range?'Measurement range; no point ranking or midpoint substitution':!factor?'Unsupported unit conversion':!(o.value>0)?'No positive point concentration':!o.comparison_group?'No authorised compatible comparison pool for this measurement basis':'Canonical observation not rank-eligible'}); continue;
      }
      // Ordinary edible preparations compete. Preparation remains source metadata.
      // Preserve analytical groups, chemical forms and measurement denominators.
      const key = [/^edible::/.test(o.comparison_group) ? 'edible-mass' : o.comparison_group,o.chemical_form||source.chemical_form||source.substance_id,o.basis].join('|');
      if (!groups.has(key)) groups.set(key,[]);
      groups.get(key).push({food_id:source.food_id,preparation:o.preparation||source.preparation,intermediate_id:source.substance_id,contained_amount:{low:(o.value??o.range[0])*factor,high:(o.value??o.range[1])*factor,unit:'mg',basis:o.basis},observation:o,comparison_group:key});
    }
  }
  const comparisons=[];
  for (const [key, rows] of groups) {
    const unique = new Map();
    for (const row of rows) {const id=row.food_id+'|'+row.preparation;if(!unique.has(id))unique.set(id,[]);unique.get(id).push(row);}
    const dedup=[];
    for(const values of unique.values()) {
      if(new Set(values.map(v=>JSON.stringify(v.contained_amount))).size>1){excluded.push({food_id:values[0].food_id,comparison_group:key,reason:'Conflicting comparable observations require source review',records:values.map(v=>v.observation.record)});continue;}
      dedup.push(values[0]);
    }
    if(new Set(dedup.map(v=>v.food_id)).size<2){for(const r of dedup)excluded.push({food_id:r.food_id,record:r.observation.record,comparison_group:key,reason:'Single-source comparison set: fewer than two distinct comparable foods'});comparisons.push({key,foods:dedup.map(r=>r.food_id),status:'single-source'});continue;}
    const result=relativeSourcePower(dedup,10)[0];
    if(!result)continue;
    comparisons.push({key,foods:dedup.map(r=>r.food_id),threshold:10,threshold_status:'provisional',ranked:result.ranked.length});
    qualified.push(...result.ranked);
    excluded.push(...result.unranked.map(r=>({food_id:r.food_id,record:r.observation.record,comparison_group:key,reason:r.rank_reason})));
  }
  qualified.sort((a,b)=>b.relative_power-a.relative_power||a.food_id.localeCompare(b.food_id)||a.comparison_group.localeCompare(b.comparison_group));
  const seen=new Set(), selected=[];
  for(const row of qualified){if(seen.has(row.food_id)){excluded.push({food_id:row.food_id,record:row.observation.record,reason:'Duplicate food identity in another qualifying comparison group'});continue;}seen.add(row.food_id);if(selected.length<5)selected.push(row);else excluded.push({food_id:row.food_id,record:row.observation.record,relative_power:row.relative_power,reason:'Qualifies but outside maximum five; equal-power ties use canonical food ID'});}
  return {selected,excluded,comparisons};
}
