import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
export const Header = () => {
  return (
    <div class='Header'>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Navbar.Brand href='/'>Online Library</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ml-auto'>
            <Nav.Link class='nav-item'>
              <Link to='/'>Home</Link>
            </Nav.Link>
            <Nav.Link class='nav-item'>
              <Link to='/signin'>Signin</Link>
            </Nav.Link>
            <Nav.Link class='nav-item'>
              <Link to='/signup'>Signup</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}
