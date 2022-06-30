import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BackToCallButton from '../../Atoms/BackToCallButton/BackToCallButton'

import './BackToCallHeader.css'

export default class BackToCallHeader extends Component {
  static propTypes = {
    /** Title of header */
    title: PropTypes.string.isRequired,
    /** Size for the button */
    onBack: PropTypes.func.isRequired,
  }

  render() {
    const { title, onBack } = this.props

    return (
      <div className="backToCallHeader-container">
        <span className="backToCallHeader-title">{title}</span>
        <BackToCallButton onClick={onBack} data-testid="back-to-call" />
      </div>
    )
  }
}
