import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import {buildInputSubstanceFood} from './lib/input-substance-food.mjs';
import {createDietaryPathwayIndex} from './lib/dietary-pathway-index.mjs';
import {transparencyErrors} from '../src/lib/scientificTransparency.mjs';
import {validateCanonicalSubstancePage} from './lib/substance-page-validation.mjs';
const files={pm4:'docs/biological-targets/brs3/fm2/brs3-fm2-pm4-ros-generation-vs-clearance-balance.mdx',pm6:'docs/biological-targets/brs3/fm2/brs3-fm2-pm6-antioxidant-network-recycling.mdx'};
const read=f=>matter(fs.readFileSync(f,'utf8'));
test('recovery preserves prior missions, Findings, confidence, KC and intervention records',()=>{
 for(const [id,file]of Object.entries(files)){
  const before=read(`review/dietary-recovery-2026-10-26/before/${id}.mdx`).data,after=read(file).data;
  for(const key of ['mission','key_constraints','kc_applicability_adjudications','kc_change_control_flags','phenome_relationships','system_optimisation_practices','lifestyle_priorities','dietary_confidence_assessments'])assert.deepEqual(after[key],before[key],`${id} ${key}`);
  for(const f of before.scientific_findings)assert.deepEqual(after.scientific_findings.find(a=>a.id===f.id),f);
  for(const a of before.dietary_input_traceability)if(!(id==='pm4'&&['PM4-DIT-4','PM4-DIT-2'].includes(a.atom_id)))assert.deepEqual(after.dietary_input_traceability.find(b=>b.atom_id===a.atom_id),a);
 }
 const history=JSON.parse(fs.readFileSync('review/dietary-recovery-2026-10-26/pm4-manganese-decision-history.json'));
 assert.equal(history.old.atom.dietary_input,false);assert.equal(history.current.atom.dietary_input,true);
});
test('new capacity relationships project through the governed mapping and preserve food identity',()=>{
 const d=buildInputSubstanceFood(process.cwd(),{brs:'BRS3'});
 for(const id of ['BRS3-FM2-PM6::PM6-DIT-3','BRS3-FM2-PM4::PM4-DIT-4']){
  const r=d.relationships.find(r=>r.id===id);assert.equal(r.scientific_admission,'admitted');
  assert.ok(d.manuscript_rows.some(row=>row.pm===r.pm&&row.canonical_substance_id===r.substance_id&&row.scientific_admission==='admitted'));
 }
 const p=createDietaryPathwayIndex(process.cwd()).paths.find(p=>p.pm==='BRS3-FM2-PM6'&&p.target_id==='flavin-adenine-dinucleotide');
 assert.ok(p.food_targets.length);assert.equal(p.classification,'derived');assert.equal(p.pm_specific_status,'admitted-derived-pathway');
 assert.deepEqual(p.conversion_pathway.map(s=>[s.from,s.to]),[['vitamin-b2','flavin-mononucleotide'],['flavin-mononucleotide','flavin-adenine-dinucleotide']]);
 assert.ok(p.food_targets.every(f=>f.substance_id==='vitamin-b2'));assert.equal(p.downstream_pm_admission,false);
});
test('PM6 Evidence Gap has resolvable scientific provenance and the FAD page follows canonical schema',()=>{
 assert.deepEqual(transparencyErrors(read(files.pm6).data,[]),[]);
 assert.deepEqual(validateCanonicalSubstancePage(fs.readFileSync('docs/substances/nutrients/micronutrients/vitamins/flavin-adenine-dinucleotide.md','utf8')).issues,[]);
});
test('changed real canonical PMs and new FAD page compile as MDX',async()=>{
 const {createProcessorUncached}=await import('@docusaurus/mdx-loader/lib/processor.js');
 for(const file of [...Object.values(files),'docs/substances/nutrients/micronutrients/vitamins/flavin-adenine-dinucleotide.md']){
  const d=read(file),processor=await createProcessorUncached({options:{siteDir:process.cwd(),staticDirs:[path.resolve('static')],markdownConfig:{anchors:{maintainCase:false},format:'mdx',mermaid:false,mdx1Compat:{comments:true,admonitions:true,headingIds:true}},remarkPlugins:[],rehypePlugins:[],admonitions:true},format:'mdx'});
  assert.ok((await processor.process({content:d.content,filePath:path.resolve(file),frontMatter:d.data,compilerName:'server'})).content);
 }
});

