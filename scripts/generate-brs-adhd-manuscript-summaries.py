#!/usr/bin/env python3
"""Generate BRS1–BRS5 ADHD manuscript summaries in a single Word document."""

from docx import Document
from docx.shared import Pt, Inches
from docx.enum.text import WD_LINE_SPACING

OUTPUT = (
    "/Users/paulhouston/Food Science/food-science/manuscript/"
    "BRS1-5-ADHD-structure-and-evidence-summary.docx"
)

SECTIONS = [
    {
        "title": "BRS1 — Neurotransmitter Regulation: Framework Structure and ADHD-Relevant Evidence",
        "body": (
            "Within the BRAIN Framework, BRS1 (Neurotransmitter Regulation) describes the signal layer "
            "supporting attention, motivation, mood, and behavioural control. Four Functional Mechanisms (FMs) "
            "integrate diet-actionable Primary Mechanisms (PMs): BRS1(FM1) Monoaminergic Function (PM1–PM4: amino-acid "
            "availability, LAT1 transport, noradrenergic executive modulation, serotonergic regulation); BRS1(FM2) "
            "Cholinergic Function (PM5: acetylcholine synthesis); BRS1(FM3) Membrane Lipid Integrity (PM6: neuronal DHA "
            "incorporation); and BRS1(FM4) GABA–Glutamate Regulation (PM7–PM10: GABA–glutamate balance, GABA synthesis, "
            "glutamate clearance, excitotoxicity modulation). Key Constraints (shared substrate pools) and Specific Mechanisms "
            "(phenotype, genetic, and cross-system interpretation layers) provide additional structural context.\n\n"
            "In ADHD, neurobiology spans multiple transmitter systems. Dopaminergic alterations vary by subtype, stage, and "
            "brain region without supporting a simple global hypo-dopaminergic model (MacDonald et al., 2024); dopamine is "
            "linked to attention network switching (Santos et al., 2019). Meal-level amino-acid sufficiency and tryptophan/tyrosine "
            "biology connect dietary protein to catecholaminergic and serotonergic precursor supply (Wang et al., 2019; Aquili, 2020; "
            "Reimherr & Ward, 1987). Noradrenergic signalling relates to attention regulation (O'Donnell et al., 2012); serotonin "
            "to affective and impulsive phenotypes, including emotion dysregulation co-occurring with ADHD (Oades, 2010; Banerjee "
            "& Nandagopal, 2015; Shaw et al., 2014). Cholinergic evidence includes low choline intakes and altered muscarinic "
            "receptor binding (Derbyshire et al., 2023; Johansson et al., 2013). Omega-3 membrane biology is reviewed in ADHD "
            "contexts (Chang, 2021; McNamara & Carlson, 2006), with supplementation trials reported (Huss et al., 2010). "
            "Excitation–inhibition imbalance is supported by reduced GABA and altered glutamate in ADHD cohorts (Edden et al., 2012; "
            "Puts et al., 2020; Maltezos et al., 2014).\n\n"
            "Collectively, these mechanisms support the BRAIN Framework proposition that neurotransmitter-related phenotypes "
            "emerge from interacting constraints on precursor availability, membrane composition, cholinergic signalling, and "
            "excitation–inhibition balance, providing multiple diet-actionable targets beyond single-neurotransmitter models of ADHD."
        ),
        "references": [
            "Aquili, L. (2020). The role of tryptophan and tyrosine in executive function and reward processing. International Journal of Tryptophan Research, 13. https://doi.org/10.1177/1178646920964825",
            "Banerjee, E., & Nandagopal, K. (2015). Does serotonin deficit mediate susceptibility to ADHD? Neurochemistry International, 82, 52–68. https://doi.org/10.1016/j.neuint.2015.02.001",
            "Chang, J. P.-C. (2021). Personalised medicine in child and adolescent psychiatry: Focus on omega-3 polyunsaturated fatty acids and ADHD. Brain, Behavior, & Immunity—Health, 16, 100310. https://doi.org/10.1016/j.bbih.2021.100310",
            "Derbyshire, E., & Maes, M. (2023). The role of choline in neurodevelopmental disorders—A narrative review focusing on ASC, ADHD and dyslexia. Nutrients, 15(13), 2876. https://doi.org/10.3390/nu15132876",
            "Edden, R. A. E., Crocetti, D., Zhu, H., Gilbert, D. L., & Mostofsky, S. H. (2012). Reduced GABA concentration in attention-deficit/hyperactivity disorder. Archives of General Psychiatry, 69(7). https://doi.org/10.1001/archgenpsychiatry.2011.2280",
            "Huss, M., Völp, A., & Stauss-Grabo, M. (2010). Supplementation of polyunsaturated fatty acids, magnesium and zinc in children seeking medical advice for attention-deficit/hyperactivity problems—An observational cohort study. Lipids in Health and Disease, 9, 105. https://doi.org/10.1186/1476-511X-9-105",
            "Johansson, J., Landgren, M., Fernell, E., Lewander, T., & Venizelos, N. (2013). Decreased binding capacity (Bmax) of muscarinic acetylcholine receptors in fibroblasts from boys with attention-deficit/hyperactivity disorder (ADHD). ADHD Attention Deficit and Hyperactivity Disorders, 5(3), 267–271. https://doi.org/10.1007/s12402-013-0103-0",
            "MacDonald, H. J., Kleppe, R., Szigetvari, P. D., & Haavik, J. (2024). The dopamine hypothesis for ADHD: An evaluation of evidence accumulated from human studies and animal models. Frontiers in Psychiatry, 15. https://doi.org/10.3389/fpsyt.2024.1492126",
            "Maltezos, S., Horder, J., Coghlan, S., et al. (2014). Glutamate/glutamine and neuronal integrity in adults with ADHD: A proton MRS study. Translational Psychiatry, 4(3), e373. https://doi.org/10.1038/tp.2014.11",
            "McNamara, R. K., & Carlson, S. E. (2006). Role of omega-3 fatty acids in brain development and function: Potential implications for the pathogenesis and prevention of psychopathology. Prostaglandins, Leukotrienes and Essential Fatty Acids, 75(4–5), 329–349. https://doi.org/10.1016/j.plefa.2006.07.010",
            "Oades, R. D. (2010). The role of serotonin in attention-deficit hyperactivity disorder (ADHD). In Progress in Brain Research (Vol. 180, pp. 565–584). https://doi.org/10.1016/S1569-7339(10)70101-6",
            "O'Donnell, J., Zeppenfeld, D., McConnell, E., Pena, S., & Nedergaard, M. (2012). Norepinephrine: A neuromodulator that boosts the function of multiple cell types to optimize CNS performance. Neurochemical Research, 37(11), 2496–2512. https://doi.org/10.1007/s11064-012-0818-x",
            "Puts, N. A. J., Ryan, M., Oeltzschner, G., et al. (2020). Reduced striatal GABA in unmedicated children with ADHD at 7T. Psychiatry Research: Neuroimaging, 301, 111082. https://doi.org/10.1016/j.pscychresns.2020.111082",
            "Reimherr, F. W., & Ward, M. F. (1987). An open trial of L-tyrosine in the treatment of attention deficit disorder, residual type. American Journal of Psychiatry, 144(8), 1071–1073. https://doi.org/10.1176/ajp.144.8.1071",
            "Santos, P. H., Gonçalves, R., & Pedroso, S. (2019). Methylphenidate and default-mode network activation: Systematic review. Revista de Neurología, 68(10), 417. https://doi.org/10.33588/rn.6810.2018487",
            "Shaw, P., Stringaris, A., Nigg, J., & Leibenluft, E. (2014). Emotion dysregulation in attention deficit hyperactivity disorder. American Journal of Psychiatry, 171(3), 276–293. https://doi.org/10.1176/appi.ajp.2013.13070966",
            "Wang, L.-J., Yu, Y.-H., Fu, M.-L., et al. (2019). Dietary profiles, nutritional biochemistry status, and attention-deficit/hyperactivity disorder: Path analysis for a case-control study. Journal of Clinical Medicine, 8(5), 709. https://doi.org/10.3390/jcm8050709",
        ],
    },
    {
        "title": "BRS2 — Methylation & One-Carbon Metabolism: Framework Structure and ADHD-Relevant Evidence",
        "body": (
            "Within the BRAIN Framework, BRS2 (Methylation & One-Carbon Metabolism) describes the nutrient-dependent "
            "layer linking dietary methyl-donor patterns to homocysteine recycling, SAMe synthesis, transsulfuration redox "
            "chemistry, and membrane phospholipid formation. Three Functional Mechanisms integrate seven Primary Mechanisms: "
            "BRS2(FM1) Methylation Cycle Efficiency (PM1–PM4: folate/B12-dependent homocysteine remethylation, betaine/BHMT "
            "remethylation, SAMe synthesis, methionine-cycle flux); BRS2(FM2) Transsulfuration & Redox Coupling (PM5–PM6: "
            "transsulfuration pathway, glutathione synthesis); and BRS2(FM3) Methylation–Membrane Coupling (PM7: phosphatidylcholine "
            "formation). Key Constraints govern shared one-carbon and methionine/transsulfuration substrate pools; Specific "
            "Mechanisms such as BRS2(SM-SNP1) capture genetic sensitivity to folate-cycle efficiency (e.g. MTHFR-related variants).\n\n"
            "In ADHD, methyl-donor biology intersects attention and cognitive control through multiple coupled pathways. "
            "Folate, B12, and zinc status correlate with symptom severity (Razavinia et al., 2024), and dietary patterns rich in "
            "fibre, folate, and omega-3 associate with reduced symptoms (Millichap & Yee, 2012). SAMe serves as the principal "
            "methyl donor for DNA methylation, phospholipid synthesis, and numerous cellular methylation reactions, linking "
            "dietary methyl-donor availability to downstream regulatory systems (Chiang et al., 1996). Through "
            "transsulfuration, homocysteine can be diverted toward cysteine and glutathione synthesis, coupling methylation "
            "status to antioxidant capacity and oxidative stress regulation (Kumar et al., 2017; Minich et al., 2019). "
            "PEMT-dependent SAMe methylation converts phosphatidylethanolamine to phosphatidylcholine, shaping membrane "
            "composition and fluidity (Vance, 2014); B-vitamin effects on cognition depend on adequate omega-3 status, "
            "consistent with a phospholipid bridge to brain long-chain PUFA delivery (Oulhaj et al., 2016; Liu et al., 2014). "
            "Choline supports acetylcholine and phospholipid substrates with positive ADHD trial signals (Derbyshire & Maes, 2023). "
            "Elevated homocysteine, a functional marker of impaired one-carbon metabolism, has been reported in pediatric "
            "ADHD cohorts (Lukovac et al., 2024).\n\n"
            "Collectively, these mechanisms support the BRAIN Framework proposition that attention-related phenotypes in ADHD "
            "emerge from interacting constraints on one-carbon donor availability, methionine-cycle flux, transsulfuration redox "
            "coupling, and SAMe-dependent phosphatidylcholine formation at the membrane interface, providing multiple diet-actionable "
            "entry points beyond isolated micronutrient supplementation models."
        ),
        "references": [
            "Chiang, P. K., et al. (1996). S-Adenosylmethionine and methylation. FASEB Journal, 10(5), 471–480. https://pubmed.ncbi.nlm.nih.gov/8647346/",
            "Derbyshire, E., & Maes, M. (2023). The role of choline in neurodevelopmental disorders—A narrative review focusing on ASC, ADHD and dyslexia. Nutrients, 15(13), 2876. https://doi.org/10.3390/nu15132876",
            "Kumar, N., et al. (2017). The transsulfuration pathway. World Journal of Hepatology, 9(16), 745–750. https://doi.org/10.4254/wjh.v9.i16.745",
            "Liu, L., et al. (2014). Higher efficacy of dietary DHA provided as a phospholipid than as a triglyceride for brain DHA accretion in neonatal piglets. Journal of Lipid Research, 55(3), 531–539. https://doi.org/10.1194/jlr.M045930",
            "Lukovac, T., et al. (2024). Serum biomarker analysis in pediatric ADHD: Implications of homocysteine, vitamin B12, vitamin D, ferritin, and iron levels. Children, 11(4), 497. https://doi.org/10.3390/children11040497",
            "Millichap, J. G., & Yee, M. M. (2012). The diet factor in attention-deficit/hyperactivity disorder. Pediatrics, 129(2), 330–337. https://doi.org/10.1542/peds.2011-2199",
            "Minich, D. M., et al. (2019). A review of dietary (phyto)nutrients for glutathione support. Nutrients, 11(9), 2073. https://doi.org/10.3390/nu11092073",
            "Oulhaj, A., et al. (2016). Omega-3 fatty acid status enhances the prevention of cognitive decline by B vitamins in mild cognitive impairment. Journal of Alzheimer's Disease, 50(2), 547–557. https://doi.org/10.3233/JAD-150777",
            "Razavinia, F., et al. (2024). Vitamins B9 and B12 in children with attention deficit hyperactivity disorder (ADHD). International Journal for Vitamin and Nutrition Research, 94(5–6), 476–484. https://doi.org/10.1024/0300-9831/a000809",
            "Vance, D. E. (2014). Physiological roles of phosphatidylethanolamine N-methyltransferase. Biochimica et Biophysica Acta, 1831(3), 626–632. https://doi.org/10.1016/j.bbalip.2012.07.018",
        ],
    },
    {
        "title": "BRS3 — Inflammation & Oxidative Stress: Framework Structure and ADHD-Relevant Evidence",
        "body": (
            "Within the BRAIN Framework, BRS3 (Inflammation & Oxidative Stress) describes the immune and "
            "redox regulation layer linking dietary pattern, gut–immune context, and antioxidant biology to "
            "inflammatory signalling and oxidative burden. Three Functional Mechanisms integrate eight Primary "
            "Mechanisms: BRS3(FM1) Anti-Inflammatory Signalling Tone (PM1–PM2: NF-κB regulation, gut-derived "
            "inflammatory signalling); BRS3(FM2) Antioxidant Defense Capacity (PM3–PM6: Nrf2-ARE antioxidant "
            "activation, ROS generation versus clearance balance, lipid peroxidation control, antioxidant network "
            "recycling); and BRS3(FM3) Inflammation Resolution Capacity (PM7–PM8: cytokine network modulation, "
            "eicosanoid/SPM balance). Key Constraints are BRS3(KC1) Antioxidant Substrate Availability and "
            "BRS3(KC3) Essential Fatty Acid Balance — shared pools constraining endogenous antioxidant defence, "
            "redox buffering, inflammatory signalling, and inflammation-resolution pathways. BRS3 cross-links to "
            "BRS5 gut-barrier and immune-interface biology where gut-derived inflammatory load is relevant.\n\n"
            "In ADHD, inflammatory and redox biology intersect across these capacities rather than through a single "
            "biomarker. Systemic inflammation relates to default-mode network connectivity (Marsland et al., 2017); "
            "metabolic and postprandial inflammatory patterns are reported (Brown et al., 2025); and elevated "
            "pro-inflammatory cytokine context is described in paediatric cohorts (Chang et al., 2020). Gut-derived "
            "load includes reduced microbiome alpha diversity (Prehn-Kristensen et al., 2018), butyrate-linked "
            "neuroinflammation framing (Yunting Li et al., 2024), and propionate–norepinephrine signalling with "
            "possible attention relevance (Hoyles et al., 2018). Immune–allergy overlap is also reported (Wesselink "
            "et al., 2019). On the redox side, adult ADHD cohorts show elevated malondialdehyde (Bulut et al., 2007), "
            "thiol/disulfide shifts and DNA oxidation markers (Kurhan & Alp, 2021), elevated oxidative-stress indices "
            "(Miniksar et al., 2023), and compensatory glutathione elevation (Verlaet et al., 2019). Dietary "
            "antioxidant treatment rationale, ultra-processed food and metals exposure, and emerging contaminant "
            "burden are reviewed in ADHD nutritional contexts (Verlaet et al., 2018; Dufault et al., 2024; Zhang "
            "et al., 2025). A small randomised Pycnogenol trial reported attention and hyperactivity improvements "
            "with normalised total antioxidant status and glutathione balance, though replication remains limited "
            "(Trebatická et al., 2006; Dvořáková et al., 2006; Chovanová et al., 2006).\n\n"
            "Collectively, these findings support the BRAIN Framework proposition that ADHD-relevant biology in "
            "BRS3 emerges from interacting constraints on inflammatory tone, endogenous antioxidant induction, net "
            "redox balance, and inflammation-resolution substrate context — providing multiple diet-actionable entry "
            "points beyond isolated anti-inflammatory or antioxidant supplementation models."
        ),
        "subsections": [
            {
                "title": "Paper review: Verlaet et al. (2018) and BRS3-FM2-PM3 (Nrf2-ARE Antioxidant Activation)",
                "body": (
                    "Verlaet et al. (2018) is a narrative review in Nutrients arguing that dietary antioxidant "
                    "strategies may complement stimulant pharmacotherapy in ADHD, synthesising evidence linking ADHD "
                    "to immune dysregulation, altered oxidant–antioxidant balance, and mutually reinforcing low-grade "
                    "inflammation and oxidative stress. Within the BRAIN Framework, this argument aligns most directly "
                    "with BRS3-FM2-PM3 (Nrf2-ARE Antioxidant Activation)—endogenous antioxidant and detoxification "
                    "gene programmes induced through repeatable food-derived patterns rather than high-dose isolated "
                    "supplement megadosing. The paper is used cautiously at low–medium confidence for Cognitive Clarity "
                    "and Focus / Attention Stability as hypothesis-generating translational context, not proof of "
                    "dietary treatment efficacy."
                ),
            }
        ],
        "references": [
            "Brown et al. (2025). Associations between ADHD and metabolic disorders. See BRAIN Diet bibliography: brown_associations_2025.",
            "Bulut, M., et al. (2007). Evaluation of malondialdehyde levels in adult attention deficit hyperactivity disorder. Psychiatry and Clinical Psychopharmacology. https://doi.org/10.1080/14751740701595421",
            "Chang, J. P.-C., et al. (2020). Cortisol, inflammatory biomarkers and neurotrophins in children and adolescents with ADHD in Taiwan. Brain, Behavior, and Immunity, 88. https://doi.org/10.1016/j.bbi.2020.05.017",
            "Dufault, R., et al. (2024). Nutritional factors in ADHD and related disorders. See BRAIN Diet bibliography: dufault_nutritional_2024.",
            "Houghton, C. A., Fassett, R. G., & Coombes, J. S. (2016). Can the clinician's expectation be matched by the reality? Sulforaphane bioavailability and Nrf2 activation. Oxidative Medicine and Cellular Longevity. https://doi.org/10.1155/2016/7857186",
            "Hoyles, T., et al. (2018). Microbiome-host systems biology. See BRAIN Diet bibliography: hoyles_microbiome-host_2018.",
            "Kurhan, S., & Alp, H. H. (2021). Dynamic thiol/disulfide homeostasis in ADHD. Psychiatry Investigation. https://doi.org/10.30773/pi.2020.0359",
            "Marsland, A. L., et al. (2017). Systemic inflammation and brain structure in healthy and depressed individuals. See BRAIN Diet bibliography: marsland_systemic_2017.",
            "Miniksar, D. B., et al. (2023). The effect of drug use, BMI and blood pressure on oxidative stress levels in children and adolescents with ADHD. Clinical Psychopharmacology and Neuroscience, 21(1). https://doi.org/10.9758/cpn.2023.21.1.88",
            "Mocchegiani, E., & Malavolta, M. (2019). Role of zinc and selenium in antioxidant systems. See BRAIN Diet bibliography: mocchegiani_role_2019.",
            "Prehn-Kristensen, A., et al. (2018). Reduced microbiome alpha diversity in ADHD. See BRAIN Diet bibliography: prehn-kristensen_reduced_2018.",
            "Verlaet, A., Maasakkers, C., Hermans, N., & Savelkoul, H. (2018). Rationale for dietary antioxidant treatment of ADHD. Nutrients, 10(4), 405. https://doi.org/10.3390/nu10040405",
            "Verlaet, A., et al. (2019). Oxidative stress in ADHD. See BRAIN Diet bibliography: verlaet_oxidative_2019.",
            "Wesselink, E., et al. (2019). Feeding, immunity, and ADHD. See BRAIN Diet bibliography: wesselink_feeding_2019.",
            "Yunting Li, et al. (2024). Sodium butyrate and neuroinflammation. See BRAIN Diet bibliography: li_sodium_2024.",
            "Zhang, Y., et al. (2025). Micro/nanoplastics and ADHD. See BRAIN Diet bibliography: zhang_exploring_2025.",
            "Trebatická, J., et al. (2006). Treatment of ADHD with French maritime pine bark extract, Pycnogenol. European Child & Adolescent Psychiatry, 15(6), 329–335. https://doi.org/10.1007/s00787-006-0535-6",
            "Dvořáková, M., et al. (2006). Urinary catecholamines in children with ADHD before and after Pycnogenol treatment. See BRAIN Diet bibliography: dvorakova_glutathione_pycnogenol_adhd_2006.",
            "Chovanová, Z., et al. (2006). Effect of Pycnogenol on 8-oxoguanine in children with ADHD. See BRAIN Diet bibliography: chovanova_8oxoguanine_pycnogenol_adhd_2006.",
        ],
    },
    {
        "title": "BRS4 — Mitochondrial Function & Bioenergetics: Framework Structure and ADHD-Relevant Evidence",
        "body": (
            "Within the BRAIN Framework, BRS4 (Mitochondrial Function & Bioenergetics) describes the "
            "integrated cellular capacity that sustains ATP production, fuel flexibility, mitochondrial "
            "protection, and longer-term mitochondrial quality control. Four Functional Mechanisms integrate "
            "nine Primary Mechanisms: BRS4(FM1) Cellular Bioenergetics (PM1–PM3: electron transport chain "
            "function, NAD⁺ metabolism, creatine–phosphocreatine buffering); BRS4(FM2) Mitochondrial "
            "Resilience & Redox Stability (PM4–PM5: ROS production and control, mitochondrial protection "
            "and redox integrity); BRS4(FM3) Substrate Utilisation & Flexibility (PM6–PM8: carnitine-mediated "
            "fat transport, ketone utilisation, metabolic fuel switching); and BRS4(FM4) Mitochondrial Capacity "
            "Expansion & Adaptation (PM9: mitochondrial biogenesis). Key Constraints include BRS4(KC1) "
            "Macronutrient Substrate Availability and BRS4(KC2) Mitochondrial Cofactor Sufficiency — shared "
            "pools constraining respiratory-chain function, substrate delivery, and redox buffering. BRS4 "
            "cross-links to BRS3 antioxidant and inflammatory context and to BRS5 gut-derived metabolite "
            "biology where butyrate and related SCFAs influence brain energy metabolism.\n\n"
            "In ADHD, mitochondrial biology is interpreted as a modifiable regulatory system rather than "
            "a single universal deficit. Direct ADHD evidence includes a controlled carnitine supplementation "
            "trial reporting behavioural and functional improvements in children with ADHD (van Oudheusden & "
            "Scholte, 2002); paediatric case–control work showing elevated glutathione and oxidative-stress "
            "markers with implications for mitochondrial lactate metabolism and ROS neutralisation (Verlaet "
            "et al., 2019); cybrid models from ADHD platelets demonstrating reduced cellular and mitochondrial "
            "respiration, lower complex V activity, membrane-potential loss, and elevated oxidative stress "
            "(Verma et al., 2016); and narrative reviews synthesising ADHD-relevant mitochondrial biomarker, "
            "oxidative-stress, and genetic-variation literature including mtDNA copy number and haplogroup "
            "associations (Öğütlü et al., 2022) and mitophagy-related bioenergetic regulation (Almutairi "
            "et al., 2024). Inferred mechanistic evidence extends from general mitochondrial and nutrition "
            "science: micronutrient cofactor sufficiency for respiratory-chain and brain-relevant pathways "
            "(Tardy et al., 2020); CoQ10 roles in electron transport and neuronal antioxidant protection "
            "(Crane, 2001); creatine-supported ATP recycling in neurons (Avgerinos et al., 2018); polyphenol-"
            "derived urolithin A and mitophagy pathways in non-ADHD intervention contexts (Singh et al., "
            "2022; Andreux et al., 2019; Hou et al., 2024); and butyrate-related enhancement of mitochondrial "
            "function under oxidative stress, interpreted through gut–brain metabolic contexts (Rose et al., "
            "2018). Human dietary intervention studies directly measuring mitochondrial functional mechanisms "
            "in ADHD remain limited; dedicated BRS4(SM-SNP) pages for mtDNA and polymorphism associations "
            "are pending framework expansion.\n\n"
            "Collectively, these findings do not imply that mitochondrial dysfunction is universal in ADHD, "
            "nor that individual biomarkers define the disorder. Instead, they support the BRAIN Framework "
            "proposition that ADHD-relevant bioenergetic phenotypes emerge from interacting constraints on "
            "electron transport, substrate delivery, redox stability, phosphocreatine buffering, and "
            "mitochondrial quality control — providing multiple diet-actionable entry points beyond isolated "
            "mitochondrial supplement models."
        ),
        "references": [
            "Almutairi, M. M., Althekair, A., Almutairi, F., Alatabani, M., & Alsaikhan, A. (2024). Mitochondrial dysfunction and mitophagy in ADHD: Cellular and molecular mechanisms. Saudi Pharmaceutical Journal, 32(12). https://doi.org/10.1016/j.jsps.2024.102212",
            "Andreux, P. A., Blanco-Bose, W., Ryu, D., et al. (2019). The mitophagy activator urolithin A is safe and induces a molecular signature of improved mitochondrial and cellular health in humans. Nature Metabolism, 1(6). https://doi.org/10.1038/s42255-019-0073-4",
            "Avgerinos, K. I., Spyrou, N., Bougioukas, K. I., & Kapogiannis, D. (2018). Effects of creatine supplementation on cognitive function of healthy individuals: A systematic review of randomized controlled trials. Clinical Nutrition, 37(6), 2184–2190. https://doi.org/10.1016/j.clnu.2017.12.002",
            "Crane, F. L. (2001). Biochemical functions of coenzyme Q10. Journal of the American College of Nutrition, 20(6), 591–598. https://doi.org/10.1080/07315724.2001.10719063",
            "Hou, Y., Chu, X., Park, J.-H., et al. (2024). Urolithin A improves Alzheimer's disease cognition and restores mitophagy and lysosomal functions. Alzheimer's & Dementia, 20(6), 4212–4233. https://doi.org/10.1002/alz.13847",
            "Öğütlü, H., Kasak, M., & Tabur, S. T. (2022). Mitochondrial dysfunction in attention deficit hyperactivity disorder. The Eurasian Journal of Medicine, 54(Suppl 1), S187–S195. https://doi.org/10.5152/eurasianjmed.2022.22187",
            "Rose, S., Bennuri, S. C., Davis, J. E., et al. (2018). Butyrate enhances mitochondrial function during oxidative stress in cell lines from boys with autism. Translational Psychiatry, 8(1). https://doi.org/10.1038/s41398-017-0089-z",
            "Singh, A., D'Amico, D., Andreux, P. A., et al. (2022). Direct supplementation with urolithin A overcomes limitations of dietary exposure and gut microbiome variability in healthy adults. European Journal of Clinical Nutrition, 76(2), 297–308. https://doi.org/10.1038/s41430-021-00950-1",
            "Tardy, A.-L., Pouteau, E., Marquez, D., Yilmaz, C., & Scholey, A. (2020). Vitamins and minerals for energy, fatigue and cognition: A narrative review of the biochemical and clinical evidence. Nutrients, 12(1), 228. https://doi.org/10.3390/nu12010228",
            "van Oudheusden, L. J., & Scholte, H. R. (2002). Efficacy of carnitine in the treatment of children with attention-deficit hyperactivity disorder. Prostaglandins, Leukotrienes and Essential Fatty Acids, 67(1), 33–38. https://doi.org/10.1054/plef.2002.0378",
            "Verlaet, A. A. J., Breynaert, A., Ceulemans, B., et al. (2019). Oxidative stress and immune aberrancies in attention-deficit/hyperactivity disorder (ADHD): A case–control comparison. European Child & Adolescent Psychiatry, 28(5), 719–729. https://doi.org/10.1007/s00787-018-1239-4",
            "Verma, P., Singh, A., Nthenge-Ngumbau, D. N., et al. (2016). Attention deficit-hyperactivity disorder suffers from mitochondrial dysfunction. BBA Clinical, 6, 153–158. https://doi.org/10.1016/j.bbacli.2016.10.003",
        ],
    },
    {
        "title": "BRS5 — Gut-Brain Axis & Enteric Nervous System: Framework Structure and ADHD-Relevant Evidence",
        "body": (
            "Within the BRAIN Framework, BRS5 (Gut-Brain Axis & Enteric Nervous System) describes the "
            "integrated peripheral capacity that keeps the gut barrier selective, microbial ecology "
            "supportive, and gut-to-brain communication proportionate rather than chronically activating. "
            "Three Functional Mechanisms integrate eight Primary Mechanisms: BRS5(FM1) Gut Barrier "
            "Integrity & Immune Interface (PM1–PM3: tight-junction integrity, LPS/endotoxin containment, "
            "keystone taxa support); BRS5(FM2) Microbial Metabolite Signalling Capacity (PM4–PM6: "
            "microbial ecological turnover, SCFA production and signalling, polyphenol biotransformation "
            "and mitochondrial-relevant metabolite generation); and BRS5(FM3) Gut-Vagal Neuromodulation "
            "& ENS Signalling (PM7–PM8: vagal/ENS signalling modulation, neurotransmitter precursor "
            "biotransformation and availability). Key Constraints include BRS5(KC1) Fermentable Fibre "
            "Availability, BRS5(KC2) Polyphenol & Plant-Diversity Input Availability, and BRS5(KC3) "
            "Barrier-Supportive Nutrient Sufficiency — shared pools constraining fermentation substrate, "
            "microbial ecology, and barrier resilience. BRS5 cross-links to BRS3 gut-derived inflammatory "
            "load and to BRS4 mitochondrial-relevant SCFA biology where butyrate and related metabolites "
            "influence brain energy metabolism.\n\n"
            "In ADHD, gut–brain axis biology is interpreted as a modifiable regulatory system rather than "
            "a single universal dysbiosis pattern. Direct ADHD evidence includes reduced microbial alpha "
            "diversity in paediatric cohorts (Prehn-Kristensen et al., 2018); gut microbiome composition "
            "linked to neural reward anticipation (Aarts et al., 2017); compositional differences in gut "
            "microbiota profiles in treatment-naïve children with ADHD (Jiang et al., 2018); lower faecal "
            "short-chain fatty acid levels in ADHD versus controls (Steckler et al., 2024); open-label "
            "Bifidobacterium bifidum supplementation with symptom and microbiota changes in children "
            "with ADHD (Wang et al., 2022); and early-life probiotic exposure with later neurodevelopmental "
            "risk associations including ADHD in a small randomised trial (Pärtty et al., 2015). Inferred "
            "mechanistic evidence extends from general gut–brain and nutrition science: microbiota-targeted "
            "dietary modulation of immune status and ecology in non-ADHD controlled feeding trials "
            "(Wastyk et al., 2021); taxonomic diversity and metabolite-generation capacity framing "
            "(Schleupner & Carmichael, 2022); SCFA signalling for barrier and gut–brain communication "
            "(Silva et al., 2020); propionate-related blood–brain interface and noradrenergic signalling "
            "biology (Hoyles et al., 2018); butyrate-related mitochondrial and neuroinflammatory "
            "mechanistic work in non-ADHD contexts (Rose et al., 2018; Cavaliere et al., 2022); propionate "
            "neuroprotection in non-ADHD neurological cohorts (Grüter et al., 2023); microbiota–vagal GABA "
            "receptor modulation in preclinical models (Bravo et al., 2011); vagal neuromodulatory route "
            "reviews (Austelle et al., 2022); prebiotic effects on cortisol and emotional bias in healthy "
            "volunteers (Schmidt et al., 2015); and GOS prebiotic anxiolytic effects in healthy young women "
            "(Johnstone et al., 2021). Human dietary intervention studies directly measuring gut-barrier, "
            "SCFA, and vagal functional mechanisms in ADHD remain limited; probiotic findings show "
            "inconsistent taxa directions across cohorts; and dedicated BRS5(SM-Lifestage) pages for "
            "early-life probiotic modulation windows are pending framework expansion.\n\n"
            "Collectively, these findings do not imply that gut dysbiosis is universal in ADHD, nor that "
            "individual microbiome markers define the disorder. Instead, they support the BRAIN Framework "
            "proposition that ADHD-relevant gut–brain phenotypes emerge from interacting constraints on "
            "barrier integrity, microbial metabolite signalling, ecological turnover, and vagal/enteric "
            "communication — providing multiple diet-actionable entry points beyond isolated probiotic or "
            "psychobiotic supplement models."
        ),
        "references": [
            "Aarts, E., Ederveen, T. H. A., Naaijen, J., et al. (2017). Gut microbiome in ADHD and its relation to neural reward anticipation. PLOS ONE, 12(9). https://doi.org/10.1371/journal.pone.0183509",
            "Austelle, C. W., O'Leary, G. H., Thompson, S., et al. (2022). A comprehensive review of vagus nerve stimulation for depression. Neuromodulation: Technology at the Neural Interface, 25(3). https://doi.org/10.1111/ner.13528",
            "Bravo, J. A., Forsythe, P., Chew, M. V., et al. (2011). Ingestion of Lactobacillus strain regulates emotional behavior and central GABA receptor expression in a mouse via the vagus nerve. Proceedings of the National Academy of Sciences, 108(38). https://doi.org/10.1073/pnas.1102999108",
            "Cavaliere, G., Catapano, A., Trinchese, G., et al. (2022). Butyrate improves neuroinflammation and mitochondrial impairment in cerebral cortex and synaptic fraction in an animal model of diet-induced obesity. Antioxidants, 12(1), 4. https://doi.org/10.3390/antiox12010004",
            "Grüter, T., Mohamad, N., Rilke, N., et al. (2023). Propionate exerts neuroprotective and neuroregenerative effects in the peripheral nervous system. Proceedings of the National Academy of Sciences, 120(4). https://doi.org/10.1073/pnas.2216941120",
            "Hoyles, T., Snelling, T., Umlai, U.-K., et al. (2018). Microbiome-host systems interactions: Protective effects of propionate upon the blood-brain barrier. Microbiome, 6. https://doi.org/10.1186/s40168-018-0439-y",
            "Jiang, H.-Y., Zhou, Y.-Y., Zhou, G.-L., et al. (2018). Gut microbiota profiles in treatment-naïve children with attention deficit hyperactivity disorder. Behavioural Brain Research, 347, 408–413. https://doi.org/10.1016/j.bbr.2018.03.036",
            "Johnstone, N., Milesi, C., Burn, O., et al. (2021). Anxiolytic effects of a galacto-oligosaccharides prebiotic in healthy females (18–25 years) with corresponding changes in gut bacterial composition. Scientific Reports, 11(1). https://doi.org/10.1038/s41598-021-87865-w",
            "Pärtty, A., Kalliomäki, M., Wacklin, P., et al. (2015). A possible link between early probiotic intervention and the risk of neuropsychiatric disorders later in childhood: A randomized trial. Pediatric Research, 77(6), 823–828. https://doi.org/10.1038/pr.2015.51",
            "Prehn-Kristensen, A., Zimmermann, A., Tittmann, L., et al. (2018). Reduced microbiome alpha diversity in young patients with ADHD. PLOS ONE, 13(7). https://doi.org/10.1371/journal.pone.0200728",
            "Rose, S., Bennuri, S. C., Davis, J. E., et al. (2018). Butyrate enhances mitochondrial function during oxidative stress in cell lines from boys with autism. Translational Psychiatry, 8(1). https://doi.org/10.1038/s41398-017-0089-z",
            "Schleupner, H. V., & Carmichael, M. J. (2022). Attention-deficit/hyperactivity disorder and the gut microbiota–gut–brain axis: Closing research gaps through female inclusion in study design. Women, 2(3). https://doi.org/10.3390/women2030023",
            "Schmidt, K., Cowen, P. J., Harmer, C. J., et al. (2015). Prebiotic intake reduces the waking cortisol response and alters emotional bias in healthy volunteers. Psychopharmacology, 232(10), 1793–1801. https://doi.org/10.1007/s00213-014-3810-0",
            "Silva, Y. P., Bernardi, A., & Frozza, R. L. (2020). The role of short-chain fatty acids from gut microbiota in gut-brain communication. Frontiers in Endocrinology, 11, 25. https://doi.org/10.3389/fendo.2020.00025",
            "Steckler, R., Magzal, F., Kokot, M., et al. (2024). Disrupted gut harmony in attention-deficit/hyperactivity disorder: Dysbiosis and decreased short-chain fatty acids. Brain, Behavior, & Immunity—Health, 40, 100829. https://doi.org/10.1016/j.bbih.2024.100829",
            "Wang, L.-J., Yang, C.-Y., Kuo, H.-C., et al. (2022). Effect of Bifidobacterium bifidum on clinical characteristics and gut microbiota in attention-deficit/hyperactivity disorder. Journal of Personalized Medicine, 12(2), 227. https://doi.org/10.3390/jpm12020227",
            "Wastyk, H. C., Fragiadakis, G. K., Perelman, D., et al. (2021). Gut-microbiota-targeted diets modulate human immune status. Cell, 184(16), 4137–4153.e14. https://doi.org/10.1016/j.cell.2021.06.019",
        ],
    },
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


def add_section(doc: Document, section: dict) -> int:
    add_body_paragraphs(doc, section["title"], heading_level=1, heading_size=14)
    add_body_paragraphs(doc, section["body"])

    for subsection in section.get("subsections", []):
        add_body_paragraphs(doc, subsection["title"], heading_level=2, heading_size=13)
        add_body_paragraphs(doc, subsection["body"])

    doc.add_heading("References", level=2)
    for ref in section["references"]:
        p = doc.add_paragraph(ref, style="List Number")
        p.paragraph_format.line_spacing_rule = WD_LINE_SPACING.SINGLE
        p.paragraph_format.space_after = Pt(3)
        p.paragraph_format.left_indent = Inches(0.25)
        p.paragraph_format.first_line_indent = Inches(-0.25)
        for run in p.runs:
            run.font.name = "Times New Roman"
            run.font.size = Pt(11)

    return len(section["body"].split()) + sum(
        len(subsection["body"].split()) for subsection in section.get("subsections", [])
    )


def main():
    doc = Document()
    for section in doc.sections:
        section.top_margin = Inches(1)
        section.bottom_margin = Inches(1)
        section.left_margin = Inches(1)
        section.right_margin = Inches(1)

    doc.add_heading(
        "BRAIN Framework: Biological Target Summaries — ADHD-Relevant Structure and Evidence",
        level=0,
    )

    counts = []
    for i, section in enumerate(SECTIONS):
        if i > 0:
            doc.add_page_break()
        counts.append((section["title"].split("—")[0].strip(), add_section(doc, section)))

    import os

    os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
    doc.save(OUTPUT)

    print(f"Saved: {OUTPUT}")
    for label, count in counts:
        print(f"{label} body word count: {count}")


if __name__ == "__main__":
    main()
