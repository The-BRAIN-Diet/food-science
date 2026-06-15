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

1. Definition
2. Constraint Role
3. Shared Biological Pool
4. Biological Importance
5. Connected Mechanisms (#### Functional Mechanisms, #### Primary Mechanisms)
6. References

Page title line format (above section 1):

`### {kc_id} - {name}`

---

## Section Rules

### 1. Definition

Concise definition of the foundational sufficiency state, substrate availability, structural requirement, or enabling biological condition.

Avoid:

- PM-style regulation language
- intervention descriptions
- detailed mechanism prose

Good examples:

- amino acid substrate sufficiency
- fermentable substrate availability
- membrane lipid integrity
- glucose / energy substrate continuity

### 2. Constraint Role

Describe:

- what the KC enables
- what depends upon it
- what biological sufficiency it maintains

Use language such as:

- enables
- supports
- provides substrate availability for
- maintains sufficiency for
- constrains effective operation of

Avoid PM-style wording:

- governs
- regulates
- modulates
- drives
- controls

KCs do not regulate biology directly; they enable or constrain mechanisms.

### 3. Shared Biological Pool

List the key substrates, precursors, or structural components that constitute the shared biological pool.

Purpose:

- identify the biologically proximal pool members shared across multiple PMs
- anchor the KC in real biological resources without turning the KC into a PM

Pool items should generally be:

- substrates
- precursors
- structural molecules
- essential fatty acids
- amino-acid classes
- macronutrient fuels

Good examples:

- tryptophan
- EPA
- DHA
- methyl donors
- sulfur amino acids
- glutathione precursor amino acids
- polyphenols (as a class)

Avoid:

- cofactors (selenium, zinc, copper, manganese — belong on PM §7.2)
- food ← substance mapping bullets (belong on PM §7.1 Direct Dietary Levers)
- vague healthy-food lists
- recipes
- whole diets
- PM-style intervention protocols
- generic wellness language

Render as plain bullet points only (no table, no food examples).

This section should answer:

> What shared biological pool do multiple PMs draw upon?

Do not list downstream microbial metabolites (e.g. SCFAs) as if they are intrinsic food substances.

Do not attempt to individually cite every listed pool member (avoid citation explosion).

### 4. Biological Importance

Short explanation of:

- why the constraint matters biologically
- what systems depend on it
- what instability or insufficiency may affect

Keep concise and foundational.

Avoid:

- detailed pathway explanations
- heavy mechanism prose
- intervention discussion

### 5. Connected Mechanisms

List connected PMs and FMs that depend on this KC.

Render with subheadings:

- `#### Functional Mechanisms`
- `#### Primary Mechanisms`

Use linked entries where possible.

KCs may support multiple PMs/FMs simultaneously.

KC pages must not define PM→PM or FM→FM dependencies.

### 6. References

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
summary: string                      # maps to section 1 Definition
constraint_role: string              # section 2
supporting_inputs:                   # section 3 Shared Biological Pool
  - string
biological_importance: string        # section 4
connected_mechanisms:                # section 5
  fms:
    - id: string
      name: string
      href: string
  pms:
    - id: string
      name: string
      href: string
references:                          # section 6
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
| 1 | `### 1. Definition` |
| 2 | `### 2. Constraint Role` |
| 3 | `### 3. Shared Biological Pool` |
| 4 | `### 4. Biological Importance` |
| 5 | `### 5. Connected Mechanisms` |
| 6 | `### 6. References` |

## Validation Rules

- Must not include scoring formulas or SMs during initial rollout.
- `connected_mechanisms.fms` and `connected_mechanisms.pms` must link to existing FM/PM pages when links are used.
- If a required substance or food entity is unresolved, flag: `Missing system entity: [name]`
- Every `references[].citation_key` must resolve to `static/bibtex/BRAIN-diet.bib` before publish.
- If missing, flag: `Missing bibliography entry`
- Do not attach per-bullet citations in section 3 (Shared Biological Pool); flag citation explosion if present.
- KC references must align with KC Evidence Layer Rules (necessity/sufficiency), not PM/FM intervention evidence types.

## Deprecated (Do Not Use on New KC Pages)

- `biological_role` (use `constraint_role` + `biological_importance`)
- `Supporting Substances/Interventions` as a separate intervention-citation section
- `Dietary Substrates/Precursors` as a standalone section heading
- `Supporting Inputs/Substrates` (use `Shared Biological Pool`)
- `Supporting Inputs / Substances / Signals` (use `Shared Biological Pool`)
- substance ← food bullets on KC pages (use PM §7.1 Direct Dietary Levers)
- `Supports` / `Related FMs` legacy heading without "Connected Mechanisms"
- `requirement_type` as a rendered page section (may remain ingest metadata only)
