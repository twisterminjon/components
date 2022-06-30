import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './BigButton.css'

export default class BigButton extends Component {
  static propTypes = {
    /** Label for the button */
    label: PropTypes.node.isRequired,
    /** Name used for aria-label */
    name: PropTypes.string.isRequired,
    /** Function for onClick */
    onClick: PropTypes.func,
  }
  static defaultProps = {
    onClick: () => {},
  }

  render() {
    const { label, name, onClick, ...rest } = this.props

    return (
      <button aria-label={name} className={`bigbutton-button`} onClick={onClick} {...rest}>
        {label}
      </button>
    )
  }
}
