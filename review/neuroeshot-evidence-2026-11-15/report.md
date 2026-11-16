# Neuroeshot evidence matrix — local review, 15 November 2026

Status: implemented and focused checks passed; not committed or published.
Working directory: `/Users/paulhouston/Documents/Codex/2026-10-22/we-x20/sync-recovery/phenome-preview-20261115`. Persistent source export, not a Git checkout; preserves prior local work. Original worktrees untouched.
Preview: http://127.0.0.1:3201/docs/recipes/snacks/neuroeshot-roe/

## Exact scoped files

- `docs/recipes/Snacks/neuroeshot.md`: approved quantities, preparation/source qualifications, ten-row six-column matrix immediately after Nutrition, historical sensory paragraph; removed contradictory assertion of quantified total choline from Brain Health Notes. Existing image, description, nutrition and RecipeFoods retained.
- `static/bibtex/BRAIN-diet.bib`: eleven deduplicated source entries; existing composition and PM references reused.
- `system/presentation-change-control.md`: records this one-page author-approved presentation, without changing shared components, PM templates, gates or baselines.
- `scripts/neuroeshot-evidence.test.mjs`: four focused tests.
- `review/neuroeshot-evidence-2026-11-15/report.md`: this evidence/validation record.
- `CURRENT-HANDOFF.md`: pointer to this checkpoint.

Runtime-only local output: `neuroeshot-preview.log` and development compilation cache. No production build or canonical mapping regeneration. Started Docusaurus directly to avoid the npm prestart mapping/QC generators; this is development inspection, not release validation.

## Composition and calculation

15 g salted chum-salmon roe (MEXT 10140), 7.5 ml raw lemon juice (USDA FDC 167747, existing portion conversion 7.7 g), 2 ml Tabasco-style sauce (FDC 174528, estimated 2 g).
Calculated recipe: 39.734 kcal; 4.94275 g protein; 2.37368 g fat; 0.5773 g carbohydrate; DHA 300 mg; EPA 240 mg; B12 7.05 µg; total folate 16.56 µg. The matrix explicitly attributes 15 µg folate to roe, not the whole recipe. Sodium remains unpublished because of sauce variation. No PC, astaxanthin, flavanone or capsaicin serving amount inferred.

## Evidence and canonical links

| Row | Composition | Primary biological evidence | Existing PM admission |
|---|---|---|---|
| DHA | MEXT 10140 | Liu 2014, labelled DHA in neonatal piglets | BRS1-FM3-PM7 / PM7-DIT-1 |
| EPA | MEXT 10140 | Barden 2014, human mixed omega-3 supplementation and selected plasma mediators | BRS3-FM3-PM8 / PM8-DIT-1 |
| PC | Existing 2018 marine-phospholipid review, correctly identified as secondary composition evidence | Böckmann 2023, human labelled choline metabolism | BRS1-FM2-PM6 / PM6-DIT-2, provision only |
| Astaxanthin | Yamaguchi 2012 roe extract identity | Rizzardi 2022, algal-derived extract in neuroblastoma cells | Research context, no new PM link |
| B12 | MEXT 10140 | Drennan 1994 bacterial enzyme structure; existing Froese 2019 review supplies human-pathway context | BRS2-FM1-PM1 / PM1-DIT-4 |
| Folate | MEXT 10140 | Evans 2004 bacterial methionine-synthase substrate domains; Froese 2019 human-pathway review | BRS2-FM1-PM1 / PM1-DIT-2 |
| Vitamin C | USDA FDC 167747 | Packer 1979 radical experiment | BRS3-FM2-PM6 / PM6-DIT-1 |
| Eriocitrin | Caristi 2003, lemon juice HPLC | Hiramitsu 2014, zebrafish/cell metabolic responses | Research context |
| Hesperidin | Caristi 2003, lemon juice HPLC | Morand 2011, orange-juice/control-drink crossover experiment | Research context |
| Capsaicin | Henquet 2016, Tabasco extract HPLC, sections 2.3/2.5 and Table 1 | Caterina 1997 TRPV1; Kawakami 2016 oral stimulation/fMRI | PM unassigned |

Kawakami methods: 20 healthy adults, 65 µM oral capsaicin; BOLD and fingertip-temperature responses, not neurotransmitter measurement. This experimental stimulus is not a measured dose for this sauce serving. Henquet's product measurement is not transferred to the recipe.
Heston historical source: Mike Hilleary's FLOOD interview, 3 November 2016, first question; Blumenthal recalls the 2007 chilli episode and discussion of perception. It does not verify a dopamine/endorphin measurement or a specific Heston brain-scan experiment. The text deliberately uses only the verified sensory account.

