import React from 'react'
import PropTypes from 'prop-types'

import Button from '../../Atoms/Button/Button'
import ModalToast from '../../Atoms/ModalToast/ModalToast'
import ButtonGhost from '../../Atoms/ButtonGhost/ButtonGhost'

import './ModalYesNoToast.css'

ModalYesNoToast.propTypes = {
  /** The model can be shown or hidden */
  show: PropTypes.bool.isRequired,
  /** The title text for the modal */
  title: PropTypes.string.isRequired,
  /** The message for the modal */
  message: PropTypes.string,
  /** The confirm button can display custom text */
  confirmButtonText: PropTypes.string,
  /** The reject button can display custom text */
  rejectButtonText: PropTypes.string,
  /** Called after the confirm button is clicked */
  onConfirm: PropTypes.func.isRequired,
  /** Called after the reject button is clicked */
  onReject: PropTypes.func.isRequired,
  /** The order of the confirm buttons can be reversed */
  flip: PropTypes.bool,
  /** Can show the confirm or reject buttons as the default */
  defaultIsConfirm: PropTypes.bool,
}
ModalYesNoToast.defaultProps = {
  message: '',
  confirmButtonText: 'Yes',
  rejectButtonText: 'No',
  flip: false,
  defaultIsConfirm: true,
}

export default function ModalYesNoToast(props) {
  const {
    show,
    title,
    message,
    confirmButtonText,
    rejectButtonText,
    flip,
    onConfirm,
    onReject,
    defaultIsConfirm,
  } = props

  const testId = props['data-testid'] ? props['data-testid'] : 'confirm-modal'

  const renderButtons = flip ? (
    <React.Fragment>
      <ButtonGhost fluid onClick={onConfirm} data-testid="button-confirm" autoFocus={defaultIsConfirm}>
        {confirmButtonText}
      </ButtonGhost>
      <Button fluid onClick={onReject} data-testid="button-reject" autoFocus={!defaultIsConfirm}>
        {rejectButtonText}
      </Button>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <ButtonGhost fluid onClick={onReject} data-testid="button-reject" autoFocus={!defaultIsConfirm}>
        {rejectButtonText}
      </ButtonGhost>
      <Button fluid onClick={onConfirm} data-testid="button-confirm" autoFocus={defaultIsConfirm}>
        {confirmButtonText}
      </Button>
    </React.Fragment>
  )

  return (
    <ModalToast show={show} data-testid={testId}>
      <div className="modalyesnotoast">
        <h3 data-testid="confirm-title">{title}</h3>
        <p data-testid="confirm-message">{message}</p>
        <div className="modalyesnotoast--bottom">{renderButtons}</div>
      </div>
    </ModalToast>
  )
}
