import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../assets/css/custom.css'
import { Helmet } from 'react-helmet'
import Navigation from './Navigation'
import Header from './Header'
import Footer from './Footer'

export default ({ children, location, title, fluid = false, sectionProps }) => {
  const handleScroll = (params) => {
    console.log(params)
  }

  return (
    <React.Fragment>
      <Navigation />
      <Header location={location} {...sectionProps} />
      <div
        className={`container-fluid clearfix ${
          fluid ? 'main-area-fluid' : 'main-area'
        }`}
        onScroll={handleScroll}
      >
        {children}
      </div>
      <Footer />
    </React.Fragment>
  )
}
