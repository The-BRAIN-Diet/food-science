# Review 02 — remaining Derived conversion assessments

Status: **proposed; awaiting author approval; not installed**. Branch audit/dietary-connectivity-2026-11-09, HEAD af13bec172b5938098a46f85c06523b8a20e90dc.

This review reuses the completed audit and current canonical PM evidence. It does not claim fresh original-paper verification. All 14 inputs already have dietary_input:true and a Derived overlay; missing structured conversion metadata is not a withdrawal of those admissions. Existing KC/resource annotations and biochemical inventories remain separate. No SEC, publication hold, composition, PM record or wheel output changed.

The JSON contains full original atoms, overlays, supporting Findings (including null results), source-file hashes, proposed current-schema assessments and individual validation results. A proposed assessment status of admitted describes the existing admission; it does not authorise installation or public projection. Null source IDs intentionally remain unresolved.

## Group 1 — Metadata reconciliation (six routes)

### BRS1-FM2-PM6::PM6-DIT-2

**Phosphatidylcholine → Choline**

Canonical IDs: phosphatidylcholine → choline. Existing claim ceiling: dietary-provision.

Proposed process: Digestion and remodelling of dietary phosphatidylcholine supplies circulating choline.

Original limitation: Human tracer evidence establishes phosphatidylcholine as a choline-provision route; it does not show delivery to cholinergic terminals or increased brain acetylcholine synthesis.

Evidence: PM6-F4; bockmann_choline_supplements_2023. See full canonical Findings in the JSON for detailed endpoints and negative results.

**Decision:** Approve metadata reconciliation only; retain six-man single-dose supplement tracer context, not ordinary-food equivalence or brain acetylcholine synthesis.

Schema: passes unchanged validator; not scientific approval.

### BRS2-FM1-PM1::PM1-DIT-2

**Vitamin B9 (folate) → 5-Methyltetrahydrofolate**

Canonical IDs: vitamin-b9 → 5-methyltetrahydrofolate. Existing claim ceiling: dietary-provision.

Proposed process: Form-dependent folate processing and folate-cycle conversion supply 5-methyltetrahydrofolate; folic acid requires reduction.

Original limitation: This conversion pathway does not show that increasing folate intake increases tissue remethylation flux. Folic acid lowers blood homocysteine, which is a circulating marker.

Evidence: PM1-F1; froese_vitamin_2019. See full canonical Findings in the JSON for detailed endpoints and negative results.

**Decision:** Approve metadata reconciliation; distinguish folic acid from reduced food folates and preserve circulating homocysteine versus tissue-flux boundary. Approve the existing display name as an exact alias for vitamin-b9; current registry label validation does not accept the parenthetical name.

Schema: canonical-input-identity-mismatch.

### BRS2-FM1-PM1::PM1-DIT-4

**Vitamin B12 (cobalamin) → Methylcobalamin**

Canonical IDs: vitamin-b12 → methylcobalamin. Existing claim ceiling: dietary-provision.

Proposed process: Absorbed cobalamin undergoes intracellular processing to methylcobalamin used by methionine synthase.

Original limitation: Provision of vitamin B12 does not show that increasing intake raises tissue remethylation flux. Added vitamin B12 further lowered blood homocysteine beyond folic acid in pooled trials, which remains a circulating marker.

Evidence: PM1-F1; froese_vitamin_2019. See full canonical Findings in the JSON for detailed endpoints and negative results.

**Decision:** Approve metadata reconciliation; do not treat every dietary B12 form as already methylcobalamin or equate homocysteine lowering with tissue flux. Approve the existing display name as an exact alias for vitamin-b12; current registry label validation does not accept the parenthetical name.

Schema: canonical-input-identity-mismatch.

### BRS2-FM1-PM2::PM2-DIT-2

**Choline → Betaine**

Canonical IDs: choline → betaine. Existing claim ceiling: dietary-provision.

Proposed process: Choline oxidation supplies betaine upstream of BHMT.

