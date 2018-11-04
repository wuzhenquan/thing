import React, { Component } from 'react'
import * as api from '../../api'
import Icon from '../icons/Icon'
import { withRouter } from "react-router-dom"
import PropTypes from 'prop-types'

class SignIn extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            password: ''
        }
    }

    submit() {
        const { history } = this.props
        if (!this.state.name) return console.error('请输入名字')
        else if (!this.state.password) return console.error('请输入密码')
        api.signIn(
            { name: this.state.name, password: this.state.password }
        ).then(data => {
            history.push('/workbench/todo')
            console.log(data, 'data')
        })
    }

    render() {
        return (
            <section className="hero is-fullheight-with-navbar level">
                <div className="level-item has-text-centered">
                    <div>
                        <div className="field">
                            <p className="control has-icons-left has-icons-right">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="name"
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
                            <p className="control has-icons-left">
                                <input
                                    className="input"
                                    type="password"
                                    placeholder="Password"
                                    onChange={ (e) => { this.setState({ password: e.target.value }) } }
                                />
                                <span className="icon is-small is-left">
                                    <Icon name='lock' size={ 0.9 } />
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control">
                                <button
                                    className="button is-primary is-fullwidth"
                                    onClick={ () => { this.submit() } }
                                >
                                    Sign in
				                </button>
                            </p>
                        </div>
                        <div>
                            <p className="is-size-7">Don't have an account? <a href="/signup">Sign up.</a></p>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default withRouter(SignIn);
