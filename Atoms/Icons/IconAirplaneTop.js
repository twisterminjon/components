import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class IconAirplaneTop extends Component {
  static propTypes = {
    /** Color for the icon */
    color: PropTypes.string,
    /** Size in pixels for the icon */
    size: PropTypes.number,
  }
  static defaultProps = {
    color: 'black',
    size: 29,
  }

  render() {
    const { color, size } = this.props

    const wrapperStyle = Object.assign({}, this.props.style)

    return (
      <svg
        style={wrapperStyle}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 22"
        fillRule="evenodd">
        <g fill={color}>
          <path
            d="M0,21.79V13.47c0-.66.39-1.21.86-1.21H24v.05L1.13,22.94C.58,23.2,0,22.62,0,21.79Z"
            transform="translate(0 -1.06)"
          />
          <path
            d="M0,2.15V9.59a1,1,0,0,0,.86,1.07H24v0L1.13,1.12C.58.89,0,1.41,0,2.15Z"
            transform="translate(0 -1.06)"
          />
        </g>
      </svg>
    )
  }
}
