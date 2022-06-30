import React from 'react'
import PropTypes from 'prop-types'

import FavButtonContainer from '../../Atoms/FavButton/FavButtonContainer'
import DialButton from '../../Atoms/DialButton/DialButton'

import UserAvatar from '../../Molecules/UserAvatar/UserAvatar'
import StartMessageButton from '../../Molecules/StartMessageButton/StartMessageButton'
import { USER_STATUS_LIST, USER_STATUS_AVAILABLE, USER_STATUS_BUSY, USER_STATUS_OFFLINE } from '../../../constants'

import './UserCardCall.css'

UserCardCall.propTypes = {
  /** If true, will show the message button */
  canMessage: PropTypes.bool.isRequired,
  /** If true, will show the dial button */
  canCall: PropTypes.bool,
  /** ID associated with displayed name */
  userId: PropTypes.string.isRequired,
  /** User's name to display in card */
  displayName: PropTypes.string.isRequired,
  /** Url to profile image for the user */
  profileImage: PropTypes.string,
  /** True if a favorite */
  favorite: PropTypes.bool,
  /** User's availability state */
  status: PropTypes.oneOf(USER_STATUS_LIST),
  /** Function called when the call button is clicked */
  onCall: PropTypes.func.isRequired,
  /** Function called when the message button is clicked */
  onMessage: PropTypes.func.isRequired,
}

export default function UserCardCall({
  canMessage,
  canCall,
  userId,
  displayName,
  profileImage,
  favorite = false,
  status = USER_STATUS_AVAILABLE,
  onCall,
  onMessage,
}) {
  return (
    <div className="usercardcall" data-testid={`list-item-${displayName}`}>
      <FavButtonContainer
        style={{ margin: '0 26px' }}
        filled={favorite}
        userId={userId}
        data-testid={`favorite-${displayName}`}
      />
      <div style={{ marginRight: '14px' }}>
        <UserAvatar profileImage={profileImage} status={status} data-testid={`avatar-${displayName}`} />
      </div>
      <div className="usercardcall-label-container">
        <span
          className={`usercardcall-label ${
            [USER_STATUS_BUSY, USER_STATUS_OFFLINE].includes(status) ? 'usercardcall-label-dimmed' : ''
          }`.trim()}>
          {displayName}
        </span>
      </div>
      {canCall && (
        <DialButton
          status={status}
          ghost={false}
          style={{ marginRight: 14 }}
          onClick={onCall}
          data-testid={`call-${displayName}`}
        />
      )}
      {canMessage && (
        <StartMessageButton
          onClick={onMessage}
          style={{ marginRight: 14 }}
          data-testid={`secure-message-${displayName}`}
        />
      )}
    </div>
  )
}
