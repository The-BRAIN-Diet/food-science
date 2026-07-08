#!/usr/bin/env python3
"""Generate BRS1–BRS6 ADHD manuscript summaries for Miguel.

Schema: system/brs-adhd-manuscript-summary-schema.md (v2.1)
Integration library: scripts/data/brs-cross-integration-evidence.json
Objective: justify each BRS as an important, modifiable regulatory domain in ADHD —
not catalogue Primary Mechanisms.
"""

import json
import os
from pathlib import Path

from docx import Document
from docx.shared import Pt, Inches
from docx.enum.text import WD_LINE_SPACING

ROOT = Path(__file__).resolve().parent.parent
INTEGRATION_LIBRARY_PATH = ROOT / "scripts/data/brs-cross-integration-evidence.json"

OUTPUT = (
    "/Users/paulhouston/Food Science/food-science/manuscript/"
    "BRS1-6-ADHD-structure-and-evidence-summary.docx"
)

with INTEGRATION_LIBRARY_PATH.open(encoding="utf-8") as handle:
    INTEGRATION_LIBRARY = json.load(handle)

ALLOSTASIS_INTRO = (
    "The BRAIN Framework does not propose allostatic load as a primary explanation of ADHD. "
    "Instead, it uses allostatic theory as a complementary organising model for understanding "
    "how ADHD-relevant biological systems may contribute to adaptive capacity, resilience, and "
    "regulatory burden. Neural, autonomic, endocrine, immune, and metabolic systems coordinate "
    "responses to environmental, behavioural, and physiological demand. When these responses are "
    "repeatedly activated, poorly resolved, or chronically dysregulated, regulatory burden can "
    "accumulate — shifting biological set-points and influencing cognition, emotion, fatigue, "
    "reward processing, and treatment response.\n\n"
    "BRS6 — Metabolic & Neuroendocrine Regulation — provides the principal gateway to allostatic "
    "theory because it integrates HPA-axis rhythm, autonomic balance, glycaemic stability, and "
    "stress-linked metabolic allocation. However, effective adaptation depends on the coordinated "
    "performance of all six Biological Regulatory Systems. Each BRS summary below establishes the "
    "scientific identity of that system in ADHD and explains how it may shape modifiable biology "
    "and adaptive capacity."
)

