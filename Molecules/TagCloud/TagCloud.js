import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Tag from '../Tag/Tag'
import './TagCloud.css'

export default class TagCloud extends Component {
  static propTypes = {
    /** Can show a loader on the tags */
    loading: PropTypes.bool,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
        isActive: PropTypes.bool,
      })
    ).isRequired,
    vertical: PropTypes.bool,

    /** Called after tag is deleted */
    onTagDelete: PropTypes.func.isRequired,

    /** React view for individual tags */
    TagView: PropTypes.any, // FIXME: Define better type
  }
  static defaultProps = {
    loading: false,
    vertical: true,
    TagView: ({ tagObject, ...props }) => {
      const { onTagDelete, vertical } = props
      const orientationClass = vertical ? 'tagcloud--vertical' : ''

      return (
        <Tag
          label={tagObject.name}
          key={tagObject.id}
          id={tagObject.id}
          inActive={!tagObject.isActive}
          onDelete={(id, name) => onTagDelete(id, name)}
          className={orientationClass}
          fluid={vertical ? true : false}
          style={{ marginBottom: 6, marginRight: vertical ? 0 : 6 }}
        />
      )
    },
  }

  render() {
    const { loading, tags, TagView, 'data-testid': dataTestId, ...rest } = this.props

    const loadingClass = loading ? 'button-spinner tagcloud--disabled' : ''

    return (
      <ul className={`tagcloud ${loadingClass}`.trim()} data-testid={dataTestId}>
        {tags.map(tagObject => {
          const { id, surveySessionId } = tagObject

          // Preference surveySessionId over id for key, if available
          const key = surveySessionId || id

          return <TagView key={key} tagObject={tagObject} {...rest} />
        })}
      </ul>
    )
  }
}
