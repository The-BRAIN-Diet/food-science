import fs from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';
import matter from 'gray-matter';
import {scanPages, mergeReviewState, buildPublicDataset, assertPublicDatasetSafe, findPublicPageRecord, openPublicIssueCount} from './lib/framework-qc.mjs';
import {renderPmPhenomeSectionBody} from './lib/phenome-relationships.mjs';
const dir='review/recovery-readiness-2026-11-14/integration/remaining-three';
const read=f=>JSON.parse(fs.readFileSync(`${dir}/${f}`,'utf8'));

test('recovered ignored QC inputs explain the historical PM4 count without publishing or closing issues',()=>{
 const issues=read('framework-issues-register.json'),state=read('page-review-state.json');
 const {pages}=scanPages(process.cwd());
 const register=mergeReviewState(pages,state,issues);
 const dataset=buildPublicDataset({register,issues:issues.issues,generated:'recovery-diagnostic-only'});
 assertPublicDatasetSafe(dataset);
 const pm=findPublicPageRecord(dataset,{pageId:'BRS5-FM2-PM4'});
 assert.equal(openPublicIssueCount(pm),2);
 assert.deepEqual(state.pages['BRS5-FM2-PM4'].linked_framework_issue_ids.slice().sort(),['FW001','FW003']);
 assert.ok(!dataset.issues.some(x=>x.id==='FW002'));
 // No writes: archived historical adjudications do not activate the suspended gate.
});

test('ECS PM3 renders its exact canonical genistein link with strict scientific freshness',()=>{
 const file='docs/biological-targets/brs-x/ecs/fm1/brs-x-ecs-pm3-faah-mediated-endocannabinoid-preservation.mdx';
 const p=matter(fs.readFileSync(file,'utf8'));
 const actual=p.content.slice(p.content.indexOf('## 7. Phenome Connections'),p.content.indexOf('## 8. References')).trim();
 const expected=renderPmPhenomeSectionBody(p.data.phenome_relationships,{sectionNum:7,findingData:p.data}).trim();
 const link='[genistein](/docs/substances/bioactive-compounds/polyphenols/isoflavones/genistein)';
 assert.equal(actual.split(link).length,2);
 assert.equal(actual,expected);
 const changed=structuredClone(p.data);changed.phenome_relationships[0].rationale += ' Unsupported added claim.';
 assert.notEqual(actual,renderPmPhenomeSectionBody(changed.phenome_relationships,{sectionNum:7,findingData:changed}).trim());
 assert.notEqual(actual.replace('Low–Medium','High'),expected);
 assert.notEqual(actual.replace(link,'[genistein](/docs/not-canonical)'),expected);
});
