// import React, { PureComponent } from 'react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import VideoSmall from '../VideoSmall/VideoSmall'
import VideoSmallAddCaller from '../VideoSmall/VideoSmallAddCaller'

import './VideoFilmstrip.css'

// NOTE: !!!! This was changed to a 'PureComponent' as part of the fix for issue ST-2508
// I don't remember why it was necessary but it caused a new bug in that
// video/audio mute changes did not show up after the call is in progress.
// PureComponent does a 'shallow' compare to the changes to video/audio mute
// are not causing a re-render.
//
// Removing as per ticket ST-3145, which is video mute doesn't update.

export default class VideoFilmStrip extends Component {
  static propTypes = {
    isAudioContextStarted: PropTypes.bool.isRequired,
    localUIParticipant: PropTypes.object,
    remoteUIParticipants: PropTypes.object,
    callingPlaceholders: PropTypes.arrayOf(
      PropTypes.shape({
        to_user: PropTypes.number.isRequired,
        to_display_name: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
      })
    ),
    onThumbClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    callingPlaceholders: [],
  }

  render() {
    const {
      isAudioContextStarted,
      localUIParticipant,
      remoteUIParticipants = {},
      callingPlaceholders,
      onThumbClick,
    } = this.props

    if (!localUIParticipant) {
      return false
    }

    const videoSmalls = [...Object.entries({ localUIParticipant, ...remoteUIParticipants })].map(
      ([, uiParticipant], key) => {
        const isLocal = uiParticipant.getIsLocal()

        return (
          <VideoSmall
            key={key}
            isAudioContextStarted={isAudioContextStarted}
            uiParticipant={uiParticipant}
            style={{ marginBottom: 6 }}
            mirror={isLocal}
            isLocal={isLocal}
            onThumbClick={onThumbClick}
          />
        )
      }
    )

    const placeHolders = callingPlaceholders.map(user => (
      <VideoSmallAddCaller
        key={user.to_user}
        displayName={user.to_display_name}
        showDeclined={user.state === 'declined'}
        style={{ marginBottom: 6 }}
      />
    ))

    return (
      <div className="videofilmstrip-wrap">
        {videoSmalls}
        {placeHolders}
      </div>
    )
  }
}
