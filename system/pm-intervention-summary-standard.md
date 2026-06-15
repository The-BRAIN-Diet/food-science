# PM Section 3 — Intervention Summary Standard

Citation and reference format: **`system/brs-citation-reference-standard.md`**.

Applies to **Primary Mechanism (PM)** pages using Profile A (extended narrative). Replaces the legacy single-line **Intervention Breakdown** body section.

---

## Purpose

The Intervention Summary translates the biological mechanism into practical implementation guidance. It identifies the most relevant dietary and lifestyle interventions that support the mechanism while maintaining traceability to the supporting scientific evidence.

The purpose of this section is to answer:

- What should be prioritised?
- How strongly is the mechanism influenced by diet versus lifestyle?
- What evidence supports the intervention?

This section should not repeat the Definition, Functional Role, Mechanistic Basis, Connected Primary Mechanisms, or Cross-BRS Links sections.

---

## Section placement

- **Heading:** `## 3. Intervention Summary`
- **Profile A order:** Definition → Target Functional Outcome / Phenome → **Intervention Summary** → Functional Role → Mechanistic Basis → …
- Legacy `intervention_breakdown` (Food-State Dominant, etc.) remains **front matter only** for spreadsheet ingest; it is **not** rendered as the §3 body.

---

## Rendering layout (required UX)

**Always visible (in order):**

1. `### Intervention Profile` — **Intervention Dominance** only
2. `### Foundational Levers`

**Collapsible (`<details>`) — include only when the tier has levers:**

3. Supporting Levers — omit the entire `<details>` block when there are no supporting levers
4. Complementary Levers — omit the entire `<details>` block when there are no complementary levers

**Do not** render `- None listed` inside a `<details>` block. When a tier is empty, remove the dropdown entirely.

```markdown
## 3. Intervention Summary

### Intervention Profile

**Intervention Dominance:** Diet-Dominant

### Foundational Levers

- Protein sufficiency (Evidence:Human Mechanistic) [Mariotti et al., 2019]

<details>
<summary><strong>Supporting Levers</strong></summary>

- Physical activity (Evidence:Human Mechanistic) [Tardy et al., 2020]

</details>

<!-- Omit Supporting Levers and/or Complementary Levers <details> entirely when that tier has no levers -->
```

**Do not** render a separate Evidence Basis subsection. Evidence is qualified **on each lever bullet** using `(Evidence:<tier>)` — see **Evidence qualification** below.

**Do not** include a References subsection in §3. All bibliography links belong in the page **References** section at the bottom (`## 11. References` on Profile A), using `Author et al. (Year) — Short Descriptive Study Topic` per **`system/brs-citation-reference-standard.md`**.

---

## Input sources (§8 Dietary Levers and §9 Lifestyle Levers)

**Author §8 and §9 before finalising §3.** The Intervention Summary is the evidence-qualified prioritisation layer; §8 and §9 carry the practical implementation detail.

| §3 tier | Primary input source | Role |
|---------|---------------------|------|
| **Foundational Levers** | `## 8. Dietary Levers` — especially §8.1 Direct Dietary Levers and essential §8.2 cofactors | Diet-dominant essentials required for normal mechanism function |
| **Supporting Levers** | `## 9. Lifestyle Levers` | Non-essential lifestyle enhancers with evidence on each bullet |
| **Complementary Levers** | `## 9. Lifestyle Levers` or §8 | Optimisation-only inputs; omit `<details>` when none |

**Mapping rules**

- Every **§9 Lifestyle Levers** bullet must use `(Evidence:<tier>) [Author et al., Year]`.
- **Supporting** and **Complementary** tiers in §3 must reflect evidenced lifestyle levers from §9 (same phrasing, evidence tier, and citation).
- **Foundational** tiers in §3 distil the highest-priority evidenced inputs from §8.
- §8 keeps substance ← food examples; §9 keeps lifestyle implementation; §3 does not duplicate food lists or long prose from §8/§9.

---

## Foundational Levers

List the most important interventions required to support normal function of the mechanism.

A lever should be classified as Foundational when:

- The mechanism cannot function normally without it, or
- Removal consistently impairs the mechanism, or
- The relationship is well-established across multiple lines of evidence.

Examples:

- Protein sufficiency
- Niacin adequacy
- DHA availability
- Iron sufficiency

---

## Supporting Levers

List interventions that consistently enhance or support the mechanism but are not essential prerequisites for normal function.

Examples:

- Sleep adequacy
- Physical activity
- Polyphenol-rich foods
- Stress reduction

---

## Complementary Levers

List additional interventions that may provide further optimisation or context-specific support but are not considered primary drivers of the mechanism.

Examples:

- Time-restricted feeding
- Cold exposure
- Specific supplementation strategies

