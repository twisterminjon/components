import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class IconCommentSlash extends Component {
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
        viewBox="0 0 25 20"
        fillRule="evenodd">
        <g fill={color}>
          <path d="M2.499 9.377c0 1.938.836 3.712 2.226 5.107-.492 1.965-2.12 3.72-2.14 3.743-.086.09-.11.223-.059.34.051.113.16.188.285.188 2.59 0 4.532-1.243 5.492-2.009 1.278.48 2.696.758 4.196.758 1.07 0 2.097-.14 3.062-.39L2.846 7.282C2.628 7.951 2.5 8.65 2.5 9.377zm22.258 8.522l-4.47-3.454c1.376-1.391 2.212-3.146 2.212-5.068 0-4.49-4.477-8.128-10-8.128-2.543 0-4.852.786-6.617 2.06L1.776.131c-.273-.211-.664-.164-.879.11l-.765.984c-.211.273-.164.664.109.875l22.984 17.767c.274.211.664.164.88-.11l.765-.988c.21-.265.16-.66-.113-.871z" />
          />
        </g>
      </svg>
    )
  }
}
