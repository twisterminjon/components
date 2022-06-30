import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'

import { DateFormat, ProjectDate } from '@shared/helpers'

import Meter from './Meter'
import ModalRequestReadingToast from '../../Molecules/ModalRequestReadingToast/ModalRequestReadingToast'
import SpinnerDots from '../../Atoms/SpinnerDots/SpinnerDots'
import AccordionTab from '../../Atoms/AccordionTab/AccordionTab'
import Button from '../../Atoms/Button/Button'

const VITAL_DEFS = {
  pulse_ox: {
    key: 'pulse_ox',
    label: 'SpO2',
    name: 'Oxygen Level',
  },
  hr: {
    key: 'hr',
    label: 'HR',
    name: 'Heart Rate',
  },
  temp: {
    key: 'temp',
    label: 'temp',
    name: 'Body Temperature',
  },
  weight: {
    key: 'weight',
    label: 'weight',
    name: 'Weight',
  },
  bp: {
    key: 'bp',
    label: 'BP',
    systolic: 'Blood Pressure (Systolic)',
    diastolic: 'Blood Pressure (Diastolic)',
  },
  glucose: {
    key: 'glucose',
    label: 'glucose',
    name: 'Glucose Concentration',
  },
  noValue: 'N/A',
}

PatientMonitor.propTypes = {
  /** Can show a loader */
  loading: PropTypes.bool,

  /** Can show a loader in request button */
  requesting: PropTypes.bool,

  /** Can show a different screen when the feature is on/off for the enterprise */
  featureAllowed: PropTypes.bool,

  /** The vitals for the patient */
  readings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      measuredAt: PropTypes.string.isRequired,
      vitals: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          value: PropTypes.number.isRequired,
          units: PropTypes.string.isRequired,
          isIntervention: PropTypes.bool.isRequired,
          vital: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired
      ).isRequired,
    }).isRequired
  ).isRequired,

  /** Current setting for units */
  units: PropTypes.oneOf(['imperial', 'metric']).isRequired,

  /** Called of the close action */
  onClose: PropTypes.func.isRequired,

  /** Called on Vital request */
  onRequest: PropTypes.func.isRequired,

  /** ClassName for the wrapper */
  className: PropTypes.string,

  /** Style for the wrapper */
  style: PropTypes.object,
}

PatientMonitor.defaultProps = {
  loading: false,
  requesting: false,
  user: null,
  className: '',
  style: {},
}

export default function PatientMonitor({ onClose, onRequest, className, style, ...rest }) {
  const [show, setShow] = useState(false)

  const closeRequestModal = useCallback(() => setShow(false), [])
  const showRequestModal = useCallback(() => setShow(true), [])
  const handleRequest = useCallback(
    vital => {
      closeRequestModal()
      onRequest(vital)
    },
    [closeRequestModal, onRequest]
  )

  return (
    <div className={`patientmonitor ${className}`.trim()} style={style}>
      <AccordionTab label="Monitoring" fluid onActivate={onClose} data-testid="button-back" inverted direction="times">
        Monitoring
      </AccordionTab>
      <RenderContent onRequest={showRequestModal} {...rest} />
      <ModalRequestReadingToast show={show} onRequest={handleRequest} onCancel={closeRequestModal} />
    </div>
  )
}

/**
 * This is a wrapper to make it simpler to determine what gets rendered in the content
 * area of the page.
 */
const RenderContent = ({ loading, requesting, featureAllowed, onRequest, readings, units }) => {
  if (!featureAllowed) {
    return (
      <p className="patientmonitor-blank" data-testid="not-allowed">
        The Patient Monitoring feature is not allowed in this enterprise
      </p>
    )
  }

  if (loading) {
    return <SpinnerDots className="patientmonitor-loader" />
  }

  if (readings.length === 0) {
    return (
      <React.Fragment>
        <div className="patientmonitor-header patientmonitor-header-request-only">
          <Button
            data-testid="request-reading"
            loading={requesting}
            disabled={requesting}
            size="medium"
            onClick={onRequest}>
            Request Reading
          </Button>
        </div>
        <p className="patientmonitor-blank" data-testid="monitor-not-available">
          There is no monitoring for this patient
        </p>
      </React.Fragment>
    )
  }

  return <Monitors onRequest={onRequest} reading={readings[0]} units={units} />
}

