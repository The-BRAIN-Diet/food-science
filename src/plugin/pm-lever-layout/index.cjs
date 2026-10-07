/** Evidence-gated, opt-in PM lever placement. Canonical IDs never mean visible numbering. */
const GROUPS = {
  '3.1': {title: 'Dietary Requirements', anchor: 'pm-lever-dietary'},
  '3.2': {title: 'System Optimisation Practices', anchor: 'pm-lever-optimisation'},
  '3.3': {title: 'Lifestyle Levers', anchor: 'pm-lever-lifestyle'},
};
function validateDominanceAssessment(data) {
  const a = data.intervention_dominance_assessment;
  if (!a) return [];
  const errors = [];
  const q = a.evidence_qualification;
  const selection = a.principal_route_selection;
  if (!q || !selection) return ['Separate evidence_qualification and principal_route_selection records are required'];
  if (!q.label?.trim() || !q.rationale?.trim()) errors.push('Evidence qualification requires its preserved label and rationale');
  if (typeof data.intervention_dominance === 'string' && q.label !== data.intervention_dominance) errors.push('Evidence qualification must preserve the canonical intervention_dominance label');
  const ids = selection.selected_groups;
  if (!['established', 'not-established'].includes(selection.disposition)) errors.push('Invalid principal-route disposition');
  if (!Array.isArray(ids) || new Set(ids).size !== ids.length || ids.some(id => !GROUPS[id])) return [...errors, 'selected_groups must be unique canonical IDs'];
  if (selection.disposition === 'established' && !ids.length) errors.push('Established principal selection needs at least one route');
  if (selection.disposition === 'not-established' && ids.length) errors.push('Unestablished principal selection cannot promote routes');
  if (!selection.rationale?.trim()) errors.push('Principal selection requires rationale');
  if (selection.comparative_limitations != null && !String(selection.comparative_limitations).trim()) errors.push('Principal selection comparative limitations cannot be blank');
  if (ids.length > 1 && !selection.joint_prominence_rationale?.trim()) errors.push('Joint prominence requires independent justification, not two supported entries');
  const routes = q.routes;
  if (!Array.isArray(routes)) return [...errors, 'Evidence qualification requires assessed routes'];
  if (new Set(routes.map(row => row.group_id)).size !== routes.length || routes.some(row => !GROUPS[row.group_id])) errors.push('Evidence routes must have unique canonical group IDs');
  for (const id of ids) {
    if (!routes.some(row => row.group_id === id)) errors.push(`Selected route ${id} needs qualified intervention evidence`);
    const row = (selection.assessments || []).find(row => row.group_id === id);
    for (const key of ['relevance', 'directness', 'extent']) if (!row?.[key]?.trim()) errors.push(`${id}: principal selection missing ${key}`);
  }
  const findings = new Map((data.scientific_findings || []).map(f => [f.id, f]));
  const bibliography = JSON.stringify(data.references || []);
  for (const row of routes) {
    const id = row.group_id;
    if (row.evidence_basis !== 'intervention-effect') errors.push(`${id}: nutrient presence or biochemical necessity cannot establish intervention responsiveness`);
    for (const key of ['intervention_effect', 'context', 'limitations']) if (!row[key]?.trim()) errors.push(`${id}: missing ${key}`);
    const evidence = row.evidence_source;
    if (!evidence?.finding_ids?.length || evidence.finding_ids.some(f => !findings.has(f))) errors.push(`${id}: evidence must resolve to canonical Findings`);
    if (!evidence?.citation_keys?.length || evidence.citation_keys.some(key => !bibliography.includes(key))) errors.push(`${id}: evidence must resolve to the target bibliography`);
    const supportedKeys = new Set((evidence?.finding_ids || []).flatMap(f => (findings.get(f)?.evidence_considered || []).map(s => s.citation_key)));
    if ((evidence?.citation_keys || []).some(key => !supportedKeys.has(key))) errors.push(`${id}: citation is not assessed in the selected Finding`);
  }
  return errors;
}
function dominancePlan(data) {
  const a = data.intervention_dominance_assessment;
  if (!a) return null; // Legacy strings/modes and FM inheritance are not evidence adjudications.
  const errors = validateDominanceAssessment(data);
  if (errors.length) throw new Error(`${data.pm_id || 'PM'} dominance: ${errors.join('; ')}`);
  const promoted = Object.keys(GROUPS).filter(id => a.principal_route_selection.selected_groups.includes(id));
  const remaining = Object.keys(GROUPS).filter(id => !promoted.includes(id));
  const headings = Object.fromEntries([...promoted.map((id, i) => [id, `1.${i + 1}`]), ...remaining.map((id, i) => [id, `3.${i + 1}`])]);
  const selection = a.principal_route_selection;
  const routeLabel = promoted.length ? promoted.map(id => GROUPS[id].title).join(' + ') : 'No principal intervention route established';
  return {promoted, remaining, headings, label: `${a.evidence_qualification.label} — ${routeLabel}`, scope: [a.evidence_qualification.scope_note, selection.comparative_limitations].filter(Boolean).join(' ')};
}
function text(node) {return node.value || (node.children || []).map(text).join('');}
function attr(node, name) {return node.attributes?.find(a => a.name === name)?.value;}
function setAttr(node, name, value) {
  node.attributes ||= [];
  const existing = node.attributes.find(a => a.name === name);
  if (existing) existing.value = value;
  else node.attributes.push({type: 'mdxJsxAttribute', name, value});
}
function walk(node, fn) {fn(node); for (const child of node.children || []) walk(child, fn);}
function summary(node) {
  let found;
  walk(node, n => {if (!found && (n.name === 'summary' || (n.name === 'button' && String(attr(n, 'class') || attr(n, 'className') || '').includes('brs-fm-hub-summary')))) found = n;});
  return found;
}
function groupId(node) {
  if (!['div', 'details'].includes(node.name)) return null;
  const stored = attr(node, 'data-pm-lever-group');
  if (GROUPS[stored]) return stored;
  const value = text(summary(node) || {});
  for (const [id, group] of Object.entries(GROUPS)) if (new RegExp(`^(?:[34]\\.${id.at(-1)}|1\\.${id.at(-1)})\\s+${group.title}$`).test(value.trim())) return id;
  return null;
}
function renumber(group, id, visible) {
  setAttr(group, 'data-pm-lever-group', id);
  if (!attr(group, 'id')) setAttr(group, 'id', GROUPS[id].anchor);
  const main = summary(group);
  walk(group, node => {
    if (!['div', 'details'].includes(node.name) || (node.name === 'div' && !String(attr(node, 'class') || attr(node, 'className') || '').includes('brs-fm-hub-item'))) return;
    const heading = summary(node);
    if (!heading) return;
    const original = text(heading).trim();
    const nested = original.match(/^(?:[34]\.1|1\.1)\.([123])\s/);
    if (heading !== main && nested && id === '3.1') {
      const canonical = `3.1.${nested[1]}`;
      setAttr(node, 'data-pm-lever-section', canonical);
      if (!attr(node, 'id')) setAttr(node, 'id', `pm-lever-dietary-${nested[1]}`);
      walk(heading, n => {if (n.type === 'text') n.value = n.value.replace(/^(?:[34]\.1|1\.1)\.[123](?=\s)/, `${visible}.${nested[1]}`);});
    }
  });
  walk(main, n => {if (n.type === 'text') n.value = n.value.replace(/^[34]\.\d+(?=\s)/, visible);});
}
function applyLeverLayout(tree, data) {
  if (!data.pm_id) return;
  const plan = dominancePlan(data);
  if (!plan) {
    // Correct presentation of already placed legacy groups; do not select or move routes.
    let section = null;
    let ordinal = 0;
    for (const node of tree.children) {
      if (node.type === 'heading' && node.depth === 2) {
        section = text(node).match(/^(\d+)\./)?.[1] || null;
        ordinal = 0;
      }
      const id = groupId(node);
      if (id && section === '1') renumber(node, id, `1.${++ordinal}`);
    }
    return;
  }
  const groups = new Map();
  for (const node of tree.children) {
    const id = groupId(node);
    if (!id) continue;
    if (groups.has(id)) throw new Error(`${data.pm_id}: duplicate lever group ${id}`);
    groups.set(id, node);
  }
  if (groups.size !== 3) throw new Error(`${data.pm_id}: all three canonical lever groups must be authored once`);
  tree.children = tree.children.filter(node => !groupId(node) && !(node.type === 'paragraph' && /^Intervention Dominance:/.test(text(node))) && !(node.type === 'heading' && node.depth === 3 && text(node) === 'Intervention Profile'));
  const overview = tree.children.findIndex(n => n.type === 'heading' && n.depth === 3 && text(n) === 'Overview');
  const mission = tree.children.findIndex(n => n.type === 'heading' && n.depth === 3 && text(n) === 'Mission');
  if (mission < 0 || overview <= mission) throw new Error(`${data.pm_id}: Mission and Overview required for canonical layout`);
  for (const [id, group] of groups) renumber(group, id, plan.headings[id]);
  const dominance = {type: 'paragraph', children: [{type: 'strong', children: [{type: 'text', value: 'Intervention Dominance:'}]}, {type: 'text', value: ` ${plan.label}`} ]};
  const leading = [dominance, ...(plan.scope ? [{type: 'paragraph', children: [{type: 'text', value: plan.scope}]}] : []), ...plan.promoted.map(id => groups.get(id))];
  tree.children.splice(overview, 0, ...leading);
  const section3 = tree.children.findIndex(n => n.type === 'heading' && n.depth === 2 && /^3\. (Intervention )?Levers$/.test(text(n)));
  if (section3 < 0) throw new Error(`${data.pm_id}: canonical section 3 required`);
  tree.children.splice(section3 + 1, 0, ...plan.remaining.map(id => groups.get(id)));
}
function remarkPmLeverLayout() {return (tree, file) => applyLeverLayout(tree, file.data.frontMatter || {});}
module.exports = remarkPmLeverLayout;
module.exports.GROUPS = GROUPS;
module.exports.dominancePlan = dominancePlan;
module.exports.validateDominanceAssessment = validateDominanceAssessment;
module.exports.applyLeverLayout = applyLeverLayout;
