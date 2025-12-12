# Project Structure

The `docs` directory is split into several key subsections:

## Tagging

- Don't _ever_ create lists of say foods, substances or targets. Instead, tag the group of them and add the tag to `tags.yml` and use the `<DocList />` react component. For example, for a list of vegan foods, do this:

```
<DocList tag="Vegan" filter="foods" />  // you can omit folder attribute if you want a list of everything tagged "Vegan".
```

- Each substance, food, target etc. should have its own tag. e.g Pork.md should be tagged with Pork.

## Directory Structure

- `biological-targets`
- `foods`
- `interventions`
- `papers`
- `partners`
- `recipes`
- `substances`
  - `nutrients` (Essential + Classical)
    - `macronutrients` (amino acids, fatty acids, phospholipids)
    - `micronutrients` (vitamins, minerals)
  - `bioactive-compounds` (Non-Essential, Functional)
    - `polyphenols` (flavonoids, secoiridoids, phenolic acids, etc.)
    - `carotenoids`
    - `terpenes`
    - `lipid-based`
    - `alkaloids`
    - `choline-methylation`
  - `microbial-metabolites` (Postbiotic Layer)
    - `scfas`
    - `secondary-plant-conversions`
- `symptoms`
- `therapeutic-areas`
- `training`

Make sure to add content to the right area: for example, if you're writing about new a food for ADHD, don't add it as a section in the ADHD article. Instead, create a new document in the `foods` folder and tag it with substances it contains and then make sure that those substances are related to the biological targets of ADHD. i.e. Use the tags to create the structure, make sure each document only talks about one thing and that the document is in the right folder.

## Causality

- `Recipes` contain foods, and should be tagged with the food they contain. e.g. `Spaghetti Bolognese` could be tagged with `Parmesan Cheese`.
- `Foods` contain substances, and therefore should be tagged with substances. `Parmesan Cheese` should be tagged with `Calcium`.
- `Substances` can support `Biological Targets` and should be tagged with them. e.g. `Folate (B9)` supports `Methylation`.
- `Biological Targets` are disrupted in certain therapeutic areas. `Methylation` should therefore be tagged with `ADHD`.

## Referencing

Make sure all assertions are backed up by evidence from the paper.txt file in the root directory. Use references if the paper mentions them.

All the references in there are contained in the `static/bibtex/Brain-diet.bib` file. For example, to reference `agarwal_association_2023` from that file in a markdown document, you refer to it like this: `/docs/papers/BRAIN-Diet-References#agarwal_association_2023`. This page is a special react component that expands all references.

## Formatting

- Don't include less-than symbols, escape these to &lt; otherwise it breaks the docusaurus markdown parser.
