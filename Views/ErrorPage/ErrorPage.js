import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'

import { toast } from 'react-toastify'

import Dimmer from '../../Atoms/Dimmer/Dimmer'
import { AuthUtils, Helpers } from '@shared/helpers'
// FIXME: Update to use 1 place for the error messages
import { handledErrors } from '../../../handledErrorMessages'
import ErrorMessages from '../../../ErrorMessages.json'
import ProjectPowered from '../../Atoms/ProjectPowered/ProjectPowered'
import ServerIssue from '../ServerIssue/ServerIssueContainer'

import './ErrorPage.css'

import debug from 'debug'
const d = debug('project:ErrorPage')

// FIXME: Does this really need a show prop? I don't think so
export default class ErrorPage extends Component {
  static propTypes = {
    /** The error code for the error  */
    code: PropTypes.string,
    /** The error message */
    message: PropTypes.string,
    /** An error object from a graphQl error */
    error: PropTypes.shape({
      graphQLErrors: PropTypes.arrayOf(
        PropTypes.shape({
          message: PropTypes.string.isRequired,
        })
      ),
    }),
    networkError: PropTypes.shape({
      response: PropTypes.object,
      result: PropTypes.shape({
        errors: PropTypes.arrayOf(
          PropTypes.shape({
            message: PropTypes.string.isRequired,
          })
        ),
      }),
    }),
    /** If true, will display the form */
    show: PropTypes.bool,
  }
  static defaultProps = {
    code: '',
    message: '',
    // NOTE: not providing a default for error here, we want to use what react passes
  }

  state = {
    showError: false,
  }

  handleShowErrorToggle = () => {
    this.setState({ showError: !this.state.showError })
  }

  render() {
    const { code, message, error } = this.props
    const { showError } = this.state

    // ********************************************************
    //
    // Decide if a handled action is required
    //
    // ********************************************************
    if (error) {
      // Force ServerIssue page to show if network request fails while we are online
      if (navigator.onLine && error.message) {
        if (error.message.includes('fetch resource') || error.message.includes('Failed to fetch')) {
          return <ServerIssue />
        }
      }

      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        if (Helpers.includesErrorMessage(error.graphQLErrors, handledErrors.TOKEN_EXPIRED)) {
          toast.warning(<TokenExpiredMessage />, {
            autoClose: false,
          })

          d(`handling "${handledErrors.TOKEN_EXPIRED}"`)
          AuthUtils.logout()
          return <Redirect to="/login" />
        }

        // Not Allowed
        if (Helpers.includesErrorMessage(error.graphQLErrors, ErrorMessages.Auth.NOT_ALLOWED)) {
          d(`handling "${ErrorMessages.NOT_ALLOWED}"`)

          // we made a request and were denied

          return <Redirect to="/app/restricted" />
        }

        if (Helpers.includesErrorMessage(error.graphQLErrors, handledErrors.TOKEN_REVOKED)) {
          d(`handling "${handledErrors.TOKEN_REVOKED}"`)
          AuthUtils.logout()
          return <Redirect to="/login" />
        }

        if (Helpers.includesErrorMessage(error.graphQLErrors, handledErrors.SIG_FAILED)) {
          d(`handling "${handledErrors.SIG_FAILED}"`)
          AuthUtils.logout()
          return <Redirect to="/login" />
        }

        // Tried to call the api w/ a bad or missing token
        if (error.message.includes(ErrorMessages.Auth.BAD_TOKEN)) {
          d(`handling "${ErrorMessages.Auth.BAD_TOKEN}"`)
          AuthUtils.logout()
          return <Redirect to="/login" />
        }

        // Not Found
        if (Helpers.includesErrorMessage(error.graphQLErrors, ErrorMessages.NOT_FOUND)) {
          d(`handling "${ErrorMessages.Auth.NOT_FOUND}"`)

          return <Redirect to={`/not-found`} />
        }
      }
    }

    // ********************************************************
    //
    // unhandled errors
    //
    // ********************************************************
    let errorCode = 'Not provided'
    if (code) errorCode = code

    let errorMessage = ''
    if (error) {
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        errorCode = 'GraphQl Error'
        error.graphQLErrors.forEach(error => (errorMessage = error.message + '\n\n'))
      }

      if (error.networkError && error.networkError.result && error.networkError.result.errors.length > 0) {
        errorCode = 'Network Error'
        error.networkError.result.errors.forEach(error => (errorMessage = error.message + '\n\n'))
      } else {
        // if we get here, there may something in message (type error, etc...) in the message field
        if (error.message) {
          if (error.message && error.stack) {
            errorMessage = `${error.message} \n\n ${error.stack}`
          } else {
            errorMessage = error.message
          }
        }
      }
    } else {
      // handle a passed message with no val in error prop
      errorMessage = message
    }

    // handle empty error messages, so we always show something
    // if error message is empty, then we got an error in the prop but couldn't decide what it was
    if (!errorMessage) {
      errorMessage = 'An unhandled error was encountered with no message\n\nCheck the console for more details.'
      d(`received error=%O`, error)

      // Make it easier to debug where "empty" errors came from
      console.error(new Error(errorMessage).stack)
    }
    d(`setting errorMessage=${errorMessage}`)

    // ********************************************************
    //
    // Show error page
    //
    // ********************************************************
    const errorVisibility = showError ? 'errorpage-error--show' : 'errorpage-error--hide'
    return (
      <div className="errorpage-wrap">
        <Dimmer show={true} />
        <div className="errorpage-content">
          <h1 className="errorpage-title">Sorry, something has gone wrong.</h1>
          <h2 className="errorpage-message">
            It's not your fault and thanks for your patience while we work on the issue.
          </h2>
          <h3 className="errorpage-text">In the meantime, you can...</h3>
          <ul className="errorpage-list">
            <li className="errorpage-list-item">
              Go to the <Link to="/app/dashboard">dashboard</Link>
            </li>
            <li className="errorpage-list-item">
              Go to our <a href="https://projectified/support/">support</a> page
            </li>
          </ul>
          <button className="errorpage-error-button" onClick={this.handleShowErrorToggle}>
            Display Error
          </button>
          <div className={`errorpage-error-message ${errorVisibility}`}>
            <pre>
              <em>Code:</em> {errorCode}
            </pre>
            <p style={{ whiteSpace: 'pre-wrap' }}>
              <em>Message:</em> {errorMessage}
            </p>
          </div>
          <ProjectPowered className="projectpowered-logo" />
        </div>
      </div>
    )
  }
}

const TokenExpiredMessage = () => {
  return (
    <p>
      You have been logged out. <br />
      <br />
      We log users out after a period of inactivity to ensure your account remains secure.
    </p>
  )
}
