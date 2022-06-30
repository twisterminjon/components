import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './UserCardLarge.css'
import Avatar from '../../Atoms/Avatar/Avatar'
import { Avatar as AvatarV2 } from '@shared/components'

export default class UserCardLarge extends Component {
  static propTypes = {
    userName: PropTypes.string.isRequired,
    relatedUserName: PropTypes.string,
    title: PropTypes.string,
    profileImage: PropTypes.string,
    relatedProfileImage: PropTypes.string,
    actionText: PropTypes.string,
    onClick: PropTypes.func,
  }
  static defaultProps = {
    title: '',
    actionText: '',
    onClick: () => {},
  }

  render() {
    const {
      userName,
      relatedUserName,
      profileImage,
      relatedProfileImage,
      actionText,
      onClick,
      title,
      style,
    } = this.props

    return (
      <div className="usercardlarge" onClick={onClick} style={style}>
        {!relatedUserName && !relatedProfileImage ? (
          <Avatar imgUrl={profileImage} className="usercardlarge-avatar" size={110} />
        ) : (
          <AvatarV2.Related
            primaryDisplayName={userName}
            primaryImage={profileImage}
            secondaryDisplayName={relatedUserName}
            secondaryImage={relatedProfileImage}
            className="usercardlarge-avatar"
          />
        )}

        <span className="usercardlarge-action">{actionText}</span>
        <p className="usercardlarge-name">{userName}</p>
        <span className="usercardlarge-title">{title}</span>
      </div>
    )
  }
}
