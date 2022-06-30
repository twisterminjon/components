import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class IconVideoCamera extends Component {
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
      <svg style={wrapperStyle} xmlns="http://www.w3.org/2000/svg" width="28" height="18" viewBox="0 0 28 18">
        <g fill={color}>
          <path d="M16.3430556,0 L2.32361111,0 C1.04027778,0 0,1.003125 0,2.240625 L0,15.759375 C0,16.996875 1.04027778,18 2.32361111,18 L16.3430556,18 C17.6263889,18 18.6666667,16.996875 18.6666667,15.759375 L18.6666667,2.240625 C18.6666667,1.003125 17.6263889,0 16.3430556,0 Z M25.55,1.7671875 L20.2222222,5.3109375 L20.2222222,12.6890625 L25.55,16.228125 C26.5805556,16.9125 28,16.2140625 28,15.01875 L28,2.9765625 C28,1.7859375 26.5854167,1.0828125 25.55,1.7671875 Z" />
        </g>
      </svg>
    )
  }
}
