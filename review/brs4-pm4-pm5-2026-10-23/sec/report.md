# PM4/PM5 — bounded SEC completion, 24 October 2026

Seven Findings now have Codex-assessed provisional SEC; four retain specific unresolved factors. None is labelled scientifically reviewed. The original confidence field remains `not-yet-scored` under the approved backward-compatible architecture; production display resolves the pinned versioned sidecar instead.

| PM / Finding | Exact scoped topic | D / B / P / R | Raw → adjusted /8 | Assessment |
|---|---|---|---|---|
| BRS4-FM2-PM4 / PM4-F1 | Mitochondrial oxidant production is source- and state-dependent | 2 / 1 / 1 / 1 | 5 → 5 | Provisionally assessed |
| BRS4-FM2-PM4 / PM4-F2 | Mitochondrial ROS can carry adaptive signals | 2 / ? / ? / ? | — | Not scored — Recover Guzy figures/methods and appraise control performance and uncertainty; compare Bell/Guzy model and research dependencies before a complete SEC. |
| BRS4-FM2-PM4 / PM4-F3 | High-fat exposure altered mitochondrial H2O2-emitting potential | 2 / 1 / 1 / 0 | 4 → 4 | Provisionally assessed |
| BRS4-FM2-PM4 / PM4-F4 | Inactivity and training changed mitochondrial H2O2 emission | 2 / 1 / 1 / 0 | 4 → 4 | Provisionally assessed |
| BRS4-FM2-PM4 / PM4-F5 | Omega-3 exposure need not reduce mitochondrial ROS emission | 2 / 1 / ? / 0 | — | Not scored — Appraise damage-marker effect estimates/uncertainty against a justified boundary; retain the descriptive non-increase without interpreting equivalence or safety. |
| BRS4-FM2-PM4 / PM4-F6 | Ketones changed oxidant responses in neuronal preparations | 2 / 1 / 1 / 0 | 4 → 4 | Provisionally assessed |
| BRS4-FM2-PM5 / PM5-F1 | Vitamin E protection depends on tissue and stress context | 1 / 1 / 1 / 1 | 4 → 4 | Provisionally assessed |
| BRS4-FM2-PM5 / PM5-F2 | Ubiquinol has a local antioxidant role distinct from electron transport | 2 / 1 / ? / ? | — | Not scored — Recover and appraise full figure-level quantitative reporting and independent historical particle experiments for the exact vitamin-E-independent proposition. |
| BRS4-FM2-PM5 / PM5-F3 | Mitochondrial glutathione requires compartmental transport | 2 / 2 / 2 / 2 | 8 → 8 | Provisionally assessed |
| BRS4-FM2-PM5 / PM5-F4 | SOD2 metal occupancy affects mitochondrial protein injury | 2 / 1 / 2 / 0 | 5 → 5 | Provisionally assessed |
| BRS4-FM2-PM5 / PM5-F5 | Sulforaphane protected mitochondria in defined cell experiments | 2 / ? / ? / 0 | — | Not scored — Recover Oliveira full results, replicate structure, knockdown controls and uncertainty. Keep food absorption evidence separate from protective efficacy. |

The 8/8 for PM5-F3 is confidence in compartmental glutathione import in the tested systems. It does not score oral glutathione, sulfur foods, NAC, mitochondrial antioxidant efficacy, cognition or any food intervention. Vitamin E receives D1 because its mitochondrial membrane-protection synthesis includes respiratory-chain and retinal endpoints requiring an inferential bridge. Herbst's nonsignificant damage-marker result is not established equivalence or safety and remains unscored pending precision appraisal.

## Evidence appraisal and stopping rationale

Reused the full existing PM corpus and primary abstract records. Recovered primary full-text methods/results for source suppression, reperfusion, feeding, immobilisation/retraining, fish oil, ketone mixtures, retinal GPX4, SOD2, and both independent SLC25A39 groups. Individual retrieval attempts, fallback paths and recovered source hashes are retained. Rafique's recovered page contains the abstract and references; its scanned original PDF was not appraised as full text. Forsmark primary PDF methods were inspected through the indexed publisher PDF; figure uncertainty remains unresolved. Guzy and Oliveira remain abstract-led and were not promoted to numerical totals.

Bounded questions: do controls and uncertainty permit factor judgements for the exact proposition; do purported repetitions share a cohort/lab; do human intervention or indirect endpoints actually replicate the mechanism? Targeted searches covered complex-III/HIF (including Bell 2007), vitamin-E/GPX4, vitamin-E-independent ubiquinol protection, SLC25A39, immobilisation/retraining, fish-oil emission, FeSOD2 and the ketone/NADH conjunction. Related reviews, meeting abstracts, recruitment rounds, model arms and nonmatching endpoints were not counted as independent exact-proposition replications. R0 records a single independent line in the specifically assessed body, not a comprehensive claim that no other literature exists. Unresolved historical replication is left null where recovery was inadequate.

Stop after bounded factor completion and explicit gaps; no exhaustive evidence rebuild, new dietary admission or PM redesign was undertaken. Each sidecar preserves the exact original proposition, source roles, evidence locations, factor-specific reasoning, caps, limitations, process/date and follow-up. Existing score snapshots are immutable. Scope allowlist adds only these two user-authorised PMs; anchors, arithmetic and caps are unchanged.

## Preservation and integration

Only SEC pointers and their generated SF presentation change in canonical PM4/PM5. Missions, all SF propositions/source assessments, six atoms, dietary decisions, SOPs, lifestyle records, KCs, Phenomes, references and all food/roll-up datasets are preserved. Numerical SEC is not propagated to dietary or Phenome confidence. No human scientific acceptance is inferred. No commit or merge.

## Files

- Two canonical PM pages: pinned SEC assessment references and regenerated Finding payloads.
- `system/sec-assessments/registry.json`: eleven append-only versioned records.
- `src/lib/secAssessments.mjs`: these two PM IDs added to the existing explicit integration scope.
- `scripts/brs4-pm4-pm5-sec.test.mjs`: focused integrity, completeness, preservation and MDX regression checks.
- Existing reassessment regression: permits only the newly authorised SEC pointer in its scientific-preservation comparison.
- This review directory: assessment snapshots, exact before-pages, previous registry, recovery logs and report.

Validation results are recorded in validation.log and validation-results.json. Production build is not part of this bounded SEC pass; actual MDX compilation, existing SEC integration checks and browser runtime are checked separately.

## Validation outcome

- Focused PM4/PM5 reassessment + SEC regression: **17/17 pass**.
- Broader SEC/audit set: **42/44 pass**. The two older failures are a legacy Finding HTML fixture mismatch and an obsolete `prebuild` prefix assertion. Both reproduce with the pre-change registry; their test, component and package inputs are unchanged from HEAD. They were not repaired in this scoring task.
- SEC immutable-history/reference gate: **80 snapshots valid**, including all prior records unchanged.
- Scientific Findings: **64 PMs checked, zero problems**.
- Both actual canonical MDX documents compile; development client compiled. No full production build attempted.
- Git whitespace check passes. Scientific-preservation comparisons pass.
