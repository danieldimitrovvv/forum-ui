import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Api from '../../../services/Api'
import Topics from './AllTopics'

class ListTopicsPage extends Component {
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
        <h1>List of topics:</h1>
        {/* <Topics request={Api.setInterseptor(this.props).fetchTopics()} /> */}
        <Topics 
          request={Api.setInterseptor(this.props).fetchTopicsByPageAndSize(this.state.page, this.state.size)} 
          activePage={this.state.page} 
          size={this.state.size}
          pageChange={this.changePage}/>
        <Link to='topics/add' className='btn btn-primary' >Add new Topic</Link>
      </div>
    )
  }
}

export default ListTopicsPage
