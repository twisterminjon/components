import React, { useState, useEffect, useCallback, useContext } from 'react'
import PropTypes from 'prop-types'

import { CurrentUserContext } from '@shared/providers'
import { initiateClick2Call } from '../../Organisms/CallManager/CallManager'

import UserCardCallHistory from '../../Molecules/UserCardCallHistory/UserCardCallHistory'
import SearchBar from '../../Molecules/SearchBar/SearchBar'
import { userCanBeClickToCalled } from '@shared/helpers'

import './CallHistory.css'

CallHistory.propTypes = {
  /** A list of calls to display */
  calls: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      callType: PropTypes.string.isRequired,
      isMissed: PropTypes.bool.isRequired,
      start: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        displayName: PropTypes.string.isRequired,
        profileImage: PropTypes.string.isRequired,
        overallStatus: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,

  /** Can hide dial button if a patient */
  canDialPatient: PropTypes.bool.isRequired,

  /** Can hide dial button if staff */
  canDialStaff: PropTypes.bool.isRequired,

  /** Called after dial a user action */
  onDial: PropTypes.func.isRequired,
}

export default function CallHistory({ calls, canDialPatient, canDialStaff, onDial }) {
  const currentUser = useContext(CurrentUserContext)
  const [filter, setFilter] = useState('')
  const [filteredCalls, setFilteredCalls] = useState(calls)

  const getFilteredData = useCallback(
    filter => {
      const _filter = filter.toLowerCase()
      const filteredCalls = calls.filter(call => {
        return call.user.displayName.toLowerCase().indexOf(_filter) !== -1
      })

      setFilteredCalls(filteredCalls)
    },
    [calls]
  )

  useEffect(() => {
    getFilteredData(filter)
  }, [calls, filter, getFilteredData])

  const canDial = user => {
    if ((user.isPatient || user.isCaregiver) && canDialPatient) return true
    if (user.isStaff && canDialStaff) return true
    return false
  }

  const handleSearchChange = filter => {
    setFilter(filter)
    getFilteredData(filter)
  }

  const handleClick2Call = user => {
    // This is a click2call
    const callData = {
      userId: user.id,
      displayName: user.displayName,
    }
    if (user.patient) callData.patientId = user.patient.id

    initiateClick2Call(callData)
  }

  const renderCalls = filteredCalls.map(call => (
    <UserCardCallHistory
      key={call.id}
      type={call.callType}
      displayName={call.user.displayName}
      profileImage={call.user.profileImage}
      status={call.user.overallStatus}
      missed={call.callType === 'INCOMING' && call.isMissed}
      date={call.start}
      canDial={canDial(call.user)}
      dialingAllowed={userCanBeClickToCalled({
        caller: currentUser,
        userToCall: call.user,
      })}
      onDial={() => {
        let callUser = {
          id: call.user.id,
          displayName: call.user.displayName,
          profileImage: call.user.profileImage,
        }

        if (call.user.isPatient) {
          callUser.patientId = call.user.patient.id
          callUser.patientUserId = callUser.id
        }

        if (call.user.overallStatus === 'offline') {
          handleClick2Call(call.user)
        } else {
          onDial(callUser)
        }
      }}
    />
  ))

  return (
    <div className="callhistory">
      <SearchBar value={filter} onChange={handleSearchChange} />
      <div className="callhistory-list">
        {renderCalls}
        <div style={{ height: 'var(--bottom-whitespace-v1)' }} />
      </div>
    </div>
  )
}
