# Cross-BRS Dependency Page Schema

Canonical authoring contract for pages in `docs/biological-targets/dependencies/`.

**Exemplar:** `docs/biological-targets/dependencies/brs2-to-brs1.md`  
**Cursor rule:** `docs/biological-targets/.cursor/rules/Cross-BRS-Dependency-Pages.mdc`  
**Generator:** `scripts/generate-brs-dependency-pages.mjs` (must not restore the retired three-paragraph template)

Hub Cross-BRS **dropdowns** remain short pointers with an Open link. They must not paste a second copy of this page. See `system/brs-hub-levers-schema.md`.

---

## Principle

> A Cross-BRS dependency page documents the specific biological capacity, signal, substrate, condition or constraint transmitted between two systems. It must not repeat the full purpose, Functional Mechanisms or general regulatory role of either BRS. Source and receiving systems should be identified briefly and linked to their canonical hub pages.

Cross-BRS pages explain only:

- what crosses the system boundary;
- how it reaches or constrains the receiving system;
- whether the route is direct, mediated or conditional;
- why the dependency matters;
- what evidence supports it;
- where the interpretation remains uncertain.

They must not function as secondary BRS hub pages and must not duplicate PM §6.2 relationship graphs.

## Rules

- Do not reproduce generic descriptions of the source BRS.
- Do not reproduce generic descriptions of the receiving BRS.
- Do not list all Functional Mechanisms merely because they belong to either system.
- Include only mechanisms that materially participate in the named dependency.
- Name actual molecules, pathways, signals or operating conditions wherever possible.
- Identify mediated routes explicitly—for example, `BRS2 → BRS3 → BRS1`.
- Distinguish established biochemistry from framework interpretation.
- Do not infer clinical benefit from a mechanistic relationship.
- Link outward to canonical BRS, FM, PM and substance pages for detail.
- Keep the page concise.
- Do not use the absence of a current PM to silently expand the implemented BRS architecture. Future-development biology (for example BRS2 nucleotide synthesis and DNA synthesis/repair) must not become a principal route until a later version introduces and validates the relevant mechanisms.

Target approximately **300–500 words excluding references and any compact table**. Some relationships require less. Do not lengthen a page merely to fill the template.

## Retired boilerplate

Do not restore:

- separate generic sections titled **Biological Contribution**, **Systems Significance** and **Integrated Regulatory Capacity** when they repeat the same point in different language;
- “Collectively, the Functional Mechanisms within…”;
- “maintain adaptive capacity”;
- “under prolonged physiological demand”;
- “as metabolic demand intensifies”;
- “preserving the biological environment”;
- “integrated regulatory capacity”;
- “wider regulatory capacity”;
- generic allostatic language that does not clarify the specific dependency;
- claims about “rate-limiting constraints” without direct evidence.

## Page structure

```markdown
# BRSx → BRSy — Specific Dependency Name

One sentence identifying the dependency and its direction.

## Dependency

One concise paragraph: what originates in the source BRS; which receiving-BRS function it enables, modifies or constrains.

## Principal Routes

| Route | Contribution to the receiving BRS | Relationship |
| --- | --- | --- |
| Named pathway or resource | Specific receiving-system function | Direct, mediated or conditional |

Include only genuine routes. Do not populate a minimum number of rows.

## Network Interpretation

How the routes converge; whether an intermediate BRS is involved; why the relationship matters at systems level.

Optional page-specific cascade or boundary notes may follow here when they name a real mediated path (for example Cascade 6). Do not add generic extra sections.

## Boundary and Evidence Status

What the page does not establish; which parts are framework interpretation; whether clinical validation is absent.

## Supporting Evidence

Short list of references with restrained annotations stating exactly what each source supports.
```

## BH4

Tetrahydrobiopterin is not a BRS2 resource pool and is not synthesised by the folate or methionine cycles. Do not list BH4 as a BRS2 → BRS1 principal route. Link the [BH4 substance page](/docs/substances/bioactive-compounds/endogenous-cofactors/tetrahydrobiopterin).
