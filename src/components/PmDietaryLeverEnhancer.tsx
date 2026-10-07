import React, { useEffect } from "react";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {
  buildDietaryLeverDisclosureMap,
  dietaryLeverBulletKey,
  parseLeverBullet,
  pmReferenceHref,
  type DietaryLeverDisclosure,
  type EvidenceReference,
} from "@site/src/lib/dietaryLeverDisclosure";

type Props = {
  frontMatter: Record<string, unknown>;
};

function renderEvidenceLinks(refs: EvidenceReference[]): string {
  if (!refs.length) return "<span>No linked reference available.</span>";
  return `<span class="brs-dietary-lever-detail-references">${refs
    .map(
      ({ number, authorYear, href }) =>
        `${escapeHtml(authorYear)} <a href="${escapeHtml(href || pmReferenceHref(number))}">[${number}]</a>`,
    )
    .join("; ")}</span>`;
}

function buildDescriptionHtml(d: DietaryLeverDisclosure): string {
  const description = String(d.readerDescription || "").trim();
  if (!description) return "";
  return `<div class="brs-dietary-lever-description"><p>${escapeHtml(description)}</p></div>`;
}

function buildResearchLinkHtml(d: DietaryLeverDisclosure): string {
  const finding = d.supportingFinding;
  return finding
    ? `<p class="brs-dietary-lever-finding">Supporting mechanism research: <a href="${escapeHtml(finding.href)}">${escapeHtml(finding.label)}</a></p>`
    : "";
}

function renderInputValue(d: DietaryLeverDisclosure): string {
  const label = escapeHtml(d.title);
  if (!d.inputHref) return label;
  return `<a class="brs-dietary-lever-input-link" href="${escapeHtml(d.inputHref)}">${label}</a>`;
}

function buildDetailHtml(d: DietaryLeverDisclosure): string {
  const limitation = d.evidenceLimitation
    ? `<p class="brs-dietary-lever-detail-limit"><span class="brs-dietary-lever-detail-k">Limitation</span> = ${escapeHtml(d.evidenceLimitation)}</p>`
    : "";

  return `
    <div class="brs-dietary-lever-detail-inner">
      ${buildDescriptionHtml(d)}
      <p><span class="brs-dietary-lever-detail-k">Input</span> = ${renderInputValue(d)}</p>
      <p><span class="brs-dietary-lever-detail-k">Input type</span> = ${escapeHtml(d.inputType)}</p>
      <p><span class="brs-dietary-lever-detail-k">Biological role</span> = ${renderInlineMarkdownLinks(d.biologicalRole)}</p>
      <p class="brs-dietary-lever-detail-evidence"><span class="brs-dietary-lever-detail-k">Evidence source</span> = ${renderEvidenceLinks(d.evidenceReferences)}</p>
      ${limitation}
      ${buildResearchLinkHtml(d)}
    </div>
  `.trim();
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderInlineMarkdownLinks(text: string): string {
  return escapeHtml(text).replace(
    /\[([^\]]+)\]\((\/docs\/[^)]+)\)/g,
    '<a href="$2">$1</a>',
  );
}

function presentationSectionForListItem(li: HTMLLIElement): string {
  const section = li.closest<HTMLElement>("[data-pm-lever-section]")?.getAttribute("data-pm-lever-section");
  if (section) return section;
  const group = li.closest<HTMLElement>("[data-pm-lever-group]")?.getAttribute("data-pm-lever-group");
  if (group) return group;
  let item = li.closest<HTMLElement>(".brs-fm-hub-item");
  while (item) {
    const emergingSupport = item.getAttribute("data-brs-emerging-support");
    if (emergingSupport) return `kc-emerging-support:${emergingSupport}`;
    const summary = item.querySelector<HTMLElement>(
      ":scope > .brs-fm-hub-shell > .brs-fm-hub-summary",
    );
    const text = String(summary?.textContent || "");
    const dietary = text.match(/\b(?:[34]\.1|1\.1)\.([123])\b/);
    if (dietary) return `3.1.${dietary[1]}`;
    const other = text.match(/\b[34]\.([23])\b/);
    if (other) return `3.${other[1]}`;
    item = item.parentElement?.closest<HTMLElement>(".brs-fm-hub-item") || null;
  }

  const details = li.closest<HTMLDetailsElement>("details");
  if (details) {
    let nearestHeadingSection = "";
    details.querySelectorAll<HTMLElement>("h3").forEach((heading) => {
      if (heading.compareDocumentPosition(li) & Node.DOCUMENT_POSITION_FOLLOWING) {
        const match = String(heading.textContent || "").match(/\b(?:[34]\.1|1\.1)\.([123])\b/);
        if (match) nearestHeadingSection = `3.1.${match[1]}`;
      }
    });
    if (nearestHeadingSection) return nearestHeadingSection;

    const summary = details.querySelector<HTMLElement>(":scope > summary");
    const match = String(summary?.textContent || "").match(/\b[34]\.([23])\b/);
    if (match) return `3.${match[1]}`;
  }
  return "";
}

