import {secLevelForScore} from '../components/EvidenceConfidenceIndicator/secDisplay.mjs';

export const SEC_STATUSES = Object.freeze({
  'not-scored':'Not scored', conditional:'Conditional estimate',
  'codex-provisional':'Provisionally assessed', 'scientifically-reviewed':'Scientifically reviewed',
});
const factors=['D','B','P','R'];
export const SEC_INTEGRATION_PM_IDS=Object.freeze(['BRS1-FM4-PM9','BRS6-FM1-PM2','BRS2-FM1-PM3','BRS1-FM1-PM1','BRS1-FM1-PM2','BRS4-FM2-PM4','BRS4-FM2-PM5']);
const text=v=>typeof v==='string' && v.trim().length>0;
const value=v=>Number.isInteger(v) && v>=0 && v<=2;
const version=v=>Number.isSafeInteger(v) && v>0;
const date=v=>typeof v==='string' && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v)) && new Date(v).toISOString().slice(0,10)===v;
const identity=r=>r?.pmId+'\0'+r?.findingId+'\0'+r?.recordVersion;

// Stable content identity. Arrays retain order; no prose/identity normalisation.
export function secCanonicalJson(input) {
  function walk(v) {
    if(v===null || typeof v==='string' || typeof v==='boolean') return v;
    if(typeof v==='number' && Number.isFinite(v)) return v;
    if(Array.isArray(v)) return v.map(walk);
    if(v && Object.getPrototypeOf(v)===Object.prototype) return Object.fromEntries(Object.keys(v).sort().map(k=>[k,walk(v[k])]));
    throw new TypeError('SEC records must contain finite JSON values only');
  }
  return JSON.stringify(walk(input));
}

export function secTotals(f) {
  if(!factors.every(k=>value(f?.[k]))) return null;
  const raw=factors.reduce((sum,k)=>sum+f[k],0);
  let ceiling=8;
  if(f.D===1)ceiling=Math.min(ceiling,5);
  if(f.B===0)ceiling=Math.min(ceiling,2);
  if(f.P===0)ceiling=Math.min(ceiling,4);
  return {raw,adjusted:f.D===0?null:Math.min(raw,ceiling),ceiling,ordinal:f.D!==0};
}

