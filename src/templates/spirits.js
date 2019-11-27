import React from 'react'
import { Link, graphql } from 'gatsby'
import MainLayout from '../components/MainLayout'
import '../assets/css/timeline.min.css'
import clsx from 'clsx'

export default ({
  location,
  data: {
    allMarkdownRemark: {
      edges: posts,
      pageInfo: { currentPage, pageCount, hasPreviousPage, hasNextPage },
    },
    site,
  },
}) => {
  const renderPagination = () => {
    const template = []
    for (let pageIndex = 1; pageIndex <= pageCount; pageIndex++) {
      if (currentPage === pageIndex) {
        template.push(
          <li
            className="page-item active"
            aria-current="page"
            key={`page${pageIndex}`}
          >
            <span className="page-link">{pageIndex}</span>
          </li>
        )
      } else {
        template.push(
          <li className="page-item" key={`page${pageIndex}`}>
            <Link
              className="page-link"
              to={`/spirits/${pageIndex === 1 ? '' : pageIndex}`}
            >
              {pageIndex}
            </Link>
          </li>
        )
      }
    }
    return template
  }

  return (
    <MainLayout
      location={location}
      sectionProps={{
        title: '我非生而知之者',
        subTitle: '学而时习之',
      }}
    >
      <div className="position-relative" id="blog-section">
        <nav aria-label="breadcrumb">
          <ul className="breadcrumb justify-content-end">
            <li>分类：</li>
            <li className="breadcrumb-item">
              <a href="{{.Permalink }}" />
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
              <React.Fragment key={node.fields.slug}>
                <span className="timeline-label">
                  <span className="label label-info">
                    {node.frontmatter.date || new Date().toLocaleDateString()}
                  </span>
                </span>
                <div className="timeline-item">
                  <div className="timeline-point timeline-point-info">
                    <i className="fa fa-circle" />
                  </div>
                  <div data-sal="slide-up">
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
                          <i className="fa fa-pencil" />
                          &nbsp;
                          {node.frontmatter.author}
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        {pageCount !== 1 && (
          <ul className="pagination">
            {hasPreviousPage && (
              <li className="page-item">
                <Link className="page-link" aria-label="First" to="/spirits/">
                  <span aria-hidden="true">&laquo;</span>
                </Link>
              </li>
            )}
            {renderPagination()}
            {hasNextPage && (
              <li className="page-item">
                <Link
                  className="page-link"
                  aria-label="Last"
                  to={`/spirits/${pageCount}`}
                >
                  <span aria-hidden="true">&raquo;</span>
                </Link>
              </li>
            )}
          </ul>
        )}
      </div>
    </MainLayout>
  )
}

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fields: { draft: { ne: true } } }
      sort: { fields: [frontmatter___date], order: DESC }
      skip: $skip
      limit: $limit
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
      pageInfo {
        currentPage
        pageCount
        hasPreviousPage
        hasNextPage
      }
    }
  }
`
