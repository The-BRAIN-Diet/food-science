# Six-atom intervention UX proposal — author review only

Local URL: http://127.0.0.1:3156/

## Proposal and permission

**Change:** Existing blue Dietary Levers disclosure language extended to SOP and Lifestyle examples, with independent family → category → intervention → Evidence & Audit controls.
**Purpose:** Show the practice and measured endpoint first; expose scientific traceability on demand without treating an unscored intervention as scored.
**Placement:** Demo only. Canonical placement remains dominance-governed; the placement selector is an illustration, not a dominance decision.
**Source:** Canonical PM1, BRS3-PM2, BRS1-PM9 and BRS6-PM2 records and their original reference registers. Walking source: Reynolds et al. 2016, doi:10.1007/s00125-016-4085-2, publisher/PubMed checked.
**Scope:** One standalone localhost page outside docs/src routes. Four PM contexts, five records. No production navigation, sitemap, registry or shared renderer integration. Server bound to 127.0.0.1; noindex headers and metadata.
**Duplication:** Canonical snapshots are copied only into the review artifact, not a new evidence database. Future implementation must resolve live canonical records rather than maintain these copies.
**Example:** collapsed.png, expanded.png, narrow.png, lifestyle.png, dark.png. Screenshots precede the final addition of explicit protocol lines; controls and six-atom structure unchanged.
**Governance:** Future implementation would require amendments to Stage 2A/2B, PM schema/template, intervention disclosures and confidence/SEC relationship guidance. No such canonical amendments made by this demo.
**Approval:** User explicitly approved creation of an isolated UX demonstration. Canonical implementation is NOT approved.

## Scientific and identity safeguards

- B6 retains High and its canonical six atoms. Current vocabulary is High / Moderate / Low, not Medium; no silent renaming.
- SOP confidence has no rating; Lifestyle confidence is an explicitly provisional placement placeholder. A shared visual slot can accept different named constructs, but their scientific rubrics cannot be shared by implication.
- Beef and eggs retain existing SOP admissions and original references. These are existing-record statuses, not a fresh endorsement against a proposed SEC gate.
- BRS3-1-2 includes its existing mixed-meal SOP with no isolated ingredient attribution.
- Walking is Unset. Existing interval-walking admissions were not borrowed for the post-meal protocol. Three-hour glucose exposure is not glycaemic variability.
- Section 4 holds links and unscored placeholders only. Mechanistic links do not confer intervention-specific SEC. No new scores or Findings.
- Verified identities: beef, eggs, vitamin-b6 and original PM/atom/citation IDs. Preparation/comparator/endpoint canonical IDs remain null where not resolved. Labels are descriptive, not fabricated ontology identifiers. Physical activity reuses the existing input type; no new Lifestyle category ID is created.

## Interaction findings and proposed refinement

Native details/summary provides click, Enter/Space and independent open states. Evidence starts closed. Real browser checks covered family/category/egg/evidence expansion, Space collapse, separately opened Lifestyle family and walking evidence, 390 px content width and dark mode. This is a constrained-width review, not hardware mobile-device certification.

Four levels are functional but cumbersome on narrow screens: nested padding leaves too little space for detailed prose. Recommend retaining family/category/intervention controls but making the inner audit content flush with the intervention panel, and displaying confidence/status as short labels with explanations inside audit. These refinements are proposals for review, not canonical changes. The demo uses actual compiled site CSS with only local layout/native-details adapters; no new icon library or public component.

## Future implementation scope requiring approval

First two canonical pilots only: BRS1-1-1 and BRS3-1-2. Shared adapter would ultimately affect up to 64 PMs only after explicit rollout approval and exact inventory. B6/walking are supporting design examples, not permission to change those PMs. Foods, substances, recipes and KCs excluded. Decide SOP/LP SEC applicability and admission requirements separately before any scientific migration. Define distinct intervention confidence rubric before assigning ratings.

## Validation

Presentation gate passes for all 691 protected files; git changes confined to this review directory. No production source, scientific records, admission, score, deployment setting or shared stylesheet changed. No commit, merge or deployment.
