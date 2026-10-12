/** Shared review/PM selection. No universal ranking across incompatible food states. */
export function selectQuantified(sources, max = 10) {
    const all = sources.flatMap(s => s.observations.filter(o => o.rank_eligible).map(o => ({ ...s, observations: [o] })));
    const groups = new Map();
    for (const s of all) {
        const key = s.observations[0].comparison_group;
        if (!groups.has(key))
            groups.set(key, []);
        groups.get(key).push(s);
    }
    // Deterministic default preview: largest comparable group, then lexical group ID.
    // This is a display choice, never a biological priority or quantitative target.
    const [group, quantified] = [...groups].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))[0] || [null, []];
    const overlaps = quantified.some((a, i) => quantified.slice(i + 1).some(b => { const x = a.observations[0], y = b.observations[0]; return (x.range || y.range) && x.low <= y.high && y.low <= x.high; }));
    const rank = !!group && !overlaps;
    quantified.sort(rank ? (a, b) => b.observations[0].low - a.observations[0].low : (a, b) => a.food_title.localeCompare(b.food_title) || a.material.localeCompare(b.material));
    const seen = new Set(), selected = quantified.filter(s => { if (seen.has(s.id))
        return false; seen.add(s.id); return true; }).slice(0, max);
    return { ranked: rank, comparison_group: group, qualification: group ? (rank ? 'Comparable per-100 g observations, descending amount.' : 'Comparable state, but overlapping values prevent a precise ranking.') + ` Preparation: ${group.split('::')[1]}; ${group.startsWith('dry::') ? 'dry-weight' : 'edible-portion'} basis. Other preparations remain accessible below.` : 'No comparable quantified group available.', sources: selected, other_sources: sources.filter(s => !s.observations.some(o => o.rank_eligible && o.comparison_group === group)) };
}

/** Qualified display ID; canonical PM and section identifiers remain unchanged. */
export function formatInputSectionId(relationship, section) {
    const pm = String(relationship.pm || '').match(/PM\d+$/)?.[0];
    const labels = {'1.1.1': 'Dietary Levers', '3.1.1': 'Dietary Levers', '1.1.2': 'Cofactors and Substrates', '3.1.2': 'Cofactors and Substrates', '1.1.3': 'Key Constraints / Upstream Resources', '3.1.3': 'Key Constraints / Upstream Resources'};
    return [relationship.brs, pm, section].filter(Boolean).join('-') + (labels[section] ? ' ' + labels[section] : '');
}
