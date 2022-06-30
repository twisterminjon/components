import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { differenceBy } from 'lodash-es'

import TagCloud from '../TagCloud/TagCloud'
import SelectSideBar from '../SelectSideBar/SelectSideBar'
import ModalYesNo from '../../Molecules/ModalYesNo/ModalYesNo'

const tagsNameSorter = (a, b) => {
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

const sortTags = tags => {
  const sorted = [...tags]
  sorted.sort(tagsNameSorter)
  return sorted
}

export default class TagSection extends Component {
  static propTypes = {
    /** Can show a loader on the sidebar */
    loadingTags: PropTypes.bool,
    /** Text to display in sidbar title */
    title: PropTypes.string.isRequired,
    /** A list of selected tags to display */
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    /** A list of tags that the user can pick from (all available tags) */
    possibleTags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    /** Wrapper style for the tagCloud display */
    sectionStyle: PropTypes.object,
    /** If true, a confirmation will will be shown prior to adding a tag */
    useAddConfirmation: PropTypes.bool,
    /** Called when the list of selected tags changes */
    onChange: PropTypes.func,
    /** Called when a tag is added */
    onAdd: PropTypes.func,
    /** Called when a tag is removed */
    onRemove: PropTypes.func,
    /** If true will display the selection sidebar */
    showSelectPane: PropTypes.bool.isRequired,
    /** Called when the sidebar cancel button is clicked */
    onClose: PropTypes.func.isRequired,
    /** ClassName for the wrapper */
    className: PropTypes.string,
    /** Style for the wrapper */
    style: PropTypes.object,
  }
  static defaultProps = {
    loadingTags: false,
    showAddConfirmation: false,
    sectionStyle: {},
    className: '',
    style: {},
    onChange: () => {},
    onAdd: () => {},
    onRemove: () => {},
  }

  constructor(props) {
    super(props)

    this.state = {
      currentTags: sortTags(this.props.tags),
      currentPossibleTags: this.getPossibleTags(this.props.tags),
      showDeleteConfirmation: false,
      tagToDeleteId: '',
      tagToDeleteName: '',
      showAddConfirmation: false,
      tagToAddId: '',
      tagToAddName: '',
    }

    this.handleAddTag = this.handleAddTag.bind(this)
    this.handleRemoveTag = this.handleRemoveTag.bind(this)
    this.getPossibleTags = this.getPossibleTags.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.possibleTags !== prevProps.possibleTags) {
      // the list of tags has changed
      const currentPossibleTags = this.getPossibleTags(this.state.currentTags)

      this.setState({ currentPossibleTags })
    }
    if (this.props.tags !== prevProps.tags) {
      this.setState({
        currentTags: sortTags(this.props.tags),
        currentPossibleTags: this.getPossibleTags(this.props.tags),
      })
    }
  }

  handleRemoveTag = (id, name) => {
    this.setState({
      showDeleteConfirmation: true,
      tagToDeleteId: id,
      tagToDeleteName: name,
    })
  }

  handleBeforeAddTag = (id, name) => {
    if (this.props.useAddConfirmation) {
      this.setState({
        showAddConfirmation: true,
        tagToAddId: id,
        tagToAddName: name,
      })
    } else {
      this.handleAddTag(id, name)
    }
  }

  handleAddTag(id, name) {
    const currentTags = [...this.state.currentTags]
    currentTags.push({ id, name, isActive: true })
    currentTags.sort(tagsNameSorter)

    const currentPossibleTags = this.getPossibleTags(currentTags)
    currentPossibleTags.sort(tagsNameSorter)

    this.setState({
      currentTags,
      currentPossibleTags,
      showAddConfirmation: false,
    })
    this.props.onChange(currentTags)
    this.props.onAdd(id)
    this.props.onClose()
  }

  handleSidebarClose = () => {
    this.props.onClose()
  }

  getPossibleTags = tagsToRemove => {
    return differenceBy(this.props.possibleTags, tagsToRemove, 'id')
  }

  removeTag = () => {
    const id = this.state.tagToDeleteId

    const currentTags = this.state.currentTags.filter(item => item.id !== id).sort(tagsNameSorter)

    const currentPossibleTags = this.getPossibleTags(currentTags).sort(tagsNameSorter)
    this.setState({
      currentTags,
      currentPossibleTags,
      showDeleteConfirmation: false,
    })
    this.props.onChange(currentTags)
    this.props.onRemove(id)
  }

  hideConfirmation = () => {
    this.setState({ showDeleteConfirmation: false, showAddConfirmation: false })
  }

  render() {
    const { loadingTags, title, showSelectPane, style, className, sectionStyle, TagView } = this.props
    const {
      currentTags,
      currentPossibleTags,
      showDeleteConfirmation,
      tagToDeleteName,
      showAddConfirmation,
      tagToAddId,
      tagToAddName,
    } = this.state

    return (
      <React.Fragment>
        {/* Delete confirmation */}
        <ModalYesNo
          show={showDeleteConfirmation}
          title={`Do you want to remove '${tagToDeleteName}"?`}
          message="Clicking Yes will remove the item."
          icon="delete"
          onYes={this.removeTag}
          onNo={this.hideConfirmation}
          defaultIsConfirm={false}
        />

        {/* Add confirmation */}
        <ModalYesNo
          show={showAddConfirmation}
          title={`Do you want to add '${tagToAddName}"?`}
          message="Clicking Yes will add the item."
          icon="question"
          onYes={() => {
            this.handleAddTag(tagToAddId, tagToAddName)
          }}
          onNo={this.hideConfirmation}
        />

        <div className={`tag-section-wrapper ${className}`} style={style}>
          <SelectSideBar
            loading={loadingTags}
            show={showSelectPane}
            title={title}
            list={currentPossibleTags}
            onSelect={this.handleBeforeAddTag}
            onCancel={this.handleSidebarClose}
          />

          <TagCloud
            loading={loadingTags}
            sectionStyle={sectionStyle}
            tags={currentTags}
            onTagDelete={this.handleRemoveTag}
            data-testid={`tag-cloud-${title}`}
            TagView={TagView}
          />
        </div>
      </React.Fragment>
    )
  }
}
