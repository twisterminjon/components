import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BigButton from '../BigButton/BigButton'

export default class GroupButton extends Component {
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

    return <BigButton label={label} name={name} onClick={onClick} {...rest} />
  }
}
