import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Icon } from 'semantic-ui-react'

import './PatientDetails.css'

export default class PatientDetailsEmpty extends Component {
  static propTypes = {
    /** If true, will show the not found message */
    showNotFound: PropTypes.bool,
  }
  static defaultProps = {
    showNotFound: false,
  }

  render() {
    const { showNotFound } = this.props

    const renderText = showNotFound ? (
      <p className="patientdetailsempty-text">We couldn't find that patient. Please select one from the left.</p>
    ) : (
      <p className="patientdetailsempty-text">
        Select a patient from the left to view their information. If no patients are shown, you can add new ones with
        the <Icon name="plus" />
        button.
      </p>
    )

    // return <span className="patientdetails-not-found">{text}</span>
    return (
      <div className="patientdetailsempty">
        <Icon name="address book outline" size="massive" />
        {renderText}
      </div>
    )
  }
}
