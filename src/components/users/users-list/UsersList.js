import React, { Component } from 'react'
import Preloader from '../../Preloader'
import Pagination from '../../Paginatiion'
import UserItem from './UserItem'
import { withRouter } from 'react-router-dom';
import Api from '../../../services/Api';

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }
  
  changeUsers = () => {
    Api
    .setInterseptor(this.props)
    .fetchUsers()
    .then(response =>{
      this.setState({data: response.data})
    })
  }

  render () {
    const { data } = this.state
    return (<div>
      {
        data.map((user, index) => (
          <UserItem key={index} user={user} {...this.props} changeUsers={this.changeUsers}/>
        ))
      }
      {/* <Pagination 
          activePage={this.props.activePage} 
          size={this.props.size} 
          pageChange={this.props.pageChange}
          countItems={this.props.data.size}
          {...this.props}/> */}
    </div>)
  }
}

export default withRouter(Preloader(UsersList))
