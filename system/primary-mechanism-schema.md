# Primary Mechanism (PM) Schema

**Governing assessment instructions:** [Stage 2A — scientific assessment](scientific-finding-schema.md) and [Stage 2B — applicability and lever implementation](dietary-input-traceability-contract.md). This schema governs the whole PM page; it is not a substitute for either assessment stage.

Citation and reference format: **`system/brs-citation-reference-standard.md`**.

## Build Gate Proviso

- Never render or expose spreadsheet letter identifiers in generated content or public-facing pages.
- Always use semantic entity names (for example, `Intervention Dominance`, `Coverage Timing`, `Evidence Type`).
- Treat any letter-identifier wording in generated outputs as a validation failure that must be fixed before build.

This schema defines the canonical data contract for Primary Mechanism pages.
It is derived from the PM specification and enforces one-to-one FM ownership.

## Spreadsheet Interpretation Authority

- Use `system/brs-spreadsheet-schema.md` as the authoritative column-by-column
  interpretation for spreadsheet ingestion.
- When schema structure and spreadsheet interpretation need coordination, do not
  infer; resolve using the spreadsheet schema and generation rules.

## Related: Specific Mechanisms (SM)

SM pages reuse this schema’s **Profile A extended** rendering contract (section order, collapsibles, scoreable table, timing front matter). See `system/specific-mechanism-schema.md`. SMs are interpretation layers (`SM-SNP`, `SM-CROSS`) — not additional PM ontology. `SM-PHEN` is retired in favour of the Phenome Registry.

## Scope

- Represents a specific intervention-influenceable biological mechanism.
- Contributes to exactly one FM.
- Must remain mechanistic (not FM/system interpretation).

## Required Top-Level Fields

```yaml
id: string                           # e.g. "BRS2-FM1-PM3"
name: string
brs: string
mission: string                      # required on Profile A PMs; maps to ### Mission (1–2 lines)
summary: string                      # maps to Overview opening paragraph (~65–75 words); FM hub accordions
overview: string                     # <=120 words
functional_outputs_directional_effects: string
dependencies:                        # from spreadsheet dependencies field
  kcs:
    - id: string
      name: string
      type: "substrate" | "precursor"
  connected_mechanisms:
    - id: string
      name: string
cofactors:                           # from cofactors field; cofactors only
  - id: string
    name: string
inputs:                              # from inputs field using evidence from key studies
  dietary:
    kc_inputs:
      - kc_id: string
        rationale: string
    substances:
      - substance: string            # must exist in system
        efficacy_note: string
    foods:
      - food: string                 # must exist in system
        linked_substances: [string]
        rationale: string
  environmental:
    - factor: string
      effect: string
outputs_biological_effects:
  - string                           # metabolites/signaling/neurotransmitter/pathway effects
functional_mechanism_ownership:      # from Column P
  fm_id: string
  fm_name: string
intervention_dominance:              # legacy ingest metadata; not a scientific placement decision
  mode: "diet-dominant" | "lifestyle-dominant" | "mixed"
  inherit_from_fm: boolean            # legacy only; never establishes PM dominance
  override_justification: string     # required if inherit_from_fm=false
constraints_failure_modes:
  - type: string                     # e.g. substrate deficiency, cofactor deficiency, bottleneck
    description: string
notes:
  - string                           # optional
references:
  - index: number
    label: string                    # Author et al. (Year) — Short Descriptive Study Topic
    citation_key: string
    href: string                     # /docs/papers/BRAIN-Diet-References#citation_key
missing_entities:                    # optional
  foods: [string]
  substances: [string]
evidence_status: string              # optional authoring state; e.g. stage-1-structural, stage-2a-scientific-evidence, stage-2b-dietary-addressability
mechanistic_authoring_required: bool # optional; true while full evidence authoring is pending
dietary_addressability: string       # optional; use not-established when actionability is unassessed
claim_ceiling: string                # optional; biological-dependency prevents intervention uplift
candidate_cross_brs_relationships:   # optional, authoring metadata only
  - target_brs: string
    relationship_scope: string
    status: evidence-pending
phenome_relationships:               # optional; authoritative translational mappings
  - target_phenome: string
    relationship_type: supports | disrupts | modulates | indirect
    confidence: low | low-medium | medium | high
    evidence_level: mechanistic | observational | intervention | clinical
    rationale: string
    references:                        # same shape as references above
      - index: number
        label: string
        citation_key: string
        href: string
```

## Evidence-ready structural state

A newly created PM may be integrated before its dedicated evidence assessment
only when all of the following hold:

- `evidence_status: stage-1-structural`;
- `mechanistic_authoring_required: true`;
- unassessed dietary actionability is recorded as
  `dietary_addressability: not-established`;
- the public claim ceiling does not exceed `biological-dependency`;
- `phenome_relationships`, references, Findings, dietary lever atoms and
  scoreable inputs remain empty or omitted until supported;
- possible cross-BRS dependencies use
  `candidate_cross_brs_relationships` with `status: evidence-pending`.

Candidate relationships are authoring metadata. They must not enter a public
mechanical roll-up, confidence uplift, dietary output or Phenome projection.
Placeholders must be labelled as pending and must not read as established
findings.

## Timing Specific (required ontology metadata; not a default public body section)

`timing_specific` is **required in front matter** on all PM pages (`Yes` | `No`). It must **not** appear as a standalone numbered body section (`## N. Timing Specific` with only `Yes` or `No`). Where timing materially alters interpretation, discuss it within **§4.3 Lifestyle Levers**, **Primary Biological Effects**, or **Mechanistic Basis**.

`intervention_breakdown` in front matter remains spreadsheet ingest metadata and is **not** rendered as a public body section. Canonical `intervention_dominance` retains its qualification label and governing meaning; it is not a placement decision. Canonical assessed pages render `intervention_dominance_assessment` immediately after Mission, followed by independently adjudicated principal groups before Overview; unassessed legacy pages retain their current layout pending review.

## Section body prose

Sections must not restate the page title, entity ID, BRS name/number, or Definition. Each section follows only its schema role. See `system/mechanism-page-section-prose.md`.

## Section Order (Page Rendering Contract)

First line of the MDX body (after front matter) must be the mechanism title: `## <PM_ID> - <PM name>` (same heading level as numbered sections; do not use `#` or `###` for this line). Optional **functional descriptor** on the next line — parenthetical explanation of biological role (see `system/mechanism-page-section-prose.md` **Page title block**). The title names the mechanism; the functional descriptor explains what it does.

Three **profiles** are allowed; pick one per PM and keep numbering contiguous (no gaps in `## N.` sequence).

### Profile A — Extended narrative PM (all BRS PM pages)

**Canonical production order:** Mission & Overview (§1) →
Primary Biological Effects (§2) → Levers (§3) → Mechanistic Basis (§4, with
§4.1 Scientific Findings where authored) → BRS Pathways and Connections (§5) →
Phenome Connections (§7) → References (§8). §6 is unused (Scoreable Inputs removed).

1. Mission & Overview — `## 1. Mission & Overview` with `### Mission`, visible Intervention Dominance and adjudicated dominant lever groups, then `### Overview` (~65–75 word paragraph + normally 3 useful scannable bullets; adapt when evidence does not support all three). Front matter: `mission` + `summary`. See **PM §1 — Mission & Overview** and `system/mechanism-page-section-prose.md`. **Do not use `## 1. Definition` on PM pages.**
2. Primary Biological Effects — `## 2. Primary Biological Effects` (directional arrow summary)
3. Intervention Levers — `## 3. Intervention Levers` (legacy §4) — public section for dietary requirements, system optimisation and lifestyle implementation (see **PM Levers** below)
   - Canonical group IDs below retain their meanings; visible numbering follows displayed placement through the shared dominance transform.
   - **3.1 Dietary Requirements** — outer `<details>` dropdown
     - **3.1.1 Direct and/or Derived Dietary Requirements** — PM-attributable dietary requirements, with Direct and Derived relationships distinguished.
     - **3.1.2 Cofactors and Substrates** — the actual biochemical cofactors and substrates required by the PM mechanism.
     - **3.1.3 Key Constraints** — shared nutritionally constrained resource pools or bottlenecks satisfying the KC schema.
   - **3.2 System Optimisation Practices** — outer `<details>` dropdown containing only evidence-populated nested category dropdowns: **Food Preparation & Delivery**, **Conditional Supplementation**, **Dietary & Fasting Protocols**, **Light & Circadian Optimisation**, and **Stress & Autonomic Regulation**. Do not render empty categories on PM pages; the parent BRS hub retains the complete five-category frame and its “Coming soon” states.
   - **3.3 Lifestyle Levers** (hub: **Lifestyle Priorities**) — `<details>` dropdown for foundational/recurrent non-dietary behaviour (sleep, meal timing/rhythm, activity, stress recovery, circadian sleep–wake). Not food choice, nutrients, dietary patterns, or cooking. Classify by **use**: routine behaviour here; a defined protocol belongs in §3.2.
4. Mechanistic Basis — `## 4. Mechanistic Basis` (legacy §5)
   - **Canonical structure (Profile A):** see **PM Mechanistic Basis — Canonical four-part narrative** below. **Reference page:** [BRS1-FM1-PM1](/docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation).
   - **`### Summary` (required):** why this mechanism matters — the integrative implication in plain language, not a restated Definition or repeated mechanism name.
   - **Body (required):** three or more `#### (…)` blocks after Summary, in order: **primary mechanism** (one or more thematic blocks) → **boundaries** → **integration** (KCs, parent FM, cross-links). Explain how the mechanism works; do not re-define the entity.
   - **`<details>` (recommended on Profile A reference pages):** keep **`### Summary` visible**; wrap all post-Summary mechanism content (every `####` block: primary mechanism, boundaries, integration) in one `<details><summary>…</summary>…</details>` inside Mechanistic Basis. Do **not** put Summary or Scientific Findings inside this dropdown.
   - **Citations (required where evidence-backed):** keep inline citations in Mechanistic Basis when rewriting or shortening prose — see **PM Mechanistic Basis — Citations** below. Do not drop references to make the narrative “cleaner.”
   - **Excluded from the mechanism dropdown:** dietary levers, substance ← food bullets, lifestyle levers (§3). Scientific Findings use `### 4.1` on canonical pages (`### 5.1` legacy) at the end of Mechanistic Basis.
4.1. Scientific Findings — `### 4.1 Scientific Findings` (optional, recommended on authored PMs) — generated from `scientific_findings`; relationship-specific Findings render under their primary §7 relationship.
5. BRS Pathways and Connections — `## 5. BRS Pathways and Connections` — unified heading on all Profile A PMs (host-BRS placement and cross-BRS links)
   - `### 5.1` BRS Pathways — ordered multi-step pathway chains across PMs (and optionally FMs) when materially relevant; use linked PM labels with `↓` between steps on separate lines. Example (BRS2-FM1-PM1): homocysteine remethylation → phospholipid methylation → neuronal membrane DHA incorporation.
   - `### 5.2` Cross-BRS Mechanism Relationships — PM/FM links in other BRS domains (former standalone `## 7. Connected Mechanisms`; harmonised with FM §6 heading)
   - `### 5.3` Local BRS Mechanism Relationships — sibling PMs on the same host FM (`mechanisms_covered` on parent FM, excluding this PM)
