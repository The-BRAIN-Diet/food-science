# Scientific Finding schema

The canonical evidence unit for mechanism pages. A Scientific Finding states a
proposition precise enough to be assessed across a body of evidence, and carries
the synthesis, the limits of that synthesis, and every study considered.

Replaces the earlier pattern of *mechanistic claim → one or more references*.

## Bounded assessment

**The ontology proposes the question. Evidence gets to challenge it.**

PM evidence assessment is not a literature review. Work in this order:

1. **Define the proposition** — from the **existing** Mechanistic Basis (biological
   propositions) or from a PM → Phenome relationship row (relationship propositions).
   Mechanistic Basis is the **starting** boundary for assessment, not an immutable one.
2. **Assess relevant evidence** — attached corpus first; targeted follow-up only
   when a defined proposition cannot be adjudicated from what is already in hand.
3. **Adjudicate** — supported, triangulated, gap, or contradicted.
4. **Stop** when each listed proposition is sufficiently adjudicated.
5. **If adjudication materially challenges PM scope** — flag a PM-scope consequence
   and review Mission, Overview, and Mechanistic Basis together. See
   `system/primary-mechanism-schema.md` § **PM scope consistency (evidence assessment)**.
   This is a consistency check, not an automatic rewrite and not a return to open-ended
   research.

**Finding triggers (only two):**

- a defined **Mechanistic Basis** proposition under test; or
- a defined **PM → Phenome relationship** proposition under test.

Mechanistic Findings test Mechanistic Basis propositions. Phenome-linked Findings
test relationship propositions. A Finding genuinely relevant to both is authored
once and cross-referenced — never duplicated.

**Not every useful study → new Finding.** Adjacent, contextual, or wrong-construct
evidence belongs in Connected / Supportive Evidence unless it directly answers an
listed unanswered proposition. Do not expand into adjacent literature simply
because it exists.

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

**Worked precedent:** BRS1-FM4-PM8 — concentration-versus-synthesis is scientifically
valid but demoted to `PM8-IC1` (`interpretive-constraint`) because it constrains how
other evidence is read, not GAD-dependent synthesis capacity itself. It does **not**
render in §4.1 or as a Finding card in §5. Its scientific consequences belong in the
relevant Phenome **Rationale**, with numbered citations to the underlying studies
(Mason, Manor), not to the IC id.

**Presentation vs ownership:** Relationship Findings may be shown as supporting
evidence in §5. Interpretive constraints govern interpretation; they are not supporting
Findings. **Evidence ownership does not imply presentation.**

**PM8 §5 Phenome Connections — frozen (production exemplar):** Panel hierarchy
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

Headline Primary Mechanism Finding ids use **`[PM ID]-F[n]`** (example: `PM8-F1`).

Interpretive constraints use **`[PM ID]-IC[n]`** and **do not** consume F sequence
numbers (example: `PM8-IC1`).

Connected / Supportive Evidence does not receive Finding ids.

While a PM is being established (pre-freeze), F numbers follow **canonical Finding
presentation order** on the page. Once a PM is formally frozen and ids have external
dependencies, **do not renumber** stable ids because presentation order, inserts, or
UI layout changed.

Finding ids are canonical for structured data, anchors, cross-references, and audit
machinery. They **must not** render as reader-facing headings or labels — use
`finding_label` in public copy.

Legacy `SF-PM8-n` ids on PM8 were migrated to `PM8-Fn` / `PM8-IC1` when the production
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
outcome. Preserve those as separate propositions and claim levels.

## Dietary input traceability (PM evidence)

When adjudication establishes a **dietary-relevant** biological requirement, follow
the **Dietary Input Traceability & Visibility Contract**
(`system/dietary-input-traceability-contract.md`) — authoritative definition of the
four-field atomic unit, reappearance rules, presentation contract, workflow, and
optional `dietary_input_traceability` front matter.

Not every Finding is dietary-relevant (e.g. interpretive constraints without dietary
biology). Do not create artificial dietary-input records for those Findings.

Record downstream representation gaps in `system/mechanism-change-control-queue.md`.

## Source of truth

| Layer | Location | Status |
|-------|----------|--------|
| Findings | `scientific_findings` in PM front matter | **durable source** |
| §4.1 Introduction/Summary | `scientific_findings_intro` in PM front matter | **durable source** — reader-facing biology for this PM (requirements, boundaries); not evidence-system or page-architecture prose |
| Dietary-input atoms | `dietary_input_traceability` in PM front matter (when populated) | **durable source** — see dietary-input-traceability-contract.md |
| Finding → phenome links | `scientific_findings: [id]` on each `phenome_relationships` entry | **durable source** |
| PM Mechanistic Basis Finding subsection | generated by `npm run findings:sync` at canonical §4.1 or legacy §5.1 | generated |
| PM Phenome Connections body | generated by `npm run phenome:sync` at canonical §5 or legacy §3 | generated |
| FM §4.4 roll-up | generated by `scripts/populate-fm-evidence-highlights.mjs` from PM front matter | generated |
| References | `static/bibtex/BRAIN-diet.bib` | **durable source** |

Never hand-edit a generated section. `npm run findings:check` fails if either
the Mechanistic Basis Finding subsection or the Phenome Connections body on a
Findings-owned PM has drifted from front matter.

For pages using the canonical PM order, the same generated layers are §4.1
Scientific Findings and §5 Phenome Connections. Untouched pages may retain the
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
  - id: PM8-F1                        # PMn-Fm headline; PMn-ICk interpretive — unique on page
    finding_label: >-                 # required — human-readable title (Level 1–2 default)
    presentation: mechanistic-basis   # mechanistic-basis | phenome-relationship | interpretive-constraint
    primary_phenome: Emotional Regulation # required only for phenome-relationship presentation
    fm_rollup: true                   # explicit FM §4.4 selection; omit/false means no roll-up
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

Scientific references on PM pages prefer **numbered square-bracket citations** linked
to the canonical `## 8. References` section (anchors `pm-ref-n`). Numbers are derived
from the front matter `references` array order — not hand-typed in durable prose.
Use `{{cite:citation_key,citation_key}}` in `phenome_relationships[].rationale`; sync
resolves keys to display numbers. The same `citation_key` always maps to the same
number on a given PM page.

phenome relationships are **legacy** values on a different scale from
Synthesised Evidence Confidence. Findings do not read, rescore or replace them.
Where adjudication shows a legacy value is no longer adequate, record it in
`system/mechanism-change-control-queue.md` rather than silently changing it.
