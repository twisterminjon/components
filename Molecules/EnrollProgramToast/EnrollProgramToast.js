import React, { useState } from 'react'
import PropTypes from 'prop-types'

import ButtonGhost from '../../Atoms/ButtonGhost/ButtonGhost'
import ModalToast from '../../Atoms/ModalToast/ModalToast'
import Button from '../../Atoms/Button/Button'
import DateInput from '../../Molecules/DateInput/DateInput'
import RadioLabel from '../../Molecules/RadioLabel/RadioLabel'
import './EnrollProgramToast.css'

EnrollProgramToast.propTypes = {
  /** Program to enroll */
  program: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),

  /** Function called on enroll clicked */
  onEnroll: PropTypes.func.isRequired,

  /** Function called on close clicked */
  onClose: PropTypes.func.isRequired,

  /** The model can be shown or hidden */
  show: PropTypes.bool.isRequired,
}

EnrollProgramToast.defaultProps = {
  program: {},
}

export default function EnrollProgramToast({ show, onEnroll, onClose, program }) {
  const [now, setNow] = useState(true)
  const [date, setDate] = useState()

  const handleClose = () => {
    setNow(true)
    setDate()
    onClose()
  }

  const handleEnroll = () => {
    handleClose()
    onEnroll({
      id: program.id,
      when: now ? 'now' : date,
    })
  }

  return (
    <ModalToast show={show}>
      <div className="enrollprogramtoast-container">
        <div>
          <span className="enrollprogramtoast-header">Add patient to {program.name}</span>
        </div>
        <div className="enrollprogramtoast-content">
          <span className="enrollprogramtoast-title">When will the Program start?</span>
          <RadioLabel onClick={() => setNow(true)} wrapperClass="enrollprogramtoast-nowwrapper" isChecked={now}>
            <span className="enrollprogramtoast-now">Now</span>
          </RadioLabel>
          <RadioLabel
            onClick={() => {
              setNow(false)
            }}
            isChecked={!now}>
            <div className="enrollprogramtoast-datepickercontainer">
              <DateInput
                name="enroll-date"
                value={now ? null : date}
                minDate={new Date()}
                onChange={date => {
                  setDate(date)
                  setNow(false)
                }}
              />
            </div>
          </RadioLabel>
        </div>
        <div className="enrollprogramtoast-footer">
          <div className="enrollprogramtoast-buttonwrapper">
            <ButtonGhost fluid onClick={handleClose} data-testid="button-cancel" style={{ height: '100%' }}>
              Cancel
            </ButtonGhost>
          </div>
          <div className="enrollprogramtoast-buttonwrapper enrollprogramtoast-save">
            <Button fluid disabled={!now && !date} onClick={handleEnroll} data-testid="button-enroll">
              Enroll
            </Button>
          </div>
        </div>
      </div>
    </ModalToast>
  )
}
