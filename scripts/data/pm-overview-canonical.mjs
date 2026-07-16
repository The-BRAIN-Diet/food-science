/**
 * Canonical §1 Mission & Overview upgrades for the 54 shallow PM pages
 * (overview currently under 50 words) across BRS1–BRS4, BRS6, and BRS-X.
 *
 * Style target: BRS5-FM1-PM3 (Keystone Taxa Support) §1 — mission states a
 * biological ambition (not a title paraphrase, not a nutrient list);
 * translational is 2–3 stand-alone sentences (~65–75 words) that name what
 * the mechanism does, gloss its first technical term parenthetically, state
 * why it matters, and gesture at diet-level influence without restating
 * parent-FM architecture; bullets are exactly three scannable takeaways with
 * no "— within BRSn" / "— Supporting BRSn" suffixes.
 */
export const CANONICAL_PM_OVERVIEWS = {
  // ---------------------------------------------------------------------
  // BRS1 — Neurotransmitter & Signalling Precursor Systems
  // ---------------------------------------------------------------------
  "brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation.mdx": {
    mission:
      "Ensure dietary protein delivers a complete, well-timed amino-acid supply for neurotransmitter synthesis.",
    translational:
      "Determines how completely meals supply the indispensable amino acids (protein building blocks the body cannot make on its own) that downstream pathways convert into dopamine, noradrenaline, and serotonin. Protein quantity, quality, and distribution across the day set the ceiling for neurotransmitter precursor availability, independent of blood–brain barrier transport or conversion efficiency. When intake is inconsistent or incomplete, every downstream monoaminergic pathway inherits that shortfall.",
    bullets: [
      "Provides the amino-acid foundation for dopamine, noradrenaline, and serotonin synthesis.",
      "Sets the ceiling for precursor supply through meal-level protein quantity and quality.",
      "Depends on consistent, complete indispensable amino-acid coverage across the day.",
    ],
  },
  "brs1/fm1/brs1-fm1-pm2-lat1-competitive-transport-modulation.mdx": {
    mission:
      "Shape blood–brain barrier transport competition so key neurotransmitter precursors cross favourably after meals.",
    translational:
      "Governs which large neutral amino acids win entry across the blood–brain barrier through the LAT1 transporter (a shared shuttle that carries tyrosine, tryptophan, and competing amino acids into the brain). Because these amino acids compete for the same limited transporter, meal composition — particularly the ratio of carbohydrate to protein — can shift the balance toward or away from precursors monoamine pathways depend on.",
    bullets: [
      "Determines whether tyrosine and tryptophan win or lose the competition for brain entry.",
      "Responds to carbohydrate-to-protein ratio at the meal level.",
      "Sets transport-stage context upstream of noradrenergic and serotonergic signalling.",
    ],
  },
  "brs1/fm1/brs1-fm1-pm3-noradrenergic-signalling-attention-executive-modulation.mdx": {
    mission:
      "Sustain noradrenergic signalling so alertness, attention, and executive control remain appropriately engaged.",
    translational:
      "Covers how noradrenaline (norepinephrine, the brain's principal arousal and vigilance signal) modulates attention, alertness, and executive function once its amino-acid precursor has crossed into the brain. This pathway sits downstream of precursor availability and transport, translating biochemical supply into functional signalling capacity rather than governing meal-level protein or barrier competition. Stable noradrenergic tone helps sustain task engagement, appropriate arousal, and vigilance across changing cognitive demand throughout the day.",
    bullets: [
      "Translates precursor supply into attention, alertness, and executive-function signalling.",
      "Operates downstream of amino-acid availability and blood–brain barrier transport.",
      "Supports vigilance and task engagement across changing cognitive demand.",
    ],
  },
  "brs1/fm1/brs1-fm1-pm4-serotonergic-signalling-regulation.mdx": {
    mission:
      "Maintain serotonergic signalling so mood stability, behavioural inhibition, and emotional regulation stay well grounded.",
    translational:
      "Covers serotonin synthesis, release, and receptor signalling (the monoamine most closely tied to mood, inhibition, and sleep-compatible neurochemistry) once tryptophan has reached the brain. Cofactor sufficiency and competitive amino-acid transport at the blood–brain barrier both shape how much precursor is available for conversion. Stable serotonergic activity supports emotional regulation, stress resilience, and behavioural control, reflecting the pathway's dependence on upstream precursor and transport context.",
    bullets: [
      "Converts brain-available tryptophan into serotonin-dependent mood and inhibition signalling.",
      "Depends on cofactor sufficiency and competitive amino-acid transport upstream.",
      "Supports emotional regulation, stress resilience, and behavioural control.",
    ],
  },
  "brs1/fm2/brs1-fm2-pm5-acetylcholine-synthesis-support.mdx": {
    mission:
      "Sustain acetylcholine synthesis so learning, working memory, and attention-focused signalling stay supplied.",
    translational:
      "Governs how dietary choline is converted into acetylcholine (the principal cholinergic neurotransmitter linking attention and memory circuits) through choline acetyltransferase-dependent synthesis. This mechanism covers substrate conversion specifically, distinct from the broader protein-pool sufficiency or competitive transport handled elsewhere. Choline-rich foods and adequate cofactor support determine how readily this conversion keeps pace with ongoing cholinergic signalling demand, particularly under sustained attentional load.",
    bullets: [
      "Converts dietary choline into acetylcholine for learning and focus.",
      "Governs substrate conversion specifically, not transport or protein-pool sufficiency.",
      "Depends on choline-rich foods and cofactor support to keep pace with demand.",
    ],
  },
  "brs1/fm3/brs1-fm3-pm6-neuronal-membrane-dha-incorporation.mdx": {
    mission:
      "Preserve neuronal membrane DHA content so the brain retains a flexible, signal-ready lipid foundation.",
    translational:
      "Governs how DHA (docosahexaenoic acid, the principal long-chain omega-3 fat in neural membranes) is incorporated into neuronal phospholipids after carrier-mediated transport across the blood–brain barrier, chiefly via the MFSD2A transporter. Membrane enrichment builds over weeks to months of habitual intake rather than single high-dose episodes, and depends on delivery in phospholipid-bound carrier forms. This slow-turnover process sets the structural lipid environment surrounding neurotransmitter receptors.",
    bullets: [
      "Incorporates DHA into neuronal membranes via phospholipid-bound carrier transport.",
      "Builds membrane enrichment over weeks to months of habitual intake.",
      "Sets the structural lipid environment surrounding neurotransmitter receptors.",
    ],
  },
  "brs1/fm4/brs1-fm4-pm7-gaba-glutamate-neurotransmission-balance.mdx": {
    mission:
      "Maintain balanced excitatory glutamate and inhibitory GABA signalling so neural networks operate with stability.",
    translational:
      "Represents the net balance between glutamatergic excitation and GABAergic inhibition (the brain's principal excitatory–inhibitory neurotransmitter pair) rather than either arm's synthesis or clearance individually, which sibling mechanisms cover. When these two signalling arms are well matched, neural circuits maintain stable excitability appropriate to task demand; when the balance shifts toward excess excitation, attention, emotional control, and sensory processing all become more vulnerable to overload.",
    bullets: [
      "Represents net excitatory–inhibitory balance rather than either arm alone.",
      "Supports stable network excitability appropriate to task demand.",
      "Sets the regulatory context for sibling synthesis and clearance mechanisms.",
    ],
  },
  "brs1/fm4/brs1-fm4-pm8-gaba-synthesis-capacity.mdx": {
    mission:
      "Enable sufficient GABA synthesis capacity so inhibitory tone can counter excitatory drive when needed.",
    translational:
      "Governs conversion of glutamate into GABA (gamma-aminobutyric acid, the brain's principal inhibitory neurotransmitter) through the cofactor-dependent enzyme glutamate decarboxylase. This mechanism determines synthesis capacity from available glutamate specifically — distinct from glutamate clearance or excitotoxic modulation covered elsewhere. Adequate GABA output strengthens calming, inhibitory signalling and supports resistance to sensory overstimulation, particularly when dietary cofactor and amino-acid context are sufficient.",
    bullets: [
      "Converts glutamate into GABA via the cofactor-dependent enzyme GAD.",
      "Governs synthesis capacity distinct from clearance or excitotoxic modulation.",
      "Strengthens inhibitory tone and resistance to sensory overstimulation.",
    ],
  },
  "brs1/fm4/brs1-fm4-pm9-glutamate-clearance-and-recycling.mdx": {
    mission:
      "Limit excitatory build-up by clearing and recycling glutamate before it overwhelms neural circuits.",
    translational:
      "Governs uptake, recycling, and buffering of glutamate (the brain's principal excitatory neurotransmitter) at the synapse, controlling how much accumulates in extracellular space after signalling events. This clearance process is distinct from GABA–glutamate balance or GABA synthesis capacity covered by sibling mechanisms, focusing specifically on removal and reuse. Effective clearance protects neural circuits from sustained excitatory drive and supports stable signalling downstream of the broader excitation–inhibition balance.",
    bullets: [
      "Clears and recycles glutamate to prevent excitatory build-up at synapses.",
      "Governs removal and reuse, distinct from synthesis or overall balance.",
      "Protects neural circuits from sustained excitatory drive.",
    ],
  },
  "brs1/fm4/brs1-fm4-pm10-excitotoxicity-modulation.mdx": {
    mission:
      "Limit excitotoxic pressure when glutamatergic drive turns excessive so neural stability is protected over time.",
    translational:
      "Governs the brain's endogenous buffering response to excitotoxicity (neural stress arising when glutamatergic signalling becomes excessive and overwhelms clearance capacity), largely through regulatory activity only indirectly supported by dietary amino-acid context. This mechanism sits downstream of glutamate clearance and GABA–glutamate balance, representing the last line of defence when upstream regulation is insufficient. Modulating this burden supports long-term cognitive stability and protects circuits from cumulative excitatory stress.",
    bullets: [
      "Buffers neural stress when glutamatergic drive becomes excessive.",
      "Sits downstream of clearance and balance as a last line of defence.",
      "Supports long-term cognitive and regulatory stability under excitatory load.",
    ],
  },

  // ---------------------------------------------------------------------
  // BRS2 — One-Carbon Methylation & Homocysteine Metabolism
  // ---------------------------------------------------------------------
  "brs2/fm1/brs2-fm1-pm1-folate-b12-dependent-homocysteine-remethylation.mdx": {
    mission:
      "Sustain folate- and B12-dependent homocysteine clearance so methyl-donor supply stays continuously replenished.",
    translational:
      "Converts homocysteine back into methionine through folate- and vitamin B12-dependent remethylation (the primary dietary-actionable route for recycling this sulfur amino acid). This pathway sustains the methyl-donor supply that downstream SAMe synthesis and methylation reactions depend on, while limiting the oxidative and inflammatory burden associated with homocysteine accumulation. Folate and B12 status therefore set a rate-limiting ceiling on one-carbon metabolism across brain and body chemistry.",
    bullets: [
      "Recycles homocysteine into methionine, the primary folate/B12-dependent route.",
      "Sustains methyl-donor supply for downstream SAMe synthesis.",
      "Limits oxidative and inflammatory burden linked to homocysteine build-up.",
    ],
  },
  "brs2/fm1/brs2-fm1-pm2-betaine-bhmt-remethylation.mdx": {
    mission:
      "Preserve methionine supply through a parallel homocysteine clearance route when folate-pathway demand runs high.",
    translational:
      "Provides an alternative route for converting homocysteine back to methionine via betaine-dependent remethylation through the BHMT enzyme (betaine–homocysteine methyltransferase), running independently of the folate cycle. This backup pathway keeps methionine and SAMe supply resilient when folate-dependent remethylation is constrained or under heavy demand. Betaine- and choline-rich dietary patterns support this route, helping maintain methylation capacity under variable one-carbon load.",
    bullets: [
      "Offers a folate-independent route for homocysteine clearance via BHMT.",
      "Keeps methionine and SAMe supply resilient under high folate demand.",
      "Draws on betaine- and choline-rich dietary patterns.",
    ],
  },
  "brs2/fm1/brs2-fm1-pm3-same-synthesis.mdx": {
    mission:
      "Enable conversion of methionine into SAMe so universal methyl-donation can power methylation chemistry.",
    translational:
      "Converts regenerated methionine into SAMe (S-adenosylmethionine, the body's universal methyl donor), the final step that turns recycled one-carbon capacity into usable methylation currency. Without sufficient SAMe output, downstream reactions spanning neurotransmitter synthesis, phospholipid formation, epigenetic regulation, and cellular repair cannot proceed at the rate the rest of the body demands. This step therefore converts upstream remethylation efficiency into system-wide methylation throughput.",
    bullets: [
      "Converts methionine into SAMe, the body's universal methyl donor.",
      "Powers neurotransmitter, phospholipid, and epigenetic methylation reactions.",
      "Turns upstream remethylation efficiency into system-wide methylation output.",
    ],
  },
  "brs2/fm1/brs2-fm1-pm4-methionine-cycle-flux.mdx": {
    mission:
      "Sustain efficient methionine cycle throughput so homocysteine clearance and SAMe output stay coordinated.",
    translational:
      "Reflects how efficiently the whole methionine cycle runs as an integrated system (rather than any single reaction step), determining homocysteine clearance, SAMe output, and overall methylation capacity together. Effective throughput depends on coordinated substrate and cofactor sufficiency across folate, B12, and betaine-dependent routes rather than any one nutrient in isolation. When cycle flux slows, every downstream methylation-dependent pathway feels the constraint simultaneously.",
    bullets: [
      "Determines homocysteine clearance and SAMe output as an integrated system.",
      "Depends on coordinated substrate and cofactor sufficiency, not one nutrient alone.",
      "Sets the pace at which downstream methylation pathways can run.",
    ],
  },
  "brs2/fm2/brs2-fm2-pm5-transsulfuration-pathway.mdx": {
    mission:
      "Shape the balance between methylation demand and antioxidant defence by routing homocysteine toward cysteine.",
    translational:
      "Provides the metabolic switch that diverts homocysteine away from methylation and toward cysteine production via the transsulfuration pathway (an alternative route to the remethylation cycle), linking one-carbon metabolism to sulfur amino-acid and antioxidant chemistry. This diversion becomes more active during periods of increased redox burden, balancing methylation demand against protection against oxidative and metabolic stress. Downstream, this pathway feeds cysteine supply directly into glutathione synthesis.",
    bullets: [
      "Diverts homocysteine toward cysteine production via an alternative route.",
      "Balances methylation demand against antioxidant and redox protection.",
      "Feeds cysteine supply directly into downstream glutathione synthesis.",
    ],
  },
  "brs2/fm2/brs2-fm2-pm6-glutathione-synthesis.mdx": {
    mission:
      "Sustain glutathione output from sulfur amino acids so cellular antioxidant defence stays connected to one-carbon metabolism.",
    translational:
      "Builds glutathione (the body's central intracellular antioxidant) from cysteine and related sulfur amino acids supplied through the methylation–transsulfuration network. This synthesis step connects one-carbon nutrient handling directly to everyday cellular protection against oxidative damage, rather than functioning as an independent antioxidant pathway. Adequate glutathione output helps protect mitochondrial and neuronal tissue from redox strain associated with homocysteine-linked metabolic stress.",
    bullets: [
      "Builds glutathione from cysteine supplied by the transsulfuration pathway.",
      "Connects one-carbon metabolism directly to antioxidant protection.",
      "Protects mitochondrial and neuronal tissue from redox strain.",
    ],
  },
  "brs2/fm3/brs2-fm3-pm7-phosphatidylcholine-formation.mdx": {
    mission:
      "Enable methylation-dependent phospholipid formation so omega-3 fats can reach and integrate into brain membranes.",
    translational:
      "Forms phosphatidylcholine (a methylation-dependent membrane phospholipid) that carries omega-3 fatty acids toward the brain and supports overall membrane structure and flexibility. This mechanism connects methylation capacity and B-vitamin status directly to the lipid environment in which neural signalling occurs, rather than acting as an independent lipid pathway. When methylation efficiency is constrained, omega-3 carriage and membrane phospholipid quality can both be affected downstream.",
    bullets: [
      "Forms phosphatidylcholine, the carrier for omega-3 delivery to the brain.",
      "Links methylation and B-vitamin status to membrane lipid quality.",
      "Supports membrane flexibility and neural signalling competence.",
    ],
  },

  // ---------------------------------------------------------------------
  // BRS3 — Inflammatory & Oxidative Signalling
  // ---------------------------------------------------------------------
  "brs3/fm1/brs3-fm1-pm1-nf-kb-signalling-regulation.mdx": {
    mission:
      "Limit NF-κB transcriptional activation so pro-inflammatory gene programmes do not fire excessively.",
    translational:
      "Regulates NF-κB (a master transcriptional switch that turns on pro-inflammatory gene programmes) at the upstream signalling node where dietary and metabolic inputs first influence inflammatory tone. Because this pathway sits ahead of cytokine release and downstream immune activation, diet-linked NF-κB regulation shapes how strongly the whole inflammatory cascade fires rather than treating symptoms after the fact. This positions it as an upstream, dietary-actionable inflammatory control point.",
    bullets: [
      "Regulates the upstream transcriptional switch that triggers inflammatory gene expression.",
      "Sits ahead of cytokine release and downstream immune activation.",
      "Provides a dietary-actionable control point over inflammatory tone.",
    ],
  },
  "brs3/fm1/brs3-fm1-pm2-gut-derived-inflammatory-signalling.mdx": {
    mission:
      "Limit endotoxin spillover from the gut so barrier dysfunction does not drive systemic inflammatory load.",
    translational:
      "Describes inflammatory signalling driven by endotoxin translocation (leakage of bacterial lipopolysaccharide across a compromised gut lining) and barrier dysfunction, linking gut ecology directly to systemic and neural inflammation. Unlike the transcriptional regulation covered elsewhere, this mechanism captures inflammatory load entering specifically from the gut interface, where barrier integrity, microbial balance, and endotoxin burden jointly determine downstream immune signalling. Gut-supportive dietary patterns influence this entry point directly.",
    bullets: [
      "Links gut barrier dysfunction and endotoxin translocation to systemic inflammation.",
      "Captures inflammatory load entering specifically from the gut interface.",
      "Depends jointly on barrier integrity, microbial balance, and endotoxin burden.",
    ],
  },
  "brs3/fm2/brs3-fm2-pm3-nrf2-are-antioxidant-activation.mdx": {
    mission:
      "Enable endogenous antioxidant gene activation so cellular defence capacity can rise to meet oxidative stress.",
    translational:
      "Activates Nrf2-dependent antioxidant and detoxification gene programmes (the cell's own inducible defence switch) that raise endogenous protection against oxidative stress from within, rather than relying solely on antioxidants supplied through diet. This mechanism governs induction of the body's internal defence machinery specifically, distinct from exogenous antioxidant supply covered elsewhere. Activation depends on antioxidant substrate and cofactor sufficiency, meaning dietary quality still shapes how strongly this internal switch can respond.",
    bullets: [
      "Switches on the cell's own inducible antioxidant defence programme.",
      "Governs internal defence induction, distinct from dietary antioxidant supply.",
      "Depends on substrate and cofactor sufficiency to respond fully.",
    ],
  },
  "brs3/fm2/brs3-fm2-pm4-ros-generation-vs-clearance-balance.mdx": {
    mission:
      "Maintain balance between reactive oxygen species production and clearance so net oxidative pressure stays within tolerable limits.",
    translational:
      "Maintains dynamic balance between reactive oxygen species (ROS, reactive molecules generated as byproducts of normal metabolism and immune activity) production and their neutralisation across immune and metabolic contexts. Rather than tracking any single biomarker, this mechanism captures net redox pressure as an ongoing balance between generation and clearance capacity. When production outpaces clearance, oxidative damage accumulates across membranes, proteins, and mitochondrial structures, feeding into downstream lipid peroxidation and antioxidant-network demand.",
    bullets: [
      "Balances ROS generation against clearance capacity across metabolic contexts.",
      "Captures net redox pressure rather than any single biomarker.",
      "Feeds into downstream lipid peroxidation and antioxidant-network demand when imbalanced.",
    ],
  },
  "brs3/fm2/brs3-fm2-pm5-lipid-peroxidation-control.mdx": {
    mission:
      "Preserve membrane fats from oxidative damage so vulnerable polyunsaturated fatty acids remain intact.",
    translational:
      "Protects membrane lipids and polyunsaturated fatty acids (PUFAs, fat molecules especially vulnerable to oxidative attack because of their multiple double bonds) from oxidative degradation at the membrane level specifically. Antioxidant availability and lipid quality jointly determine whether these vulnerable fatty acids are protected or damaged, making this mechanism dependent on both antioxidant-network recycling and dietary fat quality together. Because neuronal membranes are especially PUFA-rich, this control point intersects directly with brain lipid biology.",
    bullets: [
      "Protects polyunsaturated fatty acids from oxidative membrane damage.",
      "Depends jointly on antioxidant-network recycling and dietary fat quality.",
      "Intersects directly with neuronal membrane lipid biology essential for brain signalling.",
    ],
  },
  "brs3/fm2/brs3-fm2-pm6-antioxidant-network-recycling.mdx": {
    mission:
      "Sustain networked antioxidant regeneration so vitamin and thiol defences are recycled rather than depleted.",
    translational:
      "Supports recycling interactions among antioxidant systems that regenerate vitamin and thiol antioxidant capacity (networked regeneration, such as vitamin C recycling vitamin E, rather than single-compound resupply). This mechanism governs antioxidant-network recycling specifically, distinct from exogenous antioxidant supply or Nrf2-driven endogenous activation covered elsewhere. Because recycling extends how long existing antioxidant capacity lasts, network efficiency can matter as much as raw antioxidant intake for sustained protection.",
    bullets: [
      "Recycles vitamin and thiol antioxidants across networked systems.",
      "Extends how long existing antioxidant capacity lasts before depletion.",
      "Distinct from exogenous supply or endogenous Nrf2-driven activation.",
    ],
  },
  "brs3/fm3/brs3-fm3-pm7-cytokine-network-modulation.mdx": {
    mission:
      "Shape downstream cytokine signalling intensity so inflammatory tone does not remain chronically elevated.",
    translational:
      "Modulates cytokine signalling tone across IL-6, TNF-α, and CRP-linked inflammatory pathways (immune messenger molecules that coordinate and amplify inflammatory responses) once transcriptional activation has already occurred upstream. This mechanism governs downstream signalling intensity specifically, complementing rather than duplicating the upstream NF-κB transcriptional regulation covered elsewhere. Chronically elevated cytokine tone contributes to sustained low-grade inflammation, making this a distinct dietary-actionable node further along the inflammatory cascade.",
    bullets: [
      "Modulates IL-6, TNF-α, and CRP-linked cytokine signalling intensity.",
      "Governs downstream signalling tone, complementing upstream transcriptional regulation.",
      "Contributes to sustained low-grade inflammation when chronically elevated.",
    ],
  },
  "brs3/fm3/brs3-fm3-pm8-eicosanoid-spm-balance.mdx": {
    mission:
      "Shape lipid mediator balance away from pro-inflammatory eicosanoids toward pro-resolving signals that actively terminate inflammation.",
    translational:
      "Balances arachidonic-acid-derived inflammatory eicosanoids against EPA/DHA-derived specialised pro-resolving mediators (SPMs, lipid signals that actively switch inflammation off rather than merely suppressing it). This mechanism governs the shift between pro-inflammatory and pro-resolving lipid signalling specifically, depending directly on essential fatty acid balance and antioxidant substrate sufficiency from upstream dietary intake. Because resolution is an active process rather than passive suppression, omega-3 status shapes whether inflammation terminates cleanly or persists.",
    bullets: [
      "Balances pro-inflammatory eicosanoids against pro-resolving lipid mediators.",
      "Depends directly on essential fatty acid and antioxidant sufficiency.",
      "Drives active inflammation resolution rather than passive suppression.",
    ],
  },

  // ---------------------------------------------------------------------
  // BRS4 — Cellular Bioenergetics & Mitochondrial Function
  // ---------------------------------------------------------------------
  "brs4/fm1/brs4-fm1-pm1-electron-transport-chain-function.mdx": {
    mission:
      "Sustain efficient electron transport so mitochondria generate ATP without excessive electron leakage.",
    translational:
      "Governs oxidative phosphorylation and electron transfer efficiency across the mitochondrial electron transport chain (the multi-complex assembly line that converts electrons from food into ATP, cellular energy currency). Efficient transfer maximises ATP yield per unit of substrate while minimising electron leakage that would otherwise generate reactive oxygen species. Macronutrient and cofactor sufficiency both shape how completely this chain can run, linking meal composition directly to cognitive energy availability.",
    bullets: [
      "Converts electrons from food substrates into ATP within mitochondria.",
      "Minimises electron leakage that would otherwise generate reactive oxygen species.",
      "Links macronutrient and cofactor sufficiency to cognitive energy availability.",
    ],
  },
  "brs4/fm1/brs4-fm1-pm2-nad-metabolism.mdx": {
    mission:
      "Maintain NAD⁺ availability so redox reactions and mitochondrial signalling stay adequately powered.",
    translational:
      "Maintains availability of NAD⁺ (nicotinamide adenine dinucleotide, a central cofactor that shuttles electrons through redox reactions and links energy metabolism to cellular regulation) for oxidative metabolism and mitochondrial signalling. NAD⁺ status depends on dietary niacin-pathway precursors and the balance between synthesis and consumption by NAD-dependent enzymes involved in repair and signalling. Because NAD⁺ sits at this metabolic-regulatory crossroads, its sufficiency shapes both electron transport capacity and broader cellular ageing biology.",
    bullets: [
      "Supplies NAD⁺ for redox reactions and mitochondrial signalling.",
      "Depends on dietary niacin-pathway precursors and consumption balance.",
      "Links energy metabolism directly to cellular regulatory chemistry.",
    ],
  },
  "brs4/fm1/brs4-fm1-pm3-creatine-phosphocreatine-buffer.mdx": {
    mission:
      "Enable rapid ATP buffering so high-energy-demand tissues can meet sudden metabolic spikes.",
    translational:
      "Provides a rapid ATP buffering system through creatine–phosphocreatine cycling, regenerating ATP faster than oxidative phosphorylation alone during sudden demand spikes in brain and muscle. Brain creatine availability reflects endogenous synthesis, cellular transport and, under some conditions, exogenous creatine intake. Dietary or supplemental creatine may increase cerebral creatine or phosphocreatine in selected populations or high-demand states, but responses are smaller and less consistent than in skeletal muscle.",
    bullets: [
      "Buffers rapid ATP demand in brain and high-energy tissues.",
      "Complements oxidative phosphorylation during sudden burst-energy spikes.",
      "Depends on creatine synthesis, transport, phosphorylation and cellular compartmentalisation; exogenous creatine may provide additional support under selected conditions.",
    ],
  },
  "brs4/fm2/brs4-fm2-pm4-ros-production-and-control.mdx": {
    mission:
      "Maintain balance between mitochondrial reactive oxygen species production and protective buffering to prevent redox damage.",
    translational:
      "Maintains balance between mitochondrial reactive oxygen species (ROS, reactive byproducts generated during electron transport) generation and protective buffering within the organelle itself, distinct from systemic redox balance covered elsewhere. Mitochondria are both a major ROS source and a primary target of ROS damage, making this a localised balance point rather than a whole-body measure. When production outpaces buffering under metabolic load, oxidative damage accumulates within the mitochondria that generated it.",
    bullets: [
      "Balances mitochondrial ROS generation against protective buffering capacity.",
      "Represents a localised organelle-level balance, not a whole-body measure.",
      "Determines whether oxidative damage accumulates within mitochondria under load.",
    ],
  },
  "brs4/fm2/brs4-fm2-pm5-mitochondrial-protection-redox-integrity.mdx": {
    mission:
      "Preserve mitochondrial membrane and enzyme integrity so organelle function survives oxidative and metabolic strain.",
    translational:
      "Protects mitochondrial membranes, enzymes, and redox systems from oxidative damage (cumulative wear from reactive oxygen species that can impair the organelle's own energy-producing machinery), preserving structural and functional integrity under metabolic strain. This mechanism depends on antioxidant substrate sufficiency reaching the mitochondria specifically, rather than general systemic antioxidant status alone. Because damaged mitochondria produce more ROS themselves, protection here helps prevent a self-reinforcing cycle of organelle decline.",
    bullets: [
      "Protects mitochondrial membranes and enzymes from oxidative damage.",
      "Depends on antioxidant substrate reaching the mitochondria specifically.",
      "Helps prevent a self-reinforcing cycle of organelle decline.",
    ],
  },
  "brs4/fm3/brs4-fm3-pm6-carnitine-mediated-fat-transport.mdx": {
    mission:
      "Enable long-chain fatty-acid transport into mitochondria so fat-derived ATP production can proceed.",
    translational:
      "Transports long-chain fatty acids into mitochondria for β-oxidation (fatty-acid burning that generates ATP) via the carnitine shuttle system, a prerequisite step without which fat-derived energy production cannot occur regardless of how much fat is available. This transport step is a specific bottleneck distinct from glucose-based or ketone-based fuel pathways covered elsewhere. Dietary carnitine and substrate availability jointly determine how efficiently this shuttle keeps pace with fat-oxidation demand.",
    bullets: [
      "Shuttles long-chain fatty acids into mitochondria via carnitine transport.",
      "Acts as a specific bottleneck for fat-derived ATP production.",
      "Depends on dietary carnitine and fatty-acid substrate availability.",
    ],
  },
  "brs4/fm3/brs4-fm3-pm7-ketone-utilisation-capacity.mdx": {
    mission:
      "Enable mitochondrial ketone utilisation so alternative fuel is available when glucose conditions shift.",
    translational:
      "Supports capacity to transport, metabolise, and utilise ketone bodies (beta-hydroxybutyrate and acetoacetate, alternative fuels the liver produces when glucose availability falls) as mitochondrial energy substrates when glucose conditions change. This pathway provides metabolic fuel flexibility distinct from the carbohydrate- or fat-transport routes covered elsewhere, becoming physiologically relevant during fasting, prolonged exercise, or carbohydrate-restricted eating patterns. Mitochondrial ketone-oxidation enzyme capacity, not just circulating ketone levels, determines how effectively this alternative fuel is actually used.",
    bullets: [
      "Metabolises ketone bodies as alternative mitochondrial fuel.",
      "Becomes relevant during fasting, exercise, or carbohydrate restriction.",
      "Depends on ketone-oxidation enzyme capacity, not just circulating ketone levels.",
    ],
  },
  "brs4/fm3/brs4-fm3-pm8-metabolic-fuel-switching.mdx": {
    mission:
      "Shape smooth transitions between glucose, fat, and ketone fuel pathways as physiological demand shifts.",
    translational:
      "Enables transition between glucose-derived, fatty-acid-derived, and ketone-derived energy production pathways (metabolic fuel switching, the capacity to shift which substrate mitochondria burn) according to substrate availability and physiological demand. This mechanism represents the integration point across the individual transport and utilisation pathways covered by sibling mechanisms, rather than any single fuel route itself. Metabolic flexibility here — how readily the switch occurs — links directly to glycaemic context and cognitive energy stability across the day.",
    bullets: [
      "Shifts between glucose, fat, and ketone fuel pathways as demand changes.",
      "Integrates individual transport and utilisation pathways into flexible switching.",
      "Links fuel-switching readiness to glycaemic context and energy stability.",
    ],
  },
  "brs4/fm4/brs4-fm4-pm9-mitochondrial-biogenesis.mdx": {
    mission:
      "Enable formation of new mitochondria so long-term energetic capacity can expand and adapt.",
    translational:
      "Drives formation of new mitochondria through pathways such as PGC-1α, AMPK, and related transcriptional regulators (the master signalling network that senses energy demand and triggers organelle expansion) in response to repeated exercise and metabolic stimuli. This adaptive expansion increases mitochondrial density over weeks of consistent stimulus rather than through any single acute intervention. Macronutrient and cofactor sufficiency provide permissive substrate support, but the biogenesis signal itself originates primarily from physical activity.",
    bullets: [
      "Drives new mitochondria formation via PGC-1α and AMPK signalling.",
      "Increases mitochondrial density over weeks of consistent exercise stimulus.",
      "Depends on diet for permissive substrate, but the signal originates from activity.",
    ],
  },

  // ---------------------------------------------------------------------
  // BRS6 — Metabolic-Endocrine & Stress-Response Rhythms
  // ---------------------------------------------------------------------
  "brs6/fm1/brs6-fm1-pm1-glucose-appearance-kinetics.mdx": {
    mission:
      "Shape the rate of post-meal glucose appearance so metabolic and neuroendocrine systems face manageable, predictable load.",
    translational:
      "Regulates the rate and temporal profile of glucose appearance following feeding (glucose appearance kinetics, how quickly and how much glucose enters the bloodstream after a meal) through digestion speed, gastric emptying, intestinal absorption, food structure, and meal-context effects. This mechanism sits upstream of glycaemic variability and insulin demand, meaning how glucose arrives shapes everything that follows. Food structure and meal composition — not glucose content alone — largely determine this entry profile.",
    bullets: [
      "Regulates how quickly glucose appears in the bloodstream after meals.",
      "Shaped by digestion speed, food structure, and meal composition.",
      "Sits upstream of glycaemic variability and insulin demand.",
    ],
  },
  "brs6/fm1/brs6-fm1-pm2-glycaemic-variability-regulation.mdx": {
    mission:
      "Limit glycaemic volatility so post-prandial glucose swings do not create unnecessary metabolic and neuroendocrine stress.",
    translational:
      "Regulates stability, volatility, and oscillatory behaviour of post-prandial glucose dynamics across the meal period (glycaemic variability, how much glucose levels rise and fall rather than the absolute levels reached). Rather than controlling glucose entry directly, this mechanism governs how variable or stable those fluctuations become and the resulting metabolic and neuroendocrine stress burden they create. It operates downstream of glucose appearance kinetics, translating entry-rate patterns into either smooth or volatile glucose trajectories.",
    bullets: [
      "Governs how variable or stable post-meal glucose fluctuations become.",
      "Determines metabolic and neuroendocrine stress burden from glucose swings.",
      "Operates downstream of glucose appearance kinetics.",
    ],
  },
  "brs6/fm1/brs6-fm1-pm3-insulin-sensitivity-and-glucose-disposal.mdx": {
    mission:
      "Sustain insulin-sensitive glucose disposal so post-meal glucose clears efficiently without prolonged metabolic strain.",
    translational:
      "Supports capacity to clear and utilise circulating glucose efficiently after nutrient intake through insulin-responsive tissues (insulin sensitivity, how readily muscle, liver, and fat tissue respond to insulin's signal to take up glucose), hepatic and muscle glucose handling, and broader metabolic context. Efficient disposal reduces prolonged post-prandial strain and supports faster metabolic recovery between meals. This mechanism operates downstream of both appearance kinetics and variability, determining how quickly the system returns to baseline.",
    bullets: [
      "Clears circulating glucose efficiently through insulin-responsive tissues.",
      "Reduces prolonged post-prandial metabolic strain.",
      "Determines how quickly the system returns to baseline between meals.",
    ],
  },
  "brs6/fm2/brs6-fm2-pm4-cortisol-rhythm-regulation.mdx": {
    mission:
      "Maintain diurnal cortisol amplitude and phase so morning activation and evening downshift stay well timed.",
    translational:
      "Regulates the diurnal cortisol pattern (the daily rise-and-fall rhythm of this stress hormone, especially morning activation and evening downshift) through HPA-axis timing, sleep–wake structure, and consistency of feeding-related metabolic cues. Meal timing and light exposure act as entrainment signals that keep this rhythm phase-locked to the day–night cycle. When feeding and sleep cues become inconsistent, cortisol amplitude and phase can drift, undermining the morning alertness and evening wind-down this rhythm normally supports.",
    bullets: [
      "Regulates morning cortisol activation and evening downshift timing.",
      "Depends on consistent sleep–wake and feeding-related metabolic cues.",
      "Drifts in amplitude and phase when daily cues become inconsistent.",
    ],
  },
  "brs6/fm2/brs6-fm2-pm5-circadian-feeding-and-light-dark-entrainment.mdx": {
    mission:
      "Ensure feeding and light exposure stay aligned with circadian rhythms across the 24-hour cycle.",
    translational:
      "Aligns feeding windows, light exposure, and sleep timing with circadian regulation of metabolism and neuroendocrine rhythms (entrainment, the process by which external cues synchronise internal biological clocks) across the 24-hour cycle. This mechanism provides the timing scaffold that cortisol rhythm regulation and broader metabolic cycling depend on, rather than governing hormone output directly. Irregular meal timing or mistimed light exposure can desynchronise this scaffold even when nutrient quality itself remains adequate.",
    bullets: [
      "Synchronises feeding, light exposure, and sleep with circadian rhythms.",
      "Provides the timing scaffold that cortisol regulation depends on.",
      "Can desynchronise from irregular meal timing even with adequate nutrition.",
    ],
  },
  "brs6/fm3/brs6-fm3-pm6-sympathetic-activation-and-parasympathetic-recovery.mdx": {
    mission:
      "Maintain autonomic flexibility by shifting cleanly from sympathetic activation back into parasympathetic recovery.",
    translational:
      "Regulates sympathetic arousal and the shift back into parasympathetic recovery (the autonomic nervous system's activation and calming branches, respectively) after stress, exercise, or cognitive demand, restoring autonomic flexibility across activation–recovery cycles. How efficiently this shift occurs — not simply how strongly sympathetic activation fires — determines whether the body returns to baseline promptly or stays in a prolonged aroused state. This flexibility depends on nutrient and lifestyle factors that support parasympathetic tone.",
    bullets: [
      "Regulates the shift from sympathetic activation into parasympathetic recovery.",
      "Determines whether the body returns to baseline promptly or stays aroused.",
      "Depends on nutrient and lifestyle support for parasympathetic tone.",
    ],
  },
  "brs6/fm3/brs6-fm3-pm7-vagal-tone-hrv-regulation.mdx": {
    mission:
      "Sustain vagal tone so heart-rate-variability-linked recovery signalling remains robust under repeated stress exposure.",
    translational:
      "Regulates vagal tone and heart-rate-variability-related recovery signalling (HRV, a measurable proxy for parasympathetic nervous system activity and recovery capacity) that reflects readiness to recover after stress, exercise, or cognitive demand. Unlike the broader sympathetic–parasympathetic shift covered by a sibling mechanism, this pathway focuses specifically on vagal nerve output and its measurable HRV signature. Nutrient status, gut–vagal signalling, and consistent recovery practices all shape how robust this vagal tone remains over time.",
    bullets: [
      "Regulates vagal tone and its measurable HRV signature.",
      "Reflects readiness to recover after stress or cognitive demand.",
      "Shaped by nutrient status, gut–vagal signalling, and recovery practices.",
    ],
  },
  "brs6/fm4/brs6-fm4-pm8-metabolic-inflammation-and-adipose-stress-signalling.mdx": {
    mission:
      "Limit metabolic-inflammatory signalling from adipose stress so whole-body resource allocation is not overloaded.",
    translational:
      "Describes inflammatory and endocrine signalling from metabolic overload, adipose tissue stress, and insulin-resistant states (adipose stress signalling, the inflammatory messages released when fat tissue becomes overloaded or dysfunctional) that shape whole-body resource allocation and neuroendocrine load. Unlike acute post-meal glycaemic mechanisms, this pathway reflects chronic, cumulative metabolic strain building over time. As adipose stress rises, the resulting inflammatory and endocrine signals compete with other systems for regulatory and energetic resources.",
    bullets: [
      "Signals metabolic-inflammatory load from overloaded or dysfunctional adipose tissue.",
      "Reflects chronic, cumulative metabolic strain rather than acute glucose swings.",
      "Competes with other systems for regulatory and energetic resources.",
    ],
  },
  "brs6/fm4/brs6-fm4-pm9-stress-induced-appetite-reward-drive-modulation.mdx": {
    mission:
      "Shape stress-linked appetite and reward drive so food-seeking behaviour stays proportionate to genuine need.",
    translational:
      "Describes stress-related modulation of appetite, reward drive, and food-seeking behaviour through cortisol, catecholamine, and metabolic signals (the stress-hormone and neurotransmitter pathways that can override hunger and satiety cues under pressure) that influence intake stability and neuroendocrine allocation. Chronic or acute stress can push food-seeking behaviour away from genuine physiological need and toward reward-driven or emotionally-driven eating patterns. This pathway sits at the intersection of stress physiology and behavioural eating regulation.",
    bullets: [
      "Modulates appetite and reward drive through cortisol and catecholamine signals.",
      "Can override hunger and satiety cues under stress.",
      "Sits at the intersection of stress physiology and eating behaviour.",
    ],
  },

  // ---------------------------------------------------------------------
  // BRS-X — Endocannabinoidome (ECS)
  // ---------------------------------------------------------------------
  "brs-x/ecs/fm1/brs-x-ecs-pm1-nape-nae-biosynthesis-capacity.mdx": {
    mission:
      "Enable NAPE-to-NAE biosynthesis so endocannabinoidome signalling lipids remain available for stress and motivation regulation.",
    translational:
      "Governs generation of N-acyl phosphatidylethanolamines (NAPEs, membrane phospholipid precursors) and their downstream N-acyl ethanolamines (NAEs), including anandamide, palmitoylethanolamide, and oleoylethanolamide — signalling lipids that act as neuromodulators throughout the nervous system. These molecules help the body adapt to stress, regulate motivation, and maintain physiological balance, operating upstream of the degradation and receptor-interaction mechanisms covered by sibling pathways. Phospholipid precursor availability from dietary fat intake directly constrains how much biosynthetic capacity exists.",
    bullets: [
      "Generates NAPE and NAE signalling lipids including anandamide and PEA.",
      "Operates upstream of degradation and receptor-interaction mechanisms.",
      "Constrained directly by dietary phospholipid precursor availability.",
    ],
  },
  "brs-x/ecs/fm1/brs-x-ecs-pm2-omega-3-derived-endocannabinoidome-signalling.mdx": {
    mission:
      "Sustain omega-3-derived ethanolamide production so endocannabinoidome neuromodulation stays supplied from dietary fat status.",
    translational:
      "Supports production of omega-3-derived ethanolamides and related signalling molecules, including DHEA and EPEA (endocannabinoidome lipids built from EPA and DHA rather than from arachidonic acid, the precursor for classical endocannabinoids like anandamide). This pathway links dietary long-chain omega-3 status directly to endocannabinoidome neuromodulation, providing an omega-3-specific signalling branch distinct from NAPE/NAE biosynthesis from other phospholipid precursors. Habitual EPA and DHA intake, not isolated dosing, determines how much of this signalling capacity exists.",
    bullets: [
      "Produces omega-3-derived ethanolamides DHEA and EPEA from EPA and DHA.",
      "Provides an omega-3-specific branch distinct from other NAE biosynthesis.",
      "Depends on habitual long-chain omega-3 intake, not isolated dosing.",
    ],
  },
  "brs-x/ecs/fm1/brs-x-ecs-pm3-faah-mediated-endocannabinoid-preservation.mdx": {
    mission:
      "Preserve endocannabinoid signalling duration by limiting FAAH-mediated degradation of anandamide and related NAEs.",
    translational:
      "Regulates fatty acid amide hydrolase (FAAH, the primary enzyme that breaks down anandamide and related N-acyl ethanolamines) activity, influencing how long these signalling lipids persist before degradation. This mechanism governs preservation and degradation timing specifically, extending neuromodulatory signalling duration without acting through direct receptor pharmacology. Because FAAH activity can be modulated by dietary and lifestyle factors including certain polyphenols, this preservation step offers a distinct diet-actionable lever separate from biosynthesis capacity upstream.",
    bullets: [
      "Regulates FAAH-mediated breakdown of anandamide and related NAEs.",
      "Extends neuromodulatory signalling duration without direct receptor pharmacology.",
      "Offers a diet-actionable lever distinct from upstream biosynthesis.",
    ],
  },
  "brs-x/ecs/fm1/brs-x-ecs-pm4-endocannabinoid-dopamine-neuromodulation.mdx": {
    mission:
      "Shape dopaminergic reward and motivation pathways through endocannabinoid neuromodulatory interaction.",
    translational:
      "Describes interaction between endocannabinoid signalling and dopaminergic reward, motivation, and behavioural activation pathways (a neuromodulatory crosstalk rather than direct receptor stimulation), linking endocannabinoidome biology to drive and effort-related neurocircuitry. This intersection means endocannabinoid tone can influence motivation-relevant dopamine signalling without acting on dopamine pathways directly, operating instead through modulatory interaction at shared neural circuits. Because this pathway sits downstream of both biosynthesis and preservation mechanisms, it depends on adequate upstream endocannabinoidome tone to have influence at all.",
    bullets: [
      "Links endocannabinoid tone to dopaminergic reward and motivation signalling.",
      "Operates through modulatory crosstalk rather than direct receptor stimulation.",
      "Depends on adequate upstream biosynthesis and preservation to have effect.",
    ],
  },
  "brs-x/ecs/fm1/brs-x-ecs-pm5-endocannabinoid-stress-buffering-capacity.mdx": {
    mission:
      "Sustain endocannabinoid-mediated stress buffering so HPA-axis and neuroinflammatory reactivity stay proportionate.",
    translational:
      "Supports endocannabinoid-mediated buffering of stress responsiveness through interactions with neuroinflammatory pathways, HPA-axis activity (hypothalamic–pituitary–adrenal signalling, the body's central stress-hormone axis), and excitatory neurotransmission. This buffering capacity integrates outputs from upstream biosynthesis, omega-3-derived signalling, and preservation mechanisms into a functional stress-resilience readout, rather than representing a separate biosynthetic pathway itself. When endocannabinoidome tone is well supported, stress reactivity tends to resolve more efficiently across neuroinflammatory and excitatory-signalling dimensions together.",
    bullets: [
      "Buffers stress responsiveness through endocannabinoid neuromodulation.",
      "Integrates upstream biosynthesis and preservation into a resilience readout.",
      "Supports more efficient stress resolution when endocannabinoidome tone is adequate.",
    ],
  },

  // ---------------------------------------------------------------------
  // BRS-X — Reproductive & Metabolic Hormone Integration
  // ---------------------------------------------------------------------
  "brs-x/hormones/fm1/brs-x-hormones-pm1-oestrogen-signalling-stability.mdx": {
    mission:
      "Maintain stable oestrogen-linked signalling so dopamine tone and emotional regulation remain steady across hormonal fluctuation.",
    translational:
      "Regulates oestrogen-mediated signalling relevant to dopamine tone, cognitive stability, and emotional regulation (oestrogen acts as a neuromodulator, not solely a reproductive hormone) across the menstrual cycle and perimenopausal transition. Because oestrogen fluctuation can shift dopaminergic sensitivity, this mechanism frames menstrual and perimenopausal symptom variation as neurobiological context rather than diagnosis or treatment claim. Stability here depends on both circulating oestrogen levels and how consistently downstream signalling responds to them.",
    bullets: [
      "Modulates dopamine tone and cognitive stability through oestrogen signalling.",
      "Frames menstrual and perimenopausal fluctuation as neurobiological context.",
      "Depends on both circulating oestrogen levels and downstream signalling consistency.",
    ],
  },
  "brs-x/hormones/fm1/brs-x-hormones-pm2-estrobolome-regulation.mdx": {
    mission:
      "Shape systemic oestrogen exposure through microbiome-mediated regulation of oestrogen metabolism and recycling.",
    translational:
      "Supports microbiome-mediated regulation of oestrogen metabolism, deconjugation, recycling, and elimination through beta-glucuronidase activity and enterohepatic circulation (the estrobolome, the collective gut-microbial capacity to metabolise and recycle oestrogens). This pathway links gut ecology directly to systemic oestrogen exposure, meaning microbial composition can influence hormone levels independently of ovarian output itself. Fibre and plant-diversity intake that shapes microbial beta-glucuronidase activity therefore has downstream consequences for oestrogen signalling stability elsewhere in the system.",
    bullets: [
      "Regulates oestrogen deconjugation and enterohepatic recycling via gut microbes.",
      "Links microbial composition to systemic oestrogen exposure.",
      "Shaped by fibre and plant-diversity intake influencing microbial enzymes.",
    ],
  },
  "brs-x/hormones/fm1/brs-x-hormones-pm3-progesterone-supportive-microbial-metabolism.mdx": {
    mission:
      "Sustain microbial contributions to progesterone-related hormonal stability through gut ecosystem function.",
    translational:
      "Supports microbial and metabolite-linked stability of progesterone-related hormonal balance, potentially involving butyrate-producing organisms such as Faecalibacterium prausnitzii and Roseburia (short-chain-fatty-acid-producing bacteria whose metabolic activity may intersect reproductive endocrine context). This pathway represents an emerging, less-established gut-hormone connection compared with the estrobolome, reflecting associative rather than mechanistically confirmed microbial contribution. Fermentable fibre intake that sustains these butyrate-producing guilds may therefore have downstream relevance for progesterone-linked hormonal stability.",
    bullets: [
      "Links butyrate-producing gut bacteria to progesterone-related hormonal balance.",
      "Represents an emerging, associative rather than confirmed mechanism.",
      "Depends on fermentable fibre intake that sustains these microbial guilds.",
    ],
  },
  "brs-x/hormones/fm1/brs-x-hormones-pm4-metabolic-reproductive-hormone-integration.mdx": {
    mission:
      "Enable coordinated integration of insulin and metabolic signalling with reproductive hormone balance.",
    translational:
      "Coordinates insulin regulation, metabolic signalling, gut barrier and microbial function, and reproductive hormone balance — including mechanisms through which Akkermansia muciniphila (a gut bacterium linked to metabolic and barrier health) and glycaemic-insulin stability may influence oestrogen–progesterone harmony. This mechanism represents an integration node rather than a single hormonal pathway, capturing how metabolic dysfunction can spill over into reproductive hormone disruption and vice versa. Insulin-sensitising dietary patterns therefore carry reproductive-hormone relevance beyond their metabolic effects alone.",
    bullets: [
      "Coordinates insulin, metabolic, and gut-microbial signals with hormone balance.",
      "Captures how metabolic dysfunction can spill into reproductive disruption.",
      "Gives insulin-sensitising dietary patterns reproductive-hormone relevance beyond metabolism.",
    ],
  },
  "brs-x/hormones/fm1/brs-x-hormones-pm5-testosterone-signalling-stability.mdx": {
    mission:
      "Maintain androgen receptor signalling so motivation, stamina, and goal-directed effort remain well supported.",
    translational:
      "Supports integrated regulation of testosterone availability and androgen receptor signalling influencing behavioural activation, motivation, mental stamina, persistence, and goal-directed effort (androgen signalling, not testosterone level alone, determines functional outcome). Testosterone intersects dopaminergic motivation circuits, effort allocation, and fatigue vulnerability, becoming particularly relevant where androgen exposure runs low. This mechanism frames motivation and stamina through hormonal context rather than treating them as purely psychological or purely dopaminergic phenomena.",
    bullets: [
      "Modulates androgen receptor signalling relevant to motivation and effort.",
      "Intersects dopaminergic motivation circuits, especially where exposure is low.",
      "Frames stamina and persistence through hormonal, not purely psychological, context.",
    ],
  },
  "brs-x/hormones/fm1/brs-x-hormones-pm6-androgen-microbiome-regulation.mdx": {
    mission:
      "Shape systemic androgen exposure through microbiome-mediated androgen metabolism and recycling.",
    translational:
      "Supports microbiome-mediated regulation of androgen metabolism, degradation, recycling, and systemic androgen exposure through microbial steroid-transforming enzymes and enterohepatic circulation (a male-hormone parallel to the estrobolome pathway covering oestrogen). This mechanism links gut ecology directly to circulating androgen levels, meaning microbial composition can shift systemic exposure independently of gonadal output. Because this pathway feeds directly into testosterone signalling stability, gut-supportive dietary patterns carry downstream relevance for androgen-dependent motivation and effort biology.",
    bullets: [
      "Regulates androgen metabolism and enterohepatic recycling via gut microbes.",
      "Links microbial composition to circulating androgen levels.",
      "Feeds directly into testosterone signalling and motivation biology.",
    ],
  },
};
