# BRAIN release readiness — 11 November 2026

**Recommendation: HOLD.** The isolated candidate reproduces the Explorer views, but its ranked snapshot, scientific governance, release scope and production prebuild do not pass. No production artefact was produced. Baseline is GitHub main at `ca3183b1bdeb32a0d552d63219ceac5022111225`, verified directly against the GitHub remote. The local remote named origin points to another checkout. Candidate HEAD is `af13bec172b5938098a46f85c06523b8a20e90dc` with uncommitted reconciliation. A HEAD SHA alone does not identify this candidate.

| Gate | Result | Evidence |
|---|---|---|
| Scientific integrity | FAIL | Findings and SEC checks pass, including 140 immutable snapshots. Dietary governance flags missing food-target research documentation or sufficient-coverage rationale for BRS5-FM2-PM6 PM6-DIT-2. Mechanism validation reports 9 FM, 46 PM and 4 SM contract failures. No prior baseline exception was applied. |
| Data integrity | FAIL | All configured scopes and displayed food identities resolve. Archived ranking provenance disagrees with current inputs. Food-table validation fails on broccoli sulforaphane and shrimp/spinach betaine qualitative status or amount labels. The validator reports the same three rows under two headings. A label failure alone does not establish that a source is missing. |
| Code integrity | FAIL | All 15 reconciled paths match their recorded local fingerprints. The 36 focused tests pass. Broader mapper, ledger and recipe suites fail. The standard production build stops at its protected presentation precheck before compilation. |
| Publication integrity | FAIL | Four protected presentations lack a matching approval in the existing validator. Release scope and scientific field changes require human review. There is no successful production build to inspect. |
| Scientific and publication scope | REVIEW REQUIRED | 41 changed PM frontmatter fields across 29 PMs relative to GitHub main. These include 15 dietary-assessment fields, 13 SOP fields, 9 dietary-traceability fields, two pending-action fields, a mission and a KC relationship. Counts are per changed field, not counts of new admissions. |
| Recovery | PASS | Original Codex and Cursor HEADs, status and binary diffs match their recovery records. Every regular archived file matched the original checkout by SHA-256, 1,427 Codex files and 66 Cursor files. [Recovery verification](readiness-run-02/recovery-verification.json). |

## Explorer coverage

Scopes were read from the exported bindings in `src/data/inputMappingScopes.mjs`. Each scope ran through the existing input-mapping generator independently. The expected PM identity set came from canonical PM frontmatter. For each scope we also compared its eligible presentation relationship IDs against the regenerated Explorer and checked every displayed food, substance and PM identity. BRS-X includes Circadian, ECS and Hormones. The 1,254 rows include ranked, unranked and related-source records.

| Configured scope | Expected and reproduced PMs | Input relationships | Display relationships | Food rows |
|---|---:|---:|---:|---:|
| BRS1 | 11 | 62 | 57 | 467 |
| BRS2 | 7 | 57 | 55 | 312 |
| BRS3 | 8 | 25 | 24 | 174 |
| BRS4 | 10 | 37 | 33 | 128 |
| BRS5 | 8 | 42 | 42 | 99 |
| BRS6 | 8 | 3 | 3 | 24 |
| BRS-X | 15 | 16 | 16 | 50 |

Explorer regeneration produced no tracked/previously staged projection diff in the disposable clone. This reproduced the existing ranked snapshot as an input. Independent regeneration of that ranked input failed. The ranking generator stopped at anchovies; exhaustive digest comparison found **33 publication-source mismatches and 46 snapshot-input mismatches**. The sets can overlap. Inspect individual diffs for changes to composition, page metadata, code or authorisation before updating any fingerprint. [Per-file hashes](readiness-gate/snapshot-mismatches.json) · [Scope PM identities](readiness-gate/scopes.json).

## Scientific boundaries

Glutamine has exactly three unranked source foods in BRS5-FM1-PM1 (beef, eggs, tofu). Walnut-kernel ellagitannins has exactly one occurrence-only row in BRS5-FM2-PM6, with provenance and no quantity or rank. The separate ellagitannin-to-ellagic-acid conversion remains blocked. A check across 16 held or blocked displayed-input records found only the authorised walnut exception among matching Explorer food rows. No new scientific decision about conversion or dietary efficacy is needed to document the existing walnut authorisation. Apple pectin retains two evidence contexts in one row per eligible parent PM, with the citrus-specific PM4 restriction tested separately.

These checks concern the generated data and the tested protocols. They do not certify all public prose or every intervention claim in the 481-file delta. Review the [PM field inventory](readiness-gate/scientific-review.json) and [full public-source diff](readiness-gate/publication-diff.log) for approvals and conflicting interpretations.

## Validation and publication scope

The complete [proposed release manifest](readiness-gate/proposed-release-manifest.tsv) lists all 481 candidate-vs-main paths with their change type, surface and review disposition. It covers 85 documentation pages including 44 food pages, 29 static files, 18 shared source files, two registry paths, 53 system files, 59 scripts, 228 review files and project/configuration changes. Public effects include revised food and PM pages, the Food Wheel and its evidence ledger, the PM Explorer, a food-intelligence prototype and altered build/deployment configuration. Review material is visible in a GitHub promotion even when it is not a website route.

- Passed: 36 focused tests, 11 composition provenance tests, 9 substance schema tests, substance validation, bibliography resolution, Findings and SEC checks.
- Failed: mapper suite 35/41; recipe nutrition 56/57; ledger and exact-child suites 6/7. The ledger fixture's registry digest differs, while its recipe-network digest still matches. Investigate the six mapper cases and recipe page order/matrix assertion individually. Their baseline attribution has not been established.
- Production command: standard `npm run build` with the Netlify heap, minification and cache settings. Its first prebuild check rejected NutritionTable, SubstanceFoods, turkey-wing-stew and acetic-acid presentations. No bypass, standalone compile or production smoke test was used. [Build output](readiness-gate/build.log) · [All check results and logs](readiness-gate/checks.json).

## Next actions and repeat procedure

1. Partition the full manifest into release scope and deferred material, especially the 228 review paths and extra public prototype. Match changed science and the four protected presentations to their exact author decisions.
2. Reconcile ranking inputs at source and document the existing walnut occurrence rationale. Resolve the three food-table discrepancies without erasing preparation qualifiers or relaxing data checks.
3. Triage the broader test and mechanism failures against the same GitHub baseline. Preserve fingerprints and tests unless an independently reviewed decision justifies a change.
4. From the isolated candidate, run `python3 scripts/release-readiness.py ../20261111-095037/readiness-next`, choosing a fresh output directory. The runner uses the repository's npm validators, existing mapping generators, SEC guard and standard Netlify build lifecycle in a temporary local clone. The reconciliation path fingerprints live beside the run directories and are provenance checkpoints, not scientific approvals. Nonzero checks block promotion. A scientific field delta also requires human review. After a successful build, inspect the built routes before requesting publication approval.

No commit, push, merge, Netlify action or change to the running preview was performed.
