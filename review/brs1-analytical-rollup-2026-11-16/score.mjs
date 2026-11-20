/** Pure, BRS1-only analytical calculation. No canonical writes or publication. */
export function scoreFoods(rows, config) {
 if(config.scope!=='BRS1'||rows.some(r=>r.brs!=='BRS1')) throw Error('BRS1 only');
 const groupFor = s => Object.entries(config.overlap_groups).find(([,members])=>members.includes(s))?.[0] || s;
 const result={};
 for(const [view,classes] of Object.entries(config.ownership_views)) {
  const foods=new Map();
  for(const r of rows) {
   if(!classes.includes(r.accounting)||config.excluded_from_score.includes(r.substance_id)||!Number.isFinite(r.rsp)||r.rsp<config.minimum_rsp_inclusive)continue;
   if(!foods.has(r.food_id))foods.set(r.food_id,[]);foods.get(r.food_id).push(r);
  }
  result[view]=[...foods].map(([food_id,rs])=>{
   const groups=[...new Set(rs.map(r=>groupFor(r.substance_id)))].sort().map(input=>{
    const components=rs.filter(r=>groupFor(r.substance_id)===input);
    const conflicts=[...new Set(components.map(r=>r.substance_id))].flatMap(s=>{const pools=[...new Set(components.filter(r=>r.substance_id===s).map(r=>r.comparison_group))];return pools.length>1?[{substance:s,pools}]:[];});
    if(conflicts.length)return {input,points:null,status:'unresolved incompatible pools',conflicts,components:components.map(r=>r.row_id)};
    const rsp=Math.max(...components.map(r=>r.rsp));
    return {input,rsp,points:rsp/100,status:'scored',winner_rows:components.filter(r=>r.rsp===rsp).map(r=>r.row_id),components:components.map(r=>r.row_id)};
   });
   const forms=[...new Set(rs.map(r=>r.material))].sort(); // Same exact material with canned/canned-drained aliases is one form; original labels remain in rows.
   return {food_id,food_name:rs[0].food_name,score:groups.reduce((s,g)=>s+(g.points??0),0),source_strength_score:groups.reduce((s,g)=>s+(g.points??0),0),system_coverage_score:groups.reduce((s,g)=>s+(g.points??0),0),score_status:groups.some(g=>g.points===null)?'resolved subtotal only':'complete for retained inputs',scoring_input_count:groups.filter(g=>g.points!==null).length,substance_count:new Set(rs.map(r=>r.substance_id)).size,pm_count:new Set(rs.map(r=>r.pm_id)).size,pm_ids:[...new Set(rs.map(r=>r.pm_id))].sort(),ownership:[...new Set(rs.map(r=>r.accounting))].sort(),composite_profile:forms.length>1,forms,groups};
  }).sort((a,b)=>b.score-a.score||(a.food_id<b.food_id?-1:a.food_id>b.food_id?1:0)).map((f,i)=>({...f,rank:i+1}));
 }
 return result;
}
