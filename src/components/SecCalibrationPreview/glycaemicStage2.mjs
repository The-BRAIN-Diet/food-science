import {glycaemicAudits} from './glycaemicAudit.mjs';

// Local proposals only: no canonical admissions, ontology or bibliography registration.
export const stage2Assessment = {
  date: '2026-10-18', version: 1,
  governanceMain: 'e360e38bcd6864e5e4021f7add74dc4611befd55',
  scope: 'Bounded intervention reassessment, not an exhaustive systematic review. Three is a presentation ceiling, not a quota. Average glucose, exposure and time in range do not alone establish a variability effect.',
  governance: 'Latest-main Stage 2A scientific-finding schema, Stage 2B dietary-input traceability contract, PM schema and BRS-hub SOP/lifestyle boundaries checked against the isolated SEC supplement. No conflicting admission rule was replaced.',
  recovery: 'Existing studies first; targeted publisher, PubMed/PMC, author-repository and Scite retrieval/citation screening. Full text means examined Methods/Results, not an abstract or citation classification. No purchases or broad systematic search. For most exact protocols: Independent replication was not established in this assessment. Contextual trials and overlapping cohorts are not positive replications.',
  queries: ['meal sequence CGM variability crossover', 'whey preload coefficient of variation MAGE', 'resistant starch CGM randomised crossover', 'early eating MAGE controlled feeding', 'postprandial walking MAGE CONGA', 'interval walking glycaemic variability', 'exercise snacks CGM variability', 'sitting breaks glucose variability', 'glycaemic variability sleep restriction stress breathing'],
  stop: 'Stop after the load-bearing reports, material null comparisons and accessible independent comparisons were appraised. Remaining access gaps are explicit and do not justify negative evidence or invented factor values. Reopen only for evidence capable of changing an admission or factor judgement.',
};

