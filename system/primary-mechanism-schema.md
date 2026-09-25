# Primary Mechanism (PM) Schema

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
intervention_dominance:              # from intervention dominance
  mode: "diet-dominant" | "lifestyle-dominant" | "mixed"
  inherit_from_fm: boolean
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

## Timing Specific (required ontology metadata; not a default public body section)

`timing_specific` is **required in front matter** on all PM pages (`Yes` | `No`). It must **not** appear as a standalone numbered body section (`## N. Timing Specific` with only `Yes` or `No`). Where timing materially alters interpretation, discuss it within **§4.3 Lifestyle Levers**, **Primary Biological Effects**, **Mechanistic Basis**, or **Scoreable Inputs & Modulation Signals**.

`intervention_breakdown` in front matter remains spreadsheet ingest metadata and is **not** rendered as a public body section. `intervention_dominance` is rendered in **canonical §3 Levers** (legacy §4) as **Intervention Profile**.

## Section body prose

Sections must not restate the page title, entity ID, BRS name/number, or Definition. Each section follows only its schema role. See `system/mechanism-page-section-prose.md`.

## Section Order (Page Rendering Contract)

First line of the MDX body (after front matter) must be the mechanism title: `## <PM_ID> - <PM name>` (same heading level as numbered sections; do not use `#` or `###` for this line). Optional **functional descriptor** on the next line — parenthetical explanation of biological role (see `system/mechanism-page-section-prose.md` **Page title block**). The title names the mechanism; the functional descriptor explains what it does.

Three **profiles** are allowed; pick one per PM and keep numbering contiguous (no gaps in `## N.` sequence).

### Profile A — Extended narrative PM (all BRS PM pages)

**Canonical production order for migrated PMs:** Mission & Overview (§1) →
Primary Biological Effects (§2) → Levers (§3) → Mechanistic Basis (§4, with
§4.1 Scientific Findings where authored) → Phenome Connections (§5) → BRS
Pathways and Connections (§6) → Scoreable Inputs & Modulation Signals (§7) →
References (§8).

Untouched PMs may retain the legacy §3 Phenome / §4 Levers / §5 Mechanistic
Basis order during migration. Shared generators and validators must derive the
layout from the page; they must not hard-code one numbering scheme. A PM is
canonical when this section order is present; no PM-specific renderer or
front-matter marker is required.

The detailed legacy-numbered guidance below remains applicable by section role
while migration is in progress. On a canonical PM, read references to §4 Levers,
§5 Mechanistic Basis, §5.1 Scientific Findings and §3 Phenome Connections as
§3, §4, §4.1 and §5 respectively.

1. Mission & Overview — `## 1. Mission & Overview` with `### Mission` and `### Overview` (~65–75 word paragraph + exactly 3 scannable bullets). Front matter: `mission` + `summary`. See **PM §1 — Mission & Overview** and `system/mechanism-page-section-prose.md`. **Do not use `## 1. Definition` on PM pages.**
2. Primary Biological Effects — `## 2. Primary Biological Effects` (directional arrow summary)
3. Levers — `## 3. Levers` (legacy §4) — public section for dietary requirements, system optimisation and lifestyle implementation (see **PM Levers** below)
   - **3.1 Dietary Requirements** — outer `<details>` dropdown
     - **3.1.1 Direct and/or Derived Dietary Requirements** — PM-attributable dietary requirements, with Direct and Derived relationships distinguished.
     - **3.1.2 Cofactors and Substrates** — the actual biochemical cofactors and substrates required by the PM mechanism.
     - **3.1.3 Key Constraints** — shared nutritionally constrained resource pools or bottlenecks satisfying the KC schema.
   - **3.2 System Optimisation Practices** — `<details>` dropdown; **Food Preparation & Delivery ONLY**. Broader SOP categories are curated on the parent BRS hub.
   - **3.3 Lifestyle Levers** — `<details>` dropdown; non-dietary behaviours; primary place for timing narrative when `timing_specific: "Yes"`
