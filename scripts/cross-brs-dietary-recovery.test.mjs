import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import matter from 'gray-matter';
import {buildInputSubstanceFood} from './lib/input-substance-food.mjs';
import {createDietaryPathwayIndex} from './lib/dietary-pathway-index.mjs';
import {selectBrsReviewData} from '../src/data/inputSubstanceFoodSelection.mjs';
const root=process.cwd();
const cross=buildInputSubstanceFood(root,{brs:'BRS-X'});
test('one shared mapper covers all canonical numbered and Cross-BRS identities without renumbering',()=>{
 const scopes=['BRS1','BRS2','BRS3','BRS4','BRS5','BRS6','BRS-X'].map(brs=>buildInputSubstanceFood(root,{brs}));
 assert.equal(scopes.slice(0,6).reduce((n,s)=>n+s.coverage.length,0),51);
 assert.equal(cross.coverage.length,13);
 const ids=scopes.flatMap(s=>s.coverage.map(p=>p.pm_id));
 assert.equal(new Set(ids).size,64);
 for(const p of cross.coverage){const d=matter(fs.readFileSync(p.record,'utf8')).data;assert.equal(p.pm_id,d.pm_id);assert.match(p.pm_id,/^BRS-X\(/);for(const a of d.dietary_input_traceability||[])assert.ok(cross.relationships.some(r=>r.id===p.pm_id+'::'+a.atom_id));}
 const all=selectBrsReviewData(scopes[0],Object.fromEntries(scopes.map(s=>[s.scope,s])),'all');
 assert.equal(new Set(all.data.coverage.map(p=>p.pm_id)).size,64);
});
test('Cross-BRS Zn and DHA/EPA have independent PM gates, foods and manuscript rows; unset is never inherited',()=>{
 for(const [pm,substance]of [['BRS-X(ECS-PM1)','zinc'],['BRS-X(ECS-PM2)','dha-docosahexaenoic-acid'],['BRS-X(ECS-PM2)','epa-eicosapentaenoic-acid']]){
  const r=cross.relationships.find(r=>r.pm===pm&&r.substance_id===substance);assert.ok(r,substance);assert.equal(r.dietary_input,true);assert.equal(r.scientific_admission,'admitted');
  assert.ok(cross.manuscript_rows.some(x=>x.pm===pm&&x.canonical_substance_id===substance));
 }
 for(const r of cross.relationships.filter(r=>r.dietary_input!==true)){
  const independentlyAdmitted=cross.relationships.some(a=>a.pm===r.pm&&a.substance_id===r.substance_id&&a.dietary_input===true&&a.scientific_admission==='admitted');
  if(!independentlyAdmitted)assert.ok(!cross.manuscript_rows.some(x=>x.pm===r.pm&&x.canonical_substance_id===r.substance_id));
 }
 assert.equal(new Set(cross.relationships.map(r=>r.id)).size,cross.relationships.length);
});
test('pathway coverage includes all thirteen Cross-BRS PMs without granting downstream admissions',()=>{
 const index=createDietaryPathwayIndex(root);assert.equal(index.inventory.length,64);
 assert.equal(index.inventory.filter(x=>x.pm.startsWith('BRS-X(')).length,13);
 assert.deepEqual(index.errors,[]);
 for(const path of index.paths)assert.notEqual(path.downstream_pm_admission,true);
});
test('audit-only Finding links survive phenome regeneration without duplicating full records',async()=>{
 const {renderRelationshipPrimaryFindings}=await import('./lib/scientific-findings.mjs');
 const data=matter(fs.readFileSync('docs/biological-targets/brs4/fm1/brs4-fm1-pm3-creatine-phosphocreatine-buffer.mdx','utf8')).data;
 const rendered=data.phenome_relationships.map(r=>renderRelationshipPrimaryFindings(r,data)).join('\n');
 assert.match(rendered,/\?review=1#pm3-f5/);assert.doesNotMatch(rendered,/<ScientificFinding/);
});
test('mapping review selector derives scopes from shared datasets, rather than six numbered buttons',()=>{
 const source=fs.readFileSync('src/components/InputSubstanceFoodReview/index.tsx','utf8');
 assert.match(source,/Object\.keys\(generatedScopes\)\.map/);
 assert.doesNotMatch(source,/\[1,2,3,4,5,6\]\.map/);
 assert.match(source,/Cross-BRS/);
});
test('canonical aliases survive mapper-to-admission projection; the existing EAA class is not lost',()=>{
 const d=buildInputSubstanceFood(root,{brs:'BRS1'}),r=d.relationships.find(r=>r.id==='BRS1-FM1-PM1::PM1-DIT-1');
 assert.equal(r.input,'Indispensable amino-acid supply');assert.equal(r.substance_id,'indispensable-amino-acids');assert.equal(r.scientific_admission,'admitted');assert.deepEqual(r.admission_errors,[]);
 assert.ok(d.manuscript_rows.some(x=>x.pm===r.pm&&x.canonical_substance_id==='indispensable-amino-acids'));
 assert.equal(d.relationships.filter(x=>x.pm===r.pm&&x.substance_id==='indispensable-amino-acids'&&x.dietary_input===true).length,1);
});

test('receptor-structural zinc does not inherit the historical testosterone claim or a SEC score',()=>{
 const pm='BRS-X(Hormones-PM5)',page=cross.coverage.find(c=>c.pm_id===pm),d=matter(fs.readFileSync(page.record,'utf8')).data;
 const old=d.dietary_input_traceability.find(a=>a.atom_id==='PM5-DIT-1');
 assert.equal(old.dietary_input,undefined);assert.deepEqual(old.evidence_source.finding_ids,['PM5-F1']);
 const accepted=cross.relationships.filter(r=>r.pm===pm&&r.substance_id==='zinc'&&r.scientific_admission==='admitted'&&r.dietary_input===true);assert.equal(accepted.length,1);
 assert.match(accepted[0].id,/PM5-DIT-RECOVERY-ZINC-RECEPTOR$/);
 const rows=cross.manuscript_rows.filter(r=>r.pm===pm&&r.canonical_substance_id==='zinc');assert.ok(rows.length);
 assert.ok(rows.every(r=>r.pm_evidence.citation_keys.includes('shaffer_androgen_dbd_2004')&&!r.pm_evidence.citation_keys.includes('prasad_zinc_testosterone_1996')));
 const sp=d.scientific_principles.find(s=>s.id==='PM5-SP1');assert.equal(sp.sources[0].accession,'P10275');assert.equal(sp.sources[0].version,'310; annotation 2026-09-02');assert.equal(sp.sec_assessment_ref,undefined);
});