7. Phenome Connections — `## 7. Phenome Connections` — translational mappings from `phenome_relationships`; canonical disclaimer required; empty state when unmapped
8. References — `## 8. References`

Do **not** include **Scoreable Inputs & Modulation Signals** on PM pages.

### Nutrient naming

Apply [Nutrient naming conventions](nutrient-naming-conventions.md) to vitamin names, form-specific claims and structured input/presentation labels. Keep family, specific form, preferred display label and aliases separately in the authoring/identity record; project labels through existing accepted page fields. This applies to Stage 2A handoff and Stage 2B adjudication.

### Stage 2A — audience and public voice

**Intended readers:** interested members of the public. Nutritionists are the
most technically specialised intended readers. Do not assume PhD-level
biology knowledge.

Stage 2A public copy must:

- give a plain, scientifically precise explanation of what the mechanism does
  and, where a dietary relationship is in scope, why that dietary input
  matters;
- gloss necessary technical terms briefly on first use, and keep deeper
  evidence in expandable disclosures (Scientific Findings and the five-atom
  record);
- when a lever Input has a page in this system, link that page from the
  Input line inside the five-atom disclosure only. The compact heading above
  the disclosure stays plain text. See
  `system/dietary-input-traceability-contract.md` (**Input page link**);
- describe every published connected-PM relationship and dependency in 1–2
  evidence-supported lines, including direction where established;
- identify structured upstream dependencies for Stage 2B so always-visible
  indicators can be rendered (including `Supply: PM1` beside Tyrosine);
- state limitations that say what the evidence does and does not establish.

**Separate layers.** Reader-facing scientific explanation belongs on the
public PM page. Internal governance — ownership, adjudication status,
duplicate counting, record maintenance, and scoreable-atom language —
belongs in Stage 2A reports, schema documentation and Review & Corrections.
Public copy must not use internal maintenance phrasing such as “on this page”, “owned by”, “assessment is maintained”, “local listing”, “same-role reprint” or “scoreable atom”.

Do not meet the audience by deleting substantive science or replacing it
with generic statements.

Research coverage for Stage 2A follows
`system/scientific-finding-schema.md` § **Bounded assessment**,
§ **Foundational coverage and targeted retrieval (Stage 2A)**,
§ **Retrieval authorisation (supersedes earlier session limits)**,
§ **Stage boundary — 2A mechanism, 2B diet** and § **Claim thresholds**.

Review **all references already attached to the PM page first**, including
Finding, Phenome and Connected / Supportive Evidence sources, and test each
against the proposition. A source being listed does not establish that it
supports the claim. Reviewing existing evidence first does not mean stop with
existing evidence.
The earlier session rule requiring a separate request before external
research is superseded for Stage 2A and Stage 2B. Running either stage
authorises necessary, question-bounded evidence retrieval under its
contract. Cost concerns should guide efficient retrieval and reuse, not
omission of material assessment.

Stage 2A establishes the scientific mechanism and identifies candidates for
dietary assessment without admitting Dietary Requirements. Stage 2B
adjudicates dietary relationships against Stage 2A Findings. Successful
schema validation is not scientific completion.

### Stage 2A — connected-mechanism presentation

Stage 2A must establish and explain every **published** PM connection in
`### 5.3` / `### 6.3` Local BRS Mechanism Relationships and the equivalent
cross-BRS section (`### 5.2` / `### 6.2`). Identify supported upstream PM
dependencies for Stage 2B handoff, including any dietary-entry relationship
that should appear as a structured `upstream_pm_relationships` record.
Stage 2B classifies diet and displays those upstream relationships beside
the dietary-entry label; it does not invent the relationship explanation.

Every published connection must include:

- the linked PM title; and
- a 1–2 line, evidence-supported description of the biological relationship
  and any dependency, including direction where established.

A bare link is insufficient. Distinguish substrate supply, transport, shared
resources, downstream conversion, reciprocal interaction and functional
coordination. Do not imply a dependency where only an association is
supported. Record in the Stage 2A report where a detailed supply or
transport assessment lives; public connection copy explains the biology and
must not suppress a downstream dependency. Do not publish a second bare copy
of the same PM link in §5.3.

§5.1 pathway chains remain ordered linked titles with `↓` and are not this
rule. Empty sections may use `- None listed`.

Validators: `validatePublishedPmConnectionExplanations` in
`scripts/lib/pm-relationship-sections.mjs`, applied to pages that carry
`scientific_findings`.

### PM §1 — Mission & Overview

**References stay with this PM.** In Biological Relevance and in every other section, do not cite a study because another PM uses it. A reference may appear on this page only when it supports a claim about this page’s own mechanism. A sentence that only sets a boundary with a neighbouring PM names that PM, for example “see PM2”, and carries no citation.

**Stage 2A ownership:** Assess and author this section under `system/scientific-finding-schema.md`, **Evidence-supported Overview (Stage 2A)**. These schema rules implement that instruction; supporting prose guidance does not replace Stage 2A. Stage 2B adjudicates lever candidates, and changes to admitted levers require reconciliation of affected Overview claims with the Stage 2A evidence. The Overview does not independently admit requirements or interventions.

**Heading:** `## 1. Mission & Overview`

**Purpose:** Open every PM with biological ambition (Mission), the adjudicated intervention qualification and principal groups, then a useful Overview explaining purpose, health significance and implementation context before Primary Biological Effects. Preserve the governing lever-placement rule.

```
## 1. Mission & Overview

### Mission
[1–2 lines — biological ambition]

### Overview
[~65–75 words — orientation paragraph + normally 3 useful scannable bullets; adapt when evidence does not support all three]
```

| Subsection | Role | Rules |
|------------|------|--------|
| **Mission** | Biological ambition — what capability this PM maintains or supports | 1–2 lines; functional biological capacity; **no** nutrients, foods, interventions, biomarkers, or title paraphrase |
| **Overview** | Orientation — the purpose, health significance and usable intervention routes, in ~20 seconds | **~65–75 word evidence-supported paragraph** + **normally 3 non-duplicative scannable bullets** (Benefits / Implementation Notes / Biological Relevance); adapt rather than pad when relevant points are unavailable. Biological Relevance names one nutritionist mix-up; Pathways and Connections keeps the fuller map |

**20-second acid test:** Can someone understand this page's purpose in ~20 seconds? If not, the Overview is doing too much.

**Overview paragraph — purpose and usefulness:** Explain what the PM does, why its function matters for health, and what the evidence measured. Use plain language and a ~65–75 word opening rather than a technical study summary. Do not close the paragraph with an outcome ceiling about extra intake, supplementation, or treatment. When a lever is admitted, put one use condition in Implementation Notes only: the form, the meal pattern, or the dose gap. When no lever is admitted, omit Implementation Notes. State relevance for cognitive function and brain health. Do not name ADHD or another therapeutic area, and do not mention medication; medication is outside this framework. A biological benefit explains the value of the function; it is not automatically a demonstrated benefit from increasing intake or taking a supplement.

**Evidence reuse — including purpose and scope:** Reuse the PM’s existing adjudicated Scientific Findings, study assessments and canonical bibliography to substantiate the Mission, statements of purpose and inclusion/exclusion scope, the Overview, and all three bullet roles. Translate the supported biology into accessible language without broadening the claim, population, context or outcome. A purpose, benefit or cross-system statement is not exempt from evidence support because it is introductory. Connect each substantive proposition to the relevant existing Finding and source in the authoring/review record, and use claim-local numbered citations in public explanatory prose; the concise Mission need not carry a citation if its evidence trace is recorded. Do not treat the presence of a reference as support for every statement. Where the existing evidence does not support a proposition, narrow or qualify it, record the precise gap, and retrieve targeted evidence only when needed. Reuse sufficient verified evidence rather than repeating research solely to supply the Overview.

**Overview bullets — preferred order:**

