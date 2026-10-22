import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {secCanonicalJson,secRegistryErrors} from '../../src/lib/secAssessments.mjs';
export * from '../../src/lib/secAssessments.mjs';
export const secAssessmentHash=record=>createHash('sha256').update(secCanonicalJson(record),'utf8').digest('hex');
export function validateSecRegistry(registry,{previous}={}) {
  const errors=secRegistryErrors(registry);
  if(!Array.isArray(registry?.assessments))return errors;
  for(const e of registry?.assessments || []) {
    try {if(secAssessmentHash(e.record)!==e.sha256)errors.push({code:'sec_hash',message:'Assessment content changed without matching SHA-256'});}
    catch {errors.push({code:'sec_hash',message:'Assessment is not canonical JSON'});}
  }
  if(previous) for(const old of previous.assessments || []) {
    const found=(registry?.assessments || []).find(e=>e.record?.id===old.record?.id && e.record?.recordVersion===old.record?.recordVersion);
    if(!found || secCanonicalJson(found)!==secCanonicalJson(old))errors.push({code:'sec_immutable',message:'Previously published assessment version was removed or overwritten'});
  }
  if(previous) for(const next of registry?.assessments || []) {
    const older=(previous.assessments || []).filter(e=>e?.record?.id===next?.record?.id);
    if(older.length && !older.some(e=>e.record?.recordVersion===next?.record?.recordVersion) && next?.record?.recordVersion<=Math.max(...older.map(e=>e.record.recordVersion)))errors.push({code:'sec_version',message:'New assessment versions must advance, never backfill or replace published history'});
  }
  return errors;
}
export function loadSecRegistry() {
  return JSON.parse(fs.readFileSync(new URL('../../system/sec-assessments/registry.json',import.meta.url),'utf8'));
}
