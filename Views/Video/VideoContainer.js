import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { useTwilioConnector } from '@shared/hooks'
import { withRouter } from 'react-router-dom'
import VideoView from './VideoView'
import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import { Misc } from '../../../comps'

import { triggerParticipantsChanged } from '../../Organisms/CallManager/CallManager'

import ToastMessage from '../../Atoms/ToastMessage/ToastMessage'

import './VideoView.css'

import debug from 'debug'
const d = debug('project:VideoContainer') // <- creating the namespace

const { EVT_PARTICIPANT_CONNECTED, EVT_PARTICIPANT_DISCONNECTED } = useTwilioConnector

VideoContainer.propTypes = {
  /** Array of users who are being called (still ringing) */
  awaitingPickup: PropTypes.array,
  /** Called when call starts for all participants */
  onCallStarted: PropTypes.func.isRequired,
  /** Call when a call is completed */
  onHangup: PropTypes.func.isRequired,
  /** If true, will end the jitsi part of the call */
  callComplete: PropTypes.bool,
  /** The patient id in the call */
  patientId: PropTypes.string,
  /** The id of a patient, if a patient is on the call */
  // FIXME: Is this a duplicate of patientId?
  patientInCallId: PropTypes.string,
  /** User id of the patient, if a patient is on the call */
  patientInCallUserId: PropTypes.string,
  /** User id of the callee */
  calleeRelatedUser: PropTypes.string,
  /** Function to add a user to a call */
  onAddCall: PropTypes.func.isRequired,
  /** Called after clicking a caregiver to add to the call */
  onAddCaregiverToCall: PropTypes.func.isRequired,
  /** Called after clicking an interpreter to add to the call */
  onAddInterpreterToCall: PropTypes.func.isRequired,
  /** Maximum amount of participants that can be in the call */
  maxParticipantsAmount: PropTypes.number.isRequired,
  /** If a call was reconnected but other participants dropped the call */
  droppedCall: PropTypes.bool,
}

