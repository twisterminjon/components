import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'

import { DateFormat, ProjectDate } from '@shared/helpers'

import Avatar from '../../Atoms/Avatar/Avatar'
import ButtonGhost from '../../Atoms/ButtonGhost/ButtonGhost'
import ModalYesNoToast from '../../Molecules/ModalYesNoToast/ModalYesNoToast'

import './ProgramInfo.css'

ProgramInfo.propTypes = {
  /** User to represent */
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    profileImage: PropTypes.string,
  }).isRequired,
  /** Program to show */
  program: PropTypes.shape({
    id: PropTypes.string.isRequired,
    enrollmentId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    enrollDate: PropTypes.string.isRequired,
  }).isRequired,
  /** Function called on disenroll clicked */
  onDisenroll: PropTypes.func.isRequired,
  /** Determines if disenrolling in progress */
  disenrolling: PropTypes.bool,
}

ProgramInfo.defaultProps = {
  disenrolling: false,
}

export default function ProgramInfo({ user, program, onDisenroll }) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [disenrolling, setDisenrolling] = useState(false)

  const enrollDate = useMemo(() => {
    return ProjectDate(program.enrollDate).formatLocalUTC(DateFormat.Date2)
  }, [program.enrollDate])

  const handleDisenroll = () => {
    setShowDeleteConfirmation(false)
    setDisenrolling(true)
    onDisenroll()
      .then(response => {
        setDisenrolling(false)
        setShowDeleteConfirmation(false)
      })
      .catch(e => {
        console.warn(`Saving error: ${e}`)
        setDisenrolling(false)
      })
  }

  return (
    <div className="programinfo-container">
      <div className="programinfo-usercontainer">
        <Avatar size={32} imgUrl={user.profileImage} />
        <div className="programinfo-usernamecontainer">
          <span className="programinfo-username">{user.displayName}</span>
        </div>
      </div>
      <div>
        <span className="programinfo-label" data-testid="program-name">
          {program.name}
        </span>
        <div className="programinfo-status">
          <div className="programinfo-date">
            <span className="programinfo-enrolledtext">Enrolled:</span>
            <span className="programinfo-datetext">{enrollDate}</span>
          </div>
          <div className="programinfo-disenrollbuttoncontainer">
            <ButtonGhost
              loading={disenrolling}
              data-testid="program-disenroll"
              onClick={() => setShowDeleteConfirmation(true)}>
              Disenroll
            </ButtonGhost>
          </div>
        </div>
      </div>
      <ModalYesNoToast
        icon="delete"
        message="Clicking Yes will remove the item."
        onConfirm={() => handleDisenroll(program.id, program.name)}
        onReject={() => setShowDeleteConfirmation(false)}
        show={showDeleteConfirmation}
        title={`Do you want to remove '${program.name}"?`}
      />
    </div>
  )
}
