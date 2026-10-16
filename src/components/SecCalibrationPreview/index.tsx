import React, {useEffect, useState} from 'react';
import {createPortal} from 'react-dom';
import EvidenceConfidenceIndicator from '../EvidenceConfidenceIndicator';
import ScientificFinding, {type ScientificFindingData} from '../ScientificFinding';
import PmDietaryLeverEnhancer from '../PmDietaryLeverEnhancer';
import styles from './styles.module.css';

// One reusable synthetic fixture. It is not a scientific scoring record.
const layoutExample = Object.freeze({score: 6, label: 'Moderate–High', factors: 'D2/B2/P2/R0'});

const findingLink = (id: string) => `#${id.toLowerCase()}`;

export function PreviewIntro() {
  return <aside className={styles.notice} role="note">
    <h1>SEC Calibration Preview — Not a Canonical PM</h1>
    <p>Complete GABA template, copied from current main. Original scientific decisions and evidence remain unchanged. Numerical examples are illustrative layout values only: no scientific SEC assessment has been assigned.</p>
    <p>Calibration data is page-body presentation data, not document scientific metadata. D/B/P/R anchors and caps await scientific approval. Canonical Findings remain <strong>Not scored</strong>.</p>
    <a href="#sec-calibration-examples">Calibration examples and linkage stress tests</a>
  </aside>;
}

export function CalibrationFinding({finding}: {finding: ScientificFindingData}) {
  const illustrative = finding.id === 'PM9-F1';
  return <div className={styles.finding} data-sec-finding={finding.id}>
    <div className={styles.confidence}>
      <strong>{finding.id} · {illustrative ? 'Illustrative layout only' : 'Assessment pending'}</strong>
      <EvidenceConfidenceIndicator score={illustrative ? layoutExample.score : null} srPrefix={illustrative ? 'Illustrative confidence, not a scientific assessment' : 'Evidence confidence'} />
      {illustrative && <span>SEC {layoutExample.score}/8 — synthetic display value; not assigned to F1.</span>}
    </div>
    <details className={styles.rationale}>
      <summary>Confidence rationale and scope</summary>
      {illustrative ? <>
        <p>The bar tests eight-segment placement. A hypothetical D2/B2/P2/R0 totals 6; these factors have not been assigned to this Finding.</p>
        <p>F1 combines PLP dependence with GAD isoform regulation. A narrow PLP-dependency assessment cannot silently score the full composite statement. Its supporting review must be traced to underlying experiments before bias protection, precision and independent replication can be assessed.</p>
        <p>Biochemical necessity does not establish that extra dietary B6 increases human brain GABA synthesis or treats ADHD.</p>
      </> : <p>No proposition-level assessment is available. The canonical synthesis, limitations and study disclosures below remain authoritative.</p>}
      <a href={findingLink(finding.id)}>Supporting Scientific Finding</a>
    </details>
    <ScientificFinding finding={finding} />
  </div>;
}

function Compact({kind}: {kind: string}) {
  return <span className={styles.compact} data-sec-compact={kind}>
    {' · '}<strong>Not scored</strong>{' · '}
    {kind === 'Vitamin B6' ? <><a href="#pm9-f1">F1</a> + <a href="#pm9-f2">F2</a> (combined supply claim requires assessment)</>
      : kind === 'Glutamate' ? <><a href="#pm9-f1">F1</a> (substrate proposition not independently calibrated)</>
      : 'No explicit canonical Finding linkage for this intervention'}
  </span>;
}

