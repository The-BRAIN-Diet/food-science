# Key Constraint (KC) Schema

Citation and reference format: **`system/brs-citation-reference-standard.md`**.

## Build Gate Proviso

- Never render or expose spreadsheet letter identifiers in generated content or public-facing pages.
- Always use semantic entity names (for example, `Intervention Dominance`, `Coverage Timing`, `Evidence Type`).
- Treat any letter-identifier wording in generated outputs as a validation failure that must be fixed before build.

This schema defines the canonical data contract and authoring contract for Key Constraint pages.

---

## KC Definition

A Key Constraint (KC) is an **identifiable nutritionally constrained resource
pool or bottleneck** whose availability can **constrain multiple biologically
distinct Primary Mechanisms (PMs)** within a Biological Regulation System (BRS).
It is not a container for nutrients that merely support the same biological
outcome.

KCs describe:

- shared substrate pools
- shared precursor pools
- shared structural biological pools
- resources drawn upon by multiple PMs across distinct mechanisms

### KC inclusion test (required)

Before creating or retaining a KC, apply:

> Does this resource function as a **shared limiting pool across several biologically distinct mechanisms**, or is it primarily a **direct dietary input to a specific mechanism**?

If it is primarily a direct input to a specific PM, FM, or narrow PM group, **do not** represent it as a KC. Retain it within:

- PM **§3.1.1 Direct and/or Derived Dietary Requirements** and **§3.1.2 Cofactors and Substrates** (legacy pages may still use Dietary Levers / Direct Dietary Levers / Cofactors and Supporting Inputs)
- **BRS Dietary Guidance** on hub pages
- relevant **FM** summaries and **Cross-BRS Dependencies**

Importance alone does not justify KC status. A substance is not a KC merely because it is a substrate, cofactor, nutritionally required, food-supplied, upstream of a PM, or part of a larger pathway. Do not rename a PM-specific dietary requirement as a “pool.”

### Architectural boundary

| Layer | Role |
|---|---|
| **KC** | Shared substrate, precursor or cofactor dependency spanning multiple distinct mechanisms **within one BRS** |
| **PM Dietary Requirement** | Nutrient, compound, food or dietary strategy attributable to a particular PM as a Direct or Derived requirement, or as a PM-specific substrate/cofactor |
| **BRS Dietary Guidance** | Broader practical dietary synthesis across the system |
| **Cross-BRS Dependency** | How one regulatory system supports or constrains another |

Do not blur these layers. KC membership does not own or replace a PM-specific Direct/Derived Dietary Requirement or a PM-specific substrate/cofactor relationship. The same substance may carry both edges where scientifically appropriate — for example, methionine as a PM3 MAT substrate and methionine as a KC2 shared resource pool.

### Cross-BRS rule (required)

**Do not promote cross-BRS Key Constraints into another Biological Regulatory System hub.**

- A KC belongs exclusively to the BRS that owns the shared biological resource.
- Hub **Key Constraints (Dietary Bottlenecks)** lists **native KCs only** for that BRS.
- If BRS1 depends on BRS2 or BRS3 biology, represent that only in **Cross-BRS Dependencies** — not by importing BRS2(KC1) or retired BRS3(KC3) into the BRS1 KC block.
- PM §3.1.3 (legacy §4.1.3) may still link cross-BRS KCs where a PM genuinely draws on an external pool; that does **not** roll up to foreign hub KC sections.

**Native biology → native Key Constraints. Cross-system biology → Cross-BRS Dependencies.**

Examples of valid KCs: amino-acid competitive pools, methyl-donor pools, fermentable-fibre substrate availability, antioxidant precursor sufficiency.

**Not valid as KCs:** essential fatty acids or EPA/DHA balance when they primarily duplicate membrane-lipid or inflammation-resolution PM dietary levers (retired: `BRS3(KC3)`).

KCs should NOT describe:

- cofactors
- vitamins and minerals acting as enzyme cofactors
- lifestyle interventions
- behavioural factors
- mechanisms themselves
- PM-specific requirements

### Architectural Principle

| Layer | Answers |
|---|---|
| KC | What shared biological resource pool do multiple PMs depend upon? |
| PM Cofactors and Substrates (§3.1.2) | What biochemical cofactors and substrates does this specific mechanism require? |

This distinction avoids duplication between KC pages and PM cofactor sections.

KCs answer:

> What shared biological resource pool do multiple PMs depend upon?

---

## Canonical ownership and evidence governance

