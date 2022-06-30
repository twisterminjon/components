import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class IconDocuments extends Component {
  static propTypes = {
    /** Color for the icon */
    color: PropTypes.string,
    /** Size in pixels for the icon */
    size: PropTypes.number,
    /** Style for the wrapper */
    style: PropTypes.object,
  }
  static defaultProps = {
    color: 'white',
    size: 24,
    style: {},
  }

  render() {
    const { color, size, style } = this.props

    const wrapperStyle = Object.assign({}, style)

    return (
      <svg
        fillRule="evenodd"
        style={wrapperStyle}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 102.88 114.41">
        <path
          fill={color}
          d="M102.88,20.5,82.38,0H37.85a6,6,0,0,0-6,6V17.16l7.62-1.93L4.53,24.05A6,6,0,0,0,.18,31.33L20,109.87a6,6,0,0,0,7.29,4.35l57.2-14.43a6,6,0,0,0,4.36-7.28L72.58,28.05l-16,4a4,4,0,0,1-4.86-2.9l-4-16h0L72.58,28.05l-.16-.62-9.91-5.94,9.09,5.45H93.9v3.2H73.12L74.9,37.2h19v3.21H75.71l1.94,7.69H93.9v3.21H78.46l1.78,7.06H93.9v3.2H81.05L83,69.27H93.9v3.21H83.8l1.77,7H93.9v3.21H86.38L89,93h7.88a6,6,0,0,0,6-6V20.53ZM79.11,90.57l-51.48,13-.78-3.11,51.48-13ZM76.6,80.62l-51.48,13-.78-3.11,51.48-13ZM73.15,66.93,73.93,70,22.46,83l-.79-3.11Zm-1.73-6.84L20,73.08,19.16,70,70.64,57ZM68.76,49.52l-51.48,13-.78-3.11L68,46.41ZM65.47,36.46l.78,3.11-51.48,13L14,49.44ZM48.33,13h0Zm38.05,7.52a4,4,0,0,1-4-4V.47l20.06,20.05Z"
        />
      </svg>
    )
  }
}
