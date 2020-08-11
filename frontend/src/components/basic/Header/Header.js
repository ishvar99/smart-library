import React, { useContext, Fragment, useEffect } from "react"
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import AuthContext from "../../../context/Auth/AuthContext"
export const Header = () => {
  const context = useContext(AuthContext)
  const { isAuthenticated, user, loadUser } = context
  useEffect(() => {
    async function getUser() {
      await loadUser()
    }
    getUser()
  }, [])
  return (
    <div className="Header">
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        className="p-3"
      >
        <Navbar.Brand href="/">Online Library</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <li className="nav-item ">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            {!isAuthenticated ? (
              <Fragment>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Hello, {user ? user.name.split(" ")[0] : ""}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">
                    Profile
                  </Link>
                </li>
              </Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}
