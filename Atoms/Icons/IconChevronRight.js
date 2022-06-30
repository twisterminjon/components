import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class IconChevronRight extends Component {
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
      <svg style={wrapperStyle} xmlns="http://www.w3.org/2000/svg" width="12" height="21" viewBox="0 0 12 21">
        <g fill={color}>
          <path
            fillRule="evenodd"
            d="M11.707 9.554a.975.975 0 0 1 0 1.392l-9.245 9.137a1.456 1.456 0 0 1-2.04 0 1.415 1.415 0 0 1 0-2.016L8.33 10.25.422 2.434a1.417 1.417 0 0 1 0-2.017 1.456 1.456 0 0 1 2.04 0l9.245 9.137z"
          />
        </g>
      </svg>
    )
  }
}
