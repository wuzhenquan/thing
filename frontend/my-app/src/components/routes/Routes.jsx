import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import SignIn from '../../components/sign/SignIn'
import SignUp from '../../components/sign/SignUp'
import PublicHomePage from '../../components/PublicHomePage'
import Header from '../header/Header'
import UserContext from '../../context/UserContext'
import Workbench from '../WorkBench'

class Routes extends Component {
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
        const userInfo = this.context;
        const isSignedIn = !!(userInfo && userInfo.name)
        return (
            <div>
                <Header/>
                <Route
                    exact
                    path="/"
                    render={ props => isSignedIn ? this.redirectWorkBench(props) : this.redirectPublicHomePage(props) }
                />
                <Route path="/public" render={ () => <PublicHomePage isSignedIn={ isSignedIn } /> } />
                <Route
                    path="/workbench/:name"
                    render={ props => { return isSignedIn ? <Workbench/> : this.redirectSignIn(props) } }
                />
                <Route path="/signin" render={ props => isSignedIn ? this.redirectWorkBench(props) : <SignIn /> } />
                <Route path="/signup" render={ props => isSignedIn ? this.redirectWorkBench(props) : <SignUp /> } />
            </div>
        )
    }
}

Routes.contextType = UserContext

export default Routes
