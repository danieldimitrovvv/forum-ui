import React, { Component } from 'react'
import DateFormat from '../../DateFormat'

class IncomingMessage extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    let {message} = this.props
    return (
    	<div>
        <div className="incoming_msg">
          <div className="incoming_msg_img"> 
            <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> 
          </div>
          <div className="received_msg">
            <div className="received_withd_msg">
              <p>{message.message}</p>
              <span className="time_date"> 
                <DateFormat date={message.createdOn}/>
              </span>
            </div>
          </div>
        </div>
		</div>
    )
  }
}

export default IncomingMessage
