import React from 'react'
import PropTypes from 'prop-types'

import TagCloud from '../../Molecules/TagCloud/TagCloud'
import PatientSurveyTag from '../../Molecules/PatientSurveyTag/PatientSurveyTag'
import ModalYesNo from '../../Molecules/ModalYesNo/ModalYesNo'
import SelectSideBar from '../../Molecules/SelectSideBar/SelectSideBar'
import PatientSectionTitle from '../../Molecules/PatientSectionTitle/PatientSectionTitle'
import PatientButton from '../../Atoms/PatientButton/PatientButton'

import './PatientDetails.css'

PatientSurvey.propTypes = {
  /** A list of surveys that the user can pick from (all available surveys) */
  assignableSurveys: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  /** A list of selected surveys to display */
  userSurveys: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      isActive: PropTypes.bool,
      isStarted: PropTypes.bool,
      interventionRequired: PropTypes.bool,
      sessionId: PropTypes.string,
    })
  ).isRequired,
  /** Show the selection pane */
  showSelectPane: PropTypes.bool,
  /** Survey to show in confirmation screen to assign */
  surveyToAssign: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
  /** Survey to show in confirmation screen to delete */
  surveyToUnassign: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
  /** Show loading indicator above surveys */
  loading: PropTypes.bool,
  /** Called when selection pane should show up */
  onShowSelectPane: PropTypes.func.isRequired,
  /** Called when delete is pressed on a survey */
  onUnassignSurvey: PropTypes.func.isRequired,
  /** Called when confirmation modal is dismissed */
  onHideConfirmation: PropTypes.func.isRequired,
  /** Called when user confirmed survey assignment */
  onAssignSurvey: PropTypes.func.isRequired,
  /** Called when user selects a survey to assign */
  onSelectSurvey: PropTypes.func.isRequired,
  /** Called when selection pane should close */
  onSidebarClose: PropTypes.func.isRequired,
  /** Called when user confirmed deletion of survey */
  onDeleteSurvey: PropTypes.func.isRequired,
  /** Called when user pressed intervention button on a survey */
  onIntervention: PropTypes.func.isRequired,
}

export default function PatientSurvey({
  showSelectPane,
  surveyToAssign,
  surveyToUnassign,
  loading,
  assignableSurveys,
  userSurveys,
  onShowSelectPane,
  onUnassignSurvey,
  onHideConfirmation,
  onAssignSurvey,
  onSelectSurvey,
  onSidebarClose,
  onDeleteSurvey,
  onIntervention,
}) {
  const title = 'Assessments'
  const editModeClass = showSelectPane ? 'patient-row--editing' : ''
  return (
    <div className="patientdetails-section-wrap patientdetails-section-careteams">
      <PatientSectionTitle icon="survey" text="Assessments" wrapStyle={{ marginTop: 0 }}>
        <PatientButton label="Assign" icon="plus" onClick={onShowSelectPane} data-testid={`assessment-assign`} />
      </PatientSectionTitle>

      <div className="patientdetails-section">
        <div className={`patientdetails-row ${editModeClass}`}>
          {/* Delete confirmation */}
          <ModalYesNo
            show={Boolean(surveyToUnassign)}
            title={`Do you want to remove '${surveyToUnassign && surveyToUnassign.name}"?`}
            message="Clicking Yes will remove the item."
            icon="delete"
            onYes={onUnassignSurvey}
            onNo={onHideConfirmation}
            defaultIsConfirm={false}
          />

          {/* Add confirmation */}
          <ModalYesNo
            show={Boolean(surveyToAssign)}
            title={`Do you want to add '${surveyToAssign && surveyToAssign.name}"?`}
            message="Clicking Yes will add the item."
            icon="question"
            onYes={onAssignSurvey}
            onNo={onHideConfirmation}
          />

          <div className={`tag-section-wrapper`} style={{ width: '100%' }}>
            <SelectSideBar
              loading={loading}
              show={showSelectPane}
              title={title}
              list={assignableSurveys}
              onSelect={onSelectSurvey}
              onCancel={onSidebarClose}
            />

            <TagCloud
              loading={loading}
              tags={userSurveys}
              onTagDelete={onDeleteSurvey}
              data-testid={`tag-cloud-${title}`}
              TagView={({ tagObject, ...props }) => {
                const { onTagDelete } = props

                const {
                  name,
                  id,
                  isActive: active,
                  isStarted: started,
                  interventionRequired,
                  surveySessionId,
                } = tagObject

                return (
                  <PatientSurveyTag
                    name={name}
                    id={id}
                    surveySessionId={surveySessionId}
                    active={active}
                    started={started}
                    interventionRequired={interventionRequired}
                    onIntervention={surveySessionId => onIntervention(surveySessionId)}
                    onTagDelete={onTagDelete}
                  />
                )
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
