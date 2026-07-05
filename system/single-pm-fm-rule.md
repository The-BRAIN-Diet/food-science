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
- FM §4.2 explains how PMs interact and why integration creates emergent capacity
- Phenome confidence may increase where multiple PMs converge on the same outcome (biological uplift — Phase 3)

**Narrative focus:** integration across multiple primary mechanisms.

**§4.2 opener:** “Together, these PMs…” (or equivalent multi-PM synthesis) is appropriate.

---

### Type B — Single-PM anchor FM

**Canonical example:** `docs/biological-targets/brs1/fm3/brs1-fm3-phospholipid-mediated-dha-delivery-and-membrane-integration.mdx` → BRS1-FM3-PM6

**Characteristics:**

- One dominant PM operationalises the FM
- FM exists because the biological **state** is distinct and framework-relevant
- The FM is **not** merely a duplicate of the PM
- Integration occurs through **connected systems** and **downstream biological context** — not through multiple child PMs

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
3. How connected systems shape the integrated capacity (cross-BRS biology, not KC stressor lists)
4. How the FM differs from the PM itself
5. **Functional Rationale** — why this integrated state would be expected to influence particular functional domains (candidate FM phenomes for Phase 3 — no registry IDs or confidence scores)

**Preferred wording pattern:**

> Although operationalised primarily through a single PM, this FM represents a broader biological state extending beyond the mechanism alone. The FM captures the integrated physiological context, connected systems, and downstream functional consequences associated with that mechanism.

**Canonical example (BRS1 FM3):**

> Although BRS1(FM3) is principally operationalised through BRS1-FM3-PM6 — Neuronal Membrane DHA Incorporation, the FM represents the broader membrane structural environment within which neuronal communication occurs. Membrane composition influences receptor function, ion-channel behaviour, synaptic transmission, and network signalling competence while interacting with phospholipid metabolism, lipid protection, inflammatory regulation, and downstream lipid-signalling systems.

### 4.3 Suboptimal Function & Its Effects

Describe **consequences when integrated FM capacity is lost** — not dietary causes or upstream stressors.

**Structure:**

1. **Opening** — integrated biological capacity that deteriorates
2. **Middle** — biological function that fails at the FM/system level (e.g. membrane signalling competence, transport efficiency)
3. **Closing** — system-level functional constraints that motivate phenome review (without listing registry phenomes)

**Must not include:** dietary patterns, delivery-form advice, KC stressor rollups, cooking/preparation, PM levers.

**Example (consequence-focused):** When membrane structural integrity and phospholipid-mediated delivery can no longer sustain adequate neuronal enrichment, receptor function, ion-channel behaviour, and synaptic transmission may weaken — with downstream relevance to attention stability, cognitive clarity, and emotional regulation framing.

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

- the broader physiological state (§4.2)
- connected systems (§4.2)
- consequences when that state fails (§4.3)
- functional significance (§4.2 Functional Rationale → Phase 3 → §3)

rather than artificially creating PM integration that does not exist.

**Distinction:**

| Layer | Owns |
|-------|------|
| **PM** | mechanism ownership + levers |
| **FM** | integrated biological state + phenome rationale (§4.2 → Phase 3 → §3) |

---

## Phenome alignment (Type B)

When `mechanisms_covered` has exactly one PM, §3 `functional_outcome_context` must use the **same phenome labels and confidence** as that PM’s `phenome_relationships` at publish time — but FM §4.2 Functional Rationale may surface integrative predictions the PM review missed. See `system/phenome-relationship-review-methodology.md` § Single-PM FM (1:1) reconciliation.
