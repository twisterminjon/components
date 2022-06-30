import React from 'react'
import PropTypes from 'prop-types'

import PatientPicEditor from './PatientPicEditor'
import { featureSecureMessages, featureVirtualCalls, featureOnDemandMessages } from '@shared/helpers'
import Avatar from '../../Atoms/Avatar/Avatar'
import DialButton from '../../Atoms/DialButton/DialButton'
import StartMessageButton from '../../Molecules/StartMessageButton/StartMessageButton'
import { USER_STATUS_LIST, USER_STATUS_AVAILABLE, USER_STATUS_OFFLINE } from '../../../constants'

import './PatientHeader.css'

PatientHeader.propTypes = {
  /** The data object to edit */
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    profileImage: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    overallStatus: PropTypes.oneOf(USER_STATUS_LIST),
    patient: PropTypes.shape({
      id: PropTypes.string.isRequired,
      identifier: PropTypes.string,
    }).isRequired,
  }),

  /** The user can be dialed, this is an override to the overallStatus and will allow the user to be called via click2call */
  canBeDialed: PropTypes.bool,

  /** Function called after the call button is clicked */
  onCall: PropTypes.func.isRequired,

  /** Function called after the message button is clicked */
  onMessage: PropTypes.func.isRequired,

  /** Function called after the onDemand message is clicked */
  onOnDemandMessage: PropTypes.func.isRequired,

  /** ClassName for the wrapper */
  className: PropTypes.string,

  /** Style for the wrapper */
  style: PropTypes.object,
}

PatientHeader.defaultProps = {
  user: null,
  loading: false,
  className: '',
  style: {},
}

export default function PatientHeader({
  user,
  canBeDialed,
  onProfilePicChange,
  onCall,
  onMessage,
  onOnDemandMessage,
  className,
  style,
  ...rest
}) {
  const canMessage = featureSecureMessages(user)
  const canCall = featureVirtualCalls(user)
  const canOnDemandMessage = featureOnDemandMessages(user)

  const renderIdentifier = user.patient.identifier ? (
    <span className="patientheader-id">{user.patient.identifier}</span>
  ) : null

  const addMargin = user.patient.identifier ? 'patientheader-label--bottom-margin' : ''

  let userStatus = user.overallStatus
  if (canCall) {
    if (canBeDialed && user.overallStatus === USER_STATUS_OFFLINE) {
      userStatus = USER_STATUS_AVAILABLE
    }
  }

  return (
    <div className="patientheader-wrap">
      <div className="patientheader" style={style}>
        <Avatar imgUrl={user.profileImage} size={90} style={{ marginLeft: 39 }} />
        <div className="patientheader-label-wrap">
          <span className={`patientheader-label ${addMargin}`}>{user.displayName}</span>
          {renderIdentifier}
          <p className="patientheader-do-not-contact">
            {user.emailOptOut && user.smsOptOut && 'Email/SMS Opt-out'}
            {user.emailOptOut && !user.smsOptOut && 'Email Opt-out'}
            {!user.emailOptOut && user.smsOptOut && 'SMS Opt-out'}
          </p>
        </div>

        {canOnDemandMessage && (
          <StartMessageButton
            onClick={onOnDemandMessage}
            type="ondemand"
            data-testid={`odm-${user.displayName}`}
            style={{ marginRight: 14 }}
          />
        )}

        {canCall && (
          <DialButton
            ghost={false}
            style={{ marginRight: 14 }}
            onClick={onCall}
            status={userStatus}
            data-testid={`call-${user.displayName}`}
          />
        )}
        {canMessage && (
          <StartMessageButton
            onClick={onMessage}
            data-testid={`secure-message-${user.displayName}`}
            style={{ marginRight: 14 }}
          />
        )}
      </div>
      <PatientPicEditor user={user} className="patientheader-profile-pic-edit" />
    </div>
  )
}
