#!/usr/bin/env node
// One-time, reviewed transformation: PM8 urolithin A reassessment (owner instruction, 12 November 2026).
// Refuses to run twice. Front matter is re-serialised at lineWidth 110, which reproduces the existing file exactly.
import fs from 'node:fs';
import matter from 'gray-matter';
import {expectedFindingsSection, FINDINGS_SUBSECTION_HEADING} from '../../scripts/lib/scientific-findings-gate.mjs';
import {renderScientificHypotheses} from '../../scripts/lib/scientific-hypotheses.mjs';
import {renderNumberedPmReferencesSection, replacePmReferencesSection} from '../../scripts/lib/pm-reference-index.mjs';
import {secAssessmentHash} from '../../scripts/lib/sec-assessments.mjs';

const FILE = 'docs/biological-targets/brs6/fm4/brs6-fm4-pm8-metabolic-inflammation-and-adipose-stress-signalling.mdx';
const REGISTRY = 'system/sec-assessments/registry.json';
const DATE = '2026-11-12';
const APPROVAL = 'Owner instruction, 12 November 2026: reassess urolithin A for Decision 1 (Zelicha 2022 VAT association and animal evidence), add a urolithin A dietary lever with walnuts (as studied) and pomegranate (ontology) stating the animal-data limitation, add a Scientific Hypothesis, and research and score as appropriate.';
const PM8_HREF = '/docs/biological-targets/brs6/fm4/brs6-fm4-pm8-metabolic-inflammation-and-adipose-stress-signalling';
const PM6_HREF = '/docs/biological-targets/brs5/fm2/brs5-fm2-pm6-polyphenol-biotransformation-and-mitochondrial-relevant-metabolite-generation';
const BIB = key => `/docs/papers/BRAIN-Diet-References#${key}`;

const raw = fs.readFileSync(FILE, 'utf8');
const pm = matter(raw);
const d = pm.data;
if (d.scientific_findings.some(f => f.id === 'PM8-F22')) throw new Error('Already applied');
if (matter.stringify(pm.content, d, {lineWidth: 110}) !== raw) throw new Error('Round-trip is not exact; refusing to rewrite');

// References -------------------------------------------------------------------------------------------
const NEW_REFS = [
  ['toney_urolithin_2019', 'Toney et al. (2019) — Urolithin A, a Gut Metabolite, Improves Insulin Sensitivity Through Augmentation of Mitochondrial Function and Biogenesis'],
  ['xia_urolithin_thermogenesis_2020', 'Xia et al. (2020) — Urolithin A exerts antiobesity effects through enhancing adipose tissue thermogenesis in mice'],
  ['abdulrahman_urolithins_obesity_2020', 'Abdulrahman et al. (2020) — Urolithins Attenuate Multiple Symptoms of Obesity in Rats Fed on a High-Fat Diet'],
  ['kang_urolithins_adipocytes_2016', 'Kang et al. (2016) — Urolithin A, C, and D, but not iso-urolithin A and urolithin B, attenuate triglyceride accumulation in human cultures of adipocytes and hepatocytes'],
  ['mora_cubillos_nut_metabolomics_2015', 'Mora-Cubillos et al. (2015) — Plasma metabolomic biomarkers of mixed nuts exposure inversely correlate with severity of metabolic syndrome'],
  ['singh_urolithin_atlas_2022', 'Singh et al. (2022) — Urolithin A improves muscle strength, exercise performance, and biomarkers of mitochondrial health in a randomized trial in middle-aged adults'],
];
for (const [key, label] of NEW_REFS) {
  if (d.references.some(r => r.includes('#' + key + ')'))) throw new Error('Reference already present: ' + key);
  d.references.push(`[${label}](${BIB(key)})`);
}
const refNumber = key => d.references.findIndex(r => r.includes('#' + key + ')')) + 1;
const cite = key => `[[${refNumber(key)}]](#pm-ref-${refNumber(key)})`;
const canonical = (key, authorYear) => ({author_year: authorYear, number: refNumber(key), anchor: `#pm-ref-${refNumber(key)}`});

