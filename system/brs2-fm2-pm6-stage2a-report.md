# BRS2-FM2-PM6 Glutathione Synthesis — Stage 2A Report

## Scope

This pass is BRS2-FM2-PM6 only. It is not BRS1 acetylcholine synthesis support. Existing page claims were treated as propositions. The attached corpus was Minich and Bland (2019), Sekhar et al. (2011), and Lukovac et al. (2024). Governed biology is the two ATP-dependent assembly steps: glutamate + cysteine → γ-glutamylcysteine (glutamate–cysteine ligase), then γ-glutamylcysteine + glycine → glutathione (glutathione synthetase). Cysteine often limits that assembly. Glutathione peroxidase, glutathione reductase, and selenium-dependent peroxide removal are outside this mechanism.

Findings use local ids PM6-Fn and PM6-ICn. Every `synthesised_evidence_confidence` value is `not-yet-scored`. `scientific_findings_intro` is public. No clinical treatment claim is made for Recovery Capacity or Stress Resilience.

## Overview

The previous overview treated cysteine as a general dietary limit and left selenium and riboflavin inside the synthesis story. That ceiling was too high, so the overview was rewritten. The public paragraph is 87 words, inside the 50–90 authoring range. It states the two ATP-dependent steps, the sulfur-amino-acid-free diet result, the older-adult combined-precursor result, the methionine-adequate cysteine-free qualifier, and the exclusion of peroxide clearance and glutathione recycling.

## Foundational propositions and adjudication

| Proposition | Disposition | Evidence and consequence |
|---|---|---|
| Glutamate–cysteine ligase joins L-glutamate and L-cysteine in an ATP-dependent reaction | Supported | Misra and Griffith (1998), purified human enzyme. First assembly step. |
| Glutathione synthetase adds glycine to γ-glutamylcysteine in an ATP-dependent reaction and binds one Mg²⁺ per subunit | Supported | Polekhina et al. (1999), human enzyme structure. Second assembly step. |
| Cysteine, glutamate, glycine, and ATP are assembly substrates | Supported | Same enzyme sources. Biochemical necessity is not a dietary-modulation claim. |
| Cysteine commonly limits ordinary diets | Not established as a universal claim | A lower cysteine Km does not prove dietary limitation. Courtney-Martin et al. (2008) found no erythrocyte synthesis change when cysteine was omitted and methionine was adequate. |
| Removing both methionine and cysteine slows whole-blood glutathione synthesis | Supported, narrow | Lyons et al. (2000): seven healthy young men, 10-day amino-acid formula. Fractional synthesis 0.65 ± 0.13 to 0.49 ± 0.13 per day. Absolute synthesis 747 ± 216 to 578.6 ± 135 µmol/L/day. Concentration stayed near 1.2 mM. Glycine intake was raised, not reduced. |
| Combined cysteine and glycine precursors raise erythrocyte synthesis in older adults | Supported, narrow | Sekhar et al. (2011): older versus younger erythrocyte kinetics, then a rise after two weeks of combined supplementation. Not neuronal synthesis, not an ADHD trial, and not ordinary food. |
| Sekhar 2011 is universal or neuronal glutathione synthesis | Rejected | Erythrocyte kinetics in older adults. |
| Selenium is a glutathione-synthesis substrate or cofactor | Rejected | Mullenbach et al. (1987): human glutathione peroxidase encodes active-site selenocysteine. That enzyme uses glutathione to reduce peroxides. Utilisation is outside this PM. |
| Riboflavin is a glutathione-synthesis cofactor | Rejected | Glutathione reductase binds FAD and reduces glutathione disulfide (UniProt P00390; Karplus and Schulz 1989). Recycling is outside this PM. |
| Lukovac 2024 measures glutathione, recovery, or stress | Rejected | 133 boys, ADHD versus controls: higher homocysteine and lower vitamin B12. No glutathione, recovery, or stress outcome. |
| Blood-cell concentration equals synthesis flux, and blood-cell flux equals neuronal synthesis | Rejected | PM6-IC1. Lyons held concentration while flux fell. |
| Assembly changes treat ADHD, recovery, or stress | Not established | PM6-F3 and PM6-F4. Phenome links stay mechanistic. |

## Focused retrieval

The attached corpus did not itself establish the enzyme substrates. Minich and Bland (2019) is a review and is connected evidence only.

Questions:

