# PM3 intervention SEC review — 3 November 2026

These are intervention-specific review appraisals using the existing D/B/P/R rubric. They are not inherited Finding scores, canonical registry entries, human-approved assessments or proof of intervention benefit.

| Intervention | D/B/P/R | Provisional adjusted total | Status |
|---|---|---:|---|
| PM3-SOP-1 | 2/pending/pending/pending | No total | pending appraisal |
| PM3-SOP-2 | 2/1/1/1 | 5/8 | provisional appraisal |
| PM3-SOP-3 | 2/1/1/0 | 4/8 | provisional appraisal |
| PM3-SOP-4 | 2/0/1/0 | 2/8 | provisional appraisal |
| PM3-SOP-TEA-TIMING-1 | 2/1/1/0 | 4/8 | provisional appraisal |
| PM3-LP-1 | 2/1/1/0 | 4/8 | provisional appraisal |
| PM3-LP-2 | 2/1/1/pending | No total | pending appraisal |

Five provisional appraisals; two incomplete. Detailed propositions, factor rationales, source identities, qualifications and three tracked assessment tasks are in [intervention-appraisals.json](intervention-appraisals.json). A score applies only to its stated endpoint; upstream iron absorption must not be relabelled dopamine improvement.

The current immutable registry accepts Finding/interpretive-constraint identities only. Intervention ownership needs a compatible extension before these appraisals can be pinned and presented in Section 4. No fake Finding IDs or new public panels have been introduced.

Darcey SOP wording was corrected to distinguish energy restriction versus baseline from the nonsignificant between-diet PET contrast. SF11 has a separate correction flag; its record and all historical SEC assessments remain unchanged. No principal intervention route follows from the unlike outcomes. Dietary-first placement remains editorial.

Validation: 50 focused tests passed; PM3 six-atom validation and MDX compilation passed; presentation contract passed across 691 protected files. No SEC registry diff. Browser correction check pending.

## References

- [Siegenberg et al. (1991)](https://doi.org/10.1093/ajcn/53.2.537).
- [Hurrell et al. (2003)](https://doi.org/10.1093/ajcn/77.5.1213).
- [Darcey et al. (2023)](https://doi.org/10.1172/jci.insight.169759).
- [Dunn et al. (2017)](https://doi.org/10.1002/oby.22023).
- [Ahmad Fuzi et al. (2017)](https://doi.org/10.3945/ajcn.117.161364).
- [Ando et al. (2024)](https://doi.org/10.1113/JP285173).
- [Volkow et al. (2012)](https://doi.org/10.1523/JNEUROSCI.0045-12.2012).
- [Volkow et al. (2008), replication check pending](https://doi.org/10.1523/JNEUROSCI.1443-08.2008).


## Integration update — 3 November 2026

Seven intervention-owned version-1 snapshots are now pinned from the canonical PM3 SOP/Lifestyle records. Five are provisional; two retain pending dimensions with three tracked Assessment gaps. No Finding score was inherited. All 103 pre-existing snapshots remain unchanged (110 total). Existing intervention status text now reports provisional/pending appraisal; no new public Section 4 panel was introduced.

Validation: 84 focused tests pass; presentation contract passes for 691 protected files. Three failures in the broader legacy integration harness reproduce with the ownership extension removed (HTML expectation, module test loader, and prebuild-command expectation). Production build remains in progress at this checkpoint. See food-reuse-dispositions.md for food-page screening and evidence boundaries.

## Latest validation checkpoint — 3 November 2026

Five provisional and two pending intervention assessments are stored and pinned. The 103 pre-existing snapshots remain protected; registry validation passes with 110 snapshots. Pending components are not zero-filled. Repeating Scite retrieval for Siegenberg returned abstract-only access restriction, not full methods.

The historical food-strategy fixture assumed that all other SOP content remained frozen at HEAD. It now checks every generated relationship against its exact canonical source (identity, proposition, limitation and evidence) while retaining PM2 retirement safeguards. All ten canonical integration tests pass.

Production build was stopped during client/server compilation when available disk fell to 248 MiB. This is an environment limitation, not a passing build or an established compilation regression. Log: /tmp/brain-pm3-sec-build-supported.log. No deployment, commit or push.
