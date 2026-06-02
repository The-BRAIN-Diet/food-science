# BRAIN Diet Ontology Rules

## Build Gate Proviso

- Never render or expose spreadsheet letter identifiers in generated content or public-facing pages.
- Always use semantic entity names (for example, `Intervention Dominance`, `Coverage Timing`, `Evidence Type`).
- Treat any letter-identifier wording in generated outputs as a validation failure that must be fixed before build.

## Purpose

This document defines the governing rules of the BRAIN Diet ontology.

All spreadsheet construction, mechanism mapping, recipe design, and algorithm development must adhere to these rules.

This document controls:
- Biological structure (BRS, FM, PM)
- Mechanism mapping
- Coverage Timing
- System complexity limits

---

## 1. Core Ontology Structure

The BRAIN Diet is structured as:

Substances / Foods  
-> Key Constraints (KC) — feasibility conditions  
-> Primary Mechanisms (PM) — bounded biological mechanisms  
-> Functional Mechanisms (FM) — integrated functional states  
-> Specific Mechanisms (SM) — interpretation layers  
-> Biological Regulatory Systems (BRS)  
-> Functional Outcomes

Therapeutic-area framing (e.g. ADHD) belongs on BRS hub pages and rationale sections, not as a primary SM category. The ontology remains biology-centric.

---

## 1.1 Biological Regulatory Systems (BRS)

BRS represent system-level regulatory domains.

They are:
- stable
- limited in number
- not to be expanded without strong justification

---

## 1.2 Functional Mechanisms (FM)

Functional Mechanisms are the **control layer** of the system.

They:
- represent scoreable biological control signals
- define dietary design targets
- define scoring inputs
- sit between PMs and BRS

### Rules

- FMs must remain limited and stable
- FMs define what is scored and optimized
- FMs must be interpretable as practical dietary targets or other interventions from the defined set of modulators

---

## 1.3 Specific Mechanisms (SM)

Specific Mechanisms are **interpretation layers** — context-specific readings of stable biology grounded in connected PMs, FMs, and KCs. They reuse PM page rendering; they are not additional bounded mechanisms.

### SM categories (valid)

- **SM-SNP** — variant-sensitive interpretation (e.g. COMT, MTHFR, DAO, PEMT)
- **SM-PHEN** — phenotype-sensitive interpretation (e.g. emotional dysregulation, hyperarousal, histamine sensitivity)
- **SM-CROSS** — cross-system biological concepts that pass the **SM-CROSS test** (≥ 2 BRS domains **and** no natural single PM/FM owner; e.g. histaminergic arousal and neuroimmune crosstalk)

### Rules

- Do **not** use `SM-ADHD` or other therapeutic-area-primary SM categories.
- **SM-CROSS test:** qualify only if the concept materially spans **≥ 2 BRS domains** **and** cannot be naturally owned by a single PM or FM — see `system/specific-mechanism-schema.md`.
- SM-CROSS is not a phenotype page and not a bounded PM; document multi-BRS crossover in SM **§5.5** using paragraph prose and **links to specific PMs** (not BRS hub labels alone). See `system/specific-mechanism-schema.md`.
- Do not implement an **XM** (Cross-Mechanisms) layer until all six BRS domains complete first-pass development and SM-CROSS examples justify review. See `system/specific-mechanism-schema.md`.

---

## 1.4 Primary Mechanisms (PM)

Primary Mechanisms are biological processes.

They:
- explain how biology works
- feed into FMs
- do not define scoring directly

### Rules

- All PMs must map to at least one FM
- PMs must not exist independently
- PMs can map to multiple FMs if justified
- PMs expand biological detail, not system structure

---

## 2. FM Creation Rule (Critical)

A new FM may be created when a PM cannot be cleanly absorbed into an existing FM without weakening the model.

A new FM is justified if **any** of the following conditions are met:

1. The PM introduces a distinct set of dietary targets.
2. The PM requires different meal design logic.
3. The PM requires a distinct scoring logic.
4. The PM cannot be logically grouped within an existing FM.

If none of these conditions are met:
-> the PM should be integrated into an existing FM.

New FMs should be created cautiously. The purpose is not to increase biological detail, but to preserve practical dietary design clarity and scoring integrity.

---

## 3. PM -> FM Mapping Rule

- Every PM must map to at least one FM
- PMs must not exist without an FM
- FMs aggregate multiple PMs into a single control signal

---

## 4. FM Input Constraint Rule (Anti-Explosion Rule)

FMs must maintain a **small, fixed set of scoring inputs**.

### Rules

- PMs must not expand FM inputs beyond a manageable set
- Not all PM dependencies become dietary targets
- PMs may introduce:
  - explanatory detail
  - optional support
  - design considerations

BUT NOT:
- mandatory ingredient requirements

### 4.1 Practical Principle

> FMs define what must be achieved.  
> PMs explain how it works.

---

## 5. Coverage Timing

### Definition

Coverage Timing defines how often a mechanism must be reactivated to maintain its contribution to system state.

### 5.1 Core Principle

Coverage Timing is based on:

- rate of mechanism effect decay
- system buffering capacity
- sensitivity to gaps

NOT based on:
- nutrient half-life alone
- intake frequency alone

### 5.2 Categories

- Meal-window
- Daily
- 48h
- Weekly
- Monthly

### 5.3 Category Definitions

#### Meal-window
Mechanisms requiring co-occurrence or discrete activation within a feeding event.

#### Daily
Mechanisms with fast decay or high sensitivity to gaps.

#### 48h
Mechanisms with moderate persistence requiring regular reactivation.

#### Weekly
Mechanisms that accumulate and are buffered over multiple days.

#### Monthly
Mechanisms reflecting slow repletion or stored biological capacity.

### 5.4 Assignment Rule

- Assign the **least frequent interval** that maintains stable support
- Must not default to Daily
- Use ranges where uncertainty exists:
  - Daily-48h
  - 48h-Weekly

### 5.5 Evidence Basis Types

Coverage Timing may be based on:

- Direct mechanism evidence
- Nutrient kinetics proxy
- Tissue/status proxy
- Expert inference

---

## 6. Mechanism vs Timing Separation

The system distinguishes:

- Mechanism activation (PM/FM)
- Coverage Timing
- Scoring (system state)

### Rules

- Coverage Timing defines frequency of reactivation
- Scoring reflects current system state
- Mechanism persistence is handled implicitly in scoring

---

## 7. System Simplicity Principle

The system must balance:

- biological richness (PM layer)
- practical usability (FM layer)
- temporal realism (Coverage Timing)

### 7.1 Control Layer Principle

> FMs are control signals, not biological categories.

### 7.2 Expansion Rule

System complexity must increase via:

- PM expansion

NOT via:
- FM proliferation
- scoring input expansion

---

## 8. Final Governing Principle

> The BRAIN Diet is a control system, not a database.

- PMs provide biological depth
- FMs provide control logic
- Coverage Timing provides temporal structure

All components must support:
- scalability
- usability
- algorithmic implementation
