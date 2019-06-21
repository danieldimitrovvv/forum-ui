import React, { Component } from 'react'
import Preloader from '../../Preloader'
import RecentListItem from './RecentListItem';

class RecentList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: this.props.data
    }

    console.log("RECENT LIST ", this.props);
  }

  render () {
    return (
      <div>
        <div className="inbox_chat">
          { 
            !this.props.userWithMessage  &&
            this.state.data.map((data, i) => (
              <RecentListItem 
              key={i} 
              user={data} 
              receiverId={this.props.receiverId} 
              changeRecceiver = {this.props.changeRecceiver}/>
            ))
          }

          { 
            this.props.userWithMessage  &&
            this.state.data.map((data, i) => (
              <RecentListItem 
              key={i} 
              user={data.user} 
              lastMessage={data.message} 
              receiverId={this.props.receiverId} 
              changeRecceiver = {this.props.changeRecceiver}/>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Preloader(RecentList)
