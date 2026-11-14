# Focused follow-up: pectin, sulforaphane and unrankable measurements

9 November 2026. Investigation/proposal only on audit/dietary-connectivity-2026-11-09. No scientific, renderer or generated-data edits.

## Confirmed narrow defects

Sulforaphane: BRS3-FM2-PM3 already has two food targets, broccoli and broccoli sprouts. Both carry supported evidence, original references and product_or_preparation_dependent presence status. The documented-source helper rejects that status. In-memory acceptance of that exact status restores both sources without changing admissions, quantities or rankings. Require supported evidence and retain material/preparation qualifications; do not broadly accept arbitrary statuses. Original references: Okunade 2018 DOI 10.1002/mnfr.201700980 and the existing sprout source PMC6085252. This is inspection of saved canonical evidence, not new full-text verification.

Pectin: apples have an existing public qualitative record supported by Liu 2023, already linked at the food-page bibliography (#liu_apple_pectin_2023). The structured occurrence lacks a machine-readable citation and recognized presence status. Normalize the already-supported occurrence and attach that existing citation. Never use USDA total fibre as pectin. BRS5 PM5 has one apple target; PM4 has an explicitly empty list because it requires citrus pectin. PM1 is an existing KC-relevance row with dietary_input=true, not a newly classified Direct admission. Preserve its exact scope when presenting a source. Expected effect is one apple connection for PM5 and one under PM1's existing scope; PM4 stays empty. Confirm through regression tests before recording implemented totals.

Expected combined change, if approved/implemented: +4 documented triples, +2 substances and +3 input-target pairs; 200→204 documented triples, 40→42 food-covered substances, 128→131 targets. Ranked 960 stays unchanged. Including current completed Derived routes: 44→46 substances. These are projections, not current results.

## Proposed measured-but-unrankable display

Keep the existing Documented, unranked sources disclosure. For eligible public measured records, show original amount/range, unit, denominator, material/preparation, citation and explicit reason: Measured — not ranked: [single comparable source / incompatible measurement basis / source-specific range]. Do not assign rank or RSP. Reserve Quantity not established — not ranked for qualitative occurrence only.

Candidates: 5-MTHF, ellagic acid, inulin and resistant starch. Preserve every source-specific observation; do not average duplicate kale/spinach studies, convert juice volume without density, mix dry and edible weight, or midpoint ranges. Existing BRS6 resistant-starch protocol hold remains. A ranking failure is not automatically public eligibility: publication holds, target scope and chemical identity still govern. Do not use this change to list all below-threshold foods or sources omitted solely by the ten-food cap.

This extends the current qualitative-only public contract. Author approval is required under AGENTS.md and system/presentation-change-control.md before implementation. Update system/input-substance-food-mapping.md, the Stage 2A scientific-finding schema and Stage 2B dietary-input traceability contract together; retain the existing component and approval history. No new panel is proposed.

## Classification of the remaining 24

- Narrow mapping/presentation corrections (2): pectin, sulforaphane.
- Measured-but-unrankable presentation decision (4): 5-MTHF, ellagic acid, inulin, resistant starch.
- Form-specific source/mapping investigation, not yet a verified defect (3): L-carnitine, nicotinamide, nicotinic acid.
- Existing scientific/scope decisions (5): butyrate, FOS/GOS, retinoic acid, serine, urolithin A.
- Legitimate exclusions from ordinary ranked-food coverage (10): acetate, acetic acid, acetoacetate, caprylic triglyceride, glucose, NAC, oligofructose, phytate, propionate, SCFAs. This does not erase contextual SOP links or pending conversion metadata; NAC still has a pending conversion reconciliation.

No new research, build, PR update, commit, push or deployment. Current counts remain unchanged.
