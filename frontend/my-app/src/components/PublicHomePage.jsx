import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class PublicHomePage extends Component {
    static propTypes = {
        isSignedIn: PropTypes.bool.isRequired
    }

    render() {
        const { isSignedIn } = this.props
        return (
            <section class="hero is-fullheight">
                <div class="hero-body">
                    <div class="container">
                        <h1 class="title">Thing</h1>
                        <h2 class="subtitle">make things clearer</h2>
                    </div>
                </div>
            </section>
        )
    }
}

