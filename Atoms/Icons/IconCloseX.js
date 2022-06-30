import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class IconDeclineCall extends Component {
  static propTypes = {
    /** Color for the icon */
    color: PropTypes.string,
    /** Size for icon in pixels */
    size: PropTypes.number,
  }
  static defaultProps = {
    color: 'rgba(0,0,0,0.75)',
    size: 26,
  }

  render() {
    const { color, size, className, style } = this.props

    const wrapperStyle = Object.assign({}, style)
    const wrapperClass = className

    return (
      <svg
        style={wrapperStyle}
        className={wrapperClass}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 26 26"
        fillRule="evenodd">
        <g fill={color}>
          <polygon
            isolation="isolate"
            points="23.8 25.6 12.6 14.3 1.9 25 0.1 23.2 10.8 12.6 0 1.8 1.8 0 12.6 10.8 23.4 0 25.1 1.8 14.3 12.6 25.6 23.8 23.8 25.6"
          />
        </g>
      </svg>
    )
  }
}
