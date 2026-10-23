// One-time local projection of reviewed evidence through the existing generators.
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import matter from 'gray-matter';
import {expectedFindingsSection} from './lib/scientific-findings-gate.mjs';
import {renderPmPhenomeSectionBody} from './lib/phenome-relationships.mjs';
import {secAssessmentHash,validateSecRegistry} from './lib/sec-assessments.mjs';
const file='docs/biological-targets/brs1/fm1/brs1-fm1-pm2-lat1-competitive-transport-modulation.mdx';
const dir='review/pm2-reassessment',read=p=>fs.readFileSync(p,'utf8');
const baseline=read(dir+'/baseline.mdx');
if(read(file)!==baseline)throw Error('PM2 changed since baseline; stop rather than overwrite');
const pm=matter(baseline),data=pm.data;
const registryFile='system/sec-assessments/registry.json',previous=JSON.parse(read(registryFile));
if(previous.assessments.some(e=>e.record.pmId===data.pm_id))throw Error('PM2 assessment history already exists');
const preserved=['dietary_input_traceability','dietary_lever_atoms','pm_kc_relationships','kc_applicability_adjudications','kc_change_control_flags','kc_adjudication_history','key_constraints'];
const protectedFiles=[
 'docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation.mdx',
 'docs/biological-targets/brs1/fm4/brs1-fm4-pm9-gaba-synthesis-capacity.mdx',
 'docs/biological-targets/brs2/fm1/brs2-fm1-pm3-same-synthesis.mdx',
 'docs/biological-targets/brs6/fm1/brs6-fm1-pm2-glycaemic-variability-regulation.mdx',
 'system/scientific-finding-schema.md','system/dietary-input-traceability-contract.md','system/primary-mechanism-schema.md',
 'system/generated/brs2-input-substance-food/substance-index.md','system/generated/food-strategy-rollup/rollup.generated.json',
];
const hashes=Object.fromEntries(protectedFiles.map(p=>[p,createHash('sha256').update(read(p)).digest('hex')]));
const url={
 breakfast:'https://doi.org/10.1093/ajcn/77.1.128',
 ashley:'https://doi.org/10.1007/BF01252031',
 evening:'https://doi.org/10.1093/ajcn/36.1.143',
 protein:'https://doi.org/10.1016/j.clnu.2012.11.027',
 alertness:'https://doi.org/10.1093/ajcn/81.5.1026',
 nullSleep:'https://doi.org/10.3390/nu17071196',
};
data.summary='Large neutral amino acid transporter 1 (LAT1) helps control which amino acids can enter the brain. Tyrosine, tryptophan and other large neutral amino acids (LNAAs) compete for this shared route. Human feeding experiments show that meal composition and protein source can alter their relative availability in blood. The response depends on the tested meal and sampling period, rather than a universal carbohydrate-to-protein rule. This transport step connects circulating precursor supply with downstream neurotransmitter pathways.';
data.scientific_findings_intro='LAT1 transport identity is separated from the experimental finding that meal composition changes plasma precursor ratios. Breakfast, evening-meal and protein-source results show why a between-meal difference must not be described as a universal rise above baseline. Plasma ratios do not directly measure brain transport or neurotransmitter production. [[1]](#pm-ref-1) [[2]](#pm-ref-2) [[3]](#pm-ref-3) [[7]](#pm-ref-7) [[8]](#pm-ref-8)';
const f1=data.scientific_findings.find(f=>f.id==='PM2-F1');
f1.finding_label='Shared LAT1 transport and precursor competition';
f1.finding_statement='Large neutral amino acids share competitive transport through LAT1 (SLC7A5) with the SLC3A2 heavy chain; plasma composition helps shape substrate availability but is not a direct measurement of net brain uptake.';
f1.finding_summary='Large neutral amino acid transporter 1 (LAT1) carries competing amino acids as part of an exchanger complex. Blood ratios describe substrate presentation, not measured transport flux.';
f1.synthesis='Curated human SLC3A2 annotation and the deposited human LAT1 complex support transporter identity; the inherited Fernstrom review supplies the physiological competition context. Exchange, substrate affinity and cellular context qualify the simple plasma-ratio model. No numerical score is assigned merely for curated identity.';
f1.synthesis_limitations='Curated transporter and structural records do not quantify an ordinary meal effect in the human brain. The plasma-ratio proxy is not the sole determinant of net flux. The original Finding ID and source history are retained.';
const f2=data.scientific_findings.find(f=>f.id==='PM2-F2');
f2.finding_label='Meal composition and protein source alter plasma precursor ratios';
f2.finding_statement='In the studied healthy adults, meal composition and tested protein sources can alter plasma tryptophan relative to competing large neutral amino acids; the direction and tyrosine response depend on the exposure and sampling context, without establishing increased human brain transport or neurotransmitter synthesis.';
f2.finding_summary='Human feeding experiments demonstrate context-dependent plasma-ratio changes. A higher ratio after one meal than another is not necessarily an increase above baseline.';
f2.finding_interpretation='Retain the admitted meal-composition regulatory relationship at its plasma-ratio ceiling. Protein-source experiments qualify generalisation; they do not establish a best ratio, an additional nutrient requirement or a clinical protocol.';
f2.synthesis='Breakfast contrasts and separate protein-source experiments support meal-responsive precursor ratios, but not one universal direction. The recovered Wurtman table shows lower tryptophan and tyrosine ratios after the protein-rich breakfast, not an increased tyrosine ratio. Evening-meal null results and a starch-control null constrain extrapolation. Brain uptake and downstream effects were not measured by those plasma experiments.';
f2.synthesis_limitations='Small acute healthy-adult samples; different meals, ratio denominators and sampling windows; incomplete historical methods retrieval. No population-wide optimum or direct human brain-flux estimate. Evening null results limit generalisation but are not equivalence evidence.';
const w=f2.evidence_considered.find(e=>e.citation_key==='wurtman_effects_2003');
w.evidence_source='bounded-external-search';
w.directional_finding='Both plasma precursor ratios fell from baseline after the protein-rich breakfast; between-breakfast responses differed. A tyrosine increase was not demonstrated.';
w.assessment={study:'Random-order two-breakfast crossover; sampling through four hours, chromatographic amino-acid assays and mixed-model analysis with order and multiplicity considered.',population:'Nine young adults entered; eight completed both conditions (six women, two men).',result:w.directional_finding,effect_magnitude:'Median between-breakfast contrast: 54% for tryptophan ratio and 28% for tyrosine ratio; these are not increases after protein. Carbohydrate-arm increases from baseline were not significant.',evidence_summary:'Direct plasma contrast, not brain transport.',limitations:'One incomplete participant; visible meal differences and unreported concealment/assay blinding; residual uncertainty in magnitude and generalisation.'};
function evidence(label,doi,key,result,design,population,limitation) {
 return {label,citation_key:key,href:'#'+key,data_level:'Human Mechanistic',evidence_source:'bounded-external-search',directional_finding:result,assessment:{study:design,population,result,effect_magnitude:'See source-specific results; no pooled effect or invented confidence interval.',evidence_summary:result,limitations:limitation}};
}
f2.evidence_considered.push(
 evidence('Ashley et al. (1982)',url.evening,'pm2-source-evening1982','The unfortified evening meals did not significantly change the tryptophan ratio; tyrosine ratios were unchanged.','Within-person evening meal comparison; author-posted results and figures recovered.','Eight healthy men.','Different meals and time window from breakfast experiments; null significance does not establish equivalence.'),
 evidence('Fernstrom et al. (2013), protein-source experiment',url.protein,'pm2-source-protein2013','Alpha-lactalbumin raised the tryptophan ratio, gluten and zein lowered it, and starch did not change it.','Four-visit feeding experiment, four-hour chromatographic sampling; full institutional manuscript examined.','Six fasting healthy men.','Order randomisation and blinding not established in the examined report; different denominator from Wurtman. Not a universal food ranking.'),
);
f2.evidence_dependency=['Ashley breakfast and evening reports share investigators; do not count them as independent-team replication. Wurtman breakfast and Fernstrom protein-source experiments are distinct datasets and teams, but test different protocols. Ratio denominators differ; no pooled effect is calculated. Markus protein studies are contextual corroboration, not extra replications of a carbohydrate-to-protein protocol.'];
const f3=data.scientific_findings.find(f=>f.id==='PM2-F3');
f3.finding_label='Plasma-ratio changes do not establish ordinary-meal functional benefit';
f3.finding_statement='The ordinary-meal studies assessed here measured plasma amino-acid ratios, not brain transport or ADHD outcomes; findings from enriched-protein attention studies do not establish ordinary-meal efficacy.';
f3.finding_summary='Enriched-protein studies include functional endpoints, but their exposures and populations differ from ordinary meals. Keep that evidence distinct from a demonstrated LAT1-mediated clinical effect.';
f3.synthesis='The original meal studies do not measure functional outcomes. Markus et al. (2005) measured morning attention after an enriched-protein protocol, while a newer athlete trial reported null sleep/performance results. These contexts cannot validate a general ordinary-meal benefit or prove mediation by LAT1.';
f3.synthesis_limitations='This is an assessment-scope boundary, not a claim that functional evidence is absent from the entire literature. The enriched-protein trials are not ordinary-meal or ADHD trials; no equivalence or mediation is inferred.';
data.dietary_lever_presentations.find(p=>p.atom_id==='PM2-DIT-3').reader_description='The carbohydrate-to-protein composition of the tested breakfasts changed blood ratios among amino acids competing for brain entry. A between-meal contrast is not necessarily an increase above baseline: the recovered breakfast study found lower tryptophan and tyrosine ratios after its protein-rich meal. Responses differ with meal context and protein source. No best ratio or improvement in brain function is established.';
for(const p of data.dietary_lever_presentations)if(p.atom_id!=='PM2-DIT-3')p.short_descriptor=p.atom_id==='PM2-DIT-1'?'Non-essential amino acid':'Essential amino acid';
data.system_optimisation_practices=[];data.lifestyle_priorities=[];
const motivation=data.phenome_relationships.find(p=>p.target_phenome==='Motivation / Drive');
motivation.rationale='The tested meals changed competitive plasma ratios; the recovered breakfast study did not show a tyrosine-ratio rise after protein {{cite:wurtman_effects_2003}}. This remains a translational mapping, not demonstrated motivation, drive or ADHD benefit.';
data.intervention_dominance_assessment={
 evidence_qualification:{label:data.intervention_dominance,rationale:'Retain the accepted dietary state-regulation relationship, qualified to measured plasma-ratio effects.',scope_note:'Acute plasma-ratio modulation in studied healthy adults, not demonstrated optimisation of human brain transport or function.',routes:[{group_id:'3.1',evidence_basis:'intervention-effect',intervention_effect:'Tested meal composition alters plasma competitive precursor ratios.',context:'Healthy-adult acute feeding experiments.',limitations:'Context-dependent responses, including null contrasts; no optimum or clinical benefit.',evidence_source:{finding_ids:['PM2-F2'],citation_keys:['wurtman_effects_2003','ashley_breakfast_1985']}}]},
 principal_route_selection:{disposition:'established',selected_groups:['3.1'],rationale:'Retain Dietary Requirements as the existing admitted regulatory-state route, not a new capacity requirement. No SOP or lifestyle candidate independently establishes a preferred transport-optimisation protocol in this bounded assessment.',comparative_limitations:'No head-to-head superiority over all SOP or lifestyle routes; changes in plasma ratios are not automatically beneficial.',assessments:[{group_id:'3.1',relevance:'Regulates the measured competitive precursor presentation state.',directness:'Plasma endpoint is directly measured; brain transport remains inferred.',extent:'Different acute meals and proteins give different responses; no universal direction or dose target.'}]}
};
const extra=[
 ['Ashley et al. (1982) — Evening meals and plasma amino-acid ratios','pm2-source-evening1982'],
 ['Fernstrom et al. (2013) — Protein sources and plasma tryptophan ratio','pm2-source-protein2013'],
 ['Markus et al. (2005) — Enriched protein and next-morning attention','pm2-source-alertness2005'],
 ['Pre-sleep alpha-lactalbumin trial (2025) — Null sleep/performance outcomes','pm2-source-null2025'],
];
for(const [label,key] of extra)data.references.push(`[${label}](/docs/biological-targets/brs1/fm1/brs1-fm1-pm2-lat1-competitive-transport-modulation#${key})`);
// Exact versions are appended; existing assessments are never rewritten.
const records=data.scientific_findings.map(f=>{
 const scored=f.id==='PM2-F2';
 const r={id:'lat1-'+f.id.toLowerCase()+'-assessment',recordVersion:1,pmId:data.pm_id,findingId:f.id,title:f.finding_label,proposition:f.finding_statement,assessmentStatus:scored?'codex-provisional':'not-scored',assessmentComplete:scored,lastEvidenceAssessmentDate:'2026-10-19',process:'Codex bounded Stage 2A/2B appraisal; full-text recovery and proposition-level SEC assessment. No human scientific review recorded.',methodology:{name:'SEC calibration rubric, existing D/B/P/R anchors and caps',source:'system/reviews/sec-calibration/SEC-calibration-rubric-proposal.html'},factors:scored?{D:2,B:1,P:1,R:1}:{D:null,B:null,P:null,R:null},factorStates:scored?{D:'established',B:'established',P:'established',R:'established'}:{D:'unresolved',B:'unresolved',P:'unresolved',R:'unresolved'},rawScore:scored?5:null,adjustedScore:scored?5:null,capRationale:scored?'D2: no inferential cap for the plasma proposition. No B0/P0 cap applies. R1 limits replication credit; no extra deduction.':'No numerical synthesis score assigned.',rationale:scored?{
 D:'2/2: controlled feeding studies measure the scoped plasma ratio directly. Human brain uptake and benefit are explicitly excluded.',
 B:'1/2: Wurtman randomised meal order, used objective assays and order-adjusted/multiplicity-aware analysis. Visible meals, one incomplete participant and incompletely established protections in historical and protein-source studies leave residual concerns; no critical bias is demonstrated.',
 P:'1/2: source-specific contrasts and reported SEM/ranges distinguish a meal effect in tested conditions. Small samples, heterogeneous protocols and limited paired uncertainty leave materially different magnitudes and boundaries plausible. Null experiments are not equivalence results.',
 R:'1/2: separate investigator groups and datasets corroborate plasma meal responsiveness, but protocol/denominator differences and credible evening/starch nulls preclude full replication credit. This is not independent replication of one exact meal protocol.',
 }:{D:'Not scored: retained biochemical provenance or an interpretive/phenome boundary, not a newly quantified intervention proposition.',B:'No numerical bias judgement assigned to an unscored contextual or provenance record.',P:'No numerical precision judgement or zero inferred from missing assessment.',R:'No numerical replication judgement assigned; curated agreement is not empirical replication.'},limitations:[f.synthesis_limitations,'Evidence-confidence conclusions distinguish scientific limitations from retrieval limitations. No human expert review or PM-wide Reviewed status is inferred.'],sources:{supporting:scored?[url.breakfast,url.ashley,url.protein]:['https://www.uniprot.org/entry/P08195','https://www.ebi.ac.uk/emdb/EMD-9721'],contextual:[url.alertness,url.nullSleep],contradictoryAssessment:'Ashley 1982 unfortified evening meals and the 2013 starch control did not reproduce a universal carbohydrate-induced rise. The 2025 sleep/performance null constrains functional extrapolation, not the measured acute plasma effect.',targetedChecks:[{doi:'10.1093/ajcn/77.1.128',role:'supporting and directional correction',access:'Scite abstract only; published five-page full text recovered and examined via public PDF.',assessment:'Random-order crossover, Table 2, multiplicity-aware analysis; both protein-arm ratios decreased.'},{doi:'10.1016/j.clnu.2012.11.027',role:'supporting with null control',access:'Full institutional manuscript, UC eScholarship.',assessment:'Distinct protein-source effects and starch null; six men, four visits, no human brain outcome.'},{doi:'10.1093/ajcn/36.1.143',role:'contradictory to universal-direction claim',access:'Scite/PubMed abstract plus author-posted results and figures.',assessment:'Unfortified evening-meal ratios unchanged; different protocol, not equivalence.'}],retrievalLimited:[{url:url.ashley,limitation:'Scite returned abstract only. Publisher/repository recovery search did not establish full methods access; no concealment, blinding or paired confidence interval assumed.'}]},history:[{date:'2026-10-19',decision:'Bounded reassessment in the existing isolated checkout. Preserve inherited Finding IDs, six atoms and KC decisions. Correct Wurtman direction from recovered Table 2; separate elementary provenance, plasma modulation and functional inference. PM2-only SEC integration authorised by user.'}]};
 return r;
});
const registry=structuredClone(previous);
for(const r of records){const sha256=secAssessmentHash(r);registry.assessments.push({sha256,record:r});data.scientific_findings.find(f=>f.id===r.findingId).sec_assessment_ref={id:r.id,version:r.recordVersion,sha256};}
const issues=validateSecRegistry(registry,{previous});if(issues.length)throw Error(JSON.stringify(issues));
for(const key of preserved)if(JSON.stringify(data[key])!==JSON.stringify(matter(baseline).data[key]))throw Error('Protected data changed: '+key);
let body=pm.content;
const overviewStart=body.indexOf('### Overview'),overviewEnd=body.indexOf('## 2.',overviewStart);
body=body.slice(0,overviewStart)+`### Overview

${data.summary} [[1]](#pm-ref-1) [[2]](#pm-ref-2) [[7]](#pm-ref-7) [[8]](#pm-ref-8)

- **Biological role:** Relative precursor availability helps shape competition at the blood-brain barrier. It does not directly measure brain transport. [[1]](#pm-ref-1)
- **Implementation Notes:** Meal composition is the retained regulatory input. The tested breakfasts differ from an optimal everyday eating rule, and protein source also matters. [[2]](#pm-ref-2) [[8]](#pm-ref-8)
- **Biological Relevance:** This transport step follows [amino-acid provision in PM1](/docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation) and precedes downstream signalling.

`+body.slice(overviewEnd);
body=body.replace('↑ LAT1 transport context; ↑ LNAA competition control; ↑ precursor transport bias','Meal-responsive plasma precursor ratios; direction depends on the tested exposure. [[2]](#pm-ref-2) [[7]](#pm-ref-7) [[8]](#pm-ref-8)');
body=body.replace('<p class="brs-hub-sop-category-desc">Only categories with a substantive evidence-qualified intervention are shown.</p>','No additional protocol is selected. Enriched-protein experiments remain evidence rather than a general recommendation; their exact exposures and limitations are retained in [PM2-F2](#pm2-f2) and Evidence & Audit.');
body=body.replace('No evidence-qualified lifestyle relationship is projected. Meal-timing and activity lines on this page were not supported as PM2 Finding objects.','No PM-specific lifestyle protocol is selected after screening exercise, sleep/circadian and stress-management candidates. Their contextual evidence and unresolved transport endpoints remain in Evidence & Audit; this does not reject their broader health relevance.');
const mechanismStart=body.indexOf('## 4. Mechanistic Basis'),findingsStart=body.indexOf('### 4.1 Scientific Findings');
body=body.slice(0,mechanismStart)+`## 4. Mechanistic Basis + Scientific Findings

### Summary

Large neutral amino acid transporter 1 (LAT1) provides a shared exchange route for amino acids at the blood-brain barrier. Relative blood concentrations help describe competition; they do not alone determine net transport. Meal composition changes that blood-side context, not a measured brain dose. [[1]](#pm-ref-1) [[2]](#pm-ref-2) [Curated C1](#pm2-curated-c1) [Curated C2](#pm2-curated-c2)

<div class="brs-fm-hub-item" data-brs-fm-hub>
<div class="brs-fm-hub-shell">
<button type="button" class="brs-fm-hub-summary" aria-expanded="false">
<span class="brs-fm-hub-chevron" aria-hidden="true"></span>
<strong>LAT1 competitive transport — mechanistic detail</strong>
</button>
<div class="brs-fm-hub-panel" hidden>

<span id="pm2-mechanism-f1" />
<span id="lat1-and-competitive-precursor-transport" />

#### PM2-F1

Tyrosine, tryptophan and other large neutral amino acids (LNAAs) share an exchanger containing LAT1 and its SLC3A2 heavy chain. The curated annotation and deposited human complex establish molecular identity; affinity, exchange conditions and blood-side supply qualify the ratio model. Neither a structural record nor a blood ratio measures an ordinary meal's net brain uptake. [[1]](#pm-ref-1) [Curated C1](#pm2-curated-c1) [Curated C2](#pm2-curated-c2)

Supporting evidence: [PM2-F1](#pm2-f1).

<span id="pm2-mechanism-f2" />
<span id="insulin-mediated-partitioning-and-meal-macronutrient-bias" />

#### PM2-F2

Feeding changes circulating amino-acid supply and peripheral handling. The breakfast comparison found different plasma responses between meals, but its protein-rich arm lowered both the tryptophan and tyrosine ratios from baseline. That is not evidence that protein raised the tyrosine ratio. [[2]](#pm-ref-2) Another breakfast experiment supported a tryptophan-ratio contrast, while unfortified evening meals did not show the same change. [[3]](#pm-ref-3) [[7]](#pm-ref-7)

Protein identity also matters: tested alpha-lactalbumin, gluten and zein gave different tryptophan-ratio responses, and the starch control was null. Ratios, denominators and measurement windows must remain source-specific; these results do not establish a universal meal rule or human neurotransmitter increase. [[8]](#pm-ref-8)

Supporting evidence: [PM2-F2](#pm2-f2). The existing meal-composition regulatory input remains distinct from an additional preparation or supplementation protocol.

#### Boundaries and functional interpretation

Enriched-protein studies include attention or sleep endpoints, but do not establish ordinary-meal efficacy or direct mediation by LAT1. Positive acute findings and a newer null sleep/performance trial remain separate from the plasma proposition. [[9]](#pm-ref-9) [[10]](#pm-ref-10) See [PM2-F3](#pm2-f3) and the audit. Pool provision belongs upstream in PM1; neurotransmitter synthesis and signalling remain downstream mechanisms.

</div>
</div>
</div>

`+body.slice(findingsStart);
const start=body.indexOf('### 4.1 Scientific Findings'),end=body.indexOf('## 5.',start);
let block=expectedFindingsSection(data,body).block;
for(const id of ['PM2-F1','PM2-F2']){
 const marker=`<ScientificFinding finding={{"id":"${id}"`;
 const pos=block.indexOf(marker),last=block.indexOf(' />',pos);
 if(pos<0||last<0)throw Error('Missing generated Finding '+id);
 const n=id.split('-F')[1];
 block=block.slice(0,last+3)+`\n\n{/* scientific-lesson:${id}:start */}\n<p><a href="#pm2-mechanism-f${n}">Mechanistic explanation: ${data.scientific_findings.find(f=>f.id===id).finding_label}</a></p>\n{/* scientific-lesson:${id}:end */}`+block.slice(last+3);
}
body=body.slice(0,start)+block+'\n\n'+body.slice(end);
// Keep the phenome Finding at its existing location; refresh its canonical projection.
body=body.replace(/<ScientificFinding finding=\{\{"id":"PM2-F3"[^\n]* \/>/,`<ScientificFinding finding={${JSON.stringify(f3)}} pmId={"${data.pm_id}"} />`);
body=body.replace(/Protein-forward meals can raise the plasma tyrosine ratio relative to competing LNAAs[^\n]*/, 'The tested meals changed competitive plasma ratios; the recovered breakfast study did not show a tyrosine-ratio rise after protein. [[2]](#pm-ref-2) The Motivation / Drive relationship remains a translational mapping, not a demonstrated meal benefit.');
const phenomeStart=body.indexOf('## 7. Phenome Connections'),referencesStart=body.indexOf('## 8. References',phenomeStart);
if(phenomeStart<0||referencesStart<0)throw Error('Unexpected phenome section layout');
body=body.slice(0,phenomeStart)+renderPmPhenomeSectionBody(data.phenome_relationships,{sectionNum:7,findingData:data})+'\n\n'+body.slice(referencesStart);
body+='\n\n### Additional PM-local source records\n\n'+extra.map(([label,key],i)=>`- <span id="pm-ref-${i+7}">[${i+7}]</span> [${label}](#${key})`).join('\n')+'\n\n';
for(const [key,label,source] of [
 ['pm2-source-evening1982','Ashley et al. (1982), plasma amino-acid responses to evening meals; DOI 10.1093/ajcn/36.1.143',url.evening],
 ['pm2-source-protein2013','Fernstrom et al. (2013), protein-source experiment; DOI 10.1016/j.clnu.2012.11.027',url.protein],
 ['pm2-source-alertness2005','Markus et al. (2005), enriched protein and morning attention; DOI 10.1093/ajcn/81.5.1026',url.alertness],
 ['pm2-source-null2025','Pre-sleep alpha-lactalbumin null trial (2025); DOI 10.3390/nu17071196',url.nullSleep],
 ])body+=`<span id="${key}" />\n\n${label}. Accessed 2026-10-19. [Original source](${source}).\n\n`;
body+=`### Curated biochemical references

- <span id="pm2-curated-c1">[C1]</span> UniProtKB, Amino acid transporter heavy chain SLC3A2, human, reviewed accession P08195; accessed 2026-10-19. [Authoritative record](https://www.uniprot.org/entry/P08195). [Return to PM2-F1](#pm2-f1).
- <span id="pm2-curated-c2">[C2]</span> EMDB, human LAT1-4F2hc complex, EMD-9721, fitted model 6IRS; map released 2019-03-27, record last modified 2025-07-02; accessed 2026-10-19. [Authoritative record](https://www.ebi.ac.uk/emdb/EMD-9721). Structural identity, not evidence of meal efficacy. [Return to PM2-F1](#pm2-f1).

## Scientific Lesson

A ratio can differ between two meals even when neither raises it above its own baseline. Blood precursor ratios, net brain transport and neurotransmitter production are distinct measurements. Do not turn an acute plasma contrast into a nutrient dose or clinical recommendation. [PM2-F2](#pm2-f2).
`;
body="import ScientificFinding from '@site/src/components/ScientificFinding';\n\n"+body.trim()+'\n';
fs.writeFileSync(dir+'/baseline-registry.json',JSON.stringify(previous,null,2)+'\n');
fs.writeFileSync(dir+'/manifest.json',JSON.stringify({canonical:file,preserved,protectedFiles:hashes,baselineSha256:createHash('sha256').update(baseline).digest('hex')},null,2)+'\n');
fs.writeFileSync(registryFile,JSON.stringify(registry,null,2)+'\n');
fs.writeFileSync(file,matter.stringify(body,data,{lineWidth:9999}).trimEnd()+'\n');
console.log('Projected only PM2 and appended four versioned assessment records; protected evidence fields unchanged.');
