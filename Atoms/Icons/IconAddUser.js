import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class IconAddUser extends Component {
  static propTypes = {
    /** Color for the icon */
    color: PropTypes.string,
  }
  static defaultProps = {
    color: 'black',
    size: 34,
    className: '',
    style: {},
  }

  render() {
    const { color, size, className, style } = this.props

    const wrapperStyle = Object.assign({}, style)
    const viewBox = `0 0 ${size} ${size}`
    return (
      <svg
        style={wrapperStyle}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox={viewBox}>
        <g fill={color} fillRule="evenodd">
          <circle cx="17" cy="17" r="17" />
          <path
            fill="#111"
            d="M13.083 18.076c.734.213 1.429.39 2.2.39a6.45 6.45 0 0 0 1.269-.125 8.067 8.067 0 0 0 7.298 6.984c-.063.867-.728 1.562-1.561 1.636l-.149.007H8.41c-.9 0-1.639-.72-1.71-1.633l-.006-.146.003-2.025c0-2.646 1.858-4.82 4.294-5.245.654-.11 1.351-.057 2.092.157zm11.465-7.237a6.452 6.452 0 1 1 0 12.903 6.452 6.452 0 0 1 0-12.903zm.613 1.613h-1.226a1 1 0 0 0-.993.883l-.007.117v2.225h-2.226a1 1 0 0 0-.993.884l-.007.116v1.226a1 1 0 0 0 .884.993l.116.007h2.225l.001 2.226a1 1 0 0 0 .884.993l.116.007h1.226a1 1 0 0 0 .993-.883l.007-.117v-2.226h2.226a1 1 0 0 0 .993-.883l.007-.117v-1.226a1 1 0 0 0-.884-.993l-.116-.007H26.16l.001-2.225a1 1 0 0 0-1-1zM15.278 6c2.482 0 4.533 1.975 4.858 4.54a8.058 8.058 0 0 0-3.596 5.795 4.557 4.557 0 0 1-1.262.177c-2.708 0-4.903-2.352-4.903-5.256C10.375 8.352 12.57 6 15.278 6z"
          />
        </g>
      </svg>
    )
  }
}
