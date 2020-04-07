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
    <section className="article-series position-relative">
      <div>
        {pageContext.list.map(([key, value], index) => (
          <article
            key={index}
            className="mx-3 mb-3 shadow"
            style={{
              background: `url(/img/series/books.jpg)`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          >
            <Link
              to={`${location.pathname}/${key}/`}
              className="d-block w-100 h-100"
              rel="glossary"
            >
              <h4 className="text-white mx-3">《{key}》</h4>
            </Link>
          </article>
        ))}
      </div>
      <span className="shade-left" />
      <span className="shade-right" />
    </section>
  )
}
