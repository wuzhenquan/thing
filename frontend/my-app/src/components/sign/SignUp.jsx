import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class SignUp extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <section class="hero is-fullheight-with-navbar level">
                <div class="level-item has-text-centered">
                    <div>
                        <div class="field">
                            <p class="control has-icons-left has-icons-right">
                                <input class="input" type="text" placeholder="User name" required />
                                <span class="icon is-small is-left">
                                    <i class="fas fa-envelope"></i>
                                </span>
                                <span class="icon is-small is-right">
                                    <i class="fas fa-check"></i>
                                </span>
                            </p>
                        </div>
                        <div class="field">
                            <p class="control has-icons-left has-icons-right">
                                <input class="input" type="email" placeholder="Email" required />
                                <span class="icon is-small is-left">
                                    <i class="fas fa-envelope"></i>
                                </span>
                                <span class="icon is-small is-right">
                                    <i class="fas fa-check"></i>
                                </span>
                            </p>
                        </div>
                        <div class="field">
                            <p class="control has-icons-left">
                                <input class="input" type="password" placeholder="Password" required />
                                <span class="icon is-small is-left">
                                    <i class="fas fa-lock"></i>
                                </span>
                            </p>
                        </div>
                        <div class="field">
                            <p class="control has-icons-left">
                                <input class="input" type="password" placeholder="Confirm password" required />
                                <span class="icon is-small is-left">
                                    <i class="fas fa-lock"></i>
                                </span>
                            </p>
                        </div>
                        <div class="field">
                            <p class="control">
                                <button class="button is-primary is-fullwidth">
                                    Sign up
                            </button>
                            </p>
                        </div>
                        <div>
                            <p class="is-size-7">Already have an account? <a href="#">Sign in.</a></p>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
