import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Mutation, Query } from 'react-apollo'
import CaregiversQl from '../../../services/CaregiversQl'
import AuthQl from '../../../services/AuthQl'
import PatientsQl from '../../../services/PatientsQl'
import { getPollInterval } from '../../../config'

import PatientCaregivers from './PatientCaregivers'
import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import ServerIssue from '../../Views/ServerIssue/ServerIssueContainer'

import debug from 'debug'
const d = debug('project:PatientCaregiversContainer')
export default class PatientCaregiversContainer extends Component {
  static propTypes = {
    /** A patient to display */
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      patient: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
    /** Called to start a call */
    onCall: PropTypes.func.isRequired,
  }

  handleMessage = id => {
    this.props.history.push(`/app/messages/user/${id}`)
  }

  handleOdm = id => {
    const { enterpriseId } = this.props.match.params
    this.props.history.push(`/app/enterprises/${enterpriseId}/patientsV1/${id}/ondemand-message`)
  }

  handleEdit = cg => {
    const { enterpriseId } = this.props.match.params
    this.props.history.push(
      `/app/enterprises/${enterpriseId}/patientsV1/${this.props.user.id}/caregivers/${cg.user.id}/`
    )
  }

  handleChangeSendOptions = ({ caregiverId, patientUserId, currentValue, mutation }) => {
    mutation({
      variables: {
        caregiverId,
        userId: patientUserId,
        sendProgramEvents: currentValue,
      },
    })
  }

  render() {
    const { user, onCall, ...rest } = this.props

    const CAREGIVER_QUERY = PatientsQl.getPatientCaregiversV1()
    const CAREGIVER_REMOVE_MUTATION = CaregiversQl.unassignCaregiver()
    const CAREGIVER_RESEND_INVITE_MUTATION = AuthQl.resendCaregiverInvite()
    const CAREGIVER_SEND_OPTIONS_MUTATION = PatientsQl.setCaregiverSendProgramEvents()

    return (
      <Query
        query={CAREGIVER_QUERY}
        variables={{ id: user.patient.id }}
        fetchPolicy="cache-and-network"
        pollInterval={getPollInterval()}>
        {({ loading: caregiversLoading, error: caregiversError, data: caregiverData, networkStatus }) => {
          if (caregiversError) return <ErrorPage error={caregiversError} />

          return (
            <Mutation mutation={CAREGIVER_REMOVE_MUTATION}>
              {(removeCaregiver, { error: removeCaregiverError, data: removeCaregiverData }) => {
                if (removeCaregiverError) {
                  // unhandled error
                  if (!removeCaregiverError.message.includes('Network error: Failed to fetch')) {
                    return <ErrorPage error={removeCaregiverError} />
                  }

                  // fetch error (api server down) AND no data
                  if (!removeCaregiverData && removeCaregiverError.message.includes('Network error: Failed to fetch')) {
                    return <ServerIssue />
                  }
                }

                if (removeCaregiverData) {
                  d(`caregiver unassigned data=%O`, removeCaregiverData)
                }

                return (
                  <Mutation mutation={CAREGIVER_SEND_OPTIONS_MUTATION}>
                    {(updateCaregiverSendEventOptions, { error, loading: sendOptsLoading }) => {
                      if (error) {
                        return <ErrorPage error={error} />
                      }

                      return (
                        <Mutation mutation={CAREGIVER_RESEND_INVITE_MUTATION}>
                          {(resendInvite, { error: resendError }) => {
                            if (resendError) {
                              return <ErrorPage error={resendError} />
                            }

                            return (
                              <PatientCaregivers
                                user={user}
                                onRemove={id => {
                                  removeCaregiver({
                                    variables: {
                                      patientId: this.props.user.patient.id,
                                      caregiverId: id,
                                    },
                                  })
                                }}
                                onMessage={this.handleMessage}
                                onOdm={this.handleOdm}
                                onCall={onCall}
                                onResend={id => {
                                  const variables = { id }
                                  return resendInvite({ variables })
                                }}
                                onChangeSendOptions={(cId, val) => {
                                  this.handleChangeSendOptions({
                                    caregiverId: cId,
                                    currentValue: val,
                                    patientUserId: this.props.user.id,
                                    mutation: updateCaregiverSendEventOptions,
                                  })
                                }}
                                onEdit={this.handleEdit}
                                // if (caregiversLoading && networkStatus !== 6)

                                // loading={caregiversLoading}
                                loading={caregiversLoading && networkStatus !== 6}
                                {...rest}
                              />
                            )
                          }}
                        </Mutation>
                      )
                    }}
                  </Mutation>
                )
              }}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}
