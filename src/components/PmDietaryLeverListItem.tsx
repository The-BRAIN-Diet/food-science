import React, { Children, isValidElement, type LiHTMLAttributes, type ReactNode } from "react";
import { useLocation } from "@docusaurus/router";
import { usePluginData } from "@docusaurus/useGlobalData";
import generatedScopes from "@site/src/data/inputMappingScopes.mjs";
import { canonicalInputSection, selectBrsReviewData } from "@site/src/data/inputSubstanceFoodSelection.mjs";
import { parseLeverBullet } from "@site/src/lib/dietaryLeverDisclosure";

type FoodSource = {
  food_id?: string;
  food_title?: string;
  food_page?: string;
  material?: string;
  food_matrix?: string;
  product?: string;
  species?: string;
  preparation?: string;
  observations?: Array<{
    display?: string;
    basis?: string;
    limitations?: string;
    high?: number;
    low?: number;
    value?: number;
  }>;
};

type MappingData = {
  scopes?: Record<string, unknown>;
  relationships?: any[];
  food_sources?: FoodSource[];
};

function textFromChildren(children: ReactNode): string {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") return String(child);
      if (isValidElement<{ children?: ReactNode }>(child)) return textFromChildren(child.props.children);
      return "";
    })
    .join("");
}

const norm = (value: unknown) => String(value || "").toLowerCase().replace(/\s+/g, " ").trim();

function isProbablyAnimalSource(source: FoodSource): boolean {
  const value = norm([
    source.food_id,
    source.food_title,
    source.material,
    source.food_matrix,
    source.product,
    source.species,
  ].filter(Boolean).join(" "));
  return /\b(anchov|beef|chicken|clam|cod|crab|duck|egg|fish|liver|mackerel|meat|milk|mussel|oyster|pork|poultry|salmon|sardine|scallop|seafood|shellfish|shrimp|tuna|turkey|whey|yolk)\b/.test(value);
}

function strongestAmount(source: FoodSource): number {
  const values = (source.observations || [])
    .flatMap((observation) => [observation.high, observation.low, observation.value])
    .map((value) => Number(value))
    .filter(Number.isFinite);
  return values.length ? Math.max(...values) : -Infinity;
}

function sortSources(sources: FoodSource[]): FoodSource[] {
  return [...sources]
    .sort((a, b) => strongestAmount(b) - strongestAmount(a) || String(a.food_title).localeCompare(String(b.food_title)))
    .slice(0, 5);
}

function formatFoodAmount(source: FoodSource): string {
  const observation = (source.observations || [])[0];
  if (!observation?.display) return "quantity not established";
  const basis = String(observation.basis || "").trim();
  const per100g = /per\s*100\s*g/i.test(basis) || /per\s*100\s*g/i.test(String(observation.limitations || ""));
  return `${observation.display}${per100g || !basis ? " per 100 g" : ` (${basis})`}`;
}

function formatFoodPrep(source: FoodSource): string {
  const preparation = String(source.preparation || "").trim().toLowerCase();
  if (preparation === "uncooked") return "raw";
  return source.preparation || "preparation not established";
}

function FoodSourceGroup({ kind, sources }: { kind: string; sources: FoodSource[] }) {
  const selected = sortSources(sources);
  const top = selected[0];

  return (
    <details className="pm-input-food-sources" data-food-source-kind={kind.toLowerCase().replace(/\s+/g, "-")}>
      <summary>
        <span className="pm-input-food-source-arrow" aria-hidden="true">▶</span>
        <span className="pm-input-food-source-kind">{kind} -</span>{" "}
        {top ? (
          <>
            <a href={top.food_page}>{top.food_title}</a>
            <span className="pm-input-food-source-meta">, {formatFoodAmount(top)}, · {formatFoodPrep(top)}</span>
          </>
        ) : (
          <span className="pm-input-food-source-empty">no mapped values</span>
        )}
      </summary>
      {selected.length > 1 && (
        <ul>
          {selected.slice(1).map((source) => (
            <li key={source.food_id || source.food_title} title={source.material || ""}>
              <a href={source.food_page}>{source.food_title}</a>
              <span>, {formatFoodAmount(source)}, · {formatFoodPrep(source)}</span>
            </li>
          ))}
        </ul>
      )}
    </details>
  );
}

export default function PmDietaryLeverListItem(props: LiHTMLAttributes<HTMLLIElement>) {
  const { children, ...rest } = props;
  const location = useLocation();
  const data = usePluginData("input-substance-food") as MappingData | undefined;
  const parsed = parseLeverBullet(textFromChildren(children));

  if (!parsed || !data) return <li {...rest}>{children}</li>;

  const path = String(location.pathname || "").replace(/\/$/, "");
  const brsMatch = path.match(/\/docs\/biological-targets\/(brs[1-6])\//i);
  if (!brsMatch) return <li {...rest}>{children}</li>;

  const scoped = selectBrsReviewData(data, generatedScopes, brsMatch[1].toUpperCase()).data as {
    relationships?: any[];
    food_sources?: FoodSource[];
  };
  const pageRelationships = (scoped.relationships || []).filter(
    (relationship) => String(relationship.pm_page || "").replace(/\/$/, "") === path,
  );
  const pmId = pageRelationships[0]?.pm;
  if (!pmId) return <li {...rest}>{children}</li>;

  const relationships = (scoped.relationships || []).filter((relationship) =>
    relationship.pm === pmId &&
    relationship.substance_id &&
    (relationship.presentations || []).some((presentation: any) =>
      norm(presentation.label) === norm(parsed.label) &&
      /^3\.1\.[123]$/.test(canonicalInputSection(presentation.section)),
    ),
  );

  if (!relationships.length) return <li {...rest}>{children}</li>;

  const relationshipSubstances = new Set(relationships.map((relationship) => relationship.substance_id));
  const sources = (scoped.food_sources || []).filter((source) => relationshipSubstances.has((source as any).substance_id));

  if (!sources.length) return <li {...rest}>{children}</li>;

  return (
    <li
      {...rest}
      data-pm-input-label={parsed.label}
      data-pm-input-foods={parsed.foods || ""}
    >
      {children}
      <FoodSourceGroup kind="Plant Based" sources={sources.filter((source) => !isProbablyAnimalSource(source))} />
      <FoodSourceGroup kind="Animal Based" sources={sources.filter((source) => isProbablyAnimalSource(source))} />
    </li>
  );
}
