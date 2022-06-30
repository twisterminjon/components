import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { CurrentUserContext } from '@shared/providers'
import { canCallPatients, canCallStaff, featureSecureMessages, featureVirtualCalls } from '@shared/helpers'

import EnterpriseLogo from '../../Atoms/EnterpriseLogo/EnterpriseLogo'
import UserAvatarMe from '../../Molecules/UserAvatarMe/UserAvatarMe'
import NavbarButton from '../../Molecules/NavbarButton/NavbarButton'

import './AppHeader.css'

AppHeader.propTypes = {
  /** Called after the home menu item is clicked */
  onHome: PropTypes.func.isRequired,

  /** Called after the CareTeam menu item is clicked */
  onStaff: PropTypes.func.isRequired,

  /** Called after the patients menu item is clicked */
  onPatients: PropTypes.func.isRequired,

  /** Called after the Messages menu item is clicked */
  onMessage: PropTypes.func.isRequired,

  /** Called after the Messages menu item is clicked */
  onCalls: PropTypes.func.isRequired,

  /** Called after request to show menu */
  onMenu: PropTypes.func.isRequired,

  /** Logo to show in the header */
  enterpriseLogo: PropTypes.string.isRequired,
}

export default function AppHeader({
  onHome,
  onStaff,
  onPatients,
  onMessage,
  onCalls,
  onMenu,
  enterpriseLogo,
  ...rest
}) {
  const user = useContext(CurrentUserContext)
  const location = pathHelper(rest.location.pathname)

  return (
    <div className="appheader">
      <div className="appheader-logo-position">
        <div className="appheader-logo-size">
          <EnterpriseLogo imgUrl={enterpriseLogo} />
        </div>
      </div>

      <NavbarButton
        type="home"
        count={user.surveyCount}
        countColor="red"
        onClick={onHome}
        active={location === 'home'}
      />

      {canCallStaff(user.permissions) && <NavbarButton type="staff" onClick={onStaff} active={location === 'staff'} />}

      {canCallPatients(user.permissions) && (
        <NavbarButton type="patients" onClick={onPatients} active={location === 'patients'} />
      )}

      {featureSecureMessages(user) && (
        <NavbarButton type="message" onClick={onMessage} active={location === 'message'} count={user.unreadMessages} />
      )}

      {featureVirtualCalls(user) && (
        <NavbarButton
          type="calls"
          onClick={onCalls}
          active={location === 'calls'}
          className="appheader-calls"
          count={user.missedCallsCount}
        />
      )}

      <button className="appheader-avatar" onClick={onMenu} data-testid={`user-control-${user.displayName}`}>
        <UserAvatarMe
          status={user.overallStatus}
          profileImage={user.profileImage}
          notificationsPaused={user.notificationsStatus.paused}
          attention={user.missedAnnouncementsCount > 0}
        />
      </button>
    </div>
  )
}

const pathHelper = path => {
  if (path.includes('/app/staffV1')) return 'staff'
  if (path.includes('/patientsV1')) return 'patients'
  if (path.includes('/app/messages')) return 'message'
  if (path.includes('/app/calls')) return 'calls'

  return 'home'
}
