# Corrected top-ten release gate

**HOLD** against GitHub main `ca3183b1bdeb32a0d552d63219ceac5022111225`. The corrected local ranking, Explorer and Wheel reproduced independently. The two candidate parity tests passed for 1,005 ranked connections, 112/156 targets and 79 ranked foods. The recorded frozen ranking and Wheel HTML hashes matched after the run.

All 36 mismatches were compared to the recovered exact approved file bytes and to main. No candidate file in that set is byte-identical to main. Prior scientific decisions can be adopted as a release batch. An approval to implement locally does not by itself register the new file for publication.

| Release scope | Files with changed observations | Qualification |
|---|---|---|
| Tyrosine | anchovies, beef, butter, chicken, clams, cod, egg-yolks, eggs, ghee, herring, lamb, liver, mackerel, milk, mussels, oysters, pork, salmon, sardines, scallops, shrimp, tuna, turkey | 23 existing USDA panel imports. Exact food and preparation matching documented in the saved source audit. |
| Pectin | apples, lemon, oranges | Qualitative, tissue- and cultivar-specific. Retain the citrus boundary and separate studied preparation. |
| Sulforaphane | broccoli | Preparation-dependent broccoli formation only. |
| Fructans / FOS / RFO | chicory-root, garlic, jerusalem-artichokes, onions | Keep separated analytes, report white-onion combined measurement only at its original scope. |
| Glutamine | beef, eggs, tofu | Eggs: 0.559 g per 100 g sequence-derived estimate of protein-bound residues; beef/tofu occurrence only. |
| Betaine | shrimp, spinach | Canned shrimp 245.99 mg and raw spinach 674.52 mg per 100 g, distinct from raw shrimp and frozen spinach ranking panels. |
| Mature soybeans | soy | Preserve raw, cooked and flour forms. Inspect the three-panel presentation separately. |
| Acetic acid | vinegar-pickles, vinegar | Cider vinegar and vinegar-brined pickles: presence only. No concentration for the edible pickle; FDA vinegar guidance is not a measurement of either food. |

Beef liver also has the approved title change. Previously approved glycine entries and existing beef holds are already in the approved source bytes. Pears is an additional input absent from the publication manifest; it does not appear in the 36 mismatch count. Include its source explicitly in any release decision.

Independent release blockers: 56 frozen input fingerprint mismatches; one changed recovery fingerprint (generated Explorer data); four presentation approvals (NutritionTable, SubstanceFoods, soy and acetic-acid); baseline mechanism failures (9 FM, 46 PM, 4 SM). The comparison recorded 42 changed PM fields for review. Production stopped at prebuild. All configured scope checks, nutrition, dietary governance, SEC, Findings, bibliography, focused tests and ledger checks passed.

[Per-file hashes and field comparisons](publication-source-review.json) · [Gate checks](checks.json) · [Corrected candidate regeneration](corrected-candidate.log)
