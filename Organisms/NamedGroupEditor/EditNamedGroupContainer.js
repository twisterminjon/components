import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useQuery, useMutation } from 'react-apollo'
import { toast } from 'react-toastify'
import { debounce, difference } from 'lodash-es'

import { usePaginationQuery } from '@shared/hooks'
import { AuthUtils, BUS_EVENTS, EventBus, contains } from '@shared/helpers'

import MessagesQl from '../../../services/MessagesQl'

import NamedGroupEditor from './NamedGroupEditor'
import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import ErrorMessages from '../../../ErrorMessages.json'

const THREAD_MEMBERS_QUERY = MessagesQl.getThreadGroupNameAndMembers()
const USERS_TO_ADD_QUERY = MessagesQl.getThreadAddableMembers()
const UPDATE_THREAD_MUTATION = MessagesQl.updateSecureMessageThread()

EditNamedGroupContainer.propTypes = {
  /** Called after the close action */
  onClose: PropTypes.func.isRequired,
}

export default function EditNamedGroupContainer({ onClose, ...rest }) {
  const [searchValue, setSearchValue] = useState(null)
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(null)

  const [error, setError] = useState(null)

  const currentUserId = AuthUtils.getUserId()

  // We have to manually pull out the threadId from the route.
  // This component is rendered before RR hits the route and pops the params
  const threadId = rest.location.pathname.split('/').pop()

  const { data: groupNameAndMembers, error: groupNameAndMembersError } = useQuery(THREAD_MEMBERS_QUERY, {
    variables: { threadId },
  })

  const {
    apolloContext: { data: availableUsers, loading: availableUsersLoading, error: availableUsersError },
    paginationContext: { pageNumber, setPageNumber },
  } = usePaginationQuery(
    USERS_TO_ADD_QUERY,
    {
      variables: {
        threadId,
        displayName: debouncedSearchValue,
      },
    },
    {
      mergePath: 'secureMessageThread.paginatedAddMembers',
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

  const [updateGroup, { loading: updating }] = useMutation(UPDATE_THREAD_MUTATION)

  const [groupName, members] = useMemo(() => {
    if (groupNameAndMembers && currentUserId) {
      const { groupName: name, members: allMembers } = groupNameAndMembers.secureMessageThread

      return [name, allMembers.filter(({ id }) => id !== currentUserId)]
    }

    return ['', []]
  }, [currentUserId, groupNameAndMembers])

  const handleUpdate = useCallback(
    (name, newMemberIds) => {
      const oldMemberIds = members.map(({ id }) => id)
      const removeMemberIds = difference(oldMemberIds, newMemberIds)
      const addMemberIds = difference(newMemberIds, oldMemberIds)

      updateGroup({
        variables: { threadId, groupName: name, removeMemberIds, addMemberIds },
      })
        .then(() => {
          EventBus.emit(BUS_EVENTS.GROUP_UPDATED, { threadId })
          onClose()
        })
        .catch(e => {
          if (contains(e, ErrorMessages.GROUP_NAME_BUSY)) {
            toast.info('That group name was already used. Please choose a different one.')
          } else {
            setError(e)
          }
        })
    },
    [members, updateGroup, threadId, onClose]
  )

  if (availableUsersError || groupNameAndMembersError) return <ErrorPage error={error} />

  const paginatedAddMembers =
    (availableUsers && availableUsers.secureMessageThread && availableUsers.secureMessageThread.paginatedAddMembers) ||
    []

  return (
    <NamedGroupEditor
      loading={availableUsersLoading || updating}
      usersLoading={availableUsersLoading}
      groupName={groupName}
      members={members}
      userLookup={paginatedAddMembers}
      editing
      onClose={onClose}
      onSave={handleUpdate}
      pageNumber={pageNumber}
      onPageNumberChange={setPageNumber}
      onSearchChange={setSearchValue}
    />
  )
}
