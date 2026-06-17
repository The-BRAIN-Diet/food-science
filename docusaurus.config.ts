import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** WIP recipes: included in dev (`npm start`); omitted from production builds (thebraindiet.org). */
const includeInternalRecipeWip =
  process.env.NODE_ENV !== 'production' ||
  process.env.INCLUDE_INTERNAL_DOCS === 'true';

const brsOverviewDocIds = new Set([
  'biological-targets/neurotransmitter-regulation',
  'biological-targets/methylation-one-carbon-metabolism',
  'biological-targets/inflammation-oxidative-stress',
  'biological-targets/mitochondrial-function-bioenergetics',
  'biological-targets/gut-brain-axis-enteric-nervous-system',
  'biological-targets/metabolic-neuroendocrine-stress',
  'biological-targets/cross-system-regulation',
  'biological-targets/brs-x/ecs/brs-x-ecs',
  'biological-targets/brs-x/hormones/brs-x-hormones',
]);

function removeDuplicateBrsOverviewDocs(items: any[]): any[] {
  const isDuplicateLeaf = (item: any): boolean =>
    (item.type === 'doc' && brsOverviewDocIds.has(item.id)) ||
    (item.type === 'link' && typeof item.docId === 'string' && brsOverviewDocIds.has(item.docId));

  return items
    // Keep BRS category nodes, remove only duplicate leaf doc/link entries.
    .filter((item) => !isDuplicateLeaf(item))
    .map((item) =>
      item.type === 'category'
        ? { ...item, items: removeDuplicateBrsOverviewDocs(item.items ?? []) }
        : item,
    );
}

function isHiddenSidebarItem(item: any): boolean {
  const hiddenPrefixes = [
    'therapeutic-areas',
    'interventions',
    'partners',
    'symptoms',
    'training',
    'system',
    'CONTRIBUTION-LEVEL-SYSTEM',
  ];
  const hiddenLabels = [
    'Therapeutic Areas',
    'Interventions',
    'Partners',
    'Symptoms',
    'Training',
    'System',
    'Contribution Level System',
    'Functional metrics',
  ];

  const docId =
    (item.type === 'doc' && item.id) ||
    (item.type === 'link' && item.docId) ||
    (item.type === 'category' && item.link?.id);
  if (
    typeof docId === 'string' &&
    hiddenPrefixes.some((prefix) => docId === prefix || docId.startsWith(`${prefix}/`))
  ) {
    return true;
  }
  if (item.type === 'category') {
    const label = String(item.label || '').toLowerCase();
    if (hiddenLabels.some((hidden) => hidden.toLowerCase() === label)) {
      return true;
    }
    if (hiddenPrefixes.includes(label)) {
      return true;
    }
  }
  return false;
}

function removeHiddenSidebarItems(items: any[]): any[] {
  const filtered = items
    .filter((item) => !isHiddenSidebarItem(item))
    .map((item) =>
      item.type === 'category'
        ? { ...item, items: removeHiddenSidebarItems(item.items ?? []) }
        : item,
    );

  // Drop categories whose children were all hidden (Docusaurus rejects empty categories).
  return filtered.filter((item) => {
    if (item.type !== 'category') return true;
    const childCount = item.items?.length ?? 0;
    return childCount > 0 || item.link != null;
  });
}

function customizeDocsSidebar(items: any[]): any[] {
  return removeHiddenSidebarItems(removeDuplicateBrsOverviewDocs(items));
}

