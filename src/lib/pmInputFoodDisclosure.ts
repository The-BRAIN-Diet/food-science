import {informationIcon, renderCoverageWarning, renderTarget, renderUpstreamCandidates, unresolvedButyratePrecursorCandidates} from "./foodTargetTraceability.mjs";
import generatedScopes from "../data/inputMappingScopes.mjs";
import { selectBrsReviewData, canonicalInputSection } from "../data/inputSubstanceFoodSelection.mjs";
/** Read-only display of generated PM input joins; no hand-maintained food lists. */
export type MappingData = {
    pilot_pms: string[];
    relationships: any[];
    food_sources: any[];
    substances: any[];
};
const norm = (v: string) => String(v || '').toLowerCase().replace(/\s+/g, ' ').trim();
function esc(v: unknown) { return String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function isProbablyAnimalSource(source: any): boolean {
    const value = norm([
        source.food_id,
        source.food_title,
        source.material,
        source.food_matrix,
        source.product,
        source.species,
    ].filter(Boolean).join(' '));
    return /\b(anchov|beef|chicken|clam|cod|crab|duck|egg|fish|liver|mackerel|meat|milk|mussel|oyster|pork|poultry|salmon|sardine|scallop|seafood|shellfish|shrimp|tuna|turkey|whey|yolk)\b/.test(value);
}
function analyticalQualification(obs: any): string {
    const publicNotes = [obs.public_note, obs.material_limitations, obs.notes,
        obs.limitations !== obs.source_note ? obs.limitations : null].filter(Boolean);
    return [...new Set(publicNotes.length ? publicNotes : [obs.limitations || obs.source_note].filter(Boolean))].join(' ');
}
/** Provenance alone is not a public analytical qualification. Keep it on the food page. */
function hasCompactFoodMeasurement(obs: any): boolean {
    return obs?.verified === true && typeof obs.display === 'string' && !!obs.display.trim()
        && /^per\s*100\s*g\s+(edible portion|edible material|of food)$/i.test(obs.basis || '')
        && !obs.public_note && !obs.material_limitations && !obs.notes
        && (!obs.limitations || obs.limitations === obs.source_note);
}
function strongestAmount(source: any): number {
    const values = (source.observations || []).filter((o: any) => o.verified === true)
        .flatMap((o: any) => [o.high, o.low]).filter((v: any) => typeof v === 'number' && Number.isFinite(v));
    return values.length ? Math.max(...values) : -Infinity;
}
/** Keep measured observations distinct; qualitative provenance does not multiply food rows. */
export function selectFoodDisclosureSources(sources: any[]): any[] {
    const seen = new Set<string>();
    const items = sources.flatMap(source => {
        const visible = (record: any) => !['internal-only', 'excluded-error', 'substance-only'].includes(record.public_display);
        if (source.observations?.length && !source.observations.some(visible)) return [];
        const observations = source.observations?.length ? source.observations.filter(visible) : (source.presence_records || [])
            .filter((record: any) => !['internal-only', 'excluded-error', 'substance-only'].includes(record.public_display))
            // All presence records remain on the source. One display row represents
            // this canonical food/substance/material/preparation identity.
            .slice(0, 1)
            .map((record: any) => ({ ...record, verified: false, source_note: record.source_note || record.evidence }));
        return (observations.length ? observations : [null]).flatMap((obs: any) => {
            const key = obs?.id || obs?.record || JSON.stringify([source.id, obs]);
            if (seen.has(key)) return [];
            seen.add(key);
            return [{ ...source, material: obs?.material ?? source.material,
                preparation: obs && Object.hasOwn(obs, 'preparation') ? obs.preparation : source.preparation,
                observations: obs ? [obs] : [] }];
        });
    });
    const ordinary = items.filter(item => !analyticalQualification(item.observations[0] || {}));
    const qualified = items.filter(item => analyticalQualification(item.observations[0] || {}));
    const alphabetical = (a: any, b: any) => String(a.food_title).localeCompare(String(b.food_title));
    ordinary.sort((a, b) => strongestAmount(b) - strongestAmount(a) || alphabetical(a, b));
    const groups = new Map<string, any[]>();
    for (const item of qualified) {
        const obs = item.observations[0];
        // Explicit adjudication plus identical analyte, units and full basis. Never citation matching.
        // Legacy preparation-only groups do not establish analytical comparability.
        const key = obs.verified === true && obs.rank_eligible === true && obs.comparison_group && !/^(edible|dry)::/.test(obs.comparison_group)
            ? JSON.stringify([item.substance_id, obs.unit, obs.basis, obs.comparison_group]) : '';
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key)!.push(item);
    }
    const qualifiedItems = [...groups.entries()].sort(([a], [b]) => a.localeCompare(b)).flatMap(([key, group]) => {
        const validRanges = group.every(item => Number.isFinite(item.observations[0].low) &&
            Number.isFinite(item.observations[0].high) && item.observations[0].low <= item.observations[0].high);
        const overlaps = group.some((item, index) => group.slice(index + 1).some(other => {
            const a = item.observations[0], b = other.observations[0];
            return (a.low !== a.high || b.low !== b.high) && a.low <= b.high && b.low <= a.high;
        }));
        const comparable = !!key && validRanges && !overlaps;
        group.sort(comparable ? (a, b) => strongestAmount(b) - strongestAmount(a) || alphabetical(a, b) : alphabetical);
        return group.map(item => ({ ...item, comparisonNotice: comparable
            ? `Comparison group: ${group[0].observations[0].comparison_group}. Concentration order applies only within this analytical comparison group; it does not establish dietary availability or effectiveness.`
            : 'Analytical comparability is not established; no concentration ranking.' }));
    });
    // Preserve the ordinary top-five convention; never truncate distinct qualified observations.
    const ordinaryFoods = new Set(ordinary.slice(0, 5).map(item => item.food_id));
    const selectedOrdinary = ordinary.filter(item => ordinaryFoods.has(item.food_id));
    const measurements = qualifiedItems.filter(item => Number.isFinite(item.observations[0].value) || Array.isArray(item.observations[0].range));
    const presence = qualifiedItems.filter(item => !measurements.includes(item));
    const presenceFoods = new Set(presence.slice(0, Math.max(0, 5 - selectedOrdinary.length - measurements.length)).map(item => item.food_id));
    return [...selectedOrdinary, ...measurements, ...presence.filter(item => presenceFoods.has(item.food_id))];
}
function formatFoodAmount(source: any): string {
    const obs = (source.observations || [])[0];
    if (obs?.verified !== true || !obs?.display) return 'quantity not established';
    const basis = String(obs.basis || '').trim();
    if (analyticalQualification(obs)) return `${esc(obs.display)} (${esc(basis || 'measurement basis not established')})`;
    return `${esc(obs.display)}${/per\s*100\s*g/i.test(basis) ? ' per 100 g' : basis ? ` (${esc(basis)})` : ' (measurement basis not established)'}`;
}
function formatFoodPrep(source: any): string {
    const preparation = String(source.preparation || '').trim().toLowerCase();
    if (preparation === 'uncooked') return 'raw';
    if (preparation === 'oil') return 'oil';
    return esc(source.preparation || 'preparation not established');
}
function sourceReference(source: any, obs: any): string {
    const reference = String(obs.source_reference || '');
    const href = reference.startsWith('#') ? source.food_page + reference : obs.source_url;
    if (!href || !/^(?:https?:\/\/|\/docs\/)/.test(href)) return '';
    return ` · <a href="${esc(href)}">${esc(reference || 'Source')}</a>`;
}
export function renderFoodSourceItem(source: any): string {
    const missingPreparation = !String(source.preparation || '').trim();
    const qualityAttrs = missingPreparation
        ? ` data-quality-flag="missing-preparation" data-food-source-id="${esc(source.id || '')}" data-food-id="${esc(source.food_id || '')}" data-substance-id="${esc(source.substance_id || '')}"`
        : '';
    const qualityClass = missingPreparation ? ' pm-input-food-source-meta--review' : '';
    const obs = (source.observations || [])[0] || {};
    if (hasCompactFoodMeasurement(obs)) {
        return `<a href="${esc(source.food_page)}">${esc(source.food_title)}</a><span class="pm-input-food-source-meta${qualityClass}"${qualityAttrs}> — ${esc(obs.display)} per 100 g · ${formatFoodPrep(source)}</span>`;
    }
    const qualification = analyticalQualification(obs);
    const detail = qualification ? ` · Studied material: ${esc(source.material || 'not reported')} · Analytical qualification: ${esc(qualification)}` : '';
    const comparison = source.comparisonNotice ? ` <span>${esc(source.comparisonNotice)}</span>` : '';
    const reference = sourceReference(source, obs);
    return `<a href="${esc(source.food_page)}">${esc(source.food_title)}</a><span class="pm-input-food-source-meta${qualityClass}"${qualityAttrs}> — ${formatFoodAmount(source)} · ${formatFoodPrep(source)}</span>${detail || comparison || reference ? `<details class="pm-input-food-analytical-detail"><summary>Source qualifications</summary><p>${detail}${reference}${comparison}</p></details>` : ''}`;
}
export function renderProvenance(source: any): string {
    const obs = source.observations[0];
    if (hasCompactFoodMeasurement(obs)) return '';
    if (!obs || !analyticalQualification(obs) || !obs.source_note) return '';
    return `<details><summary>Measurement provenance</summary><p>${esc(obs.source_note)}</p>${obs.source_url && /^https?:\/\//.test(obs.source_url) ? `<a href="${esc(obs.source_url)}">Original source</a>` : ''}</details>`;
}
function updateFoodArrow(details: HTMLDetailsElement) {
    const arrow = details.querySelector<HTMLElement>('.pm-input-food-source-arrow');
    if (arrow) arrow.textContent = details.open ? '▼' : '▶';
}
function attachFoodDisclosureBehaviour(details: HTMLDetailsElement) {
    details.dataset.pmInputFoodPinned = 'false';
    const summary = details.querySelector('summary');
    details.addEventListener('toggle', () => updateFoodArrow(details));
    summary?.addEventListener('pointerenter', (event) => {
        if ((event as PointerEvent).pointerType === 'touch') return;
        details.open = true;
        updateFoodArrow(details);
    });
    details.addEventListener('pointerleave', (event) => {
        if ((event as PointerEvent).pointerType === 'touch') return;
        if (details.dataset.pmInputFoodPinned === 'true' || details.contains(document.activeElement)) return;
        details.open = false;
        updateFoodArrow(details);
    });
    summary?.addEventListener('click', () => {
        window.setTimeout(() => {
            details.dataset.pmInputFoodPinned = details.open ? 'true' : 'false';
            updateFoodArrow(details);
        }, 0);
    });
}
export function renderFoodSourceSummary(kind: string, top?: any): string {
    return top
        ? `<span class="pm-input-food-source-arrow" aria-hidden="true">▶</span><span class="pm-input-food-source-kind">${esc(kind)} -</span> ${hasCompactFoodMeasurement(top.observations?.[0]) ? renderFoodSourceItem(top) : `<a href="${esc(top.food_page)}">${esc(top.food_title)}</a>`}`
        : `<span class="pm-input-food-source-arrow" aria-hidden="true">▶</span><span class="pm-input-food-source-kind">${esc(kind)} -</span> <span class="pm-input-food-source-empty">No verified sources yet</span>`;
}
function createFoodSourceDetails(kind: string, sources: any[]): HTMLDetailsElement {
    const selected = selectFoodDisclosureSources(sources);
    const box = document.createElement('details');
    box.className = 'pm-input-food-sources';
    box.dataset.foodSourceKind = kind.toLowerCase().replace(/\s+/g, '-');
    const summary = document.createElement('summary');
    const top = selected[0];
    summary.innerHTML = renderFoodSourceSummary(kind, top);
    summary.querySelectorAll('a').forEach((a) => a.addEventListener('click', (event) => event.stopPropagation()));
    box.append(summary);
    if (top) {
        const provenance = document.createElement('div');
        provenance.innerHTML = renderFoodSourceItem(top) + renderProvenance(top);
        box.append(provenance);
    }
    if (selected.length > 1) {
        const list = document.createElement('ul');
        selected.slice(1).forEach(source => {
            const item = document.createElement('li');
            item.innerHTML = renderFoodSourceItem(source) + renderProvenance(source);
            item.title = source.material || '';
            list.append(item);
        });
        box.append(list);
    }
    attachFoodDisclosureBehaviour(box);
    return box;
}
export function attachInputFoodDisclosure(li: HTMLLIElement, data: MappingData, pm: string, label: string, section: string) {
    section = canonicalInputSection(section);
    if (!data || !/^BRS[1-6]-/.test(pm) || !/^3\.1\.[123]$/.test(section))
        return;
    li.querySelectorAll('.pm-input-food-sources').forEach(el => el.remove());
    li.querySelectorAll('.food-target-info, .food-target-coverage-warning').forEach(el => el.remove());
    const scoped = selectBrsReviewData(data, generatedScopes, pm.split('-')[0]).data;
    const relationships = scoped.relationships.filter(r => r.pm === pm && (r.presentations || []).some((p: any) => norm(p.label) === norm(label) && p.section === section));
    if (!relationships.length)
        return;
    const precursorBundle = unresolvedButyratePrecursorCandidates(scoped.relationships, scoped.food_sources)
        .find((bundle: any) => relationships.some((r: any) => r.id === bundle.product_id || bundle.derived_ids.includes(r.id)));
    const precursorIsProduct = !!precursorBundle && relationships.some((r: any) => r.id === precursorBundle.product_id);
    if (section === '3.1.1' && relationships.some((r:any) => 'food_targets' in r)) {
        const warnings = [...new Set(relationships.flatMap((r:any) => r.coverage_warnings || []))];
        const detail = li.querySelector('.brs-dietary-lever-detail-inner');
        const inputRow = detail && [...detail.querySelectorAll('p')].find(p => p.querySelector('.brs-dietary-lever-detail-k')?.textContent === 'Input');
        const identity = relationships.find((r:any) => r.substance_page);
        if (inputRow && identity && !inputRow.querySelector('a')) inputRow.innerHTML = `<span class="brs-dietary-lever-detail-k">Input</span> = <a href="${esc(identity.substance_page)}">${esc(identity.input)}</a>`;

        if (warnings.length) {
            const icon = document.createElement('span'); icon.innerHTML = informationIcon(warnings.join(' '));
            li.querySelector('.brs-dietary-lever-trigger')?.after(icon.firstElementChild!);
            if (detail) detail.insertAdjacentHTML('afterbegin', renderCoverageWarning(warnings));
        }
        const targets = [...new Map(relationships.flatMap((r:any) => r.food_targets || []).map((f:any) => [JSON.stringify([f.food_id,f.substance_id,f.material,f.preparation]), f])).values()] as any[];
        for (const [kind, group] of [
            ['Plant-based', targets.filter(t => !isProbablyAnimalSource(t))],
            ['Animal-based', targets.filter(t => isProbablyAnimalSource(t))],
        ] as [string, any[]][]) {
            const box = document.createElement('details'); box.className = 'pm-input-food-sources';
            box.dataset.foodSourceKind = kind.toLowerCase();
            const summary = document.createElement('summary'); summary.innerHTML = `<span class="pm-input-food-source-arrow" aria-hidden="true">▶</span>${esc(kind)}`; box.append(summary);
            if (group.length) {
                const list = document.createElement('ul');
                group.forEach(target => { const item = document.createElement('li'); item.innerHTML = renderTarget(target); list.append(item); });
                box.append(list);
            } else {
                const empty = document.createElement('p'); empty.textContent = targets.length ? 'No supported food targets in this group.' : precursorIsProduct ? 'No approved butyrate-delivery targets.' : 'Food ontology coverage unresolved.'; box.append(empty);
            }
            attachFoodDisclosureBehaviour(box); li.append(box);
        }
        if (precursorBundle && !precursorIsProduct) li.insertAdjacentHTML('beforeend', renderUpstreamCandidates(precursorBundle));
        return;
    }

    const sources = scoped.food_sources.filter(f => relationships.some(r => r.substance_id === f.substance_id));
    const plantBox = createFoodSourceDetails('Plant-based', sources.filter(source => !isProbablyAnimalSource(source)));
    const animalBox = createFoodSourceDetails('Animal-based', sources.filter(source => isProbablyAnimalSource(source)));
    plantBox.dataset.relationshipIds = relationships.map(r => r.id).join(' ');
    li.append(plantBox);
    animalBox.dataset.relationshipIds = relationships.map(r => r.id).join(' ');
    li.append(animalBox);
    if (precursorBundle && !precursorIsProduct) li.insertAdjacentHTML('beforeend', renderUpstreamCandidates(precursorBundle));
}
