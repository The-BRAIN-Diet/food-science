import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
import vm from 'node:vm';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require=createRequire(import.meta.url);
const matter=require('gray-matter'),ts=require('typescript'),React=require('react');
const {renderToStaticMarkup}=require('react-dom/server');
const runtime=await import('react/jsx-runtime');
const {createProcessor,evaluate}=await import('@mdx-js/mdx');
const layout=require(path.join(root,'src/plugin/pm-lever-layout/index.cjs'));
const fixture=fs.readFileSync(path.join(root,'scripts/fixtures/pm-lever-layout.fixture.mdx'),'utf8');
const source=fs.readFileSync(path.join(root,'docs/biological-targets/brs2/fm3/brs2-fm3-pm7-phosphatidylcholine-formation.mdx'),'utf8');
const canonical=matter(source);
function synthetic(groups,supported=groups){return {pm_id:'PM-LAYOUT-FIXTURE',fixture_only:true,intervention_dominance:'Mixed',references:[{citation_key:'fixture_source'}],scientific_findings:[{id:'FIX-F1',evidence_considered:[{citation_key:'fixture_source'}]}],intervention_dominance_assessment:{evidence_qualification:{label:'Mixed',rationale:'Synthetic qualification only.',scope_note:'Synthetic test fixture only.',routes:supported.map(group_id=>({group_id,evidence_basis:'intervention-effect',intervention_effect:'Simulated intervention changes a simulated endpoint.',context:'Synthetic test dataset only.',limitations:'Not a scientific study or a live admission.',evidence_source:{finding_ids:['FIX-F1'],citation_keys:['fixture_source']}}))},principal_route_selection:{disposition:groups.length?'established':'not-established',selected_groups:groups,rationale:'Synthetic independent principal selection.',comparative_limitations:'Synthetic demonstration only; no real intervention ranking.',joint_prominence_rationale:groups.length>1?'Synthetic complementary substantial effects justify joint prominence.':undefined,assessments:groups.map(group_id=>({group_id,relevance:'Simulated PM-specific endpoint.',directness:'Simulated directly measured intervention effect.',extent:'Simulated substantial influence.'}))}}};}
async function render(data,body=fixture){const evaluated=await evaluate({value:body,data:{frontMatter:data}},{...runtime,remarkPlugins:[layout]});return renderToStaticMarkup(React.createElement(evaluated.default));}
function assertOrder(html,parts){for(let i=1;i<parts.length;i++)assert.ok(html.indexOf(parts[i])>html.indexOf(parts[i-1]),parts.join(' → '));}
for(const groups of [['3.1'],['3.2'],['3.3'],['3.2','3.3'],['3.1','3.2'],['3.1','3.3'],['3.1','3.2','3.3'],[]])test(`shared compiled layout: ${groups.join('+')||'not established'}`,async()=>{
 const data=synthetic(groups),html=await render(data),plan=layout.dominancePlan(data);
 assertOrder(html,['>Mission<','Intervention Dominance:',...plan.promoted.map(id=>`${plan.headings[id]} ${layout.GROUPS[id].title}`),'>Overview<','3. Intervention Levers',...plan.remaining.map(id=>`${plan.headings[id]} ${layout.GROUPS[id].title}`)]);
 for(const id of Object.keys(layout.GROUPS)){assert.equal((html.match(new RegExp(`data-pm-lever-group="${id}"`,'g'))||[]).length,1);assert.ok(html.includes(`${plan.headings[id]} ${layout.GROUPS[id].title}`));}
 assert.ok(html.includes('id="stable-diet-anchor"'));assert.ok(html.includes('id="stable-input-anchor"'));assert.ok(html.includes('data-pm-lever-section="3.1.1"'));assert.ok(html.includes(`${plan.headings['3.1']}.1 Direct and/or Derived`));
 assert.ok(html.includes(plan.label));assert.doesNotMatch(html,/Intervention Profile|Legacy label must not decide placement/);
});
test('legacy presence, FM inheritance and biochemical necessity cannot infer dominance',()=>{
 const data=synthetic([]);delete data.intervention_dominance_assessment;data.intervention_dominance='Diet-Dominant';data.key_constraints=['fixture KC'];data.cofactors=['fixture'];assert.equal(layout.dominancePlan(data),null);
 const invalid=synthetic(['3.1']);invalid.intervention_dominance_assessment.evidence_qualification.routes[0].evidence_basis='biochemical-necessity';assert.throws(()=>layout.dominancePlan(invalid),/cannot establish intervention responsiveness/);
 const missing=synthetic(['3.2']);missing.intervention_dominance_assessment.evidence_qualification.routes[0].evidence_source.finding_ids=['missing'];assert.throws(()=>layout.dominancePlan(missing),/canonical Findings/);
});
test('PM7 contextual diet decision cites intervention evidence rather than provision tracing',()=>{
 assert.deepEqual(layout.validateDominanceAssessment(canonical.data),[]);assert.deepEqual(layout.dominancePlan(canonical.data).promoted,[]);assert.deepEqual(canonical.data.intervention_dominance_assessment.evidence_qualification.routes[0].evidence_source.finding_ids,['PM7-F5']);assert.match(canonical.data.intervention_dominance_assessment.evidence_qualification.scope_note,/not establish absolute PEMT flux/);
 const tree=createProcessor().parse(canonical.content);layout.applyLeverLayout(tree,canonical.data);const groups=tree.children.filter(n=>n.attributes?.some(a=>a.name==='data-pm-lever-group'));assert.equal(groups.length,3);const overview=tree.children.findIndex(n=>n.type==='heading'&&n.depth===3&&n.children?.some(c=>c.value==='Overview'));const section3=tree.children.findIndex(n=>n.type==='heading'&&n.depth===2&&n.children?.some(c=>c.value==='3. Levers'));assert.ok(overview<section3);for(const group of groups)assert.ok(tree.children.indexOf(group)>section3);assert.match(layout.dominancePlan(canonical.data).label,/^Diet-Supported — No principal intervention route established$/);const serialized=JSON.stringify(groups);assert.match(serialized,/3.1.3 Key Constraints/);assert.match(serialized,/data-pm-lever-section/);
});
test('canonical lookup uses stable IDs after visible renumbering',()=>{
 const source=fs.readFileSync(path.join(root,'src/components/PmDietaryLeverEnhancer.tsx'),'utf8');const start=source.indexOf('function presentationSectionForListItem');const end=source.indexOf('function closeAllExcept',start);const context={exports:{}};vm.createContext(context);vm.runInContext(ts.transpileModule(source.slice(start,end)+'\nexport {presentationSectionForListItem}',{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,context);
 const li={closest(selector){return selector==='[data-pm-lever-section]'?{getAttribute(){return '3.1.3'}}:null;}};assert.equal(context.exports.presentationSectionForListItem(li),'3.1.3');
 for(const group of ['3.2','3.3']){const item={closest(selector){return selector==='[data-pm-lever-group]'?{getAttribute(){return group}}:null;}};assert.equal(context.exports.presentationSectionForListItem(item),group);}
});
test('documented PM7 assessment and plan code execute against the actual layout',()=>{
 const doc=fs.readFileSync(path.join(root,'system/dietary-input-traceability-contract.md'),'utf8');function excerpt(name){const chunk=doc.split(`<!-- DOMINANCE-REFERENCE:${name} -->`)[1]?.split(`<!-- /DOMINANCE-REFERENCE:${name} -->`)[0];assert.ok(chunk);return chunk.slice(chunk.indexOf('\n',chunk.indexOf('```'))+1,chunk.lastIndexOf('```')).trimEnd();}
 const documented=matter('---\n'+excerpt('pm7')+'\n---\n').data;assert.deepEqual(documented.intervention_dominance_assessment,canonical.data.intervention_dominance_assessment);
 const actual=fs.readFileSync(path.join(root,'src/plugin/pm-lever-layout/index.cjs'),'utf8');assert.ok(actual.includes(excerpt('plan')));assert.deepEqual(layout.dominancePlan({...canonical.data,...documented}),layout.dominancePlan(canonical.data));
 const example=matter('---\n'+excerpt('joint-fixture')+'\n---\n').data;assert.deepEqual(layout.dominancePlan({...synthetic(['3.2','3.3']),...example}).promoted,['3.2','3.3']);
 const schema=fs.readFileSync(path.join(root,'system/primary-mechanism-schema.md'),'utf8');assert.ok(schema.includes(excerpt('plan')));assert.ok(schema.includes(excerpt('pm7')));
});

test('supported routes do not automatically become principal or jointly prominent',async()=>{
 const data=synthetic([],['3.1','3.2']);const plan=layout.dominancePlan(data);assert.deepEqual(plan.promoted,[]);assert.match(plan.label,/Mixed.*No principal/);const html=await render(data);assertOrder(html,['>Mission<','Intervention Dominance:','>Overview<','3. Intervention Levers','3.1 Dietary Requirements']);
 const one=synthetic(['3.1'],['3.1','3.2']);assert.deepEqual(layout.dominancePlan(one).remaining,['3.2','3.3']);
 const joint=synthetic(['3.1','3.2']);delete joint.intervention_dominance_assessment.principal_route_selection.joint_prominence_rationale;assert.throws(()=>layout.dominancePlan(joint),/Joint prominence/);
 const unqualified=synthetic(['3.3'],['3.1']);assert.throws(()=>layout.dominancePlan(unqualified),/qualified intervention evidence/);
 const relabelled=synthetic([]);relabelled.intervention_dominance_assessment.evidence_qualification.label='Diet-Dominant';assert.throws(()=>layout.dominancePlan(relabelled),/preserve the canonical/);
 const inadequatelySelected=synthetic(['3.1']);delete inadequatelySelected.intervention_dominance_assessment.principal_route_selection.assessments[0].extent;assert.throws(()=>layout.dominancePlan(inadequatelySelected),/missing extent/);
});

test('already promoted legacy PM3 group uses section-1 numbering without a new dominance decision',()=>{
 const pm=matter(fs.readFileSync(path.join(root,'docs/biological-targets/brs2/fm1/brs2-fm1-pm3-same-synthesis.mdx'),'utf8'));
 assert.equal(pm.data.intervention_dominance_assessment,undefined);
 const tree=createProcessor().parse(pm.content);
 const order=tree.children.map(n=>n);
 layout.applyLeverLayout(tree,pm.data);
 assert.deepEqual(tree.children,order); // same nodes and positions, no re-selection or movement
 const group=tree.children.find(n=>n.attributes?.some(a=>a.name==='data-pm-lever-group'&&a.value==='3.1'));
 assert.ok(group);
 const rendered=JSON.stringify(group);
 assert.match(rendered,/1.1 Dietary Requirements/);
 assert.match(rendered,/1.1.1 Direct and\/or Derived Dietary Requirements/);
 assert.match(rendered,/1.1.2 Cofactors and Substrates/);
 assert.match(rendered,/1.1.3 Key Constraints/);
 assert.match(rendered,/data-pm-lever-section/);
 assert.match(rendered,/3.1.3/);
 assert.equal(pm.data.intervention_dominance,'Diet-Supported');
});
