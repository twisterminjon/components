import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class BellSlash extends Component {
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
            d="M21.783 18.781l.303.167c.009-.068.038-.13.038-.198.003-.37-.126-.746-.417-1.06-.937-1.014-2.69-2.54-2.69-7.534 0-3.794-2.642-6.831-6.204-7.576V1.562C12.813.7 12.118 0 11.263 0 10.405 0 9.71.7 9.71 1.563V2.58c-1.955.41-3.62 1.517-4.732 3.055L2.941 3.946c-.339-.264-.48-.34-.743 0l-1.13 1.308c-.263.34-.426.46-.087.726l18.897 15.268c.338.266.826.204 1.089-.137l.952-1.234c.263-.34.202-.83-.136-1.096zM3.369 12.282C2.952 15.601 1.604 16.84.817 17.69c-.29.315-.42.691-.417 1.06.005.8.63 1.563 1.557 1.563h11.73L3.37 12.283zM11.262 25c1.713 0 3.102-1.399 3.102-3.125H8.16C8.16 23.601 9.55 25 11.262 25z"
          />
        </g>
      </svg>
    )
  }
}
