import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class IconDeclineCall extends Component {
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
        height="29"
        viewBox="0 0 37 25"
        fillRule="evenodd">
        <g fill={color}>
          <path d="M8.3,10.5c-4.4,1.3-5.8,2.3-6.9,3.4C0.2,15,0,15.8,0.1,16.3c0.1,0.4,0.9,4,0.9,4s0.7,0.8,1.8,0.6c1.2-0.2,4.9-1.1,5.7-1.3 c0.8-0.2,2-0.2,2.3-2.1c0-0.4,0.2-2.2,1.1-2.9c0.4-0.3,1.4-0.5,2.5-0.6L10.5,10C9.8,10.1,9,10.3,8.3,10.5z" />
          <path d="M35.8,14.1c-1.2-1.2-3.4-2.5-6.7-3.4c-3.8-1.1-8.2-1.4-10.6-1.4c-0.8,0-1.8,0-3,0.1l-8-8L6.2,2.8l6.8,6.8c0,0,0,0,0,0 l4.1,4.1c0,0,0,0,0,0L28.4,25l1.4-1.4l-10-10c1.9,0.1,5,0.2,5.6,0.9c0.9,0.9,0.7,1.3,0.9,2.6c0.1,0.7-0.1,2.2,2.4,2.6 c1.7,0.3,4.3,0.9,5.6,1.1s1.9-0.9,2-1.3c0.1-0.4,0.6-2.5,0.6-3.1C37,15.9,37,15.2,35.8,14.1z" />
        </g>
      </svg>
    )
  }
}
