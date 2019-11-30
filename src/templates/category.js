import React from 'react'
import { graphql } from 'gatsby'

import SEO from '../components/seo'
import PostsList from '../components/PostsList'

export default ({ location, pageContext, data }) => {
  const { category } = pageContext
  return (
    <div className="category-container">
      <SEO title={`Posts in category "${category}"`} />

      <h1>Category: {category}</h1>
      <PostsList postEdges={data.allMarkdownRemark.edges} />
    </div>
  )
}

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(filter: { fields: { category: { eq: $category } } }) {
      totalCount
      edges {
        node {
          fields {
            slug
            category
          }
          excerpt
          timeToRead
          frontmatter {
            title
            date
          }
        }
      }
    }
  }
`
