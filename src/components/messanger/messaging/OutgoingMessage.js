import React, { Component } from 'react'
import DateFormat from '../../DateFormat'

class OutgoingMessage extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    let {message} = this.props
    return (
    	<div>
        <div className="outgoing_msg">
          <div className="sent_msg">
            <p>{message.message}</p>
            <span className="time_date"> 
              <DateFormat date={message.createdOn}/>
              {message.hasSeen ? 'seen' : 'not seen'}
            </span> 
          </div>
        </div>
		</div>
    )
  }
}

export default OutgoingMessage
