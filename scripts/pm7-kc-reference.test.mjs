import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import matter from 'gray-matter';
import ts from 'typescript';
import vm from 'node:vm';
import { buildDietaryLeverDisclosureMap, dietaryLeverBulletKey } from './lib/dietary-lever-disclosure.mjs';
import { validateDietaryInputTraceability } from './lib/dietary-input-traceability.mjs';
import { validateDietaryLeverAtoms } from './lib/dietary-lever-atoms.mjs';
import { validatePmKcGovernance, buildCanonicalKcIndex } from './lib/kc-evidence-governance.mjs';
const pmPath='docs/biological-targets/brs2/fm3/brs2-fm3-pm7-phosphatidylcholine-formation.mdx';
const source=fs.readFileSync(pmPath,'utf8');const {data,content}=matter(source);
const contract=fs.readFileSync('system/dietary-input-traceability-contract.md','utf8');
const client=fs.readFileSync('src/lib/dietaryLeverDisclosure.ts','utf8');
const component=fs.readFileSync('src/components/PmDietaryLeverEnhancer.tsx','utf8');
function excerpt(prefix,name){const part=contract.split(`<!-- ${prefix}:${name} -->`)[1]?.split(`<!-- /${prefix}:${name} -->`)[0];assert.ok(part);return part.slice(part.indexOf('\n',part.indexOf('```'))+1,part.lastIndexOf('```')).trimEnd();}
const substancePages=JSON.parse(fs.readFileSync('src/data/substance-input-pages.json','utf8'));
const context={exports:{},require(id){if(String(id).endsWith('substance-input-pages.json'))return{default:substancePages};throw new Error(id);}};vm.createContext(context);
vm.runInContext(ts.transpileModule(client,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,context);
const clientMap=context.exports.buildDietaryLeverDisclosureMap(data);
const renderContext={exports:{},pmReferenceHref:context.exports.pmReferenceHref};vm.createContext(renderContext);
const functions=component.slice(component.indexOf('function renderEvidenceLinks'),component.indexOf('function presentationSectionForListItem'));
vm.runInContext(ts.transpileModule(functions+'\nexport {buildDetailHtml};',{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,renderContext);
const map=buildDietaryLeverDisclosureMap(data);
function get(label,section='3.1.3'){const d=map.get(dietaryLeverBulletKey(label,'',section));assert.ok(d,label);return d;}
function checkHtml(d){const html=renderContext.exports.buildDetailHtml(d);const labels=[...html.matchAll(/detail-k">([^<]+)</g)].map(m=>m[1]);assert.deepEqual(labels,['Input','Input type','Biological role','Evidence source','Limitation']);const order=[d.readerDescription,...labels.map(x=>`detail-k">${x}<`),'Supporting mechanism research:'];for(let i=1;i<order.length;i++)assert.ok(html.indexOf(order[i])>html.indexOf(order[i-1]));return html;}
test('PM7 scientific and KC ownership records validate against canonical KC definitions',()=>{
 const kcPaths=['brs2-kc1-one-carbon-donor-pool.mdx','brs2-kc2-methionine-transsulfuration-substrate-pool.mdx'];const index=buildCanonicalKcIndex(kcPaths.map(f=>matter(fs.readFileSync('docs/biological-targets/brs2/kc/'+f,'utf8')).data));
 const issues=[];validateDietaryInputTraceability(data,issues,{entityLabel:data.pm_id});validateDietaryLeverAtoms(data,issues,{entityLabel:data.pm_id});validatePmKcGovernance(data,issues,{entityLabel:data.pm_id,canonicalKcIndex:index});assert.deepEqual(issues,[]);
 assert.equal(data.kc_applicability_adjudications[0].disposition,'established');assert.equal(data.kc_applicability_adjudications[1].disposition,'unresolved');
 assert.equal(data.pm_kc_relationships.length,1);assert.equal(data.key_constraints.length,1);
});
test('client and script projections agree for relationship and independently supported constituents',()=>{
 for(const [label,section] of [['Folate','3.1.3'],['Betaine','3.1.3'],['Choline','3.1.3']]){
  const key=dietaryLeverBulletKey(label,'',section);assert.deepEqual(JSON.parse(JSON.stringify(clientMap.get(key))),JSON.parse(JSON.stringify(map.get(key))));checkHtml(get(label,section));
 }
});
test('conditional KC1 renders evidence while KC2 remains audit-only',()=>{
 const kc1=get('Methyl Donor Pool');assert.equal(kc1.compactQualifier,'Conditional applicability');assert.equal(kc1.titleHref,'/docs/biological-targets/brs2/kc/brs2-kc1-one-carbon-donor-pool');const html=checkHtml(kc1);assert.match(html,/Chew et al\. \(2011\)/);assert.match(html,/Kharbanda et al\. \(2007\)/);assert.equal(kc1.supportingFinding.href,'#pm7-f5');
 assert.doesNotMatch(content,/data-brs-kc-assessment|Assessment pending|Methionine–Cysteine Sulfur Amino Acid Pool/);
 assert.equal(map.has(dietaryLeverBulletKey('Methionine–Cysteine Sulfur Amino Acid Pool','','3.1.3')),false);
 assert.equal(data.kc_applicability_adjudications[1].disposition,'unresolved');assert.match(data.kc_applicability_adjudications[1].rationale,/intake adequacy, inhibitor specificity and competing effects/);
});
test('no wholesale constituent import or Direct/Derived leakage',()=>{
 const rows=data.pm_kc_relationships[0].constituent_relationships;assert.deepEqual(rows.map(row=>row.pm_atom_id),['PM7-DIT-5','PM7-DIT-6','PM7-DIT-3']);
 for(const label of ['Folate','Betaine','Choline'])assert.equal(get(label).compactQualifier,'');
 assert.equal(map.has(dietaryLeverBulletKey('Cysteine','','3.1.3')),false);assert.equal(map.has(dietaryLeverBulletKey('Vitamin B12','','3.1.3')),false);
 assert.equal(data.dietary_lever_atoms.filter(row=>['PM7-DIT-5','PM7-DIT-6'].includes(row.atom_id)).every(row=>row.relationship_layer==='kc-relevance'&&!row.requirement_classification),true);
});
test('unresolved assessment cannot silently become an established mapping',()=>{
 const modified=structuredClone(data);modified.pm_kc_relationships.push({...modified.kc_applicability_adjudications[1],relationship_id:'invalid-mapping'});const issues=[];validatePmKcGovernance(modified,issues,{entityLabel:data.pm_id});assert.ok(issues.some(x=>x.code==='pm_kc_without_established_adjudication'));
 const unresolved=structuredClone(data);unresolved.kc_applicability_adjudications[0].disposition='unresolved';assert.equal(buildDietaryLeverDisclosureMap(unresolved).has(dietaryLeverBulletKey('Methyl Donor Pool','','3.1.3')),false);
 assert.equal(buildDietaryLeverDisclosureMap(unresolved).has(dietaryLeverBulletKey('Folate','','3.1.3')),false);
 assert.ok(buildDietaryLeverDisclosureMap(unresolved).has(dietaryLeverBulletKey('Choline','','3.1.1')));
 const bad=structuredClone(data);bad.pm_kc_relationships[0].description_finding_id='PM7-F7';const gaps=[];validatePmKcGovernance(bad,gaps,{entityLabel:data.pm_id});assert.ok(gaps.some(x=>x.code==='pm_kc_disclosure_unsupported_finding'));

});
test('minimum Stage 2B integration example matches live records and executes the shared renderer',()=>{
 const anchor='reference_source: &ref_1 '+JSON.stringify(data.kc_applicability_adjudications[0].evidence_source)+'\n';const example=matter('---\n'+anchor+excerpt('PM7-KC-REFERENCE','records')+'\n---\n').data;
 assert.deepEqual(example.dietary_input_traceability[0],data.dietary_input_traceability.find(row=>row.atom_id==='PM7-DIT-5'));
 const canonical=data.pm_kc_relationships[0];for(const [key,value] of Object.entries(example.pm_kc_relationships[0])){if(key==='constituent_relationships')assert.deepEqual(value[0],canonical.constituent_relationships[0]);else assert.deepEqual(value,canonical[key]);}
 assert.ok(client.includes(excerpt('PM7-KC-REFERENCE','projection')));for(const name of ['origin-link','origin-append','origin-resolution','interaction'])assert.ok(component.includes(excerpt('PM7-KC-REFERENCE',name)));assert.ok(source.includes(excerpt('PM7-KC-REFERENCE','markdown')));
 const fixture={...data,dietary_input_traceability:[...data.dietary_input_traceability.filter(row=>row.atom_id!=='PM7-DIT-5'),...example.dietary_input_traceability],pm_kc_relationships:example.pm_kc_relationships.map(row=>({...canonical,...row}))};
 const fm=buildDietaryLeverDisclosureMap(fixture);for(const input of ['Folate','Betaine','Choline']){const disclosure=fm.get(dietaryLeverBulletKey(input,'','3.1.3'));checkHtml(disclosure);assert.equal(disclosure.originTag.text,'KC1: Methyl Donor Pool');assert.equal(new URL(disclosure.originTag.href,'https://thebraindiet.org').href,'https://thebraindiet.org/docs/biological-targets/brs2/kc/brs2-kc1-one-carbon-donor-pool');}
});

test('public input names and provenance are separate from scientific admission',()=>{
 const panel=content.split('<strong>3.1.3 Key Constraints</strong>')[1].split('<strong>3.2 System Optimisation Practices</strong>')[0];
 assert.doesNotMatch(panel,/Established mapping|Independently supported|Methyl Donor Pool|methyl provision/);
 for(const name of ['Folate','Betaine','Choline']){assert.ok(panel.includes('- '+name));assert.equal(get(name).title,name);assert.equal(get(name).originTag.text,'KC1: Methyl Donor Pool');}
 const missing=structuredClone(data);missing.pm_kc_relationships[0].constituent_relationships.shift();assert.equal(buildDietaryLeverDisclosureMap(missing).has(dietaryLeverBulletKey('Folate','','3.1.3')),false);
});
// Minimal DOM event fixture; functions below are extracted from the actual shared renderer.
class ElementFixture {
 constructor(tag,doc){this.tagName=tag;this.doc=doc;this.children=[];this.parentElement=null;this.dataset={};this.attributes={};this.listeners={};this.textContent='';this.hidden=false;this.className='';this.classList={add:(name)=>{this.className+=' '+name},contains:(name)=>this.className.split(' ').includes(name)};}
 append(...nodes){for(const node of nodes){node.parentElement=this;this.children.push(node)}}
 setAttribute(k,v){this.attributes[k]=v} getAttribute(k){return this.attributes[k]}
 addEventListener(name,fn){(this.listeners[name]??=[]).push(fn)}
 contains(node){return node===this||this.children.some(child=>child.contains?.(node))}
 descendants(){return this.children.flatMap(child=>[child,...(child.descendants?.()||[])])}
 closest(){for(let node=this;node;node=node.parentElement)if(node.className.includes('brs-dietary-lever-item'))return node;return null}
 querySelector(){return this.descendants().find(node=>node.tagName==='button')||null}
 querySelectorAll(){return this.descendants().filter(node=>node.className==='brs-dietary-lever-detail'&&!node.hidden)}
 emit(name,properties={},bubble=false){const event={target:this,relatedTarget:null,pointerType:'mouse',stopPropagation(){this.stopped=true},...properties};for(let node=this;node;node=bubble&&!event.stopped?node.parentElement:null)for(const fn of node.listeners[name]||[])fn(event);}
 focus(){const previous=this.doc.activeElement;if(previous===this)return;this.doc.activeElement=this;if(previous)previous.emit('focusout',{relatedTarget:this},true);this.emit('focus');this.emit('focusin',{},true)}
}
function interactionFixture(disclosure){
 const doc={activeElement:null,createElement(tag){return new ElementFixture(tag,this)},createTextNode(text){const node=new ElementFixture('#text',this);node.textContent=text;return node}};
 const ctx={exports:{},document:doc,parseLeverBullet:context.exports.parseLeverBullet,pmReferenceHref:context.exports.pmReferenceHref};vm.createContext(ctx);
 const actual=component.slice(component.indexOf('function renderEvidenceLinks'),component.indexOf('function enhanceEvidenceTitle'));
 vm.runInContext(ts.transpileModule(actual+'\nexport {enhanceListItem};',{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,ctx);
 const root=doc.createElement('div'),li=doc.createElement('li');li.textContent=disclosure.title;root.append(li);ctx.exports.enhanceListItem(li,disclosure,root);
 return {doc,root,li,trigger:li.children.find(n=>n.tagName==='button'),origin:li.children.find(n=>n.className==='brs-dietary-lever-origin-link'),detail:li.children.find(n=>n.className==='brs-dietary-lever-detail')};
}
test('shared handlers preview, pin, dismiss and keep origin navigation separate',()=>{
 for(const name of ['Folate','Betaine','Choline']){
  const {doc,li,trigger,origin,detail}=interactionFixture(get(name));assert.equal(trigger.textContent,name);assert.equal(trigger.contains(origin),false);assert.equal(detail.hidden,true);
  trigger.emit('pointerenter');assert.equal(detail.hidden,false);assert.notEqual(li.dataset.brsDietaryLeverPinned,'true');li.emit('pointerleave');assert.equal(detail.hidden,true);
  origin.emit('pointerenter');origin.focus();assert.equal(detail.hidden,true);origin.emit('click',{},true);assert.equal(detail.hidden,true);
  trigger.focus();assert.equal(detail.hidden,false);trigger.emit('click',{},true);assert.equal(li.dataset.brsDietaryLeverPinned,'true');li.emit('pointerleave');assert.equal(detail.hidden,false);
  trigger.emit('click',{},true);assert.equal(detail.hidden,true);
  trigger.focus();trigger.emit('click',{},true);detail.emit('keydown',{key:'Escape'},true);assert.equal(detail.hidden,true);assert.equal(doc.activeElement,trigger);assert.equal(trigger.getAttribute('aria-expanded'),'false');
  trigger.emit('pointerenter',{pointerType:'touch'});assert.equal(detail.hidden,true);trigger.emit('click',{},true);assert.equal(detail.hidden,false);li.emit('pointerleave',{pointerType:'touch'});assert.equal(detail.hidden,false);trigger.emit('click',{},true);assert.equal(detail.hidden,true);
 }
});

test('shared interaction change preserves an existing PM3 dietary dropdown',()=>{
 const pm3=matter(fs.readFileSync('docs/biological-targets/brs1/fm1/brs1-fm1-pm3-dopaminergic-signalling-regulation.mdx','utf8')).data;
 const dietary=buildDietaryLeverDisclosureMap(pm3).get(dietaryLeverBulletKey('Tyrosine','','3.1.1'));
 const {doc,trigger,detail,origin}=interactionFixture(dietary);assert.equal(origin,undefined);assert.equal(trigger.textContent,'Tyrosine');
 trigger.focus();assert.equal(detail.hidden,false);trigger.emit('click',{},true);detail.emit('keydown',{key:'Escape'},true);assert.equal(detail.hidden,true);assert.equal(doc.activeElement,trigger);
});

test('governing PM schema embeds the same executable canonical Stage 2B example',()=>{
 const schema=fs.readFileSync('system/primary-mechanism-schema.md','utf8');
 const embedded=schema.split('<!-- PM7-KC-CANONICAL-EXAMPLE:begin -->')[1]?.split('<!-- PM7-KC-CANONICAL-EXAMPLE:end -->')[0].trim();
 const start=contract.indexOf('### Admitted PM-owned KC input disclosure');
 const nextLayout=contract.indexOf('### Evidence-adjudicated intervention dominance',start);
 const end=nextLayout<0?contract.indexOf('\n## 8',start):nextLayout;
 assert.equal(embedded,contract.slice(start,end).trim());
 assert.doesNotMatch(schema,/Render the linked iKC title|index of applicable or proposed iKCs/);
 // Identical record/projection/interaction blocks execute in the tests above.
});
