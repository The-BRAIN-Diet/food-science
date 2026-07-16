# Key Constraint (KC) Schema

Citation and reference format: **`system/brs-citation-reference-standard.md`**.

## Build Gate Proviso

- Never render or expose spreadsheet letter identifiers in generated content or public-facing pages.
- Always use semantic entity names (for example, `Intervention Dominance`, `Coverage Timing`, `Evidence Type`).
- Treat any letter-identifier wording in generated outputs as a validation failure that must be fixed before build.

This schema defines the canonical data contract and authoring contract for Key Constraint pages.

---

## KC Definition

A Key Constraint (KC) is a **shared substrate, precursor, or structural biological pool** whose availability can **constrain multiple biologically distinct Primary Mechanisms (PMs) simultaneously** within a Biological Regulation System (BRS).

KCs describe:

- shared substrate pools
- shared precursor pools
- shared structural biological pools
- resources drawn upon by multiple PMs across distinct mechanisms

### KC inclusion test (required)

Before creating or retaining a KC, apply:

> Does this resource function as a **shared limiting pool across several biologically distinct mechanisms**, or is it primarily a **direct dietary input to a specific mechanism**?

If it is primarily a direct input to a specific PM, FM, or narrow PM group, **do not** represent it as a KC. Retain it within:

- PM **§4.1 Direct Dietary Levers** and **§4.1.2 Cofactors**
- **BRS Dietary Guidance** on hub pages
- relevant **FM** summaries and **Cross-BRS Dependencies**

Importance alone does not justify KC status. Do not rename a PM dietary lever as a “pool.”

### Architectural boundary

| Layer | Role |
|---|---|
| **KC** | Shared substrate, precursor or cofactor dependency spanning multiple distinct mechanisms **within one BRS** |
| **PM Dietary Lever** | Nutrient, compound, food or dietary strategy that directly influences a particular mechanism |
| **BRS Dietary Guidance** | Broader practical dietary synthesis across the system |
| **Cross-BRS Dependency** | How one regulatory system supports or constrains another |

Do not blur these layers.

### Cross-BRS rule (required)

**Do not promote cross-BRS Key Constraints into another Biological Regulatory System hub.**

- A KC belongs exclusively to the BRS that owns the shared biological resource.
- Hub **Key Constraints (Dietary Bottlenecks)** lists **native KCs only** for that BRS.
- If BRS1 depends on BRS2 or BRS3 biology, represent that only in **Cross-BRS Dependencies** — not by importing BRS2(KC1) or retired BRS3(KC3) into the BRS1 KC block.
- PM §4.1.3 may still link cross-BRS KCs where a PM genuinely draws on an external pool; that does **not** roll up to foreign hub KC sections.

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
| PM Cofactors (§7.2) | What vitamins, minerals, or supporting compounds are required by this specific mechanism? |

This distinction avoids duplication between KC pages and PM cofactor sections.

KCs answer:

> What shared biological resource pool do multiple PMs depend upon?

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
3. Evidence Base — why §2 resources qualify as genuine shared biological requirements.
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

Inclusion threshold (all must apply):

- established dietary requirement, indispensable substrate, or required cofactor
- inadequate availability can materially constrain connected biology
- shared across multiple relevant mechanisms — not a direct lever for only one PM

Format:

- one resource per bullet
- use `Resource ← food, food, food`
- 2–4 representative foods per resource where possible
- do not add extra explanatory prose in this section

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

Use a short visible **Summary** (synthesis and practical advice grounded in §2) plus hub-collapsible dropdowns per main resource group. Each dropdown opens with `#### Biological Importance` explaining that resource’s contribution to the KC, followed by `Supporting Evidence` using linked bibliography entries in hub integration format (`<a href="/docs/papers/BRAIN-Diet-References#citation_key">Author et al., Year</a> — …`). Related resources (e.g. tryptophan and tyrosine) may share one dropdown with multiple evidence items. Do not create large audit tables.

**Legacy heading:** `### 3. Biological Importance` (retire on migration)

