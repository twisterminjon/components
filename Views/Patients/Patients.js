import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Switch } from 'react-router-dom'

import { Route } from '@shared/components'

import PatientListContainer from '../../Organisms/PatientList/PatientListContainer'
import PatientDetailsContainer from '../../Organisms/PatientDetails/PatientDetailsContainer'
import PatientDetailsEmpty from '../../Organisms/PatientDetails/PatientDetailsEmpty'
import SearchBarPatients from './SearchBarPatients'
import OnDemandMessageContainer from '../../Views/OnDemandMessage/OnDemandMessageContainer'
import ProgramDetails from '../../Views/ProgramDetails/ProgramDetails'
import DocTitle from '../../Atoms/DocTitle/DocTitle'
import PatientNewContainer from '../../Organisms/PatientDetails/PatientNewContainer'
import PatientMonitorContainer from '../../Organisms/PatientMonitor/PatientMonitorContainer'
import PatientSurveyInterventionContainer from '../../Views/PatientSurveyIntervention/PatientSurveyInterventionContainer'
import PatientSurveyInterventionMessageContainer from '../../Views/PatientSurveyInterventionMessage/PatientSurveyInterventionMessageContainer'

import './Patients.css'

// FIXME: Document what this is used for
const getIsPatientsWithoutId = path => {
  return /\/app\/enterprises\/\d+\/patientsV1\/?$/.test(path)
}

Patients.propTypes = {
  /** Called after a patient call button is clicked */
  onStartPatientCall: PropTypes.func.isRequired,
  /** Called after the call caregiver is clicked */
  onStartCaregiverCall: PropTypes.func.isRequired,
}

export default function Patients({ match, history, location, onStartPatientCall, onStartCaregiverCall }) {
  const [enterpriseId, setEnterpriseId] = useState(match.params.enterpriseId)
  const currentPath = location.pathname
  const patientListKey = useNewPatientAutoRefresh(location)

  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = useCallback(searchTerm => setSearchTerm(searchTerm), [])

  const handleEnterpriseChange = useCallback(id => setEnterpriseId(id), [])

  const handleNew = useCallback(() => {
    history.push(`/app/enterprises/${enterpriseId}/patientsV1/new`)
  }, [enterpriseId, history])

  return (
    <React.Fragment>
      <DocTitle title="Patients" />
      <SearchBarPatients className="patients-search-bar" onChange={handleSearch} onAdd={handleNew} value={searchTerm} />

      <div className="patients-wrap" data-testid="page-patient">
        <div className="patients-content">
          <PatientListContainer
            key={patientListKey}
            enterpriseId={enterpriseId}
            onEnterpriseChanged={handleEnterpriseChange}
            patientsFilter={searchTerm}
            match={match}
            history={history}
          />
        </div>

        {getIsPatientsWithoutId(currentPath) ? <PatientDetailsEmpty /> : null}

        <Switch>
          <Route
            path="/app/enterprises/:enterpriseId/patientsV1/new"
            exact
            render={props => {
              return <PatientNewContainer {...props} />
            }}
          />

          <Route
            path="/app/enterprises/:enterpriseId/patientsV1/:id"
            exact
            render={props => {
              return (
                <PatientDetailsContainer
                  onStartPatientCall={onStartPatientCall}
                  onStartCaregiverCall={onStartCaregiverCall}
                  {...props}
                />
              )
            }}
          />

          <Route
            path="/app/enterprises/:enterpriseId/patientsV1/:id/ondemand-message"
            exact
            render={props => {
              return <OnDemandMessageContainer {...props} />
            }}
          />

          <Route
            exact
            path="/app/enterprises/:enterpriseId/patientsV1/:patientId/care-programs/:programId/enrollments/:enrollmentId"
            render={props => {
              return <ProgramDetails {...props} />
            }}
          />

          {/**
           * Survey interventions
           */}
          <Route
            exact
            path="/app/enterprises/:enterpriseId/patientsV1/:patientId/alerts/:surveySessionId"
            render={props => <PatientSurveyInterventionContainer {...props} />}
          />

          <Route
            exact
            path="/app/enterprises/:enterpriseId/patientsV1/:patientId/alerts/:surveySessionId/answers/:answerId/send"
            render={props => <PatientSurveyInterventionMessageContainer {...props} />}
          />

          <Route
            exact
            path="/app/enterprises/:enterpriseId/patientsV1/:id/monitor"
            render={props => {
              return <PatientMonitorContainer onStartPatientCall={onStartPatientCall} {...props} />
            }}
          />
        </Switch>
      </div>
    </React.Fragment>
  )
}

/**
 * Forces PatientListContainer to re-render w/ a clean slate when a new patient
 * is added.
 *
 * Note: (jh) I also experimented w/ useForceUpdate for this, and it doesn't work
 * for this because the internal state of PatientListContainer needs to be
 * fully reset, else either the scroll functionality doesn't work and / or
 * the list appears out of order.
 *
 * @param {Object} location Location object exposed by React Router.
 * @return {number} Utilized in PatientListContainer key prop.
 */
function useNewPatientAutoRefresh(location) {
  const [patientListKey, setPatientListKey] = useState(-1)
  const fromAddPatient = location && location.state && location.state.fromAddPatient ? true : false

  // Refetch when add patient
  useEffect(() => {
    if (fromAddPatient) {
      setPatientListKey(patientListKey => ++patientListKey)
    }
  }, [fromAddPatient])

  return patientListKey
}
