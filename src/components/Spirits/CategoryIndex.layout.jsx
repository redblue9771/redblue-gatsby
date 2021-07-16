import Link from 'gatsby-plugin-transition-link/AniLink'
import React from 'react'
import translate from '../../utils/translate'
import { PageState } from '../common/MainLayout'
import TimeLine from '../common/TimeLine/Geometric'

const CategoriesIndex = ({
  location,
  data: {
    allMarkdownRemark: {
      edges: posts,
      pageInfo: { currentPage, pageCount, hasPreviousPage, hasNextPage },
    },
  },
  pageContext,
  baseURL,
}) => {
  const { setCurrPageState } = React.useContext(PageState)
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
              to={`${
                baseURL || location.pathname.match(/(.*)(?=page)*/g)[0]
              }page/${pageIndex === 1 ? '' : pageIndex}`}
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
          <li>🔖 分类：</li>
          {pageContext.list.map(([name, number], index) => (
            <li className="breadcrumb-item" key={index}>
              {pageContext.currItem === name &&
              decodeURIComponent(location.pathname).includes(
                pageContext.currItem
              ) ? (
                `${translate[name] || name}(${number})`
              ) : (
                <Link
                  to={`${
                    baseURL || location.pathname.match(/(.*)(?=page)*/g)[0]
                  }${name}/`}
                >
                  {`${translate[name] || name}(${number})`}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <ul className="breadcrumb justify-content-end">
          <li>📒 其它分类：</li>
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
        <TimeLine.Container>
          {posts.map(({ node }) => (
            <TimeLine.Item
              date={`${node.frontmatter.author} - ${
                node.frontmatter.date || new Date().toLocaleDateString()
              }`}
              title={node.frontmatter.title || node.fields.slug}
              description={node.frontmatter.description || node.excerpt}
              to={node.fields.slug}
              key={node.fields.slug}
              component={Link}
              data-sal="slide-down"
            />
          ))}
        </TimeLine.Container>
      </div>
      {pageCount !== 1 && (
        <ul className="pagination">
          {hasPreviousPage && (
            <li className="page-item">
              <Link
                className="page-link"
                aria-label="First"
                to={baseURL || location.pathname.match(/(.*)(?=page)*/g)[0]}
              >
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
                to={`${
                  baseURL || location.pathname.match(/(.*)(?=page)*/g)[0]
                }page/${pageCount}`}
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

export default CategoriesIndex
