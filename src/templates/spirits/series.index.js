import { graphql } from 'gatsby'
import React from 'react'
import Spirits from '../../components/Spirits'

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { fields: { draft: { ne: true } } }
      sort: { fields: [frontmatter___date], order: DESC }
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

export default (props) => <Spirits layout="series" {...props} />