export const stage2Studies = [
  {id: 'aberg', author: 'Aberg et al. (2020)', doi: '10.2337/dc20-0263', title: 'Whole-Grain Processing and Glycemic Control in Type 2 Diabetes',
    role: 'Supporting', access: 'Full primary Methods/Results', population: '31 adults with type 2 diabetes; 28 completed.',
    protocol: 'Two-week crossover: intact oats, brown rice and coarse/kibbled bread versus matched finely processed whole-grain products; at least two-week washout.',
    result: 'Daily glucose SD difference -0.16 mmol/L (95% CI -0.25 to -0.06); mean amplitude of glycaemic excursions (MAGE) -0.36 (-0.65 to -0.08). Time in range and CONGA were null.',
    limitation: 'A food package, not an isolated grain or fibre effect; unmasked foods, short duration. Concealed randomisation, blinded CGM, initial masked analysis and intention-to-treat models support appraisal.'},
  {id: 'bruno', author: 'Bruno et al. (2024)', doi: '10.1016/j.isci.2024.111501', title: 'Weight-neutral early time-restricted eating improves glycemic variation and time in range without changes in inflammatory markers',
    role: 'Supporting, mixed endpoints', access: 'Full primary Methods/Results', population: '10 adults with prediabetes and overweight/obesity.',
    protocol: 'Six days of matched weight-maintenance food: 08:00-16:00, 80% of calories before 14:00, versus usual later distribution; randomised crossover without washout.',
    result: 'MAGE 2.4 versus 2.9 mmol/L (p=0.001); mean glucose, SD and time 70-180 mg/dL were not significantly different.',
    limitation: 'Small sample, no washout; timing, eating-window length and calorie distribution cannot be separated.'},
  {id: 'jamshed', author: 'Jamshed et al. (2019)', doi: '10.3390/nu11061234', title: 'Early Time-Restricted Feeding Improves 24-Hour Glucose Levels and Affects Markers of the Circadian Clock, Aging, and Autophagy in Humans',
    role: 'Independent partial corroboration', access: 'Full primary Methods/Results', population: '11 completers; only six valid CGM datasets.',
    protocol: 'Four-day controlled crossover: 08:00-14:00 versus 08:00-20:00; multiweek washout.',
    result: 'MAGE lower by 12 +/- 3 mg/dL (p=0.001).',
    limitation: 'Different population/window; technical CGM loss. Ravussin 2019 reports the same cohort, not another replication.'},
  {id: 'karstoft', author: 'Karstoft et al. (2017)', doi: '10.1007/s00125-016-4170-6', title: 'The effects of 2 weeks of interval vs continuous walking training on glycaemic control and whole-body oxidative stress in individuals with type 2 diabetes',
    role: 'Supporting variability; contextual null oxidative marker', access: 'Full publisher PDF Methods, Table 1 and Results', population: '14 adults with type 2 diabetes; 13 usable CGM records.',
    protocol: 'Randomised crossover: ten supervised 60-minute sessions over two weeks, alternating three-minute slower/faster walking; continuous and inactive comparator periods, multiweek washout.',
    result: 'MAGE decreased 1.7 +/- 0.4 mmol/L within interval training; interval/control comparison p=0.01. Within-period mean glucose was inconclusive (p=0.08).',
    limitation: 'Small unmasked trial, baseline imbalance and missing sensor record; oxidative-stress markers did not improve. No blanket superiority to all continuous exercise.'},
  {id: 'babir', author: 'Babir et al. (2026)', doi: '10.1007/s00125-026-06741-2', title: 'Exercise snacks performed in real-world settings reduce postprandial hyperglycaemia and glycaemic variability in individuals living with type 2 diabetes',
    role: 'Supporting secondary variability; null primary mean', access: 'Full primary Methods/Results', population: '31 inactive adults with well-controlled, non-insulin-treated type 2 diabetes.',
    protocol: 'Two 48-hour crossover periods: four one-minute vigorous bodyweight bouts daily versus usual activity; at least one hour between bouts, encouraged after meals.',
    result: 'Primary mean difference -0.2 mmol/L (95% CI -0.4 to 0; p=0.07). Secondary SD -0.1 mmol/L, CV -1 percentage point and MAGE -0.3 mmol/L; time in range was null.',
    limitation: 'Small secondary effects without multiplicity adjustment; short washout permits carryover. Not evidence for gentle walking or lasting clinical benefit.'},
  {id: 'trico', author: 'Trico et al. (2016)', doi: '10.1038/nutd.2016.33', title: 'Manipulating the sequence of food ingestion improves glycemic control in type 2 diabetic patients under free-living conditions',
    role: 'Related supportive sequence protocol', access: 'Full primary Methods/Results', population: '17 analysed adults with type 2 diabetes; three excluded for poor compliance.',
    protocol: 'Eight-week open parallel study; protein/fat foods before carbohydrate at lunch/dinner, both groups energy-restricted.',
    result: 'Capillary glucose coefficient of variation improved; six-point profiles, not continuous monitoring.', limitation: 'Different protocol from fish/rice; adherence exclusions and sparse sampling. No exact-protocol replication credit.'},
  {id: 'shukla', author: 'Shukla et al. (2017)', doi: '10.1136/bmjdrc-2017-000440', title: 'Carbohydrate-last meal pattern lowers postprandial glucose and insulin excursions in type 2 diabetes',
    role: 'Contextual acute exposure', access: 'Abstract; full methods not recovered in this assessment', population: '16 adults with type 2 diabetes.', protocol: 'Three-way acute meal-order comparison with ten-minute gap.', result: 'Lower three-hour glucose exposure/peak.', limitation: 'Exposure is not daylong variability; no automatic transfer to precise food rules.'},
  {id: 'touhamy', author: 'Touhamy et al. (2025)', doi: '10.2337/dc24-1956', title: 'Meal-sequence CGM report (PMID 39688621)',
    role: 'Unresolved, potentially material', access: 'Publisher PDF denied access; PMC verification barrier; Europe PMC recovery did not yield full methods', population: 'Indexed lead: metformin-treated type 2 diabetes.', protocol: 'Meal sequence in free-living and controlled settings; full protocol not appraised.', result: 'No unverified numerical result used.', limitation: 'Recover allocation, carryover, variability endpoints and uncertainty. Scite did not provide readable full text; ChatGPT-assisted Scite follow-up requested for this DOI. Could change sequence replication/precision, not assumed positive.'},
  {id: 'smith', author: 'Smith et al. (2022)', doi: '10.1136/bmjdrc-2022-002820', title: 'Premeal whey protein and free-living glycaemia',
    role: 'Material null variability, positive exposure', access: 'Full primary Methods/Results', population: '18 insulin-naive adults with type 2 diabetes.', protocol: 'Seven-day crossover: 15.6 g hydrolysed whey before three meals versus protein-depleted placebo.', result: 'Time in range increased and mean glucose fell; CV, MAGE and day-to-day difference measures were similar.', limitation: 'Single-blind, non-isocaloric comparison. Positive exposure cannot qualify this protocol for PM2 variability.'},
  {id: 'pabla', author: 'Pabla et al. (2025)', doi: '10.1016/j.ajcnut.2024.12.022', title: 'Medium-chain triglyceride and whey preload crossover trial',
    role: 'Supporting specific acute CV outcome, null primary exposure', access: 'Full primary Methods/Results', population: '20 participants; 18-19 intervention records.', protocol: 'Single-day MCT before breakfast, with/without later whey preloads, versus water.', result: 'CV lower; primary diurnal glucose exposure was null.', limitation: 'Unmasked, complex package; not replication of seven-day whey alone and not evidence for every fat/protein preload.'},
  {id: 'collins', author: 'Collins et al. (2025)', doi: '10.1111/dme.70079', title: 'Resistant-starch substitution and continuous glucose outcomes',
    role: 'Supporting meal-specific variability, null daily SD', access: 'Full primary Methods/Results', population: '17 adherent complete records analysed from 25 enrolled.', protocol: 'Four-day matched-food crossover replacing about 15% of starch using bespoke resistant-starch products.', result: 'Lunch MAGE 2.8 versus 3.7 mmol/L (p=0.004); daily SD (p=0.166) and mean glucose were null.', limitation: 'Selected completers, short duration and reported unpaired rank test for paired outcomes. Does not establish a universal cook/cool/reheat intervention.'},
  {id: 'sonia', author: 'Sonia et al. (2015)', doi: '10.6133/apjcn.2015.24.4.13', title: 'Cooling cooked white rice and postprandial glycaemic response',
    role: 'Contextual acute exposure', access: 'Primary abstract; full methods not appraised', population: '15 healthy adults.', protocol: 'Refrigerated/reheated rice versus fresh rice.', result: 'Lower acute glucose exposure.', limitation: 'Not daylong variability; no generalisation to all starches or unsafe cooling practices.'},
  {id: 'liatis', author: 'Liatis et al. (2010)', doi: '10.1038/ejcn.2010.89', title: 'Vinegar reduces postprandial hyperglycaemia in patients with type II diabetes when added to a high, but not to a low, glycaemic index meal',
    role: 'Positive/null exposure contrast', access: 'Primary abstract and limited full-text inspection; methods not fully appraised', population: '16 adults in two eight-person meal groups.', protocol: 'High- or low-glycaemic-index meal with/without vinegar.', result: 'High-index meal exposure lower; low-index comparison null.', limitation: 'No measured variability proposition; do not infer a generic acidic-food rule.'},
  {id: 'reynolds', author: 'Reynolds et al. (2016)', doi: '10.1007/s00125-016-4085-2', title: 'Advice to walk after meals is more effective for lowering postprandial glycaemia in type 2 diabetes mellitus than advice that does not specify timing',
    role: 'Material null variability, positive meal exposure', access: 'Full publisher PDF Methods/Results', population: '41 completers with type 2 diabetes.', protocol: 'Two-week crossover: ten-minute walks after each main meal versus thirty minutes without specified timing.', result: 'Meal exposure ratio 0.88 (95% CI 0.78-0.99); MAGE difference -0.42 (95% CI -0.94 to 0.10; p=0.117); CONGA null.', limitation: 'Activity differed between regimens; no established variability benefit. A null contrast is not equivalence.'},
  {id: 'dempsey', author: 'Dempsey et al. (2017)', doi: '10.1007/s00125-016-4169-z', title: 'Interrupting prolonged sitting and subsequent glucose regulation in type 2 diabetes',
    role: 'Contextual exposure; variability unresolved', access: 'Publisher abstract; full quantitative variability appraisal unavailable', population: '24 adults with type 2 diabetes.', protocol: 'Three-minute walking/simple resistance breaks every thirty minutes; 22-hour CGM.', result: 'Mean glucose and hyperglycaemia improved in the abstract.', limitation: 'CGM use alone does not establish a variability effect. Same cohort as the earlier Dempsey report; not two independent replications.'},
  {id: 'bailey', author: 'Bailey et al. (2022)', doi: '10.3390/nu14030605', title: 'Free-living sitting-reduction crossover and glucose outcomes',
    role: 'Contextual null', access: 'Full primary Methods/Results', population: '12 adults with overweight/obesity.', protocol: 'Two four-day free-living regimens.', result: 'No significant 24-hour mean, exposure or CV contrast.', limitation: 'Different from Dunstan laboratory walking breaks; not proof that all sitting interruptions are ineffective.'},
  {id: 'resistance', author: 'Resistance/endurance comparison (2012)', doi: '10.1139/apnm-2012-0494', title: 'Acute resistance and endurance exercise in insulin-treated type 2 diabetes',
    role: 'Contextual adverse/null response', access: 'Primary abstract only', population: 'Eight inactive older insulin-treated men.', protocol: 'Acute resistance versus cycling/control.', result: 'Resistance-day glucose was worse; cycling contrast null.', limitation: 'Small, different population and exposure endpoint; cannot establish a general harmful resistance effect or a PM2 lever.'},
  {id: 'wheat', author: 'Wheat-porridge comparison (2022)', doi: '10.1093/ajcn/nqab434', title: 'Whole-grain and refined wheat porridge comparison',
    role: 'Contextual null food-matrix comparison', access: 'Primary abstract only', population: '16 healthy adults.', protocol: 'Matched wheat porridges.', result: 'Mostly null acute contrasts.', limitation: 'Different food structure and population; not an exact replication of the two-week diabetes package.'},
];

