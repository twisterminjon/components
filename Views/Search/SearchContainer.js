import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { uniqBy } from 'lodash-es'

import { useQuery } from 'react-apollo'
import UsersQl from '../../../services/UsersQl'
import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import ServerIssue from '../../Views/ServerIssue/ServerIssueContainer'

import SearchBar from '../../Molecules/SearchBar/SearchBar'
import SearchResults from './SearchResults'
import SearchPlaceholder from '../../Molecules/UserCardCall/UserCardCallPlaceholder'

import debug from 'debug'
const d = debug('project:SearchContainer')

const SEARCH_QUERY = UsersQl.getUsersToCallV1()
const LEN_RESULTS_PER_PAGE = 20

SearchContainer.propTypes = {
  /** If true will display the search screen */
  show: PropTypes.bool,

  /** Function called to start a call */
  onStartCall: PropTypes.func.isRequired,

  /** If true, will show the message button */
  canMessage: PropTypes.bool,

  /** If true, will show the dial button */
  canCall: PropTypes.bool,
}

export default function SearchContainer({ show, onStartCall, canMessage, canCall, ...rest }) {
  const [pageNumber, setPageNumber] = useState(0)
  const [searchValue, setSearchValue] = useState(null)

  // Set page number to 0 each time search value is updated
  useEffect(() => {
    setPageNumber(0)
  }, [searchValue])

  const { loading, error, data, fetchMore } = useQuery(SEARCH_QUERY, {
    variables: {
      offset: 0,
      limit: LEN_RESULTS_PER_PAGE,
      displayName: searchValue,
    },

    // Don't query if not showing
    skip: !show,

    fetchPolicy: 'cache-and-network',
  })

  useEffect(() => {
    if (!pageNumber) {
      return
    }

    fetchMore({
      variables: {
        offset: LEN_RESULTS_PER_PAGE * pageNumber,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!prev) {
          return fetchMoreResult
        }

        const oldUsers = prev && prev.me && prev.me.paginatedCanCallUsers
        const paginatedCanCallUsers = uniqBy([...oldUsers, ...fetchMoreResult.me.paginatedCanCallUsers], 'id')

        const updatedData = {
          ...fetchMoreResult,
          me: {
            ...fetchMoreResult.me,
            paginatedCanCallUsers,
          },
        }

        return updatedData
      },
    }).catch(err => console.warn('Caught', err))
  }, [fetchMore, pageNumber])

  // Force bump to next page of search results
  // Note (jh): This seems to fix issue where pagination stops working if user scrolls real fast through results
  useEffect(() => {
    if (data && !loading && pageNumber === 0 && !searchValue) {
      setPageNumber(1)
    }
  }, [data, loading, pageNumber, searchValue])

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

  if (!show) return null

  // fetch error (api server down) AND no data

  if (!data) {
    d(`SEARCH_QUERY loading value ${loading}, showing placeholder`)
    return <SearchPlaceholder />
  }

  const users = data && data.me.paginatedCanCallUsers.filter(user => user.isActive)

  return (
    <React.Fragment>
      <SearchBar onChange={setSearchValue} />

      <SearchResults
        style={{
          color: 'white',
        }}
        users={users}
        onStartCall={onStartCall}
        canMessage={canMessage}
        canCall={canCall}
        loading={loading}
        pageNumber={pageNumber}
        onPageNumberChange={setPageNumber}
        {...rest}
      />
    </React.Fragment>
  )
}
