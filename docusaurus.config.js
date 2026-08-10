// Docusaurus Configuration
import {themes as prismThemes} from 'prism-react-renderer';

const config = {
  title: 'Project Documentation',
  tagline: 'User guides, developer documentation, and module specifications',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://docs.yourdomain.com',
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
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
        ],
      },


      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    },
};


export default config;