---

## Intervention Profile

### Intervention Dominance

Indicates which type of intervention exerts the strongest influence on the mechanism.

**Allowed values:**

- Diet-Dominant
- Diet/Lifestyle-Combined
- Lifestyle-Dominant

**Definitions:**

**Diet-Dominant** — The mechanism is primarily influenced by dietary intake, nutrient exposure, food composition, or meal structure.

**Diet/Lifestyle-Combined** — The mechanism is meaningfully influenced by both dietary and lifestyle factors, with neither consistently acting as the sole primary driver.

**Lifestyle-Dominant** — The mechanism is primarily influenced by sleep, exercise, circadian factors, stress regulation, or other non-dietary inputs.

Front matter `intervention_dominance` should use these values (or map from spreadsheet at ingest). Legacy `intervention_breakdown` (Food-State Dominant, etc.) is a separate FM/PM spreadsheet field and does not replace Intervention Dominance in the public profile.

---

## Evidence qualification (per lever — not a page subsection)

Every intervention listed within Foundational, Supporting, or Complementary Levers must carry evidence qualification **on the lever bullet itself** using `(Evidence:<tier>)`. This is authoring metadata for each entry, not a separate rendered section.

Use the **highest applicable evidence category only**.

### Evidence Hierarchy

1. Human Outcome
2. Human Mechanistic
3. Animal Mechanistic
4. Cellular / Molecular

### Rules

Where Human Outcome evidence exists:

- Use Human Outcome only.
- Do not additionally list Human Mechanistic, Animal Mechanistic, or Cellular / Molecular evidence.

Where Human Mechanistic evidence exists:

- Use Human Mechanistic only.
- Do not additionally list Animal Mechanistic or Cellular / Molecular evidence.

Where Animal Mechanistic evidence exists:

- Use Animal Mechanistic only.
- Do not additionally list Cellular / Molecular evidence.

Cellular / Molecular should only be used where no higher-order evidence currently exists.

The objective is to identify the highest level of evidence supporting inclusion of the intervention rather than listing every evidence type available.

### Examples

**Foundational Levers**

- Niacin adequacy (Evidence:Human Outcome)
- Protein sufficiency (Evidence:Human Mechanistic)

**Supporting Levers**

- Physical activity (Evidence:Human Mechanistic)
- Sleep adequacy (Evidence:Human Mechanistic)

**Complementary Levers**

- Circadian optimisation strategies (Evidence:Animal Mechanistic)
- Novel metabolic interventions (Evidence:Cellular / Molecular)

List lever bullets as: `- <short actionable phrase> (Evidence:<tier>) [Author et al., Year]` when a citation supports inclusion.

Allowed `<tier>` values: `Human Outcome`, `Human Mechanistic`, `Animal Mechanistic`, `Cellular / Molecular`.

---

## Citation Requirements

Every intervention must be supported by at least one citation already referenced within the page or added to the page **References** section at the bottom.

All citations must:

- Appear in the page **References** section with a descriptive study topic (not generic labels such as "Supporting Study").
- Link to the Master BRAIN Diet Bibliography.
- Be traceable to the supporting evidence used to justify the intervention.

Do not include uncited interventions.

Do not include interventions based solely on opinion.

Do not inflate evidence classification beyond the highest level of evidence currently available.

Do not duplicate the References section inside §3.

---

## Authoring Rules

- Keep implementation guidance concise.
- Use short actionable phrases rather than explanatory paragraphs.
- Do not repeat content already covered in the Mechanistic Basis section.
- Do not introduce new biological claims without supporting references.
- Prioritise practical implementation while maintaining scientific traceability.
- Do not duplicate Connected Primary Mechanisms or Cross-BRS Links within this section.
- Persistence, accumulation, storage behaviour, tissue incorporation, and temporal retention should be modelled at the Substance layer, not within PM-level Intervention Summaries.
- Every listed intervention should be directly traceable to the evidence base supporting the mechanism.
- Do not repeat the same intervention across Foundational, Supporting, and Complementary tiers; each tier should add distinct implementation guidance.
- Omit Supporting or Complementary `<details>` blocks entirely when that tier has no levers; do not use `- None listed` inside a dropdown.
- `(Evidence:<tier>)` on each lever identifies the highest applicable evidence category for that intervention; it is not a quality-grading system and must not be collected into a separate Evidence Basis subsection.

---

## Related Files

| File | Role |
|------|------|
| `system/primary-mechanism-schema.md` | PM page contract and section order |
| `system/brs-citation-reference-standard.md` | Inline and reference citation format |
| `system/mechanism-page-section-prose.md` | Section non-repetition rules |
| `system/templates/primary-mechanism-template.mdx` | Authoring shell |
