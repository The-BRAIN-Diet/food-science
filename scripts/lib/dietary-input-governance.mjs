import {validateDietaryConfidence} from '../../src/lib/dietaryConfidence.mjs';
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {inputEligibility,assessAdmission,canonicalSection} from '../../src/lib/dietaryInputGovernance.mjs';
export const historicalFingerprint=(data,atom)=>createHash('sha256').update(JSON.stringify({mission:data.mission,atom,overlay:(data.dietary_lever_atoms||[]).find(l=>l.atom_id===atom.atom_id),presentations:(data.dietary_lever_presentations||[]).filter(p=>p.atom_id===atom.atom_id)})).digest('hex');
const baselineFile='system/dietary-input-historical-baseline.json';
export function historicalAdmission(data,atom,root=process.cwd()) {
 const file=path.join(root,baselineFile);if(!fs.existsSync(file))return false;
 const baseline=JSON.parse(fs.readFileSync(file));return baseline.records[data.pm_id+'::'+atom.atom_id]===historicalFingerprint(data,atom);
}
export function validateInputGovernance(data,issues,{entityLabel='',content='',root=process.cwd()}={}) {
 issues.push(...validateDietaryConfidence(data,{isHistoricallyAdmitted:atom=>historicalAdmission(data,atom,root)}));
 const registryFile=path.join(root,'registry/substances.json');const substances=fs.existsSync(registryFile)?JSON.parse(fs.readFileSync(registryFile)):{};
 const traces=new Map((data.dietary_input_traceability||[]).map(a=>[a.atom_id,a]));
 for(const p of data.dietary_lever_presentations||[]) {
  const atom=traces.get(p.atom_id);if(!atom)continue;const section=canonicalSection(p.presentation_section||'3.1.1');
  const eligibility=inputEligibility(atom.input_type,section,atom.input);
  const old=historicalAdmission(data,atom,root);
  // Frozen historical records remain traceable; the reconciliation audit reports their conflicts.
  if(!eligibility.eligible&&!old)issues.push({code:'input_'+eligibility.code,message:`${entityLabel}: ${atom.atom_id} ${section}: ${eligibility.state}`});
  if(section==='3.1.1'&&!old){
   const a=(data.dietary_input_assessments||[]).find(x=>x.atom_id===atom.atom_id);
   const overlay=(data.dietary_lever_atoms||[]).find(l=>l.atom_id===atom.atom_id);
   const result=assessAdmission({...atom,operation:data.mission,relationship_type:{mode:overlay?.relationship_mode,classification:overlay?.requirement_classification}},a,{substances});
   // A documented review disposition may remain visible without becoming admitted.
   const heldForReview=a?.status==='unresolved'&&a.review_required===true&&!!a.review_reason?.trim();
   if(result.status!=='admitted'&&!heldForReview)issues.push({code:'input_admission_unresolved',message:`${entityLabel}: ${atom.atom_id}: ${result.errors.join(', ')||result.status}`});
   if(!a?.food_target_research?.completed||!a.food_target_research.sources_examined?.length||(!a.food_target_research.targeted_searches?.length&&!a.food_target_research.sufficient_coverage_rationale?.trim()))issues.push({code:'input_food_target_research_missing',message:`${entityLabel}: ${atom.atom_id} requires recorded ontology search, source examination and targeted research or a documented sufficient-coverage rationale`});
  }
 }
 // A hand-authored copy cannot move a pattern into a protected subsection under a different number.
 const baselinePath=path.join(root,baselineFile);
 const bodyHash=createHash('sha256').update(content).digest('hex');
 const historicalBody=fs.existsSync(baselinePath)&&JSON.parse(fs.readFileSync(baselinePath)).content_sha256?.[data.pm_id]===bodyHash;
 let current='';for(const line of content.split('\n')) {
  const section=line.match(/(?:#{2,5}\s+|<strong>)([134]\.1\.[123])\s/);if(section)current=canonicalSection(section[1]);
  else if(/^#{2,4}\s+\d/.test(line))current='';
  if(current==='3.1.1'&&/^\s*[-*]\s/.test(line)&&!historicalBody) {
   const clean=line.replace(/^\s*[-*]\s+/, '').replace(/\[([^\]]+)\]\([^)]+\)/g,'$1').replace(/\*\*/g,'').trim().toLowerCase();
   const matches=(data.dietary_lever_presentations||[]).filter(p=>canonicalSection(p.presentation_section||'3.1.1')===current).some(p=>{const a=traces.get(p.atom_id),label=String(p.label||a?.input||'').toLowerCase();return label&&(clean===label||clean.startsWith(label+' ')||clean.startsWith(label+' ←')||clean.startsWith(label+' —'));});
   if(!matches&&!/^(no |none |not established|coming soon)/i.test(clean))issues.push({code:'rendered_input_unassessed',message:`${entityLabel}: ${current}: rendered input has no matching structured presentation`});
  }

  if(['3.1.1','3.1.2'].includes(current)&&/^\s*[-*]\s/.test(line)&&/\b(dietary pattern|mediterranean diet|meal plan|food combination|dietary programme)\b/i.test(line)&&!historicalBody)issues.push({code:'rendered_ineligible_input',message:`${entityLabel}: ${current}: dietary programme requires review`});
 }
 for(const [collection,section]of [['system_optimisation_practices','3.2'],['lifestyle_priorities','3.3']])for(const row of data[collection]||[]) {
  const e=inputEligibility(row.input_type,section,row.input);if(!e.eligible)issues.push({code:'input_'+e.code,message:`${entityLabel}: ${collection}/${row.atom_id}: ${e.state}`});
 }
}
