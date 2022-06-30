import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class IconTrashcan extends Component {
  static propTypes = {
    /** Color for the icon */
    color: PropTypes.string,
    /** Size in pixels for the icon */
    size: PropTypes.number,
  }
  static defaultProps = {
    color: 'black',
    size: 29,
  }

  render() {
    const { color, size } = this.props

    const wrapperStyle = Object.assign({}, this.props.style)

    return (
      <svg
        style={wrapperStyle}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 22"
        fillRule="evenodd">
        <g fill={color}>
          <polygon points="19.28 5.5 1.86 5.5 3.33 23.01 17.79 23.01 19.28 5.5" />
          <polygon points="12.83 1.67 12.83 0 8.32 0 8.32 1.67 0 1.67 0 4.17 21.14 4.17 21.14 1.67 12.83 1.67" />
        </g>
      </svg>
    )
  }
}
