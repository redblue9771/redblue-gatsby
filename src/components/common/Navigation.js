import React from 'react'
import Link from 'gatsby-plugin-transition-link/AniLink'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import routes from '../../utils/routes'

const renderRouter = routes.map(({ title, path, external }) =>
  external ? (
    <Nav.Link
      key={path}
      href={path}
      target="_blank"
      rel="noopener noreferrer"
      className="text-white text-nowrap"
    >
      &nbsp;/ {title.cn} /&nbsp;
    </Nav.Link>
  ) : (
    <Nav.Link
      as={Link}
      fade
      key={path}
      to={path || '/404'}
      className="text-white text-nowrap"
    >
      &nbsp;/ {title.cn} /&nbsp;
    </Nav.Link>
  )
)

export default ({ title = 'RedBlue | 赤琦', styleName = '' }) => {
  return (
    <Container fluid id="main-nav" className={`fixed-top ${styleName}`}>
      <Navbar className="flex-nowrap mx-auto" expand="md" data-sal="slide-down">
        <Navbar.Brand
          as={Link}
          fade
          to="/"
          id="main-title"
          className="flex-grow-1 text-truncate text-white"
        >
          {title}
        </Navbar.Brand>

        <Navbar.Toggle
          as="a"
          aria-controls="navbarNavAltMarkup"
          className="border-0 text-white"
        >
          <i className="lab la-gitter" />
        </Navbar.Toggle>

        <Navbar.Collapse>
          <Nav className="nav-justified ml-auto">{renderRouter}</Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  )
}