SECTIONS = [
    {
        "title": "BRS1 — Neurotransmitter Regulation: Biological Regulatory Identity and ADHD-Relevant Evidence",
        "brs_identity": (
            "BRS1 (Neurotransmitter Regulation) describes the integrated capacity to sustain "
            "balanced chemical signalling across the major neurotransmitter systems that underpin "
            "attention, motivation, arousal, learning, and behavioural control. Its Functional "
            "Mechanisms — BRS1(FM1) Monoaminergic Function, BRS1(FM2) Cholinergic Function, "
            "BRS1(FM3) Membrane Lipid Integrity, and BRS1(FM4) GABA–Glutamate Regulation — "
            "represent interacting regulatory domains rather than isolated transmitter deficits. "
            "ADHD biology is more plausibly understood as heterogeneous dysregulation across "
            "these systems than as a single dopamine abnormality."
        ),
        "landmark_studies": [
            {
                "citation": "MacDonald et al. (2024)",
                "finding": (
                    "Human and animal evidence review concludes that dopaminergic alterations in ADHD "
                    "vary by subtype, developmental stage, and brain region — reframing ADHD as "
                    "heterogeneous monoaminergic dysregulation rather than simple global "
                    "hypo-dopaminergia."
                ),
                "why_brs": (
                    "Defines BRS1(FM1) Monoaminergic Function as a meaningful, context-dependent "
                    "regulatory domain in ADHD — establishing neurotransmission as an integrated "
                    "capacity, not a single-transmitter disorder."
                ),
            },
            {
                "citation": "Johansson et al. (2013)",
                "finding": (
                    "Decreased muscarinic acetylcholine receptor binding capacity reported in "
                    "fibroblasts from boys with ADHD, supporting altered cholinergic biology in "
                    "neurodevelopmental attention contexts."
                ),
                "why_brs": (
                    "Anchors BRS1(FM2) Cholinergic Function as a distinct but co-implicated "
                    "regulatory domain within BRS1 — reinforcing that ADHD involves multiple "
                    "interacting transmitter systems."
                ),
            },
            {
                "citation": "Puts et al. (2020)",
                "finding": (
                    "7T magnetic resonance spectroscopy in unmedicated children with ADHD reported "
                    "reduced striatal GABA versus typically developing controls."
                ),
                "why_brs": (
                    "Provides direct ADHD cohort evidence for excitation–inhibition imbalance within "
                    "BRS1(FM4) GABA–Glutamate Regulation — a landmark anchor for viewing "
                    "neurotransmission as balanced inhibitory–excitatory capacity."
                ),
            },
        ],
        "translational_interpretation": (
            "Converging ADHD evidence across monoaminergic heterogeneity, cholinergic disturbance, "
            "and GABA–glutamate imbalance supports treating neurotransmitter regulation as an "
            "integrated biological system rather than isolated transmitter abnormalities. This "
            "makes BRS1 a biologically plausible and modifiable regulatory domain for ADHD: "
            "nutritional strategies may influence precursor availability, membrane composition, "
            "cholinergic context, and excitation–inhibition balance as coordinated inputs to "
            "signalling capacity.\n\n"
            "For adaptive capacity, BRS1 contributes neurochemical flexibility supporting attention, "
            "motivation, arousal, and behavioural control under fluctuating demand. When upstream "
            "systems are strained, neurotransmitter regulation bears disproportionate load — as "
            "described in Cross-BRS integration Evidence. "
            "Regulating BRS1 therefore has ADHD relevance not only for symptom biology but for "
            "maintaining resilient neurochemical performance when regulatory burden rises."
        ),
        "references": [
            "MacDonald, H. J., Kleppe, R., Szigetvari, P. D., & Haavik, J. (2024). The dopamine hypothesis for ADHD: An evaluation of evidence accumulated from human studies and animal models. Frontiers in Psychiatry, 15. https://doi.org/10.3389/fpsyt.2024.1492126",
            "Johansson, J., Landgren, M., Fernell, E., Lewander, T., & Venizelos, N. (2013). Decreased binding capacity (Bmax) of muscarinic acetylcholine receptors in fibroblasts from boys with ADHD. ADHD Attention Deficit and Hyperactivity Disorders, 5(3), 267–271. https://doi.org/10.1007/s12402-013-0103-0",
            "Puts, N. A. J., Ryan, M., Oeltzschner, G., et al. (2020). Reduced striatal GABA in unmedicated children with ADHD at 7T. Psychiatry Research: Neuroimaging, 301, 111082. https://doi.org/10.1016/j.pscychresns.2020.111082",
            "Edden, R. A. E., Crocetti, D., Zhu, H., Gilbert, D. L., & Mostofsky, S. H. (2012). Reduced GABA concentration in attention-deficit/hyperactivity disorder. Archives of General Psychiatry, 69(7). https://doi.org/10.1001/archgenpsychiatry.2011.2280",
            "Pei-Chen Chang, J.-P., et al. (2021). Personalised medicine in ADHD: Review of omega-3 polyunsaturated fatty acids. Progress in Neuro-Psychopharmacology and Biological Psychiatry, 110, 110299. https://doi.org/10.1016/j.pnpbp.2021.110299",
        ],
    },
    {
        "title": "BRS2 — Methylation & One-Carbon Metabolism: Biological Regulatory Identity and ADHD-Relevant Evidence",
        "brs_identity": (
            "BRS2 (Methylation & One-Carbon Metabolism) describes the integrated capacity to "
            "maintain methyl-group donor sufficiency, homocysteine handling, transsulfuration-linked "
            "redox chemistry, and methylation-dependent membrane formation. Its Functional "
            "Mechanisms — BRS2(FM1) Methylation Cycle Efficiency, BRS2(FM2) Transsulfuration & "
            "Redox Coupling, and BRS2(FM3) Methylation–Membrane Coupling — form a coupled "
            "regulatory network rather than isolated vitamin pathways. Disturbances in one-carbon "
            "metabolism may constrain multiple downstream biological capacities simultaneously."
        ),
        "landmark_studies": [
            {
                "citation": "Razavinia et al. (2024)",
                "finding": (
                    "Meta-analysis in children with ADHD reported lower folate and vitamin B12 "
                    "status compared with controls."
                ),
                "why_brs": (
                    "Establishes measurable one-carbon donor insufficiency in ADHD cohorts — "
                    "supporting BRS2(FM1) Methylation Cycle Efficiency as a biologically plausible "
                    "regulatory domain, not a single-nutrient association."
                ),
            },
            {
                "citation": "Lukovac et al. (2024)",
                "finding": (
                    "Paediatric ADHD cohorts showed elevated homocysteine alongside disturbances "
                    "in B12, vitamin D, ferritin, and iron markers."
                ),
                "why_brs": (
                    "Homocysteine elevation signals impaired one-carbon flux across BRS2(FM1) and "
                    "transsulfuration coupling in BRS2(FM2) — anchoring the whole BRS2 network as "
                    "under strain in ADHD populations."
                ),
            },
            {
                "citation": "Millichap & Yee (2012)",
                "finding": (
                    "Foundational paediatric review synthesises dietary and nutritional factors "
                    "implicated in ADHD, including folate, B vitamins, essential fatty acids, and "
                    "one-carbon-related nutrient patterns."
                ),
                "why_brs": (
                    "Provides landmark ADHD-focused framing that methylation-relevant nutritional "
                    "biology is a modifiable context across the integrated BRS2 system — supporting "
                    "the BRS as a coherent regulatory domain rather than isolated supplement claims."
                ),
            },
        ],
        "translational_interpretation": (
            "Repeated ADHD cohort findings of folate/B12 insufficiency and homocysteine elevation "
            "support viewing one-carbon metabolism as a biologically important regulatory system "
            "in ADHD — one where dietary methyl-donor patterns may influence remethylation capacity, "
            "transsulfuration-linked redox protection, and membrane phospholipid formation as "
            "interconnected processes.\n\n"
            "For adaptive capacity, BRS2 contributes methylation, repair, and phospholipid "
            "maintenance needed for sustained biological adaptation. Under chronic demand, "
            "one-carbon insufficiency may increase vulnerability across downstream regulatory "
            "systems — as outlined in Cross-BRS integration Evidence. "
            "Regulating BRS2 therefore offers a biologically plausible route to supporting "
            "resilience by maintaining the biochemical infrastructure other systems depend upon "
            "when regulatory burden accumulates."
        ),
        "references": [
            "Razavinia, F., et al. (2024). Vitamins B9 and B12 in children with attention deficit hyperactivity disorder (ADHD). International Journal for Vitamin and Nutrition Research, 94(5–6), 476–484. https://doi.org/10.1024/0300-9831/a000809",
            "Lukovac, T., et al. (2024). Serum biomarker analysis in pediatric ADHD. Children, 11(4), 497. https://doi.org/10.3390/children11040497",
            "Millichap, J. G., & Yee, M. M. (2012). The diet factor in attention-deficit/hyperactivity disorder. Pediatrics, 129(2), 330–337. https://doi.org/10.1542/peds.2011-2199",
            "Meng, X., et al. (2022). Association between MTHFR polymorphisms and ADHD. See BRAIN Diet bibliography: meng_association_2022.",
            "Oulhaj, A., et al. (2016). Omega-3 fatty acid status enhances B vitamin effect on brain atrophy. International Journal of Psychogeriatrics. https://doi.org/10.1017/S1041610216000802",
        ],
    },
    {
        "title": "BRS3 — Inflammation & Oxidative Stress: Biological Regulatory Identity and ADHD-Relevant Evidence",
        "brs_identity": (
            "BRS3 (Inflammation & Oxidative Stress) describes the integrated capacity to restrain "
            "pro-inflammatory signalling, maintain antioxidant defence, and resolve inflammatory "
            "burden without chronic immune activation. Its Functional Mechanisms — BRS3(FM1) "
            "Anti-Inflammatory Signalling Tone, BRS3(FM2) Antioxidant Defense Capacity, and "
            "BRS3(FM3) Inflammation Resolution Capacity — represent a coordinated immune–redox "
            "regulatory system. Elevated inflammatory or oxidative load may constrain cognitive, "
            "emotional, and neurochemical regulation across multiple downstream systems."
        ),
        "landmark_studies": [
            {
                "citation": "Chang et al. (2020)",
                "finding": (
                    "Children and adolescents with ADHD in Taiwan showed associations between "
                    "elevated reactive oxygen species, astrocyte/microglia activation, and "
                    "pro-inflammatory cytokines (IL-6, IL-1β, TNF-α)."
                ),
                "why_brs": (
                    "Anchors neuroimmune inflammatory activation as a reproducible ADHD-associated "
                    "biology — supporting BRS3(FM1) and BRS3(FM3) as integrated inflammatory "
                    "regulatory domains within the BRS."
                ),
            },
            {
                "citation": "Bulut et al. (2007)",
                "finding": (
                    "Adults with ADHD had significantly higher malondialdehyde — a lipid peroxidation "
                    "marker — versus healthy controls."
                ),
                "why_brs": (
                    "Demonstrates elevated net oxidative burden in ADHD cohorts, establishing "
                    "BRS3(FM2) Antioxidant Defense Capacity as a biologically relevant regulatory "
                    "domain — not merely a general wellness concept."
                ),
            },
            {
                "citation": "Verlaet et al. (2019)",
                "finding": (
                    "Paediatric ADHD case–control work reported elevated glutathione and oxidative-"
                    "stress markers, interpreted as compensatory response to increased oxidative load."
                ),
                "why_brs": (
                    "Links ADHD redox disturbance to active compensatory biology within BRS3(FM2) — "
                    "supporting the BRS as a modifiable layer where antioxidant capacity may be "
                    "strained under sustained demand."
                ),
            },
        ],
        "translational_interpretation": (
            "Converging ADHD evidence of cytokine elevation, lipid peroxidation, and compensatory "
            "antioxidant responses supports treating inflammation and oxidative stress as an "
            "important regulatory system in ADHD biology — one where dietary antioxidant substrates, "
            "omega-3 balance, and gut-derived immune load may influence inflammatory tone and redox "
            "burden relevant to cognitive and behavioural function.\n\n"
            "For adaptive capacity, BRS3 contributes inflammatory and redox load control that "
            "protects downstream regulatory systems. Chronic low-grade inflammatory or oxidative "
            "strain may alter neurotransmitter regulation and increase metabolic burden handled by "
            "BRS6 — relationships described in Cross-BRS integration Evidence. Regulating BRS3 therefore has ADHD relevance as a modifiable "
            "system that may reduce biological cost when environmental, behavioural, or "
            "physiological demands accumulate."
        ),
        "references": [
            "Chang, J. P.-C., Mondelli, V., Satyanarayanan, S. K., et al. (2020). Cortisol, inflammatory biomarkers and neurotrophins in children and adolescents with ADHD in Taiwan. Brain, Behavior, and Immunity, 88, 105–113. https://doi.org/10.1016/j.bbi.2020.05.017",
            "Bulut, M., et al. (2007). Evaluation of malondialdehyde levels in adult ADHD. Psychiatry and Clinical Psychopharmacology. https://doi.org/10.1080/14751740701595421",
            "Verlaet, A. A. J., Breynaert, A., Ceulemans, B., et al. (2019). Oxidative stress and immune aberrancies in ADHD. European Child & Adolescent Psychiatry, 28(5), 719–729. https://doi.org/10.1007/s00787-018-1239-4",
            "Trebatická, J., et al. (2006). Treatment of ADHD with French maritime pine bark extract, Pycnogenol. European Child & Adolescent Psychiatry, 15(6), 329–335. https://doi.org/10.1007/s00787-006-0535-6",
        ],
    },
    {
        "title": "BRS4 — Mitochondrial Function & Bioenergetics: Biological Regulatory Identity and ADHD-Relevant Evidence",
        "brs_identity": (
            "BRS4 (Mitochondrial Function & Bioenergetics) describes the integrated cellular capacity "
            "for ATP production, mitochondrial protection, substrate flexibility, and adaptive "
            "energetic remodelling. Its Functional Mechanisms — BRS4(FM1) Cellular Bioenergetics, "
            "BRS4(FM2) Mitochondrial Resilience & Redox Stability, BRS4(FM3) Substrate Utilisation "
            "Flexibility, and BRS4(FM4) Mitochondrial Capacity Expansion & Adaptation — represent "
            "a coordinated bioenergetic regulatory system. Impaired mitochondrial performance may "
            "constrain cognitive energetics, recovery, and downstream neurochemical signalling."
        ),
        "landmark_studies": [
            {
                "citation": "Verma et al. (2016)",
                "finding": (
                    "Cybrid cell models from ADHD patient platelets showed reduced cellular and "
                    "mitochondrial respiration, lower complex V activity, membrane-potential loss, "
                    "and elevated oxidative stress."
                ),
                "why_brs": (
                    "Provides direct ADHD-derived cellular evidence that mitochondrial bioenergetics "
                    "is impaired — establishing BRS4 as a biologically plausible regulatory domain "
                    "rather than a speculative nutritional concept."
                ),
            },
            {
                "citation": "van Oudheusden & Scholte (2002)",
                "finding": (
                    "Controlled carnitine supplementation trial in children with ADHD reported "
                    "improvements in behavioural and functional outcomes."
                ),
                "why_brs": (
                    "Demonstrates that a bioenergetic substrate intervention can modify ADHD "
                    "functional outcomes — supporting BRS4 as a modifiable regulatory system, with "
                    "BRS4(FM3) substrate flexibility as the most direct FM anchor."
                ),
            },
            {
                "citation": "Öğütlü et al. (2022)",
                "finding": (
                    "Narrative review synthesises ADHD-relevant mitochondrial biomarker, oxidative-"
                    "stress, and genetic-variation literature into a coherent mitochondrial "
                    "dysfunction framing for ADHD."
                ),
                "why_brs": (
                    "Landmark synthesis anchoring the scientific identity of BRS4 across FM1–FM4 "
                    "as an emerging but coherent regulatory domain in ADHD research."
                ),
            },
        ],
        "translational_interpretation": (
            "Primary ADHD cybrid evidence, a controlled carnitine intervention, and narrative "
            "synthesis together support mitochondrial bioenergetics as an important and potentially "
            "modifiable regulatory system in ADHD — not a universal mitochondrial disease model, "
            "but a biological layer where energetic capacity may constrain attention, recovery, and "
            "behavioural performance.\n\n"
            "For adaptive capacity, BRS4 contributes bioenergetic reserve and recovery capacity "
            "under sustained demand. Its relationship to neurotransmitter regulation and stress-linked "
            "energetic remodelling is described in Cross-BRS integration Evidence. Regulating BRS4 therefore has ADHD relevance for maintaining cognitive and "
            "behavioural performance when regulatory burden increases — particularly where energetic "
            "recovery between demands is impaired."
        ),
        "references": [
            "Verma, P., Singh, A., Nthenge-Ngumbau, D. N., et al. (2016). Attention deficit-hyperactivity disorder suffers from mitochondrial dysfunction. BBA Clinical, 6, 153–158. https://doi.org/10.1016/j.bbacli.2016.10.003",
            "van Oudheusden, L. J., & Scholte, H. R. (2002). Efficacy of carnitine in the treatment of children with ADHD. Prostaglandins, Leukotrienes and Essential Fatty Acids, 67(1), 33–38. https://doi.org/10.1054/plef.2002.0378",
            "Öğütlü, H., Kasak, M., & Tabur, S. T. (2022). Mitochondrial dysfunction in ADHD. The Eurasian Journal of Medicine, 54(Suppl 1), S187–S195. https://doi.org/10.5152/eurasianjmed.2022.22187",
            "Almutairi, M. M., et al. (2024). Mitochondrial dysfunction and mitophagy in ADHD. Saudi Pharmaceutical Journal, 32(12). https://doi.org/10.1016/j.jsps.2024.102212",
        ],
    },
    {
        "title": "BRS5 — Gut-Brain Axis & Enteric Nervous System: Biological Regulatory Identity and ADHD-Relevant Evidence",
        "brs_identity": (
            "BRS5 (Gut-Brain Axis & Enteric Nervous System) describes the integrated peripheral "
            "capacity to maintain gut barrier selectivity, supportive microbial ecology, beneficial "
            "metabolite signalling, and proportionate gut-to-brain communication. Its Functional "
            "Mechanisms — BRS5(FM1) Gut Barrier Integrity & Immune Interface, BRS5(FM2) Microbial "
            "Metabolite Signalling Capacity, and BRS5(FM3) Gut-Vagal Neuromodulation & ENS "
            "Signalling — form a coordinated gut–brain regulatory system. Gut-derived immune, "
            "metabolic, and vagal signals may influence central motivation, attention, and stress "
            "responsiveness."
        ),
        "landmark_studies": [
            {
                "citation": "Steckler et al. (2024)",
                "finding": (
                    "Children with ADHD showed lower faecal short-chain fatty acid levels and gut "
                    "dysbiosis patterns versus controls."
                ),
                "why_brs": (
                    "Anchors measurable reduction in microbial metabolite signalling within "
                    "BRS5(FM2) — establishing gut–metabolite biology as a biologically important "
                    "regulatory domain in ADHD cohorts."
                ),
            },
            {
                "citation": "Aarts et al. (2017)",
                "finding": (
                    "Gut microbiome composition in boys with ADHD correlated with neural reward "
                    "anticipation on fMRI during a monetary incentive delay task."
                ),
                "why_brs": (
                    "Links gut ecology to central reward circuitry — supporting BRS5 as a "
                    "gut–brain regulatory system with direct relevance to ADHD motivation and "
                    "impulsivity biology across FM1 and FM3."
                ),
            },
            {
                "citation": "Prehn-Kristensen et al. (2018)",
                "finding": (
                    "Reduced microbial alpha diversity reported in paediatric ADHD cohorts versus "
                    "controls."
                ),
                "why_brs": (
                    "Establishes ecological disruption as a reproducible ADHD-associated gut feature "
                    "— supporting BRS5(FM1) and BRS5(FM2) as integrated barrier-and-ecology domains "
                    "rather than single-taxa stories."
                ),
            },
        ],
        "translational_interpretation": (
            "Converging ADHD evidence of reduced SCFA output, altered microbial diversity, and "
            "gut–reward circuitry coupling supports the gut–brain axis as an important and "
            "modifiable regulatory system in ADHD. Dietary fermentable fibre, fermented foods, and "
            "diverse plant intake may influence barrier integrity, microbial metabolite output, "
            "and vagal signalling as coordinated inputs to gut–brain regulation.\n\n"
            "For adaptive capacity, BRS5 contributes gut-derived immune, metabolic, and vagal "
            "signalling that shapes how the body responds to environmental and physiological demand. "
            "Cross-system dependencies with inflammatory, bioenergetic, and neuroendocrine regulation "
            "are outlined in Cross-BRS integration Evidence. Regulating "
            "BRS5 therefore has ADHD relevance as a peripheral system that may influence central "
            "regulatory burden and resilience when stress, diet, or immune challenge accumulate."
        ),
        "references": [
            "Steckler, R., Magzal, F., Kokot, M., et al. (2024). Disrupted gut harmony in ADHD. Brain, Behavior, & Immunity—Health, 40, 100829. https://doi.org/10.1016/j.bbih.2024.100829",
            "Aarts, E., Ederveen, T. H. A., Naaijen, J., et al. (2017). Gut microbiome in ADHD and its relation to neural reward anticipation. PLOS ONE, 12(9). https://doi.org/10.1371/journal.pone.0183509",
            "Prehn-Kristensen, A., et al. (2018). Reduced microbiome alpha diversity in young patients with ADHD. PLOS ONE, 13(7). https://doi.org/10.1371/journal.pone.0200728",
            "Jiang, H.-Y., et al. (2018). Gut microbiota profiles in treatment-naïve children with ADHD. Behavioural Brain Research, 347, 408–413. https://doi.org/10.1016/j.bbr.2018.03.036",
        ],
    },
    {
        "title": "BRS6 — Metabolic & Neuroendocrine Regulation: Biological Regulatory Identity and ADHD-Relevant Evidence",
        "brs_identity": (
            "BRS6 (Metabolic & Neuroendocrine Regulation) describes the integrated whole-body "
            "capacity to maintain glycaemic stability, HPA-axis cortisol rhythm, autonomic balance, "
            "and proportionate stress–metabolic load allocation. Its Functional Mechanisms — "
            "BRS6(FM1) Glycaemic–Insulin Stability & Cognitive Energy Availability, BRS6(FM2) HPA "
            "Axis Rhythm & Cortisol Regulation, BRS6(FM3) Autonomic Balance & Vagal Recovery "
            "Capacity, and BRS6(FM4) Stress-Inflammation / Metabolic Load Allocation — represent "
            "the principal systems involved in adaptive response and recovery. BRS6 is the "
            "strongest conceptual bridge to allostatic theory within the BRAIN Framework."
        ),
        "landmark_studies": [
            {
                "citation": "Chang et al. (2021)",
                "finding": (
                    "Systematic review with meta-analysis reported altered basal and morning cortisol "
                    "patterns in youths with ADHD compared with typically developing peers."
                ),
                "why_brs": (
                    "Anchors HPA-axis rhythm dysregulation as a reproducible ADHD neuroendocrine "
                    "signature — establishing BRS6(FM2) as a landmark regulatory domain and the "
                    "principal allostatic gateway within the framework."
                ),
            },
            {
                "citation": "Lane et al. (2010)",
                "finding": (
                    "Sensory over-responsivity differentiated from ADHD using electrodermal "
                    "responses, cortisol, and anxiety markers — implicating autonomic arousal and "
                    "recovery biology."
                ),
                "why_brs": (
                    "Supports BRS6(FM3) Autonomic Balance & Vagal Recovery Capacity as a measurable "
                    "regulatory domain intersecting ADHD stress-responsiveness biology."
                ),
            },
            {
                "citation": "Di Girolamo et al. (2022)",
                "finding": (
                    "Adult ADHD outpatients showed higher prevalence of metabolic syndrome and insulin "
                    "resistance versus expected population rates."
                ),
                "why_brs": (
                    "Links ADHD to chronic metabolic-regulatory burden across BRS6(FM1) and "
                    "BRS6(FM4) — supporting metabolic–neuroendocrine regulation as a long-term "
                    "adaptive-load domain, not only an acute stress response."
                ),
            },
        ],
        "translational_interpretation": (
            "Converging ADHD evidence of cortisol rhythm alteration, autonomic differentiation "
            "under sensory stress, and metabolic comorbidity supports BRS6 as the principal "
            "allostatic gateway within the BRAIN Framework. HPA-axis timing, autonomic recovery, "
            "glycaemic stability, and stress-linked metabolic allocation are the systems most "
            "directly involved in how biological resources are mobilised and restored under demand.\n\n"
            "Regulating BRS6 has ADHD relevance because dysregulated neuroendocrine and metabolic "
            "responses may increase regulatory burden on cognition, emotion, reward processing, and "
            "treatment response. Meal composition, circadian-aligned feeding, sleep regularity, and "
            "stress-recovery routines may influence cortisol phase, autonomic downshift, and "
            "metabolic load allocation. Cross-system dependencies with neurotransmitter, "
            "inflammatory, and bioenergetic regulation are described in Cross-BRS integration Evidence. "
            "The BRAIN Framework uses allostatic "
            "theory here not to explain ADHD causation, but to show how BRS6-centred regulation may "
            "support adaptive capacity and lower cumulative biological cost."
        ),
        "references": [
            "Chang, J. P.-C., et al. (2021). Cortisol and inflammatory biomarker levels in youths with ADHD. Translational Psychiatry, 11. https://doi.org/10.1038/s41398-021-01388-3",
            "Lane, S. J., Reynolds, S., & Thacker, L. (2010). Sensory over-responsivity and ADHD. Frontiers in Integrative Neuroscience, 4. https://doi.org/10.3389/fnint.2010.00008",
            "Di Girolamo, G., et al. (2022). Prevalence of metabolic syndrome and insulin resistance in adult ADHD outpatients. Frontiers in Psychiatry, 13. https://doi.org/10.3389/fpsyt.2022.1078932",
            "Marcelli, D., et al. (2025). Bridging ADHD and metabolic disorders. Metabolites, 6. https://doi.org/10.3390/metabo6010006",
            "Zametkin, A. J., et al. (1990). Cerebral glucose metabolism in adults with hyperactivity of childhood onset. New England Journal of Medicine, 323(20), 1361–1366. https://doi.org/10.1056/NEJM199011153232001",
        ],
    },
]

