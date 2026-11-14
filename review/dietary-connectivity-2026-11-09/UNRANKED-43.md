# The 43 substances without ranked sources in PR238

Audit of the frozen 68-node network against current canonical records. Food occurrence, accepted PM applicability, fully resolved conversion and quantitative ranking are separate gates. Source details, quantities and limitations are retained in substance-matrix.json. No missing food observation means chemical absence.

## 5-Methyltetrahydrofolate (`5-methyltetrahydrofolate`)

**Disposition:** documented-unranked-food-occurrence. 

**Connected PMs:** BRS2-FM1-PM1

**Canonical dietary records:**
- `BRS2-FM1-PM1::PM1-DIT-1`: Dietary input True; classification direct; accounting A. Source: `docs/biological-targets/brs2/fm1/brs2-fm1-pm1-folate-b12-dependent-homocysteine-remethylation.mdx#dietary_input_traceability/PM1-DIT-1`. Limitation: Necessity of 5-methyltetrahydrofolate does not show that raising its intake increases tissue methionine-synthase flux.

**Food records:** 7 material records; 7 quantitative observation records. Canonical food IDs: broccoli, cauliflower, kale, spinach, swiss-chard.

**Why not ranked in the current wheel:** No authorised compatible comparison pool for this measurement basis

**Verified Derived endpoints:** None passes the complete structured endpoint gate here.

**Recorded but incompletely resolved Derived links:** BRS2-FM1-PM1::PM1-DIT-2

## Acetate (`acetate`)

**Disposition:** contextual-candidate-or-unresolved-only. 

**Connected PMs:** BRS5-FM2-PM5

**Canonical dietary records:**
- `BRS5-FM2-PM5::PM5-DIT-4`: Dietary input False; classification None; accounting E. Source: `docs/biological-targets/brs5/fm2/brs5-fm2-pm5-scfa-production-and-signalling.mdx#dietary_input_traceability/PM5-DIT-4`. Limitation: Endogenous microbial provision, absorption and compartmentation matter. Extra oral intake and benefit are not established by these studies.

**Food records:** 0 material records; 0 quantitative observation records. Canonical food IDs: .

**Why not ranked in the current wheel:** No eligible ranked target in the frozen snapshot; inspect admission, identity and intervention context separately.

**Verified Derived endpoints:** None passes the complete structured endpoint gate here.

**Recorded but incompletely resolved Derived links:** None.

## Acetic acid (`acetic-acid`)

**Disposition:** contextual-candidate-or-unresolved-only. 

**Connected PMs:** BRS6-FM1-PM1

**Canonical dietary records:**
- No matching dietary atom in this checkout. Existing network intervention/context records are retained in JSON; they do not create a dietary admission.

**Food records:** 0 material records; 0 quantitative observation records. Canonical food IDs: .

**Why not ranked in the current wheel:** No eligible ranked target in the frozen snapshot; inspect admission, identity and intervention context separately.

**Verified Derived endpoints:** None passes the complete structured endpoint gate here.

**Recorded but incompletely resolved Derived links:** None.

## Acetoacetate (`acetoacetate`)

**Disposition:** additional-verified-derived-route. 

**Connected PMs:** BRS4-FM3-PM7

**Canonical dietary records:**
- `BRS4-FM3-PM7::PM7-DEFERRED-BIO-1`: Dietary input False; classification None; accounting E. Source: `docs/biological-targets/brs4/fm3/brs4-fm3-pm7-ketone-utilisation-capacity.mdx#dietary_input_traceability/PM7-DEFERRED-BIO-1`. Limitation: Biochemical participant retained without a new canonical dietary-supply admission. Canonical identity/food or endogenous-supply reconciliation is required; no food contains the downstream fuel by inference.

**Food records:** 0 material records; 0 quantitative observation records. Canonical food IDs: .

**Why not ranked in the current wheel:** No eligible ranked target in the frozen snapshot; inspect admission, identity and intervention context separately.

**Verified Derived endpoints:** BRS4-FM3-PM7::PM7-DIT-RECOVERY-CAPRYLIC-TRIGLYCERIDE:BRS4-FM3-PM7::PM7-DIT-RECOVERY-CAPRYLIC-TRIGLYCERIDE:conversion:0>BRS4-FM3-PM7::PM7-DIT-RECOVERY-CAPRYLIC-TRIGLYCERIDE:conversion:1>BRS4-FM3-PM7::PM7-DIT-RECOVERY-CAPRYLIC-TRIGLYCERIDE:conversion:2

**Recorded but incompletely resolved Derived links:** None.

## Arabinan (`arabinan`)

**Disposition:** documented-unranked-food-occurrence. 

**Connected PMs:** BRS5-FM2-PM4

**Canonical dietary records:**
- `BRS5-FM2-PM4::PM4-DIT-1`: Dietary input True; classification direct; accounting A. Source: `docs/biological-targets/brs5/fm2/brs5-fm2-pm4-microbial-ecological-turnover-and-competitive-selection.mdx#dietary_input_traceability/PM4-DIT-1`. Limitation: Defined human-derived communities in mice; the food matrix and competitors affect access. No universal human response, optimal dose or host benefit is established.

**Food records:** 1 material records; 0 quantitative observation records. Canonical food IDs: peas.

**Why not ranked in the current wheel:** Canonical input is pea-fibre arabinan in the tested preparation. Apple cell-wall arabinan cannot stand in for this material.

**Verified Derived endpoints:** None passes the complete structured endpoint gate here.

**Recorded but incompletely resolved Derived links:** None.

## Betaine (`betaine`)

**Disposition:** documented-unranked-food-occurrence. 

**Connected PMs:** BRS1-FM1-PM3, BRS1-FM1-PM4, BRS1-FM3-PM7, BRS2-FM1-PM2, BRS2-FM1-PM3, BRS2-FM1-PM4, BRS2-FM3-PM7

**Canonical dietary records:**
- `BRS1-FM1-PM3::BRS1-PM3-KC1-DONOR-2`: Dietary input True; classification None; accounting C. Source: `docs/biological-targets/brs1/fm1/brs1-fm1-pm3-dopaminergic-signalling-regulation.mdx#dietary_input_traceability/BRS1-PM3-KC1-DONOR-2`. Limitation: This is peripheral BHMT supply, not neuronal BHMT activity or measured delivery into neural SAM. Dietary methionine and folate remethylation provide alternatives. Homocysteine lowering does not establish regional clearance, a limiting constraint or benefit from extra intake.
- `BRS1-FM1-PM4::BRS1-PM4-KC1-DONOR-2`: Dietary input True; classification None; accounting C. Source: `docs/biological-targets/brs1/fm1/brs1-fm1-pm4-noradrenergic-signalling-attention-executive-modulation.mdx#dietary_input_traceability/BRS1-PM4-KC1-DONOR-2`. Limitation: This is peripheral BHMT supply, not neuronal BHMT activity or measured delivery into neural SAM. Dietary methionine and folate remethylation provide alternatives. Homocysteine lowering does not establish regional clearance, a limiting constraint or benefit from extra intake.
- `BRS1-FM3-PM7::PM7-KC1-BETAINE-SUPPLY`: Dietary input True; classification None; accounting C. Source: `docs/biological-targets/brs1/fm3/brs1-fm3-pm7-neuronal-membrane-dha-incorporation.mdx#dietary_input_traceability/PM7-KC1-BETAINE-SUPPLY`. Limitation: Supported biochemical supply chain, not a demonstrated increase in net adult brain DHA incorporation. Folate/choline compensation, hepatic BHMT, SAM turnover and carrier remodelling vary by context. Mouse folate effects were sex/tissue dependent; betaine rescue used ethanol-exposed rats. The downstream human tracer study administered choline, not folate or betaine. A donor-specific limiting effect and extra-intake benefit remain unresolved.
- `BRS2-FM1-PM2::PM2-DIT-1`: Dietary input True; classification direct; accounting C. Source: `docs/biological-targets/brs2/fm1/brs2-fm1-pm2-betaine-bhmt-remethylation.mdx#dietary_input_traceability/PM2-DIT-1`. Limitation: Supplemental betaine lowers plasma homocysteine in healthy adults, but that change does not measure tissue BHMT activity or show a clinical benefit. Human evidence is an eight-man depletion pilot, with the challenge response in four clinically depleted participants; tissue BHMT flux was not measured. Rat donor rescue and specific inhibition support the chain. This does not establish ordinary-diet limitation, response in every tissue or benefit above adequacy. Folate’s indirect constraint on BHMT remains unresolved.
- `BRS2-FM1-PM3::PM3-KC1-UPSTREAM-2`: Dietary input True; classification None; accounting C. Source: `docs/biological-targets/brs2/fm1/brs2-fm1-pm3-same-synthesis.mdx#dietary_input_traceability/PM3-KC1-UPSTREAM-2`. Limitation: BHMT activity is concentrated mainly in liver and kidney; this is not local BHMT activity in every tissue. Folate-dependent remethylation and dietary methionine provide alternative supply. Homocysteine lowering does not establish increased MAT flux, increased SAMe availability or benefit from extra intake in replete individuals.
- `BRS2-FM1-PM4::PM4-KC1-SUPPLY-2`: Dietary input True; classification None; accounting C. Source: `docs/biological-targets/brs2/fm1/brs2-fm1-pm4-methionine-cycle-flux.mdx#dietary_input_traceability/PM4-KC1-SUPPLY-2`. Limitation: BHMT activity is concentrated mainly in liver and kidney; this is not local BHMT activity in every tissue. Folate-dependent remethylation and dietary methionine provide alternative supply. Homocysteine lowering does not establish increased MAT flux, increased SAMe availability or benefit from extra intake in replete individuals.
- `BRS2-FM3-PM7::PM7-DIT-6`: Dietary input True; classification None; accounting C. Source: `docs/biological-targets/brs2/fm3/brs2-fm3-pm7-phosphatidylcholine-formation.mdx#dietary_input_traceability/PM7-DIT-6`. Limitation: Abstract-level rescue evidence under ethanol-induced imbalance does not establish ordinary betaine deficiency, universal intake responsiveness or cognitive benefit; full assay methods remain unavailable.

