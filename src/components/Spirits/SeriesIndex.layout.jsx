import React from 'react'
import { Link, graphql } from 'gatsby'
import { PageState } from '../common/MainLayout'
// import '../assets/css/timeline.min.css'
import GitHub from '../../assets/img/undraw_developer_activity.svg'
import TimeLine from '../common/TimeLine/Geometric'
import translate from '../../utils/translate'

export default ({
  location,
  data: {
    allMarkdownRemark: {
      edges: posts,
      pageInfo: { currentPage, pageCount, hasPreviousPage, hasNextPage },
    },
  },
  pageContext,
}) => {
  const { setCurrPageState } = React.useContext(PageState)
  console.log(pageContext)
  React.useEffect(() => {
    setCurrPageState({
      title: '博文',
      subTitle: '我非生而知之者',
      description: '学而时习之',
      layout: 'public',
    })
  }, [])

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
              to={`${location.pathname.replace(/\/\d+/, '')}/${
                pageIndex === 1 ? '' : pageIndex
              }`}
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
    <div
      className="position-relative"
      id="blog-section"
      // style={{
      //   background: `url(${GitHub})`,
      //   backgroundSize: 'contain',
      //   backgroundPosition: 'center',
      //   backgroundRepeat: 'no-repeat',
      //   backgroundOrigin: 'content-box',
      //   backgroundAttachment: 'fixed',
      // }}
    >
      <nav aria-label="breadcrumb">
        <ul className="breadcrumb justify-content-end">
          <li>分类：</li>
          {pageContext.list.map((item) => (
            <li className="breadcrumb-item" key="item">
              {pageContext.currItem === item &&
              location.pathname.includes(pageContext.currItem) ? (
                translate[item]
              ) : (
                <Link to={`/${location.pathname.split('/')[1]}/${item}/`}>
                  {translate[item]}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <ul className="breadcrumb justify-content-end">
          <li>其他分类：</li>
          <li className="breadcrumb-item">
            <Link to="/spirits/tags/" rel="bookmark">
              按标签
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/spirits/series/" rel="bookmark">
              按系列
            </Link>
          </li>
        </ul>
      </nav>
      <div className="row">
        <TimeLine.container>
          {posts.map(({ node }) => (
            <TimeLine.item
              date={`${node.frontmatter.author} - ${node.frontmatter.date ||
                new Date().toLocaleDateString()}`}
              title={node.frontmatter.title || node.fields.slug}
              description={node.frontmatter.description || node.excerpt}
              to={node.fields.slug}
              key={node.fields.slug}
              component={Link}
            />
          ))}
        </TimeLine.container>
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
                to={`${location.pathname.replace(/\/\d+/, '')}/${pageCount}`}
              >
                <span aria-hidden="true">&raquo;</span>
              </Link>
            </li>
          )}
        </ul>
      )}
    </div>
  )
}

export const pageQuery = graphql`
  query($currItem: String, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: {
        fields: { draft: { ne: true } }
        frontmatter: { category: { in: [$currItem] } }
      }
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
