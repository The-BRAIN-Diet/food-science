/**
 * Canonical §4.2 / §4.3 overrides for BRS1–BRS3 Functional Mechanisms.
 * @see system/functional-mechanism-schema.md
 * @see docs/biological-targets/brs1/fm3/brs1-fm3-phospholipid-mediated-dha-delivery-and-membrane-integration.mdx
 */

/** §4.2 Integrated Functional Narrative body (paragraphs only). */
export const FM_NARRATIVE_42_OVERRIDES = {
  "BRS1(FM1)": `Together, these four mechanisms operationalise BRS1(FM1) as a coordinated monoaminergic control state rather than a single pathway. [BRS1-FM1-PM1 — Amino-Acid Availability & Prioritisation](/docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation) maintains the circulating indispensable amino-acid pools that supply tyrosine and tryptophan precursors. [BRS1-FM1-PM2 — LAT1 Competitive Transport Modulation](/docs/biological-targets/brs1/fm1/brs1-fm1-pm2-lat1-competitive-transport-modulation) determines which precursors cross the blood–brain barrier when large neutral amino acids compete for shared LAT1 transport. [BRS1-FM1-PM3 — Noradrenergic Signalling](/docs/biological-targets/brs1/fm1/brs1-fm1-pm3-noradrenergic-signalling-attention-executive-modulation) converts catecholamine precursor context into noradrenergic tone supporting alertness, focus, and executive control. [BRS1-FM1-PM4 — Serotonergic Signalling Regulation](/docs/biological-targets/brs1/fm1/brs1-fm1-pm4-serotonergic-signalling-regulation) regulates serotonin-pathway signalling that supports behavioural inhibition, stress recovery, and emotional stability.

Coherent monoaminergic function emerges only when substrate availability, LAT1-mediated transport and downstream signalling remain aligned. [BRS1(KC1) — Amino Acid Quality & Competitive Balance](/docs/biological-targets/brs1/kc/brs1-kc1-amino-acid-quality-and-competitive-balance) provides the shared substrate architecture — when indispensable amino-acid profiles or LNAA competitive balance weaken, LAT1 transport and both downstream monoaminergic arms are constrained together rather than in isolation [Fernstrom, 2013; MacDonald et al., 2024].

**Integrated biological rationale:** PM1 and PM2 converge with PM3 on catecholaminergic attention and arousal biology; PM1 and PM2 converge with PM4 on serotonergic emotional-regulation biology; PM1, PM2, and PM3 together support motivation-relevant monoaminergic tone. The integrated FM therefore has greater functional significance than any individual PM because substrate supply, transport gating and signalling must operate together to sustain coherent monoaminergic output.

**Functional rationale:** The integration of precursor availability, LAT1 transport bias, noradrenergic attention signalling, and serotonergic regulation creates a coordinated monoaminergic capacity expected to influence attention stability, motivational drive, emotional regulation, and negative-valence perseveration more strongly than any individual mechanism alone. These integrated functional predictions form the basis for independent Phase 3 FM Phenome validation.`,

  "BRS1(FM2)": `Although BRS1(FM2) is principally operationalised through [BRS1-FM2-PM5 — Acetylcholine Synthesis Support](/docs/biological-targets/brs1/fm2/brs1-fm2-pm5-acetylcholine-synthesis-support), the FM represents the broader cholinergic substrate state supporting attention-relevant signalling. Dietary choline provision and habitual meal patterns influence whether acetylcholine synthesis can sustain cholinergic tone across attention, working memory, and cognitive precision contexts [Derbyshire et al., 2023; Briguglio et al., 2018].

At the FM level, performance depends on repeated choline-rich food exposure and synthesis capacity rather than single-meal precursor spikes.`,

  "BRS1(FM3)": `Although BRS1(FM3) is principally operationalised through [BRS1-FM3-PM6 — Neuronal Membrane DHA Incorporation](/docs/biological-targets/brs1/fm3/brs1-fm3-pm6-neuronal-membrane-dha-incorporation), the FM represents the broader membrane structural environment within which neuronal communication occurs. Membrane composition influences receptor function, ion-channel behaviour, synaptic transmission, and network signalling competence while interacting with phospholipid metabolism, lipid protection, inflammatory regulation, and downstream lipid-signalling systems.

At the FM level, signalling competence depends on whether phospholipid-carrier delivery, MFSD2A-mediated transport, and habitual membrane enrichment remain adequate over weeks to months—not from isolated bolus exposure or dose alone [Liu et al., 2014].`,

  "BRS1(FM4)": `Together, GABA–glutamate balance, inhibitory synthesis, glutamate clearance, and excitotoxicity modulation operationalise BRS1(FM4) as coordinated excitatory–inhibitory network regulation.

At the integrated FM level, attention stability and emotional control depend on whether inhibitory GABAergic tone, glutamate clearance, and excitatory drive remain matched—supported by ADHD human mechanistic evidence on reduced GABA and glutamate–attention associations [Edden et al., 2012; Puts et al., 2020; Maltezos et al., 2014; Mamiya et al., 2021]. Meal-level protein-derived glutamate substrate, vitamin B6 cofactor context, and magnesium sufficiency modulate upstream support for this E/I state [Cataldo et al., 2024].`,

  "BRS2(FM1)": `Together, folate/B12 remethylation, betaine-dependent BHMT recycling, SAMe synthesis, and methionine-cycle flux operationalise BRS2(FM1) as a coordinated one-carbon methylation control point.

At the integrated FM level, elevated homocysteine is interpreted as a marker of impaired one-carbon cycling, while dietary patterns supplying methyl donors, sulfur amino acids, and supportive omega-3 context may help support homocysteine modulation and overall methylation capacity [Collaboration, 1998; Tao Huang et al., 2015; Oulhaj et al., 2016].`,

  "BRS2(FM2)": `Together, transsulfuration and glutathione synthesis operationalise BRS2(FM2) as a coordinated bridge between one-carbon metabolism and antioxidant defence.

At the integrated FM level, homocysteine diversion toward cysteine and glutathione production links methylation strain to redox resilience—so transsulfuration capacity depends on sulfur-amino-acid substrate availability, glutathione demand, and cofactor sufficiency across the diet [Gregory et al., 2016; Minich et al., 2019].`,

  "BRS2(FM3)": `Together, SAMe synthesis and phosphatidylcholine formation operationalise BRS2(FM3) as the methylation–membrane coupling bridge between one-carbon metabolism and neuronal membrane chemistry.

At the integrated FM level, SAMe-dependent phosphatidylethanolamine methylation shapes phosphatidylcholine pools that influence membrane composition, choline carriage, and omega-3 integration context—connecting B-vitamin and methyl-donor status to the membrane environment the brain relies on [Vance et al., 2014; Oulhaj et al., 2016].`,

  "BRS3(FM1)": `Together, NF-κB regulation and gut-derived inflammatory signalling operationalise BRS3(FM1) as coordinated anti-inflammatory signalling control.

At the integrated FM level, anti-inflammatory tone depends not only on direct pathway modulation, but also on whether endotoxin burden, antioxidant coverage, and lipid mediator context keep inflammatory signalling from becoming chronically amplified [Mohammad & Thiemermann, 2021; Zelicha et al., 2022; Batey et al., 2024].`,

  "BRS3(FM2)": `Together, Nrf2 activation, ROS clearance balance, lipid peroxidation control, and antioxidant network recycling operationalise BRS3(FM2) as coordinated antioxidant defence capacity.

At the integrated FM level, antioxidant defence is best understood as a network property: exogenous antioxidant coverage, endogenous enzyme induction, trace-mineral sufficiency, membrane protection, and lower dietary oxidant exposure (cooking method, fat stability, UPF load) all reinforce one another rather than acting as isolated nutrient effects [Packer et al., 1997; Houghton et al., 2016; Uribarri et al., 2010; Zelicha et al., 2022].`,

  "BRS3(FM3)": `Together, cytokine network modulation and eicosanoid/SPM balance operationalise BRS3(FM3) as coordinated inflammation resolution capacity.

At the integrated FM level, this is distinct from simple suppression: resolution requires the right lipid substrate context to terminate inflammatory activity, shift mediator balance, and allow cytokine pressure to fall. Lipid peroxidation control from [BRS3-FM2-PM5](/docs/biological-targets/brs3/fm2/brs3-fm2-pm5-lipid-peroxidation-control) remains supportive here by helping preserve the integrity of the lipid environment on which resolution depends [Serhan & Petasis, 2011; Ferguson et al., 2014].`,
};

