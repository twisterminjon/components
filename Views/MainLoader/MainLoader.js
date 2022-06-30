import React, { Component } from 'react'

import Dimmer from '../../Atoms/Dimmer/Dimmer'
import ProjectPowered from '../../Atoms/ProjectPowered/ProjectPowered'
import SpinnerDots from '../../Atoms/SpinnerDots/SpinnerDots'
import Button from '../../Atoms/Button/Button'
import { delayBeforeShowingMainLoaderWarning } from '../../../config'
import DocTitle from '../../Atoms/DocTitle/DocTitle'

import './MainLoader.css'

import debug from 'debug'
const d = debug('project:MainLoader')

export default class MainLoader extends Component {
  state = {
    showReload: false,
  }

  componentDidMount() {
    // we want to delay before showing a reload issue.
    // This was added to help with network outage issues identified in ST-3221
    // Sometimes, when we try to recover from an outage, the current user quey will
    // get stuck in a loading state and show this loader. When that happens, we
    // want to let the user 'know' something is wrong so they can refresh.

    this.reloadTimer = setTimeout(() => {
      d(`showing reload warning`)
      this.setState({ showReload: true })
    }, delayBeforeShowingMainLoaderWarning)
  }

  componentWillUnmount() {
    clearTimeout(this.reloadTimer)
  }

  handleRefresh = () => {
    window.location.reload()
  }

  render() {
    const { showReload } = this.state

    const warningClass = showReload ? 'mainloader-warning--show' : ''

    return (
      <div className="mainloader-wrap">
        <DocTitle />

        <Dimmer show={true} backgroundColor="black" />
        <div className="mainloader-content">
          <p>Loading Provider Portal</p>
          <SpinnerDots />
          <div className={`mainloader-warning ${warningClass}`.trim()}>
            <p>There appears to be a connection issue, please try reloading to restart Provider Portal</p>
            <Button onClick={this.handleRefresh}>Reload</Button>
          </div>
          <ProjectPowered className="mainloader-logo" />
        </div>
      </div>
    )
  }
}
