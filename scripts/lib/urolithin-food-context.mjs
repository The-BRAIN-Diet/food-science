import matter from 'gray-matter';

// Presentation of existing precursor evidence, independent of PM projections.
export function urolithinFoodContext() {
  const read = id => matter.read('docs/foods/' + id + '.md').data;
  const fruit = read('pomegranates');
  const nut = read('walnuts');
  const find = (food, substance, relationship) => {
    const row = food.substance_relationships.find(r => r.substance === substance && r.relationship === relationship);
    if (!row) throw new Error('Missing precursor evidence on ' + food.id);
    return row;
  };
  const precursor = find(fruit, 'Urolithin A', 'dietary-precursor');
  const juice = find(fruit, 'Ellagic acid', 'contains');
  const kernels = find(nut, 'Ellagitannins', 'contains');
  return [
    {food: fruit.id, title: fruit.title, comment: precursor.input + ' are precursors that gut microbes can convert to Urolithin A. The cited composition assay used commercial pomegranate juice.', composition: juice.source_url, citations: precursor.citation_keys},
    {food: nut.id, title: nut.title, comment: 'Walnut kernels provide ellagitannin-derived precursors. A human walnut intervention found increased urinary Urolithin A after walnut consumption.', composition: kernels.source_url, intervention: 'https://pubmed.ncbi.nlm.nih.gov/39548408/'},
  ];
}
