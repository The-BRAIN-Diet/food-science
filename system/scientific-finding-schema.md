# Stage 2A — Scientific Assessment & Finding Schema

**Status:** Authoritative Stage 2A scientific assessment instruction and Finding schema. Use with the [whole-PM page schema](primary-mechanism-schema.md); proceed to the [Stage 2B contract](dietary-input-traceability-contract.md) for applicability and lever implementation.

The canonical evidence unit for mechanism pages. A Scientific Finding states a
proposition precise enough to be assessed across a body of evidence, and carries
the synthesis, the limits of that synthesis, and every study considered.

Replaces the earlier pattern of *mechanistic claim → one or more references*.

## Bounded assessment

**The ontology proposes the question. Evidence gets to challenge it.**

KC-page review uses this same bounded-assessment order on KC title, iKC,
constituent, and proposed-scope propositions (`system/kc-page-evidence-review-contract.md`).
Durable KC records remain `kc_input_traceability`; do not require PM-scoped
`PMn-F*` Finding ids on KC pages.

PM evidence assessment is not an exhaustive literature review. **Review existing
evidence first does not mean stop with existing evidence.** Work in this order:

1. **Define the proposition** — from the intended scope in Mission, every
   substantive claim in Overview, the **existing** Mechanistic Basis
   (biological propositions), published PM connections, and any **defining
   mission or pathway step** those sections omit. The Mission states the scope
   to assess; it is not evidence that the mechanism achieves that objective.
   Mechanistic Basis is the **starting** boundary for assessment, not an
   immutable one and not a licence to ignore a central step that was never
   written down.
2. **Assess relevant evidence** — inventory and review **all references already
   attached to the PM page first**, including references used by Findings,
   Phenome relationships and Connected / Supportive Evidence. Test each source
   against the actual proposition; presence on the page does not make it
   relevant or supportive. If that corpus cannot adequately establish a central
   mechanism or relationship, or if complementary or newer evidence could
   materially change the synthesis, conduct **targeted external research**. Do
   not treat corpus-first wording as a stop rule.
3. **Adjudicate** — supported, triangulated, gap, contradicted, **unresolved**,
   or **unassessed**. Those last two are not evidence-supported rejections.
4. **Stop** when each listed proposition, and each identified central
   mission/pathway step, is adjudicated or explicitly parked with an explicit
   question and a stopping rationale. Stopping because the attached
   bibliography ran out is not sufficient when a defining step remains
   unassessed.
5. **If adjudication materially challenges PM scope** — flag a PM-scope consequence
   and review Mission, Overview, and Mechanistic Basis together. See
   `system/primary-mechanism-schema.md` § **PM scope consistency (evidence assessment)**.
   This is a consistency check, not an automatic rewrite and not a return to
   open-ended research.

**Finding triggers:**

- a defined **Mechanistic Basis** proposition under test;
- a defined **PM → Phenome relationship** proposition under test; or
- a **defining mission or pathway step** required to establish the mechanism,
  including a step omitted from the current Mechanistic Basis.

Mechanistic Findings test Mechanistic Basis propositions. Phenome-linked Findings
test relationship propositions. A Finding genuinely relevant to both is authored
once and cross-referenced — never duplicated.

**Not every useful study → new Finding.** Adjacent, contextual, or wrong-construct
evidence belongs in Connected / Supportive Evidence unless it directly answers an
listed unanswered proposition. Do not expand into adjacent literature simply
because it exists. Do not use that sentence to skip targeted retrieval for a
central, still-unestablished step.

### Foundational coverage and targeted retrieval (Stage 2A)

The existing corpus is the starting point, not an automatic stopping point.
Check coverage against the mission, including defining steps omitted from
existing prose.

Stage 2A must:

- check foundational evidence across the stated mission and pathway;
- identify missing steps, unsupported claims and obvious omissions;
- conduct targeted external research where the corpus cannot adequately
  establish a central mechanism or relationship;
- check for relevant complementary or newer evidence where it could materially
  change the synthesis;
- explain, in the Stage 2A report, why the evidence coverage is sufficient
  before declaring completion.

