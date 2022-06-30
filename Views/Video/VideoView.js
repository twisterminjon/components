import React, { Fragment, useContext, useMemo } from 'react'
import PropTypes from 'prop-types'

import { CurrentUserContext } from '@shared/providers'

import VideoControls from '../../Molecules/VideoControls/VideoControls'
import VideoLarge from '../../Molecules/VideoLarge/VideoLarge'
import VideoFilmstrip from '../../Molecules/VideoFilmstrip/VideoFilmstrip'
import AddCallButton from '../../Molecules/AddCallButton/AddCallButton'
import SearchContainer from '../Search/SearchContainer'
import CaregiverAddToCallContainer from '../../Views/CaregiverAddToCall/CaregiverAddToCallContainer'
import InterpretersContainer from '../Interpreters/InterpretersContainer'
import CallCompletedNotice from '../../Molecules/CallCompletedNotice/CallCompletedNotice'
import { featureInterpreters } from '@shared/helpers'
import GroupHeader from '../../Views/Groups/GroupHeader'
import BackToCallHeader from '../../Molecules/BackToCallHeader/BackToCallHeader'
import { useTwilioConnector } from '@shared/hooks'

const { UIParticipant } = useTwilioConnector

VideoView.propTypes = {
  /** Whether audio context is started or not */
  isAudioContextStarted: PropTypes.bool.isRequired,

  /** Array of users who are being called (still ringing) */
  // FIXME: Define user shape
  awaitingPickup: PropTypes.array,

  /** Call after a call is completed */
  onHangup: PropTypes.func.isRequired,

  /** The id of a patient, if a patient is on the call */
  // FIXME: Rename to patientIdInCall
  patientInCallId: PropTypes.string,

  /** Whether or not the call is completed */
  showCallCompleted: PropTypes.bool,

  /** User id of the callee */
  calleeRelatedUser: PropTypes.string,

  /** Retrieves UI participant with given id */
  getUIParticipantWithId: PropTypes.func.isRequired,

  /** Local participant (w/ UI API) */
  localUIParticipant: PropTypes.instanceOf(UIParticipant),

  /** Remote participants (w/ UI API) */
  remoteUIParticipants: PropTypes.objectOf(PropTypes.instanceOf(UIParticipant)),

  /** User id of the selected participant */
  selectedParticipantId: PropTypes.string,

  /** Called after selecting a participant */
  onSelectParticipant: PropTypes.func.isRequired,

  /** Whether local audio is muted or not */
  localAudioMuted: PropTypes.bool,

  /** Whether local video is muted or not */
  localVideoMuted: PropTypes.bool,

  /** Whether additional user search should display or not */
  showSearch: PropTypes.bool.isRequired,

  /** Called after user wishes to toggle user search */
  onSearchToggle: PropTypes.func.isRequired,

  /** Called after user wishes to add staff to call */
  onAddStaffToCall: PropTypes.func.isRequired,

  /** Whether or not to show caregivers */
  showCaregivers: PropTypes.bool.isRequired,

  /** Called after user wishes to toggle caregivers display */
  onCaregiversToggle: PropTypes.func.isRequired,

  /** Called after user wishes to add caregiver to call */
  onAddCaregiverToCall: PropTypes.func.isRequired,

  /** Whether or not to show interpreters */
  showInterpreters: PropTypes.bool.isRequired,

  /** Called after user wishes to toggle interpreters display */
  onInterpretersToggle: PropTypes.func.isRequired,

  /** Called after user wishes to add interpreter to call */
  onAddInterpreterToCall: PropTypes.func.isRequired,

  /** Called after user wishes to toggle audio muting */
  onMuteAudio: PropTypes.func.isRequired,

  /** Called after user wishes to toggle video muting */
  onMuteVideo: PropTypes.func.isRequired,

  /** Indicating if more participants can be added to the call */
  canAddMoreParticipants: PropTypes.bool.isRequired,
}

VideoView.defaultProps = {
  showCallCompleted: false,
}

export default function VideoView({
  isAudioContextStarted,
  awaitingPickup,
  onHangup,
  patientInCallId,
  showCallCompleted,
  calleeRelatedUser,
  getUIParticipantWithId,
  localUIParticipant,
  remoteUIParticipants,
  selectedParticipantId,
  onSelectParticipant,
  localAudioMuted,
  localVideoMuted,
  showSearch,
  onSearchToggle,
  showCaregivers,
  onCaregiversToggle,
  showInterpreters,
  onInterpretersToggle,

  onAddStaffToCall,
  onAddCaregiverToCall,

  onAddInterpreterToCall,
  onMuteAudio,
  onMuteVideo,
  canAddMoreParticipants,
}) {
  const selectedUIParticipant = useMemo(() => getUIParticipantWithId(selectedParticipantId), [
    getUIParticipantWithId,
    selectedParticipantId,
  ])

  const currentUser = useContext(CurrentUserContext)

  const searchHide = showSearch ? '' : 'videoview-overlay--closed'
  const buttonZIndex = Number(window.getComputedStyle(document.body).getPropertyValue('--z-video-filmstrip')) + 1

  const interpretersHide = showInterpreters ? '' : 'videoview-overlay--closed'

  return (
    <Fragment>
      <AddCallButton
        showLabel={false}
        style={{
          position: 'absolute',
          top: 30,
          right: 176,
          zIndex: buttonZIndex,
        }}
        enableCaregivers={Boolean(patientInCallId || calleeRelatedUser)}
        enableInterpreters={featureInterpreters(currentUser)}
        onAddStaff={onSearchToggle}
        onAddCaregiver={onCaregiversToggle}
        onAddInterpreter={onInterpretersToggle}
        canAddMoreParticipants={canAddMoreParticipants}
      />

      <CallCompletedNotice show={showCallCompleted} onCancel={onHangup} />

      {/* Note: className on wrapper is just so we have something descriptive in the HTML */}
      <div className="videoview-videolarge-wrap" style={{ height: '100%', width: '100%' }}>
        <VideoLarge uiParticipant={selectedUIParticipant} />
      </div>

      <VideoFilmstrip
        isAudioContextStarted={isAudioContextStarted}
        localUIParticipant={localUIParticipant}
        remoteUIParticipants={remoteUIParticipants}
        callingPlaceholders={awaitingPickup}
        onThumbClick={onSelectParticipant}
      />

      <VideoControls
        show={true}
        audioMuted={localAudioMuted}
        videoMuted={localVideoMuted}
        onHangup={onHangup}
        onMuteAudio={onMuteAudio}
        onMuteVideo={onMuteVideo}
      />

      <div className={`videoview-search-wrap ${searchHide}`}>
        <GroupHeader name={''} onClick={onSearchToggle} />
        <SearchContainer onStartCall={onAddStaffToCall} canMessage={false} canCall={true} show={showSearch} />
      </div>

      <CaregiverAddToCallContainer
        show={showCaregivers}
        patientId={patientInCallId}
        calleeCaregiverId={calleeRelatedUser}
        onStartCall={onAddCaregiverToCall}
        onClose={onCaregiversToggle}
      />

      <div className={`videoview-interpreters-wrap ${interpretersHide}`.trim()}>
        <BackToCallHeader title="Interpreters" onBack={onInterpretersToggle} />
        <InterpretersContainer onStartCall={onAddInterpreterToCall} />
      </div>
    </Fragment>
  )
}
