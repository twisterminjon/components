import React from 'react'
import PropTypes from 'prop-types'

import IconTimes from '../../Atoms/Icons/IconTimes'
import Linkify from '../../Atoms/Linkify/Linkify'

import './AnnouncementCard.css'

AnnouncementCard.propTypes = {
  /** Can show a loader on the close button */
  loading: PropTypes.bool,

  /** The time to display */
  time: PropTypes.string.isRequired,

  /** The content for the card */
  content: PropTypes.string.isRequired,

  /** The card can show differently if read */
  read: PropTypes.bool,

  /** Called after the view action on the card */
  onView: PropTypes.func.isRequired,

  /** Called after the close action on the card */
  onClose: PropTypes.func.isRequired,

  /** ClassName for the wrapper */
  className: PropTypes.string,

  /** Style for the wrapper */
  style: PropTypes.object,
}

AnnouncementCard.defaultProps = {
  loading: false,
  read: false,
  className: '',
  style: {},
}

export default function AnnouncementCard({ loading, time, content, read, onView, onClose, className, style }) {
  const readClass = read ? 'announcementcard--read' : ''
  const loadingClass = loading ? 'button-spinner' : ''

  return (
    <li
      className={`announcementcard ${className} ${readClass}`.trim()}
      style={style}
      data-testid={`announcement-${content.slice(0, 10)}`}>
      <div className="announcementcard-header">
        <span>{time}</span>
        <button
          onClick={onClose}
          className={`button-reset announcementcard-close ${loadingClass}`.trim()}
          disabled={loading}
          data-testid="button-close">
          <IconTimes color="var(--brandcolor)" size={16} />
        </button>
      </div>
      <button
        onClick={onView}
        disabled={loading}
        className="button-reset announcementcard-content"
        data-testid="button-view">
        <p>
          <Linkify disabled text={content} />
        </p>
      </button>
      <div className="announcementcard-hover-target" />
    </li>
  )
}
