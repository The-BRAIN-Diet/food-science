import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import {canonicalContainsRelationships} from '../../src/data/foodSubstanceRelationships.mjs';
import {readRegisteredSubstanceForms} from './substance-input-pages.mjs';
import {normaliseIdentity,deriveInterventionMappings,interventionChordEdges} from '../../src/lib/interventionFoodSubstance.mjs';
const walk=d=>fs.existsSync(d)?fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]).filter(f=>/\.mdx?$/.test(f)):[];
export function buildInterventionFoodSubstance(root) {
 const identities=[],foodRecords=[],forms=readRegisteredSubstanceForms(root);
 const registry=JSON.parse(fs.readFileSync(path.join(root,'registry/substances.json')));
 for(const [id,r]of Object.entries(registry)) {
  if(!r.path)continue;
  const f=path.join(root,'docs/substances',r.path),form=forms.get(id);
  if(form?.documented){identities.push({id,kind:'substance',title:form.title,href:form.href,aliases:form.aliases||[]});continue;}
  if(!fs.existsSync(f))continue;const d=matter(fs.readFileSync(f,'utf8')).data;
  identities.push({id,kind:'substance',title:d.title||r.title||id,href:'/docs/substances/'+r.path.replace(/\.mdx?$/,''),aliases:[...(r.aliases||[]),...(d.aliases||[]),...(d.synonyms||[])]});
 }
 for(const f of walk(path.join(root,'docs/foods'))){const d=matter(fs.readFileSync(f,'utf8')).data;if(!d.id)continue;
  identities.push({id:d.id,kind:'food',title:d.title||d.id,href:'/docs/'+path.relative(path.join(root,'docs'),f).replace(/\.mdx?$/,''),aliases:d.aliases||[]});foodRecords.push({d,file:path.relative(root,f)});
 }
 const aliases=new Map();for(const x of identities.filter(x=>x.kind==='substance'))for(const name of [x.id,x.title,...x.aliases]){const n=normaliseIdentity(name);if(!aliases.has(n))aliases.set(n,new Set());aliases.get(n).add(x.id);}
 const composition=[];
 for(const {d,file}of foodRecords)for(const edge of canonicalContainsRelationships(d)){
  const ids=aliases.get(normaliseIdentity(edge.substance));if(ids?.size!==1)continue;
  // Only evidence-supported occurrence; tags and unresolved source claims never suffice.
  if(edge.evidence_status!=='supported'||!(edge.source_reference||edge.source_url||edge.evidence_source))continue;
  composition.push({food_id:d.id,substance_id:[...ids][0],provenance:{file,relationship:edge},kind:'documented-composition'});
 }
 const catalog={identities,composition},records=[];
 for(const f of walk(path.join(root,'docs/biological-targets'))){
  const parsed=matter(fs.readFileSync(f,'utf8')),d=parsed.data;if(!d.pm_id)continue;
  // Reuse explicit ontology links already authored inside the exact six-atom
  // intervention, never links from Findings, dietary inputs or other interventions.
  const copy={...d};
  for(const field of ['system_optimisation_practices','lifestyle_priorities'])copy[field]=(d[field]||[]).map(row=>{
    const block=[...parsed.content.matchAll(/<PilotInterventionDisclosure\b[^>]*id="([^"]+)"[\s\S]*?<\/PilotInterventionDisclosure>/g)].find(m=>m[1]===row.atom_id?.toLowerCase()||m[1].endsWith('-'+row.atom_id?.toLowerCase()));
    const links=block?[...block[0].matchAll(/href="(\/docs\/(?:foods|substances)\/[^"]+)"/g)].map(m=>({path:m[1],role:'Linked in this intervention’s six atoms; see its preparation, comparator and endpoint boundaries'})):[];
    return {...row,ontology:[row.ontology,...links]};
  });
  records.push(...deriveInterventionMappings(copy,catalog).map(r=>({...r,source_record:path.relative(root,f)+'#'+r.field+'/'+r.atom_id})));
 }

 return {catalog,records,edges:interventionChordEdges(records),counts:Object.fromEntries(['mapped','partially mapped','unmapped'].map(s=>[s,records.filter(r=>r.status===s).length]))};
}