1. What substrates and nucleotide does human glutamate–cysteine ligase use?
2. What substrates, nucleotide, and metal does human glutathione synthetase use?
3. Does removing dietary sulfur amino acids change human glutathione synthesis rate, as distinct from concentration?
4. Does cysteine omission alone do that when methionine intake is adequate?
5. Is selenium a synthesis substrate or a peroxidase constituent?
6. Is riboflavin a synthesis cofactor or a reductase cofactor?
7. Did Sekhar or Lukovac measure neuronal synthesis, ADHD treatment, recovery, or stress resilience?

Sources retrieved, with bibliographic records placed only in `system/bib-additions/brs2-pm6.bib`:

- Misra I, Griffith OW. Protein Expr Purif. 1998;13(2):268–276. PMID 9675072. Key `misra_human_gcl_1998`.
- Polekhina G et al. EMBO J. 1999;18(12):3204–3213. PMID 10369661. Key `polekhina_gss_1999`.
- Lyons J et al. Proc Natl Acad Sci USA. 2000;97(10):5071–5076. PMID 10792033. Key `lyons_glutathione_2000`.
- Courtney-Martin G et al. J Nutr. 2008;138(11):2172–2178. PMID 18936215. Key `courtney_martin_cysteine_2008`.
- Mullenbach GT et al. Nucleic Acids Res. 1987;15(13):5484. PMID 2955287. Key `mullenbach_gpx_selenocysteine_1987`.
- Karplus PA, Schulz GE. J Mol Biol. 1989;210(1):163–180. PMID 2585516. Key `karplus_glutathione_reductase_1989`.

Already in the site bibliography and reused: `sekhar_glutathione_2011`, `minich_glutathione_2019`, `lukovac_serum_2024`. EC 6.3.2.2 and 6.3.2.3 were checked as standard enzyme identities. UniProt P48506, P48637, P07203, and P00390 were used as annotation checks. No kinetic constant was copied except the synthesis rates and concentrations printed in Lyons, Sekhar, and Courtney-Martin.

The 2011 full methods PDF was not retrieved (publisher access returned 403). The abstract names cysteine and glycine. The cysteine source is recorded as N-acetylcysteine because that is the precursor identity of this protocol. No milligram-per-kilogram dose was copied.

## Findings

| Id | Presentation | Role |
|---|---|---|
| PM6-F1 | mechanistic-basis, fm_rollup | Two ATP-dependent enzymes; selenium and riboflavin excluded |
| PM6-F2 | mechanistic-basis, fm_rollup | Lyons, Sekhar, and Courtney-Martin blood-cell conditions |
| PM6-IC1 | interpretive-constraint | Blood-cell kinetics are not neuronal synthesis; concentration is not flux; not an ADHD, recovery, or stress outcome |
| PM6-F3 | phenome-relationship, Recovery Capacity | Benefit not established |
| PM6-F4 | phenome-relationship, Stress Resilience | Benefit not established |

Recovery Capacity links PM6-F1, PM6-F2, PM6-IC1, and PM6-F3. Stress Resilience links PM6-F1, PM6-F2, PM6-IC1, and PM6-F4. Legacy phenome confidence remains low–medium. Rescoring belongs in the change-control queue, which was not edited.

## Connections

§5.3 explains BRS2-FM2-PM5 as homocysteine-to-cysteine supply for the first assembly step, not as the ATP-dependent reactions themselves. §5.2 explains BRS3-FM2-PM5 as later peroxide consumption of glutathione already assembled here. Both explanations are longer than a title echo. The local PM5 link is no longer bare.

## Stopping rationale

Enzyme identity, the two human synthesis-rate conditions, the methionine-adequate cysteine-free qualifier, and the peroxidase/reductase exclusions were each tied to a primary or standard source. Further reviews of glutathione nutrition would repeat Minich without changing the reaction boundary. Neuronal synthesis under the same dietary constraint was not found in the retrieved human studies and is left unresolved rather than inferred.

## Unresolved after Stage 2A

- Whether glutamate–cysteine ligase has a separate kinetic magnesium requirement beyond the glutathione-synthetase ion.
- Neuronal glutathione synthesis under these dietary conditions.
- Isolated N-acetylcysteine or isolated glycine modulation.
- Ordinary mixed-diet inadequacy, as distinct from the experimental amino-acid formula.
- Clinical treatment of ADHD, recovery, or stress.
