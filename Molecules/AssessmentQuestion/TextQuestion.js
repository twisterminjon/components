import React from 'react'
import PropTypes from 'prop-types'
import { TextArea } from 'semantic-ui-react'

import CharacterCounter from '../../Atoms/CharacterCounter/CharacterCounter'

import './TextQuestion.css'

TextQuestion.propTypes = {
  /** Question data */
  data: PropTypes.shape({
    value: PropTypes.string,
  }).isRequired,

  /** Send data change */
  onChange: PropTypes.func.isRequired,
}

function TextQuestion({ data: options, onChange }) {
  return (
    <div className="assessment-text-answer">
      <TextArea
        className="assessment-text"
        value={options.value}
        onChange={e => onChange({ value: e.target.value })}
        rows={8}
        maxLength={475}
        data-testid="assessment-text"
      />
      <CharacterCounter text={options.value} maxLength={475} style={{ marginTop: 6 }} />
    </div>
  )
}

export default TextQuestion
