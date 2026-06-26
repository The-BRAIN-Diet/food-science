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

SM pages reuse this schema’s **Profile A extended** rendering contract (section order, collapsibles, scoreable table, timing front matter). See `system/specific-mechanism-schema.md`. SMs are interpretation layers (`SM-SNP`, `SM-PHEN`, `SM-CROSS`) — not additional PM ontology.

## Scope

- Represents a specific intervention-influenceable biological mechanism.
- Contributes to exactly one FM.
- Must remain mechanistic (not FM/system interpretation).

## Required Top-Level Fields

```yaml
id: string                           # e.g. "BRS2-FM1-PM3"
name: string
brs: string
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

`timing_specific` is **required in front matter** on all PM pages (`Yes` | `No`). It must **not** appear as a standalone numbered body section (`## N. Timing Specific` with only `Yes` or `No`). Where timing materially alters interpretation, discuss it within **§4.2 Lifestyle Levers**, **Primary Biological Effects**, **Mechanistic Basis**, or **Scoreable Inputs & Modulation Signals**.

`intervention_breakdown` in front matter remains spreadsheet ingest metadata and is **not** rendered as a public body section. `intervention_dominance` is rendered in **§4 Levers** as **Intervention Profile** (see **PM §4 — Levers**).

## Section body prose

Sections must not restate the page title, entity ID, BRS name/number, or Definition. Each section follows only its schema role. See `system/mechanism-page-section-prose.md`.

## Section Order (Page Rendering Contract)

First line of the MDX body (after front matter) must be the mechanism title: `## <PM_ID> - <PM name>` (same heading level as numbered sections; do not use `#` or `###` for this line).

Three **profiles** are allowed; pick one per PM and keep numbering contiguous (no gaps in `## N.` sequence).

### Profile A — Extended narrative PM (e.g. BRS1 PMs, BRS6 PM1–PM4)

1. Definition — `## 1. Definition` — **translational opening paragraph + 3 bullets** (inline parenthetical glosses for specialist terms). See `system/mechanism-page-section-prose.md` (**§1 Definition — translational UX**). Front matter `summary` aligns with the opening paragraph. Enzymology and pathway detail belong in §5 Mechanistic Basis, not §1.
2. Primary Biological Effects — `## 2. Primary Biological Effects` (directional arrow summary)
3. Phenome Connections — `## 3. Phenome Connections` — translational mappings from `phenome_relationships`; canonical disclaimer required; empty state when unmapped
4. Levers — `## 4. Levers` — **sole public section for dietary and lifestyle implementation** (see **PM §4 — Levers** below)
   - **4.1 Dietary Levers** — outer `<details>` dropdown
     - **4.1.1 Direct Dietary Levers** — nested `<details>`; substance ← food bullets per `system/substance-food-mapping-format.md`
     - **4.1.2 Cofactors and Supporting Inputs** — nested `<details>`; from front matter `cofactors`
     - **4.1.3 KCs (Key Constraints)** — nested `<details>`; linked KC pages **plus** each KC’s **Shared Biological Pool** members (sourced from the KC page §3; substance-only when the KC uses Supporting Inputs/Substrates with `←` food mapping)
   - **4.2 Lifestyle Levers** — `<details>` dropdown; primary place for timing narrative when `timing_specific: "Yes"`
5. Mechanistic Basis — `## 5. Mechanistic Basis`
   - **Canonical structure (Profile A):** see **PM §5 — Canonical four-part narrative** below. **Reference page:** [BRS1-FM1-PM1](/docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation).
   - **`### Summary` (required):** why this mechanism matters — the integrative implication in plain language, not a restated Definition or repeated mechanism name.
   - **Body (required):** three or more `#### (…)` blocks after Summary, in order: **primary mechanism** (one or more thematic blocks) → **boundaries** → **integration** (KCs, parent FM, cross-links). Explain how the mechanism works; do not re-define the entity.
   - **`<details>` (recommended on Profile A reference pages):** keep **`### Summary` visible**; wrap all post-Summary mechanism content (every `####` block: primary mechanism, boundaries, integration) in one `<details><summary>…</summary>…</details>` inside `## 5.` Do **not** put Summary or §5.1 inside this dropdown.
   - **Citations (required where evidence-backed):** keep inline citations in §5 when rewriting or shortening prose — see **PM §5 — Citations** below. Do not drop references to make the narrative “cleaner.”
   - **Excluded from §5 mechanism dropdown:** dietary levers, substance ← food bullets, lifestyle levers, scoreable inputs (§4, §7). Evidence Highlights use `### 5.1` at the end of `## 5.` (not inside the mechanism `<details>`).
