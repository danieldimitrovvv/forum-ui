import React, { Component } from 'react'
import  FontAwesome  from 'react-fontawesome';
import Api from '../../../services/Api';
import Auth from '../../../services/Auth';

class UserItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: this.props.user.role
    };
  }
  
  deleteUser = (userId) => {
    return () => {
      Api.setInterseptor(this.props)
      .deleteUser(userId)
      .then(resp => {
        if (resp) {
          if (Auth.getUser().id === userId) {
            Auth.removeToken();
            this.props.history.push('/')
          } else {
            this.props.changeUsers();
          }
        }
      });
    }
  }

  handleOnChangeRole = (event) => {
    let { name, value } = event.target
    this.setState({ [name]: value});
    Api.setInterseptor(this.props).changeUserRoleByUserId(this.props.user.id, value);
  }

  render () {
    let { user } = this.props
    return (
      <div>
        <div className='row' style={{ padding: '10px' }}>
          <div className='col-3'>
            {user.username}
          </div>
          <div className='col-3'>
            {user.email} 
          </div>
          <div className='col-2'>
           {user.theme} 
          </div>
          
          { Auth.getUser().id !== user.id && 
            <div className='col-2'>
              <div className="form-group">
                <select className="form-control" id="role" 
                  onChange={this.handleOnChangeRole} value={this.state.role} name="role">
                  <option value="ADMIN">admin</option>
                  <option value="USER">user</option>
                </select>
              </div>
            </div>
          }

          { Auth.getUser().id === user.id && <div className='col-2'>
           {user.role} 
          </div>}

          <div className='col-2'>
            <FontAwesome
              name="user-times"
              className="thumbs-up-fa-icon"
              style = {{color: 'red'}}
              onClick={this.deleteUser(user.id)}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default UserItem
