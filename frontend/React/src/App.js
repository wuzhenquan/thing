import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './components/routes/Routes'
import CommonContext from './context/common/CommonContext'
import UserContext from './context/UserContext'
import TodoStore from './store/TodoStore'
import './App.scss'
import * as api from './api'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      publicKey: '',
      userInfo: {}
    }
  }

  componentDidMount() {
    this.authenticate()
  }

  getPublicKey = () => {
    api.getPublicKey().then(data => {
      const { publicKey } = data
      this.setState({ publicKey })
    })
  }

  authenticate = (user = {}) => {
    if (user.id) {
      this.setState({ loading: false, userInfo: user })
    } else {
      api.auth().then(user => {
        console.info(user, 'user')
        // 问题记录：为什如果在这一行添加一个 this.setState({ loading: false }) 会多 render 一次
        // 为什么不是合起来
        if (user.name) {
          this.setState({ loading: false, userInfo: user })
        } else {
          this.setState({ loading: false, userInfo: {} })
        }
      })
    }
  }

  render() {
    return (
      <Router>
        <CommonContext.Provider
          value={{
            getPublicKey: this.getPublicKey,
            publicKey: this.state.publicKey
          }}
        >
          <UserContext.Provider
            value={{
              ...this.state.userInfo,
              authenticate: this.authenticate
            }}
          >
            <TodoStore>{this.state.loading ? 'loading' : <Routes />}</TodoStore>
          </UserContext.Provider>
        </CommonContext.Provider>
      </Router>
    )
  }
}

export default App
