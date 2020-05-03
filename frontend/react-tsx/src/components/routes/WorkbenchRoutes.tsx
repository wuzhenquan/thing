import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import { Route } from 'react-router-dom'
import Todo from '../workspaces/todo/Todo'
import Developing from '../workspaces/Developing'
import './workbench.scss'

function WorkbenchRoutes() {
  return (
    <div className="columns is-fullheight">
      <Sidebar />
      <div className="column is-main-content">
        <Route path="/workbench/todo" component={Todo} />
        <Route path="/workbench/okr" component={Developing} />
      </div>
    </div>
  )
}

export default WorkbenchRoutes
