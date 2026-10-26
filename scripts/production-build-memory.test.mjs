import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),webpack=require('webpack');
const plugin=require('../src/plugin/build-memory/index.cjs')();

test('production cap is supported by installed webpack, bounds real module builds, and preserves output',async()=>{
  assert.deepEqual(plugin.configureWebpack({mode:'development'}),{});
  const config=plugin.configureWebpack({mode:'production'});
  assert.deepEqual(config,{parallelism:1});
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'brain-webpack-memory-'));
  try {
    fs.writeFileSync(path.join(dir,'entry.js'),Array.from({length:8},(_,i)=>`import './m${i}.js';`).join('\n'));
    for(let i=0;i<8;i++)fs.writeFileSync(path.join(dir,`m${i}.js`),`console.log(${i});`);
    fs.writeFileSync(path.join(dir,'loader.cjs'),`module.exports=function(source){const done=this.async();setTimeout(()=>done(null,source),10);};`);
    let active=0,peak=0;
    const compiler=webpack({mode:'production',...config,context:dir,entry:'./entry.js',output:{path:path.join(dir,'out'),filename:'bundle.js'},module:{rules:[{test:/\.js$/,use:path.join(dir,'loader.cjs')}]},plugins:[{apply(c){c.hooks.compilation.tap('measure',comp=>{comp.hooks.buildModule.tap('measure',()=>{active++;peak=Math.max(peak,active);});comp.hooks.succeedModule.tap('measure',()=>{active--;});});}}]});
    await new Promise((resolve,reject)=>compiler.run((err,stats)=>compiler.close(closeErr=>err||closeErr||stats.hasErrors()?reject(err||closeErr||new Error(stats.toString())):resolve())));
    assert.equal(peak,1);
    const bundle=fs.readFileSync(path.join(dir,'out/bundle.js'),'utf8');
    for(let i=0;i<8;i++)assert.ok(bundle.includes(`console.log(${i})`));
    const netlify=fs.readFileSync('netlify.toml','utf8');
    assert.match(netlify,/max-old-space-size=4096/);
    assert.match(netlify,/TERSER_PARALLEL = "1"/);
    assert.match(netlify,/SEC_BASE_REF = "ebbc10ed11484192c972952d8c47645bd3c5bf4e"/);
  } finally {fs.rmSync(dir,{recursive:true,force:true});}
});
