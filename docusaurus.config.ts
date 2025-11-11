import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'The BRAIN Diet',
  tagline: 'Bio Regulation Algorithm and Integrated Neuronutrition',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
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

  presets: [
    [
      'classic',
      {
        docs: {
          // Use automatic sidebar generation
          sidebarCollapsible: true,
          sidebarCollapsed: false,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  "plugins": [
    './src/plugin/category-listing',
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'The BRAIN Diet',
      logo: {
        alt: 'BRAIN Diet Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Introduction',
        },
        {
          type: 'dropdown',
          label: 'Biological Targets',
          position: 'left',
          items: [
            {
              type: 'doc',
              docId: 'biological-targets/index',
              label: 'Overview',
            },
            {
              type: 'doc',
              docId: 'biological-targets/insulin-response',
              label: 'Insulin Response',
            },
            {
              type: 'doc',
              docId: 'biological-targets/gut-microbiome',
              label: 'Gut Microbiome',
            },
            {
              type: 'doc',
              docId: 'biological-targets/hormonal-response',
              label: 'Hormonal Response',
            },
            {
              type: 'doc',
              docId: 'biological-targets/methylation',
              label: 'Methylation',
            },
            {
              type: 'doc',
              docId: 'biological-targets/endocannabinoid-system',
              label: 'Endocannabinoid System',
            },
            {
              type: 'doc',
              docId: 'biological-targets/mitochondrial-support',
              label: 'Mitochondrial Support',
            },
            {
              type: 'doc',
              docId: 'biological-targets/neurochemical-balance',
              label: 'Neurochemical Balance',
            },
            {
              type: 'doc',
              docId: 'biological-targets/metabolic-response/index',
              label: 'Metabolic Response',
            },
            {
              type: 'doc',
              docId: 'biological-targets/metabolic-response/insulin-response',
              label: '  → Insulin Response',
            },
            {
              type: 'doc',
              docId: 'biological-targets/metabolic-response/stress-response',
              label: '  → Stress Response',
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'Nutrients',
          position: 'left',
          items: [
            {
              type: 'doc',
              docId: 'nutrients/index',
              label: 'Overview',
            },
            {
              type: 'doc',
              docId: 'nutrients/sodium',
              label: 'Sodium',
            },
            {
              type: 'doc',
              docId: 'nutrients/potassium',
              label: 'Potassium',
            },
            {
              type: 'doc',
              docId: 'nutrients/calcium',
              label: 'Calcium',
            },
            {
              type: 'doc',
              docId: 'nutrients/magnesium',
              label: 'Magnesium',
            },
            {
              type: 'doc',
              docId: 'nutrients/vitamin-b12',
              label: 'Vitamin B12',
            },
            {
              type: 'doc',
              docId: 'nutrients/iron',
              label: 'Iron',
            },
            {
              type: 'doc',
              docId: 'nutrients/zinc',
              label: 'Zinc',
            },
            {
              type: 'doc',
              docId: 'nutrients/iodine',
              label: 'Iodine',
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'Therapeutic Areas',
          position: 'left',
          items: [
            {
              type: 'doc',
              docId: 'therapeutic-areas/index',
              label: 'Overview',
            },
            {
              type: 'doc',
              docId: 'therapeutic-areas/ADHD',
              label: 'ADHD',
            },
            {
              type: 'doc',
              docId: 'therapeutic-areas/AD-Alzhiemers',
              label: "Alzheimer's Disease",
            },
            {
              type: 'doc',
              docId: 'therapeutic-areas/bipolar',
              label: 'Bipolar Disorder',
            },
          ],
        },
        {
          type: 'doc',
          docId: 'recipes',
          position: 'left',
          label: 'Recipes',
        },
        {
          type: 'doc',
          docId: 'substances',
          position: 'left',
          label: 'Substances',
        },
        {
          type: 'doc',
          docId: 'papers',
          position: 'left',
          label: 'Papers',
        },
        {
          type: 'doc',
          docId: 'training',
          position: 'left',
          label: 'Training',
        },
        {
          type: 'doc',
          docId: 'partners',
          position: 'left',
          label: 'Partners',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Introduction',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Biological Targets',
          items: [
            {
              label: 'Overview',
              to: '/docs/biological-targets',
            },
            {
              label: 'Insulin Response',
              to: '/docs/biological-targets/insulin-response',
            },
            {
              label: 'Gut Microbiome',
              to: '/docs/biological-targets/gut-microbiome',
            },
            {
              label: 'Hormonal Response',
              to: '/docs/biological-targets/hormonal-response',
            },
            {
              label: 'Methylation',
              to: '/docs/biological-targets/methylation',
            },
            {
              label: 'Endocannabinoid System',
              to: '/docs/biological-targets/endocannabinoid-system',
            },
            {
              label: 'Mitochondrial Support',
              to: '/docs/biological-targets/mitochondrial-support',
            },
            {
              label: 'Neurochemical Balance',
              to: '/docs/biological-targets/neurochemical-balance',
            },
            {
              label: 'Metabolic Response',
              to: '/docs/biological-targets/metabolic-response',
            },
            {
              label: '  → Insulin Response',
              to: '/docs/biological-targets/metabolic-response/insulin-response',
            },
            {
              label: '  → Stress Response',
              to: '/docs/biological-targets/metabolic-response/stress-response',
            },
          ],
        },
        {
          title: 'Nutrients',
          items: [
            {
              label: 'Overview',
              to: '/docs/nutrients',
            },
            {
              label: 'Sodium',
              to: '/docs/nutrients/sodium',
            },
            {
              label: 'Potassium',
              to: '/docs/nutrients/potassium',
            },
            {
              label: 'Calcium',
              to: '/docs/nutrients/calcium',
            },
            {
              label: 'Magnesium',
              to: '/docs/nutrients/magnesium',
            },
            {
              label: 'Vitamin B12',
              to: '/docs/nutrients/vitamin-b12',
            },
            {
              label: 'Iron',
              to: '/docs/nutrients/iron',
            },
            {
              label: 'Zinc',
              to: '/docs/nutrients/zinc',
            },
            {
              label: 'Iodine',
              to: '/docs/nutrients/iodine',
            },
          ],
        },
        {
          title: 'Therapeutic Areas',
          items: [
            {
              label: 'Overview',
              to: '/docs/therapeutic-areas',
            },
            {
              label: 'ADHD',
              to: '/docs/therapeutic-areas/ADHD',
            },
            {
              label: "Alzheimer's Disease",
              to: '/docs/therapeutic-areas/AD-Alzhiemers',
            },
            {
              label: 'Bipolar Disorder',
              to: '/docs/therapeutic-areas/bipolar',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Recipes',
              to: '/docs/recipes',
            },
            {
              label: 'Substances',
              to: '/docs/substances',
            },
            {
              label: 'Papers',
              to: '/docs/papers',
            },
            {
              label: 'Training',
              to: '/docs/training',
            },
            {
              label: 'Partners',
              to: '/docs/partners',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} The BRAIN Diet. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
