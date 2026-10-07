# FM Synthesis Layout Rollout

All FMs follow `functional-mechanism-schema.md` before further FM phenome review:

1. Linked PM/KC inventory before section 1.
2. §4.1 Functional Rationale: bounded purpose, no PM recap.
3. §4.2 Evidence Summary: reviewed child-evidence aggregation and conditional combined meaning.
4. §4.3 Suboptimal Function & Its Effects: consequences, following evidence.

Use `scripts/lib/fm-synthesis-layout.mjs`; verify source/render agreement and citations. Missing synthesis sources must be reported rather than replaced by generic roll-ups. Independent phenome assessment still follows `phenome-relationship-review-methodology.md`; neither this migration nor aggregation changes ratings or admissions.

`npm run mechanisms:populate-fm-evidence -- --force` refreshes the durable Evidence Summary, not copied PM dropdowns. `npm run mechanisms:migrate-fm-schema -- --dry-run` checks the new Evidence Summary gate. Historical references to §4.4 are retained only as link aliases.
