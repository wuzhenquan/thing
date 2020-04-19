import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Icon from '../../icons/Icon'

function TodoItem(props) {
  const [content, setContent] = useState(props.info.content)
  const { focusing, index, info, changeFocusId, editTodo, deleteTodo } = props
  const textareaRef = useRef()
  useEffect(() => {
    if (focusing) focus(textareaRef)
  }, [focusing])

  const focus = () => {
    textareaRef.current.focus()
  }
  return (
    <div
      className="todo-item"
      onClick={() => {
        changeFocusId(info.id)
      }}
    >
      <span className="pointer" onClick={() => {}}>
        <Icon name="radioBoxBlank" />
      </span>
      <input
        rows="1"
        ref={textareaRef}
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

TodoItem.propTypes = {
  index: PropTypes.number.isRequired,
  info: PropTypes.object.isRequired,
  changeFocusId: PropTypes.func.isRequired,
  focusing: PropTypes.bool.isRequired,
  editTodo: PropTypes.func.isRequired
}

export default TodoItem
