# BRS2-FM1-PM4 Methionine Cycle Flux — Stage 2A Report

## Scope

This pass assessed integrated methionine-cycle throughput and the split of homocysteine between remethylation and transsulfuration. MAT catalysis, folate/B12 remethylation, betaine remethylation, and the transsulfuration enzyme steps stay with PM3, PM1, PM2, and PM5. Attached sources were tested against the propositions. Listing a source was not treated as support.

The claim ceiling stays biological dependency. The Overview was corrected so the branch and the concentration-versus-rate boundary cite the sources that support them. It does not add a dietary or treatment claim.

## Propositions and dispositions

| Proposition | Disposition | Evidence |
|---|---|---|
| Cycle runs methionine → SAM → methyl transfer → SAH → homocysteine, then remethylation or transsulfuration | Supported | Chiang et al. (1996) establish SAM donation and SAH hydrolysis to adenosine and homocysteine. Finkelstein (1998) establishes remethylation in every tissue and transsulfuration to cystathionine in liver, kidney, small intestine, and pancreas. Lamers et al. (2011) measure that partition as human postprandial rates. |
| SAM, SAH, and methyl-tetrahydrofolate are effectors of the split; SAH hydrolysis is shared across many methylations | Supported, narrower than a SAM:SAH ratio claim | Chiang: blocking SAH hydrolysis can affect methylation of phospholipids, proteins, DNA, RNA, and small molecules together. The abstract does not state a SAM:SAH ratio or the words “product inhibitor.” Finkelstein names AdoMet, AdoHcy, and methylTHF as effectors of homocysteine distribution. |
| Metabolite concentrations are not branch rates | Supported as PM4-IC1 | Collaboration (1998) and Huang et al. (2015) change blood homocysteine concentration. Lamers et al. (2011): cystathionine concentration rose while mean total transsulfuration rate did not. |
| Methionine-restriction literature is an ADHD or cognitive treatment claim | Out of scope | Fanti et al. (2026) is a mouse longevity diet plus human epidemiology. Parkhitko et al. (2026) reviews methionine restriction for ageing. Neither measures cycle rates or an attention or cognitive treatment effect. Retained as connected evidence on PM4-F1, not as headline findings. |
| Homocysteine or B-vitamin associations establish that cycle rates modulate Cognitive Clarity or Focus / Attention Stability | Not established | Luzzi et al. (2022) and Yu et al. (2020) concern homocysteine level and dementia or Alzheimer risk. Lukovac et al. (2024) and Wang et al. (2019) are ADHD concentration and dietary-pattern associations. PM4-F3 and PM4-F4 record the gap. Legacy phenome confidence values were left unchanged. |
| Aragão et al. (2024) supports cycle flux | Does not support | The paper is a general riboflavin physiology review. It does not test cycle throughput or the homocysteine split. |
| Kumar et al. (2017) establishes the integrated split | Not used as primary evidence | The repository abstract describes transsulfuration from homocysteine toward cysteine and glutathione. It does not establish remethylation or the regulated split. The stated DOI did not resolve in Crossref. Connected evidence only. |

## Findings

| Id | Role |
|---|---|
| PM4-F1 | Integrated route and regulated homocysteine split. FM roll-up. |
| PM4-F2 | Moderate vitamin B6 restriction did not change mean postprandial remethylation, transmethylation, or total transsulfuration rates. |
| PM4-IC1 | Concentrations are not those rates. |
| PM4-F3 | Cognitive Clarity relationship is a homocysteine-level bridge, not a rate result. |
| PM4-F4 | ADHD homocysteine and B-vitamin associations are not rate results. |

Confidence on every finding is `not-yet-scored`.

Phenome id lists: Cognitive Clarity — PM4-F1, PM4-IC1, PM4-F3. Focus / Attention Stability — PM4-F1, PM4-IC1, PM4-F4.

## Retrieval

Questions:

1. Does the attached corpus establish the regulated split of homocysteine between remethylation and transsulfuration, or only methyl transfer and a transsulfuration review?
2. Is there a human measurement in which a metabolite concentration and a cycle rate move differently?

Retrieved:

- Finkelstein (1998), DOI `10.1007/pl00014300`, PMID 9587024. Defines the split and the effectors. Sidecar key `finkelstein_homocysteine_1998`.
- Lamers et al. (2011), DOI `10.3945/jn.110.134197`, PMID 21430249. Nine healthy adults; 28-day vitamin B6 restriction; mean rates unchanged; cystathionine concentration and fractional synthesis rose. Sidecar key `lamers_vitamin_b6_methionine_cycle_2011`.

A folate-depletion tracer query did not surface a clear human rate study in the first results and was stopped. Chiang’s abstract was retrieved in full from Europe PMC and does not contain a SAM:SAH ratio.

## Connections

Local explanations, with direction:

- PM1 and PM2 are the recycling exits from the branch.
- PM3 produces the SAM that throughput then uses.
- PM5 carries the catabolic exit after the branch directs homocysteine into transsulfuration.

Cross-BRS links to acetylcholine synthesis and neuronal membrane DHA incorporation were dropped. The attached corpus does not show that integrated cycle rates constrain those mechanisms. The animal folate and methionine-synthase-reductase evidence for brain choline and acetylcholine is maintained on BRS1-FM2-PM6 and is not reprinted here.

## Overview check

The paragraph states the route, the tissue limit on transsulfuration, the effectors, and the separation of pool state from branch rates, with citations beside those claims. Three bullets cover the mechanism boundary, the concentration-versus-rate boundary, and the absence of a cognitive or attention treatment claim. Count of the paragraph without citation tokens is 69 words. The ceiling is unchanged: biological dependency, no treatment claim.

## Stopping rationale

The defining sequence, the regulated split, the human rate partition, and the concentration-versus-rate boundary are each adjudicated. Phenome sources were tested and bounded. Methionine-restriction papers were classified as out of scope for a treatment claim. Further dementia, ADHD biomarker, or ageing-restriction papers would not convert concentration associations into branch rates. A human tracer study of methyl-donor or methionine-pool inadequacy against those rates would be a Stage 2B question, not another missing step in the cycle sequence.

## Change-control notes

Recorded here only. The change-control queue was not edited.

- Legacy phenome confidence remains low-medium. The adjudicated relationship is a translational bridge with a direct rate-to-phenome gap.
- Previous public label “Kumar and Yadav (2017)” does not match the bibliography authors. Display is now Kumar et al. (2017). The DOI on that record did not resolve.
- Cross-BRS acetylcholine and DHA links removed.
- Inherited `timing_specific: Yes` had no timing evidence and is now `No`.
- New keys live only in `system/bib-additions/brs2-pm4.bib` and are not yet in `static/bibtex/BRAIN-diet.bib`.
