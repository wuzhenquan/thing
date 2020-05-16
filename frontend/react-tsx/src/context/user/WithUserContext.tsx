import React from 'react'
import UserContext from './UserContext'

const WithUserContext = <P extends object>(Component: React.FC<P>): React.FC => props => (
  <UserContext.Consumer>
    {context => <Component userContext={context} {...props as P} />}
  </UserContext.Consumer>
)
export default WithUserContext