Original limitation: Choline oxidation can supply betaine, but increasing choline intake has not been shown to increase tissue BHMT flux. Human evidence is an eight-man depletion pilot, with the challenge response in four clinically depleted participants; tissue BHMT flux was not measured. Rat donor rescue and specific inhibition support the chain. This does not establish ordinary-diet limitation, response in every tissue or benefit above adequacy. Folate’s indirect constraint on BHMT remains unresolved.

Evidence: PM2-F2, PM2-F1; obeid_metabolic_2013, salvi_choline_2013, evans_betaine_2002. See full canonical Findings in the JSON for detailed endpoints and negative results.

**Decision:** Approve metadata reconciliation with the current expanded eight-man depletion-pilot limitation; do not use the shorter legacy overlay limitation alone.

Schema: passes unchanged validator; not scientific approval.

### BRS2-FM2-PM6::PM6-DIT-9

**Methionine → Cysteine**

Canonical IDs: methionine → cysteine. Existing claim ceiling: biological-dependency.

Proposed process: Methionine can supply cysteine through upstream transsulfuration before glutathione assembly.

Original limitation: A formula that removed methionine and cysteine together slowed whole-blood synthesis, so that result does not isolate methionine. In the cysteine-free study, methionine intake stayed adequate and red-cell synthesis did not fall. This does not show that eating more methionine, once intake is adequate, raises glutathione synthesis.

Evidence: PM6-F2; lyons_glutathione_2000, courtney_martin_cysteine_2008. See full canonical Findings in the JSON for detailed endpoints and negative results.

**Decision:** Approve metadata reconciliation only; preserve combined sulfur-amino-acid depletion, unchanged blood concentration and null cysteine-dose response at adequate methionine.

Schema: passes unchanged validator; not scientific approval.

### BRS4-FM1-PM1::PM1-DIT-3

**Vitamin B2 (riboflavin) → Flavin mononucleotide (FMN)**

Canonical IDs: vitamin-b2 → flavin-mononucleotide. Existing claim ceiling: biological-dependency.

Proposed process: Riboflavin supplies the precursor for FMN used by complex I.

Original limitation: The review does not show that eating more riboflavin, once flavin mononucleotide (FMN) is adequate, raises electron transport. Riboflavin-responsive complex I disease is a separate clinical context.

Evidence: PM1-F1; curtabbi_complex_i_fmn_2022. See full canonical Findings in the JSON for detailed endpoints and negative results.

**Decision:** Approve metadata reconciliation only; preserve adequate-state and riboflavin-responsive disease boundaries. Approve the existing display name as an exact alias for vitamin-b2; current registry label validation does not accept the parenthetical name.

Schema: canonical-input-identity-mismatch.

## Group 2 — Qualified scope confirmation (five routes)

### BRS2-FM2-PM6::PM6-DIT-7

**N-acetylcysteine → Cysteine**

Canonical IDs: n-acetylcysteine → cysteine. Existing claim ceiling: modulation-demonstrated.

Proposed process: Supplemental N-acetylcysteine supplies a cysteine precursor in the tested combined glycine protocol.

Original limitation: The synthesis increase was measured in older adults given this precursor together with glycine. It does not show an effect of N-acetylcysteine alone, of ordinary foods, or of supplementation outside that group, and it is not a neuronal or clinical result.

Evidence: PM6-F2; sekhar_glutathione_2011. See full canonical Findings in the JSON for detailed endpoints and negative results.

**Decision:** Approve a protocol-qualified route only. Preserve the existing capacity-requirement classification without treating the combination response as NAC-alone efficacy, an ordinary-food route, or a measured conversion efficiency.

Schema: passes unchanged validator; not scientific approval.

### BRS2-FM3-PM7::PM7-DIT-4

**Phosphatidylcholine → Choline**

Canonical IDs: phosphatidylcholine → choline. Existing claim ceiling: dietary-provision.

Proposed process: Dietary phosphatidylcholine supplies choline through digestion/remodelling; the receiving PM records methyl-derived labelling separately from intact-headgroup incorporation.

