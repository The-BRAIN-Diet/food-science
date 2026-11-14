# ADHD chord coverage and BRS-X — 6 November 2026

Local-only implementation for author review. No canonical records, admissions, assessments, production files or original prototype changed. No commit or push.

## Sources and reproduction

Primary checkout: /Users/paulhouston/Documents/Codex/2026-10-22/we-x20/work/brain-diet-v1-quantitative; branch review/brs5-pm4-sec-assessment; HEAD 521036b1d6c212e58c660f0f985e47617a71a716. Current uncommitted records are included and content hashes retained in network.json.

Supplemental checkout: /Users/paulhouston/Food Science/food-science; HEAD a00d6b0d6c879e75c058ccb2a5c63ae6562afd2c. Only novel canonical identities with explicit relationships to PMs already in the primary inventory are added. This contributes acetic acid; existing primary identities and relationships are not overwritten. Its unmerged source is labelled in the panel. This is read-only extraction, not branch integration.

Run from the primary repository:

```sh
node review/visualisations/brain-substance-chord-2026-11-06/build.mjs '/Users/paulhouston/Food Science/food-science'
node review/visualisations/brain-substance-chord-2026-11-06/validate.mjs
```

## Before / after

| Measure | Original | Revised |
|---|---:|---:|
| Displayed substance identities |55|68|
| Drawn substance–system pairs |96|121|
| Drawn BRS-X pairs |0|5|
| BRS-X inner arcs |0|3|

Current PM inventory: 65, including the new CoQ PM. Registered Cross-BRS groups comprise 13 PMs: Circadian 2, ECS 5, Hormones 6. The existing intervention mapper supplies 87 SOP/Lifestyle records; 64 lack an explicit substance identity (this includes food/protocol records, not just behaviours). Circadian exposes five recorded interventions and no invented molecular ribbon. Behavioural details are not counted as substance–system pairs.

New displayed identities: Acetate; Acetic acid; Acetoacetate; Butyrate; Coenzyme Q10 (CoQ10); Flavin adenine dinucleotide (FAD); NAD+ (oxidised nicotinamide adenine dinucleotide); Phytate; Propionate; Retinoic acid; S-adenosylmethionine (SAM); Short-Chain Fatty Acids (SCFAs); Urolithin A.

## Extraction contract

1. Start with current PM identities and their dietary records; preserve explicit admitted relationships.
2. Read evidence-supported food occurrence independently of the dietary admission projection.
3. Reuse the shared intervention/food/substance mapper; no second hand-authored food mapping dataset.
4. Retain explicit PM-scoped conversion endpoints, not every intermediate. Conversion is contextual, never inherited admission.
5. Related-substance joins require both substrate and product to be documented within the same PM.
6. An authored substance evidence-table row naming an exact existing PM can expose a qualified candidate relationship. Generic BRS tags and mechanistic prose do not qualify.
7. No unrestricted ontology sweep creates ribbons. Candidate and contextual status remain in details, with unchanged system colours.

The displayed FAD, SAM and retinoic-acid targets remain dietary-precursor relationships, not direct food contents or new dietary requirements. Upstream paths remain available in details. Food composition does not establish molecular mediation, intervention equivalence or clinical benefit.

## Requested substance reconciliation

