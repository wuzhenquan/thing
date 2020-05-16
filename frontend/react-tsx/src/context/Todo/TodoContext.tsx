import React from 'react'

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

interface TodoContextType {
  todosData: TodoInfo[]
  addTodo: AddTodoFunc
  getTodos: GetTodosFunc
  editTodo: EditTodoFunc
  deleteTodo: DeleteTodoFunc
};

// if your don't pass one, then value will just be undefined
export default React.createContext<TodoContextType | undefined>(undefined)
