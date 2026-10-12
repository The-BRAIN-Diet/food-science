import { formatInputSectionId } from '../src/data/inputSubstanceFoodSelection.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { buildInputSubstanceFood, amountDisplay } from './lib/input-substance-food.mjs';
const root = process.cwd(), data = buildInputSubstanceFood(root), dir = path.join(root, 'system/generated/brs1-input-substance-food');
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'mapping.generated.json'), JSON.stringify({ ...data, views: undefined, substances: data.substances.map(({ food_sources, selection, ...s }) => ({ ...s, food_source_ids: food_sources.map(f => f.id), selection: { ranked: selection.ranked, qualification: selection.qualification, comparison_group: selection.comparison_group, source_ids: selection.sources.map(f => f.id) } })), rows: data.rows.map(r => ({ row_id: r.row_id, relationship_id: r.id, food_source_id: r.food?.id || null })) }, null, 2) + '\n');
const columns = ['BRS', 'FM', 'PM', 'Section ID', 'Input', 'Relationship type', 'Biological role', 'Dietary input', 'Accounting designation', 'Upstream PM / pool / KC', 'Substance ID + page', 'Food ID + page', 'Amount/range per 100 g', 'Source-record reference', 'Qualification'];
const cell = v => String(v ?? '').replace(/\|/g, ' / ').replace(/\r?\n/g, ' '), csv = v => '"' + String(v ?? '').replace(/"/g, '""') + '"';
const lines = data.rows.map(r => [r.brs, r.fm, r.pm, [...new Set(r.presentations.map(p => formatInputSectionId(r, p.section)))].join("; "), r.input, JSON.stringify(r.relationship_type), r.biological_role, r.dietary_input === true ? 'Yes' : r.dietary_input === false ? 'No' : 'Unset', r.accounting + ' — ' + r.accounting_label, [...r.upstream.map(x => x.pm_id), ...r.pool_references, ...r.members.map(x => x.ikc_id || x.constituent_id)].filter(Boolean).join('; '), [r.substance_id, r.substance_page].filter(Boolean).join(' — '), r.food ? [r.food.food_id, r.food.food_page].join(' — ') : '', r.food?.observations.filter(o => /per\s*100\s*g/i.test(o.basis || '')).map(o => o.display + (o.verified ? '' : ' (unverified; excluded from ranking)')).join('; ') || 'Not established', [r.source_record, ...(r.food?.observations || []).map(o => o.record), ...(r.food?.presence_records || []).map(o => o.record)].join('; '), [r.qualification, r.gap, ...(r.food?.qualification || [])].filter(Boolean).join(' ')]);
fs.writeFileSync(path.join(dir, 'input-to-substance-to-food.csv'), [columns, ...lines].map(row => row.map(csv).join(',')).join('\n') + '\n');
fs.writeFileSync(path.join(dir, 'input-to-substance-to-food.md'), '# Input to Substance to Food — BRS1\n\nGenerated; do not edit. Run `npm run mappings:brs1`. Source pointers, evidence and source-specific composition observations are retained in `mapping.generated.json`.\n\n| ' + columns.join(' | ') + ' |\n| ' + columns.map(() => '---').join(' | ') + ' |\n' + lines.map(row => '| ' + row.map(cell).join(' | ') + ' |').join('\n') + '\n');
fs.writeFileSync(path.join(dir, 'inventory.md'), '# Accepted BRS1 input inventory\n\nGenerated from structured PM/KC records; excludes SOPs, lifestyle, tags and narrative admission.\n\n| Relationship ID | PM | Input | Accounting | Substance | Upstream / pool | Qualification |\n| --- | --- | --- | --- | --- | --- | --- |\n' + data.relationships.map(r => '| ' + [r.id, r.pm, r.input, r.accounting + ' ' + r.accounting_label, r.substance_id || r.identity_status, [...r.upstream.map(x => x.pm_id), ...r.pool_references].join('; '), r.qualification].map(cell).join(' | ') + ' |').join('\n') + '\n');
const foodLink = f => `[${f.food_title}](http://localhost:3000${f.food_page})`;
const foodAmounts = f => f.observations.length ? f.observations.map(o => `${o.display} (${o.basis || 'basis unknown'}${o.verified ? '' : '; unverified amount'})`).join('; ') : 'Quantity not established';
let substanceIndex = '# Unique substance → mapped foods\n\n[Open the equivalent web page](http://localhost:3000/docs/system/brs1-substance-index).\n\nGenerated from the same authoritative records as the PM disclosures. The preview includes up to ten comparable quantified sources; all supported sources remain in the expandable tables below. Food quantities are composition observations, not requirement coverage.\n\n| Section ID | Substance ID + page | Dietary accounting | Quantified food preview | Other supported food sources |\n| --- | --- | --- | --- | --- |\n';
for (const s of data.substances) {
 const identity = s.page ? `[${s.title}](http://localhost:3000${s.page}) — ${s.id}` : `${s.id} — missing page`;
 const preview = s.selection.sources.map(f => `${foodLink(f)} — ${foodAmounts(f)} · ${f.preparation || 'preparation unknown'}`).join('<br/>') || 'No comparable quantified food sources';
 const others = s.selection.other_sources.map(f => `${foodLink(f)} — ${foodAmounts(f)} · ${f.preparation || 'preparation unknown'}`).join('<br/>') || 'None recorded';
 substanceIndex += '| ' + [ [...new Set(data.relationships.filter(r=>r.substance_id===s.id).flatMap(r=>r.presentations.map(p=>`[${r.pm}](http://localhost:3000${r.pm_page}) — ${p.section} ${formatInputSectionId(r,p.section).split(p.section+' ')[1] || ''}`)))].join('<br/>') || 'Not recorded', identity, s.dietary_accounted ? 'Dietary substance' : 'Biochemical context only', preview, others].map(cell).join(' | ') + ' |\n';
}
for (const s of data.substances) {
 substanceIndex += `\n## ${s.title} — ${s.id}\n\n${s.selection.qualification}\n\n<details>\n<summary>All mapped food sources (${s.food_sources.length})</summary>\n\n`;
 if (!s.food_sources.length) substanceIndex += 'No eligible dietary food list is generated. Check the PM dietary-input decision separately from sourcing coverage.\n';
 else {
  substanceIndex += '| Food + page | Material / preparation | Amount and measurement basis | Source-record reference |\n| --- | --- | --- | --- |\n';
  for (const f of s.food_sources) substanceIndex += '| ' + [foodLink(f), [f.material, f.preparation].filter(Boolean).join(' — ') || 'Not established', foodAmounts(f), [...f.observations.map(o => o.record), ...f.presence_records.map(o => o.record)].join('; ')].map(cell).join(' | ') + ' |\n';
 }
 substanceIndex += '\n</details>\n';
}
fs.writeFileSync(path.join(dir, 'substance-index.md'), substanceIndex);
fs.writeFileSync(path.join(dir, 'food-to-inputs.md'), '# Food → distinct inputs → biological reach\n\nGenerated from all eligible links, not top-ten selections. Connection counts are not dietary priorities or amount multipliers.\n\n| Food | Unique dietary input coverage | Substance IDs | Connected PMs | Shared pools |\n| --- | --- | --- | --- | --- |\n' + data.foods.map(f => '| ' + [f.title, f.unique_input_coverage, f.substance_ids.join('; '), f.connected_pms.join('; '), f.shared_pools.join('; ')].map(cell).join(' | ') + ' |').join('\n') + '\n');
fs.writeFileSync(path.join(dir, 'gaps.generated.json'), JSON.stringify({ gaps: data.gaps, conflicts: data.conflicts, pm_coverage: data.coverage, pools: data.pools }, null, 2) + '\n');
console.log(JSON.stringify(data.summary, null, 2));

fs.writeFileSync(path.join(dir,'pattern-candidates.generated.json'),JSON.stringify(data.pattern_candidates,null,2)+'\n');

fs.writeFileSync(path.join(dir, "dietary-input-decisions.json"), JSON.stringify(data.relationships.map(r => ({relationship_id:r.id, source_record:r.source_record, input:r.input, dietary_input:r.dietary_input, note:r.dietary_input_note, flags:r.dietary_input_flags || []})), null, 2) + "\n");
