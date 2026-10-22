import React from 'react';
import EvidenceConfidenceIndicator from '../EvidenceConfidenceIndicator';
import EvidenceAudit from '../SecCalibrationPreview/EvidenceAudit';
import registry from '../../../system/sec-assessments/registry.json';
import {pmCuratedSources} from '../PmCuratedProvenance';
import {resolveSecAssessment,secAssessmentView,secAuditAnchor} from '../../lib/secAssessments.mjs';

// Registry hashes are verified by the Node validation gate before publication.
// Runtime resolution is exact and never fetches an arbitrary supplied path.
export function SecAssessmentSummary({finding,pmId}:{finding:any;pmId?:string}) {
  const resolved=resolveSecAssessment(registry,{pmId,finding});
  if(resolved.kind==='legacy')return null;
  if(!resolved.record)return <span className="brain-sf-sec">Assessment unavailable</span>;
  const display=secAssessmentView(resolved.record);
  if(pmId==='BRS2-FM1-PM3'&&['PM3-F1','PM3-F4'].includes(finding.id)) {
    const sources=pmCuratedSources(pmId).filter((_:any,i:number)=>finding.id==='PM3-F1'?i<3:i>=3);
    return <span className="brain-sf-sec" data-sec-status="not-scored">Biochemical provenance · {sources.map((s:any)=><React.Fragment key={s.anchor}><a href={'#'+s.anchor}>[{s.label}] {s.database}</a>{' · '}</React.Fragment>)}No numerical research-synthesis score · <a href={'?review=1#'+secAuditAnchor(resolved.record)}>Evidence &amp; Audit</a></span>;
  }
  return <span className="brain-sf-sec" data-sec-status={display.status}>
    {display.score===null?<span>{display.readout}</span>:<EvidenceConfidenceIndicator score={display.score} srPrefix="Synthesised Evidence Confidence"/>}
    {' · '}<span>{display.statusLabel}</span>{' · '}
    <a href={'?review=1#'+secAuditAnchor(resolved.record)}>Evidence &amp; Audit</a>
  </span>;
}

export function CanonicalSecAudit({findings,pmId,page,panelId}:{findings:any[];pmId:string;page:any;panelId:string}) {
  const results=findings.filter(f=>Object.hasOwn(f,'sec_assessment_ref')).map(f=>resolveSecAssessment(registry,{pmId,finding:f}));
  const current=results.flatMap(r=>r.record?[r.record]:[]);
  // One current disclosure per Finding. Earlier versions remain inside its
  // versioned history, rather than appearing as duplicate primary assessments.
  const records=current;
  const titles=new Map(findings.map(f=>[f.id,f.finding_label]));
  const presentation=(r:any)=>({...secAssessmentView(r),title:titles.get(r.findingId)||r.title||r.findingId});
  return <>
    {results.some(r=>r.errors.length>0)&&<p role="status">One or more confidence assessments are unavailable. No score has been inferred.</p>}
    <EvidenceAudit panelId={panelId} assessmentRecords={records} assessmentPmId={pmId} assessmentPage={page} assessmentView={presentation} recordAnchor={secAuditAnchor}/>
  </>;
}
