import React from "react"
import { Link, graphql } from "gatsby"

import SEO from "../components/seo"
import MainLayout from "../components/MainLayout"

const BlogPostTemplate = ({ location, data, pageContext }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <MainLayout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <container>
        <div>
          <div md={8}>
            <article>
              <h1 className="mt-4">{post.frontmatter.title}</h1>

              <hr />
              <p>Posted on {post.frontmatter.date}</p>

              <hr />

              <img
                className="img-fluid rounded"
                src="https://placehold.it/900x300"
                alt=""
              />

              <hr />

              <div dangerouslySetInnerHTML={{ __html: post.html }} />
            </article>
          </div>

          <div md={4}>
            {post.fields.category && (
              <card className="my-4">
                <card>Filed Under</card>
                <card>
                  <Link to={`/category/${post.fields.category}`}>
                    {post.fields.category}
                  </Link>
                </card>
              </card>
            )}
            {post.fields.tags && (
              <card className="my-4">
                <card>Tags</card>
                <card>
                  {post.fields.tags.map(tag => (
                    <Link
                      to={`/tags/${tag}`}
                      className="badge badge-primary p-2 m-1"
                    >
                      {tag}
                    </Link>
                  ))}
                </card>
              </card>
            )}
            <card>
              <card>See our other posts</card>
              <card>
                {previous && (
                  <Link
                    to={previous.fields.slug}
                    rel="prev"
                    className="btn btn-secondary"
                  >
                    ← {previous.frontmatter.title}
                  </Link>
                )}

                {next && (
                  <Link
                    to={next.fields.slug}
                    rel="next"
                    className="btn btn-secondary"
                  >
                    {next.frontmatter.title} →
                  </Link>
                )}
              </card>
            </card>
          </div>
        </div>
      </container>
    </MainLayout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
      fields {
        category
        tags
      }
    }
  }
`

export default BlogPostTemplate