// Evidence records -------------------------------------------------------------------------------------
function evidence({label, key, doi, cls, level, exposure, finding, summary, limitations, scope}) {
  const url = `https://doi.org/${doi}`;
  return {
    label, citation_key: key, doi, href: BIB(key), canonical_reference: canonical(key, label),
    publication_class: cls, data_level: level, evidence_source: 'bounded-external-search',
    study_exposure: exposure, study_finding: finding, directional_finding: finding,
    assessment: {study: exposure, population: exposure, result: finding, effect_magnitude: finding,
      evidence_summary: summary, limitations, retrieval_scope: scope, source_url: url},
  };
}
const EV = {
  toney: evidence({label: 'Toney et al. (2019)', key: 'toney_urolithin_2019', doi: '10.1002/oby.22404', cls: 'primary', level: 'Animal Data',
    exposure: 'Male C57BL/6 mice on a 45% high-fat diet given daily intraperitoneal urolithin A (20 µg per mouse) or vehicle for 12 weeks; n=8 per group.',
    finding: 'Plasma adiponectin was higher with urolithin A (reported 12.9 ± 0.87 versus 18.1 ± 1.27 µg/dL; p=0.0073), adipose Adipoq expression increased and adipocyte hypertrophy and macrophage markers fell. Body weight did not differ.',
    summary: 'Direct urolithin A exposure changed a circulating adipose-derived hormone and its adipose transcript in a rodent obesity model.',
    limitations: 'Intraperitoneal dosing bypasses gut production and absorption. Male mice only, small groups, single laboratory; adiponectin secretion rate and human relevance were not tested.',
    scope: 'Primary full text (Wiley Online Library) recovered; Methods, Table 1 and Figure 3 results reviewed on 12 November 2026.'}),
  xia: evidence({label: 'Xia et al. (2020)', key: 'xia_urolithin_thermogenesis_2020', doi: '10.1371/journal.pbio.3000688', cls: 'primary', level: 'Animal Data',
    exposure: 'Male C57BL/6 mice on a high-fat diet given oral urolithin A 30 mg/kg/day for 10 weeks; chow, ob/ob, thermoneutral and propylthiouracil (PTU) with T4-replacement arms; n=6 per group.',
    finding: 'Body weight fell 23.5% and fat mass 61.3% without a change in food intake. Circulating T3/T4 were unchanged, but tissue T3 rose in brown (1.76-fold) and inguinal white fat (1.56-fold), with higher Dio2 expression and D2 activity. PTU abolished the effects and T4 restored them. No effect on chow.',
    summary: 'Supports local adipose thyroid-hormone activation as a mechanism for urolithin A effects in mice, with a causal ablation-and-rescue design.',
    limitations: 'Pharmacological oral dose far above food-derived exposure; male mice; rodent brown-fat thermogenesis may not translate to humans. Adipokines other than thyroid-hormone activation were not the primary endpoint.',
    scope: 'Primary full text (PMC7141696) recovered; Methods, Results and figure legends reviewed on 12 November 2026.'}),
  abdulrahman: evidence({label: 'Abdulrahman et al. (2020)', key: 'abdulrahman_urolithins_obesity_2020', doi: '10.2147/DMSO.S268146', cls: 'primary', level: 'Animal Data',
    exposure: 'Male Wistar rats with 10 weeks of high-fat feeding, then intraperitoneal urolithin A or B 2.5 mg/kg four times weekly for 4 weeks; n=6 per group.',
    finding: 'Urolithin A reduced body weight and visceral fat mass, increased faecal fat, raised hepatic PPARα and lowered LXRα and SREBP1c expression.',
    summary: 'Independent rodent support for reduced visceral adiposity after urolithin exposure; does not measure the adipose endocrine signal.',
    limitations: 'Intraperitoneal dosing; small groups; visceral fat mass is not an adipokine or local glucocorticoid endpoint.',
    scope: 'Primary article recovered from the publisher (Dove Medical Press); Methods and Results reviewed on 12 November 2026.'}),
  kang: evidence({label: 'Kang et al. (2016)', key: 'kang_urolithins_adipocytes_2016', doi: '10.1002/mnfr.201500796', cls: 'primary', level: 'Cellular / Molecular',
    exposure: 'Primary human adipocyte and hepatocyte cultures exposed to 30 µM urolithins A, B, C, D or iso-urolithin A.',
    finding: 'Urolithins A, C and D reduced triglyceride accumulation, increased fatty-acid oxidation and increased AMPK phosphorylation; urolithin B and iso-urolithin A had no effect.',
    summary: 'Shows that the human adipocyte responds directly to urolithin A, supporting cross-species plausibility of an adipose-cell action.',
    limitations: 'Culture concentration exceeds reported circulating food-derived concentrations; lipid accumulation is not an endocrine output.',
    scope: 'Primary abstract and bibliographic metadata reviewed; full text not recovered.'}),
  zelicha: evidence({label: 'Zelicha et al. (2022)', key: 'zelicha_effect_2022', doi: '10.1186/s12916-022-02525-8', cls: 'primary', level: 'Human Study',
    exposure: 'DIRECT-PLUS 18-month randomised trial (n=294; 88% men) of healthy dietary guidance, Mediterranean or green-Mediterranean diets; both Mediterranean arms received 28 g/day walnuts, and the green arm also green tea and Mankai. Exploratory urine polyphenol analysis.',
    finding: 'A larger rise in urinary urolithin A correlated with greater VAT loss (r=−0.241, p<0.001, q=0.00036 across 139 metabolites), remaining significant after adjustment for waist-circumference change. The rise correlated with walnut (r=0.14, p=0.035) and Mankai (r=0.24, p=0.044) intake.',
    summary: 'Human association between microbially produced urolithin A and visceral-fat loss under a walnut-containing diet; urolithin A was the only urinary polyphenol surviving correction.',
    limitations: 'Exploratory, observational analysis within the trial; urolithin A was not randomised. Weight loss and other green-Mediterranean components may confound the association, and no adipose hormone endpoint was analysed against urolithin A.',
    scope: 'Primary full text (PMC9523931) recovered; Methods, Results, Figure 3 and Discussion reviewed on 12 November 2026.'}),
  mora: evidence({label: 'Mora-Cubillos et al. (2015)', key: 'mora_cubillos_nut_metabolomics_2015', doi: '10.1002/mnfr.201500549', cls: 'primary', level: 'Human Study',
    exposure: 'Adults with metabolic syndrome given 30 g/day mixed nuts for 12 weeks; untargeted plasma metabolomics.',
    finding: 'Plasma urolithin A glucuronide, a marker of nut exposure, correlated inversely with baseline waist circumference (r=−0.550) and waist-to-hip ratio (r=−0.409).',
    summary: 'Directional support for an inverse relation between urolithin exposure and central adiposity in a different population and design.',
    limitations: 'Small, cross-sectional correlation; waist measures are not VAT or an endocrine endpoint; no causal inference.',
    scope: 'Primary abstract and bibliographic metadata reviewed; full text not recovered.'}),
  atlas: evidence({label: 'Singh et al. (2022)', key: 'singh_urolithin_atlas_2022', doi: '10.1016/j.xcrm.2022.100633', cls: 'primary', level: 'Human Study',
    exposure: 'Randomised, double-blind, placebo-controlled trial in 88 overweight middle-aged adults given placebo or 500 or 1,000 mg/day urolithin A for 4 months.',
    finding: 'DXA total fat mass did not change between groups (mean change +0.4% placebo, +0.9% at 500 mg, −1.2% at 1,000 mg). Muscle strength and some mitochondrial and inflammatory biomarkers improved.',
    summary: 'The only retrieved human supplementation trial reporting fat mass found no change; it limits extrapolation of rodent fat-mass effects.',
    limitations: 'Fat mass was a secondary body-composition outcome; the trial was not designed or powered for adiposity, did not measure VAT, and no adipokine outcome was among the results reviewed.',
    scope: 'Primary full text (PMC9133463) recovered; Results, DXA methods and Table S1 body-composition row reviewed on 12 November 2026.'}),
};

// Findings ---------------------------------------------------------------------------------------------
const finding = (id, label, statement, interpretation, limitations, evidence) => ({
  id, finding_label: label, presentation: 'mechanistic-basis', fm_rollup: false,
  finding_summary: statement, finding_statement: statement,
  finding_interpretation: interpretation, synthesis: interpretation, synthesis_limitations: limitations,
  synthesised_evidence_confidence: 'not-yet-scored', evidence_considered: evidence,
});
const F22 = finding('PM8-F22', 'Administered urolithin A engages adipose endocrine signalling in rodent obesity models',
  'In high-fat-fed rodents, administered urolithin A raised circulating adiponectin and increased local adipose thyroid-hormone activation, and blocking thyroid-hormone synthesis abolished its fat-mass effect.',
  'Two independent mouse experiments measured PM8-relevant endocrine endpoints: circulating adiponectin with its adipose transcript, and tissue T3 activation through DIO2 with an ablation-and-rescue test. Rat visceral-fat and human adipocyte findings are consistent with a direct adipose action.',
  'All endocrine evidence is preclinical and uses administered urolithin A (intraperitoneal or high-dose oral), bypassing microbial production. Male rodents, small groups and rodent thermogenesis limit translation; human adipose endocrine engagement has not been measured.',
  [EV.xia, EV.toney, EV.abdulrahman, EV.kang]);
const F23 = finding('PM8-F23', 'Human urolithin A production tracks visceral-fat loss and walnut intake',
  'In the DIRECT-PLUS trial, a larger rise in urinary urolithin A was associated with greater visceral-fat loss and with walnut and Mankai intake.',
  'Urolithin A was the only urinary polyphenol that survived multiple-comparison correction, and the association persisted after adjustment for waist change. A separate nut trial found plasma urolithin A glucuronide inversely related to waist measures.',
  'Exploratory association; urolithin A was not randomised and may mark ellagitannin intake, producer microbiota or overall adherence. Weight loss and other diet components may confound it, and no adipose hormone was analysed against urolithin A.',
  [EV.zelicha, EV.mora]);
