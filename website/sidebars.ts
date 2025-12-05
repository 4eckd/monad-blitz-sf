import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: ['quickstart', 'installation'],
    },
    {
      type: 'category',
      label: 'Features',
      items: [
        'features/brand-generation',
        'features/design-tokens',
        'features/components',
        'features/nft-certificates'
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: ['api/overview'],
    },
    {
      type: 'category',
      label: 'Database',
      items: ['database/schema', 'database/postgres', 'database/migrations'],
    },
  ],
};

export default sidebars;
