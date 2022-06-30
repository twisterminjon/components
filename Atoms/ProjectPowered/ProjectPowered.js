import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ProjectPowered extends Component {
  static propTypes = {
    /** Color for the logo */
    logoColor: PropTypes.string,
    /** Color for the tagline */
    taglineColor: PropTypes.string,
  }
  static defaultProps = {
    logoColor: '#fff',
    taglineColor: '#9c9c9c',
  }

  render() {
    const { logoColor, taglineColor, ...rest } = this.props
    return (
      <svg width="80" height="60" viewBox="0 0 1000 284.05" {...rest}>
        {/*
          TODO: ADD logo
        */}
      </svg>
    )
  }
}
