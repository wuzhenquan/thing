import React from 'react'
import CommonContext from './CommonContext'
export default Component => props => (
  <CommonContext.Consumer>
    {context => <Component commonContext={context} {...props} />}
  </CommonContext.Consumer>
)
