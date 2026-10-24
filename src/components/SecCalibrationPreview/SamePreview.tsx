import React, {useEffect, useState} from 'react';
import {createPortal} from 'react-dom';
import ScientificFinding, {type ScientificFindingData} from '../ScientificFinding';
import EvidenceConfidenceIndicator from '../EvidenceConfidenceIndicator';
import PmDietaryLeverEnhancer from '../PmDietaryLeverEnhancer';
import {sameAudits} from './sameAudit.mjs';
import {sameCuratedReferences, sameSourcesFor} from './sameSources.mjs';
import {assessmentPresentation} from './auditPresentation.mjs';
import styles from './styles.module.css';

export function SamePreviewIntro() {
  return <aside className={styles.notice} role="note">
    <h1>S-adenosylmethionine (SAMe) Synthesis — Isolated SEC Pilot</h1>
    <p>Complete PM copy for scientific review. Canonical records, dietary relationships and Key Constraint decisions are unchanged.</p>
    <p>F1 and F4 are proposed biochemical provenance, not scored headline Findings. Their original evidence remains in Evidence &amp; Audit. F2/F3 remain bounded evidence gaps; IC1 remains an interpretive constraint. New F5 is a proposed experimental synthesis, not a canonical admission.</p>
    <p>Scores assess exact propositions, not dietary effectiveness or ADHD benefit. Methodology under calibration.</p>
    <a href="?review=1">Evidence &amp; Audit</a>
  </aside>;
}

export function SameFinding({finding}: {finding: ScientificFindingData}) {
  const record = sameAudits.find(r => r.findingId === finding.id);
  if (!record) return <ScientificFinding finding={finding} />;
  if (finding.id === 'PM3-F1' || finding.id === 'PM3-F4') {
    const indexes = finding.id === 'PM3-F1' ? [0, 1, 2] : [3, 4, 5];
    return <section id={finding.id.toLowerCase()} data-same-provenance={finding.id}>
      <h4>{finding.id} — Biochemical provenance</h4>
      <p>{record.proposition}</p>
      <p>{indexes.map(i => <React.Fragment key={i}><a href={'#' + sameCuratedReferences[i].anchor}>[{sameCuratedReferences[i].label}] {sameCuratedReferences[i].database}</a>{' · '}</React.Fragment>)}</p>
      <p>Curated chemistry is not assigned a numerical research-synthesis score. <a href={'?review=1#' + record.id}>Original evidence and proposed disposition</a></p>
    </section>;
  }
  const display = assessmentPresentation(record);
  return <div className={styles.finding} data-sec-finding={finding.id}>
    <div className={styles.confidence} data-sec-assessment-status={display.status}>
      <strong>{finding.id} · {display.statusLabel}</strong>
      <EvidenceConfidenceIndicator score={display.score} srPrefix="Synthesised Evidence Confidence" />
      <a href={'?review=1#' + record.id}>Evidence &amp; Audit assessment</a>
    </div>
    <ScientificFinding finding={{...finding, synthesised_evidence_confidence: display.readout + ' · ' + display.statusLabel}} />
  </div>;
}

export function SameExperimentalFinding() {
  const record = sameAudits.find(r => r.findingId === 'PM3-F5')!;
  return <SameFinding finding={{id: record.findingId, finding_label: record.title, finding_statement: record.proposition, finding_summary: record.proposition,
    synthesis: 'Purified human MAT2A activity-decay experiments and independent mammalian-cell perturbation/rescue experiments support a stability contribution. Protein abundance and catalytic activity are non-identical endpoints. Additional catalytic/allosteric actions remain possible.',
    synthesised_evidence_confidence: 'Not scored',
    synthesis_limitations: record.limitations.join(' '), evidence_considered: record.sources.targetedChecks.map(s => ({label: s.doi, href: 'https://doi.org/' + s.doi, directional_finding: s.assessment, data_level: 'Cellular / Molecular', evidence_source: 'bounded-external-search' as const}))}} />;
}

export function SameReferences() {
  return <section><h3>Preview-only curated references</h3>
    <ul>{sameCuratedReferences.map(source => <li id={source.anchor} key={source.anchor}>[{source.label}] {source.database}: {source.title}. {source.accession}. {source.scope} Accessed {source.accessed}. <a href={source.href}>Authoritative record</a> · <a href="#pm3-f1">Biochemical provenance</a></li>)}</ul>
    <h3>Preview-only experimental recovery</h3>
    <ul>{sameAudits.find(r => r.findingId === 'PM3-F5')!.sources.targetedChecks.map(source => <li key={source.doi}><a href={'https://doi.org/' + source.doi}>{source.doi}</a> — {source.role}. {source.access}.</li>)}</ul>
  </section>;
}

// Attach verified provenance only inside the existing Evidence source atom.
// The shared enhancer and all six underlying fields remain unchanged.
export function SamePreviewEnhancements({data}: {data: any}) {
  const [slots, setSlots] = useState<Array<{node: HTMLElement; atomId: string}>>([]);
  useEffect(() => {
    const root = document.querySelector('.theme-doc-markdown');
    if (!root) return;
    const update = () => {
      const next: Array<{node: HTMLElement; atomId: string}> = [];
      root.querySelectorAll<HTMLLIElement>('li[data-pm-input-label]').forEach(li => {
        const presentation = data.dietary_lever_presentations.find((p: any) => p.label === li.dataset.pmInputLabel && p.presentation_section === li.dataset.pmInputSection);
        if (!presentation || !sameSourcesFor(presentation.atom_id).length) return;
        const evidence = li.querySelector<HTMLElement>(':scope > .brs-dietary-lever-detail .brs-dietary-lever-detail-evidence');
        if (!evidence) return;
        let slot = evidence.querySelector<HTMLElement>('[data-same-curated-slot]');
        if (!slot) { slot = document.createElement('span'); slot.dataset.sameCuratedSlot = presentation.atom_id; evidence.append(slot); }
        next.push({node: slot, atomId: presentation.atom_id});
      });
      setSlots(previous => previous.length === next.length && previous.every((s, i) => s.node === next[i].node && s.atomId === next[i].atomId) ? previous : next);
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, {childList: true, subtree: true});
    return () => observer.disconnect();
  }, [data]);
  return <><PmDietaryLeverEnhancer frontMatter={data} />{slots.map(slot => createPortal(<span> · {sameSourcesFor(slot.atomId).map(source => <React.Fragment key={source.anchor}><a href={'#' + source.anchor}>[{source.label}] {source.database}</a>{' · '}</React.Fragment>)}</span>, slot.node, slot.atomId))}</>;
}
