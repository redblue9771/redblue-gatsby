const path = require(`path`)

const { createFilePath } = require(`gatsby-source-filesystem`)
// const { paginate, createPagePerItem } = require(`gatsby-awesome-pagination`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

// exports.createPages = ({ graphql, boundActionCreators }) => {
//   const { createPage } = boundActionCreators

//   // We return a promise immediately
//   return new Promise((resolve, reject) => {
//     // Start by creating all the blog pages
//     const blogPost = path.resolve("./src/templates/blog-post.js")
//     const blogIndex = path.resolve("./src/templates/blog-index.js")
//     resolve(
//       graphql(
//         `
//           {
//             allMarkdownRemark(
//               sort: { fields: [frontmatter___date], order: DESC }
//             ) {
//               edges {
//                 node {
//                   id
//                   frontmatter {
//                     permalink
//                   }
//                 }
//               }
//             }
//           }
//         `
//       ).then(result => {
//         if (result.errors) {
//           console.log(result.errors)
//           reject(result.errors)
//         }

//         // Get an array of posts from the query result
//         const blogPosts = _.get(result, "data.allMarkdownRemark.edges")

//         // Create the blog index pages like `/blog`, `/blog/2`, `/blog/3`, etc.
//         // The first page will have 3 items and each following page will have 10
//         // blog posts and a link to the next and previous pages.
//         paginate({
//           createPage,
//           items: blogPosts,
//           component: blogIndex,
//           itemsPerPage: 10,
//           itemsPerFirstPage: 3,
//           pathPrefix: "/blog",
//         })

//         // Create one page per blog post, with a link to the previous and next
//         // blog posts.
//         createPagePerItem({
//           createPage,
//           items: blogPosts,
//           component: blogPost,
//           itemToPath: "node.frontmatter.permalink",
//           itemToId: "node.id",
//         })
//       })
//     )
//   })
// }
