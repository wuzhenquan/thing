import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.png'
import UserDropDown from '../user/UserDropDown'
import WithUserContext from '../../context/user/WithUserContext'

function Header(props) {
  const [burgerOpen, setBurgerOpen] = useState(false)
  const {
    userContext: { name }
  } = props
  const isSignedIn = !!name

  return (
    <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        {/* logo */}
        <a href="/" className="navbar-item">
          <img src={logo} alt="logo" />
        </a>

        {/* burger */}
        <span
          className={`navbar-burger burger ${burgerOpen ? 'is-active' : ''}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={() => {
            setBurgerOpen(!burgerOpen)
          }}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </span>
      </div>
      {/* menu */}
      <div className={`navbar-menu ${burgerOpen ? 'is-active' : ''}`}>
        <div className="navbar-end">
          {isSignedIn ? (
            <div className="navbar-item">
              <UserDropDown />
            </div>
          ) : (
            <div className="navbar-item">
              <div className="buttons">
                <Link to="/signup" className="button is-primary">
                  <strong>Sign up</strong>
                </Link>
                <Link to="/signin" className="button is-light">
                  Sign in
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

Header.prototype

export default WithUserContext(Header)
