import React from 'react'

// if your don't pass one, then value will just be undefined
export default React.createContext({
  todosData: [],
  getTodos: () => {},
  addTodo: () => {},
  editTodo: () => {},
  deleteTodo: () => {}
})