export const stage2Candidates = [
  {id:'grain', candidate:'Whole-grain processing/food matrix', decision:'Proposed SOP', finding:'PM2-F5', studies:['aberg','wheat'], reason:'Direct daily SD and MAGE evidence for the tested package; not a generic whole-grain claim.', owner:'PM2; no ownership transfer'},
  {id:'timing', candidate:'Defined early eating/calorie distribution', decision:'Proposed SOP', finding:'PM2-F6', studies:['bruno','jamshed'], reason:'MAGE measured directly; small studies, mixed endpoints and differing protocols retained.', owner:'PM2; circadian links contextual'},
  {id:'sequence', candidate:'Fish fifteen minutes before rice', decision:'Proposed SOP', finding:'PM2-F2', studies:['trico','shukla','touhamy'], reason:'Existing Kuwata finding directly measures acute within-meal SD. Do not call it daylong variability or general carbohydrates-last advice.', owner:'PM2 acute component; broader sequence claims unresolved'},
  {id:'interval', candidate:'Supervised interval walking training', decision:'Proposed lifestyle lever', finding:'PM2-F7', studies:['karstoft'], reason:'Direct MAGE contrast against inactive control; exact training protocol only.', owner:'PM2; other aerobic programmes not interchangeable'},
  {id:'snacks', candidate:'Brief vigorous bodyweight exercise bouts', decision:'Proposed lifestyle lever', finding:'PM2-F8', studies:['babir'], reason:'Small secondary variability effects despite null primary mean; qualified pilot option, not universal advice.', owner:'PM2; capacity/medication suitability requires individual assessment'},
  {id:'whey', candidate:'Seven-day whey preloads', decision:'Not admitted to PM2 preview', studies:['smith'], reason:'Positive mean/time-in-range effects but no established CV/MAGE improvement.', owner:'Preserve for PM1/PM3 mission check; not automatically admitted there'},
  {id:'mct', candidate:'MCT with/without later whey', decision:'Retained, not selected', studies:['pabla'], reason:'Specific acute CV result; complex unmasked package, primary exposure null. Not interchangeable with whey alone.', owner:'PM2 candidate for protocol-level adjudication, not scientifically rejected'},
  {id:'starch', candidate:'Resistant-starch substitution/cooling', decision:'Retained, not selected', studies:['collins','sonia'], reason:'Bespoke substitution has meal-specific MAGE evidence but daily SD null; cooling evidence is exposure-only. No common preparation rule established.', owner:'Keep PM2 meal-specific candidate; PM1/PM3 exposure follow-up separately'},
  {id:'acid', candidate:'Vinegar/acidic additions', decision:'Not admitted to PM2 preview', studies:['liatis'], reason:'High-index exposure positive, low-index null; no verified variability proposition.', owner:'Preserve for PM1/PM3 mission check; not automatic ownership or recommendation'},
  {id:'postmeal', candidate:'Ten-minute post-meal walking', decision:'Not admitted to PM2 preview', studies:['reynolds'], reason:'Meal exposure positive, measured MAGE/CONGA contrasts null or inconclusive.', owner:'Preserve for PM1/PM3 mission check; evidence not discarded'},
  {id:'sitting', candidate:'Walking/resistance sitting interruptions', decision:'Not admitted to PM2 preview', finding:'PM2-F4', studies:['dempsey','bailey'], reason:'Original Dunstan/independent Bailey evidence concerns acute exposure; different free-living CV study null, Dempsey variability unresolved.', owner:'Preserve existing SF4 and 6/8 exposure score; PM1/PM3 follow-up only'},
  {id:'aerobic', candidate:'Generic aerobic/resistance exercise', decision:'No blanket admission', finding:'PM2-F1', studies:['karstoft','resistance'], reason:'Uncontrolled seven-day evidence and heterogeneous protocols cannot establish every exercise mode; precise interval protocol evaluated separately.', owner:'Existing SF1 retained; broader PM3 and exercise ownership review proposed'},
];

