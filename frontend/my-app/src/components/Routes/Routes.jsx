import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom'
import SignIn from '../../components/sign/SignIn'
import SignUp from '../../components/sign/SignUp'
import PublicHomePage from '../../components/PublicHomePage'

export default class PrivateRoute extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    render() {
        const { isAuthenticated } = this.props;
        return (
            <div>
                <Route exact path="/" render={
                    props =>
                        isAuthenticated
                            ?
                            <div>workbench</div>
                            :
                            <Redirect
                                to={ {
                                    pathname: '/public',
                                    state: { from: props.location }
                                } }
                            />
                } />
                <Route
                    path="/workbench/:name"
                    render={
                        props =>
                            isAuthenticated
                                ?
                                <div>workbench</div>
                                :
                                <Redirect
                                    to={ {
                                        pathname: '/signin',
                                        state: { from: props.location }
                                    } }
                                />
                    }
                />
                <Route path="/public" component={ PublicHomePage } />
                <Route path="/signin" component={ SignIn } />
                <Route path="/signup" component={ SignUp } />
            </div>
        )
    }
}
