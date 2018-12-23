import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import SignIn from '../../components/sign/SignIn'
import SignUp from '../../components/sign/SignUp'
import PublicHomePage from '../../components/PublicHomePage'
import Header from '../header/Header'
import UserContext from '../../context/UserContext'
import WorkbenchRoutes from './WorkbenchRoutes'

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
        const userInfo = this.context
        const isSignedIn = !!(userInfo && userInfo.name)
        const routes = [
            {
                path: '/',
                exact: true,
                render: props => isSignedIn ? this.redirectWorkBench(props) : this.redirectPublicHomePage(props)
            },
            {
                path: '/public',
                render: <PublicHomePage isSignedIn={ isSignedIn } />
            },
            {
                path: '/workbench/:name',
                render: props => { return isSignedIn ? <WorkbenchRoutes props={ props } /> : this.redirectSignIn(props) }
            },
            {
                path: '/signin',
                render: props => isSignedIn ? this.redirectWorkBench(props) : <SignIn />
            },
            {
                path: '/signup',
                render: props => isSignedIn ? this.redirectWorkBench(props) : <SignUp />
            }
        ]
        return (
            <div>
                <Header />
                { routes.map((route, index) => {
                    return <Route
                        key={ index }
                        path={ route.path }
                        exact={ route.exact }
                        render={ route.render }
                    />
                }) }
            </div>
        )
    }
}

Routes.contextType = UserContext

export default Routes