export const hubScreen = [
  ['Food preparation', 'Processing and resistant starch evaluated; soaking/sprouting not inherited as PM2 admissions.'],
  ['Dietary protocols', 'Sequence, preloads, acidity, timing and matrix screened above; exposure-only findings retained.'],
  ['Conditional supplementation', 'No independent PM2 variability admission established by this assessment; generic nutrient adequacy is not intervention evidence.'],
  ['Light/circadian', 'Dietary timing evaluated as its actual food protocol, not a light intervention; no light-specific PM2 lever admitted.'],
  ['Stress/autonomic', 'Sleep/stress/breathing screen identified contextual or mixed interventions, not a verified isolated PM2 protocol. Park for appraisal, not evidence of no effect.'],
  ['Lifestyle', 'Walking, sitting interruption, training and resistance assessed; no quota or automatic transfer from glucose exposure.'],
];

const study = id => stage2Studies.find(row => row.id === id);
const replication = 'Only one independent supporting dataset for this exact protocol was verified in the bounded assessment. Independent replication was not established in this assessment. Related protocols are contextual, not automatic replications.';
const specs = [
  {id:'PM2-F5', title:'Whole-grain processing and daily variability', source:'aberg', factors:{D:2,B:2,P:1,R:0},
    proposition:'In adults with type 2 diabetes, the tested less-processed whole-grain package reduced daily glucose standard deviation and mean amplitude of glycaemic excursions (MAGE) versus a nutrient-matched finely processed package over two weeks.',
    rationale:{D:'Exact food-package comparison with daily CGM dispersion endpoints.', B:'Concealed randomisation, blinded CGM and initial analyst, order-adjusted intention-to-treat analysis; food masking was impossible.', P:'Intervals support modest changes; short-term package effects do not identify a single food or durable benefit.', R:replication}},
  {id:'PM2-F6', title:'Early eating and glucose variability', source:'bruno', related:['jamshed'], factors:{D:2,B:1,P:1,R:1},
    proposition:'In a small prediabetes crossover, the tested early, front-loaded eating schedule reduced mean amplitude of glycaemic excursions (MAGE) over six days versus later calorie distribution; mean glucose and several other variability/range measures were inconclusive.',
    rationale:{D:'Assesses the measured MAGE contrast, not an isolated circadian mechanism.', B:'Matched feeding and randomised order help; no washout and a small crossover leave residual concerns.', P:'MAGE was informative, with mixed endpoints and limited transportability.', R:'Independent Jamshed trial offers partial corroboration only: different window/population and just six usable CGM records. Same-cohort publications are not extra replications.'}},
  {id:'PM2-F7', title:'Interval walking and glucose variability', source:'karstoft', factors:{D:2,B:1,P:1,R:0},
    proposition:'Two weeks of the tested supervised interval-walking programme reduced mean amplitude of glycaemic excursions (MAGE) versus an inactive control period in a small type 2 diabetes crossover trial.',
    rationale:{D:'Direct MAGE comparison in the tested population.', B:'Randomised crossover and washout help; unmasked training, baseline imbalance and missing CGM remain.', P:'Small trial with uncertainty about sustained benefit; mean and oxidative endpoints do not all agree.', R:replication}},
  {id:'PM2-F8', title:'Vigorous activity bouts and variability', source:'babir', factors:{D:2,B:1,P:1,R:0},
    proposition:'Four brief vigorous bodyweight bouts daily produced small secondary continuous glucose monitoring (CGM) variability improvements over 48 hours in inactive adults with well-controlled type 2 diabetes; the primary mean-glucose contrast was not significant.',
    rationale:{D:'Exact intervention and secondary variability endpoints, with primary null retained.', B:'Concealed crossover allocation; unmasked behaviour, short washout and unadjusted multiple secondary tests constrain protection.', P:'Small effects and short follow-up; rounded intervals and secondary analyses limit magnitude interpretation.', R:replication}},
];

