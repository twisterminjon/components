import { useContext, useEffect, useMemo } from 'react'

import { CurrentUserContext } from '@shared/providers'

export default function TNContainer({ history, location }) {
  const user = useContext(CurrentUserContext)

  const showTerms = useMemo(() => {
    const termsActivity = user.currentTermsActivity
    return !!termsActivity && termsActivity.agreementRequired
  }, [user.currentTermsActivity])

  useEffect(() => {
    if (showTerms && !location.pathname.startsWith('/app/terms-')) {
      history.push('/app/terms-welcome')
    }
  }, [history, location.pathname, showTerms])

  return null
}