**Food records:** 5 material records; 2 quantitative observation records. Canonical food IDs: beetroot, quinoa, shrimp, spinach, wheat-germ.

**Why not ranked in the current wheel:** No authorised compatible comparison pool for this measurement basis; Presence-only: no quantitative observation; Unverified or held canonical quantity

**Verified Derived endpoints:** None passes the complete structured endpoint gate here.

**Recorded but incompletely resolved Derived links:** BRS2-FM1-PM2::PM2-DIT-2

## Butyrate (`butyrate`)

**Disposition:** admitted-route-with-unresolved-food-or-conversion. 

**Connected PMs:** BRS5-FM1-PM1, BRS5-FM2-PM4, BRS5-FM2-PM5, BRS6-FM1-PM3

**Canonical dietary records:**
- `BRS5-FM1-PM1::PM1-DIT-1`: Dietary input None; classification direct; accounting A. Source: `docs/biological-targets/brs5/fm1/brs5-fm1-pm1-gut-barrier-tight-junction-integrity.mdx#dietary_input_traceability/PM1-DIT-1`. Limitation: Direct evidence includes a Caco-2 monolayer model and broader mechanistic synthesis; it does not establish that oral butyrate is required, that ordinary intake predictably changes epithelial exposure, or a human intake threshold for PM1.
- `BRS5-FM2-PM5::PM5-DIT-6`: Dietary input False; classification None; accounting E. Source: `docs/biological-targets/brs5/fm2/brs5-fm2-pm5-scfa-production-and-signalling.mdx#dietary_input_traceability/PM5-DIT-6`. Limitation: Endogenous microbial provision, absorption and compartmentation matter. Extra oral intake and benefit are not established by these studies.

**Food records:** 0 material records; 0 quantitative observation records. Canonical food IDs: .

**Why not ranked in the current wheel:** No eligible ranked target in the frozen snapshot; inspect admission, identity and intervention context separately.

**Verified Derived endpoints:** None passes the complete structured endpoint gate here.

**Recorded but incompletely resolved Derived links:** BRS5-FM1-PM1::PM1-DIT-2

## Caprylic Triglyceride (Trioctanoin) (`caprylic-triglyceride`)

**Disposition:** documented-unranked-food-occurrence. 

**Connected PMs:** BRS4-FM3-PM7

**Canonical dietary records:**
- `BRS4-FM3-PM7::PM7-DIT-RECOVERY-CAPRYLIC-TRIGLYCERIDE`: Dietary input True; classification derived; accounting A. Source: `docs/biological-targets/brs4/fm3/brs4-fm3-pm7-ketone-utilisation-capacity.mdx#dietary_input_traceability/PM7-DIT-RECOVERY-CAPRYLIC-TRIGLYCERIDE`. Limitation: Uncontrolled sequential exposure: C8/C10 mixture (n=11) then 95% tricaprylin (n=6), 30 g/day for one month each. No claim of isolated C8 superiority, cognitive efficacy, healthy-person requirement or ordinary coconut-oil equivalence. PET uptake/metabolism is not a direct cellular ATP assay; no food-effective dose or fixed conversion yield is inferred.

**Food records:** 1 material records; 0 quantitative observation records. Canonical food IDs: mct-oil.

**Why not ranked in the current wheel:** The admitted defined C8/C10/tricaprylin protocol explicitly excludes ordinary coconut-oil equivalence. No ordinary-food ranking for this exposure.

**Verified Derived endpoints:** None passes the complete structured endpoint gate here.

**Recorded but incompletely resolved Derived links:** None.

## Coenzyme Q10 (CoQ10) (`coq10`)

**Disposition:** additional-verified-derived-route. 

**Connected PMs:** BRS4-FM1-PM10, BRS4-FM2-PM5

**Canonical dietary records:**
- `BRS4-FM1-PM10::PM10-DIT-5`: Dietary input False; classification None; accounting E. Source: `docs/biological-targets/brs4/fm1/brs4-fm1-pm10-coenzyme-q-biosynthesis-and-pool-availability.mdx#dietary_input_traceability/PM10-DIT-5`. Limitation: Not an independent PM dietary admission. Food occurrence and endogenous biochemical participation remain valid distinct facts.
- `BRS4-FM2-PM5::PM5-BIO-Q`: Dietary input None; classification None; accounting E. Source: `docs/biological-targets/brs4/fm2/brs4-fm2-pm5-mitochondrial-protection-redox-integrity.mdx#dietary_input_traceability/PM5-BIO-Q`. Limitation: The existing coq10 identity and page resolve without a registry change. Ubiquinol is a reduced form, not an alias for oxidised ubiquinone. Dietary supply, endogenous synthesis, redox-form conversion and mitochondrial protective delivery remain separately assessed; no new dietary admission is established.

**Food records:** 9 material records; 1 quantitative observation records. Canonical food IDs: beef, early-harvest-olive-oil, extra-virgin-olive-oil, heart, liver, mackerel, pistachios, sardines.

**Why not ranked in the current wheel:** No eligible ranked target in the frozen snapshot; inspect admission, identity and intervention context separately.

**Verified Derived endpoints:** BRS4-FM1-PM10::PM10-DIT-1:BRS4-FM1-PM10::PM10-DIT-1:conversion:0

**Recorded but incompletely resolved Derived links:** None.

## Creatine (`creatine`)

**Disposition:** additional-verified-derived-route. 

**Connected PMs:** BRS4-FM1-PM3

**Canonical dietary records:**
- `BRS4-FM1-PM3::PM3-DIT-1`: Dietary input True; classification direct; accounting A. Source: `docs/biological-targets/brs4/fm1/brs4-fm1-pm3-creatine-phosphocreatine-buffer.mdx#dietary_input_traceability/PM3-DIT-1`. Limitation: The brain also synthesises creatine, and exogenous exposure produces smaller and less consistent cerebral responses than skeletal-muscle responses.

**Food records:** 6 material records; 1 quantitative observation records. Canonical food IDs: beef, lamb, liver, pork, tuna.

**Why not ranked in the current wheel:** Presence-only: no quantitative observation; Unverified or held canonical quantity

**Verified Derived endpoints:** BRS4-FM1-PM3::PM3-DIT-2:BRS4-FM1-PM3::PM3-DIT-2:conversion:0>BRS4-FM1-PM3::PM3-DIT-2:conversion:1, BRS4-FM1-PM3::PM3-DIT-2:BRS4-FM1-PM3::PM3-DIT-2:conversion:0>BRS4-FM1-PM3::PM3-DIT-3:conversion:1

**Recorded but incompletely resolved Derived links:** None.

## Cysteine (`cysteine`)

**Disposition:** documented-unranked-food-occurrence. 

**Connected PMs:** BRS2-FM2-PM6, BRS3-FM1-PM1, BRS3-FM1-PM2

**Canonical dietary records:**
- `BRS2-FM2-PM6::PM6-DIT-1`: Dietary input True; classification direct; accounting B. Source: `docs/biological-targets/brs2/fm2/brs2-fm2-pm6-glutathione-synthesis.mdx#dietary_input_traceability/PM6-DIT-1`. Limitation: Cysteine is the substrate of the first assembly step. A formula that removed methionine and cysteine together slowed whole-blood synthesis, and that formula also removed methionine. When methionine intake stayed adequate, removing cysteine did not lower red-cell synthesis in young men. This does not show that eating more cysteine, once intake is adequate, raises glutathione synthesis.
- `BRS3-FM1-PM1::PM1-KC1-UPSTREAM-1`: Dietary input True; classification None; accounting C. Source: `docs/biological-targets/brs3/fm1/brs3-fm1-pm1-nf-kb-signalling-regulation.mdx#dietary_input_traceability/PM1-KC1-UPSTREAM-1`. Limitation: This is supported upstream supply, not a demonstrated dietary constraint on NF-κB. Human precursor supplementation measured red-cell glutathione, not NF-κB; cysteine was supplied as N-acetylcysteine together with glycine. Cellular redox studies show context-dependent effects, including inhibition after glutathione depletion or increased extracellular cysteine. Neither individual dietary limitation, brain transfer nor benefit from additional intake is established.
- `BRS3-FM1-PM2::PM2-KC1-UPSTREAM-1`: Dietary input True; classification None; accounting C. Source: `docs/biological-targets/brs3/fm1/brs3-fm1-pm2-gut-derived-inflammatory-signalling.mdx#dietary_input_traceability/PM2-KC1-UPSTREAM-1`. Limitation: Supported upstream supply through glutathione-dependent epithelial redox protection, not an established dietary constraint on endotoxin spillover. Human precursor tracing measured red-cell glutathione after combined glycine and N-acetylcysteine; epithelial experiments measured oxidant-induced paracellular permeability. In Salmonella-infected rats, glutathione depletion did not increase permeability or bacterial translocation. Neither intestinal precursor inadequacy, individual constituent limitation, human LPS reduction nor benefit from additional intake is established.

