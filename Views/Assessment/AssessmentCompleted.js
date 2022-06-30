import React from 'react'
import PropTypes from 'prop-types'

import Button from '../../Atoms/Button/Button'
import ButtonGhost from '../../Atoms/ButtonGhost/ButtonGhost'
import AssessmentBanner from '../../Molecules/AssessmentQuestion/AssessmentBanner'

import './Assessment.css'

AssessmentCompleted.propTypes = {
  /** Assessment title */
  title: PropTypes.string.isRequired,

  /** Execute on `Go back` */
  onBack: PropTypes.func.isRequired,

  /** Execute on `Yes` */
  onComplete: PropTypes.func.isRequired,

  /** Loadings status */
  status: PropTypes.shape({
    loadingForward: PropTypes.bool.isRequired,
    loadingBack: PropTypes.bool.isRequired,
  }).isRequired,
}

function AssessmentCompleted({ title, onBack, onComplete, status }) {
  const disabled = status.loadingBack || status.loadingForward
  return (
    <div className="assessment-wrap" data-testid="assessment-completed">
      <div className="assessment-column">
        <AssessmentBanner title={title} />
        <div className="assessment-info">
          <div className="assessment-info-content">
            <h2 data-testid="assessment-completed-title">Thanks :)</h2>
            <p data-testid="assessment-completed-body">Would you like to submit the assessment?</p>
          </div>
          <div>
            <Button
              fluid
              disabled={disabled}
              loading={status.loadingForward}
              onClick={onComplete}
              data-testid="assessment-completed-approve">
              Yes
            </Button>
            <ButtonGhost
              fluid
              disabled={disabled}
              className="assessment-info-cancel"
              loading={status.loadingBack}
              onClick={onBack}
              data-testid="assessment-completed-cancel">
              Go back
            </ButtonGhost>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssessmentCompleted
