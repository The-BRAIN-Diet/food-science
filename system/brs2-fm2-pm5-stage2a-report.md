# BRS2-FM2-PM5 Transsulfuration Pathway — Stage 2A Report

## Scope

This pass assessed the irreversible conversion of homocysteine to cysteine through cystathionine. Cystathionine beta-synthase (CBS) and cystathionine gamma-lyase (CGL, also called CSE) are both pyridoxal 5'-phosphate-dependent. Glutathione synthesis remains BRS2-FM2-PM6. Homocysteine remethylation remains BRS2-FM1-PM1 and BRS2-FM1-PM2. Confidence on every Finding is `not-yet-scored`. `findings:sync` and `phenome:sync` were not run.

## Attached keys

| Key | Test | Disposition |
|---|---|---|
| `gregory_homocysteine_2016` | DOI `10.3945/ajcn.116.131649` is not in Crossref (HTTP 404). PMID `27357092` is a different 2016 AJCN paper (Kiely et al., vitamin D and pregnancy). The title is not in PubMed. | Cannot support a NHANES association, a flux measurement, or an intake effect. Removed from the public bibliography. Do not repair by editing `static/bibtex/BRAIN-diet.bib` in this pass. |
| `kumar_transsulfuration_2017` | DOI `10.4254/wjh.v9.i16.745` is not in Crossref (HTTP 404). PMID `28652830` is a rheumatoid-arthritis cohort, not a transsulfuration review. The page text "Kumar and Yadav" does not match the bib authors (Kumar, Kaur, Kaur). | Cannot establish serine as a CBS substrate or PLP dependence at any evidence level. Removed from the public bibliography. Same bib-file restriction. |
| `lukovac_serum_2024` | DOI `10.3390/children11040497`, PMID `38671715`, resolves. Cross-sectional serum study in 133 boys (67 with DSM-V ADHD, 66 controls). Higher homocysteine and lower vitamin B12. | Real study. It does not measure CBS, CGL, cystathionine, cysteine, PLP, stress reactivity, recovery, or a treatment. Used only as PM5-F3. |

The attached review therefore could not establish the defining reactions. Targeted retrieval followed.

## Propositions and dispositions

| Proposition | Disposition | Evidence |
|---|---|---|
| CBS condenses L-homocysteine and L-serine to L-cystathionine and requires PLP | Supported | Belew et al. (2009), purified human CBS kinetics, including Ki 2.1 ± 0.2 mM for L-homocysteine substrate inhibition. Meier et al. (2001), crystal structure of truncated human CBS stating the same PLP-dependent condensation. PM5-F1. |
| CGL/CSE cleaves L-cystathionine in the step that produces cysteine and requires PLP | Supported | Steegborn et al. (1999): gamma-lyase activity toward L-cystathionine (Km 0.5 mM, Vmax 2.5 units/mg) and only marginal reactivity toward L-cysteine. Zhu et al. (2008): human CGL is PLP-dependent, functions in homocysteine-to-cysteine conversion, and is assayed with cystathionine. PM5-F2. |
| Cysteine is the product; glutathione synthesis is downstream | Supported as a boundary | PM5-F2 and PM5-F4. Cysteine is a poor CGL substrate in Steegborn. Glutathione assembly is PM6. |
| Gregory associations measure CBS/CGL flux or prove that B6 intake controls flux | Not supported, because the record does not resolve | No resolvable Gregory study was available to interpret. PM5-IC1 uses the enzyme and salvage evidence that does exist: cofactor dependence and salvage are not flux and are not an intake-response. |
| This conversion modulates stress reactivity or treats ADHD or stress | Not shown | PM5-F3. Lukovac is a biomarker contrast, not a pathway or treatment study. Legacy phenome ratings were left unchanged. |
| This conversion measures recovery capacity | Not shown | PM5-F4. Cysteine release is an indirect bridge to later glutathione use. |

Coproducts of cystathionine cleavage (2-oxobutanoate and ammonia) are the curated UniProt P32929 / Rhea RHEA:14005 reaction and were not re-quoted from a primary product table. The public finding therefore says the step produces cysteine, which Zhu and Steegborn support, and does not list those coproducts as if they had been re-assayed here.

