---
id: copper
title: Copper
sidebar_label: Copper
description: Essential cuproenzyme cofactor for catecholamine synthesis, iron efflux and redox defence; mapped to BRS1, BRS3, BRS5 and BRS6.
tags:
  - Substance
  - Nutrient
  - Mineral
  - Trace Mineral
  - Copper
  - Neurotransmitter Regulation
  - Inflammation & Oxidative Stress
  - Gut-Brain Axis & Enteric Nervous System
  - Metabolic & Neuroendocrine Regulation
ion_notation: Cu2+
list_image: /img/minerals/copper-wikimedia.jpg
main_image: /img/minerals/copper-wikimedia.jpg
mechanisms:
  Neurotransmitter Regulation: 'Cofactor for dopamine β-hydroxylase, converting dopamine to norepinephrine; brain copper handling is tightly compartmentalised and not equivalent to serum copper.'
  Inflammation & Oxidative Stress: 'Required by copper–zinc superoxide dismutase and other redox enzymes; both deficiency and overload can increase oxidative injury.'
  Gut-Brain Axis & Enteric Nervous System: 'Intestinal absorption and metallothionein binding interact with zinc and the food matrix; high-dose single-mineral intake can shift the pair.'
  Metabolic & Neuroendocrine Regulation: 'Most circulating copper is bound to ceruloplasmin, a ferroxidase that supports iron efflux and is influenced by inflammatory and hormonal status.'
---

## Overview

Copper is an essential trace mineral and cofactor for cuproenzymes, including dopamine β-hydroxylase in catecholamine synthesis and ceruloplasmin in cellular iron efflux [1,2]. It occurs in shellfish, organ meats, nuts, seeds, cocoa and legumes, and is used in this ontology as a nutrient rather than a stand-in for mixed-mineral or psychiatric-supplement trials. Most circulating copper is bound to ceruloplasmin; a serum value should not be read as brain copper [1,2].

Copper also sits in antioxidant networks, notably copper–zinc superoxide dismutase, and in metallothionein proteins that bind copper with zinc [3,5]. The two minerals compete at intestinal absorption and storage, so isolated high-dose zinc or copper can shift the pair [4,5]. Disease evidence is strongest for Wilson disease as pathological copper accumulation, not for routine supplementation in psychiatric conditions; condition-specific mappings sit under Therapeutic Area Research.

## Key Compound Highlights

- Cofactor for dopamine β-hydroxylase; required for norepinephrine synthesis in brain [1].
- Ceruloplasmin carries most plasma copper and acts as a ferroxidase supporting iron efflux [2].
- Copper–zinc superoxide dismutase and related cuproenzymes link copper status to redox defence and, when unbalanced, oxidative injury [1,3].
- Dietary copper and zinc interact through absorption and metallothionein; high-dose single-mineral intake can create imbalance [4,5].
- Serum or plasma copper is not a brain concentration and is not, by itself, a diagnostic biotype [1,2].

## Dietary Context

### Food sources

Shellfish, organ meats, nuts, seeds, cocoa and legumes are dense copper sources. Mixed meals are the usual dietary route; isolated copper supplements are not equivalent to food copper.

### Synergies

Copper, zinc and iron are jointly regulated. Zinc can reduce copper absorption at high supplemental doses; copper is required for ceruloplasmin-mediated iron mobilisation [2,4,5]. Interpret mineral intake as a set, not as independent knobs.

### Supplement versus food

Food-first intake is the default. Long-term high-dose copper or zinc supplements can create imbalance and are not justified by psychiatric mineral-ratio observations. Wilson disease is a medical diagnosis with specific treatment, not a dietary-supplement protocol.

## Recipes

<SubstanceRecipes tag="Copper" />

## Foods

<SubstanceFoods tag="Copper" />

## Biological Regulatory Systems

Compact BRS mapping for Nutritional Highlights. Deeper copper–zinc biology is in Advanced Nutrition; condition-specific evidence is in Therapeutic Area Research.

<div className="markdown-table-scroll">

