import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as api from '../../api'
import { withRouter } from "react-router-dom"
import { CommonContext } from '../../CommonContext.js'

class BtnSignOut extends Component {
    static propTypes = {
        children: PropTypes.string,
        history: PropTypes.object.isRequired,
    }

    render() {
        const { history } = this.props
        console.log(this.context,'this.context')
        return (
            <div onClick={ () => { api.signOut().then(() => { history.push('/public')}) } }>
                { this.props.children }
            </div>
        )
    }
}

BtnSignOut.contextType  = CommonContext

export default withRouter(BtnSignOut)
