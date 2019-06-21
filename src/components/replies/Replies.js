import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Preloader from '../Preloader'
import ReplyItem from './ReplyItem'
import Pagination from '../Paginatiion'

class Replies extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render () {
    const { topicId, data } = this.props
    return (<div>
      {
        data.replies.map((reply, index) => (
          <ReplyItem key={index} reply={reply} {...this.props} />
        ))
      }
      <Pagination 
          activePage={this.props.activePage} 
          size={this.props.size} 
          pageChange={this.props.pageChange}
          countItems={this.props.data.size}
          {...this.props}/>

      <Link className='btn btn-primary'
        to={`/topics/${topicId}/add`} >
        Add Reply
      </Link>
    </div>)
  }
}

export default Preloader(Replies)
