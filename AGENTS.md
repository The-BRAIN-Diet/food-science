# Project Structure

The `docs` directory is split into several key subsections:

## Tagging

- Don't _ever_ create lists of say foods, substances or targets. Instead, tag the group of them and add the tag to `tags.yml` and use the `<DocList />` react component. For example, for a list of vegan foods, do this:

```
<DocList tag="Vegan" folder="foods" />  // you can omit folder attribute if you want a list of everything tagged "Vegan".
```

## Directory Structure

- `biological-targets`
- `foods`
- `interventions`
- `papers`
- `partners`
- `recipes`
- `substances`
  - `bioactive-substances`
  - `metabolites`
  - `nutrients`
- `symptoms`
- `therapeutic-areas`
- `training`

Make sure to add content to the right area: for example, if you're writing about new a food for ADHD, don't add it as a section in the ADHD article. Instead, create a new document in the `foods` folder and tag it with substances it contains and then make sure that those substances are related to the biological targets of ADHD. i.e. Use the tags to create the structure, make sure each document only talks about one thing and that the document is in the right folder.

## Referencing

Make sure all assertions are backed up by evidence from the paper.txt file in the root directory. Use references if the paper mentions them.

All the references in there are contained in the `static/bibtex/Brain-diet.bib` file. For example, to reference `agarwal_association_2023` from that file in a markdown document, you refer to it like this: `/docs/papers/BRAIN-Diet-References#agarwal_association_2023`. This page is a special react component that expands all references.

## Formatting

- Don't include less-than symbols, escape these to &lt; otherwise it breaks the docusaurus markdown parser.
