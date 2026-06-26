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
| §4.2 Integrated Functional Narrative | Required (Type A multi-PM or Type B single-PM anchor per `system/single-pm-fm-rule.md`) |
| §4.3 Suboptimal Function & Its Effects | Required |
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

FM §4.1–§4.4 is a **first-class phenome evidence layer** (methodology v2). Phase 2 FM phenome assignment requires integrative FM narrative, failure modes, and FM-level evidence highlights — not PM roll-ups alone.

Running phenome methodology before §4.4 is complete produces incomplete FM syntheses and misaligned confidence.

---

## Completion check

```bash
npm run mechanisms:migrate-fm-schema -- --dry-run
```

When output reports *“All FM pages have §4.4 Evidence Highlights — phenome methodology may proceed”*, Phase 2 FM phenome work may begin.
