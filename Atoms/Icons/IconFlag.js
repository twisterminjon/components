import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class IconFlag extends Component {
  static propTypes = {
    /** Color for the icon */
    color: PropTypes.string,
  }
  static defaultProps = {
    color: 'var(--misc_negative_bg)',
    width: '25',
    height: '26',
  }

  render() {
    const { color, width, height } = this.props

    const viewBox = `0 0 ${width} ${height}`

    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={viewBox}>
        <path
          fill={color}
          fillRule="evenodd"
          d="M16.943 4.9c-2.658 0-4.854-1.725-8.196-1.725-1.237 0-2.346.217-3.375.595.143-.372.203-.77.178-1.168C5.462 1.192 4.306.06 2.894.002 1.307-.062 0 1.205 0 2.778c0 .944.471 1.777 1.19 2.279v19.15c0 .657.533 1.19 1.191 1.19h.794c.657 0 1.19-.533 1.19-1.19v-4.683c1.404-.599 3.154-1.098 5.676-1.098 2.659 0 4.854 1.726 8.196 1.726 2.389 0 4.299-.808 6.076-2.027.431-.295.687-.785.687-1.307V4.759c0-1.16-1.204-1.928-2.256-1.44-1.703.792-3.793 1.58-5.801 1.58z"
        />
      </svg>
    )
  }
}
