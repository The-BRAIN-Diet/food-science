import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import {isRetiredKc} from './lib/kc-registry.mjs';
const archive='review/brs5-kc2-retirement-2026-10-24';
const manifest=JSON.parse(fs.readFileSync(`${archive}/manifest.json`));
const match=/BRS5\(KC2\)|brs5-kc2/;
function filtered(x){if(Array.isArray(x))return x.filter(v=>!match.test(JSON.stringify(v))).map(filtered);return x;}
test('KC2 route is retired and its public page removed',()=>{assert.ok(isRetiredKc({id:'BRS5(KC2)'}));assert.ok(isRetiredKc({href:'/docs/biological-targets/brs5/kc/brs5-kc2-polyphenol-and-plant-diversity-input-availability'}));assert.ok(!fs.existsSync('docs/biological-targets/brs5/kc/brs5-kc2-polyphenol-and-plant-diversity-input-availability.mdx'));});
test('no public document retains a KC2 connection',()=>{function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())walk(p);else if(/\.mdx?$/.test(p))assert.ok(!match.test(fs.readFileSync(p,'utf8')),p);}}walk('docs');});
test('all PM scientific records and bodies are preserved; only KC2 metadata removed',()=>{for(const item of manifest.filter(x=>/pm\d.*\.mdx$/.test(x.path))){const old=matter(fs.readFileSync(`${archive}/before/${item.path}`,'utf8'));const now=matter(fs.readFileSync(item.path,'utf8'));const expected=Object.fromEntries(Object.entries(old.data).map(([k,v])=>[k,filtered(v)]));assert.deepEqual(now.data,expected,item.path);assert.equal(now.content,old.content,item.path);}});
test('archive retains every removed or edited source and source fingerprint',async()=>{const {createHash}=await import('node:crypto');for(const item of manifest){const old=fs.readFileSync(`${archive}/before/${item.path}`);assert.equal(createHash('sha256').update(old).digest('hex'),item.before_sha256,item.path);}});
