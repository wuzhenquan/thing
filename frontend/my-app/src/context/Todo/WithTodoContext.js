import React from 'react'
import TodoContext from './TodoContext'
export default Component => props => (
    <TodoContext.Consumer>
        {context => <Component todoContext={context} {...props}/>}
    </TodoContext.Consumer>
)
