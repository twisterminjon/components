import React from 'react'
import PropTypes from 'prop-types'

import Button from '../../Atoms/Button/Button'
import ButtonGhost from '../../Atoms/ButtonGhost/ButtonGhost'

import './ButtonGroup.css'

ButtonGroup.propTypes = {
  /** Label for button 1 */
  buttonOneLabel: PropTypes.string.isRequired,

  /** Label for button 2 */
  buttonTwoLabel: PropTypes.string.isRequired,

  /** Called after button 1 clicked */
  buttonOneOnClick: PropTypes.func.isRequired,

  /** Called after button 2 clicked  */
  buttonTwoOnClick: PropTypes.func.isRequired,

  /** Can show a button as active */
  active: PropTypes.oneOf(['1', '2', 'none']),

  /** Can show a loading indicator */
  loading: PropTypes.bool,

  /** ClassName for the wrapper */
  className: PropTypes.string,

  /** Style for the wrapper */
  style: PropTypes.object,
}

ButtonGroup.defaultProps = {
  active: 'none',
  loading: false,
  className: '',
  style: {},
}

export default function ButtonGroup({
  buttonOneLabel,
  buttonTwoLabel,
  buttonOneOnClick,
  buttonTwoOnClick,
  active,
  loading,
  className,
  style,
}) {
  const loadingClass = loading ? 'button-spinner' : ''

  const renderButtonOne =
    active === '1' ? (
      <Button
        key="button-1"
        fluid
        onClick={buttonOneOnClick}
        className="buttongroup-button buttongroup--left"
        disabled={loading}
        data-testid={`button-${buttonOneLabel}`}>
        {buttonOneLabel}
      </Button>
    ) : (
      <ButtonGhost
        key="button-1-ghost"
        fluid
        onClick={buttonOneOnClick}
        className="buttongroup-button buttongroup--left"
        disabled={loading}
        data-testid={`button-${buttonOneLabel}`}
        style={{ height: 40 }}>
        {buttonOneLabel}
      </ButtonGhost>
    )

  const renderButtonTwo =
    active === '2' ? (
      <Button
        key="button-2"
        fluid
        onClick={buttonTwoOnClick}
        className="buttongroup-button buttongroup--right"
        disabled={loading}
        data-testid={`button-${buttonTwoLabel}`}>
        {buttonTwoLabel}
      </Button>
    ) : (
      <ButtonGhost
        key="button-2-ghost"
        fluid
        onClick={buttonTwoOnClick}
        className="buttongroup-button buttongroup--right"
        disabled={loading}
        data-testid={`button-${buttonTwoLabel}`}
        style={{ height: 40 }}>
        {buttonTwoLabel}
      </ButtonGhost>
    )

  return (
    <div className={`buttongroup ${loadingClass} ${className}`.trim()} style={style}>
      {renderButtonOne}
      {renderButtonTwo}
    </div>
  )
}
