import {structuredEvidence, reconcileFoodTargets, verifiedFoodTarget} from './foodTargetReconciliation.mjs';
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
   for(const f of research.filter(f=>f.substance_id===supplyId&&f.status==='research-supported-provisional'&&(!f.pm_ids||f.pm_ids.includes(r.pm)))) {
    if(!f.food_id||!f.food_page||!f.preparation||!f.material||!evidencePresent(f.evidence)||!f.limitations)continue;
    targets.push({...f,mapping_status:'research-supported-provisional',relationship:'contains',delivery:r.scientific_assessment?.classification==='derived'||r.relationship_type?.classification==='derived'?'precursor-source':'direct-input-source'});
   }
  }
  const reconciled=reconcileFoodTargets(targets);
  const foods=reconciled.foods.map(f=>({...f,substance_title:identities[supplyId]?.title||supplyId})),warnings=[];
  if(r.scientific_assessment?.review_required&&scientificStatus==='unresolved')warnings.push(`${r.input}: Scientific admission requires review. ${r.scientific_assessment.review_reason||'See the source assessment.'}`);
  if(!supplyId||!identities[supplyId])warnings.push(`${r.input}: canonical substance identity unresolved.`);
  const derived=(r.scientific_assessment?.classification||r.relationship_type?.classification)==='derived';
  const conversionUnresolved=derived&&(!r.scientific_assessment?.conversion_pathway?.length||admission.errors.some(e=>/conversion|target|dependencies/.test(e)));
  if(conversionUnresolved)warnings.push(`${r.input} → ${r.derived_target||r.scientific_assessment?.active_target_id||'active target'}: conversion pathway reconciliation pending.`);
  const ontologyConnections={identity:supplyId&&identities[supplyId]?'resolved':'unresolved',conversion:derived?(conversionUnresolved?'unresolved':'supported'):'not-applicable',food:foods.length?'supported':'unresolved'};
  if(!foods.length)warnings.push(r.substance_id==='butyrate'&&r.dietary_input!==true?'Butyrate: dietary admission unresolved. No approved food-delivery targets. Existing substrate foods are upstream candidates, not butyrate content.':`${r.input}: Food ontology coverage unresolved.`);
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
 attachUnresolvedButyrateCandidates(projected,foodSources);
 return {relationships:projected,manuscript_rows:rollup,cursor_queue:[...queue.values()]};
}
const PRECURSOR_LINKS={
 'resistant-starch':{
  limitation:'Defined RS2/RS3 preparations can support microbial utilisation and increased butyrate proportions in suitable communities. This reuses the approved BRS5-FM2-PM5 Type A/Direct substrate assessment. It does not transfer the resistant-potato-starch faecal response to ordinary foods, and it does not establish epithelial butyrate exposure or tight-junction engagement.',
  chain:{food_delivery:'established',microbial_butyrate:'conditional',ordinary_food_butyrate_yield:'unresolved',epithelial_exposure:'unresolved',tight_junction_engagement:'unresolved',butyrate_cellular_action:'established-experimental',pm1_capacity_admission:'withheld'},
 },
 pectin:{
  limitation:'Apple pectin composition is provisional. Purified-pectin cultures can raise acetate and butyrate together, and the profile is often acetate-rich. That does not establish a butyrate-specific yield, epithelial exposure or tight-junction engagement.',
  chain:{food_delivery:'provisional',microbial_butyrate:'conditional',ordinary_food_butyrate_yield:'unresolved',epithelial_exposure:'unresolved',tight_junction_engagement:'unresolved',butyrate_cellular_action:'established-experimental',pm1_capacity_admission:'withheld'},
 },
 'fructo-galacto-oligosaccharides':{
  limitation:'No canonical food source is recorded. The studied FOS/GOS preparation does not establish inulin alone, ordinary food portions, a butyrate-specific yield or tight-junction improvement. Its PM5 Capacity claim remains unresolved.',
  chain:{food_delivery:'absent',microbial_butyrate:'unresolved',ordinary_food_butyrate_yield:'unresolved',epithelial_exposure:'unresolved',tight_junction_engagement:'unresolved',butyrate_cellular_action:'established-experimental',pm1_capacity_admission:'withheld'},
 },
};
/** Candidate display only. Does not admit butyrate, create a class identity, or add food targets to the roll-up. */
export function unresolvedButyratePrecursorCandidates(relationships=[],foodSources=[]) {
 const bundles=[];
 for(const product of relationships.filter(r=>r.substance_id==='butyrate'&&r.dietary_input!==true)) {
  const derived=relationships.filter(r=>r.pm===product.pm&&r.derived_target_atom_id===product.id&&!r.substance_id);
  if(!derived.length)continue;
  const seen=new Set(),candidates=[];
  for(const substrate of relationships.filter(r=>r.pm===product.pm&&PRECURSOR_LINKS[r.substance_id])) {
   if(seen.has(substrate.substance_id))continue;
   seen.add(substrate.substance_id);
   const link=PRECURSOR_LINKS[substrate.substance_id];
   const foods=foodSources.filter(f=>f.substance_id===substrate.substance_id).map(f=>{
    const verified=verifiedFoodTarget(f);
    return {...f,substance_title:substrate.input,mapping_status:verified?'verified':'research-supported-provisional',delivery:'precursor-source',limitations:link.limitation,review_status:verified?'verified-substrate-food':'provisional-substrate-food'};
   });
   candidates.push({relationship_id:substrate.id,substance_id:substrate.substance_id,label:substrate.input,review_status:!foods.length?'no-canonical-food-source':foods.some(f=>f.mapping_status==='verified')?'verified-substrate-food':'provisional-substrate-food',limitation:link.limitation,chain:{...link.chain,food_delivery:foods.length?link.chain.food_delivery:'absent'},foods});
  }
  bundles.push({product_id:product.id,derived_ids:derived.map(r=>r.id),inulin:{admitted:false,reason:'Inulin is not an admitted substrate of this PM. No canonical inulin food edge is joined, and the FOS/GOS record does not establish inulin alone.'},candidates});
 }
 return bundles;
}
function attachUnresolvedButyrateCandidates(projected,foodSources) {
 for(const bundle of unresolvedButyratePrecursorCandidates(projected,foodSources)) {
  for(const id of bundle.derived_ids) {
   const row=projected.find(r=>r.id===id);
   if(!row)continue;
   row.upstream_candidates=bundle;
   row.coverage_warnings=unique((row.coverage_warnings||[]).map(w=>w.endsWith('Food ontology coverage unresolved.')?'Fermentable dietary fibre: no canonical class identity. Upstream substrate foods are candidate sources, not approved butyrate-delivery targets.':w));
  }
 }
}
export function renderUpstreamCandidates(bundle) {
 if(!bundle)return '';
 const blocks=bundle.candidates.map(candidate=>{
  const items=candidate.foods.length?`<ul>${candidate.foods.map(food=>`<li>${renderTarget(food)}</li>`).join('')}</ul>`:`<p>No canonical food source recorded.</p>`;
  return `<section data-substrate="${escapeHtml(candidate.substance_id)}"><h4>${escapeHtml(candidate.label)}</h4><p>${escapeHtml(candidate.review_status)}. ${escapeHtml(candidate.limitation)}</p>${items}</section>`;
 }).join('');
 return `<details class="pm-input-food-sources" data-food-source-kind="upstream-candidates"><summary><span class="pm-input-food-source-arrow" aria-hidden="true">▶</span>Upstream candidate sources</summary><p>Not approved butyrate-delivery targets. Each food is a source of the named fermentable substrate only.</p>${blocks}<p>${escapeHtml(bundle.inulin.reason)}</p></details>`;
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
return `<a href="${escapeHtml(target.food_page)}">${escapeHtml(target.food_title||target.food_id)}</a>${pending?informationIcon(pendingMessage):''}<span> — ${escapeHtml(target.preparation||'preparation unresolved')}${target.display_material_context?`; material: ${escapeHtml(target.material)}`:''}${review?'; material equivalence review required':''}; ${target.delivery==='precursor-source'?'supplies precursor':'contains dietary input'}${target.amount?`; ${escapeHtml(target.amount.value)} ${escapeHtml(target.amount.unit)} (${escapeHtml(target.amount.basis)})`:''}${target.limitations?`; ${escapeHtml(target.limitations)}`:''}</span>${[...new Set((Array.isArray(target.evidence)?target.evidence.flatMap(e=>e.sources||[e.source_url]).filter(Boolean):target.evidence?.sources||[]).filter(s=>/^https?:\/\//.test(s)))].map(s=>` <a href="${escapeHtml(s)}">Composition source</a>`).join('')}`;}