function closeAllExcept(root: HTMLElement, keep: HTMLElement | null) {
  root.querySelectorAll<HTMLElement>(".brs-dietary-lever-detail:not([hidden])").forEach((panel) => {
    if (panel === keep) return;
    panel.hidden = true;
    const item = panel.closest<HTMLElement>(
      ".brs-dietary-lever-item, .brs-evidence-title-wrap",
    );
    if (item) item.dataset.brsDietaryLeverPinned = "false";
    const btn = item?.querySelector<HTMLButtonElement>(
      ".brs-dietary-lever-trigger, .brs-evidence-title-trigger",
    );
    if (btn?.classList.contains("brs-dietary-lever-trigger")) {
      btn.setAttribute("aria-expanded", "false");
    }
  });
}

function setDisclosureOpen(
  item: HTMLElement,
  detail: HTMLElement,
  trigger: HTMLButtonElement,
  open: boolean,
  disclosureControl = true,
) {
  detail.hidden = !open;
  if (disclosureControl) {
    trigger.setAttribute("aria-expanded", open ? "true" : "false");
  }
  if (!open) item.dataset.brsDietaryLeverPinned = "false";
}

function enhanceListItem(li: HTMLLIElement, disclosure: DietaryLeverDisclosure, root: HTMLElement) {
  if (li.dataset.brsDietaryLeverInit === "true") return;
  const parsed = parseLeverBullet(li.textContent || "");
  if (!parsed) return;

  li.dataset.brsDietaryLeverInit = "true";
  li.classList.add("brs-dietary-lever-item");

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "brs-dietary-lever-trigger";
  trigger.setAttribute("aria-expanded", "false");
  trigger.setAttribute("aria-haspopup", "dialog");
  trigger.title = "View five-field evidence";
  trigger.textContent = parsed.label;

  const titleLink = disclosure.titleHref ? document.createElement("a") : null;
  if (titleLink) {
    titleLink.href = disclosure.titleHref!;
    titleLink.textContent = parsed.label;
    titleLink.className = "brs-kc-title-link";
    titleLink.addEventListener("click", (event) => event.stopPropagation());
    trigger.textContent = "▸";
    trigger.setAttribute("aria-label", `Expand ${parsed.label}`);
  }

  const originLink = disclosure.originTag ? document.createElement("a") : null;
  if (originLink) {
    originLink.href = disclosure.originTag!.href;
    originLink.textContent = disclosure.originTag!.text;
    originLink.className = "brs-dietary-lever-origin-link";
    originLink.addEventListener("click", (event) => event.stopPropagation());
  }

  const qualifierSpan = document.createElement("span");
  qualifierSpan.className = "brs-dietary-lever-qualifier";
  qualifierSpan.textContent = disclosure.compactQualifier
    ? ` — ${disclosure.compactQualifier}`
    : "";

  const upstreamWrap = document.createElement("span");
  upstreamWrap.className = "brs-dietary-lever-upstream";
  const upstreamIndicators = disclosure.upstreamIndicators || [];
  upstreamIndicators.forEach((indicator, index) => {
    const prefix =
      disclosure.compactQualifier || index > 0 ? " · [" : " — [";
    upstreamWrap.append(document.createTextNode(prefix));
    const link = document.createElement("a");
    link.className = "brs-dietary-lever-upstream-link";
    link.href = indicator.href;
    link.textContent = indicator.text;
    link.addEventListener("click", (event) => event.stopPropagation());
    upstreamWrap.append(link);
    upstreamWrap.append(document.createTextNode("]"));
  });

  const foodsSpan = document.createElement("span");
  foodsSpan.className = "brs-dietary-lever-foods";
  foodsSpan.textContent = parsed.foods ? ` ← ${parsed.foods}` : "";

  const detailId = `brs-dietary-lever-${Math.random().toString(36).slice(2, 9)}`;
  trigger.setAttribute("aria-controls", detailId);

  const detail = document.createElement("div");
  detail.id = detailId;
  detail.className = "brs-dietary-lever-detail";
  detail.hidden = true;
  detail.setAttribute("role", "dialog");
  detail.setAttribute("aria-modal", "false");
  detail.setAttribute("aria-label", `${disclosure.title} — five-field evidence`);
  detail.innerHTML = buildDetailHtml(disclosure);

  li.textContent = "";
  li.append(trigger);
  if (titleLink) li.append(document.createTextNode(" "), titleLink);
  if (originLink) li.append(document.createTextNode(" · ["), originLink, document.createTextNode("]"));
  if (disclosure.compactQualifier) li.append(qualifierSpan);
  if (upstreamIndicators.length) li.append(upstreamWrap);
  if (parsed.foods) li.append(foodsSpan);
  li.append(detail);

  const openTransiently = () => {
    closeAllExcept(root, detail);
    setDisclosureOpen(li, detail, trigger, true);
  };

  trigger.addEventListener("pointerenter", (e) => {
    if ((e as PointerEvent).pointerType === "touch") return;
    openTransiently();
  });

  li.addEventListener("pointerleave", (e) => {
    if ((e as PointerEvent).pointerType === "touch") return;
    if (li.dataset.brsDietaryLeverPinned === "true" || li.contains(document.activeElement)) return;
    setDisclosureOpen(li, detail, trigger, false);
  });

  let suppressFocusPreview = false;
  const dismissOriginPreview = () => {
    if (li.dataset.brsDietaryLeverPinned !== "true") setDisclosureOpen(li, detail, trigger, false);
  };
  originLink?.addEventListener("pointerenter", dismissOriginPreview);
  originLink?.addEventListener("focus", dismissOriginPreview);
  li.addEventListener("focusin", (e) => {
    if (!suppressFocusPreview && (e.target === trigger || detail.contains(e.target as Node))) openTransiently();
  });

  li.addEventListener("focusout", (e) => {
    if (li.dataset.brsDietaryLeverPinned === "true") return;
    const next = e.relatedTarget as Node | null;
    if (!next || !li.contains(next)) setDisclosureOpen(li, detail, trigger, false);
  });

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    const wasPinned = li.dataset.brsDietaryLeverPinned === "true";
    if (wasPinned) {
      setDisclosureOpen(li, detail, trigger, false);
      return;
    }
    closeAllExcept(root, detail);
    li.dataset.brsDietaryLeverPinned = "true";
    setDisclosureOpen(li, detail, trigger, true);
    detail.tabIndex = -1;
    detail.focus();
  });

  li.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      setDisclosureOpen(li, detail, trigger, false);
      suppressFocusPreview = true;
      trigger.focus();
      suppressFocusPreview = false;
    }
  });
}

