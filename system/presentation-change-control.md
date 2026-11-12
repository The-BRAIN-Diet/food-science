# Mandatory presentation change control

Author instruction: 2 November 2026, “Emergency Presentation Regression Repair and Mandatory Change Control”.

No agent, generator or renderer may introduce a new reader-facing section, panel, tab, dropdown, table, card, heading or substantive content block without an updated authoritative presentation contract AND explicit prior author approval. Silence, related data approval and general implementation permission are not approval. Scientific data may be stored and validated without being displayed.

Before implementation, record: **Change, Purpose, Placement, Source, Scope (page types and counts), Duplication, Example (representative rendering), Governance, Approval**. A proposed rendered example may be made in a review artifact, not silently installed on canonical pages. Preserve the author's actual approval and its source; agents must never invent or self-grant approval.

Typographical, citation and existing-content repairs remain allowed. They must not indirectly introduce new information architecture. The conservative gate can flag legitimate rendering fixes: record the existing author authorisation and bounded repair rationale rather than bypassing the gate.

## Technical gate

`npm run presentation:check` is a mandatory prebuild gate. `system/presentation-contract-baseline.json` freezes existing renderer/theme/plugin/CSS/template code and document structure (headings, markup, tables and internal record IDs). Additions, removals and modifications fail unless `system/presentation-change-approvals.json` contains the exact resulting file hash plus explicit author approval/source, proposal, contract, representative example and affected scope. Referenced proposal/contract/example files must exist.

The emergency baseline captures current presentation after panel withdrawal; it is a containment baseline, NOT retrospective author approval of every legacy page. Do not regenerate it to make a test pass. Baseline and approval changes require author review. No automatic approve or baseline-update command is supplied.

This is a conservative source-level gate, not proof of human consent or exhaustive runtime coverage. Arbitrary changes to data-dependent text, code outside protected directories or deliberate edits to the gate itself require code review and representative browser checks. Future CI/repository enforcement must keep this gate mandatory and protect baseline/approval edits; local code cannot authenticate the author. Do not claim branch protection has been configured.

## Emergency withdrawal

Both Dietary pathways technical panel types are withdrawn on ALL pages by explicit author instruction. Remove the global injection and retain the legacy component as a no-output compatibility adapter. Preserve ontology, source provenance, admissions, authored prose and existing section hierarchy. No replacement panel is authorised. Embedded butyrate output is covered by the explicit instruction to remove the panel everywhere; its surrounding authored explanation remains.

## Authorised nested pathway-disclosure removal — 3 November 2026

Owner instruction: “Delete Unauthorised Dietary Pathway Disclosure.” Remove the generated `Dietary pathway evidence` / `.pm-input-pathway-evidence` block from all PM six-atom disclosures, including PM9 vitamin B6. Remove its exclusive renderer argument and ontology-projection subscription. This is a shared presentation removal only: keep pathway records, six atoms, Dietary Confidence, ontology links and approved food sources unchanged. No replacement is authorised. Representative expected result: PM9 vitamin B6 opens its existing six atoms and food disclosures without a nested pathway-evidence heading. The presentation baseline is not regenerated.


## Canonical scientific projections — approved 10 November 2026

Apply [Canonical scientific truth and presentation consistency](canonical-scientific-projections.md), including its five scientific, automated, release and publication checkpoints. Current mission comes from PM frontmatter; explanatory prose must not strengthen the canonical science. Preserve authoritative admissions, limitations and SEC history. Report conflicts with provenance instead of selecting the newest text.

## Author-reviewed local release candidate — 11 November 2026

Author instruction: “Yes, approve all four presentation changes as reviewed” with the NutritionTable proviso. Approval is presentation only.

- NutritionTable: in the existing summary, highlight vitamins and minerals meeting 10% RI. For complete records (currently pears), a collapsed **Full vitamins and minerals** disclosure includes all public quantified panel observations, including small positives and those without an RI. Keep preparation, basis, sources and measurement status. Repeated highlight amounts in the full table are the same observations, not new evidence. Example: pear copper remains quantified even below the highlight threshold.
- SubstanceFoods: below direct sources on the FOS/GOS substance page, show constituent food pathways, not foods containing the combined preparation. Example: garlic supplies documented fructans, not the tested mixture.
- Mature soybeans: retain /soy/, with boiled unsalted beans as default, raw beans and defatted flour in separately labelled panels. No transfer of flour or raw concentrations to cooked beans.
- Acetic acid: retain qualified food and trial context, cider vinegar presence only and vinegar-pickle brine only; no pickle concentration, isolated-acid effect or new admission.

No ranking, food-composition, scientific-admission or release authorisation is conferred.

## PM food-source dropdown repair — 11 November 2026

Author instruction: restore `Plant-based -` and `Animal-based -`, then “we don't need this unranked heading, remove it from the template.” The shared dropdown does not prefix categories with `Ranked sources ·` and does not render `Documented, unranked sources`. The category column grid applies only to a summary that contains the category label, so an empty ranked row stays on the available line. Representative page: BRS1-FM5-PM12. No ranking, food-record or admission change.

Author instruction, 12 November 2026: `edible portion` is not a public basis label, and `Measurement provenance` is not shown on any PM. Preparations such as `cooked` stay. Stored analytical bases are unchanged.
