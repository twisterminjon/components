import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { useMutation } from 'react-apollo'
import UsersQl from '../../../services/UsersQl'
import { CurrentUserContext } from '@shared/providers'

import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import SettingsForm from './SettingsForm'

SettingsFormContainer.propTypes = {
  /** Can show or be hidden */
  show: PropTypes.bool,

  /** Called when the close button is clicked */
  onClose: PropTypes.func.isRequired,
}

SettingsFormContainer.defaultProps = {
  show: false,
}

const UNITS_MUTATION = UsersQl.changeUnits()

export default function SettingsFormContainer({ show, onClose }) {
  const currentUser = useContext(CurrentUserContext)

  const [changeUnits, { loading, error }] = useMutation(UNITS_MUTATION, {})

  if (error) {
    return <ErrorPage error={error || error} />
  }

  const handleUnitsChange = units => {
    changeUnits({ variables: { id: currentUser.id, units } })
  }

  return (
    <SettingsForm
      show={show}
      onClose={onClose}
      units={currentUser.preferredUnitSystem}
      unitsLoading={loading}
      onUnitsChange={handleUnitsChange}
    />
  )
}
