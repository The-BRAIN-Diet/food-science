# Source reconciliation — local audit only

No PR, preview, production or canonical scientific changes. Detailed JSON preserves original atoms, overlays, citations, limitations, food observations and exact missing metadata.

## Classification check

All 32 records have an explicit scope: 27 KC-relevance and five biochemical-requirement. These are not automatically missing Direct/Derived admissions. Preserve them as scoped relationships.

|Target|Original layer|Disposition|
|---|---|---|
|BRS1-FM1-PM2|tryptophan|biochemical-requirement|preserve-existing-layer-no-automatic-direct-derived-classification|
|BRS1-FM1-PM2|tyrosine|biochemical-requirement|preserve-existing-layer-no-automatic-direct-derived-classification|
|BRS1-FM1-PM3|betaine|kc-relevance|preserve-existing-layer-no-automatic-direct-derived-classification|
|BRS1-FM1-PM3|choline|kc-relevance|preserve-existing-layer-no-automatic-direct-derived-classification|
|BRS1-FM1-PM3|phenylalanine|kc-relevance|preserve-existing-layer-no-automatic-direct-derived-classification|
|BRS1-FM1-PM3|vitamin-b9|kc-relevance|preserve-existing-layer-no-automatic-direct-derived-classification|
|BRS1-FM1-PM4|betaine|kc-relevance|preserve-existing-layer-no-automatic-direct-derived-classification|
|BRS1-FM1-PM4|choline|kc-relevance|preserve-existing-layer-no-automatic-direct-derived-classification|
|BRS1-FM1-PM4|phenylalanine|kc-relevance|preserve-existing-layer-no-automatic-direct-derived-classification|
|BRS1-FM1-PM4|tyrosine|kc-relevance|preserve-existing-layer-no-automatic-direct-derived-classification|
|BRS1-FM1-PM4|vitamin-b9|kc-relevance|preserve-existing-layer-no-automatic-direct-derived-classification|
|BRS1-FM2-PM6|vitamin-b5|biochemical-requirement|preserve-existing-layer-no-automatic-direct-derived-classification|
|BRS1-FM2-PM6|vitamin-b9|kc-relevance|preserve-existing-layer-no-automatic-direct-derived-classification|
|BRS1-FM3-PM7|betaine|kc-relevance|preserve-existing-layer-no-automatic-direct-derived-classification|
|BRS1-FM3-PM7|choline|kc-relevance|preserve-existing-layer-no-automatic-direct-derived-classification|
|BRS1-FM3-PM7|vitamin-b9|kc-relevance|preserve-existing-layer-no-automatic-direct-derived-classification|
|BRS2-FM1-PM3|betaine|kc-relevance|preserve-existing-layer-no-automatic-direct-derived-classification|
|BRS2-FM1-PM3|choline|kc-relevance|preserve-existing-layer-no-automatic-direct-derived-classification|
|BRS2-FM1-PM3|vitamin-b9|kc-relevance|preserve-existing-layer-no-automatic-direct-derived-classification|
|BRS2-FM1-PM4|betaine|kc-relevance|preserve-existing-layer-no-automatic-direct-derived-classification|
|BRS2-FM1-PM4|choline|kc-relevance|preserve-existing-layer-no-automatic-direct-derived-classification|
|BRS2-FM2-PM5|methionine|biochemical-requirement|preserve-existing-layer-no-automatic-direct-derived-classification|
|BRS2-FM2-PM5|serine|biochemical-requirement|preserve-existing-layer-no-automatic-direct-derived-classification|
|BRS2-FM3-PM7|betaine|kc-relevance|preserve-existing-layer-no-automatic-direct-derived-classification|
|BRS2-FM3-PM7|vitamin-b9|kc-relevance|preserve-existing-layer-no-automatic-direct-derived-classification|
|BRS3-FM1-PM1|cysteine|kc-relevance|preserve-existing-layer-no-automatic-direct-derived-classification|
|BRS3-FM1-PM1|glycine|kc-relevance|preserve-existing-layer-no-automatic-direct-derived-classification|
|BRS3-FM1-PM2|cysteine|kc-relevance|preserve-existing-layer-no-automatic-direct-derived-classification|
|BRS3-FM1-PM2|glycine|kc-relevance|preserve-existing-layer-no-automatic-direct-derived-classification|
|BRS5-FM1-PM1|fructo-galacto-oligosaccharides|kc-relevance|preserve-existing-layer-no-automatic-direct-derived-classification|
|BRS5-FM1-PM1|pectin|kc-relevance|preserve-existing-layer-no-automatic-direct-derived-classification|
|BRS5-FM1-PM1|resistant-starch|kc-relevance|preserve-existing-layer-no-automatic-direct-derived-classification|

