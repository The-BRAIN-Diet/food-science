# BRS-X/Circadian — local analytical source strength

17 November 2026. Provisional analysis, not food quality, adequacy, beneficial direction or demonstrated efficacy. No serving-level inference.

Checkout: /Users/paulhouston/.codex/worktrees/pm-recipe-local-review/food-science

Branch: review/pm8-caffeine-neuroeshot-2026-11-16; source commit: d67c181ff6ebec80873e4da581af759e8e98199c. Working tree and complete hashes: [analysis.json](analysis.json), snapshot.input_hash d8b47274f77344a148c3e05fe64c6b9f9db682f9eae21e8cfefe947373fd4eb8. Existing uncommitted BRS1–6 corrections retained; no new composition corrections in this task.

## Rules

Existing builder/scorer used in memory before display caps; stored unrounded RSP ≥20 inclusive, no food cap. RSP = 100 × comparable concentration / highest eligible comparable concentration. Existing minimum-two-food, material, identity, publication and target restrictions preserved. Sum distinct non-overlapping input RSP/100 once per food; protein/amino-acid group uses maximum once; sodium excluded analytically only. PM counts describe coverage and do not multiply points. Combined deduplicates ownership routes, never adds view totals. Full precision calculations; canonical food ID breaks ties. Food-ID aggregates across materials are labelled composite, not interchangeable servings. Source-strength and system-coverage conventions coincide within this one modulator.

All qualified source observations, presence records, exclusions, admission decisions and contextual non-admitted evidence remain in the JSON; contextual evidence supplies no points. The inherited unscored_sources key means sources without retained score rows, including below-threshold sources—not necessarily unavailable RSP. Precise exclusion reasons are listed below. No new equivalences, hypotheses, admissions or ranking policy. Portion-aware/abacus, safety and cross-system totals remain deferred.

## Coverage

| PMs | Structured relationships | Eligible relationships | Eligible inputs | Retained component rows |
| --- | --- | --- | --- | --- |
| 3 | 4 | 1 | 1 | 0 |

| Input | Qualified source contexts | Scored ≥10 before analytical filter | Retained ≥20 before PM holds |
| --- | --- | --- | --- |
| caffeine | 0 | 0 | 0 |

## Admissions and exclusions

| Relationship | Input | Ownership | Eligible | Basis / restriction | Canonical pointer |
| --- | --- | --- | --- | --- | --- |
| BRS-X(Circadian-FM1-PM1)::PM1-DIT-1 | caffeine | A | true | explicit assessment | docs/biological-targets/brs-x/circadian/fm1/brs-x-circadian-fm1-pm1-light-dark-circadian-entrainment.mdx#dietary_input_traceability/PM1-DIT-1 |
| BRS-X(Circadian-FM1-PM3)::PM3-DIT-1 | tryptophan | A | false | dietary input is not Yes | docs/biological-targets/brs-x/circadian/fm1/brs-x-circadian-fm1-pm3-melatonin-biosynthesis-and-availability.mdx#dietary_input_traceability/PM3-DIT-1 |
| BRS-X(Circadian-FM1-PM3)::PM3-DIT-2 | s-adenosylmethionine | E | false | dietary input is not Yes | docs/biological-targets/brs-x/circadian/fm1/brs-x-circadian-fm1-pm3-melatonin-biosynthesis-and-availability.mdx#dietary_input_traceability/PM3-DIT-2 |
| BRS-X(Circadian-FM1-PM3)::PM3-DIT-3 | acetyl-coa | E | false | dietary input is not Yes | docs/biological-targets/brs-x/circadian/fm1/brs-x-circadian-fm1-pm3-melatonin-biosynthesis-and-availability.mdx#dietary_input_traceability/PM3-DIT-3 |

Caffeine is admitted as a disruptive circadian influence, not a nutritional requirement or benefit. The mapper supplies no supported caffeine food record; no concentration points can be assigned. PM3 tryptophan remains Unset; SAM and acetyl-CoA are not admitted dietary inputs. Zero scored foods is a data/admission boundary, not evidence that diet cannot affect circadian timing. The timing SOP is not scored.

## PM-owned

No positive-score foods. This view remains separate.

## upstream-shared

No positive-score foods. This view remains separate.

## combined

No positive-score foods. This view remains separate.

## Exact component observations and winners

| Food | Substance | PM / ownership | RSP | Winner in combined input group | Amount / basis | Material / preparation | Publication | Pointer |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |


## Retained exclusions and unranked evidence

| Substance | Food / record | Reason |
| --- | --- | --- |


| Publication-excluded source | Reason |
| --- | --- |


## Missing data / unresolved relationships

| Kind | Affected record | Reason |
| --- | --- | --- |
| no-structured-admissions | BRS-X(Circadian-FM1-PM2) | No structured accepted dietary inputs; narrative mentions are not admissions. |
| dietary-input-unset | BRS-X(Circadian-FM1-PM3)::PM3-DIT-1 | Dietary input = Unset. Type A derived gate is unresolved because serotonin, N-acetylserotonin and melatonin are not canonical substance identities. No extra-intake claim. |
| mapping-gap | BRS-X(Circadian-FM1-PM1)::PM1-DIT-1 | No supported canonical food-source record found. |

## Validation and interpretation

See [shared validation](../brsx-analytical-rollup-2026-11-17/validation.json): independent direct reconstruction of every food score/rank; exact source/scorer trace; inclusive threshold/ownership/overlap tests; all 768 BRS1–6 results reproduced and 515 preserved files byte-identical. No site generation, build, push or canonical edits. Missing values remain unknown. Unresolved identities are not rejected biology.

There is no prior BRS-X ranking produced under this equation to compare. All rankings are shown without a final presentation cutoff; no cutoff adopted.

Distribution data: [distribution.json](distribution.json), including percentage of leader, adjacent drops and cumulative PM/input coverage. Cumulative score share describes connectivity, not biological benefit. Any presentation cutoff remains a proposal; none adopted.