function enhanceEvidenceTitle(
  wrapper: HTMLElement,
  disclosure: DietaryLeverDisclosure,
  root: HTMLElement,
) {
  const host = wrapper.querySelector<HTMLElement>(
    ":scope > .brs-fm-hub-shell > .brs-fm-hub-summary-row > .brs-evidence-title-wrap",
  );
  const trigger = host?.querySelector<HTMLButtonElement>(
    ":scope > .brs-evidence-title-trigger",
  );
  if (!host || !trigger || host.dataset.brsDietaryLeverInit === "true") return;

  host.dataset.brsDietaryLeverInit = "true";
  const detailId = `brs-emerging-support-${Math.random().toString(36).slice(2, 9)}`;
  trigger.title = "View five-field evidence; activate to expand research details";

  const detail = document.createElement("div");
  detail.id = detailId;
  detail.className = "brs-dietary-lever-detail brs-evidence-title-detail";
  detail.hidden = true;
  detail.setAttribute("role", "dialog");
  detail.setAttribute("aria-modal", "false");
  detail.setAttribute("aria-label", `${disclosure.title} — five-field evidence`);
  detail.innerHTML = buildDetailHtml(disclosure);
  host.append(detail);

  const openTransiently = () => {
    closeAllExcept(root, detail);
    setDisclosureOpen(host, detail, trigger, true, false);
  };

  host.addEventListener("pointerenter", (event) => {
    if ((event as PointerEvent).pointerType === "touch") return;
    openTransiently();
  });
  host.addEventListener("pointerleave", (event) => {
    if ((event as PointerEvent).pointerType === "touch") return;
    if (host.dataset.brsDietaryLeverPinned === "true" || host.contains(document.activeElement)) return;
    setDisclosureOpen(host, detail, trigger, false, false);
  });
  host.addEventListener("focusin", openTransiently);
  host.addEventListener("focusout", (event) => {
    if (host.dataset.brsDietaryLeverPinned === "true") return;
    const next = event.relatedTarget as Node | null;
    if (!next || !host.contains(next)) setDisclosureOpen(host, detail, trigger, false, false);
  });

  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    setDisclosureOpen(host, detail, trigger, false, false);
    wrapper.querySelector<HTMLButtonElement>(".brs-fm-hub-toggle")?.click();
  });
  host.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    event.stopPropagation();
    setDisclosureOpen(host, detail, trigger, false, false);
    trigger.focus();
  });
}

