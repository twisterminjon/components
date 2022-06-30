import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'

import { CurrentUserContext } from '@shared/providers'

import SettingsFormContainer from '../SettingsForm/SettingsFormContainer'
import AppHeader from './AppHeader'
import { showAnnouncementNotification } from '../../Views/AppContainer/AppNotifications'

AppHeaderContainer.propTypes = {
  /** Called after show menu action */
  onShowMenu: PropTypes.func.isRequired,
}

export default function AppHeaderContainer({ onShowMenu, ...rest }) {
  const [showSettings, setShowSettings] = useState(false)
  const user = useContext(CurrentUserContext)

  useEffect(() => {
    if (user.missedAnnouncementsCount > 0) {
      showAnnouncementNotification({ event: null, history: rest.history })
    }
    // We really only want this to render one time when it loads. We are just showing an initial notification
    // for something that may have happened when they are offline. Once they are online, the notifications are handled elsewhere.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleHome = () => {
    rest.history.push(`/app/dashboard`)
  }

  const handleStaff = () => {
    rest.history.push(`/app/staffV1`)
  }

  const handlePatients = () => {
    rest.history.push(`/app/enterprises/${user.enterprise.id}/patientsV1`)
  }

  const handleMessage = () => {
    rest.history.push(`/app/messages`)
  }

  const handleCalls = () => {
    rest.history.push(`/app/calls`)
  }

  return (
    <React.Fragment>
      <AppHeader
        onHome={handleHome}
        onStaff={handleStaff}
        onPatients={handlePatients}
        onMessage={handleMessage}
        onCalls={handleCalls}
        onMenu={onShowMenu}
        onSettings={() => setShowSettings(true)}
        enterpriseLogo={user.enterprise.enterpriseLogo}
        {...rest}
      />
      <SettingsFormContainer show={showSettings} onClose={() => setShowSettings(false)} />
    </React.Fragment>
  )
}
