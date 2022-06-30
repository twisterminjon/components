import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './PatientData.css'

export default class PatientData extends Component {
  static propTypes = {
    /** Title for the data display */
    title: PropTypes.string.isRequired,
    /** Data to show */
    data: PropTypes.string,
    /** Style for wrapper element */
    wrapStyle: PropTypes.object,
    /** Class to be added to wrapper element */
    wrapClass: PropTypes.string,
    /** Class to be added to wrapper element */
    alertMessage: PropTypes.string,
  }
  static defaultProps = {
    data: '',
    wrapStyle: {},
    wrapClass: '',
    alertMessage: '',
  }

  render() {
    const { title, data, wrapStyle, wrapClass, alertMessage } = this.props

    const dataTestId = this.props['data-testid'] ? this.props['data-testid'] : `read-only-${title}`

    return (
      <div className={`patientdata-wrap ${wrapClass}`} style={wrapStyle}>
        <span className="patientdata-title" data-testid={`ro-${dataTestId}-label`}>
          {title}
          <p className="patientdata-alert-message" data-testid={`ro-${dataTestId}-alert`}>
            {alertMessage ? '- ' + alertMessage : ''}
          </p>
        </span>
        <span className="patientdata-data" data-testid={`ro-${dataTestId}-value`}>
          {data}
        </span>
      </div>
    )
  }
}
