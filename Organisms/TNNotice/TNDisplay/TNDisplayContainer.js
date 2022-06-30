import React, { useCallback, useContext, useEffect, useMemo } from 'react'
import { useMutation } from 'react-apollo'

import { CurrentUserContext } from '@shared/providers'
import { ErrorPage } from '@shared/components'

import UsersQl from '../../../../services/UsersQl'
import TNDisplay from './TNDisplay'
import TNDisplayType from './TNDisplayType'

export default function TNDisplayContainer({ history, location }) {
  const user = useContext(CurrentUserContext)
  const terms = user.currentTermsActivity
  const type = useMemo(() => (location.state && location.state.type) || TNDisplayType.AGREE, [location.state])

  const [viewTerms, { error: viewError }] = useMutation(UsersQl.viewTerms())
  const [acceptTerms, { loading: accepting, error: acceptError }] = useMutation(UsersQl.acceptTerms(), {
    awaitRefetchQueries: true,
    refetchQueries: [{ query: UsersQl.myCurrentTermsActivity() }],
    onCompleted: () => history.goBack(),
  })

  useEffect(() => {
    viewTerms()
  }, [viewTerms])

  const handleDisagree = useCallback(() => {
    history.replace('/app/terms-decline')
  }, [history])

  if (viewError || acceptError || !terms) {
    return <ErrorPage error={viewError || acceptError} />
  }

  return (
    <TNDisplay
      type={type}
      agreeLoading={accepting}
      text={terms.termsNotice.text}
      onAgree={acceptTerms}
      onDisagree={handleDisagree}
    />
  )
}
