// Isolated pilot assessments; no canonical registrations or scientific admissions.
export const sameAudits = [
  {
    "pmId": "BRS2-FM1-PM3",
    "recordVersion": 1,
    "lastEvidenceAssessmentDate": "2026-10-18",
    "assessmentStatus": "not-scored",
    "humanReview": null,
    "reviewer": null,
    "process": "Codex SEC Pilot 3: bounded primary Results/Methods appraisal, Scite citation screening and curated-record verification; version 1; no human review",
    "methodology": {
      "name": "Existing SEC calibration rubric proposal",
      "version": null,
      "source": "system/reviews/sec-calibration/SEC-calibration-rubric-proposal.html"
    },
    "factors": {
      "D": null,
      "B": null,
      "P": null,
      "R": null
    },
    "rawScore": null,
    "adjustedScore": null,
    "id": "same-pm3-f1-assessment-v1",
    "findingId": "PM3-F1",
    "title": "MAT converts methionine and ATP into SAMe",
    "canonicalProposition": "MAT-dependent SAMe synthesis directly requires methionine and ATP and uses active-site magnesium and potassium ions to support ATP-dependent catalysis.",
    "proposition": "MAT-dependent SAMe synthesis directly requires methionine and ATP and uses active-site magnesium and potassium ions to support ATP-dependent catalysis.",
    "unscoredReason": "Curated biochemical provenance",
    "scopeNote": "Proposed removal of elementary chemistry from headline Scientific Findings, not deletion of its evidence or ID. Substrate-binding order is a separate experimental claim: Bailey 2021 supports ATP-first order, whereas DOI 10.1021/acs.biochem.0c00998 supports rapid-equilibrium random binding. Do not present reaction-order convergence as established.",
    "rationale": {
      "D": "No numerical factor assigned: this record is curated chemistry, an interpretive constraint or a bounded evidence-scope gap, not an experimentally supported phenome proposition.",
      "B": "Not scored; no zero or default value inferred from missing appraisal.",
      "P": "Not scored; absence of a matched endpoint is not a measured null effect.",
      "R": "Independent replication was not established in this assessment. Curated database agreement and reviews do not count as experimental replication."
    },
    "limitations": [
      "Elementary chemistry is established; the conflicting substrate-order models remain unresolved in this bounded synthesis.",
      "No inference to human nutrient-responsive SAMe enhancement, brain flux or ADHD benefit."
    ],
    "sources": {
      "supporting": [
        "bailey_human_mat2a_2021",
        "murray_crystallography_2016"
      ],
      "contextual": [],
      "contradictory": [],
      "contradictoryAssessment": "Human MAT2A kinetic studies disagree about substrate order; database annotations do not adjudicate this disagreement.",
      "targetedChecks": [
        {
          "doi": "10.1021/acs.biochem.1c00672",
          "role": "Supporting experimental stability evidence",
          "access": "Scite full text; enzyme-assay Methods, inhibition, binding and stability Results appraised",
          "assessment": "Purified human MAT2A lost activity during substrate-free incubation at 37 C; MAT2B preserved activity. Coupled phosphate and direct LC-MS assays distinguish stability from steady-state kinetic effects. Activity half-life about 2.3 minutes without MAT2B; activity retained over the 120-minute experiment with MAT2B. Technical repeats do not constitute independent replication."
        },
        {
          "doi": "10.1021/acs.biochem.0c00998",
          "role": "Contradictory substrate-order model; contextual to stability",
          "access": "Scite full-text human MAT2A kinetic Results appraised",
          "assessment": "Steady-state, stopped-flow and isotope-exchange evidence supports rapid-equilibrium random substrate binding, conflicting with Bailey's ATP-first model. Retained as a distinct unresolved kinetic issue, not evidence against MAT2B-mediated stability."
        }
      ],
      "retrievalLimited": []
    },
    "history": [
      {
        "date": "2026-10-18",
        "decision": "Version 1: original canonical proposition retained in audit; no canonical edits, scientific rejection or numerical zero. Presentation disposition proposed only."
      }
    ],
    "canonicalRecord": {
      "id": "PM3-F1",
      "finding_label": "MAT converts methionine and ATP into SAMe",
      "presentation": "mechanistic-basis",
      "fm_rollup": true,
      "finding_summary": "Human methionine adenosyltransferase (MAT) forms SAMe from methionine and ATP. Catalysis uses coordinated magnesium and potassium ions in the active site, while human MAT2A kinetics indicate ordered ATP-first substrate binding.",
      "finding_interpretation": "This establishes the biochemical reaction and its direct requirements. It does not establish that increasing dietary methionine, magnesium or potassium increases SAMe synthesis in adequately nourished humans; ATP is an intracellular biochemical substrate, not a dietary lever.",
      "finding_statement": "MAT-dependent SAMe synthesis directly requires methionine and ATP and uses active-site magnesium and potassium ions to support ATP-dependent catalysis.",
      "synthesised_evidence_confidence": "not-yet-scored",
      "synthesis": "Human MAT structural and kinetic studies converge on a defined reaction boundary: MAT catalyses SAMe formation from L-methionine and ATP, with ATP binding before methionine in MAT2A and with divalent magnesium plus potassium coordinating the phosphate chemistry. The studies directly establish enzyme mechanism and substrate/ion requirements. They do not test ordinary dietary modulation, human in-vivo synthesis flux, or downstream methyltransferase outcomes.",
      "synthesis_limitations": "The primary evidence uses purified recombinant protein and crystallised human enzyme rather than intact human physiology. Active-site ion requirements do not show that physiological magnesium or potassium availability ordinarily limits MAT activity. The studies do not establish a methionine intake-response relationship, a clinically meaningful reserve-capacity threshold, or a phenome outcome.",
      "evidence_considered": [
        {
          "label": "Bailey et al. (2021)",
          "citation_key": "bailey_human_mat2a_2021",
          "href": "/docs/papers/BRAIN-Diet-References#bailey_human_mat2a_2021",
          "data_level": "Cellular / Molecular",
          "evidence_source": "bounded-external-search",
          "directional_finding": "Purified human MAT2A followed an ordered ATP-first, methionine-second kinetic mechanism; MAT2B stabilised the enzyme without materially changing the tested catalytic parameters.",
          "assessment": {
            "study": "Purified recombinant human MAT2A steady-state kinetics, product/dead-end inhibition and isothermal titration calorimetry, with and without MAT2B.",
            "population": "Purified human MAT2A/MAT2B proteins; no cells, animals or human participants.",
            "result": "ATP bound before methionine; SAM was released before phosphate and pyrophosphate. MAT2B bound tightly and stabilised low-concentration MAT2A but did not significantly change the tested kinetic parameters.",
            "effect_magnitude": "ATP Kd 80 ± 30 μM and Km 50 ± 10 μM; MAT2B Kd 6 ± 1 nM. No significant catalytic-parameter change under saturating MAT2B conditions.",
            "evidence_summary": "Direct human-enzyme evidence for the ordered MAT2A reaction and distinction between catalytic activity and MAT2B-mediated stability.",
            "limitations": "In-vitro purified-enzyme conditions do not establish in-vivo flux limitation, dietary responsiveness, tissue-specific regulation or phenome effects."
          }
        },
        {
          "label": "Murray et al. (2016)",
          "citation_key": "murray_crystallography_2016",
          "href": "/docs/papers/BRAIN-Diet-References#murray_crystallography_2016",
          "data_level": "Cellular / Molecular",
          "evidence_source": "bounded-external-search",
          "directional_finding": "High-resolution human MATα2 structures captured substrates/products and active-site ion coordination across ATP-driven SAMe formation.",
          "assessment": {
            "study": "X-ray crystallography of human MATα2 with methionine, ATP analogues, SAMe, adenosine and phosphate-state ligands.",
            "population": "Purified crystallised human MATα2 protein; no cells, animals or human participants.",
            "result": "Structures captured methionine repositioning toward ATP C5′, SAMe/product states and phosphate-group coordination by magnesium and potassium ions.",
            "effect_magnitude": "Structures ranged from 1.1 Å to 2.34 Å resolution; no physiological effect size applies.",
            "evidence_summary": "Direct structural support for the reaction chemistry and catalytic-ion requirement of human MAT.",
            "limitations": "Static ligand-bound structures establish catalytic geometry, not physiological nutrient limitation, in-vivo reaction rate, dietary dose response or clinical outcome."
          }
        }
      ],
      "connected_supportive_evidence": [
        {
          "label": "Chiang et al. (1996)",
          "citation_key": "chiang_s-adenosylmethionine_1996",
          "href": "/docs/papers/BRAIN-Diet-References#chiang_s-adenosylmethionine_1996",
          "data_level": "Mechanistic",
          "why_relevant": "Foundational review establishes SAMe as a major methyl donor and places MAT synthesis upstream of transmethylation.",
          "why_excluded": "It is a broad methylation review and does not independently quantify human MAT kinetics, active-site ion requirements or dietary control of synthesis flux."
        },
        {
          "label": "Corrillero Bravo et al. (2022)",
          "citation_key": "corrillero_bravo_analysis_2022",
          "href": "/docs/papers/BRAIN-Diet-References#corrillero_bravo_analysis_2022",
          "data_level": "Human Mechanistic",
          "why_relevant": "Measured circulating SAM, SAH and SAM:SAH after contrasting four-week dietary patterns in healthy adults.",
          "why_excluded": "The biomarkers do not isolate MAT synthesis flux; group trajectories were similar, so the study does not establish a dietary lever for PM3."
        }
      ]
    }
  },
  {
    "pmId": "BRS2-FM1-PM3",
    "recordVersion": 1,
    "lastEvidenceAssessmentDate": "2026-10-18",
    "assessmentStatus": "not-scored",
    "humanReview": null,
    "reviewer": null,
    "process": "Codex SEC Pilot 3: bounded primary Results/Methods appraisal, Scite citation screening and curated-record verification; version 1; no human review",
    "methodology": {
      "name": "Existing SEC calibration rubric proposal",
      "version": null,
      "source": "system/reviews/sec-calibration/SEC-calibration-rubric-proposal.html"
    },
    "factors": {
      "D": null,
      "B": null,
      "P": null,
      "R": null
    },
    "rawScore": null,
    "adjustedScore": null,
    "id": "same-pm3-ic1-assessment-v1",
    "findingId": "PM3-IC1",
    "title": "SAM and SAM:SAH are pool-state markers, not synthesis-flux measures",
    "canonicalProposition": "Measured SAM concentration and the SAM:SAH ratio reflect the balance of synthesis, methyl-group utilisation, SAH formation and clearance and therefore cannot by themselves identify MAT-dependent SAMe synthesis capacity.",
    "proposition": "Measured SAM concentration and the SAM:SAH ratio reflect the balance of synthesis, methyl-group utilisation, SAH formation and clearance and therefore cannot by themselves identify MAT-dependent SAMe synthesis capacity.",
    "unscoredReason": "Interpretive constraint",
    "scopeNote": "Retained interpretive constraint, not a headline Scientific Finding. Pool concentration and synthesis flux are different constructs.",
    "rationale": {
      "D": "No numerical factor assigned: this record is curated chemistry, an interpretive constraint or a bounded evidence-scope gap, not an experimentally supported phenome proposition.",
      "B": "Not scored; no zero or default value inferred from missing appraisal.",
      "P": "Not scored; absence of a matched endpoint is not a measured null effect.",
      "R": "Independent replication was not established in this assessment. Curated database agreement and reviews do not count as experimental replication."
    },
    "limitations": [
      "Circulating SAM and SAM:SAH are not direct measurements of MAT synthesis flux.",
      "No inference to human nutrient-responsive SAMe enhancement, brain flux or ADHD benefit."
    ],
    "sources": {
      "supporting": [
        "corrillero_bravo_analysis_2022"
      ],
      "contextual": [],
      "contradictory": [],
      "contradictoryAssessment": "No matched contradictory experiment verified; this does not establish literature-wide absence.",
      "targetedChecks": [],
      "retrievalLimited": []
    },
    "history": [
      {
        "date": "2026-10-18",
        "decision": "Version 1: original canonical proposition retained in audit; no canonical edits, scientific rejection or numerical zero. Presentation disposition proposed only."
      }
    ],
    "canonicalRecord": {
      "id": "PM3-IC1",
      "finding_label": "SAM and SAM:SAH are pool-state markers, not synthesis-flux measures",
      "presentation": "interpretive-constraint",
      "finding_statement": "Measured SAM concentration and the SAM:SAH ratio reflect the balance of synthesis, methyl-group utilisation, SAH formation and clearance and therefore cannot by themselves identify MAT-dependent SAMe synthesis capacity.",
      "synthesised_evidence_confidence": "not-yet-scored",
      "synthesis": "SAM concentration is a metabolite-pool measurement. The SAM:SAH ratio is commonly interpreted as a methylation index because SAM supplies methyl groups while SAH inhibits methyltransferases. Both values integrate production and consumption processes; neither is a direct MAT flux assay. Careful sample handling is also material because SAM is unstable under neutral and alkaline conditions.",
      "synthesis_limitations": "The principal source is a methods and profiling study, not a formal validation against isotope-traced MAT flux. The ratio may be useful for methyl-group homeostasis and inherited-metabolism assessment, but its exact meaning varies by biological matrix, compartment and pre-analytical handling.",
      "evidence_considered": [
        {
          "label": "Corrillero Bravo et al. (2022)",
          "citation_key": "corrillero_bravo_analysis_2022",
          "href": "/docs/papers/BRAIN-Diet-References#corrillero_bravo_analysis_2022",
          "data_level": "Human Mechanistic",
          "evidence_source": "bounded-external-search",
          "directional_finding": "Validated SAM/SAH measurement as a pool/homeostasis readout and found no differential change after four-week vegan versus meat-rich dietary assignment in healthy adults.",
          "assessment": {
            "study": "LC-MS/MS method optimisation plus a randomised four-week vegan-versus-meat-rich dietary intervention.",
            "population": "Method reference cohort of 33 healthy adults and dietary intervention cohort of 53 healthy adult omnivores aged 18–60 years.",
            "result": "The method quantified low-nanomolar SAM and SAH across matrices; plasma and urinary SAM, SAH and SAM:SAH showed similar baseline-to-end changes in both diet groups.",
            "effect_magnitude": "Healthy plasma reference ranges were SAM 120 ± 36 nM and SAH 21.5 ± 6.5 nM (mean ± 2 SD); no between-diet synthesis-flux effect was measured.",
            "evidence_summary": "Direct evidence that SAM/SAH are measurable pool-state biomarkers and that short-term dietary pattern contrast did not establish PM3 modulation.",
            "limitations": "Small healthy-adult cohorts, four-week duration, circulating/urinary pools rather than tissue-specific MAT flux, and no cognitive or emotional outcome measurement."
          }
        }
      ]
    }
  },
  {
    "pmId": "BRS2-FM1-PM3",
    "recordVersion": 1,
    "lastEvidenceAssessmentDate": "2026-10-18",
    "assessmentStatus": "not-scored",
    "humanReview": null,
    "reviewer": null,
    "process": "Codex SEC Pilot 3: bounded primary Results/Methods appraisal, Scite citation screening and curated-record verification; version 1; no human review",
    "methodology": {
      "name": "Existing SEC calibration rubric proposal",
      "version": null,
      "source": "system/reviews/sec-calibration/SEC-calibration-rubric-proposal.html"
    },
    "factors": {
      "D": null,
      "B": null,
      "P": null,
      "R": null
    },
    "rawScore": null,
    "adjustedScore": null,
    "id": "same-pm3-f2-assessment-v1",
    "findingId": "PM3-F2",
    "title": "Mood-treatment evidence does not test endogenous SAMe synthesis",
    "canonicalProposition": "The repository-attached mood-disorder evidence does not directly demonstrate an effect of endogenous MAT-dependent SAMe synthesis capacity on Emotional Regulation.",
    "proposition": "The repository-attached mood-disorder evidence does not directly demonstrate an effect of endogenous MAT-dependent SAMe synthesis capacity on Emotional Regulation.",
    "unscoredReason": "Proposition not directly tested",
    "scopeNote": "Retained bounded assessment gap, not a literature-wide conclusion of no biological effect.",
    "rationale": {
      "D": "No numerical factor assigned: this record is curated chemistry, an interpretive constraint or a bounded evidence-scope gap, not an experimentally supported phenome proposition.",
      "B": "Not scored; no zero or default value inferred from missing appraisal.",
      "P": "Not scored; absence of a matched endpoint is not a measured null effect.",
      "R": "Independent replication was not established in this assessment. Curated database agreement and reviews do not count as experimental replication."
    },
    "limitations": [
      "Insufficient evidence was identified in this assessment to score a direct endogenous MAT-capacity effect on the named phenome.",
      "No inference to human nutrient-responsive SAMe enhancement, brain flux or ADHD benefit."
    ],
    "sources": {
      "supporting": [
        "cicero_combined_2022"
      ],
      "contextual": [],
      "contradictory": [],
      "contradictoryAssessment": "No matched contradictory experiment verified; this does not establish literature-wide absence.",
      "targetedChecks": [],
      "retrievalLimited": []
    },
    "history": [
      {
        "date": "2026-10-18",
        "decision": "Version 1: original canonical proposition retained in audit; no canonical edits, scientific rejection or numerical zero. Presentation disposition proposed only."
      }
    ],
    "canonicalRecord": {
      "id": "PM3-F2",
      "finding_label": "Mood-treatment evidence does not test endogenous SAMe synthesis",
      "presentation": "phenome-relationship",
      "primary_phenome": "Emotional Regulation",
      "finding_summary": "The attached clinical literature discusses exogenous SAMe, folate and vitamin B12 in mood disorders. That intervention context does not test whether endogenous methionine-to-SAMe synthesis through MAT modulates emotional regulation.",
      "finding_interpretation": "The Emotional Regulation relationship is biologically plausible downstream of methyl-donor chemistry but remains indirect for this PM.",
      "finding_statement": "The repository-attached mood-disorder evidence does not directly demonstrate an effect of endogenous MAT-dependent SAMe synthesis capacity on Emotional Regulation.",
      "synthesised_evidence_confidence": "not-yet-scored",
      "synthesis": "The attached review supports clinical interest in administered SAMe and combined one-carbon nutrients for mood disorders, but its intervention construct is exogenous treatment and its outcomes are mood symptoms. It does not manipulate MAT, quantify endogenous SAMe synthesis flux, or isolate PM3 from upstream folate/B12 remethylation and downstream methyltransferase biology. The PM3-to-Emotional Regulation proposition is therefore an inferred downstream bridge rather than a directly demonstrated relationship.",
      "synthesis_limitations": "This is an adjudicated gap within the bounded attached corpus, not proof that no relationship exists. The source is a narrative clinical review, mixes interventions and pathway levels, and does not provide a PM3-specific causal test.",
      "evidence_considered": [
        {
          "label": "Cicero and Minervino (2022)",
          "citation_key": "cicero_combined_2022",
          "href": "/docs/papers/BRAIN-Diet-References#cicero_combined_2022",
          "data_level": "Human Outcome",
          "evidence_source": "repository-inherited",
          "directional_finding": "Reviews exogenous SAMe with folate/B12 in mood-disorder treatment but does not measure MAT activity or endogenous SAMe synthesis flux."
        }
      ]
    }
  },
  {
    "pmId": "BRS2-FM1-PM3",
    "recordVersion": 1,
    "lastEvidenceAssessmentDate": "2026-10-18",
    "assessmentStatus": "not-scored",
    "humanReview": null,
    "reviewer": null,
    "process": "Codex SEC Pilot 3: bounded primary Results/Methods appraisal, Scite citation screening and curated-record verification; version 1; no human review",
    "methodology": {
      "name": "Existing SEC calibration rubric proposal",
      "version": null,
      "source": "system/reviews/sec-calibration/SEC-calibration-rubric-proposal.html"
    },
    "factors": {
      "D": null,
      "B": null,
      "P": null,
      "R": null
    },
    "rawScore": null,
    "adjustedScore": null,
    "id": "same-pm3-f3-assessment-v1",
    "findingId": "PM3-F3",
    "title": "Cognitive relevance is downstream, not a direct MAT-synthesis result",
    "canonicalProposition": "The repository-attached methylation evidence establishes SAMe's donor role but does not directly demonstrate that endogenous MAT-dependent SAMe synthesis capacity modulates Cognitive Clarity.",
    "proposition": "The repository-attached methylation evidence establishes SAMe's donor role but does not directly demonstrate that endogenous MAT-dependent SAMe synthesis capacity modulates Cognitive Clarity.",
    "unscoredReason": "Proposition not directly tested",
    "scopeNote": "Retained bounded assessment gap, not a literature-wide conclusion of no biological effect.",
    "rationale": {
      "D": "No numerical factor assigned: this record is curated chemistry, an interpretive constraint or a bounded evidence-scope gap, not an experimentally supported phenome proposition.",
      "B": "Not scored; no zero or default value inferred from missing appraisal.",
      "P": "Not scored; absence of a matched endpoint is not a measured null effect.",
      "R": "Independent replication was not established in this assessment. Curated database agreement and reviews do not count as experimental replication."
    },
    "limitations": [
      "Insufficient evidence was identified in this assessment to score a direct endogenous MAT-capacity effect on the named phenome.",
      "No inference to human nutrient-responsive SAMe enhancement, brain flux or ADHD benefit."
    ],
    "sources": {
      "supporting": [
        "chiang_s-adenosylmethionine_1996"
      ],
      "contextual": [],
      "contradictory": [],
      "contradictoryAssessment": "No matched contradictory experiment verified; this does not establish literature-wide absence.",
      "targetedChecks": [],
      "retrievalLimited": []
    },
    "history": [
      {
        "date": "2026-10-18",
        "decision": "Version 1: original canonical proposition retained in audit; no canonical edits, scientific rejection or numerical zero. Presentation disposition proposed only."
      }
    ],
    "canonicalRecord": {
      "id": "PM3-F3",
      "finding_label": "Cognitive relevance is downstream, not a direct MAT-synthesis result",
      "presentation": "phenome-relationship",
      "primary_phenome": "Cognitive Clarity",
      "finding_summary": "SAMe supplies methyl groups to many neural pathways, but the attached evidence does not directly connect MAT-dependent SAMe synthesis capacity with Cognitive Clarity.",
      "finding_interpretation": "General dependence of cognition-relevant pathways on methyl donors must not be presented as direct phenome evidence for PM3.",
      "finding_statement": "The repository-attached methylation evidence establishes SAMe's donor role but does not directly demonstrate that endogenous MAT-dependent SAMe synthesis capacity modulates Cognitive Clarity.",
      "synthesised_evidence_confidence": "not-yet-scored",
      "synthesis": "The foundational review establishes SAMe as a central methyl donor used in numerous downstream reactions. That broad biochemical role supports plausibility but does not isolate MAT synthesis capacity, measure cognitive clarity, or show that changing synthesis flux changes a cognitive outcome. The PM3-to-Cognitive Clarity relationship therefore remains a mechanistic inference with a direct-evidence gap.",
      "synthesis_limitations": "This conclusion is bounded to the attached corpus plus targeted construct clarification. It does not exclude cognitive consequences in severe inherited disorders or downstream methylation studies; those contexts would not by themselves establish ordinary PM3 modulation.",
      "evidence_considered": [
        {
          "label": "Chiang et al. (1996)",
          "citation_key": "chiang_s-adenosylmethionine_1996",
          "href": "/docs/papers/BRAIN-Diet-References#chiang_s-adenosylmethionine_1996",
          "data_level": "Mechanistic",
          "evidence_source": "repository-inherited",
          "directional_finding": "Establishes SAMe as a principal methyl donor across downstream chemistry but does not measure Cognitive Clarity or endogenous MAT synthesis flux."
        }
      ]
    }
  },
  {
    "pmId": "BRS2-FM1-PM3",
    "recordVersion": 1,
    "lastEvidenceAssessmentDate": "2026-10-18",
    "assessmentStatus": "not-scored",
    "humanReview": null,
    "reviewer": null,
    "process": "Codex SEC Pilot 3: bounded primary Results/Methods appraisal, Scite citation screening and curated-record verification; version 1; no human review",
    "methodology": {
      "name": "Existing SEC calibration rubric proposal",
      "version": null,
      "source": "system/reviews/sec-calibration/SEC-calibration-rubric-proposal.html"
    },
    "factors": {
      "D": null,
      "B": null,
      "P": null,
      "R": null
    },
    "rawScore": null,
    "adjustedScore": null,
    "id": "same-pm3-f4-assessment-v1",
    "findingId": "PM3-F4",
    "title": "Upstream donor routes regenerate methionine for SAMe synthesis",
    "canonicalProposition": "Folate and betaine remethylation regenerate methionine upstream of MAT-dependent SAMe formation; choline can contribute through betaine.",
    "proposition": "Folate and betaine remethylation regenerate methionine upstream of MAT-dependent SAMe formation; choline can contribute through betaine.",
    "unscoredReason": "Curated biochemical provenance",
    "scopeNote": "Proposed curated upstream-route provenance, not a new dietary admission. Methionine synthase and BHMT regenerate methionine; choline oxidation supplies betaine through a multistep route. Tissue specificity and conversion are not evidence of extra-intake enhancement.",
    "rationale": {
      "D": "No numerical factor assigned: this record is curated chemistry, an interpretive constraint or a bounded evidence-scope gap, not an experimentally supported phenome proposition.",
      "B": "Not scored; no zero or default value inferred from missing appraisal.",
      "P": "Not scored; absence of a matched endpoint is not a measured null effect.",
      "R": "Independent replication was not established in this assessment. Curated database agreement and reviews do not count as experimental replication."
    },
    "limitations": [
      "Pathway availability does not establish increased MAT flux from additional folate, betaine or choline.",
      "No inference to human nutrient-responsive SAMe enhancement, brain flux or ADHD benefit."
    ],
    "sources": {
      "supporting": [
        "froese_vitamin_2019",
        "obeid_metabolic_2013",
        "bailey_human_mat2a_2021",
        "evans_betaine_2002",
        "salvi_choline_2013"
      ],
      "contextual": [],
      "contradictory": [],
      "contradictoryAssessment": "No matched contradictory experiment verified; this does not establish literature-wide absence.",
      "targetedChecks": [],
      "retrievalLimited": []
    },
    "history": [
      {
        "date": "2026-10-18",
        "decision": "Version 1: original canonical proposition retained in audit; no canonical edits, scientific rejection or numerical zero. Presentation disposition proposed only."
      }
    ],
    "canonicalRecord": {
      "id": "PM3-F4",
      "finding_label": "Upstream donor routes regenerate methionine for SAMe synthesis",
      "finding_summary": "Folate-dependent methionine synthase and betaine-dependent BHMT regenerate methionine from homocysteine. Choline can supply betaine. MAT then uses methionine and ATP to form SAMe.",
      "finding_interpretation": "This establishes connected precursor provision. It does not make folate, betaine or choline MAT reactants, demonstrate that more intake raises synthesis, or resolve a donor-inadequacy constraint on MAT capacity.",
      "finding_statement": "Folate and betaine remethylation regenerate methionine upstream of MAT-dependent SAMe formation; choline can contribute through betaine.",
      "presentation": "mechanistic-basis",
      "fm_rollup": false,
      "synthesised_evidence_confidence": "not-yet-scored",
      "synthesis": "Existing reviewed PM1-F1, PM2-F1/PM2-F2 and PM3-F1 establish the successive reaction identities. Folate provides 5-methyltetrahydrofolate for B12-dependent methionine synthase, while betaine supplies the alternative BHMT reaction, predominantly in liver and kidney. Choline oxidation can supply betaine. The regenerated methionine is available to the MAT reaction. Evidence supports the route, without requiring each donor to act directly on MAT.",
      "synthesis_limitations": "Tissue expression, alternative methionine supply and pathway compensation limit generalisation. SAMe and SAM:SAH are pool-state measurements rather than isolated synthesis rates. No established limiting effect on MAT capacity or nutrient-replete intake benefit is claimed.",
      "evidence_considered": [
        {
          "label": "Froese et al. (2019)",
          "citation_key": "froese_vitamin_2019",
          "href": "/docs/papers/BRAIN-Diet-References#froese_vitamin_2019",
          "data_level": "Mechanistic",
          "evidence_source": "repository-inherited",
          "directional_finding": "Establishes folate/B12 remethylation and placement before MAT synthesis; reviewed on PM1-F1."
        },
        {
          "label": "Obeid (2013)",
          "citation_key": "obeid_metabolic_2013",
          "href": "/docs/papers/BRAIN-Diet-References#obeid_metabolic_2013",
          "data_level": "Mechanistic",
          "evidence_source": "repository-inherited",
          "directional_finding": "Establishes betaine donation and choline provision in connected remethylation; reviewed on PM2-F1/F2."
        },
        {
          "label": "Bailey et al. (2021)",
          "citation_key": "bailey_human_mat2a_2021",
          "href": "/docs/papers/BRAIN-Diet-References#bailey_human_mat2a_2021",
          "data_level": "Mechanistic",
          "evidence_source": "repository-inherited",
          "directional_finding": "Establishes methionine and ATP use in human MAT2A; reviewed on PM3-F1."
        },
        {
          "label": "Evans et al. (2002)",
          "citation_key": "evans_betaine_2002",
          "href": "/docs/papers/BRAIN-Diet-References#evans_betaine_2002",
          "data_level": "Cellular / Molecular",
          "evidence_source": "repository-inherited",
          "directional_finding": "Human BHMT reaction identity; supports betaine-to-methionine provision, not dietary MAT responsiveness."
        },
        {
          "label": "Salvi and Gadda (2013)",
          "citation_key": "salvi_choline_2013",
          "href": "/docs/papers/BRAIN-Diet-References#salvi_choline_2013",
          "data_level": "Cellular / Molecular",
          "evidence_source": "repository-inherited",
          "directional_finding": "Choline oxidation through betaine aldehyde to betaine; supports route identity, not MAT flux."
        }
      ],
      "connected_supportive_evidence": [],
      "informs": [],
      "evidence_dependency": [
        "Bailey et al. (2021) is reused from PM3-F1 to identify MAT substrate use; it is not independent supply-chain or dietary-response evidence."
      ]
    }
  },
  {
    "pmId": "BRS2-FM1-PM3",
    "recordVersion": 1,
    "lastEvidenceAssessmentDate": "2026-10-18",
    "assessmentStatus": "codex-provisional",
    "humanReview": null,
    "reviewer": null,
    "process": "Codex SEC Pilot 3: bounded primary Results/Methods appraisal, Scite citation screening and curated-record verification; version 1; no human review",
    "methodology": {
      "name": "Existing SEC calibration rubric proposal",
      "version": null,
      "source": "system/reviews/sec-calibration/SEC-calibration-rubric-proposal.html"
    },
    "factors": {
      "D": 2,
      "B": 1,
      "P": 1,
      "R": 1
    },
    "rawScore": 5,
    "adjustedScore": 5,
    "id": "same-pm3-f5-assessment-v1",
    "findingId": "PM3-F5",
    "title": "MAT2B and MAT2A stability — proposed Finding",
    "proposition": "MAT2B association can preserve MAT2A protein or catalytic stability in purified-human-enzyme and mammalian-cell experiments. This supports a stability contribution to enzyme regulation, not an exclusive explanation of MAT2B action or a demonstrated increase in human SAMe synthesis flux.",
    "canonicalProposition": null,
    "assessmentComplete": true,
    "factorStates": {
      "D": "established",
      "B": "established",
      "P": "established",
      "R": "established"
    },
    "capRationale": "No existing cap triggered by Directness 2, Bias Protection 1, Precision 1 and Replication 1. Raw and adjusted 5/8. No extra decrement for model boundaries.",
    "scopeNote": "Preview-only proposed synthesis of an experimental component already present in F1's supporting evidence, with independently recovered cellular corroboration. Not a canonical Finding or dietary lever. Activity preservation and protein stability are related but non-identical endpoints.",
    "rationale": {
      "D": "Both experiments directly test the explicitly model-bounded stability proposition. No bridge to human brain flux or nutritional response is included; those propositions are excluded rather than silently scored.",
      "B": "Orthogonal activity readouts, protein identity/binding assays, cell depletion/knockout and wild-type/mutant rescue offer meaningful protection. Representative blots, limited independently quantified preparation counts and incompletely reported masking retain Bias Protection 1; these are not proof of a critical flaw.",
      "P": "Activity-decay time courses and protein-chase contrasts support a stability contribution. Cellular results are largely representative repeated blots, with no harmonised stability effect interval across models. Precision 1 concerns magnitude and boundary uncertainty, not an invented sample-size threshold.",
      "R": "The Bailey and 2024 cell-study author groups are separate; both support a stability contribution using different models/endpoints. This is partial independent corroboration, not two exact-endpoint replications. Replication 1, not 2. Independent replication was not established in this assessment. This qualification concerns an identical model and stability endpoint, not the verified partial corroboration."
    },
    "limitations": [
      "Partial cross-model corroboration does not quantify MAT2B-dependent stability or SAMe flux in the human brain.",
      "Does not establish that stability is the only MAT2B mechanism: allosteric/catalytic interpretations remain relevant.",
      "No dietary methionine, folate, betaine, choline or ADHD intervention effect was assessed."
    ],
    "sources": {
      "supporting": [
        "bailey_human_mat2a_2021"
      ],
      "contextual": [],
      "contradictory": [],
      "contradictoryAssessment": "No experiment falsifying the scoped stability contribution was verified. Alternative catalytic/allosteric mechanisms challenge an exclusive stability-only claim, which is explicitly not the assessed proposition.",
      "targetedChecks": [
        {
          "doi": "10.1021/acs.biochem.1c00672",
          "role": "Supporting experimental stability evidence",
          "access": "Scite full text; enzyme-assay Methods, inhibition, binding and stability Results appraised",
          "assessment": "Purified human MAT2A lost activity during substrate-free incubation at 37 C; MAT2B preserved activity. Coupled phosphate and direct LC-MS assays distinguish stability from steady-state kinetic effects. Activity half-life about 2.3 minutes without MAT2B; activity retained over the 120-minute experiment with MAT2B. Technical repeats do not constitute independent replication."
        },
        {
          "doi": "10.1038/s41419-024-07093-8",
          "role": "Independent partial corroboration of protein stability",
          "access": "Scite full text; cell perturbation/rescue Results and cycloheximide-chase Methods appraised",
          "assessment": "Separate research group: depletion, knockout and wild-type versus binding-domain-mutant rescue support MAT2B-dependent MAT2A protein stability in mammalian cell models. Protein abundance/chase differs from purified-enzyme activity decay. Mostly representative blots with two or three repeats; no pooled half-life or universal flux effect is claimed. Later tumour/diet experiments do not establish a nutritional PM recommendation."
        },
        {
          "doi": "10.1107/S2052252526005075",
          "role": "Contextual structural/allosteric interpretation; challenges stability-only explanations",
          "access": "Scite full-text conformational Results, Discussion and construct Methods appraised",
          "assessment": "CryoEM conformers suggest additional allosteric regulation. Catalytic-activity arguments partly reuse earlier experiments; this is not independent replication of the stability endpoint. Does not refute a stability contribution or establish that all MAT2B effects are stability alone."
        },
        {
          "doi": "10.1021/acs.biochem.0c00998",
          "role": "Contradictory substrate-order model; contextual to stability",
          "access": "Scite full-text human MAT2A kinetic Results appraised",
          "assessment": "Steady-state, stopped-flow and isotope-exchange evidence supports rapid-equilibrium random substrate binding, conflicting with Bailey's ATP-first model. Retained as a distinct unresolved kinetic issue, not evidence against MAT2B-mediated stability."
        }
      ],
      "retrievalLimited": [
        {
          "doi": "10.1038/s41419-024-07093-8",
          "url": "https://doi.org/10.1038/s41419-024-07093-8",
          "limitation": "Publisher retrieval failed; legitimate Scite full text recovered relevant Results and Methods. Raw immunoblot data and supplementary quantitative half-life reconstruction were not independently reanalysed; Precision remains 1."
        }
      ]
    },
    "stoppingRationale": "Bounded recovery recovered load-bearing purified-enzyme and cell experiments, screened twelve forward citation edges (truncated discovery, not exhaustive), and examined a conflicting kinetic study and newer structural interpretation. Citation labels/counts were not treated as replication. Further broad retrieval is unlikely to change the model-bounded stability judgement materially.",
    "history": [
      {
        "date": "2026-10-18",
        "decision": "Version 1: proposed experimental Finding, Codex-assessed provisional 5/8; not human-reviewed. Original F1/F4 chemistry and source IDs preserved separately; no canonical admission."
      }
    ]
  }
];
