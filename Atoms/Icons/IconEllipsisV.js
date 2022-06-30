import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class IconEllipsisV extends Component {
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
        viewBox="0 0 6 23">
        <g fill={color}>
          <circle cx="3" cy="3" r="3" />
          <circle cx="3" cy="10.91" r="3" />
          <circle cx="3" cy="18.81" r="3" />
        </g>
      </svg>
    )
  }
}
