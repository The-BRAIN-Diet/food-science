import fs from 'node:fs';import cp from 'node:child_process';import matter from 'gray-matter';
const dir='review/brs1-analytical-rollup-2026-11-16',read=f=>JSON.parse(fs.readFileSync(dir+'/'+f));const a=read('analysis.json'),b=read('before-corrections-analysis.json'),source=read('usda-exact-source-extract.json'),corrections=read('source-corrections.json'),old=read('superseded-score-extract.json'),validation=read('validation.json');const f=x=>Number(x).toFixed(4),ids='anchovies beef chicken chicken-liver cod dark-meat-poultry heart herring kidney lamb liver lumpfish-roe mackerel pork salmon salmon-roe sardines trout-roe tuna turkey egg-yolks'.split(' '),audit=[];
const nutrientIDs={'tyrosine':'1218','tryptophan':'1210','phenylalanine':'1217','iron':'1089','magnesium':'1090','copper':'1098','potassium':'1092','sodium':'1093','choline':'1180','vitamin-b2':'1166','vitamin-b5':'1170','vitamin-b6':'1175','vitamin-b9':'1177','vitamin-c':'1162','dha-docosahexaenoic-acid':'1272','betaine':'1198'};
for(const id of ids){const file='docs/foods/'+id+'.md',d=matter(fs.readFileSync(file,'utf8')).data,prior=matter(cp.execFileSync('git',['show','HEAD:'+file],{encoding:'utf8'})).data;for(const sub of a.pools.map(p=>p.substance_id)){const bef=b.qualified_source_records.filter(s=>s.food_id===id&&s.substance_id===sub),aft=a.qualified_source_records.filter(s=>s.food_id===id&&s.substance_id===sub),nd=source.nutrients[d.nutrition_source?.fdc_id]?.[nutrientIDs[sub]];
const exactProfiles=(d.nutrition_amino_acid_profiles||[]),profileBefore=prior.nutrition_amino_acid_profiles||[];
const sameMaterial=s=>s.material?.toLowerCase()===d.nutrition_source?.food_name?.toLowerCase();
const completeExact=sub==='indispensable-amino-acids'&&['1210','1211','1212','1213','1214','1215','1217','1219','1221'].every(k=>Number(source.nutrients[d.nutrition_source?.fdc_id]?.[k]?.amount)>0);
const status=bef.filter(sameMaterial).some(s=>s.observations.length)?'supported values present and mapped':(nd||completeExact)?'missing locally; available in exact cited source':bef.length?'qualitative occurrence; quantity unresolved':'unresolved or unavailable';
audit.push({food_id:id,substance_id:sub,source_file:file,exact_panel_material:d.nutrition_source?.food_name??null,fdc_id:d.nutrition_source?.fdc_id??null,before_status:status,after_status:aft.filter(sameMaterial).some(s=>s.observations.length)?'supported values mapped in fresh analytical builder':aft.length?'qualitative only':'unresolved or unavailable',exact_source_row:nd??null,source_before:bef.map(s=>({id:s.id,observations:s.observations.map(o=>({record:o.record,value:o.value,unit:o.unit,material:o.material,preparation:o.preparation}))})),source_after:aft.map(s=>({id:s.id,observations:s.observations.map(o=>({record:o.record,value:o.value,unit:o.unit,material:o.material,preparation:o.preparation}))})),profile_count_before:profileBefore.length,profile_count_after:exactProfiles.length,missing_profile_values:sub==='indispensable-amino-acids'&&!exactProfiles.length?'No exact complete nine-EAA profile locally; no qualitative-to-quantitative inference':null});}}
// Identify present profiles that default site extraction does not map; the analytical opt-in is explicit.
const defaultProjectionGaps=corrections.flatMap(c=>c.edits.filter(e=>e.profile).map(e=>({food_id:c.food_id,profile_id:e.profile.id,status:'supported values now present; analytical mapping enabled; default site mapping deferred',reason:'Default profile validator requires household-portion metadata. No portion data or public regeneration authorised.',source_file:c.file})));
fs.writeFileSync(dir+'/completeness.json',JSON.stringify({audit,defaultProjectionGaps},null,2)+'\n');
const allFoods=[...new Set(a.qualified_source_records.filter(s=>a.pools.some(p=>p.substance_id===s.substance_id)).map(s=>s.food_id))].sort();const zeros=Object.fromEntries(Object.entries(a.rankings).map(([k,rs])=>[k,allFoods.filter(id=>!rs.some(r=>r.food_id===id)).map(food_id=>({food_id,rank:null,score:0,meaning:'No retained scored connection; not measured zero composition or biological absence'}))]));
const differences=Object.fromEntries(Object.entries(a.rankings).map(([view,rs])=>[view,rs.map(r=>{const prev=b.rankings[view].find(x=>x.food_id===r.food_id),prevPm=old.rows.find(x=>x['food ID']===r.food_id&&x.scope===(view==='PM-owned'?'PM-owned':view==='upstream-shared'?'Upstream/shared':''));return {food_id:r.food_id,rank:r.rank,score:r.score,before_correction_score:prev?.score??null,before_correction_rank:prev?.rank??null,source_correction_delta:prev?r.score-prev.score:null,superseded_pm_score:prevPm?Number(prevPm['score after']):null,superseded_pm_rank:prevPm?.['rank after']||null,warning:'Old capped PM-max scores are a different metric, not a measure of improvement'};})]));
const combined=a.rankings.combined,total=combined.reduce((s,r)=>s+r.score,0);const distribution=combined.map((r,i)=>({food_id:r.food_id,rank:r.rank,score:r.score,percent_of_leader:100*r.score/combined[0].score,drop_to_next:i+1<combined.length?r.score-combined[i+1].score:null,cumulative_score_share:100*combined.slice(0,i+1).reduce((s,x)=>s+x.score,0)/total,cumulative_pms:[...new Set(combined.slice(0,i+1).flatMap(x=>x.pm_ids))].sort(),cumulative_inputs:[...new Set(combined.slice(0,i+1).flatMap(x=>x.groups.map(g=>g.input)))].sort()}));
fs.writeFileSync(dir+'/comparisons.json',JSON.stringify({zeros,differences,distribution},null,2)+'\n');
let report=`# BRS1 analytical source strength and coverage — peer-review working report

**Local provisional analysis, 16 November 2026.** These scores describe relative source concentration and documented biological connectivity, not overall food quality, adequacy, safety, recommended consumption or efficacy. No final presentation cutoff is adopted.

## Pinned inputs and reproducibility

- Checkout: \`${a.snapshot.checkout}\`.
- Branch: \`${a.snapshot.branch}\`; source commit: \`${a.snapshot.commit}\`.
- Intake working tree: only the pre-existing untracked meat/fish holding-page directory. Current working state and all input hashes: [analysis.json](analysis.json), \`snapshot\`.
- Analytical input hash: \`${a.snapshot.input_hash}\`.
- Frozen site snapshot identifier: \`${a.snapshot.frozen_snapshot_id}\` — not changed or used as capped analytical input.
- Exact USDA SR Legacy archive SHA-256: \`${source.archive.sha256}\`. [Source archive](${source.archive.url}); targeted extracted rows, exact descriptions, units and nutrient-row IDs: [usda-exact-source-extract.json](usda-exact-source-extract.json).
- Run from checkout: \`node ${dir}/run.mjs\`, then \`node ${dir}/validate.mjs\`, then \`node ${dir}/report.mjs\`. These write only this review directory. \`--before\` uses the preserved pre-correction map for comparison, not current scoring. No site generation/build is invoked.

## Rules and interpretation

The live \`buildInputSubstanceFood\` builder extracts BRS1 canonical composition and relationships. \`selectRankedFoodSources\` supplies existing qualification/comparability and RSP calculation; the analysis requests \`Number.MAX_SAFE_INTEGER\` and \`retainFoodForms:true\`, **not** \`targets[].selected\`. The core formula in \`src/data/relatedSubstanceRelationships.mjs::relativeSourcePower\` remains **100 × observation concentration / highest eligible concentration within its comparable pool**. The scorer's two-distinct-food requirement, reference-product restrictions, conflicting-observation exclusions and incompatible-pool holds remain enabled. All qualifying RSPs at least 20 enter without a food-count cap. The scorer's below-10 records are excluded before the stricter 20 test; their quantities and reasons remain in the source export.

[config.v1.json](config.v1.json) specifies the provisional convention. For each food and view, **score = sum over distinct scoring inputs of (eligible RSP / 100)**. The protein/amino-acid group uses the highest qualifying EAA aggregate, tyrosine, tryptophan or phenylalanine RSP once. All components remain in the export, including non-winning components. This grouping is not biochemical equivalence. Repeated PM references add coverage, not supply points. Combined deduplicates across ownership before scoring; it does not add the other scores. Source-strength and system-coverage scores are identical in this BRS1-only analysis; only a future multi-system aggregation could distinguish them.

Explicit assessment and valid historical fingerprints are recorded per relationship. Two PM2 supply references follow their admitted PM1 owners; PM6 folate follows its established KC relationship/admitted constituent. Neither becomes a new PM-owned admission. There are ${a.counts.pms} current BRS1 PMs, ${a.counts.eligible} eligible relationship records and ${a.counts.substances} resolved dietary inputs before sodium/rankability exclusions. Full excluded relationships and reasons are in \`admissions\`.

Sodium remains scientifically admitted and compositionally intact but contributes no analytical points. Other active forms are not silently merged: PLP, FAD, BH4 and acetyl-CoA are endogenous/unset dependencies, outside the eligible score. Phosphatidylcholine-to-choline is a documented supply relationship, but phosphatidylcholine has no qualifying RSP, so it adds no independent points. No new equivalence rule was installed. Uridine also remains unscored. Same-input incompatible qualifying pools would be unresolved rather than maximised; none survives qualification here. Different EAA/precursor pool scales are compared only under the expressly provisional amino-acid grouping.

Existing ranking rules permit compatible ordinary edible-weight preparations to compete; they do not make raw, cooked, dried or drained materials interchangeable servings. Exact observations remain separate. A food-ID result spanning different materials is labelled **composite**; identical material with canned/canned-drained label variants is one material, with both labels retained in detail. No serving analysis is performed.

**Publication:** owner approved including local corrections in this unpublished analysis with publication pins pending. Fourteen listed food files now differ from their approved pins; the manifest and site snapshot remain untouched. Unlisted foods remain excluded. \`strict_pin_matched_row_sensitivity\` removes pending rows but retains the same reference denominators—it is explicitly a row-removal sensitivity, not a newly approved publication ranking. This report itself is not publication approval.

## Coverage and extraction counts

| View | Positive-score foods | Distinct PMs reached | Distinct scoring inputs |
|---|---:|---:|---:|
`;
for(const [v,rs]of Object.entries(a.rankings))report+=`| ${v} | ${rs.length} | ${new Set(rs.flatMap(r=>r.pm_ids)).size} | ${new Set(rs.flatMap(r=>r.groups.map(g=>g.input))).size} |\n`;
report+=`\n| Target input | Candidate source records | Observations before scoring | Scored food/forms ≥10 | Food/forms ≥20, uncapped |
|---|---:|---:|---:|---:|
`;
for(const p of a.pools)report+=`| ${p.substance_id} | ${p.source_count} | ${p.observation_count} | ${p.scored_at_least_10} | ${p.retained_at_least_20} |\n`;
report+=`\n${a.counts.component_rows} qualifying food/form–relationship rows before sodium removal; ${a.counts.after_sodium} after. Repeated relationship references are retained as evidence, not additional supply points. Full source pools, exclusion reasons, unscored observations and admission provenance are in [analysis.json](analysis.json). Zero-score food IDs have no positive rank and are listed separately in [comparisons.json](comparisons.json); zero score is not zero nutrient content.

## Composition completeness and corrections

The audit covers the 20 meat/finfish/offal/roe identities already inventoried plus egg yolks, against all 19 BRS1 inputs: ${audit.length} food/input checks. [completeness.json](completeness.json) distinguishes existing mapped values, exact-source recoveries and unresolved quantities, with form-specific source pointers. It also explicitly lists supported profiles not available through default site projections.

- Added **14 exact-material nine-EAA profiles / 126 source values**, without changing prior profiles. The supplied protein values, FDC identity, nutrient-row provenance and source derivation codes are retained. No category estimates or amino-acid values inferred from protein.
- Added **chicken-liver tyrosine 0.653 g/100 g**, matching its raw panel FDC 171060.
- Added eight missing exact-panel betaine observations: beef 8.1, chicken 7.8, raw chicken liver 16.9, lamb 10.2, beef liver 4.4, pork 3.2, salmon 3.0 and egg yolk 0.9 mg/100 g. Pan-fried chicken-liver betaine **21 mg/100 g remains separate and unchanged**. These additions do not meet the current ≥20 threshold and create no new scored connections.
- Herring FDC 175116: tryptophan **0.201**, phenylalanine **0.701 g/100 g**, complete exact nine-EAA profile; existing tyrosine **0.606** retained. These are database values, not asserted independent assays.
- Beef: raw FDC 171796 and cooked FDC 174032 both contain **0.094 g tryptophan/100 g in the retrieved archive**. Existing cooked record preserved; raw profile recovered with the discrepancy explicit. This is not an authoritative correction to 0.200 or 0.250. Its RSP remains below 20; no substitute cut or protein denominator was used.
- Heart/kidney exact cited USDA records lack the required amino-acid rows. Roe and grouped poultry have unresolved or non-USDA identities; no proxy or species transfer added. Salmon-roe MEXT amino-acid recovery remains unverified in this bounded pass.
- Existing profile validation requires household-portion metadata for public projection. To respect this task's no-portions boundary, new profiles carry no portion. An explicit **analysisCompositionOnly** option validates their per-100-g identity/provenance and omits portion calculations; default site requirements remain unchanged. This is not a public schema migration.

Every correction is listed in [source-corrections.json](source-corrections.json). No existing values, page prose, PM admissions or scientific ratings were rewritten. The [holding page](../meat-fish-amino-acid-reference-2026-11-16/holding-page.md) retains the original inventory and a dated update.

## Requested food explanations

| Food | Combined rank | Score | PMs reached | Explanation |
|---|---:|---:|---:|---|
`;
const explanations={beef:'Only the amino-acid group qualifies. EAA wins; tyrosine and phenylalanine remain visible. Both raw and cooked source forms retained; tryptophan fails ≥20. Composite, not one serving.',herring:'Recovered exact raw profile now contributes EAA/precursors; DHA is a separate scored input. No invented missing data.',turkey:'Amino-acid group plus B6. Raw and cooked profiles remain distinct; PM repetition no longer multiplies B6. Composite.',sardines:'EAA/precursor group plus DHA. Canned, oil-drained, bone-in material; preparation-label variants are not separate foods.','egg-yolks':'Choline, amino-acid group, B5 and folate contribute independently. B5 remains visible; whole eggs are not substituted.',sage:'Ground sage retains high per-100-g B6, magnesium, potassium, iron and folate. No serving inference; spice treatment deferred.',liver:'Raw beef liver supplies seven qualifying groups. Repeated B2/B6 PM links count once. It is separate from chicken liver.','bell-peppers':'Raw red peppers qualify through vitamin C only. PM count does not multiply this contribution.',miso:'Sodium is its only ≥20 input in these source pools, so excluded here; potassium is below 20. No amino-acid profile borrowed from soybeans.'};
for(const id of Object.keys(explanations)){let r=combined.find(x=>x.food_id===id);report+=`| ${id} | ${r?.rank??'—'} | ${f(r?.score??0)} | ${r?.pm_count??0} | ${explanations[id]} |\n`;}
report+=`\n## Differences from superseded calculations

The former capped PM-max score rewarded repeated PM connections and omitted beyond-cap sources. It is superseded, not numerically interchangeable with this distinct-input score. [comparisons.json](comparisons.json) contains every food's old score/rank where available, the uncapped pre-correction baseline under the **new** rule, and the final corrected result. ${b.counts.component_rows} → ${a.counts.component_rows} qualifying rows; ${b.counts.after_sodium} → ${a.counts.after_sodium} after sodium exclusion. There are no changed RSPs among matching original component rows; corrections add source observations rather than tune existing scores. Source correction deltas should not be confused with the larger change of scoring convention.

## Distribution and candidate presentation cutoffs — not adopted

Combined positive-score range: ${f(combined.at(-1).score)}–${f(combined[0].score)}; total ${f(total)} descriptive source-strength points. Full adjacent drops, percentage of leader, cumulative score share and cumulative distinct PM/input coverage are exported in [comparisons.json](comparisons.json). These are connectivity descriptors, not fractions of biological benefit.

| Candidate display choice only | Foods | Cumulative score share | PMs represented | Inputs represented |
|---|---:|---:|---:|---:|
`;
for(const n of [10,20,30,combined.length]){let d=distribution[n-1];report+=`| First ${n} by provisional score | ${n} | ${f(d.cumulative_score_share)}% | ${d.cumulative_pms.length} | ${d.cumulative_inputs.length} |\n`;}
for(const cutoff of [1,2]){let rs=combined.filter(r=>r.score>=cutoff);report+=`| Score ≥${cutoff} | ${rs.length} | ${f(100*rs.reduce((s,r)=>s+r.score,0)/total)}% | ${new Set(rs.flatMap(r=>r.pm_ids)).size} | ${new Set(rs.flatMap(r=>r.groups.map(g=>g.input))).size} |\n`;}
report+='\n## Full rankings and component arithmetic\n\nAll positive-score foods are shown; none is removed by a final cutoff. Scores here are rounded to four decimals only; JSON retains full precision. Each term is one group contribution. **Composite** flags multiple material descriptions. Every winning source row and non-winning component RSP is retained in `rankings.*.groups` and `rows` in the data export.\n';
for(const [view,rs]of Object.entries(a.rankings)){report+=`\n### ${view}\n\n| Rank | Food ID | Source strength = system coverage | PMs | Inputs | Arithmetic (RSP ÷100 per group) | Form status |\n|---:|---|---:|---:|---:|---|---|\n`;for(const r of rs)report+=`| ${r.rank} | ${r.food_id} | ${f(r.score)} | ${r.pm_count} | ${r.scoring_input_count} | ${r.groups.map(g=>g.input+': '+f(g.points)).join(' + ')} | ${r.composite_profile?'Composite':'Single recorded material'} |\n`;}
report+='\n### All qualifying components — combined view\n\n★ marks a winning component of its scoring group; all other qualifying components remain visible. Repeated PM references are collapsed only in this display. Different RSPs for one substance reflect distinct retained observations; exact forms and pointers are in the data export. Sodium is listed separately and contributes no points.\n\n| Food | Qualifying non-sodium substance RSPs |\n|---|---|\n';
for(const food of combined){const rs=a.rows.filter(r=>r.food_id===food.food_id&&!r.analytically_excluded);const winning=new Set(food.groups.flatMap(g=>g.winner_rows||[]));const by=new Map();for(const r of rs){const key=r.substance_id+'|'+r.rsp;const prev=by.get(key);by.set(key,{sub:r.substance_id,rsp:r.rsp,win:winning.has(r.row_id)||prev?.win});}report+=`| ${food.food_id} | ${[...by.values()].sort((a,b)=>a.sub.localeCompare(b.sub)||b.rsp-a.rsp).map(x=>(x.win?'★ ':'')+x.sub+' '+f(x.rsp)+'%').join('; ')} |\n`;}
report+='\nSodium-only positive candidate removed from points: **miso**. Other retained sodium candidates are anchovies, capers, parmesan cheese, spirulina, salmon roe and vinegar pickles; their non-sodium inputs determine their score. Sodium records/admissions remain unchanged.\n';
report+='\n## Validation and remaining limitations\n\n| Check | Status | Evidence |\n|---|---|---|\n';for(const v of validation)report+=`| ${v.name} | ${v.status} | ${v.evidence.replaceAll('|','/')} |\n`;
report+=`| Existing regression suites | FAIL — reproduced baseline limitations | 12/17 pass; one missing dietary-connectivity fixture and four historical foodless-target expectations fail identically with pre-change food records. See logs. No assertions or scientific records changed to pass. |
| Independent analytical validation | PASS | Separate direct aggregation plus independent pre-cap qualification; all food/view scores and ranks reconciled. |
| Publication of corrections | NOT VERIFIED / pending | Fourteen food publication pins deliberately unchanged; no release approval inferred. |
| Serving relevance, safety and efficacy | NOT VERIFIED / outside scope | No serving quantities, intake targets, optimisation, safety engine or clinical conclusions. |

Existing-test failures: missing \`review/dietary-connectivity-2026-11-09/substance-matrix.json\`; obsolete glutamine zero-observation expectation; 51-versus-58 identity count; mitochondrial hub historical hash; PM1 historical exception expected-error mismatch. [Current log](existing-suite-results.txt) and [pre-change-food baseline log](baseline-suite-results.txt). Baseline check substitutes HEAD food bytes in memory; modified helper defaults were independently compared with HEAD. No source reset occurred. No new guidance/hub claims were assessed or rewritten.

### Changed files

**Canonical structured composition only:**

${corrections.map(c=>'- `'+c.file+'`: '+c.edits.map(e=>e.field).join('; ')).join('\n')}

**Opt-in extraction helpers; defaults preserved:** \`scripts/lib/input-substance-food.mjs\`, \`src/data/rankedFoodSources.mjs\`, \`src/lib/aggregateFoodComposition.mjs\`, \`src/lib/aminoAcidProfileSources.mjs\`.

**Analysis-only configuration/code/evidence:** this review directory (config, reusable scorer, extraction/report/validation programs, source extract, before/after exports, completeness, comparisons, test logs and this report); dated update to the meat/fish holding page. Exact inventory is exported in \`changed-files.json\`.

No scientific admissions, SEC, QC suspension, publication manifest, frozen ranked snapshot, site-generated files or Cursor hub guidance changed. No build, regeneration of site data, commit, push, merge, Netlify work or deployment. Portion-aware/abacus work and other BRSs/modulators remain deferred.
`;
fs.writeFileSync(dir+'/report.md',report);
const inventory=cp.execFileSync('git',['status','--short','--untracked-files=all'],{encoding:'utf8'}).trim().split('\n');fs.writeFileSync(dir+'/changed-files.json',JSON.stringify(inventory,null,2)+'\n');console.log('Report:',combined.length,'combined foods;',audit.length,'completeness cells.');
