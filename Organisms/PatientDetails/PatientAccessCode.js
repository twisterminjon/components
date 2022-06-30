import React from 'react'
import PropTypes from 'prop-types'

import PatientSectionTitle from '../../Molecules/PatientSectionTitle/PatientSectionTitle'
import PatientButton from '../../Atoms/PatientButton/PatientButton'

import './PatientAccessCode.css'
PatientAccessCode.propTypes = {
  /** Login key of Patient */
  accessCode: PropTypes.shape({
    code: PropTypes.string.isRequired,
    isExpired: PropTypes.bool.isRequired,
  }).isRequired,

  /** Call to generate new login key */
  onGetNewCode: PropTypes.func.isRequired,

  /** Will show loading indicator on 'Get new Code' button */
  loading: PropTypes.bool.isRequired,

  /** ClassName for the wrapper */
  className: PropTypes.string,

  /** Style for the wrapper */
  style: PropTypes.object,
}
PatientAccessCode.defaultProps = {
  className: '',
  style: {},
}

export default function PatientAccessCode({ accessCode, onGetNewCode, loading, className, style }) {
  let { code, isExpired } = accessCode

  // If an login key is expired, it's value maybe null
  isExpired = code === null || code === undefined || isExpired

  const expiredClass = isExpired ? 'patientaccesscode--strike' : ''
  const codeOverride = isExpired ? 'XXXXX' : code

  return (
    <div style={style} className={`patientdetails-section-wrap ${className}`}>
      <PatientSectionTitle icon="key" text="Login Key" wrapStyle={{ marginTop: 0, marginBottom: 16 }}>
        <PatientButton
          icon="plus"
          loading={loading}
          label="Get new code"
          onClick={onGetNewCode}
          data-testid={`butt-get-access-code`}
        />
      </PatientSectionTitle>

      <div className="patientaccesscode patientdetails-section">
        <span className={`${expiredClass}`.trim()} data-testid="patientaccesscode-text">
          {codeOverride}
        </span>
        {isExpired && (
          <span className="patientaccesscode-expired" data-testid="patientaccesscode-text">
            Expired
          </span>
        )}
      </div>
    </div>
  )
}
