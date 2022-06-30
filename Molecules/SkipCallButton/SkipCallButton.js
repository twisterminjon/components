import React, { Component } from 'react'
import PropTypes from 'prop-types'

import IconSkipCall from '../../Atoms/Icons/IconSkipCall'
import CallButtonLabel from '../../Atoms/CallButtonLabel/CallButtonLabel'
import CallButton from '../../Atoms/CallButton/CallButton'

import './SkipCallButton.css'
import Style from '../../../styles/Style'

export default class SkipCallButton extends Component {
  static propTypes = {
    ghost: PropTypes.bool,
  }
  static defaultProps = {
    ghost: false,
  }

  render() {
    const { onClick, ghost } = this.props

    return (
      <div className="skipcallbutton-wrap">
        <CallButton
          color={Style.brandColor}
          name="skip-call"
          ghost={ghost}
          onClick={onClick}
          data-testid="button-skip-call">
          <IconSkipCall />
        </CallButton>

        <CallButtonLabel text="Skip To Next" />
      </div>
    )
  }
}
