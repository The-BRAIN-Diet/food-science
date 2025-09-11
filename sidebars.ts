import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  defaultSidebar: [
    {
      type: 'category',
      label: 'Introduction',
      items: ['intro'],
    },
    {
      type: 'category',
      label: 'Nutrients',
      items: [
        'nutrients/index',
        'nutrients/sodium',
        'nutrients/potassium',
        'nutrients/calcium',
        'nutrients/magnesium',
        'nutrients/vitamin-b12',
        'nutrients/iron',
        'nutrients/zinc',
        'nutrients/iodine',
      ],
    },
    {
      type: 'category',
      label: 'Biological Targets',
      items: [
        'biological-targets/index',
        'biological-targets/insulin-response',
        'biological-targets/gut-microbiome',
        'biological-targets/hormonal-response',
        'biological-targets/methylation',
        'biological-targets/endocannabinoid-system',
        'biological-targets/mitochondrial-support',
        'biological-targets/neurochemical-balance',
      ],
    },
    {
      type: 'category',
      label: 'Metabolic Response',
      items: [
        'metabolic-response/index',
        'metabolic-response/insulin-response',
        'metabolic-response/stress-response',
      ],
    },
  ],
};

export default sidebars;
