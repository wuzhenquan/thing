import React, { Component } from 'react'
import * as api from '../../api'
import Icon from '../icons/Icon'
import { withRouter } from "react-router-dom"
import PropTypes from 'prop-types'

class SignUp extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    submit(e) {
        e.preventDefault()
        if (!this.state.name) return console.error('请输入名字')
        else if (!this.state.password) return console.error('请输入密码')
        api.signUp(
            { name: this.state.name, email: this.state.email, password: this.state.password }
        ).then(data => {
            console.log(data, 'data')
        })
    }

    render() {
        return (
            <section className="hero is-fullheight-with-navbar level">
                <form onSubmit={ (e) => { this.submit(e) } } className="level-item has-text-centered">
                    <div>
                        <div className="field">
                            <p className="control has-icons-left has-icons-right">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="User name"
                                    required
                                    onChange={ (e) => { this.setState({ name: e.target.value }) } }
                                />
                                <span className="icon is-small is-left">
                                    <Icon name='account' size={ 0.9 } />
                                </span>
                                <span className="icon is-small is-right">
                                    <i className="fas fa-check"></i>
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control has-icons-left has-icons-right">
                                <input
                                    className="input"
                                    type="email"
                                    placeholder="Email" required
                                    onChange={ (e) => { this.setState({ email: e.target.value }) } }
                                />
                                <span className="icon is-small is-left">
                                    <Icon name='email' size={ 0.9 } />
                                </span>
                                <span className="icon is-small is-right">
                                    <i className="fas fa-check"></i>
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control has-icons-left">
                                <input
                                    className="input"
                                    type="password"
                                    placeholder="Password"
                                    required
                                    onChange={ (e) => { this.setState({ password: e.target.value }) } }
                                />
                                <span className="icon is-small is-left">
                                    <Icon name='lock' size={ 0.9 } />
                                </span>
                            </p>
                        </div>
                        {/* <div className="field">
                            <p className="control has-icons-left">
                                <input className="input" type="password" placeholder="Confirm password" required />
                                <span className="icon is-small is-left">
                                    <Icon name='lock' size={ 0.9 } />
                                </span>
                            </p>
                        </div> */}
                        <div className="field">
                            <p className="control">
                                <button
                                    className="button is-primary is-fullwidth"
                                >
                                    Sign up
                                </button>
                            </p>
                        </div>
                        <div>
                            <p className="is-size-7">Already have an account? <a href="signin">Sign in.</a></p>
                        </div>
                    </div>
                </form>
            </section>

        )
    }
}

export default withRouter(SignUp)
