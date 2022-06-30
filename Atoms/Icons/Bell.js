import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Bell extends Component {
  static propTypes = {
    /** Color for the icon */
    color: PropTypes.string,
    /** ClassName for the wrapper */
    className: PropTypes.string,
    /** Style for the wrapper */
    style: PropTypes.object,
  }
  static defaultProps = {
    color: 'black',
    className: '',
  }

  render() {
    const { color, className, style } = this.props

    const wrapperStyle = Object.assign({}, style)

    return (
      <svg
        style={wrapperStyle}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width={22}
        height={25}
        viewBox="0 0 22 25"
        fillRule="evenodd">
        <g fill={color}>
          <path
            fill="#FFF"
            fillRule="evenodd"
            d="M10.937 25c1.725 0 3.124-1.399 3.124-3.125H7.814c0 1.726 1.399 3.125 3.123 3.125zm10.518-7.31c-.944-1.014-2.709-2.539-2.709-7.534 0-3.794-2.66-6.83-6.247-7.576V1.562C12.499.7 11.799 0 10.937 0c-.862 0-1.561.7-1.561 1.563V2.58c-3.587.745-6.247 3.782-6.247 7.576 0 4.995-1.765 6.52-2.709 7.534-.293.315-.422.691-.42 1.06.005.8.634 1.563 1.567 1.563h18.74c.934 0 1.563-.762 1.568-1.563.002-.369-.127-.746-.42-1.06z"
          />
        </g>
      </svg>
    )
  }
}
