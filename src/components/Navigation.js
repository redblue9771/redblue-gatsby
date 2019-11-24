import React from "react"
import { Link } from "gatsby"
import routes from "../utils/routes"

const NavigationItem = ({ itemName, link }) => (
  <Link className="nav-item nav-link text-white text-nowrap" to={link}>
    &nbsp;/ {itemName} /&nbsp;
  </Link>
)

export default () => {
  return (
    <div className="container-fluid fixed-top" id="main-nav">
      <nav className="navbar text-white d-flex flex-nowrap navbar-expand-md mx-auto">
        <a
          className="navbar-brand flex-grow-1 text-truncate text-white"
          href="#"
          id="main-title"
        ></a>
        <a
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="true"
          aria-label="Toggle navigation"
        >
          <i className="fa fa-navicon"></i>
        </a>
        <div className="collapse navbar-collapse ">
          <div className="navbar-nav nav-justified ml-auto">
            {routes.map(({ title, path }) => (
              <NavigationItem itemName={title["cn"]} link={path || "/404"} />
            ))}
          </div>
        </div>
      </nav>
    </div>
  )
}
