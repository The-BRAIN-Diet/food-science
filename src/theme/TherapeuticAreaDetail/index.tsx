import React, {useEffect, useMemo, useState} from "react";
import Link from "@docusaurus/Link";
import {useHistory, useLocation} from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {
  evidenceClaims,
  getClaimsForPm,
  getEvidenceClaim,
  getEvidenceRecord,
  getTaPath,
  getTherapeuticAreaPage,
  type EvidenceClaim,
  type BrsSection,
} from "../../data/therapeuticAreaEvidence";
import {
  getPhenomeRegistryEntry,
  getTherapeuticAreaEntry,
  phenomeRelationships,
} from "../../data/phenomeRelationships";
import {phenomeDetailDocPath} from "../PhenomeRegistry/phenomeDocPath";
import styles from "./styles.module.css";

const EVIDENCE_LABELS: Record<string, string> = {
  "direct-condition": "Direct condition-specific evidence",
  "extrapolated-population": "Extrapolated from another population",
  "mechanistic-inference": "Mechanistic plausibility",
  "biomarker-association": "Biomarker association",
};

const BRS_CATALOG: Array<{id: string; title: string}> = [
  {id: "BRS1", title: "Neurotransmitter Regulation"},
  {id: "BRS2", title: "Methylation & One-Carbon Metabolism"},
  {id: "BRS3", title: "Inflammation & Oxidative Stress"},
  {id: "BRS4", title: "Mitochondrial Function & Bioenergetics"},
  {id: "BRS5", title: "Gut–Brain Axis & Enteric Nervous System"},
  {id: "BRS6", title: "Metabolic & Neuroendocrine Regulation"},
];

type TaTabId = "overview" | "biological" | "functional" | "dietary" | "gaps";

const TA_TABS: Array<{id: TaTabId; label: string}> = [
  {id: "overview", label: "Overview"},
  {id: "biological", label: "Biological Systems"},
  {id: "functional", label: "Functional Outcomes"},
  {id: "dietary", label: "Dietary & Lifestyle Evidence"},
  {id: "gaps", label: "Evidence Gaps"},
];

type ContentsItem = {id: string; label: string};

function pmPath(pmId: string): string | null {
  return phenomeRelationships.find((row) => row.sourceNode === pmId)?.sourcePath || null;
}

function sectionForBrs(sections: BrsSection[], brsId: string): BrsSection | undefined {
  return sections.find((section) => section.brsId === brsId);
}

function mechanismChain(claim: EvidenceClaim): string {
  const pm = claim.pmIds[0];
  if (pm) {
    const match = pm.match(/^(BRS[1-6])-(FM\d+)-(PM\d+)/);
    if (match) return `${match[1]} → ${match[2]} → ${match[3]}`;
  }
  if (claim.fmIds?.length) return `${claim.brsId} · ${claim.fmIds.join(", ")}`;
  return claim.brsId;
}

function authorYearFromLabel(label: string): string {
  const match = label.match(/^([^;]+)/);
  return match ? match[1].trim() : label;
}

/** Stable fragment shared by the PM footer and the Therapeutic Area study card. */
export function pmEvidenceMarker(pmId: string, claimId: string): string {
  return `${pmId.toLowerCase()}-${claimId.toLowerCase()}`;
}

