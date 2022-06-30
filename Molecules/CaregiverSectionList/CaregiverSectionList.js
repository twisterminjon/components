import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { initiateClick2Call } from '../../Organisms/CallManager/CallManager'

import UserCardCaregiver from '../../Molecules/UserCardCaregiver/UserCardCaregiver'
import { USER_STATUS_AVAILABLE, USER_STATUS_OFFLINE } from '../../../constants'
import { userCanBeClickToCalled } from '@shared/helpers'
import { CurrentUserContext } from '@shared/providers'

import './CaregiverSectionList.css'

CaregiverSectionList.propTypes = {
  /** The user object for the patient this is related to */
  patientUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  /** An array of caregivers to display */
  caregivers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      sendProgramEvents: PropTypes.bool.isRequired,
      user: PropTypes.shape({
        displayName: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        profileImage: PropTypes.string.isRequired,
        overallStatus: PropTypes.string.isRequired,
        isActive: PropTypes.bool.isRequired,
      }).isRequired,
    })
  ).isRequired,
  /** Can show message button */
  canMessage: PropTypes.bool.isRequired,
  /** Can show dial button */
  canCall: PropTypes.bool.isRequired,
  /** Can show odm button */
  canOdm: PropTypes.bool.isRequired,
  /** Can show a loading spinner on a specific caregiver */
  loadingId: PropTypes.string,
  /** Called after the odm button is clicked */
  onOdm: PropTypes.func.isRequired,
  /** Called after the call button is clicked */
  onCall: PropTypes.func.isRequired,
  /** Called after the message button is clicked */
  onMessage: PropTypes.func.isRequired,
  /** Called after the remove button is clicked, args(a caregiver object) */
  onMenu: PropTypes.func.isRequired,
}

export default function CaregiverSectionList({
  patientUser,
  caregivers,
  canMessage,
  canCall,
  canOdm,
  loadingId = '',
  onOdm,
  onCall,
  onMessage,
  onMenu,
}) {
  const currentUser = useContext(CurrentUserContext)

  const handleOnCall = (id, displayName, profileImage, overallStatus) => {
    // determine if this is a click2call
    if (overallStatus === USER_STATUS_OFFLINE) {
      initiateClick2Call({
        userId: id,
        displayName: displayName,
        relatedId: patientUser.id,
      })
      return
    }

    onCall(id, displayName, profileImage)
  }

  const caregiverList = caregivers.map(cg => {
    const canBeDialed = userCanBeClickToCalled({
      caller: currentUser,
      userToCall: cg.user,
    })

    let dialStatus = cg.user.overallStatus
    if (canCall) {
      if (canBeDialed && cg.user.overallStatus === USER_STATUS_OFFLINE) {
        dialStatus = USER_STATUS_AVAILABLE
      }
    }

    return (
      <UserCardCaregiver
        key={cg.id}
        isActive={cg.user.isActive}
        canOdm={canOdm}
        canCall={canCall}
        dialStatus={dialStatus}
        canMessage={canMessage}
        sendProgramEvents={cg.sendProgramEvents}
        showMenuButton={true}
        displayName={cg.user.displayName}
        profileImage={cg.user.profileImage}
        status={cg.user.overallStatus}
        loading={cg.id === loadingId}
        onOdm={() => {
          onOdm(cg.user.id)
        }}
        onCall={() => {
          handleOnCall(cg.user.id, cg.user.displayName, cg.user.profileImage, cg.user.overallStatus)
        }}
        onMessage={() => {
          onMessage(cg.user.id)
        }}
        onMenu={() => {
          onMenu(cg)
        }}
      />
    )
  })

  return (
    <ul className="caregiversectionlist" data-testid="caregivers">
      {caregiverList}
    </ul>
  )
}