Targeted retrieval is bounded by **explicit questions** and a **stopping
rationale** in the Stage 2A report. Do not require an exhaustive search or an
automatic search for every claim. Cost efficiency comes from targeted retrieval
and reuse of verified evidence, not from omitting necessary assessment.

Keep **unassessed**, **unresolved** and **evidence-supported negative**
decisions distinct. Record unassessed and unresolved items in the Stage 2A
report and, where durable, in `system/mechanism-change-control-queue.md`.

Before declaring Stage 2A complete, the report must explain why evidence
coverage is sufficient and record the bounded-search stopping rationale.
Successful schema validation (`findings:check`, page validators, tests) is
not scientific completion.

### Completion gate — coverage challenge and targeted second search

Before completing either stage, compare the reviewed evidence against the Mission's defining biological steps and relevant intervention candidates. Trigger a second targeted search when a material step or candidate:

- has not been assessed;
- was parked as unresolved without candidate-specific retrieval;
- was excluded using an evidence threshold stricter than the applicability contract; or
- is represented only by indirect endpoints that leave the central question unanswered.

For each triggered question, search relevant pathway, input and endpoint synonyms; follow references from useful primary studies; and seek contradictory or null findings where relevant. Reuse verified sources rather than repeating completed retrieval. Reopen Stage 2A if Stage 2B reveals omitted foundational biology.

Reassess using the permitted evidence-supported chains. Distinguish measured from inferred links, biochemical dependency from dietary applicability, and intervention effects from functional benefit. Do not impose a universal end-to-end human assay or supplementation-efficacy threshold for a biochemical dependency.

Reuse the existing stage report's candidate/evidence/rationale/disposition fields. A concise row must record **coverage gap → targeted question → research examined → revised decision → remaining gap and stopping rationale**. Record actual searches and sources examined, not only a promise to search. Complete only when each material question is adjudicated or explicitly unresolved after targeted review. An exhaustive search or fixed study/Finding count is not required. Structural validation cannot certify scientific adequacy.

### Other intervention routes — mandatory hub coverage and retrieval

For every PM assessment, inspect the parent BRS hub's **System Optimisation Practices** and **Lifestyle Priorities**, together with their definitions in [BRS hub levers schema](brs-hub-levers-schema.md). Review every category for PM-relevant candidates, including categories shown as “Coming soon”; an empty hub category is not evidence of biological irrelevance:

| Hub category | PM assessment boundary |
|---|---|
| Food Preparation & Delivery | Food structure, cooking, bioavailability and nutrient delivery. |
| Conditional Supplementation | Defined, condition-specific supplementation exposures. |
| Dietary & Fasting Protocols | Defined dietary, fasting or timing protocols. |
| Light & Circadian Optimisation | Circadian entrainment and biological timing practices. |
| Stress & Autonomic Regulation | Deliberate autonomic and adaptive-stress interventions. |
| Lifestyle Priorities | Foundational, recurrent behaviours; implemented as canonical §3.3 Lifestyle Levers, distinct from defined §3.2 protocols. |

**Required retrieval trigger:** when canonical §3.1 Dietary Requirements is not the adjudicated principal route, has very low PM-specific intervention relevance, or cannot establish a principal route, actively search primary evidence for plausible PM-specific candidates in the remaining §3.2 and §3.3 groups before completing the assessment. Existing sufficient, verified evidence may be reused with its coverage documented. Lack of a dietary admission does not establish lack of practical intervention routes.

For each hub category, record candidates and evidence decisions, or a mechanism-specific reason that no relevant candidate was identified. Search all categories with plausible PM relevance; do not dismiss a whole group because one candidate failed. Hub entries and “Supports” links propose questions, not automatic PM admissions. Assess the original sources and actual endpoints, context and limitations. Do not populate empty categories, inherit hub claims, or force a principal route merely to complete the frame.

Stage 2A assesses the biological propositions and evidence; Stage 2B adjudicates and implements requirements, practices and lifestyle relationships in their existing categories. Record evidence qualification separately from principal-route selection. Reassess placement after reviewing the relevant groups, without automatically treating supported entries as dominant or inferring equal dominance. If another stage must finish the adjudication, record the handoff and leave the combined assessment incomplete rather than declaring full lever coverage.

