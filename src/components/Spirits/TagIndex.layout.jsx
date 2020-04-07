import Link from 'gatsby-plugin-transition-link/AniLink'
import React from 'react'
import { PageState } from '../common/MainLayout'

const fontColors = ['#29b7dc', '#6a9bd3', '#3a4f92', '#a7e2f1', '#9dbde2']

const randomFz = () => Math.floor(Math.random() * 16 + 16)
const randomC = () => Math.floor(Math.random() * 5)

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
        <Link
          to={`${location.pathname}/${key}/`}
          key={index}
          style={{
            color: `${fontColors[randomC()]}`,
            fontSize: `${randomFz()}px`,
          }}
        >
          {key}
        </Link>
      ))}
    </section>
  )
}
