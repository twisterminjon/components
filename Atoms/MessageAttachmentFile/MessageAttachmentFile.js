import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Loader } from 'semantic-ui-react'

import { DateFormat, ProjectDate } from '@shared/helpers'
import IconChevronRight from '../Icons/IconChevronRight'

import './MessageAttachmentFile.css'

MessageAttachmentFile.propTypes = {
  /** The type of message bubble to display */
  isOwn: PropTypes.bool,
  /** Timestamp for the message */
  timestamp: PropTypes.string.isRequired,
  /** Called after the messageFile is clicked */
  onClick: PropTypes.func.isRequired,
  /** Name of the File */
  filename: PropTypes.string.isRequired,
  /** Can show loading spinner near the time */
  sending: PropTypes.bool,
  /** ClassName for the wrapper */
  className: PropTypes.string,
  /** Style for the wrapper */
  style: PropTypes.object,
}

MessageAttachmentFile.defaultProps = {
  isOwn: false,
  className: '',
  style: {},
}

function MessageAttachmentFile({ isOwn, timestamp, onClick, filename, sending, className, style, ...rest }) {
  const niceTime = useMemo(() => ProjectDate(timestamp).formatLocalUTC(DateFormat.LT), [timestamp])

  const type = isOwn ? 'sent' : 'received'

  return (
    <React.Fragment>
      <div onClick={onClick} className={`messageatt messageatt--${type} ${className}`} style={style} {...rest}>
        <div className={`messageatt-timestamp messageatt-timestamp--show`.trim()}>
          <span className="messageatt-timestamp-text">{niceTime}</span>
          <Loader inline inverted active={sending} size="mini" className="messageatt-loader" />
        </div>
        <p className="messageatt-content">
          <span>Tap to download file</span>
          <IconChevronRight style={{ float: 'right' }} color={'var(--white)'} />
        </p>
      </div>
      <div className="messageatt-filename">
        <p>{filename}</p>
      </div>
    </React.Fragment>
  )
}

export default MessageAttachmentFile