### 4. Emerging Biological Supports

Compounds with credible evidence that they **may** support the KC’s regulatory capacity under specific conditions — **not** core nutritional requirements.

For each candidate (when listed), use a hub-collapsible dropdown (same pattern as §3 Evidence Base resource groups). Inside each dropdown:

- `#### Candidate Name` (parse anchor for hub roll-up)
- **Why it is interesting** — regulatory capacity supported, with inline `[Author et al., Year]` where evidence-backed
- **Why it remains emerging** — evidence boundary (preclinical, condition-specific, inconsistent supplementation, etc.), with inline citations where evidence-backed
- **Supporting Evidence** — linked bibliography entries in hub integration format (`<a href="/docs/papers/BRAIN-Diet-References#citation_key">Author et al., Year</a> — …`)

§6 Key References for Emerging Biological Supports must list only standard bibliography links (`[Author et al. (Year) — Topic](/docs/papers/BRAIN-Diet-References#citation_key)`), not unlinked substance labels.

When no candidate meets the threshold, state explicitly that no Emerging Biological Supports are currently prioritised. Do not populate from trend lists.

**Hub roll-up:** Each Emerging Biological Support candidate (`####` heading under this section) is auto-populated into the parent BRS hub’s **System Optimisation Practices → Conditional Supplementation** panel (`scripts/lib/kc-emerging-supports.mjs`). Keep candidates source-led and condition-specific; empty KC §4 sections leave Conditional Supplementation as **Coming soon** unless a curated override exists.

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

The presence of an input in this section does NOT require:

- a dedicated citation beside the bullet
- an intervention-level evidence claim
- direct therapeutic proof

The KC references collectively support the biological rationale for the listed substrate/support class.

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
- Do not attach per-bullet citations in section 2 (Shared Biological Pool); flag citation explosion if present.
- KC references must align with KC Evidence Layer Rules (necessity/sufficiency), not PM/FM intervention evidence types.

## Deprecated (Do Not Use on New KC Pages)

- `biological_role` (use `ambition` + `biological_importance`)
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

**Retired:** `BRS3(KC3) — Essential Fatty Acid Balance` — duplicated EPA/DHA and omega-3/omega-6 guidance already owned by BRS1-FM3-PM6, BRS3-FM2-PM5, BRS3-FM3-PM7/PM8, and BRS Dietary Guidance. Retained as PM Dietary Levers and Cross-BRS dependencies only.

**Retain (passes shared-pool test):**

| KC | Rationale |
|---|---|
| BRS1(KC1) | LNAA / amino-acid competitive pool constrains multiple distinct BRS1 PMs (transport, monoaminergic, GABA/glutamate) |
| BRS2(KC1), BRS2(KC2) | Methyl-donor and transsulfuration substrate pools shared across remethylation, SAMe, glutathione, and membrane PMs |
| BRS3(KC1) | Antioxidant precursor pool shared across NF-κB, NRF2, ROS balance, lipid peroxidation, and network recycling PMs |
| BRS4(KC1), BRS4(KC2) | Macronutrient fuel and mitochondrial cofactor pools shared across ETC, NAD⁺, biogenesis, and substrate-switching PMs |
| BRS5(KC1), BRS5(KC2) | Fermentable-fibre and polyphenol/plant-diversity inputs shared across barrier, SCFA, keystone-taxa, and gut–brain PMs |
| BRS5(KC3) | Barrier-supportive nutrient pool (zinc, vitamin A, glutamine context) shared across multiple BRS5(FM1) PMs — distinct from single-nutrient PM levers |
| BRS6(KC1), BRS6(KC2) | Glucose substrate and stress-response micronutrient pools shared across glycaemic, HPA, and metabolic PMs |

**Review if expanded (borderline):**

| KC | Concern |
|---|---|
| BRS-X(ECS-KC1) | Phospholipid/NAPE pool currently spans ECS FM1 PMs only — valid only while multiple distinct ECS PMs genuinely share the pool; do not use for generic omega-3 or phospholipid PM levers |
