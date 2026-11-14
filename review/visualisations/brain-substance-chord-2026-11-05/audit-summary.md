# BRAIN chord prototype — 5 November 2026

Source HEAD: 521036b1d6c212e58c660f0f985e47617a71a716. Current local canonical records read with the existing mapper; no scientific regeneration.

- Unique mapped canonical identities: 69
- Distinctive: 36; Foundation: 19; excluded: 14
- Drawn identities: 55; BRS1–6 admitted pairs: 87; contextual-only pairs: 9
- Cross-BRS-associated identities: 5. Cross-BRS relationships remain in CSV/details, outside the six-sector layout.
- Unresolved or unmapped source records: 93, retained in network.json.

## Greatest admitted BRS reach

|Substance|BRS reach|Distinct BRS pairs|
|---|---:|---:|
|Vitamin B2 (Riboflavin)|4|6|
|Copper|3|3|
|DHA (Docosahexaenoic Acid)|3|3|
|Glycine|3|3|
|Iron|3|3|
|Magnesium|3|3|
|Tryptophan|3|3|
|Zinc|3|3|
|Betaine|2|1|
|Choline|2|1|

## Interpretation and limitations

Reach counts distinct BRS1–6 admitted relationships, not PM appearances, confidence or clinical benefit. Pair count is n(n−1)/2. Primary visual BRS is the largest admitted-PM record count with deterministic BRS-number tie-breaking; it is not scientific ownership. Contextual-only placement uses the first recorded numbered BRS. No approximate 60-substance quota is enforced. Defined substance classes remain single identities; constituents are not automatically admitted.

SOP substance IDs are contextual unless a separate dietary admission exists: an admitted food protocol does not admit its measured biomarker independently. Food composition alone never creates a BRS connection. Contextual endogenous participants without dietary/SOP/verified-food eligibility are excluded. Unresolved identities and admission decisions never produce ribbons. No precursor conversion is automatically inherited as a downstream substance admission. Context and limitations remain attached to each source relationship, including when an admitted pair also has contextual sources.

The CSV contains canonical contextual pairs even when the identity is excluded from display; consult its displayed column. Missing SOP IDs are retained as mapping gaps, not resolved from prose. This is a current-record connectivity prototype, not a new evidence appraisal.

Standalone SVG contains the admitted default view. HTML has no external runtime dependencies. Geometry is generated with installed D3 arc/ribbon utilities, equal angular ribbon widths, no manually positioned nodes. Reproduce: run node review/visualisations/brain-substance-chord-2026-11-05/build.mjs from repository root.
