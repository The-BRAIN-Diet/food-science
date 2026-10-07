import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import matter from 'gray-matter';
import {listMechanismMdxFiles} from './lib/mechanism-page-validation.mjs';
import {renderFmTopInventory,renderFmEvidenceSummary,validateFmSynthesisLayout,extractFmSuboptimalBody} from './lib/fm-synthesis-layout.mjs';
import {replaceFmSection4} from './lib/fm-integrated-narrative.mjs';
import {buildFmEvidenceHighlightsBlock,replaceEvidenceHighlightsInContent,assertAllFmsHaveEvidenceHighlights} from './lib/fm-evidence-highlights.mjs';
const pages=listMechanismMdxFiles(process.cwd(),'fm').map(file=>({file,...matter(fs.readFileSync(file,'utf8'))}));

test('all 23 FM pages render their durable synthesis, unique inventory and sequential section roles',()=>{
  assert.equal(pages.length,23);
  for(const {data,content,file} of pages){
    assert.deepEqual(validateFmSynthesisLayout(data,content),[],file);
    assert.equal(content.split('### Primary Mechanisms').length-1,1);
    const inventory=renderFmTopInventory(data);
    assert.ok(content.indexOf(inventory)<content.indexOf('## 1.'));
    for(const r of [...data.mechanisms_covered,...(data.key_constraints || [])])assert.ok(inventory.includes(`](${r.href})`));
    const evidence=renderFmEvidenceSummary(data);
    assert.ok(!/PhenomeBibLinks|brs-fm-hub-panel|<ScientificFinding/.test(evidence));
    const links=[...evidence.matchAll(/\]\(#fm-ref-(\d+)\)/g)];
    assert.ok(links.length,file+' lacks evidence citations');
    for(const [,n]of links){assert.ok(data.references[Number(n)-1]);assert.ok(content.includes(`id="fm-ref-${n}"`),file+' missing target '+n);}
    assert.ok(content.includes('id="42-integrated-functional-narrative"'));
    assert.ok(content.includes('id="44-evidence-highlights"'));
    assert.ok(extractFmSuboptimalBody(content));
  }
  assert.equal(assertAllFmsHaveEvidenceHighlights(process.cwd()).ok,true);
});

test('shared regeneration is idempotent and does not restore PM recaps or alter the consequence account',()=>{
  for(const {data,content}of pages){
    assert.equal(replaceFmSection4(content,data),content);
    const before=extractFmSuboptimalBody(content);
    const evidence=buildFmEvidenceHighlightsBlock(data);
    const next=replaceEvidenceHighlightsInContent(content,evidence);
    assert.equal(next,content);
    assert.equal(extractFmSuboptimalBody(next),before);
  }
});

test('missing scientific source, unknown citations, wrong placement and stale synthesis are rejected',()=>{
  const {data,content}=pages.find(p=>p.data.fm_id==='BRS1(FM1)');
  assert.throws(()=>buildFmEvidenceHighlightsBlock({...data,fm_evidence_summary:''}),/required/);
  assert.throws(()=>renderFmEvidenceSummary({...data,fm_evidence_summary:'Claim {{cite:nonexistent_key}}'}),/unknown citation/);
  const bad=content.replace('### 4.2 Evidence Summary','### 4.4 Evidence Highlights');
  assert.ok(validateFmSynthesisLayout(data,bad).some(i=>i.code==='fm_synthesis_order'));
  const missingInventory=content.replace(renderFmTopInventory(data),'');
  assert.ok(validateFmSynthesisLayout(data,missingInventory).some(i=>i.code==='fm_inventory_position'));
  const stale={...data,fm_evidence_summary:data.fm_evidence_summary+' Additional reviewed text.'};
  assert.ok(validateFmSynthesisLayout(stale,content).some(i=>i.code==='fm_evidence_summary_stale'));
});


test('current top inventory does not trigger retired KC panel checks; scientific gaps remain', async()=>{
  const {reconcileFmKcPools,getKcPoolIndex}=await import('./lib/fm-supporting-kc-pools.mjs');
  const kcIndex=getKcPoolIndex(process.cwd());
  for(const {file,data} of pages){
    const report=reconcileFmKcPools(file,{rootDir:process.cwd(),kcIndex});
    assert.deepEqual(report.renderedIds,(data.key_constraints || []).map(k=>k.id));
    assert.ok(!report.issues.some(i=>['fm_missing_kc_pool_listing','fm_kc_pool_position','fm_kc_pool_not_pm_derived'].includes(i.code)));
    if(data.fm_id==='BRS2(FM1)'){assert.equal(data.kc_summary_mode,'adjudicated-pm-relationships');assert.deepEqual(report.issues,[]);}
  }
});