const Monitors = ({ reading, units, onRequest, requesting }) => {
  return (
    <React.Fragment>
      <div className="patientmonitor-header">
        <div className="patientmonitor-timestamp">
          <span>Last Update</span>
          <span data-testid="updated-on">{ProjectDate(reading.measuredAt).format(DateFormat.DateTime2)}</span>
        </div>
        <Button
          data-testid="request-reading"
          loading={requesting}
          disabled={requesting}
          size="medium"
          onClick={onRequest}>
          Request Reading
        </Button>
      </div>

      <Meter
        value={getValue({
          vitals: reading.vitals,
          name: VITAL_DEFS.bp.key,
        })}
        isIntervention={getIsIntervention({
          vitals: reading.vitals,
          name: VITAL_DEFS.bp.key,
        })}
        label={VITAL_DEFS.bp.label}
      />
      <Meter
        value={getValue({
          vitals: reading.vitals,
          name: VITAL_DEFS.pulse_ox.key,
        })}
        isIntervention={getIsIntervention({
          vitals: reading.vitals,
          name: VITAL_DEFS.pulse_ox.key,
        })}
        label={VITAL_DEFS.pulse_ox.label}
      />
      <Meter
        value={getValue({ vitals: reading.vitals, name: VITAL_DEFS.hr.key })}
        isIntervention={getIsIntervention({
          vitals: reading.vitals,
          name: VITAL_DEFS.hr.key,
        })}
        label={VITAL_DEFS.hr.label}
      />
      <Meter
        value={getValue({ vitals: reading.vitals, name: VITAL_DEFS.temp.key })}
        isIntervention={getIsIntervention({
          vitals: reading.vitals,
          name: VITAL_DEFS.temp.key,
        })}
        label={`${VITAL_DEFS.temp.label} ${units === 'metric' ? '(c)' : '(f)'}`}
      />
      <Meter
        value={getValue({
          vitals: reading.vitals,
          name: VITAL_DEFS.weight.key,
        })}
        isIntervention={getIsIntervention({
          vitals: reading.vitals,
          name: VITAL_DEFS.weight.key,
        })}
        label={`${VITAL_DEFS.weight.label} ${units === 'metric' ? '(kg)' : '(lb)'}`}
      />
      <Meter
        value={getValue({
          vitals: reading.vitals,
          name: VITAL_DEFS.glucose.key,
        })}
        isIntervention={getIsIntervention({
          vitals: reading.vitals,
          name: VITAL_DEFS.glucose.key,
        })}
        label={`${VITAL_DEFS.glucose.label} ${units === 'metric' ? '(mmol/L)' : '(mg/dL)'}`}
      />
      <div style={{ paddingTop: 'var(--bottom-whitespace-v1)' }} />
    </React.Fragment>
  )
}

/**
 * Retrieve a value for a specific vital
 *
 * @param {array} vitals - The array of all vitals for the patient
 * @param {string} name - The name of the vital to return
 *
 * @return {string} The value
 */
const getValue = ({ vitals, name }) => {
  let vital = []

  /** Get the value for a vital if it exists, else return no value */
  const returnVital = vital => {
    if (vital.length === 0) return VITAL_DEFS.noValue

    // Vitals may exist but have no ready. This is indicated by the id being null.
    if (!vital[0].id) return VITAL_DEFS.noValue

    // We have a good vital
    return vital[0].value
  }

  // BP is different as it is 2 values combined
  if (name === VITAL_DEFS.bp.key) {
    const systolic = returnVital(vitals.filter(v => v.vital.name === VITAL_DEFS.bp.systolic))
    const diastolic = returnVital(vitals.filter(v => v.vital.name === VITAL_DEFS.bp.diastolic))

    if (systolic === VITAL_DEFS.noValue || diastolic === VITAL_DEFS.noValue) {
      // no reading
      return VITAL_DEFS.noValue
    } else {
      return `${systolic}/${diastolic}`
    }
  }

  // Any other vitals follow the same pattern
  vital = vitals.filter(v => v.vital.name === VITAL_DEFS[name].name)
  return returnVital(vital)
}

/**
 * Retrieve an alarm for a specific vital
 *
 * @param {array} vitals - The array of all vitals for the patient
 * @param {string} name - The name of the vital to return
 *
 * @return {boolean} The value
 */
const getIsIntervention = ({ vitals, name }) => {
  /** Get the alarm for a vital if it exists, else return false */
  const returnIsIntervention = vital => {
    if (vital.length === 0 || !vital[0].id) return false
    return vital[0].isIntervention
  }

  // BP is different as it is 2 values combined
  if (name === VITAL_DEFS.bp.key) {
    const systolicAlarm = returnIsIntervention(vitals.filter(v => v.vital.name === VITAL_DEFS.bp.systolic))
    const diastolicAlarm = returnIsIntervention(vitals.filter(v => v.vital.name === VITAL_DEFS.bp.diastolic))

    return systolicAlarm || diastolicAlarm
  }

  // Any other vitals follow the same pattern
  return returnIsIntervention(vitals.filter(v => v.vital.name === VITAL_DEFS[name].name))
}
