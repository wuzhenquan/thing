import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Header extends Component {
    state = {
        burgerOpen: false
    }

    //   static propTypes = {
    //     prop: PropTypes
    //   }

    render() {
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://bulma.io">
                        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
                    </a>

                    <a role="button" className={ `navbar-burger burger ${this.state.burgerOpen ? 'is-active' : ''}` } aria-label="menu" aria-expanded="false" data-target="navbarBasicExample"
                        onClick={ () => { this.setState(state => ({ burgerOpen: !state.burgerOpen })) } }
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div className={ `navbar-menu ${this.state.burgerOpen ? 'is-active' : ''}` }>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <a className="button is-primary">
                                    <strong>Sign up</strong>
                                </a>
                                <a className="button is-light">
                                    Sign in
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}
