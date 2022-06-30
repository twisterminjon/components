import React, { Component } from 'react'
import PropTypes from 'prop-types'

import IconMessage from '../../Atoms/Icons/IconMessage'
import IconEnvelope from '../../Atoms/Icons/IconEnvelope'
import CallButton from '../../Atoms/CallButton/CallButton'

import './StartMessageButton.css'

export default class StartMessageButton extends Component {
  static propTypes = {
    /** If true, will display as ghost style */
    ghost: PropTypes.bool,
    /** If true button will be disabled */
    disabled: PropTypes.bool,
    /** Function called when the button is clicked */
    onClick: PropTypes.func.isRequired,
    /** Type of message this button sends. */
    type: PropTypes.oneOf(['secure', 'ondemand']),
    /** If true, will display in a dimmed state */
    dimmed: PropTypes.bool,
  }
  static defaultProps = {
    ghost: false,
    disabled: false,
    type: 'secure',
    dimmed: false,
  }

  render() {
    const { type, onClick, ghost, disabled, dimmed, ...rest } = this.props

    const renderIcon =
      type === 'secure' ? (
        <IconMessage style={{ transform: 'scale(0.7)' }} />
      ) : (
        <IconEnvelope style={{ transform: 'scale(0.7)' }} />
      )

    return (
      <div className="startmessagebutton-wrap" {...rest}>
        <CallButton
          color="var(--brandcolor)"
          name="start-message"
          ghost={ghost}
          size="small"
          onClick={onClick}
          disabled={disabled}
          data-testid={rest['data-testid']}
          dimmed={dimmed}>
          {renderIcon}
        </CallButton>
      </div>
    )
  }
}
