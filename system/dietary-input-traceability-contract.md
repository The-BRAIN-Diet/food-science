# Dietary Input Traceability & Visibility Contract

**Status:** Active — required to complete the PM Evidence layer.  
**Scope:** PM Evidence now; shared currency for future Dietary Lever implementation.  
**Does not implement:** Dietary Lever schema, rendering, mechanical roll-up, or KC redesign.

PM Evidence and Dietary Levers are separate layers with different jobs. Both must use
the same minimum atomic currency defined below so the Lever layer can consume PM
evidence without reconstructing biological roles or provenance from prose.

---

## 1. Canonical atomic unit

For every **dietary-relevant** relationship established by PM evidence, preserve:

| Atom | Meaning |
|------|---------|
| **Dietary input** | Nutrient, substance, food group, pattern, timing, preparation, or other dietary-facing identifier |
| **Input type** | Category of input (see § Input types) |
| **Biological role** | What job this input performs **in this PM / KC / context** |
| **Evidence source** | What supports **that biological role** — Finding id, `citation_key`, and/or curated pathway resource |

These four fields are the **minimum atomic traceability relationship**.

**Example — Vitamin B6:**

```yaml
input: Vitamin B6
input_type: nutrient/substance
biological_role: Dietary precursor supporting PLP availability required for GAD-dependent GABA synthesis
evidence_source:
  finding_ids: [SF-PM8-1, SF-PM8-2]
  citation_keys: [martin_regulation_1993, lee_human_2000, tang_crystal_2005, navarro_catalytic_2013]
```

**Example — Glutamate:**

```yaml
input: Glutamate
input_type: substrate
biological_role: Substrate for GAD-dependent GABA synthesis
evidence_source:
  finding_ids: [SF-PM8-1]
  citation_keys: [martin_regulation_1993]
```

One evidence source may support several atomic relationships from the same mechanism.
Do not require one paper per input.

---

## 2. Not an intervention model

Do not describe all dietary inputs as “interventions.”

The BRAIN dietary architecture primarily identifies dietary inputs required to
support biological requirements.

Keep separate:

| Layer | Question |
|-------|----------|
| **A. Biological dependency** | Is this input required by the biology? — **PM Evidence principal job** |
| **B. Appropriate dietary provision** | Does ordinary diet supply it adequately? — separate proposition |
| **C. Dose manipulation / therapeutic intervention** | Does increasing intake change the PM or outcome? — **Dietary Lever layer later** |

PM Evidence establishes **A** unless **B** or **C** are separately supported.
Do not infer B or C from biochemical dependency alone.

---

## 3. Reappearance is expected

A dietary input may legitimately reappear across PMs, KCs, cofactors, Key Dietary
Requirements, and BRSs — including in different biological roles.

**Reappearance ≠ duplication.** Do not deduplicate by nutrient/substance name.

A **true duplicate** exists only where the same input + type + role + target/context +
evidence relationship has accidentally been represented twice.

Preserving reappearance is essential: later mechanical roll-up must identify recurring
key dietary inputs while retaining every biological reason they appeared.

| Term | Meaning |
|------|---------|
| **Reappearance** | Same input again — inspect role and context |
| **Multi-role reappearance** | Same input, materially different biological role |
| **Shared-role reappearance** | Same input/role at multiple architectural levels legitimately |
| **True duplicate** | Same five-tuple accidentally twice |
| **Misclassification** | Wrong category or context for the actual role |

---

## 4. KCs, cofactors, Key Dietary Requirements

These are **biological structures/relationships**, not parent/child categories of
Dietary Levers.

Where they carry a dietary-relevant relationship, preserve the same four atoms.
**A cofactor name alone is insufficient** (e.g. `cofactors: [B6 (PLP)]` without role
and evidence).

Do not force dietary strategies, patterns, timing, food groups, or other future Lever
input types through a KC or cofactor slot when their biological role belongs elsewhere.

### KC → PM atomic projection (requirement)

KC → PM propagation must operate on the **atomic biological relationship**, not on
the dietary-input name or the entire KC dietary list.

```
PM8 → KC1 → only KC1 relationships whose biological role applies to PM8
```

**Not:**

```
PM8 → KC1 → automatically inherit every KC1 dietary input
```

**Example — may project to PM8:**

```yaml
input: Glutamate / relevant protein substrate
input_type: substrate
biological_role: Substrate availability for GAD-dependent GABA synthesis
evidence_source: PM8 evidence
```

**Example — does not project to PM8 merely because PM8 lists KC1:**

```yaml
input: Tryptophan
input_type: nutrient/substance
biological_role: Serotonin precursor / LNAA competition
evidence_source: KC1 evidence
```

The same applies to tyrosine and other KC inputs whose biological roles belong to
KC scope, not to the receiving PM. Valid KC records are not challenged; the error is
**KC → PM projection / scope mismatch** when a PM inherits KC dietary inputs without
a PM-specific biological role.

Implementation of atomic projection belongs to the later Dietary Lever / mechanical
roll-up build — not to individual PM evidence passes except to prevent the PM evidence
layer from validating mismatched inherited rows.

