import React, { Component } from 'react'
import './App.sass'
import * as api from './api'
import Routes from './components/Routes/Routes'
import { BrowserRouter as Router } from 'react-router-dom'

const auth = {
    isSignedIn: false,
    authenticate() {
        return api.auth().then((data) => {
            if (data.auth) {
                this.isSignedIn = true;
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
                    <Routes isSignedIn={auth.isSignedIn}/>
                </div>
            </Router>
        );
    }
}

export default App;
