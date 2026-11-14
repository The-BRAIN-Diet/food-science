import {resolveAggregateFoodSources} from '../../src/lib/aggregateFoodComposition.mjs';
import {projectFoodTargets} from '../../src/lib/foodTargetTraceability.mjs';
import {historicalAdmission} from './dietary-input-governance.mjs';
/** Generated joins only. PM/KC admissions, substance registry and food composition remain authoritative. */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import matter from 'gray-matter';
import { readRegisteredSubstanceForms } from './substance-input-pages.mjs';
import { canonicalContainsRelationships } from '../../src/data/foodSubstanceRelationships.mjs';
import { selectQuantified, PILOT_PMS } from '../../src/data/inputSubstanceFoodSelection.mjs';
export { selectQuantified } from '../../src/data/inputSubstanceFoodSelection.mjs';
import { checkExactFoodMatch } from './composition-provenance.mjs';
export { PILOT_PMS } from '../../src/data/inputSubstanceFoodSelection.mjs';
export const normalize = v => String(v || '').toLowerCase().normalize('NFKD').replace(/[′’']/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
const section = v => String(v || '').replace(/^1\.1\./, '3.1.');
const walk = dir => fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]).filter(p => /\.mdx?$/.test(p)) : [];
const unique = a => [...new Set(a)];
export function amountDisplay(o) { return o?.value != null ? `${o.value} ${o.unit}` : o?.range ? `${o.range[0]}–${o.range[1]} ${o.unit}` : 'value not known'; }
export function buildInputSubstanceFood(root, { brs = 'BRS1' } = {}) {
    if (!/^(BRS[1-6]|BRS-X)$/.test(brs)) throw new Error('Mapping scope must be BRS1–6 or BRS-X');
    const scope = brs.toLowerCase();
    const reads = new Set(), gaps = [], conflicts = [];
    function load(file) { const full = path.join(root, file); reads.add(file); return { file, ...matter(fs.readFileSync(full, 'utf8')) }; }
    const registryFile = 'registry/substances.json', registry = JSON.parse(fs.readFileSync(path.join(root, registryFile), 'utf8'));
    reads.add(registryFile);
    const substances = {}, aliases = new Map(), forms = readRegisteredSubstanceForms(root);
    function alias(label, id) { const n = normalize(label); if (!n)
        return; if (!aliases.has(n))
        aliases.set(n, new Set()); aliases.get(n).add(id); }
    for (const [id, r] of Object.entries(registry)) {
        const form = forms.get(id);
        if (form) {
            reads.add(form.file);
            substances[id] = { id, title: form.title, aliases: form.aliases, page: form.href, record: registryFile + '#' + id, exists: Boolean(form.documented), identity_registered: true, parent_substance_id: form.parent_substance_id };
            for (const name of [id, form.title, ...form.aliases]) alias(name, id);
            if (!form.documented) gaps.push({ kind: 'substance-documentation', substance_id: id, record: form.file, reason: 'Registered identity retained; shared documentation page or anchor does not verify.' });
            continue;
        }
        if (!r?.path)
            continue;
        const file = 'docs/substances/' + r.path;
        const exists = fs.existsSync(path.join(root, file)), d = exists ? load(file).data : {};
        substances[id] = { id, title: d.title || r.title || id, aliases: unique([...(r.aliases || []), ...(d.aliases || []), ...(d.synonyms || [])]), page: exists ? '/docs/substances/' + r.path.replace(/\.mdx?$/, '') : null, record: registryFile + '#' + id, exists, identity_type:d.identity_type, constituent_ids:d.constituent_ids, food_delivery_assessment:d.food_delivery_assessment };
        for (const name of [id, r.title, d.title, d.sidebar_label, ...(d.aliases || []), ...(d.synonyms || [])]) {
            alias(name, id);
            const par = String(name || '').match(/^(.+?)\s*\((.+)\)$/);
            if (par) {
                alias(par[1], id);
                for (const x of par[2].split(/[,;]/))
                    alias(x, id);
            }
        }
    }
    function identity(input, explicit) { if (explicit) {
        if (substances[explicit])
            return { id: explicit, status: (substances[explicit].identity_registered || substances[explicit].exists) ? 'resolved' : 'missing-page' };
        return { id: null, status: 'unknown-explicit-id', reason: explicit };
    } const raw = String(input || ''), variants = unique([
        raw,
        raw.replace(/\s*\([^)]*\)\s*$/, ''),
        raw.replace(/\s+ions?\b/ig, '').replace(/\s*\([^)]*\)\s*$/, ''),
        raw.replace(/\s*\([^)]*\)\s*$/, '').replace(/\s+ions?\b/ig, ''),
    ]).map(normalize).filter(Boolean);
    const matches = variants.map(v => aliases.get(v)).filter(Boolean), ids = matches.find(s => s.size === 1) || (matches.length ? matches[0] : null); if (ids?.size === 1) {
        const id = [...ids][0];
        return { id, status: (substances[id].identity_registered || substances[id].exists) ? 'resolved' : 'missing-page' };
    } if (ids?.size > 1)
        return { id: null, status: 'conflicting-alias', reason: [...ids].join(', ') }; return { id: null, status: 'unresolved-identity' }; }
    const labelSource = 'src/data/nutritionTableMapping.ts';
    reads.add(labelSource);
    const labelsText = fs.readFileSync(path.join(root, labelSource), 'utf8'), literal = labelsText.match(/export const NUTRIENT_LABELS[^=]*=\s*(\{[\s\S]*?\n\})/);
    if (!literal)
        throw Error('Nutrient label source not found');
    const nutrientLabels = vm.runInNewContext('(' + literal[1] + ')');
    const pmDocs = walk(path.join(root, 'docs/biological-targets', scope)).map(f => load(path.relative(root, f))).filter(d => d.data.pm_id), pms = new Map(pmDocs.map(d => [d.data.pm_id, d]));
    const dependencyDocs = new Map();
    function dep(kind, id, href) { if (pms.has(id))
        return pms.get(id); if (dependencyDocs.has(id))
        return dependencyDocs.get(id); let file; if (href) {
        const route = String(href).replace(/^https?:\/\/[^/]+/, '').replace(/^\/docs\//, 'docs/').split('#')[0];
        file = ['.mdx', '.md'].map(ext => route + ext).find(f => fs.existsSync(path.join(root, f)));
    } if (!file) {
        const b = id.match(/^BRS(\d+)/)?.[1], k = id.match(/KC(\d+)/)?.[1];
        if (kind === 'kc' && b && k)
            file = walk(path.join(root, `docs/biological-targets/brs${b}/kc`)).map(p => path.relative(root, p)).find(p => path.basename(p).startsWith(`brs${b}-kc${k}-`));
    } if (!file) {
        gaps.push({ kind: 'unresolved-dependency', id, href });
        return null;
    } const d = load(file); if (d.data.pm_id !== id && d.data.kc_id !== id) {
        conflicts.push({ kind: 'dependency-id-mismatch', id, file, actual: d.data.pm_id || d.data.kc_id });
        return null;
    } dependencyDocs.set(id, d); return d; }
    const relationships = [], pools = new Map(), coverage = [];
    for (const doc of pmDocs) {
        const d = doc.data, pm = d.pm_id, pmPage = '/docs/' + doc.file.replace(/^docs\//, '').replace(/\.mdx?$/, '');
        const traces = new Map((d.dietary_input_traceability || []).map(a => [a.atom_id, a]));
        const memberships = new Map();
        for (const k of d.pm_kc_relationships || []) {
            const accepted = k.relationship_type === 'supported-upstream-supply' || (d.kc_applicability_adjudications || []).some(a => a.kc_id === k.kc_id && a.disposition === 'established');
            if (!accepted)
                continue;
            const kd = dep('kc', k.kc_id, k.kc_href);
            if (!pools.has(k.kc_id))
                pools.set(k.kc_id, { id: k.kc_id, title: kd?.data.title || k.kc_id, record: kd?.file || null, dependent_pms: [], constituent_relationships: [] });
            const pool = pools.get(k.kc_id);
            pool.dependent_pms.push(pm);
            for (const c of k.constituent_relationships || []) {
                if (c.disposition && c.disposition !== 'established')
                    continue;
                const ka = kd?.data.kc_input_traceability?.find(x => x.atom_id === c.kc_atom_id);
                const key = k.kc_id + '::' + (c.kc_atom_id || c.relationship_id);
                const member = { kc_id: k.kc_id, ikc_id: c.ikc_id || ka?.ikc_id || null, constituent_id: c.kc_atom_id || null, relationship_id: c.relationship_id, relationship_type: c.relationship_type || k.relationship_type || null, membership: ka?.ikc_membership || c.kc_membership_status || null, label: c.label || ka?.input || null, presentation_section: section(c.presentation_section || '3.1.3'), source_record: kd?.file ? kd.file + '#kc_input_traceability/' + c.kc_atom_id : null, substance_id: c.substance_id || ka?.substance_id || null };
                if (!member.relationship_type) gaps.push({kind:'constituent-relationship-type-missing',pm_id:pm,id:c.relationship_id,reason:'Established applicability retained; source has no explicit relationship-type label.'});
                if (!memberships.has(c.pm_atom_id))
                    memberships.set(c.pm_atom_id, []);
                memberships.get(c.pm_atom_id).push(member);
                pool.constituent_relationships.push({ ...member, id: key, pm_id: pm });
                if (!traces.has(c.pm_atom_id))
                    gaps.push({ kind: 'constituent-without-pm-atom', pm_id: pm, id: c.relationship_id });
            }
            if (k.input && k.pm_biological_role && k.presentation_label) {
                relationships.push({ id: pm + '::' + k.relationship_id, brs, fm: d.parent_fm, pm, pm_page: pmPage, input: k.input, input_type: k.input_type || 'resource dependency', relationship_type: k.relationship_type || null, biological_role: k.pm_biological_role, dietary_input: k.dietary_input ?? null, dietary_input_note: k.dietary_input_note, accounting: 'D', accounting_label: 'Shared pool/KC reference', pool_references: [k.kc_id], upstream: [], substance_id: null, source_record: doc.file + '#pm_kc_relationships/' + k.relationship_id, evidence: k.evidence_source, limitation: k.evidence_limitation, identity_status: 'pool', qualification: 'Pool reference; no nutrient quantity added.', presentations: [{ label: k.presentation_label, section: '3.1.3' }], members: [] });
            }
        }
        for (const l of d.dietary_lever_atoms || []) {
            const a = traces.get(l.atom_id), pres = (d.dietary_lever_presentations || []).filter(p => p.atom_id === l.atom_id && ['3.1.1', '3.1.2', '3.1.3'].includes(section(p.presentation_section)));
            const members = memberships.get(l.atom_id) || [];
            if (!pres.length && !members.length) {
                gaps.push({ kind: 'unpresented-admitted-atom', pm_id: pm, id: l.atom_id });
            }
            if (!a) {
                gaps.push({ kind: 'unresolved-admitted-atom', pm_id: pm, id: l.atom_id });
                continue;
            }
            const ident = identity(a.input, a.substance_id || (d.dietary_input_assessments||[]).find(x=>x.atom_id===a.atom_id)?.canonical_substance_id || a.canonical_identity?.substance_id || members.find(x => x.substance_id)?.substance_id), upstream = (a.upstream_pm_relationships || []).map(u => ({ ...u, resolved: !!dep('pm', u.pm_id, u.href) }));
            if (!ident.id && ['dietary pattern', 'nutrient/compound class', 'dietary matrix'].includes(a.input_type))
                ident.status = a.input_type;
            const type = l.relationship_layer || 'dietary-requirement', supply = upstream.some(u => /supply/i.test(u.relationship_label));
            let accounting = members.length ? 'C' : supply ? 'B' : (type === 'biochemical-requirement' && a.dietary_input !== true) || (/PLP|tetrahydrobiopterin|acetyl.CoA/i.test(a.input) && l.dietary_addressability === 'not-established') ? 'E' : type === 'kc-relevance' ? 'unresolved' : 'A';
            if (accounting === 'E' && a.dietary_input === true) gaps.push({kind:'dietary-accounting-designation-unresolved',relationship_id:pm+'::'+l.atom_id,reason:'Dietary section admission retained, but active-cofactor/product accounting remains unresolved. Do not count precursor and intracellular product as independent supplies.'});
            const designation = { A: 'PM-owned dietary relationship', B: 'Upstream PM reference', C: 'Upstream iKC/resource constituent relationship', D: 'Shared pool/KC reference', E: 'Endogenous/biochemical dependency', unresolved: 'Accounting designation unresolved' }[accounting];
            const qualification = [];
            if (ident.status !== 'resolved')
                qualification.push(ident.status + (ident.reason ? ': ' + ident.reason : ''));
            if (a.canonical_identity?.status === 'missing-substance' && ident.status === 'resolved') {
                conflicts.push({ kind: 'stale-missing-substance-status', pm_id: pm, atom_id: l.atom_id, input: a.input, resolved_id: ident.id });
                qualification.push('PM identity says missing; canonical registry now resolves. Scientific admission unchanged.');
            }
            if (accounting === 'E')
                qualification.push('Biochemical context/accounting retained independently of dietary-input applicability.');
            if (a.dietary_input == null) gaps.push({kind: 'dietary-input-unset', relationship_id: pm + '::' + l.atom_id, reason: a.dietary_input_note || 'Dietary supply decision unset', flags: a.dietary_input_flags || []});
            qualification.push(a.dietary_input_note || '');
            if (accounting === 'C' && members.some(x => x.relationship_type === 'supported-upstream-supply'))
                qualification.push('Supported upstream resource supply; not reclassified as limiting iKC applicability.');
            if (!ident.id && !['dietary pattern', 'nutrient/compound class', 'dietary matrix'].includes(a.input_type))
                gaps.push({ kind: 'substance-identity', pm_id: pm, id: l.atom_id, input: a.input, status: ident.status });
            const rel = { operation:d.mission, scientific_assessment:(d.dietary_input_assessments||[]).find(x=>x.atom_id===a.atom_id), historical_admission:historicalAdmission(d,a,root), id: pm + '::' + l.atom_id, brs, fm: d.parent_fm, pm, pm_page: pmPage, input: a.input, input_type: a.input_type, relationship_type: { layer: type, classification: l.requirement_classification || null, mode: l.relationship_mode || null, addressability: l.dietary_addressability || null, claim_ceiling: l.claim_ceiling || null }, biological_role: a.biological_role, dietary_input: a.dietary_input ?? null, dietary_input_note: a.dietary_input_note, dietary_input_flags: a.dietary_input_flags || [], accounting, accounting_label: designation, upstream, pool_references: unique(members.map(x => x.kc_id)), members, substance_id: ident.id, substance_page: substances[ident.id]?.page || null, identity_status: ident.status, source_record: doc.file + '#dietary_input_traceability/' + l.atom_id, evidence: a.evidence_source, limitation: a.evidence_limitation || l.evidence_limitation, derived_target_atom_id: l.derived_target_atom_id ? pm + '::' + l.derived_target_atom_id : null, derived_target: l.derived_target || null, qualification: qualification.join(' '), presentations: [...pres.map(p => ({ label: p.label || a.input, section: section(p.presentation_section) })), ...members.filter(m => m.label).map(m => ({ label: m.label, section: m.presentation_section }))].filter((p, i, all) => all.findIndex(q => q.label === p.label && q.section === p.section) === i) };
            relationships.push(rel);
        }
        coverage.push({ pm_id: pm, record: doc.file, accepted_relationships: relationships.filter(r => r.pm === pm).length, structured_atoms: (d.dietary_lever_atoms || []).length });
        if (!(d.dietary_lever_atoms || []).length)
            gaps.push({ kind: 'no-structured-admissions', pm_id: pm, reason: 'No structured accepted dietary inputs; narrative mentions are not admissions.' });
    }
    const foodSources = [], patternCandidates = [];
    // Food composition is ontology-owned. Build sources for every resolved
    // mapped substance; dietary_input only governs dietary admission/roll-up.
    const needed = new Set(relationships.map(r => r.substance_id).filter(Boolean));
    for (const f of walk(path.join(root, 'docs/foods'))) {
        const doc = load(path.relative(root, f)), d = doc.data, foodId = d.id || path.basename(f).replace(/\.mdx?$/, ''), page = '/docs/' + doc.file.replace(/^docs\//, '').replace(/\.mdx?$/, ''), validPanel = checkExactFoodMatch(d, foodId).length === 0 && d.composition_status !== 'withdrawn', src = d.nutrition_source;
        const heldSubstances = new Set((d.nutrition_value_reviews || []).filter(r => r.exclude_from_food_lists === true).map(r => r.substance_id));
        for (const review of d.nutrition_value_reviews || []) if (review.exclude_from_food_lists === true)
            gaps.push({ kind: 'composition-observation-held', food_id: foodId, substance_id: review.substance_id, record: doc.file + '#nutrition_value_reviews', reason: review.title });
        const entries = new Map();
        function entry(id, material, preparation) { const key = foodId + '::' + id + '::' + normalize(material || 'unspecified') + '::' + normalize(preparation || 'unspecified'); if (!entries.has(key))
            entries.set(key, { id: key, substance_id: id, food_id: foodId, food_title: d.title || foodId, food_page: page, food_record: doc.file, material: material || null, preparation: preparation || null, species: d.food_identity?.species || null, product: d.food_identity?.product || null, edible_part: d.food_identity?.edible_part || null, chemical_form: null, food_matrix: null, preparation_effects: null, absorption_evidence: null, observations: [], presence_records: [], qualification: [] }); return entries.get(key); }
        const material = src?.food_name || d.food_identity?.material || d.title, prep = d.preparation_state || d.food_identity?.preparation || (/\b(raw|uncooked|cooked|dried|roasted|boiled|oil)\b/i.exec(src?.food_name || '')?.[1] || null);
        for (const edge of canonicalContainsRelationships(d)) {
            const ident = identity(edge.substance, edge.substance_id);
            if (!ident.id || !needed.has(ident.id) || heldSubstances.has(ident.id) || substances[ident.id]?.identity_type === 'defined-substrate-class')
                continue;
            const e = entry(ident.id, edge.evidence_material || material, Object.hasOwn(edge, 'preparation_state') ? edge.preparation_state : prep);
            e.presence_records.push({ record: doc.file + '#substance_relationships/' + encodeURIComponent(edge.substance), evidence: edge.evidence_source || edge.evidence_basis || null, source_url: edge.source_url || null, source_reference: edge.source_reference || null, citation_keys: edge.citation_keys || [], relationship_type: edge.relationship, presence_status: edge.presence_status || 'supported-qualitative', limitations: edge.material_limitations || edge.description || null });
            e.food_delivery_notes = edge.food_delivery_notes || e.food_delivery_notes;
            e.chemical_form = edge.chemical_form || e.chemical_form;
            e.food_matrix = edge.food_matrix || e.food_matrix;
            e.preparation_effects = edge.preparation_effects || e.preparation_effects;
            e.absorption_evidence = edge.absorption_evidence || e.absorption_evidence;
        }
        for (const [key, value] of Object.entries(d.nutrition_per_100g || {})) {
            if (!validPanel || !src || !Number.isFinite(value) || value <= 0 || !nutrientLabels[key])
                continue;
            const label = nutrientLabels[key].label;
            if (/\+|total|unresolved/i.test(label) || /unresolved|omega3|lutein_zeaxanthin/.test(key))
                continue;
            const ident = identity(label);
            if (!ident.id || !needed.has(ident.id) || heldSubstances.has(ident.id))
                continue;
            const e = entry(ident.id, material, prep);
            e.observations.push(observation({ nutrition_source: src, public_note: src.public_note, material_limitations: src.material_limitations, source_note: src.source_note, value, unit: nutrientLabels[key].unit, basis: src.basis, source_url: src.source_url || null, source_reference: src.source_reference || null, material, preparation: prep, record: doc.file + '#nutrition_per_100g/' + key, source_record: doc.file + '#nutrition_source', verified: true }));
        }
        for (const row of d.nutrition_supplementary_sources || []) {
            if (row.evidence_status === 'rejected' || row.evidence_status === 'unresolved' || row.analyte_scope === 'combined' || /\+/.test(row.label || ''))
                continue;
            const ident = identity(row.label, row.substance_id);
            if (!ident.id || !needed.has(ident.id) || heldSubstances.has(ident.id))
                continue;
            const publicDisplay = row.public_display || d.public_display?.[row.key] || d.public_display?.[row.substance_id] || d.public_display?.[row.label];
            const publicRestricted = ['internal-only', 'excluded-error', 'substance-only'].includes(publicDisplay);
            const pre = Object.hasOwn(row, 'preparation_state') ? row.preparation_state : prep;
            // A qualitative supplementary citation can repeat an explicit contains edge.
            // Reuse its evidence material; never borrow the generic composition-panel species.
            const matches = !row.evidence_material && !row.material && !Number.isFinite(row.value) && !row.range && row.source_url
                ? [...entries.values()].filter(e => e.substance_id === ident.id && e.preparation === pre && e.presence_records.some(p => p.source_url === row.source_url)) : [];
            const mat = row.evidence_material || row.material || (matches.length === 1 ? matches[0].material : material), pointer = doc.file + '#nutrition_supplementary_sources/' + row.key;
            const existing = [...entries.values()].find(e => e.substance_id === ident.id && e.material === mat && e.preparation === (pre || null));
            // Retain corroborating internal provenance without admitting a new public source.
            if (publicRestricted && !existing) continue;
            const e = existing || entry(ident.id, mat, pre);
            e.chemical_form = row.chemical_form || e.chemical_form;
            e.food_matrix = row.food_matrix || e.food_matrix;
            e.preparation_effects = row.preparation_effects || e.preparation_effects;
            e.absorption_evidence = row.absorption_evidence || e.absorption_evidence;
            e.presence_records.push({ ...row, record: pointer, evidence: row.source_note || null, source_url: row.source_url || null, source_reference: row.source_reference || null, evidence_status: row.evidence_status, public_display: publicDisplay, presence_status: row.presence_status || row.status || 'qualitative', limitations: row.notes || null });
            const range = Array.isArray(row.range) && row.range.length === 2 && row.range.every(Number.isFinite) ? row.range : null;
            const reviewHeld = (d.nutrition_value_reviews || []).some(review => {
                if (review.correction_status === 'resolved' && !review.exclude_from_food_lists) return false;
                const key = review.nutrient_key || review.key;
                return key ? key === row.key : review.substance_id ? review.substance_id === ident.id : review.correction_status === 'pending';
            });
            const verified = !publicRestricted && row.verified !== false && !reviewHeld && !row.status && !row.amount_display && !/amount_unavailable|citation_pending/.test(row.presence_status || '') && !!(row.source_url || row.source_reference) && !row.quantity_citation_pending && !/estimate|representative|approximate/i.test(row.source_group || '') && (Number.isFinite(row.value) || range);
            if (!publicRestricted && (Number.isFinite(row.value) || range))
                e.observations.push(observation({ ...row, value: Number.isFinite(row.value) ? row.value : null, range, unit: row.unit, basis: row.basis, source_url: row.source_url, material: mat, preparation: pre, record: pointer, source_record: pointer, verified: !!verified, nutrition_value_reviews: d.nutrition_value_reviews || [], limitations: row.limitations || row.source_note || null }));
        }
        for (const row of (Array.isArray(d.nutrition_authorised_specifications) ? d.nutrition_authorised_specifications : d.nutrition_authorised_specifications ? [d.nutrition_authorised_specifications] : [])) {
            gaps.push({ kind: 'specialist-specification-not-joined', food_id: foodId, record: doc.file, reason: 'Authorised specification schema needs a material-specific adapter; no generic amount inferred.' });
        }
        foodSources.push(...entries.values());
        for (const aggregate of Object.values(substances).filter(s => needed.has(s.id) && s.identity_type === 'defined-substrate-class')) foodSources.push(...resolveAggregateFoodSources(d, aggregate, doc.file));
        if (validPanel && src && Number.isFinite(d.nutrition_per_100g?.carbs_g) && Number.isFinite(d.nutrition_per_100g?.protein_g))
            patternCandidates.push({ food_id: foodId, food_page: page, title: d.title, composition_record: doc.file + '#nutrition_per_100g', composition_values: { carbs_g: d.nutrition_per_100g.carbs_g, protein_g: d.nutrition_per_100g.protein_g }, fields: ['carbs_g', 'protein_g'], qualification: 'Candidate ingredient composition only; a single food does not establish a meal pattern, ratio or target.' });
    }
    function observation(o) {
        const factor = { g: 1000, mg: 1, 'µg': 0.001, ug: 0.001 }[o.unit];
        const per100g = /per\s*100\s*g/i.test(o.basis || '');
        const qualified = !!(o.public_note || o.material_limitations || o.notes || o.source_note || o.limitations);
        // Existing explicit comparison decisions are not inferred from citations or prose.
        // Keep the legacy ordinary-panel groups; qualified records need adjudication.
        const group = qualified ? (o.rank_eligible === true && o.comparison_group || null)
            : per100g && o.preparation ? (/dry|dried|powder/i.test(o.basis || '') ? 'dry' : 'edible') + '::' + normalize(o.preparation) : null;
        const rankEligible = !!(o.verified && per100g && factor && group && o.rank_eligible !== false);
        return { ...o, id: o.record, rank_eligible: rankEligible,
            comparison_group: rankEligible ? group : null,
            low: (o.range?.[0] ?? o.value) * factor, high: (o.range?.[1] ?? o.value) * factor,
            display: amountDisplay(o) };
    }
    const bySub = new Map();
    for (const e of foodSources) {
        if (!bySub.has(e.substance_id))
            bySub.set(e.substance_id, []);
        bySub.get(e.substance_id).push(e);
    }
    for (const r of relationships) {
        r.relationship_owner = r.pm;
        r.canonical_supply_owner = r.accounting === 'B' ? r.upstream.filter(u => /supply/i.test(u.relationship_label)).map(u => u.pm_id) : [];
        for (const u of r.upstream) {
            const owner = pms.get(u.pm_id) || dependencyDocs.get(u.pm_id);
            u.relationship_ids = (owner?.data.dietary_lever_atoms || []).flatMap(l => { const a = (owner.data.dietary_input_traceability || []).find(x => x.atom_id === l.atom_id); const id = a ? identity(a.input, a.substance_id || a.canonical_identity?.substance_id) : {}; return id.id && id.id === r.substance_id ? [u.pm_id + '::' + l.atom_id] : []; });
            if (/supply/i.test(u.relationship_label) && !u.relationship_ids.length)
                gaps.push({ kind: 'upstream-supply-relationship-unresolved', relationship_id: r.id, upstream_pm: u.pm_id });
        }
    }
    const researchFile='system/food-target-research.json';
    const research=fs.existsSync(path.join(root,researchFile))?JSON.parse(fs.readFileSync(path.join(root,researchFile),'utf8')).targets:[];
    if(fs.existsSync(path.join(root,researchFile)))reads.add(researchFile);
    for(const target of research) {
        if(!substances[target.substance_id] || target.food_page !== '/docs/foods/'+target.food_id || !fs.existsSync(path.join(root,'docs/foods',target.food_id+'.md')) || target.status !== 'research-supported-provisional' || !target.evidence?.statement || !target.evidence?.sources?.length || target.evidence.sources.some(s=>!/^https?:\/\//.test(s))) throw new Error('Invalid provisional food research identity or provenance: '+target.food_id+' → '+target.substance_id);
    }
    const foodTargets=projectFoodTargets({relationships,substances,research,foodSources});
    relationships.splice(0,relationships.length,...foodTargets.relationships);
    const views = relationships.map(r => { const foods = r.substance_id ? bySub.get(r.substance_id) || [] : [], selected = selectQuantified(foods); return { ...r, foods, selected, qualitative_sources: selected.other_sources, pattern_candidates: r.input_type === 'dietary pattern' ? patternCandidates : [], gap: r.dietary_input !== true ? null : !r.substance_id ? (r.input_type === 'dietary pattern' ? 'Meal pattern retained; ingredient composition candidates available, no accepted meal-rule-to-food mapping.' : r.identity_status === 'pool' ? null : 'Identity/compound-class mapping unresolved; no dietary equivalent inferred.') : !foods.length ? 'No supported canonical food-source record found.' : null }; });
    const rows = views.flatMap(r => (r.foods.length ? r.foods : [null]).map(f => ({ ...r, foods: undefined, selected: undefined, qualitative_sources: undefined, pattern_candidates: undefined, row_id: r.id + '::' + (f?.id || 'gap'), food: f })));
    for (const r of views)
        if (r.gap)
            gaps.push({ kind: 'mapping-gap', relationship_id: r.id, input: r.input, reason: r.gap });
    for (const p of pools.values()) {
        p.dependent_pms = unique(p.dependent_pms);
        const cs = new Map();
        for (const c of p.constituent_relationships) {
            if (!cs.has(c.id))
                cs.set(c.id, { ...c, dependent_pms: [] });
            cs.get(c.id).dependent_pms.push(c.pm_id);
        }
        p.constituent_relationships = [...cs.values()].map(c => ({ ...c, dependent_pms: unique(c.dependent_pms) }));
    }
    const dietaryIds = unique(relationships.filter(r => r.dietary_input === true).map(r => r.substance_id).filter(Boolean));
    const substanceView = unique(relationships.map(r => r.substance_id).filter(Boolean)).map(id => ({ ...substances[id], dietary_accounted: dietaryIds.includes(id), relationships: relationships.filter(r => r.substance_id === id).map(r => r.id), food_sources: bySub.get(id) || [], selection: selectQuantified(bySub.get(id) || []) }));
    const foodView = unique(foodSources.map(f => f.food_id)).map(id => { const sources = foodSources.filter(f => f.food_id === id), ids = unique(sources.map(s => s.substance_id)), rs = relationships.filter(r => r.dietary_input === true && ids.includes(r.substance_id)), diet = rs.filter(r => r.dietary_input === true); return { food_id: id, title: sources[0].food_title, page: sources[0].food_page, substance_ids: ids, unique_dietary_inputs: unique(diet.map(r => r.substance_id)), unique_input_coverage: unique(diet.map(r => r.substance_id)).length, biological_reach: unique(rs.map(r => r.pm)).length, connected_pms: unique(rs.map(r => r.pm)), shared_pools: unique(rs.flatMap(r => r.pool_references)), sources: sources.map(s => s.id) }; });
    return { manuscript_rows:foodTargets.manuscript_rows, cursor_queue:foodTargets.cursor_queue, pattern_candidates: views.filter(r=>r.input_type==='dietary pattern').map(r=>({relationship_id:r.id,input:r.input,qualification:r.gap,candidates:r.pattern_candidates})), scope: brs, schema_version: 4, source_revision: Math.max(0, ...[...reads].map(file => fs.existsSync(path.join(root,file)) ? fs.statSync(path.join(root,file)).mtimeMs : 0)), pilot_pms: coverage.map(p => p.pm_id), relationships, views, rows, substances: substanceView, food_sources: foodSources, foods: foodView, pools: [...pools.values()], coverage, gaps, conflicts, source_records: [...reads].sort(), summary: { dietary_input: { yes: relationships.filter(r => r.dietary_input === true).length, no: relationships.filter(r => r.dietary_input === false).length, unset: relationships.filter(r => r.dietary_input == null).length }, pms: coverage.length, relationships: relationships.length, accounting: Object.fromEntries(['A', 'B', 'C', 'D', 'E', 'unresolved'].map(c => [c, relationships.filter(r => r.accounting === c).length])), unique_dietary_substances: dietaryIds.length, unique_shared_pools: pools.size, food_source_materials: foodSources.length, quantified_observations: foodSources.flatMap(f => f.observations).filter(o => o.verified).length, qualitative_materials: foodSources.filter(f => !f.observations.some(o => o.rank_eligible)).length, gaps: gaps.length, conflicts: conflicts.length } };
}
