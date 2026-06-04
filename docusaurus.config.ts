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
            return removeDuplicateBrsOverviewDocs(sidebarItems);
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
            to: '/docs/biological-targets/brs6/pm/brs6-pm1-glucose-appearance-kinetics',
            from: '/docs/biological-targets/brs6/pm/brs6-pm1-glycaemic-variability-absorption-kinetics',
          },
          {
            to: '/docs/biological-targets/brs6/pm/brs6-pm2-glycaemic-variability-regulation',
            from: '/docs/biological-targets/brs6/pm/brs6-pm2-insulin-sensitivity-and-glucose-disposal',
          },
          {
            to: '/docs/biological-targets/brs1/pm/brs1-pm1-amino-acid-availability-and-prioritisation',
            from: '/docs/biological-targets/brs1/pm/brs1-pm1-tyrosine-tryptophan-precursor-supply',
          },
          {
            to: '/docs/biological-targets/brs1/sm/brs1-sm-phen2-emotional-dysregulation-serotonergic-regulation',
            from: '/docs/biological-targets/brs1/sm/brs1-sm-adhd1-emotional-dysregulation-serotonergic-regulation',
          },
          {
            to: '/docs/biological-targets/brs1/sm/brs1-sm-cross1-histaminergic-arousal-neuroimmune-crosstalk',
            from: '/docs/biological-targets/brs1/sm/brs1-sm-adhd2-histaminergic-arousal-neuroimmune-crosstalk',
          },
          {
            to: '/docs/biological-targets/brs2/sm/brs2-sm-snp1-snp-sensitive-methylation-efficiency',
            from: '/docs/biological-targets/brs2/sm/brs2-s1-snp-sensitive-methylation-efficiency',
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
