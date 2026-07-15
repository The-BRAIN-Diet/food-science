/**
 * Build Cross-BRS PM relationship graph from PM §6.2 declarations.
 * Canonical biological graph: PM pages → hub Cross-BRS Dependencies synthesis.
 */
import path from "node:path";
import { listMechanismMdxFiles, readMechanismPage } from "./mechanism-page-validation.mjs";
import { getHostKey, getLinkKey } from "./connected-mechanisms-populate.mjs";
import data from "../data/brs-cross-integration-evidence.json" with { type: "json" };

const PM_ID_RE = /BRS\d+-FM\d+-PM\d+/i;
const INTEGRATION_IDS = new Set(Object.keys(data.integrations || {}));

function brsFromKey(key) {
  if (!key) return null;
  const m = String(key).match(/^brs(\d+)$/i);
  return m ? `BRS${m[1]}` : null;
}

function integrationIdForPair(brsA, brsB) {
  const forward = `${brsA}->${brsB}`;
  const reverse = `${brsB}->${brsA}`;
  if (INTEGRATION_IDS.has(forward)) return forward;
  if (INTEGRATION_IDS.has(reverse)) return reverse;
  return null;
}

function extractSection62Body(content) {
  const m = content.match(
    /### 6\.2 (?:Cross-BRS Mechanism Relationships|Connected BRS Mechanisms)\s*\n([\s\S]*?)(?=\n### 6\.3 (?:Local BRS Mechanism Relationships|Connected Primary Mechanisms)\s*(?:\n|$))/,
  );
  return m ? m[1].trim() : "";
}

function parseCrossBrsBullets(block) {
  const map = new Map();
  if (!block || /^- None listed\s*$/i.test(block.trim())) return map;
  for (const line of block.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("-")) continue;
    const m = trimmed.match(/^- \[([^\]]+)\]\(([^)]+)\)(?:\s*(?:—|-)\s*(.+))?$/);
    if (m) {
      map.set(m[2], { label: m[1], href: m[2], connection: m[3]?.trim() || "" });
    }
  }
  return map;
}

/**
 * @param {string} root
 * @returns {Map<string, Array<{ sourcePmId: string, sourceHref: string, targetLabel: string, targetHref: string, connection: string }>>}
 */
export function buildCrossBrsMechanismGraph(root) {
  const byIntegration = new Map();

  for (const filePath of listMechanismMdxFiles(root, "pm")) {
    const { data: front, content } = readMechanismPage(filePath);
    const sourcePmId = front.pm_id;
    if (!sourcePmId) continue;

    const hostKey = getHostKey(sourcePmId);
    const hostBrs = brsFromKey(hostKey);
    if (!hostBrs) continue;

    const block = extractSection62Body(content);
    for (const [, link] of parseCrossBrsBullets(block)) {
      if (!PM_ID_RE.test(link.label) && !PM_ID_RE.test(link.href)) continue;
      const targetKey = getLinkKey(link.href);
      const targetBrs = brsFromKey(targetKey);
      if (!targetBrs || targetBrs === hostBrs) continue;

      const integrationId = integrationIdForPair(hostBrs, targetBrs);
      if (!integrationId) continue;

      const row = {
        sourcePmId,
        sourceHref: filePathToHref(root, filePath),
        targetLabel: link.label,
        targetHref: link.href,
        connection: link.connection || "",
      };

      if (!byIntegration.has(integrationId)) byIntegration.set(integrationId, []);
      byIntegration.get(integrationId).push(row);
    }
  }

  for (const rows of byIntegration.values()) {
    rows.sort((a, b) => {
      const bySource = a.sourcePmId.localeCompare(b.sourcePmId);
      return bySource !== 0 ? bySource : a.targetLabel.localeCompare(b.targetLabel);
    });
  }

  return byIntegration;
}

function filePathToHref(root, filePath) {
  const rel = path.relative(path.join(root, "docs"), filePath).replace(/\.mdx$/, "");
  return `/docs/${rel.replace(/\\/g, "/")}`;
}

/** @param {string} integrationId */
export function getDeclaredPmRelationships(integrationId, root) {
  const graph = buildCrossBrsMechanismGraph(root);
  return graph.get(integrationId) || [];
}
