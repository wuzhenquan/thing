import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import SignIn from '../../components/sign/SignIn'
import SignUp from '../../components/sign/SignUp'
import PublicHomePage from '../../components/PublicHomePage'
import Header from '../Header/Header'

export default class PrivateRoute extends Component {
    static propTypes = {
        isSignedIn: PropTypes.bool
    }

    render() {
        const { isSignedIn } = this.props;
        return (
            <div>
                <Header
                    isSignedIn={ isSignedIn }
                />
                <Route exact path="/" render={
                    props =>
                        isSignedIn
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
                            isSignedIn
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
                <Route
                    path="/public"
                    render={ () => {
                        return <PublicHomePage
                            isSignedIn={ isSignedIn }
                        />
                    } }
                />
                <Route path="/signin" component={ SignIn } />
                <Route path="/signup" component={ SignUp } />
            </div>
        )
    }
}
