import React from 'react'
import PropTypes from 'prop-types'

Stack.propTypes = {
  /** The space between each item in the stack */
  gap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** Children to apply the stack to */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,

  /** ClassName for the wrapper */
  className: PropTypes.string,

  /** Style for the wrapper */
  style: PropTypes.object,
}

Stack.defaultProps = {
  gap: 16,
  className: '',
  style: {},
}

export default function Stack({ gap, children, className, style }) {
  const styles = {
    ...style,
    ...{
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridRowGap: gap,
    },
  }
  return (
    <div style={styles} className={`stackcomponent ${className}`.trim()}>
      {children}
    </div>
  )
}
