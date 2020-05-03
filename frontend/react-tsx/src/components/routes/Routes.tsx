import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import SignIn from '../sign/SignIn'
import SignUp from '../sign/SignUp'
import PublicHomePage from '../PublicHomePage'
import Header from '../header/Header'
import WorkbenchRoutes from './WorkbenchRoutes'
import WithUserContext from '../../context/user/WithUserContext'

function Routes(props) {
  const {
    userContext: { name }
  } = props
  const isSignedIn = !!name
  const redirectWorkBench = props => {
    return <Redirect to={{ pathname: '/workbench/todo', state: { from: props.location } }} />
  }

  const redirectPublicHomePage = props => {
    return <Redirect to={{ pathname: '/public', state: { from: props.location } }} />
  }

  const redirectSignIn = props => {
    return <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
  }
  return (
    <div>
      <Header />
      <Route
        exact
        path="/"
        render={props => (isSignedIn ? redirectWorkBench(props) : redirectPublicHomePage(props))}
      />
      <Route path="/public" render={() => <PublicHomePage isSignedIn={isSignedIn} />} />
      <Route
        path="/workbench/:name"
        render={props => {
          return isSignedIn ? <WorkbenchRoutes props={props} /> : redirectSignIn(props)
        }}
      ></Route>
      <Route
        path="/signin"
        render={props => (isSignedIn ? redirectWorkBench(props) : <SignIn />)}
      />
      <Route
        path="/signup"
        render={props => (isSignedIn ? redirectWorkBench(props) : <SignUp />)}
      />
    </div>
  )
}

export default WithUserContext(Routes)
