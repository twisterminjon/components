import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'

import UsersQl from '../../../services/UsersQl'

import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import ServerIssue from '../../Views/ServerIssue/ServerIssueContainer'
import Staff from './Staff'
import SearchPlaceholder from '../../Molecules/UserCardCall/UserCardCallPlaceholder'

import { usePaginationQuery } from '@shared/hooks'

import debug from 'debug'
const d = debug('project:SearchContainer')

StaffContainer.propTypes = {
  /** Function called to start a call */
  onStartCall: PropTypes.func.isRequired,
  /** If true, will show the message button */
  canMessage: PropTypes.bool,
  /** If true, will show the dial button */
  canCall: PropTypes.bool,
}
StaffContainer.defaultProps = {
  canMessage: null,
}

const SEARCH_QUERY = UsersQl.getStaffUsers()

export default function StaffContainer({ onStartCall, canMessage, canCall, ...rest }) {
  const [searchValue, setSearchValue] = useState(null)

  const {
    apolloContext: { loading, error, data, networkStatus },
    paginationContext: { pageNumber, setPageNumber },
  } = usePaginationQuery(
    SEARCH_QUERY,
    {
      variables: {
        displayName: searchValue,
      },
    },
    {
      mergePath: 'me.paginatedCanCallUsers',
    }
  )

  const handleUserMessage = useCallback(
    user => {
      rest.history.push(`/app/messages/user/${user.id}`)
    },
    [rest.history]
  )

  const handleSearchChange = useCallback(
    searchValue => {
      if (searchValue) {
        setPageNumber(0)
      }

      setSearchValue(searchValue)
    },
    [setPageNumber]
  )

  const users =
    (data && data.me && data.me.paginatedCanCallUsers && data.me.paginatedCanCallUsers.filter(user => user.isActive)) ||
    []

  // unhandled error
  if (error) {
    if (!error.message.includes('Network error: Failed to fetch')) {
      d(`SEARCH_QUERY failed failed on unhandled error`)
      return <ErrorPage error={error} />
    }
    if (!data && error.message.includes('Network error: Failed to fetch')) {
      d(`SEARCH_QUERY failed trying to reach api server`)
      return <ServerIssue />
    }
  }

  // fetch error (api server down) AND no data
  if (!users && loading && networkStatus !== 6) {
    d(`SEARCH_QUERY loading value ${loading}, showing placeholder`)
    return <SearchPlaceholder />
  }

  return (
    <Staff
      users={users}
      onStartCall={onStartCall}
      canMessage={canMessage}
      canCall={canCall}
      onMessageUser={handleUserMessage}
      loading={loading}
      pageNumber={pageNumber}
      onPageNumberChange={setPageNumber}
      onSearchChange={handleSearchChange}
    />
  )
}
