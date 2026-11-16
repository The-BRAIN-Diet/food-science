# PM8 duplicate SF1 summary removal — 15 November 2026

Local only. Removed the mechanistic-detail heading, explanatory paragraph and supporting-evidence line labelled SF1-PM-Scope1. The canonical PM8-F12 Scientific Finding disclosure and every frontmatter field remain unchanged. PM scope, admissions, appraisals and SEC history are preserved. Original mechanism and heading anchors now point to the surviving Section 4 scope summary.

## Reference dependencies

| Reference | Remaining PM8 dependencies | Disposition |
|---|---|---|
| [30] Lee 2007 | Overview/local regulation; primary biological effects; Section 4 scope summary; PM8-F12 evidence and reconstruction review | Retain |
| [31] Degawa-Yamauchi 2005 | Primary biological effects; PM8-F12 evidence and reconstruction review | Retain |
| [36] Fallo 2004 | Preserved PM8-F12 appraisal and reconstruction review | Retain |
| [38] Patel 2006 | Preserved PM8-F12 null-result appraisal and reconstruction review | Retain |

No additional active Finding cites these four keys. All four retain live appraisal dependencies, so none was removed from the displayed reference list. Shared bibliography files and numbering were not edited.

## Verification

Canonical frontmatter deep equality PASS; 12 SF disclosures preserved; deterministic SF rendering PASS; MDX compile PASS; pilot suite 10/10 PASS. Reloaded local PM8: removed summary heading absent, canonical PM8-F12 present, mechanism anchor present, all four reference entries rendered with same-origin bibliography links. Historical heading URL retained as an alias, without recreating its summary block.

Edited content file: docs/biological-targets/brs6/fm4/brs6-fm4-pm8-metabolic-inflammation-and-adipose-stress-signalling.mdx. Before-copy retained in this folder. No commit, push, merge, deployment or QC changes.
