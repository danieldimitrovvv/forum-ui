import React, { Component } from 'react'
import Preloader from '../../Preloader'
import MessageHistoryListItem from './MessageHistoryListItem';

class MessageHistoryList extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {

  }

  render () {
    return (
      <div>
         <div className="msg_history">
          { this.props.data.length > 0 &&
            this.props.data.map((message,i) => (
              <MessageHistoryListItem key={i} message={message}/>
            ))
          }

          { this.props.data.length === 0 &&
            <div className="text-center">
              <h3>Say Hi !!!!</h3>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default Preloader(MessageHistoryList)