export default function PmDietaryLeverEnhancer({ frontMatter }: Props): React.ReactNode {
  const { metadata } = useDoc();
  const { siteConfig } = useDocusaurusContext();
  const canonicalPmUrl = new URL(metadata.permalink, siteConfig.url).href;
  useEffect(() => {
    const map = buildDietaryLeverDisclosureMap(frontMatter);
    for (const disclosure of map.values()) {
      if (disclosure.titleHref) {
        disclosure.titleHref = new URL(disclosure.titleHref, canonicalPmUrl).href;
      }
      if (disclosure.inputHref) {
        disclosure.inputHref = new URL(disclosure.inputHref, canonicalPmUrl).href;
      }
      if (disclosure.originTag) {
        disclosure.originTag.href = new URL(disclosure.originTag.href, canonicalPmUrl).href;
      }
      if (disclosure.supportingFinding) {
        // Same-page Finding anchors must remain local on review and canonical pages.
        if (!disclosure.supportingFinding.href.startsWith("#")) {
          disclosure.supportingFinding.href = new URL(disclosure.supportingFinding.href, canonicalPmUrl).href;
        }
      }
      for (const indicator of disclosure.upstreamIndicators || []) {
        indicator.href = new URL(indicator.href, canonicalPmUrl).href;
      }
    }
    if (!map.size) return;

    const root = document.querySelector<HTMLElement>(".theme-doc-markdown, .markdown");
    if (!root) return;

    const onDocClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        root.contains(t) &&
        (t as HTMLElement).closest?.(
          ".brs-dietary-lever-item, .brs-evidence-title-wrap",
        )
      ) {
        return;
      }
      closeAllExcept(root, null);
    };

    document.addEventListener("click", onDocClick);

    root.querySelectorAll<HTMLElement>("[data-brs-emerging-support]").forEach((wrapper) => {
      const slug = String(wrapper.getAttribute("data-brs-emerging-support") || "").trim();
      const trigger = wrapper.querySelector<HTMLButtonElement>(
        ".brs-emerging-support-title-trigger",
      );
      const label = String(trigger?.textContent || "").trim();
      if (!slug || !label) return;
      const disclosure = map.get(
        dietaryLeverBulletKey(label, "", `kc-emerging-support:${slug}`),
      );
      if (disclosure) enhanceEvidenceTitle(wrapper, disclosure, root);
    });

    root.querySelectorAll<HTMLElement>("[data-brs-kc-evidence-resource]").forEach((wrapper) => {
      const trigger = wrapper.querySelector<HTMLButtonElement>(
        ".brs-evidence-title-trigger",
      );
      const label = String(trigger?.textContent || "").trim();
      if (!label) return;
      const disclosure = map.get(dietaryLeverBulletKey(label, ""));
      if (disclosure) enhanceEvidenceTitle(wrapper, disclosure, root);
    });

    root.querySelectorAll("li").forEach((li) => {
      if (!(li instanceof HTMLLIElement)) return;
      const parsed = parseLeverBullet(li.textContent || "");
      if (!parsed) return;
      const section = presentationSectionForListItem(li);
      const disclosure =
        map.get(dietaryLeverBulletKey(parsed.label, parsed.foods, section)) ||
        map.get(dietaryLeverBulletKey(parsed.label, parsed.foods));
      if (disclosure) enhanceListItem(li, disclosure, root);
    });

    return () => document.removeEventListener("click", onDocClick);
  }, [frontMatter, canonicalPmUrl]);

  return null;
}
