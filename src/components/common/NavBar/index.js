import React from 'react'
import Link from 'gatsby-plugin-transition-link/AniLink'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import routes from '../../../utils/routes'
import './index.css'
import { navigate } from '@reach/router'

const MainNavBar = ({ title = 'RedBlue | 赤琦', styleName = '' }) => {
  const [toggleBar, setToggleBar] = React.useState(false)
  const handleToggle = () => {
    setToggleBar(!toggleBar)
  }

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
        key={path}
        to={path || '/404/'}
        className="text-white text-nowrap"
      >
        &nbsp;/ {title.cn} /&nbsp;
      </Nav.Link>
    )
  )

  return (
    <Container
      fluid
      id="main-nav"
      className={`fixed-top ${toggleBar ? 'showBar' : ''} ${styleName}`}
    >
      <Navbar className="mx-auto" expand="md" data-sal="slide-down">
        <Navbar.Brand
          as="a"
          id="main-title"
          className="flex-grow-1 text-truncate text-white"
          onClick={() => {
            navigate('#')
          }}
          style={{
            maxWidth: 'calc(100% - 3rem)',
          }}
        >
          {title}
        </Navbar.Brand>

        <Navbar.Toggle
          as="a"
          className="border-0 text-white btn-menu"
          onClick={handleToggle}
        >
          <span className="bar" />
        </Navbar.Toggle>

        <Navbar.Collapse className="overlay justify-content-end">
          <Nav className="nav-justified ml-auto">{renderRouter}</Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  )
}

export default MainNavBar