const F24 = finding('PM8-F24', 'Four months of urolithin A supplementation did not change fat mass in middle-aged adults',
  'In overweight middle-aged adults, four months of 500 or 1,000 mg/day urolithin A did not change DXA total fat mass compared with placebo.',
  'This is the only retrieved human supplementation trial reporting fat mass. It constrains extrapolation from rodent fat-mass effects; it does not test circulating adiponectin, local thyroid-hormone activation or visceral fat.',
  'Secondary body-composition outcome in a trial not designed for adiposity; no VAT measurement; precision of the fat-mass contrast was not retrieved. Not evidence that urolithin A has no adipose endocrine effect.',
  [EV.atlas]);

// SEC (Codex-provisional; findings keep synthesised_evidence_confidence: not-yet-scored) -------------------
const method = {name: 'SEC calibration rubric proposal', version: null, source: 'system/reviews/sec-calibration/SEC-calibration-rubric-proposal.html'};
const process_ = 'Codex exact-proposition SEC appraisal of the PM8 urolithin A Findings after the owner-directed 12 November 2026 reassessment; primary full texts recovered for Toney 2019, Xia 2020, Abdulrahman 2020, Zelicha 2022 and Singh 2022; abstract only for Kang 2016 and Mora-Cubillos 2015.';
const secRecord = (f, factors, rationale, extra) => {
  const states = Object.fromEntries(Object.entries(factors).map(([k, v]) => [k, v === null ? 'unresolved' : 'established']));
  const complete = Object.values(factors).every(v => v !== null);
  const raw = complete ? Object.values(factors).reduce((a, b) => a + b, 0) : null;
  return {
    id: `brs6-pm8-${f.id.toLowerCase()}-urolithin-assessment`, recordVersion: 1, pmId: d.pm_id, findingId: f.id,
    assessmentStatus: complete ? 'codex-provisional' : 'not-scored', humanReview: null,
    recordedOn: DATE, lastEvidenceAssessmentDate: DATE, reviewer: null, process: process_, methodology: method,
    proposition: f.finding_statement, canonicalProposition: f.finding_statement,
    factors, factorStates: states, rawScore: raw, adjustedScore: raw, conditional: null, rationale,
    ...extra,
    history: [{version: 1, date: DATE, decision: complete ? `Initial provisional exact-proposition assessment ${raw}/8; canonical statement unchanged.` : 'Initial assessment recorded with an unresolved factor; no numerical total forced.'}],
    assessmentComplete: complete,
  };
};
const SEC = [
  secRecord(F22, {D: 2, B: 1, P: 1, R: 0}, {
    D: 'The proposition is explicitly scoped to rodents and to the measured endpoints: circulating adiponectin (Toney) and adipose tissue T3/DIO2 activation with PTU ablation and T4 rescue (Xia). No human or food-derived claim is made.',
    B: 'Vehicle-controlled designs; Xia adds a mechanistic ablation-and-rescue test and a thermoneutral arm. Residual risks: n=6–8 per group, male-only, randomisation and blinding not described, single laboratory per endpoint. No critical flaw that would explain the effects warrants B0.',
    P: 'Toney adiponectin contrast p=0.0073 with reported SEM; Xia reports large fold changes in small groups. Directions are clear, but small samples leave effect sizes imprecise.',
    R: 'Each endocrine component rests on one experiment (adiponectin: Toney; T3/DIO2: Xia). Rat visceral-fat and human adipocyte lipid studies address different endpoints and are not counted as replication.'},
    {limitations: ['Administered metabolite bypasses microbial production; doses are not food-equivalent.', 'Assessment is provisional and not qualified-human reviewed; SEC does not alter admissions or establish human efficacy.'],
     sources: {supporting: ['toney_urolithin_2019', 'xia_urolithin_thermogenesis_2020'], contextual: ['abdulrahman_urolithins_obesity_2020', 'kang_urolithins_adipocytes_2016'], contradictory: [],
       contradictoryAssessment: 'Some 3T3-L1 studies report lower adiponectin expression with urolithins; cell-line direction differs from the in vivo circulating result and is not scored against this rodent proposition.',
       targetedChecks: [
         {doi: '10.1002/oby.22404', role: 'load-bearing primary', access: 'Wiley full text, Methods and Table 1 (retrieved 2026-11-12).', assessment: 'n=8/group; daily i.p. 20 µg; adiponectin 12.9 ± 0.87 vs 18.1 ± 1.27 µg/dL, p=0.0073; Adipoq up; body weight unchanged.'},
         {doi: '10.1371/journal.pbio.3000688', role: 'load-bearing primary', access: 'PMC7141696 full text (retrieved 2026-11-12).', assessment: 'n=6/group; 30 mg/kg/day oral; tissue T3 up in BAT and iWAT with unchanged serum T3/T4; Dio2 and D2 activity up; PTU abolished and T4 restored effects.'}],
       retrievalLimited: [{url: 'https://doi.org/10.1002/mnfr.201500796', limitation: 'Kang 2016 full text not recovered; contextual human-adipocyte result taken from the primary abstract only.'}]},
     capRationale: 'D2, B1, P1, R0: raw and adjusted 4/8; no D1/B0/P0 cap applies.'}),
  secRecord(F23, {D: 2, B: 1, P: 1, R: 0}, {
    D: 'The proposition is the measured association itself: change in urinary urolithin A against MRI-measured VAT change, and against recorded walnut and Mankai intake, within DIRECT-PLUS.',
    B: 'Randomised parent trial with MRI VAT and FDR control across 139 metabolites; the association persisted after waist adjustment. However, urolithin A was not randomised, the analysis was exploratory, and confounding by adherence or weight loss cannot be excluded.',
    P: 'VAT correlation r=−0.241 (q=0.00036) excludes zero but explains little variance; the walnut (p=0.035) and Mankai (p=0.044) correlations are marginal.',
    R: 'Mora-Cubillos 2015 is directionally consistent but measures waist, cross-sectionally, in a different design; it is not exact-proposition replication of the VAT association.'},
    {limitations: ['Association only; not evidence that urolithin A mediates VAT loss or adipose endocrine change.', 'Assessment is provisional and not qualified-human reviewed.'],
     sources: {supporting: ['zelicha_effect_2022'], contextual: ['mora_cubillos_nut_metabolomics_2015'], contradictory: [],
       contradictoryAssessment: 'No retrieved human study reports an opposite urolithin–VAT association. The ATLAS null fat-mass result tests supplementation, a different proposition (PM8-F24).',
       targetedChecks: [{doi: '10.1186/s12916-022-02525-8', role: 'load-bearing primary', access: 'PMC9523931 full text (retrieved 2026-11-12).', assessment: 'Exploratory urine polyphenols; urolithin A the only metabolite significant after Benjamini–Hochberg correction; r=−0.241 with VAT change; walnut r=0.14, Mankai r=0.24.'}],
       retrievalLimited: [{url: 'https://doi.org/10.1002/mnfr.201500549', limitation: 'Mora-Cubillos 2015 full text not recovered; waist correlations taken from the primary abstract only.'}]},
     capRationale: 'D2, B1, P1, R0: raw and adjusted 4/8; no D1/B0/P0 cap applies.'}),
  secRecord(F24, {D: 2, B: 1, P: null, R: 0}, {
    D: 'The randomised trial directly tests the stated proposition: four-month supplementation against placebo with DXA total fat mass.',
    B: 'Randomised, double-blind and placebo-controlled; fat mass was a secondary body-composition outcome and the trial was not designed for adiposity, so selective-outcome and power concerns remain.',
    P: 'Unresolved — group mean changes were retrieved, but no interval or variance for the fat-mass contrast; a null claim cannot be judged precise without them, and missing precision is not P0.',
    R: 'One trial; no independent human supplementation trial reporting fat mass was retrieved.'},
    {limitations: ['No numerical SEC total forced while precision is unresolved.', 'Does not test adipokines, local thyroid-hormone activation or VAT.'],
     sources: {supporting: ['singh_urolithin_atlas_2022'], contextual: [], contradictory: [],
       contradictoryAssessment: 'Rodent fat-mass reductions (Xia, Abdulrahman) concern administered doses in a different species and are not human contradictory evidence for this proposition.',
       targetedChecks: [{doi: '10.1016/j.xcrm.2022.100633', role: 'load-bearing primary', access: 'PMC9133463 full text and supplementary body-composition table (retrieved 2026-11-12).', assessment: 'n=88; 500 or 1,000 mg/day for 4 months; total fat mass change +0.4%, +0.9%, −1.2%; reported as unchanged across groups.'}],
       retrievalLimited: [{url: 'https://doi.org/10.1016/j.xcrm.2022.100633', limitation: 'Supplementary Figure S1 variance or interval data for the fat-mass contrast were not recovered.'}]},
     capRationale: 'P unresolved; no raw or adjusted total calculated.'}),
];
const registry = JSON.parse(fs.readFileSync(REGISTRY, 'utf8'));
for (const [i, f] of [F22, F23, F24].entries()) {
  const record = SEC[i];
  const sha256 = secAssessmentHash(record);
  registry.assessments.push({sha256, record});
  f.sec_assessment_ref = {id: record.id, version: 1, sha256};
}
d.scientific_findings.push(F22, F23, F24);