ALLOSTASIS_REFERENCES = [
    "Sterling, P., & Eyer, J. (1988). Allostasis: A new paradigm to explain arousal pathology. In S. Fisher & J. Reason (Eds.), Handbook of Life Stress, Cognition and Health. Wiley.",
    "McEwen, B. S. (1998). Protective and damaging effects of stress mediators. New England Journal of Medicine, 338(3), 171–179. https://doi.org/10.1056/NEJM199801083380307",
    "McEwen, B. S. (2006). Protective and damaging effects of stress mediators: Central role of the brain. Dialogues in Clinical Neuroscience, 8(4), 367–381. https://doi.org/10.31887/DCNS.2006.8.4/bmcewen",
]


def add_body_paragraphs(doc, text, heading_level=None, heading_size=14):
    if heading_level is not None:
        heading = doc.add_heading(text, level=heading_level)
        heading.runs[0].font.size = Pt(heading_size)
        return

    for para_text in text.split("\n\n"):
        p = doc.add_paragraph(para_text)
        p.paragraph_format.line_spacing_rule = WD_LINE_SPACING.DOUBLE
        p.paragraph_format.space_after = Pt(6)
        for run in p.runs:
            run.font.name = "Times New Roman"
            run.font.size = Pt(12)


def add_landmark_study(doc, index, study):
    p = doc.add_paragraph()
    p.paragraph_format.line_spacing_rule = WD_LINE_SPACING.DOUBLE
    p.paragraph_format.space_after = Pt(6)
    p.paragraph_format.left_indent = Inches(0.25)

    label = p.add_run(f"{index}. {study['citation']} — ")
    label.bold = True
    label.font.name = "Times New Roman"
    label.font.size = Pt(12)

    finding = p.add_run(f"What they found: {study['finding']} ")
    finding.font.name = "Times New Roman"
    finding.font.size = Pt(12)

    brs = p.add_run(f"Why this matters for the BRS: {study['why_brs']}")
    brs.italic = True
    brs.font.name = "Times New Roman"
    brs.font.size = Pt(12)