### Terminology

| Term | Meaning |
|------|---------|
| **KC1, KC2, KC3…** | Canonical **KC pages** (`kc_id`, for example `BRS3(KC1)`). |
| **iKC** | An **individual Key Constraint** recorded on a KC page. One KC page may contain one or more iKCs. |
| **PM ↔ iKC** | Many-to-many. A PM may reference multiple iKCs. An iKC may apply to multiple PMs. |

Until a KC page declares `individual_key_constraints`, it is treated as a single
iKC whose `ikc_id` equals `kc_id`. That default does not invent extra constraints
and does not rewrite existing KC pages.

### Sequence (KC first, PM second)

The intended evidence sequence is:

1. **KC evidence review** — what each iKC constrains; its constituent
   inputs/resources; evidence for those relationships; intended FM/PM scope;
   limitations.
2. **PM evidence review** — independently whether that iKC applies to the PM, and
   **which** of its constituents are supported for that PM.
3. **KC review flag** — only if PM reviews systematically conflict with the iKC's
   claimed scope. The PM must not rewrite the iKC.

A PM may record **proposed** applicability (`legacy-unreviewed`) while a KC page
is not yet canonical. It must not treat iKC membership as established
(`canonical-reviewed`) until the KC page has completed canonical evidence review.

**KC-page evidence review** (before PM Stage 2B): follow
`system/kc-page-evidence-review-contract.md`. Reuse the Scientific Finding
bounded-assessment workflow, five-atom Dietary Requirements records, Input Types,
Evidence Source / Limitation rules, and `kc_change_control_flags`. Do not invent
a parallel evidence ontology. Calibration: `system/brs3-kc1-evidence-review.md`.

### Ownership

- **KC page / iKC owns:** definition of the constraint; constituent membership;
  evidence for that membership; intended scope and limitations.
- **PM owns:** whether the iKC applies to that PM; which iKC constituents are
  supported for that PM; evidence of that applicability in `pm_kc_relationships`.
  **“PM-specific”** means supported applicability to that PM, not uniqueness,
  local evidence ownership, or governance of the pool.

These remain separate propositions. **iKC membership ≠ PM relevance. PM relevance
≠ iKC membership.** A validated PM → constituent → iKC relationship requires
**both** independently. Relationships may connect through canonical IDs after
those independent adjudications; ownership and evidence do not propagate.

`key_constraints` records **which iKCs apply, or are proposed to apply**, to a PM.
It does **not** make the iKC's constituent relationships automatically true for
that PM. If an iKC contains A, B, and C, and PM evidence supports only A, the PM
may show its relationship to that iKC through A. It must not inherit B and C.
PM evidence for A does not establish that A belongs to the iKC.

### KC-owned constituent evidence

Every constituent retained by a completed canonical KC evidence review must have
one KC-owned five-atom record:

```yaml
kc_evidence_review_status: canonical
individual_key_constraints:
  - ikc_id: BRSX(KC1)-IKC1
    title: Example individual constraint
kc_input_traceability:
  - atom_id: BRSX-KC1-KIT-1
    ikc_id: BRSX(KC1)-IKC1
    input: Evidence-supported input
    input_type: substrate
    biological_role: Role within this iKC resource pool
    evidence_source:
      citation_keys: [supporting_source]
    evidence_limitation: Boundary needed to avoid broadening the claim
    constraint_status: nutritionally-constrained
    ikc_membership: admitted
    claim_ceiling: dietary-provision
kc_constituent_presentations:
  - atom_id: BRSX-KC1-KIT-1
    label: Evidence-supported input
    evidence_label: Evidence-supported input
    section: core-nutritional-requirements
```

`individual_key_constraints` is optional. A KC page without it is one iKC whose
`ikc_id` equals `kc_id`. `kc_input_traceability[].ikc_id` is required only when
the page declares more than one iKC.

The atoms remain:

1. Input
2. Input Type
3. Biological Role
4. Evidence Source
5. Limitation — when required

`biological_role` must describe the input's role in the KC resource
pool/bottleneck. Evidence must support constituent membership at that level.