// Evidence gap -----------------------------------------------------------------------------------------
d.evidence_gaps.push({
  id: 'PM8-EG-7',
  title: 'Urolithin A endocrine engagement is preclinical; human food-derived effects are untested',
  finding_ids: ['PM8-F22', 'PM8-F23', 'PM8-F24'],
  citation_keys: ['toney_urolithin_2019', 'xia_urolithin_thermogenesis_2020', 'zelicha_effect_2022', 'singh_urolithin_atlas_2022'],
  establishes: 'Administered urolithin A raised circulating adiponectin and local adipose T3 activation in rodents. In DIRECT-PLUS, a rise in urinary urolithin A tracked visceral-fat loss and walnut intake.',
  cannot_establish: 'That food-derived urolithin A changes human adipokine output, adipose thyroid-hormone activation or visceral fat, or that it caused the DIRECT-PLUS VAT loss.',
  missing_link: 'No human study has measured an adipose endocrine endpoint against urolithin A exposure; the one supplementation trial reporting fat mass was null and did not measure VAT or adipokines. Producer status varies between people.',
  required_evidence: 'Producer-stratified human trials of ellagitannin foods or urolithin A with VAT imaging and prespecified adiponectin and adipose DIO2/T3 endpoints, with mediation analysis.',
  affected_relationship: 'PM8-DIT-13 (Urolithin A) and PM8-DIT-14 (Ellagitannins) are admitted with an explicit preclinical-evidence limitation; Hypothesis PM8-H1 remains unestablished.',
});

