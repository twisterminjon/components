import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Button from '../../Atoms/Button/Button'
import ButtonGhost from '../../Atoms/ButtonGhost/ButtonGhost'

import './ChooseCallType.css'

export default class ChooseCallType extends Component {
  static propTypes = {
    /** Show the Call options */
    show: PropTypes.bool.isRequired,
    /** A function to run when the cancel call button is clicked */
    onCancel: PropTypes.func.isRequired,
    /** Start a Video Call */
    onHandleVideoCallStart: PropTypes.func.isRequired,
    /** Starts an Audio Call */
    onHandleAudioCallStart: PropTypes.func.isRequired,
  }

  render() {
    const { show, onHandleVideoCallStart, onHandleAudioCallStart, onCancel } = this.props

    if (!show) return null

    return (
      <div className="choosecalltype-wrap">
        <div className="choosecalltype-dimmer" />

        <div className="choosecalltype-content" data-testid="choose-call-type">
          <div className="choosecalltype-buttons">
            <Button fluid onClick={onHandleVideoCallStart} data-testid="button-video-call">
              Video Call
            </Button>
            <Button fluid onClick={onHandleAudioCallStart} data-testid="button-audio-call">
              Audio Call
            </Button>
            <ButtonGhost fluid inverted onClick={() => onCancel()} data-testid="button-cancel">
              Cancel
            </ButtonGhost>
          </div>
        </div>
      </div>
    )
  }
}
