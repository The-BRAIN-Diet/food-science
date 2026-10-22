import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import matter from 'gray-matter';
import {readPilotBaseline} from './lib/sec-pilot-baseline.mjs';
import {audit, sf2Audit, isAuditPreview, sf1Conclusion, secAssessmentStatusErrors, secAssessmentLabels} from '../src/components/SecCalibrationPreview/assessmentAudit.mjs';
import {assessmentPresentation, evidenceReviewPresentation, correctionPresentation, readerAssessmentLabels, secFactors, describeFactorScores} from '../src/components/SecCalibrationPreview/auditPresentation.mjs';
import {SEC_DISPLAY_LEVELS} from '../src/components/EvidenceConfidenceIndicator/secDisplay.mjs';

const read = path => fs.readFileSync(path, 'utf8');
test('Finding confidence uses the same stacked default layout at every viewport', () => {
  const css=read('src/components/SecCalibrationPreview/styles.module.css');
  const rule=css.match(/^\.confidence \{([^}]+)\}/m)?.[1] || '';
  assert.match(rule,/flex-direction: column/);
  assert.match(rule,/align-items: flex-start/);
  assert.doesNotMatch(rule,/flex-wrap/);
  const component=read('src/components/SecCalibrationPreview/index.tsx');
  assert.match(component,/<div className=\{styles.confidence\}>/);
});
test('preview routing stays isolated and canonical audit requires an explicit assessment reference', () => {
  assert.equal(isAuditPreview('/docs/system/sec-calibration/gaba'), true);
  assert.equal(isAuditPreview('/docs/system/sec-calibration/gaba/'), true);
  for (const path of ['/docs/biological-targets/brs1/fm4/brs1-fm4-pm9-gaba-synthesis-capacity','/docs/system/sec-calibration/gaba-other','/docs/foods/eggs']) assert.equal(isAuditPreview(path), false);
  const bar = read('src/components/ReviewCorrections/DocUtilityBar.tsx');
  assert.match(bar, /auditPreview \|\| hasSecReferences \? "Evidence & Audit"/);
  assert.match(bar, /hasSecReferences = isPmPage && secFindings.some/);
  assert.match(bar, /Object.hasOwn\(f, "sec_assessment_ref"\)/);
  assert.match(bar, /auditPreview \? <EvidenceAudit[\s\S]*hasSecReferences \? <CanonicalSecAudit[\s\S]*: <PageReviewPanel/);
});
test('versioned audit preserves exact proposition, unresolved factors and source identities', () => {
  const canonical = matter(readPilotBaseline('docs/biological-targets/brs1/fm4/brs1-fm4-pm9-gaba-synthesis-capacity.mdx')).data;
  const f1 = canonical.scientific_findings.find(f => f.id === audit.findingId);
  assert.equal(audit.canonicalProposition, f1.finding_statement);
  assert.match(audit.proposition,/suggests potentially recruitable/);
  assert.equal(audit.recordVersion, 5);
  assert.equal(audit.proposition, sf1Conclusion);
  assert.match(read('src/components/SecCalibrationPreview/index.tsx'), /finding_summary: sf1Conclusion/);
  assert.deepEqual(audit.factors, {D:1, B:null, P:null, R:null});
  assert.equal(audit.rawScore, null); assert.equal(audit.adjustedScore, null);
  assert.equal(audit.lastEvidenceAssessmentDate, '2026-10-18');
  assert.equal(audit.reviewer, null); assert.equal(audit.methodology.version, null);
  assert.deepEqual(audit.sources.supporting, f1.evidence_considered.map(e => e.citation_key));
  assert.deepEqual(audit.sources.contextual, f1.connected_supportive_evidence.map(e => e.citation_key));
  assert.ok(audit.sources.retrievalLimited.length);
  assert.match(audit.sources.contradictoryAssessment, /absence is not established/);
  assert.ok(audit.history.length); assert.equal(audit.discussionUrl, null);
  assert.equal(audit.workingEstimate,undefined);
  assert.match(audit.status,/Conditional SEC estimate — under calibration.*formal SEC Not scored/);
  assert.equal(audit.sources.targetedChecks.length,5);
  assert.ok(audit.sources.targetedChecks.slice(1).every(source=>/abstract only/i.test(source.access)));
  assert.match(audit.sources.targetedChecks.find(s=>s.doi==='10.1042/bj2310695').assessment,/not a verified independent replication/);
});

