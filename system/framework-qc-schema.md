# Framework QC (Phase 0 / 0.5)

Internal quality-control inventory plus a **derived** public Review & Corrections view. Do **not** add QC fields to content-page front matter. Do **not** recreate or duplicate these registers.

## Registers

| File | Role |
|------|------|
| `system/framework-qc/framework-issues-register.json` | Hand-maintained framework issues (source of truth). |
| `system/framework-qc/page-review-state.json` | Hand-maintained review fields for pages that are not still `unreviewed`. |
| `scripts/out/framework-qc/page-review-register.json` | **Generated** inventory of every `docs/` page. Do not edit by hand. |
| `scripts/out/framework-qc/page-review-report.md` | **Generated** counts report. |
| `scripts/out/framework-qc/review-queue.html` | **Generated** internal Review Queue view. Derived from the two registers plus scan metadata. Not a third data register. |
| `src/data/framework-qc-public.generated.json` | **Generated** public-safe dataset for the Docusaurus site. Derived from the same two registers. Not a third data register. |

Regenerate:

```bash
npm run qc:generate
```

## Page Review Register (generated row)

| Field | Notes |
|-------|--------|
| `page_id` | Front-matter `id`, `pm_id`, `fm_id`, `kc_id`, `sm_id`, or path-derived slug |
| `path` | Repo-relative `docs/…` path (internal only) |
| `title` | Front-matter `title`, else file stem |
| `page_type` | `Food` `Substance` `Recipe` `BRS` `FM` `PM` `KC` `SM` `Dependency` `Index` `Phenome` `Framework/methodology` `Other` |
| `letter` | First A–Z of title (else `_`) |
| `review_status` | See below |
| `last_checked` | ISO date or `null` |
| `checked_by` | Internal reviewer identity or `null` (never public) |
| `public_reviewer` | Public reviewer name or role |
| `review_scope` | Public description of what was checked |
| `accepted_limitations` | Public limitation strings |
| `linked_framework_issue_ids` | IDs of issues that **specifically** target this page. Framework-wide issues are **not** copied onto every row. |

Default when no state exists: `review_status: unreviewed`, empty linked IDs, null dates.

Allowed `review_status`: `unreviewed` | `issues_logged` | `source_checked` | `expert_reviewed` | `recheck_required`.

`SM` is Specific Mechanism pages (`docs/biological-targets/**/sm/**`). `Dependency` is BRS dependency pages (`docs/biological-targets/dependencies/`). `Index` is collection/folder `index.md` pages that are not already a more specific type (for example Dietary Foundations index remains `Framework/methodology`). Do not invent types for remaining `Other` pages.

## Framework Issues Register (hand-maintained)

| Field | Notes |
|-------|--------|
| `id` | `FW001`, `FW002`, … |
| `title` | Short internal name |
| `visibility` | `public` or `internal`. Only `public` issues may appear in the public dataset. Missing `visibility` is treated as internal. |
| `public_title` | Optional public title (defaults to `title` when public) |
| `public_findings` | Optional public findings (defaults to `findings` when public) |
| `findings` | Numbered internal findings (array, 1-based in display) |
| `required_action` | Internal: what must happen later (never public) |
| `status` | `open` `deferred` `resolved` |
| `priority` | `high` `medium` `low` (internal) |
| `resolution_summary` | Public resolution text when resolved |
| `resolved_date` | ISO date when resolved |
| `scope` | How the issue attaches (do not explode one systemic issue across hundreds of pages) |
| `affected` | Human-readable pages or scope (internal) |

### Scope

```json
{
  "kind": "page | page_type | letter | brs_hierarchy | framework-wide",
  "page_ids": [],
  "page_paths": [],
  "page_types": [],
  "letters": [],
  "brs_hierarchy": [],
  "subsection": null
}
```

- `page` — named `page_ids` / `page_paths` only.
- `page_type` / `letter` / `brs_hierarchy` — applicable to matching pages in the Review Queue without writing the ID onto every register row.
- `framework-wide` — shown once in the queue’s framework-wide panel.

## Public dataset (generated)

`src/data/framework-qc-public.generated.json` is the public view of the existing registers. It exposes only:

- page ID, public site path, title, page type, letter
- review status, last checked date, public reviewer, review scope
- public issue ID, public title, numbered public findings, issue status
- resolution summary and date when present
- accepted limitations and resolved history

It must not expose internal notes, internal-only issues, private identities, filesystem paths, `required_action`, or implementation metadata.

Public UI:

- Per-page **Review & Corrections** tab (shared Docusaurus layout; ships to production)
- Central register at `/docs/dietary-foundations/framework-review-and-corrections` (**local-only**; `INCLUDE_INTERNAL_DOCS=true`, not committed)

## Review Queue (generated view)

Built at generate time from the Page Review Register + Framework Issues Register. Default grouping:

1. Page type
2. Alphabetical letter (Foods, Substances, Recipes)
3. Page title
4. Linked **open** page-specific issues

Recipes: meal-category folder before letter. BRS / FM / PM / KC: BRS hierarchy (`BRS5` → `FM2` → `PM4`) instead of letter.

## Working rule

See `.cursor/rules/framework-qc.mdc`. Log outside the active batch; do not fix unless the exception criteria apply.
