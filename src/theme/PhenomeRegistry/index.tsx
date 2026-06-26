import React, { useMemo, useState } from 'react';
import Link from '@docusaurus/Link';
import registryJson from '../../data/phenome-registry.json';
import relationshipsJson from '../../data/phenome-relationships.generated.json';
import { phenomeDetailDocPath } from './phenomeDocPath';
import PhenomeEvidenceConfidence from './PhenomeEvidenceConfidence';
import styles from './styles.module.css';

type TherapeuticAreaEntry = {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: string;
  primaryWorkedExample?: boolean;
};

type PhenomeRegistryEntry = {
  id: string;
  name: string;
  slug: string;
  description: string;
  publicSummary: string;
  primaryDomains: string[];
  therapeuticAreaIds: string[];
  status: string;
  evidence_confidence?: string;
};

type PhenomeReference = {
  index?: number;
  label?: string;
  citationKey?: string;
  href?: string;
};

type RelationshipRow = {
  sourceNode: string;
  sourceTitle: string;
  sourcePath: string;
  parentFM: string | null;
  parentBRS: string | null;
  targetPhenome: string;
  targetPhenomeId: string | null;
  relationshipType: string;
  confidence: string;
  evidenceLevel: string;
  rationale: string;
  references: PhenomeReference[];
};

type ReviewFlag = {
  id: string;
  type: string;
  phenomeIds?: string[];
  labels?: string[];
  note: string;
};

type RegistryFile = {
  meta?: {
    primaryTherapeuticAreaId?: string;
    phenomeDevelopment?: string;
    benchmarkedFrameworks?: Array<{ id: string; name: string; role?: string; note?: string }>;
  };
  therapeuticAreas: TherapeuticAreaEntry[];
  phenomes: PhenomeRegistryEntry[];
  reviewFlags?: ReviewFlag[];
};

type IndexFile = {
  relationships: RelationshipRow[];
};

const ALL_TA_FILTER = 'ALL';

function brsSortKey(brs: string | null): string {
  return String(brs || 'ZZZ');
}

function groupRelationshipsByPhenomeId(
  relationships: RelationshipRow[],
  phenomeId: string,
  phenomeName: string,
): RelationshipRow[] {
  return relationships
    .filter(
      (r) =>
        r.targetPhenomeId === phenomeId ||
        r.targetPhenome.toLowerCase() === phenomeName.toLowerCase(),
    )
    .sort((a, b) => {
      const brs = brsSortKey(a.parentBRS).localeCompare(brsSortKey(b.parentBRS));
      if (brs !== 0) return brs;
      return a.sourceNode.localeCompare(b.sourceNode);
    });
}

function ConnectedMechanismsCell({ rows, phenomeId }: { rows: RelationshipRow[]; phenomeId: string }) {
  if (rows.length === 0) {
    return <span className={styles.empty}>No mechanisms mapped yet</span>;
  }

  const label = rows.length === 1 ? '1 mechanism' : `${rows.length} mechanisms`;

  return (
    <details className={styles.mechanismsDetails}>
      <summary className={styles.mechanismsSummary}>
        <strong>{label}</strong>
      </summary>
      <div className={styles.mechanismsPanel}>
        {rows.map((row) => (
          <MechanismLink key={`${phenomeId}-${row.sourceNode}`} row={row} />
        ))}
      </div>
    </details>
  );
}

function MechanismLink({ row }: { row: RelationshipRow }) {
  return (
    <div className={styles.mechanismRow}>
      <Link to={row.sourcePath}>
        {row.sourceNode} — {row.sourceTitle}
      </Link>
      <span className={styles.mechanismMeta}>
        {row.relationshipType} · {row.confidence}
      </span>
    </div>
  );
}

function TherapeuticAreaBadges({
  ids,
  taById,
  primaryTaId,
}: {
  ids: string[];
  taById: Map<string, TherapeuticAreaEntry>;
  primaryTaId?: string;
}) {
  return (
    <span className={styles.taBadgeWrap}>
      {ids.map((id) => {
        const ta = taById.get(id);
        if (!ta) return null;
        const primary = id === primaryTaId;
        return (
          <span
            key={id}
            className={primary ? styles.taBadgePrimary : styles.taBadge}
            title={ta.description}
          >
            {ta.id}
            {primary ? ' ★' : ''}
          </span>
        );
      })}
    </span>
  );
}