Original limitation: Plasma tracing does not measure absolute hepatic flux, intermediary SAM, ordinary-food equivalence or benefit.

Evidence: PM7-F7; bockmann_choline_supplements_2023. See full canonical Findings in the JSON for detailed endpoints and negative results.

**Decision:** Approve only the PC-to-choline conversion endpoint. Retain D3-PC versus D9-PC distinction and the unmeasured hepatic flux/SAM intermediates; do not add a fully quantified choline-to-SAM-to-PEMT chain.

Schema: passes unchanged validator; not scientific approval.

### BRS4-FM1-PM2::PM2-DIT-3

**Tryptophan → Nicotinamide (a form of vitamin B3)**

Canonical IDs: tryptophan → nicotinamide. Existing claim ceiling: biological-dependency.

Proposed process: Multi-step hepatic tryptophan metabolism can supply nicotinamide for subsequent salvage; this is not a direct one-step reaction.

Original limitation: Most cells outside the liver do not run the full route. The review does not establish what share of the NAD⁺ pool comes from tryptophan, and eating more protein is not shown to raise NAD⁺.

Evidence: PM2-F1; covarrubias_nad_2021. See full canonical Findings in the JSON for detailed endpoints and negative results.

**Decision:** Approve a macro-pathway record to the existing nicotinamide target, explicitly preserving kynurenine/de-novo NAD context and subsequent nicotinamide availability. No conversion factor or extra-protein effect.

Schema: passes unchanged validator; not scientific approval.

### BRS5-FM1-PM1::PM1-DIT-4

**Vitamin A → Retinoic acid**

Canonical IDs: vitamin-a → retinoic-acid. Existing claim ceiling: biological-dependency.

Proposed process: Form-dependent metabolism of dietary retinoids and provitamin A precursors supports retinoic-acid formation.

Original limitation: Conversion and response depend on vitamin A form, status, absorption, and host context; supplementation evidence is not a general dose-response claim for PM1.

Evidence: PM1-F5; cantorna_vitamin_2019, li_retinoid_junction_2017. See full canonical Findings in the JSON for detailed endpoints and negative results.

**Decision:** Approve structured draft reconciliation only, retaining draft-only projection. Preserve form/status dependence and the cell-model result of increased permeability; do not assert universal barrier tightening or release the projection hold.

Schema: passes unchanged validator; not scientific approval.

### BRS5-FM2-PM6::PM6-DIT-2

**Ellagitannins → Ellagic acid**

Canonical IDs: ellagitannins → ellagic-acid. Existing claim ceiling: biological-dependency.

Proposed process: Ellagitannin hydrolysis releases ellagic acid upstream of microbial urolithin formation.

Original limitation: The human study tested a pomegranate-juice matrix rather than isolated equivalence of every ellagitannin; final metabolite generation varies.

Evidence: PM6-F1; singh_direct_2022. See full canonical Findings in the JSON for detailed endpoints and negative results.

**Decision:** Approve correction of the stale missing-substance annotation to the existing ellagitannins ID and a qualified hydrolysis record; preserve blocked public projection unless separately authorised. Pomegranate juice does not establish every ellagitannin or food equivalent.

Schema: passes unchanged validator; not scientific approval.

## Group 3 — Source-identity decisions (three routes)

### BRS2-FM1-PM3::PM3-DIT-5

**Dietary protein → Methionine**

Canonical IDs: UNRESOLVED → methionine. Existing claim ceiling: dietary-provision.

Proposed process: Protein digestion and amino-acid absorption provide methionine.

Original limitation: Dietary protein provides digestible methionine, but this does not establish that increasing protein or methionine intake increases MAT-dependent SAMe synthesis in humans. DIAAS evaluates sulfur amino acids as methionine + cysteine.

Evidence: PM3-F1; fao_diaas_2013. See full canonical Findings in the JSON for detailed endpoints and negative results.

**Decision:** Decide whether to authorise a scoped dietary-protein class identity in a separate ontology task. Keep this conversion unresolved until an appropriate source identity exists; do not substitute an EAA total or equate protein grams with methionine.