## Eighteen declared conversions

All eighteen retain explicit Derived overlays and references. All lack the newer PM-specific structured assessment; three also lack a resolved input substance identity. Do not equate metadata incompleteness with absent scientific evidence.

|Relationship|Input → target|Missing|Original citations|
|---|---|---|---|
|BRS1-FM1-PM3::PM3-DIT-3|vitamin-b6 → pyridoxal-5-phosphate|PM-specific dietary_input_assessments entry; structured conversion_pathway with process, evidence, dependencies and limitations; active_target_id for endpoint matching|kennedy_b_2016, spector_vitamin_1978|
|BRS1-FM1-PM4::PM4-DIT-3|vitamin-b6 → pyridoxal-5-phosphate|PM-specific dietary_input_assessments entry; structured conversion_pathway with process, evidence, dependencies and limitations; active_target_id for endpoint matching|kennedy_b_2016, spector_vitamin_1978|
|BRS1-FM1-PM5::PM5-DIT-4|vitamin-b6 → pyridoxal-5-phosphate|PM-specific dietary_input_assessments entry; structured conversion_pathway with process, evidence, dependencies and limitations; active_target_id for endpoint matching|kennedy_b_2016, spector_vitamin_1978|
|BRS1-FM2-PM6::PM6-DIT-2|phosphatidylcholine → choline|PM-specific dietary_input_assessments entry; structured conversion_pathway with process, evidence, dependencies and limitations; active_target_id for endpoint matching|bockmann_choline_supplements_2023|
|BRS2-FM1-PM1::PM1-DIT-2|vitamin-b9 → 5-methyltetrahydrofolate|PM-specific dietary_input_assessments entry; structured conversion_pathway with process, evidence, dependencies and limitations; active_target_id for endpoint matching|froese_vitamin_2019|
|BRS2-FM1-PM1::PM1-DIT-4|vitamin-b12 → methylcobalamin|PM-specific dietary_input_assessments entry; structured conversion_pathway with process, evidence, dependencies and limitations; active_target_id for endpoint matching|froese_vitamin_2019|
|BRS2-FM1-PM2::PM2-DIT-2|choline → betaine|PM-specific dietary_input_assessments entry; structured conversion_pathway with process, evidence, dependencies and limitations; active_target_id for endpoint matching|obeid_metabolic_2013, salvi_choline_2013, evans_betaine_2002|
|BRS2-FM1-PM3::PM3-DIT-5|Dietary protein → methionine|PM-specific dietary_input_assessments entry; structured conversion_pathway with process, evidence, dependencies and limitations; active_target_id for endpoint matching; resolved source substance identity (class/mixture must not be substituted)|fao_diaas_2013|
|BRS2-FM1-PM4::PM4-DIT-2|Dietary protein → methionine|PM-specific dietary_input_assessments entry; structured conversion_pathway with process, evidence, dependencies and limitations; active_target_id for endpoint matching; resolved source substance identity (class/mixture must not be substituted)|fao_diaas_2013, finkelstein_homocysteine_1998|
|BRS2-FM2-PM5::PM5-DIT-2|vitamin-b6 → pyridoxal-5-phosphate|PM-specific dietary_input_assessments entry; structured conversion_pathway with process, evidence, dependencies and limitations; active_target_id for endpoint matching|disalvo_plp_availability_2012, belew_cbs_kinetics_2009, zhu_cgl_kinetics_2008, lamers_vitamin_b6_methionine_cycle_2011|
|BRS2-FM2-PM6::PM6-DIT-9|methionine → cysteine|PM-specific dietary_input_assessments entry; structured conversion_pathway with process, evidence, dependencies and limitations; active_target_id for endpoint matching|lyons_glutathione_2000, courtney_martin_cysteine_2008|
|BRS2-FM2-PM6::PM6-DIT-7|n-acetylcysteine → cysteine|PM-specific dietary_input_assessments entry; structured conversion_pathway with process, evidence, dependencies and limitations; active_target_id for endpoint matching|sekhar_glutathione_2011|
|BRS2-FM3-PM7::PM7-DIT-4|phosphatidylcholine → choline|PM-specific dietary_input_assessments entry; structured conversion_pathway with process, evidence, dependencies and limitations; active_target_id for endpoint matching|bockmann_choline_supplements_2023|
|BRS4-FM1-PM1::PM1-DIT-3|vitamin-b2 → flavin-mononucleotide|PM-specific dietary_input_assessments entry; structured conversion_pathway with process, evidence, dependencies and limitations; active_target_id for endpoint matching|curtabbi_complex_i_fmn_2022|
|BRS4-FM1-PM2::PM2-DIT-3|tryptophan → nicotinamide|PM-specific dietary_input_assessments entry; structured conversion_pathway with process, evidence, dependencies and limitations; active_target_id for endpoint matching|covarrubias_nad_2021|
|BRS5-FM1-PM1::PM1-DIT-2|Fermentable dietary fibre → butyrate|PM-specific dietary_input_assessments entry; structured conversion_pathway with process, evidence, dependencies and limitations; active_target_id for endpoint matching; resolved source substance identity (class/mixture must not be substituted)|silva_role_2020|
|BRS5-FM1-PM1::PM1-DIT-4|vitamin-a → retinoic-acid|PM-specific dietary_input_assessments entry; structured conversion_pathway with process, evidence, dependencies and limitations; active_target_id for endpoint matching|cantorna_vitamin_2019, li_retinoid_junction_2017|
|BRS5-FM2-PM6::PM6-DIT-2|ellagitannins → ellagic-acid|PM-specific dietary_input_assessments entry; structured conversion_pathway with process, evidence, dependencies and limitations; active_target_id for endpoint matching|singh_direct_2022|

