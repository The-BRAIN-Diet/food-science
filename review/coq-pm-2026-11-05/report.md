# BRS4 Coenzyme Q Biosynthesis & Pool Availability

Local implementation, 5 November 2026. Branch `review/brs5-pm4-sec-assessment`; starting HEAD `f1607fe5`. No commit, push, merge or deployment. This report separates implemented records from pending scientific appraisal.

## Placement and scope

**BRS4-FM1-PM10 — Coenzyme Q Biosynthesis & Pool Availability**, under **Cellular Bioenergetics**. All nine existing BRS4 PMs, four FMs and two KCs were inspected. No existing PM owns endogenous CoQ production, maturation and intracellular distribution. PM1 owns ETC operation, PM4/5 redox operations, PM9 organelle biogenesis. The new PM supplies these downstream functions without replacing their missions. No KC is created or assigned merely because several nutrients participate.

**Mission:** Maintain endogenous Coenzyme Q synthesis, maturation and pool availability to support mitochondrial electron transfer and cellular redox functions.

Canonical inventory consequently changes from 64 to **65 PMs**, including ten BRS4 PMs. Existing numbering and all existing PM source files are preserved. FM1 gains the new membership and link only.

## Stage 2A — biology and evidence boundaries

| Evidence class | Established or observed contribution | Boundary |
|---|---|---|
| Human-cell precursor tracing | Tyrosine → 4-HPP → HPDL-associated 4-HMA → headgroup contribution to CoQ10; knockout and rescue support the route | Culture density matters. Tested non-liver cells did not label this route from phenylalanine. Systemic phenylalanine-to-tyrosine supply is distinct. Not all intervening human enzyme assignments or tissue flux contributions are resolved. |
| Reconstituted machinery | PDSS1/2 tail synthesis and COQ2 prenylation converge with COQ headgroup maturation. COQ3/5 use SAM; COQ6 uses FAD with FDXR/FDX2-linked reducing equivalents; COQ7 is a diiron hydroxylase; COQ9 assists substrate handling | Nicoll's experiments use reconstructed tetrapod proteins and short-tail substrates, not intact human dietary interventions. COQ4 decarboxylation evidence updates older reviews. COQ8A/B support cannot be reduced to a universal dietary rate limit. |
| Reducing equivalents | NADPH feeds the FDXR/FDX2 system supporting COQ6; COQ7 assays have a distinct NADH-dependent role | NAD(P)H alone did not drive COQ6 in the reconstructed assay. No generic nutrient → NADPH → improved CoQ claim is admitted. |
| Compartmental supply | PARL/STARD7 loss, rescue and localisation experiments distinguish synthesis from export to other membranes | Cultured cells and mouse tissues; not a verified dietary transport intervention. Cytosolic redistribution can trade off against mitochondrial availability. |
| Deficiency | Genetic biosynthetic defects establish biological importance; HPDL precursor bypass has mouse and single-patient evidence | HPDL disease is upstream headgroup pathology, not every COQ defect. Early versus late mouse treatment differed. No general precursor supplement or healthy-population dose. |
| Redox cycling | Oxidised ubiquinone and reduced ubiquinol are interconverting states, distinct from total pool abundance | More reduced CoQ is not universally better. Serum/plasma processing and lipoproteins matter; redox protection downstream remains distinct from production. |

