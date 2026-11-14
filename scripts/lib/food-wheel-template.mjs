// The layout is shared, but composition-only nodes belong to the unranked view.
// No identity, scientific category, food relationship or ranking is inferred here.
export function templateForFoodWheelView(data, base, {view = 'combined'} = {}) {
 if (!['ranked','combined'].includes(view)) throw Error('Unknown Food Wheel view: '+view);
 const inventory = new Map(data.network.inventory.map(s => [s.id,s]));
 const entities = /<g\b[^>]*class="entity"[^>]*>[\s\S]*?<\/g>/g;
 const idOf = g => g.match(/data-substance="([^"]+)"/)?.[1];
 const pairs = data.foodPairs || [];
 const required = new Set(pairs.map(p => p.substance));
 for (const e of data.canonicalNetworks?.topFive?.selections || []) required.add(e.substance_id);
 for (const e of data.displaySelections || []) required.add(e.substance_id);
 let projected = base;
 if (view === 'ranked') projected = base.replace(entities, g => {
  const id=idOf(g);
  return g.includes('data-food-wheel-layer="documented-unranked"') && !inventory.has(id) && !required.has(id) ? '' : g;
 });
 const ids = [...projected.matchAll(entities)].map(m => idOf(m[0]));
 const missing = [...new Set([...ids,...required].filter(id => !inventory.has(id)))].sort();
 if (missing.length) throw Error(`Food Wheel ${view} template/inventory mismatch: missing inventory IDs: ${missing.join(', ')}`);
 const categories = ids.filter(id => !inventory.get(id).category);
 if (categories.length) throw Error(`Food Wheel ${view} inventory lacks existing category metadata for IDs: ${categories.join(', ')}`);
 const positions = [...required].filter(id => !ids.includes(id));
 if (positions.length) throw Error(`Food Wheel ${view} template lacks positions for IDs: ${positions.sort().join(', ')}`);
 return projected;
}
