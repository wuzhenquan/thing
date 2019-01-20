import React, { Component } from 'react'
import Icon from '../../icons/Icon'
import TodoItem from './TodoItem'

class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todoArr: [],
            focusTodoId: 0
        }
        this.textareaRef = React.createRef();
    }

    addTodo() {
        const todoArr = this.state.todoArr
        const order = todoArr.length + 1
        const id = order
        const content = ''
        this.changeFocusId(id)
        this.setState((state) => {
            const todoArr = [{ id, content, order }].concat(state.todoArr)
            return { todoArr }
        }, () => {
            // next add request todo api
            // only request successful, then we can add next
        })
    }

    editTodo = (info, index) => {
        this.setState((state) => {
            let todoArr = state.todoArr
            todoArr[index] = info
            return { todoArr }
        })
        this.changeFocusId(0)
    }

    changeFocusId = (todoId) => {
        this.setState({ focusTodoId: todoId || 0 })
    }

    render() {
        return (
            <div>
                <div>
                    <span className="pointer" onClick={ () => { this.addTodo() } }>
                        <Icon name='plus' />
                        Add todo
                </span>
                </div>
                <div>
                    {/* not align center in this annotation https://zhuanlan.zhihu.com/p/28626505 
                <span className="pointer" onClick={ () => { } }>
                    <Icon name='radioBoxBlank' />
                </span>
                <textarea />
                <input/> */}
                    { this.state.todoArr.map((item, index) => {
                        const todoId = item.id
                        const focusing = todoId === this.state.focusTodoId
                        const textareaRef = focusing ? this.textareaRef : Object.create(null)
                        return (
                            <TodoItem
                                key={ todoId }
                                id={ todoId }
                                index={ index }
                                info={ item }
                                changeFocusId={ this.changeFocusId }
                                focusing={ focusing }
                                textareaRef={ textareaRef }
                                editTodo={ this.editTodo }
                            />
                        )
                    }) }
                </div>
            </div>
        );
    }
}

export default Todo
