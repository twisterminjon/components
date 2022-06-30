import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class IconTimes extends Component {
  static propTypes = {
    /** Color for the icon */
    color: PropTypes.string,
    /** Size for icon in pixels */
    size: PropTypes.number,
    /** Styles for wrapper */
    style: PropTypes.object,
  }
  static defaultProps = {
    color: 'var(--white)',
    size: 25,
  }

  render() {
    const { color, size, style } = this.props

    const wrapperStyle = Object.assign({}, style)

    return (
      <svg style={wrapperStyle} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 25 25">
        <path
          fill={color}
          fillRule="evenodd"
          d="M3.492 24.998l-2.197-2.197c-.604-.604-.604-1.593 0-2.197l6.957-6.958L1.295 6.69c-.604-.604-.604-1.593 0-2.197l2.197-2.197c.604-.604 1.593-.604 2.197 0l6.957 6.957 6.958-6.957c.604-.604 1.593-.604 2.197 0l2.197 2.197c.604.604.604 1.593 0 2.197l-6.957 6.957 6.957 6.958c.604.604.604 1.593 0 2.197l-2.197 2.197c-.604.604-1.593.604-2.197 0l-6.958-6.957-6.957 6.957c-.604.604-1.593.604-2.197 0z"
        />
      </svg>
    )
  }
}
