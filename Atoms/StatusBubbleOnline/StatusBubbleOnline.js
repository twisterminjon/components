import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './StatusBubbleOnline.css'

export default class StatusBubbleOnline extends Component {
  static propTypes = {
    /** Can display the current network status */
    online: PropTypes.bool,
    /** Can always display the status, regardless of value */
    alwaysShow: PropTypes.bool,
    /** ClassName for the wrapper */
    className: PropTypes.string,
    /** Style for the wrapper */
    style: PropTypes.object,
  }
  static defaultProps = {
    online: false,
    alwaysShow: false,
    className: '',
    style: {},
  }

  render() {
    const { online, alwaysShow, className, style } = this.props

    let onlineClass = online ? 'statusbubbleonline--online' : 'statusbubbleonline--offline'

    // if online hide, unless always showing
    if (!alwaysShow && online) {
      onlineClass = 'statusbubbleonline--hide'
    }

    return <div className={`statusbubbleonline ${onlineClass} ${className}`.trim()} style={style} />
  }
}
