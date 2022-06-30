import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

import './ButtonGhost.css'

ButtonGhost.propTypes = {
  /* Show loading icon on button */
  loading: PropTypes.bool,

  /* Add red color to button */
  red: PropTypes.bool,

  /** Can fit the width of it's container */
  fluid: PropTypes.bool,

  /* Handle click on button */
  onClick: PropTypes.func,

  /** ClassName for the wrapper */
  className: PropTypes.string,

  /** Style for the wrapper */
  style: PropTypes.object,
}
ButtonGhost.defaultProps = {
  fluid: false,
  red: false,
  className: '',
  style: {},
}

export default function ButtonGhost({ loading, fluid, red, children, onClick, className, style, ...rest }) {
  const redClassName = red ? 'buttonghost--red' : ''
  return (
    <Button
      fluid={fluid}
      inverted
      className={`buttonghost ${redClassName} ${className}`}
      loading={loading}
      onClick={onClick}
      style={style}
      {...rest}>
      {children}
    </Button>
  )
}