def brs_id_from_title(title: str) -> str:
    return title.split("—")[0].strip().split()[0]


def get_integrations_for_brs(brs_id: str) -> list[dict]:
    integration_ids = INTEGRATION_LIBRARY["brs_integration_map"].get(brs_id, [])
    integrations = INTEGRATION_LIBRARY["integrations"]
    return [{"id": integration_id, **integrations[integration_id]} for integration_id in integration_ids]


def collect_integration_references(integrations: list[dict]) -> list[str]:
    seen = set()
    references = []
    for integration in integrations:
        for item in integration["evidence"]:
            reference = item["reference"]
            if reference not in seen:
                seen.add(reference)
                references.append(reference)
    return references


def add_integration_evidence(doc: Document, integrations: list[dict]) -> int:
    add_body_paragraphs(doc, "Cross-BRS integration Evidence", heading_level=2, heading_size=13)
    word_count = 0

    for index, integration in enumerate(integrations, start=1):
        p = doc.add_paragraph()
        p.paragraph_format.line_spacing_rule = WD_LINE_SPACING.DOUBLE
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.left_indent = Inches(0.25)

        label = p.add_run(f"{index}. {integration['title']} — ")
        label.bold = True
        label.font.name = "Times New Roman"
        label.font.size = Pt(12)

        statement = p.add_run(integration["summary"])
        statement.font.name = "Times New Roman"
        statement.font.size = Pt(12)
        word_count += len(integration["summary"].split())

        for item in integration["evidence"]:
            ep = doc.add_paragraph()
            ep.paragraph_format.line_spacing_rule = WD_LINE_SPACING.DOUBLE
            ep.paragraph_format.space_after = Pt(4)
            ep.paragraph_format.left_indent = Inches(0.5)

            cite = ep.add_run(f"{item['citation']}: ")
            cite.bold = True
            cite.font.name = "Times New Roman"
            cite.font.size = Pt(12)

            supports = ep.add_run(item["supports"])
            supports.font.name = "Times New Roman"
            supports.font.size = Pt(12)
            word_count += len(item["supports"].split())

    return word_count


