import React, { Component } from 'react'
import Preloader from '../../Preloader'
import TopicItem from './TopicItem'
import TopicPagination from '../../Paginatiion';

class AllTopics extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div>
        {
          this.props.data.topics.map((topic) => (
            <TopicItem key={topic.id} topic={topic} />
          ))
        }
        <TopicPagination 
          activePage={this.props.activePage} 
          size={this.props.size} 
          pageChange={this.props.pageChange}
          countItems={this.props.data.size}
          {...this.props}/>
      </div>
    )
  }
}

export default Preloader(AllTopics)
