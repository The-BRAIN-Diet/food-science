# BRS2-FM2-PM6 Glutathione Synthesis — Stage 2B Report

## Scope

Stage 2B set `evidence_status: stage-2b-dietary-addressability` on BRS2-FM2-PM6 only. Selenium and riboflavin were the listed cofactors. They are not synthesis requirements, so both names were rejected and removed. No cofactor name remains without a matching traceability atom. No SOP or lifestyle atom was invented. `findings:sync` and `phenome:sync` were not run. §4.1 and §7 were rendered from the page front matter with the same render functions those scripts use.

Local verification on 30 September 2026 opened `http://localhost:3000/docs/biological-targets/brs2/fm2/brs2-fm2-pm6-glutathione-synthesis`. Each admitted §3.1.1 and §3.1.2 row showed Input, Input type, Biological role, Evidence source, and Limitation. Presentation bullets are the plain labels. The Key Constraint block is the linked pool title plus one sentence and does not list foods.

## Dietary decisions

| Input | Atom | Layer | Decision | Ceiling |
|---|---|---|---|---|
| Cysteine | PM6-DIT-1 | §3.1.1 Direct and §3.1.2 substrate | Admitted. Capacity requirement. Supply from PM5 is labelled. | biological-dependency |
| Glutamate | PM6-DIT-2 | §3.1.1 Direct and §3.1.2 substrate | Admitted. No human dietary-glutamate effect was shown. | biological-dependency |
| Glycine | PM6-DIT-3 | §3.1.1 Direct and §3.1.2 substrate | Admitted. Sekhar did not isolate glycine. | biological-dependency |
| ATP | PM6-DIT-4 | §3.1.2 only | Biochemical requirement. Not a Dietary Requirement. | biological-dependency |
| Magnesium ions (Mg²⁺) | PM6-DIT-5 | §3.1.2 only | Catalytic ion of glutathione synthetase. Not a Dietary Requirement. The cofactor list is this name only. | biological-dependency |
| Dietary protein | PM6-DIT-6 | §3.1.1 Derived toward cysteine | Admitted only as sulfur-amino-acid provision (FAO DIAAS scores methionine + cysteine). | dietary-provision |
| N-acetylcysteine | PM6-DIT-7 | §3.1.1 Derived precursor toward cysteine | Admitted as the supplemental precursor given with glycine in older adults. | modulation-demonstrated |
| Selenium | none | removed | Glutathione peroxidase cofactor, not a synthesis substrate. | rejected |
| Riboflavin | none | removed | Glutathione reductase FAD cofactor, for recycling, not synthesis. | rejected |

Cysteine, glutamate, and glycine appear in both §3.1.1 and §3.1.2, matching the SAMe page pattern so the biochemical inventory stays visible. ATP and magnesium do not appear in §3.1.1. Glycine and glutamate were not given separate protein-provision rows: the FAO edge used here is the sulfur-amino-acid score, which reaches cysteine, not a glycine or glutamate provision edge.

N-acetylcysteine is not ordinary food. The 2011 abstract names cysteine and glycine. The cysteine source is admitted as N-acetylcysteine co-administered with glycine, at the older-adult erythrocyte ceiling only. The dose in mg/kg was not copied because the methods PDF was not retrieved. Isolated N-acetylcysteine, isolated glycine, younger adults, neurons, and clinical outcomes are outside that admission.

Food arrows, meal timing, and food examples that previously sat in §3.1 were replaced by these presentation labels. `timing_specific` is No. Dose sensitivity states the older-adult combined-precursor ceiling and the selenium/riboflavin exclusion.

## Type D — BRS2(KC2)

Applicability proposition: inadequacy of the shared methionine and cysteine pool constrains glutathione synthesis capacity.

Established links:

- Glutamate–cysteine ligase uses cysteine (PM6-F1; Misra and Griffith 1998).
- A diet containing neither methionine nor cysteine slowed whole-blood fractional and absolute glutathione synthesis in seven healthy young men, while glycine intake was increased and concentration was maintained (PM6-F2; Lyons et al. 2000).
- With methionine held at 14 mg/kg/day, cysteine intakes from zero to 40 mg/kg/day did not change erythrocyte synthesis in four young men (PM6-F2; Courtney-Martin et al. 2008). The constraint is loss of the shared pool, not an obligatory separate cysteine intake when methionine remains.

Sekhar et al. (2011) does not establish this mapping. It co-supplements a cysteine precursor and glycine in older adults and does not isolate the methionine–cysteine pool. Upstream transsulfuration adjacency was not treated as the constraint.

Disposition: **established**. `applicability_mode: constrained-by`. `arm_id: methionine-cysteine-sulfur-amino-acid-pool`. Relationship id: `BRS2-FM2-PM6-KCR-1`. Public §3.1.3 is the linked title “(Key Constraint) (KC2) — Methionine–Cysteine Sulfur Amino Acid Pool” and one sentence: removing methionine and cysteine together slowed whole-blood glutathione synthesis in healthy men, so inadequacy of this shared pool can constrain synthesis capacity. No foods are listed. Inferred and excluded: ordinary mixed diets are commonly short of the pool; the same rate change occurs in neurons or clinical populations.

## SOP and lifestyle

No preparation, supplement schedule, fasting pattern, sleep, activity, or stress-recovery behaviour was shown to change these two assembly reactions. No SOP or lifestyle atom was added. The public sentences say that none is established.

## Stopping rationale

The traceability question was whether each named input is a synthesis substrate, a catalytic requirement, a provision edge, or a demonstrated modulator. Enzyme records closed the substrate list. Lyons closed the shared-pool capacity constraint. Courtney-Martin stopped a stronger “cysteine intake is always limiting” claim. FAO closed only the sulfur-amino-acid provision edge. Sekhar closed only the older-adult combined-precursor ceiling. Selenium and riboflavin closed as neighbouring enzymes. Further food-composition lists would not raise any of those ceilings.

## Change control

- New keys live only in `system/bib-additions/brs2-pm6.bib`: `misra_human_gcl_1998`, `polekhina_gss_1999`, `lyons_glutathione_2000`, `courtney_martin_cysteine_2008`, `mullenbach_gpx_selenocysteine_1987`, `karplus_glutathione_reductase_1989`. `static/bibtex/BRAIN-diet.bib` was not edited. Site-wide citation-key validation will not see these keys until that sidecar is merged.
- The change-control queue was not edited. Legacy phenome confidence was not rescaled.
- Magnesium was added beyond the four expected substrates because Polekhina et al. (1999) show one bound Mg²⁺ per glutathione-synthetase subunit. It is biochemical only.
- The KC page was not edited. Foods belonging to that pool were not copied here.

## Unresolved

- Glutamate–cysteine ligase magnesium as a separate kinetic requirement. Only the synthetase ion is admitted.
- Ordinary mixed-diet inadequacy of the sulfur-amino-acid pool. Lyons used an experimental formula.
- Neuronal synthesis under the same constraint.
- Isolated N-acetylcysteine or isolated glycine modulation, and the unpublished-on-this-page milligram dose.
- Glycine or glutamate as their own derived protein-provision rows.
- Clinical treatment of ADHD, recovery, or stress.
