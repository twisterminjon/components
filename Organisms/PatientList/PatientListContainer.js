import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

import { debounce, filter, orderBy } from 'lodash-es'

import mergeArraysPatientsRoster from './mergeArraysPatientsRoster'
import PatientsQl from '../../../services/PatientsQl'

import PatientList from './PatientList'
import PatientsEmpty from './PatientsEmpty'
import PatientListPlaceholder from '../../Organisms/PatientList/PatientListPlaceholder'
import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import ServerIssue from '../../Views/ServerIssue/ServerIssueContainer'
import UnauthorizedPage from '../../Views/UnauthorizedPage/UnauthorizedPage'
import ErrorMessages from '../../../ErrorMessages.json'

import { EVT_PATIENT_LIST_UPDATED, usePaginationQuery } from '@shared/hooks'

const PATIENT_ROSTER_ENTERPRISES_QUERY = PatientsQl.getPatientRosterEnterprises()
const ENTERPRISE_PATIENTS_QUERY = PatientsQl.getEnterprisePatientsV1()

PatientListContainer.propTypes = {
  /** Search filter string */
  patientsFilter: PropTypes.string,

  /** Selected enterprise id */
  enterpriseId: PropTypes.string,

  /** Execute on new selected enterprise */
  onEnterpriseChanged: PropTypes.func.isRequired,
}

PatientListContainer.defaultProps = {
  patientsFilter: '',
}

export default function PatientListContainer({ patientsFilter, enterpriseId, onEnterpriseChanged, ...rest }) {
  const {
    apolloContext: { data: enterprisesData, error: enterprisesError, loading: enterprisesLoading },
    paginationContext: { pageNumber: enterprisesPageNumber, setPageNumber: setEnterprisesPageNumber },
  } = usePaginationQuery(
    PATIENT_ROSTER_ENTERPRISES_QUERY,
    // NOTE: Default Apollo props are already supplied via usePaginationQuery
    {
      syncEventNames: [EVT_PATIENT_LIST_UPDATED],
    },
    {
      mergePath: 'me.patientRosterEnterprises',
    }
  )

  const handleEnterpriseChange = useCallback(
    newEnterpriseId => {
      if (newEnterpriseId !== enterpriseId) {
        onEnterpriseChanged(newEnterpriseId)
        rest.history.replace(`/app/enterprises/${newEnterpriseId}/patientsV1`)
      }
    },
    [enterpriseId, onEnterpriseChanged, rest.history]
  )

  const enterprise = useEnterprise({ enterpriseId, enterprisesData })

  const [selectedPatientId, setSelectedPatientId] = useState(null)

  const [patientsSearchValue, setPatientsSearchValue] = useState(null)

  useEffect(() => {
    if (enterprisesData && enterprise) {
      const enterprises = enterprisesData.me.patientRosterEnterprises
      const isEnterpriseAvailable = enterprises.some(({ id }) => enterprise.id === id)
      if (!isEnterpriseAvailable) {
        rest.history.replace(`/app/restricted`)
      }
    }
  }, [enterprise, enterprisesData, rest.history])

  const {
    apolloContext: {
      data: patientsData,
      error: patientsError,
      loading: patientsLoading,
      networkStatus: patientsNetworkStatus,
    },
    paginationContext: { pageNumber: patientsPageNumber, setPageNumber: setPatientsPageNumber },
  } = usePaginationQuery(
    ENTERPRISE_PATIENTS_QUERY,
    {
      skip: !enterprise,
      variables: {
        enterpriseId: enterprise && enterprise.id,
        displayName: patientsSearchValue,
      },
      syncEventNames: [EVT_PATIENT_LIST_UPDATED],
    },
    {
      onUpdateQuery: mergeArraysPatientsRoster('enterprise.patients'),
    }
  )

  useEffect(() => {
    const _setPatientsSearchValue = debounce(patientsFilter => {
      setPatientsPageNumber(0)

      setPatientsSearchValue(patientsFilter)
    }, 250)

    _setPatientsSearchValue(patientsFilter)

    return function unmount() {
      _setPatientsSearchValue.cancel()
    }
  }, [patientsFilter, setPatientsSearchValue, setPatientsPageNumber])

  useEffect(() => {
    if (enterprise) {
      setPatientsPageNumber(0)
    }
  }, [enterprise, setPatientsPageNumber])

  const patients = patientsData ? patientsData.enterprise.patients : []

  const handlePatientStatusUpdate = () => {
    // We need to apply the filter for displayName one more time as the paginated values
    // that were still being fetched could have a different search term than the current (last)
    // one
    let patientsList = orderBy(patients, ['isActive', 'overallStatus', 'displayName'], ['desc', 'asc', 'asc'])
    if (patientsSearchValue)
      patientsList = filter(patientsList, p => p.displayName.toLowerCase().includes(patientsSearchValue.toLowerCase()))
    return patientsList
  }

  const handlePatientChange = useCallback(
    patientId => {
      rest.history.push(`/app/enterprises/${enterprise.id}/patientsV1/${patientId}`)
      setSelectedPatientId(patientId)
    },
    [enterprise, rest.history]
  )

  // enterprises fetch error
  if (enterprisesError) {
    return <ErrorPage error={enterprisesError} />
  }

  if (!enterprise || (!patientsData && patientsLoading && patientsNetworkStatus !== 3 && patientsNetworkStatus !== 6)) {
    return <PatientListPlaceholder {...rest} />
  }

  if (patientsError) {
    // handle no patients in enterprise
    if (patientsError.message.includes('No Enterprise with value')) {
      return <PatientsEmpty {...rest} />
    }

    if (patientsError.message.includes(ErrorMessages.NOT_ALLOWED)) {
      return <UnauthorizedPage {...rest} />
    }

    // unhandled error
    if (!patientsError.message.includes('Network error: Failed to fetch')) {
      return <ErrorPage error={patientsError} />
    }

    // fetch error (api server down) AND no data
    if (!patientsError && patientsError.message.includes('Network error: Failed to fetch')) {
      return <ServerIssue />
    }
  }

  const enterprises = enterprisesData ? enterprisesData.me.patientRosterEnterprises : []

  return (
    <PatientList
      enterprises={enterprises}
      patients={patients}
      onEnterpriseChange={handleEnterpriseChange}
      onPatientChange={handlePatientChange}
      selectedEnterprise={enterprise.id ? enterprise : undefined}
      selectedPatientId={selectedPatientId}
      onPatientStatusUpdate={handlePatientStatusUpdate}
      patientsLoading={patientsLoading}
      patientsPageNumber={patientsPageNumber}
      patientsOnPageNumberChange={setPatientsPageNumber}
      enterprisesLoading={enterprisesLoading}
      enterprisesPageNumber={enterprisesPageNumber}
      enterprisesOnPageNumberChange={setEnterprisesPageNumber}
      {...rest}
    />
  )
}

function useEnterprise({ enterpriseId, enterprisesData }) {
  const selectedEnterprise = useMemo(() => {
    if (enterprisesData && enterprisesData.me.patientRosterEnterprises.length > 0) {
      return enterprisesData.me.patientRosterEnterprises.filter(e => e.id === enterpriseId)[0]
    }
  }, [enterpriseId, enterprisesData])

  const firstEnterprise = useMemo(() => {
    if (enterprisesData && enterprisesData.me.patientRosterEnterprises.length > 0) {
      return enterprisesData.me.patientRosterEnterprises[0]
    }
  }, [enterprisesData])

  return selectedEnterprise ? selectedEnterprise : firstEnterprise
}