Primary sources: [Banh 2021](https://doi.org/10.1038/s41586-021-03865-w), [Shi 2025](https://doi.org/10.1038/s41586-025-09246-x), [Nicoll 2024](https://doi.org/10.1038/s41929-023-01087-z), [Deshwal 2023](https://doi.org/10.1038/s41556-022-01071-y), [Wang and Hekimi 2022](https://doi.org/10.17912/micropub.biology.000635). Pathway orientation also used [Guerra and Pagliarini 2023](https://doi.org/10.1016/j.tibs.2022.12.006), [Understanding coenzyme Q 2024](https://doi.org/10.1152/physrev.00040.2023), [Biosynthesis, Deficiency, and Supplementation 2023](https://doi.org/10.3390/antiox12071469) and [Reactome R-HSA-2142789](https://reactome.org/content/detail/R-HSA-2142789). Reviews are not counted as independent experimental replication.

## Stage 2B — dietary decisions

| Input | Decision | Classification | Claim ceiling |
|---|---|---|---|
| Tyrosine | Admit Type A | Derived → CoQ headgroup | Precursor capacity; endogenous phenylalanine contribution remains an alternative. No extra-intake benefit or complete human enzyme assignment inferred. |
| Methionine | Admit Type A | Derived → SAM | Methyl-donor capacity for COQ3/5, using the existing MAT conversion record. No CoQ-specific methionine dose. |
| Vitamin B2 / riboflavin | Admit Type A | Derived → FAD | Flavin supply for biosynthetic machinery; existing RFK/FLAD1 route reused. Not a demonstration of increased synthesis from extra riboflavin. |
| Iron | Admit Type A | Direct catalytic resource | COQ7/headgroup machinery dependency. Neither normal rate limitation nor a reason for iron excess is established. |
| SAM, FAD, CoQ10 product | Biochemical records; no independent dietary admission | Not duplicated as primary dietary entries | Intracellular roles are preserved separately from oral delivery. |
| Phenylalanine | No separate admission in this pass | Upstream systemic source acknowledged | Do not count the same tyrosine route twice without its own justified PM relationship. |
| 4-HMA / 4-HB | Defer general dietary/SOP admission | Genotype-specific research context | Early mouse rescue and one human case do not establish a general intervention. |
| Mg, Zn, mevalonate, NADPH/NADH | No additional dietary admission | Biochemical candidates/participants | Assay roles and endogenous metabolism do not alone justify another dietary requirement. |
| Oral ubiquinone/ubiquinol | No general Type B admission | Tissue target engagement unresolved across contexts | Increased plasma exposure is not mitochondrial delivery; null studies do not prove universal ineffectiveness. |

Four complete six-atom records, their admission gates, food-research provenance and three derived routes are implemented. Existing food data are reused. No Dietary Confidence rating is invented. No benefit claim is inferred from a Type A admission.

## Exercise appraisal

[Allard 2023](https://doi.org/10.1016/j.jacbts.2023.09.003) reused the [2021 STATEX cohort](https://doi.org/10.1016/j.jacc.2021.08.075): 16 symptomatic and 16 asymptomatic statin users plus 20 non-users, approximately 63–64 years. Twelve weeks comprised supervised cycling twice weekly (10-minute warm-up, 40 minutes at 70–80% maximum heart rate, five-minute cool-down) and weekly 60-minute resistance training (three sets of 12 repetitions with progression). Statin exposure continued.

Total CoQ measured by HPLC-ECD increased by an adjusted 3.4 µg/g wet muscle (95% CI 0.4–6.3). Statin subgroup changes were not individually significant. Missing biopsies and sex/fibre differences matter. All groups trained: there was no inactive control. Mitochondrial-normalised CoQ, synthesis, turnover and redox state were not measured. The parent study found increased citrate-synthase activity, **not a detectable increase in ATP-production capacity or peak oxygen uptake**.

**Disposition:** keep the exact association as SF4; defer an admitted causal Lifestyle Lever. The independent six-atom candidate is in `exercise-candidate.json`, with unresolved MoA, separate measured effect and limitations. Its intervention SEC status is **Not yet assessed**, not inherited from SF4.

## Supplementation, ageing and functional context

| Study | Verified result and limitation | Role |
|---|---|---|
| Schmücker 2026, [DOI](https://doi.org/10.1007/s11357-025-02068-9) | Online 28 January 2026; 40 robust adults, 74 ± 4 years, 400 mg/day versus placebo for twelve weeks. Abstract reports plasma increase without detected muscle/isolated-mitochondrial CoQ or respiratory benefit. Full methods/intervals inaccessible; its cognitive result is not inferred. | SF5; pending B/P/R appraisal |
| Dohlmann 2022, [full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC9495827/) | 37 simvastatin-treated adults; 400 mg/day, eight weeks, double-blind RCT. Muscle CoQ/function and myalgia did not improve detectably. Power planning did not establish a muscle-CoQ equivalence margin. | SF5; full-text supporting evidence |
| Cooke 2008, [full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC2315638/) | 41 trained/untrained adults; 200 mg/day for 14 days. Plasma increased; reported muscle signal was borderline (P=.098), endurance signal P=.06. Narrative conclusions are stronger than these comparisons. | Contradiction/qualification check; not proof of universal delivery |
| Orlando 2020, [full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC7467386/) | 50 aortic-stenosis surgical patients; 400 mg/day ubiquinol around surgery. Troponin and recovery signals did **not** coincide with increased sampled cardiac CoQ or altered cardiac redox fraction. | Positive functional context with null tissue engagement |
| Liu 2026, [DOI](https://doi.org/10.3390/antiox15101219) | Online 22 September; review of 33 trials/3,317 participants, 21 in meta-analysis. VO2 estimate in five trials/172 participants crossed zero; strength/walking evidence uncertain. Population means ≥40 years are not exclusively old adults. | Review-level context, not independent primary replication; not scored |
| Niklowitz 2016, [full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC4865593/) | 860 adults aged 18–82, cross-sectional. Total serum CoQ inverse-U age pattern; cholesterol-adjusted pattern not significant; oxidised fraction higher in older groups. Processing and serum/plasma differences matter. Separate 14-day exposure involved younger men. | SF6; no universal tissue-decline or optimal-redox claim |
| Gamal 2022, [DOI](https://doi.org/10.2174/1871527320666211124093345) | 60 children with inadequate atomoxetine response; adjunct CoQ versus placebo for six months. CPRS-48 total improved more at six months; one/three-month total contrasts were not significant. Five CoQ-arm children reported nausea; placebo arm six abdominal pain and three weight loss. Abstract/methods age bounds differ. No CoQ/mitochondrial or allostatic measurement. | Downstream clinical context only; author-proof methods inspected, not a biosynthesis Finding |
| Mizuno 2008, [original article](https://higiene.unex.es/Bibliogr/nutri/mizuno08.pdf) | Seventeen healthy volunteers, three-way crossover, eight days at 100/300 mg versus placebo. Selected physical-fatigue/recovery and maximum-velocity effects at 300 mg during prolonged cycling. Small protocol, not sustained-attention or mitochondrial target-engagement proof. | Demand/recovery hypothesis context |
| Ubiquinol cognitive RCT 2026, [original record](https://pmc.ncbi.nlm.nih.gov/articles/PMC13404211/) | 111 adults ≥60 years, 200 mg for 90 days; plasma approximately fourfold higher, no group cognitive, mood or reported cardiovascular/oxidative-marker benefit. Retrieval limited to indexed original abstract; full methods not verified. | Important null cognitive context; not scored |
| Castro-Marrero 2021, [full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC8399248/) | 207 ME/CFS women assigned; CoQ200 mg + NADH20 mg, eight treatment weeks and four-week follow-up. Only 144 completed final assessment. Within-group fatigue changes must not be substituted for the nonsignificant between-group table comparisons. | Combination context; no CoQ-alone attribution or demonstrated mitochondrial mediation |
| Li 2015, [primary DOI](https://doi.org/10.1159/000377676) | Creatine/CoQ combination in Parkinson-related MCI: source identity identified, but primary full methods/results not retrieved. No efficacy conclusion adopted from secondary summaries. | Explicit unresolved retrieval, not an admitted intervention |
| Parkinson Study Group QE3 2014, [primary record](https://pubmed.ncbi.nlm.nih.gov/24664227/) | Large high-dose early-Parkinson trial stopped for futility. Disease context and doses differ from dietary adequacy. | Null functional context; no universal inefficacy inference |

Full-text review also inspected human COQ7:COQ9 structural work (PMC10058641); its substrate analogues and absent iron in the solved structure must not be mistaken for direct proof of occupied physiological metal sites. Newer export work (PMC13245278) was located but not independently appraised; it is not counted as replication of STARD7 or used for an admission.

## Findings and SEC

| Finding | D/B/P/R | SEC | Status |
|---|---|---|---|
| SF1: HPDL/headgroup formation | 2/1/1/0 | 4/8 | Provisional; shared research programme is not independent replication |
| SF2: reconstructed enzyme/cofactor roles | 2/1/1/0 | 4/8 | Provisional; restricted to experimental model |
| SF3: PARL/STARD7 distribution | 2/1/1/0 | 4/8 | Provisional; experimental compartmental proposition |
| SF4: training-associated wet-muscle CoQ | 2/1/1/0 | 4/8 | Provisional association, not causal synthesis claim |
| SF5: plasma versus muscle engagement | 2/pending/pending/pending | No total | Three independently actionable Assessment gaps |
| SF6: serum age/redox association | 2/1/1/0 | 4/8 | Provisional cross-sectional proposition |

The common numerical totals result from separate source-specific rationales, not a template score. One unscored Scientific Principle captures established pathway identity and boundaries. Existing rubric, ceilings and numerical ranges are unchanged. **21/24 dimensions assessed; three tracked pending; no unexplained missing dimensions.** Structurally complete does not mean scientifically appraised: SF5 remains incomplete. The 118 snapshots present at task start are retained exactly; six new immutable version-1 records bring the registry to 124.

## Ontology, food and hypothesis handling

- Reused `coq10`, with compatible CoQ10/ubiquinone-10 aliases. Did not alias unspecified ubiquinone, ubiquinol or CoQ9 to the oxidised chemical identity. The existing page explains both redox forms and the InChI limitation; no duplicate substance page.
- Reused tyrosine, methionine, vitamin B2, iron, SAM and FAD identities and existing SAM/FAD conversion evidence. The net tyrosine-to-CoQ edge explicitly does not pretend every human intermediate enzyme is assigned.
- Added **one qualitative fresh-EVOO → CoQ10 edge** from Žmitek's original HPLC study abstract. No unverified quantity, heat-state equivalence or CoQ9/ubiquinol substitution. Generic refined olive oil was not given the same edge.
- Preserved existing beef/fish source-specific records rather than transplanting their estimates. The CoQ page's unsupported universal ageing/organ-meat statements were corrected; its previous text is archived locally for traceability.
- Five scientific Evidence Gaps cover dietary rate limitation, exercise mechanisms, tissue responders, longitudinal redox changes and energetic reserve. They are not generated from missing scores.
- Cross-BRS energetic reserve remains a **hypothesis**: BRS1 demand, BRS2 methyl supply, BRS3 redox use, BRS4 production/buffering, BRS5 metabolic/inflammatory context and BRS6 fuel adaptation. No causal clinical relationship, shared intervention mechanism or new KC is inferred.

## Presentation contract and implementation scope

**Change/purpose:** one authorised canonical PM using existing sections, six-atom food/evidence disclosures, individual ScientificFinding components and existing Evidence Gaps/Open Issues/Evidence & Audit tabs. It answers which biology maintains CoQ pools and what dietary/intervention evidence actually supports it.

**Placement/source:** BRS4 FM1; canonical PM front matter, pinned SEC sidecars, existing substance/food registries. Existing PM1/PM9 presentation conventions and `system/primary-mechanism-schema.md` apply; no global visual redesign or technical pathway panel.

**Scope:** one new PM, one FM membership list, existing CoQ substance prose/identity, one food edge, references and generated indexes. `src/lib/secAssessments.mjs` only extends the explicit permitted PM scope. No new component or governance methodology.

**Author approval:** current task explicitly authorises a new PM after nonduplication, canonical implementation and existing presentation. This is not permission for a new component or broader rollout. The exact new PM file hash is recorded under the existing presentation approval process; no baseline regeneration.

**Examples:** the new local PM and existing BRS4 PM1 thumbnail / PM1 six-atom dropdown CSS. Browser checks verify actual rendering, six fields, food links, SF score/pending distinction and existing tabs.

## Validation and remaining work

See `validation.json` for final command results. New PM structural and six-atom admission checks pass; focused regression includes preservation of every prior PM and SEC record. Broader existing LAT1 dietary-admission issues and unrelated bibliography/reference issues are reported separately rather than repaired out of scope. A new production build has not been claimed; the running development server compiled and rendered the page.

Remaining scientific work: obtain the 2026 muscle RCT full methods/tables and assess B/P/R; verify independent distribution/precursor replication; test nutrition-sensitive human flux; independently appraise a controlled exercise intervention; investigate energetic-demand effect modification with direct biomarkers. No scientific approval is claimed while required appraisal remains pending.


## Final validation and file inventory

Eight CoQ-specific tests pass, including exact preservation of all 118 pre-task SEC snapshots and existing PM documents. Findings consistency passes for 65 PMs; SEC integrity passes for 124 snapshots; presentation validation passes without baseline regeneration. The wider selected suite is **65/72 passing**. Seven older fixtures remain incompatible with existing section placement, audit labels, publication gates, renderer mocks or an append-only SEC registry; see validation.json. Only the inventory assertion was updated from 64 to 65 for the authorised new PM.

The existing CoQ substance page still fails six newer calibration-template checks (legacy section headings/order, SubstanceMatrix and two old BRS keys), also present in its archived pre-task version. This task corrects its science and references without silently redesigning its presentation. Global LAT1 admission issues and two missing Zeisel bibliography keys remain outside scope. No repository-wide clean test run or production build is claimed.

Task files: new BRS4-FM1-PM10; FM1 membership; CoQ10 substance page; extra-virgin olive oil qualitative edge; registry/substances.json; static/bibtex/BRAIN-diet.bib (17 references); SEC registry and scope README; src/lib/secAssessments.mjs allowlist; presentation approval; scripts/coq-pm.test.mjs; dietary-pathway inventory test; regenerated BRS4 input/substance/food, dietary-food-target and dietary-pathway indexes; this review directory and workstream handoff. Other dirty files predate this task and were preserved. Generated global indexes reflect the current local canonical source state, including earlier uncommitted work, not just this PM.

Actual-page browser checks verified the title/mission, six-atom expansion, existing food projections, six individual Findings, five provisional scores, pending SF5 and the three existing tabs. Screenshot: [six-atom presentation](pm10-six-atoms.png). All changes remain local and uncommitted.
