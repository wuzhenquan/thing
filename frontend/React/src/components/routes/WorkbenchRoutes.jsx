import React, { Component } from 'react'
import Sidebar from '../sidebar/Sidebar'
import { Route } from 'react-router-dom'
import Todo from '../workspaces/todo/Todo'
import Developing from '../workspaces/Developing'
import './workbench.scss'

export default class WorkbenchRoutes extends Component {
    render() {
        return (
            <div className="columns is-fullheight">
                <Sidebar />
                <div className="column is-main-content">
                    <Route path="/workbench/todo" component={ Todo } />
                    <Route path="/workbench/okr" component={ Developing } />
                </div>
            </div>
        )
    }
}
