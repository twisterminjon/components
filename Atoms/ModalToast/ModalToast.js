import React from 'react'
import PropTypes from 'prop-types'
import ModalToastHeader from './ModalToastHeader'
import ModalToastText from './ModalToastText'
import ModalToastButton from './ModalToastButton'

import './ModalToast.css'

export default function ModalToast(props) {
  const { show, children } = props
  const visibilityClass = show ? 'modaltoast--show' : ''

  const testId = props['data-testid'] ? props['data-testid'] : 'modaltoast'

  return (
    <React.Fragment>
      {show && <div className="modaltoast-dimmer" />}
      <div className={`modaltoast-wrap ${visibilityClass}`.trim()} data-testid={testId}>
        <div className={`modaltoast`}>{children}</div>
      </div>
    </React.Fragment>
  )
}

ModalToast.propTypes = {
  /** The model can be shown or hidden */
  show: PropTypes.bool.isRequired,
}

ModalToast.Header = ModalToastHeader
ModalToast.Text = ModalToastText
ModalToast.Button = ModalToastButton
