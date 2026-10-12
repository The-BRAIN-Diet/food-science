import generatedScopes from "../data/inputMappingScopes.mjs";
import { selectQuantified, selectBrsReviewData } from "../data/inputSubstanceFoodSelection.mjs";
/** Read-only display of generated PM input joins; no hand-maintained food lists. */
export type MappingData = {
    pilot_pms: string[];
    relationships: any[];
    food_sources: any[];
    substances: any[];
};
const norm = (v: string) => String(v || '').toLowerCase().replace(/\s+/g, ' ').trim();
function esc(v: unknown) { return String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
export function attachInputFoodDisclosure(li: HTMLLIElement, data: MappingData, pm: string, label: string, section: string) {
    if (!data || !/^BRS[1-6]-/.test(pm) || !/^3\.1\.[123]$/.test(section))
        return;
    li.querySelector('.pm-input-food-sources')?.remove();
    const scoped = selectBrsReviewData(data, generatedScopes, pm.split('-')[0]).data;
    const relationships = scoped.relationships.filter(r => r.dietary_input === true && r.pm === pm && (r.presentations || []).some((p: any) => norm(p.label) === norm(label) && p.section === section));
    if (!relationships.length)
        return;
    const box = document.createElement('details');
    box.className = 'pm-input-food-sources';
    box.dataset.relationshipIds = relationships.map(r => r.id).join(' ');
    const summary = document.createElement('summary');
    summary.textContent = 'Food sources';
    box.append(summary);
    const sources = scoped.food_sources.filter(f => relationships.some(r => r.substance_id === f.substance_id));
    const selection = selectQuantified(sources), selected = selection.sources, ranked = selection.ranked;
    const other = selection.other_sources;
    const notes = document.createElement('p');
    notes.className = 'pm-input-food-qualification';
    const upstream = relationships.flatMap(r => r.upstream || []), pools = [...new Set(relationships.flatMap(r => r.pool_references || []))];
    notes.innerHTML = upstream.length ? `Upstream connection: ${upstream.map((u: any) => `<a href="${esc(u.href)}">${esc(u.relationship_label)} — ${esc(u.pm_id)}</a>`).join('; ')}.` : pools.length ? `Shared resource: ${pools.map(esc).join('; ')}. Constituent amounts are counted once.` : '';
    const targets = [...new Set(relationships.map(r => r.derived_target).filter(Boolean))];
    if (targets.length)
        notes.append(document.createTextNode(` Derived provision for ${targets.join('; ')}; quantities describe this dietary input.`));
    if (notes.textContent)
        box.append(notes);
    const row = (s: any) => { const item = document.createElement('li'), obs = s.observations || []; item.innerHTML = `<a href="${esc(s.food_page)}">${esc(s.food_title)}</a>${obs.length ? ' — ' + obs.map((o: any) => `${esc(o.display)}${/per\s*100\s*g/i.test(o.basis || '') ? ' per 100 g' : ' (' + esc(o.basis || 'basis not established') + ')'}${o.verified ? '' : ' (unverified amount)'}`).join('; ') : ' — quantity not established'}${s.preparation ? ' · ' + esc(s.preparation) : ' · preparation not established'}`; item.title = s.material || ''; return item; };
    if (selected.length) {
        const caption = document.createElement('p');
        caption.textContent = selection.qualification;
        box.append(caption);
        const list = document.createElement('ul');
        selected.slice(0, 3).forEach(s => list.append(row(s)));
        box.append(list);
        if (selected.length > 3) {
            const more = document.createElement('details'), s = document.createElement('summary');
            s.textContent = `Expand food list (${selected.length - 3} more)`;
            more.append(s);
            const list = document.createElement('ul');
            selected.slice(3).forEach(f => list.append(row(f)));
            more.append(list);
            box.append(more);
        }
    }
    if (other.length) {
        if (selected.length) {
            const heading = document.createElement('p');
            heading.textContent = `Other supported food sources (${other.length})`;
            box.append(heading);
        }
        const list = document.createElement('ul');
        other.forEach(f => list.append(row(f)));
        box.append(list);
    }
    if (!sources.length) {
        const note = document.createElement('p');
        note.textContent = relationships.some(r => r.identity_status === 'pool') ? 'This is a shared-pool reference. Food sources are shown under its admitted constituent inputs.' : relationships.some(r => r.input_type === 'dietary pattern') ? 'This is a meal-composition pattern. Candidate ingredient data are in the mapping review; no single-food equivalent or meal target is established.' : 'No supported food-source mapping is currently available for this input.';
        box.append(note);
    }
    li.append(box);
}
