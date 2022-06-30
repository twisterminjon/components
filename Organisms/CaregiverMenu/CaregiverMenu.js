import React from 'react'
import PropTypes from 'prop-types'

import ModalToast from '../../Atoms/ModalToast/ModalToast'
import ButtonGhost from '../../Atoms/ButtonGhost/ButtonGhost'
import Button from '../../Atoms/Button/Button'
import CaregiverAccessCodeContainer from './CaregiverAccessCodeContainer'
import './CaregiverMenu.css'

CaregiverMenu.propTypes = {
  /** The caregiver being affected by the menu changes */
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  /** The model can be shown or hidden */
  show: PropTypes.bool.isRequired,
  /** Called after the resend invite button is clicked */
  onResend: PropTypes.func.isRequired,
  /** Called after the edit button is clicked */
  onEdit: PropTypes.func.isRequired,
  /** Called after the unassign button is clicked */
  onUnassign: PropTypes.func.isRequired,
  /** Called after the cancel button is clicked */
  onCancel: PropTypes.func.isRequired,
  /** Can show loading on the resend button */
  resendLoading: PropTypes.bool,
  /** The caregiver receives events for the assigned patient */
  sendProgramEvents: PropTypes.bool.isRequired,
  /** Can show/hide the login key section */
  canAccessCode: PropTypes.bool.isRequired,
}

CaregiverMenu.defaultProps = {
  resendLoading: false,
}

export default function CaregiverMenu(props) {
  const {
    show,
    user,
    onResend,
    onChangeSendOptions,
    onEdit,
    onUnassign,
    onCancel,
    resendLoading,
    sendProgramEvents,
    canAccessCode,
  } = props

  // When the patient first loads, this will be render but no caregiver is selected. We don't know the caregiver yet, so just return
  if (!user) return null

  return (
    <ModalToast show={show} data-testid="caregiver-menu">
      <div className="caregivermenu">
        <h3 data-testid="confirm-title">What would you like to do?</h3>
        <div className="caregivermenu--bottom">
          <ButtonGhost
            fluid
            loading={resendLoading}
            disabled={resendLoading}
            onClick={onResend}
            data-testid="button-resend">
            Resend Invite
          </ButtonGhost>
          <hr />
          {canAccessCode && <CaregiverAccessCodeContainer user={user} />}
          <hr />
          <ButtonGhost
            fluid
            inverted
            className="caregivermenu--extra-margin"
            onClick={onEdit}
            data-testid="button-edit">
            Edit Information
          </ButtonGhost>
          <ButtonGhost
            fluid
            inverted
            className="caregivermenu--extra-margin"
            red
            onClick={onUnassign}
            data-testid="button-unassign">
            Unassign
          </ButtonGhost>
          <hr />
          <p>Receive patient program messages?</p>
          {sendProgramEvents ? (
            <React.Fragment>
              <Button
                fluid
                onClick={() => onChangeSendOptions(true)}
                className="caregivermenu--message-button-left"
                data-testid="button-messages-yes"
                autoFocus={true}>
                Yes
              </Button>
              <ButtonGhost
                key="button-messages-no"
                fluid
                onClick={() => onChangeSendOptions(false)}
                className="caregivermenu--message-button-right"
                data-testid="button-messages-no"
                style={{ height: '100%' }}>
                No
              </ButtonGhost>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <ButtonGhost
                fluid
                onClick={() => onChangeSendOptions(true)}
                className="caregivermenu--message-button-left"
                data-testid="button-messages-yes"
                style={{ height: '100%' }}>
                Yes
              </ButtonGhost>
              <Button
                key="button-messages-no"
                fluid
                onClick={() => onChangeSendOptions(false)}
                className="caregivermenu--message-button-right"
                data-testid="button-messages-no"
                autoFocus={true}>
                No
              </Button>
            </React.Fragment>
          )}
          <hr />
          <Button fluid onClick={onCancel} data-testid="button-cancel" autoFocus={true}>
            Cancel
          </Button>
        </div>
      </div>
    </ModalToast>
  )
}
