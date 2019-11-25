import React from "react"
import MainLayout from "../../components/MainLayout"
import "../../assets/css/timeline.min.css"
import { Link, graphql } from "gatsby"

export default ({ location, data }) => {
  console.log(data)
  const { edges: posts = [] } = data.allMarkdownRemark
  return (
    <MainLayout location={location}>
      <div className="position-relative" id="blog-section">
        <nav aria-label="breadcrumb">
          <ul className="breadcrumb justify-content-end">
            <li>分类：</li>
            <li className="breadcrumb-item">
              <a href="{{.Permalink }}"></a>
            </li>
          </ul>
          <ul className="breadcrumb justify-content-end">
            <li>其他分类：</li>
            <li className="breadcrumb-item">
              <a href="/tags/" rel="bookmark">
                按标签
              </a>
            </li>
            <li className="breadcrumb-item">
              <a href="/series/" rel="bookmark">
                按系列
              </a>
            </li>
          </ul>
        </nav>
        <div className="row">
          <div className="timeline timeline-line-dotted">
            {posts.map(({ node }) => (
              <>
                <span className="timeline-label">
                  <span className="label label-info">
                    {node.frontmatter.date || new Date().toLocaleDateString()}
                  </span>
                </span>
                <div className="timeline-item">
                  <div className="timeline-point timeline-point-info">
                    <i className="fa fa-circle"></i>
                  </div>
                  <div>
                    <Link to={node.fields.slug}>
                      <div className="timeline-heading">
                        <h5>
                          <strong>
                            {node.frontmatter.title || node.fields.slug}
                          </strong>
                        </h5>
                      </div>
                      <div className="timeline-body">
                        <p>{node.frontmatter.description || node.excerpt}</p>
                      </div>
                      <div className="timeline-footer">
                        <p className="text-right">
                          <i className="fa fa-pencil"></i>&nbsp;
                          {node.frontmatter.author}
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
        {/* 分页面 */}
      </div>
    </MainLayout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fields: { draft: { eq: false } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1000
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
            author
          }
        }
      }
    }
  }
`