// Dietary atoms ----------------------------------------------------------------------------------------
const OPERATION = d.mission;
d.dietary_input_traceability.push(
  {atom_id: 'PM8-DIT-13', input: 'Urolithin A', input_type: 'regulatory modulator',
    biological_role: 'Microbial metabolite of dietary ellagitannins that raised circulating adiponectin and local adipose thyroid-hormone activation in rodent obesity models.',
    evidence_source: {finding_ids: ['PM8-F22', 'PM8-F23', 'PM8-F24'], citation_keys: ['toney_urolithin_2019', 'xia_urolithin_thermogenesis_2020', 'zelicha_effect_2022', 'singh_urolithin_atlas_2022']},
    evidence_limitation: 'Endocrine engagement is demonstrated in animal studies only, using administered urolithin A. In humans, a rise in urinary urolithin A tracked visceral-fat loss but was not randomised, and four-month supplementation did not change fat mass. Production depends on gut microbiota and varies between people; no food-effective dose or human adipokine effect is established.',
    dietary_input: true,
    dietary_input_note: 'Type B regulatory relationship admitted with a preclinical-evidence limitation on owner instruction (12 November 2026). Dietary delivery is precursor-mediated through ellagitannin-rich foods; supplements are not equated with food.',
    substance_id: 'urolithin-a',
    canonical_identity: {status: 'resolved', substance_id: 'urolithin-a', substance_href: '/docs/substances/microbial-metabolites/secondary-plant-conversions/urolithin-a', checked_sources: ['registry/substances.json'], projection_status: 'resolved'}},
  {atom_id: 'PM8-DIT-14', input: 'Ellagitannins', input_type: 'precursor',
    biological_role: 'Dietary polyphenols hydrolysed to ellagic acid, which producer gut microbiota convert to urolithin A.',
    evidence_source: {finding_ids: ['PM8-F23'], citation_keys: ['zelicha_effect_2022']},
    evidence_limitation: 'Food ellagitannin content is not a urolithin A amount. Conversion depends on hydrolysis and producer microbiota; some people produce little or none. Walnuts were the studied DIRECT-PLUS food; pomegranate is included from the ellagitannin ontology, not from an adipose endocrine trial.',
    dietary_input: true,
    dietary_input_note: 'Derived precursor relationship supporting PM8-DIT-13; no extra-intake benefit, dose or producer-independent effect is implied.',
    substance_id: 'ellagitannins',
    canonical_identity: {status: 'resolved', substance_id: 'ellagitannins', substance_href: '/docs/substances/bioactive-compounds/polyphenols/ellagitannins', checked_sources: ['registry/substances.json'], projection_status: 'resolved'}},
);
d.dietary_lever_atoms.push(
  {atom_id: 'PM8-DIT-13', relationship_layer: 'dietary-requirement', relationship_mode: 'state-regulation', requirement_classification: 'direct', dietary_addressability: 'precursor-mediated', claim_ceiling: 'modulation-demonstrated'},
  {atom_id: 'PM8-DIT-14', relationship_layer: 'dietary-requirement', relationship_mode: 'state-regulation', requirement_classification: 'derived', derived_target: 'Urolithin A', derived_target_atom_id: 'PM8-DIT-13', dietary_addressability: 'precursor-mediated', claim_ceiling: 'dietary-provision'},
);
d.dietary_lever_presentations.push(
  {atom_id: 'PM8-DIT-13', label: 'Urolithin A', presentation_section: '3.1.1',
    reader_description: 'Gut-microbial metabolite that raised adiponectin and local adipose thyroid-hormone activation in animal studies; human evidence is limited to an association with visceral-fat loss.',
    description_finding_id: 'PM8-F22'},
  {atom_id: 'PM8-DIT-14', label: 'Ellagitannins', presentation_section: '3.1.1',
    reader_description: 'Polyphenols in walnuts and pomegranate that some people’s gut microbes convert to urolithin A; conversion varies between people.',
    description_finding_id: 'PM8-F23'},
);
const ELLAGITANNIN_STEPS = [
  {from: 'ellagitannins', to: 'ellagic-acid', process: 'Hydrolysis of ellagitannins releases ellagic acid in the gut lumen.',
    evidence: {statement: 'Ellagitannin-rich pomegranate juice produced variable downstream urolithin A exposure in healthy adults, consistent with hydrolysis to ellagic acid before microbial conversion.', sources: ['https://doi.org/10.1038/s41430-021-00950-1']},
    limitations: 'Hydrolysis extent varies with food matrix and ellagitannin structure; no food-to-ellagic-acid yield is established.'},
  {from: 'ellagic-acid', to: 'urolithin-a', process: 'Gut microbial conversion of ellagic acid through intermediate urolithins to urolithin A.',
    dependencies: ['Urolithin-producing gut microbiota (Gordonibacter and Ellagibacter-related taxa); producer status varies between people'],
    evidence: {statement: 'Human intestinal Gordonibacter species converted ellagic acid to intermediate urolithins; complete urolithin A production depends on the wider community.', sources: ['https://doi.org/10.1039/c4fo00092g']},
    limitations: 'Non-producers form little or no urolithin A; the species studied did not complete conversion alone.'},
];
d.dietary_input_assessments.push(
  {atom_id: 'PM8-DIT-13', status: 'admitted', type: 'B', classification: 'direct', operation: OPERATION, canonical_substance_id: 'urolithin-a',
    mechanism_engagement: {status: 'established',
      statement: 'Established in rodent models only: administered urolithin A raised circulating adiponectin and adipose Adipoq, and increased adipose tissue T3 through DIO2 with thyroid-hormone-dependent fat loss. Human adipose endocrine engagement has not been measured.',
      sources: ['https://doi.org/10.1002/oby.22404', 'https://doi.org/10.1371/journal.pbio.3000688']},
    dietary_exposure: {status: 'established',
      statement: 'Dietary ellagitannin sources raise urolithin A in producers: urinary urolithin A rose with walnut intake in DIRECT-PLUS, plasma urolithin A glucuronide marked mixed-nut exposure, and pomegranate juice produced variable urolithin A exposure.',
      sources: ['https://doi.org/10.1186/s12916-022-02525-8', 'https://doi.org/10.1002/mnfr.201500549', 'https://doi.org/10.1038/s41430-021-00950-1']},
    food_target_research: {completed: true,
      sources_examined: ['registry/substances.json', 'docs/substances/microbial-metabolites/secondary-plant-conversions/urolithin-a.md', 'src/data/relatedSubstanceRelationships.mjs', 'docs/foods/walnuts.md', 'docs/foods/pomegranates.md'],
      targeted_searches: [{date: DATE, query: 'Urolithin A food sources; ellagitannin and ellagic acid composition of walnuts and pomegranate', outcome: 'Urolithin A is not present in foods; it is formed from ellagitannins and ellagic acid. Foods are projected through PM8-DIT-14 and the related-substance catalogue, never as urolithin A containment.'}]},
    reviewed_on: DATE,
    scope: 'Adipose endocrine signal modulation demonstrated preclinically; not a human efficacy, dose or VAT-reduction claim.',
    approval_source: APPROVAL},
  {atom_id: 'PM8-DIT-14', status: 'admitted', type: 'B', classification: 'derived', operation: OPERATION, canonical_substance_id: 'ellagitannins',
    active_target_id: 'urolithin-a', conversion_pathway: ELLAGITANNIN_STEPS,
    mechanism_engagement: {status: 'established',
      statement: 'Engagement is through the derived target, urolithin A, and is established in rodent models only (see PM8-DIT-13).',
      sources: ['https://doi.org/10.1002/oby.22404', 'https://doi.org/10.1371/journal.pbio.3000688']},
    dietary_exposure: {status: 'established',
      statement: 'Walnut intake (28 g/day in DIRECT-PLUS) correlated with a rise in urinary urolithin A; pomegranate ellagitannins produced variable urolithin A exposure.',
      sources: ['https://doi.org/10.1186/s12916-022-02525-8', 'https://doi.org/10.1038/s41430-021-00950-1']},
    food_target_research: {completed: true,
      sources_examined: ['registry/substances.json', 'docs/substances/bioactive-compounds/polyphenols/ellagitannins.md', 'docs/foods/walnuts.md', 'docs/foods/pomegranates.md', 'src/data/relatedSubstanceRelationships.mjs'],
      targeted_searches: [{date: DATE, query: 'Walnut kernel and pomegranate ellagitannin composition', outcome: 'Walnut ellagitannins recorded as present without an established quantity (Regueiro et al. 2014); pomegranate ellagitannins and ellagic acid retained from Gil et al. 2000. No quantity is converted into a urolithin A amount.'}]},
    reviewed_on: DATE,
    scope: 'Precursor provision for urolithin A in producers; not a producer-independent or dose claim.',
    approval_source: APPROVAL},
);

// Adjudications ----------------------------------------------------------------------------------------
const endo1 = d.intervention_adjudications.find(a => a.id === 'PM8-ADJ-ENDO-1');
const previousReason = endo1.reason;
endo1.reason = `${previousReason} Component reassessment (12 November 2026): the walnut ellagitannin–urolithin A route is separated and admitted with a preclinical limitation in PM8-ADJ-UROA-1; the combined pattern remains not admitted as an endocrine intervention.`;
endo1.finding_ids = [...endo1.finding_ids, 'PM8-F23'];
endo1.evidence_source = {finding_ids: ['PM8-F23'], citation_keys: ['zelicha_effect_2022']};
endo1.food_evidence = [
  {food_id: 'walnuts', food_href: '/docs/foods/walnuts', exposure: '28 g/day in both DIRECT-PLUS Mediterranean arms',
    finding: 'A rise in urinary urolithin A correlated with walnut intake (r=0.14, p=0.035) and with VAT loss (r=−0.241, q=0.00036).', citation_key: 'zelicha_effect_2022',
    disposition: 'Food route admitted through PM8-DIT-14 (Ellagitannins) → PM8-DIT-13 (Urolithin A).'},
];
endo1.related_decision_ids = ['PM8-ADJ-UROA-1'];
endo1.reviewed_on = DATE;
endo1.history.push({version: 2, date: DATE, previous_reason: previousReason,
  decision: 'Owner-directed reassessment. Urolithin A was assessed as a separate component: admitted as a Type B dietary lever with an explicit animal-data limitation (PM8-ADJ-UROA-1), with walnuts and pomegranate as ellagitannin food sources. The combined green-Mediterranean, green-tea and Mankai pattern stays not admitted as an endocrine intervention.',
  approval_source: APPROVAL});

