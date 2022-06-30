import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ProgramTag from '../ProgramTag/ProgramTag'
import './ProgramTagCloud.css'

export default class ProgramTagCloud extends Component {
  static propTypes = {
    /** An array of the tags to show in the cloud */
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        completedOn: PropTypes.string,
        program: PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          isActive: PropTypes.bool.isRequired,
        }),
      })
    ).isRequired,
    /** Called when the tag edit is clicked */
    onTagEdit: PropTypes.func.isRequired,
    /** if true, will show a loading spinner */
    loading: PropTypes.bool,
    /** Can show a loading spinner on a specific tag by id */
    loadingId: PropTypes.string,
  }
  static defaultProps = {
    loading: false,
  }

  render() {
    const { tags, loading, loadingId, onTagEdit } = this.props

    const tagList = tags.map(tagObject => {
      return (
        <ProgramTag
          label={tagObject.program.name}
          key={tagObject.id}
          id={tagObject.program.id}
          enrollmentId={tagObject.id}
          inActive={!tagObject.program.isActive}
          isComplete={!!tagObject.completedOn}
          onEdit={(enrollmentId, id, name) => onTagEdit(enrollmentId, id, name)}
          loading={tagObject.id === loadingId}
          style={{ marginBottom: 6, marginRight: 0 }}
          value={false}
        />
      )
    })

    return (
      <ul className="programtagcloud">
        {tagList}
        {loading && <li className="programtagcloud-loader button-spinner" />}
      </ul>
    )
  }
}
