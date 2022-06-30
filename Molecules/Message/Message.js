import React from 'react'
import PropTypes from 'prop-types'

import { MessageStatus } from '@shared/helpers'

import Avatar from '../../Atoms/Avatar/Avatar'

import './Message.css'

Message.propTypes = {
  /** Can have a different appearance if message belongs to sender */
  isOwn: PropTypes.bool,
  /** Timestamp for the message */
  timestamp: PropTypes.string.isRequired,
  /** Name of the user for the message */
  displayName: PropTypes.string.isRequired,
  /** Path to the users profile pic */
  profileImage: PropTypes.string,
  /** Status of message */
  status: PropTypes.oneOf(Object.values(MessageStatus)),
  /** Called when message is failed and retry pressed */
  onRetry: PropTypes.func.isRequired,
  /** Content for the text message */
  children: PropTypes.oneOfType([PropTypes.node]).isRequired,
  /** ClassName for the wrapper */
  className: PropTypes.string,
  /** Style for the wrapper */
  style: PropTypes.object,
}

Message.defaultProps = {
  isOwn: false,
  profileImage: '',
  className: '',
  style: {},
}

const FailedStatus = [MessageStatus.Failed, MessageStatus.Retrying]

export default function Message({
  isOwn,
  timestamp,
  displayName,
  profileImage,
  status,
  onRetry,
  className,
  style,
  children,
  ...rest
}) {
  // clone the child and add isOwn prop
  const clonedChild = React.cloneElement(children, { isOwn, timestamp })
  const typeClass = isOwn ? 'message--own' : ''
  const messageClass = isOwn ? 'message--sent' : 'message--received'
  const messageFileClass = children.type.name === 'MessageAttachmentFile' ? 'message-file' : ''
  const retryClass = FailedStatus.includes(status) ? 'message-retry-visible' : ''

  return (
    <div className={`message ${typeClass} ${className}`.trim()} style={style} {...rest}>
      <div className="message-flex-container">
        <div className={`message-content ${messageClass}`.trim()}>
          {!isOwn && (
            <div className={`message-avatar ${messageFileClass}`.trim()}>
              <Avatar size={24} imgUrl={profileImage} displayName={displayName} />
              <span className="message-author">{displayName}</span>
            </div>
          )}
          <div className="message-flex-container-column">{clonedChild}</div>
        </div>
      </div>
      <div className={`message-retry ${retryClass}`.trim()}>
        <button className="message-retry-button" disabled={MessageStatus.Retrying === status} onClick={onRetry}>
          {MessageStatus.Retrying === status ? 'Retrying...' : 'Send Failed. Retry?'}
        </button>
      </div>
    </div>
  )
}
