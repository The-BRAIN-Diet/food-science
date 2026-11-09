# Approved individual amino-acid extraction correction

Author instruction: integrate the verified extraction correction into draft PR 238; preserve quantities, source qualifications, admissions and ranking rules. No merge or production deployment.

The shared generator now reads individually recorded essential amino acids from validated canonical amino-acid profiles, in addition to the existing EAA total. It does not derive amino acids from protein or infer downstream products. Original values, units, source rows, preparation and analytical/calculated-value qualifications are retained.

| Snapshot | Foods | Connections | Covered targets | Ranked substances |
|---|---:|---:|---:|---:|
| af13bec1 | 64 | 800 | 98/151 | 25 |
| Corrected | 65 | 890 | 100/151 | 26 |

Ninety connections are added across fourteen targets (seven methionine, five tryptophan, two phenylalanine); none are removed. Phenylalanine gains ranked coverage and almonds enters the selected food set. PM dropdowns and Wheel consume the same observations. The provisional 10% threshold, ten-food cap and minimum-two-source/comparability rules are unchanged.

No canonical food, PM, SEC, publication allowlist or ranking-hold records changed. Glycine, betaine and olive-oil holds remain. The 32 unclassified Direct/Derived targets and 18 incomplete conversion links remain in the separate audit/dietary-connectivity-2026-11-09 workstream; they are not resolved or published by this correction.

Validation: 60/60 focused extraction, publication and PM-renderer tests pass, including all-target exact selection consistency. The mapper suite remains 37/41 with its four documented baseline failures. Netlify performs the production build; no resource-intensive local production build is repeated. Remote build and browser results are recorded in PR 238 after pushing.
