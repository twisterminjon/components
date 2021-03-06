import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class IconMicrophoneMuted extends Component {
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
        width="24"
        height="30"
        viewBox="0 0 24 30">
        <g fill={color}>
          <g>
            <path
              d="M13.16,11.66l4.3,4.2,2.22,2.21A5.57,5.57,0,0,0,20.6,15V5.62a5.69,5.69,0,0,0-11.37,0V7.73Z"
              transform="translate(-3.2)"
            />
            <path
              d="M23,21.43A10.17,10.17,0,0,0,25.33,15V12.19a.94.94,0,0,0-.94-.94h-.95a1,1,0,0,0-1,.94V15A7.39,7.39,0,0,1,21,19.42Z"
              transform="translate(-3.2)"
            />
          </g>
          <g>
            <path d="M10.66,11.86" transform="translate(-3.2)" />
            <path d="M13.39,17.41l-4.1-4.1-.06-.06V15a5.64,5.64,0,0,0,7.17,5.41Z" transform="translate(-3.2)" />
          </g>
          <path d="M12.5,12.4l-8-8L3.2,5.8,10,12.6h0l4.1,4.1h0L25.4,28l1.4-1.4-10-10" transform="translate(-3.2)" />
          <path
            d="M19.65,27.19H16.34v-2A10.32,10.32,0,0,0,19.93,24l-2.09-2.08a7.52,7.52,0,0,1-3.68.55,7.75,7.75,0,0,1-6.82-7.79V12.19a.94.94,0,0,0-1-.94H5.45a.94.94,0,0,0-1,.94v2.35a10.67,10.67,0,0,0,9,10.65v2H10.18a1,1,0,0,0-.95.93v.94a1,1,0,0,0,.95.94h9.47a1,1,0,0,0,1-.94v-.94A1,1,0,0,0,19.65,27.19Z"
            transform="translate(-3.2)"
          />
        </g>
      </svg>
    )
  }
}
