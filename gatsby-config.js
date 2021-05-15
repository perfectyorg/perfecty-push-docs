const themeOptions = require('gatsby-theme-apollo-docs/theme-options');

module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    title: `Perfecty Push`,
    description: `Self-hosted Push Notifications`,
    author: `@rwngallego`,
  },
  plugins: [
    {
      resolve: 'gatsby-theme-apollo-docs',
      options: {
        ...themeOptions,
        root: __dirname,
        contentDir: 'source',
        subtitle: 'Perfecty Push',
        description: 'A guide to using Apollo Server',
        githubRepo: 'rwngallego/perfecty-push-docs',
        defaultVersion: '1',
        versions: {
          '1': 'version-1'
        },
        sidebarCategories: {
          null: [
            'index',
            'testing/test'
          ],
          Features: [
            'features/mocking',
            'features/errors',
            'features/data-sources'
          ]
        }
      }
    }
  ],
};
