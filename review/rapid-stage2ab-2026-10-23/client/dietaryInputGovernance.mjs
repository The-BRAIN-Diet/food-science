/** Admission metadata is separate from the six scientific atoms and from scoring. */
export const GOVERNANCE_VERSION = 'dietary-inputs-2026-10-23';
export const DIETARY_INPUT_HEADING = 'Dietary Inputs & Regulatory Modulators';
export function canonicalSection(value) {
  const s=String(value||'').trim();
  if (/^[14]\.1\.[123]$/.test(s)) return s.replace(/^[14]/,'3');
  return ({'4.2':'3.2','4.3':'3.3'})[s]||s;
}
const biochemical=['substrate','substrate provision','dietary substrate','substrate class','fermentation substrate','microbial fermentation substrate','fermentable substrate class','nutrient/substance','cofactor','catalytic ion','cofactor precursor','precursor','biochemical requirement','nutrient/compound class','food component'];
const practices=['dietary pattern','named diet','food combination','dietary programme','meal plan','intervention protocol','whole-food intervention','dietary matrix','food group','preparation characteristic','defined dietary exposure','food preparation/delivery practice','food delivery practice','meal matrix substitution','meal sequencing protocol','cereal processing substitution','protein preload protocol','food matrix substitution','starch preparation protocol','defined fibre meal addition','defined meal formulation','carbohydrate substitution protocol','acid-containing meal protocol','dietary protocol','context-specific dietary protocol','targeted dietary protocol','defined timing protocol','dietary timing protocol','conditional supplementation'];
const lifestyle=['lifestyle practice','physical activity','recurrent physical activity','exercise protocol','sleep practice','sleep behaviour','alcohol exposure practice','stress-management practice'];
const protocols=['circadian scheduling protocol','stress recovery protocol','paced breathing protocol','mindfulness training protocol'];
export const SECTION_INPUT_TYPES=Object.freeze({
 '3.1.1':new Set([...biochemical.filter(t=>t!=='biochemical requirement'),'regulatory modulator']),
 '3.1.2':new Set(biochemical.filter(t=>!['food component','fermentable substrate class'].includes(t))),
 '3.1.3':new Set([...biochemical,'supported upstream supply','resource dependency','regulatory modulator']),
 '3.2':new Set([...practices,...protocols,'nutrient/substance','regulatory modulator']),
 '3.3':new Set(lifestyle),
});
export const CONTROLLED_INPUT_TYPES=new Set(Object.values(SECTION_INPUT_TYPES).flatMap(s=>[...s]));
export function normalizeInputType(type) {return String(type||'').trim().toLowerCase().replace(/\s+/g,' ');}
export function inputEligibility(type,section,input='') {
 const t=normalizeInputType(type),s=canonicalSection(section);
 if(!CONTROLLED_INPUT_TYPES.has(t))return {eligible:false,state:'review-required',code:'unknown-input-type'};
 if(!SECTION_INPUT_TYPES[s]?.has(t))return {eligible:false,state:'ineligible',code:'section-input-type-ineligible'};
 if(['3.1.1','3.1.2'].includes(s)&&/\b(dietary pattern|mediterranean|named diet|diet programme|dietary programme|meal plan|meal timing|meal sequencing|food combination)\b/i.test(input))return {eligible:false,state:'review-required',code:'input-label-type-conflict'};
 return {eligible:true,state:'eligible-candidate'};
}
export function evidencePresent(e) {return !!(e&&typeof e==='object'&&e.statement?.trim()&&Array.isArray(e.sources)&&e.sources.length&&e.sources.every(s=>typeof s==='string'&&/^(https?:\/\/|docs\/|system\/|#)/.test(s)));}
export function assessAdmission(candidate,assessment,{substances={}}={}) {
 const errors=[],add=code=>errors.push(code),eligibility=inputEligibility(candidate.input_type,'3.1.1',candidate.input);
 if(!eligibility.eligible)add(eligibility.code);
 if(!assessment){add('scientific-assessment-missing');return {status:'unresolved',eligibility,errors};}
 if(!['admitted','unresolved','rejected'].includes(assessment.status))add('invalid-admission-status');
 if(assessment.status==='rejected')return {status:'rejected',eligibility,errors};
 if(!['A','B'].includes(assessment.type))add('relationship-type-unresolved');
 if(!['direct','derived'].includes(assessment.classification))add('classification-unresolved');
 if(candidate.relationship_type?.classification&&candidate.relationship_type.classification!==assessment.classification)add('classification-overlay-conflict');
 const expectedType=candidate.relationship_type?.mode==='state-regulation'?'B':candidate.relationship_type?.mode==='capacity-requirement'?'A':null;
 if(expectedType&&expectedType!==assessment.type)add('type-overlay-conflict');
 if(candidate.dietary_input===false||candidate.dietary_input===null)add('dietary-input-not-admitted');

 if(!assessment.operation?.trim()||assessment.operation!==candidate.operation)add('pm-operation-unresolved');
 if(!substances[assessment.canonical_substance_id])add('canonical-identity-unresolved');
 const identity=substances[assessment.canonical_substance_id];
 const normalize=v=>String(v||'').toLowerCase().replace(/^dietary\s+/,'').replace(/[^a-z0-9]/g,'');
 const names=identity?[assessment.canonical_substance_id,identity.title,...(identity.aliases||[])]:[];
 if(identity&&!names.some(n=>normalize(n)===normalize(candidate.input)))add('canonical-input-identity-mismatch');

 const gates=assessment.type==='A'?['functional_dependency','dietary_supply']:['mechanism_engagement','dietary_exposure'];
 for(const key of gates)if(assessment[key]?.status!=='established'||!evidencePresent(assessment[key]))add(key+'-unresolved');
 if(assessment.classification==='derived') {
  const path=assessment.conversion_pathway||[];
  if(!path.length)add('conversion-pathway-missing');
  if(path.length&&path[0].from!==assessment.canonical_substance_id)add('conversion-origin-mismatch');
  for(const [i,step]of path.entries()) {
   if(!substances[step.from]||!substances[step.to])add('conversion-identity-unresolved');
   if(!step.process?.trim()||!step.limitations?.trim()||!evidencePresent(step.evidence))add('conversion-evidence-unresolved');
   if(/microb|ferment/i.test(step.process)&&!step.dependencies?.length)add('microbial-dependencies-missing');
   if(i&&path[i-1].to!==step.from)add('conversion-pathway-disconnected');
  }
  if(path.length&&path.at(-1).to!==assessment.active_target_id)add('active-target-mismatch');
 }
 return {status:assessment.status==='admitted'&&!errors.length?'admitted':'unresolved',eligibility,errors};
}
