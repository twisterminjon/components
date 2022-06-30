import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import Button from '../../Atoms/Button/Button'
import ModalToast from '../../Atoms/ModalToast/ModalToast'
import ButtonGhost from '../../Atoms/ButtonGhost/ButtonGhost'

import './ModalRequestReadingToast.css'

ModalRequestReadingToast.propTypes = {
  /** The model can be shown or hidden */
  show: PropTypes.bool.isRequired,
  /** Called after the vital button is clicked */
  onRequest: PropTypes.func.isRequired,
  /** Called after the cancel button is clicked */
  onCancel: PropTypes.func.isRequired,
}

export const RequestVital = {
  temperature: 'Temperature',
  blood_pressure: 'Blood Pressure',
  heart_rate: 'Heart Rate',
  spo2: 'Sp02',
  weight: 'Weight',
  glucose: 'Glucose',
}

export const vitals = Object.entries(RequestVital).map(([key, value]) => ({ key, value }))

export default function ModalRequestReadingToast({ show, onRequest, onCancel }) {
  const handleRequest = useCallback(vital => onRequest(vital), [onRequest])

  return (
    <ModalToast show={show} className="modaltoast--request-reading">
      <div className="modal-request-reading-toast">
        <h3 data-testid="confirm-title">Request a Remote Reading</h3>
        <p data-testid="confirm-message">The patient will receive a notification to take the reading.</p>
        <div>
          {vitals.map(({ key, value }) => (
            <Button
              key={value}
              className="modal-request-reading-toast--button"
              fluid
              onClick={() => handleRequest(key)}
              data-testid={`request-${value}`}>
              {value}
            </Button>
          ))}
          <ButtonGhost
            className="modal-request-reading-toast--button-cancel"
            fluid
            onClick={onCancel}
            data-testid="button-cancel">
            Cancel
          </ButtonGhost>
        </div>
      </div>
    </ModalToast>
  )
}