| Biological Regulatory System | Copper mapping | Evidence |
| --- | --- | --- |
| [Neurotransmitter Regulation](/docs/biological-targets/neurotransmitter-regulation) (BRS1) | Cofactor for dopamine β-hydroxylase; norepinephrine synthesis; brain copper is compartmentalised | [1] |
| [Inflammation & Oxidative Stress](/docs/biological-targets/inflammation-oxidative-stress) (BRS3) | Copper–zinc superoxide dismutase and other cuproenzymes; deficiency or overload can increase oxidative injury | [1,3] |
| [Gut–Brain Axis & Enteric Nervous System](/docs/biological-targets/gut-brain-axis-enteric-nervous-system) (BRS5) | Intestinal absorption and metallothionein binding; zinc–copper competition in the food matrix | [4,5] |
| [Metabolic & Neuroendocrine Regulation](/docs/biological-targets/metabolic-neuroendocrine-stress) (BRS6) | Ceruloplasmin ferroxidase activity, iron efflux, and inflammatory or hormonal influence on circulating copper | [2] |

</div>

## References

[1] Review of copper handling in brain, including dopamine β-hydroxylase and the distinction between tightly regulated brain copper and circulating measures. Scheiber, Mercer and Dringen 2014. [Metabolism and functions of copper in brain](/docs/papers/BRAIN-Diet-References#scheiber_metabolism_2014)

[2] Review of ceruloplasmin as the major plasma copper protein and a ferroxidase required for iron efflux; copper is needed for the protein’s oxidase activity, but ceruloplasmin is not a copper-transport vehicle in the classical sense. Hellman and Gitlin 2002. [Ceruloplasmin metabolism and function](/docs/papers/BRAIN-Diet-References#hellman_ceruloplasmin_2002)

[3] Review of copper in oxidative stress and human health: cuproenzymes including superoxide dismutase, and oxidative injury when copper is deficient or in excess. Uriu-Adams and Keen 2005. [Copper, oxidative stress, and human health](/docs/papers/BRAIN-Diet-References#uriu_adams_copper_2005)

[4] Review of copper biochemistry, molecular biology and nutritional interactions, including zinc–copper competition at absorption and storage. Linder and Hazegh-Azam 1996. [Copper biochemistry and molecular biology](/docs/papers/BRAIN-Diet-References#linder_copper_1996)

[5] Review of dietary strategies against cadmium and lead toxicity: metallothionein binds zinc and copper, and mineral–phytate–polyphenol patterns alter metal absorption. Zhai, Narbad and Chen 2015. [Dietary Strategies for the Treatment of Cadmium and Lead Toxicity](/docs/papers/BRAIN-Diet-References#zhai_dietary_2015)

<AdvancedNutrition>

<h2 id="copper-zinc-balance" tabIndex={-1}>Copper–zinc regulation as a biological constraint</h2>

Copper and [zinc](/docs/substances/nutrients/micronutrients/minerals/trace/zinc) are jointly absorbed, stored and redistributed. A raised copper-to-zinc ratio is not a diagnosis: it may arise from increased copper or ceruloplasmin, reduced zinc, inflammatory redistribution, hormonal influences on ceruloplasmin, supplementation, or a combination of these factors. The finding is therefore a candidate regulatory constraint requiring context, not evidence of a stable copper biotype.

<AccessibleMermaid
  title="Raised copper-to-zinc ratio as an ambiguous observation"
  description="A raised copper-to-zinc ratio can arise from higher copper or ceruloplasmin, lower zinc availability, or a combined or transient change. Those routes can influence redox, inflammatory and catecholamine conditions and may affect attention, arousal and emotional regulation. The diagram is a candidate cascade, not a causal or diagnostic pathway."
  value={'flowchart TD\n    A["Dietary intake, absorption,<br/>supplements and physiological context"] --> B["Copper and zinc regulation"]\n    B --> C{"Raised copper-to-zinc ratio"}\n    C --> D["Higher copper or ceruloplasmin"]\n    C --> E["Lower zinc availability"]\n    C --> F["Combined or transient change"]\n    D --> G["Redox, inflammatory and<br/>catecholamine conditions"]\n    E --> G\n    F --> G\n    G --> H["Potential influence on attention,<br/>arousal and emotional regulation"]'}
/>

**Figure.** A raised copper-to-zinc ratio is an ambiguous observation that can arise through multiple routes. The diagram represents a candidate cross-system cascade, not an established causal pathway or diagnostic subtype.

The distinction between these routes is clinically and biologically important. A higher copper-to-zinc ratio can result from unchanged copper divided by lower zinc; it does not necessarily indicate copper excess. Circulating copper is substantially carried by ceruloplasmin, an acute-phase protein influenced by inflammation and oestrogen status. Zinc concentrations can also fall during inflammatory redistribution and may vary with dietary intake, absorption, phytate exposure, supplementation and sampling conditions. Consequently, an isolated ratio cannot identify the direction or cause of the underlying change. Peripheral copper or zinc values should not be read as brain concentrations.

Copper and zinc nevertheless intersect with processes already mapped in the Highlights BRS table. Copper is required by dopamine β-hydroxylase and other enzymes, while zinc contributes to synaptic signalling, antioxidant defence, metallothionein function and numerous enzyme systems. Copper–zinc regulation may therefore connect [neurotransmitter regulation](/docs/biological-targets/neurotransmitter-regulation) (BRS1), [inflammatory and redox regulation](/docs/biological-targets/inflammation-oxidative-stress) (BRS3), [intestinal absorption and food-matrix effects](/docs/biological-targets/gut-brain-axis-enteric-nervous-system) (BRS5), and [metabolic, hormonal and stress context](/docs/biological-targets/metabolic-neuroendocrine-stress) (BRS6). [Iron](/docs/substances/nutrients/micronutrients/minerals/trace/iron) metabolism also intersects with copper handling through ceruloplasmin. These intersections establish biological plausibility, not condition specificity or treatment efficacy.

Appropriate interpretation would require copper and zinc measurements to be considered alongside ceruloplasmin, inflammatory status, dietary intake, supplement use and relevant physiological context. Even when a reproducible imbalance is identified, whether its correction changes a defined outcome remains a separate intervention question. An isolated copper-to-zinc ratio is at most an investigational observation, not a validated biomarker.

Group-level mineral differences reported in ADHD and other psychiatric cohorts are summarised under Therapeutic Area Research; they illustrate that copper–zinc measures can differ between groups, not that copper defines a treatment protocol.

:::note[Evidence status]

Mineral-ratio observations in psychiatric cohorts, including ADHD, are summarised under Therapeutic Area Research. They do not establish a copper-defined biotype, causation, or a justification for copper-lowering or zinc supplementation without appropriate assessment.

:::

<h2 id="advanced-nutrition-references">References</h2>

- [Scheiber, Mercer and Dringen 2014](/docs/papers/BRAIN-Diet-References#scheiber_metabolism_2014). Copper metabolism and functions in brain, including dopamine β-hydroxylase and compartmentalised handling.
- [Hellman and Gitlin 2002](/docs/papers/BRAIN-Diet-References#hellman_ceruloplasmin_2002). Ceruloplasmin as plasma ferroxidase and the majority carrier of circulating copper.
- [Uriu-Adams and Keen 2005](/docs/papers/BRAIN-Diet-References#uriu_adams_copper_2005). Copper, oxidative stress and human health.
- [Linder and Hazegh-Azam 1996](/docs/papers/BRAIN-Diet-References#linder_copper_1996). Copper biochemistry, nutritional interactions and zinc competition.
- [Zhai, Narbad and Chen 2015](/docs/papers/BRAIN-Diet-References#zhai_dietary_2015). Metallothionein binding of zinc and copper in dietary metal handling.

</AdvancedNutrition>

<TherapeuticAreaResearch>

<h2 id="copper-therapeutic-areas" tabIndex={-1}>Therapeutic area research</h2>

This panel collects condition-specific evidence. It is not a treatment protocol. Observational mineral differences, mechanistic plausibility and intervention evidence are listed separately. Wilson disease is the only row with established medical diagnosis and treatment. Do not link copper-directed self-treatment to the psychiatric rows. Therapeutic-area pages are not currently published; the names below are labels, not links.

<div id="therapeutic-area-matrix">
<Collapse title="Condition evidence matrix">
<div className="markdown-table-scroll">

| Therapeutic area | Observational evidence | Mechanistic relevance | Intervention evidence | Framework status |
| --- | --- | --- | --- | --- |
| ADHD | Lower zinc and altered Cu:Zn ratio reported; copper findings inconsistent ([1](#ta-ref-1), [2](#ta-ref-2), [3](#ta-ref-3), [4](#ta-ref-4), [5](#ta-ref-5)) | Catecholamines, redox regulation, inflammation | Insufficient for copper-directed treatment | Candidate contextual constraint |
| Depression / postpartum depression | Some reports of altered copper or ceruloplasmin ([6](#ta-ref-6)) | Hormonal regulation, inflammation, catecholamine biology | Walsh-related claims not independently established ([9](#ta-ref-9), [10](#ta-ref-10), [11](#ta-ref-11)) | Hypothesis-generating |
| Schizophrenia | Altered copper measures reported in some studies | Redox, dopamine and inflammatory pathways | No validated copper-matched treatment model | Associative |
| Autism | Mineral differences reported, with substantial heterogeneity | Metallothionein, redox and developmental biology proposed | Insufficient for subtype-directed therapy | Investigational |
| Neurodegeneration, including Alzheimer’s disease | Copper dyshomeostasis implicated, varying by disorder ([7](#ta-ref-7)) | Protein aggregation, oxidative injury and mitochondrial function | Disease-specific; not transferable to general supplementation | Mechanistically relevant |
| Wilson disease | Established pathological copper accumulation ([8](#ta-ref-8)) | Hepatic and neurological copper toxicity | Established medical diagnosis and treatment ([8](#ta-ref-8)) | Clinically established |

</div>
</Collapse>
</div>

<h2 id="walsh-biochemical-biotypes">Historical interpretation: Walsh’s biochemical biotypes</h2>

William J. Walsh helped popularise the view that mineral regulation and biochemical individuality may contribute to heterogeneity within psychiatric diagnoses. Drawing on clinical datasets involving behavioural and mental-health presentations, Walsh proposed that altered copper–zinc balance could identify a subgroup of individuals for whom targeted nutrient therapy might be appropriate. His broader model classified patients into biochemical “biotypes” based on measures including copper, zinc, histamine, methylation-related interpretations and urinary hydroxyhemopyrroline-2-one.

This work was influential in directing attention toward individual biochemical variation, but the proposed biotypes have not been established as validated ADHD subtypes. Much of the supporting evidence is observational, uncontrolled or open-label, and the transition from biochemical association to causal subtype and matched treatment has not been demonstrated in adequately powered, independently replicated randomized studies. Copper and zinc measurements are also continuous and context-sensitive rather than naturally discrete: they may vary with dietary intake, absorption, inflammation, infection, supplementation, hormonal status and sampling conditions.

The [1997 copper-to-zinc paper](/docs/papers/BRAIN-Diet-References#walsh_elevated_1997) ([9](#ta-ref-9)) describes assaultive young males rather than an ADHD cohort, and the [2004 biochemical-therapy outcome study](/docs/papers/BRAIN-Diet-References#walsh_reduced_2004) ([10](#ta-ref-10)) reports changes in violent and destructive behaviour in a mixed behaviour-disorder population. Those associations and open-label behavioural reports should not be read as validation of ADHD mineral subtypes. Walsh’s work is therefore treated here as historically relevant and hypothesis-generating. The developed biotype model is set out in [*Nutrient Power*](/docs/papers/BRAIN-Diet-References#walsh_nutrient_2014) ([11](#ta-ref-11)), a book and clinical framework rather than a peer-reviewed validation study. It supports investigating mineral regulation as one possible source of individual variation, but it does not justify interpreting an isolated copper-to-zinc ratio as evidence of copper overload, assigning a person to a fixed biochemical category, or selecting treatment without wider clinical assessment.

**Framework position:** Walsh’s concept of biochemical individuality is compatible with the BRAIN Framework’s interest in variable biological constraints. His categorical biotype model is not adopted. BRAIN treats copper and zinc status as interacting, measurable and potentially changeable constraints that must be interpreted within inflammatory, dietary, hormonal, metabolic and clinical context.

**BRAIN interpretation:** Treat copper and zinc as interacting, measurable resource constraints rather than labels for a person. The precision question is whether an individual has a reproducible and clinically meaningful constraint, what is producing it, and whether safely correcting it changes a defined outcome. Distinctions among deficiency, suboptimal status, altered distribution and excess remain necessary; routine copper restriction, zinc supplementation or self-treatment is not justified by the present evidence.

<h2 id="therapeutic-area-research-references">References</h2>

<p id="ta-ref-1">[1] <a href="#therapeutic-area-matrix">ADHD matrix row</a>. Changed plasma zinc and copper-to-zinc ratio, and parent- and teacher-rated symptoms, in children with ADHD. Viktorinova et al. 2016. <a href="/docs/papers/BRAIN-Diet-References#viktorinova_changed_2016">Changed Plasma Levels of Zinc and Copper to Zinc Ratio and Their Possible Associations with Parent- and Teacher-Rated Symptoms in Children with Attention-Deficit Hyperactivity Disorder</a></p>

<p id="ta-ref-2">[2] <a href="#therapeutic-area-matrix">ADHD matrix row</a>. Serum zinc, copper, zinc-to-copper ratio and other essential elements in children with ADHD. Skalny et al. 2020. <a href="/docs/papers/BRAIN-Diet-References#skalny_serum_2020">Serum zinc, copper, zinc-to-copper ratio, and other essential elements and minerals in children with attention deficit/hyperactivity disorder (ADHD)</a></p>

<p id="ta-ref-3">[3] <a href="#therapeutic-area-matrix">ADHD matrix row</a>. Review of magnesium, iron, zinc, copper and selenium status in ADHD, including inconsistent copper findings. Robberecht et al. 2020. <a href="/docs/papers/BRAIN-Diet-References#robberecht_magnesium_2020">Magnesium, Iron, Zinc, Copper and Selenium Status in Attention-Deficit/Hyperactivity Disorder (ADHD)</a></p>

<p id="ta-ref-4">[4] <a href="#therapeutic-area-matrix">ADHD matrix row</a>. Systematic review and meta-analysis of zinc status in ADHD. Ghoreishy et al. 2021. <a href="/docs/papers/BRAIN-Diet-References#ghoreishy_zinc_2021">Zinc status in attention-deficit/hyperactivity disorder: a systematic review and meta-analysis of observational studies</a></p>

<p id="ta-ref-5">[5] <a href="#therapeutic-area-matrix">ADHD matrix row</a>. Systematic review and meta-analysis of zinc, iron and copper in children and adolescents with ADHD. Wang et al. 2026. <a href="/docs/papers/BRAIN-Diet-References#wang_essential_2026">Essential Trace Elements Zinc, Iron, Copper and Attention-Deficit/Hyperactivity Disorder in Children and Adolescents: A Systematic Review and Meta-Analysis of Case–Control Studies</a></p>

<p id="ta-ref-6">[6] <a href="#therapeutic-area-matrix">Depression / postpartum depression matrix row</a>. Ceruloplasmin as the majority plasma copper protein and a ferroxidase influenced by inflammatory and hormonal context. Hellman and Gitlin 2002. <a href="/docs/papers/BRAIN-Diet-References#hellman_ceruloplasmin_2002">Ceruloplasmin metabolism and function</a></p>

<p id="ta-ref-7">[7] <a href="#therapeutic-area-matrix">Neurodegeneration matrix row</a>. Brain copper handling, cuproenzymes, and neurodegeneration-relevant biology. Scheiber, Mercer and Dringen 2014. <a href="/docs/papers/BRAIN-Diet-References#scheiber_metabolism_2014">Metabolism and functions of copper in brain</a></p>

<p id="ta-ref-8">[8] <a href="#therapeutic-area-matrix">Wilson disease matrix row</a>. Established pathological copper accumulation and medical management. Ala et al. 2007. <a href="/docs/papers/BRAIN-Diet-References#ala_wilsons_2007">Wilson's disease</a></p>

<p id="ta-ref-9">[9] Walsh discussion, not an ADHD validation study. Elevated blood copper/zinc ratios in assaultive young males. Walsh, Isaacson, Rehman and Hall 1997. <a href="/docs/papers/BRAIN-Diet-References#walsh_elevated_1997">Elevated Blood Copper/Zinc Ratios in Assaultive Young Males</a></p>

<p id="ta-ref-10">[10] Walsh discussion, not ADHD subtype validation. Open-label biochemical therapy and violent behaviour in a behaviour-disorder population. Walsh, Glab and Haakenson 2004. <a href="/docs/papers/BRAIN-Diet-References#walsh_reduced_2004">Reduced violent behavior following biochemical therapy</a></p>

<p id="ta-ref-11">[11] Walsh discussion. Book and clinical framework presenting the developed biotype model, not peer-reviewed validation. Walsh 2014. <a href="/docs/papers/BRAIN-Diet-References#walsh_nutrient_2014">Nutrient Power: Heal Your Biochemistry and Heal Your Brain</a></p>

</TherapeuticAreaResearch>