### Evidence-supported Overview (Stage 2A)

**References stay with this PM.** In Biological Relevance and in every other section, do not cite a study because another PM uses it. A reference may appear on this page only when it supports a claim about this page’s own mechanism. A sentence that only sets a boundary with a neighbouring PM names that PM, for example “see PM2”, and carries no citation.

Every Stage 2A PM review must assess and publish an evidence-supported
`### Overview`. Treat each substantive Overview statement as a proposition
alongside the Mission scope, Mechanistic Basis, defining pathway steps and
Phenome relationships. Do not treat inherited Overview prose as established
merely because it is already published.

**Stage ownership:** Stage 2A assesses and authors the Overview. The PM schema's **PM §1 — Mission & Overview** implements this same rule; prose guidance is supporting authoring guidance, not a separate assessment workflow. Stage 2B adjudicates dietary and other lever candidates. Overview wording must not independently admit a candidate or imply an unassessed intervention is established. When Stage 2B changes an admitted lever or its boundaries, reconcile the affected Overview claims with the Stage 2A evidence.

**Opening paragraph:** Explain the biological job, why it matters for health, and what the evidence measured, including practical support where that support is itself a measured result. Aim for ~65–75 words (acceptable authoring range 50–90), understandable in ~20 seconds. Write an orientation, not a technical study summary. Do not close the paragraph with an outcome ceiling — a statement that extra intake, supplementation, or treatment has not been shown to improve symptoms, attention, mood, or a named condition. When a lever is admitted, state one use condition in Implementation Notes: the form, the meal pattern, or the dose gap. When no lever is admitted, omit Implementation Notes.

**Overview scope:** State relevance for cognitive function and brain health. Do not name ADHD or another therapeutic area in the paragraph or the bullets. Do not mention medication. Medication is outside this framework. Condition-specific and medication evidence belongs on Therapeutic Area pages and, where a Phenome relationship requires the studied population, in §7.

**Preferred bullets, in order:**

1. **Benefits:** say what useful function is preserved when this process is adequately maintained. The rule is set out under **Benefits** below.
2. **Implementation Notes:** open with the admitted lever’s name, using the same label as Dietary Requirements, then the one use condition: form, preparation, meal pattern, or dose gap. Link to the disclosure where useful. Where no lever is admitted, omit this bullet. Do not add a bullet whose only content is that no regimen exists, and do not invent a dose, food advice, or broader ingredient effect.
3. **Biological Relevance:** name the one mix-up a nutritionist is likely to make: a neighbouring mechanism, a measurement that is not this job, or a nutrient reading that does not follow. One sentence. When the sentence only marks a neighbouring PM as outside this job, end with a pointer such as “see PM2” and do not cite that PM’s papers. Omit the bullet when the paragraph or another bullet already makes that mix-up clear.

**Benefits:** Write for a nutritionist or an informed reader. Ask what useful biological, physiological, cognitive, or everyday function this process helps preserve when it is adequately maintained. That is the value of keeping the process. It is not a claim that eating more of a listed nutrient will improve the function.

Use one to three sentences:

1. Name the function this PM regulates, supplies, or enables.
2. Say why keeping that function matters, at the highest level the page’s existing evidence supports: cellular, tissue, physiological, cognitive, or everyday. If the evidence reaches only a cellular or physiological function, stop there. Do not invent a clinical, cognitive, or everyday outcome to make the benefit sound more concrete.
3. Add a boundary only where a reader could take biological necessity as evidence that more intake produces a benefit. Say what the cited evidence does not establish about diet, supplementation, symptoms, disease, or clinical benefit. Do not put that disclaimer on every page, and do not put an outcome ceiling in the opening paragraph.

Neighbouring PMs must name their own contribution. Remethylation restores methionine. SAMe synthesis supplies the shared methyl donor. Methionine-cycle flux coordinates the competing demands. Transsulfuration directs sulfur toward cysteine. Glutathione synthesis supplies the antioxidant thiol.

