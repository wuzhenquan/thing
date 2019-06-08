import React, { Component } from 'react'
import WithTodoContext from '../context/Todo/WithTodoContext'
import TodoContext from '../context/Todo/TodoContext'
import * as api from '../api'

class TodoStore extends Component {
    state = {
        todosData: [],
    }

    addTodo = () => {
        const todosData = this.state.todosData
        const order = todosData.length + 1
        const id = order
        const content = ''
        this.setState(state => {
            const todosData = [{ id, content, order }].concat(state.todosData)
            return { todosData }
        })
        return api.addTodo({ id, content, order })
    }

    editTodo = (info, index) => {
        this.setState(state => {
            let todosData = state.todosData
            todosData[index] = info
            return { todosData }
        })
        return new Promise((resolve)=> resolve())
    }

    render() {
        return (
            <TodoContext.Provider
                value={{
                    todosData: this.state.todosData,
                    addTodo: this.addTodo,
                    editTodo: this.editTodo
                }}
            >
                {this.props.children}
            </TodoContext.Provider>
        )
    }
}

export default WithTodoContext(TodoStore)
