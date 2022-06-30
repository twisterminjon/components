import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ReminderCard from '../../Molecules/ReminderCard/ReminderCard'
import DocTitle from '../../Atoms/DocTitle/DocTitle'

import './Assessment.css'

export default class Assessment extends Component {
  static propTypes = {
    /** An array of assigned assessments */
    surveys: PropTypes.array,

    /** Called after an assessment is activated */
    onOpenSurvey: PropTypes.func.isRequired,
  }
  static defaultProps = {
    surveys: [],
  }

  render() {
    const { surveys, onOpenSurvey } = this.props

    if (surveys.length === 0) {
      return <p className="assessments-none-message">You don't have any assessments to complete at this time.</p>
    }

    const renderSurveys = surveys.map(survey => {
      return (
        <ReminderCard
          onOpen={() => onOpenSurvey(survey.id)}
          customMessage={survey.title}
          key={survey.id}
          type="survey"
          age={survey.dateAssign || ''} // FIXME: The data should have a dateAssign but it's seems to be missing, adding the or to get rid of the console error
          status={survey.isStarted}
        />
      )
    })

    return (
      <div className="assessment-wrap">
        <DocTitle title="Assessment" />
        <div className="assessment-content">{renderSurveys}</div>
      </div>
    )
  }
}
