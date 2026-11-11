import {relatedFoodsForInput,RELATED_SUBSTANCE_RELATIONSHIPS} from './relatedSubstanceRelationships.mjs';
const members=['acetate','propionate','butyrate'];
/** Related-food presentation only. The class roll-up retains member provenance, never yields. */
export function scfaRelatedSources(relationships,foodSources){
 const foods=foodSources.filter(s=>!s.publication_hold&&!s.ranking_hold).map(s=>({...s,presence_records:(s.presence_records||[]).filter(p=>!p.publication_hold&&!p.ranking_hold&&!['internal-only','excluded-error','substance-only'].includes(p.public_display))}));
 const rows=[];
 for(const input of relationships.filter(r=>[...members,'scfas'].includes(r.substance_id)&&r.projection_status!=='blocked'&&r.network_activation!=='held')){
  const ids=input.substance_id==='scfas'?members:[input.substance_id];
  for(const row of relatedFoodsForInput(ids.map(substance_id=>({substance_id})),foods,RELATED_SUBSTANCE_RELATIONSHIPS.filter(r=>ids.includes(r.related_id)))){
   const key=[row.food_id,input.substance_id,row.intermediate_id,row.preparation].join('|');let existing=rows.find(r=>r.key===key);
   if(existing){existing.member_pathways.push(row);continue;}
   rows.push({...row,key,related_id:input.substance_id,related_label:input.substance_id==='scfas'?'Short-chain fatty acids (SCFAs)':row.related_label,contained_amount:null,member_pathways:[row],limitation:row.limitation+' Related substrate provision only; does not complete a PM-specific dietary pathway. No guaranteed product mixture, amount, yield or clinical benefit. Class membership does not transfer member-specific effects.'});
  }
 }
 return rows;
}
