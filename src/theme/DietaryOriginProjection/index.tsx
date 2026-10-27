import React from "react"
import Link from "@docusaurus/Link"
import {usePluginData} from "@docusaurus/useGlobalData"
import {buildDietaryOriginProjection} from "@site/src/data/dietaryOriginProjection.mjs"

type OntologyData = {
  docs?: Array<Record<string, unknown>>
}

type DietaryOriginProjectionProps = {
  target: string
  pmId: string
}

type Evidence = {
  citationKeys: string[]
  findingIds: string[]
}

type FoodEdge = {
  relationship: string
  classification: string
  inputLabel: string
  sourceNote: string
  preparation?: string | null
  presence?: string | null
  limitation?: string | null
}

type FoodNode = {
  title: string
  permalink: string
  edge: FoodEdge
}

function EvidenceLinks({evidence, pmHref}: {evidence: Evidence; pmHref: string}) {
  const items = [
    ...evidence.citationKeys.map((key) => ({
      key: `citation:${key}`,
      label: key,
      href: `/docs/papers/BRAIN-Diet-References#${key}`,
    })),
    ...evidence.findingIds.map((id) => ({
      key: `finding:${id}`,
      label: id,
      href: pmHref,
    })),
  ]
  if (!items.length) return <span>Not separately recorded</span>
  return (
    <>
      {items.map((item, index) => (
        <React.Fragment key={item.key}>
          {index > 0 ? ", " : ""}
          <Link to={item.href}>{item.label}</Link>
        </React.Fragment>
      ))}
    </>
  )
}

function foodEdgeTitle(food: FoodNode) {
  return [
    "Direct food composition of the substrate. This is not a butyrate quantity.",
    food.edge.preparation ? `Preparation: ${food.edge.preparation}` : "",
    food.edge.presence ? `Presence: ${food.edge.presence}` : "",
    food.edge.sourceNote,
    food.edge.limitation,
  ]
    .filter(Boolean)
    .join(" ")
}

