import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { uniqBy } from 'lodash-es'
import { useQuery } from 'react-apollo'

import { MessagesQl } from '@shared/services'
import { useThreadsList, useThreadsUpdate } from '@shared/hooks'
import { CHAT_MAX_THREADS_PER_PAGE } from '../../../config'

import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import ServerIssue from '../../Views/ServerIssue/ServerIssueContainer'
import ThreadList from './ThreadList'
import MessagesEmpty from './MessagesEmpty'
import ThreadListPlaceholder from '../../Organisms/ThreadList/ThreadListPlaceholder'

const QUERY_THREADS = MessagesQl.getThreadsPagination

ThreadListContainer.propTypes = {
  /** Called after the add group action */
  onShowGroupEditor: PropTypes.func.isRequired,
}

export default function ThreadListContainer({ onShowGroupEditor, history, match }) {
  const { threadId } = match.params
  const [searchValue, setSearchValue] = useState('')
  const [hasMoreThreads, setHasMoreThreads] = useState(true)

  const { loading, error, data, fetchMore } = useQuery(QUERY_THREADS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      first: CHAT_MAX_THREADS_PER_PAGE,
      name: searchValue,
    },
  })

  // Custom refetch to avoid resetting unreadMessagesCount
  // This prevents conflicts between unreadMessagesCount received from
  // socket events and from the queries. Since queries are generally
  // slower, they will overwrite unreadMessagesCount with the old value without this.
  const refetch = useCallback(() => {
    const variables = { first: CHAT_MAX_THREADS_PER_PAGE, name: searchValue }
    return fetchMore({
      variables,
      updateQuery(prev, { fetchMoreResult }) {
        if (!prev) {
          return fetchMoreResult
        }

        return {
          ...fetchMoreResult,
          secureMessageThreads: fetchMoreResult.secureMessageThreads.map(thread => {
            const oldThread = prev.secureMessageThreads.find(oldThread => oldThread.id === thread.id)

            if (!oldThread) {
              return thread
            }

            if (oldThread.timestamp > thread.timestamp) {
              return oldThread
            } else {
              return {
                ...thread,
                unreadMessagesCount: oldThread ? oldThread.unreadMessagesCount : thread.unreadMessagesCount,
              }
            }
          }),
        }
      },
    }).catch(() => {})
  }, [fetchMore, searchValue])

  useThreadsUpdate(refetch)

  const threads = useThreadsList(data ? data.secureMessageThreads : [], threadId)

  const handleThreadChange = useCallback(id => history.push(`/app/messages/${id}`), [history])

  const handleReachBottom = useCallback(async () => {
    if (!data) {
      return Promise.resolve()
    }

    try {
      await fetchMore({
        variables: {
          first: CHAT_MAX_THREADS_PER_PAGE,
          skip: data ? data.secureMessageThreads.length : 0,
          name: searchValue,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          const newThreadsAmount = fetchMoreResult && fetchMoreResult.secureMessageThreads.length
          if (prev !== undefined && (!prev || !newThreadsAmount)) {
            setHasMoreThreads(false)
            return prev
          }
          setHasMoreThreads(true)

          const prevThreads = (prev && prev.secureMessageThreads) || []
          const nextThreads = fetchMoreResult.secureMessageThreads || []

          if (nextThreads?.length < CHAT_MAX_THREADS_PER_PAGE) setHasMoreThreads(false)

          return {
            secureMessageThreads: uniqBy([...prevThreads, ...nextThreads], 'id'),
          }
        },
      })
    } catch (err) {
      console.warn('Caught', err)
    }
  }, [searchValue, data, fetchMore])

  useEffect(() => {
    if (searchValue === '') {
      setHasMoreThreads(true)
    }
  }, [searchValue])

  const handleSearch = searchTerm => {
    setHasMoreThreads(true)
    setSearchValue(searchTerm)
  }

  if (error) {
    // unhandled error
    if (!error.message.includes('Network error: Failed to fetch')) {
      return <ErrorPage error={error} />
    }

    // fetch error (api server down) AND no data
    if (!data && error.message.includes('Network error: Failed to fetch')) {
      return <ServerIssue />
    }
  }

  if (loading && !data) return <ThreadListPlaceholder />

  // If the route has a recipient param we got here by clicking on a 'message this user' button.
  // Don't show empty in that case.
  if (data && data.secureMessageThreads.length === 0 && !searchValue) return <MessagesEmpty />

  return (
    <ThreadList
      threads={threads}
      selectedId={threadId}
      onShowGroupEditor={onShowGroupEditor}
      onThreadClick={handleThreadChange}
      onSearch={handleSearch}
      onReachBottom={handleReachBottom}
      hasMoreThreads={hasMoreThreads}
      loading={loading}
    />
  )
}
