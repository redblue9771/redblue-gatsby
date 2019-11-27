import React from 'react'
import { Link } from 'gatsby'
import routes from '../utils/routes'

import Icon from '@mdi/react'
import { mdiViewDashboardOutline } from '@mdi/js'

const renderRouter = routes.map(({ title, path, external }) =>
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
)

export default ({ title = 'RedBlue | 赤琦', titleBgc = '#448AFF' }) => {
  return (
    <div
      id="main-nav"
      className="container-fluid fixed-top"
      style={{ backgroundColor: titleBgc }}
      data-sal="slide-down"
    >
      <nav className="navbar text-white d-flex flex-nowrap navbar-expand-md mx-auto">
        <Link
          className="navbar-brand flex-grow-1 text-truncate text-white"
          to="/"
          id="main-title"
        >
          {title}
        </Link>
        <a
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="true"
          aria-label="Toggle navigation"
        >
          <i className="lab la-gitter"></i>
        </a>
        <div className="collapse navbar-collapse">
          <div className="navbar-nav nav-justified ml-auto">{renderRouter}</div>
        </div>
      </nav>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav nav-justified ml-auto">{renderRouter}</div>
      </div>
    </div>
  )
}
