import React from 'react'
import PropTypes from 'prop-types'

import PatientAccessCode from './PatientAccessCode'
import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import useAccessCode from '../../../hooks/useAccessCode'

PatientAccessCodeContainer.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    accessCode: PropTypes.shape({
      code: PropTypes.string,
      isExpired: PropTypes.bool,
    }),
  }).isRequired,
}

// CaregiverAccessCode section container
export default function PatientAccessCodeContainer({ user }) {
  const [loading, error, getNewCode] = useAccessCode()

  if (!loading && error) return <ErrorPage error={error} />

  if (user.accessCode === null) {
    user.accessCode = { id: '-2', code: null, isExpired: false }
  }

  return <PatientAccessCode accessCode={user.accessCode} loading={loading} onGetNewCode={() => getNewCode(user.id)} />
}
