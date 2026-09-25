import React, { useEffect } from "react";
import derivedIndex from "@site/src/data/pm-sop-derived-interventions.generated.json";

type DerivedEvidence = {
  status?: string;
  level?: string;
  limitation?: string;
  references?: Array<{ citation_key: string; label: string; href: string }>;
};

type DerivedIntervention = {
  intervention_id: string | null;
  author_brs_id: string;
  category_title: string;
  author_hub_href: string | null;
  action: string;
  explanation: string;
  presentation_role: string;
  is_direct_dietary_lever: boolean;
  context: string;
  evidence: DerivedEvidence | null;
};

type Props = {
  frontMatter: Record<string, unknown> | undefined;
};

function findSystemOptimisationPanel(root: HTMLElement): HTMLElement | null {
  const summaries = root.querySelectorAll<HTMLElement>(".brs-fm-hub-summary strong");
  for (const strong of summaries) {
    const text = strong.textContent || "";
    if (/System Optimisation Practices/i.test(text)) {
      const shell = strong.closest(".brs-fm-hub-shell");
      const panel = shell?.querySelector<HTMLElement>(".brs-fm-hub-panel");
      if (panel) return panel;
    }
  }
  return null;
}

function renderDerivedBlock(rows: DerivedIntervention[]): HTMLElement {
  const wrap = document.createElement("div");
  wrap.className = "brs-pm-sop-derived";
  wrap.dataset.brsPmSopDerived = "true";

  const intro = document.createElement("p");
  intro.className = "brs-pm-sop-derived-intro";
  intro.textContent =
    "Derived from canonical BRS hub interventions — not Direct Dietary Levers. Qualified cross-BRS relationships preserve preclinical/mechanistic scope.";
  wrap.appendChild(intro);

  for (const row of rows) {
    const item = document.createElement("div");
    item.className = "brs-pm-sop-derived-item";
    item.dataset.brsPmSopDerivedItem = row.intervention_id || "derived";

    const headline = document.createElement("p");
    headline.className = "brs-pm-sop-derived-headline";
    headline.innerHTML = `<strong>Upstream metabolic intervention (${row.author_brs_id}):</strong> <strong>${escapeHtml(row.action)}</strong> ${escapeHtml(row.explanation)}`;
    item.appendChild(headline);

    if (row.author_hub_href) {
      const auth = document.createElement("p");
      auth.className = "brs-pm-sop-derived-authorship";
      auth.innerHTML = `Canonical authorship: <a href="${row.author_hub_href}">${escapeHtml(row.author_brs_id)} — ${escapeHtml(row.category_title)}</a>`;
      item.appendChild(auth);
    }

    if (row.context) {
      const ctx = document.createElement("p");
      ctx.className = "brs-pm-sop-derived-row";
      ctx.innerHTML = `<span class="brs-pm-sop-derived-k">Context:</span> ${escapeHtml(row.context)}`;
      item.appendChild(ctx);
    }

    if (row.evidence) {
      const meta = [row.evidence.status, row.evidence.level].filter(Boolean).join(" · ");
      if (meta) {
        const ev = document.createElement("p");
        ev.className = "brs-pm-sop-derived-row";
        ev.innerHTML = `<span class="brs-pm-sop-derived-k">Evidence:</span> ${escapeHtml(meta)}`;
        item.appendChild(ev);
      }
      if (row.evidence.limitation) {
        const lim = document.createElement("p");
        lim.className = "brs-pm-sop-derived-row brs-pm-sop-derived-limitation";
        lim.innerHTML = `<span class="brs-pm-sop-derived-k">Limitation:</span> ${escapeHtml(row.evidence.limitation)}`;
        item.appendChild(lim);
      }
      if (row.evidence.references?.length) {
        const refs = document.createElement("ul");
        refs.className = "brs-pm-sop-derived-references";
        for (const ref of row.evidence.references) {
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.href = ref.href;
          a.textContent = ref.label;
          li.appendChild(a);
          refs.appendChild(li);
        }
        item.appendChild(refs);
      }
    }

    wrap.appendChild(item);
  }

  return wrap;
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export default function PmSystemOptimisationEnhancer({ frontMatter }: Props): React.ReactNode {
  useEffect(() => {
    const pmId = typeof frontMatter?.pm_id === "string" ? frontMatter.pm_id : "";
    if (!pmId) return;

    const byPmId = (derivedIndex as { byPmId?: Record<string, DerivedIntervention[]> }).byPmId || {};
    const rows = byPmId[pmId];
    if (!rows?.length) return;

    const root = document.querySelector<HTMLElement>(".theme-doc-markdown, .markdown");
    if (!root) return;

    const panel = findSystemOptimisationPanel(root);
    if (!panel || panel.querySelector("[data-brs-pm-sop-derived]")) return;

    panel.appendChild(renderDerivedBlock(rows));
  }, [frontMatter]);

  return null;
}
