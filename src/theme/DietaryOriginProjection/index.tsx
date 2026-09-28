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
  transformationLabel?: string
}

type Evidence = {
  citationKeys: string[]
  findingIds: string[]
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

export default function DietaryOriginProjection({
  target,
  pmId,
  transformationLabel = "microbial fermentation",
}: DietaryOriginProjectionProps): React.ReactElement {
  const data = usePluginData("ontology-projection") as OntologyData
  const projection = buildDietaryOriginProjection(data?.docs || [], {target, pmId})

  if (!projection || !projection.pathways.length) {
    return (
      <p className="dietary-origin-projection__empty">
        No canonical upstream dietary relationships are currently available.
      </p>
    )
  }

  return (
    <section className="dietary-origin-projection" aria-label={`Dietary origin of ${target}`}>
      <h3>Supports microbial production</h3>
      <div className="dietary-origin-projection__grid">
        {projection.pathways.map((pathway) => {
          const atom = pathway.atom
          const limitation = atom.evidence_limitation
          const fermentationTitle = [atom.biological_role, limitation].filter(Boolean).join(" ")
          return (
            <article className="dietary-origin-pathway" key={atom.atom_id}>
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
                        className="dietary-origin-edge dietary-origin-edge--food"
                        title={food.edge.sourceNote}
                      >
                        ↓ provides {food.edge.inputLabel}
                      </span>
                    </div>
                  ))}
                </div>
              ) : null}

              <Link
                className="dietary-origin-node dietary-origin-node--substrate"
                to={pathway.substrateHref}
                title={atom.biological_role}
              >
                {atom.input}
              </Link>

              <span
                className="dietary-origin-edge dietary-origin-edge--fermentation"
                title={fermentationTitle}
              >
                ↓ {transformationLabel}
              </span>

              <span className="dietary-origin-node dietary-origin-node--target" aria-current="page">
                {target}
              </span>

              <details className="dietary-origin-pathway__evidence">
                <summary>Relationship evidence</summary>
                <dl>
                  <dt>Input</dt>
                  <dd>{atom.input}</dd>
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
                  <dt>Relationship metadata</dt>
                  <dd>
                    {pathway.relationshipMetadata.bridgeClassification
                      ? `${pathway.relationshipMetadata.bridgeClassification} → ${pathway.relationshipMetadata.derivedTarget}`
                      : pathway.relationshipMetadata.relationshipLayer}
                    {pathway.relationshipMetadata.kcMembershipStatus
                      ? `; KC membership: ${pathway.relationshipMetadata.kcMembershipStatus}`
                      : ""}
                  </dd>
                </dl>
                {pathway.foods.length ? (
                  <>
                    <h4>Food → dietary input provenance</h4>
                    <ul>
                      {pathway.foods.map((food) => (
                        <li key={`${food.permalink}:provenance:${food.edge.key}`}>
                          <Link to={food.permalink}>{food.title}</Link> → provides{" "}
                          {food.edge.inputLabel}: {food.edge.sourceNote}
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
    </section>
  )
}
