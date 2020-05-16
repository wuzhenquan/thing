import React from 'react'
import { Route, Link } from 'react-router-dom'
import './sidebar.scss'

interface SidebarLinkProps {
  label: string
  to: string
  activeOnlyWhenExact: boolean
}
const SidebarLink: React.FC<SidebarLinkProps> = ({ label, to, activeOnlyWhenExact }) => {
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({ match }) => (
        <Link to={to}>
          <p className={`menu-label ${match ? 'active' : ''}`}>{label}</p>
        </Link>
      )}
    />
  )
}

function Sidebar() {
  return (
    <div className="column is-2 is-sidebar-menu is-hidden-mobile">
      <aside className="menu">
        {[
          { label: 'todo', to: '/workbench/todo' },
          { label: 'okr', to: '/workbench/okr' }
        ].map(item => (
          <SidebarLink
            key={item.label}
            to={item.to}
            label={item.label}
            activeOnlyWhenExact={true}
          />
        ))}
      </aside>
    </div>
  )
}

export default Sidebar
