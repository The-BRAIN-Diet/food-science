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
  pages++;
 }
 console.log(name+': Docusaurus MDX compilation and isolation checks passed');
}
assert.equal(pages,4);
console.log('Four demonstration PM sources unchanged; canonical schemas and renderer are not part of this generator.');
