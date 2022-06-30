import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class IconFlag extends Component {
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
    color: 'var(--base__body_fg)',
    size: '25',
    className: '',
    style: {},
  }

  render() {
    const { color, size, className, style } = this.props

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 25 25"
        style={style}
        className={className}>
        <path
          fill={color}
          d="M22.005 25H3.007C1.713 25 0 23.736 0 22.01V2.998C0 1.272 1.713 0 3.007 0h18.998C23.3 0 25 1.272 25 2.998V22.01c0 1.726-1.7 2.99-2.995 2.99zM5.5 4.428C4.12 4.428 3 5.343 3 7s1.12 2.548 2.5 2.548S8 8.657 8 7 6.88 4.428 5.5 4.428zM3 19h19v-6.62l-4.33-5.172c-.232-.277-.608-.277-.84 0l-6.705 8.01-2.747-3.282c-.232-.277-.608-.277-.84 0L3 16.163V19z"
        />
      </svg>
    )
  }
}
