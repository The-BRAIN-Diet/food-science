# BRAIN Framework Rule — Single-PM Functional Mechanisms (FMs)

**Status:** Active  
**Related:** `system/functional-mechanism-schema.md`, `system/phenome-relationship-schema.md` (1:1 phenome rule), `system/phenome-relationship-review-methodology.md`

---

## Purpose

Some Functional Mechanisms (FMs) are operationalised by multiple child PMs and represent integration across several biological mechanisms.

Other FMs are anchored by a **single dominant PM**.

The framework must **not** force artificial PM integration where none exists.

---

## FM archetypes

### Type A — Multi-PM FM

**Examples:**

- BRS1(FM1) — Monoaminergic Function
- BRS-X(ECS-FM1) — Endocannabinoidome Signalling Capacity & Neuromodulatory Regulation

**Characteristics:**

- Multiple child PMs
- FM narrative explains how PMs interact
- Functional Failure Modes emerge from combined PM constraints
- Phenome confidence may increase where multiple PMs converge on the same outcome

**Narrative focus:** integration across multiple primary mechanisms.

**§4.2 opener:** “Together, these PMs…” (or equivalent multi-PM synthesis) is appropriate.

---

### Type B — Single-PM anchor FM

**Canonical example:** `docs/biological-targets/brs1/fm3/brs1-fm3-phospholipid-mediated-dha-delivery-and-membrane-integration.mdx` → BRS1-FM3-PM6

**Characteristics:**

- One dominant PM operationalises the FM
- FM exists because the biological **state** is distinct and framework-relevant
- The FM is **not** merely a duplicate of the PM
- Integration occurs through **connected mechanisms**, **constraint pools**, and **downstream biological consequences** — not through multiple child PMs

**Narrative focus:** integration across **systems** rather than integration across PMs.

**§4.2 opener:** do **not** use “Together, these PMs…” or other multi-PM language.

---

## FM section guidance (Type B)

### 4.1 Core Primary Mechanisms

List the dominant PM normally with one contribution line.

### 4.2 Integrated Functional Narrative

Explain:

1. Why the FM exists as a distinct biological state
2. Why the state matters biologically
3. How connected systems contribute to or constrain the state
4. How the FM differs from the PM itself

**Preferred wording pattern:**

> Although operationalised primarily through a single PM, this FM represents a broader biological state extending beyond the mechanism alone. The FM captures the integrated physiological context, connected systems, shared constraints, and downstream functional consequences associated with that mechanism.

**Canonical example (BRS1 FM3):**

> Although BRS1(FM3) is principally operationalised through BRS1-FM3-PM6 — Neuronal Membrane DHA Incorporation, the FM represents the broader membrane structural environment within which neuronal communication occurs. Membrane composition influences receptor function, ion-channel behaviour, synaptic transmission, and network signalling competence while interacting with phospholipid metabolism, lipid protection, inflammatory regulation, and downstream lipid-signalling systems.

### 4.3 Functional Failure Modes

Failure modes should extend **beyond the PM itself**. Include:

- upstream constraints
- connected mechanism failures
- downstream consequences
- functional state deterioration

**Example:** lipid peroxidation, inadequate phospholipid availability, poor DHA delivery, inflammatory pressure, and disrupted membrane remodelling may all contribute to deterioration of the FM despite a single PM owning the primary mechanism.

### 4.4 Evidence Highlights

Evidence should support:

- relevance of the FM as a biological state
- functional significance of the state
- downstream biological consequences

Do **not** merely repeat evidence that the PM exists.

**Review question:** *Why does this FM matter?* — not *Does the PM exist?*

---

## Architectural principle

Single-PM FMs are **valid**. An FM does not require multiple PMs.

The purpose of an FM is to represent a **meaningful biological state** within the framework.

Where only one PM exists, the FM should describe:

- the broader physiological state
- connected systems
- constraints
- downstream consequences
- functional significance

rather than artificially creating PM integration that does not exist.

**Distinction:**

| Layer | Owns |
|-------|------|
| **PM** | mechanism ownership |
| **FM** | biological state ownership |

---

## Phenome alignment (Type B)

When `mechanisms_covered` has exactly one PM, §3 `functional_outcome_context` must use the **same phenome labels and confidence** as that PM’s `phenome_relationships` at publish time — but FM §4.2–§4.4 may surface integrative synthesis and evidence the PM review missed. See `system/phenome-relationship-review-methodology.md` § Single-PM FM (1:1) reconciliation.
