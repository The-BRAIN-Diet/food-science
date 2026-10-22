// Bounded presentation projection: existing Finding identities and prose only.
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import matter from 'gray-matter';
import {headlineMechanisticFindings} from './lib/scientific-findings.mjs';
import {expectedFindingsSection} from './lib/scientific-findings-gate.mjs';
import {formatPmStudyCitations} from './lib/pm-reference-index.mjs';
const files=[
 'brs2/fm1/brs2-fm1-pm2-betaine-bhmt-remethylation',
 'brs1/fm4/brs1-fm4-pm9-gaba-synthesis-capacity',
 'brs6/fm1/brs6-fm1-pm2-glycaemic-variability-regulation',
 'brs2/fm1/brs2-fm1-pm3-same-synthesis',
 'brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation',
].map(p=>'docs/biological-targets/'+p+'.mdx');
const dir='review/section4-alignment',hash=s=>createHash('sha256').update(s).digest('hex');
if(fs.existsSync(dir+'/manifest.json'))throw Error('Alignment baseline already exists; do not overwrite');
const snapshots=files.map(file=>{const source=fs.readFileSync(file,'utf8'),pm=matter(source);return {file,source,...pm};});
const manifest={registrySha256:hash(fs.readFileSync('system/sec-assessments/registry.json')),pages:[]};
for(const pm of snapshots){
 const findings=headlineMechanisticFindings(pm.data),prefix=pm.data.pm_id.match(/PM\d+$/)[0].toLowerCase();
 const start=pm.content.indexOf('## 4. Mechanistic Basis'),end=pm.content.indexOf('### 4.1 Scientific Findings',start);
 if(start<0||end<0)throw Error('Missing canonical sections: '+pm.file);
 const originalMechanism=pm.content.slice(start,end);
 const rawFront=pm.source.slice(0,pm.source.indexOf(pm.content));
 const originalLessons=[...pm.content.matchAll(/\{\/\* scientific-lesson:(PM\d+-F\d+):start \*\/\}([\s\S]*?)\{\/\* scientific-lesson:\1:end \*\/\}/g)].map(m=>({id:m[1],body:m[2]}));
 const record={file:pm.file,pmId:pm.data.pm_id,frontMatterSha256:hash(rawFront),beforeSha256:hash(pm.source),findings:findings.map(f=>({id:f.id,label:f.finding_label})),originalLessons};
 manifest.pages.push(record);
 if(pm.data.pm_id==='BRS1-FM1-PM1'){record.changed=false;continue;}
 let mechanism=originalMechanism.replace('## 4. Mechanistic Basis','## 4. Mechanistic Basis + Scientific Findings');
 const finding=id=>findings.find(f=>f.id===id);
 const target=id=>prefix+'-mechanism-f'+id.split('-F')[1];
 const support=id=>`Supporting evidence: [${id}](#${id.toLowerCase()}).`;
 function rename(old,id,oldAnchor){
  if(!mechanism.includes('#### '+old+'\n'))throw Error('Topic missing: '+old);
  mechanism=mechanism.replace('#### '+old+'\n',`<span id="${target(id)}" />\n${oldAnchor?`<span id="${oldAnchor}" />\n`:''}\n#### ${id}\n`);
  const at=mechanism.indexOf('#### '+id+'\n'),next=mechanism.indexOf('\n#### ',at+1);
  const insert=next<0?mechanism.indexOf('\n</div>',at):next;
  if(insert<0)throw Error('Topic boundary missing: '+id);
  mechanism=mechanism.slice(0,insert)+`\n\n${support(id)}\n`+mechanism.slice(insert);
 }
 function topic(id){
  const f=finding(id);if(!f)throw Error('Finding missing: '+id);
  const citations=formatPmStudyCitations((f.evidence_considered||[]).map(e=>e.citation_key).filter(Boolean),pm.data.references);
  return `<span id="${target(id)}" />\n\n#### ${id}\n\n${f.finding_statement}${id==='PM2-F3'&&pm.data.pm_id==='BRS6-FM1-PM2'?' '+f.synthesis:''}${id==='PM2-F4'&&pm.data.pm_id==='BRS6-FM1-PM2'?' '+f.synthesis:''} ${citations}\n\n${support(id)}\n\n`;
 }
 if(pm.data.pm_id==='BRS2-FM1-PM2'){
  rename('(The methyl transfer)','PM2-F1','the-methyl-transfer');
  rename('(Choline is a supply route)','PM2-F2','choline-is-a-supply-route');
  mechanism=mechanism.replace('#### (Plasma homocysteine is a shared marker)',topic('PM2-F5')+'#### (Plasma homocysteine is a shared marker)');
 }else if(pm.data.pm_id==='BRS1-FM4-PM9'){
  rename('(Glutamate to GABA conversion)','PM9-F1','glutamate-to-gaba-conversion');
  rename('(Formation of the pyridoxal-5′-phosphate cofactor)','PM9-F2','formation-of-the-pyridoxal-5-phosphate-cofactor');
 }else if(pm.data.pm_id==='BRS2-FM1-PM3'){
  rename('(Methionine adenosyltransferase reaction)','PM3-F1','methionine-adenosyltransferase-reaction');
  rename('(Integration within BRS2)','PM3-F4','integration-within-brs2');
  mechanism=mechanism.replace('#### (Pool state is not synthesis flux)',topic('PM3-F5')+'#### (Pool state is not synthesis flux)');
  mechanism=mechanism.replace('Human MAT2A kinetics support ordered ATP-first, methionine-second binding [[1](#pm-ref-1)], while human MATα2 structures capture the catalytic states and active-site ion coordination [[2](#pm-ref-2)].','Human MAT2A studies support conflicting ATP-first and rapid-equilibrium random substrate-binding models; no settled universal order is asserted. See [PM3-F1](#pm3-f1). Human MATα2 structures capture catalytic states and active-site ion coordination [[2](#pm-ref-2)].');
 }else if(pm.data.pm_id==='BRS6-FM1-PM2'){
  mechanism=mechanism.replace('Seven days of aerobic training reduced excursion frequency, magnitude and duration in type 2 diabetes. Mikus et al. (2012) [[2]](#pm-ref-2)',finding('PM2-F1').finding_statement+' Mikus et al. (2012) [[2]](#pm-ref-2)');
  mechanism=mechanism.replace('#### Biological process',findings.map(f=>topic(f.id)).join('')+'#### Biological process');
 }
 let body=pm.content.slice(0,start)+mechanism+pm.content.slice(end);
 for(const f of findings){
  const marker=`{/* scientific-lesson:${f.id}:start */}`;
  const backlink=`<p><a href="#${target(f.id)}">Mechanistic explanation: ${f.finding_label.replaceAll('&','&amp;').replaceAll('<','&lt;')}</a></p>`;
  if(body.includes(marker))body=body.replace(marker,marker+'\n'+backlink);
  else{
   const node=[...body.matchAll(/<ScientificFinding finding=\{\{[^\n]+ \/>/g)].find(m=>m[0].includes(`"id":"${f.id}"`));
   if(!node)throw Error('Rendered Finding missing: '+f.id);
   const at=node.index+node[0].length;
   body=body.slice(0,at)+`\n\n${marker}\n${backlink}\n{/* scientific-lesson:${f.id}:end */}`+body.slice(at);
  }
 }
 const a=body.indexOf('### 4.1 Scientific Findings'),b=body.indexOf('## 5.',a);
 if(a<0||b<0)throw Error('Findings boundary missing');
 body=body.slice(0,a)+expectedFindingsSection(pm.data,body).block+'\n\n'+body.slice(b);
 for(const f of findings)if(!body.includes(`#### ${f.id}\n`)||!body.includes(`id="${target(f.id)}"`))throw Error('Missing mechanism match: '+f.id);
 record.changed=true;
 record.afterSha256=hash(rawFront+body);
 pm.output=rawFront+body;
}
// All five pages must validate structurally before any source is written.
fs.mkdirSync(dir,{recursive:true});
fs.writeFileSync(dir+'/manifest.json',JSON.stringify(manifest,null,2)+'\n');
for(const pm of snapshots)if(pm.output!==undefined)fs.writeFileSync(pm.file,pm.output);
console.log(manifest.pages.map(p=>p.pmId+': '+p.findings.length+' headline matches; '+(p.changed?'aligned':'already aligned, unchanged')).join('\n'));
