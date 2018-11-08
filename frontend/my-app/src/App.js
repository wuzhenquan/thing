import React, { Component } from 'react'
import './App.scss'
import * as api from './api'
import Routes from './components/routes/Routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { CommonContext } from './CommonContext'


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            isSignedIn: false
        }
    }

    componentDidMount() {
        api.auth().then((data) => {
            // 问题记录：为什如果在这一行添加一个 this.setState({ loading: false }) 会多 render 一次
            // 为什么不是合起来
            if (data.auth) {
                this.setState({ loading: false, isSignedIn: true })
            } else {
                this.setState({ loading: false })
            }
        })
    }

    render() {
        return (
            <Router>
                <CommonContext.Provider value={{ isSignedIn: this.state.isSignedIn }}>
                    <div>
                        {this.state.loading
                            ?
                            'loading'
                            :
                            <Routes isSignedIn={this.state.isSignedIn} />
                        }
                    </div>
                </CommonContext.Provider>
            </Router>
        );
    }
}

export default App;
