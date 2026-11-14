# Four typed non-substance connections

Implemented locally under the author EXEC; no new substance registry records.

| PM / atom | Representation | Conversion status |
|---|---|---|
| BRS2-FM1-PM4 / PM4-DIT-2 | source-class: dietary protein | Existing methionine provision retained; no quantity substitution or new completed assessment |
| BRS5-FM1-PM1 / PM1-DIT-2 | functional-substrate-class: fermentable dietary fibre | Butyrate conversion explicitly remains unresolved; food eligibility not established by identity |
| BRS5-FM1-PM2 / PM2-DIT-3 | dietary-matrix: tested fish-oil meal | No single-substance identity applicable; no isolated DHA/EPA attribution |
| BRS5-FM1-PM2 / PM2-DIT-4 | preparation-characteristic: milk-fat structure | No single-substance identity applicable; original comparator and null findings retained |

The four full canonical PM atom identifiers are the identity references. Existing admissions, all nonidentity PM metadata and body text are unchanged. Existing projection blocks remain. Fingerprint transitions preserve historical admission recognition without modifying the baseline. The new assessment source_atom_id option requires canonical sourceAtoms context and retains all scientific/evidence gates. No conversion assessment was installed or marked complete.

These four connections are reported separately in connections.json, not added to the existing 155 PM–identity pairs. No food mappings, amounts or rankings are created. Missing-substance diagnostics are replaced by resolved-pm-source-atom, not by an invented substance ID.

Validation: 62 focused identity/admission/extraction tests passed. Tests compare original PM fields, confirm original admission recognition, forbid new substance IDs, reject unbound source references and verify that missing microbial conversion evidence remains unresolved. Presentation check passes. No build, deployment, PR change, commit or push.