// Read existing canonical display data locally; never register preview metadata.
// The shared enhancer retains six-atom evidence and food-source behavior.
export function PreviewEnhancements({data}: {data: Record<string, unknown>}) {
  const [slots, setSlots] = useState<Array<{node: HTMLElement; kind: string}>>([]);
  useEffect(() => {
    const root = document.querySelector('.theme-doc-markdown');
    if (!root) return;
    root.setAttribute('data-brs', '1');
    const update = () => {
      const targets: Array<{node: HTMLElement; kind: string}> = [];
      root.querySelectorAll<HTMLLIElement>('li[data-pm-input-label]').forEach(li => {
        const kind = li.dataset.pmInputLabel;
        if (kind !== 'Vitamin B6' && kind !== 'Glutamate') return;
        let slot = li.querySelector<HTMLElement>(':scope > [data-sec-slot]');
        if (!slot) {
          slot = document.createElement('span');
          slot.dataset.secSlot = kind;
          li.append(slot);
        }
        targets.push({node: slot, kind});
      });
      // Legacy intervention lists have no explicit canonical Finding linkage.
      root.querySelectorAll<HTMLElement>('.brs-fm-hub-item').forEach(group => {
        const title = group.querySelector(':scope > .brs-fm-hub-shell > .brs-fm-hub-summary')?.textContent || '';
        if (!/3\.[23] (System Optimisation Practices|Lifestyle Levers)/.test(title)) return;
        group.querySelectorAll<HTMLLIElement>('li').forEach(li => {
          let slot = li.querySelector<HTMLElement>(':scope > [data-sec-slot]');
          if (!slot) {
            slot = document.createElement('span'); slot.dataset.secSlot = 'intervention'; li.append(slot);
          }
          targets.push({node: slot, kind: 'intervention'});
        });
      });
      setSlots(previous => previous.length === targets.length && previous.every((s, i) => s.node === targets[i].node) ? previous : targets);
    };
    const observer = new MutationObserver(update);
    observer.observe(root, {childList: true, subtree: true});
    update();
    return () => { observer.disconnect(); root.removeAttribute('data-brs'); };
  }, []);
  return <><PmDietaryLeverEnhancer frontMatter={data} />{slots.map(({node, kind}, i) => createPortal(<Compact kind={kind} />, node, `${kind}-${i}`))}</>;
}

export function CalibrationExamples() {
  return <section id="sec-calibration-examples" className={styles.examples}>
    <h2>SEC calibration — separate research and layout examples</h2>
    <p>Not additional GABA Findings or admitted levers. No real-study factor scores are assigned. Exact claim scope comes before scoring.</p>
    <h3>1. Established biochemical proposition</h3>
    <p>PLP is required for GAD-catalysed GABA synthesis. Existing GABA F1 is the source link, but also contains distinct isoform propositions. <a href="#pm9-f1">Read F1 and its limitations</a>. The review alone does not establish how many independent experimental lines support each component.</p>
    <h3>2. Direct dietary intervention with limited independent replication</h3>
    <p>BRS6 research example: Touhamy et al. (2025), meal sequencing in metformin-treated type 2 diabetes. Define the exact CGM variability claim and studied protocol; do not generalise to ADHD or all meal-order strategies. <a href="https://doi.org/10.2337/dc24-1956">Original study</a>. Not a newly created canonical Finding.</p>
    <h3>3. Endpoint-limited intervention evidence</h3>
    <p>BRS6 research example: Collins et al. (2025), resistant-starch substitution. Meal-specific excursion outcomes and daylong variability outcomes cannot share a confidence score simply because they come from the same trial. Null outcomes must remain visible. <a href="https://doi.org/10.1111/dme.70079">Original study</a>. Not a newly created canonical Finding.</p>
    <details className={styles.rationale}>
      <summary>Linkage cases A–E — illustrative mechanics, not admissions</summary>
      <p><strong>A / E: exact matching proposition reused.</strong> Two synthetic display relationships refer to the same layout assessment below. Neither is an admitted dietary relationship.</p>
      <p>Illustrative relationship A → <a href="#pm9-f1">F1 context</a> · SEC {layoutExample.score}/8 (layout only)</p>
      <p>Illustrative relationship E → <a href="#pm9-f1">F1 context</a> · SEC {layoutExample.score}/8 (same layout example; not rescored)</p>
      <p><strong>B:</strong> Vitamin B6 references F1 and F2; no average or highest-score selection. Not scored.</p>
      <p><strong>C:</strong> A PLP-dependent reaction does not establish supplementation efficacy, brain delivery or a phenome benefit. Broader claims remain Not scored.</p>
      <p><strong>D:</strong> Existing SOP and lifestyle text without explicit Finding linkage remains Not scored. References alone do not generate a score.</p>
    </details>
    <details className={styles.rationale}>
      <summary>Raw zero versus an assessment not performed</summary>
      <p><EvidenceConfidenceIndicator score={0} /> Calculated raw SEC 0/8 — insufficient evidence (illustrative). Zero has not been converted to one.</p>
      <p><EvidenceConfidenceIndicator /> Not assessed — no factor judgements have been made.</p>
      <p>The current indicator renders both as unscored; the explicit adjacent text preserves the distinction. Canonical storage needs separate approval before either state can be recorded.</p>
    </details>
    <p>Cross-BRS and phenome relationships retain their original wording and confidence governance. No PM-wide SEC score is assigned.</p>
  </section>;
}