## Remaining qualifications

Astaxanthin, eriocitrin, hesperidin and capsaicin have no newly established PM admission; matrix labels research context/unassigned. PC quantity and molecular species in the salted roe are unresolved; its composition review is not represented as an independent primary assay. B12/folate structural sources are bacterial, explicitly qualified, not evidence of human meal-induced flux. No food/PM records, publication holds, SEC or ranking inputs changed. BRS2 PC routes were considered, but this compact row uses the directly verified choline-provision context rather than implying a completed methylation chain. No BRS3 PC admission was invented.

## Validation

- `node --test scripts/neuroeshot-evidence.test.mjs`: 4 passed, 0 failed. Checks quantities, arithmetic, six-column/ten-row structure, unique bibliography keys, existing PM routes, six canonical dietary atoms and research-context boundaries.
- `node --test --test-name-pattern='trout roe stays withdrawn|lemon juice' scripts/recipe-nutrition-integrity.test.mjs`: 1 passed, 56 intentionally skipped, 0 failed.
- Docusaurus local client compilation succeeded in 51.44 seconds. Existing undefined-tag and stale Browserslist warnings remain; no dependency changes.
- Browser: recipe title/image, formulation, rendered nutrition and all ten matrix rows observed. Desktop 1440×1000 and mobile 390×844 inspected. Existing table overflow is `auto`; mobile viewport 358 px table window over 894 px content. Horizontal scrolling to Source evidence and Limitation verified; no one-character columns. Desktop also requires modest horizontal scrolling because the normal documentation sidebar narrows the article.
- All eleven new bibliography DOM anchors present on the canonical references page.
- Existing RecipeFoods control remains rendered; no new components or global styling changes.

Review candidate only. No commit, push, merge, deployment, production build, broad regeneration, QC reactivation or scientific rescoring.

## Author-requested column refinement

Moved amounts into Substance / Amount and separated biological functions from experimental observations. DHA is 300 mg, EPA 240 mg, B12 7.05 µg and roe folate 15 µg; lemon-juice vitamin C is 2.98 mg rounded from the existing 2.9799 mg calculation. Other amounts explicitly remain not established. Experimental models/results moved into Source evidence, with original limitations retained. Five focused tests pass, including column separation and unchanged ingredient calculations. Recipe, focused test and presentation contract updated; no bibliography, PM or food record changes in this refinement.

## Owner-approved serving relevance, Neuroeshot only

Six columns restored with Substance as the second heading. Ingredient contributions: DHA 300 mg and EPA 240 mg each materially contribute to the shared 540 mg EPA+DHA total, contextualised once against EFSA's combined 250 mg/day adult AI; no independent EPA/DHA requirement or efficacy percentage. B12 7.05 µg ≈294% of existing 2.4 µg adult RDA; natural food folate 15 µg =15 µg DFE, 3.75% of 400 µg RDA; lemon-juice vitamin C 2.9799 mg ≈3.31% of the site's 90 mg adult-male reference. Female vitamin C RDA75 mg disclosed, as is the site's higher-sex-value convention. B12 is meaningful nutritional contribution, folate/C minor; no universal cutoff. PC, astaxanthin and flavanones retain unknown serving relevance. Capsaicin has documented sensory action but no measured serving response or systemic efficacy claim.

Four reference entries added (NIH ODS B12/folate/C and EFSA2010 fats opinion), checked against canonical bibliography for duplication. Existing composition, nutrition calculation, PM records and shared reference utility are unchanged. Six dedicated tests pass, including canonical arithmetic, separate study/function/amount columns and hypothesis/admission boundaries. Owner scope recorded in presentation contract; proposal schema remains unactivated. No shared relevance engine or global rule implemented.

## Compact paper presentation

Owner-approved native disclosures divide the ten rows 3/7: DHA/EPA/B12 versus PC, astaxanthin, folate, vitamin C, eriocitrin, hesperidin and capsaicin. Shortened functions, citation labels and limitations; evidence URLs, amounts and reference basis retained. Explicitly qualified the owner's Significant/Insignificant headings to avoid treating unknown exposure as evidence of no biological value or nutritional supply as proven BRS efficacy. Seven focused tests pass. Only recipe, test, presentation contract and this report changed in this refinement; no push.
