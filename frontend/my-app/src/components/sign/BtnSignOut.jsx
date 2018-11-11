import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as api from '../../api'
import { withRouter } from "react-router-dom"

class BtnSignOut extends Component {
    static propTypes = {
        children: PropTypes.string,
        history: PropTypes.object.isRequired
    }

    render() {
        const { history } = this.props
        return (
            <div onClick={ () => { api.signOut().then(() => { history.push('/public') }) } }>
                { this.props.children }
            </div>
        )
    }
}

export default withRouter(BtnSignOut)
