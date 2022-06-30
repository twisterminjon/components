import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './SpinnerDots.css'

export default class SpinnerDots extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
  }
  static defaultProps = {
    style: {},
    className: '',
  }

  render() {
    const { style, className } = this.props

    return (
      <div className={`spinnerdots ${className}`} style={style}>
        <div className="spinnerdots-bounce1" />
        <div className="spinnerdots-bounce2" />
        <div className="spinnerdots-bounce3" />
      </div>
    )
  }
}
