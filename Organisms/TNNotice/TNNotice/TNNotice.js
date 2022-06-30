import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Button from '../../../Atoms/Button/Button'
import IconDocuments from '../../../Atoms/Icons/IconDocuments'
import TNNoticeType from './TNNoticeType'
import { appTitle } from '../../../../config'

import './TNNotice.css'

const getTitleByType = type => {
  switch (type) {
    default:
    case TNNoticeType.WELCOME:
      return `Welcome to ${appTitle}`
    case TNNoticeType.UPDATE:
      return 'The Terms & Notices have been updated'
  }
}

const getTextByType = type => {
  switch (type) {
    default:
    case TNNoticeType.WELCOME:
      return 'Before using the app, please review the Terms & Notices.'
    case TNNoticeType.UPDATE:
      return 'Please review to continue using the app.'
  }
}

export default class TNNotice extends Component {
  static propTypes = {
    /** Type of view to be displayed */
    type: PropTypes.oneOf([TNNoticeType.WELCOME, TNNoticeType.UPDATE]).isRequired,
    /** Called after the continue button is clicked */
    onContinue: PropTypes.func.isRequired,
  }

  render() {
    const { type, onContinue } = this.props
    return (
      <div className="tnnotice" data-testid="tnnotice">
        <div className="tnnotice-content">
          <h1>{getTitleByType(type)}</h1>
          <IconDocuments size={150} />
          <p className="tnnotice-text">{getTextByType(type)}</p>
        </div>
        <div className="tnnotice-controls">
          <Button fluid name="continue" type="submit" onClick={onContinue} data-testid="tn-agree-button">
            Continue
          </Button>
        </div>
      </div>
    )
  }
}
