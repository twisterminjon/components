import React, { useEffect, useCallback, useContext, useMemo, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useMutation, useQuery } from 'react-apollo'
import { debounce } from 'lodash-es'

import { THREAD_MAX_MESSAGES_PER_PAGE } from '../../../config'
import {
  AuthUtils,
  BUS_EVENTS,
  errorMessages,
  EventBus,
  ThreadsActions,
  canCallPatients,
  canCallStaff,
  featureVirtualCalls,
} from '@shared/helpers'
import { MessagesQl } from '@shared/services'
import { CurrentUserContext } from '@shared/providers'
import {
  useSyncEvent,
  EVT_NEW_MESSAGE,
  EVT_THREAD_REMOVED,
  useDraftStorage,
  useThread,
  useInterval,
} from '@shared/hooks'
import { ImageViewer } from '@shared/components'

import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import ServerIssue from '../../Views/ServerIssue/ServerIssueContainer'
import Thread from './Thread'
import ThreadPlaceholder from './ThreadPlaceholder'
import MessageBanner from './MessageBanner'
import MessageBannerPlaceholder from './MessageBannerPlaceholder'
import MessageBannerNamedGroup from './MessageBannerNamedGroup'
import MessageBannerGroup from './MessageBannerGroup'

ThreadContainer.propTypes = {
  /** Thread Id */
  threadId: PropTypes.string.isRequired,

  /** Called to initiate a call with a user */
  onStartCall: PropTypes.func.isRequired,

  /** Called after the edit group action */
  onShowGroupEditor: PropTypes.func.isRequired,
}

const MUTATION_DOWNLOAD_ATTACHMENT = MessagesQl.attachmentDownloaded
const QUERY_GET_THREAD_MESSAGES = MessagesQl.getThreadMessages
const QUERY_GET_THREAD_MEMBERS = MessagesQl.getThreadMembersWithEnterprise
const QUERY_GET_THREAD_ID = MessagesQl.getThreadIdByUser

function ThreadContainer({ threadId, onStartCall, onShowGroupEditor, history }) {
  const [isFetchingMore, setIsFetchingMore] = useState(false)

  const { thread, dispatch, sendMessage, retryMessage } = useThread(threadId)
  const [message, setMessage] = useDraftStorage(`/threads/${threadId}`)

  const [markAttachmentDownload] = useMutation(MUTATION_DOWNLOAD_ATTACHMENT)

  const { data, loading, error, refetch } = useQuery(QUERY_GET_THREAD_MESSAGES, {
    fetchPolicy: 'no-cache',
    variables: { threadId, first: THREAD_MAX_MESSAGES_PER_PAGE },
    onCompleted: ({ secureMessageThread }) => {
      if (!thread.key) {
        dispatch({ type: ThreadsActions.setThread, data: secureMessageThread })
      }
    },
  })

  const { error: membersError } = useQuery(QUERY_GET_THREAD_MEMBERS, {
    variables: { threadId },
    fetchPolicy: 'cache-and-network',
    pollInterval: 10000,
    notifyOnNetworkStatusChange: true,
    onCompleted: ({ secureMessageThread }) =>
      dispatch({
        type: ThreadsActions.setThread,
        data: secureMessageThread,
      }),
  })

  const refetchWithStateUpdate = useCallback(
    ({ count, fromMessageId }) =>
      refetch({
        ...(fromMessageId
          ? { fromMessageId, previous: THREAD_MAX_MESSAGES_PER_PAGE, first: null }
          : { first: Math.max(THREAD_MAX_MESSAGES_PER_PAGE, count) }),
      })
        .then(result =>
          dispatch({
            type: ThreadsActions.setThread,
            data: result.data.secureMessageThread,
          })
        )
        .catch(err => console.warn('Caught', err)),
    [refetch, dispatch]
  )

  const fetchMore = useCallback(
    firstUnreadMessageId => {
      setIsFetchingMore(true)
      return refetchWithStateUpdate({
        fromMessageId: firstUnreadMessageId,
        count: thread.messages.length + THREAD_MAX_MESSAGES_PER_PAGE,
      }).finally(() => setIsFetchingMore(false))
    },
    [refetchWithStateUpdate, thread.messages.length]
  )

  const refetchDebounced = useMemo(() => debounce(refetchWithStateUpdate, 3000), [refetchWithStateUpdate])
  useEffect(() => refetchDebounced.cancel, [refetchDebounced])

  useInterval(() => refetchDebounced({ count: thread.messages.length }), 10000)

  useSyncEvent(EVT_NEW_MESSAGE, ({ thread_uuid, message, unread_messages }) => {
    if (thread_uuid !== threadId) {
      return
    }
    const firstTime = !data && !loading && !error

    if (!firstTime) {
      if (message) {
        dispatch({ type: ThreadsActions.newMessage, data: message, unreadMessages: unread_messages })
        refetchDebounced({ count: thread.messages.length })
      } else {
        refetchWithStateUpdate({ count: thread.messages.length })
      }
    }
  })

  useSyncEvent(EVT_THREAD_REMOVED, ({ thread_uuid }) => {
    if (threadId === thread_uuid) {
      console.warn('USER WAS REMOVED FROM THREAD')

      // Navigate back to messages page
      history.push('/app/messages')
    }
  })

  const handleSend = useCallback(
    (text, file) =>
      sendMessage({
        ...(text && { text }),
        ...(file && file.type.includes('image') && { image: file }),
        ...(file && file.type.includes('application') && { file }),
      }).then(({ success }) => {
        if (success) EventBus.emit(BUS_EVENTS.OUTGOING_MESSAGE, { threadId })
      }),
    [sendMessage, threadId]
  )

  const handleRetry = useCallback(
    message =>
      retryMessage(message).then(({ success }) => {
        if (success) EventBus.emit(BUS_EVENTS.OUTGOING_MESSAGE, { threadId })
      }),
    [retryMessage, threadId]
  )

  const onDownloadAttachment = useCallback(
    id => {
      if (typeof id === 'number') {
        markAttachmentDownload({ variables: { id } })
      }
    },
    [markAttachmentDownload]
  )

  const handleAddUser = useCallback(() => {
    history.push(`/app/messages/${threadId}/add`)
  }, [history, threadId])

  const handleNotAllowed = useCallback(() => {
    history.push('/app/restricted')
  }, [history])

  const handleSelectAvatar = useCallback(
    (userId, enterpriseId) => history.push(`/app/enterprises/${enterpriseId}/patientsV1/${userId}`),
    [history]
  )

  const threadLoadError = error || membersError
  const loadingThread = (!thread.key || !thread.members.length) && !threadLoadError

  if (loadingThread) {
    return <ThreadPagePlaceholder />
  }

  if (threadLoadError) {
    if (threadLoadError.message.includes(errorMessages.NOT_ALLOWED)) {
      handleNotAllowed()
    } else if (threadLoadError.message.includes('Network error: Failed to fetch')) {
      return <ServerIssue />
    } else {
      return <ErrorPage error={threadLoadError} show={true} />
    }
  }

  return (
    <>
      <MessageBannerContainer
        thread={thread}
        onCall={onStartCall}
        onAddUser={handleAddUser}
        onSelectAvatar={handleSelectAvatar}
        onShowGroupEditor={onShowGroupEditor}
      />
      <ImageViewer onDownload={onDownloadAttachment}>
        {({ openAttachment }) => (
          <Thread
            thread={thread}
            message={message}
            setMessage={setMessage}
            onDownloadAttachment={onDownloadAttachment}
            loading={isFetchingMore}
            openAttachment={openAttachment}
            onFetchMore={fetchMore}
            onRetry={handleRetry}
            onSend={handleSend}
          />
        )}
      </ImageViewer>
    </>
  )
}

