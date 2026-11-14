# SOP and Lifestyle Lever six-atom contract — 2 November 2026

Governance and isolated-demo validation authorised by the owner’s “Enforce Mechanism-of-Action Integrity in Stage 2A/2B” instruction. Canonical reader-facing rollout is NOT approved. This contract supersedes the isolated demo’s unconditional two-line rule. Preserve existing scientific records and admissions; no automatic migration.

## Stage 2A scientific handoff

Record separately: Intervention (what was done), full Mechanism of Action (biological, biochemical or physicochemical action), Measured Effect (observed endpoint), PM Relevance (mission connection), and typed Evidence Limitations (what remains unestablished). Measured effects do not prove mediation. Record unresolved MoA explicitly; hypotheses remain qualified inside Atom 3. Before external discovery, reuse canonical food-page Preparation, Synergies and Bioavailability references, following original studies rather than treating food pages as primary evidence.

## Stage 2B six atoms

1. Intervention — controlled identity, preparation and comparator; preserve existing ontology links.
2. Intervention type — existing SOP or Lifestyle taxonomy.
3. Biological Relationship — separately stored full MoA with evidence qualification and status; Measured Effect; PM Relevance.
4. Evidence source — original references, population, exposure, comparator and measured endpoint; canonical numbered citations.
5. Limitations — independent typed entries, including null outcomes, attribution, measurement and population boundaries.
6. Intervention admitted — Yes / No / Unset, inherited from the adjudicated record, not inferred from display.

Dietary Inputs retain their existing six fields and confidence semantics. Do not transfer Dietary Confidence to intervention-effect confidence. No new confidence ratings or SEC formula changes are authorised. SF and intervention assessments concern distinct propositions; do not inherit SF scores. SEC remains in Section 4. Existing admission rules govern independently of this presentation contract.

## Compact presentation

First line: **Intervention → Measured Effect**. Retain existing ontology hyperlinks as independent anchors; clicking non-link intervention text or its disclosure control immediately reveals the six atoms. Do not nest a second Evidence & Audit disclosure. Link clicks must not toggle the disclosure. Do not turn the entire first row into navigation.

Second line, ONLY if adequately identified: *Mechanism: concise process summary*. Otherwise omit the entire second line. No empty label or placeholder. The summary is derived from the structured full MoA record and resolves to the same mechanism identity; it is metadata, not a seventh atom or independent claim. Reuse the same field in any separately approved roll-up. Do not invent missing ontology identifiers.

Forbidden mechanism summaries include “Not isolated in the tested comparison”, “Evidence insufficient”, “Mediator not measured” and “Mechanistic interpretation; mediator not isolated”. Keep these qualifications within Atom 3 or Atom 5. Do not replace them with speculative causal claims. Changes to MoA require renewed source-level semantic review of the summary; lexical checks alone cannot establish scientific adequacy.

Reuse existing family disclosures, typography, accent colours, spacing and controlled vocabulary. Each intervention is a separate disclosure. No extra category nesting unless the approved taxonomy requires it. Respect Intervention Dominance: default §3.2/§3.3; §1.1 only under existing promotion rules. This contract does not approve new public panels, food roll-ups or shared-renderer changes.

## Worked examples

- Minced versus intact beef: increased six-hour dietary phenylalanine appearance in the tested older-adult meal. Summary: “Physical disruption of the food matrix”. Full MoA explains proposed digestive accessibility without claiming demonstrated causal mediation. Retain null MPS and grouped EAA outcomes.
- Boiled versus raw eggs: higher peak circulating essential-amino-acid concentrations in the tested postexercise comparison. Summary: “Heat-induced protein denaturation”. Keep separate ileal digestibility evidence distinct from the plasma experiment; no demonstrated mediation or universal prescription.
- Ghanim mixed-meal comparison: precisely retain acute endotoxin-associated and NF-κB readouts. MoA unresolved; NO collapsed mechanism line. Do not assert intestinal endotoxin absorption as the mechanism. Preserve multicomponent attribution limits, indirect measures, CRP/TNF-alpha null outcomes and population restrictions.

