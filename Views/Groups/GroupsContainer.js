import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Loader } from 'semantic-ui-react'
import { useQuery } from 'react-apollo'

import { useSyncQuery, EVT_USER_STATUS_UPDATED } from '@shared/hooks'
import { AuthUtils, mergeArrays } from '@shared/helpers'
import ErrorMessages from '../../../ErrorMessages.json'
import GroupsQl from '../../../services/GroupsQl'

import GroupDisplay from './GroupDisplay'
import GroupDisplayEmpty from './GroupDisplayEmpty'
import UnauthorizedPage from '../UnauthorizedPage/UnauthorizedPage'
import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import ServerIssue from '../../Views/ServerIssue/ServerIssueContainer'

const LEN_RESULTS_PER_PAGE = 20

GroupsContainer.propTypes = {
  /** Start a call with a user */
  onStartCall: PropTypes.func.isRequired,

  /** Start a group call */
  onStartGroupCall: PropTypes.func.isRequired,

  /** Url to the enterprise logo */
  enterpriseLogo: PropTypes.string.isRequired,

  /** If true, will show the message button */
  canMessage: PropTypes.bool,

  /** If true, will show the dial button */
  canCall: PropTypes.bool,
}

export default function GroupsContainer({
  onStartCall,
  onStartGroupCall,
  enterpriseLogo,
  canMessage,
  canCall,
  match,
  history,
  ...rest
}) {
  const userId = useMemo(() => AuthUtils.getUserId(), [])
  const groupId = useMemo(() => match.params.groupId, [match.params.groupId])

  const [pageNumber, setPageNumber] = useState(0)

  const { loading, data, error, networkStatus, fetchMore } = useQuery(GroupsQl.getUserGroup(), {
    variables: { groupId, userId, limit: LEN_RESULTS_PER_PAGE, offset: 0 },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })

  useEffect(() => {
    if (!pageNumber) {
      return
    }

    fetchMore({
      variables: { offset: LEN_RESULTS_PER_PAGE * pageNumber },
      updateQuery: mergeArrays('group.users'),
    }).catch(err => console.warn('Caught', err))
  }, [pageNumber, fetchMore])

  const handleGoBack = useCallback(() => {
    history.push('/app/dashboard')
  }, [history])

  const handleGroupCall = useCallback(() => {
    onStartGroupCall(groupId)
  }, [groupId, onStartGroupCall])

  const handleUserMessage = useCallback(
    user => {
      history.push(`/app/messages/user/${user.id}`)
    },
    [history]
  )

  const isAvailable = useIsGroupAvailable({ groupId, userId })

  if (!groupId) return null

  if (loading && !(data && data.group && data.group.users) && networkStatus !== 6) {
    return <Loader active />
  }

  // unhandled error
  if (error) {
    if (error.message.includes(ErrorMessages.NOT_ALLOWED)) {
      return <UnauthorizedPage />
    }

    if (!error.message.includes('Network error: Failed to fetch')) {
      return <ErrorPage error={error} />
    }

    // fetch error (api server down) AND no data
    if (!data) {
      return <ServerIssue />
    }
  }

  const group = (data && data.group) || {}

  if (group.users === undefined || !group.users.length)
    return <GroupDisplayEmpty name={group.name} onGoBack={handleGoBack} enterpriseLogo={enterpriseLogo} />

  return (
    <GroupDisplay
      group={group}
      onGoBack={handleGoBack}
      onGroupCall={handleGroupCall}
      onCallUser={onStartCall}
      enterpriseLogo={enterpriseLogo}
      canMessage={canMessage}
      canCall={canCall}
      onMessageUser={handleUserMessage}
      available={isAvailable}
      loading={loading}
      pageNumber={pageNumber}
      onPageNumberChange={setPageNumber}
      {...rest}
    />
  )
}

/**
 *
 * @return {boolean}
 */
function useIsGroupAvailable({ groupId, userId }) {
  const { data, error } = useSyncQuery(GroupsQl.getUserGroupIsAvailableForCall(), {
    variables: { groupId, userId },
    syncName: 'useIsGroupAvailable',
    syncEventNames: [EVT_USER_STATUS_UPDATED],
  })

  const isAvailable = (data && data.group && data.group.isAvailableForCall) || false

  if (error) {
    console.error(error)
  }

  return isAvailable
}
