import React from 'react'
import PropTypes from 'prop-types'

import ButtonGhost from '../../Atoms/ButtonGhost/ButtonGhost'

CaregiverAccessCode.propTypes = {
  /** Login key of Caregiver */
  accessCode: PropTypes.shape({
    code: PropTypes.string,
    isExpired: PropTypes.bool.isRequired,
  }).isRequired,

  /** Call to generate new login key */
  onGetNewCode: PropTypes.func.isRequired,

  /** Will show loading indicator on 'Get new Code' button */
  loading: PropTypes.bool,

  /** ClassName for the wrapper */
  className: PropTypes.string,

  /** Style for the wrapper */
  style: PropTypes.object,
}
CaregiverAccessCode.defaultProps = {
  loading: false,
  className: '',
  style: {},
}

export default function CaregiverAccessCode({ accessCode, onGetNewCode, loading, className, style }) {
  let { code, isExpired } = accessCode

  // If an login key is expired, it's value maybe null
  isExpired = code === null || code === undefined || isExpired

  const expiredClass = isExpired ? 'patientaccesscode--strike' : ''
  const codeOverride = isExpired ? 'XXXXX' : code

  return (
    <div className={`caregiveraccesscode ${className}`.trim()} style={style}>
      <div className="caregiveraccesscode--col">
        <p>Login Key</p>
        <div className="caregiveraccesscode-code">
          <span className={`${expiredClass}`.trim()}>{codeOverride}</span>
          {isExpired && <span className="caregiveraccesscode-expired">expired</span>}
        </div>
      </div>
      <div>
        <ButtonGhost loading={loading} onClick={onGetNewCode}>
          New Code
        </ButtonGhost>
      </div>
    </div>
  )
}
