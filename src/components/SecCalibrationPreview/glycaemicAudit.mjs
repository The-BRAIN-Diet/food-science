// Isolated, versioned assessment data. Never canonical Finding metadata.
const date = '2026-10-18';
const replication = 'Only one supporting empirical line for the exact population, protocol and endpoint was verified after bounded primary-source and Scite citation screening. Independent replication was not established in this assessment. This is not a claim that replication is absent from the entire literature; related protocols do not earn replication credit automatically.';
const recovery = 'Scite full-text retrieval and citation discovery were followed by publisher/repository searches. Full pivotal Methods/Results were recovered for all four Findings. Reviews, citation counts and supporting-citation labels were not counted as replication. Stop after recovering the load-bearing reports and the material null comparison; further broad searching is not proportionate to this pilot.';
const base = {
  pmId: 'BRS6-FM1-PM2', recordVersion: 1, lastEvidenceAssessmentDate: date,
  assessmentStatus: 'codex-provisional', assessmentComplete: true,
  factorStates: {D: 'established', B: 'established', P: 'established', R: 'established'},
  reviewer: null, humanReview: null, discussionUrl: null,
  process: 'Codex SEC Pilot 2: bounded primary Methods/Results appraisal and Scite-assisted recovery, version 1; no human scientific review recorded',
  methodology: {name: 'Existing SEC calibration rubric proposal', version: null, source: 'system/reviews/sec-calibration/SEC-calibration-rubric-proposal.html'},
  stoppingRationale: recovery,
};
export const glycaemicAudits = [
  {
    ...base, id: 'glycaemic-sf1-assessment-v1', findingId: 'PM2-F1', title: 'Short training and glucose excursions',
    canonicalProposition: 'Seven days of aerobic training reduced excursion frequency, magnitude and duration in type 2 diabetes.',
    proposition: 'Seven days of aerobic training reduced excursion frequency, magnitude and duration in type 2 diabetes.',
    scopeNote: 'Assessed as the existing causal claim in 13 sedentary adults with type 2 diabetes: three baseline monitoring days versus the final three days of seven daily supervised aerobic sessions. Not a score for exercise generally, cognition or ADHD. The original wording is retained, not silently narrowed to increase its score.',
    factors: {D: 2, B: 0, P: 1, R: 0}, rawScore: 3, adjustedScore: 2,
    capRationale: 'Bias Protection 0 imposes the existing 2/8 ceiling: raw 3 becomes adjusted 2. Precision 1 triggers no ceiling. Replication 0 attracts no extra deduction.',
    rationale: {
      D: 'Continuous glucose monitoring in the stated diabetes cohort directly measured excursions before and during the specified training period. Direct measurement does not establish causal attribution.',
      B: 'Fixed before/after order without a randomized inactive comparator cannot separate training from time, monitoring or other co-occurring changes. Controlled meals and supervised exercise help standardisation but do not remove this critical bias for the causal claim.',
      P: 'Table 2 supports lower range and low-glucose events, narrowing plausible conclusions, but high-glucose excursion frequency (p=0.07) and time above threshold (p=0.06) remain inconclusive. Precision 1 reflects informative measurements with material endpoint uncertainty, not proof of the unqualified frequency/magnitude/duration combination. Non-significance is not proof of no effect and does not automatically earn Precision 0.',
      R: replication,
    },
    limitations: ['The causal, all-endpoint wording exceeds what the uncontrolled study establishes.', 'No cognitive or ADHD endpoint; a null 24-hour mean does not negate endpoint-specific excursion changes.'],
    sources: {
      supporting: ['mikus_2012_22311420'], contradictory: [], contextual: ['zametkin_cerebral_1990', 'di_girolamo_prevalence_2022'],
      contradictoryAssessment: 'Mixed outcomes within the pivotal dataset limit the claim; no verified independent exact-protocol contradictory trial was identified in this bounded assessment.',
      targetedChecks: [{doi: '10.1007/s00125-012-2490-8', role: 'Supporting, with null outcomes', access: 'Publisher full-text PDF: Methods, Table 2, Results and Discussion appraised', assessment: 'Small fixed-order cohort; endpoint-specific changes, not a controlled causal estimate. https://link.springer.com/content/pdf/10.1007/s00125-012-2490-8.pdf'}],
      retrievalLimited: [{doi: '10.1007/s00125-016-4170-6', url: 'https://doi.org/10.1007/s00125-016-4170-6', limitation: 'Scite did not supply usable experimental Methods/Results for this different two-week walking trial; institutional metadata checked. Not used as independent confirmation. Broader exercise generalisation remains unassessed.'}],
    },
    recommendation: 'Proposed wording for separate approval: In a small uncontrolled type 2 diabetes cohort, seven days of aerobic training were associated with lower glucose range and selected excursion measures; high-glucose excursion frequency and duration remained statistically inconclusive. Do not treat the proposed clarification as a canonical edit or rescore.',
    history: [{date, decision: 'Initial Codex-assessed provisional 2/8 for the original claim; critical causal bias and mixed endpoint precision retained, not repaired through silent claim narrowing.'}],
  },
  {
    ...base, id: 'glycaemic-sf2-assessment-v1', findingId: 'PM2-F2', title: 'Fish-before-rice acute response',
    canonicalProposition: 'Fish before rice reduced within-meal glucose variability in the diabetes group.',
    proposition: 'Fish before rice reduced within-meal glucose variability in the diabetes group.',
    scopeNote: 'Twelve untreated adults with type 2 diabetes; boiled mackerel followed 15 minutes later by steamed rice versus the reverse order, crossover. Serial venous glucose standard deviation over -15 to 240 minutes, not daylong CGM variability. Ten healthy volunteers are a separate population.',
    factors: {D: 2, B: 1, P: 1, R: 0}, rawScore: 4, adjustedScore: 4,
    capRationale: 'No existing ceiling is triggered by Directness 2, Bias Protection 1 and Precision 1. Replication 0 receives no additional decrement: raw and adjusted 4/8.',
    rationale: {
      D: 'The crossover directly tested the stated order, population and acute glucose-dispersion endpoint; no bridge to long-term variability is included.',
      B: 'Within-person fish/rice comparison controls stable confounding. Residual concerns include incompletely described concealment, unblinded meals and the reported rank-sum analysis for paired summary outcomes. The third-day meat condition was not equivalent randomised replication.',
      P: 'Reported mean glucose standard deviations were 1.94 versus 2.77 mmol/L (standard errors 0.22 and 0.24). This supports the acute direction but leaves magnitude and applicability uncertain; no paired difference interval was extracted. Healthy-group dispersion was not significantly reduced and later glucose was higher with fish first.',
      R: replication,
    },
    limitations: ['Single small, acute sequence-specific diabetes crossover; no daylong or neurocognitive inference.', 'Meat-first results are contextual within the same study, not an independent dataset or proof of a fish-specific nutrient effect.'],
    sources: {
      supporting: ['kuwata_meal_sequence_2016'], contradictory: [], contextual: [],
      contradictoryAssessment: 'The healthy comparison was null for dispersion and the late response differed from the early response. Neither proves the diabetes result false; both prohibit generalising it to every population or time point.',
      targetedChecks: [{doi: '10.1007/s00125-015-3841-z', role: 'Supporting; within-study population/time boundaries', access: 'Scite full text, Methods and Results appraised', assessment: 'Exact fish/rice comparison retained. No broad dietary-pattern, fish-oil or precise alternative food recommendation is inferred.'}],
      retrievalLimited: [],
    },
    recommendation: 'Clarify separately, if approved: name the untreated diabetes population, 15-minute fish/rice sequence and four-hour sampling window. Do not label this daylong variability regulation.',
    history: [{date, decision: 'Initial Codex-assessed provisional 4/8 for the acute sequence-specific claim, with healthy null and late-response boundaries preserved.'}],
  },
  {
    ...base, id: 'glycaemic-sf3-assessment-v1', findingId: 'PM2-F3', title: 'Variability and oxidative-stress association',
    canonicalProposition: 'An observational diabetes study linked glucose fluctuation measures with urinary oxidative-stress markers.',
    proposition: 'An observational diabetes study linked glucose fluctuation measures with urinary oxidative-stress markers.',
    scopeNote: 'Association in 21 poorly controlled type 2 diabetes participants, 48-hour monitoring and urinary isoprostane measurement. No intervention, causal oxidative mechanism or cognition claim is scored. Confidence concerns the scoped cohort observation, not a universal diabetes association.',
    factors: {D: 2, B: 1, P: 1, R: 0}, rawScore: 4, adjustedScore: 4,
    capRationale: 'No existing ceiling is triggered. The independent null comparison limits synthesis and replication, not an invented numerical subtraction. Raw and adjusted 4/8.',
    rationale: {
      D: 'The original report directly measured fluctuation and urinary marker association in diabetes, matching the explicitly observational claim.',
      B: 'Covariate adjustment and laboratory procedures offer partial protection. Small selected cohort, potential residual confounding, nonconcurrent controls and immunoassay cross-reactivity constrain inference. Lack of randomisation is not itself critical bias for a scoped association.',
      P: 'A large within-cohort correlation (r=0.86) supports an association there, but small-sample uncertainty, assay dependence and a direct null comparison prevent a stable population-wide magnitude or universal direction.',
      R: 'The independent Siegelaar study did not confirm the association in better-controlled type 2 diabetes using mass spectrometry (MAGE correlation 0.23, p=0.29). It is not positive replication and does not prove equivalence or disprove the original cohort observation. Independent replication was not established in this assessment.',
    },
    limitations: ['Independent null evidence prevents presenting the association as uniformly established across type 2 diabetes.', 'Assay and glycaemic-control differences may contribute to heterogeneity; neither causal direction nor dietary/cognitive efficacy follows.'],
    sources: {
      supporting: ['monnier_2006_16638903'], contradictory: ['10.1177/193229681100500112'], contextual: [],
      contradictoryAssessment: 'Siegelaar et al. (2011) provides an independently conducted null association in 24 well-controlled type 2 diabetes participants; population and assay differences are explicit, not grounds to discard the challenge.',
      targetedChecks: [
        {doi: '10.1001/jama.295.14.1681', role: 'Supporting observational evidence', access: 'Publisher full-text Methods/Results and limitations appraised', assessment: 'Original cohort association; correct PubMed identity 16609090. The inherited bibliography key is retained, not silently repaired.'},
        {doi: '10.1177/193229681100500112', role: 'Contradictory for generalisation; independent null comparison', access: 'Publisher full-text PDF Methods/Results appraised', assessment: 'Mass-spectrometry assay and better glycaemic control; no significant correlation. https://journals.sagepub.com/doi/pdf/10.1177/193229681100500112'},
      ], retrievalLimited: [],
    },
    recommendation: 'Retain observational wording; add the independent null result and assay/population qualification in a separately approved canonical update. Correct the inherited PMID only in a future bibliography task.',
    history: [{date, decision: 'Initial Codex-assessed provisional 4/8 for the cohort association, explicitly including the independent null comparison and no causal or ADHD inference.'}],
  },
  {
    ...base, id: 'glycaemic-sf4-assessment-v1', findingId: 'PM2-F4', title: 'Walking breaks and acute glucose exposure',
    canonicalProposition: 'Brief walking interruptions reduced postprandial glucose and insulin exposure versus continuous sitting.',
    proposition: 'Brief walking interruptions reduced postprandial glucose and insulin exposure versus continuous sitting.',
    scopeNote: 'Nineteen overweight/obese adults without diabetes; randomised three-period crossover, two-minute light/moderate walks every 20 minutes versus uninterrupted sitting. Five-hour incremental area under the curve after a standard carbohydrate/fat drink, not continuous glucose variability or insulin sensitivity.',
    factors: {D: 2, B: 2, P: 1, R: 1}, rawScore: 6, adjustedScore: 6,
    capRationale: 'No existing ceiling is triggered: raw and adjusted 6/8. Partial replication is explicitly limited to the glucose component. This score cannot be transferred to daylong variability or dietary interventions.',
    rationale: {
      D: 'The laboratory crossover directly tested the walking/sitting contrast and acute glucose/insulin exposure in the stated population.',
      B: 'Independent computer-generated balanced sequence, third-party sealed-envelope allocation, blinded laboratory/statistician, supervised activity, standardised drink, period-adjusted repeated-measures models and greater-than-six-day washout provide design-appropriate protection. Three withdrawals were explained; complete-case analysis and no formal carryover test remain documented limitations rather than a demonstrated critical flaw.',
      P: 'Adjusted glucose and insulin exposure contrasts support the acute direction; confidence intervals, repeated-measures analysis and an a priori power calculation were available. Small sample and uncertainty in magnitude/transportability retain Precision 1, not a sample-size-based Bias downgrade.',
      R: 'Independent Bedfordshire investigators (Bailey and Locke) tested a separate sample with the same two-minute/every-20-minute walking contrast and supported lower five-hour glucose exposure. Different population and total rather than incremental area, plus no insulin measurement, warrant partial credit under the existing anchor, not full replication of the joint glucose/insulin claim. Independent replication was not established in this assessment. This limitation concerns the complete joint proposition, not the verified partial glucose corroboration.',
    },
    limitations: ['The tested endpoint was acute exposure after a laboratory drink, not daylong glycaemic variability.', 'No inference to equivalent dietary effects, cognition or ADHD symptoms; the trial does not identify glucose production versus disposal.'],
    sources: {
      supporting: ['dunstan_sitting_breaks_2012'], contradictory: [], contextual: [],
      contradictoryAssessment: 'Bailey and Locke (2015) partially corroborates glucose, not insulin. Bailey et al. (2022) found null free-living 24-hour glucose and coefficient-of-variation effects under a different four-day regimen; this limits transportability, not the original acute contrast.',
      targetedChecks: [
        {doi: '10.2337/dc11-1931', role: 'Supporting randomised intervention', access: 'Original full article recovered through its ResearchGate copy; Methods/Results appraised', assessment: 'Allocation, masking, washout, missingness and statistics examined. Primary report: https://pmc.ncbi.nlm.nih.gov/articles/PMC3329818/ . Repository recovery: https://www.researchgate.net/publication/221870609_Breaking_Up_Prolonged_Sitting_Reduces_Postprandial_Glucose_and_Insulin_Responses'},
        {doi: '10.1016/j.jsams.2014.03.008', role: 'Supporting, independent partial corroboration of glucose only', access: 'Accepted author manuscript recovered from University of Bedfordshire repository; Methods/Results and limitations appraised', assessment: 'Separate UK team and ten-person sample, two-minute walks every 20 minutes, lower five-hour glucose area; standing was null and insulin was not measured. Not full replication of both outcomes. https://researchportal.beds.ac.uk/p/en/research-outputs/breaking-up-prolonged-sitting-with-light-intensity-walking-improv-4'},
        {doi: '10.3390/nu14030605', role: 'Contextual null evidence, not exact-protocol contradiction or replication', access: 'Scite full-text design, statistical analysis and Results appraised', assessment: 'Twelve overweight/obese adults, two four-day free-living regimens; no significant regimen effect on 24-hour mean, exposure or coefficient of variation. Non-significance is not equivalence.'},
      ], retrievalLimited: [],
    },
    recommendation: 'Keep the existing separation of acute exposure from volatility. Any practical sequence, food or preparation recommendation needs its own tested evidence.',
    history: [{date, decision: 'Initial appraisal considered only the original supporting trial. Bounded recovery then verified independent partial glucose corroboration in Bailey and Locke; Replication 1 gives final initial Codex-assessed provisional 6/8. Different-regimen free-living null evidence remains contextual.'}],
  },
];
