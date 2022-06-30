import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class IconChevronLeft extends Component {
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
      <svg style={wrapperStyle} xmlns="http://www.w3.org/2000/svg" width="21" height="13" viewBox="0 0 21 13">
        <g fill={color}>
          <path
            fillRule="evenodd"
            d="M9.554.792a.975.975 0 0 1 1.392 0l9.137 9.245a1.456 1.456 0 0 1 0 2.04 1.415 1.415 0 0 1-2.016 0L10.25 4.17l-7.816 7.909a1.417 1.417 0 0 1-2.017 0 1.456 1.456 0 0 1 0-2.04L9.554.791z"
          />
        </g>
      </svg>
    )
  }
}
