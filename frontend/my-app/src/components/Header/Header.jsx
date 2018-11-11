import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.png'
import UserDropDown from '../user/UserDropDown'
import UserContext from '../../context/UserContext'

class Header extends Component {
    state = {
        burgerOpen: false
    }

    render() {
        const userInfo = this.context;
        const isSignedIn = !!(userInfo && userInfo.name)
        return (
            <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">

                    {/* logo */ }
                    <a href="/" className="navbar-item">
                        <img src={ logo } alt="logo"/>
                    </a>

                    {/* burger */ }
                    <span className={ `navbar-burger burger ${this.state.burgerOpen ? 'is-active' : ''}` } aria-label="menu" aria-expanded="false" data-target="navbarBasicExample"
                        onClick={ () => { this.setState(state => ({ burgerOpen: !state.burgerOpen })) } }
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </span>

                </div>
                {/* menu */}
                <div className={ `navbar-menu ${this.state.burgerOpen ? 'is-active' : ''}` }>
                    <div className="navbar-end">
                        { isSignedIn
                            ?
                            <div className="navbar-item">
                                <UserDropDown/>
                            </div>
                            :
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
                        }
                    </div>
                </div>
            </nav>
        )
    }
}

Header.contextType = UserContext

export default Header
