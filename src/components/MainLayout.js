import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../assets/css/custom.css'
import 'line-awesome/dist/line-awesome/css/line-awesome.min.css'

import { Helmet } from 'react-helmet'
import Navigation from './Navigation'
import Header from './Header'
import Footer from './Footer'

import { useClientRect } from '../utils/hooks'

export default ({
  children,
  location,
  title,
  fluid = false,
  sectionProps = {},
}) => {
  const [isTransed, setIsTransed] = React.useState(false)
  const [rect, ref] = useClientRect()

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

  return (
    <React.StrictMode>
      <Navigation
        title={isTransed ? sectionProps.title : title}
        titleBgc={isTransed ? '#448AFF' : 'transparent'}
      />
      <Header location={location} {...sectionProps} />
      <div
        className={`container-fluid clearfix ${
          fluid ? 'main-area-fluid' : 'main-area'
        }`}
        ref={ref}
      >
        {children}
      </div>
      <Footer />
    </React.StrictMode>
  )
}
