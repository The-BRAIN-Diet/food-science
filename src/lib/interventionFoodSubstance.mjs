/** Read-only joins. A named material/comparator/endpoint is not a causal mediator. */
export const normaliseIdentity = value => String(value || '').normalize('NFKD').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const unique = rows => [...rows.reduce((m,row)=>m.has(row.kind+':'+row.id)?m:m.set(row.kind+':'+row.id,row),new Map()).values()];
export function acceptedIntervention(row) {
  if (['rejected','deferred','candidate','pending'].includes(row.admission_decision?.status)) return false;
  if (['No','Unset'].includes(row.intervention_admitted)) return false;
  // dietary_input=false means non-dietary, NOT rejected Lifestyle admission.
  return !!row.atom_id;
}
export function deriveInterventionMappings(pm, catalog) {
  const lookup = new Map(catalog.identities.map(x => [x.kind + ':' + x.id, x]));
  const hrefs = new Map(catalog.identities.map(x => [x.href, x]));
  return ['system_optimisation_practices','lifestyle_priorities'].flatMap(field => (pm[field] || []).filter(acceptedIntervention).map(row => {
    const nodes = [], unresolved = [];
    const add = (x, source, role='Named intervention identity; see the tested protocol and comparator') => {
      if (x) nodes.push({...x, source, role});
    };
    for (const [kind,key] of [['food','food_ids'],['substance','substance_ids']]) for (const id of row[key] || []) {
      const x=lookup.get(kind+':'+id); if(x) add(x,key); else unresolved.push({kind,id,source:key});
    }
    function ontology(value) {
      if (!value) return;
      if (Array.isArray(value)) { value.forEach(ontology); return; }
      if (typeof value === 'string') { add(hrefs.get(value.replace(/^docs\//,'/docs/').replace(/\.mdx?$/,'')), 'ontology'); return; }
      if (typeof value === 'object') {
        const id=value.identity || value.id;
        const href=value.url || value.path;
        const x=href ? hrefs.get(href.replace(/^docs\//,'/docs/').replace(/\.mdx?$/,'')) : lookup.get('substance:'+id) || lookup.get('food:'+id);
        if(x) add(x,'ontology',value.role); else Object.values(value).forEach(ontology);
      }
    }
    ontology(row.ontology);
    // No prose name mining: "heart-wave feedback" is not a heart-food protocol;
    // a measured plasma substance is not necessarily an ingested ingredient.
    const identities=unique(nodes), foods=identities.filter(x=>x.kind==='food'), substances=identities.filter(x=>x.kind==='substance');
    const composition=catalog.composition.filter(x=>foods.some(f=>f.id===x.food_id) && substances.some(s=>s.id===x.substance_id));
    // Alternative foods are composition-only, never substituted for a study formulation.
    const sources=substances.flatMap(s=>catalog.composition.filter(e=>e.substance_id===s.id).map(e=>({...e, food:lookup.get('food:'+e.food_id)})));
    const text=String(row.input||'');
    const behavioural=!foods.length&&!substances.length&&!/diet|feeding|meal|calori|energy restriction/i.test(text)&&/light|sleep|walking|exercise|activity|breathing|meditation|learning|cycling|conditioning|training|eReader|alcohol/i.test(text);
    const substanceLed=substances.some(x=>[x.title,x.id,...(x.aliases||[])].some(a=>normaliseIdentity(text).startsWith(normaliseIdentity(a)+' ')||normaliseIdentity(text)===normaliseIdentity(a)));
    const origin=behavioural?'behavioural':/pattern/i.test(text)?'pattern-led':foods.length>1?'multi-food/protocol':foods.length?'food-led':substanceLed?'substance-led':'protocol';
    const status=behavioural?'unmapped':!identities.length?'unmapped':unresolved.length||!composition.length?'partially mapped':'mapped';
    return {id:pm.pm_id+'::'+row.atom_id,pm:pm.pm_id,atom_id:row.atom_id,field,input:row.input,label:row.presentation_label||row.input,brs:pm.pm_id.startsWith('BRS-X')?'BRS-X':pm.pm_id.split('-')[0],origin,status,reason:behavioural?'No food/substance connection required':!identities.length?'No canonical material identity resolved from the recorded exposure':!composition.length?'No verified food–substance pair resolved; identity links only':'Documented composition, not efficacy or mediation',identities,composition,sources,unresolved,evidence:row.evidence_source,limitation:row.evidence_limitation,sec_assessment_ref:row.sec_assessment_ref,admission_basis:row.intervention_admitted==='Yes'||row.admission_decision?.status==='admitted'?'explicit':'existing canonical intervention array; no new adjudication'};
  }));
}
export function interventionMappingForId(records,id) {
  const key=String(id).toLowerCase();
  return records.find(r=>key===r.atom_id.toLowerCase()||key.endsWith('-'+r.atom_id.toLowerCase()));
}
/** Both PM rendering and future chord extraction consume these typed joins. */
export function interventionChordEdges(records) {
  return records.flatMap(r=>[
    {from:r.pm,to:r.id,kind:'admitted-intervention',record:r.id},
    ...r.identities.map(x=>({from:r.id,to:x.kind+':'+x.id,kind:'named-protocol-identity',role:x.role,source:x.source,record:r.id})),
    ...(r.origin==='substance-led'?r.sources:r.composition).map(e=>({from:'food:'+e.food_id,to:'substance:'+e.substance_id,kind:'documented-composition',provenance:e.provenance,record:r.id})),
    ...r.identities.filter(x=>x.kind==='substance').map(x=>({from:'substance:'+x.id,to:r.brs,kind:'intervention-context-only',pm:r.pm,record:r.id}))
  ]);
}
