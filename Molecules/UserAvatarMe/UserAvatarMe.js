import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Avatar from '../../Atoms/Avatar/Avatar'
import BellSlash from '../../Atoms/Icons/BellSlash'
import StatusBubbleSettings from '../../Atoms/StatusBubbleSettings/StatusBubbleSettings'
import { USER_STATUS_LIST, USER_STATUS_OFFLINE } from '../../../constants'

import './UserAvatarMe.css'

export default class UserAvatarMe extends Component {
  static propTypes = {
    /** The current status for the user */
    status: PropTypes.oneOfType([PropTypes.oneOf(USER_STATUS_LIST)]).isRequired,

    /** Can display a different appearance when notifications paused */
    notificationsPaused: PropTypes.bool,

    /** Can attract the users attention */
    attention: PropTypes.bool,

    /** Path to the users profile pic, if '' a placeholder will be used */
    profileImage: PropTypes.string,

    /** ClassName for the wrapper */
    className: PropTypes.string,

    /** Style for the wrapper */
    style: PropTypes.object,
  }
  static defaultProps = {
    attention: false,
    profileImage: '',
    className: '',
    style: {},
  }

  render() {
    const { status, notificationsPaused, attention, profileImage, className, style } = this.props

    const attentionClass = attention ? 'bounce-tiny' : ''

    return (
      <div className={`useravatarme ${attentionClass} ${className}`.trim()} style={style}>
        <Avatar
          imgUrl={profileImage}
          size="medium"
          className={attention ? 'useravatarme--shadowed-attention' : 'useravatarme--shadowed'}
        />

        {notificationsPaused && (
          <div className="useravatarme-notification">
            <BellSlash />
          </div>
        )}

        <div className="useravatarme-status">
          <StatusBubbleSettings status={status || USER_STATUS_OFFLINE} />
        </div>
      </div>
    )
  }
}
