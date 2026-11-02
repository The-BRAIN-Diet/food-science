# Cooked-egg SOP: existing contract clarification — 2 November 2026

No schema, admission rule, Finding or SEC assessment changed for this clarification.

## Governing rules

- `system/dietary-input-traceability-contract.md:446`: an SOP may influence the PM-governed state directly or through an evidence-supported connected mechanism.
- Same contract, lines 1780–1825: SOP/Lifestyle relationships carry six atoms; write the measured proximal effect separately from its PM relevance. Proximity is not proof of delivery to a downstream tissue.
- `system/primary-mechanism-schema.md:899`: evidence-qualified SOPs use `system_optimisation_practices`; categories carry their measured-effect boundary.
- `scripts/lib/dietary-input-traceability.mjs:242–263`: each SOP/Lifestyle record must name an existing Finding and PM bibliography source. There is no one-new-Finding-per-intervention requirement. ID validity is necessary but does not prove semantic relevance.
- `src/lib/dietaryConfidence.mjs:8–24`: Dietary Confidence is an assessment of eligible dietary-input relationships, not an automatic SOP score. The SOP disclosure does not inherit an SF SEC score.

## Actual relationship and independent evidence

`PM1-SOP-COOKED-EGG-1` links `PM1-F1` as the existing circulating amino-acid-provision mechanism. F1's current synthesis concerns phenylalanine provision and context-dependent source responses; it is not represented as having appraised the egg experiments. The SOP's own citation keys are `fuchs_raw_eggs_2022` and `evenepoel_digestibility_1998`, now PM references 24–25. Its biological_role and evidence_limitation record its separate preparation proposition. This memo and the PM1 review preserve the admission reasoning.

The scientific chain stops at circulating provision: cooked egg protein → digestion and postprandial amino-acid response → PM1 meal-level supply. It does not establish neuronal delivery, transmitter synthesis or a clinical effect.

## Endpoint separation

Evenepoel et al. (1998), DOI 10.1093/jn/128.10.1716: true ileal protein digestibility in five ileostomy patients, 25 g labelled egg protein. This is not a plasma or brain measurement.

Fuchs et al. (2022), DOI 10.1093/jn/nxac174: 45 trained young men randomised to five raw eggs, five boiled eggs or control after exercise. Plasma essential-amino-acid concentrations were higher at peak after boiled eggs. These concentrations are not intrinsically labelled dietary amino-acid systemic appearance flux. Muscle protein synthesis did not differ detectably between egg preparations. Neither paper measures neuronal uptake.

## Admission and confidence

The defined raw-versus-boiled preparation effect qualifies as a narrowly worded food-preparation SOP supporting PM1's existing supply mechanism. It does not establish a daily five-egg prescription, superiority of all cooking methods, a neuronal benefit or principal-route dominance. The study-specific effect is supported in the tested setting; generalisability is limited by population, meal and exercise context. No numerical or categorical SOP confidence has been assigned: the inspected six-atom contract does not define a separate mandatory SOP confidence rubric. Do not substitute F1's SEC for appraisal of the new studies.

The explicit implementation ambiguity is that `finding_ids` does not distinguish mechanistic-home linkage from an exact intervention appraisal. Current schema permits separate original citation keys but cannot enforce semantic appropriateness. Human-readable appraisal must keep these roles clear. A future role-typed schema would require separate approval; none is introduced here.

## Food reuse and consistency

`docs/foods/eggs.md:303–307` already describes both preparation effects; original references 1–2 are at lines 325–327. Reuse the original publications, not the food page as primary evidence. Initial discovery in this execution was external; subsequent food-page overlap is recorded honestly.

Apply the same rule to all pending SOP and Lifestyle candidates. Earlier notes demanding a new SF solely because a new paper exists are superseded. A new citation still cannot be attached to an unrelated Finding just to pass validation. No isolated mandatory brain or clinical-benefit gate is added.
