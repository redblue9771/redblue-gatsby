import React from "react"
import { graphql } from "gatsby"

import SEO from "../components/seo"
import PostsList from "../components/PostsList"
import MainLayout from "../components/MainLayout"

export default ({ location, pageContext, data }) => {
  const { category } = pageContext
  return (
    <MainLayout location={location} title={`Posts in category "${category}"`}>
      <div className="category-container">
        <SEO title={`Posts in category "${category}"`} />

        <h1>Category: {category}</h1>
        <PostsList postEdges={data.allMarkdownRemark.edges} />
      </div>
    </MainLayout>
  )
}

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      limit: 1000
      filter: { fields: { category: { eq: $category } } }
    ) {
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
