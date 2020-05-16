import React from 'react'
import TodoContext from './TodoContext'

const WithTodoContext = <P extends object>(Component: React.FC<P>): React.FC => props => (
  <TodoContext.Consumer>
    {context => <Component todoContext={context} {...props as P} />}
  </TodoContext.Consumer>
)
export default WithTodoContext
