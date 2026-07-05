# FM Schema Rollout Sequence

**Status:** Active  
**Related:** `system/functional-mechanism-schema.md`, `system/single-pm-fm-rule.md`, `system/phenome-relationship-review-methodology.md`

---

## Order of operations

### Phase 1 — FM schema (all FMs first)

Complete the **full FM template** on every FM page before running phenome methodology:

| Section | Requirement |
|---------|-------------|
| §4.1 Core Primary Mechanisms | Required |
| §4.2 Integrated Functional Narrative | Required — integration + **Functional Rationale** (primary phenome authoring surface) |
| §4.3 Suboptimal Function & Its Effects | Required — **consequences** of lost capacity (not dietary causes or KC stressors) |
| §4.4 Evidence Highlights | **Required on all FMs** before phenome Phase 2 |

**Tooling:**

```bash
npm run mechanisms:migrate-fm-schema      # add §4.4 where missing (draft from FM narrative + child PM evidence)
npm run mechanisms:validate               # must pass FM §4.4 gate
```

§4.4 drafts are **starting points** — each FM still needs human review so evidence supports *why the FM state matters*, not merely that child PMs exist.

### Phase 2 — Phenome methodology (after all FMs have §4.4)

Do **not** run FM phenome sync or phenome **Phase 2 FM review** until every FM page includes `### 4.4 Evidence Highlights`.

> **Naming note:** This rollout uses “Phase 1/2” for FM **schema** completion vs phenome work. The phenome review workflow itself is Phases 0–4 in `system/phenome-relationship-review-methodology.md` v3 (PM candidates → FM candidates → outcome evidence → audit).

```bash
# blocked until all 23 FMs have §4.4
npm run phenome:sync -- --sync

# explicit override only for exceptions
npm run phenome:sync -- --sync --force
```

PM phenome Phase 1 may continue independently where PM pages are ready.

---

## Rationale

FM §4.2 constructs integrated biological rationale for Phase 3 phenome validation. §4.3 describes consequences when that capacity declines. §4.4 holds mechanism-qualifying evidence. Phase 2 FM phenome assignment is **not** a PM §3 roll-up — see `system/functional-mechanism-schema.md` § FM §4.2 and §4.3 architecture.

Running phenome methodology before §4.4 is complete produces incomplete FM syntheses and misaligned confidence.

---

## Completion check

```bash
npm run mechanisms:migrate-fm-schema -- --dry-run
```

When output reports *“All FM pages have §4.4 Evidence Highlights — phenome methodology may proceed”*, Phase 2 FM phenome work may begin.
