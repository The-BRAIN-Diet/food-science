import React, { useMemo } from 'react';
import Link from '@docusaurus/Link';
import registryJson from '../../data/phenome-registry.json';
import relationshipsJson from '../../data/phenome-relationships.generated.json';
import { phenomeDetailDocPath } from './phenomeDocPath';
import PhenomeEvidenceConfidence from './PhenomeEvidenceConfidence';
import styles from './styles.module.css';

type TherapeuticAreaEntry = {
  id: string;
  name: string;
  description: string;
  status?: string;
};

type PhenomeLandmarkPaper = {
  label: string;
  citation_key?: string;
  href?: string;
  note?: string;
};

type PhenomeCrossReferences = {
  rdoc_domains?: string[];
  icf_domains?: string[];
  promis_measures?: string[];
  hpo_terms?: string[];
  dsm_icd_context?: string[];
};

type PhenomeProvenance = {
  frameworkOrigin?: string;
  developmentNote?: string;
  relatedPhenomeIds?: string[];
};

type PhenomeRegistryEvidence = {
  construct_landmark_papers?: PhenomeLandmarkPaper[];
  biology_to_phenome_landmark_papers?: PhenomeLandmarkPaper[];
  nutrition_to_biology_landmark_papers?: PhenomeLandmarkPaper[];
};

type PhenomeRegistryEntry = {
  id: string;
  name: string;
  slug: string;
  description: string;
  publicSummary: string;
  therapeuticAreaIds: string[];
  provenance?: PhenomeProvenance;
  crossReferences?: PhenomeCrossReferences;
  evidence?: PhenomeRegistryEvidence;
  evidence_confidence?: string;
  evidence_confidence_note?: string;
};

type RelationshipRow = {
  sourceNode: string;
  sourceTitle: string;
  sourcePath: string;
  parentBRS: string | null;
  targetPhenome: string;
  targetPhenomeId: string | null;
  relationshipType: string;
  confidence: string;
};

type RegistryFile = {
  meta?: { primaryTherapeuticAreaId?: string };
  therapeuticAreas: TherapeuticAreaEntry[];
  phenomes: PhenomeRegistryEntry[];
};

const CROSS_REF_LABELS: Record<keyof PhenomeCrossReferences, string> = {
  rdoc_domains: 'RDoC domains',
  icf_domains: 'ICF domains',
  promis_measures: 'PROMIS measures',
  hpo_terms: 'HPO terms',
  dsm_icd_context: 'DSM / ICD context',
};

