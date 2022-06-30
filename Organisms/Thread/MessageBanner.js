import React, { useContext, useMemo } from 'react'
import PropTypes from 'prop-types'

import { CurrentUserContext } from '@shared/providers'

import { canCallPatients, userCanBeClickToCalled } from '@shared/helpers'
import { initiateClick2Call } from '../CallManager/CallManager'

import UserAvatar from '../../Molecules/UserAvatar/UserAvatar'
import IconAddUser from '../../Atoms/Icons/IconAddUser'
import IconPhoneSmall from '../../Atoms/Icons/IconPhoneSmall'
import {
  USER_STATUS_LIST,
  AVAILABLE_FOR_CALL,
  USER_STATUS_AVAILABLE,
  USER_STATUS_AWAY,
  USER_STATUS_OFFLINE,
} from '../../../constants'

import './MessageBanner.css'

MessageBanner.propTypes = {
  /** User information for this message is with, may be null if a group message */
  userInBanner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    profileImage: PropTypes.string,
    overallStatus: PropTypes.PropTypes.oneOf(USER_STATUS_LIST),
    isPatient: PropTypes.bool.isRequired,
    patient: PropTypes.object,
  }).isRequired,

  /** The patient avatar can be interactive */
  avatarInteractive: PropTypes.bool.isRequired,

  /** The dial button can be shown or hidden */
  canCall: PropTypes.bool.isRequired,

  /** function called when the call button is clicked */
  onCall: PropTypes.func.isRequired,

  /** function called when the avatar icon is clicked */
  onAddUser: PropTypes.func.isRequired,

  /** function called when the add user icon is clicked */
  onSelectAvatar: PropTypes.func.isRequired,

  /** ClassName for the wrapper */
  className: PropTypes.string,

  /** Style for the wrapper */
  style: PropTypes.object,
}

export default function MessageBanner({
  userInBanner,
  avatarInteractive,
  canCall,
  onCall,
  onAddUser,
  onSelectAvatar,
  className = '',
  style = {},
}) {
  const currentUser = useContext(CurrentUserContext)
  const canContactUser = useMemo(() => {
    if (userInBanner.isPatient) return canCallPatients(currentUser.permissions)
  }, [currentUser.permissions, userInBanner.isPatient])
  let available = false

  // Handle overriding the dial button behavior when click2Call is allowed
  const canBeClick2CallDialed = userCanBeClickToCalled({
    caller: currentUser,
    userToCall: userInBanner,
  })

  const status = userInBanner.overallStatus

  if (canBeClick2CallDialed) {
    if ([USER_STATUS_AVAILABLE, USER_STATUS_AWAY, USER_STATUS_OFFLINE].includes(status)) available = true
  } else {
    if (AVAILABLE_FOR_CALL.includes(status)) available = true
  }

  const handleCallUser = () => {
    if (userInBanner.overallStatus === USER_STATUS_OFFLINE) {
      // this is a click2call
      const callData = {
        userId: userInBanner.id,
        displayName: userInBanner.displayName,
      }

      if (userInBanner.isPatient) {
        callData.patientId = userInBanner.patient.id
      }

      initiateClick2Call(callData)
      return
    }

    const user = {
      id: userInBanner.id,
      displayName: userInBanner.displayName,
      profileImage: userInBanner.profileImage,
    }
    if (userInBanner.isPatient) {
      user.patientUserId = userInBanner.id
      user.patientId = userInBanner.patient.id
    }

    onCall(user)
  }

  const handleSelectAvatar = () => {
    onSelectAvatar(userInBanner.id)
  }

  return (
    <div className={`messagebanner ${className}`} style={style} data-testid="message-banner">
      <div className="messagebanner-avatar-wrap">
        {avatarInteractive && canContactUser ? (
          <button
            className="messagebanner-button messagebanner-avatar-button"
            onClick={handleSelectAvatar}
            title="Return to profile">
            <UserAvatar profileImage={userInBanner.profileImage} size="medium" status={userInBanner.overallStatus} />
          </button>
        ) : (
          <UserAvatar profileImage={userInBanner.profileImage} size="medium" status={userInBanner.overallStatus} />
        )}
      </div>
      <button
        onClick={handleCallUser}
        className="messagebanner-button messagebanner-call-button"
        disabled={!canCall || !available}>
        <span className="messagebanner-label">{userInBanner && userInBanner.displayName}</span>
        {canCall && (
          <IconPhoneSmall
            className="messagebanner-call-icon"
            data-testid="button-call"
            color={available ? 'var(--button_dial_available_bg)' : 'var(--button_dial_busy_fg)'}
            size="18"
          />
        )}
      </button>
      <button className="messagebanner-button messagebanner-adduser-button" onClick={onAddUser} data-testid="add-user">
        <IconAddUser color={'var(--button_primary_bg)'} size="34" />
      </button>
    </div>
  )
}
