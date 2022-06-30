import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs } from '@storybook/addon-knobs'

import VideoView from './VideoView'

const stories = storiesOf('Provider/v1/Views', module)
stories.addDecorator(withKnobs)

const mockFun = () => null

stories.addDecorator(centered).add('VideoView', () => {
  return (
    <VideoView
      awaitingPickup={false}
      patientInCallId={2}
      calleeRelatedUser={3}
      currentUser={{}}
      remoteTracks={[]}
      selectedParticipant={null}
      videoMuteToggled={false}
      localAudioMuted={false}
      localVideoMuted={false}
      showSearch={false}
      showCaregivers={false}
      showInterpreters={false}
      showCallCompleted={false}
      debugInfo={{}}
      onSearchToggle={mockFun}
      onAddStaffToCall={mockFun}
      onAddCaregiverToCall={mockFun}
      onCaregiversToggle={mockFun}
      onInterpretersToggle={mockFun}
      onAddInterpreterToCall={mockFun}
      onMuteAudio={mockFun}
      onMuteVideo={mockFun}
      onSelectParticipant={mockFun}
      onHangup={mockFun}
    />
  )
})
