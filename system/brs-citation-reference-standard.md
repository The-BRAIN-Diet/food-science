# BRS Citation & Reference Standard

Authoritative citation rules for **all BRS pages** (BRS hubs, FM, PM, SM, KC) and BRS templates. Food pages follow `system/food-page-schema.md`.

---

## Purpose

BRS pages are scientific framework pages that explain biological systems, functional mechanisms, and their supporting evidence.

The citation system should allow readers to:

- Identify supporting evidence while reading.
- Understand the relevance of cited studies.
- Access complete citation details through the Master BRAIN Diet Bibliography.
- Maintain a professional scientific style without disrupting readability.

---

## Inline Citations (Body Text)

Use **author–year** citations within square brackets.

**Format:**

```text
[Author et al., Year]
```

**Examples:**

```text
Omega-3 fatty acids influence membrane composition and neuronal signalling [Bazinet & Layé, 2014].

Circadian regulation is closely linked to NAD⁺ metabolism through NAMPT-mediated pathways [Ramsey et al., 2009].

Sleep disruption may influence metabolic and neuroendocrine regulation [Nakahata et al., 2009].
```

### Multiple Citations

When multiple studies support the same statement:

```text
[Ramsey et al., 2009; Nakahata et al., 2009]
```

or

```text
[Bazinet & Layé, 2014; Gómez-Pinilla, 2008; Calder, 2020]
```

List studies in the order most relevant to the claim.

### Citation Rules

**Use citations when:**

- Making factual biological claims.
- Referring to mechanistic evidence.
- Describing intervention effects.
- Discussing physiological relationships.
- Referring to research findings.

**Do not use citations:**

- For definitions that are already established within the framework.
- For section headings.
- Excessively within bullet lists where evidence is already captured elsewhere.

**Do not use in body text:**

- Numeric-only refs (`[1]`, `[2]`) — reserved for legacy pages until migrated; new/edited BRS prose uses author–year.
- Markdown bibliography links in running prose — the References section carries the link.

---

## References Section

Every BRS page should include a dedicated **References** section at the bottom of the page.

**Format:**

```text
Author et al. (Year) — Short Descriptive Study Topic
```

The reference label should explain **why the study is relevant** to the page. Readers should understand the role of the study without opening the paper.

### Reference Examples

Good examples:

```text
Ramsey et al. (2009) — Circadian Control of NAD⁺ Biosynthesis

Nakahata et al. (2009) — CLOCK–SIRT1 Regulation of NAD⁺ Metabolism

Bazinet & Layé (2014) — Omega-3 Fatty Acids and Brain Function

Calder (2020) — Omega-3 Effects on Inflammation and Immune Function

Zelicha et al. (2022) — Green Mediterranean Diet and Visceral Fat Reduction
```

### Description Rules

Descriptions should:

- Explain the biological relevance of the study.
- Summarise the mechanism, intervention, or key finding.
- Help readers understand why the study is cited.
- Be concise and readable.
- Typically contain **3–12 words**.

### Do Not Use

Avoid:

```text
Ramsey et al. (2009)
```

No relevance is provided.

Avoid:

```text
Nature (2009)
```

Journal names are not informative.

Avoid:

```text
Supporting Study
```

Generic placeholders do not explain why the study is cited.

Avoid:

```text
PMID: 19299583
```

Identifiers belong in the bibliography.

Avoid:

```text
NAD+, Metabolism and Circadian Rhythms Through NAMPT Signalling and SIRT1 Regulation in Mammalian Systems
```

Full paper titles reduce readability.

Avoid:

```text
Review Paper
Human Study
Animal Study
```

These labels provide little practical value.

---

## Bibliography Linking

Every reference in the References section must link to the corresponding entry in the **Master BRAIN Diet Bibliography**.

**Markdown pattern:**

```markdown
- [Author et al. (Year) — Short Descriptive Study Topic](/docs/papers/BRAIN-Diet-References#citation_key)
```

The Master BRAIN Diet Bibliography is the authoritative source for:

- Full bibliographic citation
- DOI or permanent identifier
- Publication details
- External paper or source link
- Additional metadata

The BRS page displays only the concise descriptive reference label; the bibliography holds complete metadata.

**Citation keys** must exist in `static/bibtex/BRAIN-diet.bib`. Verify entries survive deduplication on the global references page (unique DOI/URL).

---

## Authoring Rule

When creating a reference label, ask:

> Why is this paper relevant to this page?

The answer becomes the descriptive study topic (the text after `—`).

Readers should scan the References section and immediately understand each study's purpose without opening the paper, while retaining full access through the Master BRAIN Diet Bibliography.

---

## Spreadsheet / Front Matter

`key_studies` and `references` fields should use:

```text
Author et al. (Year) — Short Descriptive Study Topic | citation_key
```

One per line or semicolon-separated. The descriptive topic is required for ingestion into page References sections.

---

## Related Files

| File | Role |
|------|------|
| `system/brs-page-schema.md` | BRS hub pages |
| `system/functional-mechanism-schema.md` | FM pages |
| `system/primary-mechanism-schema.md` | PM pages |
| `system/specific-mechanism-schema.md` | SM pages |
| `system/key-constraint-schema.md` | KC pages |
| `system/mechanism-page-section-prose.md` | Section prose + citation placement |
| `system/templates/*.mdx` | Authoring shells |
