import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import SignIn from '../../components/sign/SignIn'
import SignUp from '../../components/sign/SignUp'
import PublicHomePage from '../../components/PublicHomePage'
import Header from '../header/Header'

export default class PrivateRoute extends Component {
    static propTypes = {
        isSignedIn: PropTypes.bool.isRequired
    }

    redirectWorkBench(props) {
        return (
            <Redirect
                to={ { pathname: '/workbench/todo', state: { from: props.location } } }
            />
        )
    }

    redirectPublicHomePage(props) {
        return (
            <Redirect
                to={ { pathname: '/public', state: { from: props.location } } }
            />
        )
    }

    redirectSignIn(props) {
        return (
            <Redirect
                to={ { pathname: '/signin', state: { from: props.location } } }
            />
        )
    }

    render() {
        const { isSignedIn } = this.props;
        return (
            <div>
                <Header isSignedIn={ isSignedIn } />
                <Route
                    exact
                    path="/"
                    render={ props => isSignedIn ? this.redirectWorkBench(props) : this.redirectPublicHomePage(props) }
                />
                <Route path="/public" render={ () => <PublicHomePage isSignedIn={ isSignedIn } /> } />
                <Route
                    path="/workbench/:name"
                    render={ props => { return isSignedIn ? <div>workbench</div> : this.redirectSignIn(props) } }
                />
                <Route path="/signin" render={ props => isSignedIn ? this.redirectWorkBench(props) : <SignIn /> } />
                <Route path="/signup" render={ props => isSignedIn ? this.redirectWorkBench(props) : <SignUp /> } />
            </div>
        )
    }
}
