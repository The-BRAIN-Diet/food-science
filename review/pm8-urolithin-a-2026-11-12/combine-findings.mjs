/**
 * Fold the one-study supplementation finding into the human urolithin A finding.
 * Refuses to run twice. Front matter is rewritten at lineWidth 110 so the rest of the page round-trips.
 */
import fs from 'node:fs';
import matter from 'gray-matter';
import {secAssessmentHash} from '../../scripts/lib/sec-assessments.mjs';
import {expectedFindingsSection, FINDINGS_SUBSECTION_HEADING} from '../../scripts/lib/scientific-findings-gate.mjs';
import {renderScientificHypotheses, HYPOTHESES_START, HYPOTHESES_END} from '../../scripts/lib/scientific-hypotheses.mjs';

const pagePath = 'docs/biological-targets/brs6/fm4/brs6-fm4-pm8-metabolic-inflammation-and-adipose-stress-signalling.mdx';
const registryPath = 'system/sec-assessments/registry.json';
const parsed = matter(fs.readFileSync(pagePath, 'utf8'));
const data = parsed.data;
let content = parsed.content;

const f23 = data.scientific_findings.find(f => f.id === 'PM8-F23');
const f24 = data.scientific_findings.find(f => f.id === 'PM8-F24');
if (!f23 || !f24) throw new Error('PM8-F23 and PM8-F24 must both be present; refusing to run twice');

const statement = 'In humans, higher urolithin A production has tracked greater visceral-fat loss and nut intake, while four months of supplementation did not change total fat mass.';
const synthesis = 'The urinary association comes from DIRECT-PLUS, where urolithin A was the only urinary polyphenol that survived multiple-comparison correction and the association persisted after adjustment for waist change. A separate nut trial found plasma urolithin A glucuronide inversely related to waist measures. The same finding includes the ATLAS supplementation trial: four months of 500 or 1,000 mg/day did not change DXA total fat mass. That result bounds extrapolation from rodent fat-mass effects and does not test visceral fat or an adipose hormone.';
const limitations = 'The production findings are associations: urolithin A was not randomised and may mark ellagitannin intake, producer microbiota or adherence. The supplementation result is one secondary body-composition outcome without a retrieved interval, and it did not measure visceral fat or adipokines. No adipose hormone has been analysed against urolithin A in humans. DIRECT-PLUS is the same cohort as PM8-F3 and is not an independent replication of that diet-package result.';

f23.finding_label = 'Human urolithin A and central fat';
f23.finding_summary = statement;
f23.finding_statement = statement;
f23.finding_interpretation = synthesis;
f23.synthesis = synthesis;
f23.synthesis_limitations = limitations;
f23.evidence_considered.push(f24.evidence_considered[0]);
f23.evidence_dependency = [
  'DIRECT-PLUS urine and visceral-fat results are the same cohort as PM8-F3 (NCT03020186). This finding uses the metabolite association; it is not a second replication of the diet-package result.',
  'Singh 2022 tests supplementation and total fat mass, a different exposure and endpoint from the urinary association, and is fenced here as the human bound rather than a separate finding.',
];

data.scientific_findings = data.scientific_findings.filter(f => f.id !== 'PM8-F24');

function retarget(node, key) {
  if (Array.isArray(node)) {
    const items = key === 'finding_ids' ? node.filter(item => item !== 'PM8-F24') : node;
    return items.map(item => retarget(item));
  }
  if (node && typeof node === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(node)) {
      out[k] = k === 'finding_id' && v === 'PM8-F24' ? 'PM8-F23' : retarget(v, k);
    }
    return out;
  }
  return node;
}
const hypotheses = data.scientific_hypotheses;
const findings = data.scientific_findings;
for (const key of Object.keys(data)) {
  if (key === 'scientific_hypotheses' || key === 'scientific_findings') continue;
  data[key] = retarget(data[key], key);
}
data.scientific_hypotheses = hypotheses;
data.scientific_findings = findings;

const hypothesis = data.scientific_hypotheses.find(h => h.id === 'PM8-H1');
hypothesis.rationale = hypothesis.rationale.replace(
  'The null ATLAS fat-mass result must not be ignored.',
  'The ATLAS fat-mass result is fenced inside PM8-F23 and must not be read as a separate subject.',
);
const humanLink = hypothesis.finding_links.supporting.find(link => link.finding_id === 'PM8-F23');
humanLink.label = 'SF12 — Human urolithin A and central fat';
humanLink.explanation = 'Fences the human evidence on one subject: urinary urolithin A tracked visceral-fat loss and nut intake, and four months of supplementation did not change total fat mass. The association was not randomised; the supplementation result did not measure visceral fat or an adipokine.';
hypothesis.finding_links.contradictory_or_null = [];

