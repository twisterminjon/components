import React, { Component } from 'react'

import { Query, Mutation } from 'react-apollo'
import CaregiversQl from '../../../services/CaregiversQl'
import PatientsQl from '../../../services/PatientsQl'

import { urlAddModeFuzzy } from '@shared/helpers'
import CaregiverForm from './CaregiverForm'
import { MainLoader } from '@shared/components'

import debug from 'debug'
const d = debug('project:CaregiversFormContainer')

export default class CaregiverFormContainer extends Component {
  getDefaults = () => {
    // we maybe adding via a phone number in the url.
    let phone = ''
    if (this.props.match.params.phone) phone = this.props.match.params.phone

    return {
      id: '-1',
      displayName: '',
      phone: phone,
      email: '',
      contactType: 'BOTH',
      caregiver: {
        id: '-1',
      },
    }
  }

  render() {
    const { ...rest } = this.props

    const adding = urlAddModeFuzzy(this.props.location.pathname)
    const caregiverId = this.props.match.params.caregiverId
    const patientId = this.props.match.params.patientId

    adding
      ? d('adding new caregiver with defaults= %O', this.getDefaults())
      : d(`edit caregiver with id=${this.props.match.params.caregiverId}`)

    const CAREGIVER_QUERY = CaregiversQl.getCaregiverV1()
    const PATIENT_QUERY = PatientsQl.getByIdV1()
    const ADD_MUTATION = CaregiversQl.addNewV1()
    const UPDATE_MUTATION = CaregiversQl.update()

    return (
      <Query query={CAREGIVER_QUERY} skip={adding} variables={{ id: caregiverId }}>
        {({ loading, data }) => {
          if (loading && !adding) return <MainLoader />
          return (
            //TO-DO think about more elegant solutions without extra call
            <Query query={PATIENT_QUERY} skip={!adding} variables={{ id: patientId }}>
              {({ loading, data: patientData }) => {
                if (loading) return <MainLoader />
                return (
                  <Mutation mutation={ADD_MUTATION}>
                    {(add, { loading: addLoading }) => {
                      // Note: Errors handled by calling component

                      return (
                        <Mutation mutation={UPDATE_MUTATION}>
                          {(update, { loading: addLoading }) => {
                            // Note: Errors handled by calling component

                            return (
                              <CaregiverForm
                                user={adding ? this.getDefaults() : data.user}
                                patient={adding ? patientData.user : data.user}
                                adding={adding}
                                onSave={adding ? add : update}
                                loading={addLoading}
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
            </Query>
          )
        }}
      </Query>
    )
  }
}
