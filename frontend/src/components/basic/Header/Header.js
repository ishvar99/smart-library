import React, { useContext, Fragment, useEffect } from "react"
import { Navbar, Nav } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import AuthContext from "../../../context/Auth/AuthContext"
import { Loader } from "../../utils/Loader/Loader"
export const Header = () => {
  let history = useHistory()
  const authContext = useContext(AuthContext)
  const { isAuthenticated, user, loadUser, logout, loading } = authContext
  const logoutUser = async () => {
    try {
      await logout()
      history.push("/")
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    async function getUser() {
      if (localStorage.getItem("loggedIn")) await loadUser()
    }
    getUser()
  }, [])
  return (
    <>
      {loading ? <Loader /> : null}
      <div className="Header">
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          className="p-3"
        >
          <Link to="/">
            <Navbar.Brand>Online Library</Navbar.Brand>
          </Link>
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
                    <Link to="/" className="nav-link">
                      Hello, {user ? user.name.split(" ")[0] : ""}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/profile" className="nav-link">
                      Profile
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/genre" className="nav-link">
                      Add Genre
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/book" className="nav-link">
                      Add Book
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a
                      onClick={logoutUser}
                      style={{ cursor: "pointer" }}
                      className="nav-link"
                    >
                      Logout
                    </a>
                  </li>
                </Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  )
}
