import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class IconSkipCall extends Component {
  static propTypes = {
    /** Color for the icon */
    color: PropTypes.string,
  }
  defaultColor = {
    color: 'black',
  }

  render() {
    const { color } = this.props

    const wrapperStyle = Object.assign({}, this.props.style)

    return (
      <svg
        style={wrapperStyle}
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="29"
        viewBox="0 0 21 29"
        fillRule="evenodd"
        fill={color}>
        <path d="M21,0.777174747 L21,28.2228253 C21,28.6500453 20.645625,28.9995889 20.2125,28.9995889 L17.0625,28.9995889 C16.629375,28.9995889 16.275,28.6500453 16.275,28.2228253 L16.275,16.804399 L3.4453125,28.5205847 C2.0934375,29.6274729 0,28.7018295 0,26.9282191 L0,2.0717809 C0,0.29817047 2.0934375,-0.627472932 3.4453125,0.479415331 L16.275,12.1243977 L16.275,0.777174747 C16.275,0.349954716 16.629375,0.000411053723 17.0625,0.000411053723 L20.2125,0.000411053723 C20.645625,0.000411053723 21,0.349954716 21,0.777174747 Z" />
      </svg>
    )
  }
}
