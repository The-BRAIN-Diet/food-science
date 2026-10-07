/** Typed FM summaries derived only from separately adjudicated child-PM relationships. */
import {buildPmReferenceRecords} from './pm-reference-index.mjs';
export const FM_KC_SUMMARY_MODE='adjudicated-pm-relationships';
const TYPES=new Map([['supported-upstream-supply','Supported upstream supply'],['conditional-constraint','Conditional constraint']]);
export function deriveAdjudicatedFmKcSummary(pmRecords){
 const rows=[];
 for(const pm of pmRecords){
  const data=pm.data || {}, references=buildPmReferenceRecords(data.references),findings=new Set((data.scientific_findings || []).map(f=>f.id));
  for(const r of data.pm_kc_relationships || []){
   if(!TYPES.has(r.relationship_type))continue; // Never reinterpret a legacy mapping.
   if(!(data.kc_applicability_adjudications || []).some(a=>a.disposition==='established'&&a.kc_id===r.kc_id&&(a.ikc_id||a.kc_id)===(r.ikc_id||r.kc_id)&&a.applicability_mode===r.relationship_type))continue;
   const source=r.evidence_source || {};
   if(!r.relationship_id||!r.pm_biological_role?.trim()||!r.evidence_limitation?.trim()||!source.finding_ids?.length||source.finding_ids.some(id=>!findings.has(id))||!source.citation_keys?.length)throw new Error(`${data.pm_id}: admitted KC relationship lacks its evidenced scope/limitation`);
   const reviewedKeys = new Set((data.scientific_findings || []).filter(f => source.finding_ids.includes(f.id)).flatMap(f => [...(f.evidence_considered || []), ...(f.connected_supportive_evidence || [])].map(e => e.citation_key)));
   if (source.citation_keys.some(key => !reviewedKeys.has(key))) throw new Error(`${data.pm_id}: KC citation not assessed in the referenced Findings`);
   const citations=source.citation_keys.map(key=>{const ref=references.find(x=>x.citationKey===key);if(!ref)throw new Error(`${data.pm_id}: KC source ${key} missing from target bibliography`);return {citation_key:key,label:ref.authorYear,href:`${pm.pm.href}#pm-ref-${ref.number}`,number:ref.number};});
   rows.push({kc_id:r.kc_id,relationship_id:r.relationship_id,pm_id:data.pm_id,pm_name:pm.pm.name,pm_href:pm.pm.href,relationship_type:r.relationship_type,biological_role:r.pm_biological_role,limitation:r.evidence_limitation,evidence_source:source,citations,public_disclosure:r.public_disclosure||'pool-and-individual-disclosures'});
  }
 }
 return rows;
}
export function renderAdjudicatedFmKcSummary(rows){
 if(!rows?.length)return '';
 const safe=x=>String(x).replaceAll('|','\\|').replaceAll('\n',' ');
 return ['The following are independently admitted child-PM connections. They do not establish a uniform constraint on the whole FM or benefit from increasing intake.', '', '| PM | Accepted connection | Evidence and boundary |','|---|---|---|',...rows.map(r=>`| [${r.pm_id}](${r.pm_href}) | **${TYPES.get(r.relationship_type)}:** ${safe(r.biological_role)} | ${safe(r.limitation)} ${r.citations.map(c=>`[${c.label} [${c.number}]](${c.href})`).join('; ')} |`)].join('\n');
}