test('SF1 conditional reassessment preserves withdrawal history and formal unknowns', () => {
  assert.deepEqual(audit.conditional.factors,{D:1,B:1,P:1,R:1});
  assert.equal(Object.values(audit.conditional.factors).reduce((a,b)=>a+b,0),4);
  assert.equal(audit.conditional.rawScore,4); assert.equal(audit.conditional.adjustedScore,4);
  assert.equal(audit.conditional.label,'Low–Moderate');
  for (const factor of ['B','P','R']) assert.equal(audit.conditional.statuses[factor],'Conditional');
  assert.match(audit.conditional.caps,/ceiling of 5/);
  assert.equal(audit.history.length,5);
  assert.match(audit.history[2].decision,/withdrew/);
  assert.match(audit.history[3].decision,/recovering Kaufman/);
  assert.match(audit.history[4].decision,/not accepted provisional SEC/);
  assert.match(audit.rationale.R,/Independent replication was not established in this assessment\./);
  assert.match(audit.rationale.P,/numerical table cells/);
  const recovered=audit.sources.targetedChecks[0];
  assert.equal(recovered.doi,'10.1111/j.1471-4159.1991.tb08211.x');
  assert.match(recovered.access,/full text read in full/);
  assert.match(recovered.assessment,/not observed human physiological reserve or dietary response/);
  const component=read('src/components/SecCalibrationPreview/index.tsx');
  assert.match(component,/score=\{audit.conditional.adjustedScore\}/);
  assert.match(component,/synthesised_evidence_confidence: `\$\{assessment\?\.readout\} · \$\{assessment\?\.statusLabel\}`/);
  assert.match(read('src/components/SecCalibrationPreview/EvidenceAudit.tsx'),/assessmentView=assessmentPresentation/);
  assert.match(read('src/components/SecCalibrationPreview/EvidenceAudit.tsx'),/assessmentView\(audit\)/);
});
test('three status surfaces and original correction panel remain separate', () => {
  const panel = read('src/components/SecCalibrationPreview/EvidenceAudit.tsx');
  for (const label of ['Evidence review status','Scientific Finding assessments','Correction status','Assessment date:','Human reviewer','Methodology']) assert.ok(panel.includes(label));
  assert.match(panel, /<PageReviewPanel page=\{page\}/);
  assert.match(panel, /assessmentPage !== undefined \? assessmentPage : findPublicPageRecord\(\{pageId: assessmentPmId \|\| records\[0\]\?\.pmId\}\)/);
  assert.match(panel, /evidenceReviewPresentation\(page\)/);
  assert.match(panel, /correctionPresentation\(page\)/);
  const finding = read('src/components/SecCalibrationPreview/index.tsx');
  assert.match(finding, /\?review=1#gaba-sf1-assessment-v1/);
  assert.match(panel, /recordAnchor=\(r:any\)=>r.id/);
  assert.match(panel, /id=\{recordAnchor\(audit\)\}/);
  assert.match(panel, /audit.findingId.toLowerCase\(\)/);
  assert.match(finding, /<EvidenceConfidenceIndicator \/>/);
  assert.doesNotMatch(finding, /score=\{illustrative/);
  assert.doesNotMatch(finding, /workingEstimate|Provisional working estimate/);
  assert.match(panel,/className="brs-fm-hub-item brain-sf-disclosure" data-brs-fm-hub/);
  assert.match(panel,/className="brs-fm-hub-summary" aria-expanded="false"/);
  assert.match(panel,/className="brs-fm-hub-panel" hidden/);
  assert.match(panel,/initBrsFmHubDropdowns\(root.current\)/);
  assert.doesNotMatch(panel,/<details|useState|onClick/);
});

test('SF2 conditional score cannot masquerade as a formal SEC calculation', () => {
  assert.deepEqual(sf2Audit.factors,{D:2,B:null,P:null,R:null});
  assert.equal(sf2Audit.rawScore,null); assert.equal(sf2Audit.adjustedScore,null);
  assert.deepEqual(sf2Audit.conditional.factors,{D:2,B:1,P:1,R:1});
  assert.equal(Object.values(sf2Audit.conditional.factors).reduce((a,b)=>a+b,0),5);
  assert.equal(sf2Audit.conditional.rawScore,5); assert.equal(sf2Audit.conditional.adjustedScore,5);
  assert.equal(sf2Audit.conditional.label,'Moderate');
  for(const factor of ['B','P','R']) assert.equal(sf2Audit.conditional.statuses[factor],'Conditional');
  assert.match(sf2Audit.status,/Conditional SEC estimate — under calibration/);
  assert.match(sf2Audit.status,/formal SEC Not scored/);
  assert.match(sf2Audit.rationale.R,/Independent replication was not established in this assessment\./);
  assert.match(sf2Audit.proposition,/do not establish physiological zinc limitation, dietary zinc responsiveness or increased human brain GABA synthesis/);
});

test('SF2 recovery retains species, access and independence limitations', () => {
  const byDoi=new Map(sf2Audit.sources.targetedChecks.map(s=>[s.doi,s]));
  assert.match(byDoi.get('10.1074/jbc.m500805200').assessment,/sheep brain/);
  assert.match(byDoi.get('10.3390/catal10050555').role,/not independent replication/);
  assert.match(byDoi.get('10.1016/j.pep.2004.04.021').assessment,/MgATP preference/);
  assert.match(byDoi.get('10.1007/s10534-013-9660-0').access,/abstract/);
  assert.equal(sf2Audit.sources.retrievalLimited.length,3);
  assert.ok(sf2Audit.sources.retrievalLimited.every(s=>s.doi&&s.url&&/Missing/i.test(s.limitation)));
  assert.ok(sf2Audit.stoppingRationale);
  assert.ok(sf2Audit.recommendation.includes('No canonical rewrite'));
  const canonical=matter(read('docs/biological-targets/brs1/fm4/brs1-fm4-pm9-gaba-synthesis-capacity.mdx')).data;
  const f2=canonical.scientific_findings.find(f=>f.id==='PM9-F2');
  assert.equal(f2.synthesised_evidence_confidence,'not-yet-scored');
  assert.equal(f2.evidence_considered.length,3);
  const component=read('src/components/SecCalibrationPreview/index.tsx');
  assert.match(component,/\?review=1#gaba-sf2-assessment-v1/);
  assert.match(component,/score=\{sf2Audit.conditional.adjustedScore\}/);
  assert.match(component,/finding_summary: sf2Audit.proposition/);
  assert.match(component,/not accepted confidence assessments/);
  assert.doesNotMatch(component,/no scientific SEC assessment has been assigned/);
  assert.equal(sf2Audit.recordVersion,2);
  assert.equal(sf2Audit.history.length,2);
  assert.match(sf2Audit.history[1].decision,/No new retrieval or confidence promotion/);
  assert.match(read('src/components/SecCalibrationPreview/EvidenceAudit.tsx'),/Formal raw and adjusted SEC totals remain uncalculated/);
  const compact=component.slice(component.indexOf('function Compact'),component.indexOf('type PreviewAtom'));
  assert.doesNotMatch(compact,/sf2Audit|score=/);
  assert.match(read('src/components/SecCalibrationPreview/EvidenceAudit.tsx'),/\? glycaemicAudits : \[audit, sf2Audit\]/);
  assert.match(read('src/components/SecCalibrationPreview/EvidenceAudit.tsx'),/records\.map/);
});

const completedFixture = () => ({
  ...audit, conditional: undefined, assessmentStatus: 'codex-provisional', assessmentComplete: true,
  factors: {D:1,B:1,P:1,R:1}, factorStates: {D:'established',B:'established',P:'established',R:'established'},
  rationale: {D:'Synthetic fixture: scoped inferential bridge appraised.',B:'Synthetic fixture: residual design concerns appraised.',P:'Synthetic fixture: informative measurement with residual uncertainty.',R:'Synthetic fixture: partial independent confirmation appraised.'},
  rawScore:4, adjustedScore:4, capRationale:'D1 ceiling 5; raw 4 unchanged.', humanReview:null,
});

test('Codex provisional completion requires no human review; confidence and review status are independent', () => {
  const record=completedFixture();
  const before=JSON.stringify(record);
  assert.deepEqual(secAssessmentStatusErrors(record),[]);
  assert.equal(JSON.stringify(record),before);
  assert.equal(record.humanReview,null);
  assert.equal(record.reviewer,null);
  assert.equal(secAssessmentLabels['codex-provisional'],'Codex-assessed provisional SEC');
  const legacy={rawScore:8};
  assert.deepEqual(secAssessmentStatusErrors(legacy),[]);
  assert.equal(secAssessmentLabels[legacy.assessmentStatus || 'not-scored'],'Not scored');
});

test('conditional or unresolved factors cannot become completed SEC by changing the status', () => {
  for (const record of [audit,sf2Audit]) {
    assert.deepEqual(secAssessmentStatusErrors(record),[]);
    assert.equal(record.assessmentStatus,'conditional');
    assert.equal(record.humanReview,null);
    assert.ok(secAssessmentStatusErrors({...record,assessmentStatus:'codex-provisional',assessmentComplete:true}).length);
  }
  assert.ok(secAssessmentStatusErrors({...completedFixture(),factorStates:{D:'established',B:'conditional',P:'established',R:'established'}}).length);
  assert.ok(secAssessmentStatusErrors({...completedFixture(),factors:{D:1,B:null,P:1,R:1}}).length);
  assert.ok(secAssessmentStatusErrors({...completedFixture(),assessmentComplete:false}).length);
});

test('scientifically reviewed SEC requires explicit qualified human review of the current version', () => {
  const record={...completedFixture(),assessmentStatus:'scientifically-reviewed'};
  assert.ok(secAssessmentStatusErrors(record).length);
  const humanReview={reviewerType:'human',reviewerIdentity:'Test fixture reviewer',qualifications:'Test fixture relevant qualification',reviewDate:'2026-10-18',outcome:'accepted',assessedRecordVersion:record.recordVersion,changes:'None — synthetic test only'};
  assert.deepEqual(secAssessmentStatusErrors({...record,humanReview}),[]);
  for (const change of [{reviewerType:'codex'},{qualifications:''},{reviewDate:null},{outcome:'wording-approved'},{assessedRecordVersion:0}]) assert.ok(secAssessmentStatusErrors({...record,humanReview:{...humanReview,...change}}).length);
  const panel=read('src/components/SecCalibrationPreview/EvidenceAudit.tsx');
  assert.match(panel,/Assessment status:/);
  assert.match(panel,/evidenceReviewPresentation\(page\)/);
  assert.match(panel,/correctionPresentation\(page\)/);
});

test('reader-facing fixtures distinguish all four states without registering Findings', () => {
  assert.deepEqual(readerAssessmentLabels,{'not-scored':'Not scored',conditional:'Conditional estimate','codex-provisional':'Provisionally assessed','scientifically-reviewed':'Scientifically reviewed'});
  const unscored={findingId:'SF3',title:'Example finding',assessmentStatus:'not-scored'};
  const provisional={...completedFixture(),findingId:'SF4',title:'Example finding',factors:{D:2,B:2,P:1,R:1},rawScore:6,adjustedScore:6};
  const reviewed={...completedFixture(),findingId:'SF5',title:'Example finding',assessmentStatus:'scientifically-reviewed',factors:{D:2,B:2,P:2,R:1},rawScore:7,adjustedScore:7};
  reviewed.humanReview={reviewerType:'human',reviewerIdentity:'Synthetic fixture reviewer',qualifications:'Synthetic relevant qualification',reviewDate:'2026-10-18',outcome:'accepted',assessedRecordVersion:reviewed.recordVersion,changes:'None; presentation fixture only'};
  const examples=[unscored,audit,provisional,reviewed].map(assessmentPresentation);
  assert.deepEqual(examples.map(e=>e.readout),['Not scored','4/8 · Low–Moderate','6/8 · Moderate–High','7/8 · High']);
  assert.deepEqual(examples.map(e=>e.statusLabel),Object.values(readerAssessmentLabels));
  assert.equal(examples[0].score,null); assert.equal(examples[0].incomplete,true);
  assert.equal(examples[1].humanReview,null); assert.equal(examples[2].humanReview,null);
  assert.equal(examples[3].humanReview.reviewDate,'2026-10-18');
  assert.equal(assessmentPresentation({...reviewed,humanReview:null}).status,'not-scored');
  const zero={...completedFixture(),factors:{D:0,B:0,P:0,R:0},rawScore:0,adjustedScore:0};
  assert.equal(assessmentPresentation(zero).readout,'0/8 · Assessed zero');
  assert.equal(assessmentPresentation(zero).score,null);
  assert.equal(assessmentPresentation({...unscored,adjustedScore:7}).score,null);
  assert.equal(assessmentPresentation(sf2Audit).readout,'5/8 · Moderate');
  const panel=read('src/components/SecCalibrationPreview/EvidenceAudit.tsx');
  const assessments=panel.slice(panel.indexOf('{records.map'));
  const summary=assessments.slice(assessments.indexOf('<button type="button"'),assessments.indexOf('<div className="brs-fm-hub-panel" hidden>'));
  assert.doesNotMatch(summary,/formal SEC|audit.status|retrieval|Not recorded/);
  assert.match(summary,/display.incomplete \? \('unscoredReason' in audit \? audit.unscoredReason : 'Assessment incomplete'\)/);
  assert.match(summary,/display.score !== null \? <EvidenceConfidenceIndicator/);
  assert.match(summary,/display.statusLabel/);
  assert.doesNotMatch(panel,/SF3|SF4|SF5|Example finding|Pending expert review/);
});

test('rubric legend reuses standard disclosure and all eight canonical display levels', () => {
  const panel=read('src/components/SecCalibrationPreview/EvidenceAudit.tsx');
  const legend=panel.slice(panel.indexOf('<div id="sec-rubric-legend"'),panel.indexOf('<h3>Evidence review status'));
  assert.ok(panel.indexOf('<h2 tabIndex={-1}>Evidence &amp; Audit</h2>') < panel.indexOf('<div id="sec-rubric-legend"'));
  assert.match(legend,/How evidence confidence is assessed/);
  assert.match(legend,/Understand the 8-point Synthesised Evidence Confidence \(SEC\) score and review statuses/);
  assert.match(legend,/className="brs-fm-hub-item brain-sf-disclosure" data-brs-fm-hub/);
  assert.match(legend,/type="button" className="brs-fm-hub-summary" aria-expanded="false"/);
  assert.match(legend,/className="brs-fm-hub-panel" hidden/);
  assert.match(legend,/SEC_DISPLAY_LEVELS.map/);
  assert.match(legend,/<EvidenceConfidenceIndicator score=\{level.score\}/);
  assert.deepEqual(SEC_DISPLAY_LEVELS.map(l=>l.score),[1,2,3,4,5,6,7,8]);
  assert.deepEqual(SEC_DISPLAY_LEVELS.map(l=>l.family),['red','red','yellow','yellow','orange','orange','green','green']);
  assert.match(legend,/Synthesised Evidence Confidence \(SEC\) describes how strongly the assessed body of research supports a specific scientific conclusion\. It does not measure treatment effectiveness or the size of a biological effect\./);
  for (const text of ['A low score does not automatically mean a finding is false.','Missing evidence must not automatically be scored zero.','The SEC rubric and caps remain under scientific calibration.','Methodology under calibration']) assert.ok(legend.includes(text));
  assert.doesNotMatch(legend,/<a |D2|B1|P1|R0/);
  for (const label of Object.values(readerAssessmentLabels)) assert.ok(legend.includes(label));
  assert.match(legend,/SEC = Directness \+ Bias Protection \+ Precision \+ Replication/);
  assert.equal(secFactors.D.explanation,'Does the evidence directly test the scientific conclusion being assessed, or does it require assumptions to connect the results to that conclusion?');
  assert.equal(secFactors.B.explanation,'How well does the research design and methodology protect against misleading or systematically distorted findings?');
  assert.equal(secFactors.P.explanation,'How clearly do the measurements and their uncertainty distinguish between different plausible scientific conclusions?');
  assert.equal(secFactors.R.explanation,'Has the same scientific conclusion been independently supported by other studies or experimental research groups?');
  assert.equal(describeFactorScores('D2/B1/P1/R0'),'Directness 2/2/Bias Protection 1/2/Precision 1/2/Replication 0/2');
  assert.match(panel,/secFactors\[factor\].name/);
  assert.doesNotMatch(panel,/<dt>\{factor\} —/);
  assert.match(panel,/\?review=0#\$\{audit.findingId.toLowerCase\(\)\}/);
});

test('review and correction fallbacks require explicit authoritative data', () => {
  assert.equal(evidenceReviewPresentation(null),'Review status not recorded');
  assert.equal(evidenceReviewPresentation({}),'Review status not recorded');
  assert.equal(evidenceReviewPresentation({review_status:'unreviewed'}),'Unreviewed');
  assert.equal(evidenceReviewPresentation({review_status:'in_review'}),'In review');
  assert.equal(evidenceReviewPresentation({review_status:'expert_reviewed'}),'Reviewed');
  assert.equal(evidenceReviewPresentation({review_status:'source_checked'}),'Review status not recorded');
  assert.equal(correctionPresentation(null),'Status unavailable');
  assert.equal(correctionPresentation({}),'Status unavailable');
  assert.equal(correctionPresentation({corrections:[]}),'No corrections recorded');
  assert.equal(correctionPresentation({corrections:[{correction_status:'accepted'}]}),'Corrections pending');
  assert.equal(correctionPresentation({corrections:[{correction_status:'applied'}]}),'Corrections resolved');
  assert.equal(correctionPresentation({corrections:[],issues:[{correction_status:'pending'}]}),'Corrections pending');
  assert.equal(correctionPresentation({corrections:[{}]}),'Status unavailable');
  assert.equal(evidenceReviewPresentation({assessmentStatus:'scientifically-reviewed'}),'Review status not recorded');
});

test('SF and audit use the same short assessment labels without changing stored status', () => {
  const component=read('src/components/SecCalibrationPreview/index.tsx');
  const panel=read('src/components/SecCalibrationPreview/EvidenceAudit.tsx');
  assert.match(component,/assessmentPresentation\(audit\)/);
  assert.match(component,/assessmentPresentation\(sf2Audit\)/);
  assert.match(component,/assessment\?\.statusLabel \|\| 'Not scored'/);
  assert.equal((component.match(/srPrefix=\{assessment\?\.statusLabel\}/g)||[]).length,2);
  assert.doesNotMatch(component,/Conditional SEC estimate — under calibration|estimates under calibration|Assessment pending/);
  assert.match(panel,/conditional.qualification.replace\('Conditional SEC estimate — under calibration', display.statusLabel\)/);
  for (const record of [audit,sf2Audit]) {
    assert.match(record.status,/Conditional SEC estimate — under calibration/);
    assert.equal(assessmentPresentation(record).statusLabel,'Conditional estimate');
  }
  assert.equal(assessmentPresentation(audit).readout,'4/8 · Low–Moderate');
  assert.equal(assessmentPresentation(sf2Audit).readout,'5/8 · Moderate');
  assert.match(panel,/<strong>Conditional estimate:<\/strong>/);
  assert.match(panel,/<p>Methodology under calibration<\/p>/);
});

test('status governance is shared while canonical confidence storage and evidence limitation wording stay unchanged', () => {
  const stage2a=read('system/scientific-finding-schema.md');
  const stage2b=read('system/dietary-input-traceability-contract.md');
  const rubric=read('system/reviews/sec-calibration/SEC-calibration-rubric-proposal.html');
  assert.match(stage2a,/without human expert approval/);
  assert.match(stage2b,/does not require external expert approval/);
  assert.match(stage2b,/scientific-finding-schema.md#sec-assessment-status-and-provisional-completion/);
  for (const label of Object.values(secAssessmentLabels)) assert.ok(rubric.includes(label));
  for (const text of ['“There is insufficient evidence.”','“Insufficient evidence was identified in this assessment.”','“Independent replication was not established in this assessment.”']) assert.ok(stage2a.includes(text));
  assert.match(rubric,/An unresolved essential factor does/);
  assert.match(stage2a,/synthesised_evidence_confidence: not-yet-scored/);
  assert.equal(audit.conditional.adjustedScore,4); assert.equal(sf2Audit.conditional.adjustedScore,5);
  assert.equal(audit.history.length,5); assert.equal(sf2Audit.history.length,2);
});
