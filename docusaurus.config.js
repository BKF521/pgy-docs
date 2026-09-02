// Docusaurus Configuration
import {themes as prismThemes} from 'prism-react-renderer';

const config = {
  title: 'Project Documentation',
  tagline: 'User guides, developer documentation, and module specifications',
  favicon: 'img/favicon.ico',

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  future: {
    v4: true,
  },

  url: 'https://docs.gopgy.org.my',
  baseUrl: '/',
  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Project Docs',
        logo: {
          alt: 'Project Logo',
          src: 'img/logo.png',
          href: 'https://gopgy.org.my',
          target: '_self',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            type: 'docSidebar',
            sidebarId: 'devNotesSidebar',
            position: 'left',
            label: 'Dev Notes',
          },
        ],
      },
      metadata: [
        {name: 'robots', content: 'noindex, nofollow'},
        {name: 'googlebot', content: 'noindex, nofollow'}
      ],
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    },
};


export default config;

