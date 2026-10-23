/** Prepare the actual browser client and current canonical records for integration verification. */
import fs from 'node:fs';import ts from 'typescript';
import {buildInputSubstanceFood} from './lib/input-substance-food.mjs';
import {escapeHtml} from '../src/lib/foodTargetTraceability.mjs';
const dir='review/rapid-stage2ab-2026-10-23/';fs.mkdirSync(dir+'client',{recursive:true});
for(const name of ['foodTargetTraceability','foodTargetReconciliation','dietaryInputGovernance'])fs.copyFileSync('src/lib/'+name+'.mjs',dir+'client/'+name+'.mjs');
fs.copyFileSync('src/data/inputSubstanceFoodSelection.mjs',dir+'client/inputSubstanceFoodSelection.mjs');
fs.writeFileSync(dir+'client/inputMappingScopes.mjs','export default {};\n');
const js=ts.transpileModule(fs.readFileSync('src/lib/pmInputFoodDisclosure.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText.replace('../data/inputMappingScopes.mjs','./inputMappingScopes.mjs').replace('../data/inputSubstanceFoodSelection.mjs','./inputSubstanceFoodSelection.mjs');
fs.writeFileSync(dir+'client/browser-disclosure.mjs',js);
const cases=[['BRS5','BRS5-FM2-PM5','Resistant starch'],['BRS5','BRS5-FM2-PM5','Pectin'],['BRS4','BRS4-FM1-PM2','Nicotinamide (a form of vitamin B3)'],['BRS5','BRS5-FM2-PM6','Ellagitannins']];

let sections=[];let scopes={};
for(const [brs,pm,input]of cases){const d=scopes[brs]||buildInputSubstanceFood(process.cwd(),{brs});scopes[brs]=d;const r=d.relationships.find(r=>r.pm===pm&&r.input===input);if(!r)throw Error(input);
 sections.push('<section><h2>'+escapeHtml(pm+' — '+input)+'</h2><ul><li data-pm="'+pm+'" data-brs="'+brs+'" data-input="'+escapeHtml(input)+'"><button class="brs-dietary-lever-trigger">'+escapeHtml(input)+'</button><details><summary>Six atoms</summary><div class="brs-dietary-lever-detail-inner">'+[['Input',r.input],['Input type',r.input_type],['Biological role',r.biological_role],['Evidence source',JSON.stringify(r.evidence)],['Limitation',r.limitation],['Dietary input','Yes']].map(([k,v])=>'<p><span class="brs-dietary-lever-detail-k">'+k+'</span> = '+escapeHtml(v)+'</p>').join('')+'</div></details></li></ul></section>');
}
for(const brs of Object.keys(scopes)){const d=scopes[brs];scopes[brs]={schema_version:d.schema_version,relationships:d.relationships.filter(r=>cases.some(c=>r.pm===c[1]&&r.input===c[2])),food_sources:[],substances:[],pilot_pms:d.pilot_pms};}
fs.writeFileSync(dir+'client/scopes.json',JSON.stringify(scopes));
fs.writeFileSync(dir+'actual-client-preview.html','<!doctype html><meta charset="utf-8"><title>Actual PM food disclosure renderer</title><style>body{font:16px/1.5 system-ui;max-width:1100px;margin:2em auto}section{border-top:1px solid #ccc;padding:1em 0}button{font:inherit}</style><h1>Actual PM food disclosure renderer</h1><p>Current canonical records; real food-disclosure client code.</p>'+sections.join('')+'<script type="module">import {attachInputFoodDisclosure} from "./client/browser-disclosure.mjs";const scopes=await fetch("./client/scopes.json").then(r=>r.json());for(const li of document.querySelectorAll("li[data-pm]"))attachInputFoodDisclosure(li,{scopes},li.dataset.pm,li.dataset.input,"3.1.1");document.documentElement.dataset.disclosuresReady="true";</script>');
console.log('Prepared four representative records using the existing client implementation.');
