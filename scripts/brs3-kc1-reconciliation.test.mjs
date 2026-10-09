import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import matter from 'gray-matter';
import {validateKcOwnedEvidence, validateConstituentIdentityRecords, buildCanonicalKcIndex} from './lib/kc-evidence-governance.mjs';
import {buildUpstreamResourceProjection} from '../src/data/dietaryOriginProjection.mjs';
const file='docs/biological-targets/brs3/kc/brs3-kc1-antioxidant-substrate-availability.mdx';
const kc=matter(fs.readFileSync(file,'utf8'));
const registry=JSON.parse(fs.readFileSync('registry/substances.json','utf8'));
const page=(p,m)=>({permalink:'/docs/'+p.replace(/^docs\//,'').replace(/\.mdx?$/,''),frontMatter:m.data});
const substances=['cysteine','glycine'].map(id=>page('docs/substances/'+registry[id].path,matter(fs.readFileSync('docs/substances/'+registry[id].path,'utf8'))));
test('registered constituents resolve to admitted evidence and actual canonical substance pages',()=>{
 const issues=[];validateKcOwnedEvidence(kc.data,issues,{entityLabel:kc.data.kc_id,content:kc.content});
 validateConstituentIdentityRecords(kc.data,issues,{registry,substancePages:substances});assert.deepEqual(issues,[]);
 assert.deepEqual(kc.data.individual_key_constraints.map(r=>r.substance_id),['cysteine','glycine']);
 for(const row of kc.data.individual_key_constraints)assert.equal(row.registration_status,'registered');
});
test('legacy pool reference remains valid without becoming a constituent identity',()=>{
 const index=buildCanonicalKcIndex([kc.data]);assert.ok(index.kcIds.has('BRS3(KC1)'));assert.ok(index.ikcIds.get('BRS3(KC1)').has('BRS3(KC1)'));
 assert.ok(kc.data.legacy_ikc_references.some(r=>r.ikc_id==='BRS3(KC1)'));
 assert.ok(!kc.data.individual_key_constraints.some(r=>r.ikc_id==='BRS3(KC1)'));
 const rejected=kc.data.kc_input_traceability.filter(a=>a.ikc_membership==='excluded');
 assert.deepEqual(rejected.map(a=>a.input),['Glutamate','Polyphenols','Vitamin C']);
});
test('KC membership alone cannot create substance-to-PM supply projections',()=>{
 const docs=[page(file,kc),...substances];
 for(const id of ['cysteine','glycine'])assert.deepEqual(buildUpstreamResourceProjection(docs,id,registry),[]);
});
test('each evidence disclosure retains combined-treatment, red-cell and form boundaries',()=>{
 for(const atom of kc.data.kc_input_traceability.filter(a=>a.ikc_membership==='admitted')){
  assert.match(atom.evidence_limitation,/N-acetylcysteine/);
  assert.match(atom.evidence_limitation,/brain synthesis/);
  assert.match(atom.evidence_limitation,/placebo/);
  assert.deepEqual(atom.evidence_source.citation_keys,['sekhar_glutathione_2011']);
 }
});