test('audit-only main-page Finding count uses active canonical records after relocation',async()=>{
 const {createRequire}=await import('node:module');const require=createRequire(import.meta.url);
 const {applyFindingPresentation}=require('../src/plugin/pm-lever-layout/index.cjs');
 const tree={type:'root',children:[{type:'heading',depth:3,children:[{type:'text',value:'4.1 Scientific Findings'}]}]};
 const data=read(files.pm6).data;applyFindingPresentation(tree,data);
 assert.equal(tree.children[0].children[0].value,'4.1 Scientific Findings (4)');
 const variant=structuredClone(data);variant.scientific_findings.push({id:'PM6-F99',status:'retired'});
 const heading={type:'root',children:[{type:'heading',depth:3,children:[{type:'text',value:'4.1 Scientific Findings'}]}]};
 applyFindingPresentation(heading,variant);assert.equal(heading.children[0].children[0].value,'4.1 Scientific Findings (4)');
});

test('creatine co-substrates retain distinct ordered routes and no GAA food-content inference',()=>{
 const file='docs/biological-targets/brs4/fm1/brs4-fm1-pm3-creatine-phosphocreatine-buffer.mdx',d=read(file).data;
 for(const [atom,sub,other]of [['PM3-DIT-2','arginine','glycine'],['PM3-DIT-3','glycine','arginine']]){
  const a=d.dietary_input_assessments.find(a=>a.atom_id===atom);
  assert.equal(a.type,'A');assert.equal(a.classification,'derived');assert.equal(a.status,'admitted');
  assert.deepEqual(a.conversion_pathway.map(s=>[s.from,s.to]),[[sub,'guanidinoacetate'],['guanidinoacetate','creatine']]);
  assert.ok(a.conversion_pathway[0].dependencies.some(s=>s.includes(other)));
  assert.match(a.assessment_limitations,/not a measurement of brain synthesis flux/);
 }
 const index=createDietaryPathwayIndex(process.cwd());
 for(const p of index.paths.filter(p=>p.pm===d.pm_id&&['arginine','glycine'].includes(p.precursor_id)))assert.ok(p.food_targets.every(f=>f.substance_id!=='guanidinoacetate'));
 assert.deepEqual(validateCanonicalSubstancePage(fs.readFileSync('docs/substances/endogenous-metabolites/guanidinoacetate.md','utf8')).issues,[]);
});

test('SAM supply is adjudicated separately for PEMT and GAMT, without a SAM dietary admission',()=>{
 for(const f of ['docs/biological-targets/brs2/fm3/brs2-fm3-pm7-phosphatidylcholine-formation.mdx','docs/biological-targets/brs4/fm1/brs4-fm1-pm3-creatine-phosphocreatine-buffer.mdx']){
  const d=read(f).data,a=d.dietary_input_assessments.find(a=>a.canonical_substance_id==='methionine');
  assert.equal(a.type,'A');assert.equal(a.classification,'derived');assert.equal(a.operation,d.mission);
  assert.deepEqual(a.conversion_pathway.map(s=>[s.from,s.to]),[['methionine','s-adenosylmethionine']]);
  assert.ok(d.dietary_input_traceability.filter(x=>x.substance_id==='s-adenosylmethionine').every(x=>x.dietary_input===false));
 }
 assert.deepEqual(validateCanonicalSubstancePage(fs.readFileSync('docs/substances/endogenous-metabolites/s-adenosylmethionine.md','utf8')).issues,[]);
});
