import React from 'react';
import {usePluginData} from '@docusaurus/useGlobalData';

type Tag = {label: string} | string;

type Document = {
  title: string;
  description?: string;
  permalink: string;
  tags?: Tag[];
};

const CATEGORY_ORDER = [
  'Vegan Specialities',
  'Condiments',
  'Vegetables',
  'Fruits & Berries',
  'Whole Grains & Pseudograins',
  'Legumes & Pulses',
  'Nuts & Seeds',
  'Seafood',
  'Meat & Organ Meats',
  'Dairy & Eggs',
  'Fats & Oils',
  'Fermented Foods',
  'Herbs & Spices',
  'Beverages',
  'Other / Misc',
];

function normalizeTitle(title: string): string {
  return (title || '').toLowerCase();
}

function inferCategoryFromTitle(doc: Document): string | null {
  const t = normalizeTitle(doc.title);

  // Vegan-focused speciality items
  if (
    t.includes('algal oil') ||
    t.includes('duckweed') ||
    t.includes('mankai') ||
    t.includes('nutritional yeast') ||
    t.includes('fortified plant milks')
  ) {
    return 'Vegan Specialities';
  }

  // Condiments
  if (
    ['vinegar', 'hot sauce', 'fermented hot sauce', 'wasabi', 'sauce'].some(name => t.includes(name))
  ) {
    return 'Condiments';
  }

  // Mushrooms (before meat so "Turkey Tail Mushroom" etc. are not classified as meat)
  if (t.includes('mushroom')) {
    return 'Vegetables';
  }

  // Seafood
  if (
    ['salmon', 'mackerel', 'sardines', 'herring', 'tuna', 'cod', 'scallops', 'shrimp', 'mussels', 'oysters', 'clams']
      .some(name => t.includes(name)) ||
    t.includes('fish roe') ||
    t.includes('salmon roe') ||
    t.includes('lumpfish roe') ||
    t.includes('seaweed')
  ) {
    return 'Seafood';
  }

  // Meat & organ meats (kidney = organ only; "kidney beans" → Legumes)
  if (
    ['beef', 'lamb', 'pork', 'turkey', 'chicken'].some(name => t.includes(name)) ||
    t.includes('organ meats') ||
    t.includes('liver') ||
    (t.includes('kidney') && !t.includes('kidney beans')) ||
    t.includes('heart') ||
    t.includes('dark-meat poultry')
  ) {
    return 'Meat & Organ Meats';
  }

  // Dairy & eggs
  if (
    ['milk', 'yogurt', 'cheese', 'kefir', 'eggs', 'egg yolks'].some(name => t.includes(name)) ||
    t.includes('dairy')
  ) {
    return 'Dairy & Eggs';
  }

  // Fats & oils
  if (
    ['olive oil', 'extra virgin olive oil', 'early harvest olive oil', 'avocado oil', 'coconut oil', 'duck fat', 'mct oil']
      .some(name => t.includes(name)) ||
    t.includes('butter') ||
    t.includes('ghee')
  ) {
    return 'Fats & Oils';
  }

  // Fermented foods
  if (
    ['kimchi', 'sauerkraut', 'kombucha', 'miso', 'tempeh', 'natto', 'fermented vegetables'].some(name => t.includes(name))
  ) {
    return 'Fermented Foods';
  }

  // Herbs & spices
  if (
    [
      'herbs',
      'parsley',
      'cilantro',
      'rosemary',
      'sage',
      'oregano',
      'peppermint',
      'lemon balm',
      'cinnamon',
      'ginger',
      'saffron',
      'turmeric',
      'black pepper',
      'capers',
    ].some(name => t.includes(name))
  ) {
    return 'Herbs & Spices';
  }

  // Beverages
  if (
    ['coffee', 'green tea', 'black tea', 'chamomile', 'masala/ chai', 'masala/chai', 'chai'].some(name => t.includes(name))
  ) {
    return 'Beverages';
  }

  // Whole grains & pseudograins
  if (
    ['oats', 'barley', 'quinoa', 'amaranth', 'buckwheat', 'spelt', 'whole grains', 'wheat', 'rice'].some(name =>
      t.includes(name),
    )
  ) {
    return 'Whole Grains & Pseudograins';
  }

  // Legumes & pulses
  if (
    ['lentils', 'chickpeas', 'black beans', 'kidney beans', 'kidney', 'peas', 'lupins', 'soy', 'edamame'].some(name =>
      t.includes(name),
    )
  ) {
    return 'Legumes & Pulses';
  }

  // Nuts & seeds
  if (
    [
      'almonds',
      'cashews',
      'walnuts',
      'pistachios',
      'pumpkin seeds',
      'sesame seeds',
      'sunflower seeds',
      'chia seeds',
      'flax seeds',
      'tahini',
    ].some(name => t.includes(name))
  ) {
    return 'Nuts & Seeds';
  }

  // Fruits & berries
  if (
    [
      'apples',
      'bananas',
      'green bananas',
      'berries',
      'blueberries',
      'strawberries',
      'raspberries',
      'cranberries',
      'grapes',
      'oranges',
      'citrus',
      'pomegranates',
      'cherries',
      'tart cherry',
      'lemon',
    ].some(name => t.includes(name))
  ) {
    return 'Fruits & Berries';
  }

  // Vegetables (leafy, cruciferous, roots, alliums, etc.)
  if (
    [
      'broccoli',
      'cauliflower',
      'jerusalem artichokes',
      'carrots',
      'beetroot',
      'bell peppers',
      'kale',
      'spinach',
      'onions',
      'leeks',
      'dandelion greens',
      'brussels sprouts',
      'cabbage',
      'mushrooms',
      'asparagus',
      'cucumber',
      'potatoes',
      'purple potatoes',
      'pumpkin',
      'swiss chard',
    ].some(name => t.includes(name))
  ) {
    return 'Vegetables';
  }

  return null;
}