Use **supports**, **helps maintain**, **contributes to**, **enables**, **supplies**, **coordinates**, or **helps protect**. Do not use **improves**, **enhances**, **prevents**, **treats**, or **reduces symptoms** unless the cited evidence establishes that outcome. Do not turn a requirement into a supplementation recommendation, and do not imply that more pathway activity, neurotransmitter, nutrient, or substrate is better. Keep nonlinear, baseline-dependent, region-specific, and population-specific qualifications. Separate the value of maintaining the process from the effect of a dietary or lifestyle intervention.

Cite each extended claim beside the sentence it supports, using a source already on the page that actually supports it. If the references support only the mechanism, call the further point biological or functional relevance, not a measured health outcome. Do not infer a downstream outcome from the PM title. If the further point cannot be supported, keep the narrower biological benefit and record the citation gap in the Stage 2A report. Revising Benefits does not change evidence classifications, dietary requirements, intervention mappings, or any other section.

A nutritionist who reads only this bullet should be able to say what function is maintained, why that matters, whether the wording is a biological requirement, a functional relevance, an observed outcome, or an intervention effect, and whether it stays inside the cited evidence.

**Adaptation:** These are preferred roles, not an exact three-bullet quota. Omit, combine or substitute a role when sufficiently relevant supported points are unavailable, and record a concise rationale in the Stage 2A report. A page with no admitted lever omits Implementation Notes. Do not pad, repeat the paragraph, or manufacture a benefit, action, or “no regimen” bullet to reach three.

**Placement:** Put detailed mechanism inclusion/exclusion boundaries, endpoint distinctions and study limitations in §4 Mechanistic Basis / Scientific Findings. Retain an essential practical claim boundary beside an implementation suggestion where necessary. The Overview must accurately reflect scope without becoming a boundary checklist. Preserve the governing Mission → Intervention Dominance → adjudicated principal groups → Overview order; do not duplicate lever groups.

**Evidence reuse — purpose and scope included:** Substantiate the Mission, purpose, scope, Overview paragraph and bullets from existing adjudicated Findings, study assessments and canonical bibliography. Record each substantive proposition's supporting Finding/source in the Stage 2A report, using a concise table where sufficient. Preserve population, context, measured endpoint and claim ceiling; introductory wording is not exempt from evidence assessment. Use claim-local numbered PM bibliography citations in explanatory prose. The concise Mission may retain its evidence trace in the report instead of an inline citation. Narrow or qualify unsupported propositions, record the exact gap and retrieve targeted evidence only where necessary; do not repeat sufficient verified research solely for the Overview.

Do not attach one general reference to a paragraph containing several claims
that the source does not support. Place each citation beside the claim or
sentence it supports. Reuse already verified evidence where it adequately
answers the proposition; conduct question-bounded retrieval when a material
Overview claim lacks sufficient evidence.

Write for interested members of the public, with nutritionists as the most
technically specialised intended readers. Keep the Overview concise and
explanatory. Study design, effect sizes and detailed limitations remain in the
Scientific Finding disclosures rather than being copied into the introduction.

Before declaring Stage 2A complete:

1. compare the Overview claim by claim with the Scientific Findings;
2. confirm every substantive citation resolves to the intended PM bibliography
   reference;
3. inspect the rendered introduction and confirm it communicates the assessed
   science and boundaries clearly; and
4. record the Overview check and any unresolved claim in the Stage 2A report.

This requirement applies to future Stage 2A runs and to a PM whenever its Stage
2A assessment is reopened. Existing uncited Overviews are a legacy review
queue, not authority to bulk-rewrite every PM without assessment. Record them
for later review and correct them through the relevant PM's Stage 2A pass.

### Retrieval authorisation (supersedes earlier session limits)

The earlier session rule requiring a **separate request** before external
research is **superseded** for Stage 2A and Stage 2B. Running either stage
authorises necessary, question-bounded evidence retrieval under its
contract. Cost concerns should guide efficient retrieval and reuse, not
omission of material assessment. Prior chat instructions, “no open
literature search” report lines, and session conventions do not restore
the old limit.

