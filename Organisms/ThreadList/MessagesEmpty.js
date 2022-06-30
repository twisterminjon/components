import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'

export default class MessagesEmpty extends Component {
  render() {
    return (
      <div className="messagelist-messagesempty">
        <Icon name="comments" size="massive" />
        <h4 className="messagelist-messagesempty-title">You don't have any messages yet.</h4>
        <p className="messagelist-messagesempty-text">
          To send a message, click the message button <Icon name="comment" />
          next to a patient or staff member in the Staff or Patients tab.
        </p>
      </div>
    )
  }
}