export const stage2Audits = specs.map(spec => {
  const primary = study(spec.source);
  const sources = [primary, ...(spec.related || []).map(study)];
  const raw = Object.values(spec.factors).reduce((a,b) => a+b,0);
  return {
    id:`glycaemic-${spec.id.toLowerCase().replace('pm2-', '')}-assessment-v1`, findingId:spec.id, title:spec.title,
    pmId:'BRS6-FM1-PM2', proposition:spec.proposition, recordVersion:1,
    lastEvidenceAssessmentDate:stage2Assessment.date, assessmentStatus:'codex-provisional', assessmentComplete:true,
    factors:spec.factors, factorStates:{D:'established',B:'established',P:'established',R:'established'},
    rationale:spec.rationale, rawScore:raw, adjustedScore:raw,
    capRationale:'No existing confidence ceiling is triggered. Replication 0, where assessed, is not an extra subtraction. No confidence is transferred to a different protocol.',
    scopeNote:'Preview-only proposed Finding. No inference to ADHD, cognition, human dietary benefit beyond the tested endpoint, or long-term clinical outcomes.',
    limitations:[primary.limitation, 'No human scientific review recorded. Provisional SEC is distinct from intervention admission and PM evidence-review status.'],
    sources:{supporting:sources.map(s=>`stage2-ref-${s.id}`), contradictory:[], contextual:[],
      contradictoryAssessment:primary.result,
      targetedChecks:sources.map(s=>({doi:s.doi, role:s.role, access:s.access, assessment:`${s.population} ${s.protocol} ${s.limitation}`})),
      retrievalLimited:[]},
    process:'Codex bounded Stage 2A/2B reassessment, 2026-10-18, version 1; primary methods/results appraisal and protocol-specific admission review',
    methodology:glycaemicAudits[0].methodology, reviewer:null,humanReview:null,discussionUrl:null,
    stoppingRationale:stage2Assessment.stop,
    history:[{date:stage2Assessment.date,decision:'New preview-only proposition required to trace a distinct intervention; no canonical Finding or admission created.'}],
  };
});

