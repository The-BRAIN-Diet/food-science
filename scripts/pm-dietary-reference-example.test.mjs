import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import matter from 'gray-matter';
import {validateDietaryInputTraceability} from './lib/dietary-input-traceability.mjs';
import {validateDietaryLeverAtoms} from './lib/dietary-lever-atoms.mjs';
import {buildDietaryLeverDisclosureMap} from './lib/dietary-lever-disclosure.mjs';
const contract=fs.readFileSync('system/dietary-input-traceability-contract.md','utf8');
const source=fs.readFileSync('docs/biological-targets/brs1/fm1/brs1-fm1-pm3-dopaminergic-signalling-regulation.mdx','utf8');
const renderer=fs.readFileSync('src/components/PmDietaryLeverEnhancer.tsx','utf8');
function excerpt(name){const marker=`<!-- PM3-REFERENCE:${name} -->`;const section=contract.split(marker)[1]?.split(`<!-- /PM3-REFERENCE:${name} -->`)[0];assert.ok(section,`missing ${name}`);return section.slice(section.indexOf('\n',section.indexOf('```'))+1,section.lastIndexOf('```')).trimEnd();}
const documented=matter(`---\n${excerpt('records')}\n---\n`).data;
const canonical=matter(source).data;
// Full scientific and bibliography dependencies belong to the canonical PM, not the instruction.
const data={...canonical};
for(const key of ['dietary_input_traceability','dietary_lever_atoms','dietary_lever_presentations']){
 data[key]=canonical[key].map(row=>({...row,...documented[key].find(example=>example.atom_id===row.atom_id)}));
}
const context={exports:{}};
vm.createContext(context);
// Execute the documented, actual TypeScript functions and actual bibliography helper.
const lib=fs.readFileSync('src/lib/dietaryLeverDisclosure.ts','utf8');
const refHelper=lib.slice(lib.indexOf('export function pmReferenceHref'));
vm.runInContext(ts.transpileModule(`${refHelper}\n${excerpt('renderer')}\nexport {buildDetailHtml};`,{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,context);
const map=buildDietaryLeverDisclosureMap(data);
function disclosure(title,section='3.1.1'){const d=[...map.values()].find(d=>d.title===title&&d.presentationSection===section);assert.ok(d,title);return d;}
test('documented source is exact and preserves canonical scientific records',()=>{
 for(const name of ['markdown','markdown-bh4','renderer','assembly','binding']) assert.ok((name.startsWith('markdown')?source:renderer).includes(excerpt(name)),`${name} source drift`);
 const current=matter(source).data;
 for(const key of ['dietary_input_traceability','dietary_lever_atoms','dietary_lever_presentations']){
  for(const example of documented[key]){
   const actual=current[key].find(row=>row.atom_id===example.atom_id);assert.ok(actual);
   for(const [field,value] of Object.entries(example))assert.deepEqual(value,actual[field],`${example.atom_id}.${field} drift`);
  }
  assert.deepEqual(data[key],current[key]);
 }
 assert.equal(documented.references,undefined);assert.equal(documented.scientific_findings,undefined);
 assert.deepEqual(data.references,current.references);
 assert.deepEqual(data.scientific_findings[0],current.scientific_findings[0]);
 const issues=[];validateDietaryInputTraceability(data,issues,{entityLabel:'PM3 reference'});validateDietaryLeverAtoms(data,issues,{entityLabel:'PM3 reference'});assert.deepEqual(issues,[]);
});
test('Direct entry renders description, five atoms, and canonical research navigation in order',()=>{
 const d=disclosure('Tyrosine');const html=context.exports.buildDetailHtml(d);
 assert.equal(d.compactQualifier,'Direct · Substrate');assert.equal(d.upstreamIndicators.length,1);
 assert.equal(new URL(d.upstreamIndicators[0].href,'https://thebraindiet.org').href,'https://thebraindiet.org/docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation');
 const labels=[...html.matchAll(/detail-k">([^<]+)</g)].map(m=>m[1]);assert.deepEqual(labels,['Input','Input type','Biological role','Evidence source','Limitation']);
 const order=[d.readerDescription,...labels.map(x=>`detail-k">${x}<`),'Supporting mechanism research:'];
 for(let i=1;i<order.length;i++) assert.ok(html.indexOf(order[i])>html.indexOf(order[i-1]));
 assert.match(html,/Fanet et al\. \(2021\).*\[1\]/s);
 assert.equal(d.supportingFinding.label,'Dopamine synthesis requires distinct substrate and cofactor steps');assert.equal(d.supportingFinding.href,'#pm3-f1');
 assert.ok(html.trim().endsWith('</p>\n    </div>'));
});
test('additional Derived B6 entry reproduces conversion, Direct target and independent numbered evidence',()=>{
 const d=disclosure('Vitamin B6');const html=context.exports.buildDetailHtml(d);
 assert.equal(d.compactQualifier,'Derived · Cofactor Precursor → Pyridoxal 5′-phosphate (PLP; active vitamin B6 cofactor)');
 assert.equal(d.upstreamIndicators.length,0);assert.match(d.readerDescription,/converted into PLP/);
 assert.match(html,/Kennedy \(2016\).*href="#pm-ref-19".*Spector \(1978\).*href="#pm-ref-20"/s);
 assert.ok(html.indexOf('Supporting mechanism research:')>html.indexOf('Limitation</span>'));
 assert.equal(data.dietary_lever_atoms.find(x=>x.atom_id==='PM3-DIT-3').derived_target_atom_id,'PM3-DIT-2');
 assert.equal(data.dietary_lever_atoms.find(x=>x.atom_id==='PM3-DIT-2').requirement_classification,'direct');
});
test('all reference descriptions have reviewed Finding support and omit repeated supply prose',()=>{
 for(const p of data.dietary_lever_presentations){
  const atom=data.dietary_input_traceability.find(x=>x.atom_id===p.atom_id);
  assert.ok(atom.evidence_source.finding_ids.includes(p.description_finding_id));
  assert.ok(data.scientific_findings.some(x=>x.id===p.description_finding_id));
  assert.doesNotMatch(p.reader_description,/PM1|upstream|Supply:/);
 }
});

test('BH4 biochemical extension renders the complete disclosure without dietary classification',()=>{
 const d=disclosure('Tetrahydrobiopterin (BH4)','3.1.2');const html=context.exports.buildDetailHtml(d);
 assert.equal(d.compactQualifier,'Cofactor');assert.doesNotMatch(d.compactQualifier,/Direct|Derived|→/);assert.equal(d.upstreamIndicators.length,0);
 assert.equal(data.dietary_lever_atoms.find(x=>x.atom_id==='PM3-DIT-4').relationship_layer,'biochemical-requirement');
 assert.match(d.readerDescription,/converts tyrosine into L-DOPA/);
 const labels=[...html.matchAll(/detail-k">([^<]+)</g)].map(m=>m[1]);assert.deepEqual(labels,['Input','Input type','Biological role','Evidence source','Limitation']);
 const order=[d.readerDescription,...labels.map(x=>`detail-k">${x}<`),'Supporting mechanism research:'];for(let i=1;i<order.length;i++)assert.ok(html.indexOf(order[i])>html.indexOf(order[i-1]));
 assert.match(html,/Fanet et al\. \(2021\).*href="#pm-ref-1"/s);assert.match(d.evidenceLimitation,/not evidence for dietary BH4 provision/);
 assert.equal(d.supportingFinding.id,'PM3-F1');assert.equal(d.supportingFinding.label,'Dopamine synthesis requires distinct substrate and cofactor steps');
});
test('concise biological role may serve as reader description without forced variation',()=>{
 const d=disclosure('Tetrahydrobiopterin (BH4)','3.1.2');const html=context.exports.buildDetailHtml({...d,readerDescription:d.biologicalRole});
 assert.ok(html.includes(d.biologicalRole));assert.equal([...html.matchAll(/detail-k">/g)].length,5);assert.ok(html.indexOf('Supporting mechanism research:')>html.indexOf('Limitation</span>'));
});

test('citation numbers derive from the target bibliography rather than copied PM3 positions',()=>{
 const reordered={...data,references:[...data.references].reverse()};
 const d=[...buildDietaryLeverDisclosureMap(reordered).values()].find(d=>d.title==='Vitamin B6'&&d.presentationSection==='3.1.1');
 const html=context.exports.buildDetailHtml(d);
 assert.match(html,/Kennedy \(2016\) <a href="#pm-ref-6">\[6\]/);
 assert.match(html,/Spector \(1978\) <a href="#pm-ref-5">\[5\]/);
 assert.doesNotMatch(html,/#pm-ref-19|#pm-ref-20/);
 assert.deepEqual(data.references,canonical.references); // fixture reordering never alters the live source
});
