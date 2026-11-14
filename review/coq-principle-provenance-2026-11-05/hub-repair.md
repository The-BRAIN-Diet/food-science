# BRS4 overview inventory repair

The new PM was registered in FM1, but the BRS4 hub retained its pre-PM10 generated copies. Running `node scripts/update-brs-hub-fm-definitions.mjs --brs=4` adds only the existing PM10 link to the All Mechanisms and Functional Mechanisms lists (two lines). No scientific, component, layout or admission change.

Authority: original author-approved CoQ implementation explicitly required updating relevant indexes with existing generators; current author identified the missing PM in this overview. This completes that existing navigation requirement, not a new presentation component. Record the narrowly scoped fingerprint through existing change control without regenerating the baseline. Local only; no push/deployment.
