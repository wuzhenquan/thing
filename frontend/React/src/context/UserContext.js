import React from '../../node_modules/react'

// create context with default values
// default values is only used when a component does not have a matching Provider above in the tree
export default React.createContext({
    name: '',
    authenticate: () => {}
})