4. Mechanistic Basis — `## 4. Mechanistic Basis` (legacy §5)
   - **Canonical structure (Profile A):** see **PM Mechanistic Basis — Canonical four-part narrative** below. **Reference page:** [BRS1-FM1-PM1](/docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation).
   - **`### Summary` (required):** why this mechanism matters — the integrative implication in plain language, not a restated Definition or repeated mechanism name.
   - **Body (required):** three or more `#### (…)` blocks after Summary, in order: **primary mechanism** (one or more thematic blocks) → **boundaries** → **integration** (KCs, parent FM, cross-links). Explain how the mechanism works; do not re-define the entity.
   - **`<details>` (recommended on Profile A reference pages):** keep **`### Summary` visible**; wrap all post-Summary mechanism content (every `####` block: primary mechanism, boundaries, integration) in one `<details><summary>…</summary>…</details>` inside Mechanistic Basis. Do **not** put Summary or Scientific Findings inside this dropdown.
   - **Citations (required where evidence-backed):** keep inline citations in Mechanistic Basis when rewriting or shortening prose — see **PM Mechanistic Basis — Citations** below. Do not drop references to make the narrative “cleaner.”
   - **Excluded from the mechanism dropdown:** dietary levers, substance ← food bullets, lifestyle levers, scoreable inputs (§3, §7). Scientific Findings use `### 4.1` on canonical pages (`### 5.1` legacy) at the end of Mechanistic Basis.
4.1. Scientific Findings — `### 4.1 Scientific Findings` (optional, recommended on authored PMs) — generated from `scientific_findings`; relationship-specific Findings render under their primary §5 relationship.
5. Phenome Connections — `## 5. Phenome Connections` (legacy §3) — translational mappings from `phenome_relationships`; canonical disclaimer required; empty state when unmapped
6. BRS Pathways and Connections — `## 6. BRS Pathways and Connections` — unified heading on all Profile A PMs (host-BRS placement and cross-BRS links)
   - `### 6.1` BRS Pathways — ordered multi-step pathway chains across PMs (and optionally FMs) when materially relevant; use linked PM labels with `↓` between steps on separate lines. Example (BRS2-FM1-PM1): homocysteine remethylation → phospholipid methylation → neuronal membrane DHA incorporation.
   - `### 6.2` Connected BRS Mechanisms — PM/FM links in other BRS domains (former standalone `## 7. Connected Mechanisms`; harmonised with FM §6 heading)
   - `### 6.3` Connected Primary Mechanisms — parent FM (`parent_fm` in front matter) plus sibling PMs on the same host FM (`mechanisms_covered` on parent FM, excluding this PM)
7. Scoreable Inputs & Modulation Signals — `## 7.` **only when this PM is scoreable in the ontology**; optional intro paragraph; table (or list) may sit inside `<details><summary><strong>Scoreable Input Categories</strong></summary>…` Use three rows only: **Functional Property Potentials**, **Realised Functional States**, **Preparation Transformations** (do not repeat §4.1.1 substances in a Substance / Nutrient Signals row).
8. References — `## 8. References`

### PM §1 — Mission & Overview

**Heading:** `## 1. Mission & Overview`

**Purpose:** Open every PM with biological ambition (Mission), then context and significance (Overview) before Primary Biological Effects, Phenome Connections, or Levers.

```
## 1. Mission & Overview

### Mission
[1–2 lines — biological ambition]

### Overview
[~65–75 words — orientation paragraph + exactly 3 scannable bullets]
```

| Subsection | Role | Rules |
|------------|------|--------|
| **Mission** | Biological ambition — what capability this PM maintains or supports | 1–2 lines; functional biological capacity; **no** nutrients, foods, interventions, biomarkers, or title paraphrase |
| **Overview** | Orientation — why this mechanism matters, in ~20 seconds | **~65–75 word paragraph** + **3 scannable bullets** (job / importance / high-level diet); **no parent FM or BRS architecture**; must stand alone for readers with no framework context |

**20-second acid test:** Can someone understand this page's purpose in ~20 seconds? If not, the Overview is doing too much.

**Overview — three questions (paragraph + bullets):**

1. What biological job does this mechanism perform?
2. Why is it important?
3. How does diet influence it? (very high level only)

