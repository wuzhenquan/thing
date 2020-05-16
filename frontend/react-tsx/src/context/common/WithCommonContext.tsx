import React from 'react'
import CommonContext from './CommonContext'

const WithCommonContext = <P extends object>(Component: React.FC<P>): React.FC => props => (
  <CommonContext.Consumer>
    {context => <Component commonContext={context} {...props as P} />}
  </CommonContext.Consumer>
)
export default WithCommonContext