export const expandedGlycaemicAudits = [...glycaemicAudits.map(original => {
  if (!['PM2-F1','PM2-F3'].includes(original.findingId)) return original;
  const recovered = study('karstoft');
  return {...original, recordVersion:2, previousAssessments:[original],
    sources:{...original.sources,
      retrievalLimited:original.sources.retrievalLimited.filter(s=>s.doi!==recovered.doi),
      targetedChecks:[...original.sources.targetedChecks,{doi:recovered.doi,role:'Contextual recovery; not exact-protocol replication',access:recovered.access,assessment:original.findingId==='PM2-F3' ? 'MAGE improved without corresponding oxidative-marker improvement; causal generalisation remains unsupported.' : 'Different two-week interval protocol, now fully recovered and assessed separately as PM2-F7; no retroactive replication credit.'}]},
    history:[...original.history,{date:stage2Assessment.date,decision:'Recovered Karstoft report added as contextual evidence. Exact original proposition, factors, caps and score unchanged; prior record retained.'}],
  };
}), ...stage2Audits];

export const stage2Findings = stage2Audits.map(record => {
  const primary = study(specs.find(s=>s.id===record.findingId).source);
  return {id:record.findingId, finding_label:record.title, finding_statement:record.proposition, finding_summary:record.proposition,
    synthesis:'Protocol-specific finding for scientific review; not a category-wide dietary or exercise recommendation.',
    synthesis_limitations:record.limitations[0], synthesised_evidence_confidence:'not-yet-scored',
    evidence_considered:[{label:primary.author, href:`#stage2-ref-${primary.id}`, data_level:'Human Study', evidence_source:'bounded-external-search',
      directional_finding:primary.result, assessment:{study:primary.protocol,population:primary.population,result:primary.result,limitations:primary.limitation,retrieval_scope:primary.access}}]};
});