**Food records:** 8 material records; 0 quantitative observation records. Canonical food IDs: chicken, eggs, lentils, liver, oats, pork, tuna.

**Why not ranked in the current wheel:** Presence-only: no quantitative observation

**Verified Derived endpoints:** None passes the complete structured endpoint gate here.

**Recorded but incompletely resolved Derived links:** BRS2-FM2-PM6::PM6-DIT-9, BRS2-FM2-PM6::PM6-DIT-7

## Ellagic acid (`ellagic-acid`)

**Disposition:** documented-unranked-food-occurrence. 

**Connected PMs:** BRS5-FM2-PM6

**Canonical dietary records:**
- `BRS5-FM2-PM6::PM6-DIT-1`: Dietary input True; classification direct; accounting A. Source: `docs/biological-targets/brs5/fm2/brs5-fm2-pm6-polyphenol-biotransformation-and-mitochondrial-relevant-metabolite-generation.mdx#dietary_input_traceability/PM6-DIT-1`. Limitation: Conversion depends on microbial community and may stop at intermediates. This does not imply universal conversion, increased mitochondrial function or benefit.

**Food records:** 1 material records; 1 quantitative observation records. Canonical food IDs: pomegranates.

**Why not ranked in the current wheel:** No authorised compatible comparison pool for this measurement basis

**Verified Derived endpoints:** None passes the complete structured endpoint gate here.

**Recorded but incompletely resolved Derived links:** BRS5-FM2-PM6::PM6-DIT-2

## Ellagitannins (`ellagitannins`)

**Disposition:** documented-unranked-food-occurrence. 

**Connected PMs:** BRS5-FM2-PM6

**Canonical dietary records:**
- `BRS5-FM2-PM6::PM6-DIT-2`: Dietary input True; classification derived; accounting A. Source: `docs/biological-targets/brs5/fm2/brs5-fm2-pm6-polyphenol-biotransformation-and-mitochondrial-relevant-metabolite-generation.mdx#dietary_input_traceability/PM6-DIT-2`. Limitation: The human study tested a pomegranate-juice matrix rather than isolated equivalence of every ellagitannin; final metabolite generation varies.

**Food records:** 2 material records; 1 quantitative observation records. Canonical food IDs: pomegranates, walnuts.

**Why not ranked in the current wheel:** No authorised compatible comparison pool for this measurement basis; Presence-only: no quantitative observation

**Verified Derived endpoints:** None passes the complete structured endpoint gate here.

**Recorded but incompletely resolved Derived links:** None.

## Epicatechin (`epicatechin`)

**Disposition:** documented-unranked-food-occurrence. 

**Connected PMs:** BRS5-FM2-PM6

**Canonical dietary records:**
- `BRS5-FM2-PM6::PM6-DIT-RECOVERY-EPICATECHIN`: Dietary input True; classification direct; accounting A. Source: `docs/biological-targets/brs5/fm2/brs5-fm2-pm6-polyphenol-biotransformation-and-mitochondrial-relevant-metabolite-generation.mdx#dietary_input_traceability/PM6-DIT-RECOVERY-EPICATECHIN`. Limitation: Donor cultures do not establish a predictable whole-food conversion yield, mitochondrial effect or clinical benefit. Human apple-extract evidence involves mixed monomeric catechins, not isolated epicatechin efficacy. Do not generalise to EGCG or all procyanidins.

**Food records:** 7 material records; 3 quantitative observation records. Canonical food IDs: cacao-nibs-raw, cacao-powder, cocoa, dark-chocolate.

**Why not ranked in the current wheel:** Presence-only: no quantitative observation; Unverified or held canonical quantity

**Verified Derived endpoints:** None passes the complete structured endpoint gate here.

**Recorded but incompletely resolved Derived links:** None.

## Flavin adenine dinucleotide (FAD) (`flavin-adenine-dinucleotide`)

**Disposition:** additional-verified-derived-route. 

**Connected PMs:** BRS1-FM1-PM3, BRS1-FM1-PM4, BRS1-FM1-PM5, BRS2-FM1-PM1, BRS3-FM2-PM6, BRS4-FM1-PM10

**Canonical dietary records:**
- `BRS1-FM1-PM3::PM3-DIT-RECOVERY-FAD`: Dietary input False; classification None; accounting E. Source: `docs/biological-targets/brs1/fm1/brs1-fm1-pm3-dopaminergic-signalling-regulation.mdx#dietary_input_traceability/PM3-DIT-RECOVERY-FAD`. Limitation: This is a biochemical cofactor target, not an independent oral FAD admission or food-content claim.
- `BRS1-FM1-PM4::PM4-DIT-RECOVERY-FAD`: Dietary input False; classification None; accounting E. Source: `docs/biological-targets/brs1/fm1/brs1-fm1-pm4-noradrenergic-signalling-attention-executive-modulation.mdx#dietary_input_traceability/PM4-DIT-RECOVERY-FAD`. Limitation: This is a biochemical cofactor target, not an independent oral FAD admission or food-content claim.
- `BRS1-FM1-PM5::PM5-DIT-RECOVERY-FAD`: Dietary input False; classification None; accounting E. Source: `docs/biological-targets/brs1/fm1/brs1-fm1-pm5-serotonergic-signalling-regulation.mdx#dietary_input_traceability/PM5-DIT-RECOVERY-FAD`. Limitation: This is a biochemical cofactor target, not an independent oral FAD admission or food-content claim.
- `BRS2-FM1-PM1::PM1-DIT-RECOVERY-FAD`: Dietary input False; classification None; accounting E. Source: `docs/biological-targets/brs2/fm1/brs2-fm1-pm1-folate-b12-dependent-homocysteine-remethylation.mdx#dietary_input_traceability/PM1-DIT-RECOVERY-FAD`. Limitation: This is a biochemical cofactor target, not an independent oral FAD admission or food-content claim.
- `BRS3-FM2-PM6::PM6-DIT-4`: Dietary input False; classification None; accounting E. Source: `docs/biological-targets/brs3/fm2/brs3-fm2-pm6-antioxidant-network-recycling.mdx#dietary_input_traceability/PM6-DIT-4`. Limitation: Reaction participation does not establish oral FAD delivery, a food FAD concentration or additional-intake benefit.
- `BRS4-FM1-PM10::PM10-DIT-7`: Dietary input False; classification None; accounting E. Source: `docs/biological-targets/brs4/fm1/brs4-fm1-pm10-coenzyme-q-biosynthesis-and-pool-availability.mdx#dietary_input_traceability/PM10-DIT-7`. Limitation: Not an independent PM dietary admission. Food occurrence and endogenous biochemical participation remain valid distinct facts.

**Food records:** 0 material records; 0 quantitative observation records. Canonical food IDs: .

**Why not ranked in the current wheel:** No eligible ranked target in the frozen snapshot; inspect admission, identity and intervention context separately.

**Verified Derived endpoints:** BRS1-FM1-PM3::PM3-DIT-RECOVERY-VITAMIN-B2:BRS1-FM1-PM3::PM3-DIT-RECOVERY-VITAMIN-B2:conversion:0>BRS1-FM1-PM3::PM3-DIT-RECOVERY-VITAMIN-B2:conversion:1, BRS1-FM1-PM4::PM4-DIT-RECOVERY-VITAMIN-B2:BRS1-FM1-PM4::PM4-DIT-RECOVERY-VITAMIN-B2:conversion:0>BRS1-FM1-PM4::PM4-DIT-RECOVERY-VITAMIN-B2:conversion:1, BRS1-FM1-PM5::PM5-DIT-RECOVERY-VITAMIN-B2:BRS1-FM1-PM5::PM5-DIT-RECOVERY-VITAMIN-B2:conversion:0>BRS1-FM1-PM5::PM5-DIT-RECOVERY-VITAMIN-B2:conversion:1, BRS2-FM1-PM1::PM1-DIT-RECOVERY-VITAMIN-B2:BRS2-FM1-PM1::PM1-DIT-RECOVERY-VITAMIN-B2:conversion:0>BRS2-FM1-PM1::PM1-DIT-RECOVERY-VITAMIN-B2:conversion:1, BRS3-FM2-PM6::PM6-DIT-3:BRS3-FM2-PM6::PM6-DIT-3:conversion:0>BRS3-FM2-PM6::PM6-DIT-3:conversion:1, BRS4-FM1-PM10::PM10-DIT-3:BRS4-FM1-PM10::PM10-DIT-3:conversion:0>BRS4-FM1-PM10::PM10-DIT-3:conversion:1