**Overview anti-patterns:** microbiome ecology essays; stacking many new concepts in the opening paragraph; parent FM placement (`BRSn(FMx)…`, `ecological strand of…`); `— within BRSn` suffixes (belong in §6, not §1).

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
existing Mechanistic Basis → define propositions → assess relevant evidence → adjudicate → STOP
```

Then, **only if** adjudication materially challenges PM scope:

```
→ flag PM-scope consequence → review Mission + Overview + Mechanistic Basis together → necessary changes only
```

Evidence can therefore challenge the ontology without turning assessment into open-ended research.

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

Write for **three audiences simultaneously:** researchers; clinicians and nutrition professionals; scientifically interested non-specialists. Preserve scientific accuracy while reducing unnecessary cognitive load. Each section should **progressively translate** biology rather than assume specialist knowledge.

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
`system/dietary-input-traceability-contract.md`. Every entry must resolve by
`atom_id` to the canonical `Input | Input Type | Biological Role | Evidence Source
| Limitation (conditional)` record. Do not author an independent Markdown list
that carries scientific relationship data separately from the atoms.

`dietary_lever_presentations` controls placement only. It does not own Input Type,
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

Render Input + biochemical Input Type from the atom. Do not display
Direct/Derived or Derived Target in §3.1.2, even when the same atom also appears
in §3.1.1.

Do not use “Supporting Inputs” as a fallback category. If an item is neither a
substrate nor a cofactor, state its actual biological role and flag it for later
adjudication rather than forcing it into §3.1.2.

##### §3.1.3 Key Constraints

KCs retain the resource-pool/bottleneck definition in
`system/key-constraint-schema.md`. An input is not a KC merely because it is a
substrate, cofactor, nutritional requirement, food-supplied input, upstream input or
participant in a larger pathway. KC membership does not replace or own the
PM-specific dietary-requirement or substrate/cofactor relationship. The same
substance may participate in both where the edges are scientifically distinct.

Render the KC title and KC-specific context only. Direct/Derived and Derived
Target metadata from a reused input atom must not appear in §3.1.3.

The KC page owns canonical KC membership. The PM independently owns Input→PM and
PM↔KC propositions. First adjudicate the input against the PM and store its
PM-specific five atoms; do not wait for KC review:

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
    pm_biological_role: Why this PM depends on the KC resource context
    evidence_source:
      finding_ids: [PM1-F1]
    evidence_limitation: Boundary of the PM↔KC claim
    constituent_relationships:
      - relationship_id: BRSX-FM1-PM1-KCI-1
        pm_atom_id: BRSX-FM1-PM1-DIT-1
        kc_membership_status: legacy-unreviewed
        legacy_kc_constituent_label: Legacy KC label
        kc_change_control_flag_id: KC-CC-BRSX-FM1-PM1-01
```

`key_constraints` is a legacy/index link and is not evidence. A PM constituent
relationship always references the PM-owned `pm_atom_id`. If KC membership is
separately reviewed, set `kc_membership_status: canonical-reviewed` and add the
canonical `kc_atom_id`. An unreviewed KC is never a blocker: retain
`legacy-unreviewed`, raise the referenced change-control flag, and complete the PM
adjudication. Neither record may copy or override the other's science.

KC-level evidence does not establish relevance to this PM. PM-specific evidence
does not establish KC membership. Retirement or modification of a KC must not
delete a valid PM-owned atom.

If PM review challenges a KC, constituent, or missing bottleneck, record
`kc_change_control_flags` and leave canonical KC data unchanged. See
`system/key-constraint-schema.md` and
`system/mechanism-change-control-queue.md`.

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

Example: protein-containing foods → dietary protein/amino-acid provision
(`Derived`, `Input Type = Substrate Provision`) → methionine (`Direct`,
`Input Type = Substrate`) → MAT substrate requirement → SAMe synthesis capacity.
Not every PM must contain every level. Food composition and Food → Substance mapping
remain owned by the Food architecture.

The five-atom evidence structure remains `Input | Input Type | Biological Role |
Evidence Source | Limitation (conditional)`. Direct/Derived classification does not
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

**Heading:** `## 3. Levers` on canonical PMs; `## 4. Levers` on untouched legacy PMs.

**Intervention Profile (required, visible):** place `### Intervention Profile` with `**Intervention Dominance:**` from front matter `intervention_dominance` **above** the **3.1**, **3.2**, and **3.3** lever dropdowns (legacy pages: 4.1–4.3). Do not use `<details>` for Intervention Profile.

