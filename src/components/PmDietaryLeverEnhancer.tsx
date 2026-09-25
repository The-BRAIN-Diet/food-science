import React, { useEffect } from "react";
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
      ({ number, label, href }) =>
        `<a href="${escapeHtml(href || pmReferenceHref(number))}">[${number}] ${escapeHtml(label)}</a>`,
    )
    .join("; ")}</span>`;
}

function buildDetailHtml(d: DietaryLeverDisclosure): string {
  const limitation = d.evidenceLimitation
    ? `<p class="brs-dietary-lever-detail-limit"><span class="brs-dietary-lever-detail-k">Limitation</span> = ${escapeHtml(d.evidenceLimitation)}</p>`
    : "";

  return `
    <div class="brs-dietary-lever-detail-inner">
      <p class="brs-dietary-lever-detail-title">${escapeHtml(d.title)}</p>
      <p><span class="brs-dietary-lever-detail-k">Input</span> = ${escapeHtml(d.title)}</p>
      <p><span class="brs-dietary-lever-detail-k">Input type</span> = ${escapeHtml(d.inputType)}</p>
      <p><span class="brs-dietary-lever-detail-k">Biological role</span> = ${escapeHtml(d.biologicalRole)}</p>
      <p class="brs-dietary-lever-detail-evidence"><span class="brs-dietary-lever-detail-k">Evidence source</span> = ${renderEvidenceLinks(d.evidenceReferences)}</p>
      ${limitation}
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

function presentationSectionForListItem(li: HTMLLIElement): string {
  let item = li.closest<HTMLElement>(".brs-fm-hub-item");
  while (item) {
    const summary = item.querySelector<HTMLElement>(
      ":scope > .brs-fm-hub-shell > .brs-fm-hub-summary",
    );
    const match = String(summary?.textContent || "").match(/\b(3\.1\.[123])\b/);
    if (match) return match[1];
    item = item.parentElement?.closest<HTMLElement>(".brs-fm-hub-item") || null;
  }
  return "";
}

function closeAllExcept(root: HTMLElement, keep: HTMLElement | null) {
  root.querySelectorAll<HTMLElement>(".brs-dietary-lever-detail:not([hidden])").forEach((panel) => {
    if (panel === keep) return;
    panel.hidden = true;
    const item = panel.closest<HTMLElement>(".brs-dietary-lever-item");
    if (item) item.dataset.brsDietaryLeverPinned = "false";
    const btn = item?.querySelector<HTMLButtonElement>(
      ".brs-dietary-lever-trigger",
    );
    if (btn) btn.setAttribute("aria-expanded", "false");
  });
}

function setDisclosureOpen(
  item: HTMLLIElement,
  detail: HTMLElement,
  trigger: HTMLButtonElement,
  open: boolean,
) {
  detail.hidden = !open;
  trigger.setAttribute("aria-expanded", open ? "true" : "false");
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
  trigger.title = "View evidence for this dietary input";
  trigger.textContent = parsed.label;

  const qualifierSpan = document.createElement("span");
  qualifierSpan.className = "brs-dietary-lever-qualifier";
  qualifierSpan.textContent = disclosure.compactQualifier
    ? ` ${disclosure.compactQualifier}`
    : "";

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
  detail.setAttribute("aria-label", `${disclosure.title} — dietary evidence`);
  detail.innerHTML = buildDetailHtml(disclosure);

  li.textContent = "";
  li.append(trigger);
  if (disclosure.compactQualifier) li.append(qualifierSpan);
  if (parsed.foods) li.append(foodsSpan);
  li.append(detail);

  const openTransiently = () => {
    closeAllExcept(root, detail);
    setDisclosureOpen(li, detail, trigger, true);
  };

  li.addEventListener("pointerenter", (e) => {
    if ((e as PointerEvent).pointerType === "touch") return;
    openTransiently();
  });

  li.addEventListener("pointerleave", (e) => {
    if ((e as PointerEvent).pointerType === "touch") return;
    if (li.dataset.brsDietaryLeverPinned === "true" || li.contains(document.activeElement)) return;
    setDisclosureOpen(li, detail, trigger, false);
  });

  li.addEventListener("focusin", openTransiently);

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
      trigger.focus();
    }
  });
}

export default function PmDietaryLeverEnhancer({ frontMatter }: Props): React.ReactNode {
  useEffect(() => {
    const map = buildDietaryLeverDisclosureMap(frontMatter);
    if (!map.size) return;

    const root = document.querySelector<HTMLElement>(".theme-doc-markdown, .markdown");
    if (!root) return;

    const onDocClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (root.contains(t) && (t as HTMLElement).closest?.(".brs-dietary-lever-item")) return;
      closeAllExcept(root, null);
    };

    document.addEventListener("click", onDocClick);

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
  }, [frontMatter]);

  return null;
}
