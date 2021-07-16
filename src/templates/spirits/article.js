import { graphql } from 'gatsby'
import React from 'react'
import Spirits from '../../components/Spirits'

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
        tags
      }
      fields {
        slug
      }
      tableOfContents
    }
  }
`
const Article = (props) => <Spirits {...props} />

export default Article
