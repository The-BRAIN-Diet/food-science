import EvidenceDisclosure from '../EvidenceGaps/Disclosure';
import React from 'react';
import Link from '@docusaurus/Link';
import {usePluginData} from '@docusaurus/useGlobalData';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
const route=(s:string)=>String(s||'').replace(/\/$/,'');
/** Read-only view of canonical composition, conversion and separately adjudicated PM edges. */
export default function DietaryPathways({targetId,pmId}:{targetId?:string;pmId?:string}={}) {
 const {metadata,frontMatter}=useDoc();
 const data=usePluginData('ontology-projection') as any;
 const index=data?.dietaryPathways;
 if(!index)return null;
 const here=route(metadata.permalink),fm=frontMatter as any;
 const explicit=!!targetId;
 const disclosureId='dietary-pathways-'+String(targetId||fm.pm_id||here).replace(/[^a-z0-9]+/gi,'-');
 if(!explicit&&here.endsWith('/microbial-metabolites/scfas/butyrate'))return null;
 const pm=pmId||fm.pm_id;
 const foodPage=here.includes('/foods/'),recipePage=here.includes('/recipes/'),kc=!!fm.kc_id;
 const substancePage=here.includes('/substances/');
 if(!explicit&&!pm&&!foodPage&&!recipePage&&!kc&&!substancePage)return null;
 const recipeFoodNames=new Set((fm.tags||[]).map((t:any)=>typeof t==='string'?t:t.label||t.name));
 const rows=(index.paths||[]).filter((p:any)=>{
  if(targetId)return p.target_id===targetId&&(!pmId||p.pm===pmId);
  if(pm)return p.pm===pm;
  if(substancePage)return route(p.target_page)===here||route(p.substance_page)===here;
  if(foodPage)return p.food_targets.some((f:any)=>route(f.food_page)===here);
  if(recipePage)return p.food_targets.some((f:any)=>recipeFoodNames.has(f.food_title)||recipeFoodNames.has(f.food_id));
  if(kc)return (fm.kc_input_traceability||[]).some((a:any)=>a.substance_id===p.substance_id&&a.ikc_membership==='admitted');
  return false;
 }).map((p:any)=>foodPage?{...p,food_targets:p.food_targets.filter((f:any)=>route(f.food_page)===here)}:recipePage?{...p,food_targets:p.food_targets.filter((f:any)=>recipeFoodNames.has(f.food_title)||recipeFoodNames.has(f.food_id))}:p);
 if(!rows.length&&pm&&!explicit){const audit=index.inventory.find((p:any)=>p.pm===pm);return <EvidenceDisclosure id={disclosureId} label="Dietary pathways" title="Traceability status"><p>No validated structured conversion route is currently projected for this PM. This does not remove or reclassify its existing dietary inputs.</p><p>Mapping state: {audit?.disposition||'canonical record review required'}.</p>{audit?.unresolved?.map((r:any)=><p key={r.atom_id}>{r.input}: {(r.reason||[]).join('; ')}</p>)}</EvidenceDisclosure>;}
 if(!rows.length)return explicit?<p>No validated upstream dietary pathway is currently resolved for this target. An existing biochemical relationship or historical admission may still require identity, conversion or food-link reconciliation.</p>:null;
 return <EvidenceDisclosure id={disclosureId} label="Dietary pathways" title="Composition, conversion & PM evidence">
  {recipePage&&<p>Ingredient identity is contextual only: this recipe’s ripeness, preparation and delivery have not been reconciled with the composition material below. No recipe-level conversion or PM intervention is established.</p>}
  <p>Foods supply the named dietary input. They are not shown as containing the downstream metabolite. Conversion evidence does not establish a new downstream PM admission, effective dose or equivalent food intervention.</p>
  {rows.map((p:any)=><EvidenceDisclosure key={p.id} id={p.id.replace(/[^a-z0-9]+/gi,'-')} label={p.atom_id} title={`${p.input} → ${p.target_title} · ${p.pm}`}>
   <p><Link to={p.substance_page}>{p.input}</Link> → {p.conversion_pathway.map((e:any)=>e.process).join(' → ')} → <Link to={p.target_page}>{p.target_title}</Link></p>
   <p><Link to={p.pm_page}>{p.pm}</Link>: {p.mission}</p>
   <p>Existing admission: Type {p.type||'not separately assessed'} / {p.classification}; {p.admission_basis}. {p.pm_specific_status==='admitted-derived-pathway'?'The complete derived relationship is admitted for this PM.':'Production context for an already admitted substrate; no new metabolite-to-PM relationship is admitted.'}</p>
   <p>{p.limitations}</p>
   <ul>{p.food_targets.map((f:any)=><li key={JSON.stringify([f.food_id,f.material,f.preparation])}><Link to={f.food_page}>{f.food_title}</Link>{f.mapping_status==='research-supported-provisional'?<span className="food-target-info" style={{color:'#c62828'}} role="img" aria-label={`${f.food_title} → ${p.input}: food ontology link pending`} title="Research-supported composition; structured food edge pending"> ⓘ</span>:null} — {recipePage?'source composition context for':'supplies'} {p.input}; {f.mapping_status}; {f.preparation||'form not known'}. {f.material}<details><summary>Composition provenance</summary>{(Array.isArray(f.evidence)?f.evidence:[f.evidence]).filter(Boolean).map((ev:any,i:number)=><div key={i}><p>{String(ev.evidence||ev.statement||ev.source_note||'Existing canonical composition record')}</p>{[...(ev.sources||[]),ev.source_url].filter((url:any)=>typeof url==='string'&&/^https?:\/\//.test(url)).map((url:string)=><p key={url}><Link to={url}>Composition source</Link></p>)}{(ev.citation_keys||[]).map((key:string)=><p key={key}><Link to={'/docs/papers/BRAIN-Diet-References#'+key}>{key}</Link></p>)}</div>)}</details></li>)}</ul>
   {!p.food_targets.length&&<p>Input identity/conversion is recorded; usable food-composition mapping remains unresolved.</p>}
   {p.conversion_pathway.map((e:any)=><div key={e.id}><p>{e.limitations}</p><p>Dependencies: {(e.dependencies||[]).join('; ')}</p><ul>{e.evidence.sources.map((url:string)=><li key={url}><Link to={url}>{url}</Link></li>)}</ul>{(e.routes||[]).map((route:any)=><details key={route.substrate}><summary>{e.entities?.[route.substrate]?.name||route.substrate} conversion route</summary><ol>{route.steps.map((step:any)=><li key={step.reaction_id}>{e.entities?.[step.from]?.name||step.from} → {e.entities?.[step.to]?.name||step.to}: {step.process} ({step.enzyme.name}; {step.reaction_id}). {step.limitations}<ul>{step.evidence.sources.map((url:string)=><li key={url}><Link to={url}>{url}</Link></li>)}</ul></li>)}</ol></details>)}</div>)}
  </EvidenceDisclosure>)}
  {targetId==='butyrate'&&<p><Link to="/docs/biological-targets/brs5/fm1/brs5-fm1-pm1-gut-barrier-tight-junction-integrity#pm1-h1">PM1 Hypothesis-1</Link> remains Unestablished. Resistant-starch production, local epithelial exposure and paracellular tight-junction engagement are separate links. FOS/GOS remains unresolved and is excluded from active production routes.</p>}
 </EvidenceDisclosure>;
}
