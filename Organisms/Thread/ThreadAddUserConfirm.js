import React, { useState } from 'react'
import PropTypes from 'prop-types'

import ModalToast from '../../Atoms/ModalToast/ModalToast'
import RadioInput from '../../Molecules/RadioInput/RadioInput'
import Button from '../../Atoms/Button/Button'
import ButtonGhost from '../../Atoms/ButtonGhost/ButtonGhost'

import './Thread.css'

ThreadAddUserConfirm.propTypes = {
  /** Can be shown or hidden */
  show: PropTypes.bool.isRequired,

  /** Name of the user being added */
  displayName: PropTypes.string,

  /** Called after the close action */
  onClose: PropTypes.func.isRequired,

  /** Called after the confirm action */
  onAdd: PropTypes.func.isRequired,
}

export default function ThreadAddUserConfirm({ show, displayName, onClose, onAdd }) {
  const [checked, setChecked] = useState('include-true')

  const handleChange = e => {
    setChecked(e.currentTarget.value)
  }

  const handleAdd = () => {
    onAdd({ includeHistory: checked === 'include-true' })
  }

  return (
    <ModalToast show={show}>
      <p style={{ marginTop: 24, marginBottom: 54 }} className="messagethreadadduserconfirm-title">
        Adding {displayName}
      </p>
      <RadioInput
        name="radios"
        label="Don’t include previous messages"
        value="include-false"
        checked={checked === 'include-false'}
        onChange={handleChange}
        style={{ marginBottom: 16 }}
      />
      <RadioInput
        name="radios"
        label="Include all messages"
        value="include-true"
        checked={checked === 'include-true'}
        onChange={handleChange}
        style={{ marginBottom: 60 }}
      />
      <div className="row">
        <ButtonGhost onClick={onClose} fluid>
          Cancel
        </ButtonGhost>
        <Button onClick={handleAdd} fluid>
          Add
        </Button>
      </div>
    </ModalToast>
  )
}
