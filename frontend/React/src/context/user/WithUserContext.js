import React from 'react'
import UserContext from './UserContext'
export default Component => props => (
  <UserContext.Consumer>
    {context => <Component userContext={context} {...props} />}
  </UserContext.Consumer>
)