**Recorded but incompletely resolved Derived links:** None.

## Flavin mononucleotide (FMN) (`flavin-mononucleotide`)

**Disposition:** documented-unranked-food-occurrence. 

**Connected PMs:** BRS4-FM1-PM1

**Canonical dietary records:**
- `BRS4-FM1-PM1::PM1-DIT-2`: Dietary input True; classification direct; accounting A. Source: `docs/biological-targets/brs4/fm1/brs4-fm1-pm1-electron-transport-chain-function.mdx#dietary_input_traceability/PM1-DIT-2`. Limitation: The review identifies the cofactor. It does not show that flavin mononucleotide (FMN) supply limits complex I in ordinary life, or that raising intake increases electron transport.

**Food records:** 1 material records; 0 quantitative observation records. Canonical food IDs: milk.

**Why not ranked in the current wheel:** Presence-only: no quantitative observation

**Verified Derived endpoints:** None passes the complete structured endpoint gate here.

**Recorded but incompletely resolved Derived links:** BRS4-FM1-PM1::PM1-DIT-3

## Fructo-oligosaccharides / galacto-oligosaccharides (`fructo-galacto-oligosaccharides`)

**Disposition:** admitted-route-with-unresolved-food-or-conversion. 

**Connected PMs:** BRS5-FM1-PM1, BRS5-FM2-PM5

**Canonical dietary records:**
- `BRS5-FM1-PM1::PM1-KC1-UPSTREAM-1`: Dietary input True; classification None; accounting C. Source: `docs/biological-targets/brs5/fm1/brs5-fm1-pm1-gut-barrier-tight-junction-integrity.mdx#dietary_input_traceability/PM1-KC1-UPSTREAM-1`. Limitation: Controlled human FOS/GOS fermentation does not establish the effects of inulin alone, individual FOS or GOS, ordinary food portions, or human tight-junction improvement.
- `BRS5-FM2-PM5::PM5-DIT-2`: Dietary input True; classification direct; accounting A. Source: `docs/biological-targets/brs5/fm2/brs5-fm2-pm5-scfa-production-and-signalling.mdx#dietary_input_traceability/PM5-DIT-2`. Limitation: Requiring review: distinguish the studied mixture from individual FOS/GOS constituents, substrate utilisation from measured SCFA production, and SCFAs generally from butyrate. Ileal observations do not establish colonic absence; separate SCFA infusion and modelled estimates do not directly trace substrate conversion.

**Food records:** 0 material records; 0 quantitative observation records. Canonical food IDs: .

**Why not ranked in the current wheel:** The record owns the tested combined preparation, not individual native FOS/GOS. Ordinary-food ranking would substitute constituents for the mixture. The pre-existing admission-review flag remains unchanged.

**Verified Derived endpoints:** None passes the complete structured endpoint gate here.

**Recorded but incompletely resolved Derived links:** None.

## Glucose (`glucose`)

**Disposition:** documented-unranked-food-occurrence. 

**Connected PMs:** BRS5-FM3-PM7

**Canonical dietary records:**
- `BRS5-FM3-PM7::PM7-DIT-2`: Dietary input True; classification direct; accounting A. Source: `docs/biological-targets/brs5/fm3/brs5-fm3-pm7-vagal-ens-signalling-modulation.mdx#dietary_input_traceability/PM7-DIT-2`. Limitation: Experimental neural response is not an optimal intake, an inadequacy threshold or benefit from more sugar.

**Food records:** 2 material records; 2 quantitative observation records. Canonical food IDs: bananas, grapes.

**Why not ranked in the current wheel:** PM owns a luminal glucose sensory stimulus in a mouse circuit, not a nutritional requirement. Highest-glucose foods are not an evidence-based optimisation ranking.

**Verified Derived endpoints:** None passes the complete structured endpoint gate here.

**Recorded but incompletely resolved Derived links:** None.

## Glutamate (`glutamate`)

**Disposition:** documented-unranked-food-occurrence. 

**Connected PMs:** BRS1-FM4-PM9, BRS2-FM2-PM6, BRS5-FM3-PM7

**Canonical dietary records:**
- `BRS1-FM4-PM9::PM9-DIT-1`: Dietary input False; classification None; accounting E. Source: `docs/biological-targets/brs1/fm4/brs1-fm4-pm9-gaba-synthesis-capacity.mdx#dietary_input_traceability/PM9-DIT-1`. Limitation: The evidence establishes glutamate as the GAD substrate, not that dietary glutamate or protein controls neuronal glutamate availability or human brain GABA synthesis.
- `BRS2-FM2-PM6::PM6-DIT-2`: Dietary input True; classification direct; accounting A. Source: `docs/biological-targets/brs2/fm2/brs2-fm2-pm6-glutathione-synthesis.mdx#dietary_input_traceability/PM6-DIT-2`. Limitation: No human study in this assessment showed that changing dietary glutamate changes glutathione synthesis.
- `BRS5-FM3-PM7::PM7-DIT-3`: Dietary input False; classification None; accounting E. Source: `docs/biological-targets/brs5/fm3/brs5-fm3-pm7-vagal-ens-signalling-modulation.mdx#dietary_input_traceability/PM7-DIT-3`. Limitation: This intracellular signalling role does not establish a requirement to eat glutamate or a human health benefit.

**Food records:** 3 material records; 0 quantitative observation records. Canonical food IDs: beef, eggs, tofu.

**Why not ranked in the current wheel:** Presence-only: no quantitative observation

**Verified Derived endpoints:** None passes the complete structured endpoint gate here.

**Recorded but incompletely resolved Derived links:** None.

## Glutamine (`glutamine`)

**Disposition:** documented-unranked-food-occurrence. 

**Connected PMs:** BRS5-FM1-PM1

**Canonical dietary records:**
- `BRS5-FM1-PM1::PM1-DIT-6`: Dietary input True; classification direct; accounting A. Source: `docs/biological-targets/brs5/fm1/brs5-fm1-pm1-gut-barrier-tight-junction-integrity.mdx#dietary_input_traceability/PM1-DIT-6`. Limitation: Glutamine is supplied substantially from endogenous and systemic pools and becomes conditionally indispensable under stress; adult supplementation trials show no overall permeability benefit, so dietary protein or glutamine provision is not established as a general PM1 lever. A separate postinfectious IBS trial supports a selected supplementation response; this does not establish general need. The new Capacity assessment admits supply to junction-supporting cellular capacity, without asserting universal dietary limitation, benefit from extra intake, or equivalence to the supplemental exposure.

**Food records:** 3 material records; 0 quantitative observation records. Canonical food IDs: beef, eggs, tofu.

**Why not ranked in the current wheel:** Presence-only: no quantitative observation

**Verified Derived endpoints:** None passes the complete structured endpoint gate here.

**Recorded but incompletely resolved Derived links:** None.

## Glycine (`glycine`)

**Disposition:** admitted-route-with-unresolved-food-or-conversion. 

**Connected PMs:** BRS2-FM1-PM4, BRS2-FM2-PM6, BRS3-FM1-PM1, BRS3-FM1-PM2, BRS4-FM1-PM3

