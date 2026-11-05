import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {createRequire} from 'node:module';
import {createDietaryPathwayIndex} from './lib/dietary-pathway-index.mjs';
import {readReviewJson} from './lib/review-json.mjs';
import {buildDietaryPathwayIndex,validateFormationPathway} from '../src/lib/dietaryPathways.mjs';
const require=createRequire(import.meta.url),React=require('react'),{renderToStaticMarkup}=require('react-dom/server'),ts=require('typescript');
const index=createDietaryPathwayIndex(process.cwd());

test('complete canonical inventory, no phantom admission, exact source PMs',()=>{
 assert.equal(index.inventory.length,65);assert.equal(new Set(index.inventory.map(r=>r.pm)).size,65);
 assert.equal(index.errors.length,0);
 assert.ok(index.paths.some(p=>p.pm==='BRS5-FM2-PM5'&&p.substance_id==='resistant-starch'&&p.target_id==='butyrate'));
 assert.ok(!index.paths.some(p=>p.pm==='BRS5-FM1-PM1'));
 assert.ok(!index.paths.some(p=>p.substance_id==='fructo-galacto-oligosaccharides'));
 assert.ok(index.paths.every(p=>p.downstream_pm_admission===false));
});
test('banana and preparation-specific RS foods remain composition edges, apple remains provisional',()=>{
 const rs=index.paths.find(p=>p.pm==='BRS5-FM2-PM5'&&p.target_id==='butyrate');
 const banana=rs.food_targets.find(f=>f.food_id==='bananas');assert.ok(banana);assert.equal(banana.mapping_status,'verified');assert.equal(banana.substance_id,'resistant-starch');assert.ok(banana.preparation);
 assert.ok(rs.food_targets.some(f=>f.food_id==='potatoes'&&f.preparation));
 const pectin=index.paths.find(p=>p.pm==='BRS5-FM2-PM5'&&p.substance_id==='pectin');assert.equal(pectin.target_id,'scfas');
 assert.equal(pectin.food_targets.find(f=>f.food_id==='apples').mapping_status,'research-supported-provisional');
 assert.ok(!index.paths.some(p=>p.substance_id==='pectin'&&p.target_id==='butyrate'));
});
test('B6 alternative reaction order and PM-specific Derived admission are retained',()=>{
 const p=index.paths.find(p=>p.pm==='BRS1-FM4-PM9');assert.equal(p.pm_specific_status,'admitted-derived-pathway');assert.equal(p.classification,'derived');
 assert.equal(p.conversion_pathway[0].routes.length,3);assert.ok(p.food_targets.length);
});
test('missing identities, absent conversion evidence, missing microbial dependencies fail closed',()=>{
 const edge=index.edges.find(e=>e.id==='RS-MICROBIAL-BUTYRATE');
 const identities={'resistant-starch':{exists:true},butyrate:{exists:true}};
 assert.deepEqual(validateFormationPathway(edge,identities),[]);
 assert.ok(validateFormationPathway(edge,{}).length);
 assert.ok(validateFormationPathway({...edge,evidence:{}},identities).length);
 assert.ok(validateFormationPathway({...edge,dependencies:[]},identities).length);
});
test('cyclic graphs are bounded and an unresolved conversion is not traversed',()=>{
 const ev={statement:'fixture evidence',sources:['https://example.org/primary']};
 const e=(id,from,to,status='supported')=>({id,from,to,status,relationship:'endogenous-formation',process:'conversion',limitations:'fixture only',evidence:ev});
 const result=buildDietaryPathwayIndex({registeredIdentities:{a:{exists:true},b:{exists:true},c:{exists:true}},docs:[{frontMatter:{formation_pathways:[e('ab','a','b'),e('ba','b','a'),e('bc','b','c','unresolved')]}}],scopes:[{relationships:[{id:'P::A',pm:'P',scientific_admission:'admitted',substance_id:'a',food_targets:[]}]}]});
 assert.equal(result.paths.length,1);assert.equal(result.paths[0].target_id,'b');assert.equal(result.blocked.length,1);
});
function render(fm,targetId,permalink='/docs/test'){
 const module={exports:{}};vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/components/DietaryPathways/index.tsx','utf8'),{compilerOptions:{jsx:ts.JsxEmit.React,module:ts.ModuleKind.CommonJS,esModuleInterop:true}}).outputText,{module,exports:module.exports,require:n=>n==='react'?React:n.includes('EvidenceGaps/Disclosure')?({children,title,label})=>React.createElement('details',null,React.createElement('summary',null,label,' · ',title),children):n.includes('plugin-content-docs')?{useDoc:()=>({metadata:{permalink},frontMatter:fm})}:n.includes('useGlobalData')?{usePluginData:()=>({dietaryPathways:index})}:n.includes('Link')?({children,to,...props})=>React.createElement('a',{href:to,...props},children):require(n)});
 return renderToStaticMarkup(React.createElement(module.exports.default,{targetId}));
}
test('withdrawn technical panels render nothing for every affected page and explicit entry point',()=>{
 const inventory=JSON.parse(fs.readFileSync('review/presentation-repair-2026-11-02/affected-pages.json'));
 for(const row of inventory.automatic)assert.equal(render({pm_id:row.type==='PM'?row.id:undefined,tags:['Eggs']},undefined,row.route),'',row.route);
 for(const row of inventory.embedded)assert.equal(render({},row.target,row.route),'',row.route);
 const shell=fs.readFileSync('src/theme/DocItem/Content/index.tsx','utf8');assert.doesNotMatch(shell,/<DietaryPathways/);
});
test('SEC immutable history and prior PM admissions remain unchanged',()=>{
 const old=readReviewJson('review/dietary-pathway-activation-2026-10-26/before/sec-registry.json');
 assert.deepEqual(JSON.parse(fs.readFileSync('system/sec-assessments/registry.json')),old);
});

test('changed canonical substance documents compile through the real MDX processor',async()=>{
 const {createProcessorUncached}=await import('@docusaurus/mdx-loader/lib/processor.js');
 const matter=(await import('gray-matter')).default;
 for(const file of ['docs/substances/microbial-metabolites/scfas/butyrate.md','docs/substances/microbial-metabolites/scfas/scfas.md']){
  const d=matter(fs.readFileSync(file,'utf8'));
  const processor=await createProcessorUncached({options:{siteDir:process.cwd(),staticDirs:[path.resolve('static')],markdownConfig:{anchors:{maintainCase:false},format:'mdx',mermaid:false,mdx1Compat:{comments:true,admonitions:true,headingIds:true}},remarkPlugins:[],rehypePlugins:[],admonitions:true},format:'mdx'});
  const compiled=await processor.process({content:d.content,filePath:path.resolve(file),frontMatter:d.data,compilerName:'server'});assert.ok(compiled.content);
 }
});

test('recipe ingredient tags never inject a technical pathway panel',()=>{
 const food=index.paths.flatMap(p=>p.food_targets)[0];
 assert.ok(food,'fixture has a genuinely pathway-linked food');
 const fm={tags:[food.food_title,food.food_id]};
 assert.equal(render(fm,undefined,'/docs/recipes/snacks/neuroeshot-roe/'),'');
 assert.equal(render(fm,'butyrate','/docs/recipes/snacks/neuroeshot-roe/'),'');
 assert.equal(render({},'butyrate'),'');
});
