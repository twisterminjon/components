import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'semantic-ui-react'

import './CaregiverSearch.css'

export default class CaregiverSearchNotFound extends Component {
  static propTypes = {
    /** Called after the add button is clicked */
    onAdd: PropTypes.func.isRequired,
    /** ClassName for the wrapper */
    className: PropTypes.string,
    /** Style for the wrapper */
    style: PropTypes.object,
  }
  static defaultProps = {
    className: '',
    style: {},
  }

  render() {
    const { onAdd, className, style } = this.props
    return (
      <div className={`caregiversearchnotfound ${className}`.trim()} style={style}>
        <p>We couldn’t find a Caregiver with that phone number.</p>
        <Button inverted className="brand-button" onClick={onAdd} data-testid="add-caregiver">
          Create a Caregiver with that number?
        </Button>
      </div>
    )
  }
}
