import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import matter from 'gray-matter';
import {buildDietaryLeverDisclosureMap} from './lib/dietary-lever-disclosure.mjs';
import {buildUpstreamResourceProjection} from '../src/data/dietaryOriginProjection.mjs';
import {validateConstituentIdentityRecords} from './lib/kc-evidence-governance.mjs';
const contract=fs.readFileSync('system/dietary-input-traceability-contract.md','utf8');
const example=id=>JSON.parse(contract.split(`<!-- ${id} -->`)[1].split(`<!-- /${id} -->`)[0].match(/```json\n([\s\S]*?)\n```/)[1]);
const load=p=>matter(fs.readFileSync(p,'utf8'));
const path=n=>`docs/biological-targets/brs2/fm1/${n}`;
const pm2=load(path('brs2-fm1-pm2-betaine-bhmt-remethylation.mdx'));
const pm3=load(path('brs2-fm1-pm3-same-synthesis.mdx'));
const registry=JSON.parse(fs.readFileSync('registry/substances.json','utf8'));
const page=(p,data)=>({permalink:'/docs/'+p.replace(/^docs\//,'').replace(/\.mdx?$/,''),frontMatter:data});
const kcPath='docs/biological-targets/brs2/kc/brs2-kc1-one-carbon-donor-pool.mdx';
const substancePages=['vitamin-b9','betaine','choline'].map(id=>{const p='docs/substances/'+registry[id].path;return page(p,load(p).data);});
const docsFor=data=>[page(path('brs2-fm1-pm3-same-synthesis.mdx'),data),page(kcPath,load(kcPath).data),...substancePages];
test('documented real conditional records reproduce retained renderer output and bounded projection',()=>{
 const e=example('kc-conditional-real-example');const data={...pm2.data,...e,dietary_input_traceability:pm2.data.dietary_input_traceability.map(a=>e.dietary_input_traceability.find(b=>b.atom_id===a.atom_id)||a)};
 const actual=[...buildDietaryLeverDisclosureMap(data).values()];const original=[...buildDietaryLeverDisclosureMap(pm2.data).values()];assert.deepEqual(actual,original);
 const docs=[page(path('brs2-fm1-pm2-betaine-bhmt-remethylation.mdx'),data),...docsFor(pm3.data).slice(1)];
 for(const id of ['betaine','choline']){const rows=buildUpstreamResourceProjection(docs,id,registry);assert.equal(rows.length,1);assert.equal(rows[0].relationshipType,'conditional-constraint');assert.match(rows[0].atom.evidence_limitation,/deplet|challenge/i);}
});
test('actual unresolved folate decision remains audit-only despite canonical membership and admitted pool',()=>{
 const e=example('kc-not-admitted-real-example');assert.equal(e.kc_applicability_adjudications.length,1);assert.equal(e.kc_applicability_adjudications[0].disposition,'unresolved');
 const docs=[page(path('brs2-fm1-pm2-betaine-bhmt-remethylation.mdx'),pm2.data),...docsFor(pm3.data).slice(1)];assert.deepEqual(buildUpstreamResourceProjection(docs,'vitamin-b9',registry),[]);
 assert.ok(![...buildDietaryLeverDisclosureMap(pm2.data).values()].some(d=>d.presentationSection==='3.1.3'&&/folate/i.test(d.title)));
});
test('documented missing identity preserves disclosure, blocks projection and requires repair action',()=>{
 const e=example('kc-missing-identity-fixture');assert.equal(e.fixture_only,true);const data=structuredClone(pm3.data);
 const atom=data.dietary_input_traceability.find(a=>a.atom_id===e.pm_atom_id);assert.ok(atom);atom.canonical_identity=e.canonical_identity;
 const row=data.pm_kc_relationships.flatMap(r=>r.constituent_relationships).find(r=>r.pm_atom_id===e.pm_atom_id);row.canonical_identity=e.canonical_identity;delete row.substance_id;data.pending_actions=e.pending_actions;
 assert.deepEqual(buildUpstreamResourceProjection(docsFor(data),'betaine',registry),[]);
 const disclosure=[...buildDietaryLeverDisclosureMap(data).values()].find(d=>/betaine/i.test(d.title));assert.ok(disclosure?.biologicalRole&&disclosure.evidenceReferences.length&&disclosure.evidenceLimitation);
 const issues=[];validateConstituentIdentityRecords(data,issues,{registry,substancePages});assert.deepEqual(issues,[]);
 data.pending_actions=[];const broken=[];validateConstituentIdentityRecords(data,broken,{registry,substancePages});assert.ok(broken.some(i=>i.code==='pm_ikc_identity_repair_action_missing'));
});