function StudyEvidenceCards({claimIds, taSlug, brsId}: {claimIds: string[]; taSlug: string; brsId: string}): React.ReactElement {
  const claims = claimIds.map(getEvidenceClaim).filter(Boolean) as EvidenceClaim[];
  if (!claims.length) {
    return <p className={styles.empty}>No reviewed evidence mapped for this section yet.</p>;
  }
  return (
    <div className={styles.studyList}>
      {claims.map((claim) => {
        const record = getEvidenceRecord(claim.evidenceId)!;
        const title = claim.displayTitle || claim.currentClaim;
        const summary = claim.displaySummary || record.citationLabel;
        const design = claim.studyDesignLabel || record.studyDesign;
        const openHref = claim.openEvidencePath || getTaPath(claim.taId);
        const anchor = `${taSlug}-${brsId.toLowerCase()}-study-${claim.id.toLowerCase()}`;
        return (
          <article key={claim.id} id={anchor} className={styles.studyCard}>
            <h3 className={styles.studyTitle}>{title}</h3>
            <p className={styles.studySummary}>{summary}</p>
            <p className={styles.studyMeta}>
              <strong>{authorYearFromLabel(record.citationLabel)}</strong>
              {" · "}
              <span>{mechanismChain(claim)}</span>
              {" · "}
              <span>{design}</span>
            </p>
            {claim.pmIds.length ? (
              <p className={styles.studyMeta}>
                <strong>Primary mechanisms:</strong>{" "}
                {claim.pmIds.map((pmId, index) => (
                  <React.Fragment key={pmId}>
                    {index ? ", " : null}
                    <span id={pmEvidenceMarker(pmId, claim.id)} className={styles.pmMarker}>
                      {pmId}
                    </span>
                  </React.Fragment>
                ))}
                {" · "}
                <span>{claim.id}</span>
              </p>
            ) : null}
            {claim.limitationNote ? (
              <p className={styles.studyLimit}>{claim.limitationNote}</p>
            ) : null}
            <p className={styles.studyOpen}>
              <Link to={openHref}>Open evidence →</Link>
            </p>
          </article>
        );
      })}
    </div>
  );
}

