import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'

import { DateFormat, ProjectDate } from '@shared/helpers'

import Button from '../../Atoms/Button/Button'
import MenuItem from '../../Molecules/MenuItem/MenuItem'

import './NotificationsForm.css'
import NotificationsPauseToast from '../../Molecules/NotificationsPauseToast/NotificationsPauseToast'

export default class NotificationsForm extends Component {
  static propTypes = {
    /** Called after the close button is clicked */
    onClose: PropTypes.func.isRequired,

    /** Called after notifications are paused  */
    onPause: PropTypes.func.isRequired,

    /** Set to true if notifications are paused */
    paused: PropTypes.bool,

    /** Called after notifications are resumed */
    onResume: PropTypes.func.isRequired,

    /** DateTime when notifications should be paused */
    defaultPauseStartDateTime: PropTypes.string,

    /** DateTime when notifications should be unpaused */
    defaultPauseEndDateTime: PropTypes.string,

    /** Whether notifications are scheduled to be paused */
    scheduled: PropTypes.bool,
  }

  static defaultProps = {
    paused: false,
    defaultPauseStartDateTime: '',
    defaultPauseEndDateTime: '',
    scheduled: false,
  }

  constructor(props) {
    super(props)

    this.state = {
      showingNotificationsPauseToast: false,
    }
  }

  /**
   * Shows or hides the custom time picker.
   *
   * @param {boolean} isShowing
   */
  handleShowNotificationPauseToast(isShowing = true) {
    this.setState({
      showingNotificationsPauseToast: isShowing,
    })
  }

  handlePause = ({ startDateTime, endDateTime }) => {
    const { onPause } = this.props

    if (typeof onPause === 'function') {
      onPause({
        startDateTime,
        endDateTime,
      })
    }
  }

  /**
   * Creates a time range from the current dayjs to the end dayjs
   *
   * @param {dayjs.Moment} endMoment? [optional]
   * @return {Object}
   */
  createPauseTimeRange(endMoment = null) {
    const startDateTime = ProjectDate().now(DateFormat.DateTime3)
    const endDateTime = endMoment ? endMoment.format(DateFormat.DateTime3) : null

    return {
      startDateTime,
      endDateTime,
    }
  }

  render() {
    const {
      onPause,
      paused,
      onResume,
      defaultPauseStartDateTime,
      defaultPauseEndDateTime,
      onClose,
      scheduled,
    } = this.props
    const { showingNotificationsPauseToast } = this.state

    // Menu options to turn on pausing
    const pauseMenuOptions = [
      {
        name: 'until-off',
        label: 'Until I turn off',
        onClick: () => onPause(this.createPauseTimeRange(null)),
      },
      {
        name: '30-minutes',
        label: '30 minutes',
        onClick: () => onPause(this.createPauseTimeRange(dayjs().add(30, 'minutes'))),
      },
      {
        name: '1-hour',
        label: '1 hour',
        onClick: () => onPause(this.createPauseTimeRange(dayjs().add(1, 'hour'))),
      },
      {
        name: '2-hours',
        label: '2 hours',
        onClick: () => onPause(this.createPauseTimeRange(dayjs().add(2, 'hours'))),
      },
      {
        name: '4-hours',
        label: '4 hours',
        onClick: () => onPause(this.createPauseTimeRange(dayjs().add(4, 'hours'))),
      },
      {
        name: 'until-tomorrow',
        label: 'Until tomorrow',
        onClick: () => onPause(this.createPauseTimeRange(dayjs().add(1, 'day').startOf('day'))),
      },
      {
        name: 'custom',
        label: 'Custom',
        onClick: () => this.handleShowNotificationPauseToast(true),
      },
    ]

    // Menu options to turn off, or adjust, pausing
    const unpauseMenuOptions = [
      {
        name: 'turn-on-notifications',
        label: 'Turn notifications back on',
        onClick: onResume,
      },
      {
        name: 'adjust-time',
        label: 'Adjust the time',
        onClick: () => this.handleShowNotificationPauseToast(true),
      },
    ]

    const menuOptions = !paused ? pauseMenuOptions : unpauseMenuOptions

    return (
      <div className="notificationsform" data-testid="notificationsform">
        <div className="notificationsform-title notificationsform-section">Notifications</div>
        <hr />
        <div className="notificationsform-section">
          {paused ? (
            <Fragment>
              <p>Your notifications are paused.</p>
              <p>Would you like to</p>
            </Fragment>
          ) : (
            <Fragment>
              <p>Pause your notifications.</p>
              <p>When your notifications are paused other users will be notified that you are unavailable.</p>
            </Fragment>
          )}
        </div>
        <hr />
        <div>
          {menuOptions.map(({ name, label, onClick }, idx) => (
            <MenuItem
              data-testid={`notificationsform-menu-item-${label}`}
              key={idx}
              name={name}
              onClick={onClick}
              label={label}
            />
          ))}
        </div>
        {scheduled && (
          <Fragment>
            <hr />
            <MenuItem
              data-testid={`notificationsform-menu-item-adjust-scheduled-pause-time`}
              name={'adjust-scheduled-pause-time'}
              onClick={() => this.handleShowNotificationPauseToast(true)}
              label="Adjust scheduled pause time"
            />
            <MenuItem
              data-testid={`notificationsform-menu-item-cancel-schedule`}
              name={'cancel-schedule'}
              onClick={onResume}
              label="Cancel scheduled pause"
            />
          </Fragment>
        )}
        <div className="notificationsform-section notificationsform-section--last">
          <Button data-testid="notificationsform-close-button" size="big" fluid onClick={onClose}>
            Close
          </Button>
        </div>

        {showingNotificationsPauseToast && (
          <NotificationsPauseToast
            show={true}
            defaultStartDateTime={defaultPauseStartDateTime}
            defaultEndDateTime={defaultPauseEndDateTime}
            onPause={pauseData => {
              this.handleShowNotificationPauseToast(false)
              this.handlePause(pauseData)
            }}
            onCancel={() => this.handleShowNotificationPauseToast(false)}
          />
        )}
      </div>
    )
  }
}
