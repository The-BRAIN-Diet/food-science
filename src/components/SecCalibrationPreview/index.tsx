import React, {useEffect, useMemo, useState} from 'react';
import {createPortal} from 'react-dom';
import EvidenceConfidenceIndicator from '../EvidenceConfidenceIndicator';
import ScientificFinding, {type ScientificFindingData} from '../ScientificFinding';
import PmDietaryLeverEnhancer from '../PmDietaryLeverEnhancer';
import styles from './styles.module.css';
import {curatedSourcesFor, withPreviewCuratedSources, preparePreviewDisclosure, previewCuratedReferences} from './curatedSources.mjs';
import {audit, sf1Conclusion, sf2Audit} from './assessmentAudit.mjs';
import {assessmentPresentation} from './auditPresentation.mjs';

// One reusable synthetic fixture. It is not a scientific scoring record.
const layoutExample = Object.freeze({score: 6, label: 'Moderate–High', factors: 'D2/B2/P2/R0'});

const findingLink = (id: string) => `#${id.toLowerCase()}`;

export function PreviewIntro() {
  return <aside className={styles.notice} role="note">
    <h1>SEC Calibration Preview — Not a Canonical PM</h1>
    <p>Isolated GABA template. Canonical scientific records remain unchanged. SF1 and SF2 show conditional estimates, not accepted confidence assessments. Synthetic layout examples are labelled separately.</p>
    <p>Calibration data is page-body presentation data, not document scientific metadata. D/B/P/R anchors and caps await scientific approval. Canonical Findings remain <strong>Not scored</strong>.</p>
    <a href="#sec-calibration-examples">Calibration examples and linkage stress tests</a>
  </aside>;
}

