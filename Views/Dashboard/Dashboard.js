import React from 'react'
import PropTypes from 'prop-types'

import GroupCardsContainer from '../../Organisms/GroupCards/GroupCardsContainer'
import FavBarContainer from '../../Organisms/FavBar/FavBarContainer'
import DocTitle from '../../Atoms/DocTitle/DocTitle'

import './Dashboard.css'

Dashboard.propTypes = {
  /** Called after an action to start a call */
  onStartCall: PropTypes.func.isRequired,

  /** Can show a button to start an assessment */
  showAssessment: PropTypes.bool,
}
Dashboard.defaultProps = {
  showAssessment: false,
}

export default function Dashboard({ onStartCall, showAssessment, ...rest }) {
  const handleOnAssessment = () => {
    rest.history.push('/app/surveys')
  }

  return (
    <div className="dashboard-container" data-testid="page-home">
      <DocTitle title="Home" />
      <FavBarContainer onFavoriteClick={onStartCall} {...rest} />
      {showAssessment && <AssessmentButton onAction={handleOnAssessment} />}
      <GroupCardsContainer {...rest} />
    </div>
  )
}

const AssessmentButton = ({ onAction }) => {
  return (
    <button onClick={onAction} className="dashboard-assessment-button" data-testid="assessment-button">
      <span className="dashboard--bold">Assessment assigned</span> Click here to complete >>
    </button>
  )
}
