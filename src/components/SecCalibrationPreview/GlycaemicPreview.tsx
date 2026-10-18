import React from 'react';
import ScientificFinding, {type ScientificFindingData} from '../ScientificFinding';
import EvidenceConfidenceIndicator from '../EvidenceConfidenceIndicator';
import PmDietaryLeverEnhancer from '../PmDietaryLeverEnhancer';
import {glycaemicAudits} from './glycaemicAudit.mjs';
import {assessmentPresentation} from './auditPresentation.mjs';
import styles from './styles.module.css';

export function GlycaemicPreviewIntro() {
  return <aside className={styles.notice} role="note">
    <h1>Glycaemic Variability Regulation — Isolated SEC Pilot</h1>
    <p>Complete PM copy for scientific review, not a canonical PM. Synthesised Evidence Confidence (SEC) scores assess the stated Findings, not dietary effectiveness or ADHD benefit. Canonical wording and relationships remain unchanged.</p>
    <p>SF1 retains its original causal claim and is scored accordingly; its proposed narrower wording is in Evidence &amp; Audit. All four assessments are provisional Codex judgements, not human scientific review. Methodology under calibration.</p>
    <a href="?review=1">Evidence &amp; Audit</a>
  </aside>;
}

export function GlycaemicPreviewEnhancements({data}: {data: Record<string, unknown>}) {
  return <PmDietaryLeverEnhancer frontMatter={data} />;
}

export function GlycaemicFinding({finding}: {finding: ScientificFindingData}) {
  const record = glycaemicAudits.find(record => record.findingId === finding.id);
  if (!record) return <ScientificFinding finding={finding} />;
  const display = assessmentPresentation(record);
  return <div className={styles.finding} data-sec-finding={finding.id}>
    <div className={styles.confidence} data-sec-assessment-status={display.status}>
      <strong>{finding.id} · {display.statusLabel}</strong>
      <EvidenceConfidenceIndicator score={display.score} srPrefix="Synthesised Evidence Confidence" />
      <a href={`?review=1#${record.id}`}>Evidence &amp; Audit assessment</a>
    </div>
    <ScientificFinding finding={{...finding, synthesised_evidence_confidence: `${display.readout} · ${display.statusLabel}`}} />
  </div>;
}