## Retrieval

Explicit questions:

1. Does human CBS use both homocysteine and serine, and is the reaction PLP-dependent?
2. Does human CGL cleave cystathionine to release cysteine, and is it PLP-dependent?
3. Do the attached Gregory and Kumar records establish those facts or a B6-intake effect?
4. Is PLP the active form of vitamin B6 supplied from food?

Sources added in `system/bib-additions/brs2-pm5.bib` (not merged into `BRAIN-diet.bib`):

- `belew_cbs_kinetics_2009` — PMID 19010420, DOI `10.1016/j.pep.2008.10.012`
- `meier_cbs_structure_2001` — PMID 11483494, DOI `10.1093/emboj/20.15.3910`
- `zhu_cgl_kinetics_2008` — PMID 18476726, DOI `10.1021/bi800351a`
- `steegborn_cgl_kinetics_1999` — PMID 10212249, DOI `10.1074/jbc.274.18.12675`
- `disalvo_plp_availability_2012` — PMID 22201923, DOI `10.2741/E428`

`lukovac_serum_2024` stays in the main bibliography and on the page.

## Findings

| Id | Role |
|---|---|
| PM5-F1 | CBS condenses homocysteine and serine; PLP is the vitamin B6 cofactor. FM roll-up. |
| PM5-F2 | CGL cleaves cystathionine and releases cysteine. FM roll-up. |
| PM5-IC1 | Cofactor dependence and salvage are not flux and do not prove that vitamin B6 intake controls the pathway. |
| PM5-F3 | Stress Reactivity. Lukovac does not test this pathway or a stress or ADHD treatment. |
| PM5-F4 | Recovery Capacity. Cysteine release is not a recovery measurement. |

## Connections

- §5.1 remains this conversion, then glutathione assembly (PM6).
- §5.2 is `- None listed`. The previous lipid-peroxidation link was a downstream redox inference through glutathione, not a direct relationship in the assessed evidence.
- §5.3 explains PM6 in biological language: cysteine from cystathionine cleavage is consumed when glutathione is assembled, and that assembly sits outside this conversion. The explanation avoids echoing the PM6 title.
- Remethylation (PM1, PM2), SAMe synthesis (PM3), and cycle flux (PM4) are named in the boundaries as other fates and other mechanisms. They are not same-FM siblings, so they are not repeated in §5.3.

## Overview

The claim ceiling did not rise. It remains biochemical necessity without an intake-to-flux result and without a stress, recovery, or ADHD treatment claim. The paragraph was still rewritten because the previous B6-association sentence depended on the unresolvable Gregory record, and the reaction sentences depended on the unresolvable Kumar record. The summary is 67 words. Three bullets cover mechanism boundary, measurement boundary, and biological relevance with the treatment limitation. Mission was left unchanged.

## Stopping rationale

The two reactions, both substrates of CBS, the CGL substrate, cysteine as product, PLP dependence, and the food-to-PLP salvage route are each supported or explicitly bounded. The Gregory record cannot be interpreted because it does not identify a study. A 2011 tracer paper (Lamers et al., moderate vitamin B6 restriction and methionine-cycle kinetics) was located by title as complementary human flux evidence and was not extracted; it is not required to reject an intake-controls-flux claim because no admitted source makes that claim. Further H2S side-reaction literature would leave this PM's canonical conversion. Coverage is sufficient for Stage 2A.

## Change-control notes

- Repair or retire `gregory_homocysteine_2016` and `kumar_transsulfuration_2017` in `static/bibtex/BRAIN-diet.bib`. Not done here.
- Merge `system/bib-additions/brs2-pm5.bib` before those new keys can resolve in the master bibliography.
- Run `findings:sync` and `phenome:sync` for this file when generation is wanted. Public §4.1 currently carries the intro only; Finding cards are in front matter.
- S-adenosylmethionine allosteric activation of CBS was seen in a review abstract (Selhub 1999, PMID 10448523) and was not retrieved as primary evidence. It was not used to widen the PM.