5.1. Evidence Highlights — `### 5.1 Evidence Highlights` (optional, recommended on authored PMs) — **subsection of §5** after the mechanism `<details>`, still before `## 6.` See **PM §5.1 — Evidence Highlights** below.
6. BRS Pathways and Connections — `## 6. BRS Pathways and Connections` — unified heading on all Profile A PMs (host-BRS placement and cross-BRS links)
   - `### 6.1` BRS Pathways — ordered multi-step pathway chains across PMs (and optionally FMs) when materially relevant; use linked PM labels with `↓` between steps on separate lines. Example (BRS2-FM1-PM1): homocysteine remethylation → phospholipid methylation → neuronal membrane DHA incorporation.
   - `### 6.2` Connected BRS Mechanisms — PM/FM links in other BRS domains (former standalone `## 7. Connected Mechanisms`; harmonised with FM §6 heading)
   - `### 6.3` Connected Primary Mechanisms — parent FM (`parent_fm` in front matter) plus sibling PMs on the same host FM (`mechanisms_covered` on parent FM, excluding this PM)
7. Scoreable Inputs & Modulation Signals — `## 7.` **only when this PM is scoreable in the ontology**; optional intro paragraph; table (or list) may sit inside `<details><summary><strong>Scoreable Input Categories</strong></summary>…` Use three rows only: **Functional Property Potentials**, **Realised Functional States**, **Preparation Transformations** (do not repeat §4.1.1 substances in a Substance / Nutrient Signals row).
8. References — `## 8. References`

### PM §4 — Levers

**Heading:** `## 4. Levers`

**Intervention Profile (required, visible):** place `### Intervention Profile` with `**Intervention Dominance:**` from front matter `intervention_dominance` **above** the **4.1** and **4.2** `<details>` dropdowns. Do not use `<details>` for Intervention Profile.

**Rendering contract:** both **4.1 Dietary Levers** and **4.2 Lifestyle Levers** are top-level `<details>` dropdowns under `## 4. Levers`. Inside **4.1 Dietary Levers**, use three nested `<details>` blocks for **4.1.1**, **4.1.2**, and **4.1.3**. Omit any dropdown when that tier has no content (do not use `- None listed` inside empty dropdowns).

**Do not** place cofactors, KCs, substance ← food levers, or lifestyle bullets under **§6 BRS Pathways and Connections** or inside **§5 Mechanistic Basis**.

```markdown
## 4. Levers

### Intervention Profile

**Intervention Dominance:** <from front matter intervention_dominance>

<details>
<summary><strong>4.1 Dietary Levers</strong></summary>

<details>
<summary><strong>4.1.1 Direct Dietary Levers</strong></summary>

- Substance ← food bullets per system/substance-food-mapping-format.md

</details>

<details>
<summary><strong>4.1.2 Cofactors and Supporting Inputs</strong></summary>

- From front matter cofactors

</details>

<details>
<summary><strong>4.1.3 KCs (Key Constraints)</strong></summary>

- [BRS3(KC1) - Antioxidant Substrate Availability](/docs/biological-targets/brs3/kc/brs3-kc1-antioxidant-substrate-availability)

**Shared Biological Pool**

- Polyphenols
- Vitamin C
- Antioxidant phytochemicals
- Cysteine
- Glycine
- Glutamate
- Sulfur amino acids

</details>

</details>

<details>
<summary><strong>4.2 Lifestyle Levers</strong></summary>

- Lifestyle implementation bullets; timing narrative when timing_specific: Yes

</details>
```

### PM §6 — BRS Pathways and Connections

| Subsection | Role | Content |
|------------|------|---------|
| **6.1 BRS Pathways** | Ordered multi-step chains | Linked PM labels with `↓` on separate lines between steps when a pathway spans PMs (often cross-FM or cross-BRS). Use `- None listed` when no pathway is authored yet. |
| **6.2 Connected BRS Mechanisms** | Cross-BRS links | PM/FM links in other BRS domains (content formerly in standalone `## 7. Connected Mechanisms`). Harmonised with FM `## 6. Connected Mechanisms`. |
| **6.3 Connected Primary Mechanisms** | Same-host-FM placement | Parent FM link (`parent_fm`) plus sibling PMs on the same FM (exclude current PM). **No cofactors, KCs, or dietary levers here.** |

**§4 vs §6:** §4 is implementation only (dietary, cofactors, KCs, lifestyle). §6 is connectivity only (pathways, cross-BRS links, same-FM PM rollups).

**Example pathway (BRS2-FM1-PM1):**

