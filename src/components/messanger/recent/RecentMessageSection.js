import React, { Component } from 'react'
import RecentMessageHeader from './RecentMessageHeader';
import RecentList from './RecentList';

// import { Link } from 'react-router-dom'
import Api from '../../../services/Api'

class RecentMessageSection extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchName: undefined,
      userWithMessage: false
    }
  }

  changeSearchValue = (value) => {
    this.setState({searchName: value, userWithMessage: false})
  }

  getUserWithMessages = (withMessage) => {
    this.setState({userWithMessage: withMessage})
  }

  render () {
    return (
    	<div>
        <div className="inbox_people">
          < RecentMessageHeader 
            {... this.props} 
            changeSearchValue = {this.changeSearchValue}
            getUserWithMessages = {this.getUserWithMessages}
          />

          { !this.state.searchName &&
            !this.state.userWithMessage &&
            <RecentList 
              request = {Api.setInterseptor(this.props).fetchUsers()}
              changeRecceiver = {this.props.changeRecceiver}
              receiverId={this.props.receiverId} 
              />
          }

          { this.state.searchName &&
            !this.state.userWithMessage &&
            <RecentList 
              request = {Api.setInterseptor(this.props).searchUserByName(this.state.searchName)}
              changeRecceiver = {this.props.changeRecceiver}
              receiverId={this.props.receiverId} 
              />
          }

          { 
            this.state.userWithMessage &&
            <RecentList 
              request = {Api.setInterseptor(this.props).fetchUsersWithMessages()}
              changeRecceiver = {this.props.changeRecceiver}
              receiverId={this.props.receiverId}
              userWithMessage = "true"
              />
          }
        </div>
      </div>
    )
  }
}

export default RecentMessageSection
