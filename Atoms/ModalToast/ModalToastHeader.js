import React from 'react'
import PropTypes from 'prop-types'

import './ModalToast.css'

export default function ModalToastHeader({ title, className = '', style = {}, ...rest }) {
  const testId = rest['data-testid'] ? rest['data-testid'] : 'modaltoastheader'

  return (
    <div className={`modaltoastheader ${className}`.trim()} data-testid={testId}>
      <h3 style={style} {...rest}>
        {title}
      </h3>
    </div>
  )
}

ModalToastHeader.propTypes = {
  /** Title header for the ModalToast Header*/
  title: PropTypes.string.isRequired,
}