const lever = (input, finding, inputType, dietary, category, keys) => {
  const record = expandedGlycaemicAudits.find(a=>a.findingId===finding);
  const spec = specs.find(s=>s.id===finding);
  const primary = spec ? study(spec.source) : null;
  return {atom_id:`SEC-${finding}-${dietary ? 'SOP' : 'LIFE'}`, input, input_type:inputType, biological_role:record.proposition,
    evidence_source:{finding_ids:[finding],citation_keys:keys}, evidence_limitation:record.limitations[0], dietary_input:dietary,
    dietary_input_note:dietary ? 'Dietary SOP, not a nutritional capacity requirement.' : 'Non-dietary exercise relationship.',
    optimisation_category:category, description_finding_id:finding,
    reader_description:primary ? `${primary.population} ${primary.protocol}` : record.scopeNote};
};
export const proposedSops = [
  lever('Less-processed whole-grain food package (two-week trial)', 'PM2-F5','dietary protocol',true,'food_prep',['stage2-ref-aberg']),
  lever('Early eating with front-loaded calories (six-day trial)', 'PM2-F6','dietary protocol',true,'dietary_protocols',['stage2-ref-bruno','stage2-ref-jamshed']),
  lever('Fish fifteen minutes before rice (acute diabetes trial)', 'PM2-F2','dietary protocol',true,'dietary_protocols',['kuwata_meal_sequence_2016']),
];
export const proposedLifestyle = [
  lever('Supervised interval walking (two-week trial)', 'PM2-F7','physical activity',false,null,['stage2-ref-karstoft']),
  lever('Four brief vigorous activity bouts daily (48-hour trial)', 'PM2-F8','physical activity',false,null,['stage2-ref-babir']),
];

export function stage2DisplayData(original) {
  return {...original,
    system_optimisation_practices:proposedSops, lifestyle_priorities:proposedLifestyle,
    scientific_findings:expandedGlycaemicAudits.map(a=>({id:a.findingId,finding_label:a.title})),
    references:[...original.references,...stage2Studies.map(s=>`[${s.author}](/docs/system/sec-calibration/glycaemic-variability#stage2-ref-${s.id})`)]};
}
