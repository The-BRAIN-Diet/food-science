# ADHD Therapeutic Area hub evidence migration report

**Generated:** 2026-09-28T17:09:29.538Z
**Scope:** BRS1–BRS6 hub Therapeutic Area Research tables (Category A ADHD rows)
**No new literature search was performed.**

## Reviewed source rows by BRS

| BRS | Hub table rows migrated |
|-----|------------------------:|
| BRS1 | 14 |
| BRS2 | 7 |
| BRS3 | 9 |
| BRS4 | 5 |
| BRS5 | 7 |
| BRS6 | 8 |
| **Total** | **50** |

## Study and page counts

| Metric | Count |
|--------|------:|
| Distinct bibliography keys across ADHD hub rows | 45 |
| Canonical study records in registry (all therapeutic areas, deduplicated by citation key) | 49 |
| ADHD study presentations on the page (one per hub table row / interpretation) | 50 |
| Excluded rows | 0 |

## Excluded rows

None.

## Missing citations, conflicts and review flags

- All migrated row citation keys resolved in `static/bibtex/BRAIN-diet.bib` at migration time.

- **Duplicate citation keys across BRS hubs** (same study, different mechanism mappings): expected — each hub row creates a separate ADHD interpretation on the page while the study is stored once in the registry (for example Wang et al., 2019 on BRS2 and BRS6).
- **Multi-citation hub rows** (Pycnogenol companion papers): one page presentation with multiple bibliography keys on the canonical study record.
- **Cross-BRS mechanism links** on BRS2/BRS3 rows (for example gut diversity routed via BRS5 FM): preserved on the claim; primary BRS remains the hub owning the table row.

## Accounting statement

Every eligible Category A ADHD evidence row in the six hub **ADHD evidence and connected BRSn mechanisms** tables was parsed. Limitations-only placeholder rows were excluded deliberately. Each eligible row maps to one ADHD page study presentation with a link back to the hub section or primary mechanism page.

## Next steps (out of scope for this pass)

- Populate **Dietary & Lifestyle Evidence** tab after dietary-evidence review.
- Enrich canonical study records with population and design detail from mechanism pages where hub rows are abbreviated.
- Resolve any remaining PM cross-links flagged by `npm run ta:validate`.
