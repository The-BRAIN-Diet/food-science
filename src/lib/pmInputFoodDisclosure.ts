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
function strongestAmount(source: any): number {
    const values = (source.observations || [])
        .flatMap((o: any) => [o.high, o.low, o.value])
        .map((v: any) => Number(v))
        .filter(Number.isFinite);
    return values.length ? Math.max(...values) : -Infinity;
}
function formatFoodAmount(source: any): string {
    const obs = (source.observations || [])[0];
    if (!obs?.display) return 'quantity not established';
    const basis = String(obs.basis || '').trim();
    const per100g = /per\s*100\s*g/i.test(basis) || /per\s*100\s*g/i.test(String(obs.limitations || ''));
    return `${esc(obs.display)}${per100g || !basis ? ' per 100 g' : ` (${esc(basis)})`}`;
}
function formatFoodPrep(source: any): string {
    const preparation = String(source.preparation || '').trim().toLowerCase();
    if (preparation === 'uncooked') return 'raw';
    if (preparation === 'oil') return 'oil-packed';
    return esc(source.preparation || 'preparation not established');
}
function renderFoodSourceItem(source: any): string {
    const missingPreparation = !String(source.preparation || '').trim();
    const qualityAttrs = missingPreparation
        ? ` data-quality-flag="missing-preparation" data-food-source-id="${esc(source.id || '')}" data-food-id="${esc(source.food_id || '')}" data-substance-id="${esc(source.substance_id || '')}"`
        : '';
    const qualityClass = missingPreparation ? ' pm-input-food-source-meta--review' : '';
    return `<a href="${esc(source.food_page)}">${esc(source.food_title)}</a><span class="pm-input-food-source-meta${qualityClass}"${qualityAttrs}> — ${formatFoodAmount(source)} · ${formatFoodPrep(source)}</span>`;
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
function createFoodSourceDetails(kind: string, sources: any[]): HTMLDetailsElement {
    const selected = sources
        .sort((a, b) => strongestAmount(b) - strongestAmount(a) || String(a.food_title).localeCompare(String(b.food_title)))
        .slice(0, 5);
    const box = document.createElement('details');
    box.className = 'pm-input-food-sources';
    box.dataset.foodSourceKind = kind.toLowerCase().replace(/\s+/g, '-');
    const summary = document.createElement('summary');
    const top = selected[0];
    summary.innerHTML = top
        ? `<span class="pm-input-food-source-arrow" aria-hidden="true">▶</span><span class="pm-input-food-source-kind">${esc(kind)} -</span> ${renderFoodSourceItem(top)}`
        : `<span class="pm-input-food-source-arrow" aria-hidden="true">▶</span><span class="pm-input-food-source-kind">${esc(kind)} -</span> <span class="pm-input-food-source-empty">No verified sources yet</span>`;
    summary.querySelectorAll('a').forEach((a) => a.addEventListener('click', (event) => event.stopPropagation()));
    box.append(summary);
    if (selected.length > 1) {
        const list = document.createElement('ul');
        selected.slice(1).forEach(source => {
            const item = document.createElement('li');
            item.innerHTML = renderFoodSourceItem(source);
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
    const scoped = selectBrsReviewData(data, generatedScopes, pm.split('-')[0]).data;
    const relationships = scoped.relationships.filter(r => r.pm === pm && r.substance_id && (r.presentations || []).some((p: any) => norm(p.label) === norm(label) && p.section === section));
    if (!relationships.length)
        return;
    const sources = scoped.food_sources.filter(f => relationships.some(r => r.substance_id === f.substance_id));
    const plantBox = createFoodSourceDetails('Plant-based', sources.filter(source => !isProbablyAnimalSource(source)));
    const animalBox = createFoodSourceDetails('Animal-based', sources.filter(source => isProbablyAnimalSource(source)));
    plantBox.dataset.relationshipIds = relationships.map(r => r.id).join(' ');
    li.append(plantBox);
    animalBox.dataset.relationshipIds = relationships.map(r => r.id).join(' ');
    li.append(animalBox);
}
