# BRS-X Schema

Citation and reference format: **`system/brs-citation-reference-standard.md`**.

## Definition

**BRS-X** systems are cross-system biological regulatory networks that operate across multiple Biological Regulatory Systems (BRS1–BRS6) simultaneously and cannot be cleanly owned by a single BRS domain.

BRS-X is a first-class framework layer alongside BRS1–BRS6, not a replacement for them.

## Naming convention

| Object | Pattern | Example |
|--------|---------|---------|
| System | `BRS-X(ECS)`, `BRS-X(Hormones)` | Endocannabinoid System |
| Functional mechanism | `BRS-X(ECS-FM1)` | Endocannabinoid tone regulation |
| Primary mechanism | `BRS-X(Hormones-PM3)` | Estrogen–Neurotransmitter Coupling |
| Key constraint | `BRS-X(ECS-KC1)` | When applicable |

**Do not use** the retired `BRS-Cross` naming convention.

## Hub structure

- **BRS-X hub:** `docs/biological-targets/cross-system-regulation.md`
- **System pages:** `docs/biological-targets/brs-x/{ecs,hormones}/<slug>.md` (frontmatter `id`: `brs-x-ecs`, `brs-x-hormones`; permalinks `/docs/biological-targets/brs-x/{ecs,hormones}/brs-x-{ecs,hormones}`)

## Connected Mechanisms (replaces Cross-BRS Links)

On **FM**, **PM**, and **SM** pages, cross-system references use a single section:

| Page type | Section | Level |
|-----------|---------|-------|
| FM | `## 5. Connected Mechanisms` | major |
| PM | `## 6. Connected Mechanisms` | major |
| SM | `### 5.5 Connected Mechanisms` | subsection |

**Purpose:** Reference any biologically relevant mechanism regardless of originating system (BRS1–BRS6 or BRS-X).

Examples:

- `BRS1-FM2-PM4 — LAT1 Competitive Transport Modulation`
- `BRS5-FM2-PM5 — SCFA Production & Signalling`
- `BRS-X(ECS-PM1) — Endocannabinoid Tone Regulation`
- `BRS-X(Hormones-PM3) — Estrogen–Neurotransmitter Coupling`

PM §6 (`BRS Pathways and Connections`) holds pathway chains (§6.1), cross-BRS links (§6.2), and same-host-FM rollups (§6.3).

## Relationship to SMs

No change to SM architecture. SMs remain interpretation layers and do not own biological mechanisms. PMs and FMs remain authoritative biological objects.

SM pages may reference Connected FMs, PMs, KCs, Mechanisms, Mods, and Mediators in prose and link lists.

Examples:

- **SM-Female** may reference `BRS-X(Hormones-FM2)`, Estrogen–Neurotransmitter Coupling, Estrobolome Regulation
- **SM-Male** may reference Testosterone–Motivation Signalling, Androbolome Regulation

## Initial systems

| ID | Name | Connected BRSs |
|----|------|----------------|
| `BRS-X(ECS)` | Endocannabinoid System | BRS1, BRS3, BRS4, BRS5, BRS6 |
| `BRS-X(Hormones)` | Hormone Signalling & Regulation | BRS1, BRS2, BRS3, BRS4, BRS5, BRS6 |

### BRS-X(Hormones) — proposed FM structure

| FM | Title | Potential PMs |
|----|-------|---------------|
| `BRS-X(Hormones-FM1)` | Hormone Production & Availability | Steroid Hormone Synthesis; Endocrine Cofactor Sufficiency |
| `BRS-X(Hormones-FM2)` | Hormone-Responsive Neural Regulation | Estrogen–Neurotransmitter Coupling; Progesterone–GABA Regulation; Testosterone–Motivation Signalling |
| `BRS-X(Hormones-FM3)` | Hormone–Microbiome Interaction | Estrobolome Regulation; Androbolome Regulation; Microbial Hormone Biotransformation |
| `BRS-X(Hormones-FM4)` | Hormonal Adaptation & Transition Resilience | Menstrual Cycle Adaptation; Perimenopause & Menopause Adaptation; Androgen Transition & Ageing Adaptation; Gender-Affirming Hormone Transition Support |

## Long-term vision

BRS1–BRS6 remain the core architecture. Potential future BRS-X candidates include circadian biology. Promotion requires evidence of genuine cross-system regulatory role, not modifier or intervention status alone.
