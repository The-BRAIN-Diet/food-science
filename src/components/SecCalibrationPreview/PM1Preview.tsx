import React, {useEffect, useRef} from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {useLocation} from '@docusaurus/router';
import ScientificFinding from '../ScientificFinding';
import EvidenceConfidenceIndicator from '../EvidenceConfidenceIndicator';
import PmDietaryLeverEnhancer from '../PmDietaryLeverEnhancer';
import EvidenceAudit from './EvidenceAudit';
import {assessmentPresentation} from './auditPresentation.mjs';
import {initBrsFmHubDropdowns} from '../../client/brsFmHubDropdown';
import data from '../../../review/pm1-reassessment/draft-data.json';
import assessments from '../../../review/pm1-reassessment/assessments-v1.json';
import {candidates, sources} from '../../../review/pm1-reassessment/evidence.mjs';
import styles from './styles.module.css';

export function PM1Page({children}:{children:React.ReactNode}) {
  const root=useRef<HTMLDivElement>(null);
  const location=useLocation();
  useEffect(()=>{
    if(root.current)initBrsFmHubDropdowns(root.current);
    const target=location.hash&&document.getElementById(location.hash.slice(1));
    if(target&&location.search.includes('review=1')) {
      const button=target.querySelector<HTMLButtonElement>('button.brs-fm-hub-summary');
      if(button?.getAttribute('aria-expanded')==='false')button.click();
      target.scrollIntoView({block:'start'});
    }
  },[location.search,location.hash]);
  return <div ref={root} data-pm1-review>
    <aside className={styles.notice}><strong>PM1 scientific review draft</strong><p>Isolated Stage 2A → Stage 2B → Synthesised Evidence Confidence (SEC) reassessment. Proposed changes await scientific approval. Canonical PMs and registrations are unchanged.</p></aside>
    <Tabs queryString="review" defaultValue="0" lazy={false}>
      <TabItem value="0" label="Primary Mechanism">{children}</TabItem>
      <TabItem value="1" label="Evidence & Audit">
        <EvidenceAudit panelId="pm1-evidence-audit" assessmentRecords={assessments} assessmentPmId="BRS1-FM1-PM1"/>
        <div className="brs-fm-hub-item brain-sf-disclosure" data-brs-fm-hub><div className="brs-fm-hub-shell">
          <button type="button" className="brs-fm-hub-summary" aria-expanded="false"><span className="brs-fm-hub-chevron" aria-hidden="true"/><strong>Intervention decisions and unresolved approvals</strong></button>
          <div className="brs-fm-hub-panel" hidden><p>One proposed texture-specific dietary SOP; no selected lifestyle intervention. Three is a ceiling, not a quota.</p><p>Tyrosine dietary contribution requires separate approval; the existing Unset atom is preserved. No KC mapping, food-strategy registration or new food/substance mapping is inferred.</p>
            <table><thead><tr><th>Candidate</th><th>Decision</th><th>Evidence and boundary</th></tr></thead><tbody>{candidates.map(c=><tr key={c.candidate}><td>{c.category}: {c.candidate}</td><td>{c.decision}</td><td>{c.reason}{' '}{c.evidence.map(id=>{const s=sources.find(s=>s.id===id);return s?<React.Fragment key={id}><a href={s.url}>{s.title}</a>{' · '}</React.Fragment>:null;})}</td></tr>)}</tbody></table>
            <h4>Source appraisal and retrieval record</h4><ul>{sources.map(s=><li key={s.id}><strong><a href={s.url}>{s.title}</a></strong> · {s.role}. {s.design} {s.protocol} {s.result} {s.uncertainty} {s.independence} Access: {s.access}</li>)}</ul>
            <p>The complete searches, stopping rationale and before/after decisions are retained in the local versioned PM1 review report.</p></div>
        </div></div>
      </TabItem>
    </Tabs>
  </div>;
}

export function PM1Finding({finding}:{finding:any}) {
  const record=assessments.find(a=>a.findingId===finding.id);
  if(!record)return <ScientificFinding finding={finding}/>;
  const view=assessmentPresentation(record);
  return <div className={styles.finding} data-sec-finding={finding.id}>
    <div className={styles.confidence} data-sec-assessment-status={view.status}>
      <strong>{finding.id} · {view.statusLabel}</strong>
      {view.score!==null?<EvidenceConfidenceIndicator score={view.score} srPrefix="Synthesised Evidence Confidence"/>:<span>{view.readout}</span>}
      <a href={'?review=1#'+record.id}>Evidence &amp; Audit assessment</a>
    </div>
    <ScientificFinding finding={{...finding,synthesised_evidence_confidence:view.readout+' · '+view.statusLabel}}/>
    {finding.id==='PM1-F3'&&<p>Biochemical provenance: <a href="#pm-curated-pah">[C1] UniProt P00439</a> · <a href="#pm-curated-rhea">[C2] Rhea 20273</a>. Reaction identity is not a dietary-efficacy score.</p>}
  </div>;
}

export function PM1Enhancements() {
  return <PmDietaryLeverEnhancer frontMatter={data}/>;
}
