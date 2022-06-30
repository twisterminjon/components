import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { differenceBy, isEqual } from 'lodash-es'

import ProgramTagCloud from '../ProgramTagCloud/ProgramTagCloud'
import SelectSideBar from '../SelectSideBar/SelectSideBar'
import EnrollProgramToast from '../../Molecules/EnrollProgramToast/EnrollProgramToast'

export default class ProgramTagSection extends Component {
  static propTypes = {
    /** Text to display in sidbar title */
    title: PropTypes.string.isRequired,
    /** A list of selected programs to display */
    enrolledPrograms: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        program: PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        }),
      })
    ).isRequired,
    /** A list of programs that the user can pick from (all available programs) */
    allPrograms: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    /** called when a program is added */
    onAdd: PropTypes.func.isRequired,
    /** Called when a program edit is clicked */
    onEdit: PropTypes.func.isRequired,
    /** If true will display the selection sidebar */
    showSelectPane: PropTypes.bool.isRequired,
    /** Called when the sidebar cancel button is clicked */
    onClose: PropTypes.func.isRequired,
    /** If true, will show a loading spinning */
    loading: PropTypes.bool,
    /** Wrapper style for the tagCloud display */
    sectionStyle: PropTypes.object,
    /** ClassName for the wrapper */
    className: PropTypes.string,
    /** Style for the wrapper */
    style: PropTypes.object,
  }
  static defaultProps = {
    loading: false,
    sectionStyle: {},
    className: '',
    style: {},
  }

  constructor(props) {
    super(props)

    this.state = {
      currentPossibleTags: this.getPossibleTags(this.props.enrolledPrograms),
      tagToAddId: '',
      tagToAddName: '',
      showEnrollProgramModal: false,
    }

    this.handleAddTag = this.handleAddTag.bind(this)
    this.getPossibleTags = this.getPossibleTags.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    // The list of all Programs has changed
    if (this.props.allPrograms !== prevProps.allPrograms) {
      const currentPossibleTags = this.getPossibleTags(this.props.enrolledPrograms)

      this.setState({ currentPossibleTags })
    }

    // This list of enrolled programs has changed. This is needed to
    // make sure the possible tags gets updated on deletes.
    if (!isEqual(this.props.enrolledPrograms, prevProps.enrolledPrograms)) {
      const currentPossibleTags = this.getPossibleTags(this.props.enrolledPrograms)

      this.setState({
        enrolledPrograms: this.props.enrolledPrograms,
        currentPossibleTags,
      })
    }
  }

  handleEditTag = (enrollmentId, id, name) => {
    this.props.onEdit(enrollmentId, id, name)
  }

  handleBeforeAddTag = (id, name) => {
    this.setState({
      showEnrollProgramModal: true,
      tagToAddId: id,
      tagToAddName: name,
    })
  }

  handleAddTag(id, name) {
    const currentPossibleTags = this.getPossibleTags(this.props.enrolledPrograms)
    currentPossibleTags.sort(this.nameSorter)

    this.setState({
      currentPossibleTags,
    })
    this.props.onAdd(id) // the program id
    this.props.onClose()
  }

  handleSidebarClose = () => {
    this.props.onClose()
  }

  getPossibleTags = enrolledPrograms => {
    // Convert objects in tagsToRemove to match objects in allPrograms
    const newRemove = []
    // Leave programs for an enrollment that the user completed.
    enrolledPrograms.forEach(tag => {
      if (!tag.completedOn) {
        newRemove.push({ id: tag.program.id, name: tag.program.name })
      }
    })
    return differenceBy(this.props.allPrograms, newRemove, 'id')
  }

  nameSorter = (a, b) => {
    var x = a.name.toLowerCase()
    var y = b.name.toLowerCase()
    if (x < y) {
      return -1
    }
    if (x > y) {
      return 1
    }
    return 0
  }

  handleEnroll = enrollData => {
    this.props.onAdd(enrollData)
  }

  render() {
    const { title, enrolledPrograms, showSelectPane, style, className, sectionStyle, loading } = this.props
    const { currentPossibleTags, tagToAddId, tagToAddName, showEnrollProgramModal } = this.state

    return (
      <React.Fragment>
        <EnrollProgramToast
          onClose={() => this.setState({ showEnrollProgramModal: false })}
          onEnroll={this.handleEnroll}
          program={{ id: tagToAddId, name: tagToAddName }}
          show={showEnrollProgramModal}
        />
        <div className={`programtagsection-wrapper ${className}`} style={style}>
          <SelectSideBar
            show={showSelectPane}
            title={title}
            list={currentPossibleTags}
            onSelect={this.handleBeforeAddTag}
            onCancel={this.handleSidebarClose}
          />
          <ProgramTagCloud
            sectionStyle={sectionStyle}
            tags={enrolledPrograms}
            onTagEdit={this.handleEditTag}
            data-testid={`tag-cloud-${title}`}
            loading={loading}
          />
        </div>
      </React.Fragment>
    )
  }
}