function VideoContainer({
  awaitingPickup,
  onCallStarted,
  onHangup,
  callComplete,
  patientId,
  patientInCallId,
  patientInCallUserId,
  calleeRelatedUser,
  onAddCall,
  onAddCaregiverToCall,
  onAddInterpreterToCall,
  maxParticipantsAmount,
  droppedCall,
  ...rest
}) {
  const roomName = rest.match.params.room

  const {
    isAudioContextStarted,
    room,
    isConnected,
    disconnect,
    error,
    getUIParticipantWithId,
    localUIParticipant,
    remoteUIParticipants,
    remoteUITracks,
    toggleAudioMute,
    toggleVideoMute,
    isLocalAudioMuted,
    isLocalVideoMuted,
    audioError,
    reloadWithoutDisconnect,
  } = useTwilioConnector.default({
    roomName,
    onTokenRetrievalError: () => {
      console.warn('No call credentials available')

      // Navigate back to app homepage
      rest.history.push('/app')
    },
    onConnect: room => {
      onCallStarted()
    },
    onDisconnect: room => {
      // Call onHangup prop handler after Twilio disconnects
      onHangup()
    },
  })

  useEffect(() => {
    if (!room) {
      return
    }

    room.on(EVT_PARTICIPANT_CONNECTED, triggerParticipantsChanged)
    room.on(EVT_PARTICIPANT_DISCONNECTED, triggerParticipantsChanged)

    return function unmount() {
      room.off(EVT_PARTICIPANT_CONNECTED, triggerParticipantsChanged)
      room.off(EVT_PARTICIPANT_DISCONNECTED, triggerParticipantsChanged)
    }
  }, [room])

  // Ensures the call gets disconnected when callComplete property is true
  useEffect(() => {
    if (isConnected && callComplete) {
      disconnect()
    }
  }, [isConnected, callComplete, disconnect])

  const [canAddMoreParticipants, setCanAddMoreParticipants] = useState(false)

  const [selectedUserId, setSelectedUserId] = useState(null)

  const [showSearch, setShowSearch] = useState(false)

  const [showCaregivers, setShowCaregivers] = useState(false)

  const [showInterpreters, setShowInterpreters] = useState(false)

  // Verify if the maxParticipants has been reached
  useEffect(() => {
    const callParticipants = Object.keys(remoteUIParticipants).length + 1 + awaitingPickup.length
    setCanAddMoreParticipants(callParticipants < maxParticipantsAmount)
  }, [awaitingPickup, maxParticipantsAmount, remoteUIParticipants])

  // Auto-select remote participant
  useEffect(() => {
    const remoteUserIds = Object.keys(remoteUIParticipants)

    if (!remoteUserIds.includes(selectedUserId)) {
      setSelectedUserId(remoteUserIds[0])
    }
  }, [selectedUserId, remoteUIParticipants])

  // Sets whether user search should show or not
  const handleSearchToggle = useCallback(() => {
    setShowSearch(showSearch => !showSearch)
  }, [])

  // Adds a staff user to the call
  const handleAddStaffToCall = useCallback(
    staffUser => {
      handleSearchToggle()

      onAddCall(staffUser)
    },
    [handleSearchToggle, onAddCall]
  )

  const handleCaregiversToggle = useCallback(() => {
    setShowCaregivers(showCaregivers => {
      if (showCaregivers) {
        d(`hiding add caregivers screen`)
      } else {
        d(`showing add caregivers screen for patient-id=${patientId}`)
      }

      return !showCaregivers
    })
  }, [patientId])

  const handleAddCaregiverToCall = useCallback(
    caregiverUser => {
      // add the patient before lifting up
      caregiverUser.relatedUser = patientInCallUserId

      d(
        `adding caregiver id=${caregiverUser.id}, name=${caregiverUser.displayName}, related-user-id=${caregiverUser.relatedUser} to call`
      )

      handleCaregiversToggle()
      onAddCaregiverToCall(caregiverUser)
    },
    [handleCaregiversToggle, onAddCaregiverToCall, patientInCallUserId]
  )

  const handleInterpretersToggle = useCallback(() => {
    setShowInterpreters(showInterpreters => {
      if (showInterpreters) {
        d(`hiding add intepreters screen`)
      } else {
        d(`showing add intepreters screen for patient-id=${patientId}`)
      }

      return !showInterpreters
    })
  }, [patientId])

  const handleAddInterpreterToCall = useCallback(
    interpreterId => {
      d(`adding interpreter-id="${interpreterId}" to call`)
      handleInterpretersToggle()
      onAddInterpreterToCall(interpreterId)
    },
    [handleInterpretersToggle, onAddInterpreterToCall]
  )

  if (error) {
    if (error.name === 'NotAllowedError') {
      return <Misc.NoAV />
    }

    return <ErrorPage error={error} />
  }

  return (
    <React.Fragment>
      <VideoView
        isAudioContextStarted={isAudioContextStarted}
        awaitingPickup={awaitingPickup}
        onHangup={onHangup}
        showCallCompleted={callComplete && !droppedCall}
        patientInCallId={patientInCallId}
        calleeRelatedUser={calleeRelatedUser}
        getUIParticipantWithId={getUIParticipantWithId}
        localUIParticipant={localUIParticipant}
        remoteUIParticipants={remoteUIParticipants}
        remoteUITracks={remoteUITracks}
        selectedParticipantId={selectedUserId}
        onSelectParticipant={userId => setSelectedUserId(userId)}
        onSearchToggle={handleSearchToggle}
        showSearch={showSearch}
        onAddStaffToCall={handleAddStaffToCall}
        localAudioMuted={isLocalAudioMuted}
        localVideoMuted={isLocalVideoMuted}
        onMuteAudio={toggleAudioMute}
        onMuteVideo={toggleVideoMute}
        showCaregivers={showCaregivers}
        onAddCaregiverToCall={handleAddCaregiverToCall}
        onCaregiversToggle={handleCaregiversToggle}
        showInterpreters={showInterpreters}
        onAddInterpreterToCall={handleAddInterpreterToCall}
        onInterpretersToggle={handleInterpretersToggle}
        canAddMoreParticipants={canAddMoreParticipants}
      />

      {audioError && (
        <ToastMessage type="warning" show={true}>
          <span>Audio was lost.</span>
          <button className="socketoffline-button" onClick={reloadWithoutDisconnect}>
            Retry
          </button>
        </ToastMessage>
      )}
    </React.Fragment>
  )
}

export default withRouter(VideoContainer)
