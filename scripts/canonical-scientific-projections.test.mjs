import fs from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';
import matter from 'gray-matter';
import Module,{createRequire} from 'node:module';
import ts from 'typescript';
import {renderToStaticMarkup} from 'react-dom/server';
import React from 'react';
const file='docs/biological-targets/brs-x/circadian/fm1/brs-x-circadian-fm1-pm3-melatonin-biosynthesis-and-availability.mdx';
const {data:pm,content}=matter(fs.readFileSync(file,'utf8'));
const explorer=JSON.parse(fs.readFileSync('static/explore/pm-explorer/pm-sources.json'));
test('every Explorer mission is the canonical current PM mission',()=>{
 for(const p of explorer.pms)assert.equal(p.mission,matter(fs.readFileSync(p.file,'utf8')).data.mission,p.id);
});
test('PM3 Mission renders canonical frontmatter without a separate prose value',()=>{
 assert.match(content,/### Mission\s+<CanonicalPmMission \/>/);
 const path=process.cwd()+'/src/components/CanonicalPmMission.tsx',mod=new Module(path),require=createRequire(path);
 mod.require=id=>id==='@docusaurus/plugin-content-docs/client'?{useDoc:()=>({frontMatter:pm})}:require(id);
 mod._compile(ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React,esModuleInterop:true}}).outputText,path);
 assert.equal(renderToStaticMarkup(React.createElement(mod.exports.default)),renderToStaticMarkup(React.createElement('p',null,pm.mission)));
});
test('unresolved PM3 remains unresolved across source and food projections',()=>{
 const relationship=explorer.relationships.find(r=>r.id===pm.pm_id+'::PM3-DIT-1');
 assert.equal(relationship.scientific_admission,'unresolved');assert.notEqual(relationship.dietary_input,true);
 assert.equal(explorer.foods.filter(f=>f.pm===pm.pm_id&&f.substance==='tryptophan').length,0);
 assert.match(JSON.stringify(pm),/Serotonin, N-acetylserotonin and melatonin have no canonical substance identities/);
 assert.match(content,/benefit from additional intake is not established/);
 assert.doesNotMatch(content,/Dietary input = Unset|derived gate stays unresolved/);
});
