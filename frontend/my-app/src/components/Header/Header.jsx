import React, { Component } from 'react'
import Icon from '@mdi/react'
import { mdiAccount } from '@mdi/js'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import logo from '../../images/logo.png'

export default class Header extends Component {
    state = {
        burgerOpen: false
    }

    static propTypes = {
        isSignedIn: PropTypes.bool.isRequired
    }

    render() {
        const { isSignedIn } = this.props
        return (
            <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">

                    {/* logo */ }
                    <a className="navbar-item">
                        <img src={ logo } />
                    </a>

                    {/* burger */ }
                    <a role="button" className={ `navbar-burger burger ${this.state.burgerOpen ? 'is-active' : ''}` } aria-label="menu" aria-expanded="false" data-target="navbarBasicExample"
                        onClick={ () => { this.setState(state => ({ burgerOpen: !state.burgerOpen })) } }
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>

                </div>
                {/* menu */}
                <div className={ `navbar-menu ${this.state.burgerOpen ? 'is-active' : ''}` }>
                    <div className="navbar-end">
                        { isSignedIn
                            ?
                            <div className="navbar-item">
                                <Icon path={ mdiAccount } size={ 1 } />
                            </div>
                            :
                            <div className="navbar-item">
                                <div className="buttons">
                                    <Link to="/signup" className="button is-small is-primary">
                                        <strong>Sign up</strong>
                                    </Link>
                                    <Link to="/signin" className="button is-small is-light">
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