Optional KC-layer overlays on the same five atoms (not extra scientific atoms):
`constraint_status` (`nutritionally-constrained` | `biochemical-requirement` |
`dietary-input` | `modulatory` | `unsupported`), `ikc_membership` (`admitted` |
`excluded`), and `claim_ceiling` (same vocabulary as Dietary Requirements).
See `system/kc-page-evidence-review-contract.md`. Biochemical requirement,
pathway participation, substrate/cofactor status, dietary provision, or
biological relevance alone cannot admit a constituent. Only `admitted` rows
project as iKC constituents. KC pages may also carry `kc_change_control_flags`
for unresolved title, grouping, constituent, or proposed-scope issues.
Existing inputs are not grandfathered: a canonical KC review must independently
retain, modify, or remove every constituent. Until reviewed, legacy pages remain
explicitly unreviewed; they must not claim `kc_evidence_review_status: canonical`.

`kc_constituent_presentations` projects the atom by ID. It may control placement
and reader labels but must not restate or override Input, Input Type, Biological
Role, Evidence Source, or Limitation in a parallel Markdown-owned scientific
record. `label` is the §2 compact-list label. Optional `evidence_label` is the
exact §3 dropdown-title text when that title includes a reader-facing synonym or
qualifier; otherwise §3 uses `label`.

### Food examples are a separate proposition

`Resistant starch ← cooled potatoes` contains two claims:

1. resistant starch contributes to the KC pool; and
2. cooled potatoes provide resistant starch.

KC evidence must establish the first claim. The second belongs to the existing
Food→Substance/Input composition architecture and cannot substitute for KC
membership evidence. Representative foods may be displayed only as a projection
of separately supported composition data.

### Independent PM adjudication and iKC connection

After the KC page has evidence-qualified its iKCs (or while applicability is only
proposed), a PM Dietary Requirements review independently tests Input→PM
relationships, including inputs listed by a legacy or reviewed iKC. Supported PM
science is stored as a PM-owned five-atom `dietary_input_traceability` record. PM
content must not be populated by copying KC-owned evidence or iKC constituent
lists.

PM↔iKC applicability follows `system/dietary-input-traceability-contract.md`
§ **Type D — shared-constraint applicability**. A PM may **govern** the
constraint or be **constrained by** it; both modes use that threshold.
Upstream assessment ownership does not decide membership. Precursor delivery
plus substrate necessity does not automatically establish it. Record
`kc_applicability_adjudications` (`established`, `unassessed`, `unresolved`,
or `evidence-supported-non-application`). Public empty copy remains
`No mapping established.`

After independent PM adjudication, §3.1.3 may connect the PM atom to **iKC**
context:

- `pm_atom_id` is required and resolves the PM-owned scientific relationship;
- `kc_atom_id` is optional and may be added only when KC membership has separately
  reached `canonical-reviewed`;
- `legacy-unreviewed` preserves the legacy KC label and raises a KC
  Change-Control Flag without delaying the PM decision; and
- `challenged` records that PM evidence does not settle the KC membership
  proposition.

The PM must never automatically modify an iKC (definition, membership, or KC-owned
evidence). The KC must not redefine or remove the PM-owned atom. Displaying an
input under iKC context on a PM means the **Input→PM relationship is PM-owned**;
it does not establish iKC membership or automatically establish a §3.1.1
Direct/Derived classification. Conversely, iKC membership does not justify
projecting the input into every PM that lists the parent KC page.

Where the same input independently qualifies as a §3.1.1 Dietary Requirement,
represent that as a distinct PM-owned relationship with its own provenance.
Do not infer it from KC membership.

### KC change control

When a PM review suggests an invalid KC/iKC, a questionable constituent, a
possible new constituent, a possible new KC, or **systematic disagreement with an
iKC's claimed scope**, record a **KC review flag** (`kc_change_control_flags`,
including `ikc-scope-conflict` where the conflict is with claimed iKC scope). Do
not modify canonical iKC membership during the PM review. The KC-owned evidence review
must adjudicate:

- constituent: “Is this input genuinely part of this constrained resource pool?”;
- KC: “Is this an identifiable bottleneck rather than nutrients supporting the
  same outcome?”; or
- new KC: “Does this independently constrained resource affect multiple distinct
  mechanisms?”

Cross-PM relevance alone does not establish a KC. The structured flag vocabulary
and lifecycle are defined in `system/mechanism-change-control-queue.md`; validators
enforce it through `kc_change_control_flags`.

### Retirement

If canonical review finds a KC invalid or redundant:

1. add its ID and route to the retired KC registry;
2. remove the live KC page and KC identity/membership projections;
3. do not automatically migrate its constituents or create a replacement KC;
4. independently adjudicate former constituents against relevant PMs or other
   architecture layers; and
5. preserve every independently valid PM-owned relationship and its provenance;
   and
