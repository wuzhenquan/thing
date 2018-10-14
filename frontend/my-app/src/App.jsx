import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import * as api from './api'
import Routes from './components/Routes/Routes'
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom'

const auth = {
    isAuthenticated: false,
    authenticate() {
        return api.auth().then((data) => {
            if (data.auth) {
                this.isAuthenticated = true;
            }
        })
    }
};

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        auth.authenticate()
    }

    render() {
        return (
            <Router>
                <div>
                    <Routes isAuthenticated={auth.isAuthenticated}/>
                </div>
            </Router>
        );
    }
}

export default App;