1. **Benefits:** say what useful function is preserved when this process is adequately maintained. That is the value of keeping the process, not a claim that eating more of a listed nutrient will improve the function. In one to three sentences, name the function this PM regulates, supplies, or enables, then why keeping it matters at the highest level the page’s existing evidence supports. If that evidence reaches only a cellular or physiological function, stop there. Add a boundary only where a reader could take biological necessity as evidence that more intake produces a benefit. Neighbouring PMs must name their own contribution. Use supports, helps maintain, contributes to, enables, supplies, coordinates, or helps protect. Do not use improves, enhances, prevents, treats, or reduces symptoms unless the cited evidence establishes that outcome. Cite each extended claim beside the sentence it supports. If the further point cannot be supported, keep the narrower biological benefit and record the citation gap. Follow [Stage 2A — Evidence-supported Overview](scientific-finding-schema.md#evidence-supported-overview-stage-2a).
2. **Implementation Notes:** open with the admitted lever’s name, in the same words as Dietary Requirements, then one use condition: form, preparation, meal pattern, or dose gap. Link to the disclosure where useful. Where no lever is admitted, omit this bullet. Do not write a bullet that only says no regimen exists, and do not invent a dose, generic food recommendation, or broader ingredient effect.
3. **Biological Relevance:** name the one mix-up a nutritionist is likely to make: a neighbouring mechanism, a measurement that is not this job, or a nutrient reading that does not follow. One sentence. When the sentence only marks a neighbouring PM as outside this job, end with a pointer such as “see PM2” and do not cite that PM’s papers. Omit the bullet when the paragraph or another bullet already makes that mix-up clear. Follow [Stage 2A — Evidence-supported Overview](scientific-finding-schema.md#evidence-supported-overview-stage-2a).

**Adaptation rule:** These are the default three roles, not a paperwork quota. Where sufficiently relevant, supported points are unavailable, omit or combine a role, or substitute a more useful evidence-supported orientation point. A page with no admitted lever omits Implementation Notes. Record a brief rationale in the review record. Do not pad, repeat the paragraph, or manufacture a benefit, action, or “no regimen” bullet merely to reach three. Preserve a concise, useful Overview.

**Placement:** mechanism inclusion/exclusion boundaries, endpoint distinctions and detailed study limitations belong in **§4 Mechanistic Basis / Scientific Findings**, not as the default Overview bullets. Keep an essential practical claim boundary beside an implementation suggestion when needed for accurate use. Full relationship navigation remains in Pathways and Connections.

Paragraph and bullet claims require readable, claim-local numbered bibliography citations. Review the PM's existing evidence before targeted retrieval; listed references do not automatically support every claim. The opening must stand alone for a reader with no BRS knowledge. Biological Relevance is that one mix-up. Pathways and Connections keeps the fuller map.

**Front matter:**

| Field | Maps to | Notes |
|-------|---------|--------|
| `mission` | `### Mission` | Required on Profile A PMs |
| `summary` | Overview opening paragraph | Bullets are body-only |

**Good Mission examples:**

- Maintain coordinated glutamate clearance to preserve excitatory–inhibitory stability.
- Maintain a resilient gut microbial ecosystem that supports beneficial metabolite production and gut–brain signalling.
- Maintain efficient ketone utilisation to support flexible neuronal energy metabolism.

**Anti-patterns:** repeating the PM title; naming a molecule or microbial species as the mission; opening with dietary advice; textbook-length Overview prose; parent FM architecture in Overview.

Authoring detail: `system/mechanism-page-section-prose.md` (**PM §1**, **PM translational writing**, **Technical language policy**, **PM UX progression**).

**Canonical PM example:** [BRS5-FM1-PM3 — Keystone Taxa Support](/docs/biological-targets/brs5/fm1/brs5-fm1-pm3-keystone-taxa-support).

### PM scope consistency (evidence assessment)

**Authoritative rule.** A PM is represented at three levels:

| Level | Section | Role |
|-------|---------|------|
| **Mission** | `### Mission` (§1) | Highest-level purpose — what biological capability this PM maintains or supports |
| **Overview** | `### Overview` (§1) | Concise definition and scope — why the mechanism matters in ~20 seconds |
| **Mechanistic Basis** | §4 Mechanistic Basis (+ §4.1 Scientific Findings where present) | Detailed biological propositions that support that scope |

**Mechanistic Basis is a testable boundary, not an immutable one.** Bounded evidence assessment begins from propositions defined in the existing Mechanistic Basis (see `system/scientific-finding-schema.md` § Bounded assessment). Evidence may establish that the supported **scope, definition, boundary, or interpretation** of the Primary Mechanism must change.

**When adjudication materially changes what the PM can reasonably claim:**

1. **Flag a PM-scope consequence** — record in `system/mechanism-change-control-queue.md`; do not silently rewrite Mission or Overview.
2. **Review all three levels together** — Mission, Overview, and Mechanistic Basis as one consistency set.
3. **Make only necessary changes** — where evidence requires it, not where a Finding merely adds detail or nuance.

**Do not flag or rewrite Mission or Overview** when adjudication only sharpens mechanistic detail, adds a study, or qualifies a proposition within the existing PM boundary. Flag only where evidence changes **what the PM itself can reasonably claim**.

**This does not weaken proposition-first bounded assessment.** The workflow remains:

```
Mission + Overview + existing Mechanistic Basis
        → define propositions, including omitted defining pathway steps
        → assess attached corpus, then targeted retrieval if needed
        → adjudicate
        → explain why coverage is sufficient
        → STOP (scientific completion; not schema validation alone)
```

See `system/scientific-finding-schema.md` § **Foundational coverage and targeted
retrieval (Stage 2A)**. Review existing evidence first does not mean stop with
existing evidence.

Then, **only if** adjudication materially challenges PM scope:

```
→ flag PM-scope consequence → review Mission + Overview + Mechanistic Basis together → necessary changes only
```

Evidence can therefore challenge the ontology without turning assessment into
open-ended research. Targeted retrieval for a defining unassessed step is not
open-ended research.

### PM authoring standards (framework-wide)

These rules apply to all Profile A PM pages. They strengthen opening sections and cross-page UX without changing overall page architecture (§2–§8 unchanged).

#### Functional descriptors

Every PM includes a **functional descriptor** immediately beneath the scientific title (parenthetical line). The **title names the mechanism**; the **functional descriptor explains its biological role** — what it accomplishes, not a restated scientific name.

Examples:

- LAT1 Competitive Transport → `(Regulating Amino Acid Entry into the Brain)`
- Keystone Taxa Support → `(Maintaining Beneficial Microbial Communities & Gut Ecosystem Function)`
- Ketone Utilisation Capacity → `(Using Ketones to Sustain Cellular Energy During Fuel Transitions)`

Source list: `scripts/data/mechanism-functional-descriptors.mjs`; apply with `npm run mechanisms:apply-functional-descriptors`.

#### Translational writing

Write to the **Stage 2A audience** (interested members of the public;
nutritionists as the most technically specialised intended readers). See
**Stage 2A — audience and public voice**. Translate biology; do not assume
PhD-level knowledge. Do not delete substantive science to simplify.

**PM §1 narrative arc:** biological story → mechanism (§4) → diet (§3) — not textbook biology followed by a food list. Untouched legacy PMs still use mechanism (§5) → diet (§4).

#### Technical language policy

Do **not** introduce uncommon specialist terms without a short plain-English gloss in brackets on first use.

Examples: Ketones (alternative energy molecules produced from fat); Substrate (the biological material used to fuel or build a process); Taxa (groups of related microorganisms); Excitotoxicity (cell damage caused by excessive excitatory signalling); Glycaemic variability (fluctuations in blood glucose over time); Short-chain fatty acids (beneficial microbial metabolites produced from fibre); One-carbon metabolism (the biochemical network that transfers methyl groups between molecules).

Do **not** over-explain common biological terms. Definitions stay concise.

#### Dietary Requirements (canonical §3.1)

Dietary Requirements identify evidence-supported dietary relationships attributable
to the PM. They are not automatically recommendations and do not require evidence
that increasing intake increases mechanism activity.

**Canonical build requirement:** for every newly authored or recomputed PM, each
reader-facing §3.1 dietary relationship must be an atomic projection governed by
the **2B — Dietary Input Traceability & Visibility Contract**
(`system/dietary-input-traceability-contract.md`). Every entry must resolve by
`atom_id` to the canonical `Input | Input Type | Biological Role | Evidence Source
| Limitation` record. Do not author an independent Markdown list
that carries scientific relationship data separately from the atoms.

`dietary_lever_presentations` controls placement, labels, a faithful short
`reader_description` and canonical Finding navigation (`description_finding_id`).
Follow the working PM3 example embedded in the Stage 2B contract: description
inside the opened dropdown, five atoms, then the research link. Presentation
metadata uses concise, faithful plain language without adding scientific claims.
A concise Biological role may also serve as the reader description; artificial
variation is not required.
It does not own Input Type,
Biological Role, Evidence Source, Direct/Derived classification, Derived Target or
Limitation. The PM reader must project those values from
`dietary_input_traceability` + `dietary_lever_atoms`.

##### §3.1.1 Direct and/or Derived Dietary Requirements

- **Direct Dietary Requirement:** a dietary input that is itself directly required
  by the PM biology. Direct describes the relationship to the PM, not evidence
  strength or demonstrated dietary modulation.
- **Derived Dietary Requirement:** a dietary input that provides, generates,
  maintains or enables a Direct Dietary Requirement without itself being the direct
  biochemical requirement. Derived does not mean weak, indirect or speculative
  evidence.

Where machine-readable classification is needed, use optional
`requirement_classification: direct | derived` on the dietary relationship overlay.
Derived rows must also name the Direct requirement they provide or enable
(`derived_target`, optionally `derived_target_atom_id`). This is relationship
metadata outside the canonical five scientific atoms; it does not replace
`input_type`. Evidence, claim ceilings and §3.1.1 rendering rules live in
`system/dietary-input-traceability-contract.md`.

##### §3.1.2 Cofactors and Substrates

This subsection is the mechanistic inventory of actual biochemical cofactors and
substrates required by the PM. It is distinct from the dietary classification in
§3.1.1. A substance may legitimately appear in both subsections where two different
relationships are represented—for example, methionine as a Direct Dietary Requirement
and methionine as the substrate used by MAT.

If the §3.1.1 relationship is already that same biochemical role (same input, input
type, and biological role), do not also list it in §3.1.2. Dual listing is only for
two distinct relationships. It is not a reprint of the Direct/Derived row. That
input + type + role test detects reprints between §3.1.1 and §3.1.2. It does not
establish KC distinctness. For §3.1.3, apply the KC distinctness gate: a different
input name, input type, or origin tag can still be the provision relationship
already published in §3.1.1.

Render Input + biochemical Input Type from the atom. Do not display
Direct/Derived or Derived Target in §3.1.2, even when the same atom also appears
in §3.1.1.

Do not use “Supporting Inputs” as a fallback category. If an item is neither a
substrate nor a cofactor, state its actual biological role and flag it for later
adjudication rather than forcing it into §3.1.2.

##### §3.1.3 Key Constraints

KCs retain the resource-pool/bottleneck definition in
`system/key-constraint-schema.md`. **KC1 / KC2 / KC3** are KC pages; an **iKC** is
an individually registered constituent of that canonical KC pool, linked to a verified substance ID. PM ↔ iKC is many-to-many.

An input is not an iKC merely because it is a substrate, cofactor, nutritional
requirement, food-supplied input, upstream input or participant in a larger
pathway. iKC membership does not replace or own the PM dietary-requirement or
substrate/cofactor relationship.

**“PM-specific”** means the iKC is shown to apply to this PM. It does not mean
the constraint is unique, that evidence must be owned only here, or that this
PM must govern the pool. Stage 2B uses
`system/dietary-input-traceability-contract.md` § **Type D — shared-pool applicability**. Supported upstream supply and Conditional constraint are separate propositions. Supply-chain evidence may establish supply without a limiting-effect experiment; conditional constraint requires a context-specific capacity limitation. Neither establishes KC membership or propagates downstream automatically.

`key_constraints` records independently admitted iKCs only. Proposed, rejected
and unresolved candidates remain audit-only. It does not inherit constituents.
For individually authorised input relationships, render each input name as the
disclosure trigger with a separate sibling KC origin link, using the canonical
PM7 example below. Do not use the parent KC title as the input title or copy
KC-page constituent or food-source bullets.
Overlap by input name is not a rejection criterion; repeated biological jobs must be consolidated under the final KC distinctness gate. Direct/Derived metadata
from a reused input atom must not appear in §3.1.3.

The KC page owns iKC membership. The PM independently owns Input→PM and PM↔iKC
propositions. Stage 2B verifies the PM side of that edge; it must not copy the KC
page list.

```yaml
dietary_input_traceability:
  - atom_id: BRSX-FM1-PM1-DIT-1
    input: Evidence-supported input
    input_type: substrate
    biological_role: Role in this PM
    evidence_source:
      finding_ids: [PM1-F1]
    evidence_limitation: Boundary of the Input→PM claim

pm_kc_relationships:
  - relationship_id: BRSX-FM1-PM1-KCR-1
    kc_id: BRSX(KC1)
    ikc_id: BRSX(KC1)   # optional; defaults to kc_id on single-iKC pages
    pm_biological_role: Why this iKC applies to this PM
    evidence_source:
      finding_ids: [PM1-F1]
    evidence_limitation: Boundary of the PM↔iKC claim
    constituent_relationships:
      - relationship_id: BRSX-FM1-PM1-KCI-1
        pm_atom_id: BRSX-FM1-PM1-DIT-1
        kc_membership_status: legacy-unreviewed
        legacy_kc_constituent_label: Legacy iKC label
        kc_change_control_flag_id: KC-CC-BRSX-FM1-PM1-01
```

`key_constraints` is an index of independently admitted iKCs, not evidence and not
an inheritance switch. A PM constituent relationship always references the
PM-owned `pm_atom_id`. If iKC membership is separately reviewed on the KC page,
set `kc_membership_status: canonical-reviewed` and add the canonical `kc_atom_id`.
Until the KC page is canonical, retain `legacy-unreviewed` and raise the referenced
change-control flag. Neither record may copy or override the other's science.

iKC-level evidence does not establish relevance to this PM. Evidence that an
iKC applies to this PM does not establish iKC membership. PM results never
automatically modify an iKC.
Retirement or modification of a KC/iKC must not delete a valid PM-owned atom.

When a KC pass is newly completed or reassessed, record each assessed arm in
`kc_applicability_adjudications` (`established`, `unassessed`, `unresolved`,
or `evidence-supported-non-application`). Publish a public `key_constraints`
disclosure only for an `established` row that remains distinct after the final
distinctness gate. Keep `pm_kc_relationships` and the applicability record when
an established mapping’s public disclosure is consolidated. Public empty copy
remains `No mapping established.` only when no PM↔iKC mapping is established.
An established mapping whose disclosures were all consolidated leaves §3.1.3
without that sentence.

If PM review systematically conflicts with an iKC's claimed scope, record
`kc_change_control_flags` (`ikc-scope-conflict` when that is the issue) and leave
canonical iKC data unchanged. See `system/key-constraint-schema.md` and
`system/mechanism-change-control-queue.md`.

## KC relationship distinctness and duplication — final Stage 2B gate

A separate **conditional-constraint** KC disclosure must explain an evidence-supported constraint relationship distinct from relationships already published under **§3.1.1 Direct/Derived Requirements, §3.1.2 Cofactors and Substrates, or §3.2 System Optimisation Practices**. Ask: **“What different biological job does this KC relationship explain?”**

Compare the input or defined pool, biological role, relationship claim, context and supporting evidence. A different section, KC origin tag, record identifier or wording does not establish a different relationship. Shared evidence alone does not prove duplication; different evidence alone does not prove distinctness. Do not deduplicate by input name: independently supported jobs may share an input.

A provision relationship stays one job when §3.1.1 already states it as two atoms: the direct substrate used in the reaction, and a precursor that supplies that substrate by conversion. Publish both in §3.1.1 at the distance the evidence supports. A KC disclosure whose stated job is sustaining that same capacity is the same relationship.

An input-type label, including “Resource dependency,” does not answer the job question. Neither does a KC origin tag.

Results that only bound that provision stay with the provision atoms. Combined depletion and an adequate-intake boundary limit what those atoms may claim, and they remain supporting evidence. They support a separate conditional-constraint KC disclosure when the evidence establishes a further constraint — competition, allocation, transport, or another bottleneck — beyond provision of the same inputs. A supported mechanistic chain can establish that further constraint; distinctness does not require one direct measurement of the bottleneck. The chain must establish a constraint beyond provision. A precursor-to-substrate chain alone is the provision relationship already recorded in §3.1.1 and does not establish KC distinctness. When no such constraint is established, consolidate that conditional-constraint disclosure as a duplicate. Concise supported supply summaries follow the canonical iKC rule below. Keep its evidence, canonical KC identifiers, provenance and decision history on the retained records, and leave applicability on the applicability record. If every proposed disclosure is consolidated, §3.1.3 has no public disclosure. Do not write `No mapping established.` That sentence means no PM↔iKC mapping was established. Consolidating presentation must not erase an established applicability record.

- Repeated substrate, cofactor, precursor or intervention relationships: consolidate duplicate public presentation while preserving evidence, canonical identifiers, provenance and decision history in the retained relationship and audit.
- Distinct shared-resource limitations: retain a separate KC disclosure explaining the limitation and its boundaries.
- Combined-pool evidence: retain a pool-level public claim only when that pool passes the job test above. Do not split a retained pool into individually limiting constituents without supporting adjudication. Name a retained pool as the trigger with a separate KC origin tag. Individually authorised input triggers remain appropriate only for individually supported, distinct relationships. When the pool’s job is provision already recorded for its constituents, consolidate the public disclosure and preserve the combined result in the supporting evidence and limitations, without attributing individual effects the study did not isolate.
- Unresolved distinctness: retain the proposed additional disclosure audit-only, recording the precise gap and follow-up. Scientific applicability and public distinctness are separate decisions; consolidation does not reject an otherwise valid applicability record.

**Mandatory recorded review:** Before completion, compare every proposed KC/iKC and constituent disclosure against all three sections. Reuse the Stage 2B report's disposition, rationale, evidence and record-ID columns; no new public atom, front-matter status or applicability enum is required. Record **distinct**, **consolidated as duplicate**, or **unresolved** as the presentation-review disposition, alongside (not replacing) scientific applicability. A concise row must identify proposed relationship/atom IDs, compared records (or explicit “none” for each section), the biological job and context comparison, supporting evidence, rationale, retained/public destination, preserved provenance and any precise gap. Rejected candidates remain audit-only under the existing admission rules.

Final review must verify that every proposed disclosure has a decision, no duplicate public relationship remains, unresolved additional disclosures are absent publicly, and consolidation preserves its evidence and provenance. This is an evidence review, not string matching. For a focused report gate, pass the existing report rows and proposed public relationship IDs to `validateKcDistinctnessReview` in `scripts/lib/kc-relationship-distinctness-review.mjs`. It checks completeness and disposition-to-publication consistency, not biological truth. A row that records a different job string can pass this structural check. Different wording does not prove a different biological job; evidence adjudication must establish that job. The check also rejects a `distinct` disposition when the row records the same biological job as a compared record, including when the pool name, a “Resource dependency” label, or the citation set differs, and it rejects consolidated presentation that replaces an established mapping with `No mapping established.` Run `node --test scripts/kc-relationship-distinctness-review.test.mjs`.

<!-- PM7-KC-CANONICAL-EXAMPLE:begin -->
### Admitted PM-owned KC input disclosure — PM7 integration reference

Use the existing shared renderer. Public §3.1.3 titles identify the adjudicated distinct **input or defined pool**, not a parent KC used as a substitute for the biological input. The following individual-input example demonstrates renderer integration only; it does not waive distinctness review or approve scientific admissions. Pool evidence requires a pool trigger rather than unsupported constituent splitting. Render `Folate · [KC1: Methyl Donor Pool]`, `Betaine · [KC1: Methyl Donor Pool]`, `Choline · [KC1: Methyl Donor Pool]`. Each input name is a button; the separate origin tag is a sibling navigation link, never nested inside it. Do not add audit headings such as “Established mapping” or “Independently supported input relationships”.

**Admission:** Stage 2B independently evidence-reviews each proposed PM→KC/iKC/input relationship and records evidence, limitations, rationale and disposition. Publish only supported or conditionally admitted relationships. Rejected and unresolved candidates remain audit-only, with exact remaining gaps and follow-up. KC membership or a provenance tag alone does not authorise an input; missing records do not justify exclusion. Preserve canonical KC/iKC/constituent identifiers when applicable; do not invent iKC identifiers or label every nutrient an iKC. PM7 KC1 remains conditionally established; KC2 remains unresolved and is not a public requirement or admitted mapping. Folate/betaine/choline provision does not settle KC2's methionine/cysteine capacity question.

**Interaction:** hover or focus on the input previews its disclosure; click/tap pins the same disclosure; a second activation, Escape or the existing outside-click close interaction dismisses it. Enter/Space activate the native button. Tab reaches the separate origin link, which navigates without opening or pinning the disclosure. Hover/focus on the origin tag alone does not preview. Escape returns focus to the input without reopening it.

**Opened order:** reader description → exactly five atoms (Input → Input type → Biological role → Evidence source → Limitation) → Supporting mechanism research. Conditional animal contexts, enrichment-versus-flux limits and provision-versus-enhancement boundaries remain inside the disclosure. The research link is navigation, not a sixth atom.

Canonical PM source: `docs/biological-targets/brs2/fm3/brs2-fm3-pm7-phosphatidylcholine-formation.mdx`. Canonical origin destination: https://thebraindiet.org/docs/biological-targets/brs2/kc/brs2-kc1-one-carbon-donor-pool. PM7-F5 resolves to “Donor insufficiency can constrain hepatic methylation” at https://thebraindiet.org/docs/biological-targets/brs2/fm3/brs2-fm3-pm7-phosphatidylcholine-formation#pm7-f5; choline uses PM7-F7 at https://thebraindiet.org/docs/biological-targets/brs2/fm3/brs2-fm3-pm7-phosphatidylcholine-formation#pm7-f7. Resolve titles/anchors from the canonical Finding, not an invented target. Evidence source links remain Author et al. (year) [n], with numbering resolved from the target PM bibliography. Do not copy PM3/KC bibliographies or renumber live pages for this example.

**Integration excerpts using the existing shared renderer; not standalone replacement components.** Stored Markdown → three compact trigger rows inside the existing §3.1.3 panel. The renderer supplies origin tags from reviewed relationship metadata; Markdown is not three manually linked input titles.

<!-- PM7-KC-REFERENCE:markdown -->
```mdx
- Folate
- Betaine
- Choline
```
<!-- /PM7-KC-REFERENCE:markdown -->

Stored PM-owned records → constituent five fields, description and research target. The representative folate atom below is exact; betaine DIT-6 and choline DIT-3, all Findings, bibliography and the established KC1 adjudication are loaded from canonical PM7 dependencies. `kc_atom_id` records reviewed membership separately from `pm_atom_id`; no atom fields are inherited from the KC page. The relationship's `origin_label`/`kc_href` provide provenance only. Other existing parent relationship evidence fields are retained in canonical source, not copied into this instruction.

<!-- PM7-KC-REFERENCE:records -->
```yaml
dietary_input_traceability:
  - atom_id: PM7-DIT-5
    input: Folate
    input_type: precursor
    biological_role: Folate availability contributes to the methyl-donor supply used by hepatic PEMT; folate restriction with choline maintained reduced hepatic methyl-derived PC enrichment in female mice.
    evidence_source:
      finding_ids:
        - PM7-F5
      citation_keys:
        - chew_folate_choline_2011
    evidence_limitation: The response was conditional on sex and experimental context. Methyl-derived PC enrichment is not absolute PEMT flux; extra folate above adequacy is not established to enhance formation or cognition.
pm_kc_relationships:
  - relationship_id: BRS2-FM3-PM7-KCR-1
    kc_id: BRS2(KC1)
    ikc_id: BRS2(KC1)
    kc_href: /docs/biological-targets/brs2/kc/brs2-kc1-one-carbon-donor-pool
    origin_label: "KC1: Methyl Donor Pool"
    constituent_relationships:
      - relationship_id: BRS2-FM3-PM7-KCI-1
        pm_atom_id: PM7-DIT-5
        kc_atom_id: BRS2-KC1-KIT-1
        kc_membership_status: canonical-reviewed
        label: Folate
        reader_description: Folate availability supports methyl-group provision for PEMT-dependent formation.
        description_finding_id: PM7-F5
      - relationship_id: BRS2-FM3-PM7-KCI-2
        pm_atom_id: PM7-DIT-6
        kc_atom_id: BRS2-KC1-KIT-3
        kc_membership_status: canonical-reviewed
        label: Betaine
        reader_description: Betaine can support PEMT-dependent formation when methylation is impaired in the studied ethanol model.
        description_finding_id: PM7-F5
      - relationship_id: BRS2-FM3-PM7-KCI-3
        pm_atom_id: PM7-DIT-3
        kc_atom_id: BRS2-KC1-KIT-2
        kc_membership_status: canonical-reviewed
        label: Choline
        reader_description: Choline can supply methyl groups used in PEMT-dependent formation.
        description_finding_id: PM7-F7
```
<!-- /PM7-KC-REFERENCE:records -->

Stored constituent edges → disclosure map in `src/lib/dietaryLeverDisclosure.ts` (mirrored in `scripts/lib/dietary-lever-disclosure.mjs`). This runs inside the existing map builder after `assessments` has been loaded from PM adjudications. Its established-parent check prevents an unresolved KC from projecting constituents; independently vetted edges provide the PM-specific input evidence. `originTag` is presentation metadata, not an applicability decision.

<!-- PM7-KC-REFERENCE:projection -->
```tsx
  const pmTraceById = new Map(
    traceRows.filter((row) => row.atom_id).map((row) => [String(row.atom_id), row]),
  );
  const pmKcRelationships = (frontMatter.pm_kc_relationships || []) as Array<{
    origin_label?: string;
    kc_href?: string;
    constituent_relationships?: Array<{
      pm_atom_id?: string;
      label?: string;
      reader_description?: string;
      description_finding_id?: string;
    }>;
  }>;
  for (const relationship of pmKcRelationships) {
    if (assessments.length && !assessments.some((assessment) =>
      assessment.disposition === "established" && assessment.kc_id === (relationship as PmKcDisclosureRow).kc_id &&
      (assessment.ikc_id || assessment.kc_id) === ((relationship as PmKcDisclosureRow).ikc_id || (relationship as PmKcDisclosureRow).kc_id),
    )) continue;
    for (const constituent of relationship.constituent_relationships || []) {
      const base = pmTraceById.get(String(constituent.pm_atom_id || ""));
      if (!base?.input) continue;
      const label = String(constituent.label || base.input);
      map.set(dietaryLeverBulletKey(label, "", "3.1.3"), {
        title: String(base.input),
        inputType: formatInputTypeLabel(String(base.input_type || "")),
        biologicalRole: String(base.biological_role || ""),
        evidenceLimitation: String(base.evidence_limitation || "").trim(),
        evidenceReferences: evidenceSourceReferences(
          references,
          base.evidence_source?.citation_keys || [],
        ),
        compactQualifier: "",
        presentationSection: "3.1.3",
        readerDescription: String(constituent.reader_description || ""),
        supportingFinding: supportingFindingLink(frontMatter, constituent.description_finding_id),
        originTag: relationship.origin_label && relationship.kc_href
          ? { text: relationship.origin_label, href: relationship.kc_href }
          : undefined,
      });
    }
  }
```
<!-- /PM7-KC-REFERENCE:projection -->

Displayed origin tag → sibling link inside existing `enhanceListItem`; the input remains the existing named trigger button. Only this origin wiring is added; the existing five-field renderer is reused:

<!-- PM7-KC-REFERENCE:origin-link -->
```tsx
  const originLink = disclosure.originTag ? document.createElement("a") : null;
  if (originLink) {
    originLink.href = disclosure.originTag!.href;
    originLink.textContent = disclosure.originTag!.text;
    originLink.className = "brs-dietary-lever-origin-link";
    originLink.addEventListener("click", (event) => event.stopPropagation());
  }
```
<!-- /PM7-KC-REFERENCE:origin-link -->

After `li.append(trigger)` append the separate origin tag:

<!-- PM7-KC-REFERENCE:origin-append -->
```tsx
  if (originLink) li.append(document.createTextNode(" · ["), originLink, document.createTextNode("]"));
```
<!-- /PM7-KC-REFERENCE:origin-append -->

The existing canonical URL loop additionally resolves the origin destination:

<!-- PM7-KC-REFERENCE:origin-resolution -->
```tsx
      if (disclosure.originTag) {
        disclosure.originTag.href = new URL(disclosure.originTag.href, canonicalPmUrl).href;
      }
```
<!-- /PM7-KC-REFERENCE:origin-resolution -->

Existing shared interaction handlers → trigger preview, pinning and close behaviour. These are exact integration lines within `enhanceListItem`, not a new component:

<!-- PM7-KC-REFERENCE:interaction -->
```tsx
  const openTransiently = () => {
    closeAllExcept(root, detail);
    setDisclosureOpen(li, detail, trigger, true);
  };

  trigger.addEventListener("pointerenter", (e) => {
    if ((e as PointerEvent).pointerType === "touch") return;
    openTransiently();
  });

  li.addEventListener("pointerleave", (e) => {
    if ((e as PointerEvent).pointerType === "touch") return;
    if (li.dataset.brsDietaryLeverPinned === "true" || li.contains(document.activeElement)) return;
    setDisclosureOpen(li, detail, trigger, false);
  });

  let suppressFocusPreview = false;
  const dismissOriginPreview = () => {
    if (li.dataset.brsDietaryLeverPinned !== "true") setDisclosureOpen(li, detail, trigger, false);
  };
  originLink?.addEventListener("pointerenter", dismissOriginPreview);
  originLink?.addEventListener("focus", dismissOriginPreview);
  li.addEventListener("focusin", (e) => {
    if (!suppressFocusPreview && (e.target === trigger || detail.contains(e.target as Node))) openTransiently();
  });

  li.addEventListener("focusout", (e) => {
    if (li.dataset.brsDietaryLeverPinned === "true") return;
    const next = e.relatedTarget as Node | null;
    if (!next || !li.contains(next)) setDisclosureOpen(li, detail, trigger, false);
  });

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    const wasPinned = li.dataset.brsDietaryLeverPinned === "true";
    if (wasPinned) {
      setDisclosureOpen(li, detail, trigger, false);
      return;
    }
    closeAllExcept(root, detail);
    li.dataset.brsDietaryLeverPinned = "true";
    setDisclosureOpen(li, detail, trigger, true);
    detail.tabIndex = -1;
    detail.focus();
  });

  li.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      setDisclosureOpen(li, detail, trigger, false);
      suppressFocusPreview = true;
      trigger.focus();
      suppressFocusPreview = false;
    }
  });
}
```
<!-- /PM7-KC-REFERENCE:interaction -->

Expected closed integration-fixture result: the three input buttons with separate KC1 tags, no parent-KC input or audit headings. Live publication additionally requires the final distinctness gate; consolidate repeated jobs or retain an adjudicated pool claim as appropriate. Expected opened result: description, five fields and final canonical research link, with each input's own conditional limitations.

Run `node --test scripts/pm7-kc-reference.test.mjs` and the related traceability/governance/PM3 reference suites. The documented example must execute actual shared projection and rendering code with canonical dependencies, including interaction events and unresolved-parent suppression. Browser-check focus/activation/Escape, origin navigation, ordering and link targets; report actual results and deployment gaps separately from these completion instructions.
<!-- PM7-KC-CANONICAL-EXAMPLE:end -->

##### Diet → biology hierarchy

```text
Food / dietary matrix
        ↓
Dietary provision
        ↓
Derived Dietary Requirement
        ↓
Direct Dietary Requirement
        ↓
Biological Role / biochemical requirement
        ↓
Primary Mechanism
```

Example: when protein-containing foods merely supply cysteine for glutathione synthesis, assess cysteine as the biological input; do not create an extra “Dietary protein → Cysteine” requirement. Food-source delivery remains in the food ontology. The same applies to methionine delivery for MAT. The illustrative hierarchy does not require a delivery level to become a PM requirement.

Before dietary candidate adjudication, apply **Input-specificity adjudication** in `system/dietary-input-traceability-contract.md`. For every candidate, record a specificity decision and supporting evidence. A concise table row is sufficient for straightforward cases. Explicitly address all three questions where the label is broad, the target changes, or the relationship is disputed or unresolved. Record retained/narrowed/consolidated/moved/rejected/unresolved in the existing disposition/rationale entry. Retained broad inputs require mechanism-specific justification. Preserve defined indispensable-amino-acid coverage and independently evidenced protein-level interventions; do not infer constituent effects from mixtures/patterns or auto-replace generic words. Reuse report fields; preserve evidence, upstream dependencies and decision history. These are reporting/governance requirements, not additional public atoms or a retrospective page migration.

The five-atom evidence structure remains `Input | Input Type | Biological Role |
Evidence Source | Limitation`. Direct/Derived classification does not
replace Input Type. See `system/dietary-input-traceability-contract.md` for evidence
admissibility, limitations, claim ceilings, responsiveness and adjudication.

**Non-equivalences:** Direct ≠ demonstrated dietary modulation; Derived ≠ weak
evidence; Substrate ≠ KC; Cofactor ≠ KC; dietary provision ≠ biochemical substrate;
KC membership ≠ ownership of the PM relationship; biochemical requirement ≠
proportional intake response; food composition evidence ≠ PM-modulation evidence.

#### PM UX progression

PM pages should progressively answer:

1. What is this mechanism? (title + functional descriptor)
2. Why does it matter? (Mission + Overview)
3. What must diet provide directly or through provision routes? (§3.1.1)
4. Which biochemical substrates/cofactors and shared constraints apply? (§3.1.2–3.1.3)
5. What evidence supports these relationships? (§4; §4.1; §5)

**Avoid:** repetitive introductions; repeating the PM title in Mission or Overview; introducing specialist concepts before glossing them; describing isolated molecules, biomarkers, or microbial species when a **biological capacity** or **regulatory function** is the clearer frame.

### PM Levers — canonical §3; legacy §4

**Heading:** `## 3. Intervention Levers` on canonical PMs; `## 4. Levers` on untouched legacy PMs.

**Intervention Dominance (required on assessed canonical pages):** render immediately after Mission, then all independently adjudicated principal groups before Overview. Remaining groups stay once in section 3. Use `intervention_dominance_assessment` and the exact shared layout example below; legacy labels and FM inheritance do not decide placement.

**Public vs audit (Dietary Requirements):** Public §3.1 / §4.1 panels show the current
evidence-qualified scientific state and reader-relevant limitations only. Empty
§3.1.1 / §4.1.1 uses `emptyDirectDerivedCopy` (governed state). §3.1.3 / §4.1.3
uses `emptyKeyConstraintCopy` only when no PM↔iKC mapping is established. An
established mapping whose disclosures were all consolidated leaves that panel
without `No mapping established.` Rejected candidates, Stage 2B reasoning, KC-page
scope disputes, and migration history belong in Stage 2B / change-control records
(`scripts/lib/pm-dietary-requirements-public-copy.mjs`).

**§3.2 guiding question:** How can dietary inputs be selected, prepared, combined, timed, or preserved to act more effectively on this biology?

Evidence-qualified §3.2 practices use `system_optimisation_practices`; evidence-qualified
§3.3 priorities use `lifestyle_priorities`. Each relationship carries the same five
atoms as §3.1. PM ownership is implicit in the containing PM, and the collection name
determines the destination subsection. These PM scientific-evidence relationships are
not provisional dietary candidates and must not be removed or overwritten by a later
Dietary Levers pass.

Every populated §3.2 category and §3.3 Lifestyle Levers block begins with one
plain-language sentence stating the measured proximal effect and the nearest important
evidence boundary. Avoid governance language such as “provisional cofactor candidate”
in reader-facing introductions; retain detailed qualification in each five-atom record.

**§3.2 vs §3.3 boundary:**

| §4.2 System Optimisation | §4.3 Lifestyle |
|---|---|
| Gentle cooking preserves marine-PUFA matrix | Sleep, exercise, stress recovery |
| Repeated weekly oily-fish beats bolus dosing | Circadian routines |
| Preparation, pairing, matrix, storage, frequency | Non-dietary behaviours |

**Do not** place cofactors, KCs, substance ← food levers, optimisation strategies, or lifestyle bullets under **§6 BRS Pathways and Connections** or inside **§4 Mechanistic Basis**.

```markdown
## 3. Intervention Levers

<!-- Groups are authored once here. The shared build places independently adjudicated principal groups after Mission. -->

<details>
<summary><strong>3.1 Dietary Requirements</strong></summary>

<details>
<summary><strong>3.1.1 Direct and/or Derived Dietary Requirements</strong></summary>

- Direct or Derived relationship labels backed by the five-atom evidence structure

</details>

<details>
<summary><strong>3.1.2 Cofactors and Substrates</strong></summary>

- Methionine — substrate for MAT
- ATP — biochemical substrate, not an external Dietary Requirement
- PLP — cofactor for GAD

</details>

<details>
<summary><strong>3.1.3 Key Constraints</strong></summary>

**[(Key Constraint) (KC1) — Antioxidant Substrate Sufficiency](/docs/biological-targets/brs3/kc/brs3-kc1-antioxidant-substrate-availability)**

PM-specific relationship to the canonical shared resource pool or bottleneck. Do not reprint KC constituent or food-source lists.

</details>

<details>
<summary><strong>3.2 System Optimisation Practices</strong></summary>

Render a nested dropdown only for each category with at least one
evidence-qualified `system_optimisation_practices` record:

- Food Preparation & Delivery
- Conditional Supplementation
- Dietary & Fasting Protocols
- Light & Circadian Optimisation
- Stress & Autonomic Regulation

Every record carries `optimisation_category` as relationship metadata. Category
membership is not a sixth evidence atom.

A §3.1.1 / §4.1.1 **NO** does not auto-admit an Optimisation Strategy. Connected
mechanistic distance must stay explicit; SOP must not be projected upstream as a
Direct or Derived Dietary Requirement.

</details>

<details>
<summary><strong>3.3 Lifestyle Levers</strong></summary>

- Lifestyle implementation bullets; timing narrative when timing_specific: Yes

</details>
```

### PM §6 — BRS Pathways and Connections

| Subsection | Role | Content |
|------------|------|---------|
| **6.1 BRS Pathways** | Ordered multi-step chains | Linked PM labels with `↓` on separate lines between steps when a pathway spans PMs (often cross-FM or cross-BRS). Use `- None listed` when no pathway is authored yet. |
| **6.2 Cross-BRS Mechanism Relationships** | Cross-BRS PM graph (canonical) | PM-to-PM links in other BRS domains with a linked title **and** a 1–2 line evidence-supported relationship explanation (see **Stage 2A — connected-mechanism presentation**). **Primary Mechanisms in other Biological Regulatory Systems that directly interact with, constrain or support this mechanism.** This is the single canonical home for PM-to-PM relationships — do not duplicate on hub pages. |
| **6.3 Local BRS Mechanism Relationships** | Same-BRS PM links | Sibling PMs on the same FM (exclude current PM), each with a linked title **and** a 1–2 line evidence-supported relationship explanation. **Related Primary Mechanisms within the same Biological Regulatory System that collectively support the integrated biological function.** No parent FM, cofactors, KCs, or dietary levers here. |

**Architectural rule:** PM §6.2 is the **canonical mechanistic graph** (PM pages only). Hub **Cross-BRS Dependencies** provide systems-level interpretation — why one BRS constrains another, integrated regulatory capacity, allostatic context, and translational examples — without duplicating PM relationship lists.

**§3 vs §6:** canonical §3 is implementation only (dietary, cofactors, KCs, optimisation, lifestyle). §6 is connectivity only (pathways, cross-BRS PM relationships, same-BRS PM relationships).

**Example pathway (BRS2-FM1-PM1):**

```
[BRS2-FM1-PM1 — Folate/B12-Dependent Homocysteine Remethylation](/docs/biological-targets/brs2/fm1/brs2-fm1-pm1-folate-b12-dependent-homocysteine-remethylation)
↓
[BRS2-FM3-PM7 — Phosphatidylcholine Formation](/docs/biological-targets/brs2/fm3/brs2-fm3-pm7-phosphatidylcholine-formation)
↓
[BRS1-FM3-PM7 — Neuronal Membrane DHA Incorporation](/docs/biological-targets/brs1/fm3/brs1-fm3-pm7-neuronal-membrane-dha-incorporation)
```

### Profile B — Compact PM (retired for PM pages)

**Do not author new PM pages on Profile B.** Legacy compact structure below is retained only for historical reference. All PM pages use **Profile A** above.

1. Definition — `## 1. Definition` — **opening paragraph + exactly 3 bullets** (`system/mechanism-page-section-prose.md` **§1 Definition — UX structure**)
2. Mechanistic Basis — `## 2. Mechanistic Basis` (canonical four-part narrative)
2.1. Evidence Highlights — `### 2.1 Evidence Highlights` (optional — same rules as §5.1; subsection at end of `## 2.`)
3. Underlying Mechanisms and Requirements — `## 3. Underlying Mechanisms and Requirements` with `### 3.1` Cofactors and Supporting Inputs, `### 3.2` KCs, `### 3.3` Optional BRSX Modifiers, `### 3.4` Connected Mechanisms
4. Dietary Levers — `## 4.` (`<details>` / **Diet**)
5. Lifestyle Levers — `## 5.` (`<details>` / **Lifestyle**)
6. Functional Outputs (Directional Effects) — `## 6.` short arrow-line or paragraph (distinct from `## 2. Primary Biological Effects` on Profile A)
7. References — `## 7. References`

### PM Mechanistic Basis — canonical §4; legacy §5

Teachable PM Mechanistic Basis follows this flow (all visible by default on the reference page):

| Step | Heading level | Role |
|------|---------------|------|
| 1 | `### Summary` | **Why it matters** — lead with the most important implication (e.g. neurotransmitter biology depends first on an adequate amino-acid pool). |
| 2 | `#### (…)` primary block(s) | **How it works** — meal-level biology, substrates, cofactor context where mechanistically necessary; citations inline. |
| 3 | `#### (Boundaries of the mechanism)` (or equivalent) | **What this PM does not cover** — downstream PMs, transport, conversion, other BRS domains; brief, after the mechanism is explained. |
| 4 | `#### (Integration within BRS…)` (or equivalent) | **Where it sits** — KCs, FM, connected mechanisms; one short placement paragraph. |

**Anti-patterns:** opening with the mechanism name or entity ID; leading with scope boundaries; review-paper tone; closing “together, these relationships…” synthesis paragraphs; `Dietary levers include…` or food-example lists in Mechanistic Basis; stripping citations during editorial passes.

Authoring detail: `system/mechanism-page-section-prose.md` (**PM Mechanistic Basis — canonical structure**).

### PM Mechanistic Basis — Citations

Mechanistic Basis must remain **evidence-anchored**, not assertion-only. Follow **`system/brs-citation-reference-standard.md`**.

| Where | Citation expectation |
|-------|-------------------|
| **`### Summary`** | Usually implication-only; when a single study directly supports the central claim, use canonical PM first-mention format `Author et al. (year) [n]`. |
| **Primary mechanism `####` blocks** | **Required** for evidence-backed statements (pathway biology, meal effects, substrate relationships). First mention in a section uses `Author et al. (year) [n]`; two-author studies use `Author and Author (year) [n]`. |
| **Boundaries** | Do not cite. A boundary that only places this PM against a neighbouring PM names that PM, for example “see PM2”, and carries no reference. |
| **Integration** | Typically placement prose + entity links; citations optional unless integration asserts an evidence-backed dependency. |

**Reference generation and integrity:** author text, year, display number and the
linked `[n]` must derive from one canonical front-matter reference record. Each cited
study appears in §8 as `[n] Author et al. (Year) — Short Descriptive Study Topic`,
linked to `/docs/papers/BRAIN-Diet-References#citation_key`. The rendered body must not
contain missing, duplicate, stale, misnumbered or unlinked PM citations, and every
`#pm-ref-n` target must resolve to the matching §8 entry.

**When rewriting Mechanistic Basis:** preserve existing citations unless the claim is removed; add citations for new evidence-backed claims.

**Reference page:** [BRS1-FM1-PM1](/docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation).

### PM Scientific Findings — canonical §4.1; legacy §5.1

Pages with `scientific_findings` front matter use **Scientific Findings** at
`§4.1` (canonical layout) or `§5.1` (legacy layout). Governance:
`system/scientific-finding-schema.md` § Bounded assessment — define proposition
→ assess relevant evidence → adjudicate → stop; not search-first Finding discovery.

**Purpose (legacy Evidence Highlights):** Curated, insight-driven findings that show **why the mechanism matters in practice** — not a second Mechanistic Basis and not a literature review.

**Placement:** `### 4.1 Scientific Findings` as a **subsection of
canonical §4** (after the mechanism `<details>`, not inside it). Untouched
legacy PMs use §5.1. Relationship-specific Findings render under their primary
§7 Phenome Connection, not in the Mechanistic Basis subsection.

| § | Role (Profile A extended) |
|---|------|
| **§1 Mission & Overview** | Biological ambition + evidence-supported orientation (~65–75 words) + preferred Benefits / Implementation Notes / Biological Relevance bullets; adapt when relevant evidence is insufficient. Give practical orientation to admitted levers; keep detailed implementation in disclosures and technical boundaries in §4. |
| **§2 Primary Biological Effects** | Directional ↑/↓ summary of emergent outcomes. |
| **§3 Levers** | Dietary, optimisation, and lifestyle implementation — all in `<details>` dropdowns. Before a move, those groups are 3.1 (children 3.1.1–3.1.3), 3.2 and 3.3. When Dietary Requirements is moved before Overview, 3.1 becomes 1.1 (children 1.1.1–1.1.3), and the groups left in section 3 become 3.1 System Optimisation Practices and 3.2 Lifestyle Levers. |
| **§4 Mechanistic Basis** | How the biology works (canonical four-part narrative). |
| **§4.1 Scientific Findings** | Findings that adjudicate defined Mechanistic Basis propositions. |
| **§5 BRS Pathways and Connections** | Pathway chains, cross-BRS links, same-FM PM rollups — **not** levers, cofactors, or KCs. |
| **§7 Phenome Connections** | Translational mappings, with relationship-specific Findings rendered inside their primary relationship — not single-mechanism outcome claims. |
| **§8 References** | Numbered bibliography. |

Profile B compact PMs keep cofactors under `## 3. Underlying Mechanisms and Requirements` → `### 3.1 Cofactors and Supporting Inputs`.

**Include studies that (high priority):** alter interpretation; reveal synergies or dependencies; show meaningful human or intervention relevance; expose heterogeneity or context-dependent responses.

**Exclude (low priority):** findings that only repeat textbook biology; small redundant mechanistic papers; studies that merely mention the pathway without changing how to read the PM; **phenome/outcome science** that does not adjudicate a defined PM → Phenome proposition.

**Phenome boundary (non-negotiable):** Mechanistic Findings and FM §4.4 must
**not** duplicate §7 Phenome Connections. Phenome/outcome science belongs in
relationship-specific Findings that test a **defined PM → Phenome relationship
proposition**, or in Connected / Supportive Evidence — not as open-ended
mechanism review. Do not populate from BRS hub ADHD dropdown tables; those rows
feed phenome review (`system/phenome-relationship-review-methodology.md`), not
mechanism evidence maps (`scripts/lib/pm-evidence-highlights.mjs`).

**Summary content:** Follow Stage 2A’s “Scientific Findings — Summary authoring rule”: synthesise the strongest adjudicated evidence, its convergence or differences, and principal context/limitations; do not repeat §4’s mechanism walkthrough. Reuse target-page numbered citations.

**UX:** `#### Summary` (visible) → one or more Scientific Finding
components. Phenome-relationship Findings render fully inside their primary §7
relationship; cross-relationships reuse the id without duplicating the evidence
body.

**Evidence entry shape (each `<details>` dropdown):**

| Field | Required | Notes |
|-------|----------|-------|
| Summary title | Yes | `<summary><strong>…</strong></summary>` — finding label, not a phenome name |
| **Confidence** | Yes | `low`, `low-medium`, `medium`, `high` |
| **Evidence Level** | Yes | `mechanistic`, `observational`, `intervention`, `clinical` |
| **Rationale** | Yes | One or two sentences — why the finding matters for interpreting this PM |
| **Key References** | Recommended | `PhenomeBibLinks` with optional `dataLevel` per study |

Do **not** use legacy `#### (heading)` prose blocks or a separate **Reference data levels** subsection — per-study data levels belong on each **Key References** line (same as §3).

**Populate:** `npm run mechanisms:populate-evidence -- --brs BRS3 --force`

**Profile B:** §1 = *significance paragraph + 3 cross-system bullets*; §2 = *directional outcome*; §3 = *translational phenome context*; §4 = *implementation*; §5 = *detailed how*; §5.1 = *how we know*. Do not restate the same meal-composition or pathway claim across all six (see `system/mechanism-page-section-prose.md` — **PM section roles**).

**Writing style:** Short bullets or tight paragraphs. Lead with **why the finding is interesting**, not methods or results laundry lists. Inline: `[Author et al., Year]`; References entry with descriptive topic per **`system/brs-citation-reference-standard.md`**.

**Good pattern:** “B-vitamin supplementation slowed cognitive decline primarily when omega-3 status was adequate, supporting a nutrient-synergy read of one-carbon and membrane biology [Oulhaj et al., 2016].”

**Anti-pattern:** “Smith et al. conducted a randomized trial in N participants measuring…”

**Citations:** Every study in **Key References** must resolve in `## 8. References`; prefer existing BRAIN-diet bibliography entries.

**Profile B:** use `### 2.1 Evidence Highlights` at the end of `## 2. Mechanistic Basis` with the same authoring rules.

Authoring detail: `system/mechanism-page-section-prose.md` (**PM §5.1 — Evidence Highlights**).

### Excluded from the public PM body

Body sections **do not** include Missing Entities, System Integration, Key Insight, Functional Mechanism Ownership, Intervention Summary, Intervention Breakdown, Constraints and Failure Modes, Scoring Interpretation, Notes, or Mechanism Summary Table. Those belong in front matter, FM pages, authoring metadata, or other artefacts. `intervention_breakdown` and FM ownership stay in YAML/front matter; Legacy `intervention_dominance` remains ingest metadata; assessed canonical pages render Intervention Dominance only after Mission through the shared layout.

<!-- PM-LEVER-DOMINANCE-EXAMPLE:begin -->
### Evidence-adjudicated intervention dominance and training layout

This governs canonical Profile A PMs with `intervention_dominance_assessment`. Group meanings remain: **3.1 Dietary Requirements** (its three existing dietary/biochemical/KC subgroups), **3.2 System Optimisation Practices** (defined practices/protocols in the existing five categories), **3.3 Lifestyle Levers** (foundational/recurrent behaviours). Moving a group changes prominence only, never its classification, claim ceiling or evidence status.

Required rendered order: **Mission → Intervention Dominance → every adjudicated principal group → Overview**. Remaining groups appear once in section 3. The shared MDX build transform `src/plugin/pm-lever-layout/index.cjs` performs placement and numbering before HTML/TOC generation; it is registered through `beforeDefaultRemarkPlugins` in `docusaurus.config.ts`. Do not run the retired diet-only migration or hand-copy groups into two sections.

| Adjudicated canonical routes | Visible number after Mission, before Overview | Visible numbers remaining in section 3 |
|---|---|---|
| 3.1 Dietary Requirements | 1.1 Dietary Requirements | 3.1 System Optimisation Practices; 3.2 Lifestyle Levers |
| 3.2 System Optimisation Practices | 1.1 System Optimisation Practices | 3.1 Dietary Requirements; 3.2 Lifestyle Levers |
| 3.3 Lifestyle Levers | 1.1 Lifestyle Levers | 3.1 Dietary Requirements; 3.2 System Optimisation Practices |
| 3.2 + 3.3 | 1.1 System Optimisation Practices + 1.2 Lifestyle Levers | 3.1 Dietary Requirements |
| Any other independently adjudicated principal combination | All principal groups, numbered 1.1, 1.2… in canonical order | All unselected groups, numbered 3.1, 3.2… in canonical order |
| Not established | Preserved qualification + “No principal intervention route established”; no promoted group | 3.1 Dietary Requirements; 3.2 System Optimisation Practices; 3.3 Lifestyle Levers |

**Two separately traceable decisions are mandatory.** Evidence qualification records the supported influence, context and limitations; principal-route selection determines placement. Preserve the canonical `intervention_dominance` label verbatim (including `Diet-Supported`) and its governing meaning. The spreadsheet schema calls this field “dominance” and permits FM inheritance; the approximate FM profile mapping does not redefine it or adjudicate PM placement. A qualification is not silently replaced by a group title or upgraded to Diet-Dominant. Unassessed legacy pages retain their existing presentation pending review.

**Evidence qualification:** `intervention_dominance_assessment.evidence_qualification` contains `label` (matching the canonical label), `rationale`, optional `scope_note` and independently assessed `routes`. Each route carries canonical `group_id`, `evidence_basis: intervention-effect`, measured `intervention_effect`, `context`, `limitations` and `evidence_source.finding_ids`/`citation_keys`. Trace evidence to this PM's canonical Findings and bibliography. Neither nutrient presence, biochemical necessity, KC membership nor provision tracing alone establishes intervention responsiveness. Conditional correction/restriction evidence remains eligible within its boundaries; do not impose a universal human assay or enhancement above adequacy.

**Principal selection:** the separate `principal_route_selection` contains `disposition` (`established` or `not-established`), unique `selected_groups`, `rationale`, `comparative_limitations` and `assessments`. Each selected route requires a distinct assessment of `relevance`, `directness` and `extent` of its demonstrated influence on this PM. Qualification alone, or missing admitted competitors, does not establish primacy. Multiple selected groups additionally require `joint_prominence_rationale` explaining why joint prominence is justified; two supported entries do not imply equal dominance. Unestablished selection uses an empty `selected_groups` list while retaining all qualified routes. Supported non-principal groups remain in section 3. Rejected/unresolved candidates remain in the audit; no placement is inferred from FM inheritance.

**Public statement:** render `Intervention Dominance: <preserved qualification> — <selected principal group(s) or No principal intervention route established>`, followed by the qualification scope and comparative limitations. Keep conditional boundaries visible. Do not invent rankings or equal dominance where the evidence does not establish them. Structural validation checks this separation and traceability; Stage 2B must review the science.

**Numbering and stable identity:** author all three groups once with their canonical labels/IDs in section 3. When Dietary Requirements is moved before Overview, canonical **3.1 becomes 1.1**. Its children become 1.1.1 Direct and/or Derived Dietary Requirements, 1.1.2 Cofactors and Substrates, and 1.1.3 Key Constraints. The groups that remain in section 3 are then numbered from 3.1 in canonical order: canonical **3.2 System Optimisation Practices becomes 3.1**, and canonical **3.3 Lifestyle Levers becomes 3.2**. The same renumbering applies whichever group is moved. A moved group takes the next 1.n number (1.1, then 1.2). Each group left in section 3 takes the next 3.n number (3.1, then 3.2). Titles retain their meanings. `data-pm-lever-group="3.1"` and `data-pm-lever-section="3.1.3"` retain canonical lookup identity independent of visible numbering. Preserve existing anchors; missing ones receive stable `pm-lever-dietary`, `pm-lever-optimisation`, `pm-lever-lifestyle` and dietary-child IDs. Do not renumber Finding, atom, KC/iKC, bibliography or relationship identifiers. The shared disclosure renderer reads these attributes before its legacy heading fallback, preserving the existing hover/focus, click/tap, Escape and origin-link behaviour.

**Exact live PM7 assessment → Diet-Supported retained; principal selection not established; all groups remain in section 3.** F5 qualifies conditional dietary influence, not comparative dominance; F7 provision tracing does not select a principal route. All Findings, full studies and bibliography remain canonical PM7 dependencies; no existing scientific classification is rewritten.

<!-- DOMINANCE-REFERENCE:pm7 -->
```yaml
intervention_dominance: Diet-Supported
intervention_dominance_assessment:
  evidence_qualification:
    label: Diet-Supported
    rationale: The retained Diet-Supported qualification is supported by conditional PM-specific dietary influence; it does not establish comparative intervention dominance.
    scope_note: Conditional animal evidence concerns folate restriction and methyl-derived PC enrichment; it does not establish absolute PEMT flux, benefit above adequacy or cognitive benefit.
    routes:
      - group_id: '3.1'
        evidence_basis: intervention-effect
        intervention_effect: Eight-week folate restriction with labelled choline maintained reduced hepatic d3-PC enrichment and the product/precursor enrichment ratio in female mice.
        context: Female wild-type and Mthfr-heterozygous mice; the hepatic response was not demonstrated in males.
        limitations: Enrichment is not absolute PEMT flux. The restriction experiment does not establish supplementation benefit above adequacy, a human intake target or cognitive benefit.
        evidence_source:
          finding_ids:
            - PM7-F5
          citation_keys:
            - chew_folate_choline_2011
  principal_route_selection:
    disposition: not-established
    selected_groups: []
    rationale: F5 demonstrates conditional dietary responsiveness, but the current assessment does not establish the relevance, directness and extent needed to prioritise this route over the other intervention groups. Absence of admitted alternative entries is not evidence of dietary primacy.
    comparative_limitations: Comparative dominance is not established; no ranking or equal dominance is inferred.
    assessments: []
```
<!-- /DOMINANCE-REFERENCE:pm7 -->

**Exact shared decision-to-placement code → section and route labels.** Integration excerpt from the existing registered build transform, not a standalone renderer. `GROUPS` retains the three canonical titles; `validateDominanceAssessment` rejects unresolved IDs/citations and biochemical-necessity-only evidence.

<!-- DOMINANCE-REFERENCE:plan -->
```js
function dominancePlan(data) {
  const a = data.intervention_dominance_assessment;
  if (!a) return null; // Legacy strings/modes and FM inheritance are not evidence adjudications.
  const errors = validateDominanceAssessment(data);
  if (errors.length) throw new Error(`${data.pm_id || 'PM'} dominance: ${errors.join('; ')}`);
  const promoted = Object.keys(GROUPS).filter(id => a.principal_route_selection.selected_groups.includes(id));
  const remaining = Object.keys(GROUPS).filter(id => !promoted.includes(id));
  const headings = Object.fromEntries([...promoted.map((id, i) => [id, `1.${i + 1}`]), ...remaining.map((id, i) => [id, `3.${i + 1}`])]);
  const selection = a.principal_route_selection;
  const routeLabel = promoted.length ? promoted.map(id => GROUPS[id].title).join(' + ') : 'No principal intervention route established';
  return {promoted, remaining, headings, label: `${a.evidence_qualification.label} — ${routeLabel}`, scope: [a.evidence_qualification.scope_note, selection.comparative_limitations].filter(Boolean).join(' ')};
}
```
<!-- /DOMINANCE-REFERENCE:plan -->

**Explicit independently adjudicated joint-principal test fixture → 1.1 System Optimisation Practices + 1.2 Lifestyle Levers, with 3.1 Dietary Requirements remaining below.** This is synthetic test data, not a real PM scientific admission; `FIX-F1`/`fixture_source` dependencies live only in the test fixture. The same fixture is exercised for each single route, every combination, and no established dominance.

<!-- DOMINANCE-REFERENCE:joint-fixture -->
```yaml
intervention_dominance: Mixed
intervention_dominance_assessment:
  evidence_qualification:
    label: Mixed
    rationale: Synthetic qualification only; two independently supported simulated routes.
    scope_note: Synthetic test fixture only.
    routes:
      - group_id: '3.2'
        evidence_basis: intervention-effect
        intervention_effect: Simulated intervention changes a simulated endpoint.
        context: Synthetic test dataset only.
        limitations: Not a scientific study or a live admission.
        evidence_source:
          finding_ids:
            - FIX-F1
          citation_keys:
            - fixture_source
      - group_id: '3.3'
        evidence_basis: intervention-effect
        intervention_effect: Simulated intervention changes a simulated endpoint.
        context: Synthetic test dataset only.
        limitations: Not a scientific study or a live admission.
        evidence_source:
          finding_ids:
            - FIX-F1
          citation_keys:
            - fixture_source
  principal_route_selection:
    disposition: established
    selected_groups:
      - '3.2'
      - '3.3'
    rationale: Synthetic assessment of relevance, directness and extent selects both routes.
    comparative_limitations: Synthetic demonstration only; no real intervention ranking.
    joint_prominence_rationale: The simulated interventions address complementary substantial parts of the simulated PM endpoint; joint prominence was independently adjudicated.
    assessments:
      - group_id: '3.2'
        relevance: Simulated PM-specific endpoint.
        directness: Simulated intervention directly changes the endpoint.
        extent: Simulated substantial complementary influence.
      - group_id: '3.3'
        relevance: Simulated PM-specific endpoint.
        directness: Simulated intervention directly changes the endpoint.
        extent: Simulated substantial complementary influence.
```
<!-- /DOMINANCE-REFERENCE:joint-fixture -->

Minimal authoring pattern: use the existing shared hub dropdown or native `<details>` exactly once for each canonical group; retain its evidence content. The test source `scripts/fixtures/pm-lever-layout.fixture.mdx` demonstrates stable anchor preservation. Run `node --test scripts/pm-lever-layout.test.mjs` to compile/render the actual transform, execute these documented records, verify all combinations and unchanged disclosure lookup, and reject invalid evidence chains, qualification-label changes and joint promotion without a separate rationale. Supported-but-unselected fixtures verify that support does not imply principal placement. Record actual test/build/browser outcomes separately from this instruction. No synthetic study or bibliography is copied into a live PM.


<!-- PM-LEVER-DOMINANCE-EXAMPLE:end -->

### MDX body vs YAML

The **Required Top-Level Fields** block is the ingestion and authoring data contract (and may appear in front matter). It is not a one-to-one list of rendered body sections: the published MDX follows **Profile A** or **Profile B** above. Keys such as `outputs_biological_effects`, `inputs`, `constraints_failure_modes`, and `notes` support tooling and related pages; they do not imply extra sections after **References** unless the schema is explicitly extended.

## Automated validation

```bash
npm run mechanisms:validate
```

Implementation: `scripts/validate-mechanism-pages.mjs` and `scripts/lib/mechanism-page-validation.mjs` (front matter `timing_specific`, no visible Timing Specific section, extended-profile section order) plus `scripts/lib/pm-mechanistic-basis.mjs` (Mechanistic Basis missing/placeholder checks).

**Mechanistic Basis validation:** if the Mechanistic Basis section (canonical
`## 4.`, legacy `## 5.`) is missing or placeholder, validation fails unless the
page has `mechanistic_authoring_required: true` in front matter.

## Validation Rules

- `timing_specific` is required in front matter (`Yes` | `No`); visible `## N. Timing Specific` body sections are forbidden.
- Mechanistic Basis must be present and non-placeholder unless `mechanistic_authoring_required: true` is set in front matter.
- Extended Profile A PMs must include `## 1. Mission & Overview` (or legacy `## 1. Definition` until migrated) with `### Mission` and `### Overview` (~65–75 word paragraph + normally 3 useful scannable bullets; adapt when evidence does not support all three).
- Overview paragraph word count target: **65–75 words** (acceptable range **50–90** for authoring review); must pass the **20-second acid test** (see `system/mechanism-page-section-prose.md` **PM §1 — Overview**).
- Extended Profile A PMs must include `## 2. Primary Biological Effects` immediately after §1.
- Assessed canonical Profile A PMs include `## 3. Intervention Levers` for remaining groups and render Intervention Dominance plus promoted groups after Mission. Author canonical group titles once; generated visible numbering follows placement while canonical identity remains stable. Untouched legacy pages retain their previous layout until independently assessed.
- Stage 2B (`evidence_status: stage-2b-dietary-addressability`) must evidence-review all three Dietary Requirements layers. `cofactors:` names are not evidence. `key_constraints` does not inherit iKC constituents. §3.1.3 / §4.1.3 is PM↔iKC evidence in `pm_kc_relationships`.
- **Review & Corrections** is a required PM workflow surface (the page tab). Decision records live in `system/framework-qc/framework-issues-register.json` and are linked by `scope.page_ids`. Do not maintain a separate manually written history on the PM. A rerun is incomplete until accepted corrections and unresolved decisions are recorded. Do not mark a correction `applied` until implementation checks pass. Evidence `review_status` stays separate from `correction_status`. PM evidence-audit records (`register_surface: pm-tab`) must not be published on the Framework Review & Corrections register.
- **Open Issues** is the current-question tab for one PM. Records live once in `system/framework-qc/pm-open-issues.json` and are not framework-register rows. See `system/framework-qc-schema.md` § PM Open Issues. Do not promote a PM research gap into the framework register unless it is a shared problem across pages.
- `intervention_breakdown` in front matter, when present, must be one of the five allowed spreadsheet values and must not be rendered as a public body section.
- `overview` must be <=120 words.
- `functional_mechanism_ownership` must contain exactly one FM (never multiple).
- `dependencies` must not include PM-to-PM dependencies.
- `dependencies.kcs[].type` must be only `substrate` or `precursor`.
- `cofactors` must not include KCs, PMs, foods, or unrelated substances.
- `cofactors` / canonical §3.1.2 Cofactors and Substrates must identify the actual biochemical role. A name alone is insufficient for traceability—preserve Input Type, Biological Role and Evidence Source (`system/dietary-input-traceability-contract.md`). Items that are neither cofactors nor substrates must be adjudicated rather than placed in a generic catch-all.
- Inputs must be mechanistically justified; no generic food advice entries.
- Foods/substances must exist in system; unresolved entities may be recorded in optional `missing_entities` authoring metadata but must not be rendered as a PM page section.
- No scoring formulas or numeric scoring logic allowed.
- No Secondary Mechanisms (SMs) introduced during initial rollout.
- References must resolve to existing citation keys in `static/bibtex/BRAIN-diet.bib` per **`system/brs-citation-reference-standard.md`**.
- Every inline `[Author et al., Year]` in **Mechanistic Basis** must have a matching **References** entry with descriptive topic and `citation_key` (orphan in-text refs fail authoring review).
- PM pages with `key_studies` or non-empty `references` front matter should cite at least one source in Mechanistic Basis primary blocks when those studies support the mechanism narrative (waived only when `mechanistic_authoring_required: true`).

## Field Integrity Mapping

- Dependencies -> `dependencies` (KCs + connected mechanisms only)
- Cofactors -> `cofactors` (cofactors only)
- Evidence qualification and independent principal-route selection -> separate records within `intervention_dominance_assessment`; preserve the canonical `intervention_dominance` label
- Column P -> `functional_mechanism_ownership`

An entity must not appear in more than one of these roles with conflicting meaning.



### Canonical constituent iKC identity and PM-specific upstream supply

Follow **Canonical iKC identity and PM-specific upstream supply**, the exact PM3 §3.1.3 worked example, and **Canonical KC decision examples — existing shared integration** in `system/dietary-input-traceability-contract.md`. The latter includes actual PM2 conditional-constraint/consolidation records, its audit-only folate decision, and an explicitly synthetic missing-identity/repair-action fixture. Reuse the existing renderer; do not reconstruct replacement components. Test the documented records with canonical dependencies using `scripts/stage2b-kc-documented-cases.test.mjs`.

- iKC identity means a registered canonical KC constituent linked to a verified substance ID. KC membership and PM-specific applicability are separate adjudications; retain multiple KC memberships on one substance identity.
- Existing `individual_key_constraints` and `kc_input_traceability` hold registrations, with `ikc_identity_version: constituent-v2`, `ikc_id`, `kc_atom_id`, `substance_id`, `identity_status`, `registration_status`, `substance_href`. Explicit `legacy_ikc_references` preserve old pool/arm meanings; no silent migration. Missing substance identity keeps registration pending.
- `supported-upstream-supply` admits a cited supply route without mandatory deficiency or demonstrated constraint. `conditional-constraint` requires a context-specific limitation on PM capacity; supported chains may suffice. Preserve legacy `governs` / `constrained-by` meaning. Neither type establishes extra-intake benefit or downstream propagation.
- **§3.1.2 remains Cofactors and Substrates, unchanged. §3.1.3 contains pool and individual KC disclosures.** Under the pool, use **Individual KC inputs** and five atoms, reader description and supporting Finding link for every individually admitted input. Do not repeat full atoms in the pool summary or import members into other sections automatically.
- `pm_kc_relationships[].constituent_relationships` retains `pm_atom_id`, `kc_atom_id`, `ikc_id`, `substance_id`, `canonical_identity`, `relationship_type` and reviewed pathway. Its scientific fields resolve from the PM atom, not copied overrides.
- `canonical_identity.status` = `resolved`, `existing-substance-identity-inconsistency`, or `missing-substance`. Resolved ID/page linkage is verified; missing/inconsistent identity is a MAJOR flag with PM/KC/type, checked candidates/aliases, repair/creation action and subsequent food assessment in `pending_actions`. Keep science visible and block unreliable projections.
- Existing ontology/SubstanceMatrix reads the same independently admitted canonical §3.1.3 edges, preserving type/evidence/limitations. Future food and FM/BRS projections reuse them; no automatic membership or downstream inheritance. Food composition and approved top-10 are separate later adjudications.


**Visible numbering after placement:** A lever group displayed in section 1 is numbered `1.1` (then `1.2` for another promoted group), with dietary children `1.1.1`–`1.1.3`. Canonical section IDs remain `3.1`/`3.1.1`–`3.1.3` for records, lookup and stable anchors. This numbering correction also applies to a group already placed in section 1 on a legacy page; it neither selects a principal route nor changes its evidence qualification. Do not display §3.1 under section 1.