## Validation and rollout gate

Use `scripts/lib/intervention-moa-contract.mjs` and `node --test scripts/intervention-moa-contract.test.mjs` for new structured handoffs. A semantic reviewer must examine evidence, mechanism identity, claim strength and limitations; a recorded review is traceability, not automated proof. Do not bulk rewrite legacy records to pass this prospective contract. Inventory missing fields as migration gaps.

Test omitted unresolved mechanisms, separate effect storage, typed limitations, summary derivation, known forbidden text, first-click expansion, independent links, and unchanged protected public structure. Run `npm run presentation:check`. Before canonical rollout, record the proposed component, placement, source, affected page types/count, representative render, instruction changes and explicit owner approval under presentation-change-control.md.

## Bounded canonical-route localhost pilot approval

Owner instruction: “no implement on the localhost versions of our test PMs please; you have tested 2”. This authorises the three demonstrated SOP presentations on BRS1-FM1-PM1 and BRS3-FM1-PM2 only. No other PM, global renderer, admission, score or deployment is authorised. Existing empty Lifestyle sections remain unchanged. The preceding rollout restriction continues to apply beyond these two pages. Existing ontology links remain inside the atoms, preserving the owner’s earlier requirement that clicking the intervention title opens its record. No new first-row ontology links are invented for the mixed meal.

### Two-PM pilot styling correction

Owner requested all dietary-input trigger CSS, with no blue arrow or coloured disclosure box. The local pilot uses `brs-dietary-lever-trigger` on a plain button and an uncoloured six-atom container, not a hub-style details card. Existing family/category controls remain unchanged. This is limited to the same two PMs.

Owner clarification: retain a black disclosure indicator beside the intervention, without a coloured box. Use the theme foreground colour (black in light mode, readable foreground in dark mode), preserving dietary-input trigger typography and direct six-atom expansion.

Pilot colour clarification: intervention title inherits the existing dietary-input `--ifm-link-color` (red on BRS3, matching KC1); only the disclosure indicator uses the theme foreground colour. No hardcoded global red or background is introduced.

## Admission and assessment-link integrity

A qualifying intervention may have a measured effect without an identified MoA. Admission and mechanism identification are separate decisions: unresolved MoA neither automatically withdraws nor justifies admission. The BRS3 mixed-meal historical admission remains unchanged and is flagged for subsequent adjudication against refined evidence requirements, not silently reapproved by this presentation pilot.

Only label a link as an intervention SEC assessment when a corresponding assessment exists at that destination. A general Mechanistic Basis anchor or linked SF is not an intervention-specific assessment. Omit that link until a valid assessment exists; supporting Finding links may remain accurately labelled as such.

Preserve “no observed postprandial endotoxin/LBP rise” as a study-specific observation. Do not transform it into demonstrated prevention, a generic fibre-rich-meal claim or “prevents endotoxin spikes” in summaries or roll-ups.

PM9 correction: the legacy PmSystemOptimisationEnhancer injected a BRS4 ketogenic candidate despite empty PM9 admission arrays. Suppress that legacy block on PM9; preserve the generated index and supporting scientific evidence. Hub ownership or cross-BRS relevance does not constitute PM-specific SOP admission. Validate rendered output as well as authored sections.

## Two-pass SOP/Lifestyle execution — owner instruction 2 November 2026

**Pass 1 takes priority across all 64 PMs.** Review mission relevance, original evidence, measured effects, identifiable MoA, independently typed limitations, PM-specific admission and ontology links. Implement only eligible interventions through the approved six-atom presentation, including legitimate dominance placement. An unresolved MoA does not automatically disqualify or admit an intervention. Contextual, mechanistic and unverified candidates must not be automatically admitted. Record intervention-specific SEC status as **Not yet assessed** unless an existing valid assessment covers the exact intervention–outcome proposition. Preserve any valid existing intervention assessment. Do not assign new intervention SEC scores or inherit Finding scores. Extract paper-relevant examples incrementally.

