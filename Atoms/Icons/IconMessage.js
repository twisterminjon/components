import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class IconMessage extends Component {
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
        viewBox="0 0 24 19"
        fillRule="evenodd">
        <g fill={color}>
          <path
            d="M24,12c0-5.1-5.37-9.23-12-9.23S0,6.9,0,12a7.83,7.83,0,0,0,2.19,5.31A13.24,13.24,0,0,1,.13,20.45.46.46,0,0,0,0,21a.45.45,0,0,0,.42.28,10.21,10.21,0,0,0,5.12-1.44A14.75,14.75,0,0,0,12,21.23C18.63,21.23,24,17.1,24,12Z"
            transform="translate(0 -2.77)"
          />
        </g>
      </svg>
    )
  }
}
