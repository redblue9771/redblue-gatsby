import React from 'react'
import Link from 'gatsby-plugin-transition-link/AniLink'
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
              fade
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
          {pageContext.list.map(([key, value], index) => (
            <li className="breadcrumb-item" key={index}>
              {pageContext.currItem === key &&
              location.pathname.includes(pageContext.currItem) ? (
                `${translate[key]}(${value})`
              ) : (
                <Link fade to={`/${location.pathname.split('/')[1]}/${key}/`}>
                  {`${translate[key]}(${value})`}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <ul className="breadcrumb justify-content-end">
          <li>其他分类：</li>
          <li className="breadcrumb-item">
            <Link fade to="/spirits/tags/" rel="bookmark">
              按标签
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link fade to="/spirits/series/" rel="bookmark">
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
              fade
              data-sal="slide-down"
            />
          ))}
        </TimeLine.container>
      </div>
      {pageCount !== 1 && (
        <ul className="pagination">
          {hasPreviousPage && (
            <li className="page-item">
              <Link
                fade
                className="page-link"
                aria-label="First"
                to="/spirits/"
              >
                <span aria-hidden="true">&laquo;</span>
              </Link>
            </li>
          )}
          {renderPagination()}
          {hasNextPage && (
            <li className="page-item">
              <Link
                fade
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
