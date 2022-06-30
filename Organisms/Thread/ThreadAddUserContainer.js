import React, { useEffect, useState } from 'react'

import { useMutation } from 'react-apollo'
import MessagesQl from '../../../services/MessagesQl'

import { usePaginationQuery } from '@shared/hooks'

import SpinnerDots from '../../Atoms/SpinnerDots/SpinnerDots'
import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import ThreadAddUserConfirm from '../../Organisms/Thread/ThreadAddUserConfirm'

import ThreadAddUser from './ThreadAddUser'

import debug from 'debug'
const d = debug('project:ThreadAddUserContainer')

const QUERY_GET_ADDABLE_MEMBERS = MessagesQl.getThreadAddableMembers()
const MUTATION_ADD_TO_THREAD = MessagesQl.addParticipantToThread()

export default function ThreadAddUserContainer(props) {
  const [searchValue, setSearchValue] = useState('')

  const [fetchError, setFetchError] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [userToAdd, setUserToAdd] = useState({ id: '-1', displayName: '' })

  const recipientId = props.match.params.recipientId

  // Thread ID may not be known during the first render if a user ID has been
  // passed
  const [threadId, setThreadId] = useState(props.match.params.threadId)

  const {
    apolloContext: { loading, error, data },
    paginationContext: { pageNumber, setPageNumber },
  } = usePaginationQuery(
    QUERY_GET_ADDABLE_MEMBERS,
    {
      variables: {
        recipientId,
        threadId,
        displayName: searchValue,
      },
    },
    {
      mergePath: 'secureMessageThread.paginatedAddMembers',
    }
  )

  // Change page number to 0 every time search value changes
  useEffect(() => {
    setPageNumber(0)
  }, [searchValue, setPageNumber])

  if (!threadId && data && data.secureMessageThread && data.secureMessageThread.id) {
    setThreadId(data.secureMessageThread.id)
  }

  const [addParticipant] = useMutation(MUTATION_ADD_TO_THREAD)

  if (error) return <ErrorPage error={error} />
  if (!data) return <SpinnerDots style={{ width: '100%', height: '100%' }} />

  const handleBack = () => {
    props.history.push(`/app/messages/${data.secureMessageThread.id}`)
  }

  const handleShowGroups = () => {
    const recipientId = props.match.params.recipientId
    if (recipientId) {
      props.history.push(`/app/messages/user/${recipientId}/add-group`)
      return
    }

    props.history.push(`/app/messages/${threadId}/add-group`)
  }

  const handleAddUser = options => {
    d(`add user=${userToAdd.id} to ${threadId}`)

    addParticipant({
      variables: {
        threadId,
        participantId: userToAdd.id,
        includeHistory: options.includeHistory,
      },
    })
      .then(resp => {
        handleHideConfirm()

        const newThreadId = resp.data.addParticipantToThread.id
        props.history.push(`/app/messages/${newThreadId}`)
      })
      .catch(e => {
        console.error(e)
        setFetchError(e)
      })
  }

  const handleShowConfirm = ({ id, displayName }) => {
    setShowConfirm(true)
    setUserToAdd({ id, displayName })
  }

  const handleHideConfirm = () => {
    setShowConfirm(false)
  }

  const paginatedAddMembers = (data && data.secureMessageThread && data.secureMessageThread.paginatedAddMembers) || []

  return (
    <React.Fragment>
      <ThreadAddUserConfirm
        show={showConfirm}
        displayName={userToAdd.displayName}
        onAdd={handleAddUser}
        onClose={handleHideConfirm}
      />
      <ThreadAddUser
        users={paginatedAddMembers}
        onShowGroups={handleShowGroups}
        onAddUser={handleShowConfirm}
        onBack={handleBack}
        onSearchChange={setSearchValue}
        loading={loading}
        pageNumber={pageNumber}
        onPageNumberChange={setPageNumber}
      />
      {fetchError && <ErrorPage error={fetchError} />}
    </React.Fragment>
  )
}
