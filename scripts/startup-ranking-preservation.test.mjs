import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import assert from 'node:assert/strict';
const pkg=JSON.parse(fs.readFileSync('package.json','utf8'));
const source=fs.readFileSync('scripts/generate-all-input-mappings.mjs','utf8').replace("import {spawnSync} from 'node:child_process';",'');
function calls(args){const commands=[];const done={};try{vm.runInNewContext(source,{spawnSync:(_node,args)=>{commands.push(args);return {status:0};},process:{execPath:'node',argv:['node','generator',...args],exit(code){assert.equal(code,0);throw done;}}});}catch(e){if(e!==done)throw e;}return commands;}
test('preview startup skips ranked writers but retains ordinary mapping steps',()=>{assert.match(pkg.scripts.prestart,/--skip-ranked-food-wheel/);const c=calls(['--skip-ranked-food-wheel']).flat();assert(c.includes('scripts/generate-dietary-pathways.mjs'));assert(!c.includes('scripts/generate-ranked-food-sources.mjs'));assert(!c.includes('scripts/build-food-wheel-top-ten.mjs'));});
test('production generation retains both ranked writers and prebuild checks',()=>{assert.doesNotMatch(pkg.scripts.prebuild,/--skip-ranked-food-wheel/);for(const check of ['presentation:check','check-dietary-input-governance.mjs','check-sec-assessments.mjs'])assert(pkg.scripts.prebuild.includes(check));const c=calls([]).map(a=>a[0]);assert.deepEqual(c.slice(-6),['scripts/generate-ranked-food-sources.mjs','scripts/build-food-wheel-top-ten.mjs','scripts/build-pm-explorer-sources.mjs','scripts/build-food-wheel-unranked.mjs','scripts/build-food-intelligence.mjs','scripts/validate-ranked-viewer-sync.mjs']);});
