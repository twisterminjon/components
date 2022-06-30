import React, { Component } from 'react'
import PropTypes from 'prop-types'

import IconMessage from '../../Atoms/Icons/IconMessage'
import IconAnswerCall from '../../Atoms/Icons/IconAnswerCall'

import './FavoriteCardMenu.css'

export default class FavoriteCardMenu extends Component {
  static propTypes = {
    /** If true, calling will be disabled */
    disableCall: PropTypes.bool.isRequired,
    /** If true, messaging will be disabled */
    disableMessages: PropTypes.bool,
    /** When call button is clicked */
    onCall: PropTypes.func.isRequired,
    /** When the message button is clicked */
    onMessage: PropTypes.func.isRequired,
    /** A label for the testid on the buttons */
    testidLabel: PropTypes.string,
    /** ClassName for the wrapper */
    className: PropTypes.string,
    /** Style for the wrapper */
    style: PropTypes.object,
  }
  static defaultProps = {
    testidLabel: '',
    className: '',
    style: {},
  }

  render() {
    const { disableCall, disableMessages, onCall, onMessage, testidLabel, className, style } = this.props

    // FIXME: icons should use the css color to get their color instead of a prop
    const callButtonColor = disableCall ? 'rgba(0, 0, 0, 0.2)' : 'var(--black)'

    return (
      <div className={`favoritecardmenu ${className}`} data-testid={`fav-menu-${testidLabel}`} style={style}>
        <button
          className="favoritecardmenu-button"
          onClick={onCall}
          disabled={disableCall}
          data-testid={`fav-call-${testidLabel}`}>
          <IconAnswerCall className="favoritecardmenu-icon" color={callButtonColor} style={{ width: 16 }} size={16} />
          <span className="favoritecardmenu-button-text">Call</span>
        </button>
        <button
          className="favoritecardmenu-button"
          onClick={onMessage}
          disabled={disableMessages}
          data-testid={`fav-message-${testidLabel}`}>
          <IconMessage className="favoritecardmenu-icon" size={16} />
          <span className="favoritecardmenu-button-text">Message</span>
        </button>
      </div>
    )
  }
}
