import React, {useEffect, useRef} from 'react';
import {useLocation} from '@docusaurus/router';
import PageReviewPanel from '../ReviewCorrections/PageReviewPanel';
import {findPublicPageRecord, frameworkQcPublic, type PublicPageRecord} from '../../data/frameworkQcPublic';
import EvidenceConfidenceIndicator, {SEC_DISPLAY_LEVELS} from '../EvidenceConfidenceIndicator';
import {initBrsFmHubDropdowns} from '../../client/brsFmHubDropdown';
import {audit, sf2Audit} from './assessmentAudit.mjs';
import {sameAudits} from './sameAudit.mjs';
import v1Assessments from '../../../review/sec-integration/assessments.json';
import {V1DecisionAudit} from './V1Preview';
import {expandedGlycaemicAudits as glycaemicAudits} from './glycaemicStage2.mjs';
import {GlycaemicStage2Audit} from './GlycaemicInterventionPreview';
import {assessmentPresentation, evidenceReviewPresentation, correctionPresentation, secFactors, describeFactorScores} from './auditPresentation.mjs';
import styles from './styles.module.css';

export default function EvidenceAudit({panelId,assessmentRecords,assessmentPmId,assessmentPage,assessmentView=assessmentPresentation,recordAnchor=(r:any)=>r.id,scientificPrinciples,scientificTransparency,embedded=false}: {panelId:string;assessmentRecords?:any[];assessmentPmId?:string;assessmentPage?:PublicPageRecord|null;assessmentView?:(r:any)=>any;recordAnchor?:(r:any)=>string;scientificPrinciples?:React.ReactNode;scientificTransparency?:React.ReactNode;embedded?:boolean}) {
  const location = useLocation();
  const v1Pm = location.pathname.includes('/sec-calibration/v1/') ? ({gaba:'BRS1-FM4-PM9','glycaemic-variability':'BRS6-FM1-PM2','same-synthesis':'BRS2-FM1-PM3'}[location.pathname.replace(/\/$/,'').split('/').pop() || '']) : null;
  const records = assessmentRecords ?? (v1Pm ? v1Assessments.filter(r => r.pmId === v1Pm) : location.pathname.replace(/\/$/, '') === '/docs/system/sec-calibration/same-synthesis' ? sameAudits : location.pathname.replace(/\/$/, '') === '/docs/system/sec-calibration/glycaemic-variability' ? glycaemicAudits : [audit, sf2Audit]);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (root.current) initBrsFmHubDropdowns(root.current);
  }, []);
  const page: PublicPageRecord | null = assessmentPage !== undefined ? assessmentPage : findPublicPageRecord({pageId: assessmentPmId || records[0]?.pmId});
  return <div ref={root} id={panelId} role={embedded ? undefined : "tabpanel"} aria-labelledby={embedded ? undefined : "review-corrections-tab"}>
    {!embedded && <>
    <h2 tabIndex={-1}>Evidence &amp; Audit</h2>
    <div id="sec-rubric-legend" className="brs-fm-hub-item brain-sf-disclosure" data-brs-fm-hub>
      <div className="brs-fm-hub-shell">
        <button type="button" className="brs-fm-hub-summary" aria-expanded="false">
          <span className="brs-fm-hub-chevron" aria-hidden="true" />
          <span className={styles.auditSummary}><strong>How evidence confidence is assessed</strong><span>Understand the 8-point Synthesised Evidence Confidence (SEC) score and review statuses</span></span>
        </button>
        <div className="brs-fm-hub-panel" hidden>
          <p>Synthesised Evidence Confidence (SEC) describes how strongly the assessed body of research supports a specific scientific conclusion. It does not measure treatment effectiveness or the size of a biological effect.</p>
          <h4>Eight-level confidence legend</h4>
          <ul className={styles.confidenceLegend}>{SEC_DISPLAY_LEVELS.map(level => <li key={level.score}><EvidenceConfidenceIndicator score={level.score} srPrefix="Synthesised Evidence Confidence" /></li>)}</ul>
          <h4>What contributes to the score?</h4>
          <dl className={styles.factorLegend}>{Object.entries(secFactors).map(([key, factor]) => <React.Fragment key={key}><dt><strong>{key} — {factor.name}</strong></dt><dd>{factor.explanation}</dd></React.Fragment>)}</dl>
          <p>Each factor contributes <strong>0–2 points</strong> to the total.</p>
          <p><strong>SEC = Directness + Bias Protection + Precision + Replication</strong></p>
          <p>Maximum score: <strong>8 points</strong>. The raw total may be subject to confidence ceilings where material scientific limitations apply.</p>
          <h4>Assessment status</h4>
          <ul>
            <li><strong>Not scored:</strong> A complete defensible assessment is not yet available.</li>
            <li><strong>Conditional estimate:</strong> Some factor judgements still require verification.</li>
            <li><strong>Provisionally assessed:</strong> All four factors are defensibly assessed and documented; this does not imply human expert review.</li>
            <li><strong>Scientifically reviewed:</strong> An identified qualified human reviewer has evaluated and accepted the assessment.</li>
          </ul>
          <h4>Interpreting the score</h4>
          <ul>
            <li>A low score does not automatically mean a finding is false.</li>
            <li>A high score does not establish dietary or clinical effectiveness unless that is the exact proposition assessed.</li>
            <li>SEC measures confidence in a conclusion, not its effect size.</li>
            <li>Missing evidence must not automatically be scored zero.</li>
            <li>The SEC rubric and caps remain under scientific calibration.</li>
          </ul>
          <p>Methodology under calibration</p>
        </div>
      </div>
    </div>
    <h3>Evidence review status</h3>
    <p>{evidenceReviewPresentation(page)}</p>
    {records === glycaemicAudits && <GlycaemicStage2Audit />}
    {v1Pm && <V1DecisionAudit />}
    {scientificPrinciples}
    </>}
    <h3>{embedded ? "Historical assessment details" : "Scientific Finding assessments"}</h3>
    {records.map(audit => {
      const conditional = 'conditional' in audit ? audit.conditional : null;
      const display = assessmentView(audit);
      return <div key={recordAnchor(audit)} id={recordAnchor(audit)} className="brs-fm-hub-item brain-sf-disclosure" data-brs-fm-hub>
      <div className="brs-fm-hub-shell">
        <button type="button" className="brs-fm-hub-summary" aria-expanded="false">
          <span className="brs-fm-hub-chevron" aria-hidden="true" />
          <span className={styles.auditSummary} data-sec-assessment-status={display.status}>
            <strong>{display.shortId} — {display.title}</strong>
            <span>{display.score !== null ? <EvidenceConfidenceIndicator score={display.score} srPrefix={display.statusLabel} /> : display.readout}</span>
            <span>{display.incomplete ? (display.incompleteReason || ('unscoredReason' in audit ? audit.unscoredReason : 'Assessment incomplete')) : display.statusLabel}</span>
            {display.date && <time dateTime={display.date}>{display.date}</time>}
          </span>
        </button>
        <div className="brs-fm-hub-panel" hidden>
          <p><a href={`?review=0#${audit.findingId.toLowerCase()}`}>{display.shortId} — {display.title}</a> · Assessment status: {display.statusLabel}</p>
          <p>Synthesised Evidence Confidence (SEC) assessment</p>
          <p><strong>Exact assessed proposition:</strong> {audit.proposition}</p>
          <p><strong>Principal limitation:</strong> {audit.limitations[0]}</p>
          <p>{audit.rawScore === null ? 'Formal raw and adjusted SEC totals remain uncalculated.' : audit.adjustedScore === null ? `Diagnostic raw total ${audit.rawScore}/8; no ordinal confidence applies to this claim.` : `Raw SEC ${audit.rawScore}/8; adjusted SEC ${audit.adjustedScore}/8.`} Assessment date: {audit.lastEvidenceAssessmentDate}. Record version {audit.recordVersion}.</p>
          {'capRationale' in audit && <p>{audit.capRationale}</p>}
          {'scopeNote' in audit && <p>{audit.scopeNote}</p>}
          {conditional && <><p>{describeFactorScores(conditional.qualification.replace('Conditional SEC estimate — under calibration', display.statusLabel))} Conditional raw {conditional.rawScore}/8; {conditional.adjustedScore === null ? 'no ordinal confidence applies to this claim' : `adjusted ${conditional.adjustedScore}/8`}.</p><p>{describeFactorScores(conditional.caps)}</p></>}
          <dl className={styles.factorLegend}>{Object.entries(audit.rationale).map(([factor, reason]) => {
            const value = conditional ? conditional.factors[factor] : audit.factors[factor];
            const state = audit.factorStates?.[factor] || (conditional ? conditional.statuses?.[factor] : value === null ? 'Unresolved' : 'Established');
            return <React.Fragment key={factor}><dt><strong>{secFactors[factor].name} — {value === null ? 'Unresolved' : `${value}/2`}</strong> · {state}</dt><dd>{describeFactorScores(reason)}</dd></React.Fragment>;
          })}</dl>
          <p>Unknown is not zero. Inaccessible methods or uncertainty do not justify zero for Bias Protection or Precision; incomplete replication retrieval does not justify zero for Replication. {conditional ? 'Formal SEC remains Not scored until all four judgements are defensible; conditional factors are not established scores.' : 'Completed factor judgements are provisional anchor assessments, not measured quantities or human scientific review.'}</p>
          <p>Supporting synthesis: {audit.sources.supporting.map(key => <React.Fragment key={key}><a href={key.startsWith('stage2-ref-') ? `?review=0#${key}` : `/docs/papers/BRAIN-Diet-References#${key}`}>{key}</a>{' · '}</React.Fragment>)}</p>
          <p>{audit.sources.contradictoryAssessment}</p>
          <ul>{audit.sources.targetedChecks.map(source => <li key={source.doi}><a href={`https://doi.org/${source.doi}`}>{source.doi}</a> · {source.role} · {source.access}. {source.assessment}</li>)}</ul>
          <p>Contextual evidence: {audit.sources.contextual.map(key => <React.Fragment key={key}><a href={`/docs/papers/BRAIN-Diet-References#${key}`}>{key}</a>{' · '}</React.Fragment>)}</p>
          <ul>{audit.limitations.slice(1).map(reason => <li key={reason}>{reason}</li>)}</ul>
          <ul>{audit.sources.retrievalLimited.map(source => <li key={source.url}><a href={source.url}>{source.doi || source.url}</a>: {source.limitation}</li>)}</ul>
          <p>Assessment process: {audit.process}.</p>
          {display.humanReview && <p>Human reviewer: {display.humanReview.reviewerIdentity}. Qualifications: {display.humanReview.qualifications}. Review date: {display.humanReview.reviewDate}. Decision: {display.humanReview.outcome}. Changes: {display.humanReview.changes}.</p>}
          <p>Methodology: {audit.methodology.name}; version {audit.methodology.version || 'not recorded'}. Source: <code>{audit.methodology.source}</code></p>
          {'recommendation' in audit && <p>{audit.recommendation}</p>}
          {'stoppingRationale' in audit && <p>{audit.stoppingRationale}</p>}
          <ul>{audit.history.map((item, index) => <li key={index}>{item.date}: {describeFactorScores(item.decision)}</li>)}</ul>
          {'previousAssessments' in audit && audit.previousAssessments.map(previous => <div key={previous.recordVersion} id={assessmentRecords ? recordAnchor(previous) : undefined}>
            <h4>Prior assessment version {previous.recordVersion}</h4>
            <p>{previous.proposition}{previous.rawScore === null ? ('conditional' in previous && previous.conditional ? ` Conditional estimate: ${previous.conditional.adjustedScore}/8; formal totals not calculated.` : ' Formal totals not calculated.') : ` Raw ${previous.rawScore}/8; adjusted ${previous.adjustedScore}/8.`}</p>
            <p>{previous.stoppingRationale}</p>
            <ul>{previous.sources.retrievalLimited.map(source => <li key={source.url}><a href={source.url}>{source.doi}</a>: {source.limitation}</li>)}</ul>
          </div>)}
          <p>Original discussion link: not recorded. Research dialogue is supporting history, not the authoritative assessment.</p>
        </div>
      </div>
    </div>;
    })}
    {!embedded && <>
    {records.length === 0 && <p>No registry-backed SEC assessment is recorded for this PM. Existing unscored or legacy evidence remains unchanged.</p>}
    <h3>Correction status</h3>
    <p>{correctionPresentation(page)}</p>
    {page && <div className="brs-fm-hub-item" data-brs-fm-hub><div className="brs-fm-hub-shell">
      <button type="button" className="brs-fm-hub-summary" aria-expanded="false"><span className="brs-fm-hub-chevron" aria-hidden="true" /><strong>Review and correction records</strong></button>
      <div className="brs-fm-hub-panel" hidden><PageReviewPanel page={page} panelId="preview-existing-corrections" /></div>
    </div></div>}
    <p><a href={frameworkQcPublic.register_path}>Public Framework Review &amp; Corrections register</a></p>
    {scientificTransparency}
    </>}
  </div>;
}
