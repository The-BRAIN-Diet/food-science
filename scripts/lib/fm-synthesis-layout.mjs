import {renderAdjudicatedFmKcSummary,FM_KC_SUMMARY_MODE} from './fm-kc-relationship-summary.mjs';
/** FM synthesis presentation. PM/KC navigation is separate from the evidence account. */
import { buildPmReferenceRecords, formatPmCitationCluster } from './pm-reference-index.mjs';

export function renderFmSummaryText(text, references = []) {
  const index = new Map(buildPmReferenceRecords(references).map(r => [r.citationKey, r.number]));
  return String(text || '').replace(/\{\{cite:([^}]+)\}\}/g, (_, raw) => {
    const keys = raw.split(',').map(k => k.trim()).filter(Boolean);
    for (const key of keys) if (!index.has(key)) throw new Error(`FM summary references unknown citation ${key}`);
    return formatPmCitationCluster(keys, index).replaceAll('#pm-ref-', '#fm-ref-');
  });
}

export function renderFmTopInventory(data) {
  const links = records => records.map(r => `- [${r.id} — ${r.name}](${r.href})`).join('\n');
  const pms = links(data.mechanisms_covered || []);
  const kcs = links(data.key_constraints || []);
  const summary=data.kc_summary_mode===FM_KC_SUMMARY_MODE ? renderAdjudicatedFmKcSummary(data.fm_kc_relationship_summary) : "";
  return [
    '<span id="41-core-primary-mechanisms" />', '',
    '### Primary Mechanisms', '', pms,
    ...(kcs ? ['', '### Key Constraints', '', kcs, ...(summary ? ['',summary] : [])] : []),
  ].join('\n').trim();
}

export function renderFmEvidenceSummary(data) {
  if (!String(data.fm_evidence_summary || '').trim()) throw new Error(`${data.fm_id}: adjudicated FM evidence summary required`);
  return '<span id="44-evidence-highlights" />\n\n### 4.2 Evidence Summary\n\n' + renderFmSummaryText(data.fm_evidence_summary, data.references);
}

export function renderFmSynthesisSection(data, suboptimalBody) {
  if (!String(data.functional_rationale || '').trim()) throw new Error(`${data.fm_id}: bounded functional rationale required`);
  if (!String(suboptimalBody || '').trim()) throw new Error(`${data.fm_id}: preserve or assess the Suboptimal Function account`);
  return [
    '## 4. Mechanistic Basis (Integrated FM Narrative)', '',
    '<span id="42-integrated-functional-narrative" />', '',
    '### 4.1 Functional Rationale', '', renderFmSummaryText(data.functional_rationale, data.references), '',
    renderFmEvidenceSummary(data), '',
    '### 4.3 Suboptimal Function & Its Effects', '', suboptimalBody.trim(),
  ].join('\n');
}

export function placeFmTopInventory(content, data) {
  const inventory = renderFmTopInventory(data);
  const cleaned = content.replace(/(?:<span id="41-core-primary-mechanisms" \/>\n\n?)?### Primary Mechanisms\n[\s\S]*?(?=^## 1\. )/m, '');
  if (!/^## 1\. /m.test(cleaned)) throw new Error(`${data.fm_id}: missing section 1`);
  return cleaned.replace(/^## 1\. /m, inventory + '\n\n## 1. ');
}

export function extractFmSuboptimalBody(content) {
  return content.match(/^### 4\.3 Suboptimal Function & Its Effects\s*\n([\s\S]*?)(?=\n(?:### 4\.|## \d+\.)|(?![\s\S]))/m)?.[1]?.trim() || '';
}

export function validateFmSynthesisLayout(data, content) {
  const issues = [];
  const problem = (code, message) => issues.push({code, message: `${data.fm_id}: ${message}`});
  const inventoryAt = content.indexOf(renderFmTopInventory(data));
  const section1 = content.search(/^## 1\. /m);
  if (inventoryAt < 0 || inventoryAt > section1) problem('fm_inventory_position', 'linked PM/KC inventory must appear before section 1');
  const positions = ['### 4.1 Functional Rationale','### 4.2 Evidence Summary','### 4.3 Suboptimal Function & Its Effects'].map(h => content.indexOf(h));
  if (positions.some(p => p < 0) || !(positions[0] < positions[1] && positions[1] < positions[2])) problem('fm_synthesis_order', 'use Functional Rationale → Evidence Summary → Suboptimal Function');
  if (/^### 4\.1 Core Primary Mechanisms|^### 4\.2 Integrated Functional Narrative|\*\*Supporting Key Constraint Pools\*\*/m.test(content)) problem('fm_repeated_inventory', 'remove old inventories and extended integrated narrative');
  try {
    if (!content.includes(renderFmEvidenceSummary(data))) problem('fm_evidence_summary_stale', 'evidence summary does not match its durable source');
    const body = extractFmSuboptimalBody(content);
    if (!content.includes(renderFmSynthesisSection(data, body))) problem('fm_synthesis_stale', 'section 4 does not match its durable rationale and summary');
  } catch (error) { problem('fm_synthesis_source', error.message); }
  return issues;
}
