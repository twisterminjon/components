import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class IconChevronLeft extends Component {
  static propTypes = {
    /** Color for the icon */
    color: PropTypes.string,
  }
  static defaultProps = {
    color: 'black',
  }

  render() {
    const { color } = this.props

    const wrapperStyle = Object.assign({}, this.props.style)

    return (
      <svg style={wrapperStyle} xmlns="http://www.w3.org/2000/svg" width="12" height="21" viewBox="0 0 15 27">
        <g fill={color}>
          <polygon
            fillRule="evenodd"
            points="0 2.25 2.143 0 15 13.5 2.143 27 0 24.75 10.714 13.5"
            transform="matrix(-1 0 0 1 15 0)"
          />
        </g>
      </svg>
    )
  }
}