const EVIDENCE_LAYER_LABELS: Record<keyof PhenomeRegistryEvidence, string> = {
  construct_landmark_papers: 'Construct landmark papers',
  biology_to_phenome_landmark_papers: 'Biology → phenome landmark papers',
  nutrition_to_biology_landmark_papers: 'Nutrition → biology landmark papers',
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

function LandmarkPaperList({ papers }: { papers: PhenomeLandmarkPaper[] }) {
  return (
    <ul className={styles.evidenceList}>
      {papers.map((paper) => (
        <li key={`${paper.label}-${paper.citation_key || ''}`}>
          {paper.href ? (
            <Link to={paper.href}>{paper.label}</Link>
          ) : (
            <span>{paper.label}</span>
          )}
          {paper.note ? <span className={styles.evidenceNote}> — {paper.note}</span> : null}
        </li>
      ))}
    </ul>
  );
}

function PhenomeCrossReferencesBlock({ crossReferences }: { crossReferences: PhenomeCrossReferences }) {
  const entries = Object.entries(crossReferences).filter(
    ([, values]) => Array.isArray(values) && values.length > 0,
  ) as [keyof PhenomeCrossReferences, string[]][];

  if (!entries.length) return null;

  return (
    <div className={styles.provenanceBlock}>
      <h3>External framework cross-references</h3>
      {entries.map(([key, values]) => (
        <div key={key} className={styles.crossRefGroup}>
          <p className={styles.crossRefLabel}>{CROSS_REF_LABELS[key]}</p>
          <ul className={styles.crossRefList}>
            {values.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function PhenomeEvidenceBlock({
  evidence,
  evidenceConfidence,
  evidenceConfidenceNote,
}: {
  evidence?: PhenomeRegistryEvidence;
  evidenceConfidence?: string;
  evidenceConfidenceNote?: string;
}) {
  const layers = evidence
    ? (Object.entries(evidence).filter(
        ([, papers]) => Array.isArray(papers) && papers.length > 0,
      ) as [keyof PhenomeRegistryEvidence, PhenomeLandmarkPaper[]][])
    : [];

  if (!evidenceConfidence && !layers.length) return null;

  return (
    <div className={styles.provenanceBlock}>
      <h3>Foundational Evidence</h3>
      <PhenomeEvidenceConfidence
        evidenceConfidence={evidenceConfidence}
        evidenceConfidenceNote={evidenceConfidenceNote}
        variant="inline"
      />
      {layers.length ? (
        <p className={styles.evidenceIntro}>
          Registry-level foundational evidence for this phenome. Mechanism pages link to phenome IDs
          and carry relationship-specific evidence — not duplicated here.
        </p>
      ) : null}
      {layers.map(([key, papers]) => (
        <div key={key} className={styles.evidenceLayer}>
          <p className={styles.evidenceLayerLabel}>{EVIDENCE_LAYER_LABELS[key]}</p>
          <LandmarkPaperList papers={papers} />
        </div>
      ))}
    </div>
  );
}

function RelatedPhenomeLinks({
  ids,
  phenomeById,
}: {
  ids: string[];
  phenomeById: Map<string, PhenomeRegistryEntry>;
}) {
  if (!ids.length) return null;
  return (
    <p>
      <strong>Related phenomes:</strong>{' '}
      {ids.map((id, idx) => {
        const related = phenomeById.get(id);
        return (
          <span key={id}>
            {idx > 0 ? ', ' : ''}
            {related ? (
              <Link to={phenomeDetailDocPath(related.id, related.slug)}>
                {id} — {related.name}
              </Link>
            ) : (
              id
            )}
          </span>
        );
      })}
    </p>
  );
}

export type PhenomeDetailViewProps = {
  phenomeId: string;
};

export default function PhenomeDetailView({ phenomeId }: PhenomeDetailViewProps): React.ReactElement {
  const registry = registryJson as RegistryFile;
  const relationships = (relationshipsJson as { relationships: RelationshipRow[] }).relationships;
  const normalizedId = phenomeId.toUpperCase();

  const phenome = registry.phenomes.find((p) => p.id === normalizedId && p.status === 'active');

  const therapeuticAreas = useMemo(
    () => (registry.therapeuticAreas || []).filter((ta) => (ta.status || 'active') === 'active'),
    [registry.therapeuticAreas],
  );

  const taById = useMemo(() => {
    const map = new Map<string, TherapeuticAreaEntry>();
    for (const ta of therapeuticAreas) map.set(ta.id, ta);
    return map;
  }, [therapeuticAreas]);

  const phenomeById = useMemo(() => {
    const map = new Map<string, PhenomeRegistryEntry>();
    for (const p of registry.phenomes) map.set(p.id, p);
    return map;
  }, [registry.phenomes]);

  if (!phenome) {
    return (
      <p className={styles.empty}>
        Phenome <code>{phenomeId}</code> not found in the registry.
      </p>
    );
  }

  const rows = groupRelationshipsByPhenomeId(relationships, phenome.id, phenome.name);
  const byBrs = new Map<string, RelationshipRow[]>();
  for (const row of rows) {
    const key = row.parentBRS || 'Unassigned';
    if (!byBrs.has(key)) byBrs.set(key, []);
    byBrs.get(key)!.push(row);
  }

  const primaryTaId = registry.meta?.primaryTherapeuticAreaId;

  return (
    <div className={styles.wrap}>
      <p className={styles.detailBackLink}>
        <Link to="/docs/phenomes">← Phenome Registry</Link>
      </p>
      <h1 className={styles.detailTitle}>
        {phenome.id} — {phenome.name}
      </h1>
      <p>{phenome.description}</p>
      <p className={styles.publicSummary}>
        <em>{phenome.publicSummary}</em>
      </p>
      <p>
        <strong>Therapeutic areas:</strong>{' '}
        <TherapeuticAreaBadges
          ids={phenome.therapeuticAreaIds || []}
          taById={taById}
          primaryTaId={primaryTaId}
        />
      </p>
      {phenome.provenance?.developmentNote ? (
        <p className={styles.provenanceNote}>
          <strong>Provenance:</strong> {phenome.provenance.developmentNote}
          {phenome.provenance.frameworkOrigin ? (
            <span className={styles.frameworkOrigin}>
              {' '}
              (origin: {phenome.provenance.frameworkOrigin})
            </span>
          ) : null}
        </p>
      ) : null}
      {phenome.provenance?.relatedPhenomeIds?.length ? (
        <RelatedPhenomeLinks ids={phenome.provenance.relatedPhenomeIds} phenomeById={phenomeById} />
      ) : null}
      {phenome.crossReferences ? (
        <PhenomeCrossReferencesBlock crossReferences={phenome.crossReferences} />
      ) : null}
      <PhenomeEvidenceBlock
        evidence={phenome.evidence}
        evidenceConfidence={phenome.evidence_confidence}
        evidenceConfidenceNote={phenome.evidence_confidence_note}
      />

      <div className={styles.connectedMechanismsSection}>
        <h2>Connected mechanisms</h2>
        {rows.length > 0 ? (
          [...byBrs.entries()]
            .sort(([a], [b]) => brsSortKey(a).localeCompare(brsSortKey(b)))
            .map(([brs, brsRows]) => (
              <div key={brs} className={styles.brsGroup}>
                {brsRows.length > 1 ? <p className={styles.brsLabel}>{brs}</p> : null}
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
            ))
        ) : (
          <p className={styles.empty}>No mechanisms currently mapped to this phenome.</p>
        )}
      </div>
    </div>
  );
}
