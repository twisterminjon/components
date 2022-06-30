import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal } from 'semantic-ui-react'
import { Loader } from 'semantic-ui-react'
import { defaultTo } from 'lodash-es'

import Slider from '../../Atoms/Slider/Slider'
import Button from '../../Atoms/Button/Button'
import ButtonGroup from '../../Atoms/ButtonGroup/ButtonGroup'

import { getRingVolume, setRingVolume } from '@shared/helpers'

import './SettingsForm.css'

export default class SettingsForm extends Component {
  static propTypes = {
    /** If true the form will be displayed */
    show: PropTypes.bool.isRequired,

    /** Can show a loading indicator */
    loading: PropTypes.bool,

    /** Current setting for units */
    units: PropTypes.oneOf(['imperial', 'metric']).isRequired,

    /** Can show a loader on the units section */
    unitsLoading: PropTypes.bool,

    /** Called after the units change */
    onUnitsChange: PropTypes.func.isRequired,

    /** Called when the close button is clicked */
    onClose: PropTypes.func.isRequired,
  }
  static defaultProps = {
    loading: false,
    unitsLoadingVal: false,
  }

  constructor(props) {
    super(props)

    const storedValue = defaultTo(getRingVolume(), '50')
    const ringerVolume = storedValue * 100

    this.state = {
      ringerVolume: ringerVolume,
    }
  }

  handleRingerVolumeChange = e => {
    // increment in steps of 10
    const rawValue = e.target.value
    const roundValue = Math.round(rawValue / 10) * 10
    this.setState({ ringerVolume: roundValue })
  }

  handleSaveSettings = () => {
    // convert to a value between 0 and 1.0 to save
    const ringerVolume = this.state.ringerVolume * 0.01
    setRingVolume(ringerVolume)

    this.props.onClose()
  }

  handleImperialSelected = () => {
    this.props.onUnitsChange('imperial')
  }

  handleMetricSelected = () => {
    this.props.onUnitsChange('metric')
  }

  render() {
    const { show, loading, units, unitsLoading } = this.props
    const { ringerVolume } = this.state

    if (loading) {
      return (
        <Modal open={show} onClose={this.handleSaveSettings} size="tiny" basic>
          <Modal.Content>
            <Loader active />
          </Modal.Content>
        </Modal>
      )
    }

    return (
      <Modal open={show} onClose={this.handleSaveSettings} size="tiny" basic centered={false}>
        <div className="settingsform">
          <h1>Settings</h1>
          <Modal.Content>
            <Modal.Description>
              <Slider
                type="range"
                min={0}
                max={100}
                value={ringerVolume}
                onChange={this.handleRingerVolumeChange}
                label="Ring Volume"
              />
              <div className="settingsform-volume-label">
                <span>off</span>
                <span>loud</span>
              </div>
              <div className="settingsform-units-section">
                <span className="sr-only" data-testid={`units-value=${units}`}>{`unit type is ${units}`}</span>
                <h2 className="settingsform-label">Units</h2>
                <ButtonGroup
                  buttonOneLabel="Imperial"
                  buttonTwoLabel="Metric"
                  active={units === 'imperial' ? '1' : '2'}
                  loading={unitsLoading}
                  buttonOneOnClick={this.handleImperialSelected}
                  buttonTwoOnClick={this.handleMetricSelected}
                />
                <div className="settingsform-units-hint">
                  <span>(Fahrenheit, pounds)</span>
                  <span>(Celsius, kilograms)</span>
                </div>
              </div>
            </Modal.Description>
            <Modal.Actions>
              <Button className="settingsform-button" size="big" fluid onClick={this.handleSaveSettings}>
                Close
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </div>
      </Modal>
    )
  }
}