const sourceAssessment = (e, authors, title, year, findingId, decision, access) => ({
  citation_key: e.citation_key, doi: e.doi, title, year, authors, label: e.label, publication_class: e.publication_class,
  exposure: e.study_exposure, endpoint: null, result: e.study_finding, limitations: e.assessment.limitations,
  decision, access, finding_id: findingId, source_url: e.assessment.source_url, verified_on: DATE, reference_number: refNumber(e.citation_key),
});
const SA = [
  {...sourceAssessment(EV.xia, ['Xia B', 'Shi XC', 'Xie BC', 'Zhu MQ', 'Chen Y', 'Chu XY', 'Cai GH', 'Liu M', 'Yang SZ', 'Mitchell GA', 'Pang WJ', 'Wu JW'], 'Urolithin A exerts antiobesity effects through enhancing adipose tissue thermogenesis in mice.', '2020', 'PM8-F22', 'Load-bearing preclinical mechanism evidence for local adipose thyroid-hormone activation.', EV.xia.assessment.retrieval_scope), endpoint: 'Adipose tissue T3, Dio2 expression and D2 activity; fat mass; PTU ablation and T4 rescue.'},
  {...sourceAssessment(EV.toney, ['Toney AM', 'Fan R', 'Xian Y', 'Chaidez V', 'Ramer-Tait AE', 'Chung S'], 'Urolithin A, a Gut Metabolite, Improves Insulin Sensitivity Through Augmentation of Mitochondrial Function and Biogenesis.', '2019', 'PM8-F22', 'Load-bearing preclinical evidence for circulating adiponectin modulation.', EV.toney.assessment.retrieval_scope), endpoint: 'Plasma adiponectin; adipose Adipoq; adipocyte size and macrophage markers.'},
  {...sourceAssessment(EV.abdulrahman, ['Abdulrahman AO', 'Kuerban A', 'Alshehri ZA', 'Abdulaal WH', 'Khan JA', 'Khan MI'], 'Urolithins Attenuate Multiple Symptoms of Obesity in Rats Fed on a High-Fat Diet.', '2020', 'PM8-F22', 'Contextual rodent visceral-fat support; no endocrine endpoint.', EV.abdulrahman.assessment.retrieval_scope), endpoint: 'Body weight, visceral fat mass, lipid-metabolism gene expression.'},
  {...sourceAssessment(EV.kang, ['Kang I', 'Kim Y', 'Tomás-Barberán FA', 'Espín JC', 'Chung S'], 'Urolithin A, C, and D, but not iso-urolithin A and urolithin B, attenuate triglyceride accumulation in human cultures of adipocytes and hepatocytes.', '2016', 'PM8-F22', 'Contextual human-cell plausibility; not an endocrine output.', EV.kang.assessment.retrieval_scope), endpoint: 'Adipocyte triglyceride accumulation, fatty-acid oxidation, AMPK phosphorylation.'},
  {...sourceAssessment(EV.zelicha, ['Zelicha H', 'Kloting N', 'Kaplan A', 'Yaskolka Meir A', 'Rinott E', 'Tsaban G', 'et al.', 'Shai I'], 'The effect of high-polyphenol Mediterranean diet on visceral adiposity: the DIRECT PLUS randomized controlled trial.', '2022', 'PM8-F23', 'Human association and studied walnut food exposure; the source of the Decision 1 food evidence.', EV.zelicha.assessment.retrieval_scope), endpoint: 'MRI VAT change against change in urinary urolithin A and recorded food intake.'},
  {...sourceAssessment(EV.mora, ['Mora-Cubillos X', 'Tulipani S', 'Garcia-Aloy M', 'Bulló M', 'Tinahones FJ', 'Andres-Lacueva C'], 'Plasma metabolomic biomarkers of mixed nuts exposure inversely correlate with severity of metabolic syndrome.', '2015', 'PM8-F23', 'Contextual directional support; different endpoint and design.', EV.mora.assessment.retrieval_scope), endpoint: 'Plasma urolithin A glucuronide against waist circumference and waist-to-hip ratio.'},
  {...sourceAssessment(EV.atlas, ['Singh A', 'D’Amico D', 'Andreux PA', 'Fouassier AM', 'Blanco-Bose W', 'Evans M', 'Aebischer P', 'Auwerx J', 'Rinsch C'], 'Urolithin A improves muscle strength, exercise performance, and biomarkers of mitochondrial health in a randomized trial in middle-aged adults.', '2022', 'PM8-F24', 'Retained null human fat-mass evidence; limits but does not negate the preclinical endocrine admission.', EV.atlas.assessment.retrieval_scope), endpoint: 'DXA total fat mass (secondary outcome).'},
];
d.intervention_adjudications.push({
  id: 'PM8-ADJ-UROA-1',
  title: 'Urolithin A from ellagitannin-rich foods (walnuts, pomegranate)',
  status: 'admitted',
  question: 'Does urolithin A, formed from dietary ellagitannins, engage the PM8 adipose endocrine operation at its claimed exposure and evidential level?',
  section: '3.1.1',
  relationship_assessment: {
    type_a: 'Not a biochemical Capacity input.',
    type_b: 'Admitted with limitation: administered urolithin A modulated circulating adiponectin and local adipose thyroid-hormone activation in rodent models; no human adipose endocrine endpoint.',
    delivery: 'Urolithin A is the direct engaging substance (PM8-DIT-13); dietary delivery is precursor-mediated through ellagitannins (PM8-DIT-14) and depends on producer gut microbiota.',
  },
  reason: 'Two independent mouse experiments measured PM8-relevant endocrine endpoints (circulating adiponectin; adipose T3/DIO2 with ablation and rescue), human adipocytes respond directly, and in DIRECT-PLUS a rise in urinary urolithin A tracked visceral-fat loss and walnut intake. The animal-only endocrine evidence is a stated limitation, not a reason to withhold the lever. The null four-month ATLAS fat-mass result is retained and limits extrapolation.',
  limitation: 'Animal data: endocrine engagement has been shown only in rodents given urolithin A directly. Human evidence is associative, the one supplementation trial reporting fat mass was null, and producer status varies.',
  resolution_criterion: 'A producer-stratified human trial with VAT imaging and prespecified adiponectin or adipose DIO2/T3 endpoints would strengthen or overturn this bounded admission; consistent human null endocrine results would trigger re-review.',
  finding_ids: ['PM8-F22', 'PM8-F23', 'PM8-F24'],
  evidence_source: {finding_ids: ['PM8-F22', 'PM8-F23', 'PM8-F24'], citation_keys: SA.map(s => s.citation_key)},
  source_assessments: SA,
  food_sources: [
    {food_id: 'walnuts', food_href: '/docs/foods/walnuts', basis: 'Studied food: 28 g/day in DIRECT-PLUS; ellagitannins recorded present (quantity not established).'},
    {food_id: 'pomegranates', food_href: '/docs/foods/pomegranates', basis: 'Ontology: ellagitannin and ellagic acid composition; not tested against an adipose endocrine endpoint.'},
  ],
  admitted_atom_id: 'PM8-DIT-13',
  admitted_atom_ids: ['PM8-DIT-13', 'PM8-DIT-14'],
  related_decision_ids: ['PM8-ADJ-ENDO-1'],
  show_in_gap_summary: false,
  reviewed_on: DATE,
  approval_source: APPROVAL,
  history: [{version: 1, date: DATE, decision: 'Admitted as a Type B dietary lever with an explicit preclinical-evidence limitation; separated from the Decision 1 pattern package.'}],
});

