import React from 'react';
import {stage2Assessment, stage2Studies, stage2Candidates, hubScreen, proposedSops, proposedLifestyle} from './glycaemicStage2.mjs';

export function GlycaemicInterventions({section}: {section: '3.2' | '3.3'}) {
  const rows = section === '3.2' ? proposedSops : proposedLifestyle;
  return <>
    <p>Proposed for scientific review, not canonical admissions. These are tested protocols, not general prescriptions.</p>
    <ul>{rows.map(row => <li key={row.input}>{row.input}</li>)}</ul>
    <p><a href="?review=1#glycaemic-stage2-adjudication">Evidence, exclusions and protocol details</a></p>
    {section === '3.3' && <p>Exercise intensity and changes to meal timing require individual suitability assessment, particularly with glucose-lowering medication or limited exercise capacity.</p>}
  </>;
}

export function GlycaemicStage2Audit() {
  return <div id="glycaemic-stage2-adjudication" className="brs-fm-hub-item brain-sf-disclosure" data-brs-fm-hub>
    <div className="brs-fm-hub-shell">
      <button type="button" className="brs-fm-hub-summary" aria-expanded="false">
        <span className="brs-fm-hub-chevron" aria-hidden="true" />
        <strong>Intervention evidence and proposed admissions · {stage2Assessment.date}</strong>
      </button>
      <div className="brs-fm-hub-panel" hidden>
        <p>{stage2Assessment.scope}</p>
        <p>Three proposed SOPs and two lifestyle protocols meet the scoped variability criterion. Selection does not imply equal confidence, long-term benefit, or ADHD efficacy. The acute fish/rice outcome is not daylong variability.</p>
        <div style={{overflowX:'auto'}}><table>
          <caption>Candidate adjudications: selected, parked and proposed ownership follow-up</caption>
          <thead><tr><th>Candidate</th><th>Decision</th><th>Basis and limits</th><th>Ownership / Finding</th></tr></thead>
          <tbody>{stage2Candidates.map(row => <tr key={row.id}>
            <th scope="row">{row.candidate}</th><td>{row.decision}</td>
            <td>{row.reason}<br />{row.studies.map(id => <React.Fragment key={id}><a href={`?review=0#stage2-ref-${id}`}>{stage2Studies.find(s=>s.id===id)?.author}</a>{' · '}</React.Fragment>)}</td>
            <td>{row.owner}{row.finding && <><br /><a href={`?review=0#${row.finding.toLowerCase()}`}>{row.finding}</a></>}</td>
          </tr>)}</tbody>
        </table></div>
        <h4>Primary-source appraisal and recovery</h4>
        <p>{stage2Assessment.recovery}</p>
        <p>Outcome terminology: continuous glucose monitoring (CGM); standard deviation (SD); coefficient of variation (CV); mean amplitude of glycaemic excursions (MAGE); continuous overall net glycaemic action (CONGA). None is interchangeable with average glucose or time in range.</p>
        <ul>{stage2Studies.map(source => <li key={source.id}>
          <strong>{source.author}</strong> · {source.role} · <a href={`https://doi.org/${source.doi}`}>{source.doi}</a>
          <p>{source.population} {source.protocol}</p>
          <p>{source.result} {source.limitation}</p>
          <p>Access: {source.access}.</p>
        </li>)}</ul>
        <h4>Hub category screen</h4>
        <ul>{hubScreen.map(([category, result]) => <li key={category}><strong>{category}:</strong> {result}</li>)}</ul>
        <h4>Governance and stopping record</h4>
        <p>{stage2Assessment.governance} Main reference: <code>{stage2Assessment.governanceMain}</code>. Assessment version {stage2Assessment.version}.</p>
        <p>Targeted query families: {stage2Assessment.queries.join('; ')}.</p>
        <p>{stage2Assessment.stop}</p>
        <p>Outstanding targeted recovery: Touhamy, DOI 10.2337/dc24-1956 (allocation, carryover, CGM variability and uncertainty); Dempsey, DOI 10.1007/s00125-016-4169-z (variability outcomes). Scite full text was unavailable for these gaps; request these exact questions for ChatGPT-assisted recovery rather than infer results.</p>
        <p>Scientific corrections proposed, not applied canonically: narrow SF1's uncontrolled causal claim; keep SF3 observational with independent null evidence; retain SF4 as acute exposure context, not a variability lever. New preview Findings F5-F8 trace distinct directly measured interventions rather than padding existing scores.</p>
        <p>Methodological boundary: positive means or time in range cannot substitute for measured variability. Endpoint multiplicity, crossover carryover and protocol-specific replication remain material appraisal issues; no rubric anchors or caps were changed.</p>
      </div>
    </div>
  </div>;
}

export function GlycaemicStage2References() {
  return <ul>{stage2Studies.map((source, index) => <li key={source.id}>
    <span id={`pm-ref-${index+7}`}>[{index+7}]</span>{' '}
    <span id={`stage2-ref-${source.id}`}>{source.author}. {source.title}. </span>
    <a href={`https://doi.org/${source.doi}`}>{source.doi}</a>. Assessed {stage2Assessment.date}; {source.access}.
  </li>)}</ul>;
}