### Stage boundary — 2A mechanism, 2B diet

Stage 2A establishes the scientific mechanism: defining pathway steps,
reaction participants, regulation, functional evidence and
connected-mechanism dependencies. It identifies candidates for dietary
assessment without admitting them as Dietary Requirements.

Stage 2B adjudicates dietary relationships: provision of substrates and
cofactors, derived dietary routes and state-regulation inputs. It uses
Stage 2A Findings and retrieves further evidence where needed.

If Stage 2B discovers a missing foundational mechanism claim, record and
route that gap back to Stage 2A. Do not silently bypass the Finding
assessment. The focused follow-up path is defined in
`system/dietary-input-traceability-contract.md` § **When Stage 2B
identifies a missing foundational claim**.

Do not write PM-specific exceptions into this boundary.

### Claim thresholds

**Biochemical necessity**, **dietary provision**, **demonstrated
modulation** and **functional or clinical benefit** are distinct claims.
Do not require clinical benefit to establish a supported dependency, or
infer modulation from dependency alone.

## PM scope triangulation (headline Finding promotion)

Scientific validity is **necessary but not sufficient** for headline Primary
Mechanism Finding status.

Before promoting candidate evidence to a headline PM Finding (`PMn-Fm`), test:

1. **Mission** — Does it directly address the PM Mission?
2. **Overview** — Does it materially establish, refine, or challenge the PM Overview?
3. **Mechanism capacity** — Does it establish a biological requirement, determinant,
   capacity, or important mechanism-level constraint represented by this PM?
4. **Interpretive role** — Is its primary purpose instead to interpret another
   evidence type (e.g. concentration versus flux)?
5. **Scope drift** — Would promoting it cause the PM to drift into adjacent biology,
   measurement methodology, or general literature review?

If (4) or (5) apply without sufficient support from (1)–(3), **do not** promote to a
headline PM Finding. Represent it as Connected / Supportive / Interpretive Evidence.
If evidence genuinely shows Mission or Overview are too narrow or wrong, **raise Change
Control** — do not silently widen the PM.

This is **not** a dietary filter: non-dietary biology may qualify when it materially
establishes the mechanism in Mission + Overview.

**Worked precedent:** BRS1-FM4-PM9 — concentration-versus-synthesis is scientifically
valid but demoted to `PM9-IC1` (`interpretive-constraint`) because it constrains how
other evidence is read, not GAD-dependent synthesis capacity itself. It does **not**
render in §4.1 or as a Finding card in §5. Its scientific consequences belong in the
relevant Phenome **Rationale**, with numbered citations to the underlying studies
(Mason, Manor), not to the IC id.

**Presentation vs ownership:** Relationship Findings may be shown as supporting
evidence in §5. Interpretive constraints govern interpretation; they are not supporting
Findings. **Evidence ownership does not imply presentation.**

**PM9 §7 Phenome Connections — frozen (production exemplar):** Panel hierarchy
(strength → evidence confidence → Rationale → Supporting evidence), Rationale role,
primary-phenome-only Supporting Evidence, IC synthesis via Rationale + `{{cite:}}` (not
reader-facing IC cards), and numbered PM references are **accepted**. Change only via
concrete defect or Change Control — not opportunistic optimisation.

```
MISSION + OVERVIEW
        ↓
BOUNDED PM BIOLOGICAL AMBITION
        ↓
CANDIDATE FINDING
        ↓
Does it materially establish / refine / challenge this PM?
        ↓
YES → PMn-Fm headline Finding
NO, but scientifically useful → Supporting / Connected / Interpretive Evidence
PM scope itself challenged → Change Control
```

## Finding identity and numbering

Headline Primary Mechanism Finding ids use **`[PM ID]-F[n]`** (example: `PM9-F1`).

Interpretive constraints use **`[PM ID]-IC[n]`** and **do not** consume F sequence
numbers (example: `PM9-IC1`).

Connected / Supportive Evidence does not receive Finding ids.

