# BRS6-FM2-PM4 Cortisol Rhythm Regulation — Stage 2A/2B reassessment

Date: 12 November 2026
Page: `docs/biological-targets/brs6/fm2/brs6-fm2-pm4-cortisol-rhythm-regulation.mdx`
Instruction (author, Cursor, 12 November 2026): "this PM … has not had a full assessment of evidence please run 2a and 2b again; add the Maldonado and McCarthy studies and summary we discussed above; you can connect evidence to the 'Canonical Synthesised Evidence — Pilot 1 Record' review also but respect the tab structure and 'evidence & audit' tab. Please summarise those changes. Section 4 needs a lot of work and 4.1 needs to mirror section 4 subsections."

Status: local workspace only. No commit, push or deployment.

## 1. Preserved

- `pm_id`, Mission, parent FM, the `Lifestyle-Dominant` inherited label and principal route `3.2`.
- Finding IDs `PM4-F1`–`PM4-F3`, kept in their existing order; Evidence Considered for each is retained and enriched.
- `PM4-SOP-1` (ID, strategy ID and category) and KC1/KC2 adjudications, which stay unresolved.
- Evidence gap `PM4-EG-RECOVERY-1` (ID and title).
- All Synthesised Evidence Confidence values: `not-yet-scored`.
- 12 November 2026 owner instruction: Codex-provisional SEC for PM4-F1–F7 (see table in `system/sec-assessments/README.md`). No human review. Interventions not scored.
- `phenome_relationships: []`. No PH015 relationship is created.

## 2. Stage 2A

### Propositions

1. Behavioural timing controls cortisol timing (`F1`).
2. A dietary input changes the waking segment (`F2`).
3. Meal timing alone shifts cortisol phase (`F3`, null).
4. An earlier eating window changes cortisol levels (`F4`, new).
5. Light changes cortisol, depending on timing (`F5`, new).
6. Sleep loss changes the evening segment (`F6`, new).
7. Basal diurnal cortisol differs in youths with ADHD (`F7`, new; Pilot 1 SF1).

### Attached corpus reassessed

| Source | Old placement | New placement |
| --- | --- | --- |
| Scheer 2009 | F1 primary | F1 primary; connected in F7 |
| Chang 2021 | F1 connected (excluded) | F7 primary |
| Isaksson 2012 | F1 connected | F7 primary |
| Chang 2020 | F1 connected | F7 primary |
| Lane 2010 | F1 connected | F7 connected; electrodermal result routed to PM6 in §5.3 |
| Schmidt 2015 | F2 primary | F2 primary; connected in F7 (direction tension) |
| Wehrens 2017 | F3 primary | F3 primary |

### Targeted searches and results

| Question | Sources retrieved | Decision |
| --- | --- | --- |
| Which studies drive the Chang 2021 morning effect? | Chang 2021 full text (PMC8377148); Maldonado 2009 abstract; McCarthy 2011 full text | Both added to F7 as Evidence Considered. McCarthy's home samples were not lower, and Maldonado sampled around a stress test. |
| Reactivity versus basal cortisol | Kamradt 2018 (via Pilot 1) | F7 connected evidence only. |
| Light timing | Scheer & Buijs 1999; Leproult 2001; Jung 2010 | F5. Lever not admitted. |
| Sleep loss | Leproult 1997; Spiegel 1999 | F6. Lifestyle lever admitted. |
| Eating window | Jamshed 2019 (PMC6627766) | F4. SOP admitted. |
| Breakfast skipping | Witbracht 2015 | Not admitted; observational only. |
| Caffeine | Lovallo 2005 | Not admitted; acute daytime effect only. |
| Meditation | Koncz 2021 | Not admitted; effect small and non-significant. |
| Exercise timing | Kanaley 2001 | Not admitted; changes the acute response, not the rhythm. |

The hub-category screen covered dietary protocols, light/circadian, stress/autonomic, sleep and activity.

### Stopping rationale

Every attached source and every hub-category lever was assessed or given a specific missing link. Further searching returned acute or observational endpoints that would not change an admission decision.

### Overview claim trace

