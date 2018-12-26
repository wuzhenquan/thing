import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from '../../icons/Icon'

function Todo() {
    return (
        <div>
            <div>
                <span className="pointer" onClick={ () => { } }>
                    <Icon name='plus' />
                    Add todo
                </span>
            </div>
            <div>
                <span className="pointer" onClick={ () => { } }>
                    <Icon name='radioBoxBlank' />
                </span>
                <input />
            </div>
        </div>
    )
}

export default Todo
