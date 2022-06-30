import React from 'react'
import PropTypes from 'prop-types'

import CallIncoming from '../../Atoms/Icons/CallIncoming'
import CallOutgoing from '../../Atoms/Icons/CallOutgoing'
import CallMissed from '../../Atoms/Icons/CallMissed'
import { CallTypes, CallTypeList } from '../../../constants'

CallType.propTypes = {
  /** Type of call */
  type: PropTypes.oneOf(CallTypeList).isRequired,

  /** Can be dimmed */
  dimmed: PropTypes.bool,

  /** Can show a different display when missed */
  missed: PropTypes.bool,

  /** ClassName for the wrapper */
  className: PropTypes.string,

  /** Style for the wrapper */
  style: PropTypes.object,
}

CallType.defaultProps = {
  dimmed: false,
  missed: false,
  className: '',
  style: {},
}

export default function CallType({ type, dimmed, missed, className, style }) {
  const colors = {
    dimmed: 'var(--text_dimmed)',
    default: 'var(--text_default)',
    missed: 'var(--text_negative)',
  }

  let color = null
  color = dimmed ? colors.dimmed : colors.default
  if (missed) color = colors.missed

  // Return based on call type
  if (type === CallTypes.incoming) {
    return <CallIncoming color={color} className={className} style={style} />
  }

  if (type === CallTypes.outgoing) {
    return <CallOutgoing color={color} className={className} style={style} />
  }

  if (type === CallTypes.missed) {
    return <CallMissed color={color} className={className} style={style} />
  }

  return null
}
