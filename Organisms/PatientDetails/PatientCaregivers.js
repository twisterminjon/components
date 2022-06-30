import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Loader } from 'semantic-ui-react'

import PatientSectionTitle from '../../Molecules/PatientSectionTitle/PatientSectionTitle'
import PatientButton from '../../Atoms/PatientButton/PatientButton'
import CaregiverSectionMgr from '../../Molecules/CaregiverSectionMgr/CaregiverSectionMgr'

import './PatientDetails.css'

export default class PatientCaregivers extends Component {
  static propTypes = {
    /** A patient to display */
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      patient: PropTypes.shape({
        id: PropTypes.string,
        caregivers: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            sendProgramEvents: PropTypes.bool.isRequire,
            user: PropTypes.shape({
              id: PropTypes.string.isRequired,
              displayName: PropTypes.string.isRequired,
              profileImage: PropTypes.string.isRequired,
              overallStatus: PropTypes.string.isRequired,
              isActive: PropTypes.bool.isRequired,
            }).isRequired,
          })
        ).isRequired,
      }),
    }).isRequired,
    /** Called after a caregiver is removed */
    onRemove: PropTypes.func.isRequired,
    /** Called after the odm button clicked */
    onOdm: PropTypes.func.isRequired,
    /** Called after the message button clicked */
    onMessage: PropTypes.func.isRequired,
    /** Called after the call button clicked */
    onCall: PropTypes.func.isRequired,
    /** Called after resending an invite is requested */
    onResend: PropTypes.func.isRequired,
    /** Called after change send options Event */
    onChangeSendOptions: PropTypes.func.isRequired,
    /** Called after an edit of a caregiver is requested */
    onEdit: PropTypes.func.isRequired,
    /** Can show a loader */
    loading: PropTypes.bool,
  }
  static defaultProps = {
    loading: false,
  }

  constructor(props) {
    super(props)

    this.handleShowSearch = this.handleShowSearch.bind(this)
  }

  handleShowSearch = () => {
    const userId = this.props.match.params.id
    this.props.history.push(`/app/patients/${userId}/caregivers/search`)
  }

  handleDeleteProgram = () => {
    this.props.onRemove()
  }

  render() {
    const {
      user,
      onOdm,
      onMessage,
      onCall,
      onRemove,
      onResend,
      onEdit,
      loading,
      onChangeSendOptions,
      ...rest
    } = this.props

    return (
      <div className="patientdetails-section-wrap patientdetails-section-caregivers">
        <PatientSectionTitle icon="caregiver" text="Caregivers" wrapStyle={{ marginTop: 0 }}>
          <PatientButton label="Assign" icon="plus" onClick={this.handleShowSearch} data-testid={`caregiver-assign`} />
        </PatientSectionTitle>

        <div className="patientdetails-section--full-width">
          <div className={`patientdetails-row--full-width`}>
            {loading ? (
              <div style={{ height: 100 }}>
                <Loader active />
              </div>
            ) : (
              <CaregiverSectionMgr
                style={{ width: '100%' }}
                patientUser={user}
                user={user}
                caregivers={user.patient.caregivers}
                onCall={onCall}
                onMessage={onMessage}
                onOdm={onOdm}
                onRemove={onRemove}
                onResend={onResend}
                onEdit={onEdit}
                onChangeSendOptions={onChangeSendOptions}
                {...rest}
              />
            )}
          </div>
        </div>
      </div>
    )
  }
}
