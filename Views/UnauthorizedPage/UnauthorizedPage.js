import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Dimmer from '../../Atoms/Dimmer/Dimmer'
import DocTitle from '../../Atoms/DocTitle/DocTitle'
import ProjectPowered from '../../Atoms/ProjectPowered/ProjectPowered'

import './UnauthorizedPage.css'
// REMOVE: after v2
export default class UnauthorizedPage extends Component {
  render() {
    return (
      <div className="unauthorizedpage-wrap">
        <DocTitle title="Not Authorized" />

        <Dimmer show={true} />
        <div className="unauthorizedpage-content">
          <h1 className="unauthorizedpage-title">You are not allowed to access this page.</h1>
          <h2 className="unauthorizedpage-message">
            You may need to contact your administrator to have your account setup.
          </h2>
          <h3 className="unauthorizedpage-text">In the meantime, you can...</h3>
          <ul className="unauthorizedpage-list">
            <li className="unauthorizedpage-list-item">
              Go to the <Link to="/app/dashboard">dashboard</Link>
            </li>
            <li className="unauthorizedpage-list-item">
              Go to our <a href="https://projectified/support/">support</a> page
            </li>
          </ul>
        </div>
        <ProjectPowered className="projectpowered-logo" />
      </div>
    )
  }
}
