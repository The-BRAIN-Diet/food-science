/** Verified human PDXK/PNPO reaction identities; no food edges or admission decisions. */
const REACTIONS = {
 'RHEA:10224':['CHEBI:17310','pyridoxal-5-phosphate','PDXK','O00764'],
 'RHEA:25108':['CHEBI:16709','CHEBI:58589','PDXK','O00764'],
 'RHEA:25104':['CHEBI:57761','CHEBI:58451','PDXK','O00764'],
 'RHEA:15149':['CHEBI:58589','pyridoxal-5-phosphate','PNPO','Q9NVS9'],
 'RHEA:15817':['CHEBI:58451','pyridoxal-5-phosphate','PNPO','Q9NVS9'],
};
const EXPECTED = {'CHEBI:17310':['RHEA:10224'],'CHEBI:16709':['RHEA:25108','RHEA:15149'],'CHEBI:57761':['RHEA:25104','RHEA:15817']};
export function validateVitamerRoutes(step, evidencePresent) {
 const errors=[],add=code=>errors.push('conversion-'+code);
 if(step.from!=='vitamin-b6'||step.to!=='pyridoxal-5-phosphate')add('vitamer-endpoints');
 const routes=Array.isArray(step.routes)?step.routes:[],substrates=Object.keys(EXPECTED);
 if(routes.length!==3||!Array.isArray(step.substrates)||step.substrates.length!==3||!substrates.every(s=>step.substrates.includes(s)))add('vitamer-routes-missing');
 const seen=new Set();
 for(const route of routes){
  const expected=EXPECTED[route.substrate];
  if(!expected||seen.has(route.substrate)){add('vitamer-substrate');continue;}seen.add(route.substrate);
  const steps=Array.isArray(route.steps)?route.steps:[];
  if(steps.map(s=>s.reaction_id).join('|')!==expected.join('|'))add('vitamer-reaction-order');
  for(const [i,s]of steps.entries()){
   const reaction=REACTIONS[s.reaction_id];
   if(!reaction||s.from!==reaction[0]||s.to!==reaction[1]||s.enzyme?.name!==reaction[2]||s.enzyme?.uniprot!==reaction[3])add('vitamer-reaction-mismatch');
   for(const id of [s.from,s.to])if(id!==step.to&&(!/^CHEBI:\d+$/.test(id||'')||!step.entities?.[id]?.name||!/^https:\/\//.test(step.entities?.[id]?.source||'')))add('vitamer-identity');
   if(!s.process?.trim()||!s.limitations?.trim()||!s.dependencies?.length||!s.enzyme?.entry_version||!/^\d{4}-\d{2}-\d{2}$/.test(s.enzyme?.retrieved||'')||!evidencePresent(s.evidence))add('vitamer-evidence');
   if(i===0&&s.from!==route.substrate||i>0&&steps[i-1].to!==s.from)add('vitamer-disconnected');
  }
  if(steps.at(-1)?.to!==step.to)add('vitamer-target');
 }
 return [...new Set(errors)];
}
