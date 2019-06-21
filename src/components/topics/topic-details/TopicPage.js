import React, { Component } from 'react'
import Api from '../../../services/Api'
import TopicInfo from './TopicInfo'
import Replies from '../../replies/Replies'

class TopicPage extends Component {
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

  componentDidMount() {
    Api.setInterseptor(this.props)
    .addViewTopic(+this.props.match.params.topicId);
  }

  render () {
    let { topicId } = this.props.match.params
    return (
      <div>
        <TopicInfo request={Api.setInterseptor(this.props).fetchTopicById(topicId)} />
        <Replies
          {...this.props}
          topicId={topicId}
          request={Api.setInterseptor(this.props)
            .fetchRepliesPageByTopicId(topicId, this.state.page, this.state.size)} 
          activePage={this.state.page} 
          size={this.state.size}
          pageChange={this.changePage}/>
      </div>
    )
  }
}

export default TopicPage
