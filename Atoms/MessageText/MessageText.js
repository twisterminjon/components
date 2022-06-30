import React, { useState, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'

import { DateFormat, ProjectDate } from '@shared/helpers'

import Linkify from '../Linkify/Linkify'

import './MessageText.css'

MessageText.propTypes = {
  /** The type of message bubble to display */
  isOwn: PropTypes.bool,
  /** Timestamp for the message */
  timestamp: PropTypes.string.isRequired,
  /** Content for the text message */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  /** ClassName for the wrapper */
  className: PropTypes.string,
  /** Style for the wrapper */
  style: PropTypes.object,
}

MessageText.defaultProps = {
  isOwn: false,
  className: '',
  style: {},
}

function MessageText({ isOwn, timestamp, children, className, style, ...rest }) {
  const [showTime, setShowTime] = useState(false)
  const toggleTime = useCallback(() => setShowTime(isShown => !isShown), [])
  const niceTime = useMemo(() => ProjectDate(timestamp).formatLocalUTC(DateFormat.LT), [timestamp])

  const type = isOwn ? 'sent' : 'received'
  const showTimestampClass = showTime ? 'messagetext-timestamp--show' : ''

  return (
    <div onClick={toggleTime} className={`messagetext messagetext--${type} ${className}`} style={style} {...rest}>
      <p className="messagetext-content">
        <Linkify text={children} />
      </p>
      <div className={`messagetext-timestamp ${showTimestampClass}`.trim()}>
        <span className="messagetext-timestamp-text">{niceTime}</span>
      </div>
    </div>
  )
}

export default MessageText
