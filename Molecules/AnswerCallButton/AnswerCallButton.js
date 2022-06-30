import React, { Component } from 'react'
import PropTypes from 'prop-types'

import IconAnswerCall from '../../Atoms/Icons/IconAnswerCall'
import CallButtonLabel from '../../Atoms/CallButtonLabel/CallButtonLabel'
import CallButton from '../../Atoms/CallButton/CallButton'

import './AnswerCallButton.css'
import Styles from '../../../styles/Style'

// FIXME: This has gotten messy due to there being 2 sizes for call buttons
// right now there is no way to have the correct icon size for the small version.
// Need to rethink and refactor to get correct size buttons.
export default class AnswerCallButton extends Component {
  static propTypes = {
    /** If true, will display as ghost style */
    ghost: PropTypes.bool,
    /** Size for the button */
    size: PropTypes.oneOf(['small', 'medium']),
  }
  static defaultProps = {
    size: 'medium',
    ghost: false,
  }

  render() {
    const { onClick, ghost, size } = this.props

    return (
      <div className="answercallbutton-wrap">
        <CallButton color={Styles.availableColor} name="answer-call" ghost={ghost} size={size} onClick={onClick}>
          <IconAnswerCall />
        </CallButton>
        <CallButtonLabel text="Accept" />
      </div>
    )
  }
}