// Scientific hypothesis -------------------------------------------------------------------------------
d.scientific_hypotheses = [{
  id: 'PM8-H1',
  title: 'Ellagitannin-Derived Urolithin A and Adipose Endocrine Regulation',
  proposition: 'Microbial urolithin A formed from dietary ellagitannins may contribute to visceral-fat loss and adipose endocrine change in humans through adiponectin and local thyroid-hormone activation.',
  source_pm: 'BRS5-FM2-PM6',
  target_pm: d.pm_id,
  proposed_direction: `BRS5-FM2-PM6 → ${d.pm_id}`,
  status: 'Unestablished',
  rationale: 'Separate observations motivate testing the joined pathway; they do not establish it. The proposed chain is: (1) ellagitannins from foods such as walnuts and pomegranate are hydrolysed to ellagic acid; (2) producer gut microbiota convert ellagic acid to urolithin A; (3) urolithin A reaches adipose tissue at active concentrations; (4) it raises adiponectin and local T3 activation through DIO2; (5) these endocrine changes contribute to visceral-fat loss. Links 1–2 are supported by conversion studies, link 4 only in rodents, and link 5 only by the DIRECT-PLUS association. The null ATLAS fat-mass result must not be ignored.',
  finding_links: {
    supporting: [
      {pm_id: d.pm_id, finding_id: 'PM8-F22', href: '#pm8-f22', label: 'SF11 — Administered urolithin A engages adipose endocrine signalling in rodent obesity models',
        explanation: 'Supports link 4 (adiponectin and adipose T3/DIO2) in rodents given urolithin A directly; it does not test food-derived exposure or humans.'},
      {pm_id: d.pm_id, finding_id: 'PM8-F23', href: '#pm8-f23', label: 'SF12 — Human urolithin A production tracks visceral-fat loss and walnut intake',
        explanation: 'Supports links 1–2 and 5 associatively: urinary urolithin A rose with walnut intake and tracked VAT loss, but urolithin A was not randomised and no adipokine was analysed against it.'},
    ],
    contradictory_or_null: [
      {pm_id: d.pm_id, finding_id: 'PM8-F24', href: '#pm8-f24', label: 'SF13 — Four months of urolithin A supplementation did not change fat mass in middle-aged adults',
        explanation: 'Direct supplementation did not change DXA fat mass, a null result for the fat-loss end of the chain; VAT and endocrine endpoints were not tested.'},
    ],
    contextual: [
      {pm_id: 'BRS5-FM2-PM6', finding_id: 'PM6-F1', href: `${PM6_HREF}#pm6-f1`, label: 'SF1 — Urolithin conversion is substrate- and community-dependent',
        explanation: 'Conversion depends on the microbial community and not everyone completes it; this explains producer variability rather than testing the endocrine effect.'},
    ],
  },
  evidence_sources: [
    {study_id: 'zelicha-2022-direct-plus', label: 'Zelicha et al. (2022) — DIRECT-PLUS visceral adiposity', url: 'https://doi.org/10.1186/s12916-022-02525-8', role: 'supporting',
      proposition: 'A rise in urinary urolithin A correlated with VAT loss and with walnut and Mankai intake.', limitations: 'Exploratory and observational within the trial; confounding by adherence and weight loss possible.'},
    {study_id: 'xia-2020-thermogenesis', label: 'Xia et al. (2020) — Urolithin A and adipose thermogenesis', url: 'https://doi.org/10.1371/journal.pbio.3000688', role: 'supporting',
      proposition: 'Oral urolithin A raised adipose tissue T3 via DIO2 in mice; PTU abolished and T4 restored the fat-mass effect.', limitations: 'High pharmacological dose in male mice; rodent thermogenesis may not translate.'},
    {study_id: 'toney-2019-adiponectin', label: 'Toney et al. (2019) — Urolithin A and insulin sensitivity', url: 'https://doi.org/10.1002/oby.22404', role: 'supporting',
      proposition: 'Intraperitoneal urolithin A raised plasma adiponectin and adipose Adipoq in high-fat-fed mice.', limitations: 'Injection bypasses gut production; small male-only groups.'},
    {study_id: 'mora-cubillos-2015-nuts', label: 'Mora-Cubillos et al. (2015) — Nut metabolomic biomarkers', url: 'https://doi.org/10.1002/mnfr.201500549', role: 'supporting',
      proposition: 'Plasma urolithin A glucuronide was inversely related to waist measures in adults with metabolic syndrome.', limitations: 'Cross-sectional correlation; waist is not VAT or an endocrine endpoint.'},
    {study_id: 'singh-2022-atlas', label: 'Singh et al. (2022) — ATLAS urolithin A trial', url: 'https://doi.org/10.1016/j.xcrm.2022.100633', role: 'contradictory_or_null',
      proposition: 'Four months of 500 or 1,000 mg/day urolithin A did not change DXA fat mass in overweight middle-aged adults.', limitations: 'Secondary outcome; not powered for adiposity; no VAT or adipokine endpoint reviewed.'},
    {study_id: 'singh-2022-direct-supplementation', label: 'Singh et al. (2022) — Dietary exposure and gut conversion', url: 'https://doi.org/10.1038/s41430-021-00950-1', role: 'contextual',
      proposition: 'Pomegranate juice produced variable urolithin A exposure, whereas direct urolithin A bypassed conversion.', limitations: 'Exposure study; no adipose endpoint.'},
  ],
  limitations: [
    'Endocrine engagement (adiponectin; adipose T3/DIO2) is shown only in rodents given urolithin A directly.',
    'The human VAT association is exploratory and not randomised for urolithin A.',
    'The one human supplementation trial reporting fat mass was null and did not measure VAT or adipokines.',
    'Producer status varies; many people form little urolithin A from food.',
  ],
  alternative_explanations: [
    'Urinary urolithin A may mark ellagitannin intake, overall dietary adherence or a favourable microbiota rather than mediate VAT loss.',
    'Weight loss itself, or other green-Mediterranean components (green tea catechins, Mankai), may explain VAT and adipokine change.',
    'Rodent brown-fat thermogenesis may not operate at comparable scale in human adipose tissue.',
  ],
  required_evidence: [
    'Producer-stratified randomised trials of ellagitannin foods or urolithin A with MRI VAT and prespecified adiponectin endpoints.',
    'Human adipose biopsies measuring DIO2 activity and tissue T3 after urolithin A exposure.',
    'Formal mediation analysis separating urolithin A from weight loss, adherence and other polyphenols.',
  ],
  provenance: [
    'Added on owner instruction (12 November 2026) during the PM8 urolithin A reassessment; the Scientific Hypotheses category is extended from its BRS4-PM9 and BRS5-PM1 records to PM8 for this record only.',
    'Evidence reviewed from primary full texts where recovered; Kang 2016 and Mora-Cubillos 2015 at abstract level.',
    'No SEC, Dietary Confidence or admission is attached to the hypothesis; the admitted lever is recorded separately in PM8-ADJ-UROA-1.',
  ],
  review_date: DATE,
}];

