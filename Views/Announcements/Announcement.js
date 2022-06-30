import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'

import { AnnouncementImage } from '@shared/components'

import AnnouncementBanner from './AnnouncementBanner'
import Button from '../../Atoms/Button/Button'
import ButtonGhost from '../../Atoms/ButtonGhost/ButtonGhost'
import SpinnerDots from '../../Atoms/SpinnerDots/SpinnerDots'
import Linkify from '../../Atoms/Linkify/Linkify'

import './Announcement.css'

Announcement.propTypes = {
  /** Can show a loader */
  loading: PropTypes.bool,

  /** Can show a loader on the remove button */
  removeLoading: PropTypes.bool,

  /** A list of announcements to show */
  announcement: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    // Note: time is 'not' a timestamp, it is a formatted string that will be shown on the announcement card
    time: PropTypes.string,
  }),

  /** Called after the remove action */
  onRemove: PropTypes.func.isRequired,

  /** Called after the close action */
  onClose: PropTypes.func.isRequired,
}

Announcement.defaultProps = {
  loading: false,
  removeLoading: false,
  announcement: {},
}

export default function Announcement({ loading, removeLoading, announcement, onRemove, onClose }) {
  const attachment = get(announcement, 'attachments[0]', undefined)

  return (
    <div className="announcement" data-testid={`announcement-view-${announcement.id}`}>
      <AnnouncementBanner text="Announcement" navigation="left" onNavigate={onClose} />
      <div className="announcement-container">
        {loading ? (
          <SpinnerDots style={{ width: '100%' }} />
        ) : (
          <>
            <div className="announcement-content">
              <span data-testid="announcement-sent">{announcement.time}</span>
              <p className="announcement-text" data-testid="announcement-text">
                <Linkify text={announcement.text} />
              </p>
              <AnnouncementImage image={attachment} />
            </div>
            <div className="announcement-buttons">
              <ButtonGhost
                onClick={onRemove}
                fluid
                loading={removeLoading}
                disabled={removeLoading}
                style={{ height: 40, marginRight: 16 }}
                data-testid="button-announcement-remove">
                Remove
              </ButtonGhost>
              <Button onClick={onClose} fluid data-testid="button-announcement-close">
                Close
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
