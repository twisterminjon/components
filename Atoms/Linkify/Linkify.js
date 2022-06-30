import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import Autolinker from 'autolinker'

import './Linkify.css'

Linkify.propTypes = {
  /** Text to linkify */
  text: PropTypes.string.isRequired,

  /** Is url clickable */
  disabled: PropTypes.bool,
}

Linkify.defaultProps = {
  text: '',
  disabled: false,
}

function renderItem(match, disabled) {
  const key = match.offset
  const text = match.getAnchorText()
  const href = match.getAnchorHref()
  const isPhone = match.getType() === 'phone'

  return disabled ? (
    <span
      key={key}
      className={`linkify_link ${isPhone ? 'linkify_link-phone' : ''} ${
        disabled ? 'linkify_link-disabled' : ''
      }`.trim()}>
      {text}
    </span>
  ) : (
    <a
      key={key}
      href={href}
      className={`linkify_link ${isPhone ? 'linkify_link-phone' : ''}`.trim()}
      target="_blank"
      rel="noopener noreferrer">
      {text}
    </a>
  )
}

function parse(text, disabled) {
  const matches = Autolinker.parse(text, { email: false })
  if (matches.length) {
    let cursor = 0
    const nodes = []
    matches.forEach(match => {
      nodes.push(text.slice(cursor, match.offset))
      nodes.push(renderItem(match, disabled))
      cursor = match.offset + match.matchedText.length
    })
    if (cursor !== text.length) {
      nodes.push(text.slice(cursor, text.length))
    }
    return nodes
  }
  return text
}

export default function Linkify({ text, disabled }) {
  return useMemo(() => parse(text, disabled), [disabled, text])
}
