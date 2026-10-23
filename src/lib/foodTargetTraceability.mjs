import {structuredEvidence, reconcileFoodTargets} from './foodTargetReconciliation.mjs';
import {assessAdmission,evidencePresent,canonicalSection} from './dietaryInputGovernance.mjs';
export const FOOD_MAPPING_STATES=['verified','research-supported-provisional','unresolved'];
const unique=xs=>[...new Set(xs)];
const visible=e=>!['internal-only','excluded-error','substance-only'].includes(e.public_display)&&e.evidence_status!=='rejected';
const key=t=>JSON.stringify([t.food_id,t.substance_id,t.relationship||'contains',t.material||'',t.preparation||'']);
export function projectFoodTargets({relationships=[],substances={},research=[],foodSources=[]}) {
 const queue=new Map(),rollup=[],projected=[];
 const identities=Array.isArray(substances)?Object.fromEntries(substances.map(s=>[s.id,s])):substances;
 for(const r of relationships) {
  if(!(r.presentations||[]).some(p=>canonicalSection(p.section)==='3.1.1')) {projected.push(r);continue;}
  const admission=assessAdmission({...r,operation:r.operation},r.scientific_assessment,{substances:identities});
  // Preserve historical decisions without pretending they passed a newly introduced gate.
  const scientificStatus=r.scientific_assessment?admission.status:(r.historical_admission&&r.dietary_input===true?'admitted':'unresolved');
  const supplyId=r.scientific_assessment?.canonical_substance_id||r.substance_id;
  const targets=[];
  if(scientificStatus==='admitted'&&supplyId&&identities[supplyId]) {
   const existing=foodSources.filter(f=>f.substance_id===supplyId);
   for(const f of existing) {
    const structured=structuredEvidence(f);
    const compositional=(f.observations||[]).filter(visible).filter(o=>o.verified&&o.source_url);
    const provisional=(f.presence_records||[]).filter(visible).filter(e=>e.source_url&&e.evidence);
    const ev=structured.length?structured:[...compositional,...provisional];
    if(!ev.length)continue;
    targets.push({...f,observations:(f.observations||[]).filter(visible),presence_records:(f.presence_records||[]).filter(visible),mapping_status:structured.length?'verified':'research-supported-provisional',relationship:'contains',evidence:ev,delivery:r.scientific_assessment?.classification==='derived'||r.relationship_type?.classification==='derived'?'precursor-source':'direct-input-source'});
   }
   for(const f of research.filter(f=>f.substance_id===supplyId&&f.status==='research-supported-provisional')) {
    if(!f.food_id||!f.food_page||!f.preparation||!f.material||!evidencePresent(f.evidence)||!f.limitations)continue;
    targets.push({...f,mapping_status:'research-supported-provisional',relationship:'contains',delivery:r.scientific_assessment?.classification==='derived'||r.relationship_type?.classification==='derived'?'precursor-source':'direct-input-source'});
   }
  }
  const reconciled=reconcileFoodTargets(targets);
  const foods=reconciled.foods.map(f=>({...f,substance_title:identities[supplyId]?.title||supplyId})),warnings=[];
  if(!supplyId||!identities[supplyId])warnings.push(`${r.input}: canonical substance identity unresolved.`);
  const derived=(r.scientific_assessment?.classification||r.relationship_type?.classification)==='derived';
  const conversionUnresolved=derived&&(!r.scientific_assessment?.conversion_pathway?.length||admission.errors.some(e=>/conversion|target|dependencies/.test(e)));
  if(conversionUnresolved)warnings.push(`${r.input} → ${r.derived_target||r.scientific_assessment?.active_target_id||'active target'}: conversion pathway reconciliation pending.`);
  const ontologyConnections={identity:supplyId&&identities[supplyId]?'resolved':'unresolved',conversion:derived?(conversionUnresolved?'unresolved':'supported'):'not-applicable',food:foods.length?'supported':'unresolved'};
  if(!foods.length)warnings.push(`${r.input}: Food ontology coverage unresolved.`);
  for(const f of foods.filter(f=>f.mapping_status==='research-supported-provisional')) {
   const review=f.material_equivalence_status==='review-required';
   const context=f.display_material_context?` [${f.material}; ${f.preparation||'preparation unresolved'}]`:'';
   const missing=`${f.food_title||f.food_id} → ${identities[supplyId]?.title||r.input}${context}: ${review?'material equivalence review required; an existing structured edge has a different or unconfirmed material context':'food ontology link pending'}.`;
   warnings.push(missing);const k=key(f);
   if(!queue.has(k))queue.set(k,{source_entity:f.food_id,target_entity:supplyId,relationship_type:'contains',canonical_ids:{food:f.food_id,substance:supplyId},candidate_food:f.food_title||f.food_id,material:f.material,preparation:f.preparation,evidence:[],affected_pms:[],missing_edge:`docs/foods/${f.food_id}.md#substance_relationships: contains ${supplyId} (${f.preparation})`,required_action:'Cursor must independently verify evidence, food material and preparation before creating or modifying a canonical edge.',verification_status:'pending-independent-verification'});
   const q=queue.get(k);
   if(review){q.relationship_type='material-equivalence-review';q.missing_edge=missing;q.required_action='Compare the existing edge with this source material, brand/fortification, cultivar, preparation and analytical context. Do not create a new food edge unless independently established as necessary.';q.verification_status='requires-material-equivalence-review';}
   q.affected_pms=unique([...q.affected_pms,r.pm]);q.evidence.push(f.evidence);
  }
  const coverage=foods.some(f=>f.mapping_status==='verified')?'verified':foods.length?'research-supported-provisional':'unresolved';
  const out={...r,scientific_admission:scientificStatus,admission_basis:r.scientific_assessment?'versioned-assessment':'historical-decision-pending-reconciliation',admission_errors:admission.errors,ontology_connections:ontologyConnections,food_target_mapping:coverage,food_targets:foods,food_target_reconciliations:reconciled.resolutions,coverage_warnings:unique(warnings)};
  projected.push(out);
  if(scientificStatus==='admitted')for(const f of foods.length?foods:[null])rollup.push({brs:r.brs,fm:r.fm,pm:r.pm,biological_mechanism:r.operation||null,dietary_input:r.input,type:r.scientific_assessment?.type||(r.relationship_type?.mode==='state-regulation'?'B':r.relationship_type?.mode==='capacity-requirement'?'A':null),classification:r.scientific_assessment?.classification||r.relationship_type?.classification,canonical_substance_id:supplyId||null,ontology_connections:ontologyConnections,scientific_admission:scientificStatus,admission_basis:out.admission_basis,food_target:f?.food_id||null,food_title:f?.food_title||null,food_material:f?.material||null,material_equivalence_status:f?.material_equivalence_status||null,material_equivalence_reason:f?.material_equivalence_reason||null,ontology_relationship_status:f?.ontology_relationship_status||null,reconciled_sources:f?.reconciled_sources||[],mapping_status:f?.mapping_status||'unresolved',food_evidence:f?.evidence||null,pm_evidence:r.evidence,preparation:f?.preparation||null,delivery:f?.delivery||null,conversion_pathway:r.scientific_assessment?.conversion_pathway||[],limitations:[r.limitation,f?.limitations].filter(Boolean),missing_ontology_edge:f?.mapping_status==='research-supported-provisional'&&f.material_equivalence_status!=='review-required'?`${f.food_id} → ${supplyId} [${f.material}; ${f.preparation||'preparation unresolved'}]`:null});
 }
 return {relationships:projected,manuscript_rows:rollup,cursor_queue:[...queue.values()]};
}
export function escapeHtml(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
export function informationIcon(message){return `<span class="food-target-info" style="color:#c62828;display:inline-block;font-size:.8em;margin-left:.3em" role="img" aria-label="${escapeHtml(message)}" title="${escapeHtml(message)}">ⓘ</span>`;}
export function renderCoverageWarning(warnings=[]) {return warnings.length?`<p class="food-target-coverage-warning">${escapeHtml(unique(warnings).join(' '))}</p>`:'';}
export function renderTarget(target){
 const o=(target.observations||[]).filter(visible).find(o=>o.verified&&o.unit&&o.basis&&(Number.isFinite(o.value)||Array.isArray(o.range)));
 if(!target.amount&&o)target={...target,amount:{value:o.value??o.range.join('–'),unit:o.unit,basis:o.basis}};
const pending=target.mapping_status==='research-supported-provisional';
 const review=target.material_equivalence_status==='review-required';
 const pendingMessage=`${target.food_title||target.food_id} → ${target.substance_title||target.substance_id}: ${review?'material equivalence review required; not a confirmed missing food edge':'food ontology link pending'}.`;
return `<a href="${escapeHtml(target.food_page)}">${escapeHtml(target.food_title||target.food_id)}</a>${pending?informationIcon(pendingMessage):''}<span> — ${escapeHtml(target.preparation||'preparation unresolved')}${target.display_material_context?`; material: ${escapeHtml(target.material)}`:''}${review?'; material equivalence review required':''}; ${target.delivery==='precursor-source'?'supplies precursor':'contains dietary input'}${target.amount?`; ${escapeHtml(target.amount.value)} ${escapeHtml(target.amount.unit)} (${escapeHtml(target.amount.basis)})`:''}${target.limitations?`; ${escapeHtml(target.limitations)}`:''}</span>${(Array.isArray(target.evidence)?target.evidence.flatMap(e=>e.sources||[e.source_url]).filter(Boolean):target.evidence?.sources||[]).filter(s=>/^https?:\/\//.test(s)).map(s=>` <a href="${escapeHtml(s)}">Composition source</a>`).join('')}`;}
