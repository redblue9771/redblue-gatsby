import Link from 'gatsby-plugin-transition-link/AniLink'
import React from 'react'
import { PageState } from '../common/MainLayout'

export default ({ location, pageContext }) => {
  const { setCurrPageState } = React.useContext(PageState)

  React.useEffect(() => {
    setCurrPageState({
      title: '博文',
      subTitle: '我非生而知之者',
      description: '学而时习之',
      layout: 'public',
    })
  }, [])

  return (
    <section id="article-tags">
      {pageContext.list.map(([key, value], index) => (
        <Link fade to={`${location.pathname}/${key}/`} key={index}>
          {key}
        </Link>
      ))}
    </section>
  )
}