**Canonical dietary records:**
- `BRS2-FM1-PM4::PM4-DIT-DEFERRED-1`: Dietary input True; classification direct; accounting A. Source: `docs/biological-targets/brs2/fm1/brs2-fm1-pm4-methionine-cycle-flux.mdx#dietary_input_traceability/PM4-DIT-DEFERRED-1`. Limitation: Endogenous glycine synthesis and other methyltransferases also contribute. Enzyme loss is not glycine deficiency; extra dietary glycine has not been established to normalise whole-cycle or brain methylation.
- `BRS2-FM2-PM6::PM6-DIT-3`: Dietary input True; classification direct; accounting A. Source: `docs/biological-targets/brs2/fm2/brs2-fm2-pm6-glutathione-synthesis.mdx#dietary_input_traceability/PM6-DIT-3`. Limitation: In older adults glycine was supplemented together with a cysteine precursor, so that rise in erythrocyte synthesis does not isolate glycine.
- `BRS3-FM1-PM1::PM1-KC1-UPSTREAM-2`: Dietary input True; classification None; accounting C. Source: `docs/biological-targets/brs3/fm1/brs3-fm1-pm1-nf-kb-signalling-regulation.mdx#dietary_input_traceability/PM1-KC1-UPSTREAM-2`. Limitation: This is supported upstream supply, not a demonstrated dietary constraint on NF-κB. Human precursor supplementation measured red-cell glutathione, not NF-κB; cysteine was supplied as N-acetylcysteine together with glycine. Cellular redox studies show context-dependent effects, including inhibition after glutathione depletion or increased extracellular cysteine. Neither individual dietary limitation, brain transfer nor benefit from additional intake is established.
- `BRS3-FM1-PM2::PM2-KC1-UPSTREAM-2`: Dietary input True; classification None; accounting C. Source: `docs/biological-targets/brs3/fm1/brs3-fm1-pm2-gut-derived-inflammatory-signalling.mdx#dietary_input_traceability/PM2-KC1-UPSTREAM-2`. Limitation: Supported upstream supply through glutathione-dependent epithelial redox protection, not an established dietary constraint on endotoxin spillover. Human precursor tracing measured red-cell glutathione after combined glycine and N-acetylcysteine; epithelial experiments measured oxidant-induced paracellular permeability. In Salmonella-infected rats, glutathione depletion did not increase permeability or bacterial translocation. Neither intestinal precursor inadequacy, individual constituent limitation, human LPS reduction nor benefit from additional intake is established.
- `BRS4-FM1-PM3::PM3-DIT-3`: Dietary input True; classification derived; accounting A. Source: `docs/biological-targets/brs4/fm1/brs4-fm1-pm3-creatine-phosphocreatine-buffer.mdx#dietary_input_traceability/PM3-DIT-3`. Limitation: Capacity of the endogenous synthesis route is distinct from a claim that extra amino-acid intake raises cerebral creatine, phosphocreatine buffering or cognition. AGAT feedback, GAMT methyl supply, organ exchange and SLC6A8-mediated tissue transport constrain delivery. Human renal GAA production is not a measurement of brain synthesis flux; rat arginine infusion and glycine null responses are not oral human efficacy experiments.

**Food records:** 0 material records; 0 quantitative observation records. Canonical food IDs: .

**Why not ranked in the current wheel:** No eligible ranked target in the frozen snapshot; inspect admission, identity and intervention context separately.

**Verified Derived endpoints:** None passes the complete structured endpoint gate here.

**Recorded but incompletely resolved Derived links:** None.

## Inulin (`inulin`)

**Disposition:** documented-unranked-food-occurrence. 

**Connected PMs:** BRS5-FM2-PM4, BRS5-FM2-PM5

**Canonical dietary records:**
- `BRS5-FM2-PM4::PM4-DIT-DEFERRED-1`: Dietary input True; classification direct; accounting A. Source: `docs/biological-targets/brs5/fm2/brs5-fm2-pm4-microbial-ecological-turnover-and-competitive-selection.mdx#dietary_input_traceability/PM4-DIT-DEFERRED-1`. Limitation: Utilisation genes, chain length, alternative substrates and resident organisms constrain the response. A supplied inulin substrate is not an indispensable intake, a guaranteed abundance shift, butyrate yield, mucus effect or clinical benefit.
- `BRS5-FM2-PM5::PM5-DIT-RECOVERY-INULIN`: Dietary input True; classification direct; accounting A. Source: `docs/biological-targets/brs5/fm2/brs5-fm2-pm5-scfa-production-and-signalling.mdx#dietary_input_traceability/PM5-DIT-RECOVERY-INULIN`. Limitation: Culture conditions and community composition constrain production. Human inulin tracer estimates depend on assumed systemic availability; the human chicory-inulin trial did not significantly increase faecal butyrate. No fixed food yield, intake target or brain benefit is established.

**Food records:** 1 material records; 1 quantitative observation records. Canonical food IDs: asparagus.

**Why not ranked in the current wheel:** No authorised compatible comparison pool for this measurement basis

**Verified Derived endpoints:** None passes the complete structured endpoint gate here.

**Recorded but incompletely resolved Derived links:** None.

## L-Carnitine (`l-carnitine`)

**Disposition:** admitted-route-with-unresolved-food-or-conversion. 

**Connected PMs:** BRS4-FM3-PM6

**Canonical dietary records:**
- `BRS4-FM3-PM6::PM6-DEFERRED-BIO-1`: Dietary input None; classification None; accounting E. Source: `docs/biological-targets/brs4/fm3/brs4-fm3-pm6-carnitine-mediated-fat-transport.mdx#dietary_input_traceability/PM6-DEFERRED-BIO-1`. Limitation: Reaction participation is distinct from a dietary effect. Identity is reconciled; the separate Capacity admission does not establish benefit from extra intake, ordinary-food efficacy or equivalent effects of different carnitine formulations.
- `BRS4-FM3-PM6::PM6-DIT-CARNITINE-1`: Dietary input True; classification direct; accounting A. Source: `docs/biological-targets/brs4/fm3/brs4-fm3-pm6-carnitine-mediated-fat-transport.mdx#dietary_input_traceability/PM6-DIT-CARNITINE-1`. Limitation: Functional dependency and food composition support Capacity, not a need to increase intake. Endogenous synthesis, tissue uptake and conservation also sustain the pool. The existing extracted carnitine/carbohydrate intervention is formulation-specific; meat or dairy effects on transport flux, brain function or ADHD are not established.

**Food records:** 0 material records; 0 quantitative observation records. Canonical food IDs: .

**Why not ranked in the current wheel:** No eligible ranked target in the frozen snapshot; inspect admission, identity and intervention context separately.

**Verified Derived endpoints:** None passes the complete structured endpoint gate here.

**Recorded but incompletely resolved Derived links:** None.

## N-acetylcysteine (`n-acetylcysteine`)

**Disposition:** admitted-route-with-unresolved-food-or-conversion. 

**Connected PMs:** BRS2-FM2-PM6

**Canonical dietary records:**
- `BRS2-FM2-PM6::PM6-DIT-7`: Dietary input True; classification derived; accounting A. Source: `docs/biological-targets/brs2/fm2/brs2-fm2-pm6-glutathione-synthesis.mdx#dietary_input_traceability/PM6-DIT-7`. Limitation: The synthesis increase was measured in older adults given this precursor together with glycine. It does not show an effect of N-acetylcysteine alone, of ordinary foods, or of supplementation outside that group, and it is not a neuronal or clinical result.

**Food records:** 0 material records; 0 quantitative observation records. Canonical food IDs: .

**Why not ranked in the current wheel:** The admitted exposure is supplemental NAC combined with glycine. Ordinary-food ranking is not appropriate to this protocol; retain the admission and trial limitations.

**Verified Derived endpoints:** None passes the complete structured endpoint gate here.

**Recorded but incompletely resolved Derived links:** None.

## NAD+ (oxidised nicotinamide adenine dinucleotide) (`nad-plus`)

**Disposition:** additional-verified-derived-route. 

**Connected PMs:** BRS4-FM1-PM2

**Canonical dietary records:**
- `BRS4-FM1-PM2::PM2-DIT-RECOVERY-NAD-PLUS`: Dietary input False; classification None; accounting E. Source: `docs/biological-targets/brs4/fm1/brs4-fm1-pm2-nad-metabolism.mdx#dietary_input_traceability/PM2-DIT-RECOVERY-NAD-PLUS`. Limitation: This is a biochemical cofactor target, not an independent oral target admission or food-content claim.

**Food records:** 0 material records; 0 quantitative observation records. Canonical food IDs: .

**Why not ranked in the current wheel:** No eligible ranked target in the frozen snapshot; inspect admission, identity and intervention context separately.

**Verified Derived endpoints:** BRS4-FM1-PM2::PM2-DIT-RECOVERY-NICOTINAMIDE-RIBOSIDE:BRS4-FM1-PM2::PM2-DIT-RECOVERY-NICOTINAMIDE-RIBOSIDE:conversion:0>BRS4-FM1-PM2::PM2-DIT-RECOVERY-NICOTINAMIDE-RIBOSIDE:conversion:1

**Recorded but incompletely resolved Derived links:** None.

## Nicotinamide (`nicotinamide`)

**Disposition:** admitted-route-with-unresolved-food-or-conversion. 

**Connected PMs:** BRS4-FM1-PM2

**Canonical dietary records:**
- `BRS4-FM1-PM2::PM2-DIT-1`: Dietary input True; classification direct; accounting A. Source: `docs/biological-targets/brs4/fm1/brs4-fm1-pm2-nad-metabolism.mdx#dietary_input_traceability/PM2-DIT-1`. Limitation: The review identifies the salvage substrate. It does not show that eating more nicotinamide, once intake is adequate, raises NAD⁺. The myopathy niacin study used nicotinic acid at pharmacological doses.

**Food records:** 0 material records; 0 quantitative observation records. Canonical food IDs: .

**Why not ranked in the current wheel:** No eligible ranked target in the frozen snapshot; inspect admission, identity and intervention context separately.

**Verified Derived endpoints:** None passes the complete structured endpoint gate here.

**Recorded but incompletely resolved Derived links:** BRS4-FM1-PM2::PM2-DIT-3

## Nicotinamide riboside (`nicotinamide-riboside`)

**Disposition:** documented-unranked-food-occurrence. 

**Connected PMs:** BRS4-FM1-PM2

