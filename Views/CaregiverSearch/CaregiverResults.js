import React, { Component } from 'react'
import PropTypes from 'prop-types'

import UserCardCaregiver from '../../Molecules/UserCardCaregiver/UserCardCaregiver'
import SpinnerDots from '../../Atoms/SpinnerDots/SpinnerDots'

import './CaregiverSearch.css'

import debug from 'debug'
const d = debug('project:CaregiversResults')

export default class CaregiverResults extends Component {
  static propTypes = {
    /** List of caregivers to display */
    caregivers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        user: PropTypes.shape({
          displayName: PropTypes.string.isRequired,
          phone: PropTypes.string.isRequired,
          profileImage: PropTypes.string.isRequired,
        }).isRequired,
      })
    ),
    /** Called after the Add button is clicked */
    onAdd: PropTypes.func.isRequired,
    /** Called after a caregiver is selecte */
    onSelect: PropTypes.func.isRequired,
    /** Can show a loading indicator */
    loading: PropTypes.bool,
  }
  static defaultProps = {
    caregivers: [],
    loading: false,
  }

  render() {
    const { caregivers, loading } = this.props

    if (loading) {
      return (
        <div className="caregiverresults-loader center">
          <SpinnerDots />
          <p>Searching for caregiver</p>
        </div>
      )
    }

    const renderCaregivers = caregivers.map(cg => (
      <UserCardCaregiver
        key={cg.id}
        onClick={() => {
          this.props.onSelect(cg.id, cg.user.displayName)
        }}
        isActive={true}
        canOdm={false}
        canCall={false}
        canMessage={false}
        showMenuButton={false}
        sendProgramEvents={false}
        displayName={cg.user.displayName}
        profileImage={cg.user.profileImage}
        phone={cg.user.phone}
      />
    ))

    d(`found ${caregivers.length} caregivers`)

    return (
      <div className="caregiverresults" data-testid="caregiver-results">
        <ul>{renderCaregivers}</ul>
      </div>
    )
  }
}
