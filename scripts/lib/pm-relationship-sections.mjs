/**
 * PM §6.2 / §6.3 relationship section titles and intros.
 * @see system/primary-mechanism-schema.md
 */

export const PM_SECTION_6_2_TITLE = "Cross-BRS Mechanism Relationships";

export const PM_SECTION_6_2_INTRO =
  "Primary Mechanisms in other Biological Regulatory Systems that directly interact with, constrain or support this mechanism.";

export const PM_SECTION_6_3_TITLE = "Local BRS Mechanism Relationships";

export const PM_SECTION_6_3_INTRO =
  "Related Primary Mechanisms within the same Biological Regulatory System that collectively support the integrated biological function.";

/** @deprecated */
export const PM_SECTION_6_2_TITLE_LEGACY = "Connected BRS Mechanisms";

/** @deprecated */
export const PM_SECTION_6_3_TITLE_LEGACY = "Connected Primary Mechanisms";

export const PM_SECTION_6_2_HEADING = `### 6.2 ${PM_SECTION_6_2_TITLE}`;

export const PM_SECTION_6_3_HEADING = `### 6.3 ${PM_SECTION_6_3_TITLE}`;

export function pmSection62Block(body = "- None listed") {
  return [PM_SECTION_6_2_HEADING, "", PM_SECTION_6_2_INTRO, "", body].join("\n");
}

export function pmSection63Block(body = "- None listed") {
  return [PM_SECTION_6_3_HEADING, "", PM_SECTION_6_3_INTRO, "", body].join("\n");
}

const PM_CONNECTION_LINK_RE = /\[[^\]]+\]\(\/docs\/biological-targets\/[^)]+\)/g;
const RELATIONSHIP_SECTION_RE =
  /###\s+[56]\.[23]\s+(?:Cross-BRS Mechanism Relationships|Connected BRS Mechanisms|Local BRS Mechanism Relationships|Connected Primary Mechanisms)\s*\n([\s\S]*?)(?=\n###\s+[56]\.\d|\n##\s+\d+\.\s|$)/g;

function normalizeConnectionText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function extractRelationshipListItems(sectionBody) {
  const items = [];
  let current = "";
  for (const line of String(sectionBody || "").split("\n")) {
    if (/^\s*[-*]\s+/.test(line)) {
      if (current) items.push(current.trim());
      current = line.trim();
    } else if (current && /^\s+\S/.test(line)) {
      current += ` ${line.trim()}`;
    } else if (current && !line.trim()) {
      items.push(current.trim());
      current = "";
    }
  }
  if (current) items.push(current.trim());
  return items;
}

export function connectionExplanationFromItem(item) {
  const labels = [...String(item || "").matchAll(/\[([^\]]+)\]\(/g)].map((match) => match[1]);
  const remainder = String(item || "")
    .replace(/^\s*[-*]\s+/, "")
    .replace(PM_CONNECTION_LINK_RE, "")
    .replace(/^[—–-]\s*/, "")
    .replace(/\s+/g, " ")
    .trim();
  return { labels, remainder };
}

function explanationIsTitleEcho(remainder, labels) {
  const desc = normalizeConnectionText(remainder);
  if (!desc) return true;
  return labels.some((label) => {
    const title = normalizeConnectionText(label.replace(/^[A-Z0-9-]+(?:\([^)]+\))?\s*[—–-]\s*/, ""));
    return title && (desc === title || title.includes(desc) || desc.includes(title));
  });
}

export function validatePublishedPmConnectionExplanations(content, issues = [], { entityLabel } = {}) {
  const label = entityLabel || "PM";
  for (const match of String(content || "").matchAll(RELATIONSHIP_SECTION_RE)) {
    const body = match[1] || "";
    for (const item of extractRelationshipListItems(body)) {
      const hasPmLink = Boolean(String(item).match(PM_CONNECTION_LINK_RE));
      if (/none listed/i.test(item) && !hasPmLink) continue;
      if (!hasPmLink) continue;
      const { labels, remainder } = connectionExplanationFromItem(item);
      if (remainder.length < 50 || explanationIsTitleEcho(remainder, labels)) {
        issues.push({
          code: "pm_connection_explanation_missing",
          message: `${label}: published PM connection needs a 1–2 line relationship explanation, not a bare or title-only link`,
        });
      }
    }
  }
  return issues;
}
