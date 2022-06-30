import React from 'react'
import PropTypes from 'prop-types'

import Button from '../../Atoms/Button/Button'
import ButtonGhost from '../../Atoms/ButtonGhost/ButtonGhost'
import Linkify from '../../Atoms/Linkify/Linkify'
import AssessmentBanner from '../../Molecules/AssessmentQuestion/AssessmentBanner'

import './Assessment.css'

AssessmentIntro.propTypes = {
  /** Due date */
  completeBy: PropTypes.string.isRequired,

  /** Assessment title */
  title: PropTypes.string.isRequired,

  /** Assessment description */
  description: PropTypes.string.isRequired,

  /** How much minutes assessment will take */
  estimate: PropTypes.string.isRequired,

  /** Execute on `Cancel` */
  onCancel: PropTypes.func.isRequired,

  /** Execute on `Start Assessment` */
  onStart: PropTypes.func.isRequired,

  /** Is starting assessment */
  loading: PropTypes.bool.isRequired,

  /** Is assessment started */
  isStarted: PropTypes.bool.isRequired,
}

function AssessmentIntro({ title, description, estimate, completeBy, onCancel, onStart, loading, isStarted }) {
  return (
    <div className="assessment-wrap" data-testid="assessment-intro">
      <div className="assessment-column">
        <AssessmentBanner title={title} />
        <div className="assessment-info">
          <div className="assessment-info-content">
            <p data-testid="assessment-intro-description">
              <Linkify text={description} />
            </p>
            <p data-testid="assessment-to-complete">
              {' '}
              {`This assessment will take approximately ${estimate} mins to complete.`}
            </p>
            <p data-testid="assessment-intro-complete-by"> Please complete by {completeBy}</p>
          </div>
          <div>
            <Button
              fluid
              disabled={loading}
              loading={loading}
              onClick={onStart}
              data-testid="assessment-intro-start-button">
              {`${isStarted ? 'Continue' : 'Start'} Assessment`}
            </Button>
            <ButtonGhost
              fluid
              disabled={loading}
              className="assessment-info-cancel"
              onClick={onCancel}
              data-testid="assessment-intro-cancel-button">
              Cancel
            </ButtonGhost>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssessmentIntro
