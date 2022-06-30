import React from 'react'
import PropTypes from 'prop-types'

import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'

import CaregiverAccessCode from './CaregiverAccessCode'
import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import useAccessCode from '../../../hooks/useAccessCode'

CaregiverAccessCodeContainer.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    accessCode: PropTypes.shape({
      code: PropTypes.string,
      isExpired: PropTypes.bool,
    }),
  }).isRequired,
}

const CAREGIVER_QUERY = gql`
  query getCaregiver($id: ID!) {
    user(where: { id: $id }) {
      id
      accessCode {
        id
        code
        isExpired
      }
    }
  }
`

// CaregiverAccessCode section container
export default function CaregiverAccessCodeContainer({ user }) {
  const { loading: cgLoading, error: cgError, data } = useQuery(CAREGIVER_QUERY, {
    variables: { id: user.id },
  })
  const [loading, error, getNewCode] = useAccessCode()

  if (!loading && error) return <ErrorPage error={error} />
  if (!data && cgError) return <ErrorPage error={cgError} />

  if (data && data.user.accessCode === null) {
    data.user.accessCode = { id: '-2', code: null, isExpired: false }
  }

  return (
    <CaregiverAccessCode
      accessCode={data ? data.user.accessCode : { id: '-1', code: null, isExpired: false }}
      loading={loading || cgLoading}
      onGetNewCode={() => getNewCode(user.id)}
    />
  )
}
