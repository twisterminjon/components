import React from 'react'
import PropTypes from 'prop-types'

import './ModalToast.css'

export default function ModalToastText({ children, className = '', style = {}, ...rest }) {
  const testId = rest['data-testid'] ? rest['data-testid'] : 'modaltoasttext'
  return (
    <p className={`modaltoasttext ${className}`.trim()} data-testid={testId} style={style} {...rest}>
      {children}
    </p>
  )
}

ModalToastText.propTypes = {
  /** Nodes to be rendered in the ModalToastText */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}