def add_section(doc: Document, section: dict) -> int:
    add_body_paragraphs(doc, section["title"], heading_level=1, heading_size=14)

    add_body_paragraphs(doc, "Biological Regulatory System identity", heading_level=2, heading_size=13)
    add_body_paragraphs(doc, section["brs_identity"])

    add_body_paragraphs(doc, "Landmark ADHD evidence", heading_level=2, heading_size=13)
    for i, study in enumerate(section["landmark_studies"], start=1):
        add_landmark_study(doc, i, study)

    brs_id = brs_id_from_title(section["title"])
    integrations = get_integrations_for_brs(brs_id)
    integration_word_count = add_integration_evidence(doc, integrations)

    add_body_paragraphs(doc, "Translational interpretation", heading_level=2, heading_size=13)
    add_body_paragraphs(doc, section["translational_interpretation"])

    doc.add_heading("References", level=2)
    all_references = list(section["references"])
    for reference in collect_integration_references(integrations):
        if reference not in all_references:
            all_references.append(reference)

    for ref in all_references:
        p = doc.add_paragraph(ref, style="List Number")
        p.paragraph_format.line_spacing_rule = WD_LINE_SPACING.SINGLE
        p.paragraph_format.space_after = Pt(3)
        p.paragraph_format.left_indent = Inches(0.25)
        p.paragraph_format.first_line_indent = Inches(-0.25)
        for run in p.runs:
            run.font.name = "Times New Roman"
            run.font.size = Pt(11)

    word_count = len(section["brs_identity"].split()) + len(section["translational_interpretation"].split())
    word_count += sum(
        len(s["finding"].split()) + len(s["why_brs"].split())
        for s in section["landmark_studies"]
    )
    word_count += integration_word_count
    word_count += sum(len(item["summary"].split()) for item in integrations)
    return word_count


