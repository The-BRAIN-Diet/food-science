/** Local pilot record. Never a canonical review or scientific scoring record. */
export const sf1Conclusion = 'GAD65 and GAD67 differ in their typical PLP-bound states, providing experimental evidence for distinct modes of regulating GABA synthesis. The larger apoenzyme fraction associated with GAD65 suggests potentially recruitable catalytic capacity. However, independent replication of the specific occupancy finding has not yet been established in this assessment, and the physiological importance of this proposed reserve mechanism in the human brain remains uncertain.';
export const audit = {
  recordVersion: 3,
  id: 'gaba-sf1-assessment-v1',
  pmId: 'BRS1-FM4-PM9',
  findingId: 'PM9-F1',
  recordedOn: '2026-10-17',
  lastEvidenceAssessmentDate: '2026-10-17',
  reviewer: null,
  process: 'Codex-assisted bounded assessment of four named abstracts via Scite; full experimental methods not retrieved; formal assessment unresolved',
  methodology: {
    name: 'SEC calibration rubric proposal', version: null,
    source: 'system/reviews/sec-calibration/SEC-calibration-rubric-proposal.html',
  },
  status: 'Not scored — precision and replication unresolved',
  canonicalProposition: 'GABA synthesis requires pyridoxal-5-phosphate as the glutamate decarboxylase coenzyme, and because GAD65 exists substantially as apoenzyme while GAD67 is largely holoenzyme, cofactor availability governs reserve synthesis capacity more than basal output.',
  proposition: sf1Conclusion,
  factors: {D: 1, B: 1, P: null, R: null},
  rawScore: null, adjustedScore: null,
  rationale: {
    D: '1 — Rat-brain extracts directly assess apoenzyme identity/occupancy. Recruitable physiological capacity remains an inference, particularly for the human brain. Curated reaction chemistry does not close that bridge.',
    B: '1 — The 1991 abstract reports radiolabelled PLP, multiple antisera, immunoaffinity purification, peptide mapping and selective inhibition controls. These address misidentification. Sampling, handling effects, reporting and full assay robustness remain incompletely assessed; this is an abstract-level judgement, not a full risk-of-bias review.',
    P: 'Unresolved — Reported qualitative band differences narrow the hypothesis, but sample-level variability, assay uncertainty and quantitative occupancy bounds were not verified.',
    R: 'Independent replication of the specific occupancy finding was not established in this assessment. This is not evidence that replication is absent.',
  },
  sources: {
    supporting: ['martin_regulation_1993'],
    contradictory: [],
    contradictoryAssessment: 'No contradictory evidence verified in the bounded assessment; literature-wide absence is not established.',
    contextual: ['bayoumi_vitamin_b6_deficiency_1972', 'erecinska_regulation_1996', 'zhang_decreased_carbon_2015', 'cataldo_comprehensive_2024', 'abedrabbo_classical_2026'],
    targetedChecks: [
      {doi: '10.1523/jneurosci.11-09-02725.1991', role: 'Supporting', access: 'Scite abstract only; truncated at 250 words', assessment: 'Rat regions and synaptosomes: labelled PLP plus orthogonal biochemical identification controls; supports the occupancy/apoenzyme observation, not demonstrated human reserve function.'},
      {doi: '10.1042/bj2310695', role: 'Contextual / related', access: 'Scite abstract only', assessment: 'Pig-brain alpha/beta/gamma forms differ kinetically. These forms are not automatically equivalent to GAD65/GAD67 occupancy; not a verified independent replication. Author overlap includes S. J. Wu with the 1991 study.'},
      {doi: '10.1111/j.1471-4159.1979.tb05274.x', role: 'Contextual / related', access: 'Scite abstract only', assessment: 'Rat enzyme activation responds to PLP and phosphate across preparation conditions. Supports regulation in vitro, not the exact isoform occupancy claim. Martin laboratory overlap prevents counting it as independent replication.'},
      {doi: '10.1111/j.1471-4159.1993.tb03165.x', role: 'Supporting synthesis', access: 'Scite abstract only', assessment: 'Existing review synthesises occupancy and reserve interpretation; is not a new independent experiment. GAD67 also contributes apoenzyme, preventing an absolute apo/holo dichotomy.'},
    ],
    retrievalLimited: [
      {doi: '10.1111/j.1471-4159.1991.tb08211.x', url: 'https://pubmed.ncbi.nlm.nih.gov/1988566/', limitation: 'Abstract located; full experimental methods not retrieved.'},
      {url: 'https://www.jneurosci.org/content/jneuro/11/9/2725.full.pdf', limitation: 'Full-text retrieval returned HTTP 403.'},
    ],
  },
  limitations: ['Independent replication remains unverified in this assessment.', 'Human physiological importance of the proposed reserve mechanism remains uncertain.', 'No inference of increased human brain GABA synthesis from dietary B6 above adequacy.'],
  history: [
    {date: '2026-10-17', decision: 'Version 1: distinguished evidence weakness from retrieval limitations; all four factors unresolved and formal SEC Not scored. No scientific admission changed.'},
    {date: '2026-10-17', decision: 'Version 2: targeted Scite abstract checks support provisional D1/B1. Formal P/R remain unresolved. Added conditional P1/R1 scenario yielding working estimate 4/8, not a formal score. Adopted the user-approved narrower conclusion; no admission changed.'},
    {date: '2026-10-17', decision: 'Version 3: withdrew the conditional numerical estimate from current presentation. Retained Not scored, unresolved P/R and the exact approved conclusion shared with SF1. Version 2 scenario is superseded history only.'},
  ],
  discussionUrl: null,
};

