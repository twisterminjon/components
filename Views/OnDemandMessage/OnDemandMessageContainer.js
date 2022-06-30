import React, { Component } from 'react'

import { Loader } from 'semantic-ui-react'
import { toast } from 'react-toastify'

import { Query, Mutation } from 'react-apollo'
import MessagesQl from '../../../services/MessagesQl'

import OnDemandMessage from './OnDemandMessage'
import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import { truncate } from '@shared/helpers'

import './OnDemandMessage.css'

import debug from 'debug'
const d = debug('project:OnDemandMessagesContainer')

export default class OnDemandMessageContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      translationId: '',
    }

    this.handleGetMessageText = this.handleGetMessageText.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Due to how we are using polling, this component will
    // update and re-render everything a parent polls and gets data
    // We need to override that behavior and only update when we have
    // a change we want.
    if (nextProps.match.params.id !== this.props.match.params.id) {
      d(`SCU called and updating with nextProps.match.params.id: ${nextProps.match.params.id}`)
      return true
    }

    if (nextState.translationId !== this.state.translationId) {
      d(`SCU called and updating with nextState.translationId: ${nextState.translationId}`)
      return true
    }

    return false
  }

  handleSendComplete(name) {
    d(`send message complete`)

    toast.success(`Message was sent to ${name}`, {
      hideProgressBar: true,
    })
    this.props.history.goBack()
  }

  handleGetMessageText(translationId) {
    d(`handleGetMessageText called with translation id: ${translationId}`)

    this.setState({ translationId })
  }

  render() {
    const { translationId } = this.state
    const recipientId = this.props.match.params.id
    if (!recipientId) return null

    const GET_RECIPIENT_QUERY = MessagesQl.getOnDemandLookup()
    const GET_TRANSLATION_QUERY = MessagesQl.getTranslation()
    const SEND_MESSAGE_MUTATION = MessagesQl.sendOnDemandMessage()

    return (
      <Query
        query={GET_RECIPIENT_QUERY}
        variables={{
          recipientId: recipientId,
        }}
        fetchPolicy="network-only">
        {({ loading, error: recipientError, data }) => {
          if (loading)
            return (
              <div className="center" style={{ width: '100%' }}>
                <Loader active inline size="massive" />
              </div>
            )

          if (recipientError) {
            return <ErrorPage error={recipientError} />
          }

          d(`GET_RECIPIENT_QUERY complete`)
          const user = data.user
          const templates = data.user.enterprise.templates

          return (
            <Mutation
              mutation={SEND_MESSAGE_MUTATION}
              onCompleted={data => {
                d(`SEND_MESSAGE_MUTATION complete`)

                this.handleSendComplete(user.displayName)
              }}>
              {(sendMessage, { loading, error: sendMessageError }) => {
                if (sendMessageError) {
                  if (sendMessageError.message.includes('Recipient is not a patient')) {
                    d(`SEND_MESSAGE_MUTATION error with 'Recipient is not a patient'`)

                    toast.error(`These types of messages can only be sent to patients`, {
                      hideProgressBar: true,
                    })
                  } else {
                    return <ErrorPage error={sendMessageError} />
                  }
                }

                // Only execute the query when we have a translation id (the user picked a language)
                const skipTranslation = translationId === '' || translationId === '-1' ? true : false

                return (
                  <Query
                    query={GET_TRANSLATION_QUERY}
                    skip={skipTranslation}
                    variables={{
                      translationId,
                    }}
                    fetchPolicy="network-only">
                    {({ loading: translationLoading, error: translationError, data: translationData }) => {
                      if (translationError) {
                        return <ErrorPage error={translationError} />
                      }

                      let message = ''
                      let publishedMttId = ''
                      if (!translationLoading && translationData) {
                        if (translationData.mttranslation.publishedMTT) {
                          message = translationData.mttranslation.publishedMTT.smsContent

                          publishedMttId = translationData.mttranslation.publishedMTT.id
                        } else {
                          return (
                            <ErrorPage
                              show={true}
                              code="No published translation found"
                              message={`Message with id = ${translationId}, does not have a published versions`}
                            />
                          )
                        }
                      }

                      // if we have skipped and translationId is -1 (the user wants a custom message)
                      // we need to force an update to the props so the child nows a change happened and updates.
                      if (skipTranslation && translationId === '-1') {
                        message = ''
                        publishedMttId = '-1'
                      }

                      d(`GET_TRANSLATION_QUERY complete with skip=${skipTranslation}`)
                      d(`GET_TRANSLATION_QUERY message='${truncate(message, 50)}'`)

                      return (
                        <OnDemandMessage
                          user={user}
                          templates={templates}
                          messageText={message}
                          onGetMessageText={this.handleGetMessageText}
                          onSend={text => {
                            sendMessage({
                              variables: { recipientId, text, publishedMttId },
                            })
                          }}
                          sentMessageInFlight={loading}
                          loadingNewTranslation={translationLoading && !skipTranslation}
                        />
                      )
                    }}
                  </Query>
                )
              }}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}
