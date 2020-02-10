import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as api from '../../api'
import { withRouter } from 'react-router-dom'
import UserContext from '../../context/UserContext'

class BtnSignOut extends Component {
  static propTypes = {
    children: PropTypes.string,
    history: PropTypes.object.isRequired
  }

  render() {
    const { history } = this.props
    return (
      <UserContext.Consumer>
        {({ authenticate }) => (
          <div
            onClick={() => {
              api
                .signOut()
                .then(() => authenticate())
                .then(() => {
                  history.push('/public')
                })
            }}
          >
            {this.props.children}
          </div>
        )}
      </UserContext.Consumer>
    )
  }
}

export default withRouter(BtnSignOut)
