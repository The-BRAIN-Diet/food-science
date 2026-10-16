import React, {useEffect, useRef} from 'react';
import PageReviewPanel from '../ReviewCorrections/PageReviewPanel';
import {findPublicPageRecord, frameworkQcPublic, reviewStatusLabel, type PublicPageRecord} from '../../data/frameworkQcPublic';
import EvidenceConfidenceIndicator from '../EvidenceConfidenceIndicator';
import {initBrsFmHubDropdowns} from '../../client/brsFmHubDropdown';
import {audit, sf2Audit} from './assessmentAudit.mjs';

export default function EvidenceAudit({panelId}: {panelId: string}) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (root.current) initBrsFmHubDropdowns(root.current);
  }, []);
  const page: PublicPageRecord | null = findPublicPageRecord({pageId: audit.pmId});
  const corrections = page?.corrections || [];
  return <div ref={root} id={panelId} role="tabpanel" aria-labelledby="review-corrections-tab">
    <h2 tabIndex={-1}>Evidence &amp; Audit</h2>
    <dl>
      <dt>Evidence review status</dt><dd>{page ? reviewStatusLabel(page.review_status) : 'Not recorded — public review record unavailable'}</dd>
      <dt>SEC assessment status and confidence</dt><dd>SF1: {audit.status}. SF2: {sf2Audit.status}.</dd>
      <dt>Correction status</dt><dd>{!page ? 'Unknown — public review record unavailable' : corrections.length ? corrections.map(c => c.correction_status || 'pending').join(', ') : 'No correction decisions recorded'}</dd>
    </dl>
    <h3>SF assessments</h3>
    {[audit, sf2Audit].map(audit => {
      const conditional = 'conditional' in audit ? audit.conditional : null;
      return <div key={audit.id} id={audit.id} className="brs-fm-hub-item brain-sf-disclosure" data-brs-fm-hub>
      <div className="brs-fm-hub-shell">
        <button type="button" className="brs-fm-hub-summary" aria-expanded="false">
          <span className="brs-fm-hub-chevron" aria-hidden="true" />
          <strong>{audit.findingId} · {'title' in audit ? audit.title : 'GAD cofactor occupancy'} · {conditional ? `Conditional ${conditional.adjustedScore}/8 · under calibration` : 'Not scored'} · {audit.lastEvidenceAssessmentDate || 'Date not recorded'}</strong>
        </button>
        <div className="brs-fm-hub-panel" hidden>
          <p><a href={`?review=0#${audit.findingId.toLowerCase()}`}>{audit.findingId}</a> · {audit.status} {conditional ? <EvidenceConfidenceIndicator score={conditional.adjustedScore} srPrefix="Conditional SEC estimate — under calibration" /> : <EvidenceConfidenceIndicator />}</p>
          <p><strong>Exact assessed proposition:</strong> {audit.proposition}</p>
          <p><strong>Principal limitation:</strong> {audit.limitations[0]}</p>
          <p>Raw and adjusted SEC totals remain uncalculated. Assessment date: {audit.lastEvidenceAssessmentDate}. Record version {audit.recordVersion}.</p>
          {'scopeNote' in audit && <p>{audit.scopeNote}</p>}
          {conditional && <><p>{conditional.qualification} Conditional raw {conditional.rawScore}/8; adjusted {conditional.adjustedScore}/8 · {conditional.label}.</p><p>{conditional.caps}</p></>}
          <dl>{Object.entries(audit.rationale).map(([factor, reason]) => <React.Fragment key={factor}><dt>{factor} — {audit.factors[factor] ?? 'unresolved'}</dt><dd>{reason}</dd></React.Fragment>)}</dl>
          <p>Unknown is not zero. Inaccessible methods or uncertainty do not justify B0 or P0; incomplete replication retrieval does not justify R0. {audit.findingId === 'PM9-F1' ? 'F1 remains Not scored until all four judgements are defensible.' : 'SF2 formal SEC remains Not scored; conditional factors are not established scores.'}</p>
          {conditional && <dl>{Object.entries(conditional.factors).map(([factor, value]) => <React.Fragment key={factor}><dt>{factor} — proposed {value}</dt><dd>{conditional.statuses[factor]}</dd></React.Fragment>)}</dl>}
          <p>Supporting synthesis: {audit.sources.supporting.map(key => <a key={key} href={`/docs/papers/BRAIN-Diet-References#${key}`}>{key}</a>)}</p>
          <p>{audit.sources.contradictoryAssessment}</p>
          <ul>{audit.sources.targetedChecks.map(source => <li key={source.doi}><a href={`https://doi.org/${source.doi}`}>{source.doi}</a> · {source.role} · {source.access}. {source.assessment}</li>)}</ul>
          <p>Contextual evidence: {audit.sources.contextual.map(key => <React.Fragment key={key}><a href={`/docs/papers/BRAIN-Diet-References#${key}`}>{key}</a>{' · '}</React.Fragment>)}</p>
          <ul>{audit.limitations.slice(1).map(reason => <li key={reason}>{reason}</li>)}</ul>
          <ul>{audit.sources.retrievalLimited.map(source => <li key={source.url}><a href={source.url}>{source.doi || source.url}</a>: {source.limitation}</li>)}</ul>
          <p>Reviewer: {audit.reviewer || 'Not recorded'}. Process: {audit.process}.</p>
          <p>Methodology: {audit.methodology.name}; version {audit.methodology.version || 'not recorded'}. Source: <code>{audit.methodology.source}</code></p>
          {'recommendation' in audit && <p>{audit.recommendation}</p>}
          {'stoppingRationale' in audit && <p>{audit.stoppingRationale}</p>}
          <ul>{audit.history.map((item, index) => <li key={index}>{item.date}: {item.decision}</li>)}</ul>
          <p>Original discussion link: not recorded. Research dialogue is supporting history, not the authoritative assessment.</p>
        </div>
      </div>
    </div>;
    })}
    <h3>Existing review and correction records</h3>
    {page ? <PageReviewPanel page={page} panelId="preview-existing-corrections" /> : <p>Public correction records are unavailable in this checkout; their absence here does not establish that no corrections exist. <a href={frameworkQcPublic.register_path}>Public Framework Review &amp; Corrections register</a></p>}
  </div>;
}