function TabContentsPanel({items}: {items: ContentsItem[]}): React.ReactElement | null {
  if (!items.length) return null;
  return (
    <aside className={styles.contents} aria-label="On this tab">
      <p className={styles.contentsLabel}>On this tab</p>
      <ul className={styles.contentsList}>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>{item.label}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function TherapeuticAreaPmLinks({pmId}: {pmId: string}): React.ReactElement | null {
  const {siteConfig} = useDocusaurusContext();
  const includeInternalDocs = siteConfig.customFields?.includeInternalDocs === true;
  const claims = getClaimsForPm(pmId);
  if (!claims.length) return null;
  const grouped = [
    ...new Set(
      claims
        .map((claim) => claim.taId)
        .filter((taId) => includeInternalDocs || taId === "TA001"),
    ),
  ];
  if (!grouped.length) return null;
  return (
    <aside className={styles.pmPanel}>
      <h2>Therapeutic Area evidence</h2>
      <p>
        Condition interpretations below reference canonical evidence records; study facts are not
        rewritten on this mechanism page.
      </p>
      <ul>
        {grouped.map((taId) => {
          const ta = getTherapeuticAreaEntry(taId);
          const taClaims = claims.filter((claim) => claim.taId === taId);
          return (
            <li key={taId}>
              <strong>{ta?.name || taId}</strong>
              <ul>
                {taClaims.map((claim) => {
                  const marker = pmEvidenceMarker(pmId, claim.id);
                  return (
                    <li key={claim.id}>
                      <code>{marker}</code> — {claim.currentClaim}{" "}
                      <Link to={`${getTaPath(taId)}?taTab=biological#${marker}`}>
                        Open this evidence
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

function OverviewTab({
  page,
  pageClaims,
  brsSections,
  taSlug,
}: {
  page: NonNullable<ReturnType<typeof getTherapeuticAreaPage>>;
  pageClaims: EvidenceClaim[];
  brsSections: BrsSection[];
  taSlug: string;
}): React.ReactElement {
  const directCount = pageClaims.filter((c) => c.evidenceRelation === "direct-condition").length;
  const populated = brsSections.filter((s) => s.claimIds.length).length;

  return (
    <>
      <h2 id={`${taSlug}-introduction`}>Therapeutic Area introduction</h2>
      <p>{page.overview}</p>
      <p>{page.purpose}</p>

      <h2 id={`${taSlug}-brs-summary`}>Compact BRS1–BRS6 summary</h2>
      <p>
        Evidence on this page is organised by biological regulatory system and migrated from the
        reviewed Therapeutic Area Research tables on each BRS hub.
      </p>
      <div className={styles.tableWrap}>
        <table className={styles.compactTable}>
          <thead>
            <tr>
              <th>BRS</th>
              <th>System</th>
              <th>Hub migration</th>
              <th>Study presentations</th>
              <th>Evidence types</th>
            </tr>
          </thead>
          <tbody>
            {BRS_CATALOG.map(({id, title}) => {
              const section = sectionForBrs(brsSections, id);
              const claims = section
                ? (section.claimIds.map(getEvidenceClaim).filter(Boolean) as EvidenceClaim[])
                : [];
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{title}</td>
                  <td>{claims.length ? "Migrated from hub table" : "No hub rows mapped"}</td>
                  <td>{claims.length || "—"}</td>
                  <td>
                    {claims.length
                      ? [...new Set(claims.map((c) => EVIDENCE_LABELS[c.evidenceRelation]))].join("; ")
                      : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2 id={`${taSlug}-evidence-status`}>Overall evidence status</h2>
      <ul className={styles.statusList}>
        <li>
          <strong>Page status:</strong> {page.status}
        </li>
        <li>
          <strong>Study presentations (distinct hub interpretations):</strong> {pageClaims.length}
        </li>
        <li>
          <strong>Direct condition-specific interpretations:</strong> {directCount}
        </li>
        <li>
          <strong>BRS sections with evidence:</strong> {populated} / {BRS_CATALOG.length}
        </li>
        <li>
          <strong>Dietary &amp; lifestyle tab:</strong> Reserved for a later pass — not populated here
        </li>
      </ul>
    </>
  );
}

function BiologicalSystemsTab({
  taSlug,
  brsSections,
  cascades,
}: {
  taSlug: string;
  brsSections: BrsSection[];
  cascades: Array<{title: string; steps: string[]}>;
}): React.ReactElement {
  return (
    <>
      <p id={`${taSlug}-biological-intro`}>
        Evidence is organised by Biological Regulatory System. Each card summarises one reviewed hub
        table row; use <strong>Open evidence →</strong> for the full mechanism discussion.
      </p>
      {brsSections.map((section) => (
        <section key={section.brsId} id={`${taSlug}-${section.brsId.toLowerCase()}`}>
          <h2>
            {section.brsId} — {section.title}
          </h2>
          <p><strong>Biological relevance:</strong> {section.relevance}</p>
          <StudyEvidenceCards claimIds={section.claimIds} taSlug={taSlug} brsId={section.brsId} />
          <p><strong>Null, conflicting and limiting evidence:</strong> {section.limitations}</p>
        </section>
      ))}

      <h2 id={`${taSlug}-cascades`}>Cross-system cascades</h2>
      {cascades.map((cascade) => (
        <section key={cascade.title} className={styles.cascade} id={`${taSlug}-cascade-${cascade.title.toLowerCase().replace(/\s+/g, "-")}`}>
          <h3>{cascade.title}</h3>
          <ol>{cascade.steps.map((step) => <li key={step}>{step}</li>)}</ol>
        </section>
      ))}
    </>
  );
}

function FunctionalOutcomesTab({
  taSlug,
  featuredPhenomeIds,
  claimsByPhenome,
}: {
  taSlug: string;
  featuredPhenomeIds: string[];
  claimsByPhenome: Map<string, EvidenceClaim[]>;
}): React.ReactElement {
  const phenomeIds = useMemo(() => {
    const ids = new Set(featuredPhenomeIds);
    for (const key of claimsByPhenome.keys()) ids.add(key);
    return [...ids].sort();
  }, [featuredPhenomeIds, claimsByPhenome]);

  return (
    <>
      <p id={`${taSlug}-functional-intro`}>
        Phenomes describe functional expression. They are derived from the BRS evidence mapped on
        this page and remain secondary to the Biological Systems tab.
      </p>
      <div className={styles.cardGrid}>
        {phenomeIds.map((id) => {
          const phenome = getPhenomeRegistryEntry(id);
          if (!phenome) return null;
          const linkedClaims = claimsByPhenome.get(id) || [];
          const brs = [...new Set(linkedClaims.map((claim) => claim.brsId))];
          const pms = [...new Set(linkedClaims.flatMap((claim) => claim.pmIds))];
          return (
            <article key={id} id={`${taSlug}-phenome-${id.toLowerCase()}`} className={styles.card}>
              <h3>
                <Link to={phenomeDetailDocPath(id, phenome.slug)}>
                  {id} — {phenome.name}
                </Link>
              </h3>
              <p>{phenome.publicSummary}</p>
              <p className={styles.meta}>
                <strong>BRS evidence:</strong>{" "}
                {brs.length ? brs.join(", ") : "No phenome-linked claim on this page yet."}
              </p>
              {pms.length ? (
                <p className={styles.meta}>
                  <strong>Connected PMs:</strong>{" "}
                  {pms.map((pmId, index) => {
                    const href = pmPath(pmId);
                    return (
                      <React.Fragment key={pmId}>
                        {index ? ", " : null}
                        {href ? <Link to={href}>{pmId}</Link> : pmId}
                      </React.Fragment>
                    );
                  })}
                </p>
              ) : null}
            </article>
          );
        })}
      </div>
    </>
  );
}

function DietaryLifestyleTab({taSlug}: {taSlug: string}): React.ReactElement {
  return (
    <div className={styles.reservedTab}>
      <h2 id={`${taSlug}-dietary`}>Dietary &amp; lifestyle evidence</h2>
      <p>
        This tab is reserved for a later dietary-evidence pass. It is intentionally empty during
        the BRS hub evidence migration.
      </p>
    </div>
  );
}

function EvidenceGapsTab({
  taSlug,
  brsSections,
  page,
  pageClaims,
}: {
  taSlug: string;
  brsSections: BrsSection[];
  page: NonNullable<ReturnType<typeof getTherapeuticAreaPage>>;
  pageClaims: EvidenceClaim[];
}): React.ReactElement {
  const populatedIds = new Set(brsSections.filter((s) => s.claimIds.length).map((s) => s.brsId));
  const missingBrs = BRS_CATALOG.filter(({id}) => !populatedIds.has(id));

  return (
    <>
      <h2 id={`${taSlug}-gaps-brs`}>Missing or weakly represented BRS areas</h2>
      {missingBrs.length ? (
        <ul>
          {missingBrs.map(({id, title}) => (
            <li key={id}>
              <strong>{id}</strong> — {title}: no migrated hub rows on this page yet.
            </li>
          ))}
        </ul>
      ) : (
        <p>All six BRS hubs contribute at least one reviewed study presentation on this page.</p>
      )}
      {page.majorGaps.length ? (
        <>
          <h3 id={`${taSlug}-gaps-major`}>Documented major gaps</h3>
          <ul>{page.majorGaps.map((gap) => <li key={gap}>{gap}</li>)}</ul>
        </>
      ) : null}

      <h2 id={`${taSlug}-gaps-limitations`}>Evidence limitations and inconsistencies</h2>
      <ul>
        {brsSections.map((section) => (
          <li key={section.brsId}>
            <strong>{section.brsId}:</strong> {section.limitations}
          </li>
        ))}
      </ul>

      <h2 id={`${taSlug}-gaps-mappings`}>Unresolved citations or mappings</h2>
      <p>
        See <code>ADHD-Therapeutic-Area-Migration-Report.md</code> for migration accounting,
        duplicate study keys across hubs, and bibliography checks. Repository scan output (
        <code>Therapeutic-Area-Evidence-Scan.md</code>) lists verbatim mentions for gap analysis
        but does not replace hub table review.
      </p>
      <ul>
        <li>
          <strong>Study presentations on this page:</strong> {pageClaims.length} (one per eligible
          hub table row).
        </li>
        <li>
          Re-run <code>npm run ta:migrate-adhd-hub</code> after hub table edits.
        </li>
      </ul>

      <h2 id={`${taSlug}-gaps-priorities`}>Research priorities and testable hypotheses</h2>
      <ul>{page.researchPriorities.map((priority) => <li key={priority}>{priority}</li>)}</ul>
    </>
  );
}

function parseTabFromSearch(search: string): TaTabId | null {
  const tab = new URLSearchParams(search).get("taTab");
  return TA_TABS.some((entry) => entry.id === tab) ? (tab as TaTabId) : null;
}

function buildContentsItems(
  activeTab: TaTabId,
  taSlug: string,
  page: NonNullable<ReturnType<typeof getTherapeuticAreaPage>>,
  phenomeIds: string[],
): ContentsItem[] {
  switch (activeTab) {
    case "overview":
      return [
        {id: `${taSlug}-introduction`, label: "Introduction"},
        {id: `${taSlug}-brs-summary`, label: "BRS1–BRS6 summary"},
        {id: `${taSlug}-evidence-status`, label: "Evidence status"},
      ];
    case "biological":
      return [
        ...page.brsSections.map((section) => ({
          id: `${taSlug}-${section.brsId.toLowerCase()}`,
          label: `${section.brsId} — ${section.title}`,
        })),
        {id: `${taSlug}-cascades`, label: "Cross-system cascades"},
      ];
    case "functional":
      return phenomeIds.map((id) => {
        const phenome = getPhenomeRegistryEntry(id);
        return {id: `${taSlug}-phenome-${id.toLowerCase()}`, label: phenome ? `${id} — ${phenome.name}` : id};
      });
    case "dietary":
      return [{id: `${taSlug}-dietary`, label: "Dietary & lifestyle (reserved)"}];
    case "gaps":
      return [
        {id: `${taSlug}-gaps-brs`, label: "Missing BRS areas"},
        {id: `${taSlug}-gaps-major`, label: "Major gaps"},
        {id: `${taSlug}-gaps-limitations`, label: "Limitations"},
        {id: `${taSlug}-gaps-mappings`, label: "Citations & mappings"},
        {id: `${taSlug}-gaps-priorities`, label: "Research priorities"},
      ];
    default:
      return [];
  }
}

export default function TherapeuticAreaDetail({taId}: {taId: string}): React.ReactElement {
  const location = useLocation();
  const history = useHistory();
  const initialTab = parseTabFromSearch(location.search) || "overview";
  const [activeTab, setActiveTab] = useState<TaTabId>(initialTab);
  const page = getTherapeuticAreaPage(taId);
  const ta = getTherapeuticAreaEntry(taId);

  useEffect(() => {
    const tab = parseTabFromSearch(location.search);
    if (tab) setActiveTab(tab);
  }, [location.search]);

  useEffect(() => {
    const id = decodeURIComponent(location.hash.replace(/^#/, ""));
    if (!id || activeTab !== "biological") return;
    document.getElementById(id)?.scrollIntoView({block: "start"});
  }, [location.hash, activeTab]);

  if (!page || !ta) return <p>Therapeutic Area {taId} is not available.</p>;

  const pageClaims = evidenceClaims.filter((claim) => claim.taId === taId);
  const claimsByPhenome = new Map<string, EvidenceClaim[]>();
  for (const claim of pageClaims) {
    for (const phenomeId of claim.phenomeIds) {
      if (!claimsByPhenome.has(phenomeId)) claimsByPhenome.set(phenomeId, []);
      claimsByPhenome.get(phenomeId)!.push(claim);
    }
  }

  const phenomeIds = useMemo(() => {
    const ids = new Set(page.featuredPhenomeIds);
    for (const key of claimsByPhenome.keys()) ids.add(key);
    return [...ids].sort();
  }, [page.featuredPhenomeIds, claimsByPhenome]);

  const contentsItems = buildContentsItems(activeTab, ta.slug, page, phenomeIds);

  function selectTab(tabId: TaTabId) {
    setActiveTab(tabId);
    const params = new URLSearchParams(location.search);
    params.set("taTab", tabId);
    history.replace({...location, search: params.toString()});
  }

  return (
    <div className={styles.wrap}>
      <p className={styles.status}>Internal evidence map · {ta.id} · {page.status}</p>
      <h1>{ta.name}</h1>

      <div className={styles.tabBar} role="tablist" aria-label="Therapeutic Area sections">
        {TA_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={activeTab === tab.id ? styles.tabSelected : styles.tab}
            onClick={() => selectTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.tabLayout}>
        <TabContentsPanel items={contentsItems} />
        <div className={styles.tabPanel} role="tabpanel">
          {activeTab === "overview" ? (
            <OverviewTab
              page={page}
              pageClaims={pageClaims}
              brsSections={page.brsSections}
              taSlug={ta.slug}
            />
          ) : null}
          {activeTab === "biological" ? (
            <BiologicalSystemsTab
              taSlug={ta.slug}
              brsSections={page.brsSections}
              cascades={page.cascades}
            />
          ) : null}
          {activeTab === "functional" ? (
            <FunctionalOutcomesTab
              taSlug={ta.slug}
              featuredPhenomeIds={page.featuredPhenomeIds}
              claimsByPhenome={claimsByPhenome}
            />
          ) : null}
          {activeTab === "dietary" ? <DietaryLifestyleTab taSlug={ta.slug} /> : null}
          {activeTab === "gaps" ? (
            <EvidenceGapsTab
              taSlug={ta.slug}
              brsSections={page.brsSections}
              page={page}
              pageClaims={pageClaims}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