**Pass 2 follows Pass 1.** Appraise admitted SOPs and Lifestyle Levers using the existing D/B/P/R rubric, exact intervention–outcome proposition and retained provenance. Use existing Assessment Gap tracking for incomplete appraisal. Present scoring in Section 4, not in the six atoms. Flag material appraisal problems for admission adjudication; do not silently rewrite admissions. Preserve scientific Findings, dietary admissions and immutable SEC history.

Track scientific eligibility, implementation/validation and SEC appraisal independently. Pass 1 completion is not scoring completion. No new public presentation component or deployment is authorised by this sequencing instruction.

## Dietary-first editorial placement — approved 2 November 2026

This owner-approved rule supersedes requirements above that make routine dietary-first presentation depend on demonstrated comparative intervention dominance.

- Where a PM has admitted Dietary Levers, present that group first by editorial default because the framework is diet-focused. Placement is not a claim that diet is biologically stronger, more effective or more important than SOPs or Lifestyle Levers.
- Retain SOPs and Lifestyle Levers in their standard sections unless an explicitly justified presentation exception is approved. Do not withdraw previously approved exceptions automatically.
- Keep scientific Intervention Dominance separate. Where comparative evidence does not establish a principal route, retain or record “No principal intervention route established”. Do not assign Diet-Dominant merely to achieve dietary-first placement or populate scientific `selected_groups` from editorial preference.
- Admission remains evidence-governed. Dietary-first placement neither admits a candidate nor promotes biochemical-only participants. Specificity alone does not establish dominance; a defined SOP can also be specific. Empty dietary groups must not be promoted or filled artificially.
- Routine Pass 1 presentation and paper extraction need not wait for comparative dominance adjudication. Record genuine scientific uncertainties separately and continue. Existing scores, admissions, scientific qualification labels and immutable history remain unchanged.
- Future generator implementation must represent editorial placement separately from scientific route selection. This instruction approval does not itself confirm that the current generator implements the separation; validate before reporting rollout completion.

### BRS2 PM1 presentation correction — 3 November 2026

Use the existing `brs-fm-hub-*` disclosure markup for SOP category groups, matching §1.1; do not wrap interventions in generic MDX `<details>` cards with theme-coloured backgrounds. Individual rows retain `brs-dietary-lever-trigger` styling. A mechanism summary may describe established nutrient provision without asserting unmeasured intracellular conversion or mediation. Preserve those qualifications in Atom 3. The steaming example remains unresolved: do not invent a leaching mechanism from folate-retention measurements alone.

## PM1 controlled reference completion — 3 November 2026

Owner instruction: resolve PM1 issues starting with F3, complete SEC appraisal, apply PM8 tabs and approved six-atom presentation; no commit or push. Scope is BRS1-FM1-PM1, not framework-wide refactoring or certification of a finished Gold Standard.

The two existing PM1 SOPs retain their approved disclosure titles, mechanism summaries, ontology links and six atoms. Their structured MoA, measured effect, PM relevance and independent typed limitations must agree with the rendered prose. Do not infer a new confidence construct from the pilot placeholder: remove its obsolete rubric-pending note and link to the actual intervention-owned Section 4 SEC assessment. Keep numerical SEC outside the six atoms. This is owner-authorised PM1 appraisal, a bounded exception to framework-wide Pass 1 sequencing.


## PM1 Section 4 assessment-family grouping — approved 4 November 2026

Author-approved PM1-only pilot: keep the Section 4 summary visible; group Scientific Findings first, SOP assessments second, and Lifestyle Lever assessments only when present. Each family starts collapsed and uses existing `brs-fm-hub` dropdown CSS and keyboard behaviour. Individual Findings/assessments retain their own disclosures; stable deep links must open all enclosing groups. Scores, assessment ownership, six atoms and admissions are unchanged. Do not display empty Lifestyle assessment groups.

