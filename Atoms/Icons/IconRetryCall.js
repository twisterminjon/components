import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class IconRetryCall extends Component {
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
      <svg
        style={wrapperStyle}
        xmlns="http://www.w3.org/2000/svg"
        width="29"
        height="26"
        viewBox="0 0 29 26"
        fillRule="evenodd">
        <g fill={color}>
          <path
            d="M9.08,9.48A8.53,8.53,0,0,1,7.84,5.63c0-.89.22-1.15.44-1.35s1.22-.83,1.39-.94a.9.9,0,0,1,1.23.25c.41.58,1.18,1.77,1.71,2.55.83,1.11.17,1.6,0,1.89-.4.54-.62.67-.62,1.33s1.84,2.54,2.28,3a11.2,11.2,0,0,0,2.85,2.15c.57.09,1.34-.52,1.5-.67.83-.64,1.3-.15,1.68.06s2.12,1.28,2.65,1.65a1.1,1.1,0,0,1,.47.92l-1.16,1.85c-.16.23-.54.43-1.39.43s-1.76-.16-3.92-1.35A20.63,20.63,0,0,1,12.58,14,21.26,21.26,0,0,1,9.08,9.48Z"
            transform="translate(0 -1.7)"
          />
          <path
            d="M16.2,1.7V5A9.5,9.5,0,1,1,6.84,16.1H10.1l-5-8.75L0,16.09H3.5A12.8,12.8,0,1,0,16.2,1.7Z"
            transform="translate(0 -1.7)"
          />
        </g>
      </svg>
    )
  }
}