| Identity | Disposition | Boundary |
|---|---|---|
|acetate|Display|Recorded resistant-starch microbial-production relation joins the existing PM5 substrate and product records. Not an acetate dietary admission.|
|acetoacetate|Display|Terminal target of the recorded caprylic-triglyceride conversion chain in ketone utilisation. Not food acetoacetate or guaranteed cerebral uptake.|
|acetyl-coa|Upstream representation — not drawn|Intermediate of the caprylic-triglyceride conversion chain. Retained in pathway details; no separate node.|
|butyrate|Display|Scoped resistant-starch pathways and PM5 product record; retain faecal-concentration versus production-flux distinction.|
|flavin-adenine-dinucleotide|Display|Shown as an explicitly scoped derived target of riboflavin conversion, not an independent dietary input. Riboflavin remains its dietary representation.|
|glutathione|Exclude — not drawn|Existing endogenous substrate/pool records alone do not provide a structured specific intervention edge. No node added from general antioxidant relevance.|
|methylcobalamin|Upstream representation — not drawn|Shares the canonical B12 page; represented upstream through B12 rather than double-counted as an independent source.|
|nad-plus|Display|Explicit nicotinamide-riboside conversion target in NAD regeneration; not an independent oral NAD+ admission.|
|phosphatidylethanolamine|Exclude — not drawn|PEMT/NAPE biochemical participation is recorded; a specific qualifying intervention relationship is not established by these records.|
|propionate|Display|Recorded resistant-starch microbial-production relation within PM5; no fixed yield or independent oral requirement.|
|retinoic-acid|Display|Explicit vitamin-A-related precursor formation joined to the existing barrier PM record; food vitamin A is not retinoic-acid content.|
|s-adenosylmethionine|Display|Recorded methionine conversion target; displayed for traceability while dietary provision remains upstream. No SAM supplementation admission.|
|tetrahydrobiopterin|Exclude — not drawn|TH/TPH cofactor participation alone is insufficient; no specific recorded dietary/SOP target edge established.|
|urolithin-a|Candidate|Explicit authored substance-page evidence table identifies BRS5-FM2-PM6 microbial biotransformation. Candidate/context only. Separate BRS4 supplement proposal remains deferred for ownership.|
|sulforaphane|Display|Existing admitted BRS3-FM2-PM3 identity and relationship preserved, including exposure-specific limitations.|
|acetic-acid|Display|Explicit vinegar SOP identity and measured food occurrence from supplemental localhost checkout. Does not isolate acetic acid as the mediator. Distinct from the canonical microbial acetate node.|
|coq10|Display|Regression: one canonical CoQ10 node; nine independent food-occurrence records; contextual BRS4 roles and precursor pathway retained.|
|glucoraphanin|Candidate — not drawn|Broccoli and broccoli-sprout pages document precursor occurrence/conversion, but neither inspected registry resolves a canonical glucoraphanin identity or explicit PM intervention identity. Retained as a mapping gap; no synthetic identity or new admission created.|

Exact source identifiers and paths are retained in reconciliation.json. Full node inventory, record-level status, food provenance and transformation limitations are in network.json.

## Proposed extension / unresolved mapping

- Urolithin A supplementation for mitochondrial quality control is **not** attached to BRS4. Existing Batch 3 adjudication (review/priority-intervention-appraisal-batch3-2026-11-05/appraisals.json, DISC-UROLITHIN-MITO) identifies unresolved ownership: mitophagy is not PM5 redox protection or PM9 biogenesis. Any extension requires the established scope and appraisal process. BRS5 microbial conversion is a separate existing operation.
- Glucoraphanin needs canonical identity/mapping reconciliation before a separate node; existing sulforaphane admission is preserved. No scientific edit is made here.
- Acetic acid originates in a different unmerged local checkout. It is expressly supplemental rather than represented as committed primary-branch content.
- General endogenous participants remain excluded unless a specific recorded relationship passes the generic extraction gate. This conservative machine-readable coverage is not a claim that every prose-only candidate has been resolved.

## Validation

1449 focused assertions pass: canonical source hashes, every drawn connection's PM and evidence provenance, all original admitted numbered-BRS connections, CoQ10 and nine occurrences, all three BRS-X groups, behavioural Circadian, no forced BRS4 urolithin ownership, and intermediate handling. JavaScript syntax check passes. Browser checks confirm pointer and keyboard arc selection, Circadian intervention details, CoQ10 foods, acetic-acid context, filtering and reset. Screenshots: full-diagram.png, brs-x-ecs.png, brs-x-circadian.png, coq10.png.

The original brain-substance-chord-2026-11-05 directory was not edited. The revised standalone HTML and SVG are isolated review artifacts; no public renderer or navigation changes. Existing dense labels at narrow viewport sizes remain a prototype usability limitation; no outer food ring was added.

Preview: http://127.0.0.1:3159/brain-chord.html
