require('dotenv').config()

console.log(process.env.GATSBY_GITHUB_TOKEN)

module.exports = {
  siteMetadata: {
    title: `RedBlue | 赤琦`,
    author: `RedBlue`,
    description: `RedBlue(赤琦)，来自彩云之南的 95 后男孩，偏执的完美主义者，体现在方方面面。爱科技、爱搞机、爱摄影、爱一切美好的事物，追求源于热爱。`,
    siteUrl: `https://redblue.fun/`,
    social: {},
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          `gatsby-remark-katex`,
          `gatsby-remark-smartypants`,
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          {
            resolve: 'gatsby-plugin-draft',
            options: {
              timezone: 'Asia/Shanghai',
              publishDraft: process.env.NODE_ENV !== 'production',
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-transition-link`,
      options: {
        layout: require.resolve(`./src/components/MainLayout`),
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-scroll-reveal`,
  ],
}
