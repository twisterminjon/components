import React, { useContext, useEffect } from 'react'
import { NetworkStatus } from 'apollo-client'
import PropTypes from 'prop-types'

import { useMutation, useQuery } from 'react-apollo'
import UsersQl from '../../../services/UsersQl'
import { CurrentUserContext } from '@shared/providers'

import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import UpdatePhoneForm from './UpdatePhoneForm'

UpdatePhoneFormContainer.propTypes = {
  /** Can show or be hidden */
  show: PropTypes.bool,

  /** Called when the close button is clicked */
  onClose: PropTypes.func.isRequired,
}

UpdatePhoneFormContainer.defaultProps = {
  show: false,
}

const GET_USER_INFO = UsersQl.getByIdShort()
const PHONE_MUTATION = UsersQl.updatePhone()

export default function UpdatePhoneFormContainer({ show, onClose }) {
  const currentUser = useContext(CurrentUserContext)
  const { data, error, refetch, networkStatus } = useQuery(GET_USER_INFO, {
    fetchPolicy: 'network-only',
    variables: { id: currentUser.id },
    skip: currentUser.id < 0,
    notifyOnNetworkStatusChange: true,
  })

  useEffect(() => {
    refetch()
  }, [show, refetch])

  const [updatePhoneNumber, { loading: mutationLoading }] = useMutation(PHONE_MUTATION)

  if (error) {
    return <ErrorPage error={error} />
  }

  const phone = data ? data.user.phone : ''

  return (
    <UpdatePhoneForm
      key={phone}
      show={show}
      currentUserId={currentUser.id}
      onClose={onClose}
      currentPhone={phone}
      phoneLoading={NetworkStatus.refetch === networkStatus}
      updateLoading={mutationLoading}
      onUpdatePhone={updatePhoneNumber}
    />
  )
}
