import React from 'react'
import PropTypes from 'prop-types'

import ModalToast from '../../Atoms/ModalToast/ModalToast'
import AddToCallButton from '../../Atoms/AddToCallButton/AddToCallButton'
import BackToCallButton from '../../Atoms/BackToCallButton/BackToCallButton'

import './AddCallMenu.css'

export default function AddCallMenu(props) {
  const { show, enableCaregivers, enableInterpreters, onAddStaff, onAddCaregiver, onAddInterpreter, onBack } = props

  const testId = props['data-testid'] ? props['data-testid'] : 'add-to-call-modal'

  return (
    <ModalToast show={show} data-testid={testId}>
      <div className="addcallmenu">
        <h3 data-testid="confirm-title">Add someone to the call?</h3>

        <div className="addcallmenu-buttons">
          <AddToCallButton onClick={onAddStaff} data-testid="add-staff">
            Staff Member
          </AddToCallButton>
          <AddToCallButton onClick={onAddCaregiver} data-testid="add-caregiver" disabled={!enableCaregivers}>
            Caregiver
          </AddToCallButton>
          {enableInterpreters && (
            <AddToCallButton onClick={onAddInterpreter} data-testid="add-interpreter">
              Interpreter
            </AddToCallButton>
          )}
        </div>

        <div className="addcallmenu-back--row">
          <BackToCallButton onClick={onBack} data-testid="go-back" />
        </div>
      </div>
    </ModalToast>
  )
}

AddCallMenu.propTypes = {
  /** The model can be shown or hidden */
  show: PropTypes.bool.isRequired,
  /** Caregiver button can be disabled */
  enableCaregivers: PropTypes.bool,
  /** Interpreter button can be disabled */
  enableInterpreters: PropTypes.bool,
  /** Called after the add staff button is clicked */
  onAddStaff: PropTypes.func.isRequired,
  /** Called after the add caregiver button is clicked */
  onAddCaregiver: PropTypes.func.isRequired,
  /** Called after the add onAddInterpreter button is clicked */
  onAddInterpreter: PropTypes.func.isRequired,
  /** Called after the back button is clicked */
  onBack: PropTypes.func.isRequired,
}
AddCallMenu.defaultProps = {
  show: false,
  enableCaregivers: false,
  enableInterpreters: false,
}
