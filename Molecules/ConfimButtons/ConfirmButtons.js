import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../../Atoms/Button/Button'
import TextButton from '../../Atoms/TextButton/TextButton'
import ModelYesNo from '../../Molecules/ModalYesNo/ModalYesNo'

import './ConfirmButtons.css'

export default class ConfirmButtons extends Component {
  static propTypes = {
    /** Function to call when cancel is clicked */
    onCancel: PropTypes.func.isRequired,
    /** If true will show a loading spinner instead of the text */
    loading: PropTypes.bool,
    /** If true will display a confirmation message before calling onCancel */
    dirty: PropTypes.bool,
    /** ClassName for the wrapper */
    className: PropTypes.string,
    /** Style for the wrapper */
    style: PropTypes.object,
  }
  static defaultProps = {
    loading: false,
    dirty: false,
    className: '',
    style: {},
  }

  state = {
    displayConfirmation: this.props.dirty,
  }

  showConfirmation = () => {
    this.setState({ displayConfirmation: true })
  }

  hideConfirmation = () => {
    this.setState({ displayConfirmation: false })
  }

  handleCancel = () => {
    this.props.dirty ? this.showConfirmation() : this.props.onCancel()
  }

  handleConfirmYes = () => {
    this.setState({ displayConfirmation: false })
    this.props.onCancel()
  }

  handleConfirmNo = () => {
    this.setState({ displayConfirmation: false })
  }

  render() {
    const { loading, className, style } = this.props
    const { displayConfirmation } = this.state

    return (
      <div className={`confirm-buttons ${className}`.trim()} style={style}>
        <TextButton
          content="CANCEL"
          type="button"
          onClick={this.handleCancel}
          style={{ marginRight: 16 }}
          data-testid="cancel-button"
        />
        <Button content="SAVE" type="submit" primary loading={loading} disabled={loading} data-testid="submit-button" />
        <ModelYesNo
          show={displayConfirmation}
          title="Do you want to discard your changes?"
          message="You have unsaved changes, click 'Yes' to discard the changes or 'No' to continue editing."
          icon="question"
          onYes={this.handleConfirmYes}
          onNo={this.handleConfirmNo}
          defaultIsConfirm={false}
        />
      </div>
    )
  }
}