const config: Config = {
  title: 'The BRAIN Diet',
  tagline: 'Bio Regulation Algorithm and Integrated Neuronutrition',
  favicon: 'site-icon/white.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://thebraindiet.org',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  clientModules: [require.resolve('./src/client/resetSidebarState.ts')],

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarCollapsible: true,
          sidebarCollapsed: true,
          async sidebarItemsGenerator(args) {
            const sidebarItems = await args.defaultSidebarItemsGenerator(args);
            return customizeDocsSidebar(sidebarItems);
          },
          exclude: includeInternalRecipeWip ? [] : ['**/recipes/WIP/**'],
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          // Exclude tag listing routes that Docusaurus generates under
          // /docs/tags/docs/tags/** so the sitemap only exposes the clean
          // /docs/tags/<tag> URLs.
          ignorePatterns: [
            '/tags/**',
            '/docs/tags/docs/tags/**',
            ...(includeInternalRecipeWip ? [] : ['/docs/recipes/WIP/**']),
          ],
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],
  "plugins": [
    './src/plugin/category-listing',
    [
      './src/plugin/bibtex-loader',
      {
        files: [
          {
            id: 'BRAIN-diet',
            path: 'bibtex/BRAIN-diet.bib',
          },
        ],
      },
    ],
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        indexPages: true,
      },
    ],
    [
      require.resolve('@docusaurus/plugin-client-redirects'),
      {
        redirects: [
          // BRS1 FM3–FM5 → FM2–FM4 after FM2 removal
          { to: '/docs/biological-targets/brs1/fm2/brs1-fm2-cholinergic-function', from: '/docs/biological-targets/brs1/fm3/brs1-fm3-cholinergic-function' },
          { to: '/docs/biological-targets/brs1/fm2/brs1-fm2-pm5-acetylcholine-synthesis-support', from: '/docs/biological-targets/brs1/fm3/brs1-fm3-pm5-acetylcholine-synthesis-support' },
          { to: '/docs/biological-targets/brs1/fm3/brs1-fm3-phospholipid-mediated-dha-delivery-and-membrane-integration', from: '/docs/biological-targets/brs1/fm4/brs1-fm4-phospholipid-mediated-dha-delivery-and-membrane-integration' },
          { to: '/docs/biological-targets/brs1/fm3/brs1-fm3-pm6-neuronal-membrane-dha-incorporation', from: '/docs/biological-targets/brs1/fm4/brs1-fm4-pm6-neuronal-membrane-dha-incorporation' },
          { to: '/docs/biological-targets/brs1/fm4/brs1-fm4-excitatory-inhibitory-balance-gaba-glutamate-regulation', from: '/docs/biological-targets/brs1/fm5/brs1-fm5-excitatory-inhibitory-balance-gaba-glutamate-regulation' },
          { to: '/docs/biological-targets/brs1/fm4/brs1-fm4-pm7-gaba-glutamate-neurotransmission-balance', from: '/docs/biological-targets/brs1/fm5/brs1-fm5-pm7-gaba-glutamate-neurotransmission-balance' },
          { to: '/docs/biological-targets/brs1/fm4/brs1-fm4-pm8-gaba-synthesis-capacity', from: '/docs/biological-targets/brs1/fm5/brs1-fm5-pm8-gaba-synthesis-capacity' },
          { to: '/docs/biological-targets/brs1/fm4/brs1-fm4-pm9-glutamate-clearance-and-recycling', from: '/docs/biological-targets/brs1/fm5/brs1-fm5-pm9-glutamate-clearance-and-recycling' },
          { to: '/docs/biological-targets/brs1/fm4/brs1-fm4-pm10-excitotoxicity-modulation', from: '/docs/biological-targets/brs1/fm5/brs1-fm5-pm10-excitotoxicity-modulation' },
          // BRS1(FM1) PM1–PM4 teaching-order renumber
          { to: '/docs/biological-targets/brs1/fm1/brs1-fm1-pm4-serotonergic-signalling-regulation', from: '/docs/biological-targets/brs1/fm1/brs1-fm1-pm3-serotonergic-signalling-regulation' },
          { to: '/docs/biological-targets/brs1/fm1/brs1-fm1-pm3-noradrenergic-signalling-attention-executive-modulation', from: '/docs/biological-targets/brs1/fm1/brs1-fm1-pm2-noradrenergic-signalling-attention-executive-modulation' },
          { to: '/docs/biological-targets/brs1/fm1/brs1-fm1-pm2-lat1-competitive-transport-modulation', from: '/docs/biological-targets/brs1/fm1/brs1-fm2-pm4-lat1-competitive-transport-modulation' },
          { to: '/docs/biological-targets/brs1/fm1/brs1-fm1-pm2-lat1-competitive-transport-modulation', from: '/docs/biological-targets/brs1/fm2/brs1-fm2-pm4-lat1-competitive-transport-modulation' },
          { to: '/docs/biological-targets/brs1/fm1/brs1-fm1-monoaminergic-function', from: '/docs/biological-targets/brs1/fm2/brs1-fm2-glycaemic-modulation-of-neurotransmitter-balance' },
          { to: '/docs/biological-targets/brs1/fm1/brs1-fm1-pm2-lat1-competitive-transport-modulation', from: '/docs/biological-targets/brs1/fm2/brs1-fm2-pm3-lat1-competitive-transport-modulation' },
          // BRS1 insert PM4 serotonin renumber
          { to: '/docs/biological-targets/brs1/fm2/brs1-fm2-pm5-acetylcholine-synthesis-support', from: '/docs/biological-targets/brs1/fm2/brs1-fm2-pm4-acetylcholine-synthesis-support' },
          { to: '/docs/biological-targets/brs1/fm3/brs1-fm3-pm6-neuronal-membrane-dha-incorporation', from: '/docs/biological-targets/brs1/fm3/brs1-fm3-pm5-neuronal-membrane-dha-incorporation' },
          { to: '/docs/biological-targets/brs1/fm4/brs1-fm4-pm7-gaba-glutamate-neurotransmission-balance', from: '/docs/biological-targets/brs1/fm4/brs1-fm4-pm6-gaba-glutamate-neurotransmission-balance' },
          { to: '/docs/biological-targets/brs1/fm4/brs1-fm4-pm8-gaba-synthesis-capacity', from: '/docs/biological-targets/brs1/fm4/brs1-fm4-pm7-gaba-synthesis-capacity' },
          { to: '/docs/biological-targets/brs1/fm4/brs1-fm4-pm9-glutamate-clearance-and-recycling', from: '/docs/biological-targets/brs1/fm4/brs1-fm4-pm8-glutamate-clearance-and-recycling' },
          { to: '/docs/biological-targets/brs1/fm4/brs1-fm4-pm10-excitotoxicity-modulation', from: '/docs/biological-targets/brs1/fm4/brs1-fm4-pm9-excitotoxicity-modulation' },
          // BRS-wide incremental PM renumber
          { to: '/docs/biological-targets/brs1/fm1/brs1-fm1-pm2-lat1-competitive-transport-modulation', from: '/docs/biological-targets/brs1/fm2/brs1-fm2-pm1-lat1-competitive-transport-modulation' },
          { to: '/docs/biological-targets/brs1/fm2/brs1-fm2-pm5-acetylcholine-synthesis-support', from: '/docs/biological-targets/brs1/fm2/brs1-fm2-pm1-acetylcholine-synthesis-support' },
          { to: '/docs/biological-targets/brs1/fm3/brs1-fm3-pm6-neuronal-membrane-dha-incorporation', from: '/docs/biological-targets/brs1/fm3/brs1-fm3-pm1-neuronal-membrane-dha-incorporation' },
          { to: '/docs/biological-targets/brs1/fm4/brs1-fm4-pm7-gaba-glutamate-neurotransmission-balance', from: '/docs/biological-targets/brs1/fm4/brs1-fm4-pm1-gaba-glutamate-neurotransmission-balance' },
          { to: '/docs/biological-targets/brs1/fm4/brs1-fm4-pm8-gaba-synthesis-capacity', from: '/docs/biological-targets/brs1/fm4/brs1-fm4-pm2-gaba-synthesis-capacity' },
          { to: '/docs/biological-targets/brs1/fm4/brs1-fm4-pm9-glutamate-clearance-and-recycling', from: '/docs/biological-targets/brs1/fm4/brs1-fm4-pm3-glutamate-clearance-and-recycling' },
          { to: '/docs/biological-targets/brs1/fm4/brs1-fm4-pm10-excitotoxicity-modulation', from: '/docs/biological-targets/brs1/fm4/brs1-fm4-pm4-excitotoxicity-modulation' },
          { to: '/docs/biological-targets/brs2/fm2/brs2-fm2-pm5-transsulfuration-pathway', from: '/docs/biological-targets/brs2/fm2/brs2-fm2-pm1-transsulfuration-pathway' },
          { to: '/docs/biological-targets/brs2/fm2/brs2-fm2-pm6-glutathione-synthesis', from: '/docs/biological-targets/brs2/fm2/brs2-fm2-pm2-glutathione-synthesis' },
          { to: '/docs/biological-targets/brs2/fm3/brs2-fm3-pm7-phospholipid-methylation', from: '/docs/biological-targets/brs2/fm3/brs2-fm3-pm1-phospholipid-methylation' },
          { to: '/docs/biological-targets/brs3/fm2/brs3-fm2-pm3-nrf2-are-antioxidant-activation', from: '/docs/biological-targets/brs3/fm2/brs3-fm2-pm1-nrf2-are-antioxidant-activation' },
          { to: '/docs/biological-targets/brs3/fm2/brs3-fm2-pm4-ros-generation-vs-clearance-balance', from: '/docs/biological-targets/brs3/fm2/brs3-fm2-pm2-ros-generation-vs-clearance-balance' },
          { to: '/docs/biological-targets/brs3/fm2/brs3-fm2-pm5-lipid-peroxidation-control', from: '/docs/biological-targets/brs3/fm2/brs3-fm2-pm3-lipid-peroxidation-control' },
          { to: '/docs/biological-targets/brs3/fm2/brs3-fm2-pm6-antioxidant-network-recycling', from: '/docs/biological-targets/brs3/fm2/brs3-fm2-pm4-antioxidant-network-recycling' },
          { to: '/docs/biological-targets/brs3/fm3/brs3-fm3-pm7-cytokine-network-modulation', from: '/docs/biological-targets/brs3/fm3/brs3-fm3-pm1-cytokine-network-modulation' },
          { to: '/docs/biological-targets/brs3/fm3/brs3-fm3-pm8-eicosanoid-spm-balance', from: '/docs/biological-targets/brs3/fm3/brs3-fm3-pm2-eicosanoid-spm-balance' },
          { to: '/docs/biological-targets/brs4/fm2/brs4-fm2-pm4-ros-production-and-control', from: '/docs/biological-targets/brs4/fm2/brs4-fm2-pm1-ros-production-and-control' },
          { to: '/docs/biological-targets/brs4/fm2/brs4-fm2-pm5-mitochondrial-protection-redox-integrity', from: '/docs/biological-targets/brs4/fm2/brs4-fm2-pm2-mitochondrial-protection-redox-integrity' },
          { to: '/docs/biological-targets/brs4/fm3/brs4-fm3-pm6-carnitine-mediated-fat-transport', from: '/docs/biological-targets/brs4/fm3/brs4-fm3-pm5-carnitine-mediated-fat-transport' },
          { to: '/docs/biological-targets/brs4/fm3/brs4-fm3-pm6-carnitine-mediated-fat-transport', from: '/docs/biological-targets/brs4/fm3/brs4-fm3-pm1-carnitine-mediated-fat-transport' },
          { to: '/docs/biological-targets/brs4/fm1/brs4-fm1-pm3-creatine-phosphocreatine-buffer', from: '/docs/biological-targets/brs4/fm4/brs4-fm4-pm6-creatine-phosphocreatine-buffer' },
          { to: '/docs/biological-targets/brs4/fm1/brs4-fm1-pm3-creatine-phosphocreatine-buffer', from: '/docs/biological-targets/brs4/fm4/brs4-fm4-pm1-creatine-phosphocreatine-buffer' },
          { to: '/docs/biological-targets/brs4/fm4/brs4-fm4-pm9-mitochondrial-biogenesis', from: '/docs/biological-targets/brs4/fm5/brs4-fm5-pm7-mitochondrial-biogenesis' },
          { to: '/docs/biological-targets/brs4/fm4/brs4-fm4-pm9-mitochondrial-biogenesis', from: '/docs/biological-targets/brs4/fm5/brs4-fm5-pm1-mitochondrial-biogenesis' },
          { to: '/docs/biological-targets/brs4/fm2/brs4-fm2-pm4-ros-production-and-control', from: '/docs/biological-targets/brs4/fm2/brs4-fm2-pm3-ros-production-and-control' },
          { to: '/docs/biological-targets/brs4/fm2/brs4-fm2-pm5-mitochondrial-protection-redox-integrity', from: '/docs/biological-targets/brs4/fm2/brs4-fm2-pm4-mitochondrial-protection-redox-integrity' },
          { to: '/docs/biological-targets/brs4/fm3/brs4-fm3-pm6-carnitine-mediated-fat-transport', from: '/docs/biological-targets/brs4/fm3/brs4-fm3-pm4-carnitine-mediated-fat-transport' },
          { to: '/docs/biological-targets/brs4/fm4/brs4-fm4-pm9-mitochondrial-biogenesis', from: '/docs/biological-targets/brs4/fm4/brs4-fm4-pm6-mitochondrial-biogenesis' },
          { to: '/docs/biological-targets/brs4/fm4/brs4-fm4-pm9-mitochondrial-biogenesis', from: '/docs/biological-targets/brs4/fm4/brs4-fm4-pm7-mitochondrial-biogenesis' },
          { to: '/docs/biological-targets/brs4/fm4/brs4-fm4-pm9-mitochondrial-biogenesis', from: '/docs/biological-targets/brs4/fm4/brs4-fm4-pm8-mitochondrial-biogenesis' },
          { to: '/docs/biological-targets/brs5/fm2/brs5-fm2-pm4-microbial-ecological-turnover-and-competitive-selection', from: '/docs/biological-targets/brs5/fm2/brs5-fm2-pm1-microbial-ecological-turnover-and-competitive-selection' },
          { to: '/docs/biological-targets/brs5/fm2/brs5-fm2-pm5-scfa-production-and-signalling', from: '/docs/biological-targets/brs5/fm2/brs5-fm2-pm2-scfa-production-and-signalling' },
          { to: '/docs/biological-targets/brs5/fm2/brs5-fm2-pm6-polyphenol-biotransformation-and-mitochondrial-relevant-metabolite-generation', from: '/docs/biological-targets/brs5/fm2/brs5-fm2-pm3-polyphenol-biotransformation-and-mitochondrial-relevant-metabolite-generation' },
          { to: '/docs/biological-targets/brs5/fm3/brs5-fm3-pm7-vagal-ens-signalling-modulation', from: '/docs/biological-targets/brs5/fm3/brs5-fm3-pm1-vagal-ens-signalling-modulation' },
          { to: '/docs/biological-targets/brs5/fm3/brs5-fm3-pm8-neurotransmitter-precursor-biotransformation-and-availability', from: '/docs/biological-targets/brs5/fm3/brs5-fm3-pm2-neurotransmitter-precursor-biotransformation-and-availability' },
          { to: '/docs/biological-targets/brs6/fm2/brs6-fm2-pm4-cortisol-rhythm-regulation', from: '/docs/biological-targets/brs6/fm2/brs6-fm2-pm1-cortisol-rhythm-regulation' },
          { to: '/docs/biological-targets/brs6/fm2/brs6-fm2-pm5-circadian-feeding-and-light-dark-entrainment', from: '/docs/biological-targets/brs6/fm2/brs6-fm2-pm2-circadian-feeding-and-light-dark-entrainment' },
          { to: '/docs/biological-targets/brs6/fm3/brs6-fm3-pm6-sympathetic-activation-and-parasympathetic-recovery', from: '/docs/biological-targets/brs6/fm3/brs6-fm3-pm1-sympathetic-activation-and-parasympathetic-recovery' },
          { to: '/docs/biological-targets/brs6/fm3/brs6-fm3-pm7-vagal-tone-hrv-regulation', from: '/docs/biological-targets/brs6/fm3/brs6-fm3-pm2-vagal-tone-hrv-regulation' },
          { to: '/docs/biological-targets/brs6/fm4/brs6-fm4-pm8-metabolic-inflammation-and-adipose-stress-signalling', from: '/docs/biological-targets/brs6/fm4/brs6-fm4-pm1-metabolic-inflammation-and-adipose-stress-signalling' },
          { to: '/docs/biological-targets/brs6/fm4/brs6-fm4-pm9-stress-induced-appetite-reward-drive-modulation', from: '/docs/biological-targets/brs6/fm4/brs6-fm4-pm2-stress-induced-appetite-reward-drive-modulation' },
          // FM-centric PM architecture migration
          { to: '/docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation', from: '/docs/biological-targets/brs1/pm/brs1-pm1-amino-acid-availability-and-prioritisation' },
          { to: '/docs/biological-targets/brs1/fm1/brs1-fm1-pm3-noradrenergic-signalling-attention-executive-modulation', from: '/docs/biological-targets/brs1/pm/brs1-pm5-noradrenergic-signalling-attention-executive-modulation' },
          { to: '/docs/biological-targets/brs1/fm1/brs1-fm1-pm2-lat1-competitive-transport-modulation', from: '/docs/biological-targets/brs1/pm/brs1-pm2-lat1-competitive-transport-modulation' },
          { to: '/docs/biological-targets/brs1/fm2/brs1-fm2-pm5-acetylcholine-synthesis-support', from: '/docs/biological-targets/brs1/pm/brs1-pm3-acetylcholine-synthesis-support' },
          { to: '/docs/biological-targets/brs1/fm3/brs1-fm3-pm6-neuronal-membrane-dha-incorporation', from: '/docs/biological-targets/brs1/pm/brs1-pm4-neuronal-membrane-dha-incorporation' },
          { to: '/docs/biological-targets/brs1/fm4/brs1-fm4-pm7-gaba-glutamate-neurotransmission-balance', from: '/docs/biological-targets/brs1/pm/brs1-pm6-gaba-glutamate-neurotransmission-balance' },
          { to: '/docs/biological-targets/brs1/fm4/brs1-fm4-pm8-gaba-synthesis-capacity', from: '/docs/biological-targets/brs1/pm/brs1-pm7-gaba-synthesis-capacity' },
          { to: '/docs/biological-targets/brs1/fm4/brs1-fm4-pm9-glutamate-clearance-and-recycling', from: '/docs/biological-targets/brs1/pm/brs1-pm8-glutamate-clearance-and-recycling' },
          { to: '/docs/biological-targets/brs1/fm4/brs1-fm4-pm10-excitotoxicity-modulation', from: '/docs/biological-targets/brs1/pm/brs1-pm9-excitotoxicity-modulation' },
          { to: '/docs/biological-targets/brs2/fm1/brs2-fm1-pm1-folate-b12-dependent-homocysteine-remethylation', from: '/docs/biological-targets/brs2/pm/brs2-pm1-folate-b12-dependent-homocysteine-remethylation' },
          { to: '/docs/biological-targets/brs2/fm1/brs2-fm1-pm2-betaine-bhmt-remethylation', from: '/docs/biological-targets/brs2/pm/brs2-pm2-betaine-bhmt-remethylation' },
          { to: '/docs/biological-targets/brs2/fm1/brs2-fm1-pm3-same-synthesis', from: '/docs/biological-targets/brs2/pm/brs2-pm3-same-synthesis' },
          { to: '/docs/biological-targets/brs2/fm1/brs2-fm1-pm4-methionine-cycle-flux', from: '/docs/biological-targets/brs2/pm/brs2-pm4-methionine-cycle-flux' },
          { to: '/docs/biological-targets/brs2/fm2/brs2-fm2-pm5-transsulfuration-pathway', from: '/docs/biological-targets/brs2/pm/brs2-pm5-transsulfuration-pathway' },
          { to: '/docs/biological-targets/brs2/fm2/brs2-fm2-pm6-glutathione-synthesis', from: '/docs/biological-targets/brs2/pm/brs2-pm6-glutathione-synthesis' },
          { to: '/docs/biological-targets/brs2/fm3/brs2-fm3-pm7-phospholipid-methylation', from: '/docs/biological-targets/brs2/pm/brs2-pm7-phospholipid-methylation' },
          { to: '/docs/biological-targets/brs3/fm1/brs3-fm1-pm1-nf-kb-signalling-regulation', from: '/docs/biological-targets/brs3/pm/brs3-pm1-nf-kb-signalling-regulation' },
          { to: '/docs/biological-targets/brs3/fm1/brs3-fm1-pm2-gut-derived-inflammatory-signalling', from: '/docs/biological-targets/brs3/pm/brs3-pm7-gut-derived-inflammatory-signalling' },
          { to: '/docs/biological-targets/brs3/fm2/brs3-fm2-pm3-nrf2-are-antioxidant-activation', from: '/docs/biological-targets/brs3/pm/brs3-pm2-nrf2-are-antioxidant-activation' },
          { to: '/docs/biological-targets/brs3/fm2/brs3-fm2-pm4-ros-generation-vs-clearance-balance', from: '/docs/biological-targets/brs3/pm/brs3-pm3-ros-generation-vs-clearance-balance' },
          { to: '/docs/biological-targets/brs3/fm2/brs3-fm2-pm5-lipid-peroxidation-control', from: '/docs/biological-targets/brs3/pm/brs3-pm5-lipid-peroxidation-control' },
          { to: '/docs/biological-targets/brs3/fm2/brs3-fm2-pm6-antioxidant-network-recycling', from: '/docs/biological-targets/brs3/pm/brs3-pm8-antioxidant-network-recycling' },
          { to: '/docs/biological-targets/brs3/fm3/brs3-fm3-pm7-cytokine-network-modulation', from: '/docs/biological-targets/brs3/pm/brs3-pm4-cytokine-network-modulation' },
          { to: '/docs/biological-targets/brs3/fm3/brs3-fm3-pm8-eicosanoid-spm-balance', from: '/docs/biological-targets/brs3/pm/brs3-pm6-eicosanoid-spm-balance' },
          { to: '/docs/biological-targets/brs4/fm1/brs4-fm1-pm1-electron-transport-chain-function', from: '/docs/biological-targets/brs4/pm/brs4-pm1-electron-transport-chain-function' },
          { to: '/docs/biological-targets/brs4/fm1/brs4-fm1-pm2-nad-metabolism', from: '/docs/biological-targets/brs4/pm/brs4-pm4-nad-metabolism' },
          { to: '/docs/biological-targets/brs4/fm4/brs4-fm4-pm9-mitochondrial-biogenesis', from: '/docs/biological-targets/brs4/pm/brs4-pm2-mitochondrial-biogenesis' },
          { to: '/docs/biological-targets/brs4/fm2/brs4-fm2-pm4-ros-production-and-control', from: '/docs/biological-targets/brs4/pm/brs4-pm3-ros-production-and-control' },
          { to: '/docs/biological-targets/brs4/fm2/brs4-fm2-pm5-mitochondrial-protection-redox-integrity', from: '/docs/biological-targets/brs4/pm/brs4-pm5-mitochondrial-protection-redox-integrity' },
          { to: '/docs/biological-targets/brs4/fm1/brs4-fm1-pm3-creatine-phosphocreatine-buffer', from: '/docs/biological-targets/brs4/pm/brs4-pm6-creatine-phosphocreatine-buffer' },
          { to: '/docs/biological-targets/brs4/fm3/brs4-fm3-pm6-carnitine-mediated-fat-transport', from: '/docs/biological-targets/brs4/pm/brs4-pm7-carnitine-mediated-fat-transport' },
          { to: '/docs/biological-targets/brs5/fm2/brs5-fm2-pm4-microbial-ecological-turnover-and-competitive-selection', from: '/docs/biological-targets/brs5/pm/brs5-pm1-microbial-ecological-turnover-and-competitive-selection' },
          { to: '/docs/biological-targets/brs5/fm2/brs5-fm2-pm5-scfa-production-and-signalling', from: '/docs/biological-targets/brs5/pm/brs5-pm2-scfa-production-and-signalling' },
          { to: '/docs/biological-targets/brs5/fm2/brs5-fm2-pm6-polyphenol-biotransformation-and-mitochondrial-relevant-metabolite-generation', from: '/docs/biological-targets/brs5/pm/brs5-pm8-polyphenol-biotransformation-and-mitochondrial-relevant-metabolite-generation' },
          { to: '/docs/biological-targets/brs5/fm1/brs5-fm1-pm1-gut-barrier-tight-junction-integrity', from: '/docs/biological-targets/brs5/pm/brs5-pm3-gut-barrier-tight-junction-integrity' },
          { to: '/docs/biological-targets/brs5/fm1/brs5-fm1-pm2-lps-endotoxin-containment', from: '/docs/biological-targets/brs5/pm/brs5-pm4-lps-endotoxin-containment' },
          { to: '/docs/biological-targets/brs5/fm1/brs5-fm1-pm3-keystone-taxa-support', from: '/docs/biological-targets/brs5/pm/brs5-pm7-keystone-taxa-support' },
          { to: '/docs/biological-targets/brs5/fm3/brs5-fm3-pm7-vagal-ens-signalling-modulation', from: '/docs/biological-targets/brs5/pm/brs5-pm5-vagal-ens-signalling-modulation' },
          { to: '/docs/biological-targets/brs5/fm3/brs5-fm3-pm8-neurotransmitter-precursor-biotransformation-and-availability', from: '/docs/biological-targets/brs5/pm/brs5-pm6-neurotransmitter-precursor-biotransformation-and-availability' },
          { to: '/docs/biological-targets/brs6/fm1/brs6-fm1-pm1-glucose-appearance-kinetics', from: '/docs/biological-targets/brs6/pm/brs6-pm1-glucose-appearance-kinetics' },
          { to: '/docs/biological-targets/brs6/fm1/brs6-fm1-pm2-glycaemic-variability-regulation', from: '/docs/biological-targets/brs6/pm/brs6-pm2-glycaemic-variability-regulation' },
          { to: '/docs/biological-targets/brs6/fm1/brs6-fm1-pm3-insulin-sensitivity-and-glucose-disposal', from: '/docs/biological-targets/brs6/pm/brs6-pm3-insulin-sensitivity-and-glucose-disposal' },
          { to: '/docs/biological-targets/brs6/fm2/brs6-fm2-pm4-cortisol-rhythm-regulation', from: '/docs/biological-targets/brs6/pm/brs6-pm4-cortisol-rhythm-regulation' },
          { to: '/docs/biological-targets/brs6/fm2/brs6-fm2-pm5-circadian-feeding-and-light-dark-entrainment', from: '/docs/biological-targets/brs6/pm/brs6-pm5-circadian-feeding-and-light-dark-entrainment' },
          { to: '/docs/biological-targets/brs6/fm3/brs6-fm3-pm6-sympathetic-activation-and-parasympathetic-recovery', from: '/docs/biological-targets/brs6/pm/brs6-pm6-sympathetic-activation-and-parasympathetic-recovery' },
          { to: '/docs/biological-targets/brs6/fm3/brs6-fm3-pm7-vagal-tone-hrv-regulation', from: '/docs/biological-targets/brs6/pm/brs6-pm7-vagal-tone-hrv-regulation' },
          { to: '/docs/biological-targets/brs6/fm4/brs6-fm4-pm8-metabolic-inflammation-and-adipose-stress-signalling', from: '/docs/biological-targets/brs6/pm/brs6-pm8-metabolic-inflammation-and-adipose-stress-signalling' },
          { to: '/docs/biological-targets/brs6/fm4/brs6-fm4-pm9-stress-induced-appetite-reward-drive-modulation', from: '/docs/biological-targets/brs6/pm/brs6-pm9-stress-induced-appetite-reward-drive-modulation' },
          { to: '/docs/biological-targets/brs1/fm1/brs1-fm1-monoaminergic-function', from: '/docs/biological-targets/brs1/fm/brs1-fm1-catecholaminergic-function' },
          { to: '/docs/biological-targets/brs1/fm1/brs1-fm1-monoaminergic-function', from: '/docs/biological-targets/brs1/fm1/brs1-fm1-catecholaminergic-function' },
          { to: '/docs/biological-targets/brs1/fm1/brs1-fm1-monoaminergic-function', from: '/docs/biological-targets/brs1/fm/brs1-fm2-glycaemic-modulation-of-neurotransmitter-balance' },
          { to: '/docs/biological-targets/brs1/fm2/brs1-fm2-cholinergic-function', from: '/docs/biological-targets/brs1/fm/brs1-fm2-cholinergic-function' },
          { to: '/docs/biological-targets/brs1/fm3/brs1-fm3-phospholipid-mediated-dha-delivery-and-membrane-integration', from: '/docs/biological-targets/brs1/fm/brs1-fm3-phospholipid-mediated-dha-delivery-and-membrane-integration' },
          { to: '/docs/biological-targets/brs1/fm4/brs1-fm4-excitatory-inhibitory-balance-gaba-glutamate-regulation', from: '/docs/biological-targets/brs1/fm/brs1-fm4-excitatory-inhibitory-balance-gaba-glutamate-regulation' },
          { to: '/docs/biological-targets/brs2/fm1/brs2-fm1-methylation-cycle-efficiency', from: '/docs/biological-targets/brs2/fm/brs2-fm1-methylation-cycle-efficiency' },
          { to: '/docs/biological-targets/brs2/fm2/brs2-fm2-transsulfuration-redox-coupling', from: '/docs/biological-targets/brs2/fm/brs2-fm2-transsulfuration-redox-coupling' },
          { to: '/docs/biological-targets/brs2/fm3/brs2-fm3-methylation-membrane-coupling', from: '/docs/biological-targets/brs2/fm/brs2-fm3-methylation-membrane-coupling' },
          { to: '/docs/biological-targets/brs3/fm1/brs3-fm1-anti-inflammatory-signalling-tone', from: '/docs/biological-targets/brs3/fm/brs3-fm1-anti-inflammatory-signalling-tone' },
          { to: '/docs/biological-targets/brs3/fm2/brs3-fm2-antioxidant-defense-capacity', from: '/docs/biological-targets/brs3/fm/brs3-fm2-antioxidant-defense-capacity' },
          { to: '/docs/biological-targets/brs3/fm3/brs3-fm3-inflammation-resolution-capacity', from: '/docs/biological-targets/brs3/fm/brs3-fm3-inflammation-resolution-capacity' },
          { to: '/docs/biological-targets/brs4/fm1/brs4-fm1-cellular-bioenergetics', from: '/docs/biological-targets/brs4/fm/brs4-fm1-cellular-bioenergetics' },
          { to: '/docs/biological-targets/brs4/fm2/brs4-fm2-mitochondrial-resilience-and-redox-stability', from: '/docs/biological-targets/brs4/fm/brs4-fm2-mitochondrial-resilience-and-redox-stability' },
          { to: '/docs/biological-targets/brs4/fm3/brs4-fm3-substrate-utilisation-flexibility', from: '/docs/biological-targets/brs4/fm/brs4-fm3-substrate-utilisation-flexibility' },
          { to: '/docs/biological-targets/brs4/fm4/brs4-fm4-mitochondrial-capacity-expansion-and-adaptation', from: '/docs/biological-targets/brs4/fm/brs4-fm4-rapid-energy-buffering-and-high-demand-support' },
          { to: '/docs/biological-targets/brs4/fm1/brs4-fm1-cellular-bioenergetics', from: '/docs/biological-targets/brs4/fm4/brs4-fm4-rapid-energy-buffering-and-high-demand-support' },
          { to: '/docs/biological-targets/brs4/fm4/brs4-fm4-mitochondrial-capacity-expansion-and-adaptation', from: '/docs/biological-targets/brs4/fm/brs4-fm5-mitochondrial-capacity-expansion-and-adaptation' },
          { to: '/docs/biological-targets/brs4/fm4/brs4-fm4-mitochondrial-capacity-expansion-and-adaptation', from: '/docs/biological-targets/brs4/fm5/brs4-fm5-mitochondrial-capacity-expansion-and-adaptation' },
          { to: '/docs/biological-targets/brs5/fm1/brs5-fm1-gut-barrier-integrity-and-immune-interface', from: '/docs/biological-targets/brs5/fm/brs5-fm1-gut-barrier-integrity-and-immune-interface' },
          { to: '/docs/biological-targets/brs5/fm2/brs5-fm2-microbial-metabolite-signalling-capacity', from: '/docs/biological-targets/brs5/fm/brs5-fm2-microbial-metabolite-signalling-capacity' },
          { to: '/docs/biological-targets/brs5/fm3/brs5-fm3-gut-vagal-neuromodulation-and-ens-signalling', from: '/docs/biological-targets/brs5/fm/brs5-fm3-gut-vagal-neuromodulation-and-ens-signalling' },
          { to: '/docs/biological-targets/brs6/fm1/brs6-fm1-glycaemic-insulin-stability-and-cognitive-energy-availability', from: '/docs/biological-targets/brs6/fm/brs6-fm1-glycaemic-insulin-stability-and-cognitive-energy-availability' },
          { to: '/docs/biological-targets/brs6/fm2/brs6-fm2-hpa-axis-rhythm-and-cortisol-regulation', from: '/docs/biological-targets/brs6/fm/brs6-fm2-hpa-axis-rhythm-and-cortisol-regulation' },
          { to: '/docs/biological-targets/brs6/fm3/brs6-fm3-autonomic-balance-and-vagal-recovery-capacity', from: '/docs/biological-targets/brs6/fm/brs6-fm3-autonomic-balance-and-vagal-recovery-capacity' },
          { to: '/docs/biological-targets/brs6/fm4/brs6-fm4-stress-inflammation-metabolic-load-allocation', from: '/docs/biological-targets/brs6/fm/brs6-fm4-stress-inflammation-metabolic-load-allocation' },
          { to: '/docs/foods/mankai', from: '/docs/foods/duckweed' },
          { to: '/docs/foods/vinegar-pickles', from: '/docs/foods/pickles' },
          { to: '/docs/dietary-foundations/digestion-microbiome/fibre-gut-adaptation', from: '/docs/training/fibre-gut-adaptation' },
          { to: '/docs/foods/salmon-roe', from: '/docs/foods/fish-roe' },
          { to: '/docs/foods/chamomile-tea', from: '/docs/foods/chamomile' },
          { to: '/docs/foods/lemon-balm-tea', from: '/docs/foods/lemon-balm' },
          { to: '/docs/foods/chicory-root', from: '/docs/foods/chicory' },
          { to: '/docs/foods/aubergine', from: '/docs/foods/eggplant' },
          { to: '/docs/foods/cacao-nibs-raw', from: '/docs/foods/raw-cacao-nibs' },
          { to: '/docs/recipes/Snacks/neuroeshot-roe', from: '/docs/recipes/Drinks/neuroeshot-roe' },
          {
            to: '/docs/biological-targets/brs6/fm1/brs6-fm1-pm1-glucose-appearance-kinetics',
            from: '/docs/biological-targets/brs6/pm/brs6-pm1-glycaemic-variability-absorption-kinetics',
          },
          {
            to: '/docs/biological-targets/brs6/fm1/brs6-fm1-pm2-glycaemic-variability-regulation',
            from: '/docs/biological-targets/brs6/pm/brs6-pm2-insulin-sensitivity-and-glucose-disposal',
          },
          {
            to: '/docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation',
            from: '/docs/biological-targets/brs1/pm/brs1-pm1-tyrosine-tryptophan-precursor-supply',
          },
          {
            to: '/docs/biological-targets/brs1/sm/brs1-sm-phen2-emotional-dysregulation-monoaminergic-interpretation',
            from: '/docs/biological-targets/brs1/sm/brs1-sm-adhd1-emotional-dysregulation-serotonergic-regulation',
          },
          {
            to: '/docs/biological-targets/brs1/sm/brs1-sm-phen2-emotional-dysregulation-monoaminergic-interpretation',
            from: '/docs/biological-targets/brs1/sm/brs1-sm-phen2-emotional-dysregulation-serotonergic-regulation',
          },
          {
            to: '/docs/biological-targets/brs1/sm/brs1-sm-cross1-histaminergic-arousal-neuroimmune-crosstalk',
            from: '/docs/biological-targets/brs1/sm/brs1-sm-adhd2-histaminergic-arousal-neuroimmune-crosstalk',
          },
          {
            to: '/docs/biological-targets/brs2/sm/brs2-sm-snp1-snp-sensitive-methylation-efficiency',
            from: '/docs/biological-targets/brs2/sm/brs2-s1-snp-sensitive-methylation-efficiency',
          },
          {
            to: '/docs/biological-targets/brs-x/hormones/brs-x-hormones',
            from: '/docs/biological-targets/brs-x/eshr/endocrine-signalling-hormonal-regulation',
          },
        ],
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/brain-diet-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'The BRAIN Diet',
      logo: {
        alt: 'BRAIN Diet Logo',
        src: 'site-icon/white.svg',
      },
      items: [
        {
          to: '/about-us',
          label: 'About Us',
          position: 'right',
        },
        {
          to: '/editorial-team',
          label: 'Editorial Team',
          position: 'right',
        },
        {
          to: '/advisory-board',
          label: 'Advisory Board',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} The BRAIN Diet. All rights reserved.<br/>THE BRAIN DIET LIMITED - Company number 16886759 - Registered in the U.K.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    mermaid: {
      theme: { light: 'neutral', dark: 'dark' },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
