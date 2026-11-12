# PM food-source visibility correction — local author review

Author approval: “Correct PM Food-Source Visibility Regression”, 9 November 2026. Implementation on audit/dietary-connectivity-2026-11-09, HEAD af13bec1; uncommitted, no PR modification.

## Change and scope

Existing PM food renderer gains a separately labelled Documented, unranked sources disclosure after its shared ranked sources. Ranked labels identify the quantitative layer. No new scientific atom. Source: existing generated canonical PM food-target joins and source occurrence records. All PMs with admitted dietary inputs are eligible; the current snapshot yields qualitative rows on 35 PMs. Ranking algorithm, snapshot, wheel, admissions, SEC and scientific source files are unchanged by this correction.

Source records require explicit supported qualitative occurrence plus evidence/provenance. No unsupported tags, provisional mappings, empty blocked joins, or biochemical-only entries are restored. Quantified observations do not become “quantity not established” merely because ranking excludes them. Hidden supplementary annotations remain hidden; separately public canonical contains assertions remain eligible. Provenance and limitations remain accessible in the existing source-qualification disclosure style. Ranked pairs are not repeated as unranked.

Grouping uses the canonical food ID rather than evidence prose (trout roe animal; tahini plant). Quantitative ranking remains capped globally before grouping.

## Before/after

Comparison against the current local post-Review01 approved snapshot, not the older PR preview:

| Connection layer | Before | After |
|---|---:|---:|
| Ranked food–substance–PM triples | 960 | 960 |
| Documented-unranked food–substance–PM triples | 0 | 200 |

Ranked coverage remains 70 foods, 112/151 targets. The PR preview remains untouched at its earlier snapshot. Unranked counts do not enter the wheel, RSP, or ranked target coverage. Count unique food/substance/PM triples; retain material/form-specific provenance in displayed rows. Full ledger: counts.json.

| PM7 input | Ranked | Documented unranked |
|---|---:|---|
| PC | 0 | 6: mussels, oysters, salmon roe, soy lecithin, sunflower lecithin, trout roe |
| Uridine | 0 | 1: milk, preserving free uridine versus UMP/total nucleotides and systemic-delivery limitations |
| Choline | 8 | 6: salmon roe, sunflower lecithin, tempeh, tofu, trout roe, wheat germ; original preparation/category qualifications retained |
| Betaine | 5 | 1: shrimp; newer locally approved measurements remain separate from this presentation change |
| Methionine | 10 | 0 |
| SAMe, PE, CTP, DAG | 0 | 0; no dietary admission inferred |

## Representative rendering and validation

`pm7-example.html` is a local HTML fixture generated with the actual documented-source renderer, containing ranked data from the unchanged shared snapshot. It is not a production build or a full PM integration preview.

Focused regression suite: 16/16 passed (new visibility cases, withdrawn pathway-panel guard, prior Review01 preservation). Tests cover provenance/uridine qualifications, six PC sources, choline coexistence, methionine, betaine, non-admitted participants, hidden/unsupported/held records, deduplication and identity-based grouping. Contract and Stage 2A/2B instructions updated to record this approved distinction; the baseline is not regenerated.

No build, deployment, commit, push or current PR modification. Broader mapper results and presentation gate recorded in validation notes after execution.

Final validation: 18/18 focused checks pass; presentation gate passes (691 protected files). Broader mapper: 37/41, with exactly the same four failure names recorded in `review/food-wheel-top-ten-2026-11-09/release-validation-baseline.json` (meal-pattern fixture, sixth-field fixture, rollout fixture, food-strategy fixture). No baseline suppression. Review01's old blanket approval-file equality assertion was updated to preserve every historical approval while allowing only the explicitly authorised renderer correction; SEC/static-asset equality remains required.

Browser limitation: the in-app browser blocked opening the local file fixture under its URL security policy. No workaround, server, build or deployment was attempted. HTML rendering/qualification assertions passed; full PM browser integration remains to be visually reviewed before publication. Earlier 16-test checkpoint above preceded the final two preservation/whole-scope checks.
