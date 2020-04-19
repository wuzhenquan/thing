import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Icon from '../../icons/Icon'
import TodoItem from './TodoItem'
import WithTodoContext from '../../../context/Todo/WithTodoContext'
import './todo.scss'

function Todo(props) {
  const {
    todoContext: { getTodos, todosData }
  } = props
  const [focusTodoId, setFocusTodoId] = useState(0)
  useEffect(getTodos, [])

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

  const editTodo = (info, index, contentValue) => {
    const {
      todoContext: { editTodo }
    } = props
    editTodo(info, index, contentValue).then(() => changeFocusId(0))
  }

  const deleteTodo = (id, index) => {
    const {
      todoContext: { deleteTodo }
    } = props
    deleteTodo(id, index)
  }

  const changeFocusId = todoId => {
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
            id={todoId}
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

Todo.propTypes = {
  todoContext: PropTypes.object.isRequired
}

export default WithTodoContext(Todo)
