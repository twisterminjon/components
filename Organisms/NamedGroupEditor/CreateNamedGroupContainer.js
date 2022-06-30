import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { toast } from 'react-toastify'

import { debounce } from 'lodash-es'

import { useMutation } from 'react-apollo'
import UsersQl from '../../../services/UsersQl'
import MessagesQl from '../../../services/MessagesQl'

import { usePaginationQuery } from '@shared/hooks'

import NamedGroupEditor from './NamedGroupEditor'
import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import ErrorMessages from '../../../ErrorMessages.json'
import { contains } from '@shared/helpers'

const GET_USERS_QUERY = UsersQl.getUsersToMessage()
const CREATE_GROUP_QUERY = MessagesQl.createSecureMessageGroup()

CreateNamedGroupContainer.propTypes = {
  /** Called after the close action */
  onClose: PropTypes.func.isRequired,
}

export default function CreateNamedGroupContainer({ onClose, history }) {
  const [searchValue, setSearchValue] = useState(null)
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(null)

  const [error, setError] = useState(null)

  const {
    apolloContext: { data, loading, error: usersError },
    paginationContext: { pageNumber, setPageNumber },
  } = usePaginationQuery(
    GET_USERS_QUERY,
    {
      variables: {
        displayName: debouncedSearchValue,
      },
    },
    {
      mergePath: 'me.paginatedCanCallUsers',
    }
  )

  useEffect(() => {
    const debounced = debounce(() => {
      // Reset page number each time search value changes
      setPageNumber(0)

      // Send less queries through Apollo
      setDebouncedSearchValue(searchValue)
    }, 250)

    debounced()

    return function unmount() {
      debounced.cancel()
    }
  }, [searchValue, setPageNumber])

  const [createGroup, { loading: createLoading }] = useMutation(CREATE_GROUP_QUERY)

  const handleOnSave = useCallback(
    (groupName, memberIds) => {
      createGroup({ variables: { groupName, memberIds } })
        .then(({ data }) => {
          onClose()

          history.push(`/app/messages/${data.createSecureMessageThread.id}`)
        })
        .catch(e => {
          if (contains(e, ErrorMessages.DUPE_GROUP_NAME)) {
            // show a toast and leave the form open
            toast.info('That group name already exists, please choose a new name')
            return
          }

          // unhandled
          setError(e)
        })
    },
    [createGroup, history, onClose]
  )

  if (usersError) return <ErrorPage error={error} />
  if (error) return <ErrorPage error={error} />

  const users =
    loading && !(data && data.me && data.me.paginatedCanCallUsers)
      ? null
      : data && data.me && data.me.paginatedCanCallUsers

  return (
    <NamedGroupEditor
      loading={createLoading}
      userLookup={users}
      usersLoading={loading}
      onSave={handleOnSave}
      onClose={onClose}
      pageNumber={pageNumber}
      onPageNumberChange={setPageNumber}
      onSearchChange={setSearchValue}
    />
  )
}
