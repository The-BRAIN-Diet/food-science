// Structural safeguards do not replace source-level scientific adjudication.
const forbidden=/not isolated|evidence insufficient|mediator not measured|mechanistic interpretation|mediator not isolated/i;
export function validateIntervention(r){
 const errors=[]; const a=r.biologicalRelationship;
 if(!r.intervention||!r.interventionType)errors.push('Intervention identity/type required');
 if(!a?.measuredEffect||!a?.pmRelevance)errors.push('Separate measured effect and PM relevance required');
 if(!a?.moa||!['identified','unresolved'].includes(a.moa.status))errors.push('Explicit MoA status required');
 if(!Array.isArray(r.limitations)||!r.limitations.length||r.limitations.some(x=>!x.type||!x.text))errors.push('Independent typed limitations required');
 if(a?.moa?.status==='identified'){
  if(!a.moa.description||!a.moa.summary||!a.moa.mechanismRef||!a.moa.evidenceQualification)errors.push('Identified MoA needs full description, summary, identity and qualification');
  if(!a.moa.semanticReview?.rationale||a.moa.semanticReview?.status!=='reviewed')errors.push('Documented semantic alignment review required');
 }
 if(a?.moa?.status==='unresolved'&&a.moa.summary)errors.push('Unresolved MoA cannot have a summary');
 if(forbidden.test(a?.moa?.summary||''))errors.push('Evidence-status placeholder is not a mechanism');
 if(a?.moa?.summary===a?.measuredEffect)errors.push('Effect cannot silently substitute for mechanism');
 if('mechanism' in r)errors.push('Summary must derive from structured MoA, not independent top-level assertion');
 return errors;
}
export function mechanismSummary(r){
 const errors=validateIntervention(r);if(errors.length)throw Error(errors.join('; '));
 return r.biologicalRelationship.moa.status==='identified'?r.biologicalRelationship.moa.summary:null;
}
