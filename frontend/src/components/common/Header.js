import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
export const Header = () => {
  return (
    <div className='Header'>
      <Navbar
        collapseOnSelect
        expand='lg'
        bg='dark'
        variant='dark'
        className='p-3'
      >
        <Navbar.Brand href='/'>Online Library</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ml-auto'>
            <li className='nav-item active'>
              <Link to='/' className='nav-link'>
                Home
              </Link>
            </li>

            <li className='nav-item'>
              <Link to='/register' class='nav-link'>
                Register
              </Link>
            </li>

            <li className='nav-item'>
              <Link to='/login' className='nav-link'>
                Login
              </Link>
            </li>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}
