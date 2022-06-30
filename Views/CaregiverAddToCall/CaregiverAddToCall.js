import React, { Component } from 'react'
import PropTypes from 'prop-types'

import UserCardCaregiver from '../../Molecules/UserCardCaregiver/UserCardCaregiver'
import IconChevronLeft from '../../Atoms/Icons/IconChevronLeft'

import './CaregiverAddToCall.css'

import debug from 'debug'
const d = debug('project:CaregiverAddToCall')

export default class CaregiverAddToCall extends Component {
  static propTypes = {
    /** Array of users to display */
    caregivers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        user: PropTypes.shape({
          id: PropTypes.string.isRequired,
          displayName: PropTypes.string.isRequired,
          profileImage: PropTypes.string,
          overallStatus: PropTypes.string.isRequired,
        }).isRequired,
      })
    ),
    /** Function called when the call button is clicked */
    onStartCall: PropTypes.func.isRequired,
    /** Called after the back to call button is clicked */
    onBack: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props)

    this.handleClose = this.handleClose.bind(this)
    this.handleStartCall = this.handleStartCall.bind(this)
  }

  handleStartCall(id, displayName, profileImage) {
    const user = {
      id,
      displayName,
      profileImage,
    }
    d(`calling user ${user.id}, ${user.displayName}`)

    this.props.onStartCall(user)
  }

  handleClose() {
    this.setState({ navigateToDashboard: true })
    d(`closing`)
  }

  render() {
    const { caregivers, onBack, className, style } = this.props

    const bgColor = { backgroundColor: 'rgb(0, 20, 51)' }
    const styleOverride = { ...bgColor, ...style }

    let renderCaregivers = null
    if (caregivers.length > 0) {
      renderCaregivers = caregivers.map(cg => (
        <UserCardCaregiver
          key={cg.id}
          canOdm={false}
          canMessage={false}
          canCall={true}
          showMenuButton={false}
          sendProgramEvents={false}
          displayName={cg.user.displayName}
          profileImage={cg.user.profileImage}
          status={cg.user.overallStatus}
          dialStatus={cg.user.overallStatus}
          onCall={() => this.handleStartCall(cg.user.id, cg.user.displayName, cg.user.profileImage)}
          onClick={() => this.handleStartCall(cg.user.id, cg.user.displayName, cg.user.profileImage)}
          data-testid={`caregiver-card-${cg.user.displayName}`}
        />
      ))
    } else {
      renderCaregivers = <p>No caregivers are assigned to this patient</p>
    }

    return (
      <div className={`caregiveraddtocall ${className}`} style={styleOverride} data-testid="caregiver-add-to-call">
        <div className="caregiveraddtocall-back--row">
          <button className="caregiveraddtocall-back" onClick={onBack} data-testid="go-back">
            <IconChevronLeft color="var(--white)" style={{ marginRight: 28 }} />
            <span>Caregivers</span>
          </button>
        </div>
        {renderCaregivers}
      </div>
    )
  }
}
