import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Loader from '../../Atoms/Loader/Loader'
import PatientCard from '../../Organisms/PatientList/PatientCard'
import PatientListHeader from './PatientListHeader'
import SelectPane from '../../Organisms/SelectPane/SelectPane'

import InfiniteScroll from 'react-infinite-scroll-component'

import './PatientList.css'

import { USER_STATUS_LIST } from '../../../constants'

PatientList.propTypes = {
  /** Array of enterprises to display in dropdown */
  enterprises: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,

  /** Array of patients to show in list */
  patients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      overallStatus: PropTypes.oneOf(USER_STATUS_LIST).isRequired,
    })
  ).isRequired,

  /** Function called on enterprise change */
  onEnterpriseChange: PropTypes.func,

  /** Function called on patient change */
  onPatientChange: PropTypes.func,

  /** Id of the selected patient */
  selectedPatientId: PropTypes.string,

  /** Selected enterprise */
  selectedEnterprise: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),

  /** Function called when a patient information was updated in apollo cache */
  onPatientStatusUpdate: PropTypes.func.isRequired,

  /** Whether or not the patients are currently loading */
  patientsLoading: PropTypes.bool.isRequired,

  /** The current patients' page number, starting from 0 */
  patientsPageNumber: PropTypes.number.isRequired,

  /** Called, with the page number, after the paginated patients list has changed */
  patientsOnPageNumberChange: PropTypes.func.isRequired,

  /** Whether or not the enterprises are currently loading */
  enterprisesLoading: PropTypes.bool.isRequired,

  /** The current enterprises page number, starting from 0 */
  enterprisesPageNumber: PropTypes.number.isRequired,

  /** Called, with the page number, after the paginated enterprise list has changed */
  enterprisesOnPageNumberChange: PropTypes.func.isRequired,
}

PatientList.defaultProps = {
  onEnterpriseChange: () => {},
  onPatientChange: () => {},
}

export default function PatientList({
  enterprises = [],
  patients = [],
  onEnterpriseChange,
  onPatientChange,
  selectedPatientId,
  selectedEnterprise,
  onPatientStatusUpdate,
  patientsLoading,
  patientsPageNumber,
  patientsOnPageNumberChange,
  enterprisesLoading,
  enterprisesPageNumber,
  enterprisesOnPageNumberChange,
  ...rest
}) {
  const [show, setShow] = useState(false)
  const [patientsList, setPatientsList] = useState(patients)

  // When patient overallStatus is updated through apollo cache from querying
  // the overallStatus in patient detail, then reorder the list. This way if
  // the patient status changed it will reorder accordingly
  useEffect(() => {
    setPatientsList(onPatientStatusUpdate())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patients])

  const handlePatientClick = id => {
    onPatientChange(id)
  }

  const handleSelectPane = () => {
    if (enterprises.length > 1) {
      setShow(!show)
    }
  }

  const handleEnterpriseSelect = enterpriseId => {
    handleSelectPane()
    onEnterpriseChange(enterpriseId)
  }

  return (
    <div className="patientlist-wrap">
      {show ? (
        <SelectPane
          onClose={handleSelectPane}
          onSelect={handleEnterpriseSelect}
          items={enterprises}
          loading={enterprisesLoading}
          pageNumber={enterprisesPageNumber}
          onPageNumberChange={enterprisesOnPageNumberChange}
        />
      ) : (
        <React.Fragment>
          {selectedEnterprise && (
            <PatientListHeader
              {...rest}
              showSelect={handleSelectPane}
              title={selectedEnterprise.name}
              loading={enterprisesLoading}
            />
          )}
          <div className="patientlist-list" id="patient-list" data-testid="patient-list">
            <InfiniteScroll
              scrollableTarget="patient-list"
              dataLength={patientsList.length}
              next={() => patientsOnPageNumberChange(patientsPageNumber + 1)}
              hasMore={!patientsLoading}
              loading={patientsLoading}>
              {patientsList.map(user => (
                <PatientCard
                  key={user.id}
                  userName={user.displayName}
                  profileImage={user.profileImage ? user.profileImage : ''}
                  selected={user.id === selectedPatientId}
                  onClick={() => handlePatientClick(user.id)}
                  status={user.overallStatus}
                  showDnc={user.emailOptOut || user.smsOptOut}
                />
              ))}
            </InfiniteScroll>

            <div className="patientlist-loader">
              <Loader show={patientsLoading} style={{ backgroundColor: 'transparent' }} />
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}
