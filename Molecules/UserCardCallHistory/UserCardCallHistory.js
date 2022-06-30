import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { DateFormat, ProjectDate } from '@shared/helpers'
import UserAvatar from '../../Molecules/UserAvatar/UserAvatar'
import CallType from '../../Atoms/CallType/CallType'
import DialButton from '../../Atoms/DialButton/DialButton'
import {
  USER_STATUS_AVAILABLE,
  USER_STATUS_OFFLINE,
  AVAILABLE_FOR_CALL,
  USER_STATUS_LIST,
  CallTypeList,
} from '../../../constants'

import './UserCardCallHistory.css'

UserCardCallHistory.propTypes = {
  /** Type of call */
  type: PropTypes.oneOf(CallTypeList).isRequired,

  /** Date of call */
  date: PropTypes.string.isRequired,

  /** Callers name */
  displayName: PropTypes.string.isRequired,

  /** Callers profile pic */
  profileImage: PropTypes.string.isRequired,

  /** The dial button can be shown or hidden */
  canDial: PropTypes.bool.isRequired,

  /** The dial button can be available to dial */
  dialingAllowed: PropTypes.bool,

  /** Callers availability state */
  status: PropTypes.oneOf(USER_STATUS_LIST).isRequired,

  /** Can display differently when call is missed */
  missed: PropTypes.bool.isRequired,

  /** Called after the card is clicked */
  onDial: PropTypes.func.isRequired,

  /** ClassName for the wrapper */
  className: PropTypes.string,

  /** Style for the wrapper */
  style: PropTypes.object,
}

UserCardCallHistory.defaultProps = {
  className: '',
  style: {},
}

export default function UserCardCallHistory({
  type,
  displayName,
  profileImage,
  status,
  missed,
  canDial,
  dialingAllowed,
  onDial,
  date,
  className,
  style,
}) {
  // When dialingAllowed is true, the user can be dialed regardless of status
  const dialStatus = dialingAllowed && status === USER_STATUS_OFFLINE ? USER_STATUS_AVAILABLE : status

  const available = AVAILABLE_FOR_CALL.includes(status)
  const busyClass = !available ? 'usercardcallhistory--unavailable' : ''
  const missedClass = missed ? 'usercardcallhistory--missed' : ''
  const dateOrTime = useMemo(() => {
    const isToday = ProjectDate(date).isToday()
    return ProjectDate(date).formatLocalUTC(isToday ? DateFormat.LT : DateFormat.L)
  }, [date])

  return (
    <div className={`usercardcallhistory-wrap ${className}`.trim()} style={style}>
      <div className="usercardcallhistory" data-testid={`call-card-${displayName}`}>
        <div className={`usercardcallhistory-avatar `} style={{ marginRight: 14 }}>
          <UserAvatar profileImage={profileImage} size="medium" status={status} />
        </div>
        <div className="column usercardhistory-info">
          <span className={`usercardcallhistory-label ${busyClass} ${missedClass}`.trim()}>{displayName}</span>
          <div className="usercardhistory-details-row">
            <CallType type={type} dimmed={!available} missed={missed} style={{ marginRight: 16 }} />
            <span className={`usercardcallhistory-details ${busyClass} ${missedClass}`.trim()}>{dateOrTime}</span>
          </div>
        </div>
        {canDial && (
          <DialButton
            status={dialStatus}
            onClick={onDial}
            style={{ marginRight: 16 }}
            data-testid={`usercardcallhistory-dial-${displayName}`}
          />
        )}
      </div>
    </div>
  )
}
