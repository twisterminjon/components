import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TitleText from '../../Atoms/TitleText/TitleText'
import HintText from '../../Atoms/HintText/HintText'
import TextButton from '../../Atoms/TextButton/TextButton'
import './SectionTitle.css'

export default class SectionTitle extends Component {
  static propTypes = {
    /** Text for Title */
    title: PropTypes.string.isRequired,
    /** Text for hint */
    hint: PropTypes.string,
    /** Label for button */
    label: PropTypes.string,
    /** Function called on button click */
    onButtonClick: PropTypes.func,
    /** ClassName for the wrapper */
    className: PropTypes.string,
    // FIXME: buttonClassName doesn't work, see TextButton for the reason :(
    /** Classname for the button wrapper */
    buttonClassName: PropTypes.string,
    /** Style for the wrapper */
    style: PropTypes.object,
  }
  static defaultProps = {
    hint: '',
    label: '',
    className: '',
    buttonClassName: '',
    style: {},
    onButtonClick: () => {},
  }

  render() {
    const { title, className, hint, label, onButtonClick, style } = this.props

    const button = label ? (
      <TextButton
        style={{ marginLeft: 'auto', marginRight: 2 }}
        onClick={onButtonClick}
        data-testid="section-button"
        type="button"
        content={label}
      />
    ) : null

    return (
      <div className={className} style={style}>
        <div className="sectiontitle-wrap">
          <TitleText title={title} className="sectiontitle-text" />
          <HintText hint={hint} />
          {button}
        </div>
        <hr className="sectiontitle-rule" />
      </div>
    )
  }
}
