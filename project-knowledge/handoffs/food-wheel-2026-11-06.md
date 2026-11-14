# Integrated food wheel — 6 November 2026

Local-only work on `review/brs5-pm4-sec-assessment`, base HEAD `521036b1d6c212e58c660f0f985e47617a71a716`. No commit, push or canonical changes.

Author authorised an outer food ring connected to the existing substance/BRS diagram, targeted composition research and proposed mappings, without canonical admission changes. Implemented in [review report](../../review/visualisations/brain-food-wheel-2026-11-06/REPORT.md).

Preview: http://127.0.0.1:3160/food-wheel.html. Original http://127.0.0.1:3159/brain-chord.html preserved. Ninety foods connect to the existing 68 substances through 1,768 food–substance pairs (18 proposed-only). All 121 substance–system connections preserved. Twenty-one research proposal records remain unapproved; quantities, estimates, occurrence and derived relationships remain separate. No efficacy inferred from connectivity.

Validation: 6,764 automated assertions pass; primary and used supplemental source hashes unchanged. Ten unused supplemental files drifted concurrently and were not integrated. Browser testing and screenshots remain blocked by browser attachment/debugger and computer-use permissions; HTTP preview works. Finish these checks before claiming UX validation.

Files: data.mjs, build.mjs, interaction.js, source-materials.json, research.json, research-sources/, food-network.json, HTML/SVG, source tables, coverage table, gap ledger and validation artifacts in the review directory. Preserve other existing dirty work. Read the report and validation.json before regenerating; do not refresh the frozen network against concurrent changes incidentally.

## Author refinement — all connections and system colours
Implemented default-on Show all food connections control; system colours inherited from the existing SVG, multicolour bands for multi-system targets. Browser access recovered: verified 1,750 default ribbons, Beef focus 28, all plus proposals 1,768. Screenshot all-connections.png. No scientific or mapping changes. Broader earlier browser checklist remains partial.

### Food placement refinement
Author requested food placement near relevant systems. Replaced alphabetical circumference with the circular mean of distinct documented target positions, equal weight per target and no proposed-only influence. Sort by affinity and fit evenly spaced slots by circular rotation to avoid label collisions. This approximates target affinity, not efficacy or quantitative nutritional contribution; multi-system foods cannot occupy every relevant sector. All identities and relationships preserved; 6,768 validation assertions pass. Browser refresh verification for this placement change was unavailable (browser session error).

Author spacing adjustment: food ribbon radius reduced from 790 to 660 SVG units; food arcs and labels moved with it. Ordering, source data and connections unchanged. Rebuilt HTML/SVG; 6,768 checks pass. Local only.

Author label adjustment: food-wheel BRS1–6 system labels enlarged from 17 to 26 SVG units; BRS-X labels from 13 to 19. Food/substance typography unchanged. HTML/SVG rebuilt; 6,768 checks pass.

Production verified 6 November 2026, 12:09 Paris: https://thebraindiet.org/explore/food-wheel/ . Netlify deploy 6aedb434fa418ba844b6fd06 ready, merge b4d8f127854ae165e2bcd675a3b475044d63b984. Live data/runtime exactly match release; browser confirms 90 foods, 1,750 default ribbons and Beef focus 28. Supporting SVG/evidence files HTTP 200. Post-release verification and live screenshot are local-only handoff artifacts; no further deployment triggered.
Published through PR #234 on separate release branch; original scientific checkout remains unchanged except this handoff.

## Superseding selection correction — 6 November 2026 (local-only)

Author confirmed provisional Relative Source Power ≥10%, at least two comparable foods, maximum five per PM–substance target. All-food exploration is superseded; canonical records and excluded/presence-only relationships remain in diagnostic data. Shared canonical mapper is the sole composition source; no independent research quantities. Branch HEAD remains `521036b1d6c212e58c660f0f985e47617a71a716`; no commit/push/deployment.

[Reconciliation report](../../review/food-wheel-canonical-ingestion-2026-11-06/REPORT.md): 57 selected foods, 579 food–substance–PM edges, 119 unique covered targets out of 151. Salmon roe MEXT DHA/EPA correctly ingested but existing salted comparison sets are single-source; trout roe remains presence-only. Seventeen regression tests and presentation check pass; local browser selection/reset verified. Thirty-two targets remain without qualifying rankings. Source reviews/comparability decisions require separate scientific review; do not relax them to increase coverage. Reproduction commands and exact before/after inventories are in the report. Existing local/concurrent scientific work preserved.

## Superseding edible-preparation comparison fix — local implementation

The author corrected the earlier preparation partitioning: ordinary edible raw/cooked/salted preparations compete for the same chemical substance on compatible units/bases; preparation remains metadata. Implemented and rebuilt at localhost:3162. **64 selected foods, 586 food–substance–PM edges, 119/151 covered targets; 32 uncovered targets across 22 substances.** Salmon roe is displayed with 17 connections and ranks first for DHA/EPA (MEXT 2000/1600 mg per 100 g). Trout roe remains presence-only. The previous 57-food report is historical and superseded.

[Complete report](../../review/food-wheel-151-target-reconciliation-2026-11-06/REPORT.md), [151-target ledger](../../review/food-wheel-151-target-reconciliation-2026-11-06/TARGET-LEDGER.md). Canonical relationship metadata joins corrected so cached SOP/contextual rows cannot override the ranked dietary row. Source hashes and biological network unchanged. 21 focused tests pass, presentation check passes; four broader mapper failures are identical before/after and documented. Browser and screenshots verify roe and totals. No commit/push/deployment; HEAD unchanged. Outstanding compositional, mapping and formulation-specific scientific decisions are listed per target; no permission to invent quantities or change admissions.