export function secRecordErrors(r) {
  const errors=[];
  const add=(code,message)=>errors.push({code,message});
  if(!r || typeof r!=='object' || Array.isArray(r)) return [{code:'sec_record',message:'Assessment must be an object'}];
  if(!text(r.id) || !/^[a-z0-9][a-z0-9-]*$/.test(r.id) || !version(r.recordVersion)) add('sec_identity','Stable assessment ID and positive integer record version required');
  const pm=/^BRS\d+-FM\d+-(PM\d+)$/.exec(r.pmId || '');
  if(!SEC_INTEGRATION_PM_IDS.includes(r.pmId))add('sec_scope','Canonical SEC integration is limited to explicitly integrated PMs');
  if(!pm || !new RegExp('^'+pm[1]+'-(F|IC)\\d+$').test(r.findingId || '')) add('sec_identity','Exact PM and local Finding identities must agree');
  if(!text(r.proposition)) add('sec_proposition','Exact assessed proposition required');
  if(!Object.hasOwn(SEC_STATUSES,r.assessmentStatus)) add('sec_status','Unknown assessment status');
  if(!date(r.lastEvidenceAssessmentDate) || !text(r.process) || !text(r.methodology?.name) || !text(r.methodology?.source)) add('sec_provenance','Assessment date, identified process and methodology required');
  if(!Array.isArray(r.history) || !r.history.length || r.history.some(h=>!date(h?.date)||!text(h?.decision))) add('sec_history','Dated version history required');
  if(!Array.isArray(r.limitations) || !r.limitations.length || !r.limitations.every(text)) add('sec_limitations','Explicit evidence limitations required');
  if(!r.sources || !['supporting','contextual','targetedChecks','retrievalLimited'].every(k=>Array.isArray(r.sources[k])) || !text(r.sources.contradictoryAssessment)) add('sec_sources','Evidence roles, contradiction appraisal and retrieval limitations required');
  if(r.sources) {
    for(const k of ['supporting','contextual'])if(Array.isArray(r.sources[k])&&!r.sources[k].every(text))add('sec_sources','Source identities must be explicit: '+k);
    if(Array.isArray(r.sources.targetedChecks)&&r.sources.targetedChecks.some(s=>!s||!text(s.doi)||!text(s.role)||!text(s.access)||!text(s.assessment)))add('sec_sources','Targeted evidence requires DOI, role, access status and appraisal');
    if(Array.isArray(r.sources.retrievalLimited)&&r.sources.retrievalLimited.some(s=>!s||!/^https?:\/\//.test(s.url||'')||!text(s.limitation)))add('sec_sources','Retrieval gaps require source URL and precise limitation');
  }
  if(!r.rationale || Object.keys(r.rationale).sort().join(',')!=='B,D,P,R' || !r.factors || Object.keys(r.factors).sort().join(',')!=='B,D,P,R')add('sec_factor','Exactly the four existing factors and rationales are required');
  for(const k of factors) {
    if(r.factors?.[k]!==null && !value(r.factors?.[k])) add('sec_factor','Each formal factor must be null or integer 0–2: '+k);
    if(!text(r.rationale?.[k]))add('sec_rationale','Factor rationale required: '+k);
  }
  if(r.assessmentStatus==='not-scored') {
    for(const k of factors)if(r.factorStates?.[k] !== (r.factors?.[k]===null?'unresolved':'established'))add('sec_factor','Unscored factors must distinguish established from unresolved: '+k);
    if(r.rawScore!==null || r.adjustedScore!==null || r.conditional!=null) add('sec_unscored','Not scored cannot conceal a numerical total or conditional estimate');
    if(factors.every(k=>value(r.factors?.[k])))add('sec_unscored','A complete numerical assessment requires its explicit assessment status');
    return errors;
  }
  if(r.assessmentStatus==='conditional') {
    const estimate=r.conditional, totals=secTotals(estimate?.factors);
    if(r.rawScore!==null || r.adjustedScore!==null) add('sec_conditional','Conditional estimates must not populate formal totals');
    if(!factors.some(k=>r.factorStates?.[k]==='conditional') || factors.some(k=>!['established','conditional'].includes(r.factorStates?.[k]))) add('sec_conditional','Bounded estimate requires explicit established/conditional factor states, with at least one conditional');
    if(!totals || estimate.rawScore!==totals.raw || estimate.adjustedScore!==totals.adjusted) add('sec_totals','Conditional total/caps/D0 gate do not match factors');
    for(const k of factors) {
      if(r.factorStates?.[k]==='established' && r.factors?.[k]!==estimate?.factors?.[k])add('sec_conditional','Established factor differs from estimate: '+k);
      if(r.factorStates?.[k]==='conditional' && r.factors?.[k]!==null)add('sec_conditional','Conditional factor must remain unset in formal assessment: '+k);
    }
    if(!text(estimate?.qualification) || !text(estimate?.caps))add('sec_conditional','Estimate qualification and cap rationale required');
    return errors;
  }
  if(r.assessmentStatus==='codex-provisional' || r.assessmentStatus==='scientifically-reviewed') {
    const totals=secTotals(r.factors);
    if(r.assessmentComplete!==true || r.conditional!=null || !factors.every(k=>r.factorStates?.[k]==='established'))add('sec_incomplete','Completed assessment cannot contain conditional or unresolved factors');
    if(!totals || r.rawScore!==totals.raw || r.adjustedScore!==totals.adjusted || !text(r.capRationale))add('sec_totals','Formal total/caps/D0 gate do not match factors');
    if(!(r.sources?.supporting?.length || r.sources?.targetedChecks?.length))add('sec_sources','Completed assessment requires identified evidence');
    if(r.assessmentStatus==='scientifically-reviewed') {
      const h=r.humanReview;
      if(h?.reviewerType!=='human'||!text(h.reviewerIdentity)||!text(h.qualifications)||!date(h.reviewDate)||h.reviewDate<r.lastEvidenceAssessmentDate||h.outcome!=='accepted'||h.assessedRecordVersion!==r.recordVersion||!text(h.changes))add('sec_human_review','Qualified human acceptance of this exact record version required');
    }
  }
  return errors;
}

export function secRegistryErrors(registry) {
  if(registry?.schemaVersion!==1 || !Array.isArray(registry.assessments))return [{code:'sec_registry',message:'Unsupported SEC registry structure'}];
  const errors=[], versions=new Set(), identities=new Set(), owners=new Map();
  for(const entry of registry.assessments) {
    const r=entry?.record;
    if(!/^[a-f0-9]{64}$/.test(entry?.sha256 || ''))errors.push({code:'sec_hash',message:'Pinned SHA-256 required'});
    errors.push(...secRecordErrors(r));
    const key=r?.id+'\0'+r?.recordVersion, owner=r?.pmId+'\0'+r?.findingId;
    if(versions.has(key)||identities.has(identity(r)))errors.push({code:'sec_duplicate',message:'Duplicate assessment ID/version or PM/Finding/version'});
    versions.add(key);identities.add(identity(r));
    if(owners.has(r?.id) && owners.get(r?.id)!==owner)errors.push({code:'sec_identity',message:'Assessment ID cannot change PM/Finding ownership'});
    owners.set(r?.id,owner);
  }
  return errors;
}

export function resolveSecAssessment(registry,{pmId,finding}) {
  if(!Object.hasOwn(finding || {},'sec_assessment_ref'))return {kind:'legacy',record:null,errors:[]};
  const ref=finding.sec_assessment_ref;
  const invalid=message=>({kind:'invalid',record:null,errors:[{code:'sec_reference',message}]});
  if(!ref || Object.keys(ref).sort().join(',')!=='id,sha256,version' || !text(ref.id) || !version(ref.version) || !/^[a-f0-9]{64}$/.test(ref.sha256 || ''))return invalid('Reference requires exactly id, version and SHA-256');
  const global=secRegistryErrors(registry);
  if(global.length)return {kind:'invalid',record:null,errors:global};
  const matches=registry.assessments.filter(e=>e.record.id===ref.id && e.record.recordVersion===ref.version);
  if(matches.length!==1)return invalid('Pinned assessment version is missing or ambiguous');
  const entry=matches[0], r=entry.record;
  if(entry.sha256!==ref.sha256)return invalid('Assessment content pin does not match');
  if(r.pmId!==pmId || r.findingId!==finding.id)return invalid('Assessment belongs to a different PM or Finding');
  if(r.proposition!==finding.finding_statement)return invalid('Finding proposition differs from assessed proposition');
  return {kind:'resolved',record:r,errors:[]};
}

export function secAssessmentView(record) {
  const estimate=record.assessmentStatus==='conditional'?record.conditional:null;
  const total=estimate || record, f=total.factors;
  const ordinal=record.assessmentStatus!=='not-scored' && f?.D!==0;
  const score=ordinal?total.adjustedScore:null, level=secLevelForScore(score);
  const readout=record.assessmentStatus==='not-scored'?'Not scored':f?.D===0?(total.rawScore===0?'0/8 · Assessed zero — insufficient evidence for this claim':'Insufficient evidence for this claim'):level?score+'/8 · '+level.label:'Not scored';
  return {status:record.assessmentStatus,statusLabel:SEC_STATUSES[record.assessmentStatus],score:level?score:null,readout,
    shortId:record.findingId.replace(/^PM\d+-F/,'SF'),title:record.title || record.findingId,
    incomplete:record.assessmentStatus==='not-scored',date:record.lastEvidenceAssessmentDate,
    humanReview:record.assessmentStatus==='scientifically-reviewed'?record.humanReview:null};
}

export const secAuditAnchor=r=>'sec-'+r.id+'-v'+r.recordVersion;
