const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // for pagination
  const createPagination = (
    pages,
    perPage,
    pathname,
    component,
    list = [],
    currItem = '',
    type = ''
  ) => {
    const numPages = Math.ceil(pages / perPage)
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? pathname : `${pathname}/${i + 1}`,
        component,
        context: {
          list: Array.from(list),
          currItem,
          type,
          limit: perPage,
          skip: i * perPage,
          numPages,
          currentPage: i + 1,
        },
      })
    })
  }

  const calcTotal = (obj, container = new Map()) => {
    switch (Object.prototype.toString.call(obj)) {
      case '[object Array]':
        obj.forEach((child) => {
          if (child) {
            container.set(
              child,
              (container.has(child) ? container.get(child) : 0) + 1
            )
          }
        })
        return
      case '[object String]':
        container.set(obj, (container.has(obj) ? container.get(obj) : 0) + 1)
        return
      default:
        return null
    }
  }

  const result = await graphql(
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
                category
                tags
                series
              }
            }
          }
        }
      }
    `
  )
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const spiritsSingle = path.resolve(`./src/templates/spirits-single.js`)

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  const categories = new Map()
  const tags = new Map()
  const series = new Map()

  posts.forEach(({ node: { fields, frontmatter } }, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    calcTotal(frontmatter.category, categories)
    calcTotal(frontmatter.tags, tags)
    calcTotal(frontmatter.series, series)

    createPage({
      path: fields.slug,
      component: spiritsSingle,
      context: {
        slug: fields.slug,
        previous,
        next,
      },
    })
  })

  createPagination(
    posts.length,
    10,
    '/spirits',
    path.resolve('./src/templates/spirits.js')
  )

  categories.forEach((val, key, map) => {
    createPagination(
      val,
      10,
      `/spirits/${key}`,
      path.resolve('./src/templates/spirits.js'),
      map.keys(),
      key,
      'categories'
    )
  })

  tags.forEach((val, key, map) => {
    createPagination(
      val,
      10,
      `/spirits/tags/${key}`,
      path.resolve('./src/templates/spirits.js'),
      map.keys(),
      key,
      'tags'
    )
  })

  series.forEach((val, key, map) => {
    createPagination(
      val,
      10,
      `/spirits/series/${key}`,
      path.resolve('./src/templates/spirits.js'),
      map.keys(),
      key,
      'series'
    )
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
