# PM8: anxiety and phenome candidate review

5 October 2026. Unapproved addendum to the Stage 2A/2B draft. No canonical or preview phenome mappings or confidence scores have been changed.

## Correction to the assessment scope

The original draft retained the existing phenome records and deferred their reassessment. Anxiety is an important additional outcome domain to examine for this PM. The attached oral-GABA and bacterial studies already contain anxiety-like animal outcomes; human evidence also links regional GABA/glutamate measurements to anxiety. These are relevant to biology → outcome review, independently of whether an oral exposure qualifies as a dietary input.

The proposition is: **Regional GABAergic/glutamatergic regulation can contribute to anxiety-related responses, with direction dependent on circuit, population and measurement.** It is not “more GABA improves anxiety”, or “gut bacterial GABA treats anxiety”.

## Primary evidence examined

| Evidence | Measured link | Interpretation and limits |
|---|---|---|
| [Johnstone & Cohen Kadosh (2024)](https://doi.org/10.1016/j.dcn.2024.101363), full text PMC10925933, Results and Figure 3 / Tables S3–S4 | Healthy females: younger n=49, ages 10–12; older n=32, ages 18–25; region-specific MRS and trait/social-anxiety scales. DLPFC glutamate:GABA ratio negatively associated with social anxiety (rho −0.286, BF10 5.758) and trait anxiety (rho −0.263, BF10 3.355). Individual GABA positive associations were weaker/anecdotal. | Human observational evidence directly relevant to PM8's balance framing. Does not measure synaptic E/I currents, causality or a dietary response. The ratio is a spectroscopy pool ratio, not a physiological circuit-balance assay. Contradicts a universal “higher GABA means lower anxiety” reading. Age/sex/region boundaries must remain. |
| [Goddard et al. (2004)](https://doi.org/10.1176/appi.ajp.161.12.2186), PMID15569888, indexed primary abstract | Ten panic-disorder patients and nine controls: occipital MRS before/after open-label clonazepam. Controls showed a GABA decrease; patients had a blunted response. | Human pharmacological/mechanistic evidence of altered GABA function in panic disorder. Does not establish worry/perseveration, dietary efficacy, or a causal GABA concentration → symptom relationship. Full text not appraised here; no definitive confidence based on abstract alone. |
| [Neuroimaging Insights: Kava’s Effect on dACC GABA (2023)](https://pmc.ncbi.nlm.nih.gov/articles/PMC10649338/), full text, Results and Discussion | GAD trial sub-study: baseline HAM-A positively associated with dACC GABA (r=0.40, p=0.05). Extract changed corrected dACC GABA after eight weeks (treatment × time p=0.049; lower than placebo), but did not improve anxiety at this time point. Substantial attrition; follow-up n=8 kava and n=9 placebo. | Human intervention dissociation: changing a regional GABA measure did not demonstrate anxiolytic benefit. Mechanistic mediation remains inferred. Preserve exact extract; no automatic general kava, constituent or supplement admission. This is a newly identified Stage 2B candidate requiring its own appraisal, not a recommendation. |
| Existing PM8-F6/F7: Bravo/JB-1 and Xu/oral GABA | Mouse central receptor/pool changes alongside anxiety-like behaviour; vagotomy sensitivity in JB-1 experiment. | Preclinical support for a candidate relation. Does not establish human worry or demonstrate that the measured central marker mediates behavioural change. Findings are not independent replication merely because two endpoints are reported. |
| Existing PM8-F8/F9: GOS and high-dose vitamin B6 | GOS primary anxiety outcome negative; GABA signals trend-level. B6 study anxiety changes and indirect visual inhibition measure. | Preserve negative findings and indirect mediation. Neither permits assigning the entire phenome effect to GABA or converting mouse findings into human efficacy. |

Full-text XML and extracted text for the two newly examined open papers, plus indexed metadata/abstract records, are saved in `evidence/`.

## Registry construct selection

The registry does not contain a generic Anxiety phenome. Compare the actual measured constructs before assigning:

- **PH016 — Apprehensive Worry / Perseverative Thought:** sustained worry, rumination and difficulty disengaging from threat-anticipatory thought. Candidate for review, but trait-anxiety, social-anxiety, panic and total HAM-A scores do not independently demonstrate this narrower construct. Need worry/perseveration-specific outcomes or an explicitly justified inferential bridge.
- **PH015 — Stress Reactivity:** acute physiological/affective stress response. Stress-provoked paradigms and the mouse experiments offer candidate support; baseline trait anxiety or panic diagnosis does not automatically establish this mapping.
- **PH003 — Emotional Regulation:** ability to modulate emotional responses. Anatomical “emotion-regulation region” labels do not themselves measure emotional-regulation capacity. Existing ADHD MRS citations likewise do not settle this relationship.

Do not duplicate the same anxiety outcome across all three rows. Decide whether its measured construct belongs to one, supports a bounded translation, or remains unmatched pending review. Anxiety diagnoses are therapeutic contexts, not interchangeable phenome names.

## Proposed disposition and next gate

Retain anxiety-related biology as an explicit **phenome-review candidate**, with a non-monotonic, circuit-specific proposition. Keep the new PH016 proposal unresolved at the construct-mapping level; no final Biology → Phenome Confidence has been assigned. Reassess existing PH003/PH015 rows against these outcome-specific sources rather than simply importing the new studies into their current rationales.

The governing `system/phenome-relationship-review-methodology.md` separates candidate generation from Phase 3 proposition-first outcome validation and Phase 4 audit. Its critical rule is: “Do not publish §3 mappings until Phase 3 is complete and Phase 4 validation passes.” Accordingly, this targeted addendum does not silently publish a new phenome mapping or claim that the integrated FM review is complete.

Priority remaining work: assess FM4 integrated context; retrieve/appraise worry-specific human studies and the panic full text; check cohort overlap between 2024 observational and 2025 GOS datasets before treating them as independent convergence; independently appraise the exact kava exposure as a newly identified intervention candidate. No inference from MRS concentration to synaptic inhibition or from neurochemical change to clinical efficacy.

## Verification

Canonical identifiers and descriptions above were read directly from `src/data/phenome-registry.json`. Numerical statements were checked against the primary Results passages, with abstract-only access explicitly marked. This is an audit addendum only: no shared schemas, public records, generated registries, roll-ups, page rendering or confidence assignments were edited; therefore no phenome sync or production migration was run.
