import React, { useState, useEffect, useCallback } from 'react'
import Icon from '../../icons/Icon'
import TodoItem from './TodoItem'
import WithTodoContext from '../../../context/Todo/WithTodoContext'
import './todo.scss'

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

interface TodoProps {
  todoContext: {
    addTodo: AddTodoFunc
    getTodos: GetTodosFunc
    editTodo: EditTodoFunc
    deleteTodo: DeleteTodoFunc
    todosData: TodoInfo[]
  }
}

const Todo: React.FC<TodoProps> = props => {
  const {
    todoContext: { getTodos, todosData }
  } = props
  const [focusTodoId, setFocusTodoId] = useState(0)

  const fetchTodos = useCallback(() => getTodos(), [getTodos])

  useEffect(() => { fetchTodos() }, [fetchTodos]) // how to fix this line?

  const addTodo = () => {
    const {
      todoContext: { addTodo }
    } = props
    addTodo()
      .then(data => changeFocusId(data.id))
      .catch(() => {
        /* error message for failed added */
      })
  }

  const editTodo: EditTodoFunc = (info, index, contentValue) => {
    const {
      todoContext: { editTodo }
    } = props
    return editTodo(info, index, contentValue).then(() => changeFocusId(0))
  }

  const deleteTodo: DeleteTodoFunc = (id, index) => {
    const {
      todoContext: { deleteTodo }
    } = props
    return deleteTodo(id, index)
  }

  const changeFocusId = (todoId: number) => {
    setFocusTodoId(todoId || 0)
  }

  return (
    <div className="todo-content">
      <span className="pointer" onClick={addTodo}>
        <Icon name="plus" />
        Add todo
      </span>
      {/* not align center in this annotation https://zhuanlan.zhihu.com/p/28626505
            <span className="pointer" onClick={ () => { } }>
                <Icon name='radioBoxBlank' />
            </span>
            <textarea />
            <input/> */}
      {todosData.map((item, index) => {
        const todoId = item.id
        const focusing = todoId === focusTodoId
        return (
          <TodoItem
            key={todoId}
            index={index}
            info={item}
            changeFocusId={changeFocusId}
            focusing={focusing}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
          />
        )
      })}
    </div>
  )
}

export default WithTodoContext(Todo)