const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const v1 = registry.assessments.find(e => e.record.id === 'brs6-pm8-pm8-f23-urolithin-assessment' && e.record.recordVersion === 1);
if (!v1) throw new Error('Missing unpublished PM8-F23 version 1');
const record = structuredClone(v1.record);
record.recordVersion = 2;
record.proposition = statement;
record.canonicalProposition = statement;
record.rationale = {
  D: 'The proposition states two measured human results and no causal or endocrine claim: the DIRECT-PLUS association of urinary urolithin A with visceral-fat change and nut intake, and the ATLAS report that four-month supplementation did not change DXA total fat mass.',
  B: 'The association sits in a randomised parent trial with MRI visceral fat and false-discovery control, but urolithin A was not randomised and the analysis was exploratory. The supplementation result is from a randomised, double-blind, placebo-controlled trial, with fat mass as a secondary outcome not designed for adiposity.',
  P: 'The scored magnitude is the visceral-fat correlation (r=−0.241, q=0.00036), which excludes zero but explains little variance; the walnut and Mankai correlations are marginal. The fat-mass clause records the trial\'s reported absence of change. No interval for that contrast was retrieved, so this factor does not treat the null as a precise zero.',
  R: 'Mora-Cubillos 2015 is directionally consistent on waist and is not exact replication of the visceral-fat association. ATLAS uses a different exposure and endpoint and is not replication. One cohort, DIRECT-PLUS, carries the visceral-fat association.',
};
record.limitations = [
  'Association only; not evidence that urolithin A mediates visceral-fat loss or adipose endocrine change.',
  'The supplementation fat-mass contrast has no retrieved interval, so this score does not quantify that null.',
  'Assessment is provisional and not qualified-human reviewed.',
];
record.sources.contradictory = ['singh_urolithin_atlas_2022'];
record.sources.contradictoryAssessment = 'ATLAS reported no change in DXA total fat mass after four months of supplementation. It bounds fat-mass extrapolation. It does not reverse the urinary visceral-fat association, and it did not measure visceral fat or an adipokine.';
record.sources.targetedChecks.push({
  doi: '10.1016/j.xcrm.2022.100633',
  role: 'contradictory primary',
  access: 'PMC9133463 full text and supplementary body-composition table (retrieved 2026-11-12).',
  assessment: 'n=88; 500 or 1,000 mg/day for 4 months; total fat mass change +0.4%, +0.9%, −1.2%; reported as unchanged across groups. Fenced into PM8-F23 rather than scored as its own finding.',
});
record.sources.retrievalLimited.push({
  url: 'https://doi.org/10.1016/j.xcrm.2022.100633',
  limitation: 'Supplementary variance or interval data for the fat-mass contrast were not recovered; the contrast is a bound, not a precise null.',
});
record.history.push({
  version: 2,
  date: '2026-11-12',
  decision: 'Proposition widened so the human adiposity evidence, including the ATLAS fat-mass result previously held as PM8-F24, is one finding. Confidence not promoted: the association remains 4/8, and the fat-mass contrast stays a bound without a retrieved interval.',
});
const sha = secAssessmentHash(record);
registry.assessments.push({sha256: sha, record});
const before = registry.assessments.length;
registry.assessments = registry.assessments.filter(e => e.record.id !== 'brs6-pm8-pm8-f24-urolithin-assessment');
if (registry.assessments.length !== before - 1) throw new Error('Expected to remove exactly one unpublished PM8-F24 snapshot');
f23.sec_assessment_ref = {id: record.id, version: 2, sha256: sha};

const summaryFrom = '- **Urolithin A:** [administered urolithin A engages adipose endocrine signalling in rodents](#pm8-mechanism-f22); in humans, [urolithin A production tracks visceral-fat loss](#pm8-mechanism-f23), but [four months of supplementation did not change fat mass](#pm8-mechanism-f24) ([SF11](#pm8-f22), [SF12](#pm8-f23), [SF13](#pm8-f24)).';
const summaryTo = '- **Urolithin A:** [administered urolithin A engages adipose endocrine signalling in rodents](#pm8-mechanism-f22); in humans, [production tracks visceral-fat loss and supplementation did not change fat mass](#pm8-mechanism-f23) ([SF11](#pm8-f22), [SF12](#pm8-f23)).';
if (!content.includes(summaryFrom)) throw new Error('Summary bullet not found');
content = content.replace(summaryFrom, summaryTo);

