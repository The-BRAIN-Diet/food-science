import {scientificPrincipleIds,scientificPrinciples,scientificPrincipleErrors} from '../../lib/scientificPrinciples.mjs';
import React from 'react';
import ScientificFinding from '../ScientificFinding';
import EvidenceDisclosure from '../EvidenceGaps/Disclosure';
import ScientificTransparencyAudit from '../EvidenceGaps/Audit';
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
    {(display.score !== null || display.readout !== display.statusLabel) && <>{' · '}<span>{display.statusLabel}</span></>}{' · '}
    <a href={'?review=1#'+secAuditAnchor(resolved.record)}>Evidence &amp; Audit</a>
  </span>;
}

export function CanonicalSecAudit({findings,pmId,page,panelId,frontMatter}:{findings:any[];pmId:string;page:any;panelId:string;frontMatter?:any}) {
  const results=findings.filter(f=>Object.hasOwn(f,'sec_assessment_ref')).map(f=>resolveSecAssessment(registry,{pmId,finding:f}));
  const current=results.flatMap(r=>r.record?[r.record]:[]);
  // One current disclosure per Finding. Earlier versions remain inside its
  // versioned history, rather than appearing as duplicate primary assessments.
  const principleIds=scientificPrincipleIds(frontMatter);
  const principleErrors=scientificPrincipleErrors(frontMatter);
  const principles=principleErrors.length ? [] : scientificPrinciples(frontMatter);
  const records=current.filter(r=>!principleIds.includes(r.findingId));
  const principleContent=principles.length ? <section id="scientific-principles" aria-label="Scientific Principles">
    <h3>Scientific Principles</h3>
    <p>Foundational biochemical identities and reactions. Numerical SEC appraisal is not applicable to these propositions.</p>
    {principles.map(p=>{const body=<>
      <h4>{p.title}</h4>
      <p><strong>Biochemical proposition:</strong> {p.proposition}</p>
      <p><strong>Mechanism/pathway:</strong> {p.mechanism}</p>
      <ul>{p.sources.map((source:any)=><li key={source.href}><a href={source.href}>{source.label}</a>{source.version && ` · ${source.version}`}{source.accessed && ` · Accessed ${source.accessed}`}</li>)}</ul>
      <p><strong>Scope limitations:</strong> {p.scope_limitations}</p>
      <p><strong>Classification:</strong> {p.classification_rationale}</p>
      <p>{p.original_finding_id && <><strong>Original identity:</strong> <a href={principleIds.includes(p.original_finding_id) ? `#${p.original_finding_id.toLowerCase()}` : `?review=0#${p.original_finding_id.toLowerCase()}`}>{p.original_finding_id}</a> · </>}Reviewed {p.reviewed_on}</p>
    </>;return frontMatter?.evidence_tabs_version === 1 ? <EvidenceDisclosure key={p.id} id={p.id} label={p.id} title={p.title}>{body}</EvidenceDisclosure> : <section key={p.id} id={p.id.toLowerCase()}>{body}</section>;})}
    {current.filter(r=>principleIds.includes(r.findingId)).map(r=><div key={r.findingId} id={secAuditAnchor(r)}>
      <span id={r.findingId.toLowerCase()} />
      <details><summary>Historical Finding assessment — {r.findingId} (preserved)</summary>
        <p>This is the original assessment record, not the active classification of the Scientific Principle. The historical identity is reserved and must not be reused.</p>
        <EvidenceAudit panelId={`historical-${r.findingId.toLowerCase()}`} assessmentRecords={[r]} assessmentPmId={pmId} assessmentPage={page} assessmentView={record=>({...secAssessmentView(record),title:record.title||record.findingId})} recordAnchor={record=>record.recordVersion===r.recordVersion ? `${secAuditAnchor(record)}-historical` : secAuditAnchor(record)} embedded />
      </details>
    </div>)}
  </section> : null;
  const titles=new Map(findings.map(f=>[f.id,f.finding_label]));
  const presentation=(r:any)=>({...secAssessmentView(r),title:titles.get(r.findingId)||r.title||r.findingId,incompleteReason:frontMatter?.scientific_finding_classification_notes?.[r.findingId]});
  return <>
    {principleErrors.length>0 && <p role="status">Scientific Principle classification requires review. Original Findings remain visible.</p>}
    {results.some(r=>r.errors.length>0)&&<p role="status">One or more confidence assessments are unavailable. No score has been inferred.</p>}
    <EvidenceAudit panelId={panelId} showEvidenceReviewStatus={frontMatter?.evidence_tabs_version !== 1} assessmentRecords={records} assessmentPmId={pmId} assessmentPage={page} assessmentView={presentation} recordAnchor={secAuditAnchor} scientificPrinciples={principleContent} scientificFindings={frontMatter?.evidence_tabs_version === 1 && frontMatter?.scientific_findings_placement !== 'section-4' ? <section id="scientific-findings" aria-label="Scientific Findings"><h3>Scientific Findings ({findings.length})</h3>{findings.map(f => <ScientificFinding key={f.id} finding={f} pmId={pmId}/>)}</section> : undefined} scientificTransparency={<ScientificTransparencyAudit data={frontMatter}/>}/>
  </>;
}
