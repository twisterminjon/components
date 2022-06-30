import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Modal } from 'semantic-ui-react'

import Button from '../../Atoms/Button/Button'
import ButtonGhost from '../../Atoms/ButtonGhost/ButtonGhost'
import SpinnerDots from '../../Atoms/SpinnerDots/SpinnerDots'
import PhoneInput from '../../Molecules/PhoneInput/PhoneInput'
import { isPhoneNumberValid, parsePhoneNumber } from '@shared/helpers'
import ErrorMessages from '../../../ErrorMessages.json'
import ErrorPage from '../../Views/ErrorPage/ErrorPage'

import './UpdatePhoneForm.css'

UpdatePhoneForm.propTypes = {
  /** If true the form will be displayed */
  show: PropTypes.bool.isRequired,

  /** Current user id */
  currentUserId: PropTypes.string,

  /** Current phone number of the user */
  currentPhone: PropTypes.string,

  /** Can show a loader when loading phone data */
  phoneLoading: PropTypes.bool,

  /** Can show a loader when running mutation */
  updateLoading: PropTypes.bool,

  /** Called after phone is update*/
  onUpdatePhone: PropTypes.func.isRequired,

  /** Called when the close button is clicked */
  onClose: PropTypes.func.isRequired,
}

export default function UpdatePhoneForm({
  show,
  currentUserId,
  phoneLoading,
  updateLoading,
  onUpdatePhone,
  currentPhone = '',
  onClose,
}) {
  const [phoneValue, setPhoneValue] = useState(parsePhoneNumber(currentPhone, 'US').international)
  const [error, setError] = useState('')

  const handleUpdatePhone = () => {
    if (isPhoneNumberValid(phoneValue)) {
      setError('')
      onUpdatePhone({ variables: { id: currentUserId, phone: phoneValue } })
        .then(() => handleCloseModal())
        .catch(e => {
          if (e.message.includes(ErrorMessages.Create.INVALID_PHONE_FORMAT)) {
            setError("Phone number doesn't exist or is invalid")
          } else {
            return <ErrorPage error={e} />
          }
        })
    } else {
      setError("Phone number doesn't exist or is invalid")
    }
  }

  const handleCloseModal = () => {
    setPhoneValue(parsePhoneNumber(currentPhone, 'US').international)
    setError('')
    onClose()
  }

  return (
    <Modal open={show} onClose={handleCloseModal} size="tiny" basic centered={false}>
      <div className="updatephoneform" data-testid="updatephoneform">
        <h1 data-testid="updatephoneform-title">Update Phone Number</h1>
        <Modal.Content>
          <Modal.Description>
            {phoneLoading ? (
              <SpinnerDots className="updatephoneform-loader" />
            ) : (
              <div className="updatephoneform-input">
                <PhoneInput
                  label="Phone Number"
                  name="phone"
                  value={phoneValue}
                  onChange={setPhoneValue}
                  hasError={!!error}
                  errorMessage={error}
                  key="update-phone-input"
                  data-testid="updatephoneform-input"
                />
              </div>
            )}
          </Modal.Description>
          <Modal.Actions>
            <Button
              data-testid="updatephoneform-button-continue"
              disabled={phoneValue === currentPhone || !phoneValue.trim() || updateLoading}
              className="updatephoneform-button"
              size="big"
              fluid
              loading={updateLoading}
              onClick={() => handleUpdatePhone()}>
              Continue
            </Button>
            <ButtonGhost
              data-testid="updatephoneform-button-cancel"
              className="updatephoneform-button"
              size="big"
              fluid
              onClick={handleCloseModal}>
              Cancel
            </ButtonGhost>
          </Modal.Actions>
        </Modal.Content>
      </div>
    </Modal>
  )
}
