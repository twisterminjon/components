import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Query } from 'react-apollo'
import PatientsQl from '../../../services/PatientsQl'
import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import ServerIssue from '../../Views/ServerIssue/ServerIssueContainer'

import CaregiverAddToCall from './CaregiverAddToCall'
import SearchPlaceholder from '../../Molecules/UserCardCall/UserCardCallPlaceholder'

import debug from 'debug'
const d = debug('project:CaregiverAddToCallContainer')

export default class CaregiverAddToCallContainer extends Component {
  static propTypes = {
    /** The id of the patient to search caregivers for */
    patientId: PropTypes.string,
    /** If true will display the component */
    show: PropTypes.bool,
    /** Called after the back to call button is clicked */
    onClose: PropTypes.func.isRequired,
    /** Function called to start a call */
    onStartCall: PropTypes.func.isRequired,
    /** The id of the callee caregiver */
    calleeCaregiverId: PropTypes.string,
  }
  static defaultProps = {
    patientId: null,
    calleeCaregiverId: null,
    show: false,
  }

  render() {
    const { onStartCall, show, onClose, patientId, calleeCaregiverId, ...rest } = this.props

    if (!show) return null

    const CAREGIVERS_QUERY = patientId ? PatientsQl.getPatientCaregiversV1() : PatientsQl.getUserCaregivers()

    const id = patientId ? patientId : calleeCaregiverId

    return (
      <Query query={CAREGIVERS_QUERY} variables={{ id }} fetchPolicy="cache-and-network">
        {({ loading, error, data, networkStatus }) => {
          if (loading && networkStatus !== 6) {
            d(`CAREGIVERS_QUERY loading value ${loading}, showing placeholder`)
            return <SearchPlaceholder />
          }
          // unhandled error
          if (error) {
            if (!error.message.includes('Network error: Failed to fetch')) {
              d(`CAREGIVERS_QUERY failed failed on unhandled error`)
              return <ErrorPage error={error} />
            }
          }

          // fetch error (api server down) AND no data
          if (!data && error.message.includes('Network error: Failed to fetch')) {
            d(`CAREGIVERS_QUERY failed trying to reach api server`)
            return <ServerIssue />
          }

          const caregivers = data.user ? data.user.patient.caregivers : data.patient.caregivers

          return <CaregiverAddToCall caregivers={caregivers} onStartCall={onStartCall} onBack={onClose} {...rest} />
        }}
      </Query>
    )
  }
}
