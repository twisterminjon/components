import React, { Component } from 'react'
import './RequiredLabel.css'

export default class RequiredLabel extends Component {
  render() {
    const dataTestId = this.props['data-testid'] ? this.props['data-testid'] : 'input-required'

    return (
      <span className="label-text" data-testid={dataTestId}>
        REQUIRED
      </span>
    )
  }
}
