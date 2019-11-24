const toml = require("toml")

module.exports = {
  siteMetadata: {
    title: `Gatsby Pantry Starter`,
    author: `Rob McFadzean`,
    description: `A starter blog demonstrating https://github.com/rmcfadzean/gatsby-pantry`,
    siteUrl: `https://gatsby-pantry-starter-demo.netlify.com/`,
    social: {
      twitter: `rmcfadzean`,
    },
  },
  plugins: [
    `gatsby-source-all-contributors`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `contentRoot`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        engines: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-categories",
      options: {
        templatePath: `${__dirname}/src/templates/category.js`,
      },
    },
    {
      resolve: "gatsby-plugin-tags",
      options: {
        templatePath: `${__dirname}/src/templates/tag.js`,
      },
    },
  ],
}
