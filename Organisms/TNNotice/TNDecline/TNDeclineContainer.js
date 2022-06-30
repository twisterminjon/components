import React, { useCallback, useContext, useEffect } from 'react'
import { useMutation } from 'react-apollo'

import { CurrentUserContext } from '@shared/providers'
import { ErrorPage } from '@shared/components'
import { AuthUtils } from '@shared/helpers'

import UsersQl from '../../../../services/UsersQl'

import TNDecline from './TNDecline'

export default function TNDeclineContainer({ history }) {
  const user = useContext(CurrentUserContext)
  const terms = user.currentTermsActivity

  const [declineTerms, { error }] = useMutation(UsersQl.declineTerms(), {
    awaitRefetchQueries: true,
    refetchQueries: [{ query: UsersQl.myCurrentTermsActivity() }],
  })

  useEffect(() => {
    declineTerms()
  }, [declineTerms])

  const handleClose = useCallback(() => {
    AuthUtils.logout()
    history.replace('/login')
  }, [history])

  const handleReturn = useCallback(() => {
    history.replace('/app/terms-and-notices')
  }, [history])

  if (error || !terms) {
    return <ErrorPage error={error} />
  }

  return <TNDecline onReturn={handleReturn} onCloseApp={handleClose} />
}