export default function PhenomeRegistry(): React.ReactElement {
  const registry = registryJson as RegistryFile;
  const index = relationshipsJson as IndexFile;
  const [taFilter, setTaFilter] = useState(ALL_TA_FILTER);

  const therapeuticAreas = useMemo(
    () =>
      [...(registry.therapeuticAreas || [])]
        .filter((ta) => ta.status === 'active')
        .sort((a, b) => a.id.localeCompare(b.id)),
    [registry.therapeuticAreas],
  );

  const taById = useMemo(() => {
    const map = new Map<string, TherapeuticAreaEntry>();
    for (const ta of therapeuticAreas) map.set(ta.id, ta);
    return map;
  }, [therapeuticAreas]);

  const primaryTaId = registry.meta?.primaryTherapeuticAreaId;

  const phenomes = useMemo(
    () =>
      [...registry.phenomes]
        .filter((p) => p.status === 'active')
        .sort((a, b) => a.id.localeCompare(b.id)),
    [registry.phenomes],
  );

  const filteredPhenomes = useMemo(() => {
    if (taFilter === ALL_TA_FILTER) return phenomes;
    return phenomes.filter((p) => (p.therapeuticAreaIds || []).includes(taFilter));
  }, [phenomes, taFilter]);

  const connectionsById = useMemo(() => {
    const map = new Map<string, RelationshipRow[]>();
    for (const phenome of phenomes) {
      map.set(
        phenome.id,
        groupRelationshipsByPhenomeId(index.relationships, phenome.id, phenome.name),
      );
    }
    return map;
  }, [index.relationships, phenomes]);

  return (
    <div className={styles.wrap}>
      <h1 className={styles.srOnly}>Phenome Registry</h1>
      <p>
        Phenomes are shared functional outcome domains that emerge across neuropsychiatric,
        neurodevelopmental, and brain-health conditions. They sit above biological mechanisms and
        below condition-specific profiles — describing what a person may experience functionally
        (attention stability, emotional regulation, recovery capacity, and similar domains).
      </p>
      <p>
        The registry is scoped to <strong>neuropsychiatric and neurocognitive health</strong>.
        <strong> ADHD (TA001)</strong> is the primary worked example in Version 1; the architecture
        supports anxiety, depression, autism spectrum, cognitive ageing, long COVID, and healthy
        cognitive optimisation without duplicating phenome labels per condition.
      </p>
      <p>
        Mechanism-to-phenome links are translational relationships. They do not imply that a single
        mechanism causes or treats a complex condition.
      </p>

      {registry.meta?.phenomeDevelopment ? (
        <>
          <h2>Phenome development</h2>
          <p className={styles.developmentNote}>{registry.meta.phenomeDevelopment}</p>
          {registry.meta.benchmarkedFrameworks?.length ? (
            <ul className={styles.frameworkList}>
              {registry.meta.benchmarkedFrameworks.map((fw) => (
                <li key={fw.id}>
                  <strong>{fw.name}</strong>
                  {fw.role ? ` (${fw.role})` : ''}
                  {fw.note ? ` — ${fw.note}` : ''}
                </li>
              ))}
            </ul>
          ) : null}
        </>
      ) : null}

      <h2>Therapeutic areas</h2>
      <div className={styles.tableScroll}>
        <table className={styles.registryTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Therapeutic area</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {therapeuticAreas.map((ta) => (
              <tr key={ta.id}>
                <td className={styles.idCell}>{ta.id}</td>
                <td>
                  {ta.name}
                  {ta.primaryWorkedExample ? (
                    <span className={styles.primaryTaNote}> — primary V1 example</span>
                  ) : null}
                </td>
                <td>{ta.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Registry overview</h2>
      <div className={styles.filterRow}>
        <label htmlFor="ta-filter" className={styles.filterLabel}>
          Filter by therapeutic area
        </label>
        <select
          id="ta-filter"
          className={styles.filterSelect}
          value={taFilter}
          onChange={(e) => setTaFilter(e.target.value)}
        >
          <option value={ALL_TA_FILTER}>All therapeutic areas</option>
          {therapeuticAreas.map((ta) => (
            <option key={ta.id} value={ta.id}>
              {ta.id} — {ta.name}
            </option>
          ))}
        </select>
        <span className={styles.filterCount}>
          Showing {filteredPhenomes.length} of {phenomes.length} phenomes
        </span>
      </div>
      <div className={styles.tableScroll}>
        <table className={styles.registryTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Phenome</th>
              <th>Description</th>
              <th>Therapeutic areas</th>
              <th>Evidence Confidence</th>
              <th>Connected Mechanisms</th>
            </tr>
          </thead>
          <tbody>
            {filteredPhenomes.map((phenome) => {
              const rows = connectionsById.get(phenome.id) ?? [];
              return (
                <tr key={phenome.id}>
                  <td className={styles.idCell}>{phenome.id}</td>
                  <td>
                    <Link to={phenomeDetailDocPath(phenome.id, phenome.slug)}>{phenome.name}</Link>
                  </td>
                  <td>{phenome.description}</td>
                  <td>
                    <TherapeuticAreaBadges
                      ids={phenome.therapeuticAreaIds || []}
                      taById={taById}
                      primaryTaId={primaryTaId}
                    />
                  </td>
                  <td>
                    {phenome.evidence_confidence ? (
                      <PhenomeEvidenceConfidence
                        evidenceConfidence={phenome.evidence_confidence}
                        variant="compact"
                      />
                    ) : (
                      <span className={styles.empty}>Not scored</span>
                    )}
                  </td>
                  <td>
                    <ConnectedMechanismsCell rows={rows} phenomeId={phenome.id} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2>Phenome details</h2>
      <p>
        Each registered phenome has a dedicated detail page with provenance, cross-references,
        foundational evidence, and connected mechanisms. Browse from the{' '}
        <strong>Phenome details</strong> section in the sidebar, or open a phenome from the table
        above.
      </p>
      <ul className={styles.phenomeDetailNavList}>
        {filteredPhenomes.map((phenome) => (
          <li key={phenome.id}>
            <Link to={phenomeDetailDocPath(phenome.id, phenome.slug)}>
              {phenome.id} — {phenome.name}
            </Link>
          </li>
        ))}
      </ul>

      {registry.reviewFlags && registry.reviewFlags.length > 0 ? (
        <>
          <h2>Registry review flags</h2>
          <p className={styles.reviewIntro}>
            The following phenome pairs are flagged for manual review (not merged automatically).
          </p>
          <ul>
            {registry.reviewFlags.map((flag) => (
              <li key={flag.id}>
                <strong>{flag.id}</strong> ({flag.type}): {flag.note}
                {flag.labels?.length ? (
                  <span className={styles.flagLabels}> — {flag.labels.join(' / ')}</span>
                ) : null}
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}
