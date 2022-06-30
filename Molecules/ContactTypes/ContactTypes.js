import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Form, Radio } from 'semantic-ui-react'

import InputLabel from '../../Atoms/InputLabel/InputLabel'
import PatientData from '../PatientData/PatientData'

export default class ContactTypes extends Component {
  static propTypes = {
    /** Value of the selected radio button */
    value: PropTypes.oneOf(['EMAIL', 'SMS', 'BOTH']).isRequired,
    /** Called when the value changes */
    onChange: PropTypes.func.isRequired,
    /** If true, the input will shown in display only mode */
    displayOnly: PropTypes.bool,
  }
  static defaultProps = {
    displayOnly: false,
  }

  handleChange = (e, { value }) => {
    this.props.onChange(value)
  }

  render() {
    const { value, displayOnly } = this.props

    // Make a friendly name for display only
    const friendlyName = {
      EMAIL: 'E-Mail',
      SMS: 'Mobile (SMS)',
      BOTH: 'Both',
    }

    if (displayOnly) return <PatientData title="Message Type" data={friendlyName[value]} />

    return (
      <div>
        <InputLabel label="Message Type" />
        <Form.Field>
          <Radio
            style={{ marginRight: 25 }}
            label="E-Mail"
            name="contactGroup"
            value="EMAIL"
            checked={value === 'EMAIL'}
            onChange={this.handleChange}
            data-testid="fix me"
          />
          <Radio
            style={{ marginRight: 25 }}
            label="Mobile (SMS)"
            name="contactGroup"
            value="SMS"
            checked={value === 'SMS'}
            onChange={this.handleChange}
            data-testid="fix me"
          />
          <Radio
            style={{ marginRight: 25 }}
            label="Both"
            name="contactGroup"
            value="BOTH"
            checked={value === 'BOTH'}
            onChange={this.handleChange}
            data-testid="fix me"
          />
        </Form.Field>
      </div>
    )
  }
}
