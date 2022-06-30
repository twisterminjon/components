import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Button from '../../../Atoms/Button/Button'
import TextButton from '../../../Atoms/TextButton/TextButton'
import IconDocuments from '../../../Atoms/Icons/IconDocuments'
import { appTitle } from '../../../../config'

import './TNDecline.css'

export default class TNDecline extends Component {
  static propTypes = {
    /** Called after the return button is clicked */
    onReturn: PropTypes.func.isRequired,
    /** Called after the close app button is clicked */
    onCloseApp: PropTypes.func.isRequired,
  }

  render() {
    const { onReturn, onCloseApp } = this.props
    return (
      <div className="tndecline" data-testid="tndecline">
        <div className="tndecline-content">
          <h1 className="tndecline-title">{appTitle}</h1>
          <p>{`You must agree to the Terms & Notices to continue using the ${appTitle} application.`}</p>
          <IconDocuments size={150} />
          <p>If you have questions or need help please feel free to contact your service provider for options.</p>
        </div>
        <div className="tndecline-controls">
          <TextButton
            fluid
            name="close"
            style={{ marginBottom: '10px' }}
            content={`Close ${appTitle}`}
            onClick={onCloseApp}
          />
          <Button fluid name="return" type="submit" onClick={onReturn} data-testid="tn-agree-button">
            Return
          </Button>
        </div>
      </div>
    )
  }
}
