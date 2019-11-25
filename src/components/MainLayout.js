import React from "react"

import "bootstrap/dist/css/bootstrap.min.css"
import "../assets/css/custom.css"
import Navigation from "./Navigation"
import Header from "./Header"
import Footer from "./Footer"

import { Helmet } from "react-helmet"

export default ({ children, location, title, fluid = false, sectionProps }) => {
  console.log(fluid)
  return (
    <React.Fragment>
      <Navigation />
      <Header location={location} {...sectionProps} />
      <div
        className={`container-fluid clearfix ${
          fluid ? "main-area-fluid" : "main-area"
        }`}
      >
        {children}
      </div>
      <Footer />
    </React.Fragment>
  )
}
