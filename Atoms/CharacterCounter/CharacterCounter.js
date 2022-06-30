import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './CharacterCounter.css'

export default class CharacterCounter extends Component {
  static propTypes = {
    /** Text to be tested for count */
    text: PropTypes.string.isRequired,
    /** Number for maximum allowed text length */
    maxLength: PropTypes.number.isRequired,
  }

  render() {
    const { text, maxLength, className, style } = this.props

    let textStyle = ''
    if (text.length > maxLength) {
      textStyle = 'charactercounter-overMax'
    } else if (text.length / maxLength > 0.75) {
      textStyle = 'charactercounter-75'
    } else {
      textStyle = 'charactercounter'
    }

    return (
      <span className={`charactercounter ${className}`} style={style} data-testid="character-counter">
        <b className={textStyle}>{text.length}</b> of <b>{maxLength}</b>
      </span>
    )
  }
}
