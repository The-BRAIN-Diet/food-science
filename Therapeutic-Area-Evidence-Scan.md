# Therapeutic Area Existing-System Evidence Scan

**Generated:** 2026-09-28T15:24:16.839Z
**Policy:** Repository-only V1 scan; no fresh literature search.
**Scope:** ADHD, Anxiety Disorders, Depressive Disorders

This is a migration inventory, not a new scientific review. Wording in source
occurrences is preserved in the JSON dataset and may be unsupported, duplicated, or
too strong. Inclusion in the scan does not mean inclusion on a V1 page.

## 1. Files and data sources searched

- 704 text sources across `docs`, `system`, `scripts/data`, `src/data`, `manuscript` and `paper.txt`
- BRS hubs; FM/PM/SM/KC pages; dependency cascades; Phenome data; substances;
  foods; dietary foundations; legacy TA pages; structured script data; system
  standards; manuscript text
- Master bibliography was treated as the citation authority during validation rather
  than as condition evidence.
- Binary manuscript files were inventoried by location but were not parsed; generated
  website sources remain authoritative.

Full paths are in `scripts/out/therapeutic-area-evidence-scan.json#filesSearched`.

## 2. Findings recovered for each condition

| TA | Condition | Candidate occurrences | Source files |
|---|---|---:|---:|
| TA001 | ADHD | 706 | 171 |
| TA002 | Anxiety Disorders | 109 | 54 |
| TA003 | Depressive Disorders | 133 | 42 |

Occurrences are source blocks, not unique studies.

## 3. Coverage by BRS, FM, PM and Phenome

Coverage below is the scientifically accepted V1 subset, not keyword-derived
candidate coverage. Raw candidate identifiers remain available in the JSON report.

### ADHD

- Accepted claim mappings: 10
- BRS: BRS1, BRS2, BRS3, BRS4, BRS5, BRS6
- FM identifiers: BRS1(FM1), BRS1(FM4), BRS2(FM1), BRS3(FM2), BRS4(FM1), BRS4(FM3), BRS5(FM1), BRS5(FM2), BRS5(FM3), BRS6(FM2)
- PM identifiers: BRS1-FM1-PM1, BRS1-FM4-PM8, BRS2-FM1-PM1, BRS3-FM2-PM4, BRS3-FM2-PM6, BRS4-FM1-PM1, BRS4-FM3-PM6, BRS5-FM1-PM3, BRS5-FM2-PM4, BRS5-FM3-PM7, BRS6-FM2-PM4
- Phenomes: PH001, PH003, PH004, PH006, PH011, PH015

### Anxiety Disorders

- Accepted claim mappings: 3
- BRS: BRS1, BRS3, BRS5
- FM identifiers: BRS1(FM1), BRS3(FM3), BRS5(FM3)
- PM identifiers: BRS1-FM1-PM5, BRS3-FM3-PM7, BRS5-FM3-PM7
- Phenomes: PH016, PH018

### Depressive Disorders

- Accepted claim mappings: 5
- BRS: BRS1, BRS3, BRS6
- FM identifiers: BRS1(FM1), BRS3(FM3)
- PM identifiers: BRS1-FM1-PM5, BRS3-FM3-PM7
- Phenomes: PH003, PH006, PH017, PH018

## 4. Duplicate and conflicting claims

- 10 exact-normalised duplicate group(s) are recorded in
  `duplicateGroups`.
- Directional, null and contradictory/mixed source blocks are retained. Automated
  direction labels are triage aids and require scientific adjudication.
- Known high-priority conflicts include non-uniform GABA findings, null antioxidant
  status findings, and short-lived tyrosine response. These must remain visible.

## 5. Unsupported or untraceable claims

Every occurrence with `missing-or-unparsed-citation` is a review candidate, not an
accepted evidence record. Food-page ADHD benefit language and broad legacy TA
statements require particular review.

## 6. Missing citations or identifiers

The JSON report records citation keys plus inferred BRS/FM/PM/Phenome IDs for every
occurrence. Missing identifiers are not guessed. Identifier and BibTeX resolution are
enforced separately by `npm run ta:validate`.

## 7. Material suitable for immediate V1 inclusion

- Six BRS ADHD Therapeutic Area Research tables and their explicit limitations
- Reviewed PM Phenome mappings and Scientific Findings
- PH016–PH018 anxiety/depression extension records with inferential boundaries
- Copper, glutathione and tetrahydrobiopterin substance TA panels
- Traceable direct dietary/lifestyle trials already present on legacy pages
- Cross-BRS dependency pages where direct and inferred cascade steps are separated

## 8. Evidence requiring scientific review before inclusion

- Uncited or weakly qualified food-page condition claims
- Legacy tag-matrix claims that do not resolve to current biological-target tags
- Walsh/Cu:Zn biotype prose
- Non-condition trials mapped inferentially to PH016 or PH017
- Condition mentions in substance highlights without a reviewed TA panel

## 9. Gaps requiring later targeted literature search

- Anxiety and depression evidence outside the currently concentrated BRS1/BRS3 map
- Direct tests of complete cross-BRS cascades
- Dietary-pattern, food-matrix and meal-timing evidence with mechanism measures
- Biomarker-defined subgroups, life-stage effects and replicated target engagement
- Direct Phenome outcome measures rather than construct substitution

## 10. Generated V1 pages

The internal pages are generated from the reviewed canonical registry:

- `docs/therapeutic-areas/adhd.mdx`
- `docs/therapeutic-areas/anxiety-disorders.mdx`
- `docs/therapeutic-areas/depressive-disorders.mdx`

They remain excluded from publication pending scientific review and targeted
literature work.
