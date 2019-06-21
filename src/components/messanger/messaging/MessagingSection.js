import React, { Component } from 'react'
import MessagingForm from './MessagingForm';
import MessageHistoryList from './MessageHistoryList';
import Api from '../../../services/Api'

class MessagingSection extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  

  render () {
    return (
    	<div>
       { 
          this.props.receiverId &&  
          <div className="mesgs">
            <div className="msg_history">
              <MessageHistoryList 
                request = {Api.setInterseptor(this.props).fetchMessageByUserId(this.props.receiverId)}/>
            </div>
            <MessagingForm 
              receiverId = {this.props.receiverId} 
              changeCurrentSessionSentMessages={this.props.changeCurrentSessionSentMessages}/>
          </div> 
      }

      { 
          !this.props.receiverId &&  
          <div className="text-center">
            <h3>Select User</h3>
          </div> 
      }

      </div>
    )
  }
}

export default MessagingSection
