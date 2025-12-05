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
      label: 'Database',
      items: ['database/schema', 'database/postgres', 'database/migrations'],
    },
  ],
};

export default sidebars;
