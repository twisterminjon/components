import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Dimmer from '../../Atoms/Dimmer/Dimmer'
import DocTitle from '../../Atoms/DocTitle/DocTitle'
import ProjectPowered from '../../Atoms/ProjectPowered/ProjectPowered'

import './NotFound.css'

// REMOVE: after v2
export default class NotFound extends Component {
  render() {
    return (
      <div className="notfound-wrap">
        <DocTitle />

        <Dimmer show={true} />
        <div className="notfound-content">
          <h1 className="notfound-title">We couldn't find that page.</h1>

          <h3 className="notfound-text">In the meantime, you can...</h3>
          <ul className="notfound-list">
            <li className="notfound-list-item">
              Go to the <Link to="/app/dashboard">dashboard</Link>
            </li>
            <li className="notfound-list-item">
              Go to our <a href="https://projectified/support/">support</a> page
            </li>
          </ul>
        </div>
        <ProjectPowered className="projectpowered-logo" />
      </div>
    )
  }
}
