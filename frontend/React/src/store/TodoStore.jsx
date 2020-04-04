import React, { useState } from 'react'
import WithTodoContext from '../context/Todo/WithTodoContext'
import TodoContext from '../context/Todo/TodoContext'
import * as api from '../api'

function TodoStore(props) {
  const [todosData, setTodosData] = useState([])
  const getTodos = () => {
    return api.getTodos().then(todosData => {
      Array.isArray(todosData) && setTodosData(todosData)
    })
  }

  const addTodo = async () => {
    const content = ''
    const todoInfo = await api.addTodo({ content })
    setTodosData([todoInfo].concat(todosData))
    return todoInfo
  }

  const editTodo = (info, editingIndex, contentValue) => {
    setTodosData(todosData.map((todo, index) => (index === editingIndex ? info : todo)))
    return api.updateTodo({ id: info.id, content: contentValue })
  }

  const deleteTodo = (id, deletingIndex) => {
    setTodosData(todosData.filter((todo, index) => index !== deletingIndex))
    return api.deleteTodo(id)
  }

  return (
    <TodoContext.Provider
      value={{
        todosData,
        getTodos,
        addTodo,
        editTodo,
        deleteTodo
      }}
    >
      {props.children}
    </TodoContext.Provider>
  )
}

export default WithTodoContext(TodoStore)
