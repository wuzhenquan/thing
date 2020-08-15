import React, { useState, useCallback } from 'react'
import TodoContext from '../context/Todo/TodoContext'
import * as api from '../api'

// TODO dup
interface TodoInfo {
  id: number
  content: string
}
// TODO dup
interface AddTodoFunc {
  (): Promise<any>
}
interface GetTodosFunc {
  (): Promise<any>
}
// TODO dup
interface EditTodoFunc {
  (info: TodoInfo, editingIndex: number, contentValue: string): Promise<any>
}
// TODO dup
interface DeleteTodoFunc {
  (id: number, deletingIndex: number): Promise<any>
}

const TodoStore: React.FC = props => {
  const [todosData, setTodosData] = useState<TodoInfo[]>([])

  const getTodos: GetTodosFunc = useCallback(async () => {
    const todosData = await api.getTodos()
    Array.isArray(todosData) && setTodosData(todosData)
    return todosData
  }, [])

  const addTodo: AddTodoFunc = async () => {
    const content = ''
    const todoInfo = await api.addTodo({ content })
    setTodosData([todoInfo].concat(todosData))
    return todoInfo
  }

  const editTodo: EditTodoFunc = (info, editingIndex, contentValue) => {
    setTodosData(todosData.map((todo, index) => (index === editingIndex ? info : todo)))
    return api.updateTodo({ id: info.id, content: contentValue })
  }

  const deleteTodo: DeleteTodoFunc = (id, deletingIndex) => {
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

export default TodoStore
