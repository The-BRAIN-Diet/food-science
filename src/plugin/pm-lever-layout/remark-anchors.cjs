// Register IDs emitted by native JSX, which Docusaurus only collects from its own headings.
module.exports = function remarkAnchors() {
  return tree => {
    function visit(node) {
      if (['mdxJsxFlowElement', 'mdxJsxTextElement'].includes(node.type) &&
          /^[a-z][a-z0-9]*$/.test(node.name ?? '') &&
          node.attributes.some(attr => attr.name === 'id' && typeof attr.value === 'string')) {
        node.attributes.unshift({type: 'mdxJsxAttribute', name: 'as', value: node.name});
        node.name = 'RegisteredAnchor';
      }
      // Audit panels are selected by a query parameter after hydration.
      // Preserve browser-relative query navigation on the current document.
      if (node.type === 'link' && /^\?review=1#[\w-]+$/.test(node.url)) {
        node.type = 'mdxJsxTextElement';
        node.name = 'EvidenceAuditLink';
        node.attributes = [{type: 'mdxJsxAttribute', name: 'fragment', value: node.url.split('#')[1]}];
      }
      node.children?.forEach(visit);
    }
    visit(tree);
  };
};
