import {evidencePresent} from './dietaryInputGovernance.mjs';
/** Composition, conversion and admission are independent edges. Never infer one from another. */
export function validateFormationPathway(edge, identities) {
 const errors=[];
 for(const id of [edge.from,edge.to])if(!identities[id]?.exists)errors.push(`unresolved-identity:${id}`);
 if(!edge.id||!['microbial-formation','endogenous-formation'].includes(edge.relationship))errors.push('invalid-conversion-kind');
 if(!edge.process||!edge.limitations||!evidencePresent(edge.evidence))errors.push('conversion-evidence-incomplete');
 if(edge.relationship==='microbial-formation'&&!edge.dependencies?.length)errors.push('microbial-dependencies-missing');
 if(!['supported','unresolved'].includes(edge.status))errors.push('conversion-status-unresolved');
 return errors;
}
export function buildDietaryPathwayIndex({docs=[],scopes=[],registeredIdentities={}}) {
 const identities={...registeredIdentities,...Object.fromEntries(scopes.flatMap(s=>s.substances||[]).map(s=>[s.id,s]))};
 const relationships=scopes.flatMap(s=>s.relationships||[]),edges=[],errors=[];
 for(const doc of docs)for(const edge of doc.frontMatter?.formation_pathways||[]) {
  const problems=validateFormationPathway(edge,identities);
  if(problems.length){errors.push({id:edge.id,problems});continue;}
  edges.push({...edge,record:doc.permalink,from_page:identities[edge.from]?.page,to_page:identities[edge.to]?.page});
 }
 // Versioned PM conversion metadata already passed the complete PM admission gate.
 for(const r of relationships.filter(r=>r.scientific_admission==='admitted'&&r.ontology_connections?.conversion==='supported'))
  for(const [i,step] of (r.scientific_assessment?.conversion_pathway||[]).entries())
   edges.push({...step,id:`${r.id}:conversion:${i}`,relationship:/microb|ferment/i.test(step.process)?'microbial-formation':'endogenous-formation',status:'supported',scope_pm:r.pm,record:r.source_record,from_page:identities[step.from]?.page,to_page:identities[step.to]?.page});
 const paths=[],blocked=[];
 for(const r of relationships){
  if(r.scientific_admission!=='admitted')continue;
  const source=r.scientific_assessment?.canonical_substance_id||r.substance_id;
  if(!source)continue;
  const walk=(id,steps,seen)=>{
   if(steps.length>=6)return;
   for(const edge of edges.filter(e=>e.from===id&&(!e.scope_pm||e.scope_pm===r.pm))){
    if(edge.status!=='supported'){blocked.push({pm:r.pm,input:r.input,edge_id:edge.id,reason:edge.limitations});continue;}
    if(seen.has(edge.to))continue;
    const chain=[...steps,edge];
    // The source PM has admitted this supply route. Other PMs need their own full gate.
    const endpointAdmission=r.scientific_assessment?.active_target_id===edge.to&&r.ontology_connections?.conversion==='supported';
    paths.push({id:`${r.id}:${chain.map(e=>e.id).join('>')}`,pm:r.pm,pm_page:r.pm_page,mission:r.operation,atom_id:r.id.split('::')[1],input:r.input,substance_id:source,substance_page:identities[source]?.page,target_id:edge.to,target_title:identities[edge.to]?.title||edge.to,target_page:identities[edge.to]?.page,type:r.scientific_assessment?.type||null,classification:r.scientific_assessment?.classification||r.relationship_type?.classification,admission_basis:r.admission_basis,pm_specific_status:endpointAdmission?'admitted-derived-pathway':'admitted-substrate-production-context',downstream_pm_admission:false,conversion_pathway:chain,food_targets:r.food_targets||[],pm_evidence:r.evidence,limitations:r.limitation});
    walk(edge.to,chain,new Set([...seen,edge.to]));
   }
  };walk(source,[],new Set([source]));
 }
 const inventory=docs.filter(d=>d.frontMatter?.pm_id&&d.permalink?.startsWith('/docs/biological-targets/')).map(doc=>{
  const fm=doc.frontMatter,rs=relationships.filter(r=>r.pm===fm.pm_id),admitted=rs.filter(r=>r.scientific_admission==='admitted'&&r.presentations?.some(p=>p.section==='3.1.1'));
  const traces=(fm.dietary_input_traceability||[]).filter(a=>(fm.dietary_lever_presentations||[]).some(p=>p.atom_id===a.atom_id&&['1.1.1','3.1.1'].includes(p.presentation_section)));
  return {pm:fm.pm_id,title:fm.title,mission:fm.mission,page:doc.permalink,admitted_inputs:admitted.map(r=>({atom_id:r.id,input:r.input,substance_id:r.substance_id,assessment:r.admission_basis,food_count:r.food_targets?.length||0})),existing_dietary_yes:traces.filter(a=>a.dietary_input===true).map(a=>a.atom_id),canonical_inputs:(fm.dietary_input_traceability||[]).map(a=>({atom_id:a.atom_id,input:a.input,dietary_input:a.dietary_input??null,substance_id:a.substance_id||a.canonical_identity?.substance_id||null,role:a.biological_role,evidence:a.evidence_source,limitation:a.evidence_limitation})),upstream_dependencies:(fm.dietary_lever_atoms||[]).filter(a=>a.requirement_classification==='derived').map(a=>({atom_id:a.atom_id,target:a.derived_target,limitation:a.evidence_limitation})),pathway_count:paths.filter(p=>p.pm===fm.pm_id).length,traceability_gaps:rs.filter(r=>Object.values(r.ontology_connections||{}).some(s=>s==='unresolved')).map(r=>({atom_id:r.id,input:r.input,ontology:r.ontology_connections,admission:r.scientific_admission,admission_errors:r.admission_errors,evidence:r.evidence,limitation:r.limitation})),unresolved:rs.filter(r=>r.presentations?.some(p=>p.section==='3.1.1')&&r.scientific_admission!=='admitted').map(r=>({input:r.input,atom_id:r.id,reason:r.admission_errors})),disposition:!rs.length?'canonical-record-review-required':!admitted.length?'no-currently-resolved-admission':admitted.some(r=>!r.food_targets?.length)?'admitted-food-coverage-gap':'admitted-food-targets-resolved'};
 });
 return {schema_version:1,qualification:'Composition and conversion do not establish downstream PM admission or food intervention equivalence.',edges,paths,blocked,inventory,errors};
}
