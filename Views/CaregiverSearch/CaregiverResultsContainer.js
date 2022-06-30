import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Query } from 'react-apollo'
import CaregiversQl from '../../../services/CaregiversQl'

import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import ModalYesNoToast from '../../Molecules/ModalYesNoToast/ModalYesNoToast'
import CaregiverSearchNotFound from '../../Views/CaregiverSearch/CaregiverSearchNotFound'
import CaregiverResults from './CaregiverResults'
import { isPhoneNumberValid } from '@shared/helpers'

import debug from 'debug'
const d = debug('project:CaregiversResultsContainer')

export default class CaregiverResultsContainer extends Component {
  static propTypes = {
    /** Value to search for */
    searchTerm: PropTypes.string.isRequired,
    /** The patient we are assigning to (user type) */
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      patient: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    /** Called after clicking add new */
    onAdd: PropTypes.func.isRequired,
    /** Called after a caregiver is select */
    onSelect: PropTypes.func.isRequired,
  }

  state = {
    showAddConfirmation: false,
  }

  handleSelect = (caregiverId, caregiverName) => {
    this.setState({
      showAddConfirmation: true,
      toAddId: caregiverId,
      toAddName: caregiverName,
    })
  }

  handleAssign = () => {
    this.props.onSelect(this.state.toAddId, this.props.user.patient.id)
  }

  hideConfirmation = () => {
    this.setState({
      showAddConfirmation: false,
      toAddId: '',
      toAddName: '',
    })
  }

  handleAddWhenNotFound = () => {
    const patientId = this.props.match.params.patientId
    const phone = this.props.searchTerm

    this.props.history.push(`/app/patients/${patientId}/caregivers/add/${phone}`)
  }

  render() {
    const { searchTerm, onAdd, user } = this.props
    const { showAddConfirmation, toAddName } = this.state

    const CAREGIVER_SEARCH_QUERY = CaregiversQl.getCaregiverByPhone()

    // handle bad searchTerm
    if (!isPhoneNumberValid(searchTerm)) {
      d(`canceling search, to short, phone=${searchTerm}`)
      return (
        <p className="caregiverresults center" style={{ paddingTop: 20, fontSize: 20 }}>
          Please enter a valid phone number
        </p>
      )
    }

    return (
      <Query
        query={CAREGIVER_SEARCH_QUERY}
        variables={{ phone: searchTerm, patientUserId: user.id }}
        fetchPolicy="network-only">
        {({ loading, error, data }) => {
          if (error) return <ErrorPage error={error} />

          if (!loading && data.caregivers.length === 0) {
            d('no results found')
            return (
              <CaregiverSearchNotFound
                className="caregiverresults-not-found"
                onAdd={this.handleAddWhenNotFound}
                data-testid="caregiver-results-none-found"
              />
            )
          }

          const caregivers = data ? data.caregivers : null

          return (
            <React.Fragment>
              <ModalYesNoToast
                show={showAddConfirmation}
                title={`Would you like to assign ${toAddName} as a Caregiver?`}
                message={`They will be able to recieve messages and/or calls on behalf of  ${user.displayName}.`}
                confirmButtonText="Assign"
                rejectButtonText="Cancel"
                onConfirm={this.handleAssign}
                onReject={this.hideConfirmation}
              />

              <CaregiverResults loading={loading} caregivers={caregivers} onAdd={onAdd} onSelect={this.handleSelect} />
            </React.Fragment>
          )
        }}
      </Query>
    )
  }
}