**Canonical dietary records:**
- `BRS4-FM1-PM2::PM2-DIT-RECOVERY-NICOTINAMIDE-RIBOSIDE`: Dietary input True; classification derived; accounting A. Source: `docs/biological-targets/brs4/fm1/brs4-fm1-pm2-nad-metabolism.mdx#dietary_input_traceability/PM2-DIT-RECOVERY-NICOTINAMIDE-RIBOSIDE`. Limitation: Supplemental NR chloride at 100–1000 mg is not an effective milk dose. Blood responses do not establish neuronal or mitochondrial NAD delivery, redox flux, superiority to adequate niacin or clinical benefit. Intestinal metabolism and tissue salvage can differ from the displayed intracellular NRK route; other NAD precursors remain alternatives.

**Food records:** 1 material records; 0 quantitative observation records. Canonical food IDs: milk.

**Why not ranked in the current wheel:** Presence-only: no quantitative observation

**Verified Derived endpoints:** None passes the complete structured endpoint gate here.

**Recorded but incompletely resolved Derived links:** None.

## Nicotinic acid (`nicotinic-acid`)

**Disposition:** admitted-route-with-unresolved-food-or-conversion. 

**Connected PMs:** BRS4-FM1-PM2

**Canonical dietary records:**
- `BRS4-FM1-PM2::PM2-DIT-2`: Dietary input True; classification direct; accounting A. Source: `docs/biological-targets/brs4/fm1/brs4-fm1-pm2-nad-metabolism.mdx#dietary_input_traceability/PM2-DIT-2`. Limitation: In five adults with mitochondrial myopathy, niacin at 750–1,000 mg/day raised blood NAD⁺ and brought muscle NAD⁺ to the control level. That is medical dosing in a deficiency disease, not a result for adequate everyday intake, and attention was not measured.

**Food records:** 0 material records; 0 quantitative observation records. Canonical food IDs: .

**Why not ranked in the current wheel:** No eligible ranked target in the frozen snapshot; inspect admission, identity and intervention context separately.

**Verified Derived endpoints:** None passes the complete structured endpoint gate here.

**Recorded but incompletely resolved Derived links:** None.

## Oligofructose (`oligofructose`)

**Disposition:** admitted-route-with-unresolved-food-or-conversion. 

**Connected PMs:** BRS3-FM1-PM2, BRS5-FM1-PM2

**Canonical dietary records:**
- `BRS3-FM1-PM2::PM2-DIT-RECOVERY-OLIGOFRUCTOSE`: Dietary input True; classification direct; accounting A. Source: `docs/biological-targets/brs3/fm1/brs3-fm1-pm2-gut-derived-inflammatory-signalling.mdx#dietary_input_traceability/PM2-DIT-RECOVERY-OLIGOFRUCTOSE`. Limitation: Defined 10% w/w mouse feeding is not a human dose or an ordinary-food effect. This is state regulation, not indispensability. Oligofructose is not chemically converted into GLP-2; no isolated butyrate mediation, generic fibre effect or brain benefit is established.
- `BRS5-FM1-PM2::PM2-DIT-1`: Dietary input True; classification direct; accounting A. Source: `docs/biological-targets/brs5/fm1/brs5-fm1-pm2-lps-endotoxin-containment.mdx#dietary_input_traceability/PM2-DIT-1`. Limitation: The human result used 21 g/day for 12 weeks in 37 adults; it does not establish nutritional necessity, clinical benefit or equivalent effects from every food or fibre.

**Food records:** 0 material records; 0 quantitative observation records. Canonical food IDs: .

**Why not ranked in the current wheel:** Both PM records own a defined experimental oligofructose exposure and explicitly disclaim ordinary-food equivalence. Do not rank food fructans as equivalent to that exposure.

**Verified Derived endpoints:** None passes the complete structured endpoint gate here.

**Recorded but incompletely resolved Derived links:** None.

## Pectin (`pectin`)

**Disposition:** documented-unranked-food-occurrence. 

**Connected PMs:** BRS5-FM1-PM1, BRS5-FM2-PM4, BRS5-FM2-PM5

**Canonical dietary records:**
- `BRS5-FM1-PM1::PM1-KC1-UPSTREAM-2`: Dietary input True; classification None; accounting C. Source: `docs/biological-targets/brs5/fm1/brs5-fm1-pm1-gut-barrier-tight-junction-integrity.mdx#dietary_input_traceability/PM1-KC1-UPSTREAM-2`. Limitation: Human-faecal culture evidence is preparation-dependent and predominantly acetate-generating; it does not establish a uniform butyrate yield or human tight-junction benefit. Apple and citrus preparations are not interchangeable.
- `BRS5-FM2-PM4::PM4-DIT-2`: Dietary input True; classification direct; accounting A. Source: `docs/biological-targets/brs5/fm2/brs5-fm2-pm4-microbial-ecological-turnover-and-competitive-selection.mdx#dietary_input_traceability/PM4-DIT-2`. Limitation: Defined-community mouse experiments and glycan assays do not establish equivalence across all pectins, a human intake target or beneficial host outcomes.
- `BRS5-FM2-PM5::PM5-DIT-3`: Dietary input True; classification direct; accounting A. Source: `docs/biological-targets/brs5/fm2/brs5-fm2-pm5-scfa-production-and-signalling.mdx#dietary_input_traceability/PM5-DIT-3`. Limitation: Pectin structure, purified preparation, donor community and enriched culture medium affect interpretation. Pascale is secondary synthesis; Bang is bounded primary culture evidence. Whole apples are not equivalent to the tested citrus preparation; no human brain or clinical benefit is established.

**Food records:** 1 material records; 0 quantitative observation records. Canonical food IDs: apples.

**Why not ranked in the current wheel:** Canonical input is specifically citrus pectin. Four general-food total-pectic measurements do not establish the admitted citrus material.; Presence-only: no quantitative observation

**Verified Derived endpoints:** None passes the complete structured endpoint gate here.

**Recorded but incompletely resolved Derived links:** None.

## Phenylalanine (`phenylalanine`)

**Disposition:** documented-unranked-food-occurrence. Verified extraction now supplies ranked observations in the local audit; wheel unchanged.

**Connected PMs:** BRS1-FM1-PM1, BRS1-FM1-PM3, BRS1-FM1-PM4

**Canonical dietary records:**
- `BRS1-FM1-PM3::PM3-KC1-PHENYLALANINE-SUPPLY`: Dietary input True; classification None; accounting C. Source: `docs/biological-targets/brs1/fm1/brs1-fm1-pm3-dopaminergic-signalling-regulation.mdx#dietary_input_traceability/PM3-KC1-PHENYLALANINE-SUPPLY`. Limitation: Human peripheral conversion supplies circulating tyrosine; neuronal delivery uses the separately supported transport chain. This does not establish increased dopamine/noradrenaline output, a limiting intake or benefit from extra phenylalanine. Hydroxylation, renal/hepatic function and LNAA competition matter; high phenylalanine is not interchangeable with tyrosine.
- `BRS1-FM1-PM4::PM4-KC1-PHENYLALANINE-SUPPLY`: Dietary input True; classification None; accounting C. Source: `docs/biological-targets/brs1/fm1/brs1-fm1-pm4-noradrenergic-signalling-attention-executive-modulation.mdx#dietary_input_traceability/PM4-KC1-PHENYLALANINE-SUPPLY`. Limitation: Human peripheral conversion supplies circulating tyrosine; neuronal delivery uses the separately supported transport chain. This does not establish increased dopamine/noradrenaline output, a limiting intake or benefit from extra phenylalanine. Hydroxylation, renal/hepatic function and LNAA competition matter; high phenylalanine is not interchangeable with tyrosine.

**Food records:** 18 material records; 18 quantitative observation records. Canonical food IDs: almonds, cheddar-cheese, chicken, chickpeas, eggs, kidney-beans, lentils, milk, mussels, oats, peanuts, pumpkin-seeds, quinoa, sardines, sunflower-seeds, tofu, tuna, turkey.

**Why not ranked in the current wheel:** Below the provisional one-tenth threshold inside this basis.; Qualifies but outside maximum 10; equal-power ties use canonical food ID

**Verified Derived endpoints:** None passes the complete structured endpoint gate here.

**Recorded but incompletely resolved Derived links:** None.

## Phosphatidylcholine (PC) (`phosphatidylcholine`)

**Disposition:** documented-unranked-food-occurrence. 

**Connected PMs:** BRS1-FM2-PM6, BRS2-FM3-PM7

**Canonical dietary records:**
- `BRS1-FM2-PM6::PM6-DIT-2`: Dietary input True; classification derived; accounting A. Source: `docs/biological-targets/brs1/fm2/brs1-fm2-pm6-acetylcholine-synthesis-support.mdx#dietary_input_traceability/PM6-DIT-2`. Limitation: Human tracer evidence establishes phosphatidylcholine as a choline-provision route; it does not show delivery to cholinergic terminals or increased brain acetylcholine synthesis.
- `BRS2-FM3-PM7::PM7-DIT-4`: Dietary input True; classification derived; accounting A. Source: `docs/biological-targets/brs2/fm3/brs2-fm3-pm7-phosphatidylcholine-formation.mdx#dietary_input_traceability/PM7-DIT-4`. Limitation: Plasma tracing does not measure absolute hepatic flux, intermediary SAM, ordinary-food equivalence or benefit.

