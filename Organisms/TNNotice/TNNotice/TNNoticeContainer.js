import React, { useCallback, useContext } from 'react'

import { CurrentUserContext } from '@shared/providers'
import TNNotice from './TNNotice'
import TNNoticeType from './TNNoticeType'
import { ErrorPage } from '@shared/components'

export default function TNNoticeContainer({ history }) {
  const user = useContext(CurrentUserContext)

  const handleContinue = useCallback(() => {
    history.replace('/app/terms-and-notices')
  }, [history])

  const terms = user.currentTermsActivity
  if (!terms) return <ErrorPage />

  return <TNNotice type={terms.isUpdated ? TNNoticeType.UPDATE : TNNoticeType.WELCOME} onContinue={handleContinue} />
}
