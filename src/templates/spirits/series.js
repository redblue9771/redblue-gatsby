import { graphql } from 'gatsby'
import React from 'react'
import Spirits from '../../components/Spirits'

export const pageQuery = graphql`
  query ($currItem: String!, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: {
        fields: { draft: { ne: true } }
        frontmatter: { series: { in: [$currItem] } }
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

const Series = (props) => (
  <Spirits layout="category" baseURL="/spirits/series/" {...props} />
)

export default Series
