import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import './VideoSmall.css'

export default class VideoSmallAddCaller extends Component {
  static propTypes = {
    /** The name of the person being added */
    displayName: PropTypes.string.isRequired,
    /** If true, will show the call was declined */
    showDeclined: PropTypes.bool,
  }
  static defaultProps = {
    showDecline: false,
  }

  render() {
    const { displayName, showDeclined, style } = this.props

    const messageFirstLine = showDeclined ? `${displayName}` : `Inviting`

    const messageSecondLine = showDeclined ? `is not available` : `${displayName}`

    const dimmerDeclined = showDeclined ? 'videosmall-dimmer--declined' : ''

    return (
      <Fragment>
        <div className="videosmall-wrap" style={style}>
          <div className={`videosmall-video-wrap videosmall-video-placeholder ${dimmerDeclined}`}>
            <div className={`videosmall-dimmer ${dimmerDeclined}`} />
            <span className="videosmall-add-caller-label">{messageFirstLine}</span>
            <span className="videosmall-add-caller-label">{messageSecondLine}</span>
          </div>
        </div>
      </Fragment>
    )
  }
}
