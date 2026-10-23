# Non-destructive Stage 2A/2B improvement — completed with limitations

Scope: the **18 PMs with retained dietary inputs or practices in the rapid report**. The full canonical PMs were the baseline; the 26-relationship rapid manuscript selection was never used to reconstruct or reduce them. The 12 no-new-lever assessments, deferred PMs and blocked PM8 were outside this execution scope.

## Preservation result

All **84 existing Scientific Findings**, **52 input/participant records**, **16 System Optimisation Practices** and **three lifestyle records** remain. Their missions, Overviews, detailed mechanistic prose, existing citations, source assessments, cofactors, substrates, KC records, Direct/Derived metadata, Type A/B decisions, Phenome records and SEC/CC decisions are preserved.

Of the 52 input/participant records, 34 retain Yes, 16 retain No and two retain Unset dietary-input flags. These flags are not all new admissions: the historical FOS/GOS mixture remains explicitly unresolved exactly as it was at the start. Inputs and KC relationships omitted from the narrow manuscript export are still present in their canonical PMs and the complete preservation catalogue. No accepted input was dropped because this pass did not identify additional evidence.

For 17 PMs, removing only the new marked review disclosure recovers the exact original source bytes. For BRS3-FM2-PM6, existing metadata and Finding/reference objects are unchanged; only one new Finding, two references and their corresponding generated presentation were appended. Its other existing narrative is unchanged after isolating the generated Finding/reference sections. Original reference numbering is retained. These conditions are covered by 20 preservation regression tests and the versioned pre-run record-hash manifest.

## Improvements implemented

Every PM received an additive rendered review disclosure and a separate detailed report covering all existing records, the reviewed operation, source-to-claim qualifications, dietary interpretation, food/conversion traceability, limitations and open proposals. The source register reuses the 37 source-verification entries from the rapid/controlled work rather than pretending that these are 37 independent new experiments. Existing source assessments are inventoried in full; clinical/Phenome papers not independently refreshed remain preserved without fresh scientific approval. Targeted new retrieval addressed the glutathione-regeneration mission step and the exact B6/pantothenate attribution questions.

**BRS3-FM2-PM6 gains PM6-F2:** primary human glutathione-reductase crystallography establishes bound FAD, complemented by a separate human inherited-GSR-deficiency investigation showing loss of blood-cell enzyme activity. The Finding is explicitly unscored, has no FM roll-up promotion and does not establish a dietary deficiency, food effect, brain benefit or new nutrient requirement. Existing PM6-F1 vitamin C–E recycling is unchanged. Two primary bibliography entries were appended. UniProtKB P00390 entry version 273 and PDB 3GRS version 1.4 provide versioned curated/structural context; neither is counted as an extra primary replication.

**New dietary admissions: zero.** No candidate was forced through an incomplete identity, precursor or PM-engagement gate. The existing 26 curated manuscript relationships remain as before; the complete canonical catalogue preserves the additional historical inputs without automatically promoting them into the manuscript. The existing provisional food discoveries remain in the standard food-dropdown infrastructure. No new food relationships, nutrient quantities or conversion pathways were invented.

The six atoms, Type A/B definitions, Direct/Derived rules and SEC/CC governance were not changed. No PM was shortened or rebuilt from scratch. The added review disclosures are an audit layer, not a replacement admission section or a seventh atom.

## Five issues preserved for later review

1. **BRS1-FM4-PM9 / PM9-DIT-3:** review the shorthand attributing all B6-to-PLP activation to pyridoxal kinase; distinguish PNPO-dependent oxidation. The original atom and its accepted relationship remain.
2. **BRS1-FM2-PM6 / PM6-F5 source assessment:** review whether the ethanol-specific pantothenate experiment isolates acetyl-CoA mediation as strongly as the current summary says. The original B5 record, source assessment and Finding remain.
3. **BRS3-FM2-PM3 food traceability:** independently review the broccoli cooked-material/raw-preparation join. Neither the food edge nor the PM admission was deleted, downgraded or repaired.
4. **BRS4-FM1-PM1 / PM1-DIT-2:** retain the active-FMN record while investigating direct food occurrence separately from the riboflavin-derived route. No Yes → No change was made.
5. **BRS3-FM2-PM6 follow-up:** resolve the local FAD identity and step-specific dietary precursor evidence before any new dietary admission. This is a research question, not an invented ontology record.

Exact records, evidence pointers and proposed actions are in `review-issues.json`, the per-PM reports and the appended existing mechanism change-control queue. All five remain open; no proposed correction was implemented as an admission change.

## Validation

- **176/176** focused regressions pass, including **20** preservation tests and the prior controlled PM5, governance, extraction, material-reconciliation, citation-format and presentation tests.
- Governance: **64 PMs**, zero issues. Scientific Findings freshness: **58 PMs**, zero problems.
- SEC registry and immutable history: **69 snapshots valid**, unchanged.
- Substance/food identity safeguards pass; no canonical food, substance registry, quantity or food-edge edits.
- All 18 PMs compile. Seventeen also rendered in the isolated component harness; PM9's existing imported score component required compile-only validation there. The successful real production build resolves all components, and all 18 generated PM pages contain their new disclosure.
- **Production build PASS**, exit 0 in **74.36 seconds**, process-local `NODE_OPTIONS=--max-old-space-size=4096`; unrelated prebuild regeneration skipped.
- Existing known failures are retained separately: four missing bibliography keys and two stale title-test expectations (31/33 title tests). The original creatine §8 whitespace mismatch produces one pre-existing reference-presentation warning; it was not silently normalised to make the audit clean. No new reference error was introduced.
- `git diff --check` passes.

## Changed files and continuity

Changed canonical files: the 18 PMs listed in `per-pm-matrix.md`; the bibliography (two appended sources); and the existing mechanism change-control queue (five appended open items). New implementation/audit files: `scripts/run-stage2ab-preservation.mjs`, `scripts/stage2ab-preservation.test.mjs`, `system/reviews/stage2ab-preservation-2026-10-23/*` and `review/stage2ab-preservation-2026-10-23/*`. The earlier rapid test's zero-PM-edit expectation was updated to allow exactly these approved additive PM changes and the already approved phenylalanine rendering fix; the new record-hash tests enforce preservation rather than weakening it.

Every other pre-existing source/data file in the pre-run snapshot is unchanged. The original manuscript synthesis and all existing rapid manuscript/dietary outputs are hash-identical, with no added or removed files. Prior uncommitted rapid and phenylalanine work is retained. Work remains on `codex/rapid-stage2ab-manuscript`; no commit, push or merge was performed, and main/the approved integration checkout were not modified.

The bounded improvement pass is complete. This is evidence enrichment with explicitly parked questions, not a declaration that every historical clinical or dietary claim has been freshly validated. Further changes to the five flagged records require review.
