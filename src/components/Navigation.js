import React from 'react'
import { Link } from 'gatsby'
import routes from '../utils/routes'

export default () => {
  return (
    <div className="container-fluid fixed-top" id="main-nav">
      <nav className="navbar text-white d-flex flex-nowrap navbar-expand-md mx-auto">
        <a
          className="navbar-brand flex-grow-1 text-truncate text-white"
          href="#"
          id="main-title"
        >
          asdas
        </a>
        <a
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="true"
          aria-label="Toggle navigation"
        >
          <i className="fa fa-navicon" />
        </a>
        <div className="collapse navbar-collapse ">
          <div className="navbar-nav nav-justified ml-auto">
            {routes.map(({ title, path, external }) =>
              external ? (
                <a
                  key={path}
                  className="nav-item nav-link text-white text-nowrap"
                  href={path}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  &nbsp;/ {title.cn} /&nbsp;
                </a>
              ) : (
                <Link
                  key={path}
                  className="nav-item nav-link text-white text-nowrap"
                  to={path || '/404'}
                >
                  &nbsp;/ {title.cn} /&nbsp;
                </Link>
              )
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}