// Body -------------------------------------------------------------------------------------------------
let content = pm.content;
const replaceOnce = (from, to) => {
  const at = content.indexOf(from);
  if (at < 0 || content.indexOf(from, at + 1) >= 0) throw new Error('Anchor not unique: ' + from.slice(0, 80));
  content = content.slice(0, at) + to + content.slice(at + from.length);
};
replaceOnce('<div class="brs-fm-hub-panel" hidden>\n\n- DHA\n\n</div>', '<div class="brs-fm-hub-panel" hidden>\n\n- DHA\n- Urolithin A\n- Ellagitannins\n\n</div>');
replaceOnce('constrain generalisation ([SF9](#pm8-f20), [SF10](#pm8-f21)).\n',
  'constrain generalisation ([SF9](#pm8-f20), [SF10](#pm8-f21)).\n' +
  '- **Urolithin A:** [administered urolithin A engages adipose endocrine signalling in rodents](#pm8-mechanism-f22); in humans, [urolithin A production tracks visceral-fat loss](#pm8-mechanism-f23), but [four months of supplementation did not change fat mass](#pm8-mechanism-f24) ([SF11](#pm8-f22), [SF12](#pm8-f23), [SF13](#pm8-f24)).\n');
const mechanisms = [
  '<span id="pm8-mechanism-f22" />', '',
  '#### SF11 — Administered urolithin A engages adipose endocrine signalling in rodent obesity models', '',
  `In high-fat-fed mice, daily intraperitoneal urolithin A raised plasma adiponectin and adipose adiponectin gene expression and reduced adipocyte hypertrophy without changing body weight ${cite('toney_urolithin_2019')}. Oral urolithin A raised tissue T3, Dio2 expression and D2 activity in brown and inguinal white fat while circulating thyroid hormones were unchanged; blocking thyroid-hormone synthesis abolished the fat-mass effect and T4 replacement restored it ${cite('xia_urolithin_thermogenesis_2020')}. Rats given urolithin A after diet-induced obesity had less visceral fat ${cite('abdulrahman_urolithins_obesity_2020')}, and urolithin A reduced triglyceride accumulation in cultured human adipocytes ${cite('kang_urolithins_adipocytes_2016')}. These are animal and cell experiments with administered urolithin A: they bypass microbial production and have not been reproduced in human adipose tissue.`, '',
  'Supporting evidence: [SF11](#pm8-f22).', '',
  '<span id="pm8-mechanism-f23" />', '',
  '#### SF12 — Human urolithin A production tracks visceral-fat loss and walnut intake', '',
  `In DIRECT-PLUS, both Mediterranean arms included 28 g/day walnuts, and the green-Mediterranean arm also included green tea and Mankai. In an exploratory urine analysis, a larger rise in urolithin A correlated with greater visceral-fat loss, remaining significant after adjustment for waist change, and the rise correlated with walnut and Mankai intake ${cite('zelicha_effect_2022')}. In adults with metabolic syndrome given mixed nuts, plasma urolithin A glucuronide was inversely related to waist measures ${cite('mora_cubillos_nut_metabolomics_2015')}. These associations do not show that urolithin A caused the fat loss, and neither study analysed an adipose hormone against urolithin A.`, '',
  'Supporting evidence: [SF12](#pm8-f23).', '',
  '<span id="pm8-mechanism-f24" />', '',
  '#### SF13 — Four months of urolithin A supplementation did not change fat mass in middle-aged adults', '',
  `In a randomised placebo-controlled trial in 88 overweight middle-aged adults, 500 or 1,000 mg/day urolithin A for four months did not change DXA total fat mass ${cite('singh_urolithin_atlas_2022')}. Fat mass was a secondary outcome, visceral fat was not measured and no adipokine result was reviewed. The null result limits extrapolation from rodent fat-mass effects but does not test the adipose endocrine signal itself.`, '',
  'Supporting evidence: [SF13](#pm8-f24).', '', '',
].join('\n');
replaceOnce('#### (Boundaries of the mechanism)', mechanisms + '#### (Boundaries of the mechanism)');

// §4.1 Findings, hypotheses and §8 references are regenerated from the structured records.
const expected = expectedFindingsSection(d, content);
if (!expected?.block) throw new Error('Could not render §4.1');
{
  const match = content.match(FINDINGS_SUBSECTION_HEADING);
  const start = content.indexOf(match[0]);
  const after = content.slice(start + match[0].length);
  const marker = '{/* section4-findings:end */}';
  const markerAt = after.indexOf(marker);
  const nextMajor = after.search(/^## \d+\. /m);
  const end = markerAt !== -1 ? start + match[0].length + markerAt + marker.length : start + match[0].length + nextMajor;
  content = `${content.slice(0, start)}${expected.block}\n\n${markerAt !== -1 ? content.slice(end).replace(/^\n+/, '') : content.slice(end)}`;
}
content = content.replace(/(?=^### [45]\.1 Scientific Findings\s*$)/m, renderScientificHypotheses(d) + '\n\n');
content = replacePmReferencesSection(content, renderNumberedPmReferencesSection(d.references));

fs.writeFileSync(FILE, matter.stringify(content, d, {lineWidth: 110}));
fs.writeFileSync(REGISTRY, JSON.stringify(registry, null, 2) + '\n');
fs.writeFileSync(new URL('./record.json', import.meta.url), JSON.stringify({
  applied_on: DATE, approval_source: APPROVAL, pm_id: d.pm_id,
  added: {findings: ['PM8-F22', 'PM8-F23', 'PM8-F24'], sec: SEC.map(r => ({id: r.id, factors: r.factors, rawScore: r.rawScore, status: r.assessmentStatus})),
    atoms: ['PM8-DIT-13', 'PM8-DIT-14'], evidence_gap: 'PM8-EG-7', decision: 'PM8-ADJ-UROA-1', decision_updated: 'PM8-ADJ-ENDO-1 (history v2)', hypothesis: 'PM8-H1',
    references: NEW_REFS.map(([k]) => ({key: k, number: refNumber(k)}))},
}, null, 2) + '\n');
console.log('applied', NEW_REFS.map(([k]) => `${k}=${refNumber(k)}`).join(' '));