**Food records:** 6 material records; 0 quantitative observation records. Canonical food IDs: mussels, oysters, salmon-roe, soy-lecithin, sunflower-lecithin, trout-roe.

**Why not ranked in the current wheel:** Presence-only: no quantitative observation

**Verified Derived endpoints:** None passes the complete structured endpoint gate here.

**Recorded but incompletely resolved Derived links:** None.

## Phytate (`phytate`)

**Disposition:** documented-unranked-food-occurrence. 

**Connected PMs:** BRS1-FM1-PM3, BRS1-FM1-PM4, BRS1-FM1-PM5

**Canonical dietary records:**
- No matching dietary atom in this checkout. Existing network intervention/context records are retained in JSON; they do not create a dietary admission.

**Food records:** 2 material records; 0 quantitative observation records. Canonical food IDs: amaranth.

**Why not ranked in the current wheel:** No eligible ranked target in the frozen snapshot; inspect admission, identity and intervention context separately.

**Verified Derived endpoints:** None passes the complete structured endpoint gate here.

**Recorded but incompletely resolved Derived links:** None.

## Propionate (`propionate`)

**Disposition:** contextual-candidate-or-unresolved-only. 

**Connected PMs:** BRS5-FM2-PM5

**Canonical dietary records:**
- `BRS5-FM2-PM5::PM5-DIT-5`: Dietary input False; classification None; accounting E. Source: `docs/biological-targets/brs5/fm2/brs5-fm2-pm5-scfa-production-and-signalling.mdx#dietary_input_traceability/PM5-DIT-5`. Limitation: Endogenous microbial provision, absorption and compartmentation matter. Extra oral intake and benefit are not established by these studies.

**Food records:** 0 material records; 0 quantitative observation records. Canonical food IDs: .

**Why not ranked in the current wheel:** No eligible ranked target in the frozen snapshot; inspect admission, identity and intervention context separately.

**Verified Derived endpoints:** None passes the complete structured endpoint gate here.

**Recorded but incompletely resolved Derived links:** None.

## Pyridoxal 5′-phosphate (PLP) (`pyridoxal-5-phosphate`)

**Disposition:** additional-verified-derived-route. 

**Connected PMs:** BRS1-FM1-PM3, BRS1-FM1-PM4, BRS1-FM1-PM5, BRS1-FM4-PM9, BRS2-FM2-PM5, BRS5-FM3-PM8

**Canonical dietary records:**
- `BRS1-FM1-PM3::PM3-DIT-2`: Dietary input None; classification direct; accounting E. Source: `docs/biological-targets/brs1/fm1/brs1-fm1-pm3-dopaminergic-signalling-regulation.mdx#dietary_input_traceability/PM3-DIT-2`. Limitation: Kennedy reviews B-vitamin roles in neurochemical synthesis; this does not establish dietary PLP provision or an intake-to-dopamine response in humans.
- `BRS1-FM1-PM4::PM4-DIT-2`: Dietary input None; classification direct; accounting E. Source: `docs/biological-targets/brs1/fm1/brs1-fm1-pm4-noradrenergic-signalling-attention-executive-modulation.mdx#dietary_input_traceability/PM4-DIT-2`. Limitation: Kennedy reviews B-vitamin roles in neurochemical synthesis; this does not establish dietary PLP provision or an intake-to-noradrenaline response in humans.
- `BRS1-FM1-PM5::PM5-DIT-3`: Dietary input None; classification direct; accounting E. Source: `docs/biological-targets/brs1/fm1/brs1-fm1-pm5-serotonergic-signalling-regulation.mdx#dietary_input_traceability/PM5-DIT-3`. Limitation: Kennedy reviews B-vitamin roles in neurochemical synthesis; this does not establish dietary PLP provision or an intake-to-serotonin response in humans.
- `BRS1-FM4-PM9::PM9-DIT-2`: Dietary input None; classification direct; accounting E. Source: `docs/biological-targets/brs1/fm4/brs1-fm4-pm9-gaba-synthesis-capacity.mdx#dietary_input_traceability/PM9-DIT-2`. Limitation: The evidence establishes PLP dependence of GAD, but not dietary PLP provision or an intake-to-synthesis response in humans.
- `BRS2-FM2-PM5::PM5-DIT-1`: Dietary input True; classification direct; accounting A. Source: `docs/biological-targets/brs2/fm2/brs2-fm2-pm5-transsulfuration-pathway.mdx#dietary_input_traceability/PM5-DIT-1`. Limitation: Purified-enzyme dependence on pyridoxal 5'-phosphate does not show that raising vitamin B6 intake increases cysteine formation in people. Moderate B6 restriction changed cystathionine handling but did not significantly reduce total transsulfuration in the assessed human tracer study.
- `BRS5-FM3-PM8::PM8-DIT-3`: Dietary input False; classification None; accounting E. Source: `docs/biological-targets/brs5/fm3/brs5-fm3-pm8-neurotransmitter-precursor-biotransformation-and-availability.mdx#dietary_input_traceability/PM8-DIT-3`. Limitation: Microbes can synthesise cofactors; this does not establish a host dietary vitamin B6 requirement or a beneficial direction of tryptophanase activity.

**Food records:** 1 material records; 0 quantitative observation records. Canonical food IDs: milk.

**Why not ranked in the current wheel:** Presence-only: no quantitative observation

**Verified Derived endpoints:** BRS1-FM4-PM9::PM9-DIT-3:BRS1-FM4-PM9::PM9-DIT-3:conversion:0

**Recorded but incompletely resolved Derived links:** BRS1-FM1-PM3::PM3-DIT-3, BRS1-FM1-PM4::PM4-DIT-3, BRS1-FM1-PM5::PM5-DIT-4, BRS2-FM2-PM5::PM5-DIT-2

## Resistant starch (`resistant-starch`)

**Disposition:** documented-unranked-food-occurrence. 

**Connected PMs:** BRS5-FM1-PM1, BRS5-FM2-PM4, BRS5-FM2-PM5, BRS6-FM1-PM3

**Canonical dietary records:**
- `BRS5-FM1-PM1::PM1-KC1-UPSTREAM-3`: Dietary input True; classification None; accounting C. Source: `docs/biological-targets/brs5/fm1/brs5-fm1-pm1-gut-barrier-tight-junction-integrity.mdx#dietary_input_traceability/PM1-KC1-UPSTREAM-3`. Limitation: Response varies with starch type, preparation, dose and microbiota. Faecal short-chain fatty acids do not measure epithelial delivery or establish human tight-junction improvement; resistant potato starch results do not establish effects for every RS2 or RS3 preparation.
- `BRS5-FM2-PM4::PM4-DIT-3`: Dietary input True; classification direct; accounting A. Source: `docs/biological-targets/brs5/fm2/brs5-fm2-pm4-microbial-ecological-turnover-and-competitive-selection.mdx#dietary_input_traceability/PM4-DIT-3`. Limitation: Cultures and one donor’s faecal rescue do not establish oral R. bromii efficacy, uniform human processing, equivalence to RS4 or clinical benefit.
- `BRS5-FM2-PM5::PM5-DIT-1`: Dietary input True; classification direct; accounting A. Source: `docs/biological-targets/brs5/fm2/brs5-fm2-pm5-scfa-production-and-signalling.mdx#dietary_input_traceability/PM5-DIT-1`. Limitation: Utilisation and product distribution depend on starch structure, processing, accessibility, primary degraders and cross-feeding partners. Evidence for one formulation does not establish an equivalent butyrate response from another preparation or whole food. No predictable yield, intake target or brain benefit is established.
- `BRS6-FM1-PM3::PM3-DIT-RECOVERY-RESISTANT-STARCH`: Dietary input True; classification direct; accounting A. Source: `docs/biological-targets/brs6/fm1/brs6-fm1-pm3-insulin-sensitivity-and-glucose-disposal.mdx#dietary_input_traceability/PM3-DIT-RECOVERY-RESISTANT-STARCH`. Limitation: Preparation-, dose- and population-specific. The positive study used 30 g/day for four weeks in ten healthy participants; this is not an effective whole-food dose. Preserve the later 40 g/day type-2-diabetes null. SCFA mediation and universal benefit are unestablished; no brain or ADHD inference.

**Food records:** 4 material records; 4 quantitative observation records. Canonical food IDs: bananas, black-beans, chickpeas, potatoes.

**Why not ranked in the current wheel:** Measurement range; no point ranking or midpoint substitution; PM owns protocol-specific resistant-starch modulation, with positive and null trial results. Food concentration cannot establish tested formulation or effective dose.

**Verified Derived endpoints:** None passes the complete structured endpoint gate here.

**Recorded but incompletely resolved Derived links:** None.

## Retinoic acid (`retinoic-acid`)

