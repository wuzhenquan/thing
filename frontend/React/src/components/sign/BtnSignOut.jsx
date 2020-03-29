import React from 'react'
import PropTypes from 'prop-types'
import * as api from '../../api'
import { withRouter } from 'react-router-dom'
import UserContext from '../../context/user/UserContext'

function BtnSignOut(props) {
  const { history } = props
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

BtnSignOut.propTypes = {
  children: PropTypes.string,
  history: PropTypes.object.isRequired
}

export default withRouter(BtnSignOut)
