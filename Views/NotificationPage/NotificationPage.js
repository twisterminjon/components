import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Dimmer from '../../Atoms/Dimmer/Dimmer'
import ProjectPowered from '../../Atoms/ProjectPowered/ProjectPowered'

import './NotificationPage.css'

export default class NotificationPage extends Component {
  static propTypes = {
    /** A title for the page */
    title: PropTypes.string.isRequired,
    /** Can show a desciptive message */
    message: PropTypes.string,
    /** Can show a link to return to the dashboard */
    showDashboardLink: PropTypes.bool,
    /** Can show a link to the login page */
    showLoginLink: PropTypes.bool,
  }
  static defaultProps = {
    message: '',
    showDashboardLink: false,
    showLoginLink: true,
  }

  render() {
    const { title, message, showDashboardLink, showLoginLink, ...rest } = this.props

    return (
      <div className="notificationpage-wrap" {...rest}>
        <Dimmer show={true} />
        <div className="notificationpage-content">
          <h1 className="notificationpage-title">{title}</h1>

          <p>{message}</p>

          <h3 className="notificationpage-text">In the meantime, you can...</h3>
          <ul className="notificationpage-list">
            {showDashboardLink && (
              <li className="notificationpage-list-item">
                Go to the <Link to="/app/dashboard">dashboard</Link>
              </li>
            )}
            {showLoginLink && (
              <li className="notificationpage-list-item">
                Go to the <Link to="/login">login</Link> page
              </li>
            )}
            <li className="notificationpage-list-item">
              Go to our <a href="https://projectified/support/">support</a> page
            </li>
          </ul>
        </div>
        <ProjectPowered className="projectpowered-logo" />
      </div>
    )
  }
}
