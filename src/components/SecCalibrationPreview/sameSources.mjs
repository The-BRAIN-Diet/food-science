export const sameCuratedReferences = [
  {
    "database": "Rhea",
    "accession": "RHEA:21080",
    "title": "L-methionine + ATP + water = S-adenosyl-L-methionine + phosphate + diphosphate",
    "href": "https://www.rhea-db.org/rhea/21080",
    "scope": "Reaction identity; not dietary responsiveness.",
    "anchor": "same-curated-1",
    "label": "C1",
    "accessed": "2026-10-18"
  },
  {
    "database": "Reactome",
    "accession": "R-HSA-5603114",
    "title": "MAT2B:MAT2A:K+:2Mg2+ transfers Ado from ATP to L-Met",
    "href": "https://reactome.org/content/detail/R-HSA-5603114",
    "scope": "Human reaction and catalytic participants; no claim about dietary control of flux.",
    "anchor": "same-curated-2",
    "label": "C2",
    "accessed": "2026-10-18"
  },
  {
    "database": "UniProt",
    "accession": "P31153",
    "title": "S-adenosylmethionine synthase isoform type-2 (human MAT2A)",
    "href": "https://www.uniprot.org/uniprotkb/P31153/entry",
    "scope": "Entry version 237; reaction and magnesium/potassium annotations. Individual annotation evidence varies.",
    "anchor": "same-curated-3",
    "label": "C3",
    "accessed": "2026-10-18"
  },
  {
    "database": "UniProt",
    "accession": "Q99707",
    "title": "Methionine synthase (human MTR)",
    "href": "https://www.uniprot.org/uniprotkb/Q99707/entry",
    "scope": "Entry version 230; folate/cobalamin-dependent methionine regeneration.",
    "anchor": "same-curated-4",
    "label": "C4",
    "accessed": "2026-10-18"
  },
  {
    "database": "UniProt",
    "accession": "Q93088",
    "title": "Betaine-homocysteine S-methyltransferase 1 (human BHMT)",
    "href": "https://www.uniprot.org/uniprotkb/Q93088/entry",
    "scope": "Entry version 211; betaine-to-homocysteine methyl transfer, mainly hepatic/renal context.",
    "anchor": "same-curated-5",
    "label": "C5",
    "accessed": "2026-10-18"
  },
  {
    "database": "Reactome",
    "accession": "R-HSA-6798163",
    "title": "Choline catabolism",
    "href": "https://reactome.org/content/detail/R-HSA-6798163",
    "scope": "Multistep choline-to-betaine pathway; CHDH alone does not complete oxidation.",
    "anchor": "same-curated-6",
    "label": "C6",
    "accessed": "2026-10-18"
  }
];
const byAtom = {"PM3-DIT-1":[0,1,2],"PM3-DIT-2":[0,1,2],"PM3-DIT-3":[1,2],"PM3-DIT-4":[1,2],"PM3-KC1-UPSTREAM-1":[3],"PM3-KC1-UPSTREAM-2":[4],"PM3-KC1-UPSTREAM-3":[4,5]};
export function sameSourcesFor(atomId) { return (byAtom[atomId] || []).map(index => sameCuratedReferences[index]); }
