import React, { Component } from 'react'

import { Query, Mutation } from 'react-apollo'
import PatientsQl from '../../../services/PatientsQl'
import CaregiversQl from '../../../services/CaregiversQl'

import CaregiverResultsContainer from '../../Views/CaregiverSearch/CaregiverResultsContainer'
import CaregiverSearch from './CaregiverSearch'
import ErrorPage from '../../Views/ErrorPage/ErrorPage'

import debug from 'debug'
const d = debug('project:CaregiversSearchContainer')

export default class CaregiverSearchContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fetchCaregivers: false,
      phone: '',
    }
  }

  handleSearch = phone => {
    this.setState({ phone })

    d(`Searching for phone=${phone}`)
  }

  handleCancel = () => {
    d(`closing search page`)

    this.props.history.goBack()
  }

  handleAdd = () => {
    const patientId = this.props.match.params.patientId
    d(`navigating to add caregiver with patient user id=${patientId}`)

    this.props.history.push(`/app/patients/${patientId}/caregivers/add`)
  }

  handleAssign = (caregiverId, patientId, assign) => {
    d(`assigning caregiver id=${caregiverId} to patient id=${patientId}`)
    assign({
      variables: { caregiverId, patientId },
    })
    this.props.history.goBack()
  }

  render() {
    const { ...rest } = this.props
    const { phone } = this.state

    const QUERY_PATIENT_ID = PatientsQl.getPatientIds()
    const ASSIGN_CAREGIVER = CaregiversQl.assignCaregiver()

    return (
      <Query query={QUERY_PATIENT_ID} variables={{ id: this.props.match.params.patientId }}>
        {({ loading, error, data }) => {
          if (loading) return null
          if (error) return <ErrorPage error={error} />

          return (
            <Mutation mutation={ASSIGN_CAREGIVER}>
              {(assign, { loading, error }) => {
                if (error) return <ErrorPage error={error} />

                return (
                  <React.Fragment>
                    <CaregiverSearch onSearch={this.handleSearch} onCancel={this.handleCancel} onAdd={this.handleAdd} />
                    {phone !== '' && (
                      <CaregiverResultsContainer
                        user={data.user}
                        searchTerm={phone}
                        onAdd={this.handleAdd}
                        onSelect={(caregiverId, patientId) => {
                          this.handleAssign(caregiverId, patientId, assign)
                        }}
                        {...rest}
                      />
                    )}
                  </React.Fragment>
                )
              }}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}
