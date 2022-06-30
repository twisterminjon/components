import React from 'react'
import PropTypes from 'prop-types'

import AnnouncementCard from './AnnouncementCard'
import AnnouncementBanner from './AnnouncementBanner'
import { ANNOUNCEMENT_READ } from '../../../constants'
import SpinnerDots from '../../Atoms/SpinnerDots/SpinnerDots'

import './AnnouncementList.css'

AnnouncementList.propTypes = {
  /** Can show a loader */
  loading: PropTypes.bool,

  /** Can show a loader on an item in the list */
  loadingId: PropTypes.string,

  /** A list of announcements to show */
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      textSnippet: PropTypes.string.isRequired,
      // Note: time is 'not' a timestamp, it is a formatted string that will be shown on the announcement card
      time: PropTypes.string.isRequired,
      userAnnouncement: PropTypes.shape({
        id: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
      }).isRequired,
    })
  ),

  /** Called after the view action */
  onView: PropTypes.func.isRequired,

  /** Called after the remove announcement action */
  onRemove: PropTypes.func.isRequired,

  /** Called after the close action */
  onClose: PropTypes.func.isRequired,

  /** ClassName for the wrapper */
  className: PropTypes.string,

  /** Style for the wrapper */
  style: PropTypes.object,
}

AnnouncementList.defaultProps = {
  loading: false,
  loadingId: null,
  list: [],
  className: '',
  style: {},
}

export default function AnnouncementList({ loading, loadingId, list, onView, onRemove, onClose, className, style }) {
  let renderCards = list.map(a => {
    return (
      <AnnouncementCard
        key={a.id}
        loading={a.id === loadingId}
        time={a.time}
        content={a.textSnippet}
        read={a.userAnnouncement.status === ANNOUNCEMENT_READ}
        onView={() => {
          onView(a.id)
        }}
        onClose={() => {
          onRemove(a.id)
        }}
      />
    )
  })

  if (!loading && list.length === 0) {
    renderCards = <p>You don't have any announcements</p>
  }

  return (
    <div className="announcementlist" data-testid="announcement-list">
      <AnnouncementBanner text="Announcements" navigation="times" onNavigate={onClose} />

      <ul className="stack announcementlist-list ">
        {loading ? <SpinnerDots className="callhistory-loader" /> : renderCards}
        <div style={{ minHeight: 'var(--bottom-whitespace-v1)' }} />
      </ul>
    </div>
  )
}
