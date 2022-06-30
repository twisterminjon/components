import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Loader } from 'semantic-ui-react'

import { DateFormat, ProjectDate } from '@shared/helpers'

import './MessageAttachmentThumbnail.css'

MessageAttachmentThumbnail.propTypes = {
  /** Content for the attachment */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  /** Timestamp for the message */
  timestamp: PropTypes.string.isRequired,
  /** Called after the attachment is clicked */
  onClick: PropTypes.func,
  /** Can show loading spinner near the time */
  sending: PropTypes.bool,
  /** ClassName for the wrapper */
  className: PropTypes.string,
  /** Style for the wrapper */
  style: PropTypes.object,
}

MessageAttachmentThumbnail.defaultProps = {
  onClick: () => {},
  className: '',
  style: {},
}

function MessageAttachmentThumbnail({ isOwn, timestamp, onClick, sending, children, className, style, ...rest }) {
  const receivedClass = !isOwn ? 'messageattachmentthumbnail--received' : ''

  const niceTime = useMemo(() => ProjectDate(timestamp).formatLocalUTC(DateFormat.LT), [timestamp])

  return (
    <div
      onClick={onClick}
      className={`messageattachmentthumbnail ${receivedClass} ${className}`.trim()}
      style={style}
      {...rest}>
      {children}
      <div className="messagethumbnail-timestamp">
        <span className="messagethumbnail-timestamp-text">{niceTime}</span>
        <Loader inline inverted active={sending} size="mini" className="messagethumbnail-loader" />
      </div>
    </div>
  )
}

export default MessageAttachmentThumbnail
