import React, { Component } from 'react'
import IncomingMessage from './IncomingMessage'
import OutgoingMessage from './OutgoingMessage'

class MessageHistoryListItem extends Component {
  render () {
    let {message, incoming} = this.props.message
    return (
      <div>
        {incoming && <IncomingMessage message={message}/>}
        {!incoming && <OutgoingMessage message={message}/>}
      </div>
    )
  }
}

export default MessageHistoryListItem
