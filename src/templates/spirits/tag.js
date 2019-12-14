import { graphql } from 'gatsby'
import React from 'react'
import Spirits from '../../components/Spirits'

export const pageQuery = graphql`
  query($currItem: String!, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: {
        fields: { draft: { ne: true } }
        frontmatter: { tags: { in: [$currItem] } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
      skip: $skip
      limit: $limit
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            category
            tags
            series
            date(formatString: "MMMM DD, YYYY")
            title
            description
            author
          }
        }
      }
      pageInfo {
        currentPage
        pageCount
        hasPreviousPage
        hasNextPage
      }
    }
  }
`

export default (props) => (
  <Spirits layout="category" baseURL="/spirits/tags/" {...props} />
)
