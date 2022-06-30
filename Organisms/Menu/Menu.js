import React, { Fragment, useContext, useState, useMemo, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import { Sidebar, Menu as SidebarMenu } from 'semantic-ui-react'

import MenuItem from '../../Molecules/MenuItem/MenuItem'
import ProfilePicEdit from '../../Molecules/ProfilePicEdit/ProfilePicEdit'
import ProjectPowered from '../../Atoms/ProjectPowered/ProjectPowered'
import { CurrentUserContext } from '@shared/providers'
import NotificationsFormContainer from '../NotificationsForm/NotificationsFormContainer'
import ButtonIcon from '../../Atoms/ButtonIcon/ButtonIcon'
import IconTimes from '../../Atoms/Icons/IconTimes'
import { FiveTaps, Text } from '@shared/components'
import { DateFormat, ProjectDate } from '@shared/helpers'

import './Menu.css'

Menu.propTypes = {
  /** the menu can be shown or hidden */
  visible: PropTypes.bool.isRequired,

  /** Called after menu item has been selected */
  onMenuItem: PropTypes.func.isRequired,

  /** Called after the menu is hidden */
  onHide: PropTypes.func,

  /** Content of the main app */
  children: PropTypes.oneOfType([PropTypes.node]).isRequired,
}
Menu.defaultProps = {
  onHide: () => {},
}

export default function Menu({ onMenuItem, onHide, children, visible }) {
  const user = useContext(CurrentUserContext)
  const history = useHistory()

  // Bind ESC key to onHide
  useEffect(() => {
    const ESC_KEY = 27
    const handleKeyDown = evt => (evt.which === ESC_KEY ? onHide() : null)

    document.addEventListener('keydown', handleKeyDown)

    return function unmount() {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onHide])

  let MenuPanel = null
  let NotificationsPanel = null

  const handleFiveTaps = useCallback(() => {
    history.push('/environment')
  }, [history])

  MenuPanel = useMemo(
    () => (
      <Fragment>
        <div className="menu-banner">
          <ButtonIcon onClick={onHide} className="menu-close-button" data-testid="button-close-menu">
            <IconTimes color="white" size={16} />
          </ButtonIcon>
          <ProfilePicEdit
            displayName={user.displayName}
            profileImage={user.profileImage}
            className="menu-profile-pic"
            onClick={() =>
              onMenuItem({
                id: 'edit-profile-pic',
                label: 'Edit Profile Picture',
              })
            }
          />
          <div>
            <Text as="p" color="light" className="menu-user-name">
              {user.displayName || ' '}
            </Text>
            <Text as="p" size="tiny" className="menu-user-last-login" data-testid="user-last-login">
              Last Login {user.lastUserLogin && ProjectDate(user.lastUserLogin).formatLocal(DateFormat.LLL)}
            </Text>
          </div>
        </div>

        <MenuItem
          label="Calls"
          count={user.missedCallsCount}
          className="menu-calls"
          onClick={() =>
            onMenuItem({
              id: 'calls',
              label: 'calls',
            })
          }
        />

        <MenuItem label="Notifications" onClick={() => setActivePanel('notifications')} />

        <MenuItem
          label="Announcements"
          count={user.missedAnnouncementsCount}
          onClick={() =>
            onMenuItem({
              id: 'announcements',
              label: 'Announcements',
            })
          }
        />

        <MenuItem
          label="Settings"
          onClick={() =>
            onMenuItem({
              id: 'settings',
            })
          }
        />

        <MenuItem
          label="Update Password"
          onClick={() =>
            onMenuItem({
              id: 'update-password',
            })
          }
        />

        <MenuItem
          label="Update Phone Number"
          onClick={() =>
            onMenuItem({
              id: 'update-phone-number',
            })
          }
        />

        {!!user.currentTermsActivity && (
          <MenuItem
            label="View Terms &amp; Notices"
            onClick={() =>
              onMenuItem({
                id: 'terms',
              })
            }
          />
        )}

        <div className="menu-rule"></div>

        <MenuItem
          label="Sign Out"
          onClick={() =>
            onMenuItem({
              id: 'sign-out',
              label: 'Sign Out',
            })
          }
        />

        <div className="menu-logo">
          <FiveTaps onFiveTaps={handleFiveTaps}>
            <ProjectPowered logoColor="var(--brandcolor)" />
          </FiveTaps>
        </div>
      </Fragment>
    ),
    [
      handleFiveTaps,
      onHide,
      onMenuItem,
      user.currentTermsActivity,
      user.displayName,
      user.lastUserLogin,
      user.missedAnnouncementsCount,
      user.missedCallsCount,
      user.profileImage,
    ]
  )

  NotificationsPanel = useMemo(
    () => (
      <NotificationsFormContainer
        show={true}
        onClose={() => setActivePanel('menu')}
        onPause={onHide}
        onResume={onHide}
      />
    ),
    [onHide]
  )

  const [activePanel, setActivePanel] = useState('menu')

  const handleHide = () => {
    // Prevents the menu from being hidden while the notification panel is displayed
    // The time picker gets stuck floating in space if the menu closes while it is open
    if (activePanel === 'menu') {
      onHide()
    }
  }

  return (
    <Sidebar.Pushable>
      <Sidebar
        as={SidebarMenu}
        animation="overlay"
        inverted
        direction="right"
        onHide={handleHide}
        visible={visible}
        vertical
        width="wide"
        data-testid="app-menu">
        <div className="app-menu">{activePanel === 'menu' ? MenuPanel : NotificationsPanel}</div>
      </Sidebar>
      <Sidebar.Pusher dimmed={visible} style={{ height: '100%' }}>
        {children}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  )
}
