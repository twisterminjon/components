import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class IconMessage extends Component {
  static propTypes = {
    /** Size for the icon in pixels */
    size: PropTypes.number,
    /** Color for the icon */
    color: PropTypes.string,
    /** ClassName for the wrapper */
    className: PropTypes.string,
    /** Style for the wrapper */
    style: PropTypes.object,
  }
  static defaultProps = {
    size: 29,
    color: 'black',
    className: '',
  }

  render() {
    const { size, color, className, style } = this.props

    const wrapperStyle = Object.assign({}, style)

    return (
      <svg
        style={wrapperStyle}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 19"
        fillRule="evenodd">
        <g fill={color}>
          <path
            d="M12,3.05c3.08,0,6.17-.11,9.24.06.89.06,2.28.78,2.46,1.46a3.43,3.43,0,0,1-.94,2.93C19.92,9.83,16.9,11.91,14,14.09a2.94,2.94,0,0,1-3.89,0c-3-2.24-6.07-4.38-9-6.75A3.16,3.16,0,0,1,.3,4.61,2.91,2.91,0,0,1,2.5,3.12C5.65,3,8.82,3.05,12,3.05Z"
            transform="translate(0 -3.01)"
          />
          <path
            d="M15.7,14.79C14,16,13,16.56,12,16.56S10,16,8.3,14.79C5.67,12.93,3,11.21,0,9c0,4,0,6,0,9.13C.06,20,.79,21,2.68,21L12,21l9.32,0c1.89,0,2.62-1,2.64-2.84C24,15,24,13,24,9,21,11.21,18.33,12.93,15.7,14.79Z"
            transform="translate(0 -3.01)"
          />
        </g>
      </svg>
    )
  }
}