Stage 2A preserves separate scientific and intervention propositions; grouping never implies inherited scores. Stage 2B renders the approved family order and preserves the `section4-findings:end` generated boundary so regeneration cannot discard following SOP assessments. `section4_assessment_groups: true` is enabled only on PM1 in this pilot; do not activate other PMs without rollout authorisation. This presentation approval is not scientific reassessment.


### Authoritative Scientific Lesson placement — 4 November 2026

This supersedes earlier lesson-placement amendments above. Place each existing Scientific Lesson **at the end of the Section 4 Summary**, immediately after its summary prose and before mechanistic-detail or Scientific Findings disclosures. Lessons are separate sibling dropdowns, never children of the Scientific Findings parent or an individual Finding, and never appended after References. Reuse the GAD lesson CSS, book icon, concise title and initially collapsed behaviour. Preserve lesson identity, content and supporting Finding links; do not assign a new score or create a Finding. Keep the lesson outside the generated §4.1 block so regeneration cannot move or erase it. This instruction applies to existing lessons; do not invent lessons to populate every PM. Checked canonical PMs: PM1 and GAD/PM9 contain actual lesson disclosures; other authored-lesson markers alone are not lessons.


## Approved independent intervention evidence pathway — 5 November 2026

For SOPs and Lifestyle Levers, a new Scientific Finding is not required when the exact intervention–outcome proposition has independent primary references in the PM bibliography, separately recorded measured effect and PM relevance, full MoA/status, typed limitations and a valid pinned intervention-specific SEC assessment. Admission remains a separate adjudication. The validator must resolve the assessment to this PM and intervention and validate its content/hash; no Finding score may be inherited. Existing Finding links, when supplied, must remain valid. An incomplete independent record fails validation; this exception does not apply to dietary-input substance admission or allow unsupported claims. Author explicitly approved this clarification during release reconciliation. No new public presentation or numerical scoring rule.


## Approved SOP/Lifestyle food–substance joins — 6 November 2026

Author approved PM intervention-level food/substance links and reuse by the chord extractor. This does not admit an intervention, alter SEC or establish a causal mediator. Reuse canonical `food_ids`, `substance_ids`, ontology entries and exact existing six-atom links. Add only identity metadata supported by the recorded exposure; preserve preparation, comparator and limitations. Never mine unrelated Findings, outcome prose or pattern names for ingredients. Named patterns without explicit constituent identities remain unmapped. Behavioural interventions need no food/substance mapping.

Generate the shared `intervention_mapping` in the existing food-strategy roll-up with `npm run mappings:food-strategies`. It inventories both SOPs and Lifestyle Levers, including Cross-BRS, independently of food-strategy scope. Explicitly rejected/deferred/candidate records are excluded; existing canonical arrays are retained as historical admissions, not newly adjudicated. A false dietary-input flag does not reject a Lifestyle Lever.

Render documented identity links directly beneath the intervention title, using existing dietary-lever/source CSS. Preserve direct six-atom expansion and separate optional Mechanism summary. Composition-only sources are labelled separately; no seventh atom, new score, clinical claim, food-equivalence assumption or technical pathway panel. Missing mappings produce no public placeholder. Existing contextual material roles (e.g. potatoes versus extracted RS2) remain visible.

The chord consumer uses the very same generated records/typed edges: PM-to-intervention, named identity, documented composition and intervention-context-to-BRS. These edges are not dietary-input admissions or therapeutic-effect assertions. Keep composition provenance and original PM/SOP identifiers. A pattern is not expanded into foods without recorded constituent evidence.

Validation: `node --test scripts/intervention-food-substance.test.mjs`, existing dietary/Findings/SEC checks, `npm run presentation:check`, and representative browser inspection. Counts distinguish complete recorded food–substance pairs, partial identity-only mapping and unmapped records (including behaviour where a mapping is unnecessary). This is mapping completeness, not evidence confidence.
