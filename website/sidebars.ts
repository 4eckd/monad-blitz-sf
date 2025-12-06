import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    'project-overview',
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
      label: 'Event Roadmap',
      items: [
        'planning/event-plan',
        'planning/architecture',
      ],
    },
    {
      type: 'category',
      label: 'Workflows',
      items: ['workflows/diagrams'],
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
