import React, { useMemo } from 'react';
import Link from '@docusaurus/Link';
import registryJson from '../../data/phenome-registry.json';
import relationshipsJson from '../../data/phenome-relationships.generated.json';
import styles from './styles.module.css';

type PhenomeRegistryEntry = {
  id: string;
  name: string;
  slug: string;
  description: string;
  publicSummary: string;
  primaryDomains: string[];
  status: string;
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
  phenomes: PhenomeRegistryEntry[];
  reviewFlags?: ReviewFlag[];
};

type IndexFile = {
  relationships: RelationshipRow[];
};

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

export default function PhenomeRegistry(): React.ReactElement {
  const registry = registryJson as RegistryFile;
  const index = relationshipsJson as IndexFile;

  const phenomes = useMemo(
    () =>
      [...registry.phenomes]
        .filter((p) => p.status === 'active')
        .sort((a, b) => a.id.localeCompare(b.id)),
    [registry.phenomes],
  );

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
      <h1>Phenome Registry</h1>
      <p>
        Phenomes are functional patterns that sit above biological mechanisms and below condition
        profiles. They describe what a person may experience functionally, such as energy stability,
        motivation, emotional regulation, or recovery capacity.
      </p>
      <p>
        Mechanism-to-phenome links are translational relationships. They do not imply that a single
        mechanism causes or treats a complex condition.
      </p>

      <h2>Registry overview</h2>
      <div className={styles.tableScroll}>
        <table className={styles.registryTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Phenome</th>
              <th>Description</th>
              <th>Connected Mechanisms</th>
            </tr>
          </thead>
          <tbody>
            {phenomes.map((phenome) => {
              const rows = connectionsById.get(phenome.id) ?? [];
              return (
                <tr key={phenome.id}>
                  <td className={styles.idCell}>{phenome.id}</td>
                  <td>
                    <a href={`#${phenome.id.toLowerCase()}`}>{phenome.name}</a>
                  </td>
                  <td>{phenome.description}</td>
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
      {phenomes.map((phenome) => {
        const rows = connectionsById.get(phenome.id) ?? [];
        const byBrs = new Map<string, RelationshipRow[]>();
        for (const row of rows) {
          const key = row.parentBRS || 'Unassigned';
          if (!byBrs.has(key)) byBrs.set(key, []);
          byBrs.get(key)!.push(row);
        }

        return (
          <section key={phenome.id} id={phenome.id.toLowerCase()} className={styles.detailSection}>
            <h3>
              {phenome.id} — {phenome.name}
            </h3>
            <p>{phenome.description}</p>
            <p className={styles.publicSummary}>
              <em>{phenome.publicSummary}</em>
            </p>
            {rows.length > 0 ? (
              <>
                <h4>Connected mechanisms</h4>
                {[...byBrs.entries()]
                  .sort(([a], [b]) => brsSortKey(a).localeCompare(brsSortKey(b)))
                  .map(([brs, brsRows]) => (
                    <div key={brs} className={styles.brsGroup}>
                      {brsRows.length > 1 ? (
                        <p className={styles.brsLabel}>{brs}</p>
                      ) : null}
                      <ul className={styles.mechanismList}>
                        {brsRows.map((row) => (
                          <li key={row.sourceNode}>
                            <Link to={row.sourcePath}>
                              {row.sourceNode} — {row.sourceTitle}
                            </Link>
                            <span className={styles.mechanismMeta}>
                              {' '}
                              ({row.relationshipType} · {row.confidence})
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </>
            ) : (
              <p className={styles.empty}>No mechanisms currently mapped to this phenome.</p>
            )}
          </section>
        );
      })}

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
