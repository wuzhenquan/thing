import React, { useState } from 'react'
import Icon from '../icons/Icon'
import BtnSignOut from '../sign/BtnSignOut'

export default function UserDropDown() {
  const [isActive, setIsActive] = useState(false)
  return (
    <div className={`dropdown is-right ${isActive ? 'is-active' : ''}`}>
      <div
        className="dropdown-trigger"
        onClick={() => {
          setIsActive(!isActive)
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