**Rendering contract:** **3.1 Dietary Requirements**, **3.2 System Optimisation Practices**, and **3.3 Lifestyle Levers** are top-level `<details>` (or hub-collapsible) dropdowns under canonical `## 3. Levers`, in that order. Inside **3.1 Dietary Requirements**, use three nested blocks titled exactly **3.1.1 Direct and/or Derived Dietary Requirements**, **3.1.2 Cofactors and Substrates**, and **3.1.3 Key Constraints**. Untouched PMs may retain the former Dietary Levers / Direct Dietary Levers / Cofactors and Supporting Inputs / KCs headings until recomputed; shared readers and validators must accept both.

**§3.2 guiding question:** How can dietary inputs be selected, prepared, combined, timed, or preserved to act more effectively on this biology?

**§3.2 vs §3.3 boundary:**

| §4.2 System Optimisation | §4.3 Lifestyle |
|---|---|
| Gentle cooking preserves marine-PUFA matrix | Sleep, exercise, stress recovery |
| Repeated weekly oily-fish beats bolus dosing | Circadian routines |
| Preparation, pairing, matrix, storage, frequency | Non-dietary behaviours |

**Do not** place cofactors, KCs, substance ← food levers, optimisation strategies, or lifestyle bullets under **§6 BRS Pathways and Connections** or inside **§4 Mechanistic Basis**.

```markdown
## 3. Levers

### Intervention Profile

**Intervention Dominance:** <from front matter intervention_dominance>

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

- PM-specific relationship to the canonical shared resource pool or bottleneck

</details>

<details>
<summary><strong>3.2 System Optimisation Practices</strong></summary>

<p class="brs-pm-sop-scope"><strong>1. Food Preparation &amp; Delivery ONLY</strong></p>

- Preparation, pairing, matrix preservation, and delivery-pattern bullets

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
| **6.2 Cross-BRS Mechanism Relationships** | Cross-BRS PM graph (canonical) | PM-to-PM links in other BRS domains with explicit biological connection copy. **Primary Mechanisms in other Biological Regulatory Systems that directly interact with, constrain or support this mechanism.** This is the single canonical home for PM-to-PM relationships — do not duplicate on hub pages. |
| **6.3 Local BRS Mechanism Relationships** | Same-BRS PM links | Sibling PMs on the same FM (exclude current PM). **Related Primary Mechanisms within the same Biological Regulatory System that collectively support the integrated biological function.** No parent FM, cofactors, KCs, or dietary levers here. |

**Architectural rule:** PM §6.2 is the **canonical mechanistic graph** (PM pages only). Hub **Cross-BRS Dependencies** provide systems-level interpretation — why one BRS constrains another, integrated regulatory capacity, allostatic context, and translational examples — without duplicating PM relationship lists.

**§3 vs §6:** canonical §3 is implementation only (dietary, cofactors, KCs, optimisation, lifestyle). §6 is connectivity only (pathways, cross-BRS PM relationships, same-BRS PM relationships).

**Example pathway (BRS2-FM1-PM1):**

```
[BRS2-FM1-PM1 — Folate/B12-Dependent Homocysteine Remethylation](/docs/biological-targets/brs2/fm1/brs2-fm1-pm1-folate-b12-dependent-homocysteine-remethylation)
↓
[BRS2-FM3-PM7 — Phosphatidylcholine Formation](/docs/biological-targets/brs2/fm3/brs2-fm3-pm7-phosphatidylcholine-formation)
↓
[BRS1-FM3-PM6 — Neuronal Membrane DHA Incorporation](/docs/biological-targets/brs1/fm3/brs1-fm3-pm6-neuronal-membrane-dha-incorporation)
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
| **`### Summary`** | Usually implication-only; add `[Author et al., Year]` only when a single study directly supports the central claim. |
| **Primary mechanism `####` blocks** | **Required** for evidence-backed statements (pathway biology, meal effects, substrate relationships). Format: `[Author et al., Year]`. |
| **Boundaries** | Cite when the boundary claim depends on literature; PM cross-links alone need no duplicate citation if References already lists the source. |
| **Integration** | Typically placement prose + entity links; citations optional unless integration asserts an evidence-backed dependency. |

**References section:** each cited study appears as `Author et al. (Year) — Short Descriptive Study Topic` with link to `/docs/papers/BRAIN-Diet-References#citation_key`. Pull keys from `key_studies` / `references` front matter; verify each `citation_key` exists in `static/bibtex/BRAIN-diet.bib`.

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
§5 Phenome Connection, not in the Mechanistic Basis subsection.

