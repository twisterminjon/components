import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react'
import { toast } from 'react-toastify'

import { useMutation } from 'react-apollo'
import { usePaginationQuery } from '@shared/hooks'
import MessagesQl from '../../../services/MessagesQl'

import { uniqBy } from 'lodash-es'

import SpinnerDots from '../../Atoms/SpinnerDots/SpinnerDots'
import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import ThreadAddGroup from './ThreadAddGroup'
import ThreadAddUserConfirm from '../../Organisms/Thread/ThreadAddUserConfirm'

import debug from 'debug'
const d = debug('project:ThreadAddGroupContainer')

const MUTATION_ADD_TO_THREAD = MessagesQl.addParticipantToThread()

export default function ThreadAddGroupContainer({ match, ...rest }) {
  const recipientId = match.params.recipientId
  const [threadId, setThreadId] = useState(match.params.threadId)

  const [showConfirm, setShowConfirm] = useState(false)
  const [userToAdd, setUserToAdd] = useState({ id: '-1', displayName: '' })

  const {
    groupsThreadId,
    groupsLoading,
    groupsError,
    groups,
    groupsPageNumber,
    setGroupsPageNumber,
  } = usePaginatedAddGroups({
    recipientId,
    threadId,
  })

  // Once actual thread id is obtained, set it
  useEffect(() => {
    if (groupsThreadId) {
      setThreadId(groupsThreadId)
    }
  }, [groupsThreadId])

  const [expandedGroupId, setExpandedGroupId] = useState('')

  const {
    groupUsersLoading,
    groupUsersError,
    groupUsers,
    groupUsersPageNumber,
    setGroupUsersPageNumber,
  } = usePaginatedAddGroupUsers({
    recipientId,
    threadId,
    groupId: expandedGroupId,
  })

  const [mutationError, setMutationError] = useState(null)

  const error = useMemo(() => groupsError || groupUsersError || mutationError, [
    mutationError,
    groupUsersError,
    groupsError,
  ])

  const [_addParticipant] = useMutation(MUTATION_ADD_TO_THREAD)

  const handleShowConfirm = useCallback(({ id, displayName }) => {
    setShowConfirm(true)
    setUserToAdd({ id, displayName })
  }, [])

  const handleHideConfirm = useCallback(() => {
    setShowConfirm(false)
  }, [])

  const handleAddUser = useCallback(
    options => {
      d(`add user=${userToAdd.id} to ${threadId}`)

      _addParticipant({
        variables: {
          threadId,
          participantId: userToAdd.id,
          includeHistory: options.includeHistory,
        },
      })
        .then(resp => {
          handleHideConfirm()

          // We always go back to the thread id, even if we started with a recipientId
          // as threads w/ recipientId can not have multiple members
          const newThreadId = resp.data.addParticipantToThread.id
          rest.history.push(`/app/messages/${newThreadId}`)
        })
        .catch(e => {
          console.error(e)
          if (e.message.includes('add a user who does not have authorization to join')) {
            toast.error(e.message.replace('GraphQL error: ', ''))
          } else {
            setMutationError(e)
          }
        })
    },
    [_addParticipant, handleHideConfirm, rest.history, threadId, userToAdd.id]
  )

  const handleBack = useCallback(() => {
    rest.history.push(`/app/messages/${threadId}/add`)
  }, [rest.history, threadId])

  if (error) return <ErrorPage error={error} />

  if (!groups) return <SpinnerDots style={{ width: '100%' }} />

  return (
    <React.Fragment>
      <ThreadAddUserConfirm
        show={showConfirm}
        displayName={userToAdd.displayName}
        onAdd={handleAddUser}
        onClose={handleHideConfirm}
      />
      <ThreadAddGroup
        onAddUser={handleShowConfirm}
        onBack={handleBack}
        onExpandedGroupIdChange={setExpandedGroupId}
        groups={groups}
        groupsLoading={groupsLoading}
        groupsPageNumber={groupsPageNumber}
        onGroupsPageNumberChange={setGroupsPageNumber}
        groupUsers={groupUsers}
        groupUsersLoading={groupUsersLoading}
        groupUsersPageNumber={groupUsersPageNumber}
        onGroupUsersPageNumberChange={setGroupUsersPageNumber}
      />
    </React.Fragment>
  )
}