| Claim | Source |
| --- | --- |
| Highest in the morning, quiet period late in the evening | Leproult 1997 [14] |
| Misalignment reversed the pattern | Scheer 2009 [1] |
| Sleep loss slowed the evening fall | Leproult 1997 [14] |
| Earlier eating window lowered evening cortisol | Jamshed 2019 [16] |
| Light raised or lowered cortisol depending on timing | Scheer & Buijs 1999 [11]; Jung 2010 [13] |
| Benefit: in step with the behavioural day | Scheer 2009 [1] |
| Implementation note (opens with the admitted lever's name) | Scheer 2009 [1] |
| Biological relevance: the waking rise is a separate component | Schmidt 2015 [3] |

The Overview is about 55 words. It does not mention ADHD or medication.

## 3. Stage 2B decisions

- **Admitted.**
  - `PM4-SOP-2` Early time-restricted eating (8 am–2 pm): dietary_protocols, `dietary_input: true`.
  - `PM4-LIFE-1` Sufficient, unrestricted sleep: `dietary_input: false`.
  - `PM4-SOP-1` retained, with a sharper limitation.
- **Not admitted.** These are Evidence & Audit decisions:
  - `PM4-ADJ-BGOS-1`: cites Pilot 1 and the direction tension.
  - `PM4-ADJ-MEAL-DELAY-1`: carries the 23 Oct decision as history version 1.
  - `PM4-ADJ-LIGHT-1`
  - `PM4-ADJ-CAFFEINE-1`
  - `PM4-ADJ-MEDITATION-1`
  - `PM4-ADJ-EXERCISE-1`
  - `PM4-ADJ-BREAKFAST-1`
- **Route records.**
  - `3.2` now cites F1 and F4.
  - A new `3.3` route cites F6.
  - The principal route stays `3.2`, because it holds the only direct rhythm measurement.
- **Evidence gaps.**
  - `PM4-EG-RECOVERY-1`: retained, with the light studies added.
  - `PM4-EG-RESTORE-1`: new.
  - `PM4-EG-MEAL-TIMING-1`: new.
  - `PM4-EG-ADHD-RHYTHM-1`: new.
  - `PM4-EG-ADHD-SIZE-1`: new.
  - `PM4-EG-DIRECTION-1`: new.
- **Pilot 1 SF2 (stress reactivity).** Not made into a PM4 Finding. Reactivity is a different construct from the daily rhythm, and it belongs to a PH015 relationship that PM4 does not map.
- **Removed from the body.** The dated `deferred-stage2ab-2026-10-23` details block, following the PM1 precedent. Its decision is preserved in `scientific_reconstruction_review.previous_assessment` and in the adjudication histories.

## 4. Presentation changes (proposal; scope = this one PM page)

The page moves to the existing evidence-tabs contract (`system/pm-evidence-tabs-contract.md`), as already used on BRS5 PM4:

- `scientific_findings_placement: section-4`.
- §4 is "Mechanistic Basis + Scientific Findings". It contains a Summary, seven bullets mapping each mechanism to SF1–SF7, and one "Cortisol rhythm regulation — mechanistic detail" dropdown.
- The dropdown has seven mechanism subsections. Their headings are identical to the SF labels, in F1–F7 order, so §4.1 mirrors §4. Biological process, Mechanism Boundary and Integration follow.
- Follow-up owner instruction (12 November 2026): the mechanism-to-SF link list was removed from the §4 Summary because it repeated the dropdown and §4.1 headings. The Summary is now prose only, and the contract records this as a PM4-only owner correction.
- §4.1 is generated by `npm run findings:sync` and shows the seven Findings in place of the previous Evidence & Audit link.
- §5.2 adds links to the BRS-X Circadian PM1 and PM2 pages. §5.3 replaces the redirected PM5 link with PM6.
- §8 now has 16 references; the truncated titles are corrected.

No new component, section type or page-type rollout is involved. Representative example: the page itself, plus `docs/biological-targets/brs5/fm2/brs5-fm2-pm4-microbial-ecological-turnover-and-competitive-selection.mdx`.

## 5. Bibliography

- Added seven entries:
  - `maldonado_cortisol_adhd_2009`
  - `mccarthy_cortisol_iv_adhd_2011`
  - `kamradt_cortisol_reactivity_2018`
  - `scheer_buijs_light_cortisol_1999`
  - `leproult_bright_light_cortisol_2001`
  - `jung_bright_light_cortisol_2010`
  - `leproult_sleep_loss_cortisol_1997`
- Completed the author list for `lane_sensory_2010` and added its page and PMID.

## 6. Verification

| Check | Result |
| --- | --- |
| `findings:check` | 67 PMs, 0 problems |
| `mechanisms:validate` | Passed |
| `bib:validate` | 1052 cited keys present |
| `SEC_BASE_REF=origin/main sec:check` | Valid |
| MDX compile of PM4 | OK |
| Related node tests | 124 pass, 10 fail. The same 10 fail with the original PM4, so they predate this change. |
| `check-sec-completeness --pm BRS6-FM2-PM4` | Reports the expected "legacy pending" status for the unscored Findings, as on the original page and other unscored PMs |
| `mappings:food-strategies` | Regenerated. Adds one strategy and one relationship for PM4-SOP-2; the rest of the diff comes from other uncommitted workspace changes. |
| `presentation:check` | PM4 approval recorded. Unrelated dirty-workspace files still fail. |

## 7. Logged outside the batch

`FW047` (local QC register) covers the Therapeutic Area evidence records EC000161–EC000164 in `src/data/therapeutic-area-evidence.json`, which still project onto PM4:

- They say "altered" rather than "lower" cortisol.
- Two case–control studies are coded as "symptom-improvement".
- Lane 2010 is listed as supporting evidence.

These records are logged only and not fixed, because the register is shared across pages.

## 8. Note for the BRS6 manuscript

The manuscript sentence "so the effect may be larger in younger children" may need qualifying:

- Isaksson 2012, the largest cohort, found the difference only above age 10.
- McCarthy's home samples were not lower.

The PM records age, diagnosis and setting as unresolved (`PM4-EG-ADHD-SIZE-1`).
