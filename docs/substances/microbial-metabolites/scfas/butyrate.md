---
formation_pathways:
  - id: RS-MICROBIAL-BUTYRATE
    from: resistant-starch
    to: butyrate
    relationship: microbial-formation
    status: supported
    process: Microbial resistant-starch utilisation and community cross-feeding can contribute to butyrate formation
    dependencies:
      - Accessible resistant-starch preparation reaching the colon
      - Capable primary degraders and butyrate-producing community members
      - Suitable anaerobic fermentation environment
    evidence:
      statement: >-
        RS2/RS3 utilisation and fermentation studies support community-dependent production; food composition
        is separately established.
      sources:
        - https://doi.org/10.1038/ismej.2012.4
        - https://doi.org/10.1002/mnfr.200600106
    limitations: >-
      Defined starch preparations and microbial contexts; no conversion yield, guaranteed butyrate response
      from bananas, potatoes or legumes, or established PM1 tight-junction mediation. Ruminococcus bromii
      degradation is not itself proof of butyrate production.
    pm_evidence_refs:
      - BRS5-FM2-PM5::PM5-F1
    downstream_review: BRS5-FM1-PM1::PM1-H1
  - id: FOS-GOS-BUTYRATE-REVIEW
    from: fructo-galacto-oligosaccharides
    to: butyrate
    relationship: microbial-formation
    status: unresolved
    process: Proposed microbial fermentation of the studied FOS/GOS mixture
    dependencies:
      - Defined mixture
      - Appropriate microbial community and colonic exposure
    evidence:
      statement: >-
        Current source adjudication does not establish the mixture-specific butyrate-production claim;
        anatomical and indirect/modelled endpoints remain distinct.
      sources:
        - https://doi.org/10.1016/j.isci.2024.109208
    limitations: >-
      Unresolved conversion/admission; neither an ileal null nor indirect metabolite estimates establish or
      disprove colonic substrate-to-butyrate conversion. Not an active pathway.
    pm_evidence_refs:
      - BRS5-FM2-PM5::PM5-DIT-2
id: butyrate
title: Butyrate
sidebar_label: Butyrate
description: 'Key SCFA supporting mitochondrial function, gut barrier integrity, and neuroinflammation reduction'
tags:
  - Substance
  - Metabolite
  - SCFAs
  - SCFA
  - Butyrate
  - Gut-Brain Axis & Enteric Nervous System
  - Mitochondrial Function & Bioenergetics
  - Inflammation & Oxidative Stress
  - Metabolic & Neuroendocrine Regulation
list_image: /img/inchi/FERIUCNNQQJTOY-UHFFFAOYSA-M.png
mechanisms:
  Gut-Brain Axis & Enteric Nervous System: 'Microbially produced SCFA and colonocyte energy substrate; PM1 evidence links direct butyrate exposure to epithelial tight-junction assembly.'
  Mitochondrial Function & Bioenergetics: 'Acts as an energy substrate in colonocytes and has model-dependent mitochondrial effects; systemic and brain effects require exposure-specific qualification.'
  Inflammation & Oxidative Stress: 'Immune and redox findings vary by model, dose and route and must not be inferred from fibre intake alone.'
  Metabolic & Neuroendocrine Regulation: 'SCFA signalling can intersect with glucose and lipid regulation; dietary substrate, microbial production and direct administration are distinct exposures.'
inchikey: FERIUCNNQQJTOY-UHFFFAOYSA-M
inchi_image: /img/inchi/FERIUCNNQQJTOY-UHFFFAOYSA-M.png
---

## Overview

Butyrate is a short-chain fatty acid produced principally in the colon when microbes ferment suitable dietary substrates. It is an important colonocyte energy source and can influence epithelial barrier, immune and metabolic signalling. Within BRAIN, Butyrate is represented both as a biological input where direct evidence supports it and as a downstream target of fermentable-dietary-input relationships; those are not the same edge [1,2].

