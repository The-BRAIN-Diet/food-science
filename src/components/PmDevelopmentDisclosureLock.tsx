import React, {useEffect, useRef} from 'react';

/** Page-local presentation hold. Research records and scientific decisions stay intact. */
export default function PmDevelopmentDisclosureLock(): React.JSX.Element {
  const marker = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const root = marker.current?.closest<HTMLElement>('.theme-doc-markdown, .markdown');
    if (!root) return;
    const originals = new Map<Element, Map<string, string | null>>();
    const set = (node: Element, name: string, value: string | null) => {
      if (node.getAttribute(name) === value) return;
      if (!originals.has(node)) originals.set(node, new Map());
      const attrs = originals.get(node)!;
      if (!attrs.has(name)) attrs.set(name, node.getAttribute(name));
      if (value === null) node.removeAttribute(name); else node.setAttribute(name, value);
    };
    const close = () => {
      root.querySelectorAll('[aria-expanded]').forEach(node => {
        set(node, 'aria-expanded', 'false');
        set(node, 'aria-disabled', 'true');
        set(node, 'title', 'Unavailable while PM8 mission and scope are under scientific review.');
        if (node.tagName === 'BUTTON') set(node, 'disabled', '');
      });
      root.querySelectorAll('details').forEach(node => set(node, 'open', null));
      root.querySelectorAll('summary').forEach(node => {
        set(node, 'aria-disabled', 'true'); set(node, 'tabindex', '-1');
      });
      root.querySelectorAll('.brs-fm-hub-panel, .brs-dietary-lever-detail').forEach(node => set(node, 'hidden', ''));
    };
    const prevent = (event: Event) => {
      const target = event.target;
      if (target instanceof Element && target.closest('[aria-expanded], summary')) {
        event.preventDefault(); event.stopImmediatePropagation();
      }
    };
    close();
    root.addEventListener('click', prevent, true);
    root.addEventListener('keydown', prevent, true);
    const observer = new MutationObserver(close);
    observer.observe(root, {subtree: true, childList: true, attributes: true,
      attributeFilter: ['open', 'hidden', 'aria-expanded', 'disabled']});
    return () => {
      observer.disconnect();
      root.removeEventListener('click', prevent, true);
      root.removeEventListener('keydown', prevent, true);
      originals.forEach((attrs, node) => attrs.forEach((value, name) => {
        if (value === null) node.removeAttribute(name); else node.setAttribute(name, value);
      }));
    };
  }, []);
  return <>
    <span ref={marker} data-pm-disclosures-locked="true" hidden />
    <style>{`
      .markdown:has([data-pm-disclosures-locked]) .brs-fm-hub-panel,
      .markdown:has([data-pm-disclosures-locked]) .brs-dietary-lever-detail,
      .markdown:has([data-pm-disclosures-locked]) details > :not(summary) { display: none !important; }
      .markdown:has([data-pm-disclosures-locked]) [aria-expanded],
      .markdown:has([data-pm-disclosures-locked]) summary { pointer-events: none; cursor: not-allowed; }
    `}</style>
  </>;
}
