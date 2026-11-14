import fs from 'node:fs';import path from 'node:path';const dir=path.dirname(new URL(import.meta.url).pathname),d=JSON.parse(fs.readFileSync(path.join(dir,'food-network.json')));const save=(n,t)=>fs.writeFileSync(path.join(dir,n),t),esc=x=>String(x??'').replace(/\|/g,'/').replace(/\n/g,' '),name=s=>d.network.inventory.find(x=>x.id===s)?.name||s,food=id=>d.foods.find(f=>f.id===id)?.title||id;
let top='# Food-source shortlist — current ADHD exemplar\n\nUp to ten canonical foods per substance. Rank numbers apply **only within the named compatible group**, not across groups or preparations. Groups are interleaved deterministically to retain alternatives. Unranked entries have documented presence or qualified measurements but cannot be claimed as the highest-concentration sources. Proposed rows are not canonical admissions. All observations and provenance are retained in food-network.json.\n\n';for(const t of d.topSources){top+=`## ${name(t.substance)}\n\n${t.available_food_count} recorded direct/derived/proposed food pairs before shortlist selection.\n\n`;if(!t.sources.length){top+='No qualifying food mapping resolved. This is not evidence that no food occurrence exists.\n\n';continue;}top+='| Food | Rank and comparison | Amount / basis | State / qualification |\n|---|---|---|---|\n';for(const r of t.sources){const p=d.allFoodPairs.find(p=>p.id===r.pair_id),obs=r.observation||p.observations.find(o=>o.verified),proposal=p.proposals[0];top+=`|${food(r.food)}|${r.rank?'#'+r.rank+' · '+esc(r.comparison_group)+(r.observation?.proposed?' · PROPOSED':''):'Unranked · '+p.type}|${esc(r.quantity||obs&&obs.display+' / '+obs.basis||proposal&&(proposal.value??proposal.range?.join('–')??'presence only')+' '+(proposal.unit||'')+' / '+(proposal.basis||'')||'value not known')}|${esc(obs?.preparation||proposal?.preparation||r.selection)}${proposal?' — proposal also recorded':''}|\n`;}top+='\n';}save('TOP-FOODS.md',top);
save('MULTI-TARGET-FOODS.md','# Multi-target foods\n\nCounts use all existing eligible relationships for the selected foods, not only the relationships that selected each food into the shortlist. Direct and derived targets are separated. Food states can differ across targets: the count is not a single-serving profile. Proposed-only targets are excluded from the main count. BRS reach is indirect graph reach, not efficacy.\n\n|Food|Distinct targets|Direct|Derived|Additional proposed targets|BRS/BRS-X reach|\n|---|---:|---:|---:|---:|---:|\n'+d.foods.map(f=>`|${f.title}|${f.targets}|${f.direct_targets}|${f.derived_targets}|${f.proposed_targets}|${f.brs_reach}|`).join('\n'));
save('GAP-LEDGER.md','# Food-source gap research ledger\n\nEvery displayed substance is accounted for below. No canonical gap is silently marked closed. “Proposed” means research has supplied a local candidate record; author approval is outstanding. “Unresolved” includes insufficient analytical comparability or retrieval, not necessarily an absence of food occurrence. No fixed ten-source quota was used as a reason to manufacture records.\n\n|Substance|Original gap|Direct / numerical foods before|Evidence found|Proposed food mapping|Status|\n|---|---|---|---|---|---|\n'+d.gapLedger.map(g=>`|${name(g.substance)}|${g.original_gap}|${g.direct_foods_before} / ${g.quantified_foods_before}|${g.evidence_found.map(e=>e.source?'['+esc(e.finding)+']('+e.source+')':esc(e.finding)).join('<br>')||'Existing source records inspected; no new verified numerical backfill'}|${g.proposed_mappings.map(p=>food(p.food_id)+' — '+p.preparation).join('<br>')||'None'}|${g.status}|`).join('\n')+'\n\n## Weak or unresolved mappings\n\n'+d.gapLedger.filter(g=>!g.quantified_foods_before||/Unresolved|Partially/.test(g.status)).map(g=>'- **'+name(g.substance)+'**: '+g.status+'. '+g.remaining).join('\n'));
save('REPORT.md',`# Integrated BRAIN Food Chord Wheel — 6 November 2026

Local author-review artifact. No canonical food/substance edits, scientific admissions, PM changes, scores, commits or deployment.

## Integrated result

[Open local wheel](http://127.0.0.1:3160/food-wheel.html). The outer food ring connects by actual ribbons to the existing substance nodes, which retain all 121 original system connections. The original 3159 prototype is preserved. Canonical BRS colours and thin BRS-X/outer system arcs retained. No direct food–BRS ribbon, and no fourth strategy ring.

- ${d.foods.length} canonical foods selected from the per-substance shortlists.
- ${d.foodPairs.length} possible food–substance pairs: ${d.foodPairs.filter(p=>p.existing).length} existing direct/derived relationships and ${d.foodPairs.filter(p=>!p.existing).length} proposed-only pairs.
- ${d.network.inventory.filter(s=>s.inclusion==='included').length} substance nodes and ${d.network.connections.length} original substance–system pairs preserved.
- ${d.research.proposals.length} proposed records: 15 USDA amino-acid values, two skim-milk B3 values, cocoa epicatechin, pistachio CoQ10, oat phytate presence, and an explicitly approximate carnitine serving value. Some proposals improve existing pairs instead of adding new pairs.

## Before / after reconciliation

|Measure — full eligible food inventory, before shortlist|Existing records|Including proposals|
|---|---:|---:|
|Substances with direct food mapping|${d.counts.before.direct_substances}|${d.counts.after_proposals.direct_substances}|
|Substances with verified numerical observations / researched numerical proposals|${d.counts.before.quantified_substances}|${d.counts.after_proposals.quantified_substances}|
|Direct food–substance pairs|${d.counts.before.direct_pairs}|${d.counts.after_proposals.direct_pairs}|

Canonical backfills: **zero**, pending author approval. Numerical coverage includes non-comparable sample-specific concentrations; it does not mean that all 39 substances can be ranked globally. The carnitine estimate does not increase verified numerical coverage. The proposal checkbox changes displayed links; existing target-count labels remain fixed and proposed additions are shown separately.

## Ranking and counting

Existing mapper verification, comparison groups, preparation and unit restrictions are retained. Only comparable point values are ordered; ranges and qualified/non-comparable measurements remain unranked. Convertible g/mg/µg amounts share a mass basis only within the existing compatible group. No mg/L-to-mass conversion, arbitrary serving sizes, range midpoint invention or nutrient-efficacy scores.

Up to ten food identities are shortlisted for each substance. Where multiple groups exist, leading records are interleaved across groups; no global rank is implied. Presence-only/derived records fill remaining positions transparently and alphabetically, not as alleged “best” sources. [Source tables](TOP-FOODS.md) record every substance, including unresolved ones.

Selected foods expose **all** their eligible existing target connections, allowing useful multi-target exploration even when not top ten for each target. Counts deduplicate canonical food–substance pairs and aliases. Derived and direct targets are distinct in details. Collective SCFA and amino-acid-pool identities coexist with specific constituents; counts therefore describe ontology connectivity, not independent biochemical mechanisms or nutritional breadth.

## Research and limitations

[Full gap ledger](GAP-LEDGER.md), [multi-target table](MULTI-TARGET-FOODS.md), research.json and official USDA API snapshots in research-sources/. Source access is explicit; unavailable primary tables were not treated as verified. The mapped raw beef, eggs, chicken, salmon and soy entries match USDA IDs exactly. Raw composition is not converted into cooked-serving delivery.

The primary milk study distinguishes nicotinamide/NR from undetected NAD+/nicotinic acid. USDA phosphatidylcholine-associated choline is not relabelled as phosphatidylcholine molecular mass. Hydrolysis-derived glutamate is not substituted for glutamine. The pistachio range is six samples, not a universal value. Original food estimates remain estimates.

Serving delivery is mostly unavailable in existing structured records; the UI states this explicitly. The NIH cooked-steak carnitine serving is a separately labelled estimate. More serving metadata, and full primary analytical retrieval for several specialised compounds, remain open. The source tables are best-supported candidates in the current verified inventory, **not an exhaustive global ranking of all foods**.

Canonical proposals remain separate from accepted records. Generic healthy-food relevance never creates an edge. Complete PM-scoped conversion chains may create qualified derived food links, but downstream quantity is never inherited. Urolithin food-equivalence is not invented where a structured conversion mapping is absent. Existing CoQ source-specific observations are retained even when the mapper does not mark them rankable.

## Reproduction and files

Run data.mjs, build.mjs, report.mjs and validate.mjs in this directory from the repository root. source-materials.json is the read-only snapshot from the existing seven-scope mapper; source hashes are inherited from the validated substance network. New files are confined to this review directory plus its handoff. The separate localhost checkout remains a labelled supplemental source for acetic acid, as in the original network.

Screenshots and browser checks are recorded in browser-validation.json. No production build is needed for this standalone review HTML/SVG.
`);
console.log('Reports written');
