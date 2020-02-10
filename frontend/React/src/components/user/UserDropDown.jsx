import React, { Component } from 'react'
import Icon from '../icons/Icon'
import BtnSignOut from '../sign/BtnSignOut'

export default class UserDropDown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: false
    }
  }

  render() {
    return (
      <div className={`dropdown is-right ${this.state.isActive ? 'is-active' : ''}`}>
        <div
          className="dropdown-trigger"
          onClick={() => {
            this.setState(state => ({ isActive: !state.isActive }))
          }}
        >
          <Icon name="account" size={0.9} />
        </div>
        <div className="dropdown-menu" id="dropdown-menu4" role="menu">
          <div className="dropdown-content">
            <div className="dropdown-item">
              <BtnSignOut>sign out</BtnSignOut>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