/** §4.3 Suboptimal Function & Its Effects blocks (full subsection). */
export const FM_FAILURE_43_OVERRIDES = {
  "BRS1(FM1)": `### 4.3 Suboptimal Function & Its Effects

BRS1(FM1) represents a coordinated monoaminergic capacity in which precursor supply, LAT1-gated brain entry, and downstream catecholamine and serotonin signalling must remain aligned. When precursor availability, LAT1 transport and downstream monoaminergic signalling become progressively misaligned, the coordinated capacity of the FM begins to deteriorate. Reduced precursor delivery limits both catecholaminergic and serotonergic synthesis, altered transport competition further constrains brain precursor availability, and declining signalling efficiency reduces the system's ability to sustain coherent monoaminergic output.

These integrated changes impair the coordinated output of [BRS1-FM1-PM1](/docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation), [BRS1-FM1-PM2](/docs/biological-targets/brs1/fm1/brs1-fm1-pm2-lat1-competitive-transport-modulation), [BRS1-FM1-PM3](/docs/biological-targets/brs1/fm1/brs1-fm1-pm3-noradrenergic-signalling-attention-executive-modulation), and [BRS1-FM1-PM4](/docs/biological-targets/brs1/fm1/brs1-fm1-pm4-serotonergic-signalling-regulation).

At the system level, declining monoaminergic capacity may constrain attention stability, weaken sustained motivational drive and arousal, reduce capacity for emotional regulation under stress, and increase vulnerability to negative-valence perseverative thought — the functional domains Phase 3 evaluates for this FM.`,

  "BRS1(FM2)": `### 4.3 Suboptimal Function & Its Effects

Cholinergic function may weaken when dietary choline provision or acetylcholine synthesis support remain chronically inadequate.

Low-choline dietary patterns, restrictive eating, or meal matrices that displace choline-rich whole foods (eggs, fish roe, organ meats, legumes) may reduce substrate availability for acetylcholine synthesis. At the FM level, this may shift the system toward weaker cholinergic signalling context relevant to attention, working memory, and cognitive precision [Derbyshire et al., 2023].

These pressures may impair [BRS1-FM2-PM5 — Acetylcholine Synthesis Support](/docs/biological-targets/brs1/fm2/brs1-fm2-pm5-acetylcholine-synthesis-support).`,

  "BRS1(FM3)": `### 4.3 Suboptimal Function & Its Effects

Membrane composition, fluidity, and structural lipid integrity may weaken when phospholipid-DHA delivery, blood–brain barrier transport, or neuronal incorporation remain chronically inadequate.

Habitually low marine-fat and phospholipid-DHA intake, or dietary patterns that rely on triglyceride-oil forms without adequate phospholipid or LPC-DHA carriage context, may limit brain DHA accretion efficiency relative to phospholipid-matrix delivery [Liu et al., 2014]. Infrequent oily-fish exposure, ultra-processed dietary patterns displacing omega-3-rich whole foods, and inadequate choline or phospholipid cofactor context may further reduce the substrate chemistry needed for neuronal membrane phospholipid incorporation.

Oxidative degradation of PUFA-rich meal matrices and chronic strain on membrane polyunsaturated fatty acid pools may compound failure when downstream lipid-protection biology is weakened — see [BRS3-FM2-PM5 — Lipid Peroxidation Control](/docs/biological-targets/brs3/fm2/brs3-fm2-pm5-lipid-peroxidation-control).

These pressures may impair [BRS1-FM3-PM6 — Neuronal Membrane DHA Incorporation](/docs/biological-targets/brs1/fm3/brs1-fm3-pm6-neuronal-membrane-dha-incorporation). At the FM level, this may shift the system toward reduced membrane fluidity context, weaker structural lipid integrity, and diminished neuronal signalling competence—with downstream relevance to attention stability, cognitive clarity, and emotional regulation framing in ADHD-relevant populations [McNamara & Carlson, 2006].`,

  "BRS1(FM4)": `### 4.3 Suboptimal Function & Its Effects

Excitatory–inhibitory balance may weaken when glutamate substrate supply, GABA synthesis cofactors, or glutamate clearance capacity become chronically constrained.

Low protein quality or inconsistent meal-level amino-acid coverage may reduce glutamate precursor availability for both excitatory signalling and GABA synthesis—intersecting [BRS1(KC1) — Amino Acid Quality & Competitive Balance](/docs/biological-targets/brs1/kc/brs1-kc1-amino-acid-quality-and-competitive-balance). Chronic vitamin B6 insufficiency may impair glutamate decarboxylase-dependent GABA synthesis; low magnesium intake may reduce NMDA-modulatory and broader excitability control [Cataldo et al., 2024; Mousain-Bosc et al., 2006].

These pressures may impair [BRS1-FM4-PM7 — GABA–Glutamate Neurotransmission Balance](/docs/biological-targets/brs1/fm4/brs1-fm4-pm7-gaba-glutamate-neurotransmission-balance), weaken [BRS1-FM4-PM8 — GABA Synthesis Capacity](/docs/biological-targets/brs1/fm4/brs1-fm4-pm8-gaba-synthesis-capacity), reduce the effectiveness of [BRS1-FM4-PM9 — Glutamate Clearance & Recycling](/docs/biological-targets/brs1/fm4/brs1-fm4-pm9-glutamate-clearance-and-recycling), and compromise [BRS1-FM4-PM10 — Excitotoxicity Modulation](/docs/biological-targets/brs1/fm4/brs1-fm4-pm10-excitotoxicity-modulation). At the FM level, this may shift BRS1(FM4) toward reduced E/I balance with relevance to attention stability and emotional control in ADHD-relevant contexts.`,

  "BRS2(FM1)": `### 4.3 Suboptimal Function & Its Effects

Methylation cycle efficiency may weaken when one-carbon donor pools or methionine/transsulfuration substrate pools become chronically inadequate.

Low intake of methyl-donor-rich foods may reduce [BRS2(KC1) — One-Carbon Donor Pool](/docs/biological-targets/brs2/kc/brs2-kc1-one-carbon-donor-pool). Poor dietary choline availability, low folate availability, increased methylation demand, and impaired remethylation efficiency may further strain donor-pool support across daily meal patterns.

Low protein quality or insufficient sulfur-amino-acid intake may reduce [BRS2(KC2) — Methionine & Transsulfuration Substrate Pool](/docs/biological-targets/brs2/kc/brs2-kc2-methionine-transsulfuration-substrate-pool). Chronic methionine substrate insufficiency, increased glutathione demand, and oxidative burden driving sulfur-amino-acid utilisation may further compromise cycle throughput.

These pressures may impair [BRS2-FM1-PM1 — Folate/B12-Dependent Homocysteine Remethylation](/docs/biological-targets/brs2/fm1/brs2-fm1-pm1-folate-b12-dependent-homocysteine-remethylation), weaken [BRS2-FM1-PM2 — Betaine/BHMT Remethylation](/docs/biological-targets/brs2/fm1/brs2-fm1-pm2-betaine-bhmt-remethylation), reduce the effectiveness of [BRS2-FM1-PM3 — SAMe Synthesis](/docs/biological-targets/brs2/fm1/brs2-fm1-pm3-same-synthesis), and compromise [BRS2-FM1-PM4 — Methionine Cycle Flux](/docs/biological-targets/brs2/fm1/brs2-fm1-pm4-methionine-cycle-flux). At the FM level, this may shift BRS2(FM1) toward reduced methylation cycle efficiency.`,

  "BRS2(FM2)": `### 4.3 Suboptimal Function & Its Effects

Transsulfuration and redox coupling may weaken when methionine and transsulfuration substrate pools become chronically inadequate.

Low protein quality or insufficient sulfur-amino-acid intake may reduce [BRS2(KC2) — Methionine & Transsulfuration Substrate Pool](/docs/biological-targets/brs2/kc/brs2-kc2-methionine-transsulfuration-substrate-pool). Chronic methionine substrate insufficiency, increased glutathione demand, oxidative burden driving sulfur-amino-acid utilisation, and restrictive dietary patterns reducing substrate diversity may further limit cysteine supply for glutathione synthesis.

These pressures may impair [BRS2-FM2-PM5 — Transsulfuration Pathway](/docs/biological-targets/brs2/fm2/brs2-fm2-pm5-transsulfuration-pathway) and weaken [BRS2-FM2-PM6 — Glutathione Synthesis](/docs/biological-targets/brs2/fm2/brs2-fm2-pm6-glutathione-synthesis). At the FM level, this may shift BRS2(FM2) toward reduced transsulfuration–redox coupling capacity—with downstream relevance to antioxidant defence in BRS3 [Minich et al., 2019].`,

  "BRS2(FM3)": `### 4.3 Suboptimal Function & Its Effects

Methylation–membrane coupling may weaken when one-carbon donor pools or methionine substrate pools become chronically inadequate.

Low intake of methyl-donor-rich foods may reduce [BRS2(KC1) — One-Carbon Donor Pool](/docs/biological-targets/brs2/kc/brs2-kc1-one-carbon-donor-pool). Poor dietary choline availability, low folate availability, and increased methylation demand may limit SAMe generation for phosphatidylcholine formation.

Low protein quality or insufficient sulfur-amino-acid intake may reduce [BRS2(KC2) — Methionine & Transsulfuration Substrate Pool](/docs/biological-targets/brs2/kc/brs2-kc2-methionine-transsulfuration-substrate-pool), further constraining methionine-cycle throughput available to SAMe synthesis.

These pressures may impair [BRS2-FM1-PM3 — SAMe Synthesis](/docs/biological-targets/brs2/fm1/brs2-fm1-pm3-same-synthesis) and weaken [BRS2-FM3-PM7 — Phosphatidylcholine Formation](/docs/biological-targets/brs2/fm3/brs2-fm3-pm7-phosphatidylcholine-formation). At the FM level, this may shift BRS2(FM3) toward reduced methylation–membrane coupling—with downstream relevance to neuronal membrane chemistry in BRS1 [Vance et al., 2014].`,

  "BRS3(FM1)": `### 4.3 Suboptimal Function & Its Effects

Anti-inflammatory signalling tone may weaken when antioxidant substrate availability becomes chronically inadequate or when habitual EPA/DHA intake fails to support resolution-competent lipid-mediator context.

Low fruit and vegetable intake may reduce [BRS3(KC1) — Antioxidant Substrate Availability](/docs/biological-targets/brs3/kc/brs3-kc1-antioxidant-substrate-availability). Low polyphenol density, poor sulfur-amino-acid and glutathione-building substrate availability, chronic oxidative burden, and ultra-processed patterns displacing antioxidant-rich foods may further amplify inflammatory signalling pressure.

Low omega-3 intake may limit EPA/DHA substrate availability for lipid-mediator pathways. Excessive omega-6 dominance, low oily-fish consumption, poor fatty-acid diversity, and chronic inflammatory load may skew lipid-mediator context away from resolution-competent signalling.

Gut barrier compromise and metabolic endotoxemia may amplify gut-derived inflammatory inputs—see [BRS5(FM1) — Gut Barrier Integrity and Immune Interface](/docs/biological-targets/brs5/fm1/brs5-fm1-gut-barrier-integrity-and-immune-interface).

These pressures may impair [BRS3-FM1-PM1 — NF-kB Signalling Regulation](/docs/biological-targets/brs3/fm1/brs3-fm1-pm1-nf-kb-signalling-regulation) and weaken [BRS3-FM1-PM2 — Gut-Derived Inflammatory Signalling](/docs/biological-targets/brs3/fm1/brs3-fm1-pm2-gut-derived-inflammatory-signalling). At the FM level, this may shift BRS3(FM1) toward chronically elevated pro-inflammatory tone.`,

  "BRS3(FM2)": `### 4.3 Suboptimal Function & Its Effects

Suboptimal function describes common ways this functional capacity becomes overloaded or inefficient. They are not separate PMs and should not duplicate PM definitions.

**A. High-temperature food preparation burden**

Repeated frying, charring, grilling, and high-temperature cooking can increase AGE/ALE formation, oxidised lipid exposure, and redox pressure [Uribarri et al., 2010].

**B. Oxidised fat and reheated oil exposure**

Repeatedly heated oils, rancid fats, and oxidised PUFA-rich foods can increase lipid oxidation products and antioxidant demand.

**C. Low antioxidant network support**

Low intake of polyphenol-rich foods, colourful plants, selenium, zinc, copper, manganese, and glutathione-supportive substrates may reduce clearance capacity [Packer et al., 1997; Mocchegiani & Malavolta, 2019; Vertuani et al., 2004].

**D. Environmental and contaminant oxidative load**

Smoking, air pollution, heavy metals, and micro/nanoplastics may increase oxidative burden and interact with dietary antioxidant capacity [Zhai et al., 2015; Berglund et al., 1994; Dufault et al., 2024; Zhang et al., 2025].

**E. Hyperglycaemic and ultra-processed food burden**

High refined-sugar, low-fibre, ultra-processed patterns may increase glycaemic variability, oxidative stress, and inflammatory–redox coupling [Jiang et al., 2021].

#### Summary

Antioxidant defense capacity becomes overloaded when exogenous oxidant exposure rises while endogenous clearance support falls. High-heat cooking and oxidised or repeatedly heated fats increase lipid oxidation products and AGE/ALE burden [Uribarri et al., 2010]; low polyphenol density, trace-mineral gaps, and weak glutathione-building substrate availability reduce network recycling and enzyme sufficiency [Packer et al., 1997; Mocchegiani & Malavolta, 2019; Vertuani et al., 2004]. Environmental contaminants and ultra-processed, hyperglycaemic dietary patterns add further oxidative and inflammatory–redox load [Jiang et al., 2021; Zhai et al., 2015; Berglund et al., 1994; Dufault et al., 2024; Zhang et al., 2025]. Together, these pressures strain the coordinated Nrf2 induction, ROS clearance, membrane protection, and antioxidant recycling that define BRS3(FM2).

These FM2 failure modes may secondarily amplify [BRS3(FM1) — Anti-Inflammatory Signalling Tone](/docs/biological-targets/brs3/fm1/brs3-fm1-anti-inflammatory-signalling-tone) inflammatory signalling, but their primary home is FM2 because they increase redox burden or reduce antioxidant defense capacity.

When failure modes persist, they may impair [BRS3-FM2-PM3 — Nrf2-ARE Antioxidant Activation](/docs/biological-targets/brs3/fm2/brs3-fm2-pm3-nrf2-are-antioxidant-activation), weaken [BRS3-FM2-PM4 — ROS Generation vs Clearance Balance](/docs/biological-targets/brs3/fm2/brs3-fm2-pm4-ros-generation-vs-clearance-balance), reduce the effectiveness of [BRS3-FM2-PM5 — Lipid Peroxidation Control](/docs/biological-targets/brs3/fm2/brs3-fm2-pm5-lipid-peroxidation-control), and compromise [BRS3-FM2-PM6 — Antioxidant Network Recycling](/docs/biological-targets/brs3/fm2/brs3-fm2-pm6-antioxidant-network-recycling). At the FM level, this may shift BRS3(FM2) toward reduced antioxidant defense capacity performance.`,

  "BRS3(FM3)": `### 4.3 Suboptimal Function & Its Effects

Inflammation resolution capacity may weaken when habitual EPA/DHA intake and omega-3/omega-6 dietary balance become chronically unfavourable for specialized pro-resolving mediator formation.

Low omega-3 intake may limit EPA/DHA substrate availability for resolvin, protectin, and maresin pathways. Excessive omega-6 dominance, low oily-fish consumption, poor dietary fatty-acid diversity, and chronic inflammatory load may further constrain specialised pro-resolving mediator formation [Serhan & Petasis, 2011].

Oxidative damage to membrane lipids—when [BRS3-FM2-PM5 — Lipid Peroxidation Control](/docs/biological-targets/brs3/fm2/brs3-fm2-pm5-lipid-peroxidation-control) is strained—may further compromise the lipid environment required for active resolution rather than prolonged cytokine elevation.

These pressures may impair [BRS3-FM3-PM7 — Cytokine Network Modulation](/docs/biological-targets/brs3/fm3/brs3-fm3-pm7-cytokine-network-modulation) and weaken [BRS3-FM3-PM8 — Eicosanoid / SPM Balance](/docs/biological-targets/brs3/fm3/brs3-fm3-pm8-eicosanoid-spm-balance). At the FM level, this may shift BRS3(FM3) toward impaired inflammation resolution capacity.`,
};
