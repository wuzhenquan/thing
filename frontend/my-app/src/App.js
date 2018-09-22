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
                        fetch('http://localhost:3000/', {
                            method: 'GET',
                            credentials: 'include'
                        }).then(res => {
                            return res.json()
                        }).then(json=>{
                        })
                    }}
                > get </button>
                <button
                    onClick={() => {
                        fetch('http://localhost:3000/', {
                            method: 'POST',
                            credentials: 'include',
                            body: '{"name": "wuzhenquan1", password: "123"}'
                        })
                    }}
                > post </button>
                {this.state.n}
            </div>
        );
    }
}

export default App;
