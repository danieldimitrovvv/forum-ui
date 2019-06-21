import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DateFormat from '../../DateFormat'

class TopicItem extends Component {
  render () {
    let {topic} = this.props
    return (
      <div className='row' style={{padding: '10px'}}>
        <div className='col-1'>
          {topic.id}
        </div>
        <div className='col-4'>
          <Link to={'/topics/' + topic.id} >{topic.title}</Link>
        </div>
        <div className='col-3'>
          <DateFormat date={topic.createdOn} />
        </div>
        <div className='col-3'>
          <DateFormat date={topic.modifiedOn} />
        </div>
        <div className='col-1'>
          {topic.viewsCount}
        </div>
      </div>
    )
  }
}

export default TopicItem