export function CalibrationFinding({finding}: {finding: ScientificFindingData}) {
  const assessment = finding.id === 'PM9-F1' ? assessmentPresentation(audit) : finding.id === 'PM9-F2' ? assessmentPresentation(sf2Audit) : null;
  return <div className={styles.finding} data-sec-finding={finding.id}>
    <div className={styles.confidence}>
      <strong>{finding.id} · {assessment?.statusLabel || 'Not scored'}</strong>
      {finding.id === 'PM9-F1' ? <EvidenceConfidenceIndicator score={audit.conditional.adjustedScore} srPrefix={assessment?.statusLabel} /> : finding.id === 'PM9-F2' ? <EvidenceConfidenceIndicator score={sf2Audit.conditional.adjustedScore} srPrefix={assessment?.statusLabel} /> : <EvidenceConfidenceIndicator />}
      {finding.id === 'PM9-F1' && <a href="?review=1#gaba-sf1-assessment-v1">Evidence &amp; Audit assessment</a>}
      {finding.id === 'PM9-F2' && <a href="?review=1#gaba-sf2-assessment-v1">Evidence &amp; Audit assessment</a>}
    </div>
    <ScientificFinding finding={finding.id === 'PM9-F1' ? {...finding,
      synthesised_evidence_confidence: `${assessment?.readout} · ${assessment?.statusLabel}`,
      finding_summary: sf1Conclusion,
    } : finding.id === 'PM9-F2' ? {...finding, synthesised_evidence_confidence: `${assessment?.readout} · ${assessment?.statusLabel}`, finding_summary: sf2Audit.proposition} : finding} />
    {finding.id === 'PM9-F1' && <p id="pm9-f1-curated">Elementary reaction and cofactor annotations: <a href="#pm-curated-1">[C1]</a>, <a href="#pm-curated-2">[C2]</a>, <a href="#pm-curated-3">[C3]</a>, <a href="#pm-curated-4">[C4]</a>, <a href="#pm-curated-5">[C5]</a>. The biochemical shorthand is L-glutamate → GABA + CO₂; Rhea explicitly includes the proton. These records establish reaction identity and cofactor participation; isoform regulation and physiological interpretation retain PM9-F1’s peer-reviewed synthesis and limitations.</p>}
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

type PreviewAtom = {
  atom_id: string;
  input: string;
  input_type: string;
  biological_role: string;
  evidence_source?: {pathway_resources?: string[]; citation_keys?: string[]; finding_ids?: string[]};
  evidence_limitation: string;
  dietary_input: boolean | null;
  dietary_input_note?: string;
};

function CuratedReferences({atom}: {atom: PreviewAtom}) {
  const sources = curatedSourcesFor(atom.evidence_source?.pathway_resources);
  if (!sources.length) return null;
  return <span className={styles.curated} data-curated-atom={atom.atom_id}>
    {sources.map((source, index) => <React.Fragment key={`${source.database}:${source.accession}`}>
      {index > 0 && ' · '}
      <a id={`curated-cite-${atom.atom_id}-${source.label}`} href={`#${source.anchor}`} title={source.scope}>[{source.label}] {source.database}{' '}<span className={styles.accession}>{source.accession}</span>{source.accession === 'O00764' ? ' (PDXK)' : source.accession === 'Q9NVS9' ? ' (PNPO)' : ''}</a>
    </React.Fragment>)}
    {(atom.evidence_source?.finding_ids || []).map(id => <React.Fragment key={id}>{' · '}<a href={findingLink(id)}>{id}</a></React.Fragment>)}
  </span>;
}

export function CuratedReferenceList() {
  return <ul aria-label="Curated biochemical references">{previewCuratedReferences.map(source =>
    <li id={source.anchor} key={source.anchor}>[{source.label}] {source.database}: {source.title}. {source.accession}. {source.scope} Accessed {source.accessed}.{' '}
      <a href={source.href} target="_blank" rel="noopener noreferrer">Authoritative record</a>{' · '}
      <a href={['C6', 'C7', 'C8'].includes(source.label) ? '#curated-cite-PM9-DIT-3-' + source.label : '#curated-cite-PM9-DIT-1-' + source.label}>Return to Evidence source</a>
      {['C1', 'C2', 'C3', 'C4', 'C5'].includes(source.label) && <> · <a href="#pm9-f1-curated">Return to PM9-F1</a></>}
    </li>)}</ul>;
}

// Read existing canonical display data locally; never register preview metadata.
// The shared enhancer retains six-atom evidence and food-source behavior.
export function PreviewEnhancements({data}: {data: Record<string, unknown>}) {
  const previewData = useMemo(() => withPreviewCuratedSources(data), [data]);
  const atoms = previewData.dietary_input_traceability as PreviewAtom[];
  const [curatedSlots, setCuratedSlots] = useState<Array<{node: HTMLElement; atom: PreviewAtom}>>([]);
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
      const evidenceTargets: Array<{node: HTMLElement; atom: PreviewAtom}> = [];
      // Exact atom IDs are resolved through existing presentation metadata, never similar wording.
      const presentations = previewData.dietary_lever_presentations as Array<{atom_id: string; label: string; presentation_section: string}>;
      root.querySelectorAll<HTMLLIElement>('li[data-pm-input-label]').forEach(li => {
        const presentation = presentations.find(p => p.label === li.dataset.pmInputLabel && p.presentation_section === li.dataset.pmInputSection);
        const atom = atoms.find(a => a.atom_id === presentation?.atom_id);
        const detail = li.querySelector<HTMLElement>(':scope > .brs-dietary-lever-detail > .brs-dietary-lever-detail-inner');
        if (!atom || !detail || !curatedSourcesFor(atom.evidence_source?.pathway_resources).length) return;
        const slot = preparePreviewDisclosure(li, detail, atom);
        if (slot) evidenceTargets.push({node: slot, atom});
      });
      setCuratedSlots(previous => previous.length === evidenceTargets.length && previous.every((s, i) => s.node === evidenceTargets[i].node && s.atom === evidenceTargets[i].atom) ? previous : evidenceTargets);
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
  }, [previewData, atoms]);
  return <><PmDietaryLeverEnhancer frontMatter={previewData} />{curatedSlots.map(({node, atom}) => createPortal(<CuratedReferences atom={atom} />, node, atom.atom_id))}{slots.map(({node, kind}, i) => createPortal(<Compact kind={kind} />, node, `${kind}-${i}`))}</>;
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
