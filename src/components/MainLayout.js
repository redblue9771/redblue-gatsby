import React from "react"

import "bootstrap/dist/css/bootstrap.min.css"
import "../assets/css/custom.css"
import Navigation from "./Navigation"
import Header from "./Header"
import Footer from "./Footer"

export default ({ children, location, title }) => {
  return (
    <React.Fragment>
      <Navigation />
      <Header location={location} title={title} />
      <div className="container-fluid clearfix main-area">{children}</div>
      <Footer />
    </React.Fragment>
  )
}
