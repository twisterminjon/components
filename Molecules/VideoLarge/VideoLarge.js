import React, { Fragment } from 'react'
import { Video } from '@shared/components'
import VideoLargePlaceholder from './VideoLargePlaceholder'
import PropTypes from 'prop-types'

// import useWindowSize from '../../../hooks/useWindowSize'

import './VideoLarge.css'

import { useTwilioConnector } from '@shared/hooks'

const { UIParticipant } = useTwilioConnector

VideoLarge.propTypes = {
  uiParticipant: PropTypes.instanceOf(UIParticipant),
}

VideoLarge.defaultProps = {
  videoMuteToggled: false,
}

export default function VideoLarge({ uiParticipant }) {
  const participantId = uiParticipant && uiParticipant.getId()

  const videoUITrack = uiParticipant && uiParticipant.getPrimaryVideoUITrack()
  const videoMediaStreamTrack = videoUITrack && videoUITrack.getMediaStreamTrack()

  // const windowSize = useWindowSize()

  // Check the dimensions of the video container and determine if it should be letterboxed
  // const videoFit = getVideoFit(track, windowSize)

  /** @type {string} */
  const mirrorVideo = videoUITrack && videoUITrack.isLocal() ? 'videolarge--mirror' : ''

  /** @type {boolean} */
  const videoTrackMuted = videoUITrack && videoUITrack.isMuted()

  if (!uiParticipant) {
    return null
  }

  return (
    <Fragment>
      {(!videoUITrack || videoTrackMuted) && <VideoLargePlaceholder userId={participantId} />}
      <div className="videolarge-background">
        <Video
          id={`largevideo-${participantId}`}
          mediaStreamTrack={videoMediaStreamTrack}
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'contain' /* or videoFit */,
          }}
          className={mirrorVideo}
        />
      </div>
    </Fragment>
  )
}

// FIXME: This either blows up the video to fill the viewport or reduces it to letterbox format, but seems to produce a "big head" when utilized w/ mobile
/*
function getVideoFit(track, windowSize) {
  const dimensions = track ? track.dimensions : null
  if (!dimensions) return 'cover'
  const { width, height } = dimensions
  const { width: clientWidth, height: clientHeight } = windowSize
  const vidRatio = width / height
  const displayRatio = clientWidth / clientHeight

  const calcVidW = clientHeight * vidRatio
  const calcVidH = clientWidth / vidRatio

  const showLetterboxed =
    (vidRatio > 1 && displayRatio < 1 && calcVidH < clientHeight / 2) ||
    (vidRatio < 1 && displayRatio > 1 && calcVidW < clientWidth / 2)

  return showLetterboxed ? 'contain' : 'cover'
}
*/