While a PM is being established (pre-freeze), F numbers follow **canonical Finding
presentation order** on the page. Once a PM is formally frozen and ids have external
dependencies, **do not renumber** stable ids because presentation order, inserts, or
UI layout changed.

Finding ids are canonical for structured data, anchors, cross-references, and audit
machinery. They **must not** render as reader-facing headings or labels — use
`finding_label` in public copy.

Legacy `SF-PM8-n` ids on the former PM8 page (now PM9) were migrated to `PM9-Fn` / `PM9-IC1` when the production
contract was established.

**Depth is proportional.** Individual Study Assessment fields are complete when
present, but full extraction is required only where needed to adjudicate the
proposition — not by default on every study. Pilot 1 depth was appropriate to
architecture stress-testing; it is not the default depth for every PM.

Phase 3 phenome review (`system/phenome-relationship-review-methodology.md`)
validates Biology → Phenome Confidence for candidate relationships. It does **not**
authorise open-ended PM-wide Scientific Finding discovery.

Biology → Phenome Relationship Strength describes the proposed functional
dependency. It is conceptually separate from Synthesised Evidence Confidence,
which describes how strongly the assessed evidence supports a Scientific
Finding. Neither value may be inferred from the other.

**Biochemical requirement is not dietary modulation.** Establishing that a
substrate, ion, cofactor, enzyme or metabolite is required for a reaction does
not establish that ordinary dietary intake controls that reaction, that greater
intake increases flux, or that an intervention changes a phenome or clinical
outcome. Preserve those as separate propositions and claim levels. See
§ **Claim thresholds**: biochemical necessity, dietary provision, demonstrated
modulation and functional or clinical benefit remain distinct.

## Dietary input traceability (PM evidence)

**Input page link.** Every lever Input that has a page in this system links to
that page from the Input line inside the five-atom disclosure. The compact
heading above the disclosure stays plain text. Do not link “Glutathione —
Biochemical requirement”; link `Input = Glutathione`. This applies to PM, SM,
and KC levers. A preparation, practice, pattern, or class with no page stays
unlinked. Do not match a longer phrase to a shorter page. The resolver and
presentation rule live in `system/dietary-input-traceability-contract.md`
(**Input page link**).

When adjudication establishes a **dietary-relevant** biological requirement, follow
the **2B — Dietary Input Traceability & Visibility Contract**
(`system/dietary-input-traceability-contract.md`) — authoritative definition of the
five-atom evidence relationship, reappearance rules, presentation contract, workflow, and
optional `dietary_input_traceability` front matter.

Stage 2A public Findings and connection copy follow
`system/primary-mechanism-schema.md` § **Stage 2A — audience and public voice**
(interested public; nutritionists as the most specialised intended readers).
Stage 2A also establishes **published PM connections** in §5.2 / §5.3 (or
§6.2 / §6.3): each link needs an evidence-supported relationship explanation
before Stage 2B classifies diet. Identify supported upstream PM dependencies
so Stage 2B can display always-visible indicators beside qualifying
dietary-entry labels. See § **Stage 2A — connected-mechanism presentation**.
Record in the Stage 2A report where a detailed supply or transport assessment
lives; do not write ownership into public copy, and do not suppress a
downstream dependency.

Published §5.2 / §5.3 connection explanations are not a Type D KC mapping.
Stage 2B tests shared-constraint applicability separately
(`system/dietary-input-traceability-contract.md` § **Type D — shared-constraint
applicability**).

When a Finding supports a PM-owned **System Optimisation Practice** or **Lifestyle
Priority**, store the same five atoms in `system_optimisation_practices` or
`lifestyle_priorities`. The collection determines §3.2 or §3.3 placement. These
relationships remain in the PM scientific-evidence layer and are not provisional
Dietary Levers candidates.

Not every Finding is dietary-relevant (e.g. interpretive constraints without dietary
biology). Do not create artificial dietary-input records for those Findings.

Record downstream representation gaps in `system/mechanism-change-control-queue.md`.

## Source of truth

