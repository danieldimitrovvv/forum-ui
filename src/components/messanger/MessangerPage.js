import React, { Component } from 'react'
import RecentMessageSection from './recent/RecentMessageSection'
import MessagingSection from './messaging/MessagingSection'

class MessangerPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      receiverId: undefined,
      currentSessionSentMessages: 0
    }
  }

  changeRecceiver = (receiverId) => {
    this.setState({receiverId});
  }

  changeCurrentSessionSentMessages = () => {
    this.setState({
      currentSessionSentMessages: this.state.currentSessionSentMessages + 1
    });
  }

  render () {
    return (
    	<div>
        <div className="container">
          <h3 className=" text-center">Messaging</h3>

          <div className="messaging">
            <div className="inbox_msg">
              <RecentMessageSection 
                {...this.props} 
                receiverId={this.state.receiverId} 
                changeRecceiver = {this.changeRecceiver}/>
              <MessagingSection 
                {...this.props} 
                receiverId={this.state.receiverId}
                changeCurrentSessionSentMessages ={this.changeCurrentSessionSentMessages}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MessangerPage
