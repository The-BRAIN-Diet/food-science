import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {loadSecRegistry,validateSecRegistry,resolveSecAssessment} from './lib/sec-assessments.mjs';
import {listMechanismMdxFiles} from './lib/mechanism-page-validation.mjs';
import matter from 'gray-matter';
const registry=loadSecRegistry();
const requestedBaseline=process.argv[2] || process.env.SEC_BASE_REF;
if(registry.assessments?.length && !requestedBaseline)throw new Error('SEC_BASE_REF or an explicit published base ref is required to protect nonempty SEC history');
const baseline=requestedBaseline || 'HEAD';
const baselineFiles=execFileSync('git',['ls-tree','--name-only',baseline,'--','system/sec-assessments/registry.json'],{encoding:'utf8'}).trim();
const previous=baselineFiles?JSON.parse(execFileSync('git',['show',baseline+':system/sec-assessments/registry.json'],{encoding:'utf8'})):{schemaVersion:1,assessments:[]};
const errors=validateSecRegistry(registry,{previous}), used=new Map();
for(const file of listMechanismMdxFiles(process.cwd(),'pm')) {
  const data=matter(fs.readFileSync(file,'utf8')).data;
  for(const finding of data.scientific_findings || []) {
    const result=resolveSecAssessment(registry,{pmId:data.pm_id,finding});
    errors.push(...result.errors.map(e=>({...e,message:file+': '+e.message})));
    if(result.record)used.set(result.record.id,Math.max(used.get(result.record.id)||0,result.record.recordVersion));
  }
}
// Historical versions remain valid without a current pointer, but a new identity
// must not be published without any canonical relationship.
for(const entry of registry.assessments || []) {
  if(!entry?.record)continue;
  const published=previous.assessments.some(old=>old.record.id===entry.record.id&&old.record.recordVersion===entry.record.recordVersion);
  if(!published && (!used.has(entry.record.id)||entry.record.recordVersion>used.get(entry.record.id)))errors.push({code:'sec_orphan',message:'New assessment snapshot has no current or historical canonical relationship: '+entry.record.id});
}
if(errors.length){for(const e of errors)console.error(e.code+': '+e.message);process.exitCode=1;}
else console.log('SEC registry, immutable history and canonical references valid ('+registry.assessments.length+' snapshots).');
