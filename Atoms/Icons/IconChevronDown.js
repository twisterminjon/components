import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class IconChevronDown extends Component {
  static propTypes = {
    /** Color for the icon */
    color: PropTypes.string,
  }
  static defaultProps = {
    color: 'black',
  }

  render() {
    const { color } = this.props

    const wrapperStyle = Object.assign({}, this.props.style)

    return (
      <svg style={wrapperStyle} xmlns="http://www.w3.org/2000/svg" width="22" height="13" viewBox="0 0 22 13">
        <g fill={color}>
          <path
            fillRule="evenodd"
            d="M11.696 11.958a.975.975 0 0 1-1.392 0L1.167 2.713a1.456 1.456 0 0 1 0-2.041 1.415 1.415 0 0 1 2.016 0L11 8.581 18.815.672a1.417 1.417 0 0 1 2.017 0 1.456 1.456 0 0 1 0 2.04l-9.136 9.246z"
          />
        </g>
      </svg>
    )
  }
}
