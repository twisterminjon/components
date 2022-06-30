import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../../../Atoms/Button/Button'
import TextButton from '../../../Atoms/TextButton/TextButton'
import TNDisplayType from './TNDisplayType'
import './TNDisplay.css'

const getButtonTitleByType = type => {
  switch (type) {
    default:
    case TNDisplayType.AGREE:
      return 'Agree'
    case TNDisplayType.OPT_OUT:
      return 'Return'
  }
}

export default class TNDisplay extends Component {
  static propTypes = {
    /** Type of the view */
    type: PropTypes.oneOf([TNDisplayType.AGREE, TNDisplayType.OPT_OUT]).isRequired,
    /** Terms and Notices text */
    text: PropTypes.string,
    /** Called after the agree button is clicked */
    onAgree: PropTypes.func.isRequired,
    /** Called after the disagree button is clicked */
    onDisagree: PropTypes.func.isRequired,
    /** Agree button can show a loader */
    agreeLoading: PropTypes.bool,
  }

  static defaultProps = {
    text: '',
    agreeLoading: false,
  }

  render() {
    const { type, text, onAgree, onDisagree, agreeLoading } = this.props
    return (
      <div className="tndisplay" data-testid="tndisplay">
        <h1>Terms & Notices</h1>
        <p>{text}</p>
        <div className="tndisplay-controls">
          <div className="tndisplay-btn">
            <TextButton fluid content="Disagree" onClick={onDisagree} data-testid="tndisplay-disagree-button" />
          </div>
          <div className="tndisplay-btn">
            <Button
              fluid
              name="agree"
              loading={agreeLoading}
              disabled={agreeLoading}
              type="submit"
              onClick={onAgree}
              data-testid="tndisplay-agree-button">
              {getButtonTitleByType(type)}
            </Button>
          </div>
        </div>
      </div>
    )
  }
}
