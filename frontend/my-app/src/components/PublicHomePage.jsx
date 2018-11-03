import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class PublicHomePage extends Component {
    static propTypes = {
        isSignedIn: PropTypes.bool.isRequired
    }

    render() {
        return (
            <section className="hero is-fullheight-with-navbar">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">Thing</h1>
                        <h2 className="subtitle">make things clearer</h2>
                    </div>
                </div>
            </section>
        )
    }
}

