import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class IconKey extends Component {
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
    size: 25,
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
        viewBox="0 0 25 25"
        fillRule="evenodd">
        <g fill={color}>
          <path
            fillRule="evenodd"
            d="M25 8.594c0 4.746-3.848 8.594-8.594 8.594-.548 0-1.083-.052-1.603-.15l-1.172 1.319c-.222.25-.541.393-.876.393h-1.818v1.953c0 .647-.524 1.172-1.171 1.172H7.812v1.953c0 .647-.524 1.172-1.171 1.172H1.17C.526 25 0 24.475 0 23.828v-3.811c0-.311.123-.61.343-.829l7.9-7.9c-.279-.848-.43-1.753-.43-2.694C7.813 3.848 11.66 0 16.405 0 21.166 0 25 3.834 25 8.594zM16.406 6.25c0 1.294 1.05 2.344 2.344 2.344 1.294 0 2.344-1.05 2.344-2.344 0-1.294-1.05-2.344-2.344-2.344-1.294 0-2.344 1.05-2.344 2.344z"
          />
        </g>
      </svg>
    )
  }
}
