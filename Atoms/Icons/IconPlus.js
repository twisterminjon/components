import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class IconPlus extends Component {
  static propTypes = {
    /** Color for the icon */
    color: PropTypes.string,
    /** Size for icon in pixels */
    size: PropTypes.number,
    /** ClassName for the wrapper */
    className: PropTypes.string,
    /** Style for the wrapper */
    style: PropTypes.object,
  }
  static defaultProps = {
    color: 'black',
    size: 25,
    className: '',
    style: {},
  }

  render() {
    const { color, size, className, style } = this.props

    const wrapperStyle = Object.assign({}, style)

    return (
      <svg
        style={wrapperStyle}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 25 25"
        fillRule="evenodd">
        <g fill={color}>
          <path
            d="M88,593.160714 L88,595.839286 C88,596.575893 87.3973214,597.178571 86.6607143,597.178571 L78.1785714,597.178571 L78.1785714,605.660714 C78.1785714,606.397321 77.5758929,607 76.8392857,607 L74.1607143,607 C73.4241071,607 72.8214286,606.397321 72.8214286,605.660714 L72.8214286,597.178571 L64.3392857,597.178571 C63.6026786,597.178571 63,596.575893 63,595.839286 L63,593.160714 C63,592.424107 63.6026786,591.821429 64.3392857,591.821429 L72.8214286,591.821429 L72.8214286,583.339286 C72.8214286,582.602679 73.4241071,582 74.1607143,582 L76.8392857,582 C77.5758929,582 78.1785714,582.602679 78.1785714,583.339286 L78.1785714,591.821429 L86.6607143,591.821429 C87.3973214,591.821429 88,592.424107 88,593.160714 Z"
            transform="translate(-63 -582)"
          />
        </g>
      </svg>
    )
  }
}
