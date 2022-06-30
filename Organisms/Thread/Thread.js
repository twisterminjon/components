import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { MessageStatus, MessageType, ThreadPropType, ProjectDate, DateFormat } from '@shared/helpers'
import { useMappedMessages, useNewMessagesLine } from '@shared/hooks'
import { ThreadScroller } from '@shared/components'

import Message from '../../Molecules/Message/Message'
import MessageText from '../../Atoms/MessageText/MessageText'
import MessageAttachmentFile from '../../Atoms/MessageAttachmentFile/MessageAttachmentFile'
import MessageAttachmentThumbnail from '../../Atoms/MessageAttachmentThumbnail/MessageAttachmentThumbnail'
import MessageSystem from '../../Atoms/MessageSystem/MessageSystem'
import MessageTyper from '../../Molecules/MessageTyper/MessageTyper'
import NewMessagesPopup from './NewMessagesPopup'
import { PlaceholderMessages } from './ThreadPlaceholder'

import './Thread.css'

Thread.propTypes = {
  /** A thread to display */
  thread: ThreadPropType.isRequired,

  /** Message value */
  message: PropTypes.string.isRequired,

  /** Execute to set message value */
  setMessage: PropTypes.func.isRequired,

  /** Send a new message */
  onSend: PropTypes.func.isRequired,

  /** Called when message is failed and retry pressed */
  onRetry: PropTypes.func.isRequired,

  /** Mutation to mark an attachment as downloaded */
  onDownloadAttachment: PropTypes.func.isRequired,

  /** Whether or not messages are loading */
  loading: PropTypes.bool,

  /** Called when messages bound reached to fetch more messages */
  onFetchMore: PropTypes.func.isRequired,

  /** Called when image pressed */
  openAttachment: PropTypes.func.isRequired,
}

function Thread({
  thread,
  onSend,
  onRetry,
  onDownloadAttachment,
  loading,
  onFetchMore,
  openAttachment,
  message,
  setMessage,
}) {
  const {
    isScrolling,
    showNewMessagesLine,
    showScrollToNewMessages,
    scrollToNewMessages,
    firstUnreadMessage,
    newMessagesRef,
  } = useNewMessagesLine({
    firstUnreadMessage: thread.firstUnreadMessage,
    onFetchMore: onFetchMore,
  })

  const messages = useMappedMessages(thread.messages, firstUnreadMessage)

  const viewMessages = useMemo(() => {
    return messages.map(({ type, message }) => {
      if (type === MessageType.DateSplit) {
        const currentMessageDate = ProjectDate(message.timestamp).formatLocalUTC(DateFormat.MonthAndDay2)
        return (
          <MessageSystem
            key={`currentMessageDate_${message.timestamp}`}
            text={currentMessageDate}
            style={{ marginBottom: 15 }}
          />
        )
      }
      if (type === MessageType.NewMarker) {
        const hiddenClass = !showNewMessagesLine ? 'newmessages-line--hidden' : ''
        return (
          <div key="UNREAD_LINE" ref={newMessagesRef} className={`newmessages-line ${hiddenClass}`.trim()}>
            <MessageSystem text="New" type="UNREAD_LINE" />
          </div>
        )
      }
      if (type === MessageType.SystemMessage) {
        return (
          <MessageSystem
            key={message.id}
            text={message.text}
            type={message.systemMessageType}
            style={{ marginBottom: 15 }}
          />
        )
      }
      return (
        <Message
          key={message.id}
          isOwn={message.isOwn}
          timestamp={message.timestamp}
          displayName={message.sender.displayName}
          profileImage={message.sender.profileImage}
          status={message.status}
          onRetry={() => onRetry(message)}
          data-testid={message.isOwn ? 'sent-message' : 'received-message'}
          style={{ marginBottom: 15 }}>
          {type === MessageType.Text ? (
            <MessageText timestamp={message.timestamp}>{message.text}</MessageText>
          ) : type === MessageType.Image ? (
            <MessageAttachmentThumbnail
              timestamp={message.timestamp}
              sending={message.status === MessageStatus.Pending}
              onClick={() => openAttachment(message.attachments[0])}
              className={!message.isOwn ? 'messageattachmentthumbnail--received' : ''}>
              <img
                src={message.attachments[0].thumbnail}
                alt="attachment"
                onError={e => (e.target.style.height = '48px')}
              />
            </MessageAttachmentThumbnail>
          ) : (
            <MessageAttachmentFile
              timestamp={message.timestamp}
              sending={message.status === MessageStatus.Pending}
              filename={message.attachments[0].filename}
              onClick={() => {
                window.open(message.attachments[0].url, '_blank')
                onDownloadAttachment(message.attachments[0].id)
              }}
            />
          )}
        </Message>
      )
    })
  }, [messages, newMessagesRef, onDownloadAttachment, onRetry, openAttachment, showNewMessagesLine])

  return (
    <div className="messagethread-wrap">
      <NewMessagesPopup loading={isScrolling} onClick={scrollToNewMessages} visible={showScrollToNewMessages} />
      <ThreadScroller
        loading={loading}
        loadingComponent={<PlaceholderMessages show={loading} />}
        isStartOfThread={!thread.messages.length}
        newThreadMessage={<NewThreadMessage />}
        startOfThreadMessage={<FirstMessage />}
        messagesCount={viewMessages.length}
        onFetchMore={onFetchMore}
        lastMessageKey={viewMessages.length > 0 ? viewMessages[0].key : undefined}>
        {viewMessages}
      </ThreadScroller>
      <MessageTyper
        className="messagethread-typer"
        generalMessage={thread.generalMessage}
        message={message}
        setMessage={setMessage}
        onSend={onSend}
      />
    </div>
  )
}

const NewThreadMessage = () => {
  return (
    <p key="start-message" className="messagethread-start">
      You are starting a new message. Type the message below and click Send
    </p>
  )
}

const FirstMessage = () => {
  return (
    <p key="first-message" className="messagethread-start">
      This is the start of your conversation
    </p>
  )
}

export default Thread
