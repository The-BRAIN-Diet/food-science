# Key Constraint (KC) Schema

Citation and reference format: **`system/brs-citation-reference-standard.md`**.

## Build Gate Proviso

- Never render or expose spreadsheet letter identifiers in generated content or public-facing pages.
- Always use semantic entity names (for example, `Intervention Dominance`, `Coverage Timing`, `Evidence Type`).
- Treat any letter-identifier wording in generated outputs as a validation failure that must be fixed before build.

This schema defines the canonical data contract and authoring contract for Key Constraint pages.

---

## KC Definition

A Key Constraint (KC) is a shared substrate, precursor, or structural biological pool whose availability constrains the effective operation of multiple Primary Mechanisms (PMs) within a Biological Regulation System (BRS).

KCs describe:

- shared substrate pools
- shared precursor pools
- shared structural biological pools
- resources drawn upon by multiple PMs

Examples: amino acids, methyl donors, macronutrient fuels, antioxidant precursors, essential fatty acids, structural membrane lipids.

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

1. Ambition — concise statement of the desired biological shared-resource state.
2. Shared Biological Pool
3. Biological Importance
4. Connected Mechanisms (#### Functional Mechanisms, #### Primary Mechanisms)
5. Key References

Page title line format (above section 1):

`### {kc_id} - {name}`

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

### 2. Shared Biological Pool

List shared biological resources (substrates, precursors, structural components) using PM-style substance-to-food mapping bullets.

Purpose:

- identify the biologically proximal pool members shared across multiple PMs
- anchor the KC in real biological resources without turning the KC into a PM

Pool items should generally be:

- substrates
- precursors
- structural molecules
- essential fatty acids
- macronutrient fuels

Format:

- one resource per bullet
- use `Resource ← food, food, food`
- 2–3 representative foods per resource where possible
- do not add extra explanatory prose in this section

Avoid:

- cofactors (selenium, zinc, copper, manganese — belong on PM §7.2)
- category + member duplication in the same list (for example: `Sulfur amino acids` with `methionine` and `cysteine`)
- mixed abstraction levels (category terms, individual molecules, and functional pathway labels in one pool)
- pathway descriptors as list items (`methyl-group donor pools supporting one-carbon transfer`)
- vague healthy-food lists, recipes, whole diets, or PM-style intervention protocols

Render as plain bullet points only (no table, no subheadings).

This section should answer:

> What explicit shared biological resources do multiple PMs draw upon, and what representative foods supply them?

Do not list downstream microbial metabolites (e.g. SCFAs) as if they are intrinsic food substances.

Do not attempt to individually cite every listed pool member (avoid citation explosion).

### 3. Biological Importance

Educational explanation of:

- why this pool exists biologically
- why multiple mechanisms share this same pool
- why insufficiency can constrain several PMs at once
- why maintaining this pool supports broader biological regulation
- where relevant, cross-BRS implications

Keep concise and foundational, but richer than a one-line restatement of Ambition.

Avoid:

- detailed pathway explanations
- heavy mechanism prose
- intervention discussion

### 4. Connected Mechanisms

List connected PMs and FMs that depend on this KC.

Render with subheadings:

- `#### Functional Mechanisms`
- `#### Primary Mechanisms`

Use linked entries where possible.

KCs may support multiple PMs/FMs simultaneously.

KC pages must not define PM→PM or FM→FM dependencies.

### 5. Key References

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
| 2 | `### 2. Shared Biological Pool` |
| 3 | `### 3. Biological Importance` |
| 4 | `### 4. Connected Mechanisms` |
| 5 | `### 5. Key References` |

## Validation Rules

- Must not include scoring formulas or SMs during initial rollout.
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
