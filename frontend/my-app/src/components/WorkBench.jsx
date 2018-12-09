import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './workbench.scss'

export default class WorkBench extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <div className="columns is-fullheight">
                <div className="column is-2 is-sidebar-menu is-hidden-mobile">
                    <aside className="menu">
                        <p className="menu-label">
                            todo
                        </p>
                    </aside>
                </div>
                <div className="column is-main-content">
                    Main content
                </div>
            </div>
        )
    }
}
