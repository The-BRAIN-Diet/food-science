import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync,spawnSync} from 'node:child_process';
import matter from 'gray-matter';
import {scientificPrincipleErrors} from '../src/lib/scientificPrinciples.mjs';
import {checkScientificFindings} from './lib/scientific-findings-gate.mjs';
const root=process.cwd(),dir='review/coq-principle-provenance-2026-11-05';
const file='docs/biological-targets/brs4/fm1/brs4-fm1-pm10-coenzyme-q-biosynthesis-and-pool-availability.mdx';
const before=matter(fs.readFileSync(`${dir}/before.mdx`,'utf8')),after=matter(fs.readFileSync(file,'utf8'));
test('CoQ fix changes only provenance; science, body and immutable SEC bytes preserved',()=>{
 assert.ok(scientificPrincipleErrors(before.data).length);assert.deepEqual(scientificPrincipleErrors(after.data),[]);
 const clean=d=>{const c=structuredClone(d);for(const p of c.scientific_principles){delete p.sources;delete p.provenance_kind;}return c;};
 assert.deepEqual(clean(after.data),clean(before.data));
 // Author-approved 5 November food/substance integration adds only this navigation paragraph.
 const navigation = 'The [CoQ10 substance record](/docs/substances/bioactive-compounds/lipid-based/coq10) links its documented food sources and original composition evidence. Food occurrence is distinct from this PM’s dietary admissions: it does not demonstrate increased mitochondrial pools or function.\n\n';
 assert.equal(after.content.split(navigation).length,2);
 const clinicalNavigation = "An adjunctive CoQ10 trial reported improved parent-rated ADHD symptoms at six months compared with atomoxetine plus placebo. The [bounded clinical evidence and limitations](/docs/substances/bioactive-compounds/lipid-based/coq10?therapeutic=1#coq10-adhd) are presented on the substance page. This clinical signal does not demonstrate improved CoQ biosynthesis, mitochondrial delivery or energetic reserve; independent clinical SEC appraisal remains pending. [[13]](#pm-ref-13)\n\n";
 assert.equal(after.content.split(clinicalNavigation).length,2);
 assert.equal(after.content.replace(navigation,'').replace(clinicalNavigation,''),before.content);
 assert.equal(createHash('sha256').update(fs.readFileSync('system/sec-assessments/registry.json')).digest('hex'),JSON.parse(fs.readFileSync(`${dir}/preservation.json`)).sec_sha256);
 assert.ok(after.data.references.some(r=>JSON.stringify(r).includes('Guerra')));
});
test('Findings and actual prebuild SEC command reject broken Principle provenance even without Findings',()=>{
 const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'coq-principle-gate-'));
 try{
  for(const d of ['scripts/lib','scripts/data','src'])fs.cpSync(path.join(root,d),path.join(tmp,d),{recursive:true});
  fs.copyFileSync(path.join(root,'scripts/check-sec-assessments.mjs'),path.join(tmp,'scripts/check-sec-assessments.mjs'));
  fs.symlinkSync(path.join(root,'node_modules'),path.join(tmp,'node_modules'),'dir');
  fs.mkdirSync(path.join(tmp,'system/sec-assessments'),{recursive:true});
  const registry=JSON.parse(fs.readFileSync('system/sec-assessments/registry.json'));registry.assessments=[];
  fs.writeFileSync(path.join(tmp,'system/sec-assessments/registry.json'),JSON.stringify(registry));
  fs.mkdirSync(path.join(tmp,'system/framework-qc'),{recursive:true});fs.writeFileSync(path.join(tmp,'system/framework-qc/pm-open-issues.json'),' {"issues":[]}');
  fs.mkdirSync(path.dirname(path.join(tmp,file)),{recursive:true});
  execFileSync('git',['init','-q'],{cwd:tmp});execFileSync('git',['add','system/sec-assessments/registry.json'],{cwd:tmp});execFileSync('git',['-c','user.name=Fixture','-c','user.email=fixture@example.invalid','commit','-qm','fixture'],{cwd:tmp});
  const write=p=>fs.writeFileSync(path.join(tmp,file),matter.stringify('',{pm_id:after.data.pm_id,scientific_principles:[p]}));
  for(const mutate of [p=>delete p.provenance_kind,p=>delete p.sources[0].version,p=>delete p.sources[0].accession,p=>p.sources=[],p=>p.score=8]){
   const p=structuredClone(after.data.scientific_principles[0]);mutate(p);write(p);
   assert.ok(checkScientificFindings(tmp).issues.some(e=>e.code==='scientific_principle_invalid'));
   const result=spawnSync(process.execPath,['scripts/check-sec-assessments.mjs','HEAD'],{cwd:tmp,encoding:'utf8'});
   assert.equal(result.status,1,result.stderr);assert.match(result.stderr,/scientific_principle_invalid/);
  }
  write(after.data.scientific_principles[0]);assert.equal(checkScientificFindings(tmp).ok,true);
  const result=spawnSync(process.execPath,['scripts/check-sec-assessments.mjs','HEAD'],{cwd:tmp,encoding:'utf8'});assert.equal(result.status,0,result.stderr);
 }finally{fs.rmSync(tmp,{recursive:true,force:true});}
});

test('BRS4 hub mechanism inventories are fresh from canonical FM membership',async()=>{
 const {buildAllMechanismsIndex,buildFunctionalMechanismsSection,listFmFilesForBrs}=await import('./lib/brs-hub-fm-section.mjs');
 const hub=fs.readFileSync('docs/biological-targets/mitochondrial-function-bioenergetics.md','utf8');
 const fms=listFmFilesForBrs(4);
 for(const block of [buildAllMechanismsIndex(fms,'BRS4'),buildFunctionalMechanismsSection(fms,'BRS4')]){
  assert.ok(block.includes('BRS4-FM1-PM10'));assert.ok(hub.includes(block.trim()));
 }
});
