import React from 'react'
import PropTypes from 'prop-types'
import * as api from '../../api'
import { withRouter } from 'react-router-dom'
import WithUserContext from '../../context/user/WithUserContext'

function BtnSignOut(props) {
  const {
    history,
    userContext: { authenticate }
  } = props
  return (
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
      {props.children}
    </div>
  )
}

BtnSignOut.propTypes = {
  children: PropTypes.string,
  history: PropTypes.object.isRequired
}

export default withRouter(WithUserContext(BtnSignOut))