function getDocCategory(doc: Document): string {
  const rawTags = (doc.tags ?? []) as Tag[];
  const labels = rawTags.map(t => (typeof t === 'string' ? t : t.label));
  const match = CATEGORY_ORDER.find(cat => labels.includes(cat));
  if (match) {
    return match;
  }
  const inferred = inferCategoryFromTitle(doc);
  return inferred ?? 'Other / Misc';
}

export default function FoodShoppingList(): React.ReactElement {
  const allTags = usePluginData('category-listing') || {};

  // Flatten all docs from the tag map and pick anything under /foods/
  const allDocs = Object.values(allTags).flat() as Document[];
  const foods = Array.from(
    new Map(
      allDocs
        .filter(d => d.permalink && d.permalink.includes('/foods/'))
        .map(d => [d.permalink, d]),
    ).values(),
  );

  if (!foods.length) {
    return <em>no foods found</em>;
  }

  // Group foods by category
  const groups: {[category: string]: Document[]} = {};
  foods.forEach(doc => {
    const cat = getDocCategory(doc);
    if (!groups[cat]) {
      groups[cat] = [];
    }
    groups[cat].push(doc);
  });

  const categories = CATEGORY_ORDER.filter(cat => groups[cat]?.length);

  return (
    <div style={{overflowX: 'auto'}}>
      {categories.map(category => {
        const docs = groups[category].slice().sort((a, b) => a.title.localeCompare(b.title));

        // Chunk docs into rows of up to 3 items for a 3‑column layout
        const rows: Document[][] = [];
        for (let i = 0; i < docs.length; i += 3) {
          rows.push(docs.slice(i, i + 3));
        }

        return (
          <section key={category} style={{marginBottom: '2rem'}}>
            <h2>{category}</h2>
            <table className="table">
              <thead>
                <tr>
                  <th style={{width: '33%'}}>Food</th>
                  <th style={{width: '33%'}}>Food</th>
                  <th style={{width: '34%'}}>Food</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map(doc => (
                      <td key={doc.permalink}>
                        <a href={doc.permalink}>{doc.title}</a>
                      </td>
                    ))}
                    {/* If the last row has fewer than 3 items, fill remaining cells to keep layout aligned */}
                    {Array.from({length: 3 - row.length})
                      .fill(null)
                      .map((_, idx) => (
                        <td key={`empty-${rowIndex}-${idx}`} />
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        );
      })}
    </div>
  );
}