const mechanismFrom = `<span id="pm8-mechanism-f23" />

#### SF12 — Human urolithin A production tracks visceral-fat loss and walnut intake

In DIRECT-PLUS, both Mediterranean arms included 28 g/day walnuts, and the green-Mediterranean arm also included green tea and Mankai. In an exploratory urine analysis, a larger rise in urolithin A correlated with greater visceral-fat loss, remaining significant after adjustment for waist change, and the rise correlated with walnut and Mankai intake [[7]](#pm-ref-7). In adults with metabolic syndrome given mixed nuts, plasma urolithin A glucuronide was inversely related to waist measures [[74]](#pm-ref-74). These associations do not show that urolithin A caused the fat loss, and neither study analysed an adipose hormone against urolithin A.

Supporting evidence: [SF12](#pm8-f23).

<span id="pm8-mechanism-f24" />

#### SF13 — Four months of urolithin A supplementation did not change fat mass in middle-aged adults

In a randomised placebo-controlled trial in 88 overweight middle-aged adults, 500 or 1,000 mg/day urolithin A for four months did not change DXA total fat mass [[75]](#pm-ref-75). Fat mass was a secondary outcome, visceral fat was not measured and no adipokine result was reviewed. The null result limits extrapolation from rodent fat-mass effects but does not test the adipose endocrine signal itself.

Supporting evidence: [SF13](#pm8-f24).`;
const mechanismTo = `<span id="pm8-mechanism-f23" />

#### SF12 — Human urolithin A and central fat

In DIRECT-PLUS, both Mediterranean arms included 28 g/day walnuts, and the green-Mediterranean arm also included green tea and Mankai. In an exploratory urine analysis, a larger rise in urolithin A correlated with greater visceral-fat loss, remaining significant after adjustment for waist change, and the rise correlated with walnut and Mankai intake [[7]](#pm-ref-7). In adults with metabolic syndrome given mixed nuts, plasma urolithin A glucuronide was inversely related to waist measures [[74]](#pm-ref-74). In a randomised trial in 88 overweight middle-aged adults, 500 or 1,000 mg/day urolithin A for four months did not change DXA total fat mass [[75]](#pm-ref-75). The production results are associations and do not show that urolithin A caused the fat loss. The supplementation result bounds extrapolation from rodent fat-mass effects; fat mass was a secondary outcome, visceral fat was not measured, and no adipokine was analysed against urolithin A.

Supporting evidence: [SF12](#pm8-f23).`;
if (!content.includes(mechanismFrom)) throw new Error('Mechanism blocks not found');
content = content.replace(mechanismFrom, mechanismTo);

const lessonFrom = `{/* scientific-lesson:PM8-F23:start */}
<p><a href="#pm8-mechanism-f23">Mechanistic explanation: Human urolithin A production tracks visceral-fat loss and walnut intake</a></p>
{/* scientific-lesson:PM8-F23:end */}`;
const lessonTo = `{/* scientific-lesson:PM8-F23:start */}
<p><a href="#pm8-mechanism-f23">Mechanistic explanation: Human urolithin A and central fat</a></p>
{/* scientific-lesson:PM8-F23:end */}`;
if (!content.includes(lessonFrom)) throw new Error('F23 lesson not found');
content = content.replace(lessonFrom, lessonTo);
const droppedLesson = `{/* scientific-lesson:PM8-F24:start */}
<p><a href="#pm8-mechanism-f24">Mechanistic explanation: Four months of urolithin A supplementation did not change fat mass in middle-aged adults</a></p>
{/* scientific-lesson:PM8-F24:end */}

`;
if (!content.includes(droppedLesson)) throw new Error('F24 lesson not found');
content = content.replace(droppedLesson, '');

const hypothesisBlock = renderScientificHypotheses(data);
const hypothesisAt = content.indexOf(HYPOTHESES_START);
const hypothesisEnd = content.indexOf(HYPOTHESES_END);
if (hypothesisAt < 0 || hypothesisEnd < hypothesisAt) throw new Error('Hypothesis block not found');
content = content.slice(0, hypothesisAt) + hypothesisBlock + content.slice(hypothesisEnd + HYPOTHESES_END.length);

function replaceSubsection(body, block) {
  const match = body.match(FINDINGS_SUBSECTION_HEADING);
  if (!match) return null;
  const start = body.indexOf(match[0]);
  const after = body.slice(start + match[0].length);
  const nextMajor = after.search(/^## \d+\. /m);
  const marker = '{/* section4-findings:end */}';
  const markerAt = after.indexOf(marker);
  const end = markerAt !== -1 ? start + match[0].length + markerAt + marker.length : nextMajor === -1 ? body.length : start + match[0].length + nextMajor;
  return `${body.slice(0, start)}${block}\n\n${markerAt !== -1 ? body.slice(end).replace(/^\n+/, '') : body.slice(end)}`;
}
const expected = expectedFindingsSection(data, content);
if (!expected?.block) throw new Error('Findings section did not render');
content = replaceSubsection(content, expected.block);

fs.writeFileSync(pagePath, matter.stringify(content, data, {lineWidth: 110}));
fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n');
console.log('Combined PM8-F24 into PM8-F23; SEC', record.id, 'v2', sha);
