#!/usr/bin/env python3
"""Generate BRS5 structure + ADHD studies manuscript summary as Word document."""

from docx import Document
from docx.shared import Pt, Inches
from docx.enum.text import WD_LINE_SPACING

OUTPUT = (
    "/Users/paulhouston/Food Science/food-science/manuscript/"
    "BRS5-ADHD-structure-and-evidence-summary.docx"
)

TITLE = (
    "BRS5 — Gut-Brain Axis & Enteric Nervous System: "
    "Framework Structure and ADHD-Relevant Evidence"
)

BODY = (
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
)

REFERENCES = [
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
]


def main():
    doc = Document()
    for section in doc.sections:
        section.top_margin = Inches(1)
        section.bottom_margin = Inches(1)
        section.left_margin = Inches(1)
        section.right_margin = Inches(1)

    title = doc.add_heading(TITLE, level=1)
    title.runs[0].font.size = Pt(14)

    for para_text in BODY.split("\n\n"):
        p = doc.add_paragraph(para_text)
        p.paragraph_format.line_spacing_rule = WD_LINE_SPACING.DOUBLE
        p.paragraph_format.space_after = Pt(6)
        for run in p.runs:
            run.font.name = "Times New Roman"
            run.font.size = Pt(12)

    doc.add_heading("References", level=2)
    for ref in REFERENCES:
        p = doc.add_paragraph(ref, style="List Number")
        p.paragraph_format.line_spacing_rule = WD_LINE_SPACING.SINGLE
        p.paragraph_format.space_after = Pt(3)
        p.paragraph_format.left_indent = Inches(0.25)
        p.paragraph_format.first_line_indent = Inches(-0.25)
        for run in p.runs:
            run.font.name = "Times New Roman"
            run.font.size = Pt(11)

    import os

    os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
    doc.save(OUTPUT)

    word_count = len(BODY.split())
    print(f"Saved: {OUTPUT}")
    print(f"Body word count: {word_count}")


if __name__ == "__main__":
    main()
