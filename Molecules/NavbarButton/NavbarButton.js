import React from 'react'
import { PropTypes } from 'prop-types'

import IconsNavbar from '../../Atoms/IconsNavbar/IconsNavbar'
import NotificationBadge from '../../Atoms/NotificationBadge/NotificationBadge'

import './NavbarButton.css'

NavbarButton.propTypes = {
  /** The type of button to display */
  type: PropTypes.oneOf(['home', 'staff', 'patients', 'message', 'calls']).isRequired,

  /** Can be in an active state */
  active: PropTypes.bool,

  /** Can show a notification badge with a count */
  count: PropTypes.number,

  /** Can show the count in various colors */
  countColor: PropTypes.oneOf(['red', 'yellow']),

  /** Called after the button is clicked */
  onClick: PropTypes.func.isRequired,

  /** ClassName for the wrapper */
  className: PropTypes.string,

  /** Style for the wrapper */
  style: PropTypes.object,
}
NavbarButton.defaultProps = {
  active: false,
  count: null,
  countColor: 'yellow',
  className: '',
  style: {},
}

export default function NavbarButton({ type, active, count, countColor, onClick, className, style }) {
  const types = {
    home: {
      label: 'Home',
    },
    staff: {
      label: 'Staff',
    },
    patients: {
      label: 'Patients',
    },
    message: {
      label: 'Messages',
    },
    calls: {
      label: 'Calls',
    },
  }

  const activeClass = active ? 'navbarbutton--active' : ''

  return (
    <button
      onClick={onClick}
      className={`navbarbutton ${className} ${activeClass}`.trim()}
      style={style}
      data-testid={`button-navbar-${type}`}>
      <div className={`navbarbutton-content`}>
        <div className="navbarbutton-icon">
          <IconsNavbar name={type} />
          {count > 0 && (
            <NotificationBadge count={count} className="navbarbutton-badge" negative={countColor === 'red'} />
          )}
        </div>
        <span>{types[type].label}</span>
      </div>
    </button>
  )
}
