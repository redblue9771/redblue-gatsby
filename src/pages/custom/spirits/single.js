import { graphql } from 'gatsby'
import React from 'react'
import Spirits from '../../../components/Spirits'

export default (props) => <Spirits {...props} />

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        original
        author
      }
      fields {
        slug
      }
    }
  }
`
