import test from 'node:test';
import assert from 'node:assert/strict';
import { validateKcDistinctnessReview as check } from './lib/kc-relationship-distinctness-review.mjs';
const row = (id, disposition = 'distinct') => ({relationship_id:id, disposition,
  compared_records:{'3.1.1':['PM6-DIT-CYS'], '3.1.2':[], '3.2':[]},
  rationale:'Collective sulfur-resource withdrawal constrains synthesis; assembly role alone does not establish this pool limitation.',
  evidence_source:{finding_ids:['PM6-F2']}});
const run = (rows, publicIds=[], candidateIds=rows.map(r=>r.relationship_id)) => check({rows,publicIds,candidateIds});
test('same input and shared evidence can support an independently adjudicated different job',()=>{
 assert.deepEqual(run([row('pool')],['pool']),[]);
});
test('different evidence does not permit publishing a recorded duplicate',()=>{
 const r={...row('copy','consolidated as duplicate'),evidence_source:{citation_keys:['different-study']},retained_record_ids:['PM6-DIT-CYS'],provenance:['KC2 canonical ID and review history']};
 assert.deepEqual(run([r]),[]);
 assert.match(run([r],['copy'])[0].message,/remains public/);
});
test('unresolved requires precise gap and remains audit-only',()=>{
 const r={...row('candidate','unresolved'),gap:'Collective withdrawal does not isolate an individually limiting constituent.'};
 assert.deepEqual(run([r]),[]);
 assert.ok(run([r],['candidate']).length);
 assert.ok(run([{...r,gap:''}]).length);
});
test('completion rejects missing section comparison, evidence and consolidation history',()=>{
 const r=row('copy','consolidated as duplicate');
 delete r.compared_records['3.2']; r.evidence_source={};
 const messages=run([r]).map(x=>x.message).join('\n');
 for(const text of ['3.2','evidence','destination','provenance']) assert.ok(messages.includes(text));
});
test('every proposed and public relationship must be reviewed exactly once',()=>{
 assert.ok(run([],['unknown'],['missing']).length===2);
 assert.ok(run([row('one'),row('one')]).some(x=>x.message==='Duplicate review row'));
});
test('a different pool name, Resource dependency label or citation set does not keep a recorded duplicate distinct',()=>{
 const duplicate={relationship_id:'KCI-1',disposition:'distinct',input_label:'Methionine–cysteine availability',input_type:'Resource dependency',
  biological_job:'Sulfur-amino-acid provision sustaining glutathione synthesis',
  compared_biological_jobs:['Sulfur-amino-acid provision sustaining glutathione synthesis'],
  compared_records:{'3.1.1':['PM6-DIT-1','PM6-DIT-9'],'3.1.2':[],'3.2':[]},
  rationale:'The pool name, Resource dependency label and citation set differ from the cysteine substrate and methionine precursor rows.',
  evidence_source:{citation_keys:['lyons_glutathione_2000','courtney_martin_cysteine_2008']}};
 assert.match(run([duplicate]).map(x=>x.message).join('\n'),/Recorded duplicate/);
 const differentWording={...duplicate,biological_job:'Competitive allocation across the shared sulfur-amino-acid pool',
  rationale:'The row uses different job wording. This structural pass does not adjudicate that the jobs differ.'};
 assert.deepEqual(run([differentWording],['KCI-1']),[]);
 const erased={...duplicate,disposition:'consolidated as duplicate',applicability_disposition:'established',public_copy:'No mapping established.',
  retained_record_ids:['PM6-DIT-1','PM6-DIT-9'],provenance:['BRS2(KC2)']};
 assert.match(run([erased]).map(x=>x.message).join('\n'),/established PM↔iKC mapping/);
 const kept={...erased,public_copy:''};
 assert.deepEqual(run([kept]),[]);
});
