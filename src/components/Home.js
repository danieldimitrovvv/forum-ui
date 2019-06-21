import React from 'react'
import Login from './users/Login'

const Home = function (props) {
  return (
    <div>
      <Login {...props} />
    </div>
  )
}

export default Home
