import { toast } from 'react-toastify'

import { showNotification, SOUND_SUBTLE } from '@shared/helpers'

export const showAnnouncementNotification = ({ event, history }) => {
  let announcementNotification = null

  const handleGoToAnnouncement = () => {
    if (announcementNotification && typeof announcementNotification.close === 'function') {
      announcementNotification.close()
    }

    if (event && event.announcement_id) {
      history.push(`/app/announcements/${event.announcement_id}`)
    } else {
      history.push(`/app/announcements`)
    }

    window.focus()
  }

  // FIXME: We might be able to make a 'toastWhenFocused' prop in the showNotification function and let it handle this part.
  // We need to adjust how AwayStatus uses notifications to make it work
  if (document.hasFocus()) {
    // Show a toast message
    toast.info('You have a new announcement', {
      onClick: handleGoToAnnouncement,
    })

    return
  }

  // Window does not have focus so show a desktop notification
  announcementNotification = showNotification({
    message: 'You received an announcement, click to view',
    sound: SOUND_SUBTLE,
    tag: 'announcement',
    onClick: handleGoToAnnouncement,
  })
}