Evidence spans cell systems, animal models, human observational work and direct administration, with different doses and routes. Associations between altered SCFA profiles and neurological conditions do not establish deficiency, causality or a dietary treatment effect [3]. Claims about mitochondrial, inflammatory or brain outcomes therefore retain the exposure and model actually studied [3–5].

## Dietary Context

Most Butyrate reaching the colon is produced by gut microbes fermenting suitable dietary substrates [2].

<DietaryPathways targetId="butyrate" />

## Research Spotlights & Evidence Checks

<EvidencePresentation
  kind="spotlight"
  title="How does Butyrate relate to intestinal tight-junction integrity?"
  exposureContext="isolated-substance"
  summary="Direct Butyrate exposure promoted tight-junction assembly in an epithelial model, supporting the PM1 substrate relationship while not establishing an oral intake threshold or an effect of every fermentable food [1]."
>

BRS5-FM1-PM1 preserves Butyrate as a biological substrate record with unresolved dietary applicability, and its historical fermentable-fibre record remains traceable. The complete resistant-starch-derived butyrate → paracellular tight-junction claim remains Hypothesis-1 (Unestablished); separate conversion and cellular observations do not admit this joined dietary route [1,2].

</EvidencePresentation>

## Foods

Upstream substrate foods are displayed separately under Dietary pathways; they do not establish direct Butyrate content.

<SubstanceFoods tag="Butyrate" directOnly />

## Recipes

<SubstanceRecipes tag="Butyrate" />

## Biological Regulatory Systems

| Biological Regulatory System | Evidence-qualified relationship | Evidence |
| --- | --- | --- |
| [Gut-Brain Axis & Enteric Nervous System](/docs/biological-targets/gut-brain-axis-enteric-nervous-system) (BRS5) | PM1 retains the biological substrate and historical fibre records; its joined dietary resistant-starch–butyrate–tight-junction hypothesis remains unestablished | [1,2] |
| [Inflammation & Oxidative Stress](/docs/biological-targets/inflammation-oxidative-stress) (BRS3) | Anti-inflammatory and redox findings are model- and route-dependent; altered SCFA profiles do not establish causality | [3–5] |
| [Mitochondrial Function & Bioenergetics](/docs/biological-targets/mitochondrial-function-bioenergetics) (BRS4) | Mitochondrial effects are supported principally by mechanistic and model evidence rather than ordinary food interventions | [4,5] |

## References

[1] Peng et al. (2009). [Butyrate enhances the intestinal barrier by facilitating tight junction assembly via activation of AMP-activated protein kinase](/docs/papers/BRAIN-Diet-References#peng_butyrate_2009). Supports the direct epithelial-substrate relationship while remaining an experimental model rather than a dietary intake trial.

[2] Silva et al. (2020). [The role of short-chain fatty acids from gut microbiota in gut-brain communication](/docs/papers/BRAIN-Diet-References#silva_role_2020). Supports microbial formation from fermentable substrates and the distinction between upstream dietary provision and downstream Butyrate exposure.

[3] Fan et al. (2019). [Short-chain fatty acids as potential regulators of brain and neurological diseases](/docs/papers/BRAIN-Diet-References#fan_scfa_2019). Reviews neurological associations and mechanisms without establishing a universal Butyrate deficiency or food-treatment claim.

[4] Rose et al. (2018). [Butyrate enhances mitochondrial function during oxidative stress in cell lines from boys with autism](/docs/papers/BRAIN-Diet-References#rose_butyrate_2018). Cell-model evidence relevant to mitochondrial mechanism, not a whole-food or clinical intervention.

[5] Cavaliere et al. (2022). [Butyrate and its role in the gut-brain axis](/docs/papers/BRAIN-Diet-References#cavaliere_butyrate_2022). Reviews route-dependent intestinal, immune and neurological mechanisms used to qualify BRS mappings.

