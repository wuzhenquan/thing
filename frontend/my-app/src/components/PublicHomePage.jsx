import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class PublicHomePage extends Component {
  static propTypes = {
    prop: PropTypes.any
  }

  render() {
    return (
      <div>
        home page
      </div>
    )
  }
}