## Remaining network identities after phenylalanine correction

42 identities; no direct-food ranking is inferred from a Derived route.

|Substance|PMs|Source diagnosis|
|---|---|---|
|5-methyltetrahydrofolate|BRS2-FM1-PM1|explicit-ranking-hold-and-form-equivalence-review|
|acetate|BRS5-FM2-PM5|contextual-or-candidate-only-no-new-admission|
|acetic-acid|BRS6-FM1-PM1|contextual-or-candidate-only-no-new-admission|
|acetoacetate|BRS4-FM3-PM7|retain-existing-verified-derived-route|
|arabinan|BRS5-FM2-PM4|legitimate-protocol-or-biological-ranking-restriction|
|betaine|BRS1-FM1-PM3, BRS1-FM1-PM4, BRS1-FM3-PM7, BRS2-FM1-PM2, BRS2-FM1-PM3, BRS2-FM1-PM4, BRS2-FM3-PM7|held-composition-and-preparation-review|
|butyrate|BRS5-FM1-PM1, BRS5-FM2-PM4, BRS5-FM2-PM5, BRS6-FM1-PM3|declared-fibre-route-unresolved-identity-no-product-dose|
|caprylic-triglyceride|BRS4-FM3-PM7|legitimate-protocol-or-biological-ranking-restriction|
|coq10|BRS4-FM1-PM10, BRS4-FM2-PM5|retain-existing-verified-derived-route|
|creatine|BRS4-FM1-PM3|retain-existing-verified-derived-route|
|cysteine|BRS2-FM2-PM6, BRS3-FM1-PM1, BRS3-FM1-PM2|documented-presence-without-verified-comparable-quantity|
|ellagic-acid|BRS5-FM2-PM6|single-juice-observation-held-no-mass-conversion|
|ellagitannins|BRS5-FM2-PM6|class-specific-juice-observation-and-presence-only-walnuts|
|epicatechin|BRS5-FM2-PM6|unverified-estimates-not-analytical-ranking|
|flavin-adenine-dinucleotide|BRS1-FM1-PM3, BRS1-FM1-PM4, BRS1-FM1-PM5, BRS2-FM1-PM1, BRS3-FM2-PM6, BRS4-FM1-PM10|retain-existing-verified-derived-route|
|flavin-mononucleotide|BRS4-FM1-PM1|documented-presence-without-verified-comparable-quantity|
|fructo-galacto-oligosaccharides|BRS5-FM1-PM1, BRS5-FM2-PM5|legitimate-protocol-or-biological-ranking-restriction|
|glucose|BRS5-FM3-PM7|legitimate-protocol-or-biological-ranking-restriction|
|glutamate|BRS1-FM4-PM9, BRS2-FM2-PM6, BRS5-FM3-PM7|documented-presence-without-verified-comparable-quantity|
|glutamine|BRS5-FM1-PM1|documented-presence-without-verified-comparable-quantity|
|glycine|BRS2-FM1-PM4, BRS2-FM2-PM6, BRS3-FM1-PM1, BRS3-FM1-PM2, BRS4-FM1-PM3|unpublished-composition-requires-source-publication-review|
|inulin|BRS5-FM2-PM4, BRS5-FM2-PM5|single-dry-matter-observation-not-fresh-food-value|
|l-carnitine|BRS4-FM3-PM6|no-canonical-quantitative-food-join|
|n-acetylcysteine|BRS2-FM2-PM6|legitimate-protocol-or-biological-ranking-restriction|
|nad-plus|BRS4-FM1-PM2|retain-existing-verified-derived-route|
|nicotinamide|BRS4-FM1-PM2|form-specific-food-composition-gap-no-total-niacin-substitution|
|nicotinamide-riboside|BRS4-FM1-PM2|documented-presence-without-verified-comparable-quantity|
|nicotinic-acid|BRS4-FM1-PM2|form-specific-food-composition-gap-no-total-niacin-substitution|
|oligofructose|BRS3-FM1-PM2, BRS5-FM1-PM2|legitimate-protocol-or-biological-ranking-restriction|
|pectin|BRS5-FM1-PM1, BRS5-FM2-PM4, BRS5-FM2-PM5|target-specific-material-restriction-and-presence-only|
|phosphatidylcholine|BRS1-FM2-PM6, BRS2-FM3-PM7|documented-presence-without-verified-comparable-quantity|
|phytate|BRS1-FM1-PM3, BRS1-FM1-PM4, BRS1-FM1-PM5|contextual-intervention-occurrence-not-ranked-dietary-target|
|propionate|BRS5-FM2-PM5|contextual-or-candidate-only-no-new-admission|
|pyridoxal-5-phosphate|BRS1-FM1-PM3, BRS1-FM1-PM4, BRS1-FM1-PM5, BRS1-FM4-PM9, BRS2-FM2-PM5, BRS5-FM3-PM8|retain-existing-verified-derived-route|
|resistant-starch|BRS5-FM1-PM1, BRS5-FM2-PM4, BRS5-FM2-PM5, BRS6-FM1-PM3|protocol-restriction-and-range-only-food-records|
|retinoic-acid|BRS5-FM1-PM1|declared-vitamin-a-route-no-direct-product-admission|
|s-adenosylmethionine|BRS-X(Circadian-FM1-PM3), BRS2-FM3-PM7, BRS4-FM1-PM10, BRS4-FM1-PM3|retain-existing-verified-derived-route|
|serine|BRS2-FM2-PM5|biochemical-layer-and-no-food-observations|
|scfas|BRS5-FM2-PM4, BRS5-FM2-PM5|contextual-or-candidate-only-no-new-admission|
|sulforaphane|BRS3-FM2-PM3|documented-presence-without-verified-comparable-quantity|
|uridine|BRS1-FM5-PM12, BRS2-FM3-PM7|documented-presence-without-verified-comparable-quantity|
|urolithin-a|BRS5-FM2-PM6|contextual-or-candidate-only-no-new-admission|
