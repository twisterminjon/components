import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class IconArrowUp extends Component {
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
      <svg style={wrapperStyle} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
        <path
          fill={color}
          fillRule="evenodd"
          d="M1.005 8.622L.242 7.88c-.323-.315-.323-.823 0-1.135L6.918.236c.323-.315.845-.315 1.164 0l6.676 6.505c.323.315.323.823 0 1.135l-.763.743c-.326.318-.859.311-1.178-.013L8.876 4.575v9.622c0 .445-.368.803-.825.803H6.952c-.457 0-.825-.358-.825-.803V4.575L2.183 8.609c-.32.328-.852.335-1.178.013z"
        />
      </svg>
    )
  }
}
