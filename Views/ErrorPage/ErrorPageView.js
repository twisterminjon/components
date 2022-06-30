/** This is a wrapper for the ErrorPage component that is shown via the /error route.
 *
 * You must pass state when routing to error using RR history
 *
 * @example
 *
 * props.history.push('/error', {code: '418', error: "I'm a teapot"})
 */
import React from 'react'

import ErrorPage from './ErrorPage'

export default function ErrorPageView(props) {
  let { code, message } = props.location.state
  if (!code) code = 'unknown'
  if (!message) message = 'unknown'

  return <ErrorPage code={code} message={message} />
}
