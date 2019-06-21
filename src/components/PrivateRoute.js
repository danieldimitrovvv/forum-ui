import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Auth from '../services/Auth'


const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  if (Auth.isAuthenticate()) {
    
    let currentUser = Auth.getUser();

    // check if route is restricted by role
    if (roles && currentUser && roles.indexOf(currentUser.role) !== -1) {
      // role not authorised so redirect to home page
      return (<Route {...rest} render={(props) => <Component {...props} />} />)
    } else {
      return <Redirect to='/' />
    }
  } else {
    return <Redirect to='/' />
  }
}

export default PrivateRoute
