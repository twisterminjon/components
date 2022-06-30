import React, { Component } from 'react'

import Dimmer from '../../Atoms/Dimmer/Dimmer'
import ProjectPowered from '../../Atoms/ProjectPowered/ProjectPowered'

import './ServerIssue.css'

// REMOVE: after v2
export default class ServerIssue extends Component {
  render() {
    // Don't show if we're not connected to the internet
    if (!navigator.onLine) {
      return null
    }

    return (
      <div className="serverissue-wrap">
        <Dimmer show={true} />
        <div className="serverissue-content">
          <h1 className="serverissue-title">We're sorry but we are having connection issues at the moment.</h1>
          <p>This isn't your fault and we are looking into the issue.</p>

          <h3 className="serverissue-text">In the meantime, you can...</h3>
          <ul className="serverissue-list">
            <li className="serverissue-list-item">
              Go to our <a href="https://projectified/support/">support</a> page
            </li>
          </ul>
        </div>
        <ProjectPowered className="projectpowered-logo" />
      </div>
    )
  }
}
