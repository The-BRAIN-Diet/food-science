/** Relationship confidence is independent of admission, six atoms and SEC/CC. */
export const DIETARY_CONFIDENCE_VERSION = 'dietary-confidence-v1';
export const DIETARY_CONFIDENCE_VALUES = Object.freeze(['High', 'Moderate', 'Low']);
const escape = value => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const safeHref = href => typeof href === 'string' && /^\/docs\/[^\s"<>]+#[a-z0-9-]+$/.test(href);

/** Fail closed for nonadmitted subjects; historical acceptance is validated on the server. */
export function dietaryConfidenceFor(data, atomId) {
  const rows = data.dietary_confidence_assessments;
  if (!Array.isArray(rows)) return null;
  const matches = rows.filter(row => row?.atom_id === atomId);
  const atom = data.dietary_input_traceability?.find(row => row.atom_id === atomId);
  const admission = data.dietary_input_assessments?.find(row => row.atom_id === atomId);
  if (matches.length !== 1 || atom?.dietary_input !== true ||
      (admission && admission.status !== 'admitted') ||
      data.scientific_hypotheses?.some(row => row.id === atomId)) return null;
  const row = matches[0];
  const expected = row.type === 'A' ? ['functional_dependency', 'dietary_supply'] : ['mechanism_engagement', 'dietary_exposure'];
  if (admission && expected.some(key => admission[key]?.status !== 'established')) return null;
  return DIETARY_CONFIDENCE_VALUES.includes(row.confidence) &&
    row.criteria_version === DIETARY_CONFIDENCE_VERSION &&
    Array.isArray(row.essential_links) && row.essential_links.length === 2 &&
    expected.every(name => row.essential_links.some(link => link?.link === name && link.status === 'supported')) ? row : null;
}

/** A separate assessment note, never a seventh scientific atom. */
export function renderDietaryConfidence(row) {
  if (!row || !DIETARY_CONFIDENCE_VALUES.includes(row.confidence)) return '';
  const links = (Array.isArray(row.finding_links) ? row.finding_links : []).filter(link => safeHref(link?.href));
  return `<aside class="brs-dietary-confidence" data-dietary-confidence="${escape(row.confidence)}" aria-label="Dietary Confidence"><p><strong>Dietary Confidence: ${escape(row.confidence)}</strong> — ${escape(row.explanation)}</p>${links.length ? `<p>Relevant Findings: ${links.map(link => `<a href="${escape(link.href)}">${escape(link.pm_id)} / ${escape(link.finding_id)}</a>`).join('; ')}</p>` : ''}</aside>`;
}

export function validateDietaryConfidence(data, {isHistoricallyAdmitted = () => false, resolvePm = id => id === data.pm_id ? data : null} = {}) {
  const issues = [], add = message => issues.push({code: 'dietary_confidence_invalid', message: `${data.pm_id}: ${message}`});
  for (const h of data.scientific_hypotheses || []) {
    if (['confidence', 'dietary_confidence', 'dietary_confidence_assessments'].some(key => key in h)) add(`${h.id}: hypotheses cannot carry Dietary Confidence`);
  }
  if (data.dietary_confidence_assessments === undefined) return issues;
  const rows = data.dietary_confidence_assessments;
  if (!Array.isArray(rows)) {add('assessments must be an array'); return issues;}
  const ids = new Set(), subjects = new Set();
  for (const row of rows) {
    if (!row || typeof row !== 'object') {add('invalid assessment'); continue;}
    if (row.id !== `DC-${data.pm_id}-${row.atom_id}` || ids.has(row.id)) add('stable unique assessment ID required');
    if (subjects.has(row.atom_id)) add(`${row.atom_id}: duplicate subject`);
    ids.add(row.id); subjects.add(row.atom_id);
    if (!DIETARY_CONFIDENCE_VALUES.includes(row.confidence)) add(`${row.atom_id}: only High, Moderate or Low may be stored`);
    if (row.criteria_version !== DIETARY_CONFIDENCE_VERSION) add(`${row.atom_id}: criteria version required`);
    const atom = data.dietary_input_traceability?.find(a => a.atom_id === row.atom_id);
    const admission = data.dietary_input_assessments?.find(a => a.atom_id === row.atom_id);
    const overlay = data.dietary_lever_atoms?.find(a => a.atom_id === row.atom_id);
    const placement = data.dietary_lever_presentations?.some(p => p.atom_id === row.atom_id && /^(?:3|4|1)\.1\.1$/.test(p.presentation_section || '3.1.1'));
    if (!placement) add(`${row.atom_id}: confidence pilot requires an existing dietary-input presentation`);
    const hypothesis = data.scientific_hypotheses?.some(h => h.id === row.atom_id) || /^PM\d+-H\d+$/.test(row.atom_id || '');
    if (!atom || atom.dietary_input !== true || hypothesis ||
        (admission ? admission.status !== 'admitted' : !isHistoricallyAdmitted(atom))) add(`${row.atom_id}: confidence requires an existing admitted dietary relationship`);
    const type = admission?.type || (overlay?.relationship_mode === 'state-regulation' ? 'B' : overlay?.relationship_layer === 'dietary-requirement' ? 'A' : undefined);
    const classification = admission?.classification || overlay?.requirement_classification;
    if (row.type !== type || !['A', 'B'].includes(row.type) || row.classification !== classification || !['direct', 'derived'].includes(row.classification)) add(`${row.atom_id}: Type A/B or Direct/Derived conflicts with existing relationship`);
    const expected = row.type === 'A' ? ['functional_dependency', 'dietary_supply'] : ['mechanism_engagement', 'dietary_exposure'];
    if (!Array.isArray(row.essential_links) || row.essential_links.length !== 2 || !expected.every(name => row.essential_links.some(link => link?.link === name))) add(`${row.atom_id}: both appropriate admission links must be reviewed`);
    for (const link of Array.isArray(row.essential_links) ? row.essential_links : []) {
      if (!link || typeof link !== 'object') {add(`${row.atom_id}: invalid essential link`); continue;}
      if (link.status !== 'supported' || !link.statement?.trim() || !Array.isArray(link.sources) || !link.sources.length || !link.sources.every(source => /^https:\/\//.test(source))) add(`${row.atom_id}: unsupported essential link cannot receive confidence`);
      if (admission && admission[link.link]?.status !== 'established') add(`${row.atom_id}: existing admission gate is unresolved`);
    }
    for (const key of ['proposition', 'scope', 'explanation', 'rationale', 'assessor']) if (!row[key]?.trim()) add(`${row.atom_id}: ${key} required`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(row.review_date || '') || !Array.isArray(row.limitations) || !row.limitations.length) add(`${row.atom_id}: date and limitations required`);
    if (!Array.isArray(row.finding_links) || !row.finding_links.length) add(`${row.atom_id}: traceable Findings required`);
    for (const link of Array.isArray(row.finding_links) ? row.finding_links : []) {
      if (!link || typeof link !== 'object') {add(`${row.atom_id}: invalid Finding reference`); continue;}
      const pm = resolvePm(link.pm_id);
      if (!pm?.scientific_findings?.some(f => f.id === link.finding_id) || !safeHref(link.href) || !link.href.endsWith('#' + link.finding_id.toLowerCase()) || !link.explanation?.trim()) add(`${row.atom_id}: invalid Finding reference`);
    }
    if (['subject_type', 'subject_id', 'admission_status', 'score', 'sec', 'cc'].some(key => key in row)) add(`${row.atom_id}: confidence does not store hypothesis, admission or scoring values`);
  }
  return issues;
}
