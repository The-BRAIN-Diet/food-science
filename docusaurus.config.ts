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
        }
      ]
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
