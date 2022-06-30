import React from 'react'
import PropTypes from 'prop-types'

import { Input } from 'semantic-ui-react'

import './TextInputField.css'

const TextInputField = React.forwardRef(({ hasError, ...rest }, ref) => {
  return <Input ref={ref} error={hasError} fluid className="textinputfield-input" {...rest} />
})

TextInputField.propTypes = {
  /** If true, will render in an error state */
  hasError: PropTypes.bool,
}

TextInputField.defaultProps = {
  hasError: false,
}

export default TextInputField