```
[BRS2-FM1-PM1 — Folate/B12-Dependent Homocysteine Remethylation](/docs/biological-targets/brs2/fm1/brs2-fm1-pm1-folate-b12-dependent-homocysteine-remethylation)
↓
[BRS2-FM3-PM7 — Phosphatidylcholine Formation](/docs/biological-targets/brs2/fm3/brs2-fm3-pm7-phosphatidylcholine-formation)
↓
[BRS1-FM3-PM6 — Neuronal Membrane DHA Incorporation](/docs/biological-targets/brs1/fm3/brs1-fm3-pm6-neuronal-membrane-dha-incorporation)
```

### Profile B — Compact PM (e.g. BRS6 PM2–PM8, BRS6 PM5)

1. Definition — `## 1. Definition` — **opening paragraph + exactly 3 bullets** (`system/mechanism-page-section-prose.md` **§1 Definition — UX structure**)
2. Mechanistic Basis — `## 2. Mechanistic Basis` (canonical four-part narrative)
2.1. Evidence Highlights — `### 2.1 Evidence Highlights` (optional — same rules as §5.1; subsection at end of `## 2.`)
3. Underlying Mechanisms and Requirements — `## 3. Underlying Mechanisms and Requirements` with `### 3.1` Cofactors and Supporting Inputs, `### 3.2` KCs, `### 3.3` Optional BRSX Modifiers, `### 3.4` Connected Mechanisms
4. Dietary Levers — `## 4.` (`<details>` / **Diet**)
5. Lifestyle Levers — `## 5.` (`<details>` / **Lifestyle**)
6. Functional Outputs (Directional Effects) — `## 6.` short arrow-line or paragraph (distinct from `## 2. Primary Biological Effects` on Profile A)
7. References — `## 7. References`

### PM §5 — Canonical four-part narrative

Teachable PM Mechanistic Basis follows this flow (all visible by default on the reference page):

| Step | Heading level | Role |
|------|---------------|------|
| 1 | `### Summary` | **Why it matters** — lead with the most important implication (e.g. neurotransmitter biology depends first on an adequate amino-acid pool). |
| 2 | `#### (…)` primary block(s) | **How it works** — meal-level biology, substrates, cofactor context where mechanistically necessary; citations inline. |
| 3 | `#### (Boundaries of the mechanism)` (or equivalent) | **What this PM does not cover** — downstream PMs, transport, conversion, other BRS domains; brief, after the mechanism is explained. |
| 4 | `#### (Integration within BRS…)` (or equivalent) | **Where it sits** — KCs, FM, connected mechanisms; one short placement paragraph. |

**Anti-patterns:** opening with the mechanism name or entity ID; leading with scope boundaries; review-paper tone; closing “together, these relationships…” synthesis paragraphs; `Dietary levers include…` or food-example lists in §5; stripping citations during editorial passes.

Authoring detail: `system/mechanism-page-section-prose.md` (**PM Mechanistic Basis — canonical structure**).

### PM §5 — Citations

Mechanistic Basis must remain **evidence-anchored**, not assertion-only. Follow **`system/brs-citation-reference-standard.md`**.

| Where | Citation expectation |
|-------|-------------------|
| **`### Summary`** | Usually implication-only; add `[Author et al., Year]` only when a single study directly supports the central claim. |
| **Primary mechanism `####` blocks** | **Required** for evidence-backed statements (pathway biology, meal effects, substrate relationships). Format: `[Author et al., Year]`. |
| **Boundaries** | Cite when the boundary claim depends on literature; PM cross-links alone need no duplicate citation if References already lists the source. |
| **Integration** | Typically placement prose + entity links; citations optional unless integration asserts an evidence-backed dependency. |

**References section:** each cited study appears as `Author et al. (Year) — Short Descriptive Study Topic` with link to `/docs/papers/BRAIN-Diet-References#citation_key`. Pull keys from `key_studies` / `references` front matter; verify each `citation_key` exists in `static/bibtex/BRAIN-diet.bib`.

**When rewriting §5:** preserve existing citations unless the claim is removed; add citations for new evidence-backed claims.

**Reference page:** [BRS1-FM1-PM1](/docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation).

### PM §5.1 — Evidence Highlights

**Purpose:** Curated, insight-driven findings that show **why the mechanism matters in practice** — not a second Mechanistic Basis and not a literature review.

**Placement:** `### 5.1 Evidence Highlights` as a **subsection of §5** (after the mechanism `<details>`, not inside it). Order within `## 5.`: `### Summary` → mechanism `<details>` → `### 5.1 Evidence Highlights` → then `## 6. BRS Pathways and Connections`. Profile B: `### 2.1 Evidence Highlights` at the end of `## 2. Mechanistic Basis`.

