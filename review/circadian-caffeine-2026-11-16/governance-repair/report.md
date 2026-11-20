# Caffeine governance repair and local verification

Local changes on PR246 checkout after f0fa6b27; not committed or pushed in this task.

- Added food_target_research documentation using existing registry, caffeine page and Burke 2015 evidence. Sufficient-coverage rationale explicitly limits the relationship to capsule exposure: no food mapping, beverage equivalence or ranking claim.
- Fixed rendered-label matching to accept a period after the exact structured label. No bypass for unrelated inputs; regression test retains rejection of another substance.
- Full dietary governance: 67 PMs, zero issues. Focused suites: 83/83 pass. No scientific Finding, admission, score, QC configuration or ranked data altered.
- Preview on port3201 serves the preserved phenome-preview-20261115 export. Only two repaired source files copied after exact comparison with pre-repair Git contents; originals backed up under its review/circadian-caffeine-2026-11-16/governance-before directory.

## Browser verification
Desktop 1440x900 and mobile 390x844; viewport restored after checks.
- PM1: supportive and disruptive nested dropdowns opened; full dose/timing/n=5/phase delay limitations visible. Separate SOP note still says assessment pending, no validated cutoff and no admitted caffeine timing SOP. No page overflow.
- PM8: seven SF1–SF7 association labels, 27 reference anchors; no pm8-h1 anchor. Flaxseed disclosure works and remains an SOP. No page overflow.
- Neuroeshot: two disclosures, 3 meaningful and 7 minor/unestablished rows, six approved columns; serving quantities visible. Mobile table horizontal scroll visually reaches Source evidence and Limitation columns; no page overflow.

## Remaining limitations
- PM8 summary cross-reference still displays SF13 rather than its current SF1 association label.
- PM1 Scientific Findings/Evidence & Audit link renders as /?review=1#scientific-findings (site root). It should stay on the PM. Not changed in this scoped governance repair.
- Netlify account limit remains external; no cloud preview verified. No full production build run, merge or deployment. QC remains suspended.

## Subsequent approved link fixes

PM8 summary now explicitly displays its current SF1-PM-Scope2 association label, retaining #pm8-f13. No Finding ID or scientific appraisal changed. PM1 audit link now uses its same-origin canonical path plus ?review=1#scientific-findings; clicking locally opens Evidence & Audit and the four Findings, including caffeine SF4. This resolves both presentation limitations listed above.

Combined tests: 105/105 PASS; governance: 67 PMs, zero issues. Browser link inspection and actual PM1 audit navigation passed. Scientific frontmatter unchanged except caffeine's documented food_target_research coverage; no admission, rating, Finding or QC changes. No merge or deployment initiated. These scoped repairs are authorised for push to PR246.