---

## 5. Evidence source

Every atomic relationship requires provenance for the **role being claimed**.

Appropriate sources for biochemical dependencies include curated resources (Reactome,
Rhea, reviewed UniProt annotations) and underlying primary literature where necessary.

These establish reaction participants, substrates, cofactors, and biological roles.
They do **not** automatically establish dietary dose-response, limiting status in normal
humans, therapeutic efficacy, or optimal intake.

Evidence links resolve to the PM page **canonical References** section (`citation_key`
→ `static/bibtex/BRAIN-diet.bib`). Do not create a separate Dietary Lever bibliography.
The same reference may support Mechanistic Basis, Scientific Findings, dietary-input
roles, and future Lever claims.

---

## 6. Shared currency with future Dietary Levers

| Layer | Job |
|-------|-----|
| **PM Evidence** | Establish biological requirements (dependency **A**) with four-field traceability |
| **Dietary Levers (future)** | Dietary-facing implementation — foods, groups, strategies, patterns, timing, preparation — with the **same four-field currency** plus intervention evidence where claimed |

The future Lever layer must not need to reconstruct biological role or provenance from
prose if PM evidence has already established them in durable structured form.

---

## 7. Presentation / visibility contract

**Atomic traceability is mandatory in the data model.**  
**Atomic verbosity is not required in the default presentation.**

Default Dietary Lever / Key Dietary Requirement presentation remains compact, e.g.:

`Vitamin B12 · Folate · Riboflavin · Methionine`

The **dietary-input label** is the evidence-bearing UI object:

- **Default:** show the dietary input only; indicate that more information is available
  (e.g. underlined / interactive label).
- **Hover, keyboard focus, or tap:** expose the four atoms in a compact popover (Input,
  Input Type, Biological Role, Evidence Source).
- **Evidence/reference control:** navigates to the canonical reference in the PM
  References section.

Hover must not be the only interaction — keyboard and touch/mobile must reach the same
information. Precise visual implementation is deferred to the Dietary Lever build;
this section is the governance requirement.

---

## 8. PM Evidence workflow

When adjudication establishes or materially changes a nutritionally relevant biological
requirement:

1. **Identify** the dietary input.
2. **Identify** its input type.
3. **State** its biological role in this PM/context.
4. **Preserve** the evidence source.
5. **Check** whether existing KC / cofactor / Key Dietary Requirement structures can
   carry that relationship.
6. **Flag** any downstream representation gap — do not adjudicate or redesign Dietary
   Levers during PM evidence work.
7. **STOP.**

**Downstream flag format:**

```
PM → Dietary Input → Input Type → Biological Role → Evidence Source → issue
```

Record flags in `system/mechanism-change-control-queue.md`.

**Exception:** Not every Scientific Finding is dietary-relevant. Do not create
artificial dietary-input records for interpretation, boundary-setting, or phenome
Findings with no dietary biology (e.g. SF-PM8-4: GABA concentration ≠ synthesis rate).

---

## 9. Durable storage (PM Evidence layer)

Until a dedicated Lever schema exists, PM pages may carry adjudicated atomic
relationships in front matter:

```yaml
dietary_input_traceability:
  - input: string                      # required
    input_type: string                 # required — see § Input types
    biological_role: string            # required
    evidence_source:                   # required
      finding_ids: [SF-PM8-1]         # optional when Finding-backed
      citation_keys: [martin_regulation_1993]   # must resolve in PM References
      pathway_resources: []            # optional — Reactome/Rhea/UniProt ids when used
```

This array is **PM Evidence durable source**. It is not a Dietary Lever record.
Rendering and validation of this field are not yet required for page build; absence
on legacy PMs is not a failure. New or completed PM evidence passes should populate it
where dietary-relevant requirements are established.

---

## Input types (non-exhaustive)

| Input type | Use for |
|------------|---------|
| `substrate` | Direct metabolic substrate (e.g. glutamate, methionine) |
| `nutrient/substance` | Named nutrient or biochemical (e.g. vitamin B6, iron) |
| `cofactor` | Enzymatic cofactor requirement in this PM context |
| `precursor` | Upstream dietary precursor to an active form |
| `resource dependency` | Shared pool / bottleneck (often KC-scoped) |
| `biochemical requirement` | Other in-pathway requirement not better typed above |

Future Dietary Lever layer adds: `food group`, `dietary strategy`, `pattern`,
`timing`, `preparation`, `practice` — do not force these into cofactor/KC slots during
PM evidence work.

---

## Cross-references

- Scientific Finding workflow: `system/scientific-finding-schema.md` § Bounded assessment
- PM scope consistency: `system/primary-mechanism-schema.md` § PM scope consistency
- Cofactor / §4.1 presentation: `system/primary-mechanism-schema.md` § PM §4
- Downstream flags: `system/mechanism-change-control-queue.md`
- Future hub/lever presentation patterns: `system/brs-hub-levers-schema.md` (Lever build)