| Layer | Location | Status |
|-------|----------|--------|
| Findings | `scientific_findings` in PM front matter | **durable source** |
| §4.1 Summary | `scientific_findings_intro` in PM front matter | **durable source** — concise synthesis of the most relevant adjudicated findings and overall evidence picture, with studied context and limitations; not a repeat of §4 mechanism biology |
| Dietary-input atoms | `dietary_input_traceability` in PM front matter (when populated) | **durable source** — see dietary-input-traceability-contract.md |
| System Optimisation Practice atoms | `system_optimisation_practices` in PM front matter (when populated) | **durable PM scientific-evidence source** |
| Lifestyle Priority atoms | `lifestyle_priorities` in PM front matter (when populated) | **durable PM scientific-evidence source** |
| Finding → phenome links | `scientific_findings: [id]` on each `phenome_relationships` entry | **durable source** |
| PM Mechanistic Basis Finding subsection | generated by `npm run findings:sync` at canonical §4.1 or legacy §5.1 | generated |
| PM Phenome Connections body | generated by `npm run phenome:sync` at §7 | generated |
| FM §4.4 roll-up | generated by `scripts/populate-fm-evidence-highlights.mjs` from PM front matter | generated |
| References | `static/bibtex/BRAIN-diet.bib` | **durable source** |

Never hand-edit a generated section. `npm run findings:check` fails if either
the Mechanistic Basis Finding subsection or the Phenome Connections body on a
Findings-owned PM has drifted from front matter.

For pages using the canonical PM order, the same generated layers are §4.1
Scientific Findings and §7 Phenome Connections. Untouched pages may retain the
legacy §5.1 / §3 positions; shared layout detection controls placement.

Phenome freshness for Findings-owned pages is enforced by `npm run
findings:check`. To repair a stale page, regenerate only the target file (`npm
run phenome:sync -- --file <path> --pm-only`) and inspect the target-scoped
change. Relationship Findings render fully only in their declared
`primary_phenome`; other relationships reference the same Finding id and must
not inline a duplicate evidence body.

## Cardinality

```
Scientific Finding → 0..n phenome relationships
```

A Finding is authored **once**. Relationships reference it by id; they never
inline a copy. A Finding that informs no relationship is valid when the proposition does not map
to any phenome attached to that PM.

`Scientific Finding → 0..n Nutritional Targets` is accepted conceptually but is
**not implemented**.

## Structure

```yaml
scientific_findings:
  - id: PM9-F1                        # PMn-Fm headline; PMn-ICk interpretive — unique on page
    finding_label: >-                 # required — human-readable title (Level 1–2 default)
    presentation: mechanistic-basis   # mechanistic-basis | phenome-relationship | interpretive-constraint
    primary_phenome: Emotional Regulation # required only for phenome-relationship presentation
    fm_rollup: true                   # explicit FM §4.4 selection; omit/false means no roll-up
    therapeutic_area_ids:            # optional — condition populations directly represented by the Finding
      - TA001                        # canonical IDs from phenome-registry.json; not inferred from Phenome relevance
    finding_summary: >-               # recommended — plain-language opening (self-contained)
    finding_interpretation: >-        # optional — practitioner “What this means” / boundary
    finding_statement: >-             # required — the assessable proposition (Level 3 audit)
    finding_discriminator: >-         # conditional — only when siblings could be confused
    synthesised_evidence_confidence: not-yet-scored   # only authorised value
    synthesis: >-                     # required — what the evidence supports together
    synthesis_limitations: >-         # required — how far it can be taken together
    evidence_considered:              # required, ≥1
      - label: Martin & Rimvall (1993)
        citation_key: martin_regulation_1993
        href: /docs/papers/BRAIN-Diet-References#martin_regulation_1993
        data_level: Mechanistic       # see phenome-relationship-schema.md
        exposure_context: isolated-substance # optional, extensible; preserve what was tested
        evidence_source: bounded-external-search   # or repository-inherited
        directional_finding: >-       # required — collapsed line, direction preserved
        assessment:                   # Individual Study Assessment
          study: >-
          population: >-              # mandatory; therapeutic-area framework
          result: >-                  # direction must be preserved
          effect_magnitude: >-        # say so plainly when none is interpretable
          evidence_summary: >-
          limitations: >-
    connected_supportive_evidence:    # optional
      - label: …
        why_relevant: >-
        why_excluded: >-              # why it is not in the primary synthesis
    evidence_dependency:              # optional; free prose, one note per dependency
      - >-
```

