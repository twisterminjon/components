import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { getThreadName, getThreadType, ThreadStatus } from '@shared/helpers'

import Avatar from '../../Atoms/Avatar/Avatar'
import TimeStamp from '../../Atoms/TimeStamp/TimeStamp'
import AvatarGroup from '../Thread/AvatarGroup'
import AvatarNamedGroup from '../Thread/AvatarNamedGroup'

import './ThreadListCard.css'

export default class ThreadListCard extends Component {
  static propTypes = {
    thread: PropTypes.shape({
      isGroup: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
      groupName: PropTypes.string,
      isOwn: PropTypes.bool.isRequired,
      profileImage: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      unread: PropTypes.bool.isRequired,
      membersCount: PropTypes.number,
      status: PropTypes.oneOf(Object.values(ThreadStatus)).isRequired,
      showDraftPreview: PropTypes.bool.isRequired,
      showDraftNotification: PropTypes.bool.isRequired,
    }).isRequired,

    /** function called when the user is clicked */
    onClick: PropTypes.func.isRequired,

    /** If true the card will show a selected state */
    selected: PropTypes.bool,
  }
  static defaultProps = {
    selected: false,
  }

  state = {
    hovered: false,
  }

  handleMouseEnter = () => {
    this.setState({ hovered: true })
  }

  handleMouseLeave = () => {
    this.setState({ hovered: false })
  }

  render() {
    const { thread, onClick, selected } = this.props
    const { message, showDraftPreview, showDraftNotification, isGroup, isNamedGroup, name, groupName } = thread
    const { hovered } = this.state

    let bgColor = 'transparent'
    if (hovered) bgColor = '#282F3B'
    if (selected) bgColor = 'var(--brandcolor_trans_25)'

    const unreadClass = thread.unreadMessagesCount > 0 ? 'messagelistcard--unread' : ''
    const readStatusClass = thread.status === ThreadStatus.READ ? 'messagelistcard-status--read' : ''
    const failedStatusClass = thread.status === ThreadStatus.FAILED ? 'messagelistcard-status--failed' : ''

    const type = getThreadType({ isGroup, isNamedGroup })
    const threadName = getThreadName({ type, name, groupName })

    return (
      <button
        className="messagelistcard-wrap"
        style={{ backgroundColor: bgColor }}
        onClick={onClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        data-testid={`message-card-${threadName}`}>
        <div className="messagelistcard">
          <div className="messagelistcard-left">
            <ThreadAvatar thread={thread} />
            <span className={`messagelistcard-status ${readStatusClass} ${failedStatusClass}`.trim()}>
              {thread.status}
            </span>
          </div>
          <div className="messagelistcard-info">
            <p className={`messagelistcard-label ${unreadClass}`} data-testid={`message-card-name-${threadName}`}>
              {threadName}
            </p>
            <div className="messagelistcard-message">
              {showDraftNotification && <div className="messagelistcard-draft-bullet" />}
              {showDraftPreview && <span className="messagelistcard-draft-text">Draft:</span>}
              <p
                className={`messagelistcard-snippet ${unreadClass}`}
                data-testid={`message-card-snippet-${threadName}`}>
                {message}
              </p>
            </div>
          </div>
        </div>
        <TimeStamp timestamp={thread.timestamp} className={`messagelistcard-time ${unreadClass}`} />
      </button>
    )
  }
}

const ThreadAvatar = ({ thread }) => {
  if (thread.isNamedGroup) return <AvatarNamedGroup />
  if (thread.isGroup) return <AvatarGroup />

  return <Avatar displayName={thread.name} imgUrl={thread.profileImage} size="medium" />
}
