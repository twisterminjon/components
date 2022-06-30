import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'

import EnterpriseQl from '../../../services/EnterpriseQl'
import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import Interpreters from './Interpreters'
import SpinnerDots from '../../Atoms/SpinnerDots/SpinnerDots'

import StorageUtils from '../../../Helpers/StorageUtils'

InterpretersContainer.propTypes = {
  /** Function called to start a call */
  onStartCall: PropTypes.func.isRequired,
}

/**
 * @typedef {Object} InterpreterLanguage
 * @property {string} id
 * @property {string} name
 */

export default function InterpretersContainer({ onStartCall }) {
  const { data, loading, error } = useQuery(EnterpriseQl.getInterpreterLanguages())

  /**
   * A shallow-copy of translation languages, so that we can prepend to the
   * array w/o affecting the original data.
   *
   * @type {InterpreterLanguage[]}
   */
  const interpreterLanguages =
    (data && data.me && data.me.enterprise && [...data.me.enterprise.translationLanguages]) || []

  // Add "echo" language, if option is set via local storage
  if (StorageUtils.getIsInterpreterEchoLanguageEnabled()) {
    interpreterLanguages.unshift({
      id: 'echo',
      name: 'Echo',
    })
  }

  if (loading) return <SpinnerDots style={{ width: '100%', height: '100%' }} />
  if (error) return <ErrorPage error={error} />
  if (data) {
    return <Interpreters languages={interpreterLanguages} onStartCall={onStartCall} />
  }
}
