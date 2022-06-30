import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Query, Mutation } from 'react-apollo'
import PatientsQl from '../../../services/PatientsQl'
import EnterpriseQl from '../../../services/EnterpriseQl'

import PatientPrograms from './PatientPrograms'
import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import ServerIssue from '../../Views/ServerIssue/ServerIssueContainer'
import { ProjectDate } from '@shared/helpers'

import './PatientDetails.css'

export default class PatientProgramsContainer extends Component {
  static propTypes = {
    /** A patient to display */
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      phone: PropTypes.string,
      email: PropTypes.string,
      patient: PropTypes.shape({
        id: PropTypes.string,
        contactType: PropTypes.string,
        language: PropTypes.shape({
          name: PropTypes.string,
        }),
        enrollments: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string,
            completedOn: PropTypes.string,
            program: PropTypes.shape({
              id: PropTypes.string.isRequired,
              name: PropTypes.string.isRequired,
              isActive: PropTypes.bool.isRequired,
            }),
          })
        ),
        programs: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
          })
        ),
      }),
    }).isRequired,
  }

  handleEditProgram = (enrollmentId, id, name) => {
    const { enterpriseId } = this.props.match.params

    this.props.history.push(
      `/app/enterprises/${enterpriseId}/patientsV1/${this.props.user.id}/care-programs/${id}/enrollments/${enrollmentId}/`
    )
  }

  render() {
    const { user, ...rest } = this.props

    const ENTERPRISE_PROGRAMS_QUERY = EnterpriseQl.getProgramsLookupList()
    const PROGRAM_ADD_MUTATION = PatientsQl.enrollPatient()
    const PATIENT_QUERY = PatientsQl.getByIdV1()

    return (
      <Query query={ENTERPRISE_PROGRAMS_QUERY} variables={{ id: user.enterprise.id }}>
        {({ loading, data, refetch, error }) => {
          if (loading) return null

          if (error) {
            // unhandled error
            if (!error.message.includes('Network error: Failed to fetch')) {
              return <ErrorPage error={error} />
            }

            // fetch error (api server down) AND no data
            if (!data && error.message.includes('Network error: Failed to fetch')) {
              return <ServerIssue />
            }
          }

          const programs = data.enterprise.programs

          return (
            <Mutation
              mutation={PROGRAM_ADD_MUTATION}
              refetchQueries={[{ query: PATIENT_QUERY, variables: { id: user.id } }]}>
              {(addProgram, { error: addError, loading: addLoading, data: addData }) => {
                if (addError) {
                  // unhandled error
                  if (!addError.message.includes('Network error: Failed to fetch')) {
                    return <ErrorPage error={addError} />
                  }

                  // fetch error (api server down) AND no data
                  if (!addData && addError.message.includes('Network error: Failed to fetch')) {
                    return <ServerIssue />
                  }
                }

                return (
                  <PatientPrograms
                    enrollments={user.patient.enrollments}
                    onProgramRefresh={() => {
                      refetch()
                    }}
                    onAddProgram={data => {
                      const date = data.when === 'now' ? Date.now() : data.when
                      const variables = {
                        patientId: user.patient.id,
                        programId: data.id,
                        date: ProjectDate(date).format(),
                      }
                      addProgram({ variables })
                    }}
                    onEditProgram={(enrollmentId, id, name) => this.handleEditProgram(enrollmentId, id, name)}
                    programsLookup={programs}
                    loading={addLoading}
                    {...rest}
                  />
                )
              }}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}
