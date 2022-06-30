import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PatientSectionTitle from '../../Molecules/PatientSectionTitle/PatientSectionTitle'
import PatientButton from '../../Atoms/PatientButton/PatientButton'
import ProgramTagSection from '../../Molecules/ProgramTagSection/ProgramTagSection'

import './PatientDetails.css'

export default class PatientPrograms extends Component {
  static propTypes = {
    /** This list of programs a patient is enrolled in */
    enrollments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        completedOn: PropTypes.string,
        program: PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          isActive: PropTypes.bool.isRequired,
        }),
      })
    ).isRequired,
    /** A lookup list of all programs available to a patient */
    programsLookup: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    /** Called to add a program */
    onAddProgram: PropTypes.func.isRequired,
    /** Called when program edit is clicked */
    onEditProgram: PropTypes.func.isRequired,
    /** If true will show a loading spinner */
    loading: PropTypes.bool,
  }
  static defaultProps = {
    loading: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      showPrograms: false,
    }

    this.handleHidePrograms = this.handleHidePrograms.bind(this)
    this.handleShowPrograms = this.handleShowPrograms.bind(this)
  }

  handleShowPrograms = () => {
    this.props.onProgramRefresh()
    this.setState({ showPrograms: true })
  }

  handleHidePrograms() {
    this.setState({ showPrograms: false })
  }

  render() {
    const { enrollments, programsLookup, onAddProgram, onEditProgram, loading } = this.props
    const { showPrograms } = this.state

    const editModeClass = showPrograms ? 'patient-row--editing' : ''

    return (
      <div className="patientdetails-section-wrap patientdetails-section-programs">
        <PatientSectionTitle icon="flag" text="Programs" wrapStyle={{ marginTop: 0 }}>
          <PatientButton label="Enroll" icon="plus" onClick={this.handleShowPrograms} data-testid={`program-enroll`} />
        </PatientSectionTitle>

        <div className="patientdetails-section">
          <div className={`patientdetails-row ${editModeClass}`}>
            <ProgramTagSection
              title="Add Program"
              enrolledPrograms={enrollments}
              allPrograms={programsLookup}
              showSelectPane={showPrograms}
              onClose={this.handleHidePrograms}
              onAdd={onAddProgram}
              onEdit={(enrollmentId, id, name) => onEditProgram(enrollmentId, id, name)}
              loading={loading}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>
    )
  }
}
