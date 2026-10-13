/** Focused compiler/preservation checks for the isolated demonstration only. */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import matter from 'gray-matter';
const require=createRequire(import.meta.url);
const {compileToJSX}=require('@docusaurus/mdx-loader/lib/utils');
const root=process.cwd(), folder='docs/system/dietary-requirements-demo';
const options={siteDir:root,staticDirs:[path.join(root,'static')],admonitions:true,markdownConfig:{anchors:{maintainCase:false},mermaid:true,mdx1Compat:{comments:true}}};
let pages=0;
for(const name of fs.readdirSync(folder).filter(f=>f.endsWith('.mdx'))){
 const filePath=path.resolve(folder,name),fileContent=fs.readFileSync(filePath,'utf8'),{data}=matter(fileContent);
 assert.equal(data.unlisted,true);
 assert.equal(data.pm_id,undefined,'Preview must not register another canonical PM');
 const compiled=await compileToJSX({filePath,fileContent,frontMatter:data,options,compilerName:'client'});
 assert.ok(compiled.content.includes('MDXContent'));
 if(name!=='index.mdx'){
  const source=fileContent.match(/Source: `([^`]+)`/)[1];
  assert.equal(crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex'),data.source_sha256);
  for(const heading of ['1.1.1 Direct and/or Derived Dietary Requirements','1.1.2 Cofactors and Substrates','1.1.3 Key Constraints','SOP boundary','Demonstration review notes'])assert.ok(fileContent.includes(heading));
  assert.ok(fileContent.includes('```mermaid'));
  assert.ok(fileContent.includes('## Pilot B/D assessment and allocation'));
  const dietary=fileContent.split('### 1.1.1 Direct and/or Derived Dietary Requirements')[1].split('### 1.1.2 Cofactors and Substrates')[0];
  const biochemical=fileContent.split('### 1.1.2 Cofactors and Substrates')[1].split('### 1.1.3 Key Constraints')[0];
  const expected={
    'same-synthesis.mdx':{diet:['Methionine'],bio:['ATP','Mg²⁺ and K⁺'],excluded:['Methionine']},
    'dopamine.mdx':{diet:['Tyrosine','Iron','Vitamin B6'],bio:['BH4','L-DOPA'],excluded:['Tyrosine','Iron','PLP']},
    'gaba-synthesis.mdx':{diet:['Vitamin B6'],bio:['Glutamate'],excluded:['PLP']},
    'nad-metabolism.mdx':{diet:['Nicotinamide (a form of vitamin B3)','Nicotinic acid (a form of vitamin B3)','Tryptophan'],bio:['NAD⁺ / NADH'],excluded:['Nicotinamide','Nicotinic acid','Tryptophan']}
  }[name];
  for(const input of expected.diet)assert.ok(dietary.includes('| '+input+' |'), 'Missing primary dietary entry: '+input);
  for(const input of expected.bio)assert.ok(biochemical.includes('| '+input+' |'), 'Missing biochemical-only entry: '+input);
  for(const input of expected.excluded)assert.ok(!biochemical.includes('| '+input+' |'), 'Duplicate primary explanation: '+input);
  assert.equal(dietary.split('\n').filter(line=>line.startsWith('| ') && !line.startsWith('| Accepted') && !line.startsWith('| ---')).length,expected.diet.length);
  assert.equal(biochemical.split('\n').filter(line=>line.startsWith('| ') && !line.startsWith('| Participant') && !line.startsWith('| ---')).length,expected.bio.length);

  pages++;
 }
 console.log(name+': Docusaurus MDX compilation and isolation checks passed');
}
assert.equal(pages,4);
console.log('Four demonstration PM sources unchanged; canonical schemas and renderer are not part of this generator.');
