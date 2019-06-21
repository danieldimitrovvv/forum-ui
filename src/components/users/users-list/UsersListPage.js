import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import UserList from './UsersList'
import Api from '../../../services/Api'

class UserListPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 0,
      size: +process.env.REACT_APP_ELEMENTS_IN_PAGE
    }
  }

  changePage = (page, size) => {
      this.setState({
        page,
        size
      });
  }

  render () {
    return (
      <div>
        <h1>List of Users:</h1>
        <UserList
          request={Api.setInterseptor(this.props).fetchUsers()} 
          activePage={this.state.page} 
          size={this.state.size}
          pageChange={this.changePage}/>
        <Link to='/registration' className='btn btn-primary' >Add new user</Link>
      </div>
    )
  }
}

export default UserListPage
