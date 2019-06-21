import React, { Component } from 'react'
import Auth from '../../../services/Auth';
import Api from '../../../services/Api';
import DateFormat from '../../DateFormat'
import FontAwesome from 'react-fontawesome'

class RecentListItem extends Component {

  constructor (props){
    super(props)
    this.state = {
      lastMessage: this.props.lastMessage ? this.props.lastMessage : undefined,
    }
  }


  changeRecceiver = (newReceiverId) => {
    return () => { this.props.changeRecceiver(newReceiverId)}
  }

  getLastMessage = () => {
    Api.fetchUserWithLastMessage(this.props.user.id)
    .then((response) => {
      const message =  response.data.message;
      if (message) {
        this.setState({
          lastMessage: {
            message: message.message,
            createdOn: message.createdOn
          }
        })
      }
    })
  }

  render () {
    let {user} = this.props
    let {lastMessage} = this.state

    // hide current user profile
    if (user.id === Auth.currentUser.id) {
      return '';
    }

    return (
      <div>
        <div className={ (this.props.receiverId === user.id) ? 'chat_list active_chat' : 'chat_list'}>
          <div className="chat_people">
            <div className="chat_img" onClick={this.getLastMessage}> 
              <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/>
              <div className="text-center">
                { 
                  lastMessage && lastMessage.hasSeen && 
                  <FontAwesome
                    className="fa-check-circle-o"
                    name="cog"
                  />
                }
              </div>
            </div>
            <div className="chat_ib" onClick={this.changeRecceiver(user.id)}>
              <h5>{ user.username }
                { lastMessage && lastMessage.createdOn && 
                  <span className="chat_date">
                    <DateFormat date={lastMessage.createdOn}/>
                  </span>
                }
              </h5>
              <p>{ lastMessage && lastMessage.message }</p>
            </div>
          </div>
        </div>
       
      </div>
    )
  }
}

export default RecentListItem
