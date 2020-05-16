import React, { useState, useEffect, useRef } from 'react'
import Icon from '../../icons/Icon'

// TODO dup
interface TodoInfo {
  id: number
  content: string
}
// TODO dup
interface EditTodoFunc {
  (info: TodoInfo, editingIndex: number, contentValue: string): Promise<any>
}
// TODO dup
interface DeleteTodoFunc {
  (id: number, deletingIndex: number): Promise<any>
}
interface TodoItemProps {
  focusing: boolean
  index: number
  info: TodoInfo
  changeFocusId: (id: number) => void
  editTodo: EditTodoFunc
  deleteTodo: DeleteTodoFunc
}

const TodoItem: React.FC<TodoItemProps> = (props) => {
  const [content, setContent] = useState(props.info.content)
  const { focusing, index, info, changeFocusId, editTodo, deleteTodo } = props
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (focusing) focus()
  }, [focusing])

  const focus = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div
      className="todo-item"
      onClick={() => {
        changeFocusId(info.id)
      }}
    >
      <span className="pointer" onClick={() => { }}>
        <Icon name="radioBoxBlank" />
      </span>
      <input
        ref={inputRef}
        value={content}
        onChange={e => setContent(e.target.value)}
        onBlur={e => editTodo(info, index, e.target.value)}
      />
      {/* <span className={ focusing ? 'hide' : '' }>{content}</span> */}
      <span className="pointer buttons-right" onClick={() => deleteTodo(info.id, index)}>
        <Icon name="delete" />
      </span>
    </div>
  )
}

export default TodoItem