export const sf2Audit = {
  recordVersion: 1,
  id: 'gaba-sf2-assessment-v1', pmId: 'BRS1-FM4-PM9', findingId: 'PM9-F2',
  title: 'PDXK metal–nucleotide regulation',
  recordedOn: '2026-10-17', lastEvidenceAssessmentDate: '2026-10-17', reviewer: null,
  process: 'Codex-assisted bounded evidence recovery: publisher, repository and Scite checks; no expert-review completion inferred',
  methodology: {name: 'SEC calibration rubric proposal', version: null, source: 'system/reviews/sec-calibration/SEC-calibration-rubric-proposal.html'},
  status: 'Conditional SEC estimate — under calibration: 5/8 · Moderate; formal SEC Not scored',
  proposition: 'In recombinant human pyridoxal kinase (PDXK) assays, zinc was the most effective tested divalent cation under the specified in-vitro metal-to-nucleotide conditions. Activity depends on metal–nucleotide speciation and can be inhibited by pyridoxal, ZnATP and excess free zinc. These experiments do not establish physiological zinc limitation, dietary zinc responsiveness or increased human brain GABA synthesis.',
  scopeNote: 'Assessed experimental regulatory component of canonical SF2, not dietary efficacy. PDXK phosphorylation, PNPO conversion of phosphorylated intermediates and PLP use by multiple enzymes are biochemical context, not separately scored or counted as replication. Canonical SF2 is unchanged.',
  factors: {D: 2, B: null, P: null, R: null}, rawScore: null, adjustedScore: null,
  conditional: {
    factors: {D: 2, B: 1, P: 1, R: 1}, rawScore: 5, adjustedScore: 5, label: 'Moderate',
    statuses: {D: 'Established for the scoped in-vitro proposition', B: 'Conditional', P: 'Conditional', R: 'Conditional'},
    qualification: 'Conditional SEC estimate — under calibration. B1/P1/R1 require verification; this is not an approved confidence assessment.',
    caps: 'No cap triggered by proposed D2/B1/P1/R1. If verification establishes D1, B0 or P0, apply the existing provisional ceilings of 5, 2 or 4 respectively. Formal totals remain uncalculated.',
  },
  rationale: {
    D: '2 — Direct enzyme-activity and PLP-formation measurements address regulation in purified/recombinant human PDXK. This directness applies only to defined in-vitro conditions, not human diet or brain outcomes. Navarro abstract plus full-text 2020 human-enzyme experiments support this scope.',
    B: 'Conditional 1 — Recovered human-enzyme methods include purification/SDS-PAGE, direct product absorbance, controlled salts/substrates and calculated metal species; 2020 work adds site-directed mutants. Full Navarro and Lee methods, preparation-level repeats, assay linearity and speciation controls remain unverified; adequate protections in recovery papers do not automatically validate inaccessible studies.',
    P: 'Conditional 1 — Recovered 2020 results report zinc-inhibition estimates with uncertainty and disclose substrate-solubility limitations; 2007 reports assay limits at low substrate concentrations. These support a qualitative, condition-dependent effect, but uncertainty and reproducibility of Navarro’s exact metal ranking and species-response curves remain unverified. No pooled estimate or invented interval is used.',
    R: 'Conditional 1 — Lee (Korea) and Navarro (Chile) are distinct author groups with convergent abstract-level observations, but protocol equivalence and independent replication of the complete species-dependent proposition remain unverified. Musayev/di Salvo share a research lineage; 2020 shares Ramírez-Sarmiento/Guixé with Navarro. These pairs are not four independent replications. Independent replication was not established in this assessment.',
  },
  sources: {
    supporting: ['lee_human_2000', 'navarro_catalytic_2013'],
    contradictory: ['10.1016/j.pep.2004.04.021'],
    contradictoryAssessment: 'di Salvo 2004 reports MgATP preference under more physiological assay conditions; Musayev 2007 discusses zinc inhibition at pH 7.3. This challenges general zinc superiority, not zinc activity in the specified acidic/in-vitro assays. Navarro reports no catalytic contribution from free ATP species; this null result is retained. No literature-wide absence of other contradictions is asserted.',
    contextual: ['tang_crystal_2005'],
    targetedChecks: [
      {doi: '10.1016/s1016-8478(23)17501-7', role: 'Supporting; access-limited', access: 'PubMed abstract verified; full text not retrieved', assessment: 'Lee 2000: recombinant human MBP-fusion enzyme; zinc preference at pH 5.5–6.0. Metal controls and uncertainty not independently checked.'},
      {doi: '10.1007/s10534-013-9660-0', role: 'Pivotal supporting; access-limited', access: 'Publisher/Scite abstract; Springer subscription barrier', assessment: 'Navarro 2013: species-dependent activity, free-zinc activation/inhibition and substrate inhibition. Exact curves, uncertainty and complete methods unverified.'},
      {doi: '10.1074/jbc.m500805200', role: 'Contextual structural evidence; species correction', access: 'Scite full-text crystallization methods and results examined', assessment: 'Tang 2005 purified PDXK from sheep brain; roscovitine binding is not replication of human PDXK metal regulation. Preserve the paper, but flag inherited human-protein description for later canonical review.'},
      {doi: '10.1016/j.pep.2004.04.021', role: 'Challenging wider zinc-preference inference', access: 'Publisher/PubMed abstract; full text unrecovered', assessment: 'di Salvo 2004 reports MgATP preference under physiological assay conditions. Independent of Navarro, but shared lineage with Musayev 2007.'},
      {doi: '10.1110/ps.073022107', role: 'Corroborating condition dependence; contextual to exact zinc ranking', access: 'Scite full-text kinetic results and Materials and Methods examined', assessment: 'Musayev 2007: purified human enzyme, pH 7.3, MgATP/Na/K kinetic assays and structures. Saturation/assay bounds are reported; not a replication of Navarro’s full free-zinc curve.'},
      {doi: '10.3390/catal10050555', role: 'Supporting within-lineage follow-up; not independent replication', access: 'Scite full-text results and enzyme-assay methods examined', assessment: 'Ramírez-Sarmiento et al. 2020: human wild-type and DPV mutants, varying free zinc with ZnATP controlled, direct PLP measurement; reported inhibition uncertainty and solubility limits. Shares authors with Navarro; zinc chosen as an in-vitro model, not established physiological preference.'},
    ],
    retrievalLimited: [
      {doi: '10.1016/s1016-8478(23)17501-7', url: 'https://pubmed.ncbi.nlm.nih.gov/10987144/', limitation: 'Lee: Scite returned no readable text; publisher failed, KNU repository supplied metadata/abstract, ResearchGate full-text PDF fetch failed. Missing metal/speciation controls and preparation-level uncertainty affect B/P/R. Corroboration: Musayev 2007 and 2020 full-text experiments; neither replaces the exact Lee methods.'},
      {doi: '10.1007/s10534-013-9660-0', url: 'https://link.springer.com/article/10.1007/s10534-013-9660-0', limitation: 'Navarro: Scite abstract only, publisher subscription barrier; author/repository search and AECID/ResearchGate recovery did not yield accessible full text. Missing species-calculation validation, comparative curves and replicate uncertainty affect B/P/R. Full-text 2020 same-lineage work corroborates inhibition but cannot establish independent replication.'},
      {doi: '10.1016/j.pep.2004.04.021', url: 'https://pubmed.ncbi.nlm.nih.gov/15249053/', limitation: 'di Salvo: publisher full text failed; Scite no text; Rome repository indexed abstract with no attached file, ResearchGate requests full text. Missing exact comparative protocol/uncertainty affects P/R. Musayev 2007 recovers related methods within the same lineage.'},
    ],
  },
  limitations: ['Pivotal Lee/Navarro full methods and exact uncertainty remain unverified; B/P/R are conditional.', 'No human dietary zinc/B6, physiological PLP-availability or brain GABA effect is established by these assays.'],
  recommendation: 'For later scientific review only: clarify PNPO’s role after PN/PM phosphorylation; identify Tang’s sheep-brain preparation; qualify zinc ranking by assay/speciation conditions and discuss MgATP evidence. No canonical rewrite was performed.',
  stoppingRationale: 'Stopped after three pivotal studies, two independent-lineage recovery studies and one same-lineage follow-up; forward Scite screening identified other-organism, clinical-proxy or different-regulator studies, not verified replications of the exact proposition. Remaining access gaps are explicit and further generic searching is unlikely to resolve them efficiently.',
  history: [{date: '2026-10-17', decision: 'Initial bounded SF2 synthesis: D2 established for in-vitro scope; B1/P1/R1 conditional. Conditional raw/adjusted 5/8; formal totals withheld. No dietary or PM-wide confidence transfer.'}],
  discussionUrl: null,
};

export function isAuditPreview(path) {
  return String(path).replace(/\/$/, '') === '/docs/system/sec-calibration/gaba';
}
