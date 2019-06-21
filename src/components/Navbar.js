import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Auth from '../services/Auth'
import Theme from '../services/Theme'
import Roles from './users/Role';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: this.props.theme
    }
  }

  getThemeClass = () => {
    return Theme.getNavbarThemeClass(this.props.theme);
  }

  render () {
    return (
      <div className={this.getThemeClass()}>
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <button 
            className='navbar-toggler' 
            type='button' 
            data-toggle='collapse' 
            data-target='#navbarNav' 
            aria-controls='navbarNav' 
            aria-expanded='false' 
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon' />
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <Link className='nav-link' to='/home'>Home</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/topics'>Topic</Link>
              </li>
              {Auth.isAuthenticate() && <li className='nav-item'>
                <Link className='nav-link' to='/messanger'>Messanger</Link>
              </li>}

              {
                Auth.isAuthenticate() && 
                Auth.getUser() &&
                Auth.getUser().role === Roles.Admin &&  
                <li className='nav-item'>
                  <Link className='nav-link' to='/users'>Users</Link>
                </li>
              }
              {Auth.isAuthenticate() && <li className='nav-item'>
                <Link className='nav-link' to='/logout'>Logout</Link>
              </li>}
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

export default Navbar
