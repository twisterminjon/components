import React, { useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'

import { useQuery, useMutation } from '@apollo/react-hooks'
import UsersQl from '../../../services/UsersQl'
import { canCallStaff, canCallPatients } from '@shared/helpers'

import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import SpinnerDots from '../../Atoms/SpinnerDots/SpinnerDots'
import CallHistory from './CallHistory'

CallHistoryContainer.propTypes = {
  /** To initiate a call */
  onStartCall: PropTypes.func.isRequired,
}

const QUERY_GET_CALLS = UsersQl.getCallsV1()

const MUTATION_CLEAR_CALLS = UsersQl.getClearCallHistory()

export default function CallHistoryContainer({ onStartCall }) {
  const { data, loading, error, networkStatus } = useQuery(QUERY_GET_CALLS, {
    fetchPolicy: 'cache-and-network',
    pollInterval: 5000,
  })

  const [clearCallHistory] = useMutation(MUTATION_CLEAR_CALLS)

  useEffect(() => {
    clearCallHistory()
  }, [clearCallHistory])

  const { canDialStaff, canDialPatient } = useMemo(() => {
    if (data) {
      const { permissions } = data.me

      return {
        canDialStaff: canCallStaff(permissions),
        canDialPatient: canCallPatients(permissions),
      }
    }

    return { canDialStaff: false, canDialPatient: false }
  }, [data])

  if (loading && networkStatus !== 6) return <SpinnerDots className="callhistory-loader" />

  if (error) {
    return <ErrorPage error={error} />
  }

  return (
    <CallHistory
      calls={data.me.calls}
      canDialPatient={canDialPatient}
      canDialStaff={canDialStaff}
      onDial={onStartCall}
    />
  )
}
