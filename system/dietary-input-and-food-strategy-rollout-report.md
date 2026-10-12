# Dietary-input decisions and food-related SOP rollout

## Implemented scope

Reviewed every existing structured PM input in BRS1–6, preserving the accepted input, biological role, evidence, limitation, relationship layer, upstream references and KC applicability. All 155 traceability atoms have an explicit boolean or flagged null, and PM pool/constraint references are No because they are not separate constituent supplies. Narrative-only and draft records were not promoted into admitted inputs.

| BRS | PMs read | Yes | No | Unset |
| --- | --- | --- | --- | --- |
| BRS1 | 11 | 34 | 9 | 7 |
| BRS2 | 7 | 32 | 20 | 1 |
| BRS3 | 8 | 11 | 6 | 0 |
| BRS4 | 9 | 7 | 5 | 0 |
| BRS5 | 8 | 24 | 11 | 3 |
| BRS6 | 8 | 1 | 0 | 0 |

Totals: 109 Yes, 51 No and 11 unset relationships, including 16 pool references. Five canonical pool IDs are represented once in the global report, retaining every dependent PM and constituent reference. Food-source material links are deduplicated by their existing canonical source IDs, not summed across BRS or PM appearances.

## Recorded decisions

Direct/Derived section admission normally supplies Yes. An absence of extra-intake responsiveness does not change that to No. Individually reviewed intracellular participants and endogenous products are No where their PM record does not admit dietary supply. Existing explicit dietary serine provision and the B5 nutritional CoA-precursor route remain Yes despite biochemical relationship layers; generated accounting now retains the dietary relationship separately from the biochemical role. Existing supported upstream constituent supply remains Yes; pools remain separate.

The eleven unresolved cases include the seven prior BRS1 entries (four PLP section/supply contradictions and three precursor/transport applicability questions) plus BRS2 PM1 methylcobalamin (reaction identity versus precursor dietary supply), and BRS5 PM1 butyrate, retinoic acid and glutamine, whose Direct admissions and limitations need reconciliation. No decision was defaulted to No for ambiguity. BRS2 PLP/product accounting remains explicitly flagged rather than counting dietary B6 and intracellular PLP as independent supplies. Canonical active-form identity gaps remain unresolved; general vitamin quantities are not substituted for specific active forms.

## Rendering and reproducibility

Food disclosures are enabled across BRS1–6 canonical PMs and attach only to admitted Yes entries with structured presentations. No/unset entries retain the sixth evidence field and biological context but do not generate food lists. The same scoped datasets power all index views, preparation filters and relationship checkboxes. New food identities, quantities or source equivalences were not invented.

`npm run mappings:all` rebuilds all six inventories, joins, review snapshots and the separate food-strategy rollup. `prestart` and `prebuild` perform this generation so oversized snapshots can stay outside Git without leaving broken imports. Generated browser snapshots are fallback data for older preview plugin sessions; current live plugin schema takes precedence.

## Food-related SOP rollup

Defined the contract in `system/food-strategy-rollup-schema.md` and projected 25 strategies across 27 independently admitted PM SOP relationships in 12 PMs. Scopes separate food preparation, dietary protocols, conditional supplementation, mixed food/timing and mixed food/behaviour. Repeated exact strategies preserve all PM roles, evidence and limitations. Pure breathing and meditation are excluded from this food-related projection; a Dietary input No does not admit an SOP.

The review page is `/docs/system/food-strategy-rollup`, hidden from navigation and sitemap and marked noindex. It retains original populations, tested combinations and evidence ceilings. Canonical food/substance joins not present on the SOP records are flagged, not guessed. There are no recipe quantities, conversion yields, requirement coverage claims or diet scores.

## Remaining data/documentation gaps

Some PMs have no accepted structured dietary inventory; this is not a scientific rejection. Form-specific canonical identities, some upstream supply-owner resolutions and food-source observations remain missing. BRS5's ten stale missing-substance markers remain reported against the now-resolving registry. These do not prevent other accepted mappings. Quinoa's held DHA observation remains excluded. Full details are in each scoped `gaps.generated.json` and the global `system/generated/dietary-input-rollout/rollout-report.json`.

## Verification

- 27 focused mapping/schema/filter/rollout/SOP tests pass.
- 11 composition-provenance checks pass.
- Scientific frontmatter preservation verified for all 51 PM records; evidence, roles, limitations and admission/ownership metadata are unchanged apart from the new explicit decision/strategy metadata. Audit: `system/generated/dietary-input-rollout/source-preservation-check.json`.
- Existing traceability suite remains 19/21 with its previously observed unrelated failures.
- Full TypeScript check retains existing site errors; no errors reported in the changed mapping/SOP components or disclosure helper.
- Changed TS/TSX files pass syntax parsing; scoped diff whitespace checks pass.
- Browser verification remains pending: the original preview hit the local open-file limit; the polling preview and production build were started but remained in compilation without a successful completion at handoff. No successful full-build or rendered PM-page verification is claimed.

Changes are local; no GitHub push or deployment was performed for this rollout.

## 5-MTHF correction

BRS2 PM1 5-MTHF is Yes: foods can directly provide preformed methylfolates as well as other folate forms entering endogenous conversion. Wang, Riedl and Schwartz (2010; PMID 20888309) supports five qualitative canonical food links (spinach, broccoli, kale, Swiss chard and cauliflower). No numeric composition values were copied or inferred from total folate. The canonical 5-MTHF page remains needed; its registry identity and PM link are present.
