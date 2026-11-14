# Local generated mapping / dropdown verification

Scoped canonical refresh via scripts/refresh-approved-source-omissions.mjs updates only three food-source records and four PM projection records in BRS3/BRS5 snapshots. Every other relationship and food-source record is asserted unchanged. No ranked snapshot generation, scientific source edits or SEC changes in this task.

| PM | Food | Display |
|---|---|---|
| BRS5-FM1-PM1 (KC/resource supply) | Apples | Quantity not established — not ranked · raw |
| BRS5-FM2-PM5 | Apples | Quantity not established — not ranked · raw |
| BRS3-FM2-PM3 | Broccoli | Preparation-dependent — not ranked · Sous vide at 100 °C for 20 minutes, with and without 1 g brown mustard powder |
| BRS3-FM2-PM3 | Broccoli Sprouts | Preparation-dependent — not ranked · raw |

Apple source links retain Liu 2023 canonical bibliography identity and cultivar/extraction limitations. Broccoli links to food-source-4 with original dry-weight and urinary results/limitations. Sprouts link to food-source-3 and retain tissue-disruption/myrosinase qualifications. Preparation-dependent status is not a concentration or RSP score.

Citrus PM4 remains empty; PM1 KC layer unchanged; studied child remains held. Existing snapshot documented connections increase 202→204 at this refresh (four recoveries total versus original 200). Ranked data unchanged.

14 focused tests pass; presentation check passes (691 protected files). Actual renderer produces dropdowns.html from refreshed snapshots. No running Docusaurus server was present. Browser rejected file:// inspection, so no browser-level page verification is claimed. No bypass attempted. Remaining display issues: repeated qualification/citation text; sprouts' compact preparation label is raw, with disruption qualification inside details. No redesign performed.

No production build, deployment, commit, push or PR change.
