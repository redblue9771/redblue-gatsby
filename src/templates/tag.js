import React from 'react'
import { graphql } from 'gatsby'

import SEO from '../components/seo'
import PostsList from '../components/PostsList'

export default ({ location, pageContext, data }) => {
  const { tag } = pageContext

  if (!tag) {
    return 'all tags'
  }

  return (
    <div className="tag-container">
      <SEO title={`Posts in tag "${tag}"`} />
      <h1>Tag: {tag}</h1>
      <PostsList postEdges={data.allMarkdownRemark.edges} />
    </div>
  )
}

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      filter: { fields: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            tags
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