// This is used to decide whether to show a Group or Recipient type
// banner. Behaviour is different for each type.
const MessageBannerContainer = ({ thread, onCall, onAddUser, onSelectAvatar, onShowGroupEditor }) => {
  if (thread.isNamedGroup) {
    return (
      <MessageBannerNamedGroup
        canModifyMembers={thread.canModifyMembers}
        groupName={thread.groupName}
        members={thread.members}
        onAdd={onShowGroupEditor}
      />
    )
  }

  if (thread.isGroup) {
    return <MessageBannerGroup name={thread.name} onAdd={onAddUser} />
  }

  return (
    <MessageBannerP2pContainer thread={thread} onCall={onCall} onAddUser={onAddUser} onSelectAvatar={onSelectAvatar} />
  )
}

function MessageBannerP2pContainer({ thread, onCall, onAddUser, onSelectAvatar }) {
  const currentUser = useContext(CurrentUserContext)

  const determineCanCall = useCallback(
    userToCall => {
      if (!featureVirtualCalls(currentUser)) return false
      if (userToCall.isPatient && !canCallPatients(currentUser.permissions)) return false
      if (userToCall.isCaregiver && !canCallPatients(currentUser.permissions)) return false
      if (userToCall.isStaff && !canCallStaff(currentUser.permissions)) return false
      if (!currentUser.micCamAvailable) return false

      return true
    },
    [currentUser]
  )

  const { user, canCall } = useMemo(() => {
    const myId = AuthUtils.getUserId()
    const user = thread.members.find(({ id }) => id !== myId)
    const canCall = determineCanCall(user)

    return { user, canCall }
  }, [determineCanCall, thread.members])

  return (
    <MessageBanner
      avatarInteractive={user.isPatient}
      canCall={canCall}
      onCall={onCall}
      userInBanner={user}
      onSelectAvatar={() => onSelectAvatar(user.id, user.enterprise.id)}
      onAddUser={onAddUser}
    />
  )
}

function ThreadPagePlaceholder() {
  const headerHeight = window.getComputedStyle(document.body).getPropertyValue('--header-height')
  const searchHeight = window.getComputedStyle(document.body).getPropertyValue('--searchbar-height')

  return (
    <div>
      <MessageBannerPlaceholder />
      <ThreadPlaceholder style={{ marginTop: headerHeight + searchHeight }} />
    </div>
  )
}

export default function ThreadRouterContainer(props) {
  const history = useHistory()
  const { threadId, userId } = useParams()

  const { error } = useQuery(QUERY_GET_THREAD_ID, {
    skip: Boolean(threadId),
    fetchPolicy: 'no-cache',
    variables: { userId },
    onCompleted: response => {
      if (response) history.push(`/app/messages/${response.thread.id}`)
    },
  })

  const handleNotAllowed = useCallback(() => history.push(`/app/restricted`), [history])

  if (threadId) {
    return <ThreadContainer threadId={threadId} {...props} />
  }

  if (error) {
    if (error.message.includes(errorMessages.NOT_ALLOWED)) {
      handleNotAllowed()
    } else if (error.message.includes('Network error: Failed to fetch')) {
      return <ServerIssue />
    } else {
      return <ErrorPage error={error} />
    }
  }

  return <ThreadPagePlaceholder />
}
