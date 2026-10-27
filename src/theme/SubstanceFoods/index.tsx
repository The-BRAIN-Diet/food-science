import {useDoc} from '@docusaurus/plugin-content-docs/client'
import {resolveAggregateFoodSources} from '../../lib/aggregateFoodComposition.mjs'
import {AggregateSourceTable} from '../../components/AminoAcidComposition'
import React from "react"
import {canonicalFoodRelationships} from "@site/src/data/foodSubstanceRelationships.mjs"
import {substanceLabelsOverlap} from "@site/src/data/nutritionTableMapping"
import { usePluginData } from "@docusaurus/useGlobalData"
import Link from "@docusaurus/Link"
import styles from "../TagList/styles.module.css"

/**
 * Tag structure from Docusaurus
 */
interface Tag {
  label: string
  permalink?: string
}

/**
 * Document structure from category-listing plugin
 */
interface Document {
  title: string
  permalink: string
  description?: string
  order: number
  tags: Tag[]
  frontMatter: Record<string, unknown>
}

/**
 * Tag to document mapping from category-listing plugin
 */
type TagToDocMap = Record<string, Document[]>

/**
 * Props for SubstanceFoods component
 */
interface SubstanceFoodsProps {
  tag: string
  directOnly?: boolean
}

type SubstanceRelationship = {
  substance: string
  relationship: string
  input?: string
  process?: string
  description?: string
  citation_keys?: string[]
  source_url?: string
  substance_id?: string
  food_delivery_notes?: string
  evidence_material?: string
  chemical_form?: string
}

type FoodRelationship = {
  doc: Document
  edge: SubstanceRelationship
  edges?: SubstanceRelationship[]
}

function DocItemImage({ relationship }: { relationship: FoodRelationship }) {
  const {doc} = relationship
  return (
    <article key={doc.title} className="margin-vert--lg">
      <div className={styles.columns}>
        <div className={styles.left}>
          <img src={doc.frontMatter.list_image as string} className={styles.articleImage} />
        </div>
        <div className={styles.right}>
          <Link to={doc.permalink}>
            <h3>{doc.title}</h3>
          </Link>
          {doc.description && <p>{doc.description}</p>}
          {(relationship.edges || [relationship.edge]).filter(edge=>edge.food_delivery_notes).map((edge,index)=><details key={index}><summary>Composition &amp; delivery qualification</summary><p>{edge.evidence_material}. {edge.chemical_form}.</p><p>{edge.food_delivery_notes}</p>{edge.source_url && <Link to={edge.source_url}>Primary composition source</Link>}</details>)}

        </div>
      </div>
    </article>
  )
}

/**
 * SubstanceFoods component
 *
 * Lists foods with an explicit `substance_relationships` record for this substance.
 * A food tag alone is not a relationship and is not shown.
 */
export default function SubstanceFoods({ tag, directOnly = false }: SubstanceFoodsProps): React.ReactElement {
  const allTags = usePluginData("category-listing") as TagToDocMap
  const {frontMatter} = useDoc()
  const substance = frontMatter as any

  if (!tag) {
    return <div>Error: Substance tag is required</div>
  }

  // Get all documents and filter for foods
  const allDocs = Object.values(allTags).flat()
  const allFoods = allDocs.filter((doc: Document) => doc.permalink.includes("/foods/"))

  // Remove duplicates
  const uniqueFoods = Array.from(
    new Map(allFoods.map((doc: Document) => [doc.permalink, doc])).values()
  )

  if (substance.identity_type === 'defined-substrate-class') {
    const sources = uniqueFoods.flatMap(food => resolveAggregateFoodSources(food.frontMatter, substance, food.permalink));
    return <div className="bok-tag-list">{['plant','animal'].map(group => {
      const rows = sources.filter(s=>s.food_group===group).sort((a,b)=>b.aggregate_composition.eaa_g-a.aggregate_composition.eaa_g).slice(0,10);
      return <details key={group}><summary>{group==='plant'?'Plant-based':'Animal-based'} — {rows.length} composition-derived sources</summary>{rows.length?<AggregateSourceTable sources={rows}/>:<p>No complete, same-record constituent profile is available. Missing measurements do not mean nutrient absence.</p>}</details>;
    })}</div>;
  }
  const substanceFoods: FoodRelationship[] = []
  for (const food of uniqueFoods) {
    const explicit = Array.isArray(food.frontMatter.substance_relationships)
      ? (canonicalFoodRelationships(food.frontMatter) as unknown[])
          .filter((item): item is SubstanceRelationship => {
            if (!item || typeof item !== "object") return false
            const candidate = item as Partial<SubstanceRelationship>
            return (
              typeof candidate.substance === "string" &&
              typeof candidate.relationship === "string" &&
              (!directOnly || ["contains", "direct-food-occurrence"].includes(candidate.relationship)) &&
              (candidate.substance_id === substance.id || substanceLabelsOverlap(candidate.substance, tag))
            )
          })
      : []

    if (explicit.length) substanceFoods.push({doc: food, edge:explicit[0], edges:explicit})
  }

  // Sort by order, then by title
  substanceFoods.sort((a: FoodRelationship, b: FoodRelationship) => {
    const orderCompare = (a.doc.order || 0) - (b.doc.order || 0)
    if (orderCompare !== 0) return orderCompare
    return a.doc.title.localeCompare(b.doc.title)
  })

  if (substanceFoods.length === 0) {
    return (
      <div className="bok-tag-list">
        <em>{substance.food_delivery_assessment?.reason || (directOnly ? "No verified direct food-content relationships are recorded. See upstream dietary pathways separately." : "No verified food-composition relationship is currently recorded; this does not determine scientific admission.")}</em>
      </div>
    )
  }

  return (
    <div className="bok-tag-list">
      <details>
        <summary
          style={{
            cursor: "pointer",
            fontWeight: "normal",
            padding: "0.5rem 0",
            userSelect: "none",
            listStyle: "none",
            color: "var(--ifm-color-primary)",
            transition: "color 0.2s, text-decoration 0.2s",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--ifm-color-primary-dark)"
            e.currentTarget.style.textDecoration = "underline"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--ifm-color-primary)"
            e.currentTarget.style.textDecoration = "none"
          }}
        >
          {substanceFoods.length} food{substanceFoods.length !== 1 ? "s" : ""}
        </summary>
        <div style={{ marginTop: "1rem" }}>
          {substanceFoods.map((relationship: FoodRelationship, index: number) => (
            <DocItemImage
              key={`${relationship.doc.permalink}-${relationship.edge.relationship}-${index}`}
              relationship={relationship}
            />
          ))}
        </div>
      </details>
    </div>
  )
}