def main():
    doc = Document()
    for section in doc.sections:
        section.top_margin = Inches(1)
        section.bottom_margin = Inches(1)
        section.left_margin = Inches(1)
        section.right_margin = Inches(1)

    doc.add_heading(
        "BRAIN Framework: Biological Regulatory System Summaries — ADHD Evidence and Translational Relevance",
        level=0,
    )

    objective = doc.add_paragraph(
        "Prepared for Miguel. Each BRS section establishes the scientific identity of a Biological "
        "Regulatory System in ADHD and argues for its biological plausibility and modifiability. "
        "The objective is not to catalogue Primary Mechanisms or provide representative PM evidence. "
        "Landmark ADHD studies are selected to justify Functional Mechanisms and the BRS as a whole. "
        "Cross-BRS relationships are supported by landmark mechanistic reviews from "
        "scripts/data/brs-cross-integration-evidence.json. "
        "Schema: system/brs-adhd-manuscript-summary-schema.md (v2.1). "
        "Cross-BRS relationships are implemented on BRS hub pages and sourced from "
        "scripts/data/brs-cross-integration-evidence.json."
    )
    objective.paragraph_format.line_spacing_rule = WD_LINE_SPACING.DOUBLE
    objective.paragraph_format.space_after = Pt(12)
    for run in objective.runs:
        run.font.name = "Times New Roman"
        run.font.size = Pt(12)

    doc.add_heading("Allostasis as a complementary organising model", level=1)
    add_body_paragraphs(doc, ALLOSTASIS_INTRO)

    doc.add_heading("Foundational allostasis references", level=2)
    for ref in ALLOSTASIS_REFERENCES:
        p = doc.add_paragraph(ref, style="List Number")
        p.paragraph_format.line_spacing_rule = WD_LINE_SPACING.SINGLE
        for run in p.runs:
            run.font.name = "Times New Roman"
            run.font.size = Pt(11)

    counts = []
    for section in SECTIONS:
        doc.add_page_break()
        counts.append((section["title"].split("—")[0].strip(), add_section(doc, section)))

    os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
    doc.save(OUTPUT)

    print(f"Saved: {OUTPUT}")
    for label, count in counts:
        print(f"{label} body word count: {count}")


if __name__ == "__main__":
    main()
