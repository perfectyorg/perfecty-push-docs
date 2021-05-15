const themeOptions = require('gatsby-theme-apollo-docs/theme-options');

module.exports = {
  pathPrefix: '/',
  plugins: [
    {
      resolve: 'gatsby-theme-apollo-docs',
      options: {
        ...themeOptions,
        root: __dirname,
        contentDir: 'src',
        subtitle: 'Perfecty Push',
        description: 'A guide to using Apollo Server',
        githubRepo: 'apollographql/apollo-server',
        defaultVersion: '1',
        versions: {
          '1': 'version-1'
        },
        sidebarCategories: {
          null: [
            'index',
            'getting-started',
            'whats-new'
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
