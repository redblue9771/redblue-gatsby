import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../../assets/css/custom.css'
import 'line-awesome/dist/line-awesome/css/line-awesome.min.css'

import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import { ApolloProvider } from '@apollo/react-hooks'
import Navigation from './NavBar'
import Header from './Header'
import Footer from './Footer'

import { useClientRect } from '../../utils/hooks'
import client from '../../utils/client'

const defaultPageState = {
  title: '',
  subTitle: '',
  description: '',
  date: '',
  layout: '',
}

export const PageState = React.createContext(defaultPageState)

export default ({ children }) => {
  const [isTransed, setIsTransed] = React.useState(false)
  const [rect, ref] = useClientRect()

  const [currPageState, setCurrPageState] = React.useState(defaultPageState)

  const handleScroll = React.useCallback(() => {
    requestAnimationFrame(() => {
      if (window.pageYOffset > rect.top / 2) {
        if (!isTransed) {
          setIsTransed(true)
        }
      } else if (isTransed) {
        setIsTransed(false)
      }
    })
  }, [isTransed, rect.top])

  React.useEffect(() => {
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  const {
    site: { siteMetadata },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  )

  return (
    <React.Fragment>
      <Helmet>
        <title>
          {`${currPageState.title || siteMetadata.title} - ${
            currPageState.layout === 'home'
              ? '其实你知的我是那面'
              : siteMetadata.title
          }`}
        </title>
      </Helmet>
      <Navigation
        title={isTransed ? currPageState.subTitle : siteMetadata.title}
        styleName={isTransed ? 'main-nav-scroll' : ''}
      />

      <Header {...currPageState} />
      <div
        className={`container-fluid clearfix ${
          currPageState.layout !== 'home' ? 'main-area' : 'main-area-fluid'
        }`}
        ref={ref}
      >
        <PageState.Provider value={{ setCurrPageState }}>
          <ApolloProvider client={client}>{children}</ApolloProvider>
        </PageState.Provider>
      </div>
      <Footer />
    </React.Fragment>
  )
}
