/** Optional PM hypothesis category; independent of Findings, scores and scientific admissions. */
import fs from 'node:fs';import path from 'node:path';import matter from 'gray-matter';
export const HYPOTHESIS_STATUSES=['Unestablished','Under Review','Supported','Rejected'];
export const HYPOTHESES_START='{/* scientific-hypotheses:start */}',HYPOTHESES_END='{/* scientific-hypotheses:end */}';
export function renderScientificHypotheses(data){const rows=data.scientific_hypotheses||[];if(!rows.length)return '';return [HYPOTHESES_START,'### Scientific Hypotheses','',...rows.flatMap(h=>[`<ScientificHypothesis hypothesis={${JSON.stringify(h).replaceAll('<','\\u003c')}} />`,'']),HYPOTHESES_END].join('\n');}
export function hypothesisOnlyRelationshipHrefs(data){return new Set((data.scientific_hypotheses||[]).map(h=>h.historical_relationship?.href).filter(Boolean));}
export function hypothesisExcludesRelationship(data,href){return hypothesisOnlyRelationshipHrefs(data).has(String(href).split('#')[0]);}
function pmRegistry(root){const dir=path.join(root,'docs/biological-targets');if(!fs.existsSync(dir))return new Map();const result=new Map();for(const name of fs.readdirSync(dir,{recursive:true}).filter(n=>/\.mdx?$/.test(n))){const file=path.join(dir,name);if(!fs.statSync(file).isFile())continue;const d=matter(fs.readFileSync(file,'utf8')).data;if(d.pm_id)result.set(d.pm_id,d);}return result;}
export function validateScientificHypotheses(data,issues=[],{content='',root=process.cwd(),resolvePm}={}){
 const rows=data.scientific_hypotheses||[],add=(code,message)=>issues.push({code:'hypothesis_'+code,message:`${data.pm_id}: ${message}`});
 if(!Array.isArray(rows)){add('invalid_collection','scientific_hypotheses must be an array');return issues;}
 if(!rows.length){if(content.includes(HYPOTHESES_START)||/^### Scientific Hypotheses\s*$/m.test(content)||content.includes('<ScientificHypothesis '))add('empty_section','Do not render an empty hypothesis section');return issues;}
 const registry=resolvePm?null:pmRegistry(root),resolve=resolvePm||((id)=>registry.get(id)),ids=new Set();
 for(const h of rows){
  if(!/^PM\d+-H\d+$/.test(h.id||'')||!h.id.startsWith(data.pm_id.split('-').at(-1)+'-H')||ids.has(h.id))add('invalid_id','Hypothesis ID must be stable, unique and belong to the receiving PM');ids.add(h.id);
  for(const key of ['title','proposition','proposed_direction','rationale'])if(!h[key]?.trim())add('missing_field',`${h.id}: ${key} required`);
  if(!HYPOTHESIS_STATUSES.includes(h.status))add('invalid_status',`${h.id}: invalid status`);
  if((h.source_pm||h.target_pm)&&(h.target_pm!==data.pm_id||!h.source_pm||h.proposed_direction!==`${h.source_pm} → ${h.target_pm}`))add('direction',`${h.id}: source/target and explicit direction must match receiving PM`);
  if((h.source_pm||h.target_pm)&&(!resolve(h.source_pm)||!resolve(h.target_pm)))add('unknown_pm',`${h.id}: source/target PM does not resolve`);
  for(const k of ['limitations','alternative_explanations','required_evidence','provenance'])if(!Array.isArray(h[k])||!h[k].length)add('missing_field',`${h.id}: ${k} required`);
  if(!/^\d{4}-\d{2}-\d{2}$/.test(h.review_date||''))add('review_date',`${h.id}: dated review required`);
  for(const key of Object.keys(h))if(/^(sec|cc|score|sec_assessment_ref|synthesised_evidence_confidence)$/i.test(key))add('score_forbidden',`${h.id}: hypotheses do not carry scores`);
  for(const role of ['supporting','contradictory_or_null','contextual']){
   const links=h.finding_links?.[role];if(!Array.isArray(links)){add('evidence_roles',`${h.id}: explicit ${role} Finding list required`);continue;}
   for(const link of links){const target=resolve(link.pm_id);if(!target?.scientific_findings?.some(f=>f.id===link.finding_id)||!link.explanation?.trim()||!link.href?.endsWith('#'+link.finding_id.toLowerCase())||(link.href?.startsWith('#')&&link.pm_id!==data.pm_id))add('finding_reference',`${h.id}: ${role} Finding reference must resolve and explain its role`);}
  }
  if(!Array.isArray(h.evidence_sources)||!h.evidence_sources.length)add('evidence_sources',`${h.id}: source rationale must be traceable`);
  for(const s of h.evidence_sources||[])if(!['supporting','contradictory_or_null','contextual'].includes(s.role)||!/^https:\/\//.test(s.url||'')||!s.proposition?.trim()||!s.study_id?.trim())add('source_reference',`${h.id}: evidence needs role, source, proposition and study identity`);
  const old=h.historical_relationship;if(old&&(old.page_pm!==h.target_pm||old.linked_pm!==h.source_pm||!old.href||!old.original_statement||!old.review_statement||old.disposition!=='unestablished-contextual-hypothesis'))add('history',`${h.id}: preserve historical page direction and disposition`);
  if((data.dietary_input_traceability||[]).some(a=>a.atom_id===h.id)||(data.dietary_lever_atoms||[]).some(a=>a.atom_id===h.id)||(data.scientific_findings||[]).some(f=>f.id===h.id))add('category_leak',`${h.id}: hypothesis cannot itself become a dietary atom or Finding`);
 }
 const block=renderScientificHypotheses(data);if(!content.includes(block))add('stale_presentation','Hypothesis presentation must match structured records');
 const expectedEnd=content.indexOf(HYPOTHESES_END),finding=content.search(/^### [45]\.1 Scientific Findings\s*$/m);if(expectedEnd<0||finding<expectedEnd||content.slice(expectedEnd+HYPOTHESES_END.length,finding).trim())add('placement','Hypotheses must immediately precede Scientific Findings');
 return issues;
}