export default function DietaryOriginProjection({
  target,
  pmId,
}: DietaryOriginProjectionProps): React.ReactElement {
  const data = usePluginData("ontology-projection") as OntologyData
  const projection = buildDietaryOriginProjection(data?.docs || [], {target, pmId})

  if (!projection) {
    return (
      <p className="dietary-origin-projection__empty">
        No canonical upstream dietary relationships are currently available.
      </p>
    )
  }

  return (
    <section className="dietary-origin-projection" aria-label={`Dietary origin of ${target}`}>
      <h3>Direct food content</h3>
      {projection.directFoodContent.length ? (
        <ul className="dietary-origin-direct-foods">
          {projection.directFoodContent.map((food) => (
            <li key={food.permalink}>
              <Link to={food.permalink}>{food.title}</Link>
              {food.edge.quantity ? ` — ${food.edge.quantity}${food.edge.unit ? ` ${food.edge.unit}` : ""}` : ""}
            </li>
          ))}
        </ul>
      ) : (
        <>
          <p>
            <strong>No verified direct food-content records currently available.</strong>
          </p>
          <p>
            A missing composition record does not establish that foods contain no {target}.
          </p>
        </>
      )}

      <h3>Upstream microbial production</h3>
      {projection.product && projection.product.admittedDietaryRequirement === false ? (
        <p>
          On{" "}
          <Link to={projection.pm.permalink}>{projection.pm.title}</Link>, {target} is recorded as{" "}
          {projection.product.inputType.toLowerCase()} with dietary input {projection.product.dietaryInputLabel}.
          That record does not admit {target} as a dietary requirement.
        </p>
      ) : null}

      {projection.pathways.length ? (
        <div className="dietary-origin-projection__grid">
          {projection.pathways.map((pathway) => {
            const atom = pathway.atom
            const limitation = atom.evidence_limitation
            const fermentationTitle = [atom.biological_role, limitation].filter(Boolean).join(" ")
            return (
              <article
                className="dietary-origin-pathway"
                key={atom.atom_id}
                data-butyrate-specificity={pathway.conversion.butyrateSpecificity}
              >
                {pathway.foods.length ? (
                  <div className="dietary-origin-pathway__foods">
                    {pathway.foods.map((food) => (
                      <div
                        className="dietary-origin-pathway__food-edge"
                        key={`${food.permalink}:${food.edge.key}`}
                      >
                        <Link className="dietary-origin-node dietary-origin-node--food" to={food.permalink}>
                          {food.title}
                        </Link>
                        <span
                          className="dietary-origin-edge dietary-origin-edge--direct"
                          title={foodEdgeTitle(food)}
                        >
                          ↓ direct composition: contains {food.edge.inputLabel}
                          {food.edge.preparation ? ` (${food.edge.preparation})` : ""}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="dietary-origin-pathway__gap">No canonical food-source relationship is recorded.</p>
                )}

                {pathway.provisionalNotes.length ? (
                  <div className="dietary-origin-provisional">
                    <p>Composition notes that are not verified pathways</p>
                    <ul>
                      {pathway.provisionalNotes.map((note) => (
                        <li key={`${note.permalink}:${note.label}`}>
                          <Link to={note.permalink}>{note.title}</Link>
                          {note.status ? ` — ${note.status}` : ""}. {note.limitation} {note.sourceNote}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {pathway.substrateHref ? (
                  <Link
                    className="dietary-origin-node dietary-origin-node--substrate"
                    to={pathway.substrateHref}
                    title={atom.biological_role}
                  >
                    {atom.input}
                  </Link>
                ) : (
                  <span className="dietary-origin-node dietary-origin-node--substrate" title={atom.biological_role}>
                    {atom.input}
                  </span>
                )}
                {pathway.identityStatus !== "resolved" ? (
                  <p className="dietary-origin-pathway__gap">
                    This substrate is not linked because its identity on this record is unresolved. No food relationship
                    is added in its place.
                  </p>
                ) : null}

                <span
                  className="dietary-origin-edge dietary-origin-edge--derived"
                  title={fermentationTitle}
                  data-relationship-classification="derived"
                >
                  ↓ {pathway.conversion.label}
                </span>

                <span className="dietary-origin-node dietary-origin-node--target" aria-current="page">
                  {target}
                </span>

                <details className="dietary-origin-pathway__evidence">
                  <summary>Relationship evidence</summary>
                  <dl>
                    <dt>Input</dt>
                    <dd>
                      {atom.input}
                      {pathway.identityStatus !== "resolved" ? ` (identity ${pathway.identityStatus})` : ""}
                    </dd>
                    <dt>Input type</dt>
                    <dd>{atom.input_type}</dd>
                    <dt>Biological role</dt>
                    <dd>{atom.biological_role}</dd>
                    <dt>Evidence source</dt>
                    <dd>
                      <EvidenceLinks evidence={pathway.evidence} pmHref={projection.pm.permalink} />
                    </dd>
                    {limitation ? (
                      <>
                        <dt>Limitation</dt>
                        <dd>{limitation}</dd>
                      </>
                    ) : null}
                    <dt>Dietary input</dt>
                    <dd>
                      {pathway.relationshipMetadata.dietaryInput}
                      {pathway.relationshipMetadata.dietaryInputNote
                        ? `. ${pathway.relationshipMetadata.dietaryInputNote}`
                        : ""}
                    </dd>
                    <dt>Relationship to {target}</dt>
                    <dd>
                      Derived microbial conversion
                      {pathway.relationshipMetadata.typeLabel
                        ? `. Recorded PM classification: ${pathway.relationshipMetadata.typeLabel}, ${pathway.relationshipMetadata.requirementClassification}`
                        : ""}
                      . This does not assign a {target} quantity to the food.
                    </dd>
                  </dl>
                  {pathway.foods.length ? (
                    <>
                      <h4>Food → substrate provenance</h4>
                      <ul>
                        {pathway.foods.map((food) => (
                          <li key={`${food.permalink}:provenance:${food.edge.key}`}>
                            <Link to={food.permalink}>{food.title}</Link> contains {food.edge.inputLabel}
                            {food.edge.preparation ? ` (${food.edge.preparation})` : ""}: {food.edge.sourceNote}
                            {food.edge.limitation ? ` ${food.edge.limitation}` : ""}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                </details>
              </article>
            )
          })}
        </div>
      ) : (
        <p className="dietary-origin-projection__empty">
          No canonical upstream dietary relationships are currently available.
        </p>
      )}
    </section>
  )
}
