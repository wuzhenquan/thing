import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from './Header/Header'

export default class PublicHomePage extends Component {
  static propTypes = {
    prop: PropTypes.any
  }

  render() {
    return (
      <div>
        <Header/>
      </div>
    )
  }
}

