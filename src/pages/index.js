import { graphql } from 'gatsby'
import React from 'react'
import Launch from '../components/Launch'

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { fields: { draft: { ne: true } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 5
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
export default (props) => <Launch {...props} />