| § | Role (Profile A extended) |
|---|------|
| **§2 Primary Biological Effects** | Directional ↑/↓ summary of emergent outcomes. |
| **§3 Phenome Connections** | Translational phenome mappings — not single-mechanism outcome claims. |
| **§4 Levers** | Dietary (4.1.1–4.1.3) and lifestyle (4.2) implementation — all in `<details>` dropdowns. |
| **§5 Mechanistic Basis** | How the biology works (canonical four-part narrative). |
| **§5.1 Evidence Highlights** | What important studies found and why that changes or qualifies **mechanism** interpretation — not functional outcome / phenome claims. |
| **§6 BRS Pathways and Connections** | Pathway chains, cross-BRS links, same-FM PM rollups — **not** levers, cofactors, or KCs. |

Profile B compact PMs keep cofactors under `## 3. Underlying Mechanisms and Requirements` → `### 3.1 Cofactors and Supporting Inputs`.

**Include studies that (high priority):** alter interpretation; reveal synergies or dependencies; show meaningful human or intervention relevance; expose heterogeneity or context-dependent responses.

**Exclude (low priority):** findings that only repeat §5 textbook biology; small redundant mechanistic papers; studies that merely mention the pathway without changing how to read the PM; **phenome/outcome science** (ADHD, attention, emotional dysregulation, condition-specific biomarkers, intervention outcomes in clinical populations) — those belong in **§3 Phenome Connections** only.

**Phenome boundary (non-negotiable):** §5.1 and FM §4.4 must **not** duplicate §3. Do not populate evidence highlights from BRS hub ADHD dropdown tables; those rows feed phenome review (`system/phenome-relationship-review-methodology.md`), not mechanism evidence maps (`scripts/lib/pm-evidence-highlights.mjs`).

**UX:** `#### Introduction/Summary` (visible) → one or more **phenome-aligned evidence `<details>` dropdowns** per curated finding (same field set as §3 Phenome Connections). Reference: [BRS-X(ECS-PM2)](/docs/biological-targets/brs-x/ecs/fm1/brs-x-ecs-pm2-omega-3-derived-endocannabinoidome-signalling), [BRS1-FM1-PM1](/docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation).

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

**Mechanistic Basis validation:** if the Mechanistic Basis section (typically `## 5.` on extended Profile A PMs, `## 2.`–`## 3.` on compact PMs) is missing or placeholder, validation fails unless the page has `mechanistic_authoring_required: true` in front matter.

## Validation Rules

- `timing_specific` is required in front matter (`Yes` | `No`); visible `## N. Timing Specific` body sections are forbidden.
- Mechanistic Basis must be present and non-placeholder unless `mechanistic_authoring_required: true` is set in front matter.
- Extended Profile A PMs must include `## 2. Primary Biological Effects` immediately after Definition.
- Extended Profile A PMs must include `## 4. Levers` with visible `### Intervention Profile` and `**Intervention Dominance:**` above the dropdowns; **4.1 Dietary Levers** and **4.2 Lifestyle Levers** as `<details>` dropdowns; **4.1** must contain nested dropdowns for **4.1.1 Direct Dietary Levers**, **4.1.2 Cofactors and Supporting Inputs**, and **4.1.3 KCs (Key Constraints)** when those tiers have content. **4.1.3** must list each linked KC with its **Shared Biological Pool** members below the KC link (see PM §4 example).
- `intervention_breakdown` in front matter, when present, must be one of the five allowed spreadsheet values and must not be rendered as a public body section.
- `overview` must be <=120 words.
- `functional_mechanism_ownership` must contain exactly one FM (never multiple).
- `dependencies` must not include PM-to-PM dependencies.
- `dependencies.kcs[].type` must be only `substrate` or `precursor`.
- `cofactors` must not include KCs, PMs, foods, or unrelated substances.
- Inputs must be mechanistically justified; no generic food advice entries.
- Foods/substances must exist in system; unresolved entities may be recorded in optional `missing_entities` authoring metadata but must not be rendered as a PM page section.
- No scoring formulas or numeric scoring logic allowed.
- No Secondary Mechanisms (SMs) introduced during initial rollout.
- References must resolve to existing citation keys in `static/bibtex/BRAIN-diet.bib` per **`system/brs-citation-reference-standard.md`**.
- Every inline `[Author et al., Year]` in **Mechanistic Basis** must have a matching **References** entry with descriptive topic and `citation_key` (orphan in-text refs fail authoring review).
- PM pages with `key_studies` or non-empty `references` front matter should cite at least one source in §5 primary mechanism blocks when those studies support the mechanism narrative (waived only when `mechanistic_authoring_required: true`).

## Field Integrity Mapping

- Dependencies -> `dependencies` (KCs + connected mechanisms only)
- Cofactors -> `cofactors` (cofactors only)
- Intervention dominance -> `intervention_dominance.mode`
- Column P -> `functional_mechanism_ownership`

An entity must not appear in more than one of these roles with conflicting meaning.

