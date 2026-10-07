/**
 * Canonical §4.2 / §4.3 overrides for BRS1–BRS3 Functional Mechanisms.
 * @see system/functional-mechanism-schema.md
 * @see docs/biological-targets/brs1/fm3/brs1-fm3-phospholipid-mediated-dha-delivery-and-membrane-integration.mdx
 */

/** Existing Suboptimal Function decisions; no PM-by-PM narrative overrides. */
export const FM_FAILURE_43_OVERRIDES = {
  "BRS1(FM1)": `### 4.3 Suboptimal Function & Its Effects

BRS1(FM1) represents a coordinated monoaminergic capacity in which precursor supply, LAT1-gated brain entry, and downstream catecholamine and serotonin signalling must remain aligned. When precursor availability, LAT1 transport and downstream monoaminergic signalling become progressively misaligned, the coordinated capacity of the FM begins to deteriorate. Reduced precursor delivery limits both catecholaminergic and serotonergic synthesis, altered transport competition further constrains brain precursor availability, and declining signalling efficiency reduces the system's ability to sustain coherent monoaminergic output.

These integrated changes impair the coordinated output of [BRS1-FM1-PM1](/docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation), [BRS1-FM1-PM2](/docs/biological-targets/brs1/fm1/brs1-fm1-pm2-lat1-competitive-transport-modulation), [BRS1-FM1-PM4](/docs/biological-targets/brs1/fm1/brs1-fm1-pm4-noradrenergic-signalling-attention-executive-modulation), and [BRS1-FM1-PM5](/docs/biological-targets/brs1/fm1/brs1-fm1-pm5-serotonergic-signalling-regulation).

At the system level, declining monoaminergic capacity may constrain attention stability, weaken sustained motivational drive and arousal, reduce capacity for emotional regulation under stress, and increase vulnerability to negative-valence perseverative thought — the functional domains Phase 3 evaluates for this FM.`,

  "BRS1(FM2)": `### 4.3 Suboptimal Function & Its Effects

Cholinergic function may weaken when dietary choline provision or acetylcholine synthesis support remain chronically inadequate.

Low-choline dietary patterns, restrictive eating, or meal matrices that displace choline-rich whole foods (eggs, fish roe, organ meats, legumes) may reduce substrate availability for acetylcholine synthesis. At the FM level, this may shift the system toward weaker cholinergic signalling context relevant to attention, working memory, and cognitive precision [Derbyshire et al., 2023].

These pressures may impair [BRS1-FM2-PM6 — Acetylcholine Synthesis Support](/docs/biological-targets/brs1/fm2/brs1-fm2-pm6-acetylcholine-synthesis-support).`,

  "BRS1(FM3)": `### 4.3 Suboptimal Function & Its Effects

Membrane composition, fluidity, and structural lipid integrity may weaken when phospholipid-DHA delivery, blood–brain barrier transport, or neuronal incorporation remain chronically inadequate.

Habitually low marine-fat and phospholipid-DHA intake, or dietary patterns that rely on triglyceride-oil forms without adequate phospholipid or LPC-DHA carriage context, may limit brain DHA accretion efficiency relative to phospholipid-matrix delivery [Liu et al., 2014]. Infrequent oily-fish exposure, ultra-processed dietary patterns displacing omega-3-rich whole foods, and inadequate choline or phospholipid cofactor context may further reduce the substrate chemistry needed for neuronal membrane phospholipid incorporation.

Oxidative degradation of PUFA-rich meal matrices and chronic strain on membrane polyunsaturated fatty acid pools may compound failure when downstream lipid-protection biology is weakened — see [BRS3-FM2-PM5 — Lipid Peroxidation Control](/docs/biological-targets/brs3/fm2/brs3-fm2-pm5-lipid-peroxidation-control).

These pressures may impair [BRS1-FM3-PM7 — Neuronal Membrane DHA Incorporation](/docs/biological-targets/brs1/fm3/brs1-fm3-pm7-neuronal-membrane-dha-incorporation). At the FM level, this may shift the system toward reduced membrane fluidity context, weaker structural lipid integrity, and diminished neuronal signalling competence—with downstream relevance to attention stability, cognitive clarity, and emotional regulation framing in ADHD-relevant populations [McNamara & Carlson, 2006].`,

  "BRS1(FM4)": `### 4.3 Suboptimal Function & Its Effects

Constrained synthesis can reduce available inhibitory transmitter capacity; impaired clearance can prolong extracellular excitatory signalling [[4]](#fm-ref-4) [[7]](#fm-ref-7). Sustained excessive receptor stimulation can impose bioenergetic harm in the assessed experimental setting [[8]](#fm-ref-8). These are different consequences and need not occur together. Transmitter concentrations alone cannot identify which capacity is constrained [[9]](#fm-ref-9), and this inventory cannot diagnose unassessed receptor or synaptic regulation.`,

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

When failure modes persist, they may impair [BRS3-FM2-PM3 — Nrf2-Mediated Cellular Defence Regulation](/docs/biological-targets/brs3/fm2/brs3-fm2-pm3-nrf2-are-antioxidant-activation), weaken [BRS3-FM2-PM4 — ROS Generation vs Clearance Balance](/docs/biological-targets/brs3/fm2/brs3-fm2-pm4-ros-generation-vs-clearance-balance), reduce the effectiveness of [BRS3-FM2-PM5 — Lipid Peroxidation Control](/docs/biological-targets/brs3/fm2/brs3-fm2-pm5-lipid-peroxidation-control), and compromise [BRS3-FM2-PM6 — Antioxidant Network Recycling](/docs/biological-targets/brs3/fm2/brs3-fm2-pm6-antioxidant-network-recycling). At the FM level, this may shift BRS3(FM2) toward reduced antioxidant defense capacity performance.`,

  "BRS3(FM3)": `### 4.3 Suboptimal Function & Its Effects

Inflammation resolution capacity may weaken when habitual EPA/DHA intake and omega-3/omega-6 dietary balance become chronically unfavourable for specialized pro-resolving mediator formation.

Low omega-3 intake may limit EPA/DHA substrate availability for resolvin, protectin, and maresin pathways. Excessive omega-6 dominance, low oily-fish consumption, poor dietary fatty-acid diversity, and chronic inflammatory load may further constrain specialised pro-resolving mediator formation [Serhan & Petasis, 2011].

Oxidative damage to membrane lipids—when [BRS3-FM2-PM5 — Lipid Peroxidation Control](/docs/biological-targets/brs3/fm2/brs3-fm2-pm5-lipid-peroxidation-control) is strained—may further compromise the lipid environment required for active resolution rather than prolonged cytokine elevation.

These pressures may impair [BRS3-FM3-PM7 — Cytokine Network Modulation](/docs/biological-targets/brs3/fm3/brs3-fm3-pm7-cytokine-network-modulation) and weaken [BRS3-FM3-PM8 — Eicosanoid / SPM Balance](/docs/biological-targets/brs3/fm3/brs3-fm3-pm8-eicosanoid-spm-balance). At the FM level, this may shift BRS3(FM3) toward impaired inflammation resolution capacity.`,
};
