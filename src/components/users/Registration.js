import React, { Component } from 'react'
import Api from '../../services/Api'
import { Link } from 'react-router-dom';

class Registration extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      repeatpassword: '',
      email: '',
      theme: 'default',
      error: {}
    }
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnSumbit = this.handleOnSumbit.bind(this)
    this.validate = this.validate.bind(this)
  }

  validate () {
    let { username, password, repeatpassword, email } = this.state
    let error = {}
    let hasError = false;

    if (username.length < 3) {
      error.username = 'Username must be more than 3 symbols!'
      hasError = true
    }

    if (password.length < 3) {
      error.password = 'Password must be more than 3 symbols!'
      hasError = true
    }

    if (password !== repeatpassword) {
      error.repeatpassword = 'Password and repeat password must be equal!!'
      hasError = true
    }

    // if (email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i)) {
    //   error.email = 'Email is not valid!!'
    // }

    this.setState({error})
    return !hasError
  }

  handleOnSumbit (event) {
    event.preventDefault()
    if (this.validate()) {
      const user = {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        theme: this.state.theme
      }
      Api.registration(user)
        .then(({ data }) => {
          this.props.initUserTheme();
          this.props.history.push('/')
        })
        .catch(data => {
          const error = {
            username: data.error
          }
          this.setState({ error })
        })
    }
  }

  handleOnChange (event) {
    let { name, value } = event.target
    this.setState({ [name]: value })
  }

  render () {
    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleOnSumbit}>
          <div className='form-group'>
            <label htmlFor='username'>Username</label>
            <input type='text'
              className='form-control'
              id='username'
              name='username'
              value={this.state.username}
              onChange={this.handleOnChange} />
            {this.state.error.username &&
              <small id='errorUserName' className='form-text text-muted'>{this.state.error.username}</small>}
          </div>

          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input type='email'
              className='form-control'
              id='email'
              name='email'
              value={this.state.email}
              onChange={this.handleOnChange} />
            {this.state.error.email &&
              <small id='errorEmail' className='form-text text-muted'>{this.state.error.email}</small>}
          </div>
          
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input type='password'
              className='form-control'
              id='password'
              name='password'
              value={this.state.password}
              onChange={this.handleOnChange} />
            {this.state.error.password &&
              <small id='errorPassword' className='form-text text-muted'>{this.state.error.password}</small>}
          </div>

          <div className='form-group'>
            <label htmlFor='repeatpassword'>Repeat Password</label>
            <input type='password'
              className='form-control'
              id='repeatpassword'
              name='repeatpassword'
              value={this.state.repeatpassword}
              onChange={this.handleOnChange} />
            {
              this.state.error.repeatpassword &&
              <small id='errorRepeatPassword' className='form-text text-muted'>
                {this.state.error.repeatpassword}
              </small>
            }
          </div>

          <div className="form-group">
            <label htmlFor="theme">Select Them</label>
            <select className="form-control" id="theme" 
              onChange={this.handleOnChange} value={this.state.theme} name="theme">
              <option value="default">default</option>
              <option value="red">red</option>
              <option value="blue">blue</option>
              <option value="dark">dark</option>
            </select>
          </div>
          <input type='submit' className='btn btn-primary' />
          <Link className='btn btn-success' to='/' style={{float: 'right'}}>Login</Link>
        </form>
      </div>
    )
  }
}

export default Registration
