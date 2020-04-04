import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './components/routes/Routes'
import CommonContext from './context/common/CommonContext'
import UserContext from './context/user/UserContext'
import TodoStore from './store/TodoStore'
import './App.scss'
import * as api from './api'

function App() {
  const [loading, setLoading] = useState(true)
  const [publicKey, setPublicKey] = useState('')
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => authenticate())

  const getPublicKey = () => {
    api.getPublicKey().then(data => {
      const { publicKey } = data
      setPublicKey(publicKey)
    })
  }

  const authenticate = (user = {}) => {
    if (user.id) {
      setLoading(false)
      setUserInfo(user)
    } else {
      api
        .getUserSession()
        .then(user => {
          console.info(user, 'user')
          if (user.name) {
            setLoading(false)
            setUserInfo(user)
          } else {
            setLoading(false)
            setUserInfo({})
          }
        })
        .catch(() => {
          setLoading(false)
          setUserInfo(user)
        })
    }
  }

  return (
    <Router>
      <CommonContext.Provider
        value={{
          getPublicKey,
          publicKey
        }}
      >
        <UserContext.Provider
          value={{
            name: userInfo.name || '',
            authenticate: authenticate
          }}
        >
          <TodoStore>{loading ? 'loading' : <Routes />}</TodoStore>
        </UserContext.Provider>
      </CommonContext.Provider>
    </Router>
  )
}

export default App
