module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    title: `Perfecty Push Docs`,
    description: `Perfecty Push is a self-hosted Push Notifications Server`,
    author: `@rwngallego`,
  },
  plugins: [
    {
      resolve: 'gatsby-theme-apollo-docs',
      options: {
        root: __dirname,
        contentDir: 'docs',
        baseUrl: 'https://docs.perfecty.org',
        siteName: 'Perfecty Push Documentation',
        description: 'Perfecty Push Docs',
        githubRepo: 'perfectyorg/perfecty-push-docs',
        defaultVersion: '1',
        shareImageConfig: {},
        sidebarCategories: {
          null: [
            'index',
            'wp/configuration',
            'wp/troubleshooting'
          ],
          Support: [
            'support/contact'
          ]
        }
      }
    }
  ],
};
