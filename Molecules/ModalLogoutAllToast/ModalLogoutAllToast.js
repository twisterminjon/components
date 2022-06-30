import React from 'react'
import PropTypes from 'prop-types'

import ButtonGhost from '../../Atoms/ButtonGhost/ButtonGhost'
import ModalToast from '../../Atoms/ModalToast/ModalToast'

import './ModalLogoutAllToast.css'

ModalLogoutAllToast.propTypes = {
  /**
   * Modal can be shown or hidden
   */
  show: PropTypes.bool,
  /**
   * Called when user presses logout from this device
   */
  onLogoutThisDevice: PropTypes.func.isRequired,
  /**
   * Called when user presses logout from all devices
   */
  onLogoutAll: PropTypes.func.isRequired,
  /**
   * Called when user presses cancel
   */
  onCancel: PropTypes.func.isRequired,
}

export default function ModalLogoutAllToast({ show, onLogoutThisDevice, onLogoutAll, onCancel }) {
  return (
    <ModalToast data-testid="logoutall-modaltoast" className="modaltoast--logoutall" show={show}>
      <div className="modallogoutalltoast">
        <h3 data-testid="confirm-title">Sign out.</h3>
        <p data-testid="confirm-message">
          You are signed in to multiple devices.
          {'\n\n'}
          Where do you want to sign out from?
        </p>
        <div>
          <ButtonGhost
            className="modallogoutalltoast--button"
            data-testid="logoutall-modaltoast-this-device-button"
            fluid
            onClick={onLogoutThisDevice}>
            This device
          </ButtonGhost>
          <ButtonGhost
            className="modallogoutalltoast--button"
            data-testid="logoutall-modaltoast-all-devices-button"
            fluid
            onClick={onLogoutAll}>
            All devices
          </ButtonGhost>
          <ButtonGhost
            className="modallogoutalltoast--button"
            data-testid="logoutall-modaltoast-cancel-button"
            fluid
            onClick={onCancel}>
            Cancel
          </ButtonGhost>
        </div>
      </div>
    </ModalToast>
  )
}
