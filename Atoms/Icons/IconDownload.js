import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class IconDownload extends Component {
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
      <svg
        style={wrapperStyle}
        width="20px"
        height="19px"
        viewBox="0 0 20 19"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg">
        <g fill={color} stroke="none" strokeWidth="1" fillRule="evenodd">
          <path d="M18.5,15.5 C19.3284271,15.5 20,16.1715729 20,17 C20,17.8284271 19.3284271,18.5 18.5,18.5 L1.5,18.5 C0.671572875,18.5 1.01453063e-16,17.8284271 0,17 C-1.01453063e-16,16.1715729 0.671572875,15.5 1.5,15.5 L18.5,15.5 Z M10,0.5 C10.8284271,0.5 11.5,1.17157288 11.5,2 L11.5,9.784 L16.6010965,6.21321178 C17.2797042,5.7380455 18.2150229,5.90296742 18.6901892,6.58157519 C19.1653555,7.26018297 19.0004335,8.19550164 18.3218258,8.67066791 L10.9494574,13.8328558 C10.6481496,14.0438338 10.2962329,14.1286224 9.95645682,14.0982861 C9.61670761,14.1287887 9.26439583,14.0440409 8.96279238,13.8328558 L1.59042398,8.67066791 C0.911816205,8.19550164 0.746894288,7.26018297 1.22206057,6.58157519 C1.69722684,5.90296742 2.63254551,5.7380455 3.31115329,6.21321178 L8.5,9.846 L8.5,2 C8.5,1.17157288 9.17157288,0.5 10,0.5 Z"></path>
        </g>
      </svg>
    )
  }
}