function usePaginatedAddGroups({ recipientId, threadId }) {
  const {
    apolloContext: { loading: groupsLoading, error: groupsError, data: groupsData },
    paginationContext: { pageNumber: groupsPageNumber, setPageNumber: setGroupsPageNumber },
  } = usePaginationQuery(
    MessagesQl.getGroupsToAdd(),
    {
      variables: {
        recipientId,
        threadId,
      },
      // When this is set to cache-and-network, we will crash when:
      // The first message is sent to a user and the next action is to add a member to the thread.
      fetchPolicy: 'network-only',
    },
    {
      onUpdateQuery: (prev, { fetchMoreResult }) => {
        const merged = {
          ...prev,
          ...fetchMoreResult,
          secureMessageThread: {
            ...prev.secureMessageThread,
            ...fetchMoreResult.secureMessageThread,
            paginatedAddGroups: uniqBy(
              [
                ...prev.secureMessageThread.paginatedAddGroups,
                ...fetchMoreResult.secureMessageThread.paginatedAddGroups,
              ],
              'id'
            ),
            patientAddGroups: uniqBy(
              [...prev.secureMessageThread.patientAddGroups, ...fetchMoreResult.secureMessageThread.patientAddGroups],
              'id'
            ),
          },
        }

        return merged
      },
    }
  )

  const groupsThreadId = groupsData && groupsData.secureMessageThread && groupsData.secureMessageThread.id

  // Shape groups array of objects (i.e. {id, isActive, name}[])
  const refPrevGroups = useRef([])
  const groups = useMemo(() => {
    if (groupsLoading || !groupsData || !groupsData.secureMessageThread) {
      return refPrevGroups.current
    }

    const { paginatedAddGroups, patientAddGroups } = groupsData.secureMessageThread

    const groups = [...(paginatedAddGroups || []), ...(patientAddGroups || [])].map(
      ({ id, isActive = true, name }) => ({
        id,
        isActive,
        name,
      })
    )

    refPrevGroups.current = groups

    return groups
  }, [groupsLoading, groupsData])

  return {
    groupsThreadId,
    groupsLoading,
    groupsError,
    groups,
    groupsPageNumber,
    setGroupsPageNumber,
  }
}

function usePaginatedAddGroupUsers({ recipientId, threadId, groupId }) {
  const {
    apolloContext: { loading: groupUsersLoading, error: groupUsersError, data: groupUsersData },
    paginationContext: { pageNumber: groupUsersPageNumber, setPageNumber: setGroupUsersPageNumber },
  } = usePaginationQuery(
    MessagesQl.getGroupUsersToAdd(),
    {
      variables: {
        recipientId,
        threadId,
        groupId,
      },

      skip: !groupId,

      // When this is set to cache-and-network, we will crash when:
      // The first message is sent to a user and the next action is to add a member to the thread.
      fetchPolicy: 'network-only',
    },
    {
      mergePath: 'secureMessageThread.paginatedAddGroupUsers',
    }
  )

  const refPrevGroupUsers = useRef([])
  const groupUsers = useMemo(() => {
    if (groupUsersLoading || !groupUsersData) {
      return refPrevGroupUsers.current
    }

    const { paginatedAddGroupUsers } = groupUsersData.secureMessageThread

    refPrevGroupUsers.current = paginatedAddGroupUsers

    return paginatedAddGroupUsers
  }, [groupUsersLoading, groupUsersData])

  return {
    groupUsersLoading,
    groupUsersError,
    groupUsers,
    groupUsersPageNumber,
    setGroupUsersPageNumber,
  }
}
