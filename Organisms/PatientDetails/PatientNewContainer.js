import React, { useCallback, useMemo } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/react-hooks'

import { featureRequiredPatientProvider } from '@shared/helpers'

import PatientsQl from '../../../services/PatientsQl'
import EnterpriseQl from '../../../services/EnterpriseQl'

import ErrorMessages from '../../../ErrorMessages.json'
import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import PatientNew from './PatientNew'

import './PatientDetails.css'

const CREATE_PATIENT_MUTATION = PatientsQl.createPatient()
const ENTERPRISE = EnterpriseQl.getById()
const DEFAULT_LANGUAGE = EnterpriseQl.getLanguage()
const LANGUAGE_LOOKUP_QUERY = EnterpriseQl.getLanguagesLookupList()

export default function PatientNewContainer() {
  const { enterpriseId } = useParams()
  const history = useHistory()

  const handleCancel = useCallback(() => history.goBack(), [history])

  const handleSuccess = useCallback(
    data => {
      history.push(`/app/enterprises/${enterpriseId}/patientsV1/${data.createPatient.user.id}`, {
        fromAddPatient: true,
      })
    },
    [enterpriseId, history]
  )

  const { data: languagesData } = useQuery(LANGUAGE_LOOKUP_QUERY)
  const { data: defaultLanguage } = useQuery(DEFAULT_LANGUAGE, { variables: { id: enterpriseId } })
  const { data: enterpriseData } = useQuery(ENTERPRISE, {
    variables: { id: enterpriseId },
    fetchPolicy: 'cache-and-network',
  })
  const [createPatient, { loading: creating, error: createError }] = useMutation(CREATE_PATIENT_MUTATION, {
    onCompleted: handleSuccess,
  })

  const teamRequired = useMemo(() => featureRequiredPatientProvider(enterpriseData), [enterpriseData])
  const isIdentifierDupe = useMemo(() => {
    return createError ? createError.message.startsWith('GraphQL error: Patient exists for identifier ') : false
  }, [createError])

  if (createError && !isIdentifierDupe && !createError.message.includes(ErrorMessages.Create.INVALID_PHONE_FORMAT)) {
    return <ErrorPage error={createError} code="SAVE_PATIENT" />
  }

  if (languagesData && defaultLanguage && enterpriseData) {
    return (
      <PatientNew
        enterpriseLanguage={defaultLanguage.enterprise.language.code}
        onSave={createPatient}
        onCancel={handleCancel}
        identifierDupe={isIdentifierDupe}
        loading={creating}
        languages={languagesData.languages}
        enterpriseId={enterpriseId}
        teamRequired={teamRequired}
      />
    )
  }

  return null
}
