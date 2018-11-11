import React, { Component } from 'react'
import './App.scss'
import * as api from './api'
import Routes from './components/routes/Routes'
import { BrowserRouter as Router } from 'react-router-dom'
import UserContext from './context/UserContext'


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            userInfo: {}
        }
    }

    componentDidMount() {
        api.auth().then((user) => {
            // 问题记录：为什如果在这一行添加一个 this.setState({ loading: false }) 会多 render 一次
            // 为什么不是合起来
            if (user.name) {
                this.setState({ loading: false, userInfo: user })
            } else {
                this.setState({ loading: false })
            }
        })
    }

    render() {
        return (
            <Router>
                <UserContext.Provider value={ this.state.userInfo }>
                    <div>
                        { this.state.loading
                            ?
                            'loading'
                            :
                            <Routes />
                        }
                    </div>
                </UserContext.Provider>
            </Router>
        );
    }
}

export default App;
