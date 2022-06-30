import React from 'react'
import PropTypes from 'prop-types'
import { Video, Audio } from '@shared/components'

import VideoSmallPlaceholder from './VideoSmallPlaceholder'
import VideoSmallAudioMuted from './VideoSmallAudioMuted'
import { CommonStorageUtils } from '@shared/helpers'

import './VideoSmall.css'

VideoSmall.propTypes = {
  /** Whether audio context has started or not */
  isAudioContextStarted: PropTypes.bool.isRequired,
  /** Video track from legacy API */
  videoTrack: PropTypes.any,
  /** Audio track from legacy API */
  audioTrack: PropTypes.any,
  /** If true will mirror the video */
  mirror: PropTypes.bool,
  /** This is a local stream */
  isLocal: PropTypes.bool,
  /** Function to call when thumb clicked, sends participant id */
  onThumbClick: PropTypes.func,
}

VideoSmall.defaultProps = {
  mirror: false,
  isLocal: false,
}

const IS_DEBUG = CommonStorageUtils.getVideoDebugFlag() || process.env.NODE_ENV !== 'production'

export default function VideoSmall({ isAudioContextStarted, uiParticipant, mirror, isLocal, onThumbClick, style }) {
  const videoUITrack = uiParticipant && uiParticipant.getPrimaryVideoUITrack()
  const videoMediaStreamTrack = videoUITrack && videoUITrack.getMediaStreamTrack()
  const isVideoMuted = uiParticipant && uiParticipant.getIsAnyVideoMuted()

  const audioUITrack = uiParticipant && uiParticipant.getPrimaryAudioUITrack()
  const audioMediaStreamTrack = audioUITrack && audioUITrack.getMediaStreamTrack()
  const isAudioMuted = uiParticipant && uiParticipant.getIsAnyAudioMuted()

  const userId = uiParticipant.getId()

  return (
    <div className="videosmall-wrap" style={style}>
      <button
        className="videosmall-video-wrap videosmall-button"
        onClick={() => {
          onThumbClick(userId)
        }}>
        {isAudioMuted && <VideoSmallAudioMuted />}
        {isVideoMuted && <VideoSmallPlaceholder userId={userId} />}

        <Video
          mediaStreamTrack={videoMediaStreamTrack}
          className={`videosmall-video ${mirror ? 'videosmall--mirror' : ''}`}
        />

        {
          // Only play remote audio
        }
        {!isLocal && isAudioContextStarted && <Audio mediaStreamTrack={audioMediaStreamTrack} />}

        {IS_DEBUG && (
          <DebugInfo uiParticipant={uiParticipant} isAudioMuted={isAudioMuted} isVideoMuted={isVideoMuted} />
        )}
      </button>
    </div>
  )
}

function DebugInfo({ uiParticipant, isAudioMuted, isVideoMuted }) {
  const _audioUITracks = uiParticipant.getAudioUITracks()
  const audioUITrack = _audioUITracks && _audioUITracks[0]
  const audioUITrackId = audioUITrack && audioUITrack.getShortMediaId()

  const _videoUITracks = uiParticipant.getVideoUITracks()
  const videoUITrack = _videoUITracks && _videoUITracks[0]
  const videoUITrackId = videoUITrack && videoUITrack.getShortMediaId()

  return (
    <div className="videosmall-debug-text">
      <div>
        userId: {uiParticipant.getId()} [{uiParticipant.getIsLocal() ? 'local' : 'remote'}]
      </div>
      <div>audioTrack: {audioUITrackId}</div>
      <div>audioMuted? {isAudioMuted ? 'yes' : 'no'}</div>
      <div>videoTrack: {videoUITrackId}</div>
      <div>videoMuted? {isVideoMuted ? 'yes' : 'no'}</div>
    </div>
  )
}
