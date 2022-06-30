import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class IconVideoCameraMuted extends Component {
  static propTypes = {
    /** Color for the icon */
    color: PropTypes.string,
  }
  static defaultProps = {
    color: 'black',
  }

  render() {
    const { color, className } = this.props

    const wrapperStyle = Object.assign({}, this.props.style)

    return (
      <svg
        style={wrapperStyle}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="24"
        viewBox="0 0 28 24">
        <g fill={color}>
          <path
            d="M12.56,8.2l-8-8L3.26,1.6l6.8,6.8h0l4.1,4.1h0l11.3,11.3,1.4-1.4-10-10"
            transform="translate(0 -0.2)"
          />
          <path
            d="M12.54,13.39l-4.1-4.1L2,2.83A2.27,2.27,0,0,0,0,5V18.56A2.28,2.28,0,0,0,2.32,20.8h14a2.29,2.29,0,0,0,2.16-1.45Z"
            transform="translate(0 -0.2)"
          />
          <path d="M14.31,7.21l4.3,4.2.06.06V5A2.28,2.28,0,0,0,16.34,2.8H9.9Z" transform="translate(0 -0.2)" />
          <path
            d="M26.49,19.29A1.52,1.52,0,0,0,28,17.82v-12a1.56,1.56,0,0,0-2.45-1.21L20.22,8.11V13Z"
            transform="translate(0 -0.2)"
          />
        </g>
      </svg>
    )
  }
}
