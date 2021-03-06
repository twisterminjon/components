import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class IconPencil extends Component {
  static propTypes = {
    /** Color for the icon */
    color: PropTypes.string,
    /** Size for icon in pixels */
    size: PropTypes.number,
  }
  static defaultProps = {
    color: 'black',
    size: 24,
  }

  render() {
    const { color, size } = this.props

    const wrapperStyle = Object.assign({}, this.props.style)

    return (
      <svg style={wrapperStyle} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <g fill={color}>
          <path d="M1.21,24A1.1,1.1,0,0,1,0,22.75c.12-.89.3-1.78.45-2.67s.33-1.94.51-2.91a.59.59,0,0,1,.17-.33L13.2,4.78a.62.62,0,0,1,1,0l5,5c.39.39.4.67,0,1.06l-12,12a.67.67,0,0,1-.33.18L1.42,24ZM14.14,8.37c0-.46-.33-.8-.66-.74A1,1,0,0,0,13,7.9q-3.42,3.39-6.82,6.8L5.83,15a.64.64,0,0,0,.91.91L7,15.66,13.85,8.8A2.31,2.31,0,0,0,14.14,8.37ZM2.45,17.64a.44.44,0,0,0,0,.1c-.17.92-.33,1.83-.48,2.75a.33.33,0,0,0,.11.27c.38.4.78.79,1.17,1.18a.32.32,0,0,0,.33.11l1.24-.22,1.55-.28V19.87H4.11V17.64Z" />
          <path d="M24,5.24a2.09,2.09,0,0,1-.61,1.38c-.72.74-1.46,1.48-2.2,2.21a.58.58,0,0,1-.8,0c-.06,0-.1-.1-.15-.15L15.3,3.78c-.41-.41-.41-.69,0-1.09.67-.67,1.33-1.35,2-2a2.25,2.25,0,0,1,3-.21l.15.12,2.91,2.92A2.25,2.25,0,0,1,24,5.24Z" />
        </g>
      </svg>
    )
  }
}
