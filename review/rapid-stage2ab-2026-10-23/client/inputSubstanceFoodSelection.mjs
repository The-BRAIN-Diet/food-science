export const PILOT_PMS = ['BRS1-FM1-PM1', 'BRS1-FM1-PM2', 'BRS1-FM1-PM3', 'BRS1-FM2-PM6', 'BRS1-FM3-PM7', 'BRS1-FM5-PM12'];
/** Shared review/PM selection. No universal ranking across incompatible food states. */
export function selectQuantified(sources, max = 10, preparation = 'all') {
    const eligible = sources.filter(s => preparation === 'all' || (s.preparation || 'unspecified') === preparation);
    const quantified = eligible.map(s => ({...s, observations:s.observations.filter(o => o.verified && /per\s*100\s*g/i.test(o.basis || '') && Number.isFinite(o.low) && Number.isFinite(o.high))})).filter(s => s.observations.length);
    const groups = [...new Set(quantified.flatMap(s => s.observations.map(o => o.comparison_group)))];
    const group = groups.length === 1 ? groups[0] : null;
    const observations = quantified.flatMap(s => s.observations);
    const overlaps = observations.some((x,i) => observations.slice(i+1).some(y => (x.range || y.range) && x.low <= y.high && y.low <= x.high));
    const rank = !!group && !overlaps && quantified.every(s => s.observations.length === 1);
    quantified.sort(rank ? (a,b) => b.observations[0].low-a.observations[0].low : (a,b) => a.food_title.localeCompare(b.food_title) || String(a.preparation).localeCompare(String(b.preparation)) || String(a.material).localeCompare(String(b.material)));
    const selected = quantified.slice(0,max);
    const quantifiedIds = new Set(quantified.map(s=>s.id));
    return {ranked:rank, comparison_group:group,
        qualification: quantified.length ? (rank ? 'Comparable per-100 g observations, descending amount.' : 'Verified per-100 g observations, listed alphabetically. Preparations and measurement bases remain distinct; no common nutritional ranking is implied.') : eligible.length && !eligible.some(s=>s.observations.length) ? 'Food sources identified; quantities not established.' : eligible.length ? 'Food sources identified; no verified comparable quantities available.' : 'No food-source mappings for this preparation.',
        sources:selected, other_sources:eligible.filter(s=>!quantifiedIds.has(s.id)), additional_quantified_sources:quantified.slice(max)};
}

/** Classification is relationship-owned; no global substance ownership is inferred. */
export function relationshipFilterCategory(r) {
    if (r.accounting === 'D') return 'upstream'; // Pool reference, never another nutrient.
    if (r.dietary_input !== true) return 'context';
    if (r.accounting === 'A') return 'owned';
    if (['B','C'].includes(r.accounting)) return 'upstream';
    return 'unresolved';
}
export function projectMappingReview(data, {owned=true, upstream=true, preparation='all'} = {}) {
    const selected = data.relationships.filter(r => {const c=relationshipFilterCategory(r); return c==='owned' ? owned : c==='upstream' ? upstream : false;});
    const context = data.relationships.filter(r=>['context','unresolved'].includes(relationshipFilterCategory(r)));
    const contextGroups = new Map();
    for (const r of context) {
        const key = r.substance_id || String(r.input).toLowerCase();
        if (!contextGroups.has(key)) contextGroups.set(key, {id:key,input:r.input,page:r.substance_page,substance_id:r.substance_id,relationships:[]});
        contextGroups.get(key).relationships.push(r);
    }
    const contextSubstances = [...contextGroups.values()];
    const dietary = selected.filter(r=>r.dietary_input===true && r.substance_id);
    const ids = new Set(dietary.map(r=>r.substance_id));
    const sources = data.food_sources.filter(f=>ids.has(f.substance_id) && (preparation==='all'||(f.preparation||'unspecified')===preparation));
    const pm = selected.flatMap(r=>{const foods=r.dietary_input===true?sources.filter(f=>f.substance_id===r.substance_id):[];return (foods.length?foods:[null]).map(food=>({...r,food}));});
    const substance = data.substances.filter(s=>ids.has(s.id)).map(s=>({...s,relationships:dietary.filter(r=>r.substance_id===s.id),selection:selectQuantified(sources.filter(f=>f.substance_id===s.id))}));
    const food = [...new Set(sources.map(f=>f.food_id))].map(id=>{const fs=sources.filter(f=>f.food_id===id),subs=[...new Set(fs.map(f=>f.substance_id))],rs=dietary.filter(r=>subs.includes(r.substance_id));return {id,title:fs[0].food_title,page:fs[0].food_page,sources:fs,substances:subs,relationships:rs,dietary_count:subs.length,pms:[...new Set(rs.map(r=>r.pm))],pools:[...new Set(rs.flatMap(r=>r.pool_references))]};});
    return {pm,substance,food,relationships:selected,context,contextSubstances,counts:{relationships:selected.length,substances:ids.size,foods:food.length,pools:new Set(selected.flatMap(r=>r.pool_references)).size}};
}

/** Qualified display ID; canonical PM and section identifiers remain unchanged. */
export function formatInputSectionId(relationship, section) {
    const pm = String(relationship.pm || '').match(/PM\d+$/)?.[0];
    const labels = {'1.1.1': 'Dietary Inputs & Regulatory Modulators', '3.1.1': 'Dietary Inputs & Regulatory Modulators', '1.1.2': 'Cofactors and Substrates', '3.1.2': 'Cofactors and Substrates', '1.1.3': 'Key Constraints / Upstream Resources', '3.1.3': 'Key Constraints / Upstream Resources'};
    return [relationship.brs, pm, section].filter(Boolean).join('-') + (labels[section] ? ' ' + labels[section] : '');
}

export function selectBrsReviewData(primary, generatedScopes, brs) {
    if (brs === 'all') {
        const scopes = [1,2,3,4,5,6].map(n=>selectBrsReviewData(primary,generatedScopes,`BRS${n}`)).filter(s=>s.available).map(s=>s.data);
        const unique = key => [...new Map(scopes.flatMap(s=>s[key] || []).map(row=>[row.id || row.pm_id || row.kc_id,row])).values()];
        return {available:scopes.length>0,data:{scope:'all',relationships:unique('relationships'),food_sources:unique('food_sources'),substances:unique('substances'),pools:unique('pools'),coverage:unique('coverage'),gaps:scopes.flatMap(s=>s.gaps || [])}};
    }
    const live = primary.scopes?.[brs] || (brs === 'BRS1' ? primary : null);
    const snapshot = generatedScopes[brs];
    const data = snapshot && (!live || (live.schema_version || 0) < snapshot.schema_version || (snapshot.source_revision || 0) > (live.source_revision || 0)) ? snapshot : live || snapshot;
    return { available: !!data, data: data || {scope:brs,relationships:[],food_sources:[],substances:[],pools:[],summary:{},coverage:[],gaps:[]} };
}

/** Visible numbering changes with lever prominence; joins use canonical sections. */
export function canonicalInputSection(section) {
    return String(section || '').replace(/^1\.1\.([123])$/, '3.1.$1');
}
