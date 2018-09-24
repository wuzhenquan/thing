import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <button
                    onClick={() => {
                        fetch('http://localhost:3000/users', {
                            method: 'GET',
                            credentials: 'include'
                        }).then(res => {
                            // return res.json()
                        }).then(json => {
                        })
                    }}
                > get </button>
                <button
                    onClick={() => {
                        fetch('http://localhost:3000/users/signin', {
                            method: 'POST',
                            credentials: 'include',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ "name": "wuzhenquan1", "password": "123" })
                        })
                    }}
                > post </button>
                {this.state.n}
            </div>
        );
    }
}

export default App;
