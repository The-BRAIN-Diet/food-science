import {scientificPrincipleIds} from './scientificPrinciples.mjs';
/** Appraisal completeness, not a confidence scale. Existing D/B/P/R remain authoritative. */
export const SEC_DIMENSIONS=['D','B','P','R'];
const text=x=>typeof x==='string'&&x.trim().length>0;
export function assessmentGapErrors(record,{strict=false}={}) {
 const errors=[];const add=message=>errors.push({code:'sec_completeness',message});
 if(record.completenessVersion!==undefined&&record.completenessVersion!==1)add('Unsupported completeness version');
 if(!strict&&record.completenessVersion!==1)return errors;
 const gaps=record.assessmentGaps||[], ids=new Set();
 for(const gap of gaps){
  if(!text(gap.id)||ids.has(gap.id))add('Assessment gap requires a unique ID');ids.add(gap.id);
  if(gap.pmId!==record.pmId || (record.interventionId ? gap.interventionId!==record.interventionId || gap.findingId!==undefined : gap.findingId!==record.findingId || gap.interventionId!==undefined))add('Assessment gap ownership does not match assessed target');
  if(!gap.dimensions?.length||gap.dimensions.some(d=>!SEC_DIMENSIONS.includes(d)))add('Assessment gap requires valid affected dimensions');
  if(!gap.sources?.length||gap.sources.some(s=>!record.sources?.targetedChecks?.some(c=>c.doi===s)&&![...(record.sources?.supporting||[]),...(record.sources?.contextual||[])].includes(s)))add('Assessment gap source must resolve in the assessment');
  if(!text(gap.reason)||!text(gap.resolutionAction)||!gap.attempts?.length||gap.attempts.some(a=>!/^\d{4}-\d{2}-\d{2}$/.test(a.date||'')||!text(a.action)||!text(a.outcome)))add('Assessment gap requires reason, attempted verification and resolution action');
  if(!['pending','unassessable','resolved'].includes(gap.status)||!gap.history?.length||gap.history.some(h=>!text(h.date)||!text(h.decision)))add('Assessment gap requires explicit status and decision history');
  if(gap.status==='unassessable'&&!text(gap.justification))add('Unassessable requires a documented determination after retrieval');
  if(gap.status!=='resolved'&&gap.dimensions?.some(d=>gap.status==='unassessable'?record.factorStates?.[d]!=='unassessable':!['pending','unresolved','conditional'].includes(record.factorStates?.[d])))add('Unresolved Assessment gap conflicts with scored or differently adjudicated dimensions');
  if(gap.status==='resolved'&&!text(gap.resolution))add('Resolved Assessment gap requires resolution evidence');
 }
 for(const d of SEC_DIMENSIONS){
  const state=record.factorStates?.[d], v=record.factors?.[d];
  if(state==='established'){if(!Number.isInteger(v)||v<0||v>2)add('Scored dimension must have an existing rubric value: '+d);}
  else if(['pending','unassessable','unresolved','conditional'].includes(state)){
   if(v!==null)add('Unresolved component cannot silently become zero or another score: '+d);
   const status=state==='unassessable'?'unassessable':'pending';
   if(!gaps.some(g=>g.dimensions?.includes(d)&&g.status===status))add('Missing tracked Assessment gap for '+d);
  }else add('Missing/permitted dimension state not established: '+d); // No current rubric factor permits not-applicable.
 }
 const pending=SEC_DIMENSIONS.some(d=>['pending','unresolved','conditional'].includes(record.factorStates?.[d]));
 const unassessable=SEC_DIMENSIONS.some(d=>record.factorStates?.[d]==='unassessable');
 if((pending||unassessable)&&(record.rawScore!==null||record.adjustedScore!==null))add('Incomplete components cannot contribute to formal totals');
 if(record.assessmentStatus==='evidence-unassessable'&&(!unassessable||pending))add('Evidence Un-assessable requires adjudicated unassessable factors and no pending appraisal');
 if(unassessable&&!pending&&record.assessmentStatus!=='evidence-unassessable')add('Use Evidence Un-assessable for an adjudicated unassessable assessment');
 if(pending&&record.assessmentStatus==='scientifically-reviewed')add('Pending appraisal blocks scientific approval');
 return errors;
}
export function reconcileSecCoverage(pages,registry,{previousPages=[]}={}) {
 const result={findings:{eligible:0,completed:0,pending:0,unassessable:0,missingStatus:0,legacyPending:0},dimensions:{applicable:0,scored:0,pendingTracked:0,unassessableDocumented:0,unexplainedMissing:0},evidenceGaps:{existing:0,linked:0,multipleFindings:0,requiringReview:0,reviewStateUnrecorded:0},errors:[],rows:[]};
 for(const page of pages){
  const findings=(page.scientific_findings||[]).filter(f=>!scientificPrincipleIds(page).includes(f.id)&&!['scientific-principle','contextual','historical','retired'].includes(f.presentation));const findingIds=new Set(findings.map(f=>f.id));const gapIds=new Set((page.evidence_gaps||[]).map(g=>g.id));
  for(const gap of page.evidence_gaps||[]){result.evidenceGaps.existing++;if(gap.finding_ids?.length)result.evidenceGaps.linked++;if(gap.finding_ids?.length>1)result.evidenceGaps.multipleFindings++;if(gap.review_required===true)result.evidenceGaps.requiringReview++;if(gap.review_required===undefined)result.evidenceGaps.reviewStateUnrecorded++;if(gap.finding_ids?.some(id=>!findingIds.has(id)))result.errors.push(page.pm_id+': invalid Evidence Gap Finding reference');if(['missing-score','low-score','assessment-gap'].includes(gap.created_solely_from))result.errors.push(page.pm_id+': Evidence Gap cannot be created solely from a score or Assessment gap');}
  for(const old of previousPages.find(p=>p.pm_id===page.pm_id)?.evidence_gaps||[])if(!gapIds.has(old.id))result.errors.push(page.pm_id+': Evidence Gap removed; separate scientific adjudication required');
  for(const f of findings){
   result.findings.eligible++;result.dimensions.applicable+=4;const ref=f.sec_assessment_ref;const entry=registry.assessments.find(e=>e.record.id===ref?.id&&e.record.recordVersion===ref?.version);const r=entry?.record;
   if(!r||entry.sha256!==ref.sha256||r.pmId!==page.pm_id||r.findingId!==f.id||r.proposition!==f.finding_statement){const legacyPending=!ref&&f.synthesised_evidence_confidence==='not-yet-scored';result.findings[legacyPending?'pending':'missingStatus']++;if(legacyPending)result.findings.legacyPending++;result.dimensions.unexplainedMissing+=4;result.errors.push(page.pm_id+'/'+f.id+': '+(legacyPending?'Explicit legacy pending status lacks dimension-level appraisal and tracked Assessment gaps':'Missing valid assessment status or pinned reference'));result.rows.push({pmId:page.pm_id,findingId:f.id,status:legacyPending?'Pending appraisal (legacy not-yet-scored)':'missing recorded SEC status',requiresStatusIntegration:true});continue;}
   const errors=assessmentGapErrors(r,{strict:true});result.errors.push(...errors.map(e=>page.pm_id+'/'+f.id+': '+e.message));
   const pending=SEC_DIMENSIONS.some(d=>['pending','unresolved','conditional'].includes(r.factorStates?.[d]));const unassessable=SEC_DIMENSIONS.some(d=>r.factorStates?.[d]==='unassessable');
   result.findings[pending?'pending':unassessable?'unassessable':'completed']++;
   for(const d of SEC_DIMENSIONS){if(r.factorStates?.[d]==='established'&&Number.isInteger(r.factors[d]))result.dimensions.scored++;else {const status=r.factorStates?.[d]==='unassessable'?'unassessable':'pending';const linked=(r.assessmentGaps||[]).some(g=>g.dimensions.includes(d)&&g.status===status&&(status!=='unassessable'||text(g.justification)));result.dimensions[linked?(status==='pending'?'pendingTracked':'unassessableDocumented'):'unexplainedMissing']++;}}
   for(const g of r.assessmentGaps||[])for(const id of g.evidenceGapIds||[])if(!gapIds.has(id))result.errors.push(page.pm_id+': invalid Assessment gap to Evidence Gap link');
   result.rows.push({pmId:page.pm_id,findingId:f.id,status:r.assessmentStatus,assessmentGaps:(r.assessmentGaps||[]).map(g=>g.id)});
  }
 }
 result.structurallyComplete=result.errors.length===0;
 result.scientificallyAppraised=result.structurallyComplete&&result.findings.pending===0&&result.findings.missingStatus===0;
 result.pendingScientificAdjudication=!result.scientificallyAppraised;
 return result;
}