| § | Role (Profile A extended) |
|---|------|
| **§1 Mission & Overview** | Biological ambition + brief orientation (~65–75 words) + 3 scannable bullets | What + why before how; no dietary implementation; no parent-FM architecture |
| **§2 Primary Biological Effects** | Directional ↑/↓ summary of emergent outcomes. |
| **§3 Levers** | Dietary (3.1.1–3.1.3), optimisation (3.2), and lifestyle (3.3) implementation — all in `<details>` dropdowns. Builds on §1 Overview; Pattern → Nutrients → Biology → Target Foods inside §3.1. |
| **§4 Mechanistic Basis** | How the biology works (canonical four-part narrative). |
| **§4.1 Scientific Findings** | Findings that adjudicate defined Mechanistic Basis propositions. |
| **§5 Phenome Connections** | Translational mappings, with relationship-specific Findings rendered inside their primary relationship — not single-mechanism outcome claims. |
| **§6 BRS Pathways and Connections** | Pathway chains, cross-BRS links, same-FM PM rollups — **not** levers, cofactors, or KCs. |

Profile B compact PMs keep cofactors under `## 3. Underlying Mechanisms and Requirements` → `### 3.1 Cofactors and Supporting Inputs`.

Untouched legacy PMs use §3 Phenome Connections, §4 Levers, §5 Mechanistic Basis
and §5.1 Scientific Findings; the roles and ownership rules are identical.

**Include studies that (high priority):** alter interpretation; reveal synergies or dependencies; show meaningful human or intervention relevance; expose heterogeneity or context-dependent responses.

**Exclude (low priority):** findings that only repeat textbook biology; small redundant mechanistic papers; studies that merely mention the pathway without changing how to read the PM; **phenome/outcome science** that does not adjudicate a defined PM → Phenome proposition.

**Phenome boundary (non-negotiable):** Mechanistic Findings and FM §4.4 must
**not** duplicate §5 Phenome Connections. Phenome/outcome science belongs in
relationship-specific Findings that test a **defined PM → Phenome relationship
proposition**, or in Connected / Supportive Evidence — not as open-ended
mechanism review. Do not populate from BRS hub ADHD dropdown tables; those rows
feed phenome review (`system/phenome-relationship-review-methodology.md`), not
mechanism evidence maps (`scripts/lib/pm-evidence-highlights.mjs`).

**UX:** `#### Introduction/Summary` (visible) → one or more Scientific Finding
components. Phenome-relationship Findings render fully inside their primary §5
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

Body sections **do not** include Missing Entities, System Integration, Key Insight, Functional Mechanism Ownership, Intervention Summary, Intervention Breakdown, Constraints and Failure Modes, Scoring Interpretation, Notes, or Mechanism Summary Table. Those belong in front matter, FM pages, authoring metadata, or other artefacts. `intervention_breakdown` and FM ownership stay in YAML/front matter; `intervention_dominance` is rendered only via **§4 Intervention Profile**.

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
- Extended Profile A PMs must include `## 1. Mission & Overview` (or legacy `## 1. Definition` until migrated) with `### Mission` and `### Overview` (~65–75 word paragraph + exactly 3 scannable bullets).
- Overview paragraph word count target: **65–75 words** (acceptable range **50–90** for authoring review); must pass the **20-second acid test** (see `system/mechanism-page-section-prose.md` **PM §1 — Overview**).
- Extended Profile A PMs must include `## 2. Primary Biological Effects` immediately after §1.
- Canonical Profile A PMs must include `## 3. Levers` with visible `### Intervention Profile` and `**Intervention Dominance:**` above 3.1–3.3. Newly authored or recomputed pages use **3.1 Dietary Requirements**, **3.1.1 Direct and/or Derived Dietary Requirements**, **3.1.2 Cofactors and Substrates**, and **3.1.3 Key Constraints** exactly. Untouched PMs may retain the former §3.1/§4.1 terminology for backward compatibility.
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
- Intervention dominance -> `intervention_dominance.mode`
- Column P -> `functional_mechanism_ownership`

An entity must not appear in more than one of these roles with conflicting meaning.