## Rules enforced by `validateScientificFindings`

- Finding ids are unique and match `PMn-Fm` (headline) or `PMn-ICk` (interpretive constraint).
- `therapeutic_area_ids`, when present, is a list of canonical Therapeutic Area IDs.
  Tag only a condition population directly assessed or synthesised by the Finding;
  do not infer tags from a Phenome's broader Therapeutic Area relevance.
- Headline mechanistic Findings use `presentation: mechanistic-basis`; interpretive
  constraints use `presentation: interpretive-constraint` (not headline Findings; render
  at the point of inference they constrain — typically the referencing Phenome Connection
  in §5, not automatically in §4.1).
- `finding_statement`, `synthesis` and `synthesis_limitations` are present.
- `synthesised_evidence_confidence` is `not-yet-scored`. There is no authorised
  mapping from legacy confidence values, and the confidence indicator must
  receive a determined state rather than infer one.
- Every study has a `directional_finding` and a valid `evidence_source`.
- `data_level` comes from the shared reference vocabulary.
- `exposure_context`, when present, is a non-empty description of what was tested
  (`whole-food`, `dietary`, `isolated-substance`, `standardised-extract`,
  `supplemental-formulation`, `combination-formulation`, or a more precise value).
  It belongs to the evidence relationship, not the intrinsic entity, and the
  vocabulary remains extensible rather than a closed enum.
- An Individual Study Assessment, when present, is complete.
- Connected / Supportive Evidence states both why relevant and why excluded.
- Every `scientific_findings` id on a relationship resolves to a declared Finding.
- A study may be primary Evidence Considered in more than one Finding when it
  bears on more than one proposition; reuse must be declared under Evidence
  Dependency so it cannot read as independent replication.
- FM evidence selection is explicit: only non-interpretive Findings carrying
  `fm_rollup: true` may enter FM §4.4. There is no declaration-order or
  “first two Findings” fallback.
`confidence`, `evidence_confidence`, `evidence_level` and `relationship_type` on
## PM numbered references (presentation)

On first mention within a PM section, Scientific Finding evidence renders as
**`Author et al. (year) [n]`**; two-author studies render as
**`Author and Author (year) [n]`**. The numbered square bracket links to the
canonical `## 7. References` entry (anchor `pm-ref-n`). Later mentions in the same
section may use linked `[n]` alone. Author text, year, number and link are all derived
from the same front-matter reference record, never maintained as parallel display data.
Use `{{cite:citation_key,citation_key}}` in `phenome_relationships[].rationale`; sync
resolves keys to canonical author–year + numbered links. The same `citation_key`
always maps to the same number on a given PM page. Validation fails on missing,
duplicate, stale, misnumbered or unlinked body citations and reference anchors.

phenome relationships are **legacy** values on a different scale from
Synthesised Evidence Confidence. Findings do not read, rescore or replace them.
Where adjudication shows a legacy value is no longer adequate, record it in
`system/mechanism-change-control-queue.md` rather than silently changing it.

### Scientific Findings — Summary authoring rule

Summarise the most relevant adjudicated findings and the overall evidence picture in a short reader-facing paragraph. State what the strongest evidence establishes, identify important convergence or differences in results, and preserve the studied context and principal inference boundary. Distinguish measured endpoints from inferred mechanisms. Reuse the existing Finding records and target-page numbered bibliography references. Do not substitute a mechanism walkthrough, nutrient inventory, list of section contents, or generic statement that “the findings below” support the biology. §4 explains how the process works; this Summary explains what its evidence shows. Where evidence is limited to biochemical or preclinical work, say so without manufacturing a human result. Summarise rather than enumerate every study; adapt length to the available evidence. Necessary biological wording may recur for clarity: the test is added evidence interpretation, not artificial variation. Preserve the stable `scientific_findings_intro` source field.
