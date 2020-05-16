import React from 'react'
import * as api from '../../api'
import { withRouter } from 'react-router-dom'
import WithUserContext from '../../context/user/WithUserContext'

interface BtnSignOutProps {
  history: { push: (url: string) => void }
  userContext: { authenticate: () => void }
}

const BtnSignOut: React.FC<BtnSignOutProps> = props => {
  const {
    history: { push },
    userContext: { authenticate }
  } = props
  return (
    <div
      onClick={() => {
        api
          .signOut()
          .then(() => authenticate())
          .then(() => push('/public'))
      }}
    >
      {props.children}
    </div>
  )
}

export default withRouter(WithUserContext(BtnSignOut))
