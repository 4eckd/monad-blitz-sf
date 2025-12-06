import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// Mermaid theme configuration
const lightCodeTheme = prismThemes.github;
const darkCodeTheme = prismThemes.dracula;

const config: Config = {
  title: 'MACHUPS Documentation',
  tagline: 'AI-Powered Brand Generation in Under 3 Minutes',
  favicon: 'img/favicon.ico',

  // Production URL
  url: 'https://docs.machups.com',
  baseUrl: '/',

  // GitHub pages deployment config
  organizationName: '4eckd',
  projectName: 'monad-blitz-sf',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Enable Mermaid diagrams
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/4eckd/monad-blitz-sf/tree/main/website/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/4eckd/monad-blitz-sf/tree/main/website/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Dynamic OG image - generated on-the-fly for each page
    image: 'https://api.machups.com/api/og/docs?title=MACHUPS%20Documentation&section=Docs',
    navbar: {
      title: 'MACHUPS',
      logo: {
        alt: 'MACHUPS Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/4eckd/monad-blitz-sf',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
            {
              label: 'Quick Start',
              to: '/docs/quickstart',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/4eckd/monad-blitz-sf',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/machups',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'Design System',
              href: 'https://design.machups.com',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} MACHUPS. Built for Monad Blitz SF #18.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['solidity', 'typescript', 'javascript', 'bash'],
    },
    metadata: [
      {name: 'keywords', content: 'AI, branding, design system, Monad, blockchain, NFT'},
      {name: 'og:title', content: 'MACHUPS - AI-Powered Brand Generation'},
      {name: 'og:description', content: 'Generate complete brand packages in under 3 minutes with AI. Logos, design tokens, components, and NFT certificates on Monad.'},
      {name: 'og:image', content: 'https://docs.machups.com/img/machups-social-card.png'},
      {name: 'og:type', content: 'website'},
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:title', content: 'MACHUPS Documentation'},
      {name: 'twitter:description', content: 'AI-powered brand generation in under 3 minutes'},
      {name: 'twitter:image', content: 'https://docs.machups.com/img/machups-social-card.png'},
    ],
  } satisfies Preset.ThemeConfig,
};

export default config;
