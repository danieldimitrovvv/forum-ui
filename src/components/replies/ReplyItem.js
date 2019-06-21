import React, { Component } from 'react'
import DateFormat from '../DateFormat'
import ScoreSection from '../ScoreSection'

class ReplyItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render () {
    let { reply } = this.props
    return (
      <div>
        <div className='row' style={{ padding: '10px' }}>
          <div className='col-6'>
            {reply.replyContent}
          </div>
          <div className='col-3'>
            <DateFormat date={reply.createdOn} />
          </div>
          <div className='col-3'>
            <DateFormat date={reply.modifiedOn} />
          </div>
        </div>

        <div className='row' style={{ padding: '10px' }}>
          <div className='col-6'></div>
          <div className='col-6'>
            <ScoreSection {...this.props} />
          </div>
        </div>
      </div>
    )
  }
}

export default ReplyItem
