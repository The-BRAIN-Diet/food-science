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
  ],
};

export default sidebars;
