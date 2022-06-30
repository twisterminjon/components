import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import DeleteButtonTiny from '../../Atoms/DeleteButtonTiny/DeleteButtonTiny'
import './Tag.css'

/**
 * <Tag id={id} onAction={(id, name) => onTagDelete(id, name)} etc... >
 *    <Tag.Icon><IconEnvelope color={contentColor()} /></Tag.Icon>
 *    <Tag.Label>{name}</Tag.label>
 *     <Tag.Button>
 *      <DeleteButtonTiny  data-testid={`patientsurvey-delete-${name}`} />
 *     </Tag.button>
 * </Tag>
 */
export default class Tag extends Component {
  static propTypes = {
    /** Text to display in the tag */
    label: PropTypes.string.isRequired,
    /** id of the item being displayed */
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    /** If true, will expand to the width of the container */
    fluid: PropTypes.bool,
    /** A tag can display an inactive state */
    inActive: PropTypes.bool,
    /** Called when the delete button is clicked */
    onDelete: PropTypes.func.isRequired,
    /** ClassName for the wrapper */
    className: PropTypes.string,
    /** Style for the wrapper */
    style: PropTypes.object,
    /** Optional view  */
    ContentView: PropTypes.any, // FIXME: Define better type
  }
  static defaultProps = {
    fluid: false,
    inActive: false,
    className: '',
    style: {},
    ContentView: ({ id, label, onDelete }) => (
      <Fragment>
        <span className="tag-text" data-testid={`tag-${label}-text`}>
          {label}
        </span>
        <DeleteButtonTiny
          onClick={() => onDelete(id, label)}
          data-testid={`tag-${label}-delete-button`}
          className={`tag-button`}
        />
      </Fragment>
    ),
  }

  render() {
    const {
      label,
      onDelete,
      className,
      fluid,
      inActive, // FIXME: Rename this prop to "inactive"
      style,
      id,
      ContentView,
    } = this.props

    const fluidClass = fluid ? 'tag--fluid' : ''
    const inActiveClass = inActive ? 'tag--inactive' : ''

    const dataTestId = this.props['data-testid'] ? this.props['data-testid'] : `tag-${label}`

    return (
      <div className={`tag ${inActiveClass} ${fluidClass} ${className}`} style={style} data-testid={dataTestId}>
        <ContentView id={id} label={label} onDelete={onDelete} inactive={inActive} />
      </div>
    )
  }
}
