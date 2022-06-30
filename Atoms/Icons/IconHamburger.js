import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class IconHamburger extends Component {
  static propTypes = {
    /** Can have a size */
    size: PropTypes.number,

    /** Color for the icon */
    color: PropTypes.string,

    /** ClassName for the wrapper */
    className: PropTypes.string,

    /** Style for the wrapper */
    style: PropTypes.object,
  }
  static defaultProps = {
    size: 27,
    color: 'black',
    className: '',
    style: {},
  }

  render() {
    const { size, color, className, style } = this.props

    return (
      <svg
        style={style}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 27 23">
        <g fill={color}>
          <path
            d="M1.46,3.7H26.54c.53,0,1-.29,1-.66V1.37c0-.37-.43-.67-1-.67H1.46C.93.7.5,1,.5,1.37V3C.5,3.41.93,3.7,1.46,3.7Zm0,9.8H26.54c.53,0,1-.3,1-.67V11.17c0-.37-.43-.67-1-.67H1.46c-.53,0-1,.3-1,.67v1.66C.5,13.2.93,13.5,1.46,13.5Zm0,10H26.54c.53,0,1-.3,1-.67V21.17c0-.37-.43-.67-1-.67H1.46c-.53,0-1,.3-1,.67v1.66C.5,23.2.93,23.5,1.46,23.5Z"
            transform="translate(-0.5 -0.7)"
          />
        </g>
      </svg>
    )
  }
}
