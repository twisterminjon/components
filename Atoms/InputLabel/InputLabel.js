import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './InputLabel.css'

export default class InputLabel extends Component {
  static propTypes = {
    /** Text for the label */
    label: PropTypes.string.isRequired,
  }

  render() {
    const { label } = this.props

    const dataTestId = this.props['data-testid'] ? this.props['data-testid'] : 'input-label'

    return (
      <label className="inputlabel" data-testid={dataTestId}>
        {label}
      </label>
    )
  }
}
