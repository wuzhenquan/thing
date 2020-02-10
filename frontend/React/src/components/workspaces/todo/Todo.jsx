import React, { Component } from 'react'
import Icon from '../../icons/Icon'
import TodoItem from './TodoItem'
import WithTodoContext from '../../../context/Todo/WithTodoContext'
import './todo.scss'

class Todo extends Component {
  constructor(props) {
    super(props)
    this.textareaRef = React.createRef()
  }

  state = {
    focusTodoId: 0
  }

  componentDidMount() {
    const { getTodos } = this.props.todoContext
    getTodos()
  }

  addTodo = () => {
    const { addTodo } = this.props.todoContext
    // 或者用 async await ？
    addTodo()
      .then(id => this.changeFocusId(id))
      .catch(() => {
        /* error message for failed added */
      })
  }

  editTodo = (info, index, contentValue) => {
    const { editTodo } = this.props.todoContext
    editTodo(info, index, contentValue).then(() => this.changeFocusId(0))
  }

  deleteTodo = (id, index) => {
    const { deleteTodo } = this.props.todoContext
    deleteTodo(id, index)
  }

  changeFocusId = todoId => {
    this.setState({ focusTodoId: todoId || 0 })
  }

  render() {
    const { todoContext } = this.props
    const { todosData } = todoContext
    return (
      <div className="todo-content">
        <span className="pointer" onClick={this.addTodo}>
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
          const focusing = todoId === this.state.focusTodoId
          const textareaRef = focusing ? this.textareaRef : Object.create(null)
          return (
            <TodoItem
              key={todoId}
              id={todoId}
              index={index}
              info={item}
              changeFocusId={this.changeFocusId}
              focusing={focusing}
              textareaRef={textareaRef}
              editTodo={this.editTodo}
              deleteTodo={this.deleteTodo}
            />
          )
        })}
      </div>
    )
  }
}

export default WithTodoContext(Todo)