6. preserve historical retirement notes without leaving live KC dependencies.

Retired KCs must not appear in `key_constraints`, `pm_kc_relationships`, hubs, or
other live projections. Validators enforce this against
`scripts/lib/kc-registry.mjs`.

---

## KC Architecture Role

| Layer | Purpose |
|---|---|
| KC | shared substrate/precursor/structural pool availability |
| PM | what dynamically regulates |
| FM | what integrated functional state emerges |
| PM Cofactors (§7.2) | mechanism-specific vitamin/mineral/support requirements |

KCs are intentionally:

- broader
- lower-resolution
- more stable
- less intervention-dynamic

than PMs.

---

## Canonical KC Page Structure

Render sections in this exact order (Section Rules are authoritative):

**Profile A (current — all KC pages migrated):**

1. Ambition — concise statement of the biological resource condition being maintained.
2. Core Nutritional Requirements — validated shared resources with representative foods (`Resource ← foods`).
3. Evidence Base — a concise evidence-supported Summary plus resource-level
   evidence disclosures explaining why §2 resources qualify as genuine shared
   biological requirements.
4. Emerging Biological Supports — source-led candidates that may support regulatory capacity but are not established core requirements (explicit “none prioritised” when empty).
5. Connected Mechanisms (#### Functional Mechanisms, #### Primary Mechanisms)
6. Key References — established-resource sources; separate emerging-support sources where listed.

**Legacy Profile (retired — do not use):**

1. Ambition
2. Shared Biological Pool
3. Biological Importance
4. Connected Mechanisms
5. Key References

Page title line format (above section 1):

`### {kc_id} - {name}`

Optional **functional descriptor** on the next line — parenthetical explanation of the shared resource's biological role (see `system/mechanism-page-section-prose.md`).

---

## Section Rules

### 1. Ambition

Describe the desired state of the shared biological resource pool in one concise paragraph.

This section must answer:

> What biological resource availability is the body trying to maintain?

Rules:

- no bullets
- no pathway teaching
- no PM-by-PM explanation
- no intervention protocols
- no PM-style control verbs (`regulates`, `drives`, `controls`)

KCs define the resource state being maintained, not pathway dynamics.

### 2. Core Nutritional Requirements

List **validated** shared nutritional resources (substrates, precursors, structural components) using the translational format:

`Resource or nutrient target ← representative foods`

Purpose:

- identify established dietary requirements, indispensable substrates, and required cofactors shared across multiple PMs
- anchor the KC in real biological resources without turning the KC into a PM

Each displayed resource must project a KC-owned `kc_input_traceability` atom after
the KC has completed canonical evidence review. The compact reader display may
remain concise; the atom is the scientific record.

Inclusion threshold (all must apply):

- established dietary requirement, indispensable substrate, or required cofactor
- inadequate availability can materially constrain connected biology
- shared across multiple relevant mechanisms — not a direct lever for only one PM

Format:

- keep the canonical `### 2. Core Nutritional Requirements` heading, then place
  the complete section body inside one collapsed `brs-fm-hub-item` disclosure,
  matching the outer **Dietary Requirements** disclosure used on PM pages;
- label the disclosure **Core Nutritional Requirements** and use the standard
  `brs-fm-hub-shell`, `brs-fm-hub-summary`, `brs-fm-hub-chevron` and
  `brs-fm-hub-panel` structure;
- one resource per bullet
- use `Resource ← food, food, food`
- 2–4 representative foods per resource where possible
- do not add extra explanatory prose in this section

```mdx
### 2. Core Nutritional Requirements

<div class="brs-fm-hub-item" data-brs-fm-hub>
<div class="brs-fm-hub-shell">
<button type="button" class="brs-fm-hub-summary" aria-expanded="false">
<span class="brs-fm-hub-chevron" aria-hidden="true"></span>
<strong>Core Nutritional Requirements</strong>
</button>
<div class="brs-fm-hub-panel" hidden>

- Resource

</div>
</div>
</div>
```

Avoid:

- cofactors listed only on PM §4.1.2 (unless established shared requirement)
- category + member duplication without distinct KC rationale
- pathway descriptors as list items
- vague healthy-food lists or PM-style intervention protocols

**Legacy heading:** `### 2. Shared Biological Pool` (retire on migration)

### 3. Evidence Base

Replace legacy **Biological Importance**. Explain why §2 resources qualify as **Core Nutritional Requirements**.

Answer:

> What evidence establishes these nutrients or substrates as genuine shared biological requirements for this KC?

Required content:

- concise synthesis of biochemical/physiological necessity
- deficiency or insufficiency evidence where relevant
- precursor, substrate, cofactor, or structural roles
- evidence that several connected mechanisms draw on the resource
- human nutritional relevance
- important limitations or boundaries

Evidence claim:

> **Adequate availability is required to prevent biological constraint.**

Not automatically:

> **Additional intake enhances performance.**

#### Evidence-supported Summary

The visible `#### Summary` is the KC equivalent of an evidence-supported PM
Overview. Treat every substantive statement as a proposition; inherited prose,
the KC title, ambition, connected-mechanism list and attached references are
candidate evidence, not authority.

Write for interested members of the public, with nutritionists as the most
technically specialised intended readers. The Summary must stand alone without
requiring knowledge of KC governance or the BRS architecture.

Open with one concise explanatory paragraph (normally about 65–90 words) that
answers:

1. What shared nutritional resource or availability constraint does this KC
   represent?
2. Which admitted resources constitute it, and how do they form one coherent
   pool or bottleneck?
3. At what evidence-supported claim ceiling can dietary availability matter?

After that paragraph, use exactly three non-duplicative, scannable bullets:

1. **Constraint and membership boundary** — what belongs to the shared
   constraint and which adjacent cofactors, substrates, pathways or outcomes do
   not. Mention an excluded input only when it materially clarifies the
   boundary; do not turn the bullet into an exclusion inventory.
2. **Evidence / measurement boundary** — what the cited evidence establishes
   and which tempting interpretation or unmeasured endpoint it does not
   establish.
3. **Biological relevance and provision limitation** — why adequate
   availability matters while separating prevention of constraint from claims
   that additional intake, supplementation or treatment improves downstream
   function or clinical outcomes.

The bullets add orientation rather than repeat the paragraph or one another.
Use readable, claim-local bibliography citations for substantive paragraph and
bullet claims. Do not attach one general source to several claims it does not
support.

Reader-facing Summary copy must not discuss internal governance or workflow.
Do not use maintenance language such as `iKC`, `admitted`, `excluded`,
`canonical`, `proposed scope`, `Stage 2B`, “on this page”, or “later review.”
Record those decisions in frontmatter and the KC evidence-review report.
Translate a scientifically important exclusion into a biological boundary (for
example, “vitamin B12 is a catalytic cofactor rather than a net methyl-group
input”), without narrating the adjudication process.

The Summary is synthesis, not practical advice, a miniature review or a
replacement for the resource disclosures. Study details, source-by-source
limitations and full constituent rationale belong in the collapsible evidence
blocks and review report.

Use hub-collapsible dropdowns after the Summary, one per admitted resource.
Each dropdown uses the same title interaction as §4:

- `data-brs-kc-evidence-resource="slug"` on the dropdown wrapper
- a chevron button that expands or collapses the full resource evidence panel
- the resource name once, as a title button: pointer hover or keyboard focus
  reveals its five-field `kc_input_traceability` disclosure at the title, while
  activating the title toggles the same panel as the chevron
- the title text must equal that atom's `kc_constituent_presentations.label`, or
  its `evidence_label` when a reader-facing synonym or qualifier is shown

The expanded panel opens with `#### Biological Importance` explaining that
resource’s contribution to the KC, followed by `Supporting Evidence` using
linked bibliography entries in hub integration format
(`<a href="/docs/papers/BRAIN-Diet-References#citation_key">Author et al.,
Year</a> — …`). Do not create large audit tables or a separate five-field bullet
inside the panel.

Before completing a canonical KC evidence review:

1. compare the Summary claim by claim with `kc_input_traceability`, the
   adjudicated page definition and governing claim ceilings;
2. confirm every substantive citation resolves to the intended bibliography
   record and supports the adjacent proposition;
3. inspect the rendered Evidence Base and confirm one paragraph, exactly three
   distinct bullets and clear public-facing boundaries; and
4. record the Summary check and any unresolved claim in the KC review report.

**Legacy heading:** `### 3. Biological Importance` (retire on migration)

### 4. Emerging Biological Supports

Compounds with credible evidence that they **may** support the KC’s regulatory capacity under specific conditions — **not** core nutritional requirements.

For each candidate (when listed), use a hub-collapsible dropdown (same pattern as §3 Evidence Base resource groups):

- `data-brs-emerging-support="slug"` on the dropdown wrapper (parse anchor and deep-link auto-expand)
- a chevron button that expands or collapses the full candidate research panel
- the candidate name once, as a title button: pointer hover or keyboard focus reveals the five-field disclosure at the title, while activating the title toggles the same research panel as the chevron; do not repeat it as an inner `####` heading
- **Why it is interesting** — regulatory capacity supported, with inline `[Author et al., Year]` where evidence-backed
- **Why it remains emerging** — evidence boundary (preclinical, condition-specific, inconsistent supplementation, etc.), with inline citations where evidence-backed
- **Supporting Evidence** — linked bibliography entries in hub integration format (`<a href="/docs/papers/BRAIN-Diet-References#citation_key">Author et al., Year</a> — …`)

Every §4 candidate requires the same five-field atomic currency used elsewhere:

1. Input
2. Input Type
3. Biological Role
4. Evidence Source
5. Limitation

Store these in `kc_emerging_support_traceability` and project them with
`kc_emerging_support_presentations`:

```yaml
kc_emerging_support_traceability:
  - atom_id: BRSX-KC1-EBS-1
    input: Evidence-supported intervention
    input_type: nutrient/substance
    biological_role: Explicit support claim at the level directly established
    evidence_source:
      citation_keys: [supporting_source]
    evidence_limitation: Visible boundary preventing a broader interpretation
kc_emerging_support_presentations:
  - atom_id: BRSX-KC1-EBS-1
    support_slug: evidence-supported-intervention
    label: Evidence-supported intervention
```

These are **support atoms**, not iKC constituent atoms. They must not enter
`kc_input_traceability`, receive `ikc_membership`, or project into §2 solely
because they support regulatory capacity. The presentation record may control
the support slug and candidate-title disclosure label but must not restate the
five scientific fields. The five-field disclosure is located at the candidate
title and must appear on pointer hover and keyboard focus. Activating that title
or the adjacent chevron toggles the full candidate research panel. Where
study-level detail is needed, also report exposure,
population/model, measured endpoints, results and limitations inside Supporting
Evidence.

Hub **Conditional Supplementation** Supports links use `KC2 — Evidence base — Substance` labels pointing to `{kc-page}#{slug}`.

§6 Key References for Emerging Biological Supports must list only standard bibliography links (`[Author et al. (Year) — Topic](/docs/papers/BRAIN-Diet-References#citation_key)`), not unlinked substance labels.

When no candidate meets the threshold, state explicitly that no Emerging Biological Supports are currently prioritised. Do not populate from trend lists.

**Hub roll-up:** Each Emerging Biological Support candidate wrapper under this section is auto-populated into the parent BRS hub’s **System Optimisation Practices → Conditional Supplementation** panel (`scripts/lib/kc-emerging-supports.mjs`). Keep candidates source-led and condition-specific; empty KC §4 sections leave Conditional Supplementation as **Coming soon** unless a curated override exists.

### 5. Connected Mechanisms

List connected PMs and FMs that depend on this KC.

Render with subheadings:

- `#### Functional Mechanisms`
- `#### Primary Mechanisms`

Use linked entries where possible.

KCs may support multiple PMs/FMs simultaneously.

KC pages must not define PM→PM or FM→FM dependencies.

### 6. Key References

See **KC Evidence Layer Rules** below for citation philosophy, density, hierarchy, and resolution requirements.

Follow **`system/brs-citation-reference-standard.md`**: inline `[Author et al., Year]` where sections 1–2 or 4 make evidence-backed claims; References entries as `Author et al. (Year) — Short Descriptive Study Topic` linking to `/docs/papers/BRAIN-Diet-References#citationKey`.

---

## KC Evidence Layer Rules

### Evidence Philosophy

KC evidence supports:

- biological necessity
- substrate dependence
- precursor sufficiency
- structural integrity
- foundational enabling relationships

KC evidence does NOT primarily support:

- dynamic mechanistic regulation
- intervention efficacy
- therapeutic outcomes
- detailed pathway modulation

Those belong primarily to PMs and FMs.

### Evidence Scope

KC references should validate the existence and importance of the biological constraint itself.

Examples:

- amino acids are required for neurotransmitter precursor availability
- fermentable substrates support microbial metabolite production
- DHA contributes to membrane structure and signalling integrity
- methyl donor sufficiency supports one-carbon metabolism
- stable glucose availability supports neural energetic continuity

KC evidence should remain:

- foundational
- broad
- systems-oriented
- biologically proximal

### Citation Density Rules

Do NOT attempt to individually cite every pool member listed under **Shared Biological Pool**.

The inputs section represents:

- biologically plausible substrate-level contributors
- representative examples
- enabling supports for the constraint

NOT:

- individually litigated intervention claims

Avoid citation explosion.

### Evidence Hierarchy

Use evidence at the correct architecture layer:

| Layer | Evidence Type |
|---|---|
| KC | biological necessity / sufficiency / substrate dependence |
| PM | mechanistic regulation / intervention modulation |
| FM | integrated functional-state evidence |
| Food/Substance Pages | detailed food or compound evidence |

KC pages should cite foundational biology, substrate relationships, structural sufficiency, and prerequisite system requirements — not detailed intervention studies, acute modulation studies, or food-specific mechanistic claims.

### Shared Biological Pool Evidence Rules

Shared Biological Pool items should be:

- biologically plausible
- substrate-specific
- structurally relevant
- semantically aligned with the KC

The compact bullet does not require an inline citation, intervention claim, or
therapeutic proof. It **does** require proposition-specific Evidence Source in its
KC-owned atom. General references may support the KC definition, but collective
page-level references do not by themselves establish each constituent's
membership.

### Avoid Overmechanising KCs

Do not turn KC pages into PM-level mechanistic essays, intervention reviews, nutrient marketing pages, or detailed pathway maps.

Avoid:

- excessive cofactor detail
- speculative claims
- therapeutic overreach
- detailed signalling cascades

KC pages should remain concise, foundational, and enabling-condition focused.

### Reference Resolution Rules

All references used on KC pages must resolve through `static/bibtex/BRAIN-diet.bib`.

Any newly introduced reference must include:

- valid citation key
- bibliographic metadata
- DOI or source URL where available

Do not leave unresolved plain-text citations on KC pages.

If missing, flag: `Missing bibliography entry`

### Preferred KC Evidence Types

Strong KC evidence includes:

- foundational physiology papers
- substrate dependence studies
- structural biology references
- nutritional sufficiency literature
- broad systems-biology reviews
- mechanistic prerequisite relationships

Less suitable KC evidence:

- acute supplementation trials
- highly specific intervention papers
- isolated food-effect studies
- narrow therapeutic outcome claims

These are usually better suited to PMs, FMs, or food/substance pages.

---

## Style Rules

KC pages should be:

- shorter
- cleaner
- more restrained

than PM pages.

Avoid:

- heavy mechanistic prose
- PM-style mechanism explanations
- intervention protocols
- scoreable ontology logic
- extensive cofactor lists
- causal therapeutic claims

KCs represent enabling biological conditions, not dynamic regulation systems.

---

## Ontology Position

KCs represent:

- substrate sufficiency
- precursor availability
- structural integrity
- energetic continuity
- biological completeness/balance
- foundational system requirements

Examples:

- amino acid substrate sufficiency
- fermentable substrate availability
- methyl donor sufficiency
- membrane lipid integrity
- glucose / energy substrate availability
- essential amino acid completeness

KCs should remain:

- biologically foundational
- semantically stable
- lower resolution than PMs
- broadly reusable across mechanisms

---

## Required Top-Level Fields (Data Contract)

```yaml
id: string                           # e.g. "BRS6(KC1)"
name: string
brs: string
ambition: string                     # maps to section 1 Ambition
shared_biological_pool:              # section 2 Shared Biological Pool
  - string
biological_importance: string        # section 3
connected_mechanisms:                # section 4
  fms:
    - id: string
      name: string
      href: string
  pms:
    - id: string
      name: string
      href: string
key_references:                      # section 5
  - index: number
    label: string
    citation_key: string
    href: string                     # /docs/papers/BRAIN-Diet-References#citation_key
missing_entities:
  substances: [string]
  foods: [string]
```

## Section body prose

Sections must not restate the page title, entity ID, BRS name/number, or Definition. Each section follows only its schema role. See `system/mechanism-page-section-prose.md`.

## Section Order (Page Rendering Contract)

| # | Heading |
|---|---|
| — | `### {kc_id} - {name}` (page identifier line) |
| 1 | `### 1. Ambition` |
| 2 | `### 2. Core Nutritional Requirements` (legacy: `Shared Biological Pool`) |
| 3 | `### 3. Evidence Base` (legacy: `Biological Importance`) |
| 4 | `### 4. Emerging Biological Supports` |
| 5 | `### 5. Connected Mechanisms` |
| 6 | `### 6. Key References` |

## Validation Rules

- Must not include scoring formulas or SMs during initial rollout.
- Apply the **KC inclusion test** before adding any new KC; reject PM dietary levers repackaged as shared pools.
- Retired KCs are listed in `scripts/lib/kc-registry.mjs` and must not appear on hub pages, PM §4.1.3, or public KC routes.
- `connected_mechanisms.fms` and `connected_mechanisms.pms` must link to existing FM/PM pages when links are used.
- If a required substance or food entity is unresolved, flag: `Missing system entity: [name]`
- Every `references[].citation_key` must resolve to `static/bibtex/BRAIN-diet.bib` before publish.
- If missing, flag: `Missing bibliography entry`
- Do not require inline citations on compact section 2 bullets; require each bullet to project a KC-owned atom with proposition-specific evidence after canonical review.
- Section 2 must retain its canonical heading and place its complete body inside
  the standard collapsed PM-style disclosure defined above.
- Canonically reviewed §3 Evidence Base content must open with one concise,
  evidence-supported Summary paragraph followed by exactly three distinct
  boundary bullets; Summary citations must be claim-local and resolvable.
- KC references must align with KC Evidence Layer Rules (necessity/sufficiency), not PM/FM intervention evidence types.

## Deprecated (Do Not Use on New KC Pages)

- page-level `biological_role` (use `ambition` + `biological_importance`; this does not deprecate the required per-atom `biological_role`)
- `Supporting Substances/Interventions` as a separate intervention-citation section
- `Dietary Substrates/Precursors` as a standalone section heading
- `Supporting Inputs/Substrates` (use `Shared Biological Pool`)
- `Supporting Inputs / Substances / Signals` (use `Shared Biological Pool`)
- substance lists without food examples on KC Shared Biological Pool (use `Resource ← food examples` format)
- `Supports` / `Related FMs` legacy heading without "Connected Mechanisms"
- `requirement_type` as a rendered page section (may remain ingest metadata only)
- `summary` as section 1 body field for KC pages (use `ambition`)
- `constraint_role` section or front matter field on new KC pages

---

## KC audit notes (2026-03)

**Retired:**

- `BRS3(KC3) — Essential Fatty Acid Balance` — duplicated EPA/DHA and omega-3/omega-6 guidance already owned by BRS1-FM3-PM7, BRS3-FM2-PM5, BRS3-FM3-PM7/PM8, and BRS Dietary Guidance. Retained as PM Dietary Levers and Cross-BRS dependencies only.
- `BRS5(KC3) — Barrier-Supportive Nutrient Sufficiency` — grouped omega-3, vitamin A, zinc, and glutamine by a shared outcome label rather than one identifiable limiting substrate, precursor, cofactor, or structural pool. Its former constituents must be adjudicated independently against the relevant PM; supported PM1 relationships remain PM-specific atoms, while modulation or broader dietary guidance must not be promoted back into a replacement KC.

**Retain (passes shared-pool test):**

| KC | Rationale |
|---|---|
| BRS1(KC1) | LNAA / amino-acid competitive pool constrains multiple distinct BRS1 PMs (transport, monoaminergic, GABA/glutamate) |
| BRS2(KC1), BRS2(KC2) | Methyl-donor and transsulfuration substrate pools shared across remethylation, SAMe, glutathione, and membrane PMs |
| BRS3(KC1) | Cysteine and glycine availability for glutathione synthesis (glycine conditional). Glutamate/polyphenols/vitamin C excluded from membership. Dual-arm grouping rejected; FM1/PM1–PM2 scope flagged. See `system/brs3-kc1-evidence-review.md` |
| BRS4(KC1), BRS4(KC2) | Macronutrient fuel and mitochondrial cofactor pools shared across ETC, NAD⁺, biogenesis, and substrate-switching PMs |
| BRS5(KC1), BRS5(KC2) | Fermentable-fibre and polyphenol/plant-diversity inputs shared across barrier, SCFA, keystone-taxa, and gut–brain PMs |
| BRS6(KC1), BRS6(KC2) | Glucose substrate and stress-response micronutrient pools shared across glycaemic, HPA, and metabolic PMs |

**Review if expanded (borderline):**

| KC | Concern |
|---|---|
| BRS-X(ECS-KC1) | Phospholipid/NAPE pool currently spans ECS FM1 PMs only — valid only while multiple distinct ECS PMs genuinely share the pool; do not use for generic omega-3 or phospholipid PM levers |
