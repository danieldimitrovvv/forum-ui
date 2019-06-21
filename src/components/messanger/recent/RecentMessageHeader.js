import React, { Component } from 'react'
import RecentMessageSearchForm from './RecentMessageSearchForm';
// import { Link } from 'react-router-dom'
// import Api from '../services/Api'

class RecentMessageHeader extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  changeUsersListItem = (withMessage) => {
    return () => {
      this.props.getUserWithMessages(withMessage);
    }
  }

  render () {
    return (
    	<div>
        <div className="headind_srch">
          <div className="recent_heading">
            <h4>Recent</h4>
          </div>
          <RecentMessageSearchForm {...this.props} />
          <div className="change-recent-list">
            <span onClick={this.changeUsersListItem(true)}>Sent</span>
            <span onClick={this.changeUsersListItem(false)}>All</span>
          </div>
        </div>
      
      </div>
    )
  }
}

export default RecentMessageHeader