Schema: canonical-identity-unresolved, conversion-identity-unresolved.

### BRS2-FM1-PM4::PM4-DIT-2

**Dietary protein → Methionine**

Canonical IDs: UNRESOLVED → methionine. Existing claim ceiling: dietary-provision.

Proposed process: Protein digestion and amino-acid absorption provide methionine to the methionine cycle.

Original limitation: Dietary protein supplies methionine. It does not show that eating more protein increases cycle rates. DIAAS scores sulfur amino acids as methionine plus cysteine.

Evidence: PM4-F1; fao_diaas_2013, finkelstein_homocysteine_1998. See full canonical Findings in the JSON for detailed endpoints and negative results.

**Decision:** Same source-identity decision as PM3, but retain this independent PM-specific assessment. Do not infer increased cycle flux.

Schema: canonical-identity-unresolved, conversion-identity-unresolved.

### BRS5-FM1-PM1::PM1-DIT-2

**Fermentable dietary fibre → Butyrate**

Canonical IDs: UNRESOLVED → butyrate. Existing claim ceiling: biological-dependency.

Proposed process: Microbial fermentation of appropriate dietary substrates can generate butyrate.

Original limitation: Production depends on fibre structure, dose and microbial ecology. Evidence for specific fibres must not be generalised to all fibre, and this relationship does not establish a universal intake threshold or response.

Evidence: PM1-F2; silva_role_2020. See full canonical Findings in the JSON for detailed endpoints and negative results.

**Decision:** Keep blocked pending a decision on the scoped fermentable-fibre source identity. Do not alias total fibre, resistant starch, pectin or FOS/GOS to the whole class. Any narrowing to a specific substrate needs separate admission review.

Schema: canonical-identity-unresolved, conversion-identity-unresolved.

## Cross-cutting boundaries and decisions

- Approve Group 1 as metadata reconciliation, including three exact aliases: Vitamin B9 (folate) → vitamin-b9; Vitamin B12 (cobalamin) → vitamin-b12; Vitamin B2 (riboflavin) → vitamin-b2. These preserve identity, not expand chemical scope or food comparability. No aliases were added.
- Group 2 requires the five explicit qualifications above. Vitamin A remains draft-only. Ellagitannins already exists in the registry; its old missing-substance annotation is stale, but correcting that alone does not release public projection.
- Group 3: recommend retaining the three identity blocks pending scoped ontology authorisation. Dietary protein has two PM-specific routes but one shared missing class identity. Fermentable fibre is a second distinct unresolved class; total fibre or a specific fibre is not an interchangeable substitute. No class IDs invented here.
- Protein overlays retain dietary_addressability:direct despite Derived classification; this is preserved as existing metadata, not silently normalised. Author confirmation is needed before any addressability vocabulary correction.
- Methionine: preserve unchanged whole-blood glutathione concentration during reduced synthesis and the null erythrocyte response to cysteine doses with adequate methionine.
- Vitamin A: the linked Baltes cell-model record reports increased permeability alongside differentiation; a conversion record must not become a universal tighter-barrier claim.
- PC/PEMT: D3-PC methyl-derived labelling is distinct from D9-PC intact-headgroup incorporation; SAM and hepatic flux were not directly measured.
- Tryptophan: retain the multi-step liver/NAD/nicotinamide context, not a one-step reaction or a numerical dietary yield.
- NAC remains supplemental and combined with glycine; no ordinary-food ranking or isolated NAC efficacy is created.
- No downstream quantities, conversion efficiencies, clinical effects or ranked-food coverage gains are assigned by these proposals.

## Validation

14/14 original source hashes unchanged; existing admissions and Derived overlays retained; original citation keys resolve in the bibliography; original limitations and complete supporting Findings preserved. Eight proposals pass the existing structural validator. Three have exact display-name/registry alias mismatches. Three remain correctly blocked by missing canonical source identities. Structural success does not establish scientific sufficiency.

No builds, deployments, PR changes or publication-hold releases. No schema or instruction change is proposed.