**Disposition:** admitted-route-with-unresolved-food-or-conversion. 

**Connected PMs:** BRS5-FM1-PM1

**Canonical dietary records:**
- `BRS5-FM1-PM1::PM1-DIT-3`: Dietary input None; classification direct; accounting A. Source: `docs/biological-targets/brs5/fm1/brs5-fm1-pm1-gut-barrier-tight-junction-integrity.mdx#dietary_input_traceability/PM1-DIT-3`. Limitation: Evidence is dominated by cell, animal, deficiency-context, and mechanistic studies; it does not establish retinoic acid as an oral lever or show benefit from increasing intake in vitamin-A-sufficient people.

**Food records:** 0 material records; 0 quantitative observation records. Canonical food IDs: .

**Why not ranked in the current wheel:** No eligible ranked target in the frozen snapshot; inspect admission, identity and intervention context separately.

**Verified Derived endpoints:** None passes the complete structured endpoint gate here.

**Recorded but incompletely resolved Derived links:** BRS5-FM1-PM1::PM1-DIT-4

## S-adenosylmethionine (SAM) (`s-adenosylmethionine`)

**Disposition:** additional-verified-derived-route. 

**Connected PMs:** BRS-X(Circadian-FM1-PM3), BRS2-FM3-PM7, BRS4-FM1-PM10, BRS4-FM1-PM3

**Canonical dietary records:**
- `BRS2-FM3-PM7::PM7-DIT-2`: Dietary input False; classification None; accounting B. Source: `docs/biological-targets/brs2/fm3/brs2-fm3-pm7-phosphatidylcholine-formation.mdx#dietary_input_traceability/PM7-DIT-2`. Limitation: SAMe is made for this reaction by methionine adenosyltransferase. Needing SAMe as a substrate does not make SAMe supplements a requirement of the methylation, and it does not show that raising SAMe intake increases PEMT activity in humans.
- `BRS4-FM1-PM10::PM10-DIT-6`: Dietary input False; classification None; accounting E. Source: `docs/biological-targets/brs4/fm1/brs4-fm1-pm10-coenzyme-q-biosynthesis-and-pool-availability.mdx#dietary_input_traceability/PM10-DIT-6`. Limitation: Not an independent PM dietary admission. Food occurrence and endogenous biochemical participation remain valid distinct facts.
- `BRS4-FM1-PM3::PM3-DIT-4`: Dietary input False; classification None; accounting E. Source: `docs/biological-targets/brs4/fm1/brs4-fm1-pm3-creatine-phosphocreatine-buffer.mdx#dietary_input_traceability/PM3-DIT-4`. Limitation: The dietary methionine route is assessed separately. This intracellular SAM participant is not a requirement to consume SAM supplements.
- `BRS-X(Circadian-FM1-PM3)::PM3-DIT-2`: Dietary input False; classification None; accounting E. Source: `docs/biological-targets/brs-x/circadian/fm1/brs-x-circadian-fm1-pm3-melatonin-biosynthesis-and-availability.mdx#dietary_input_traceability/PM3-DIT-2`. Limitation: Not a direct dietary requirement. Folate, vitamin B12, vitamin B6 and iron are not admitted on this PM.

**Food records:** 0 material records; 0 quantitative observation records. Canonical food IDs: .

**Why not ranked in the current wheel:** No eligible ranked target in the frozen snapshot; inspect admission, identity and intervention context separately.

**Verified Derived endpoints:** BRS2-FM3-PM7::PM7-DIT-RECOVERY-METHIONINE:BRS2-FM3-PM7::PM7-DIT-RECOVERY-METHIONINE:conversion:0, BRS4-FM1-PM10::PM10-DIT-2:BRS4-FM1-PM10::PM10-DIT-2:conversion:0, BRS4-FM1-PM3::PM3-DIT-RECOVERY-METHIONINE:BRS4-FM1-PM3::PM3-DIT-RECOVERY-METHIONINE:conversion:0

**Recorded but incompletely resolved Derived links:** None.

## Serine (`serine`)

**Disposition:** admitted-route-with-unresolved-food-or-conversion. 

**Connected PMs:** BRS2-FM2-PM5

**Canonical dietary records:**
- `BRS2-FM2-PM5::PM5-DIT-4`: Dietary input True; classification None; accounting A. Source: `docs/biological-targets/brs2/fm2/brs2-fm2-pm5-transsulfuration-pathway.mdx#dietary_input_traceability/PM5-DIT-4`. Limitation: Serine is a direct enzyme substrate. Endogenous synthesis and diet can both supply it; this does not show that dietary serine or protein intake increases cystathionine formation.

**Food records:** 0 material records; 0 quantitative observation records. Canonical food IDs: .

**Why not ranked in the current wheel:** No eligible ranked target in the frozen snapshot; inspect admission, identity and intervention context separately.

**Verified Derived endpoints:** None passes the complete structured endpoint gate here.

**Recorded but incompletely resolved Derived links:** None.

## Short-Chain Fatty Acids (SCFAs) (`scfas`)

**Disposition:** contextual-candidate-or-unresolved-only. 

**Connected PMs:** BRS5-FM2-PM4, BRS5-FM2-PM5

**Canonical dietary records:**
- No matching dietary atom in this checkout. Existing network intervention/context records are retained in JSON; they do not create a dietary admission.

**Food records:** 0 material records; 0 quantitative observation records. Canonical food IDs: .

**Why not ranked in the current wheel:** No eligible ranked target in the frozen snapshot; inspect admission, identity and intervention context separately.

**Verified Derived endpoints:** None passes the complete structured endpoint gate here.

**Recorded but incompletely resolved Derived links:** None.

## Sulforaphane (`sulforaphane`)

**Disposition:** documented-unranked-food-occurrence. 

**Connected PMs:** BRS3-FM2-PM3

**Canonical dietary records:**
- `BRS3-FM2-PM3::PM3-DIT-1`: Dietary input True; classification direct; accounting A. Source: `docs/biological-targets/brs3/fm2/brs3-fm2-pm3-nrf2-are-antioxidant-activation.mdx#dietary_input_traceability/PM3-DIT-1`. Limitation: Human target engagement varies by formulation, tissue and population. The positive study used a myrosinase-completed broccoli sprout homogenate for three days in healthy nonsmokers and measured nasal phase II enzyme RNA, not Nrf2 protein or nuclear translocation. Extract capsules did not increase lung target-gene expression in COPD. An ordinary broccoli meal, direct activation of Nrf2 in the human brain and clinical ADHD benefit remain unestablished. Sulforaphane is not an essential nutrient.

**Food records:** 2 material records; 0 quantitative observation records. Canonical food IDs: broccoli, broccoli-sprouts.

**Why not ranked in the current wheel:** Presence-only: no quantitative observation

**Verified Derived endpoints:** None passes the complete structured endpoint gate here.

**Recorded but incompletely resolved Derived links:** None.

## Uridine (`uridine`)

**Disposition:** documented-unranked-food-occurrence. 

**Connected PMs:** BRS1-FM5-PM12, BRS2-FM3-PM7

**Canonical dietary records:**
- `BRS1-FM5-PM12::PM12-DIT-2`: Dietary input True; classification direct; accounting A. Source: `docs/biological-targets/brs1/fm5/brs1-fm5-pm12-synaptic-structural-plasticity.mdx#dietary_input_traceability/PM12-DIT-2`. Limitation: Endogenous nucleotide synthesis and salvage also contribute. UMP alone did not significantly increase gerbil spine density; that null structural result does not erase the precursor role. No ordinary-food dose or human structural benefit is established.
- `BRS2-FM3-PM7::PM7-DIT-7`: Dietary input True; classification direct; accounting A. Source: `docs/biological-targets/brs2/fm3/brs2-fm3-pm7-phosphatidylcholine-formation.mdx#dietary_input_traceability/PM7-DIT-7`. Limitation: Uridine is a supported precursor source, not an indispensable dietary requirement: endogenous nucleotide synthesis and salvage also supply CTP. Rat-slice and oral-UMP gerbil results do not establish an ordinary-food dose, increased human PC flux or cognitive benefit; human MRS measures precursor pools.

**Food records:** 1 material records; 0 quantitative observation records. Canonical food IDs: milk.

**Why not ranked in the current wheel:** Presence-only: no quantitative observation

**Verified Derived endpoints:** None passes the complete structured endpoint gate here.

**Recorded but incompletely resolved Derived links:** None.

## Urolithin A (`urolithin-a`)

**Disposition:** contextual-candidate-or-unresolved-only. 

**Connected PMs:** BRS5-FM2-PM6

**Canonical dietary records:**
- No matching dietary atom in this checkout. Existing network intervention/context records are retained in JSON; they do not create a dietary admission.

**Food records:** 0 material records; 0 quantitative observation records. Canonical food IDs: .

**Why not ranked in the current wheel:** No eligible ranked target in the frozen snapshot; inspect admission, identity and intervention context separately.

**Verified Derived endpoints:** None passes the complete structured endpoint gate here.

**Recorded but incompletely resolved Derived links:** None.
