import React, { Component } from 'react'
import WithTodoContext from '../context/Todo/WithTodoContext'
import TodoContext from '../context/Todo/TodoContext'
import * as api from '../api'

class TodoStore extends Component {
    state = {
        todosData: []
    }

    getTodos = () => {
        return api.getTodos().then(todosData => {
            Array.isArray(todosData) && this.setState({ todosData })
        })
    }

    addTodo = () => {
        const content = ''
        this.setState(state => {
            const todosData = [{ content }].concat(state.todosData)
            return { todosData }
        })
        return api.addTodo({ content })
    }

    editTodo = (info, index, contentValue) => {
        this.setState(state => {
            let todosData = state.todosData
            todosData[index] = info
            return { todosData }
        })
        return api.updateTodo({id: info.id, content: contentValue})
    }

    render() {
        return (
            <TodoContext.Provider
                value={{
                    todosData: this.state.todosData,
                    getTodos: this.getTodos,
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
