import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TextAreaInput from '../../Molecules/TextAreaInput/TextAreaInput'
import CharacterCounter from '../../Atoms/CharacterCounter/CharacterCounter'
import Avatar from '../../Atoms/Avatar/Avatar'
import DropdownList from '../../Molecules/DropdownList/DropdownList'
import InputLabel from '../../Atoms/InputLabel/InputLabel'
import { truncate } from '@shared/helpers'
import DocTitle from '../../Atoms/DocTitle/DocTitle'
import Button from '../../Atoms/Button/Button'

import './OnDemandMessage.css'

import debug from 'debug'
const d = debug('project:OnDemandMessages')

export default class OnDemandMessage extends Component {
  static propTypes = {
    /** user who will recieve the message */
    user: PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      profileImage: PropTypes.string.isRequired,
    }).isRequired,
    /** A list of templates that can be used for populating messages */
    templates: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        mttranslations: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            language: PropTypes.shape({
              id: PropTypes.string.isRequired,
              code: PropTypes.string.isRequired,
              name: PropTypes.string.isRequired,
            }).isRequired,
          }).isRequired
        ).isRequired,
      }).isRequired
    ),
    /** Can use predfined message text */
    messageText: PropTypes.string,
    /** Called to retrieve a templates message text */
    onGetMessageText: PropTypes.func.isRequired,
    /** function called to send the message */
    onSend: PropTypes.func.isRequired,
    /** Can display an indicator that the message is being sent (in flight) */
    sentMessageInFlight: PropTypes.bool,
    /** Can display a loading indicator while retrieving a message translation */
    loadingNewTranslation: PropTypes.bool,
  }
  static defaultProps = {
    messageText: '',
    sentMessageInFlight: false,
    loadingNewTranslation: false,
  }
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      errorMessage: '',
      templateId: '-1',
      translationId: '',
      hasError: false,
      languageLookup: [],
      disableLanguage: true,
    }

    this.handleTemplateChange = this.handleTemplateChange.bind(this)
    this.handleLanguageChange = this.handleLanguageChange.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.messageText !== '' && this.props.messageText !== prevProps.messageText) {
      d(`CDU updated state.message='${truncate(this.props.messageText, 50)}'`)

      this.setState({ message: this.props.messageText })
    }
  }

  handleMessageChange = e => {
    this.setState({ message: e.target.value })
  }

  handleSend = () => {
    d(`sending message: ${this.state.message}`)

    this.props.onSend(this.state.message)
  }

  handleTemplateChange(e, { value }) {
    d(`template changed to id: ${value}`)

    const defaultTranslationId = this.getDefaultTemplateLanguage(value)

    this.setState({ templateId: value })
    this.updateLanguages(value, defaultTranslationId)

    this.props.onGetMessageText(defaultTranslationId)

    if (value === '-1') {
      this.setState({ message: '' })
    }
  }

  handleLanguageChange(e, { value }) {
    d(`language changed to translationId: ${value}`)
    d(`calling props.onGetMessageText: ${value}`)

    this.setState({ translationId: value })

    this.props.onGetMessageText(value)
  }

  updateLanguages = (templateId, defaultTranslationId) => {
    d(`updating languages to match templateId: ${templateId}`)
    if (templateId === '-1') {
      this.setState({
        translationId: '',
        languageLookup: [],
        disableLanguage: true,
      })
      return
    }

    // find the chosen template
    const template = this.props.templates.filter(template => template.id === templateId)

    // Update list of language options (every template will have at least 1 published translation)
    let languageLookup = []
    template[0].mttranslations.forEach(translation => {
      if (translation.publishedMTT) {
        languageLookup.push({
          key: translation.language.id,
          value: translation.id,
          text: translation.language.name,
        })
      }
    })

    this.setState({
      languageLookup,
      translationId: defaultTranslationId,
      disableLanguage: false,
    })
  }

  getDefaultTemplateLanguage = templateId => {
    // Get the default translation for a provided template

    // only if it is a real template
    if (templateId !== '-1') {
      const template = this.props.templates.filter(template => template.id === templateId)

      return template[0].defaultMTTranslation.id
    }

    return '-1'
  }

  render() {
    const { user, templates, sentMessageInFlight, loadingNewTranslation } = this.props
    const { templateId, translationId, message, languageLookup, errorMessage, hasError, disableLanguage } = this.state

    const templateOptions = templates.map(template => {
      return {
        key: template.id,
        value: template.id,
        text: template.name,
      }
    })
    // Add a 'no template' option
    templateOptions.unshift({
      key: '-1',
      value: '-1',
      text: 'Custom',
    })

    return (
      <div className="ondemandmessage-wrap">
        <DocTitle title="On-Demand Message" />

        <div className="ondemandmessage--row">
          <Avatar size={40} imgUrl={user.profileImage} style={{ marginRight: 6 }} />
          <p className="ondemandmessage-title">Send a one-time message to {user.displayName}</p>
        </div>

        <DropdownList
          name="dropdown-template"
          label="Template"
          options={templateOptions}
          value={templateId}
          fluid
          search
          selection
          onChange={this.handleTemplateChange}
          data-testid="dropdown-template"
        />

        <DropdownList
          name="dropdown-language"
          label="Language"
          placeholder="Choose a language for the message"
          options={languageLookup}
          value={translationId}
          disabled={disableLanguage}
          fluid
          search
          selection
          onChange={this.handleLanguageChange}
          style={{ marginBottom: '24px' }}
        />

        <p className="ondemandmessage-phi">Reminder: This is sent over insecure channels. Do not include PHI!</p>

        <InputLabel label="Message" />
        <TextAreaInput
          name="ondemand-message"
          autoFocus={true}
          value={message}
          errorMessage={errorMessage}
          hasError={hasError}
          onChange={this.handleMessageChange}
          required={false}
          loading={loadingNewTranslation}
          disabled={loadingNewTranslation}
        />

        <div className="ondemandmessage--row">
          <CharacterCounter
            text={message}
            maxLength={430}
            style={{
              marginLeft: 'auto',
              whiteSpace: 'nowrap',
            }}
          />
        </div>

        <Button
          name="Send"
          disabled={message === '' || sentMessageInFlight}
          onClick={this.handleSend}
          fluid
          data-testid="send-message-button">
          Send
        </Button>
      </div>
    )
  }
}
