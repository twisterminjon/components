import React from 'react'
import PropTypes from 'prop-types'

import Button from '../../Atoms/Button/Button'
import ButtonGhost from '../../Atoms/ButtonGhost/ButtonGhost'

import './AssessmentButtons.css'

AssessmentButtons.propTypes = {
  /** Executes on `Go back` */
  onPrevious: PropTypes.func.isRequired,

  /** Executes on `Next` */
  onNext: PropTypes.func.isRequired,

  /** Is move forward available */
  allowNext: PropTypes.bool.isRequired,

  /** Loadings status */
  status: PropTypes.shape({
    loadingForward: PropTypes.bool.isRequired,
    loadingBack: PropTypes.bool.isRequired,
  }).isRequired,
}

function AssessmentButtons({ status, allowNext, onPrevious, onNext }) {
  const disabled = status.loadingForward || status.loadingBack
  return (
    <div className="assessment-buttons">
      <Button
        fluid
        disabled={disabled || !allowNext}
        loading={status.loadingForward}
        onClick={onNext}
        data-testid="assessment-question-move-forward">
        Next
      </Button>
      <ButtonGhost
        fluid
        disabled={disabled}
        loading={status.loadingBack}
        className="assessment-buttons-previous"
        onClick={onPrevious}
        data-testid="assessment-question-previous">
        Go back
      </ButtonGhost>
    </div>
  )
}

export default AssessmentButtons
