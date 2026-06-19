#!/usr/bin/env node
/**
 * Populate PM §6.2 Connected BRS Mechanisms and FM §5 Connected Mechanisms.
 * Sources: Mechanistic Basis / Definition, BRS hub FM blocks, child PM rollup.
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { fileURLToPath } from "url";
import { listMechanismMdxFiles, readMechanismPage } from "./lib/mechanism-page-validation.mjs";
import {
  addLink,
  collectFromText,
  extractSection,
  formatBullets,
  getHostKey,
  getLinkKey,
  getPmSourceText,
  pageHref,
  parseBullets,
  parseHubConnectedMechanisms,
  resolvePmPath,
  CURATED_PM_CONNECTIONS,
} from "./lib/connected-mechanisms-populate.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const hubConnections = parseHubConnectedMechanisms(root);

function replaceSection(content, sectionRe, newBody, nextRe) {
  const fullRe = new RegExp(
    `(${sectionRe.source}\\s*\\n)([\\s\\S]*?)(?=\\n${nextRe.source}|$)`,
  );
  if (!fullRe.test(content)) return null;
  return content.replace(fullRe, `$1${newBody}\n`);
}

function findFmPath(root, fmId) {
  for (const f of listMechanismMdxFiles(root, "fm")) {
    const { data } = readMechanismPage(f);
    if (data.fm_id === fmId) return f;
  }
  return null;
}

function populatePm(filePath, root) {
  const { data, content } = readMechanismPage(filePath);
  const hostKey = getHostKey(data.pm_id);
  if (!hostKey) return null;

  const selfHref = pageHref(root, filePath);
  const opts = { hostKey, selfHref, crossBrsOnly: true };
  const links = collectFromText(getPmSourceText(content), opts);

  // Inherit cross-BRS links from parent FM hub block
  const parentFm = data.parent_fm;
  if (parentFm && hubConnections.has(parentFm)) {
    for (const [, link] of hubConnections.get(parentFm)) {
      addLink(links, link, opts);
    }
  }

  // Inherit cross-BRS links from parent FM §5 Connected Mechanisms
  if (parentFm) {
    const fmPath = findFmPath(root, parentFm);
    if (fmPath) {
      const { content: fmContent } = readMechanismPage(fmPath);
      const fmBlock = extractSection(fmContent, /## 5\. Connected Mechanisms/, /\n## 6\. /);
      for (const [, link] of parseBullets(fmBlock)) {
        addLink(links, link, opts);
      }
    }
  }

  // Curated cross-BRS links where page content lacks explicit targets
  if (data.pm_id && CURATED_PM_CONNECTIONS[data.pm_id]) {
    for (const link of CURATED_PM_CONNECTIONS[data.pm_id]) {
      addLink(links, link, opts);
    }
  }

  const newBody = formatBullets(links);
  const existing = extractSection(content, /### 6\.2 Connected BRS Mechanisms/);
  if (newBody === existing) return null;
  if (newBody === "- None listed" && existing && !/^- None listed\s*$/i.test(existing)) {
    return null;
  }

  const updated = replaceSection(
    content,
    /### 6\.2 Connected BRS Mechanisms/,
    newBody,
    /### 6\.3 Connected Primary Mechanisms/,
  );
  if (!updated) return null;
  return matter.stringify(updated, data, { lineWidth: 9999 });
}

function populateFm(filePath) {
  const { data, content } = readMechanismPage(filePath);
  const hostKey = getHostKey(data.fm_id);
  const selfHref = pageHref(root, filePath);
  const childPmHrefs = new Set(
    (data.mechanisms_covered || []).map((pm) => pm.href).filter(Boolean),
  );
  const childPmIds = new Set((data.mechanisms_covered || []).map((pm) => pm.id));

  const links = new Map();

  // Hub-documented FM connections
  if (data.fm_id && hubConnections.has(data.fm_id)) {
    for (const [, link] of hubConnections.get(data.fm_id)) {
      if (hrefIsChild(link.href, childPmHrefs)) continue;
      addLink(links, link, { hostKey, selfHref, crossBrsOnly: false });
    }
  }

  // Roll up cross-BRS from child PM §6.2
  for (const pm of data.mechanisms_covered || []) {
    const pmPath = resolvePmPath(root, pm);
    if (!pmPath) continue;
    const { content: pmContent } = readMechanismPage(pmPath);
    const block = extractSection(pmContent, /### 6\.2 Connected BRS Mechanisms/);
    for (const [href, link] of parseBullets(block)) {
      if (childPmHrefs.has(href)) continue;
      addLink(links, link, { hostKey, selfHref, crossBrsOnly: false });
    }
    for (const [href, link] of collectFromText(getPmSourceText(pmContent), {
      hostKey,
      selfHref,
      crossBrsOnly: false,
    })) {
      if (href === selfHref || childPmHrefs.has(href)) continue;
      const linkKey = getLinkKey(href);
      if (linkKey !== hostKey) {
        addLink(links, link, { hostKey, selfHref, crossBrsOnly: false });
        continue;
      }
      const isSiblingPm = [...childPmIds].some((id) => link.label.includes(id));
      if (!isSiblingPm && !link.label.includes(String(data.fm_id))) {
        addLink(links, link, { hostKey, selfHref, crossBrsOnly: false });
      }
    }
  }

  for (const [href, link] of collectFromText(extractSection(content, /## 1\. Definition/), {
    hostKey,
    selfHref,
    crossBrsOnly: false,
  })) {
    if (href === selfHref || childPmHrefs.has(href)) continue;
    addLink(links, link, { hostKey, selfHref, crossBrsOnly: false });
  }

  const newBody = formatBullets(links);
  const existing = extractSection(content, /## 5\. Connected Mechanisms/, /\n## 6\. /);
  if (newBody === existing) return null;

  const updated = replaceSection(
    content,
    /## 5\. Connected Mechanisms/,
    newBody,
    /## 6\. References/,
  );
  if (!updated) return null;
  return matter.stringify(updated, data, { lineWidth: 9999 });
}

function hrefIsChild(href, childPmHrefs) {
  return childPmHrefs.has(href);
}

let pmChanged = 0;
let fmChanged = 0;

for (const filePath of listMechanismMdxFiles(root, "pm")) {
  const original = fs.readFileSync(filePath, "utf8");
  const updated = populatePm(filePath, root);
  if (updated && updated !== original) {
    fs.writeFileSync(filePath, updated);
    console.log("PM", path.relative(root, filePath));
    pmChanged++;
  }
}

for (const filePath of listMechanismMdxFiles(root, "fm")) {
  const original = fs.readFileSync(filePath, "utf8");
  const updated = populateFm(filePath);
  if (updated && updated !== original) {
    fs.writeFileSync(filePath, updated);
    console.log("FM", path.relative(root, filePath));
    fmChanged++;
  }
}

console.log(`Done. ${pmChanged} PM and ${fmChanged} FM file(s) updated.`);
